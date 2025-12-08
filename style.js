const startScreen = document.getElementById("startScreen");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const startBtn = document.getElementById("startBtn");
const retryBtn = document.getElementById("retryBtn");
const questionText = document.getElementById("questionText");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const scoreValue = document.getElementById("scoreValue");
const qIndex = document.getElementById("qIndex");
const progressBar = document.getElementById("progressBar");

const quizData = [

   {
    q: "من أين بدأت حملة أكتوبر الوردي؟",
    choices: ["من فرنسا", "من اليابان","من الولايات المتحدة الأمريكية","من مصر"],
    correct: 2,
  },
  {
    q: "ما هو العمر الذي يُنصح فيه النساء ببدء الفحص المنتظم",
    choices: ["من عمر 20 سنة", 
             "من عمر 40 سنة تقريبًا",
              "من عمر 60 سنة"],
    correct: 1,
  },
  {
    q: "ما أفضل وقت لإجراء الفحص الذاتي للثدي",
    choices: ["بعد انتهاء الدورة الشهرية بعدة أيام", "في الصباح الباكر", "لا فرق في الوقت", "قبل النوم"],
    correct: 0,
  },
  {
    q: "ما العرض الذي قد يشير إلى وجود مشكلة في الثدي",
    choices: ["الحكة المؤقتة", "وجود كتلة أو إفرازات غير طبيعية من الحلمة","ألم خفيف بعد الرياضة"],
    correct: 1,
  },
  {
    q: "ما هو العضو الذي يتأثر مباشرة بسرطان الثدي؟",
    choices: ["الكبد", "الغدد الثديية" ,"القلب","الرئة"],
    correct: 1,
  },
   {
    q: "ما هو دور هرمون الإستروجين في سرطان الثدي؟",
    choices: ["يمكن أن يحفّز نمو بعض أنواع الخلايا السرطانية", "يمنع نمو الأورام","يسبب تساقط الشعر" ,"لا علاقة له"],
    correct: 0,
  },
   {
    q: "ما نوع الفحص الذي يستخدم الأشعة السينية لاكتشاف الأورام في الثدي؟",
    choices: ["الأشعة فوق البنفسجية", "الأشعة المقطعية" ,"أشعة (Mammogram)","الأشعة تحت الحمراء"],
    correct: 2,
  },
   {
    q: "كيف يمكن الكشف الجيني عن خطر الإصابة بسرطان الثدي؟",
    choices: ["بتحليل فصيلة الدم", "من خلال فحص طفرات جينات BRCA1 و BRCA2" ,"بتصوير الأشعة فقط","خلايا الكبد"],
    correct: 1,
  },
  //  {
  //   q: "",
  //   choices: ["", "" ,""],
  //   correct: 3,
  // },
];

let current = 0;
let score = 0;
let answered = false;

function startQuiz() {
  startScreen.style.display = "none";
  quizEl.style.display = "block";
  resultEl.style.display = "none";
  current = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  answered = false;
  const item = quizData[current];
  questionText.textContent = item.q;
  qIndex.textContent = `Question ${current + 1} / ${quizData.length}`;
  progressBar.style.width = `${(current / quizData.length) * 100}%`;

  choicesEl.innerHTML = "";
  item.choices.forEach((choice, i) => {
    const div = document.createElement("div");
    div.classList.add("choice");
    div.textContent = choice;
    div.addEventListener("click", () => checkAnswer(i, div));
    choicesEl.appendChild(div);
  });

  prevBtn.disabled = current === 0;
  nextBtn.textContent = current === quizData.length - 1 ? "Finish" : "Next";
}

function checkAnswer(index, btn) {
  if (answered) return;
  answered = true;

  const correctIndex = quizData[current].correct;
  const options = document.querySelectorAll(".choice");

  if (index === correctIndex) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
    options[correctIndex].classList.add("correct");
  }
}

nextBtn.addEventListener("click", () => {
  if (!answered) {
    alert("Please select an answer first!");
    return;
  }
  if (current < quizData.length - 1) {
    current++;
    showQuestion();
  } else {
    finishQuiz();
  }
});

prevBtn.addEventListener("click", () => {
  if (current > 0) {
    current--;
    showQuestion();
  }
});

function finishQuiz() {
  quizEl.style.display = "none";
  resultEl.style.display = "block";
  scoreValue.textContent = `${score} / ${quizData.length}`;
  progressBar.style.width = "100%";
}

retryBtn.addEventListener("click", startQuiz);
startBtn.addEventListener("click", startQuiz);
