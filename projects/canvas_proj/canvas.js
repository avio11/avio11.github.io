var canvas;
var ctx;
var begin = 0;

function init(){
    canvas = document.getElementById("board");
    canvas.addEventListener("mousedown", function(event){
      if(begin==0){
        begin = 1;

      }
    })

    ctx = canvas.getContext("2d");
    ctx.font = "30px sans serif";
    ctx.fillText("One day I want to be rich and buy a gigantic house!!", 0, 30);
}
