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

/*
   2 min 46 sec = 166 seconds

   166 × 15 = 2490 seconds
   2490 seconds = 41 min 30 sec
*/

const TIME_PER_QUESTION = 166;

const EXAM_TIME =
    TIME_PER_QUESTION * questions.length;


/* =====================================================
   PAGE LOAD
   ===================================================== */

window.addEventListener("load", function () {

    /*
       Do NOT load the first question here.

       The exam starts only after
       START EXAM is clicked.
    */

    console.log("POLYMER GATE loaded.");

});


/* =====================================================
   START EXAM
   ===================================================== */

function startExam() {

    clearInterval(timerInterval);


    /*
       Reset everything
    */

    current = 0;

    answers =
        new Array(questions.length).fill(null);

    review =
        new Array(questions.length).fill(false);

    examEnded = false;


    /*
       Start time
    */

    let startTime = Date.now();

    sessionStorage.setItem(
        "gateExamStartTime",
        startTime
    );


    /*
       Hide start screen
    */

    document.getElementById(
        "startScreen"
    ).style.display = "none";


    /*
       Show exam
    */

    document.getElementById(
        "examArea"
    ).style.display = "flex";


    /*
       Enable calculator
    */

    document.getElementById(
        "calculatorButton"
    ).disabled = false;


    /*
       Load first question
    */

    loadQuestion();


    /*
       Create palette
    */

    updatePalette();


    /*
       Start timer
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


    /*
       Question text
    */

    document.getElementById(
        "question"
    ).innerText =
        "Q" +
        (current + 1) +
        ". " +
        q.question;


    /*
       Options
    */

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


    /*
       Update question palette
    */

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

        return true;

    }


    return false;

}


/* =====================================================
   SAVE & NEXT
   ===================================================== */

function saveNext() {

    /*
       Save the selected answer
    */

    let answered =
        saveCurrentAnswer();


    /*
       IMPORTANT:

       If the question was previously marked
       for review AND the student has now
       answered it, remove the review status.

       Therefore:

       Purple → Green
    */

    if (answered) {

        review[current] = false;

    }


    /*
       Update palette immediately.

       This fixes the problem where the
       last question was not changing color.
    */

    updatePalette();


    /*
       Move to next question if possible.
    */

    if (
        current <
        questions.length - 1
    ) {

        current++;

        loadQuestion();

    }

    else {

        /*
           This is the LAST QUESTION.

           There is no Q16.

           Therefore stay on Q15,
           but the palette has already
           been updated to green.
        */

        loadQuestion();

    }

}


/* =====================================================
   PREVIOUS
   ===================================================== */

function prevQuestion() {

    /*
       Save answer before moving back.
    */

    let answered =
        saveCurrentAnswer();


    /*
       If answered, remove review status.
    */

    if (answered) {

        review[current] = false;

    }


    updatePalette();


    if (current > 0) {

        current--;

        loadQuestion();

    }

}


/* =====================================================
   CLEAR RESPONSE
   ===================================================== */

function clearResponse() {

    answers[current] = null;

    /*
       Clear also removes review status.
    */

    review[current] = false;

    loadQuestion();

}


/* =====================================================
   MARK FOR REVIEW
   ===================================================== */

function markReview() {

    /*
       Save answer if one exists.
    */

    let answered =
        saveCurrentAnswer();


    /*
       Mark the question for review.

       Even if answered, it will remain
       purple until Save & Next is pressed.
    */

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
           REVIEW HAS PRIORITY

           Purple if marked for review
           and not yet saved as a normal answer.
        */

        if (review[i]) {

            colorClass = "review";

        }

        /*
           GREEN IF ANSWERED

           This is checked after review.
           However, saveNext() removes review
           when an answer is saved.

           Therefore:

           Answered → Green
           Review only → Purple
           Nothing → Grey
        */

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

    /*
       Save current answer before jumping.
    */

    let answered =
        saveCurrentAnswer();


    /*
       If answered, remove review status.
    */

    if (answered) {

        review[current] = false;

    }


    updatePalette();


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


    /*
       Convert seconds to minutes
    */

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
       Last 5 minutes → red
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

    /*
       Save the answer of the current question
       before calculating score.
    */

    let answered =
        saveCurrentAnswer();


    /*
       If current question has an answer,
       remove review status.
    */

    if (answered) {

        review[current] = false;

    }


    updatePalette();


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


    clearInterval(
        timerInterval
    );


    /*
       Ask for name
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


    /* =================================================
       GOOGLE APPS SCRIPT URL
       ================================================= */

    let url =
        "https://script.google.com/macros/s/AKfycbyp-6oaHho0YJ_dh_m7S189TUghfzsTs_3YvRxkchmsCzuCfUPOjlK7CtzgXqGSM71d/exec";


    /*
       Name
    */

    url +=
        "?name=" +
        encodeURIComponent(name);


    /*
       Questions
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
       Score
    */

    url +=
        "&score=" +
        encodeURIComponent(
            score
        );


    /* =================================================
       SEND DATA WITHOUT OPENING GOOGLE SCRIPT PAGE
       ================================================= */

    /*
       Instead of:

       window.open(url)

       we create an invisible iframe.

       This sends the response to Google Sheets
       without taking the student away from
       the exam page.
    */

    let iframe =
        document.createElement(
            "iframe"
        );


    iframe.style.display = "none";

    iframe.src = url;

    document.body.appendChild(
        iframe
    );


    /* =================================================
       SHOW SCORE TO STUDENT
       ================================================= */

    setTimeout(
        function() {

            alert(

                "EXAM SUBMITTED SUCCESSFULLY!\n\n" +

                "Name: " +
                name +

                "\n\nScore: " +
                score +
                " / " +
                questions.length

            );


            /*
               Remove timer information
            */

            sessionStorage.removeItem(
                "gateExamStartTime"
            );


            /*
               Return to start screen
            */

            location.reload();

        },

        1000

    );

}


/* =====================================================
   CALCULATOR
   ===================================================== */


/*
   OPEN CALCULATOR
*/

function openCalculator() {

    document.getElementById(
        "calculator"
    ).style.display = "block";

}


/*
   CLOSE CALCULATOR
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

        /*
           Convert ^ to **
        */

        expression =
            expression.replace(
                /\^/g,
                "**"
            );


        /*
           Convert sqrt(
           to Math.sqrt(
        */

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
