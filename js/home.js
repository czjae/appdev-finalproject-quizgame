let difficulty = "easy";
const $ = id => document.getElementById(id);
const highKey = "highScore_" + currentUser();

$("welcome").textContent = "Hi, " + currentUser() + "!";
$("highScore").textContent = localStorage.getItem(highKey) || 0;
$("logoutBtn").addEventListener("click", logout);

loadCategories()
  .then(list => {
    $("category").innerHTML = list
      .map(c => `<option value="${c.id}">${c.name}</option>`)
      .join("");
  })
  .catch(() => {
    $("message").textContent = "Walang internet o hindi ma-load ang categories.";
  });

document.querySelectorAll(".diff").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".diff").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    difficulty = btn.dataset.level;
  });
});

$("startBtn").addEventListener("click", async () => {
  const categoryId = $("category").value;
  if (!categoryId) {
    $("message").textContent = "Pumili muna ng category.";
    return;
  }
  const categoryName = $("category").selectedOptions[0].textContent;

  $("startBtn").disabled = true;
  $("message").textContent = "Naglo-load ng questions...";

  const result = await fetchQuestions(categoryId, difficulty, 10);
  $("startBtn").disabled = false;

  if (!result.ok) {
    $("message").textContent = result.message;
    return;
  }

  sessionStorage.setItem("game", JSON.stringify({
    questions: result.questions,
    current: 0,
    score: 0,
    category: categoryName,
    difficulty: difficulty
  }));
  window.location.href = "quiz.html";
});
