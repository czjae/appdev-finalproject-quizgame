function decode(text) {
  const t = document.createElement("textarea");
  t.innerHTML = text;
  return t.value;
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

async function loadCategories() {
  const res = await fetch("https://opentdb.com/api_category.php");
  const data = await res.json();
  return data.trivia_categories;
}

// returns { ok: true, questions } o { ok: false, message }
async function fetchQuestions(categoryId, difficulty, amount = 10) {
  try {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.response_code === 5) {
      return { ok: false, message: "Masyadong mabilis. Maghintay ng 5 segundo, tapos subukan ulit." };
    }
    if (data.response_code !== 0 || data.results.length === 0) {
      return { ok: false, message: "Kulang ang questions. Pumili ng ibang category o difficulty." };
    }
    return { ok: true, questions: data.results };
  } catch (e) {
    return { ok: false, message: "Walang internet o may error. Subukan ulit." };
  }
}
