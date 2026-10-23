import AnimatedBackground from '@/components/AnimatedBackground';
import CustomCursor from '@/components/CustomCursor';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import HowWeWork from '@/components/HowWeWork';
import WhyCodeBoost from '@/components/WhyCodeBoost';
import Results from '@/components/Results';
import Portfolio from '@/components/Portfolio';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

function App() {
  return (
    <>
      <AnimatedBackground />
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <HowWeWork />
        <WhyCodeBoost />
        <Results />
        <Portfolio />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
