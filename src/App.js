// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
//Components
import { Header, Footer} from "./components";
//Pages
import { Home, Contact } from "./pages";

function App() {
  return (
    <div className="container">
      <h1>todo ok</h1>
    </div>
    // <BrowserRouter>
    //   <Header />
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/contact" element={<Contact />} />
    //     </Routes>
    //   <Footer />
    // </BrowserRouter>
  );
}

export default App;