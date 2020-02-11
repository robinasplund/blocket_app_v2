import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"; 
import {BrowserRouter as Router,Route} from "react-router-dom";

import NewContextProvider from './contexts/NewContext.js';
import NavigationBar from './components/NavigationBar.js';
import StartPage from "./components/StartPage.js";
import Login from "./components/Authentication/Login.js";
import LoginSuccess from "./components/Authentication/LoginSuccess.js";
//import Logout from "./components/Authentication/Logout.js";


function App() {
  return (
    <Router>
      <div className="AppContainer container-fluid">         
        <div className="main">

          <NewContextProvider>
            <NavigationBar />
            <Route path="/" exact component={ StartPage } />
            <Route path="/login" component={ Login } />
            <Route path="/loginsuccess" component={ LoginSuccess } />
           {/* <Route path="/logout" component={ Logout } /> */}
          </NewContextProvider>
         
        </div>
        <div className="foot">
            
        </div>
      </div>
    </Router>
  );
}
export default App;
