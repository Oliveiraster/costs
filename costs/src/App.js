import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './pages/Home';
import Contato from './pages/Contato';
import Company from './pages/Company';
import NewProject from "./pages/NewProject";

import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";


function App() {
  return (
    
   <Router>
    <Navbar />
    <Container customClass='min-height'>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/contato" element={<Contato />}/>
        <Route path="/company" element={<Company />}/>
        <Route path="/Newproject" element={<NewProject />}/>
      </Routes>
    </Container>
    <Footer />
   </Router>
  );
}

export default App;
