import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Policies from "./pages/Policies.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/policies" element={<Policies />} />
      </Routes>
    </Router>
  );
}

export default App;
