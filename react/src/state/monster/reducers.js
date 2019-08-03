import { TYPES } from "./actions";

export const monsters = (state = {}, action) => {

  switch (action.type) {
     
      case TYPES.MONSTER_ADD_REQUEST: {   
      
        return state;
      }
      case TYPES.MONSTER_REQUEST_POSTS: {
       
        
          return [...action.payload]
        
        
      }
      case TYPES.MONSTER_REMOVE: {
       
        
        return state
      
      
    }
      default:
        return state;
    }
  };

 