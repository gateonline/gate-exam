/* =========================================================
   GATE XE-F MOCK TEST
   ========================================================= */


/* =========================================================
   VARIABLES
   ========================================================= */

let current = 0;

let answers = new Array(questions.length).fill(null);

let review = new Array(questions.length).fill(false);

let examEnded = false;

let timerInterval;


/* =========================================================
   EXAM TIME
   =========================================================

   2 minutes 46 seconds per question

   2:46 = 166 seconds

   166 × 15 = 2490 seconds

   2490 seconds = 41 minutes 30 seconds
*/

const TIME_PER_QUESTION = 166;

const EXAM_TIME =
    TIME_PER_QUESTION * questions.length;


/* =========================================================
   START EVERYTHING AFTER PAGE LOAD
   ========================================================= */

window.addEventListener("load", function () {

    console.log("Exam JavaScript loaded.");

    loadQuestion();

    updatePalette();

    startTimer();

});


/* =========================================================
   LOAD QUESTION
   ========================================================= */

function loadQuestion() {

    let q = questions[current];

    if (!q) {

        console.error(
            "Question not found:",
            current
        );

        return;

    }


    document.getElementById("question").innerText =
        "Q" + (current + 1) + ". " + q.question;


    let html = "";


    q.options.forEach(function (opt, i) {

        let checked =
            answers[current] === i
                ? "checked"
                : "";


        html += `
            <label>

                <input
                    type="radio"
                    name="option"
                    value="${i}"
                    ${checked}
                >

                ${opt}

            </label>
        `;

    });


    document.getElementById("options").innerHTML =
        html;


    updatePalette();

}


/* =========================================================
   SAVE & NEXT
   ========================================================= */

function saveNext() {

    saveCurrentAnswer();


    if (current < questions.length - 1) {

        current++;

        loadQuestion();

    }

}


/* =========================================================
   SAVE CURRENT ANSWER
   ========================================================= */

function saveCurrentAnswer() {

    let selected =
        document.querySelector(
            'input[name="option"]:checked'
        );


    if (selected) {

        answers[current] =
            parseInt(selected.value);

    }

}


/* =========================================================
   PREVIOUS
   ========================================================= */

function prevQuestion() {

    saveCurrentAnswer();


    if (current > 0) {

        current--;

        loadQuestion();

    }

}


/* =========================================================
   CLEAR RESPONSE
   ========================================================= */

function clearResponse() {

    answers[current] = null;

    review[current] = false;

    loadQuestion();

}


/* =========================================================
   MARK FOR REVIEW
   ========================================================= */

function markReview() {

    saveCurrentAnswer();

    review[current] = true;

    updatePalette();

}


/* =========================================================
   QUESTION PALETTE
   ========================================================= */

function updatePalette() {

    let palette =
        document.getElementById("palette");


    if (!palette) {

        return;

    }


    palette.innerHTML = "";


    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        let colorClass =
            "not-answered";


        if (review[i]) {

            colorClass = "review";

        }

        else if (answers[i] !== null) {

            colorClass = "answered";

        }


        palette.innerHTML += `

            <button
                class="${colorClass}"
                onclick="jump(${i})">

                ${i + 1}

            </button>

        `;

    }

}


/* =========================================================
   JUMP TO QUESTION
   ========================================================= */

function jump(i) {

    saveCurrentAnswer();

    current = i;

    loadQuestion();

}


/* =========================================================
   TIMER
   ========================================================= */

function startTimer() {

    /*
       Store the starting time so refreshing
       the page doesn't restart the exam.
    */

    let startTime =
        sessionStorage.getItem(
            "gateExamStartTime"
        );


    if (!startTime) {

        startTime = Date.now();

        sessionStorage.setItem(
            "gateExamStartTime",
            startTime
        );

    }


    /*
       Update immediately
    */

    updateTimer();


    /*
       Then update every second
    */

    timerInterval =
        setInterval(
            updateTimer,
            1000
        );

}


/* =========================================================
   UPDATE TIMER
   ========================================================= */

