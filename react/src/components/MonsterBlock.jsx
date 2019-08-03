import React from "react";
import { Col } from "reactstrap";


const MonsterBlock = props => {
   const editCard = () => {

     props.editMode(props.monster);
   };

   const deleteCard=()=>{
     props.deleteCard(props.monster)
   }


  return (
    <React.Fragment>
      <Col xs="2" >
      <div className="card monsterCard custom-card">
        <div className="card-header" style={{ textAlign: "center" }}>
          <h4>
            <b className="fontSzLarge">{props.monster.name}</b>
          </h4>
          <p className="fontSzMedium">
            <span>{props.monster.type}</span>
          </p>

          <span>
            <p className="fontSzMedium">
              {props.monster.desc}
            </p>
          </span>

          <span>
            <p className="fontSzMedium">
              {props.monster.attribute}
            </p>
          </span>

          <span>
            <p className="fontSzMedium">
              ATK: {props.monster.atk} DEF: {props.monster.def}
            </p>
          </span>

          
        </div>

        <div className="card-body">
          <div  align="center">
            <button style={{marginBottom:"3px"}} className="btn btn-xs btn-primary"  onClick={editCard}>
              Edit Monster Card
            </button>

            <button
              type="button"
              className="btn btn-xs btn-danger"
              name="delete"
              onClick={deleteCard}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      </Col>
    </React.Fragment>
  );
};


export default MonsterBlock;
