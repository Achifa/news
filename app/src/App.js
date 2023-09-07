import logo from './logo.svg';
import './App.css';
import { Route, Link, useLocation, Routes, useNavigate } from "react-router-dom";
import Home from './pages/clients/Home';

function App() {

  let location = useLocation(); 

  return (
    <div className="App">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />   
      </Routes> 
    </div>
  );
}

export default App;
