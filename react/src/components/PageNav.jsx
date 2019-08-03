import React from "react";
import PropTypes from "prop-types";

const PageNav = props => {
  const testClick = e => {
    e.preventDefault();
   
  };
  const numberedLinks = (
    <React.Fragment>
      {/* <--- -2button ---> */}
      
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={props.pageController}
        value={props.pageInfo.pageIndex-2 }
      >
        {props.pageInfo.pageIndex-1  > 0 && props.pageInfo.pageIndex >1 ? props.pageInfo.pageIndex -1 : "-"}
      </button>{" "}
      
            {/* <--- -1button ---> */}
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={props.pageController}
        value={props.pageInfo.pageIndex-1 }
      >
        {props.pageInfo.pageIndex  > 0 ? props.pageInfo.pageIndex  : "-"}
      </button>{" "}
     
      {/* <--- 0button ---> */}
      <button
        type="button"
        className="btn btn-outline-primary btn-lg"
        onClick={testClick}
      >
        {props.pageInfo.pageIndex+1}
      </button>{" "}
     {/* <--- +1button ---> */}
     
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={props.pageController}
        value={props.pageInfo.pageIndex + 1}
      >
        {props.pageInfo.pageIndex + 1 <= props.cards.length
          ? props.pageInfo.pageIndex + 2
          : "-"}
      </button>{" "}
       {/* <--- +2button ---> */}
      
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={props.pageController}
        value={props.pageInfo.pageIndex + 2}
      >
        {props.pageInfo.pageIndex + 2 <= props.cards.length
          ? props.pageInfo.pageIndex + 3
          : "-"}
      </button>{" "}
    </React.Fragment>
  );
  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={props.pageController}
        value={1}
        disabled={props.pageInfo.pageIndex === 0 || props.pageInfo.pageIndex === 1  ? true : false}
      >
        {"<<"}
      </button>{" "}
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={props.pageController}
        value={props.pageInfo.pageIndex - 1}
        disabled={props.pageInfo.pageIndex  > 0 ? false : true}
      >
        {"<"}
      </button>{" "}
      {numberedLinks}
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={props.pageController}
        value={props.pageInfo.pageIndex + 1}
        disabled={
          props.pageInfo.pageIndex + 1 <= props.cards.length ? false : true
        }
      >
        {">"}
      </button>{" "}
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={props.pageController}
        value={props.cards.length}
        disabled={props.pageInfo.pageIndex === props.cards.length}
      >
        {">>"}
      </button>
    </div>
  );
};
PageNav.propTypes = {
  pageController: PropTypes.func.isRequired,
  pageInfo: PropTypes.shape({
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired
  })
};
export default PageNav;
