// CUSTOM CURSOR

  let cursor = document.querySelector('.snake_cursor');

  window.addEventListener('mousemove' , e => {
    cursor.setAttribute('style' , 'top : ' + (e.pageY + 5) + 'px; left : ' + (e.pageX + 5) + 'px;');
  })

  window.addEventListener('click' , () => {
    cursor.classList.add('eatAnimation');
    setTimeout(() => {
      cursor.classList.remove('eatAnimation');
    }, 110);
  }) 

// ADDING ANIMATION TO BUTTONS ON CLICK

let gameButtons = document.querySelectorAll('.buttons');

gameButtons.forEach( el => {
  el.addEventListener('click' , () =>{
    el.classList.add('clickAnimation')

    setTimeout(() => {
    el.classList.remove('clickAnimation')
  }, 850);
  });
})

// FETCHING THE PLAY AREA

let arena = document.querySelector('.playArea');


let gameOver = false;

// DIRECTION OBJECT

var direction = [
  {
    x : 0,
    y : 0
  }
]


// SET THE INITIAL SPEED OF THE GAME

var setSpeed = 0.25;

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


// DIRECTION CONTROLLER FOR KEYBOARD DEVICES

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


// DIRECTION CONTROLLER FOR NON-KEYBOARD DEVICES

  function left () {
    direction[0].x = -1;
    direction[0].y = 0;
  }

  function up () {
    direction[0].x = 0;
    direction[0].y = -1;
  }

  function down () {
    direction[0].x = 0;
    direction[0].y = 1;
  }

  function right () {
    direction[0].x = 1;
    direction[0].y = 0;
  }


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

    if (setSpeed>=0.15 && setSpeed<=0.25) {
      setSpeed -= (snakeArray.length/500);
    } else if (setSpeed>=0.1 && setSpeed<0.15) {
      setSpeed -= (snakeArray.length/1000);
    } else {
      setSpeed = 0.1;
    }
  }


//  GAMEOVER CONDITIONS

function gameOverCheck () {

  if (snakeArray[0].x - direction[0].x === 21 || snakeArray[0].y - direction[0].y === 21 || snakeArray[0].x - direction[0].x === 0 ||      snakeArray[0].y - direction[0].y === 0) {
    gameOver = true;
    resetGame (gameOver);

    glowRed();
    return;
  } 
  else {

  for (let i = 0; i <snakeArray.length; i++) {
    if (i === 0) {
      continue;
    } 
    else if (snakeArray[0].x === snakeArray[i].x && snakeArray[0].y === snakeArray[i].y) {
      gameOver = true;     
      resetGame (gameOver);

      glowRed();
   }
  }

 }
}

// ANIMATE PLAY AREA ON GAMEOVER

function glowRed () {
  arena.classList.add('gameOver');
  setTimeout(() => {
    arena.classList.remove('gameOver');
  }, 50);
}

//  RESET FUNCTION 

function resetGame (gameState) {
  if (gameState === true) {
    
    gameState = false;
    arena.innerHTML = '';
    setSpeed = 0.25;

    snakeArray = [
      {
        x : 5,
        y : 5
      },
    ] 
    
    direction[0].x = 0;
    direction[0].y = 0;

    showSnake ();
    follow ();
    randomFood ();
  
    foodEaten ();
  }
}

// DISPLAY THE SCORE

let lastScore;

function showScore () { 
  lastScore = snakeArray.length - 1;
  let value = snakeArray.length - 1; 
  let score = document.getElementById('score_value'); 
  score.innerHTML = (value);
}

// FPS GENERATOR


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
  showScore ();
  
  gameOverCheck();  

  oldTime = timelap
}

window.requestAnimationFrame(motion);

