//sounds
let eat = new Audio("res/eat.wav");
let crash = new Audio("res/crash.wav");
let speedup = new Audio("res/speedUp.wav");

//const and variables
let inputDir = { x: 0, y: 0 };
let speed = 5;
let score = 0;
let hiscore = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 11, y: 11 }];
food = { x: 3, y: 4 };

//function
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(sarr) {
  for (let i = 1; i < snakeArr.length; i++) {
    if (sarr[i].x == sarr[0].x && sarr[i].y == sarr[0].y) {
      return true;
    }
  }
  if (sarr[0].x >= 21 || sarr[0].x <= 0 || sarr[0].y >= 21 || sarr[0].y <= 0) {
    return true;
  }
}

function gameEngine() {
  //update
  if (isCollide(snakeArr)) {
    inputDir = { x: 0, y: 0 };
    crash.play();
    alert("Game Over!\r\nScore: " + score);
    snakeArr = [{ x: 11, y: 11 }];
    score = 0;
    speed = 5;
    scoreBox.innerHTML = "Hi Score:" + hiscore + "<br>" + "Score: 0";
    instructions.innerHTML = "Press any arrow<br>key to begin";
  }

  if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
    eat.play();
    score += 100;
    if (score % 500 == 0) {
      speedup.play();
    }
    if (score > hiscore) {
      hiscore = score;
    }
    //couldn't think of a better way to do this at that time, sorry
    if (score == 500) {
      speed = speed + 1;
    } else if (score == 1000) {
      speed = speed + 1;
    } else if (score == 1500) {
      speed = speed + 1;
    } else if (score == 2000) {
      speed = speed + 1;
    } else if (score == 2500) {
      speed = speed + 1;
    } else if (score == 3000) {
      speed = speed + 1;
    } else if (score == 3500) {
      speed = speed + 1;
    } else if (score == 4000) {
      speed = speed + 1;
    } else if (score == 4500) {
      speed = speed + 1;
    } else if (score == 5000) {
      speed = speed + 1;
    }
    scoreBox.innerHTML = "Hi Score:" + hiscore + "<br>" + "Score :" + score;

    //changing the message
    if (score >= 500) {
      instructions.innerHTML = "The speed increases<br> with every 500 points";
    }
    if (score >= 1000) {
      instructions.innerHTML = "Have Fun";
    }

    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 20;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  //display
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index == 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//main
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});