function updateTimer() {

    if (examEnded) {

        return;

    }


    let startTime =
        Number(
            sessionStorage.getItem(
                "gateExamStartTime"
            )
        );


    if (!startTime) {

        return;

    }


    let elapsed =
        Math.floor(
            (Date.now() - startTime) / 1000
        );


    let remaining =
        EXAM_TIME - elapsed;


    /*
       TIME OVER
    */

    if (remaining <= 0) {

        remaining = 0;

        document.getElementById(
            "timer"
        ).innerText = "00:00";


        clearInterval(timerInterval);


        examEnded = true;


        alert(
            "Time is over. Your exam will now be submitted."
        );


        submitExam(true);

        return;

    }


    let minutes =
        Math.floor(
            remaining / 60
        );


    let seconds =
        remaining % 60;


    let timeText =
        String(minutes).padStart(2, "0")
        +
        ":"
        +
        String(seconds).padStart(2, "0");


    document.getElementById(
        "timer"
    ).innerText = timeText;


    /*
       Turn timer red during
       last 5 minutes.
    */

    let timerBox =
        document.querySelector(
            ".timer-box"
        );


    if (remaining <= 300) {

        timerBox.classList.add(
            "timer-warning"
        );

    }

}


/* =========================================================
   SUBMIT EXAM
   ========================================================= */

function submitExam(autoSubmit = false) {

    /*
       Save the current answer
       before calculating score.
    */

    saveCurrentAnswer();


    /*
       Manual submission confirmation
    */

    if (!autoSubmit) {

        let confirmation =
            confirm(
                "Are you sure you want to submit the exam?"
            );


        if (!confirmation) {

            return;

        }

    }


    examEnded = true;

    clearInterval(timerInterval);


    /*
       Ask candidate name
    */

    let name =
        prompt(
            "Enter your name"
        );


    if (!name) {

        name = "Unknown";

    }


    /*
       Calculate score
    */

    let score = 0;


    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        if (
            answers[i] === questions[i].answer
        ) {

            score++;

        }

    }


    /*
       YOUR GOOGLE APPS SCRIPT URL
    */

    let url =
        "https://script.google.com/macros/s/AKfycbyp-6oaHho0YJ_dh_m7S189TUghfzsTs_3YvRxkchmsCzuCfUPOjlK7CtzgXqGSM71d/exec";


    /*
       NAME
    */

    url +=
        "?name=" +
        encodeURIComponent(name);


    /*
       QUESTIONS
    */

    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        let answer =
            answers[i] === null
                ? ""
                : answers[i];


        url +=
            "&q" +
            (i + 1) +
            "=" +
            encodeURIComponent(answer);

    }


    /*
       SCORE
    */

    url +=
        "&score=" +
        encodeURIComponent(score);


    /*
       SEND TO GOOGLE SHEETS
    */

    window.open(
        url,
        "_blank"
    );


    /*
       Show result
    */

    alert(
        "Exam submitted successfully!\n\n" +
        "Score: " +
        score +
        " / " +
        questions.length
    );


    /*
       Remove timer
    */

    sessionStorage.removeItem(
        "gateExamStartTime"
    );


    /*
       Reload for fresh attempt
    */

    location.reload();

}


/* =========================================================
   CALCULATOR
   ========================================================= */


/*
   OPEN
*/

function openCalculator() {

    let calculator =
        document.getElementById(
            "calculator"
        );


    calculator.style.display =
        "block";

}


/*
   CLOSE
*/

function closeCalculator() {

    let calculator =
        document.getElementById(
            "calculator"
        );


    calculator.style.display =
        "none";

}


/*
   INPUT
*/

function calcInput(value) {

    let display =
        document.getElementById(
            "calc-display"
        );


    display.value += value;

}


/*
   CLEAR
*/

function calcClear() {

    document.getElementById(
        "calc-display"
    ).value = "";

}


/*
   DELETE
*/

function calcBackspace() {

    let display =
        document.getElementById(
            "calc-display"
        );


    display.value =
        display.value.slice(
            0,
            -1
        );

}


/*
   CALCULATE
*/

function calculateResult() {

    let display =
        document.getElementById(
            "calc-display"
        );


    let expression =
        display.value;


    try {

        /*
           Convert calculator symbols
        */

        expression =
            expression
                .replace(
                    /\^/g,
                    "**"
                )
                .replace(
                    /sqrt\(/g,
                    "Math.sqrt("
                );


        /*
           Evaluate expression
        */

        let result =
            Function(
                "return " +
                expression
            )();


        /*
           Clean floating point
           errors
        */

        if (
            typeof result === "number" &&
            isFinite(result)
        ) {

            result =
                Number(
                    result.toPrecision(12)
                );

        }


        display.value =
            result;

    }

    catch (error) {

        display.value =
            "Error";

    }

}
