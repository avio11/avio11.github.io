// Variables that define number of rows and colunms of the matrix (field)
const ROW = 50;
const COL = 100;

// Define colors for initial position(white), final position(yellow), blocked path(black) and free path(light blue)
colors = ["green", "yellow", "#000000", "rgb(150, 200, 200)"]
var opt = 3;

// Initial position
init_pos = {
  x: 0, y:0
}
// Final position
final_pos = {
  x: COL-1, y: ROW-1
}

var rowsArray;

var field = [];
function init_field(){
  // Get table element
  field = document.getElementById("field");
  // Create rows
  var row = [];
  var cel = [];
  for(var a = 0; a < ROW ; a++){
    row[a] = field.insertRow(a);
    cel[a] = new Array(COL);
    for(var b = 0; b < COL; b++){
      cel[a][b] = row[a].insertCell(b);
    }
  }
  document.getElementById("field").rows[init_pos.y].cells[init_pos.x].style.backgroundColor = colors[0];
  document.getElementById("field").rows[final_pos.y].cells[final_pos.x].style.backgroundColor = colors[1];

  // Event to clear/block paths with mouse over event
  field.addEventListener('mouseover', (event) => {
    if(opt==0 || opt==1) return;

    var td = event.target.closest("td");
    if(event.altKey && td.style.backgroundColor != colors[0] && td.style.backgroundColor != colors[1]){
      td.style.backgroundColor = colors[opt];
    }
  })
  // Event to change initial/final coordinates
  field.addEventListener('click', (event) => {
    if(opt==0 || opt==1){
      // Code taken from "https://stackoverflow.com/questions/45656949/how-to-return-the-row-and-column-index-of-a-table-cell-by-clicking"
      var rowIndex = rowsArray.findIndex(row => row.contains(event.target));
      var columns = Array.from(rowsArray[rowIndex].querySelectorAll('td'));
      var columnIndex = columns.findIndex(column => column == event.target);
      var aux = document.getElementById("field").rows[rowIndex].cells[columnIndex];

      if(opt==0){
        document.getElementById("field").rows[init_pos.y].cells[init_pos.x].style.backgroundColor = colors[3];
        init_pos.y = rowIndex;
        init_pos.x = columnIndex;
        document.getElementById("field").rows[init_pos.y].cells[init_pos.x].style.backgroundColor = colors[0];
      }
      else{
        document.getElementById("field").rows[final_pos.y].cells[final_pos.x].style.backgroundColor = colors[3];
        final_pos.y = rowIndex;
        final_pos.x = columnIndex;
        document.getElementById("field").rows[final_pos.y].cells[final_pos.x].style.backgroundColor = colors[1];
      }
    }
    return;
  })
  var rows = document.querySelectorAll('tr');
  rowsArray = Array.from(rows);
}

// Function to set option to change grid elements (set initial/final position or clear/block path)
function set_opt(i){
  opt = i;
}

// Resets field to initial configuration
function reset_field(){
  for(var i=0;i<ROW;i++){
    for(var j=0;j<COL;j++){
      var aux = document.getElementById("field").rows[i].cells;
      aux[j].style.backgroundColor = colors[3];
    }
  }
  init_pos.x = 0;
  init_pos.y = 0;
  final_pos.x = COL-1;
  final_pos.y = ROW-1;
  document.getElementById("field").rows[init_pos.y].cells[init_pos.x].style.backgroundColor = colors[0];
  document.getElementById("field").rows[final_pos.y].cells[final_pos.x].style.backgroundColor = colors[1];
}

// -------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------          ALGORITHMS FOR GRAPH TRAVERSAL          ----------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------

function BFS(){}

function dijkstra(){}

function a_star(){}

// Ideas to continue
// 1 modified A* ALGORITHMS
// 2 meta-heuristic algorithms
