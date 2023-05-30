// FETCHING THE PLAY AREA

let arena = document.querySelector('.playArea');

// DIRECTION OBJECT

var direction = [
  {
    x : 0,
    y : 0
  }
]

// SNAKE ARRAY and FOLLOW ARRAY

var snakeArray = [
  {
    x : 5,
    y : 5
  },
];

// DISPLAY THE SNAKE

  function showSnake () {

    arena.innerHTML = '';

  snakeArray.forEach(elem => {
      let snake = document.createElement('div')
      snake.setAttribute('class' , 'snake')
      snake.style.gridRowStart = elem.y, snake.style.gridColumnStart = elem.x;
      snake.style.backgroundColor = 'green';
  
      arena.appendChild(snake);    
    });

  }

// CODE TO MAKE EACH SEGMENT FOLOW THE PREVIOUS ONE

function follow () {

  for (let i = snakeArray.length - 2 ; i >= 0 ; i--) {
    snakeArray[i+1].x = snakeArray[i].x
    snakeArray[i+1].y = snakeArray[i].y
    }

  snakeArray[0].x += direction[0].x;
  snakeArray[0].y += direction[0].y;
}

//  GENERATE AND GENERATE THE RANDOM FOOD FUNCTION WITH FOOD ARRAY



let foodArray = [
  {}
];

function foodGenerator () {
  
  let foodx = Math.floor(Math.random()*20 + 1);
  let foody = Math.floor(Math.random()*20 + 1);
  
  let allotFood = {
    x : foodx,
    y : foody
  }
  foodArray.unshift(allotFood)
}

foodGenerator ();

let currentFood;

function randomFood () {

  let food = document.createElement('div')
  food.style.backgroundColor = 'red';
  food.setAttribute('id' , 'food');

  currentFood = document.getElementById('food');

  food.style.gridRowStart = foodArray[0].y;
  food.style.gridColumnStart = foodArray[0].x;

  arena.appendChild(food);
}


// DIRECTION CONTROLLER

window.addEventListener('keydown' , (e) => {
  
    switch (e.key) {
      case 'ArrowUp':
        
      direction[0].x = 0;
      direction[0].y = -1;

      break;

      case 'ArrowDown': 

      direction[0].x = 0;
      direction[0].y = 1;
    
      break;

      case 'ArrowLeft': 
    
      direction[0].x = -1;
      direction[0].y = 0;
      
      break;

      case 'ArrowRight': 

      direction[0].x = 1;
      direction[0].y = 0;
     
      break;
  
    default:
      direction[0].x = 0;
      direction[0].y = 0;
      break;
  }  
});

// FUNCTION TO CHECK IF FOOD IS EATEN 

  function foodEaten () {

    if (snakeArray[0].x - direction[0].x === foodArray[0].x && snakeArray[0].y - direction[0].y === foodArray[0].y) {

      extend ();
      foodArray = [];
      foodGenerator ();    
    }
  }

//  FUNCTION TO EXTEND BODY

  function extend () {
    let body = {};

    snakeArray.push(body);
  }

// FPS GENERATOR

const setSpeed = 0.1;
var oldTime = 0;

function motion (timelap) {
  
  window.requestAnimationFrame(motion)

  const interval = (timelap-oldTime)/1000;

  if (interval < setSpeed) {
    return;
  }

  showSnake ();
  follow ();
  randomFood ();

  foodEaten ();

  oldTime = timelap
}

window.requestAnimationFrame(motion)