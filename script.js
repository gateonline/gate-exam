/* =====================================================
   EXAM VARIABLES
   ===================================================== */

let current = 0;

let answers =
    new Array(questions.length).fill(null);

let review =
    new Array(questions.length).fill(false);

let examEnded = false;

let timerInterval;


/* =====================================================
   EXAM TIME
   ===================================================== */

const TIME_PER_QUESTION = 166;

const EXAM_TIME =
    TIME_PER_QUESTION * questions.length;


/* =====================================================
   PAGE LOAD
   ===================================================== */

window.addEventListener("load", function () {

    console.log("POLYMER GATE loaded.");

    /*
       IMPORTANT:
       We DO NOT load a question here.

       The exam hasn't started yet.
    */

});


/* =====================================================
   START EXAM
   ===================================================== */

function startExam() {

    /*
       Make sure a previous exam timer
       is completely removed.
    */

    clearInterval(timerInterval);


    /*
       Reset exam data.
    */

    current = 0;

    answers =
        new Array(questions.length).fill(null);

    review =
        new Array(questions.length).fill(false);

    examEnded = false;


    /*
       Start a NEW timer.
    */

    let startTime = Date.now();

    sessionStorage.setItem(
        "gateExamStartTime",
        startTime
    );


    /*
       Hide start screen.
    */

    document.getElementById(
        "startScreen"
    ).style.display = "none";


    /*
       Show exam.
    */

    document.getElementById(
        "examArea"
    ).style.display = "flex";


    /*
       Enable calculator.
    */

    document.getElementById(
        "calculatorButton"
    ).disabled = false;


    /*
       Load first question.
    */

    loadQuestion();


    /*
       Create question palette.
    */

    updatePalette();


    /*
       Start timer.
    */

    updateTimer();

    timerInterval =
        setInterval(
            updateTimer,
            1000
        );

}


/* =====================================================
   LOAD QUESTION
   ===================================================== */

function loadQuestion() {

    let q = questions[current];


    if (!q) {

        console.error(
            "Question not found:",
            current
        );

        return;

    }


    document.getElementById(
        "question"
    ).innerText =
        "Q" +
        (current + 1) +
        ". " +
        q.question;


    let html = "";


    q.options.forEach(
        function(opt, i) {

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

        }
    );


    document.getElementById(
        "options"
    ).innerHTML = html;


    updatePalette();

}


/* =====================================================
   SAVE CURRENT ANSWER
   ===================================================== */

function saveCurrentAnswer() {

    let selected =
        document.querySelector(
            'input[name="option"]:checked'
        );


    if (selected) {

        answers[current] =
            parseInt(
                selected.value
            );

    }

}


/* =====================================================
   SAVE & NEXT
   ===================================================== */

function saveNext() {

    saveCurrentAnswer();


    if (
        current <
        questions.length - 1
    ) {

        current++;

        loadQuestion();

    }

}


/* =====================================================
   PREVIOUS
   ===================================================== */

function prevQuestion() {

    saveCurrentAnswer();


    if (current > 0) {

        current--;

        loadQuestion();

    }

}


/* =====================================================
   CLEAR
   ===================================================== */

function clearResponse() {

    answers[current] = null;

    review[current] = false;

    loadQuestion();

}


/* =====================================================
   MARK FOR REVIEW
   ===================================================== */

function markReview() {

    saveCurrentAnswer();

    review[current] = true;

    updatePalette();

}


/* =====================================================
   QUESTION PALETTE
   ===================================================== */

function updatePalette() {

    let palette =
        document.getElementById(
            "palette"
        );


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


        /*
           Review gets priority.
        */

        if (review[i]) {

            colorClass = "review";

        }

        else if (
            answers[i] !== null
        ) {

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


/* =====================================================
   JUMP TO QUESTION
   ===================================================== */

function jump(i) {

    saveCurrentAnswer();

    current = i;

    loadQuestion();

}


/* =====================================================
   TIMER
   ===================================================== */

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
            (Date.now() - startTime)
            / 1000
        );


    let remaining =
        EXAM_TIME - elapsed;


    /*
       TIME OVER
    */

    if (remaining <= 0) {

        document.getElementById(
            "timer"
        ).innerText = "00:00";


        clearInterval(
            timerInterval
        );


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


    document.getElementById(
        "timer"
    ).innerText =

        String(minutes)
            .padStart(2, "0")

        +

        ":"

        +

        String(seconds)
            .padStart(2, "0");


    /*
       Last 5 minutes = red
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


/* =====================================================
   SUBMIT EXAM
   ===================================================== */

function submitExam(
    autoSubmit = false
) {

    saveCurrentAnswer();


    /*
       Manual submission confirmation.
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

    clearInterval(
        timerInterval
    );


    /*
       Candidate name
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
            answers[i] ===
            questions[i].answer
        ) {

            score++;

        }

    }


    /*
       GOOGLE APPS SCRIPT URL
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
            encodeURIComponent(
                answer
            );

    }


    /*
       SCORE
    */

    url +=
        "&score=" +
        encodeURIComponent(
            score
        );


    /*
       SEND TO GOOGLE SHEETS
    */

    window.open(
        url,
        "_blank"
    );


    alert(
        "Exam submitted successfully!\n\n" +
        "Score: " +
        score +
        " / " +
        questions.length
    );


    /*
       Remove timer.
    */

    sessionStorage.removeItem(
        "gateExamStartTime"
    );


    /*
       Reload.
    */

    location.reload();

}


/* =====================================================
   CALCULATOR
   ===================================================== */


/*
   OPEN
*/

function openCalculator() {

    document.getElementById(
        "calculator"
    ).style.display = "block";

}


/*
   CLOSE
*/

function closeCalculator() {

    document.getElementById(
        "calculator"
    ).style.display = "none";

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

        expression =
            expression.replace(
                /\^/g,
                "**"
            );


        expression =
            expression.replace(
                /sqrt\(/g,
                "Math.sqrt("
            );


        let result =
            Function(
                "return " +
                expression
            )();


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
