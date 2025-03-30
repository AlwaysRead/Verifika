const Header = () => {
    return (
      <header className="px-6 py-4 relative z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-white">SelfipediA</span>
            <span className="text-xs px-2 py-1 rounded-full bg-primary-700 text-white">Beta</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="text-sm px-4 py-2 text-white hover:text-white transition-colors duration-200">
              LOG IN
            </button>
            <button className="text-sm px-4 py-2 bg-white text-primary-700 hover:bg-gray-100 rounded-lg font-medium transition-colors duration-200">
              SIGN UP
            </button>
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;