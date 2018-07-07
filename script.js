// paced graphics function
(function() {
	var requestAnimationFrame = window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
});

// canvas settings
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.4;
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
var step = 0;
var stepAccel = -0.007;

var renderDot = false;
var dotAlpha = 0;
var dotStep = 0.2;

// update function
function tick() {
	render();

	// animate logo
	if (circleLen > circleEndAngle - circleInitAngle - step) {
		circleLen += step;

		if (circleLen > (circleEndAngle - circleInitAngle - step)/2) {
			step += stepAccel
		} else {
			step -= stepAccel/2;
		}
	} else {
		circleLen = circleEndAngle - circleInitAngle;

		setTimeout(function() {
			renderDot = true;
		}, 200);
	}

	setTimeout(function() {
		requestAnimationFrame(tick);
	}, 1000/fps);
}

// render function
function render() {
	// test background
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.save();

	if (renderDot) {
		ctx.globalAlpha = dotAlpha;

		// image background
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

		if (dotAlpha < 1) {
			dotAlpha += dotStep;
		} else {
			dotAlpha = 1;
		}

		// dot
		ctx.fillStyle = circleColor;
		ctx.beginPath();
		ctx.arc(canvas.width/2 + canvas.width/5.479, canvas.height/2 - canvas.width/4.061, canvas.width/34.783, 0, Math.PI * 2, true);
		ctx.fill();

		// text
		ctx.font = canvas.height/10 + "px arial";
		ctx.textAlign = "center";
		ctx.fillText("Litty Ling Productions", canvas.width/2, canvas.height - canvas.height/15);
	}

	ctx.restore();

	// logo completion
	ctx.strokeStyle = circleColor;
	ctx.lineWidth = circleThickness;
	ctx.beginPath();
	ctx.arc(canvas.width/2, canvas.height/2, circleRadius, circleInitAngle, circleInitAngle + circleLen, true);
	ctx.stroke();
}

window.onload = function() {
	render();

	setTimeout(function() {
		tick();
	}, 1000);
}