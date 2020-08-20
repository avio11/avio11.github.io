// Find canvas element
var canvas = document.getElementById("sort_canvas");
// Create object with methods to draw on canvas
var ctx = canvas.getContext("2d");

var main_color = "#2f2f4f"
var sorted_color = "#00FF7F";

ctx.fillStyle = main_color;

// Initialize variables to draw initial canvas
// Height of the canvas
var H = 400;
// Width of the canvas
var W = 900;
// Array to be sorted
var elem = [];
// Number of elements in the array to be sorted
var n = 100;
// Position X on the canvas
var x=0;
// Position Y on the canvas
var y=400;
// Space containing one bar (of the array) + the space to the next one (2/2 to the bar, 1/2 to the space between bars)
var space=600/n;

// variables to control FPS
var fps = 400;
var fps_interval = 1000/fps;

set_n();

// Function that changes array size and scrambles its values
function set_n(){
  // Clear canvas for redrawing
  for(var a=0;a<n;a++) ctx.clearRect(0, 0, canvas.width, canvas.height);
  n = document.getElementById("myNumber").value;
  slider_fps = document.getElementById("fps_range");
  space = 600/n;
  create_array();
}

slider_fps.oninput = function(){
  fps = slider_fps.value;
  fps_interval = 1000/fps;
}

function create_array(){
  x = 0;
  for(var a=0;a<n;a++){
    elem[a] = Math.floor(Math.random() * 350) + 50;
    ctx.fillRect(x, y-elem[a], space, elem[a]);
    x = x+3*(space/2);
  }
}

function print_array(){
  ctx.fillStyle = main_color;
  x = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(var a=0;a<n;a++){
    ctx.fillRect(x, y-elem[a], space, elem[a]);
    x = x + 3*(space/2);
  }
}

function print_sorted_array(){
  ctx.fillStyle = sorted_color;
  ctx.fillRect(x, y-elem[i], space, elem[i]);
  x = x +3*(space/2);
  i = i+1;
  if(i>=n){
    clearInterval(anim);
    ctx.fillStyle = main_color;
  }
}

// Sorting functions -----------------------------------------------------------
var i, j;
var opt = 0;
var anim;

function sort(){
  console.log(fps_interval)
  if(opt == 0){
    i = 0;
    j = 1;
    anim = setInterval(bubble, fps_interval);
  }
}

function bubble(){
  if(elem[j-1] > elem[j]){
    var aux = elem[j];
    elem[j] = elem[j-1];
    elem[j-1] = aux;
  }
  if(j+1==n){
    j = 1;
    i = i+1;
  }
  else{
    j = j+1;
  }
  print_array();
  if(i >= n){
    i = 0;
    x = 0;
    clearInterval(anim);
    anim = setInterval(print_sorted_array, fps_interval);
  }
}
