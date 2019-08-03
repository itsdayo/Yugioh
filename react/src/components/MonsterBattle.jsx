import React, { Component } from "react";

import { connect } from "react-redux";
import { addMonster, editMonster } from "../state/monster/actions";


import swal from "sweetalert";
//import { Formik, Field, Form, ErrorMessage } from "formik";
import * as monsterService from "../services/monsterService"

import RubberBand from "react-animations";

import "./css/Monster.css"
import {
    Container,
    Row,
    Col,
    //Breadcrumb,
   // BreadcrumbItem,
    Card,
   // CardBody,
    
   // ListGroup,
   // ListGroupItem,
   // Media,
   
  } from "reactstrap";
  const mainBg = {
    backgroundImage: 'https://vignette.wikia.nocookie.net/yugioh/images/d/db/MasterDuel.png/revision/latest?cb=20170719164238',
  
  }
 
class MonsterBattle extends Component {
state={
 userMonster:"",
 computerMonster:{card_images:""},
 playerCounter:0,
 computerCounter:0,
 allYugiohCards:"",
 userCards:"",
 disableButton: false
}

componentDidMount=()=>{
    
this.getAllCards()
document.body.style.backgroundImage ='https://vignette.wikia.nocookie.net/yugioh/images/d/db/MasterDuel.png/revision/latest?cb=20170719164238'
  

}

getAllTypes=()=>{
  monsterService.getAllTypes().then(this.onGetAllMonsterSuccess).catch(this.onGetAllMonsterError)
}

getAllCardsBeforeAtk=()=>{
    
    if (this.state.playerCounter === 0&& this.state.computerCounter ===0){
        this.setState({disableButton:true})
        setTimeout(()=>{
            this.userAttack()
        },1500)
    }else{
        this.userAttack()
    }
}

getAllCardsBeforeDef=()=>{
   
    if (this.state.playerCounter === 0&& this.state.computerCounter ===0){
        this.setState({disableButton:true})
        setTimeout(()=>{
            this.userDefend()
        },1500)
    }else{
        this.userDefend()
    }
}

getAllCards=()=>{
    monsterService.getYuGiOhCards().then(this.onGetAllYugiohSuccess).catch(this.onGetAllYugiohError)
    monsterService.getAllMonsters().then(this.onGetAllMonsterSuccess).catch(this.onGetAllMonsterError)
}


userAttack=()=>{ 
    this.setState({disableButton:false})
  
    const randomMonster= this.state.userCards[[Math.floor(Math.random()*this.state.userCards.length)]]

    let i = this.state.allYugiohCards.length
    const monsterCards = []
      
    while(i--) {
        if(this.state.allYugiohCards[i].atk !== undefined ) {
               monsterCards.push(this.state.allYugiohCards[i])
        }
      
    }
   const randomCPUMonster = monsterCards[[Math.floor(Math.random()*monsterCards.length)]]

   this.setState({
    computerMonster: randomCPUMonster,
userMonster:randomMonster
}, () => {
    this.actionsDuringAtkBattle()
});

  
}
userDefend=()=>{

    this.setState({disableButton:false})
    const randomMonster= this.state.userCards[[Math.floor(Math.random()*this.state.userCards.length)]]

    
   
   
    let i = this.state.allYugiohCards.length
    const monsterCards = []
      
    while(i--) {
        if(this.state.allYugiohCards[i].atk !== undefined ) {
               monsterCards.push(this.state.allYugiohCards[i])
        }
      
    }
   const randomCPUMonster = monsterCards[[Math.floor(Math.random()*monsterCards.length)]]


    this.setState({
        computerMonster: randomCPUMonster,
    userMonster:randomMonster
    }, () => {
        this.actionsDuringDefBattle()
    });


  
}

actionsDuringAtkBattle = ()=>{

    const cpuDef = parseInt(this.state.computerMonster.def) 
    if(this.state.userMonster.atk >cpuDef && this.state.playerCounter !== 9 ){
        this.setState({playerCounter:this.state.playerCounter +1})
        
     }else if(this.state.userMonster.atk >cpuDef && this.state.playerCounter === 9 ){
        swal({
            title: "Success",
            text:
             "You win!",
            icon: "success"
          }).then(() =>this.resetCounter());
        }else if(this.state.userMonster.atk < cpuDef && this.state.computerCounter === 9 ){
            swal({
                title: "Sorry",
                text:
                 "You Lose!",
                icon: "error"
              }).then(() => this.resetCounter());
        }
         
    else{
        this.setState({computerCounter: this.state.computerCounter+1})
    
    }
}

userDefend=()=>{
    const randomMonster= this.state.userCards[[Math.floor(Math.random()*this.state.userCards.length)]]

    
   
   
    let i = this.state.allYugiohCards.length
    const monsterCards = []
      
    while(i--) {
        if(this.state.allYugiohCards[i].atk !== undefined ) {
               monsterCards.push(this.state.allYugiohCards[i])
        }
      
    }
   const randomCPUMonster = monsterCards[[Math.floor(Math.random()*monsterCards.length)]]


    this.setState({
        computerMonster: randomCPUMonster,
    userMonster:randomMonster
    }, () => {
        this.actionsDuringDefBattle()
    });


  
}

actionsDuringDefBattle=()=>{
    const cpuAtk = parseInt(this.state.computerMonster.atk)
   
   
   
      if(this.state.userMonster.def >cpuAtk && this.state.playerCounter !== 9 ){
      
       this.setState({playerCounter:this.state.playerCounter +1})
       
    }else if(this.state.userMonster.def >cpuAtk && this.state.playerCounter === 9 ){
       
   
       swal({
           title: "Success",
           text:
            "You win!",
           icon: "success"
         }).then(() =>this.resetCounter());
       }else if(this.state.userMonster.def < cpuAtk && this.state.computerCounter === 9 ){
           swal({
               title: "Sorry",
               text:
                "You Lose!",
               icon: "error"
             }).then(() => this.resetCounter());
       }
        
   else{
       
       this.setState({computerCounter: this.state.computerCounter+1})
   
   }
   
     
      
   
}

onGetAllMonsterSuccess =(res)=>{
  this.setState({userCards:res.data.item})

}
resetCounter=()=>{
    this.setState({
        computerCounter:0,
        playerCounter:0
    })
}
 shake(){
    // document.getElementsByClassName("monsterCard").animate({
    //      'margin-left': '-=5px',
    //      'margin-right': '+=5px'
    //  }, 200)



}

onGetAllYugiohSuccess=(res)=>{
  this.setState({allYugiohCards: res.data})
    

}
onGetAllYugiohError=(err)=>{
    debugger;
}

onGetAllMonsterError =()=>{}
populateForm=(mon)=>{

  this.setState(
    {
      id:mon.id,
      name:mon.name,
      type:mon.type,
      desc:mon.desc,
      attribute:mon.attribute,
      editMode:mon.editMode

    }
  )
}



