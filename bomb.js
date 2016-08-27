
console.log("javascript running"); //this just checks if java is working;

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM loaded");

  var timerDivElement = document.getElementById('timerDiv');
  //this just checks if java is working;
  var seconds = 30; //this defines the starting time for the timer
  var second = 0; //this is required to match starting time - if starting time = second, bomb blows;
  var img_blue = document.getElementById('blue'); //just shortening the get element
  var img_green = document.getElementById('green'); //just shortening the get element
  var img_red = document.getElementById('red'); //just shortening the get element
  var img_white = document.getElementById('white'); //just shortening the get element
  var img_yellow = document.getElementById('yellow'); //just shortening the get element
  var bgImage = document.getElementById("unexploded"); //just shortening the get element
  var blankCutOrNot = [1, 1, 1, 1, 1]; //this creates the array containing the eventual blow up value in cutOrNot array
  var cutOrNot = []; //this array contains the values determining if a wire should be cut or not. value = 1, needs to be cut

  function setWires() {
    for (var i = 0; i < blankCutOrNot.length; i++) {
      if (Math.random(blankCutOrNot[i]) >= 0.5) {
        cutOrNot.push(blankCutOrNot[i] = 1);
      } else {
        cutOrNot.push(blankCutOrNot[i] =0);
      }
    }
  };
//function setWires creates a randomised value for each element in
//blackCutorNot value. if this value exceeds 0.5, then the wire is
//assigned 1 and that wire needs to be cut

  setWires();

  console.log(cutOrNot);

  img_blue.addEventListener("click", cutwire);
  img_green.addEventListener("click", cutwire);
  img_red.addEventListener("click", cutwire);
  img_white.addEventListener("click", cutwire);
  img_yellow.addEventListener("click", cutwire);
//events listeners above - e.g., once img_blue is click, function cutwire starts

  function cutwire (item) {
    var image = item.target;
    var wireColor = image.id;
//var image AND var wirecolor TOGETHER points to the element (
//e.g., img id="blue") clicked
    image.src = "img/cut-" + wireColor + "-wire.png";
    console.log(this.alt);
    var currentIndex = this.alt;
//the variable currentIndex above is made of the alt name of the image this (the element clicked)
    if (cutOrNot[currentIndex] === 0) {
      console.log('current index is ' + cutOrNot[currentIndex]);
      startExplosion();
//if the value of the number at cutOrNot at index of the image is 0, start the explosion
    };
    if (cutOrNot[currentIndex] === 1) {
      cutOrNot[currentIndex] = 0;
      if (allwirescut() === true) {
        clearInterval(interval);
//if the value of the number at cutOrNot at index of the image is 1,
//change the value of the cutOrNot at that index to be 0
//(game logic is if everything adds up to 0, you win/add correct wires cut),
//if all wires [that needs to be cut are] cut (allwirescut),
//stop interval running up second (starts at 0) to seconds (starts 30)
      }
    }
  }

  function allwirescut() {
//this function determines if all correct wires has been cut
    var arraySum = 0
    for (var i = 0; i < cutOrNot.length; i ++) {
        arraySum += cutOrNot[i]
    }
//the for loop above goes through the cutOrNot and adds their value up.
//If there is any wires that are uncut and needs to be cut, their value is 1
//so if all wires that need cutting are cut, total value should be 0
      if (arraySum === 0) {
        console.log('true');
        return true;
      } else {
        console.log('false');
        return false;
      }
//if value is 0, true that all wires are cut, if not, false
    }




  function startExplosion() {
    setTimeout(function() {
      var toExplosion = clearInterval(interval);
        bgImage.style.backgroundImage = "url('img/explosion.jpg')";
    }, 750);
  }
//the function above dictates that the change in background image
//and the stopage of the timer via clearInterval(interval)
//occurs 750ms after explosion process starts

  var interval = setInterval(function() {
      timerDivElement.firstChild.data =(seconds - second) + ' seconds';
      if (seconds <= second) {
        bgImage.style.backgroundImage = "url('img/explosion.jpg')";
        clearInterval(interval);
      }
      second++;
  }, 1000);
//the variable above starts the counter and populates the timer display (timerDiv)




});
