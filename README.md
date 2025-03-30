# **VERIFIKA – AI-Powered Fake News Detection WebApp**

---

## **📌 Vision**
In an era where misinformation spreads faster than truth, **VERIFIKA** aims to be the **digital guardian of truth**. By leveraging **AI-powered fact-checking**, we strive to create a world where individuals can access **unbiased, credible, and verified news** in real-time.

---

## **📊 System Flowchart**
```
User Input (News Article Text)  
        ↓  
Preprocessing (Text Cleaning, Tokenization, Stopword Removal)  
        ↓  
Feature Extraction (Sentiment, Political Bias, Clickbait Probability)  
        ↓  
AI Model Analysis (Logistic Regression for Fake News Classification)  
        ↓  
Credibility Score Generation
        ↓  
Result Output (Fake/Real News Classification + Additional Analysis)  
```

---

## **📂 Dataset**
- **Source:** [Kaggle Fake and Real News Dataset](https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset)
- **Size:**
  - `Fake.csv` (23,502 fake news articles)
  - `True.csv` (21,417 true news articles)
- **Features:**
  - Headline & Body Text  
  - Source Reliability  
  - Sentiment & Clickbait Score  
  - Political Bias Analysis  

---

## **🚀 Features**
✔ **Real-Time Fact-Checking** – Instantly verify online news and social media posts.  
✔ **Fake News Detection** – AI-powered model to classify news as **Real** or **Fake**.  
✔ **Sentiment & Bias Analysis** – Understand the emotional and political tilt of the article.  
✔ **Clickbait Detector** – Identify misleading and sensationalist headlines.  
✔ **Credibility Score** – Evaluate the trustworthiness of a source before sharing.  
✔ **WebApp Interface** – Accessible via a user-friendly web application.  

---

## **🛠️ Technologies Used**
- **Frontend:** [React.js & CSS](https://github.com/AlwaysRead/VerifikaFrontend.git) [Github Repo], Vercel (Frontend Hosting)
- **Backend:** Python, Render (Backend Hosting)
- **Model Training:** Scikit-learn, NLTK, Logistic Regression  
- **Data Storage & Management:** GitHub  

---

## **🎯 Model Training & Selection**   
- **Preprocessing:** Tokenization, Stopword Removal, TF-IDF  
- **Models Used:**
  - Logistic Regression (**Best-performing model, achieving 98% accuracy**)
  - Decision Tree Classifier
  - Gradient Boosting Classifier
  - Random Forest Classifier
- **Feature Engineering:**  
  - Sentiment Analysis using **NLTK**  
  - Political Bias & Clickbait Score Calculation  
- **Training Process:**  
  - Data Cleaning & Splitting (Train-Test: 80-20)    
  - Evaluation using Precision, Recall, and F1 Score  

---

## **⚡ Real-Time Prediction**  
1. **User Inputs an Article or News Headlines**  
2. **Preprocessed & Extracted Features Sent to ML Model**  
3. **AI Model Analyzes & Returns:**  
   - Fake/Real Classification  
   - Sentiment & Bias Insights  
   - Credibility Score  
4. **Results Displayed on WebApp**  

---

## **🌟 Future Scope**
✅ **Improved Accuracy** – Upgrade to Deep Learning (Transformers, BERT, LSTMs)  
✅ **Multi-Language Support** – Expand to detect misinformation across languages  
✅ **Blockchain Integration** – Immutable records for verified news sources  
✅ **Mobile App & Browser Extension** – For seamless user experience  
✅ **Social Media Integration** – Fact-check trending topics in real-time  

---

## **▶️ Sample**
![image](https://github.com/user-attachments/assets/2e9cd051-4837-41c6-a507-99118a5f8645)

![image](https://github.com/user-attachments/assets/8a773e84-6b1c-44b5-b7c9-f89ef01d2421)

![image](https://github.com/user-attachments/assets/f8b0a789-2a2c-48f2-82b5-6443d6c1d4fb)

---

## **💬 Contact**
[**Chinmoy Saikia**](https://github.com/AlwaysRead/)  
[**Nichol Das**](https://github.com/Nichkol)  

---

### **🔗 VERIFIKA – Because the Truth Deserves to Be Heard.**

