import React from "react";

interface ResultsSectionProps {
    results: {
      isFake: boolean;
      verdict: string;
      confidence: number;
      indicators: string[];
      dataPoints: string;
    };
    model: string;
  }
  
  const ResultsSection: React.FC<ResultsSectionProps> = ({ results, model }) => {
    const { isFake, verdict, confidence, indicators, dataPoints } = results;
    
    const badgeColor = isFake ? "bg-red-500" : "bg-green-500";
    const badgeText = isFake ? "Suspicious Content" : "Authentic Content";
    const badgeIcon = isFake ? "fas fa-exclamation-triangle" : "fas fa-check-circle";
    
    return (
      <div className="mt-12">
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6">
          <div className="mb-6 pb-6 border-b border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-white">Analysis Results</h3>
            <div className="flex items-center">
              <div className="text-xl font-bold mr-3 text-white">{verdict}</div>
              <div className={`text-sm px-2 py-1 rounded ${badgeColor} bg-opacity-20 ${isFake ? 'text-red-300' : 'text-green-300'}`}>
                <i className={`${badgeIcon} mr-1`}></i>
                <span>{badgeText}</span>
              </div>
            </div>
          </div>
          
          {/* Analysis Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-sm uppercase text-gray-400 font-medium">Detection Confidence</h4>
              
              {/* Confidence Score */}
              <div className="flex items-center space-x-4">
                <div className="flex-grow">
                  <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${isFake ? 'bg-red-500' : 'bg-green-500'} rounded-full`}
                      style={{ width: `${confidence}%` }}
                    ></div>
                  </div>
                </div>
                <div className="font-bold text-lg text-white">{confidence}%</div>
              </div>
              
              <div className="text-sm text-gray-300">
                <p>Based on <span className="text-primary-300 font-medium">{model}</span> analysis with <span className="text-primary-300 font-medium">{dataPoints}</span> training data points.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm uppercase text-gray-400 font-medium">Key Indicators</h4>
              
              {/* Indicators List */}
              <ul className="space-y-2 text-sm text-gray-300">
                {indicators.map((indicator, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <i className={`${isFake ? 'fas fa-check text-red-400' : 'fas fa-check text-green-400'} mt-1`}></i>
                    <span>{indicator}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
            <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition-colors duration-200 text-white">
              <i className="fas fa-file-alt"></i>
              <span>View Detailed Report</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition-colors duration-200 text-white">
              <i className="fas fa-share"></i>
              <span>Share Results</span>
            </button>
            <button className="flex items-center space-x-2 bg-transparent border border-gray-600 hover:border-gray-500 px-4 py-2 rounded-lg text-sm transition-colors duration-200 text-white">
              <i className="fas fa-flag"></i>
              <span>Report Issue</span>
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ResultsSection;