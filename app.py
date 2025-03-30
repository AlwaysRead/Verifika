from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re
import string
import os
import logging
from datetime import datetime
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from collections import Counter

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Download NLTK data on startup
try:
    nltk.data.find('vader_lexicon')
except LookupError:
    logger.info("Downloading NLTK vader_lexicon data...")
    nltk.download('vader_lexicon', quiet=True)
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    logger.info("Downloading NLTK punkt data...")
    nltk.download('punkt', quiet=True)

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Configuration
MODEL_DIR = os.path.join(os.path.dirname(__file__), 'models')
VECTOR_PATH = os.path.join(MODEL_DIR, 'tfidf_vectorizer.joblib')
MODEL_PATH = os.path.join(MODEL_DIR, 'logistic_regression.joblib')

# Text Analyzer class
class TextAnalyzer:
    """Provides additional text analysis features beyond fake news detection"""
    
    def __init__(self):
        # Initialize sentiment analyzer
        self.sentiment_analyzer = SentimentIntensityAnalyzer()
        
        # Keywords for political leaning detection (simplified approach)
        self.political_keywords = {
            'left': ['progressive', 'liberal', 'democrat', 'socialism', 'welfare', 
                    'equality', 'regulation', 'diversity', 'inclusion', 'climate'],
            'right': ['conservative', 'republican', 'tradition', 'freedom', 'tax cut', 
                     'deregulation', 'patriot', 'military', 'border', 'fiscal']
        }
        
        # Clickbait pattern detection
        self.clickbait_patterns = [
            r'(?i)you won\'t believe',
            r'(?i)shocking',
            r'(?i)amazing',
            r'(?i)jaw-dropping',
            r'(?i)mind-blowing',
            r'(?i)secret',
            r'(?i)revealed',
            r'(?i)\d+ (?:things|reasons|facts|tips)',
            r'(?i)this (?:is what|will make)',
            r'(?i)(?:what|when|how) to',
            r'(?i)(?:must|need to) see',
            r'(?i)never seen before',
            r'(?i)will blow your mind',
            r'(?i)can(?:\'t)? stop watching',
            r'(?i)broke the internet'
        ]
    
    def analyze_sentiment(self, text):
        """Analyze the sentiment of the text"""
        scores = self.sentiment_analyzer.polarity_scores(text)
        
        # Determine the overall sentiment
        if scores['compound'] >= 0.05:
            sentiment = 'positive'
        elif scores['compound'] <= -0.05:
            sentiment = 'negative'
        else:
            sentiment = 'neutral'
            
        return {
            'sentiment': sentiment,
            'compound_score': scores['compound'],
            'positive': scores['pos'],
            'negative': scores['neg'],
            'neutral': scores['neu']
        }
    
    def detect_political_bias(self, text):
        """Detect potential political bias in the text"""
        text_lower = text.lower()
        
        # Count occurrences of keywords
        left_count = sum(1 for word in self.political_keywords['left'] if word in text_lower)
        right_count = sum(1 for word in self.political_keywords['right'] if word in text_lower)
        
        # Calculate bias score (-1 to 1 scale, where -1 is left, 1 is right)
        total = left_count + right_count
        if total == 0:
            bias_score = 0
        else:
            bias_score = (right_count - left_count) / total
        
        # Determine bias category
        if bias_score < -0.3:
            bias = 'left-leaning'
        elif bias_score > 0.3:
            bias = 'right-leaning'
        else:
            bias = 'neutral/balanced'
            
        return {
            'bias': bias,
            'bias_score': bias_score,
            'left_keywords': left_count,
            'right_keywords': right_count
        }
    
    def detect_clickbait(self, text):
        """Detect if the text has clickbait characteristics"""
        # Count clickbait patterns
        clickbait_matches = []
        for pattern in self.clickbait_patterns:
            matches = re.findall(pattern, text)
            if matches:
                clickbait_matches.extend(matches)
        
        # Calculate clickbait score (0-1)
        clickbait_score = min(1.0, len(clickbait_matches) / 3)
        
        # Determine if it's clickbait
        is_clickbait = clickbait_score > 0.3
        
        return {
            'is_clickbait': is_clickbait,
            'clickbait_score': clickbait_score,
            'clickbait_matches': clickbait_matches if clickbait_matches else []
        }
    
    def analyze_text(self, text):
        """Run all analysis methods on the text"""
        return {
            'sentiment': self.analyze_sentiment(text),
            'political_bias': self.detect_political_bias(text),
            'clickbait': self.detect_clickbait(text)
        }

