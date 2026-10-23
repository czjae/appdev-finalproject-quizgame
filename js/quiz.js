const TIME_PER_QUESTION = 15;
const $ = id => document.getElementById(id);
let game = JSON.parse(sessionStorage.getItem("game") || "null");
let timerId = null;
let timeLeft = 0;

function saveGame() {
  sessionStorage.setItem("game", JSON.stringify(game));
}

function showQuestion() {
  const q = game.questions[game.current];
  $("progress").textContent = `Question ${game.current + 1} of ${game.questions.length}`;
  $("question").textContent = decode(q.question);

  const answers = shuffle([q.correct_answer, ...q.incorrect_answers]);
  $("choices").innerHTML = "";
  answers.forEach(ans => {
    const btn = document.createElement("button");
    btn.textContent = decode(ans);
    btn.addEventListener("click", () => checkAnswer(btn, ans));
    $("choices").appendChild(btn);
  });

  startTimer();
}

function startTimer() {
  clearInterval(timerId);
  timeLeft = TIME_PER_QUESTION;
  $("timer").textContent = `${timeLeft}s`;
  timerId = setInterval(() => {
    timeLeft--;
    $("timer").textContent = `${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      checkAnswer(null, null);
    }
  }, 1000);
}

function checkAnswer(clickedBtn, answer) {
  clearInterval(timerId);
  const correct = game.questions[game.current].correct_answer;

  document.querySelectorAll("#choices button").forEach(b => {
    b.disabled = true;
    if (b.textContent === decode(correct)) b.classList.add("correct");
  });

  if (answer === correct) {
    game.score += 10;
  } else if (clickedBtn) {
    clickedBtn.classList.add("wrong");
  }

  game.current++;
  saveGame();

  setTimeout(() => {
    if (game.current < game.questions.length) {
      showQuestion();
    } else {
      window.location.href = "result.html";
    }
  }, 1500);
}

if (!game || game.current >= game.questions.length) {
  window.location.href = "homescreen.html";
} else {
  showQuestion();
}
