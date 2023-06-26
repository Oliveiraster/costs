import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Contato from './pages/Contato';
import Company from './pages/Company';
import NewProject from "./pages/NewProject";
import Projects from './pages/Porjects';
import Projected from "./pages/Projected";

import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";



export default function App() {
  return (
    
   <Router>
    <Navbar />
    <Container customClass='min-height'>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/contato" element={<Contato />}/>
        <Route path="/projects" element={<Projects />} />
        <Route path="/company" element={<Company />}/>
        <Route path="/Newproject" element={<NewProject />}/>
        <Route path="/projected/:id" element={<Projected />}/>
      </Routes>
    </Container>
    <Footer />
   </Router>
  );
}

