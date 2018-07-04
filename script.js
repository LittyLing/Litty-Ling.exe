// paced graphics function
(function() {
	var requestAnimationFrame = window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
});

// canvas settings
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.5;
canvas.height = canvas.width

// basic variables
var fps = 60;

// image
var img = new Image();
img.src = "Images/Incomplete Logo.png";
//img.src = "Images/Logo.png";

// circle properties
var circleColor = "#00b0ffff";
var circleThickness = 40;
var circleRadius = 245;
var circleInitAngle = 5.18;
var circleEndAngle = -0.765;
var circleLen = 0;
var step = -0.1;

var renderDot = false;

// update function
function tick() {
	render();

	if (circleLen > circleEndAngle - circleInitAngle - step) {
		circleLen += step;
	} else {
		circleLen = circleEndAngle - circleInitAngle;

		setTimeout(function() {
			renderDot = true;
		}, 100);
	}

	setTimeout(function() {
		requestAnimationFrame(tick);
	}, 1000/fps);
}

// render function
function render() {
	// test background
	ctx.fillStyle = "red";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// image background
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

	// logo completion
	ctx.strokeStyle = circleColor;
	ctx.lineWidth = circleThickness;
	ctx.beginPath();
	ctx.arc(canvas.width/2, canvas.height/2, circleRadius, circleInitAngle, circleInitAngle + circleLen, true);
	ctx.stroke();

	if (renderDot) {
		ctx.fillStyle = circleColor;
		ctx.beginPath();
		ctx.arc(canvas.width/2 + 146, canvas.height/2 - 197, 23, 0, Math.PI * 2, true);
		ctx.fill();
	}
}

window.onload = function() {
	render();
}

window.onclick = function() {
	tick();
}