import React, { useContext } from 'react';
import { Row, Col } from 'reactstrap';
import { NewContext } from '../../contexts/NewContext';

function Logout(){

  const{ user } = useContext( NewContext );

  async function handleLogout(){
    const userData = { email: user.email, password: user.password };   
    try {
      const response = await fetch( '/json/login/*', {
        method: 'DELETE',
        body: JSON.stringify( userData ),  
        headers: { 'Content-Type': 'application/json' }
      });
      const json = await response.json();
      console.log( 'Success:', JSON.stringify( json ) );
    } 
    catch( error ){
      console.error( 'Error:', error ); 
    }    

    let checkIfLoggedIn = await fetch( '/json/login/' );
    checkIfLoggedIn = await checkIfLoggedIn.json(); 
    if(checkIfLoggedIn.error==='Not logged in!'){
      window.location=( '/' );
    }  
  }

  return(
    <Row>
      <Col>
     
        <p onClick={handleLogout} style={{ cursor: 'pointer' }}> Logga ut </p>
      
      </Col>
    </Row>        
  );
}
export default Logout;