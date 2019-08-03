import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  //Breadcrumb,
 // BreadcrumbItem,
  Card,
  CardBody,
  
  ListGroup,
  ListGroupItem,
 // Media,
 
} from "reactstrap";
import { connect } from "react-redux";
import {getAllMonsters, removeMonster} from "../state/monster/actions"
import MonsterBlock from "./MonsterBlock"
import "./css/Monster.css"
import swal from "sweetalert";
class Monsters extends Component {
  state={
      list:[]
  }

  componentDidMount=()=>{
      this.props.getAllMonsters()
     
      
  }

  
  editMonster=(card)=>{
    this.props.history.push({
      pathname:"/monsters/form",
      state:{
        id:card.id,
        name:card.name,
        type:card.type,
        desc:card.desc,
        attribute:card.attribute,
        editMode:true


      }
    })

  


  }
  deleteCard=(card)=>{
    swal({
      title: "Remove " +card.name + "?",
      icon: "warning",
      dangerMode: true,
      buttons: {
        confirm: {
          text: "Remove",
          visible: true,
          closeModal: true
        },

        cancel: {
          text: "Cancel",
          value: null,
          visible: true,
          closeModal: true
        }}}).then((value)=>{
          if(value){
            this.props.removeMonster(card)
            window.location.reload();
          }
        })
          

  }


  eachMonster=(item)=>{
    return (<MonsterBlock
    key={item.id}
    monster={item} 
    editMode={this.editMonster}
    deleteCard={this.deleteCard}
    />)

  }

  render() {
    return (
        <React.Fragment>
          
              <Col md="6">
              <h1 style={{marginBottom:"50px", marginTop:"25px"}} className="centerAlign">Roster of Monsters </h1>
              
            </Col>
            <Container fluid>
            <Row >
            <Col sm="2">
              <Card style={{ boxShadow: "0 0px 0px 0 rgba(0, 0, 0, 0)" }}>
                <div className="text-left">
                  <CardBody style={{ padding: "0" }}>
                    <Card style={{ marginBottom: "0" }}>
                      <ListGroup>
                        <ListGroupItem tag="button" action onClick={()=> this.props.history.push("/monsters/battle")}>
                         
                          Battle the Computer
                        </ListGroupItem>
                        
                        <ListGroupItem tag="button" action onClick={()=> this.props.history.push("/monsters/form")}>
                          
                          Create a New Monster
                        </ListGroupItem>
                        
                        <ListGroupItem tag="button"  action onClick={()=> this.props.history.push("/monsters/allcards")}>
                          
                          Yu-Gi-Oh Cards
                        </ListGroupItem>

                        <ListGroupItem tag="button"  action onClick={()=> this.props.history.push("/monsters/yugioh")}>
                          
                          Yu-Gi-Oh NewsLetter
                        </ListGroupItem>

                        
                        
                         
                        
                      
                      
                      </ListGroup>
                    </Card>
                  </CardBody>
                </div>
              </Card>
            </Col>
          
        
        
         
          {this.props.monsters.map(this.eachMonster)}
          
          </Row>
        </Container>
      
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
