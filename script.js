// y/x = 0 x  - - - - - - - >
// y
// |
// |
// |
// |
// |
// |
// V
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height/2;
var dx = 2;
var dy = -2;
var inter = 1000;

function getArea(r){
	return Math.pow(r, 2) * Math.PI;
}
function getRadius() {
	return Number(document.getElementById('radius').value);
}

function drawBall() { //function to draw ball each time setInterval iterates
	var radius = Number(document.getElementById('radius').value);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fillStyle = "#0033A0";
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

function draw() { //function setInterval runs each time.
	ctx.clearRect(0, 0, canvas.width, canvas.height); //clears canvas to create movement via drawings
    drawBall();
    x += dx; // increases x cordinates (gives direction)
    y += dy; // increases y cordinates (gives direction)
}

function btnClick() {
	var areaEle = document.getElementById('area');
	areaEle.innerText = getArea(getRadius()).toFixed(2);
}

document.getElementById('goBtn').addEventListener('click', function() {
	btnClick();
})

document.getElementById('goBtn').addEventListener('click', function() {
	setInterval(draw, inter);
});

