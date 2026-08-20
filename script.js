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

const EXAM_TIME = 30 * 60;


/* =====================================================
   START EXAM
   ===================================================== */

function startExam() {

    clearInterval(timerInterval);


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
       Start timer
    */

    let startTime =
        Date.now();


    sessionStorage.setItem(
        "gateExamStartTime",
        startTime
    );


    /*
       Show exam
    */

    document.getElementById(
        "startScreen"
    ).style.display = "none";


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

        return;

    }


    /*
       Question type
    */

    document.getElementById(
        "questionType"
    ).innerText =
        q.type;


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


    let html = "";


    /*
       MCQ = radio buttons
       MSQ = checkboxes
    */

    q.options.forEach(
        function (opt, i) {


            let checked = false;


            if (
                q.type === "MCQ"
            ) {

                checked =
                    answers[current] === i;

            }


            else if (
                q.type === "MSQ"
            ) {

                checked =
                    Array.isArray(
                        answers[current]
                    ) &&
                    answers[current].includes(i);

            }


            let inputType =
                q.type === "MSQ"
                    ? "checkbox"
                    : "radio";


            html += `

                <label>

                    <input

                        type="${inputType}"

                        name="option"

                        value="${i}"

                        ${checked ? "checked" : ""}

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

    let q =
        questions[current];


    /*
       MCQ
    */

    if (
        q.type === "MCQ"
    ) {

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


    /*
       MSQ
    */

    if (
        q.type === "MSQ"
    ) {

        let selected =
            document.querySelectorAll(
                'input[name="option"]:checked'
            );


        let selectedAnswers = [];


        selected.forEach(
            function (item) {

                selectedAnswers.push(
                    parseInt(
                        item.value
                    )
                );

            }
        );


        /*
           No selections
        */

        if (
            selectedAnswers.length === 0
        ) {

            answers[current] = null;

            return false;

        }


        answers[current] =
            selectedAnswers.sort(
                function(a, b) {
                    return a - b;
                }
            );


        return true;

    }


    return false;

}


/* =====================================================
   SAVE & NEXT
   ===================================================== */

function saveNext() {

    let answered =
        saveCurrentAnswer();


    /*
       Answered + Save & Next
       removes review status.

       PURPLE → GREEN
    */

    if (answered) {

        review[current] = false;

    }


    updatePalette();


    /*
       Move to next
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
           Last question.
           Stay on Q15.
           Palette already updated.
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

    saveCurrentAnswer();

    review[current] = true;

    updatePalette();

}


/* =====================================================
   CHECK WHETHER ANSWER EXISTS
   ===================================================== */

function hasAnswer(i) {

    return (
        answers[i] !== null &&
        answers[i] !== undefined
    );

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


        if (
            review[i]
        ) {

            colorClass =
                "review";

        }


        else if (
            hasAnswer(i)
        ) {

            colorClass =
                "answered";

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
   JUMP
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

    if (
        remaining <= 0
    ) {

        document.getElementById(
            "timer"
        ).innerText =
            "00:00";


        clearInterval(
            timerInterval
        );


        examEnded = true;


        /*
           Automatically open
           name entry.
        */

        openNameModal(true);

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
       Last 5 minutes
    */

    if (
        remaining <= 300
    ) {

        document.querySelector(
            ".timer-box"
        ).classList.add(
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
       Custom confirmation
    */

    document.getElementById(
        "submitModal"
    ).style.display =
        "flex";

}


/* =====================================================
   CLOSE SUBMIT MODAL
   ===================================================== */

function closeSubmitModal() {

    document.getElementById(
        "submitModal"
    ).style.display =
        "none";

}


/* =====================================================
   CONFIRM SUBMIT
   ===================================================== */

function confirmSubmit() {

    closeSubmitModal();


    examEnded = true;


    clearInterval(
        timerInterval
    );


    openNameModal(false);

}


/* =====================================================
   NAME MODAL
   ===================================================== */

function openNameModal(autoSubmit) {

    /*
       Save current answer again.
    */

    let answered =
        saveCurrentAnswer();


    if (answered) {

        review[current] = false;

    }


    updatePalette();


    /*
       Show name modal
    */

    document.getElementById(
        "candidateName"
    ).value = "";


    document.getElementById(
        "nameModal"
    ).style.display =
        "flex";


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
       If exam has ended, don't allow
       cancelling the submission.
    */

    if (examEnded) {

        return;

    }


    document.getElementById(
        "nameModal"
    ).style.display =
        "none";

}


/* =====================================================
   FINAL SUBMIT
   ===================================================== */

function finalSubmit() {

    let name =
        document.getElementById(
            "candidateName"
        ).value.trim();


    if (
        name === ""
    ) {

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

        let q =
            questions[i];


        /*
           ==============================
           MCQ
           ==============================
        */

        if (
            q.type === "MCQ"
        ) {

            /*
               Unanswered = 0
            */

            if (
                answers[i] === null ||
                answers[i] === undefined
            ) {

                continue;

            }


            /*
               Correct = +4
            */

            if (
                answers[i] ===
                q.answer
            ) {

                score += 4;

            }


            /*
               Wrong = -1
            */

            else {

                score -= 1;

            }

        }


        /*
           ==============================
           MSQ
           ==============================
        */

        else if (
            q.type === "MSQ"
        ) {

            /*
               Unanswered = 0
            */

            if (
                !Array.isArray(
                    answers[i]
                ) ||
                answers[i].length === 0
            ) {

                continue;

            }


            /*
               Compare selected options
               with correct options.
            */

            let studentAnswer =
                answers[i].slice().sort(
                    function(a, b) {
                        return a - b;
                    }
                );


            let correctAnswer =
                q.answer.slice().sort(
                    function(a, b) {
                        return a - b;
                    }
                );


            let correct =
                studentAnswer.length ===
                correctAnswer.length;


            if (correct) {

                for (
                    let j = 0;
                    j < studentAnswer.length;
                    j++
                ) {

                    if (
                        studentAnswer[j] !==
                        correctAnswer[j]
                    ) {

                        correct = false;

                        break;

                    }

                }

            }


            /*
               Correct MSQ = +4
               Wrong MSQ = 0
            */

            if (correct) {

                score += 4;

            }

        }

    }


    /* =================================================
       GOOGLE APPS SCRIPT
       ================================================= */

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
       Send answers

       MCQ:
       0, 1, 2, 3

       MSQ:
       0,1,2
    */

    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        let answer = "";


        if (
            answers[i] !== null &&
            answers[i] !== undefined
        ) {

            if (
                Array.isArray(
                    answers[i]
                )
            ) {

                answer =
                    answers[i].join(",");

            }

            else {

                answer =
                    answers[i];

            }

        }


        url +=
            "&q" +
            (i + 1) +
            "=" +
            encodeURIComponent(
                answer
            );

    }


    /*
       Send final score
    */

    url +=
        "&score=" +
        encodeURIComponent(
            score
        );


    /*
       Send silently
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
    ).style.display =
        "none";


    /*
       Display result
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
        (questions.length * 4);


    /*
       Show result
    */

    setTimeout(
        function () {

            document.getElementById(
                "resultModal"
            ).style.display =
                "flex";

        },
        800
    );


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
    ).style.display =
        "block";

}


function closeCalculator() {

    document.getElementById(
        "calculator"
    ).style.display =
        "none";

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
