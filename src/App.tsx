import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Puppies from "./pages/Puppies";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import ScrollToTop from "./components/ScrollToTop";
import emailjs from "@emailjs/browser";

emailjs.init({
    publicKey: "plvSwMnwrtz7r7WIC",
});

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-neutral">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/puppies" element={<Puppies />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/gallery" element={<Gallery />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
