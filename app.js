














let intervalId; 
let isRunning = false; 

function flipNumber(el, newnumber) {
  var thistop = el.find(".top").clone();
  var thisbottom = el.find(".bottom").clone();
  thistop.addClass("new");
  thisbottom.addClass("new");
  thisbottom.find(".text").text(newnumber);
  el.find(".top").after(thistop);
  el.find(".top.new").append(thisbottom);
  el.addClass("flipping");
  el.find(".top:not(.new)").find(".text").text(newnumber);
  setTimeout(function () {
    el.find(".bottom:not(.new)").find(".text").text(newnumber);
  }, 500);
}



function setTime() {
  $(".flipper").removeClass("flipping");
  $(".flipper .new").remove();
  var date = new Date();
  var seconds = date.getSeconds().toString().padStart(2, '0');
  var minutes = date.getMinutes().toString().padStart(2, '0');
  var hour = date.getHours();
  if (hour > 12) {
    hour = hour - 12;
  }
  if (hour == 0) {
    hour = 12;
  }
  hour = hour.toString().padStart(2, '0');

  if ($(".clock .flipper:nth-child(1) .text").text() !== hour) {
    flipNumber($(".clock .flipper:nth-child(1)"), hour);
  }
  if ($(".clock .flipper:nth-child(2) .text").text() !== minutes) {
    flipNumber($(".clock .flipper:nth-child(2)"), minutes);
  }
  if ($(".clock .flipper:nth-child(3) .text").text() !== seconds) {
    flipNumber($(".clock .flipper:nth-child(3)"), seconds);
  }
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    intervalId = setInterval(setTime, 1000); 
    $("#start-btn").hide();
    $("#pause-btn").show();
    $("#reset-btn").show();
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(intervalId); 
    isRunning = false;
    $("#pause-btn").hide();
    $("#start-btn").show();
  }
}

function resetTimer() {
  clearInterval(intervalId); 
  isRunning = false;
  $(".clock .flipper .text").text('00'); 
  $("#start-btn").show();
  $("#pause-btn").hide();
  $("#reset-btn").hide();
}

$(document).ready(function () {
  $("#start-btn").on('click', startTimer);
  $("#pause-btn").on('click', pauseTimer);
  $("#reset-btn").on('click', resetTimer);
});


