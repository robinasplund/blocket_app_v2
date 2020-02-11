import React, { useState } from "react";
import {Row,Col,Button} from 'reactstrap';

function Login(){

  const[ userInput, setUserInput ] = useState({
    email:'',
    password:''
  })

  async function handleLogin(){
    try{
      const tryLogin = await fetch( '/json/login', {
        method: 'POST',
        body: JSON.stringify({ email: userInput.email, password: userInput.password }),
        headers: { 'Content-Type': 'application/json' }
      });
      const json = await tryLogin.json();
      console.log( JSON.stringify( json ) ); 
      checkIfLoggedIn();
    }
    catch( error ){ 
      console.error( 'Error:', error ); 
    }
  }

  async function checkIfLoggedIn(){
    try{
      const isLoggedIn = await fetch( '/json/login/' );
      const json = await isLoggedIn.json();
      console.log( JSON.stringify( json ) ); 
      window.location=( '/loginsuccess' );
    }
    catch( error ){ 
      console.error( 'Error:', error ); 
    }
  }


  return(    
    <Row className="vertical-center bordish">
      <Col>

        <Row>
          <Col xs={3} className="mx-auto" >
            <input 
              type="text" 
              placeholder="Email" 
              className="form-control" 
              onChange={ (e) => setUserInput({ ...userInput, email: e.target.value }) } 
            />
          </Col>
        </Row>
        <Row className="mt-2" >
          <Col xs={3} className="mx-auto" >
            <input 
              type="text" 
              placeholder="Lösenord" 
              className="form-control" 
              onChange={ (e) => setUserInput({ ...userInput, password: e.target.value }) } 
            />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col  xs={3} className="mx-auto text-center" >
            <Button color="success" onClick={handleLogin}> Logga in </Button>
          </Col>
        </Row>
       
      </Col>
    </Row>        
  );
}
export default Login;



    /*

    let checkIfLoggedIn = await fetch( '/json/login/' );
    checkIfLoggedIn = await checkIfLoggedIn.json(); 
    if(checkIfLoggedIn.error!=='Not logged in!'){
      window.location=( '/loginsuccess' );
    }  */