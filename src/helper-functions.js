export const verifyIfPositionInSnakeBody = (i,j,snakePositions) => {
  for(let k = 0; k < snakePositions.length; k++){
    const [positionI, positionJ] = snakePositions[k];
    if (i === positionI && j === positionJ)
      return true;
  }
  return false;
}

export const getNewPosition = (currentPosition, direction) => {
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

export const getNewFoodPosition = (currentFoodPostion, snakePositions) => {
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

export const verifyIsGameOver = (newPosition, snakePositions) => {
  if(newPosition[0] < 1 || newPosition[0] > 20 || newPosition[1] < 1 || newPosition[1] > 20)
    return true;
  if (verifyIfPositionInSnakeBody(newPosition[0], newPosition[1], snakePositions))
      return true;

  return false;
}
