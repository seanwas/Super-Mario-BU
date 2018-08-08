// The below audio files were downloaded from http://www.realmofdarkness.net
// Audio Files 
var level1 = new Audio("snd/level1.mp3");
var smash = new Audio("snd/smash.mp3");
var coin = new Audio("snd/coin.mp3");
var levelclear = new Audio("snd/levelclear.mp3");
var dead = new Audio("snd/dead.mp3");
var jump = new Audio("snd/jump.mp3");
var pipe = new Audio("snd/pipe.mp3");
var hit = new Audio("snd/hit.mp3");
var ending = new Audio("snd/ending.mp3");



//Additional audio sttings
level1.loop = true;
level1.volume = .3
jump.volume = .3


function playSound(soundfile,startingPoint=0) {
  soundfile.currentTime = startingPoint
  soundfile.play();
}

function pauseSound(soundfile) {
  soundfile.pause();
  soundfile.currentTime = 0;
}

function updateSound(sound) {
   if (sound !== 0) {
    playSound(sound);
  }
}
