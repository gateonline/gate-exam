/* =====================================================
   EXAM VARIABLES
   ===================================================== */

let current = 0;

let answers =
    new Array(questions.length).fill(null);

let review =
    new Array(questions.length).fill(false);


/* =====================================================
   TIMER
   ===================================================== */

/*
   2 minutes 46 seconds per question

   2:46 = 166 seconds

   166 × 15 = 2490 seconds

   2490 seconds = 41 minutes 30 seconds
*/

const EXAM_TIME = 166 * questions.length;


/*
   Use sessionStorage so refreshing the page
   does NOT reset the timer.
*/

let startTime =
    sessionStorage.getItem("examStartTime");


if (!startTime) {

    startTime = Date.now();

    sessionStorage.setItem(
        "examStartTime",
        startTime
    );

}


let examEnded = false;


/* =====================================================
   START EXAM
   ===================================================== */

loadQuestion();

updateTimer();

let timerInterval = setInterval(
    updateTimer,
    1000
);


/* =====================================================
   TIMER FUNCTION
   ===================================================== */

function updateTimer() {

    if (examEnded) {
        return;
    }


    let elapsed =
        Math.floor(
            (Date.now() - Number(startTime)) / 1000
        );


    let remaining =
        EXAM_TIME - elapsed;


    /*
       Time finished
    */

    if (remaining <= 0) {

        document.getElementById("timer").innerText =
            "00:00";

        clearInterval(timerInterval);

        examEnded = true;

        alert(
            "Time is over. Your exam will be submitted automatically."
        );

        submitExam(true);

        return;
    }


    /*
       Convert seconds into minutes + seconds
    */

    let minutes =
        Math.floor(remaining / 60);


    let seconds =
        remaining % 60;


    let timeString =
        String(minutes).padStart(2, "0")
        + ":"
        +
        String(seconds).padStart(2, "0");


    document.getElementById("timer").innerText =
        timeString;


    /*
       Turn timer red when
       less than 5 minutes remain
    */

    let timerBox =
        document.querySelector(".timer-box");


    if (remaining <= 300) {

        timerBox.classList.add(
            "timer-warning"
        );

    }

}


/* =====================================================
   LOAD QUESTION
   ===================================================== */

function loadQuestion() {

    let q = questions[current];


    document.getElementById("question").innerText =
        "Q" + (current + 1) + ". " + q.question;


    let html = "";


    q.options.forEach(
        function(opt, i) {

            let checked =
                answers[current] == i
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


    document.getElementById("options").innerHTML =
        html;


    updatePalette();

}


/* =====================================================
   SAVE & NEXT
   ===================================================== */

function saveNext() {

    let selected =
        document.querySelector(
            'input[name="option"]:checked'
        );


    if (selected) {

        answers[current] =
            parseInt(selected.value);

        /*
           Once answered and saved,
           remove review status.
        */

        review[current] = false;

    }


    if (current < questions.length - 1) {

        current++;

        loadQuestion();

    }

}


/* =====================================================
   PREVIOUS
   ===================================================== */

function prevQuestion() {

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

    review[current] = false;

    loadQuestion();

}


/* =====================================================
   MARK FOR REVIEW
   ===================================================== */

function markReview() {

    review[current] = true;

    updatePalette();

}


/* =====================================================
   QUESTION PALETTE
   ===================================================== */

function updatePalette() {

    let palette =
        document.getElementById("palette");


    palette.innerHTML = "";


    for (
        let i = 0;
        i < questions.length;
        i++
    ) {


        let colorClass =
            "not-answered";


        /*
           Review gets priority
        */

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


/* =====================================================
   JUMP TO QUESTION
   ===================================================== */

function jump(i) {

    current = i;

    loadQuestion();

}


/* =====================================================
   SUBMIT EXAM
   ===================================================== */

function submitExam(autoSubmit = false) {


    if (examEnded === false) {

        if (!autoSubmit) {

            let confirmation =
                confirm(
                    "Are you sure you want to submit the exam?"
                );


            if (!confirmation) {

                return;

            }

        }

    }


    examEnded = true;


    clearInterval(timerInterval);


    /*
       Ask candidate name
    */

    let name =
        prompt("Enter your name");


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
            answers[i] ==
            questions[i].answer
        ) {

            score++;

        }

    }


    /*
       GOOGLE APPS SCRIPT URL

       Keep your working URL here.
    */

    let url =
        "https://script.google.com/macros/s/AKfycbyp-6oaHho0YJ_dh_m7S189TUghfzsTs_3YvRxkchmsCzuCfUPOjlK7CtzgXqGSM71d/exec";


    /*
       Candidate name
    */

    url +=
        "?name=" +
        encodeURIComponent(name);


    /*
       Send every question
    */

    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        let value =
            answers[i] === null
                ? ""
                : answers[i];


        url +=
            "&q" +
            (i + 1) +
            "=" +
            encodeURIComponent(value);

    }


    /*
       Send score
    */

    url +=
        "&score=" +
        encodeURIComponent(score);


    /*
       Send data to Google Apps Script
    */

    window.open(url, "_blank");


    /*
       Show result
    */

    alert(
        "Exam submitted successfully!\n\n" +
        "Your score: " +
        score +
        " / " +
        questions.length
    );


    /*
       Clear timer information
    */

    sessionStorage.removeItem(
        "examStartTime"
    );


    /*
       Reload page for a fresh attempt
    */

    location.reload();

}


/* =====================================================
   GATE-STYLE CALCULATOR
   ===================================================== */


/*
   Open calculator
*/

function openCalculator() {

    document.getElementById(
        "calculator"
    ).style.display = "block";

}


/*
   Close calculator
*/

function closeCalculator() {

    document.getElementById(
        "calculator"
    ).style.display = "none";

}


/*
   Calculator input
*/

function calcInput(value) {

    let display =
        document.getElementById(
            "calc-display"
        );


    display.value += value;

}


/*
   Clear calculator
*/

function calcClear() {

    document.getElementById(
        "calc-display"
    ).value = "";

}


/*
   Delete last character
*/

function calcBackspace() {

    let display =
        document.getElementById(
            "calc-display"
        );


    display.value =
        display.value.slice(0, -1);

}


/*
   Calculate result
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
           Convert ^ into JavaScript **
        */

        expression =
            expression.replace(
                /\^/g,
                "**"
            );


        /*
           Evaluate expression
        */

        let result =
            Function(
                "return " + expression
            )();


        /*
           Round very small floating
           point errors
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


        display.value = result;

    }

    catch (error) {

        display.value =
            "Error";

    }

}
