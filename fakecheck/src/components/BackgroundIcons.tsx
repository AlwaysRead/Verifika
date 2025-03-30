const BackgroundIcons = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
        <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
          <i className="fas fa-file-alt text-white text-opacity-30 text-xl"></i>
        </div>
        <div className="absolute top-1/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
          <i className="fas fa-newspaper text-white text-opacity-30 text-xl"></i>
        </div>
        <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <i className="fas fa-image text-white text-opacity-30 text-xl"></i>
        </div>
        <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <i className="fas fa-comment-alt text-white text-opacity-30 text-xl"></i>
        </div>
        <div className="absolute top-3/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
          <i className="fas fa-video text-white text-opacity-30 text-xl"></i>
        </div>
        <div className="absolute top-1/5 right-1/3 transform translate-x-1/2 -translate-y-1/2">
          <i className="fas fa-chart-line text-white text-opacity-30 text-xl"></i>
        </div>
        <div className="absolute bottom-1/4 left-1/3 transform -translate-x-1/2 translate-y-1/2">
          <i className="fas fa-chart-pie text-white text-opacity-30 text-xl"></i>
        </div>
        <div className="absolute bottom-1/3 right-1/4 transform translate-x-1/2 translate-y-1/2">
          <i className="fas fa-share-alt text-white text-opacity-30 text-xl"></i>
        </div>
        <div className="absolute bottom-1/5 right-1/2 transform translate-x-1/2 translate-y-1/2">
          <i className="fas fa-link text-white text-opacity-30 text-xl"></i>
        </div>
      </div>
    );
  };
  
  export default BackgroundIcons;