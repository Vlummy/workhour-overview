var interval;

function startTimer() {
    interval = setInterval(timer, 1000);
}

function timer() {
    var d = new Date();
    var t = d.toLocaleTimeString("en-GB");
    document.getElementById("currentState").innerHTML = 'You are now working: ' + t;
}

function myStopFunction() {
    var d = new Date();
    var t = d.toLocaleTimeString("en-GB");
    document.getElementById("currentState").innerHTML = 'You ended work: ' + t;
    clearInterval(interval);
}