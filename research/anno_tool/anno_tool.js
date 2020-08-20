var canvas;
var ctx;
var control = {
  txt: [],
  pos: [],
  labels: [],
  downClick_x: 0,
  downClick_y: 0,
  find_downclick: false,
  upClick_x: 0,
  upClick_y: 0,
  find_upclick: false,
  last_label_idx: 0
}

// Variables to be replaced (these values will later be passed from the backend)
var idx = 0;
var tags = ["Nome", "matricula", "orgao", "status"]
var tag_colors = ["red", "blue", "green", "yellow", "black", "purple", ""]
var txt = [
  "Ola mundo, hoje esta um lindo dia. Vamos correr para o clube e jogar tenis. Nao tem nada melhor que atividade fisica em dia ensolarado.",
    "On July 15, 2020, between 20:00 and 22:00 UTC, a number of high-profile Twitter accounts, each with millions of followers, were compromised in a cyberattack to promote a bitcoin scam. The scam asked individuals to send bitcoin currency to a specific cryptocurrency wallet, with the promise that money sent would be doubled and returned. Based on sources speaking to Vice and TechCrunch, the perpetrators had gained access to Twitter's administrative tools so that they could alter the accounts themselves and post the tweets directly, with the access gained either possibly through paying off Twitter employees to use the tool, or from a compromised employee's account to access the tool directly.",
    "Perfect!!"
]

function init(){
    canvas = document.getElementById("board");
    canvas.addEventListener("mousedown", function(event){
      // Resets previous selected entity
      control.find_downclick = false
      control.find_upclick = false

      control.downClick_x = event.offsetX
      control.downClick_y = event.offsetY
      select_begin_entity()
    })
    canvas.addEventListener("mouseup", function(event){
      control.find_upclick = false
      if(control.find_downclick){
        control.upClick_x = event.offsetX
        control.upClick_y = event.offsetY
        select_end_entity()
        if(control.find_upclick) annotate_entity()
      }
    })
    window.addEventListener("keydown", function(event){
      key = event.code
      new_tag = Number(key[key.length - 1])
      if(0<=new_tag && 9>=new_tag && new_tag < tags.length){
        control.last_label_idx = new_tag
        ctx.globalAlpha = 0.3
        reprint_entities()
        // annotate_entity()
      }
    })
    canvas.width = 0.8*screen.width
    ctx = canvas.getContext("2d");
    ctx.font = "20px sans serif";
    ctx.fillText("Start annotation", canvas.width/2-ctx.measureText("Start annotation").width/2, canvas.height/2);
}

function load_next(){
  /*
  Input: chunk of text to be shown on canvas
  Output: canvas with text
  important variables: formated_txt (array of strings where each string fits just right in a line of the canvas)
                       positions (matrix[i][j] containing position x of the end of j-th word in i-th line)
  */
  var split_txt = txt[idx].split(" ")
  // idx++
  formated_txt = []
  positions = []
  var y = 20

  // Separate full text into chunks that fit the canvas
  var temp_string = ""
  var temp_position = []
  for(var i=0;i<split_txt.length;i++){
    if(ctx.measureText(temp_string+" "+split_txt[i]).width >= canvas.width){
      formated_txt.push(temp_string)
      temp_string = split_txt[i]
      positions.push(temp_position)
      temp_position = [ctx.measureText(temp_string).width]
    }
    else{
      if(i==0){
        temp_string = split_txt[i]
      }
      else{
        temp_string += " " + split_txt[i]
      }
      temp_position.push(ctx.measureText(temp_string).width)
    }
  }
  formated_txt.push(temp_string)
  positions.push(temp_position)

  // Create canvas with necessary height to acomodate all the text lines
  canvas.height = Math.max(formated_txt.length * 20 + 10, screen.height/2)
  ctx.font = "20px sans serif";
  // Print line-by-line on canvas
  for(var i=0;i<formated_txt.length;i++){
    ctx.fillText(formated_txt[i], 0, y);
    y += 20
  }

  // Save text and positions on the control variable
  control.pos = positions
  control.txt = formated_txt
  control.labels = new Array(control.pos.length)
  for(var i=0;i<control.pos.length;i++){
    control.txt[i] = control.txt[i].split(" ")
    temp = new Array(control.pos[i].length)
    for(var j=0;j<control.pos[i].length;j++){
      temp[j] = "O"
    }
    control.labels[i] = temp
  }
}

function reload_text(){
  /*
  Input: chunk of text to be shown on canvas
  Output: canvas with text
  important variables: formated_txt (array of strings where each string fits just right in a line of the canvas)
                       positions (matrix[i][j] containing position x of the end of j-th word in i-th line)
  */
  var split_txt = txt[idx].split(" ")
  // idx++
  formated_txt = []
  positions = []
  var y = 20

  // Separate full text into chunks that fit the canvas
  var temp_string = ""
  var temp_position = []
  for(var i=0;i<split_txt.length;i++){
    if(ctx.measureText(temp_string+" "+split_txt[i]).width >= canvas.width){
      formated_txt.push(temp_string)
      temp_string = split_txt[i]
      positions.push(temp_position)
      temp_position = [ctx.measureText(temp_string).width]
    }
    else{
      if(i==0){
        temp_string = split_txt[i]
      }
      else{
        temp_string += " " + split_txt[i]
      }
      temp_position.push(ctx.measureText(temp_string).width)
    }
  }
  formated_txt.push(temp_string)
  positions.push(temp_position)

  // Create canvas with necessary height to acomodate all the text lines
  canvas.height = Math.max(formated_txt.length * 20 + 10, screen.height/2)
  ctx.font = "20px sans serif";
  // Print line-by-line on canvas
  for(var i=0;i<formated_txt.length;i++){
    ctx.fillText(formated_txt[i], 0, y);
    y += 20
  }
}

