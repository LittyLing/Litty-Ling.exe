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
var circleThickness = canvas.width/20;
var circleRadius = canvas.width/3.265;
var circleInitAngle = 5.18;
var circleEndAngle = -0.765;
var circleLen = 0;
var step = -0.1;

var renderDot = false;

// update function
function tick() {
	render();

	// animate logo
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
		ctx.arc(canvas.width/2 + canvas.width/5.479, canvas.height/2 - canvas.width/4.061, canvas.width/34.783, 0, Math.PI * 2, true);
		ctx.fill();
	}
}

window.onload = function() {
	render();

	setTimeout(function() {
		tick();
	}, 1000);
}