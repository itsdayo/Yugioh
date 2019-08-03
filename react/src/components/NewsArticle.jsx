import React from "react";
import { Col, Row } from "reactstrap";


const NewsArticle = props => {
  

  return (
    <React.Fragment>
      <Row>
    <Col><img height="50px" width="50px" src="http://contegracc.com/contegra/wp-content/uploads/2013/01/news-logo-2.jpg" alt="could not load"/></Col>
    <Col>{props.article.date}</Col>
      <Col >
          <a href={("https://www.yugioh-card.com/uk/news/"+props.article.url)}>
     {props.article.content}</a>
      </Col>
      </Row>
    </React.Fragment>
  );
};


export default NewsArticle;
