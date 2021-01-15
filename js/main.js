function memoryGame() {
  let message = document.querySelector(".name");
  let Pscore = document.querySelector(".Pscore");

  for (let i = 0; i < localStorage.length; i++) {
    document.querySelector(".score-border").innerHTML += `<div class="Pname">Player name :</div>`
    let pName = document.querySelector(".Pname:last-child");
    pName.innerHTML += `<span>${localStorage.key(i)}</span>`
  }

  let Pname = document.querySelector(".Pname:last-child");
  console.log(Pname)

  // START BTN
  let startBtn = document.querySelector(".control-buttons");
  let nameSpn = document.querySelector(".name span");
  let triesNum = document.querySelector(".tries span");

  triesNum.textContent = "0";

  startBtn.onclick = function () {
    // PROMPT
    yourName = prompt("Type Your Name To Start Game !");

    // Take The Name
    if (yourName == null || yourName == "") nameSpn.innerHTML = "Unknown";
    else nameSpn.innerHTML = yourName.toUpperCase();

    //DELETE OVERLAY
    startBtn.remove();
    // Play Audio
    document.getElementById("main").play();
    document.getElementById("main").loop = true;
    document.getElementById("main").volume = 0.3;
    blocks.forEach((block) => {
      block.classList.add("is-flipped");

      setTimeout(() => {
        block.classList.remove("is-flipped");

      }, 3000);
    });
    countDown();
    // First Value Of local Storage
    localStorage.setItem(yourName, "0");
  }

  // GAME BLOCK
  let gameBlock = document.querySelector(".memory-game-blocks");
  let duration = 1000;

  // ARRAY FROM GAME BLOCK CHILDREN
  let blocks = Array.from(gameBlock.children);
  let orderRange = [...Array(blocks.length).keys()];
  console.log(gameBlock.children)


  // Call Shuffle Function
  shuffle(orderRange);


  // MAKE ORDER
  blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    block.addEventListener("click", function () {
      flipBlock(block);
    });
  });

  // Flip Block Function
  function flipBlock(selectedBlock) {
    // Add Is flipped Class
    selectedBlock.classList.add("is-flipped");

    // Filter The Two Selected Blocks
    let filteredBlock = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));

    if (filteredBlock.length === 2) {
      // No clicking After 1s
      noClicking();
      // Check Matched Block Function
      matchedBlock(filteredBlock[0], filteredBlock[1]);
    }
  }

  // Stop Clicking Function
  function noClicking() {
    gameBlock.classList.add("no-clicking");

    setTimeout(() => {
      gameBlock.classList.remove("no-clicking");

    }, duration);

  }
  let isTrue = 0;
  // Matched Function
  function matchedBlock(firstBlock, secondBlock) {

    // If The Blocks Is Equals
    if (firstBlock.dataset.tech === secondBlock.dataset.tech) {
      isTrue++;
      // Remove Is Flipped Class
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");

      console.log(isTrue)
      if (isTrue == 2) console.log("true")
      // Add Has Match Class
      firstBlock.classList.add("has-match");
      secondBlock.classList.add("has-match");

      document.getElementById("success").play();
    }
    else {
      setTimeout(() => {
        // Remove Is Flipped Class
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        // Tries Number
        triesNum.innerHTML = parseInt(triesNum.innerHTML) + 1;

        // Store The Score In Local Storage
        localStorage.setItem(yourName, triesNum.textContent);
        console.log(localStorage.key(0));

      }, duration);
    }

    document.getElementById("fail").play();

  }

  // Shuffle The order Order
  function shuffle(array) {
    // Make New Array With deferent Order From orderRange
    let random;
    let temp;
    let current = array.length;

    while (current > 0) {
      random = Math.floor(Math.random() * current);
      current--;

      // [1] Save Current Element In Temp
      temp = array[current];

      // [2] Current Element = Random Element
      array[current] = array[random];

      // [3] Random Element = temp;
      array[random] = temp;
    }
    console.log(array)
    return array;
  }

  let num = orderRange.length / 2;

  // Count Down Function
  function countDown() {
    let clock = document.getElementById("timer");
    let seconds = 120;
    let minutes;
    let remSeconds;
    // Count Down Interval
    counterDown = setInterval(countDown, 1000);


    function countDown() {
      let yourScore = localStorage.getItem(yourName);
      // Calculate Minutes And remSeconds
      minutes = Math.floor(seconds / 60);
      remSeconds = seconds % 60;

      // Winner
      if (isTrue === num) {
        if (yourName == null || yourName == "") yourName = "Unknown";
        // Winner Message
        message.innerHTML = `Congratulation <span class="player-name">${yourName.toUpperCase()}</span> You're The Winner !`;
        Pscore.innerHTML = ` <br> <span class="player-name">${yourName.toUpperCase()}</span> Your Wrong Tries Is : <span class="player-name">${yourScore}</span>`;
        document.getElementById("main").pause();

        clearInterval(counterDown);
        // No Clicking Box 
        gameBlock.classList.add("no-clicking");
      }

      // Add 0 to Counter
      if (seconds < 10) remSeconds = "0" + remSeconds;
      if (minutes < 10) minutes = "0" + minutes;

      // Output
      clock.textContent = `${minutes} : ${remSeconds}`;

      // Counter
      if (seconds > 0) seconds -= 1;

      // Stop Counter
      else {
        clearInterval(counterDown);
        clock.textContent = " Time's Up ! ";

        // No Clicking Box 
        gameBlock.classList.add("no-clicking");
        if (isTrue < num) {
          // if (yourName == null || yourName == "") yourName = "Unknown";
          message.innerHTML = `You Lose Hard Luck Next Time :) `;
          if (yourName == null || yourName == "") yourName = "Unknown";
          // Pscore.innerHTML += `<span style="color:blue;">${yourScore}</span>`;
          Pname.innerHTML += `<span style="color:blue;">${yourName.toUpperCase()}</span>`;
          document.getElementById("main").pause();

        }
      }

    }
  }
}
memoryGame();