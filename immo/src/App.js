import React, { Component } from 'react';
import { render } from 'react-dom';
import bien from './Bien';
import './App.css';


var MaVar=1;
class RechercheComp extends React.Component {
  state = {};

  GenerationBien = event => {
    const KeyArray = Object.keys(bien);
    const randomKey = KeyArray[Math.floor(Math.random() * KeyArray.length)];
    this.setState(bien[randomKey]);
    var selectElmtType = document.getElementById('type2'); 
    var selectElmtSurface = document.getElementById('surface2'); 
    var selectElmtPrix = document.getElementById('prix2'); 
    var valtype = selectElmtType.options[selectElmtType.selectedIndex].value;
    var valsurface = selectElmtSurface.options[selectElmtSurface.selectedIndex].value;
    var valprix = selectElmtPrix.options[selectElmtPrix.selectedIndex].value;
    MaVar=randomKey;
    
  }
  render() {
    return (
      <div>
        <div id="select">
          <div id="type">
            <select id="type2">
              <option defaultValue>Type de bien</option>
              <option value="1">Maison</option>
              <option value="2">Appartement</option>
            </select>
          </div>
        </div>
        <div id="surface">
          <select id="surface2">
            <option defaultValue>Surface</option>
            <option value="1">-50</option>
            <option value="2">50 à 100</option>
            <option value="3">100 à 150</option>
            <option value="4">150 à 200</option>
            <option value="5">>200</option>
          </select>
        </div>
        <div id="prix">
          <select id="prix2">
            <option defaultValue>Prix</option>
            <option value="1">-100 000€</option>
            <option value="2">100 000 à 150 000€</option>
            <option value="3">150 000 à 200 000€</option>
            <option value="4">200 000 à 250 000€</option>
            <option value="5">250 000 à 300 000€</option>
            <option value="6">300 000 à 350 000€</option>
            <option value="7">> 350 000€</option>
          </select>
        </div>
        <div>
          <input type="submit" id="submit" onClick={e => this.GenerationBien(e)}></input>
          <br /><br />
          <div className="resultat1">
            <img className="resultat1-image" src={require("./images/maison" + MaVar + ".jpg")} />
            <h1 className="resultat1-titre">{this.state.titre}</h1>
            <p className="parametres">{this.state.prix}</p>
            <p className="parametres">{this.state.surface}</p>
            <button className="btn">Rendez-vous</button>
          </div>}
      </div>
      </div>
    )
  }
};

class MainComponent extends Component {
  render() {
    return (
      <div>
        <RechercheComp />
      </div>
    )
  }
}
class App extends Component {
  render() {
    return (
      <div>
        <MainComponent />
      </div>
    )
  }
}
render(
  <App />, document.getElementById('root')
);
export default App;