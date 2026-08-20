let current = 0;

let answers =
    new Array(questions.length).fill(null);

let review =
    new Array(questions.length).fill(false);

let examEnded = false;

let timerInterval;

const EXAM_TIME = 30 * 60;


/* =====================================================
   START EXAM
   ===================================================== */

function startExam() {

    clearInterval(timerInterval);

    current = 0;

    answers =
        new Array(questions.length).fill(null);

    review =
        new Array(questions.length).fill(false);

    examEnded = false;

    sessionStorage.setItem(
        "gateExamStartTime",
        Date.now()
    );

    document.getElementById(
        "startScreen"
    ).style.display = "none";

    document.getElementById(
        "examArea"
    ).style.display = "flex";

    document.getElementById(
        "calculatorButton"
    ).disabled = false;

    loadQuestion();

    updatePalette();

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

    document.getElementById(
        "questionType"
    ).innerText =
        q.type +
        " — " +
        q.marks +
        " Mark" +
        (q.marks > 1 ? "s" : "");


    document.getElementById(
        "question"
    ).innerText =
        "Q" +
        (current + 1) +
        ". " +
        q.question;


    let html = "";


    /* ============================
       NAT
       ============================ */

    if (q.type === "NAT") {

        let previous =
            answers[current];

        html = `

            <div class="nat-answer">

                <label>
                    Enter your answer:
                </label>

                <input
                    type="number"
                    id="natInput"
                    step="0.01"
                    min="0"
                    placeholder="Enter answer"
                    value="${
                        previous !== null
                        ? previous
                        : ""
                    }"
                >

                <p class="nat-note">
                    Enter the answer correct to TWO decimal places.
                </p>

            </div>

        `;

    }


    /* ============================
       MSQ
       ============================ */

    else if (q.type === "MSQ") {

        q.options.forEach(
            function(opt, i) {

                let checked =
                    Array.isArray(
                        answers[current]
                    ) &&
                    answers[current].includes(i);


                html += `

                    <label>

                        <input

                            type="checkbox"

                            name="option"

                            value="${i}"

                            ${checked ? "checked" : ""}

                        >

                        ${opt}

                    </label>

                `;

            }
        );

    }


    /* ============================
       MCQ
       ============================ */

    else {

        q.options.forEach(
            function(opt, i) {

                let checked =
                    answers[current] === i;


                html += `

                    <label>

                        <input

                            type="radio"

                            name="option"

                            value="${i}"

                            ${checked ? "checked" : ""}

                        >

                        ${opt}

                    </label>

                `;

            }
        );

    }


    document.getElementById(
        "options"
    ).innerHTML = html;


    updatePalette();
}


/* =====================================================
   SAVE ANSWER
   ===================================================== */

