import axios from "axios";
const apiPrefix = "https://localhost:50001/api/monsters/"
let addMonster = (payload) => {
    
  const config = {
      method: "POST",
      url: apiPrefix,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    return axios(config).then()
  };

 
  let getYuGiOhCards = () => {
      
    const config = {
        method: "GET",
        url: "https://db.ygoprodeck.com/api/v5/cardinfo.php",
        withCredentials: false,
        crossdomain: true,
        headers: {
          "Content-Type": "application/json"
        }
      };
    
      return axios(config).then((res)=> res)
    };
    let getSearchedCards = (payload) => {
      
      const config = {
          method: "GET",
          url: "https://db.ygoprodeck.com/api/v5/cardinfo.php?fname="+payload,
          withCredentials: false,
          crossdomain: true,
          headers: {
            "Content-Type": "application/json"
          }
        };
      
        return axios(config).then((res)=> res)
      };

  let editMonster = (payload) => {
  
    const config = {
        method: "PUT",
        url: apiPrefix +payload.id,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: {
          "Content-Type": "application/json"
        }
      };
    
      return axios(config).then()
    };
  
  let getAllMonsters = (payload) => {
      
    const config = {
        method: "GET",
        url: apiPrefix,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: {
          "Content-Type": "application/json"
        }
      };
    
      return axios(config).then()
    };


    let getPageContents = () => {
      
      const config = {
          method: "GET",
          url: apiPrefix +"yugioh",
         
          withCredentials: false,
          crossdomain: true,
          headers: {
            "Content-Type": "application/json"
          }
        };
      
        return axios(config).then((res)=> res)
      };
  

    let deleteMonster = (payload) => {
      
      const config = {
          method: "DELETE",
          url: apiPrefix +payload.id,
          data: payload,
          withCredentials: true,
          crossdomain: true,
          headers: {
            "Content-Type": "application/json"
          }
        };
      
        return axios(config).then((res)=> res)
      };

    let getAllTypes = (payload) => {
      
      const config = {
          method: "GET",
          url: apiPrefix+"types",
          data: payload,
          withCredentials: true,
          crossdomain: true,
          headers: {
            "Content-Type": "application/json"
          }
        };
      
        return axios(config).then((res)=> res)
      };
  
   
export {addMonster, deleteMonster, getAllMonsters, editMonster, getAllTypes, getYuGiOhCards, getPageContents, getSearchedCards }