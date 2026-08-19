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
   TOTAL EXAM TIME = 30 MINUTES

   30 × 60 = 1800 seconds
*/

const EXAM_TIME = 30 * 60;


/* =====================================================
   PAGE LOAD
   ===================================================== */

window.addEventListener(
    "load",
    function () {

        /*
           Questions do NOT load here.

           The exam starts only after
           START EXAM is clicked.
        */

        console.log(
            "POLYMER GATE loaded."
        );

    }
);


/* =====================================================
   START EXAM
   ===================================================== */

function startExam() {

    clearInterval(
        timerInterval
    );


    /*
       Reset exam
    */

    current = 0;

    answers =
        new Array(
            questions.length
        ).fill(null);

    review =
        new Array(
            questions.length
        ).fill(false);

    examEnded = false;


    /*
       Record start time
    */

    let startTime =
        Date.now();


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
       Load Q1
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

    let q =
        questions[current];


    if (!q) {

        console.error(
            "Question not found:",
            current
        );

        return;

    }


    /*
       Question
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
        function (opt, i) {

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
       Update palette
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
       Save selected answer
    */

    let answered =
        saveCurrentAnswer();


    /*
       If the question was marked
       for review and is now answered,
       remove the review status.

       PURPLE → GREEN
    */

    if (answered) {

        review[current] = false;

    }


    /*
       Update immediately.

       This is important for Q15 too.
    */

    updatePalette();


    /*
       Move to next question
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
           LAST QUESTION

           Stay on Q15.

           The answer has already been saved
           and the palette has already become
           GREEN.
        */

        loadQuestion();

    }

}


/* =====================================================
   PREVIOUS
   ===================================================== */

function prevQuestion() {

    let answered =
        saveCurrentAnswer();


    /*
       Answered question is no longer
       simply "review".
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

    review[current] = false;

    loadQuestion();

}


/* =====================================================
   MARK FOR REVIEW
   ===================================================== */

function markReview() {

    /*
       Save any currently selected answer.
    */

    saveCurrentAnswer();


    /*
       Mark question for review.
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
           Purple = Review
        */

        if (review[i]) {

            colorClass =
                "review";

        }


        /*
           Green = Answered
        */

        else if (
            answers[i] !== null
        ) {

            colorClass =
                "answered";

        }


        /*
           Grey = Not Answered
        */


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

    let answered =
        saveCurrentAnswer();


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
            (
                Date.now() -
                startTime
            ) / 1000
        );


    let remaining =
        EXAM_TIME -
        elapsed;


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


        /*
           Automatically open
           name-entry screen.
        */

        openNameModal(true);

        return;

    }


    /*
       Minutes
    */

    let minutes =
        Math.floor(
            remaining / 60
        );


    /*
       Seconds
    */

    let seconds =
        remaining % 60;


    /*
       Display
    */

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


    if (
        remaining <= 300
    ) {

        timerBox.classList.add(
            "timer-warning"
        );

    }

}


/* =====================================================
   SUBMIT BUTTON
   ===================================================== */

function submitExam() {

    /*
       Save current answer
    */

    let answered =
        saveCurrentAnswer();


    if (answered) {

        review[current] = false;

    }


    updatePalette();


    /*
       Show custom confirmation box.
    */

    document.getElementById(
        "submitModal"
    ).style.display = "flex";

}


/* =====================================================
   CLOSE SUBMIT MODAL
   ===================================================== */

function closeSubmitModal() {

    document.getElementById(
        "submitModal"
    ).style.display = "none";

}


/* =====================================================
   CONFIRM SUBMISSION
   ===================================================== */

function confirmSubmit() {

    closeSubmitModal();


    /*
       Stop timer
    */

    examEnded = true;

    clearInterval(
        timerInterval
    );


    /*
       Open custom name box
    */

    openNameModal(false);

}


/* =====================================================
   NAME MODAL
   ===================================================== */

function openNameModal(autoSubmit) {

    /*
       If timer expired, stop timer.
    */

    if (autoSubmit) {

        examEnded = true;

        clearInterval(
            timerInterval
        );

    }


    /*
       Save current answer one final time.
    */

    let answered =
        saveCurrentAnswer();


    if (answered) {

        review[current] = false;

    }


    updatePalette();


    /*
       Show name box
    */

    document.getElementById(
        "candidateName"
    ).value = "";


    document.getElementById(
        "nameModal"
    ).style.display = "flex";


    /*
       Automatically focus input.
    */

    setTimeout(
        function () {

            document.getElementById(
                "candidateName"
            ).focus();

        },
        100
    );

}


/* =====================================================
   CLOSE NAME MODAL
   ===================================================== */

function closeNameModal() {

    /*
       If the exam has ended because
       of manual submission, don't allow
       going back to exam.

       We simply keep the modal open.
    */

    if (examEnded) {

        return;

    }


    document.getElementById(
        "nameModal"
    ).style.display = "none";

}


/* =====================================================
   FINAL SUBMIT
   ===================================================== */

function finalSubmit() {

    /*
       Get name
    */

    let name =
        document.getElementById(
            "candidateName"
        ).value.trim();


    /*
       Name required
    */

    if (name === "") {

        document.getElementById(
            "candidateName"
        ).focus();

        return;

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
       Name
    */

    url +=
        "?name=" +
        encodeURIComponent(
            name
        );


    /*
       All answers
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


    /*
       Send to Google Sheets silently.

       The student will NOT be taken
       to the Google Apps Script page.
    */

    let iframe =
        document.createElement(
            "iframe"
        );


    iframe.style.display =
        "none";


    iframe.src =
        url;


    document.body.appendChild(
        iframe
    );


    /*
       Hide name modal
    */

    document.getElementById(
        "nameModal"
    ).style.display = "none";


    /*
       Show result
    */

    document.getElementById(
        "resultName"
    ).innerText =
        "Candidate: " +
        name;


    document.getElementById(
        "resultScore"
    ).innerText =
        score +
        " / " +
        questions.length;


    /*
       Give Google Apps Script
       a moment to receive data.
    */

    setTimeout(
        function () {

            document.getElementById(
                "resultModal"
            ).style.display = "flex";

        },
        800
    );


    /*
       Remove timer data
    */

    sessionStorage.removeItem(
        "gateExamStartTime"
    );

}


/* =====================================================
   RESULT
   ===================================================== */

function closeResultAndReload() {

    location.reload();

}


/* =====================================================
   CALCULATOR
   ===================================================== */

function openCalculator() {

    document.getElementById(
        "calculator"
    ).style.display = "block";

}


function closeCalculator() {

    document.getElementById(
        "calculator"
    ).style.display = "none";

}


function calcInput(value) {

    let display =
        document.getElementById(
            "calc-display"
        );


    display.value += value;

}


function calcClear() {

    document.getElementById(
        "calc-display"
    ).value = "";

}


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


function calculateResult() {

    let display =
        document.getElementById(
            "calc-display"
        );


    let expression =
        display.value;


    try {

        /*
           x^y → JavaScript **
        */

        expression =
            expression.replace(
                /\^/g,
                "**"
            );


        /*
           sqrt(
        */

        expression =
            expression.replace(
                /sqrt\(/g,
                "Math.sqrt("
            );


        /*
           Calculate
        */

        let result =
            Function(
                "return " +
                expression
            )();


        /*
           Limit decimal length
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
