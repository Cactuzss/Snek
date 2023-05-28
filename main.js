

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

SnakeGame = new Game();
const interval = setInterval(Processing, 10);

document.addEventListener("keydown", RedirectToKeyHandler, false);

function Processing()
{
    SnakeGame.Process(SnakeGame.State)
}

function RedirectToKeyHandler(e)
{
    SnakeGame.KeyPressHandler(e)
}

function RandNum(min, max) 
{
  return Math.floor(Math.random() * (max - min)) + min;
}