import Header from "./components/header";
import Work from "./components/work";
import Resume from "./components/Resume";
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
        <Resume/>
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
