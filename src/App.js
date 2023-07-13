import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarDetail from "./pages/carDetail/CarDetail";
import CarList from "./pages/carList/CarList";
import RentalForm from "./pages/RentalForm/RentalForm";
import Thanks from "./pages/thanks/Thanks";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<CarList/>}/>
          <Route path='/:id' element={<CarDetail/>}/>
          <Route path='/rentalForm/:id' element={<RentalForm/>}/>
          <Route path='/thanks' element={<Thanks/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
