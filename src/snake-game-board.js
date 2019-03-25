import React from 'react';
import {verifyIfPositionInSnakeBody} from './helper-functions.js';

function BoardCell (props){
  return (
    <div
      className={'snake-game-board-cell'+' '+props.snakeBodyClass+' '+props.foodClass}
    />
  );
}

export default class Board extends React.Component {
  renderBoardCell(i,j)
  {
    const snakePositions = this.props.snakePositions;
    const foodPosition = this.props.foodPosition;
    let snakeBodyClass = verifyIfPositionInSnakeBody(i,j,snakePositions) ? 'snake-body' : '';
    let foodClass = (i === foodPosition[0] && j === foodPosition[1]) ? 'snake-food' : '';

    return (
      <BoardCell
        key={'cell-'+i+'-'+j}
        snakeBodyClass = {snakeBodyClass}
        foodClass = {foodClass}
      />
    );
  }
  render (){
    const boardCells = [];
    for(let i = 1; i <= 20; i++)
    {
      for(let j = 1; j <= 20; j++)
      {
        boardCells.push(this.renderBoardCell(i,j));
      }
    }
    return (
      <div className='snake-game-board'>
        {boardCells}
      </div>
    );
  }
}
