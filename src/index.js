import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './snake-game-board.js';
import {verifyIfPositionInSnakeBody, getNewPosition, getNewFoodPosition, verifyIsGameOver} from './helper-functions.js';

class SnakeGame extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      snakePositions : [[5,6],[4,6],[3,6],[2,6]],
      foodPosition : [12,18],
      direction: 'down',
      isGameOver: false,
      isGameRunning: false
    };
    this.changeSnakePosition = this.changeSnakePosition.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }
  changeSnakePosition(){
    if (this.state.isGameOver || !this.state.isGameRunning)
        return null;
    let snakePositions = this.state.snakePositions;
    const foodPosition = this.state.foodPosition;
    const firstPosition = snakePositions[0];
    const newPosition = getNewPosition(firstPosition,this.state.direction);
    const consumeFood = newPosition[0] === foodPosition[0] && newPosition[1] === foodPosition[1];
    const slicedSnake = consumeFood ? snakePositions : snakePositions.slice(0,-1);
    const isGameOver = verifyIsGameOver(newPosition, slicedSnake);
    const newSnakePositions = [newPosition].concat(slicedSnake);
    const newFoodPosition = consumeFood ? getNewFoodPosition(foodPosition, newSnakePositions) : foodPosition;
    this.setState({
      snakePositions : newSnakePositions,
      foodPosition: newFoodPosition,
      isGameOver: isGameOver
    });
  }
  onKeyDown(event){
    let direction = this.state.direction;
    switch (event.keyCode) {
      case 37:
        if(direction !== 'right')
          direction = 'left';
        break;
      case 38:
        if(direction !== 'down')
          direction = 'up';
        break;
      case 39:
        if(direction !== 'left')
          direction = 'right';
        break;
      case 40:
        if(direction !== 'up')
          direction = 'down';
        break;
    }
    if (this.state.direction !== direction){
      this.setState({direction : direction}, this.changeSnakePosition);
    }
  }
  componentDidMount(){
    setInterval(this.changeSnakePosition,500);
    document.addEventListener("keydown", this.onKeyDown);
  }
  resetGame(){
    this.setState({
      snakePositions : [[5,6],[4,6],[3,6],[2,6]],
      foodPosition : [12,18],
      direction: 'down',
      isGameOver: false
    });
  }
  startGame(){
    this.setState({
      isGameRunning: true
    });
  }
  render(){
    const score = this.state.snakePositions.length - 4;
    const isGameOver = this.state.isGameOver;
    return (
      <div className={'snake-game' + (isGameOver ? ' game-over' : '')}>
        <h1 className='game-heading'> Snake Game</h1>
        <h3 className='game-heading'> Score {score}</h3>
        <div>
          { this.state.isGameOver &&
            <div className='game-over-heading'>
              <h2>Game Over</h2>
              <button onClick={() => this.resetGame()}>Restart</button>
            </div>
          }

          { !this.state.isGameRunning &&
            <div className='game-start-heading'>
              <button onClick={() => this.startGame()}>Start Game</button>
            </div>
          }
          <Board
            snakePositions = {this.state.snakePositions}
            foodPosition = {this.state.foodPosition}
          />
        </div>
      </div>
    );
  }
}

// ======================
ReactDOM.render(
  <SnakeGame />,
  document.getElementById('root')
);

/*
function verifyIfPositionInSnakeBody (i,j,snakePositions){
  for(let k = 0; k < snakePositions.length; k++){
    const [positionI, positionJ] = snakePositions[k];
    if (i === positionI && j === positionJ)
      return true;
  }
  return false;
}

function getNewPosition (currentPosition, direction){
  let newPosition = [];
  switch (direction) {
    case 'up':
      newPosition[0] = currentPosition[0] - 1;
      newPosition[1] = currentPosition[1];
      break;
    case 'down':
      newPosition[0] = currentPosition[0] + 1;
      newPosition[1] = currentPosition[1];
      break;
    case 'left':
      newPosition[0] = currentPosition[0];
      newPosition[1] = currentPosition[1] - 1;
      break;
    case 'right':
      newPosition[0] = currentPosition[0];
      newPosition[1] = currentPosition[1] + 1;
      break;
  }

  return newPosition;
}

function getNewFoodPosition (currentFoodPostion, snakePositions){
  let gotPosition;
  let positioinI;
  let positionJ
  do{
    positioinI = Math.floor((Math.random() * 20) + 1);
    positionJ = Math.floor((Math.random() * 20) + 1);
    gotPosition = verifyIfPositionInSnakeBody(positioinI, positionJ, snakePositions);
  }
  while(gotPosition);

  return [positioinI, positionJ];
}

function verifyIsGameOver(newPosition, snakePositions) {
  if(newPosition[0] < 1 || newPosition[0] > 20 || newPosition[1] < 1 || newPosition[1] > 20)
    return true;
  if (verifyIfPositionInSnakeBody(newPosition[0], newPosition[1], snakePositions))
      return true;

  return false;
}
*/
