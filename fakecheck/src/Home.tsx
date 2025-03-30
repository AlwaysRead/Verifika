import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchContainer from "../components/SearchContainer";
import FeaturesSection from "../components/FeaturesSection";
import BackgroundIcons from "../components/BackgroundIcons";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 relative">
        <BackgroundIcons />
        <SearchContainer />
        <FeaturesSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;