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
import Login from './components/Auth/Login';

import jwt_decode from 'jwt-decode';
import {setCurrentUser,logoutUser} from './actions/authActions'
// import {Provider} from 'react-redux'
import store from './store'
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/private/PrivateRoute';
import Dashboard from './components/Dashboard';
import { useSelector } from 'react-redux';
import Register from './components/Auth/Register';

function App() {

  const isLogged = useSelector(state => state.auth.isAuthenticated);
  console.log(isLogged)

  if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
  
      // Redirect to login
      window.location.href = "./login";
    }
  }

  return (
    <>
    <NavBar/>
    <div style={{marginLeft:'250px'}}>
    <Routes>
      <Route exact path="/csv" element={<CSV4/>}></Route>
      <Route exact path="/login" element={<Login/>}></Route>
      <Route exact path="/register" element={<Register/>}></Route>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/dashboard" element= {<PrivateRoute isLogged={isLogged}><Dashboard/></PrivateRoute>} />
      {/* <Route path="/dashboard" element={<Dashboard/>}></Route> */}
    </Routes></div>
    </>
  );
}

export default App;
