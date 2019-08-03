import * as monsterService from "../../services/monsterService"
/*
 * action types
 */

export const TYPES = {
   // CART_SET_COUNT: "CART_SET_COUNT",
    MONSTER_ADD_REQUEST: "MONSTER_ADD_REQUEST",
    MONSTER_REQUEST_POSTS:"MONSTER_REQUEST_POSTS",
    MONSTER_REMOVE: "MONSTER_REMOVE"
  };
  
  /*
   * other constants
   */
  
  /*
   * action creators
   */
  
  
  
 function postMonster(data) {
    return {
      type: TYPES.MONSTER_ADD_REQUEST,
      payload: data
    };
  }
  function receivePosts(items){
  
    return {
      type: TYPES.MONSTER_REQUEST_POSTS,
      payload:items
    };

  }
  function deleteMonster(item){
  
    return {
      type: TYPES.MONSTER_REMOVE,
      payload:item
    };

  }
  
  export function addMonster(monsterInfo) {
   
    return dispatch => {
      return monsterService
        .addMonster(monsterInfo)
        .then(items => dispatch(postMonster(items)));
    };
  }

  export function editMonster(monsterInfo) {
   
    return dispatch => {
      return monsterService
        .editMonster(monsterInfo)
        .then(items => dispatch(postMonster(items)));
    };
  }
  export function removeMonster(monsterInfo) {
   
    return dispatch => {
      return monsterService
        .deleteMonster(monsterInfo)
        .then(items => dispatch(deleteMonster(items)));
    };
  }

  export function getAllMonsters() {
    return dispatch => {
      return monsterService
        .getAllMonsters()
        .then(data => data.data.item)
      .then(itemsToPassAlong => {       
        return itemsToPassAlong;
      })
      
      .then(items => dispatch(receivePosts(items)));
  
    };
  }


  //export const actionCreators = bindActionCreators(setCart, addToCart);