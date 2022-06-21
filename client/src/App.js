import logo from './logo.svg';
import './App.css';
import {BrowserRouter,routes,Route,Link, Routes} from 'react-router-dom'
import CSV from './components/CSV';
import CSV2 from './components/CSV2';
// import CSV3 from './components/CSV3'
import CSV4 from './components/CSV4';
import Data from './components/Data';
import NavBar from './components/Navbar/NavBar';
import Home from './components/Home/Home';



function App() {
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <div style={{marginLeft:'250px'}}>
    <Routes>
      <Route exact path="/csv" element={<CSV4/>}></Route>
      <Route path="/" element={<Home/>}></Route>
    </Routes></div>
    </BrowserRouter>
    </>
  );
}

export default App;
