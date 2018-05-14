import React, { Component } from 'react';
import './Card.css';
/**
 * @param x: The x-coordinate on this page 
 * @param y: The y-coordinate on this page 
 * @param xSet : The offset on X from right -> left on each card
 * @param ySet : The offset on Y from right -> left on each card
 */
class Card extends Component {
  static isClicked = false;
  constructor(props){
    super(props);
    this.state = {x:0,y:0,xSet:0,ySet:0,cardWidth:0,cardHeight:0,margin:4};
  }
  clickOnCard(){
    console.log(this.state.x +" "+this.state.y + " "+this.state.xSet +" "+this.state.ySet + 
                " " + this.state.cardHeight + " " + this.state.cardWidth);
    // the mouse on the margin
    if(this.state.xSet< this.state.margin || this.state.xSet > this.state.cardWidth - this.state.margin || 
       this.state.ySet < this.state.margin || this.state.ySet > this.state.cardHeight- this.state.margin){
      this.clickOnMargin();
    }else{
      this.clickOncard();
    }
  }
  clickOnMargin(){
    console.log("On the margin");
  }
  clickOncard(){
    console.log("On the card");
  }
  _onMouseMove(e){
    var bounds = e.target.getBoundingClientRect();
    var offsetX = e.clientX - bounds.left;
    var offsetY = e.clientY - bounds.top;
    var width = bounds.right - bounds.left;
    var height =  bounds.bottom - bounds.top;
    this.setState({ x: e.screenX, y: e.screenY, xSet:offsetX,ySet:offsetY,cardWidth:width,cardHeight:height});
  }
  render() {
    return (
      <div className="cardBorder"  onClick={this.clickOnCard.bind(this)} 
        onMouseMove={this._onMouseMove.bind(this)}> 
        <div className="Card" >{this.props.cardId}</div>
      </div>
      
    );
  }
}

export default Card;