function saveCurrentAnswer() {

    let q =
        questions[current];


    /* ============================
       NAT
       ============================ */

    if (q.type === "NAT") {

        let input =
            document.getElementById(
                "natInput"
            );


        if (
            !input ||
            input.value.trim() === ""
        ) {

            answers[current] = null;

            return false;

        }


        answers[current] =
            parseFloat(
                input.value
            );


        return true;

    }


    /* ============================
       MCQ
       ============================ */

    if (q.type === "MCQ") {

        let selected =
            document.querySelector(
                'input[name="option"]:checked'
            );


        if (!selected) {

            answers[current] = null;

            return false;

        }


        answers[current] =
            parseInt(
                selected.value
            );


        return true;

    }


    /* ============================
       MSQ
       ============================ */

    if (q.type === "MSQ") {

        let selected =
            document.querySelectorAll(
                'input[name="option"]:checked'
            );


        let selectedAnswers = [];


        selected.forEach(
            function(item) {

                selectedAnswers.push(
                    parseInt(
                        item.value
                    )
                );

            }
        );


        if (
            selectedAnswers.length === 0
        ) {

            answers[current] = null;

            return false;

        }


        answers[current] =
            selectedAnswers.sort(
                (a, b) => a - b
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


    if (answered) {

        review[current] = false;

    }


    updatePalette();


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
   PALETTE
   ===================================================== */

function updatePalette() {

    let palette =
        document.getElementById(
            "palette"
        );


    palette.innerHTML = "";


    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        let colorClass =
            "not-answered";


        if (review[i]) {

            colorClass =
                "review";

        }

        else if (
            answers[i] !== null
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


    if (remaining <= 0) {

        document.getElementById(
            "timer"
        ).innerText =
            "00:00";


        clearInterval(
            timerInterval
        );


        examEnded = true;


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

        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");


    if (remaining <= 300) {

        document.querySelector(
            ".timer-box"
        ).classList.add(
            "timer-warning"
        );

    }

}


/* =====================================================
   SUBMIT
   ===================================================== */

function submitExam() {

    saveCurrentAnswer();

    updatePalette();

    document.getElementById(
        "submitModal"
    ).style.display =
        "flex";

}


function closeSubmitModal() {

    document.getElementById(
        "submitModal"
    ).style.display =
        "none";

}


function confirmSubmit() {

    closeSubmitModal();

    examEnded = true;

    clearInterval(timerInterval);

    openNameModal(false);

}


/* =====================================================
   NAME
   ===================================================== */

function openNameModal(autoSubmit) {

    saveCurrentAnswer();

    updatePalette();

    document.getElementById(
        "candidateName"
    ).value = "";

    document.getElementById(
        "nameModal"
    ).style.display =
        "flex";


    setTimeout(
        () => {

            document.getElementById(
                "candidateName"
            ).focus();

        },
        100
    );

}


function closeNameModal() {

    if (examEnded) {

        return;

    }


    document.getElementById(
        "nameModal"
    ).style.display =
        "none";

}


/* =====================================================
   SCORE
   ===================================================== */

function calculateScore() {

    let score = 0;


    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        let q =
            questions[i];


        /* ============================
           NAT
           ============================ */

        if (q.type === "NAT") {

            if (
                answers[i] === null
            ) {

                continue;

            }


            /*
               Allow answer within
               0.01 tolerance.
            */

            if (
                Math.abs(
                    answers[i] -
                    q.answer
                ) <= 0.01
            ) {

                score += q.marks;

            }

            continue;

        }


        /* ============================
           MSQ
           ============================ */

        if (q.type === "MSQ") {

            if (
                !Array.isArray(
                    answers[i]
                )
            ) {

                continue;

            }


            let student =
                answers[i]
                    .slice()
                    .sort(
                        (a,b) => a-b
                    );


            let correct =
                q.correctAnswers
                    .slice()
                    .sort(
                        (a,b) => a-b
                    );


            let isCorrect =
                student.length ===
                correct.length;


            if (isCorrect) {

                for (
                    let j = 0;
                    j < correct.length;
                    j++
                ) {

                    if (
                        student[j] !==
                        correct[j]
                    ) {

                        isCorrect = false;

                        break;

                    }

                }

            }


            /*
               MSQ:
               Correct = +marks
               Wrong = 0
            */

            if (isCorrect) {

                score += q.marks;

            }

            continue;

        }


        /* ============================
           MCQ
           ============================ */

        if (q.type === "MCQ") {

            if (
                answers[i] === null
            ) {

                continue;

            }


            if (
                answers[i] ===
                q.answer
            ) {

                score += q.marks;

            }

            else {

                /*
                   Wrong MCQ = -1
                */

                score -= 1;

            }

        }

    }


    return score;
}


/* =====================================================
   FINAL SUBMIT
   ===================================================== */

function finalSubmit() {

    let name =
        document.getElementById(
            "candidateName"
        ).value.trim();


    if (!name) {

        return;

    }


    let score =
        calculateScore();


    let url =
        "https://script.google.com/macros/s/AKfycbyp-6oaHho0YJ_dh_m7S189TUghfzsTs_3YvRxkchmsCzuCfUPOjlK7CtzgXqGSM71d/exec";


    url +=
        "?name=" +
        encodeURIComponent(
            name
        );


    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        let answer = "";


        if (
            answers[i] !== null
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


    url +=
        "&score=" +
        encodeURIComponent(
            score
        );


    /*
       Send to Google Sheets
       without opening another page.
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


    document.getElementById(
        "nameModal"
    ).style.display =
        "none";


    /*
       Maximum score:
       Q1-6 = 6
       Q7-8 = 4
       Q9-15 = 14
       TOTAL = 24
    */

    document.getElementById(
        "resultName"
    ).innerText =
        "Candidate: " + name;


    document.getElementById(
        "resultScore"
    ).innerText =
        score + " / 24";


    document.getElementById(
        "resultModal"
    ).style.display =
        "flex";


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

    document.getElementById(
        "calc-display"
    ).value += value;

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


        display.value =
            result;

    }

    catch (error) {

        display.value =
            "Error";

    }

}
