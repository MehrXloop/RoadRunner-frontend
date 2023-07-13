import { BrowserRouter as Router , Routes , Route } from "react-router-dom";

function App() {
  return (
  <div>
      <Router>
        <Routes>
          <Route  path="/"/>          
          <Route  path="/:id"/>          
          <Route  path="/rentalform/:id"/>          
          <Route  path="/thanks"/>          
        </Routes>
      </Router>
  </div>
  );
}

export default App;
