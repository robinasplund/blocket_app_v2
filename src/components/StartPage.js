import React from "react";
import { Row, Col } from 'reactstrap';
import HeaderImage from '../images/loppis.jpg';

function StartPage(){

  return(
    <div className=" StartPageComponent ">

      <Row className=" Header mt-5 pt-5 ">
        <Col>
          <img 
            src={ HeaderImage } 
            alt=" Bild på olika typer utav varor " 
            className=" img-fluid max-width:100% height:auto mx-auto d-block " 
          />             
        </Col>
      </Row>  
      
    </div>
  );
}
export default StartPage;