# Load models
try:
    vectorizer = joblib.load(VECTOR_PATH)
    model = joblib.load(MODEL_PATH)
    text_analyzer = TextAnalyzer()
    logger.info("Model, vectorizer, and text analyzer loaded successfully.")
except Exception as e:
    logger.error("Error loading models: %s", str(e))
    raise e

def clean_text(text):
    """Clean the input text using the same preprocessing as training"""
    text = re.sub('[()]', '', text)
    text = re.sub('\\W', ' ', text)
    text = re.sub('https?://\\S+|www\\.\\S+', '', text)
    text = re.sub('<.*?>+', '', text)
    text = re.sub('[%s]' % re.escape(string.punctuation), '', text)
    text = re.sub('\\n', '', text)
    text = re.sub('\\w*\\d\\w*', '', text)
    return text

def predict_news(article_text):
    """Predict whether the article is fake or real"""
    try:
        cleaned_text = clean_text(article_text)
        vectorized_text = vectorizer.transform([cleaned_text])
        # Get prediction and probability
        prediction = model.predict(vectorized_text)[0]
        probability = model.predict_proba(vectorized_text)[0]
        
        # Run additional analyses on the original (non-cleaned) text for better results
        additional_analysis = text_analyzer.analyze_text(article_text)
        
        result = {
            'prediction': 'Not A Fake News' if prediction == 1 else 'Fake News',
            'confidence': float(max(probability) * 100),
            'timestamp': datetime.now().isoformat(),
            'additional_analysis': additional_analysis
        }
        logger.info("Prediction successful: %s", result['prediction'])
        return result
    except Exception as e:
        logger.error("Prediction error: %s", str(e))
        raise Exception(f"Prediction error: {str(e)}")

@app.route('/api/predict', methods=['POST'])
def predict():
    """API endpoint to predict whether the article is fake or real"""
    try:
        data = request.get_json()
        logger.info("Received data for prediction")
        if not data:
            return jsonify({'status': 'error', 'error': 'No JSON data provided'}), 400
        
        article_text = data.get('text', '').strip()
        if not article_text:
            return jsonify({'status': 'error', 'error': 'No text provided'}), 400
            
        # Get analysis options
        analysis_options = data.get('analysis_options', {
            'sentiment': True,
            'political_bias': True,
            'clickbait': True
        })
        
        result = predict_news(article_text)
        
        # Filter results based on requested analysis options
        if not all(analysis_options.values()):
            filtered_analysis = {}
            for key, enabled in analysis_options.items():
                if enabled and key in result['additional_analysis']:
                    filtered_analysis[key] = result['additional_analysis'][key]
            result['additional_analysis'] = filtered_analysis
            
        return jsonify({'status': 'success', 'data': result})
    except Exception as e:
        return jsonify({'status': 'error', 'error': str(e)}), 500

@app.route('/api/analyze', methods=['POST'])
def analyze_only():
    """API endpoint to perform only text analysis without fake news detection"""
    try:
        data = request.get_json()
        logger.info("Received data for analysis only")
        if not data:
            return jsonify({'status': 'error', 'error': 'No JSON data provided'}), 400
        
        article_text = data.get('text', '').strip()
        if not article_text:
            return jsonify({'status': 'error', 'error': 'No text provided'}), 400
            
        # Get analysis options
        analysis_options = data.get('analysis_options', {
            'sentiment': True,
            'political_bias': True,
            'clickbait': True
        })
        
        # Perform analysis
        all_analysis = text_analyzer.analyze_text(article_text)
        
        # Filter results based on requested analysis options
        filtered_analysis = {}
        for key, enabled in analysis_options.items():
            if enabled and key in all_analysis:
                filtered_analysis[key] = all_analysis[key]
                
        result = {
            'analysis': filtered_analysis,
            'timestamp': datetime.now().isoformat()
        }
            
        return jsonify({'status': 'success', 'data': result})
    except Exception as e:
        return jsonify({'status': 'error', 'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({'status': 'error', 'error': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'status': 'error', 'error': 'Internal server error'}), 500

if __name__ == '__main__':
    import uvicorn
    logger.info("Starting server on http://0.0.0.0:5000")
    uvicorn.run("app:app", host="0.0.0.0", port=5000, reload=True)