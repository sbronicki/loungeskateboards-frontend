import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Product from "./pages/Product";

const App = ({ children }) => {
  return (
    <Router>
      <div className="App">
        <div>navigation</div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:handle" element={<Product />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
