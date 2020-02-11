import React, { useContext } from "react";
import {Row,Col} from 'reactstrap';
import { NewContext } from "../../contexts/NewContext";

function LoginPage(){

  const{ user } = useContext( NewContext );
  
  return(    
    <Row className=" vertical-center bordish ">
      <Col>

        <Row>
          <Col xs={3} className=" mx-auto text-center ">
            <p> Hej </p>
          </Col>         
        </Row>
        <Row>
          <Col xs={3} className=" mx-auto text-center ">
            <p className=" text-success "> { user.firstName } { user.lastName } </p>
          </Col>
        </Row>
        <Row>
          <Col xs={3} className=" mx-auto text-center ">
            <p> Du är nu inloggad </p>
          </Col>         
        </Row>
       
      </Col>
    </Row>        
  );
}
export default LoginPage;