function reprint_entities(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  reload_text()
  return
  var start_entity_x=-1, start_entity_y=-1, last_entity_tag="O"
  for(var i=0;i<control.pos.length;i++){
    for(var j=0;j<control.pos[i].length;j++){
      if(last_entity_tag != control.labels[i][j]){
        if(last_entity_tag != "O"){
          for(var k=0;k<tags;k++){
            if(last_entity_tag == "I-" + tags[control.last_label_idx]) last_label_idx = k
          }
          ctx.globalAlpha = 0.3
          if(j==0) print_background(start_entity_x, start_entity_y, i-1, control.txt[i-1].length-1)
          else     print_background(start_entity_x, start_entity_y, i, j-1)
        }
        if(control.labels[i][j] != "O"){
          last_entity_tag = control.labels[i][j]
          if(control.labels[i][j][0] == "B") last_entity_tag = last_entity_tag.replace("B", "I")
          start_entity_x = j
          start_entity_y = i
        }
      }
    }
  }
}

function select_begin_entity(){
  // control.find_downclick = false
  var y = Math.round(control.downClick_y/20) - 1
  if(control.pos.length < y){
    console.log("Sem texto aqui")
    return
  }
  // Look for selected word on y-th row of control.pos
  for(var x=0;x<control.pos[y].length;x++){
    if(control.pos[y][x] < control.downClick_x) continue
    else{
      console.log("downclick:", control.txt[y][x])
      control.downClick_x = x
      control.downClick_y = y
      control.find_downclick = true
      return
    }
  }
}

function select_end_entity(){
  // control.find_upclick = false
  var y = Math.round(control.upClick_y/20) - 1
  var x
  if(control.pos.length < y){
    y = control.pos.length-1
    x = control.pos[y].length-1
    console.log("upclick:", control.txt[y][x])
  }
  else{
    // Look for selected word on y-th row of control.pos
    for(x=0;x<control.pos[y].length;x++){
      if(control.pos[y][x] < control.upClick_x) continue
      else{
        console.log("upclick:", control.txt[y][x])
        control.upClick_x = x
        control.upClick_y = y
        control.find_upclick = true
        return
      }
    }
  }
}

function annotate_entity(){
  // Change labels on control.labels
  label_notation = "B-" + tags[control.last_label_idx]
  if(control.find_downclick && control.find_upclick){
    var x0, x1, y0, y1
    if(control.upClick_y > control.downClick_y){
      y0 = control.downClick_y
      x0 = control.downClick_x
      y1 = control.upClick_y
      x1 = control.upClick_x
    }
    else if(control.upClick_y < control.downClick_y){
      y0 = control.upClick_y
      x0 = control.upClick_x
      y1 = control.downClick_y
      x1 = control.downClick_x
    }
    else{
      y0 = control.upClick_y
      y1 = control.downClick_y
      x0 = Math.min(control.downClick_x, control.upClick_x)
      x1 = Math.max(control.downClick_x, control.upClick_x)
    }
    while(y0!=y1 || x0!=x1){
      control.labels[y0][x0] = label_notation
      label_notation = "I-" + tags[control.last_label_idx]
      x0 = (x0+1)%control.labels[y0].length
      if(x0==0) y0++
    }
    control.labels[y1][x1] = label_notation
  }

  // Change background color
  ctx.globalAlpha = 0.3
  var x0, x1, y0, y1
  if(control.upClick_y > control.downClick_y){
    y0 = control.downClick_y
    x0 = control.downClick_x
    y1 = control.upClick_y
    x1 = control.upClick_x
  }
  else if(control.upClick_y < control.downClick_y){
    y0 = control.upClick_y
    x0 = control.upClick_x
    y1 = control.downClick_y
    x1 = control.downClick_x
  }
  else{
    y0 = control.upClick_y
    y1 = control.downClick_y
    x0 = Math.min(control.downClick_x, control.upClick_x)
    x1 = Math.max(control.downClick_x, control.upClick_x)
  }
  // Variables to control background painting of new entity
  print_background(x0, y0, x1, y1)
}

function print_background(x0, y0, x1, y1){
  if(y0 == y1){
    if(x0!=0) x0 = control.pos[y0][x0-1] + ctx.measureText(" ").width
    ctx.fillStyle = tag_colors[control.last_label_idx]
    ctx.fillRect(x0, y0*20, control.pos[y0][x1]-x0, 20)
  }
  else{
    for(var i=y0;i<=y1;i++){
      // Set fill_x
      if(x0==0 || i!=y0) fill_x = 0
      else fill_x = control.pos[i][x0-1]
      // Set fill_y
      fill_y = 20*i
      // Set fill_width
      if(i==y1)fill_width = control.pos[i][x1]
      else fill_width = canvas.width
      // Set fill_height
      fill_height = 20
      // Print background
      ctx.fillStyle = tag_colors[control.last_label_idx]
      ctx.fillRect(fill_x, fill_y, fill_width, fill_height)
    }
  }
}
