import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import {getAllMonsters, removeMonster} from "../state/monster/actions"
import MonsterBlock from "./MonsterBlock"
import "./css/Monster.css"
import swal from "sweetalert";
import * as monsterService from "../services/monsterService"
import NewsArticle from "./NewsArticle"
import {
  Container,
  Row,
  Col,
  //Breadcrumb,
 // BreadcrumbItem,
  Card,
 CardBody,
  
 // ListGroup,
 // ListGroupItem,
 // Media,
 
} from "reactstrap";
class Monsters extends Component {
  state={
      page:[]
  }

  componentDidMount=()=>{ 
    monsterService.getPageContents().then(this.onGetPageContentsSuccess).catch(this.onGetPageContentsError)
     
      
  }

  onGetPageContentsSuccess=(res)=>{
  this.setState({page:res.data.item})
  console.log(this.state)
 
  }

  createNewsArticle=(article)=>{
  return <NewsArticle
    article={article}

    />

  }

  render() {
    return (
        <React.Fragment>
     <Col style={{marginTop:"50px"}}>
     <CardBody className="centerAlign" style={{backgroundColor:"white"}}>
        {this.state.page.map(this.createNewsArticle)}
     </CardBody>
     </Col>
 

 
  
      </React.Fragment>
    
    );
  }
}


  
Monsters.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};
const mapStateToProps = state => {
    return {
      monsters: state.monsters
    };
  };
  const mapDispatchToProps = { getAllMonsters, removeMonster };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Monsters);
