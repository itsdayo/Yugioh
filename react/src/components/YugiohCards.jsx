import React, { Component } from "react";
import PropTypes from "prop-types";
import {
//  Container,
  Row,
  Col,
  //Breadcrumb,
 // BreadcrumbItem,
  //Card,
  //CardBody,
  
  //ListGroup,
  //ListGroupItem,
 // Media,
 
} from "reactstrap";
import { connect } from "react-redux";
import {getAllMonsters, removeMonster} from "../state/monster/actions"

import "./css/Monster.css"
import swal from "sweetalert";
import * as monsterService from "../services/monsterService"
import SingleCard from "./SingleCard"
import { Formik, Form, Field } from "formik";
import PageNav from "./PageNav"

class YugiohCards extends Component {
  state={
     cards:[],
     pageInfo:{pageIndex:0,
     pageSize:0},
     searchMode:false,
     query: ""
  }

  componentDidMount=()=>{
    
    this.populateDom() 
      
  }

  populateDom=(query)=>{
    if(!this.state.searchMode){
    monsterService.getYuGiOhCards().then(this.onGetCardsSuccess).catch(this.onGetCardsError)
  }else{
      monsterService.getSearchedCards(this.state.query).then(this.onGetSearchSuccess).catch(this.onGetSearchError)
  }

  

}

onGetSearchSuccess=(res)=>{
    const array = res.data.slice(this.state.pageInfo.pageIndex*100,100*(this.state.pageInfo.pageIndex)+100)
    this.setState({cards: array})
  }

  refreshPage=()=>{
    window.location.reload();
  }

  pageController = e => {
    e.preventDefault();
    e.target.blur();
    const dest = parseInt(e.target.value);
    
    if (
      dest < 0 ||
      dest > this.state.cards.length ||
      dest === this.state.pageIndex
    ) {
      return;
    } else {
      const updater = prevState => {
        return {
          pageInfo: {
            ...prevState.pageInfo,
            pageIndex: dest,
            pageSize: this.state.pageInfo.pageSize +100
          }
        };
      };
      this.setState(prevState => updater(prevState), this.pageChange(dest));
      window.scrollTo(0, 0);
    }
  };


  formSubmit=(value)=>{
     
      this.setState({searchMode:true,
    query:value.query})
this.populateDom(value.query)
  }
  pageChange=(dest)=>{
this.setState({
pageIndex:dest
},()=> this.populateDom())
  }

  onGetCardsSuccess=(res)=>{
    const array = res.data.slice(this.state.pageInfo.pageIndex*100,100*(this.state.pageInfo.pageIndex)+100)
this.setState({cards: array})
  }

  eachCard=(card)=>{
return <SingleCard
card={card}
/>
  }
  render() {
    return (
        <React.Fragment>
     <Col>
     <Formik
          enableReinitialize
          initialValues={{}}
          validationSchema={{}}
          onSubmit={values => {
            this.formSubmit(values);
          }}
        >
          {() => (
            
              <Form
                className="centerAlign"
                style={{
                  marginBottom: "-35px"
                }}
              >
                <Field
                  style={{
                   width: "500px",
                   marginTop:"50px",
                   
                  }}
                  className=""
                  placeholder="Search for your favorite card"
                  type="search"
                  id="site-search"
                  name="query"
                  aria-label="Search through site content"
                />
                {!this.state.searchMode?
                <button className="" type="submit">
                  Search
                </button>
               :<button onClick={this.refreshPage} className="btn-danger" type="button">
               Cancel
             </button>}
                
              </Form>

              )}
        </Formik>
     </Col>
     <Row style={{marginTop: "70px"}}>
 
 {this.state.cards.map(this.eachCard)}
 </Row>
 <div className="pull-right" style={{marginTop:"20px", float:"right", marginRight:"25px"}}>
 <PageNav
            pageController={this.pageController}
            pageInfo={this.state.pageInfo}
            cards={this.state.cards}
            {...this.props}
          />
          </div>
      </React.Fragment>
    
    );
  }
}


  
YugiohCards.propTypes = {
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
  )(YugiohCards);