  render() {
  
    return (
     
       <React.Fragment>
           <Col style={{marginTop:"25px"}}>
            <h2>Battle your Deck<span style={{float:"right", marginRight:"60px"}}><span style={{marginRight:"25px"}}>Counter: You:   <b  style={{fontColor:"red"}}>{this.state.playerCounter}</b></span>  the Computer:   <b style={{fontColor:"red"}}>{this.state.computerCounter}</b></span></h2>
            <Col style={{marginTop:"40px"}}>
            <Container fluid>
        <Row >
        {/* <Col sm="2">
          <Card style={{ boxShadow: "0 0px 0px 0 rgba(0, 0, 0, 0)" }}>
            <div className="text-left">
              <CardBody style={{ padding: "0" }}>
                <Card style={{ marginBottom: "0" }}>
                  <ListGroup>
                    <ListGroupItem tag="button" action onClick={()=> this.props.history.push("/monsters")}>
                     
                      Check out your Roster
                    </ListGroupItem>
                    
                    <ListGroupItem tag="button" action onClick={()=> this.props.history.push("/monsters/form")}>
                      
                      Create a New Monster
                    </ListGroupItem>
                    
                    <ListGroupItem tag="button" id="venues" action onClick={()=> this.props.history.push("/monsters/yugioh")}>
                      
                      Yu-Gi-Oh Cards
                    </ListGroupItem>
                    
                     
                    
                  
                  
                  </ListGroup>
                </Card>
              </CardBody>
            </div>
          </Card>
        </Col>
      
    
     */}

     
  <Col lg="6" >
      <Row>
          <Col sm="6" className="centerAlign">
         
  <Card>
  
      <div className="card monsterCard custom-card">
        <div className="card-header" style={{ textAlign: "center" }}>
          <h4>
            <b className="fontSzLarge">{this.state.userMonster.name}</b>
          </h4>
          <p className="fontSzMedium">
            <span>{this.state.userMonster.type}</span>
          </p>

          <span>
            <p className="fontSzMedium">
            {this.state.userMonster.desc}
            </p>
          </span>

          <span>
            <p className="fontSzMedium">
            {this.state.userMonster.attribute}
            </p>
          </span>

          <span>
            <p className="fontSzMedium">
             {(typeof this.state.userMonster === "object" ?  "ATK:" + this.state.userMonster.atk  + "  DEF:" +this.state.userMonster.def : "Please choose to attack or defend") }
            </p>
          </span>

        
        </div>

       
      </div>
  
  </Card>
  
  </Col>
  </Row>
</Col>
 
<Col lg="6"  >
      <Row>
          <Col lg="6"  className="centerAlign">
  <Card>
     
      <div className="card monsterCard custom-card">
        <div className="card-header" style={{ textAlign: "center" }}>
          {!this.state.computerMonster.card_images ? "Please choose to attack or defend": 
       
       <img height="300px" width="150px" src={ this.state.computerMonster.card_images ? this.state.computerMonster.card_images[0].image_url :"https://www.google.com/imgres?imgurl=https%3A%2F%2Fib1.hulu.com%2Fuser%2Fv3%2Fartwork%2Fdcb9999a-2e6d-468f-8688-ae6ea320939a%3Fbase_image_bucket_name%3Dimage_manager%26base_image%3Da3d6375e-256a-4955-a276-1883aba18c7c%26size%3D400x600%26format%3Djpeg&imgrefurl=https%3A%2F%2Fwww.hulu.com%2Fmovie%2Fyu-gi-oh-the-movie-dcb9999a-2e6d-468f-8688-ae6ea320939a&docid=b46R0zPRGHjU9M&tbnid=J0CBIIYuKukLpM%3A&vet=10ahUKEwih-ejR3d3jAhVNRKwKHcmHBOMQMwjUASgDMAM..i&w=400&h=600&bih=754&biw=1536&q=yugioh&ved=0ahUKEwih-ejR3d3jAhVNRKwKHcmHBOMQMwjUASgDMAM&iact=mrc&uact=8"} alt=""/>
    }
          {/* <h4>
            <b className="fontSzLarge">{this.state.computerMonster.name}</b>
          </h4>
          <p className="fontSzMedium">
            <span>{this.state.computerMonster.type}</span>
          </p>

          <span>
            <p className="fontSzMedium">
            {"this.state.computerMonster.desc"}
            </p>
          </span>

          <span>
            <p className="fontSzMedium">
            {this.state.computerMonster.attribute}
            </p>
          </span>

          <span>
            <p className="fontSzMedium">
             {(typeof this.state.userMonster === "object" ?  "ATK:" + this.state.computerMonster.atk  + "  DEF:" +this.state.computerMonster.def : "Please choose to attack or defend") } 
            </p>
          </span> */}

          
        </div>

       
      </div>
  
  </Card>
  </Col>
  </Row>
</Col>
      
      </Row>
      {/* <Row>
          <Col >
          <button>Hello</button>
          </Col>
          <Col>
          <button>Hello</button>
          </Col>
      </Row> */}
      <div className="centerAlign">
      <button disabled={this.state.disableButton} onClick={this.getAllCardsBeforeAtk}style={{marginLeft:"35%", marginTop:"12px", float:"left"}} className="btn btn-lg btn-warning">Attack</button>
     <div className="btn" style={{display: "inline-block"}}> Or</div>
      <button style={{ marginTop:"12px"}} className="btn btn-lg btn-success" onClick={this.getAllCardsBeforeDef} disabled={this.state.disableButton}>
      <i className="fas fa-shield-alt"></i>
          Defend</button>
      </div>
    </Container>
    </Col>
    </Col>
    </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    monsters: state.monsters
  };
};

const mapDispatchToProps = { addMonster, editMonster };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonsterBattle);
