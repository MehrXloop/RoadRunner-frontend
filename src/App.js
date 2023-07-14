import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import NavBar from "./components/navbar/NavBar";
import CarDetail from "./pages/carDetail/CarDetail";
import CarList from "./pages/carList/CarList";
import RentalForm from "./pages/RentalForm/RentalForm";
import Thanks from "./pages/thanks/Thanks";

function App() {
  return (
    <div data-testid="app">
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/' element={<CarList/>}/>
          <Route path='/:id' element={<CarDetail/>}/>
          {/* <Route path='/:id/rentalForm/:id' element={<RentalForm/>}/> */}
          <Route path='/rentalForm/:id' element={<RentalForm/>}/>
          <Route path='/thanks' element={<Thanks/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
