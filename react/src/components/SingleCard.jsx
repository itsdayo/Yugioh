import React from "react";
import { Col } from "reactstrap";


const SingleCard = props => {



  return (
    <React.Fragment>
      <Col xs="2" style={{marginBottom:"2px"}} >
      <img height="300px" width="200px" alt="failure to load" src={props.card.card_images[0].image_url}/>
       
      </Col>
    </React.Fragment>
  );
};


export default SingleCard;
