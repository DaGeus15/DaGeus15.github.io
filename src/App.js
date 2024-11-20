import Header from "./components/header";
import Work from "./components/work";
import Skills from "./components/skills";
import Testimonials from "./components/testimonials";
import Contact from "./components/contact";
import Footer from "./components/footer";
import "./style.css";

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Work />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
