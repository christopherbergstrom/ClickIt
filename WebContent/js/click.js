var body = document.querySelector("body");
var play;
var scoresBtn;
var instructionsBtn;
var number = 30;
var buttonsDiv = document.getElementById("buttonsDiv");
var gameDiv = document.getElementById("gameDiv");
var extrasDiv = document.getElementById("extrasDiv");
var score;
var time;
var points = 0;
var whichTile;
var theColor;
var timer;
var end;
var tilesDiv;
var enter;
var again;
var table;
var audio = document.getElementById("audio");
var count = 4;
window.onload = function()
{
  createButtons();
};
function createButtons()
{
  play = document.createElement("button");
  play.setAttribute("class", "buttons");
  play.innerHTML="Play";
  play.addEventListener("click", function()
  {
    console.log("in play");
    // clearInterval(time);
    removeButtons();
    countdown();
    window.setTimeout(function(){startGame();}, 3000);
  });
  buttonsDiv.appendChild(play);
  scoresBtn = document.createElement("button");
  scoresBtn.setAttribute("class", "buttons");
  scoresBtn.innerHTML="High Scores";
  scoresBtn.addEventListener("click", function()
  {
    console.log("in scores");
    table = document.getElementById("table");
    if(table)
    {
      table.parentNode.removeChild(table);
    }
    instructions = document.getElementById("instructions");
    if(instructions)
    {
      instructions.parentNode.removeChild(instructions);
    }
    getScores(scores);
  });
  buttonsDiv.appendChild(scoresBtn);
  instructionsBtn = document.createElement("button");
  instructionsBtn.setAttribute("class", "buttons");
  instructionsBtn.innerHTML="Instructions";
  instructionsBtn.addEventListener("click", function()
  {
    console.log("in instructions");
    table = document.getElementById("table");
    if(table)
    {
      table.parentNode.removeChild(table);
    }
    instructionsText = document.getElementById("instructions");
    if(instructionsText)
    {
      instructionsText.parentNode.removeChild(instructionsText);
    }
    var instructionsText = document.createElement("p");
    instructionsText.setAttribute("id", "instructions");
    instructionsText.innerHTML = "Click the colored circle as many times as you can in 30 seconds. When the time runs out the game is over.";
    body.appendChild(instructionsText);
  });
  buttonsDiv.appendChild(instructionsBtn);
}
function removeButtons()
{
  table = document.getElementById("table");
  if(table)
  {
    table.parentNode.removeChild(table);
  }
  instructions = document.getElementById("instructions");
  if(instructions)
  {
    instructions.parentNode.removeChild(instructions);
  }
  play.parentNode.removeChild(play);
  scoresBtn.parentNode.removeChild(scoresBtn);
  instructionsBtn.parentNode.removeChild(instructionsBtn);
}
function countdown()
{
  var startingNumbers = document.createElement("p");
  startingNumbers.setAttribute("id", "startingNumbers");
  startingNumbers.innerHTML = "3";
  body.appendChild(startingNumbers);
  window.setTimeout(function(e){startingNumbers.innerHTML = "2";}, 1000);
  window.setTimeout(function(e){startingNumbers.innerHTML = "1";}, 2000);
  window.setTimeout(function(e){startingNumbers.parentNode.removeChild(startingNumbers);}, 3000);
}
function startGame()
{
  console.log("in start game");
  createScoreTime();
  divs();
  randomTile();
  startTime();
}
function createScoreTime()
{
  score = document.createElement("div");
  score.innerHTML="Points: "+points;
  extrasDiv.appendChild(score);
  time = document.createElement("div");
  time.innerHTML="Time: "+number;
  extrasDiv.appendChild(time);
}
function startTime()
{
  timer = setInterval(function()
  {
    number --;
    time.innerHTML="Time: "+number;
    if (number <= 0)
    {
      gameOver();
      stopTime();
    }
  }, 1000);
}
function stopTime()
{
  window.setTimeout(function(e){clearInterval(timer)}, 0);
}
function gameOver()
{
  // body.appendChild(end);
  // gameDiv.appendChild(end);
}
function gameOver()
{
  console.log("in game over");
  tilesDiv.parentNode.removeChild(tilesDiv);
  end = document.createElement("h1");
  end.setAttribute("id", "end");
  end.innerHTML = "Game Over";
  extrasDiv.appendChild(end);
  score.innerHTML="Final Points: "+points;
  popLetters();
  enter = document.createElement("button");
  enter.setAttribute("class", "buttons");
  enter.innerHTML = "Enter Score";
  enterScoreDiv.appendChild(enter);
  enter.addEventListener("click", function()
  {
    var fi = document.getElementById("select0");
    var mi = document.getElementById("select1");
    var li = document.getElementById("select2");
    if (typeof(Storage) !== "undefined") 
    {
        if (localStorage.fI) 
            localStorage.fI = fi.value;
        else 
            localStorage.fI = fi.value;
        if (localStorage.mI) 
        	localStorage.mI = mi.value;
        else 
        	localStorage.mI = mi.value;
        if (localStorage.lI) 
        	localStorage.lI = li.value;
        else 
        	localStorage.lI = li.value;
	}
    var letters = fi.value+mi.value+li.value;
//    console.log(letters);
    var obj = {initials:letters, score:points};
    updateData("PUT", "rest/score", obj);
    enter.parentNode.removeChild(enter);
    window.setTimeout(function(e){getScores(scores)}, 500);
    fi.parentNode.removeChild(fi);
    mi.parentNode.removeChild(mi);
    li.parentNode.removeChild(li);
  });
  again = document.createElement("button");
  again.setAttribute("class", "buttons");
  again.innerHTML = "Play Again";
  enterScoreDiv.appendChild(again);
  again.addEventListener("click", function()
  {
    location.reload();
  });
}
function popLetters()
{
  for (var i = 0; i < selects.length; i++)
  {
    var select = document.createElement("select");
    select.setAttribute("id", "select"+[i]);
    select.setAttribute("class", "buttons");
    for (var j = 0; j < characters.length; j++)
    {
      var option = document.createElement("option");
      option.innerHTML = characters[j].character;
      if (typeof(Storage) !== "undefined") 
      {
    	  if (i === 0)
    	  {    		  
    		  if (localStorage.fI)
    		  {    			  
    			  if (localStorage.fI === option.innerHTML)
    				  option.selected = true;
    		  }
    	  }
    	  else if (i === 1)
    	  {    		  
    		  if (localStorage.mI)
    		  {    			  
    			  if (localStorage.mI === option.innerHTML)
    				  option.selected = true;
    		  }
    	  }
    	  else if (i === 2)
    	  {    		  
    		  if (localStorage.lI)
    		  {    			  
    			  if (localStorage.lI === option.innerHTML)
    				  option.selected = true;
    		  }
    	  }
      }
      select.appendChild(option);
    }
    enterScoreDiv.appendChild(select);
  }
}
var selects = [
    { name: 'fI'},
    { name: 'mI'},
    { name: 'lI'}
];
var characters = [
    { character: 'A'},
    { character: 'B'},
    { character: 'C'},
    { character: 'D'},
    { character: 'E'},
    { character: 'F'},
    { character: 'G'},
    { character: 'H'},
    { character: 'I'},
    { character: 'J'},
    { character: 'K'},
    { character: 'L'},
    { character: 'M'},
    { character: 'N'},
    { character: 'O'},
    { character: 'P'},
    { character: 'Q'},
    { character: 'R'},
    { character: 'S'},
    { character: 'T'},
    { character: 'U'},
    { character: 'V'},
    { character: 'W'},
    { character: 'X'},
    { character: 'Y'},
    { character: 'Z'},
    { character: '0'},
    { character: '1'},
    { character: '2'},
    { character: '3'},
    { character: '4'},
    { character: '5'},
    { character: '6'},
    { character: '7'},
    { character: '8'},
    { character: '9'},
];
function randomTile()
{
  whichTile = Math.floor(Math.random()*99);
  var random = document.getElementById(whichTile);
  random.style.backgroundColor = whichColor();
  random.style.transition = ".5s linear";
  random.style.opacity = "1";
  random.style.cursor="pointer";
  random.addEventListener("click", function click()
  {
	points ++;
	count ++;
	score.innerHTML="Points: "+points;
	audio.play();
	this.style.transition = ".5s linear";
	this.style.opacity = "0";
	if (count % 4 === 0)
	{
		randomTile();	
		randomTile();
	}
	else
	{		
		randomTile();
	}
	random.style.cursor="auto";
	random.removeEventListener("click", click);
  });
}
function whichColor()
{
  theColor = Math.floor(Math.random()*9);
  if (theColor === 0)
    return "#0000ff";
  else if (theColor === 1)
    return "#ff0000";
  else if (theColor === 2)
    return "#ffff00";
  else if (theColor === 3)
    return "#ff9900";
  else if (theColor === 4)
    return "#ff3399";
  else if (theColor === 5)
    return "#990099";
  else if (theColor === 6)
    return "#00ff00";
  else if (theColor === 7)
    return "#000000";
  else if (theColor === 8)
	  return "#ffffff";
}
function click()
{
  // document.getElementById(x).setAttribute("class", "tiles");
  // document.getElementById(x).removeEventListener("click", click);
  points ++;
  score.innerHTML="Points: "+points;
  audio.play();
  // score.innerHTML--;
  this.style.transition = ".5s linear";
  this.style.opacity = "0";
//  var wait4 = setTimeout(function()
//  {
//	  
//  }, 500);
//  tilesDiv.parentNode.removeChild(tilesDiv);
//  divs();
  randomTile();
}
function divs()
{
  tilesDiv = document.createElement("div");
  tilesDiv.setAttribute("id", "tilesDiv");
  gameDiv.appendChild(tilesDiv);
  var idType;
  for (var j = 0; j < 10; j++)
  {
    var classType = "tiles ";
    if (j === 0)
    {
      classType += " oneH ";
    }
    if (j === 1)
    {
      classType += " twoH ";
    }
    if (j === 2)
    {
      classType += " threeH ";
    }
    if (j === 3)
    {
      classType += " fourH ";
    }
    if (j === 4)
    {
      classType += " fiveH ";
    }
    if (j === 5)
    {
      classType += " sixH ";
    }
    if (j === 6)
    {
      classType += " sevenH ";
    }
    if (j === 7)
    {
      classType += " eightH ";
    }
    if (j === 8)
    {
      classType += " nineH ";
    }
    if (j === 9)
    {
      classType += " tenH ";
    }
    for (var i = 0; i < 10; i++)
    {
      var classTypeFinal = classType;
      var tile = document.createElement("div");
      if (i === 0)
      {
        idType = whichId(j, i);
        tile.setAttribute("id", idType);
        classTypeFinal += " oneW";
        tile.setAttribute("class", classTypeFinal);
      }
      if (i === 1)
      {
        idType = whichId(j, i);
        tile.setAttribute("id", idType);
        classTypeFinal += " twoW";
        tile.setAttribute("class", classTypeFinal);
      }
      if (i === 2)
      {
        idType = whichId(j, i);
        tile.setAttribute("id", idType);
        classTypeFinal += " threeW";
        tile.setAttribute("class", classTypeFinal);
      }
      if (i === 3)
      {
        idType = whichId(j, i);
        tile.setAttribute("id", idType);
        classTypeFinal += " fourW";
        tile.setAttribute("class", classTypeFinal);
      }
      if (i === 4)
      {
        idType = whichId(j, i);
        tile.setAttribute("id", idType);
        classTypeFinal += " fiveW";
        tile.setAttribute("class", classTypeFinal);
      }
      if (i === 5)
      {
        idType = whichId(j, i);
        tile.setAttribute("id", idType);
        classTypeFinal += " sixW";
        tile.setAttribute("class", classTypeFinal);
      }
      if (i === 6)
      {
        idType = whichId(j, i);
        tile.setAttribute("id", idType);
        classTypeFinal += " sevenW";
        tile.setAttribute("class", classTypeFinal);
      }
      if (i === 7)
      {
        idType = whichId(j, i);
        tile.setAttribute("id", idType);
        classTypeFinal += " eightW";
        tile.setAttribute("class", classTypeFinal);
      }
      if (i === 8)
      {
        idType = whichId(j, i);
        tile.setAttribute("id", idType);
        classTypeFinal += " nineW";
        tile.setAttribute("class", classTypeFinal);
      }
      if (i === 9)
      {
        idType = whichId(j, i);
        tile.setAttribute("id", idType);
        classTypeFinal += " tenW";
        tile.setAttribute("class", classTypeFinal);
      }
      // tile.addEventListener("click", function()
      // {
      //   score.innerHTML--;
      // });
      tilesDiv.appendChild(tile);
//       gameDiv.appendChild(tile);
    }
  }
}
function whichId(j, i)
{
  var first = String(j);
  var second = String(i);
  if (first === "0")
  {
    idType = second;
    return idType;
  }
  else
  {
    idType = first+second;
    return idType;
  }
}
var getScores = function(callback)
{
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "rest/getScores");
  // console.log(xhr.status);
  // console.log(xhr.getAllResponseHeaders());
  xhr.onreadystatechange = function()
  {
    // console.log(xhr.status);
    // console.log(xhr.getAllResponseHeaders());
    if (xhr.readyState == 4 && xhr.status < 400)
    {
      var scores = JSON.parse(xhr.responseText);
      callback(scores);
    }
  };
  xhr.send(null);
};
function scores(scores)
{
  var body = document.querySelector("body");
  var table = document.createElement("table");
  table.setAttribute("id", "table");
  var tr = document.createElement("tr");
  var th = document.createElement("th");
  th.innerHTML = "Initials";
  tr.appendChild(th);
  var th = document.createElement("th");
  th.innerHTML = "Score";
  tr.appendChild(th);
  table.appendChild(tr);

  for (var i = 0; i < scores.length; i++)
  {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.innerHTML = scores[i].initials;
    tr.appendChild(td);
    var td = document.createElement("td");
    td.innerHTML = scores[i].score;
    tr.appendChild(td);
    table.appendChild(tr);
  }
  body.appendChild(table);
}
function updateData(method, url, object, callback)
{
    var xhr = new XMLHttpRequest();
    xhr.open(method,url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange=function ()
    {
        // console.log(xhr.status);
        // console.log(xhr.readyState);
        // console.log(xhr.responseText);
        // console.log(xhr.getAllResponseHeaders());
    }
    if (object)
    {
        xhr.send(JSON.stringify(object));
    }
    else
    {
        xhr.send(null);
    }
}
