import React, { Component } from "react";

import { connect } from "react-redux";
import { addMonster, editMonster } from "../state/monster/actions";
import { Row, Col } from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as monsterService from "../services/monsterService"
import "./css/Monster.css"

class MonsterForm extends Component {
state={
 
    id:"",
    name:"",
    type:"",
    desc:"",
    attribute:"",
  editMode:false,
  typeOptions:[]
}

componentDidMount=()=>{
if(this.props.location.state &&this.props.location.state.id){  
 this.populateForm(this.props.location.state)}
  this.getAllTypes()
}

getAllTypes=()=>{
  monsterService.getAllTypes().then(this.onGetAllTypesSuccess).catch(this.onGetAllTypesError)
}
onGetAllTypesSuccess =(res)=>{
  
  const typeOptions= res.data.item.map(this.mapTypes)
  this.setState({
    typeOptions:typeOptions
  })
 
}

onGetAllTypesError =()=>{}
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

formSubmit = (monster) => {
  if(this.state.editMode === false){  

    this.props.addMonster(monster).then(()=>{this.props.history.push("/monsters")})
  }else{
   monster.id = this.state.id
   
    this.props.editMonster(monster).then(()=>{this.props.history.push("/monsters")})
    
  }
  
  }
  mapTypes = type => {
   
    return (
      <option key={type.id} value={type.name}>
        {type.name}
      </option>
    );
  };
  render() {
  
    return (
     
      <Row>
        <Col sm={6} style={{marginTop: "25px"}} className="centerAlign"
       >
        <div  className={"card  "}>
        <Formik
         
          enableReinitialize
          initialValues={{
            name:
              "" + (this.state.editMode ? this.state.name : ""),
            type:
              "" + (this.state.editMode ? this.state.type : ""),
            desc: "" + (this.state.editMode ? this.state.desc : ""),
            attribute: this.state.editMode ? this.state.attribute : "",
            
          }}
         
          onSubmit={this.formSubmit}
        
          render={formikProps => (
            <Form>
              
                <div className="card-header">
                  <h3 className="card-title">
                  { this.state.editMode ? "Update your Monster" :"Create your Monster"}
                  </h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">Monster's Name</label>
                        <Field
                          name="name"
                          type="text"
                          placeholder="Enter a creative monster's name"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                        
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">Monster Type</label>
                        <Field
                          name="type"
                          component="select"
                          className="form-control"
                          
                        >
                          <option value="">---Select a Type---</option>
                          {this.state.typeOptions}
                          </Field>
                        
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">Monster's Description</label>
                        <Field
                          name="desc"
                          rows="3"
                          maxLength="500"
                          component="textarea"
                          placeholder="Enter a description of your monster"
                          className="form-control"
                        />
                         
                        
                        <ErrorMessage
                          name="isAvailable"
                          component="div"
                      
                        />{" "}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">Monster's Attribute</label>
                        <Field
                          name="attribute"
                          component="select"
                          placeholder="Enter the attribute of your monster"
                          className="form-control"
                        >
                           <option value="">---Select an Attribute---</option>
                          <option value="Dark">Dark</option>
                          <option value="Divine">Divine</option>
                          <option value="Earth">Earth</option>
                          <option value="Fire">Fire</option>
                          <option value="Light">Light</option>
                          <option value="Water">Water</option>
                          <option value="Wind"> Wind</option>
                          </Field>

                         
                        
                        <ErrorMessage
                          name="isAvailable"
                          component="div"
                      
                        />{" "}
                      </div>
                    </div>
                   
                   
                  </div>
                </div>
                <div className="card-footer text-left">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <button
                    type="reset"
                    style={{ marginLeft: "4px" }}
                    className="btn btn-secondary"
                    onClick={() =>{this.props.history.push("/monsters")}}
                  >
                    Cancel
                  </button>
                </div>
            
            </Form>
          )}
        />
    </div>
        </Col>
        {/* <Col sm={6}>{this.props.cart.count}</Col> */}
      </Row>
     
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
)(MonsterForm);
