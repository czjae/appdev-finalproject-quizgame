const $ = id => document.getElementById(id);
const game = JSON.parse(sessionStorage.getItem("game") || "null");

if (!game) {
  window.location.href = "homescreen.html";
} else {
  const total = game.questions.length * 10;
  const key = "highScore_" + currentUser();
  const high = Number(localStorage.getItem(key) || 0);

  $("info").textContent = `${game.category} (${game.difficulty})`;
  $("finalScore").textContent = `Score: ${game.score} / ${total}`;

  if (game.score > high) {
    localStorage.setItem(key, game.score);
    $("newHigh").textContent = "Bagong high score!";
  } else {
    $("newHigh").textContent = `High score: ${high}`;
  }
}

$("againBtn").addEventListener("click", () => {
  sessionStorage.removeItem("game");
  window.location.href = "homescreen.html";
});
