var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height/2;
var dx = 2;
var dy = -2;

function getArea(r){
	return Math.pow(r, 2) * Math.PI;
}
function getRadius() {
	return Number(document.getElementById('radius').value);
}

function drawBall() {
	var radius = Number(document.getElementById('radius').value);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fillStyle = "#0033A0";
    ctx.fill();
    ctx.closePath();
    x += dx;
    y += dy;	
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;
}

function btnClick() {
	var areaEle = document.getElementById('area');
	areaEle.innerText = getArea(getRadius()).toFixed(2);
}

document.getElementById('goBtn').addEventListener('click', function() {
	btnClick();
})

document.getElementById('goBtn').addEventListener('click', function() {
	setInterval(draw, 10);
});

