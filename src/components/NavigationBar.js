import React, { useState, useContext } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";
import { NewContext } from '../contexts/NewContext.js';

import Logout from "./Authentication/Logout.js";

function NavigationBar(){

  const{ isLoggedIn } = useContext( NewContext );
  const[ isOpen, setIsOpen ] = useState( false );

  return(
    <div className="NavbarComponent fixed-top">
      <Row className="bg-dark">

        <Col xs={2} className="">
          <div className="NavbarButton p-2" onClick={ () => setIsOpen( !isOpen ) }>  
            <div className={ isOpen? 'bar4' : 'bar1' }/>     
            <div className={ isOpen? 'bar5' : 'bar2' }/>   
            <div className={ isOpen? 'bar6' : 'bar3' }/>   
          </div>
        </Col>

        <Col xs={8} className="">
          <input type="text" className="form-control mt-2 w-25 mx-auto" placeholder=" Sök önskad vara " />
        </Col>
        <Col xs={2} className="justify-content-end ">
         
        </Col>

      </Row>
    

      {!isOpen?'':
        <div className="Sidebar h-100 bg-dark">

          {!isLoggedIn?
            <Link to={ '/login' } style={{ textDecoration: 'none' }}>
              <p> Logga in </p>
            </Link>
          :
            <div>
              <Link to={ '/login' } style={{ textDecoration: 'none' }}>
                <p className="mt-5" > Mina sidor </p>
              </Link>
              <Link to={ '/login' } style={{ textDecoration: 'none' }}>
                <p> Varukorg </p>
              </Link>
              <Logout />
            </div>
          }
              
      
       </div>
      }
     
    </div>
  );
}
export default NavigationBar;