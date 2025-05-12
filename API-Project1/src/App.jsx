import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Search from "./Search";



function App() {
  return (
    <>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<Search />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
