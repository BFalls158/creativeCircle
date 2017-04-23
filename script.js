(function(){

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var x = canvas.width/2; //start centered on x axis
var y = canvas.height/2; // start centered on y-axis
var dx = 2; // used to ammend x, creates movement
var dy = -2; // used to ammend y, creates movement
var inter = 10; // how often the draw funciton is ran, lower numbers speed up ball
var Circle = function(x, y, radius) { // Object constructor to make circle object w/ diminsions
    this.left = x - radius;
    this.top = y - radius;
    this.right = x + radius;
    this.bottom = y + radius;
};
var scoreSpan = document.getElementById('score');
var score = 0;

// function declarations
function playSound() {
  var sound = document.getElementById("audio");
  sound.play();
}

function getArea(r){
	return Math.pow(r, 2) * Math.PI;
}

function getRadius() {
	return Number(document.getElementById('radius').value);
}

function drawBall() { //function to draw ball each time setInterval iterates
	var radius = getRadius();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fillStyle = "#0ead00";
    ctx.fill();
    ctx.closePath();

    x += dx;
    y += dy;
    if(x + dx > canvas.width-radius || x + dx < radius) { // change direction of ball if it reaches sides
    dx = -dx;
}

	if(y + dy > canvas.height-radius || y + dy < radius) { // change direction of ball if it reaches bottom/top
	    dy = -dy;
	}	
}

//function setInterval runs each time. redraws circle to show movement.
function draw() { 
	ctx.clearRect(0, 0, canvas.width, canvas.height); //clears canvas to create movement via drawings
    drawBall();
    x += dx; // increases x cordinates (gives direction)
    y += dy; // increases y cordinates (gives direction)
}

// function to add innerText displaying circle area
function btnClick() { 
	var areaEle = document.getElementById('area');
	areaEle.innerText = getArea(getRadius()).toFixed(2);
	document.getElementById('radius').setAttribute('disabled', 'disabled');
	document.getElementById('goBtn').style.display = 'none';
	document.getElementById('reset').style.display = 'inline';
}

//Resets gamestate.
function reset() {
	location.reload();
}

//Event listeners

//Prevents text highlighting during clicking
document.body.onselectstart = function() { 
	return false; 
};

//Prevents input of non-numeric keys in form
document.getElementById('radius').addEventListener("keypress", function (e) {
    if (e.which < 48 || e.which > 57) {
        e.preventDefault();
    }
});

//Starts game
document.getElementById('goBtn').addEventListener('click', function() {
	btnClick();
	setInterval(draw, inter);
});

//Also starts game Works on enter press
document.getElementById('radius').addEventListener('keyup', function(e) {
	if (e.keyCode == 13){
	document.getElementById('goBtn').click();
	};
});

//On-click handler that resets page's gamestate.
document.getElementById('reset').addEventListener('click', function() {
	reset();
});

document.getElementById('myCanvas').addEventListener('click', function(e) {
	var clickedX = e.pageX - this.offsetLeft; //Determine click location, canvas position offset by distance from edge of page
	var clickedY = e.pageY - this.offsetTop;
	var circle = new Circle(x, y, getRadius());
	var randomDir = Math.floor(Math.random() * 4); //random number used to determine new direction
	if (clickedX < circle.right && clickedX > circle.left && clickedY > circle.top && clickedY < circle.bottom) {
		playSound();
		scoreSpan.innerText = ++score; // Add 1 to click total on click
		if (score > 19) {
			alert('Congratulations! You win!');
			reset();
		};
		dy *= 1.1; // Increase speed of ball
		dx *= 1.1; // Increase speed of ball
		 // Logic for directional change on ball click
		if (randomDir === 0) {
			dx = -dx;
		} else if(randomDir === 1) {
			dy = -dy;
		} else if(randomDir === 2) {
			dx = -dx;
			dy = -dy;
		} else {
			// Do nothing
		};
	};
});
}());