import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiFeatures from '../components/AiFeatures'
import PromptHero from '../components/PromptHero'
import FAQSection from '../components/FAQSection'
import Footer from '../components/Footer'
import ProductLandingPage from '../components/ProductLandingPage'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <AiFeatures />
      <PromptHero />
      <FAQSection />
      <ProductLandingPage />
      <Footer />
    </div>
  );
}

export default Home