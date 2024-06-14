const questions = [
    {
        question: "ما هي أول آية نزلت في القرآن الكريم؟",
        answers: {
            A: "اقرأ باسم ربك الذي خلق",
            B: "الحمد لله رب العالمين",
            C: "بسم الله الرحمن الرحيم",
            D: "قل هو الله أحد"
        },
        correct: "A"
    },
    {
      question: "من اول صحابي اسلم في الزمن النبي محمد صلى الله عليه وسلم",
      answers: {
        A: "عمر بن خطاب",
        B: "ابو بكر الصديق",
        C: "علي بن أبي طالب", 
        D: "عثمان بن عفان"
      },
      correct: "B"
    },
    // أضف المزيد من الأسئلة هنا (ما يصل إلى 30 سؤالاً)
];

let currentQuestionIndex = 0;
let points = 0;

const loadingIcon = document.getElementById("loading-icon");
const loadingText = document.getElementById("loading-text");

document.getElementById("start-game").addEventListener("click", () => {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("waiting-screen").style.display = "flex";
    animateLoading(); // تشغيل الرقم التحويلي

    setTimeout(() => {
        document.getElementById("waiting-screen").style.display = "none";
        showQuestion();
    }, 3000);
});

document.getElementById("about-game").addEventListener("click", () => {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("about-screen").style.display = "block";
});

document.getElementById("back-to-start").addEventListener("click", () => {
    document.getElementById("about-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "block";
});

document.querySelectorAll(".answer-btn").forEach(button => {
    button.addEventListener("click", (event) => {
        const selectedAnswer = event.target.getAttribute("data-answer");
        if (selectedAnswer === questions[currentQuestionIndex].correct) {
            points += Math.floor(Math.random() * 1000) + 100;  // إضافة نقاط عشوائية لكل إجابة صحيحة
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                alert(`سؤال بقيمة ${points} نقطة`);
                setTimeout(() => {
                    showQuestion();
                }, 1000);
            } else {
                alert(`مبروك! لقد ربحت ${points} نقطة!`);
                askForPrizeOption();
            }
        } else {
            askForName();
        }
    });
});

function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question-text").innerText = question.question;
    document.querySelectorAll(".answer-btn").forEach((button, index) => {
        const answerKey = Object.keys(question.answers)[index];
        button.innerText = question.answers[answerKey];
        button.setAttribute("data-answer", answerKey);
    });
    document.getElementById("game-screen").style.display = "block";
    document.getElementById("points").innerText = `النقاط: ${points}`;
}

function askForName() {
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("name-screen").style.display = "block";

    document.getElementById("submit-name").addEventListener("click", () => {
        const name = document.getElementById("name-input").value;
        if (name) {
            generateImage(name);
        }
    });

    document.getElementById("refuse-prize").addEventListener("click", () => {
        resetGame();
        document.getElementById("name-screen").style.display = "none";
        document.getElementById("start-screen").style.display = "block";
    });
}

function generateImage(name) {
    const canvas = document.getElementById("name-canvas");
    const ctx = canvas.getContext("2d");

    const backgroundImage = new Image();
    backgroundImage.src = 'prize-background.jpg'; // يجب عليك توفير هذه الصورة في نفس المجلد أو تعديل المسار

    backgroundImage.onload = () => {
        canvas.width = backgroundImage.width;
        canvas.height = backgroundImage.height;

        ctx.drawImage(backgroundImage, 0, 0);

        ctx.fillStyle = "#fff";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`تهانينا ${name}! لقد ربحت ${points} نقطة!`, canvas.width / 2, canvas.height / 2);

        const image = canvas.toDataURL("image/png");
        document.getElementById("prize-image").src = image;
        document.getElementById("prize-screen").style.display = "block";
    };
}

function askForPrizeOption() {
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("prize-screen").style.display = "block";
}

document.getElementById("play-again").addEventListener("click", () => {
    resetGame();
    document.getElementById("prize-screen").style.display = "none";
    document.getElementById("waiting-screen").style.display = "flex";
    animateLoading(); // تشغيل الرقم التحويلي

    setTimeout(() => {
        document.getElementById("waiting-screen").style.display = "none";
        showQuestion();
    }, 3000);
});

document.getElementById("exit-game").addEventListener("click", () => {
    resetGame();
    document.getElementById("prize-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "block";
});

function resetGame() {
    currentQuestionIndex = 0;
    points = 0;
    document.getElementById("points").innerText = `النقاط: ${points}`;
}

function animateLoading() {
    let counter = 0;
    const interval = setInterval(() => {
        counter++;
        loadingText.textContent = `انتظر من فضلك${'.'.repeat(counter % 4)}`;
    }, 500);

    setTimeout(() => {
        clearInterval(interval);
    }, 3000); // إيقاف التحويل بعد 3 ثواني
}