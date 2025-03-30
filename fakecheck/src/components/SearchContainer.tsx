import { useState } from "react";
import ModelSwitcher from "./ModelSwitcher";
import ResultsSection from "./ResultsSection";
// import { useToast } from "@/hooks/use-toast";
// import { apiRequest } from "@/lib/queryClient";

type MlModel = "linear-regression" | "decision-tree" | "random-forest";

const SearchContainer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModel, setSelectedModel] = useState<MlModel>("linear-regression");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast({
        title: "Search query is empty",
        description: "Please enter text, URL, or content to analyze",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setShowResults(false);
    
    try {
      const response = await apiRequest("POST", "/api/analyze", {
        query: searchQuery,
        model: selectedModel,
      });
      
      const data = await response.json();
      setAnalysisResults(data);
      setShowResults(true);
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Could not complete analysis",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getModelDisplayName = (model: MlModel): string => {
    const modelNames = {
      "linear-regression": "Linear Regression",
      "decision-tree": "Decision Tree",
      "random-forest": "Random Forest",
    };
    return modelNames[model];
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#1e293b] rounded-xl shadow-2xl overflow-hidden relative z-10 transition-all duration-300">
      <div className="p-8 md:p-12">
        {/* Welcome Message */}
        {!showResults && !isLoading && (
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2">
              Welcome to SelfipediA
            </h1>
            <p className="text-gray-300 max-w-lg mx-auto">
              Advanced AI-powered detection for fake news, images, and content. Enter text, URLs, or upload content to analyze.
            </p>
          </div>
        )}
        
        {/* Search Bar */}
        <form 
          className="relative max-w-2xl mx-auto transition-all duration-300"
          onSubmit={handleSearch}
        >
          <div className="relative flex rounded-lg overflow-hidden shadow-lg mb-4">
            <input 
              type="text" 
              placeholder="Search by news, content, paste URL..."
              className="w-full py-4 px-6 bg-gray-800 text-gray-100 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-400 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
            />
            <button 
              type="submit" 
              className="bg-primary-500 hover:bg-primary-600 px-6 text-white font-medium flex items-center justify-center transition-colors duration-200 rounded-r-lg whitespace-nowrap"
            >
              LOOK UP
            </button>
          </div>
        </form>
        
        {/* Model Switcher */}
        <ModelSwitcher 
          selectedModel={selectedModel} 
          setSelectedModel={setSelectedModel} 
        />
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="mt-8 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-t-primary-500 border-gray-700 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-300">
              Analyzing with <span className="text-primary-300 font-medium">
                {getModelDisplayName(selectedModel)}
              </span> model...
            </p>
          </div>
        )}
        
        {/* Results Section */}
        {showResults && analysisResults && (
          <ResultsSection results={analysisResults} model={getModelDisplayName(selectedModel)} />
        )}
      </div>
    </div>
  );
};

export default SearchContainer;