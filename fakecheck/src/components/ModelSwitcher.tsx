import React from "react";

type MlModel = "linear-regression" | "decision-tree" | "random-forest";

interface ModelSwitcherProps {
  selectedModel: MlModel;
  setSelectedModel: React.Dispatch<React.SetStateAction<MlModel>>;
}

const ModelSwitcher: React.FC<ModelSwitcherProps> = ({ selectedModel, setSelectedModel }) => {
  const modelOptions: { id: MlModel; label: string }[] = [
    { id: "linear-regression", label: "Linear Regression" },
    { id: "decision-tree", label: "Decision Tree" },
    { id: "random-forest", label: "Random Forest" },
  ];

  return (
    <div className="flex justify-center mt-6">
      <div className="inline-flex items-center space-x-3 bg-gray-800 bg-opacity-50 rounded-full px-4 py-2 text-sm">
        <span className="text-gray-300">ML Model:</span>
        <div className="inline-flex p-1 bg-gray-700 rounded-full">
          {modelOptions.map((model) => (
            <button 
              key={model.id}
              className={`px-3 py-1 rounded-full transition-colors duration-200 ${
                selectedModel === model.id 
                  ? "bg-primary-500 text-white" 
                  : "text-gray-300 hover:text-white"
              }`}
              onClick={() => setSelectedModel(model.id)}
            >
              {model.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelSwitcher;