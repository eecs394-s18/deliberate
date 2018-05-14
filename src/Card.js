import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  static isClicked = false;
  constructor(props){
    super(props);
    this.state = {x:0,y:0};
  }
  connectLine(){
    console.log(this.state.x +" "+this.state.y );
  }
  _onMouseMove(e){
    this.setState({ x: e.screenX, y: e.screenY });
  }
  render() {
    return (
      <div className="cardBorder" ref="element" onClick={this.connectLine.bind(this)} 
        onMouseMove={this._onMouseMove.bind(this)}> 
        <div className="Card">{this.props.cardId}</div>
      </div>
      
    );
  }
}

export default Card;
