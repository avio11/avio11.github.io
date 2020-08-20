// Define if NN has convolutional layer
const conv_net = 0;

// Variables that define number of rows and colunms of the matrix (field)
const ROW = 28;
const COL = 28;

// Define colors for initial position(white), final position(yellow), blocked path(black) and free path(light blue)
var colors = ["white", "black"];

// Loading MNIST model
var input = [];

function init_page(){
  load_model();
  // Get table element
  field = document.getElementById("field");
  // Create rows
  var row = [];
  var cel = [];
  for(var a = 0; a < ROW ; a++){
    row[a] = field.insertRow(a);
    cel[a] = new Array(COL);
    input[a] = new Array(COL);
    for(var b = 0; b < COL; b++){
      cel[a][b] = row[a].insertCell(b);
    }
  }

  // Event to clear/block paths with mouse over event
  field.addEventListener('mouseover', (event) => {

    var td = event.target.closest("td");
    if(event.altKey){
      td.style.backgroundColor = colors[1];
    }
  })
}

async function load_model(){
  tf.loadLayersModel('MNIST_model/model.json').then(function(model) {
    window.model = model;
  });
}

// Resets field to initial configuration
function reset_field(){
  for(var i=0;i<ROW;i++){
    for(var j=0;j<COL;j++){
      var aux = document.getElementById("field").rows[i].cells;
      aux[j].style.backgroundColor = colors[0];
    }
  }
}

function classify(){
  for(var a=0;a<ROW;a++){
    for(var b=0;b<COL;b++){
      if(field.rows[a].cells[b].style.backgroundColor == colors[1]) input[a][b] = 1;
      else input[a][b] = 0;
    }
  }

  // if(conv_net == 0){
    console.log("MLP");
    var tf_input = [];
    tf_input[0] = input;
    tf_input = tf.tensor(tf_input);
    tf_pred = window.model.predict(tf_input);
  // }
  // else{
  //   console.log("conv_net");
  //   var conv_input = [];
  //   conv_input[0] = input;
  //   for(var a=0;a<28;a++){
  //     for(var b=0;b<28;b++){
  //       conv_input[0][a][b] = new Array(1);
  //     }
  //   }
  //   conv_input = tf.tensor(conv_input);
  //   tf_pred = window.model.predict(conv_input);
  // }


  pred = tf_pred.argMax(1).arraySync();
  conf = tf.gather(tf.gather(tf_pred, 0), pred).arraySync();
  //console.log(conf);
  var str = "Prediction: ";
  document.getElementById("prediction_text").innerHTML = str.concat(pred.toString());
  str = "Confidence: ";
  document.getElementById("confidence_text").innerHTML = str.concat(conf.toString());
}
