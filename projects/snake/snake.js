var board;
var ctx;
var anim;

// colors for the snake and food
const snake_color = "#2f2f4f"
const food_color = "#00FF7F";

const jump_ = 5;
const fps = 2;
const fps_rate = 1000/fps;

head = {
  x: 100, y:100
}

pos_update = []

key = 0;

function init(){
  board = document.getElementById("board");
  ctx = board.getContext("2d");
  ctx.fillStyle = snake_color;

  board.addEventListener("keydown", function(event) {
    // left=0, up=1, right=2, down=3
    var opt = event.keyCode;
    if(opt == 37) key = 0;
    else if(opt == 38) key = 1;
    else if(opt == 39) key = 2;
    else if(opt == 40) key = 3;
    console.log("keycode:", opt);
  });
}

function start(){
  anim = setInterval(update_board, fps_rate);
}

function update_board(){
  ctx.clearRect(0, 0, board.width, board.height);
  switch(key){
    case 0:
      head.x = head.x-jump_;
      break;
    case 1:
      head.y = head.y+jump_;
      break;
    case 2:
      head.x = head.x+jump_;
      break;
    case 3:
      head.y = head.y-jump_;
      break;
    default:
      head.x = head.x;
      head.y = head.y;
  }
  // (x, y, width, height)
  console.log(key);
  ctx.fillRect(head.x, board.height-head.y, 5, 5);

}
