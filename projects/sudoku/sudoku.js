var board = [];

// Samples of valid and invalid starting sudoku boards
function sample_board(){

var a = Math.floor(Math.random()*4);

if(a==0){
  // valid board
  board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];
}
else if(a==1){
  // invalid board (row)
  board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 8, 0, 0, 8, 0, 0, 7, 9]
  ];
}
else if(a==2){
  // invalid board (column)
  board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 3, 0, 0, 8, 0, 0, 7, 9]
  ];
}
else{
  // invalid board (3x3)
  board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [6, 0, 0, 0, 8, 0, 0, 7, 9]
  ];
}
  print_board();
}

// Print initial board configuration
function print_board(){
  for(var i=0;i<9;i++){
    for(var j=0;j<9;j++){
      update_grid_element(i, j, board[i][j]);
    }
  }
}

// Updates one element of the sudoku grid
function update_grid_element(i, j, y) {
  if(y==0) y = " ";
  var x = document.getElementById("sudoku_grid").rows[i].cells;
  x[j].innerHTML = y;
}

// Checks if board config is valid (returns 1 if it is, 0 if it is not)
function is_valid(){
  var aa = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
  var bb = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
  var i, j, k, l;

  // Check rows and colunms
  for(i=0;i<9;i++){
    aa = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    bb = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    for(j=0;j<9;j++){
      // Check rows
      if(board[i][j]!=0){
        if(aa[board[i][j]]==-1) aa[board[i][j]] = 0;
        else return 0;
      }
      // Check colunms
      if(board[j][i]!=0){
        if(bb[board[j][i]]==-1) bb[board[j][i]] = 0;
        else return 0;
      }
    }
  }

  // Check 3x3 squares
  var idx = [0,3,6];
  for(i=0;i<3;i++){
    for(j=0;j<3;j++){
      aa = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
      for(k=0;k<3;k++){
        for(l=0;l<3;l++){
          if(board[idx[i]+k][idx[j]+l]!=0){
            if(aa[board[idx[i]+k][idx[j]+l]]==-1) aa[board[idx[i]+k][idx[j]+l]] = 0;
            else return 0;
          }
        }
      }
    }
  }

  return 1;

}//tinha board

function is_move_valid(i, j){ // tinha board
  var x = board[i][j];
  if(x == " ") return 1;
  // Check i-th row and j-th colunm
  for(var k=0;k<9;k++){
    if(k!=i && x==board[k][j]) return 0;
    if(k!=j && x==board[i][k]) return 0;
  }

  // Check 3x3 cell
  var k = Math.floor(i/3)*3;
  var l = Math.floor(j/3)*3;
  for(var q=0;q<3;q++){
    for(var h=0;h<3;h++){
      if(i!=k+q && j!=l+h && board[k+q][l+h]==x) return 0;
    }
  }
  return 1;
}

function solve_board(){
  var b = backtrack(0,0);
  if(b==0) alert("Não há solução :(");
  //if(b==1) alert("Encontrou solucao!");
  //else     alert("Nao encontrou solucao!");
}

function backtrack(i,j){
  if(i==9) return 1;
  var k = i + Math.floor((j+1)/9);
  var l = (j+1)%9;
  var b=0;

  if(board[i][j]==0){
    for(var a=1;a<=9;a++){
      board[i][j] = a;
      update_grid_element(i,j,board[i][j]);
      if(is_move_valid(i,j)){
        b = backtrack(k,l);
        //update_grid_element(i,j,board[i][j]);
      }
      if(b==1) return 1;
      else{
        board[i][j] = 0;
        update_grid_element(i,j,board[i][j]);
      }
    }
  }
  else{
    b = backtrack(k,l);
  }
  return b;
}

function zero_board(){
  for(var i=0;i<9;i++){
    if(!board[i]) board[i] = [];
    for(var j=0;j<9;j++){
      board[i][j] = 2-2;
    }
  }
  print_board();
}
