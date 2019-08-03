import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { Route } from "react-router-dom";
import MonsterForm from './components/MonsterForm';
import Monsters from './components/MonsterList';
import MonsterBattle from './components/MonsterBattle';
import Yugioh from './components/Yugioh'
import YugiohCards from './components/YugiohCards'

class App extends React.Component {
 
 render(){
  return (
   <React.Fragment>
    

<Route
                    exact
                    path={"/monsters/allcards"}
                    component={YugiohCards}
                  />

<Route
                    exact
                    path={"/monsters/form"}
                    render={props => (
                      <MonsterForm
                        {...props}
                      
                        
                      />
                    )}
                  />
                  <Route
                  exact
                  path={"/monsters"}
                  component={Monsters}
                />
                   <Route
                  exact
                  path={"/monsters/battle"}
                  component={MonsterBattle}
                />
                 <Route
                  exact
                  path={"/monsters/yugioh"}
                  component={Yugioh}
                />
                </React.Fragment>
  );
}
}

export default App;
