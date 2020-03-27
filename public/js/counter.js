console.log("JS INITIATED");

cases = document.getElementById("cases").innerHTML
recov = document.getElementById("recov").innerHTML
deaths = document.getElementById("deaths").innerHTML

function animateValue(id, start, end, duration) {
    var obj = document.getElementById(id);
    var range = end - start;
    var minTimer = 50;
    var stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);

    var startTime = new Date().getTime();
    var endTime = startTime + duration;
    var timer;

    function run() {
        var now = new Date().getTime();
        var remaining = Math.max((endTime - now) / duration, 0);
        var value = Math.round(end - (remaining * range));
        obj.innerHTML = value;
        if (value == end) {
            clearInterval(timer);
        }
    }

    timer = setInterval(run, stepTime);
    run();
}

animateValue("cases", 0, cases, 1500);
animateValue("recov", 0, recov, 1500);
animateValue("deaths", 0, deaths, 1500);
