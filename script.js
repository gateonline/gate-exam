let current = 0;

let answers = new Array(questions.length).fill(null);

let review = new Array(questions.length).fill(false);

loadQuestion();


function loadQuestion(){

    let q = questions[current];

    document.getElementById("question").innerText =
        "Q" + (current + 1) + ". " + q.question;

    let html = "";

    q.options.forEach((opt, i) => {

        if(q.type === "MCQ"){

            let checked =
                answers[current] === i ? "checked" : "";

            html += `
                <label class="option">
                    <input
                        type="radio"
                        name="option"
                        value="${i}"
                        ${checked}>
                    <span>${opt}</span>
                </label>
            `;

        }

        else if(q.type === "MSQ"){

            let checked = "";

            if(
                Array.isArray(answers[current]) &&
                answers[current].includes(i)
            ){
                checked = "checked";
            }

            html += `
                <label class="option">
                    <input
                        type="checkbox"
                        name="option"
                        value="${i}"
                        ${checked}>
                    <span>${opt}</span>
                </label>
            `;
        }

    });

    document.getElementById("options").innerHTML = html;

    updatePalette();
}


function saveAnswer(){

    let q = questions[current];

    if(q.type === "MCQ"){

        let selected =
            document.querySelector(
                'input[name="option"]:checked'
            );

        if(selected){

            answers[current] =
                parseInt(selected.value);

        }

    }

    else if(q.type === "MSQ"){

        let selected =
            document.querySelectorAll(
                'input[name="option"]:checked'
            );

        let selectedAnswers = [];

        selected.forEach(item => {

            selectedAnswers.push(
                parseInt(item.value)
            );

        });

        if(selectedAnswers.length > 0){

            answers[current] = selectedAnswers;

        }
        else{

            answers[current] = null;

        }

    }
}


function saveNext(){

    saveAnswer();

    if(current < questions.length - 1){

        current++;

        loadQuestion();

    }

}


function prevQuestion(){

    saveAnswer();

    if(current > 0){

        current--;

        loadQuestion();

    }

}


function clearResponse(){

    answers[current] = null;

    loadQuestion();

}


function markReview(){

    saveAnswer();

    review[current] = true;

    updatePalette();

}


function updatePalette(){

    let palette =
        document.getElementById("palette");

    palette.innerHTML = "";

    for(let i = 0; i < questions.length; i++){

        let colorClass = "not-answered";

        if(review[i]){

            colorClass = "review";

        }

        else if(answers[i] !== null){

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


function jump(i){

    saveAnswer();

    current = i;

    loadQuestion();

}


function arraysEqual(a, b){

    if(!Array.isArray(a) || !Array.isArray(b)){

        return false;

    }

    if(a.length !== b.length){

        return false;

    }

    let x = [...a].sort((a,b) => a-b);

    let y = [...b].sort((a,b) => a-b);

    return x.every(
        (value, index) =>
            value === y[index]
    );

}


function isCorrect(i){

    let q = questions[i];

    if(q.type === "MCQ"){

        return answers[i] === q.answer;

    }

    if(q.type === "MSQ"){

        return arraysEqual(
            answers[i],
            q.answers
        );

    }

    return false;

}


function submitExam(){

    saveAnswer();

    let name =
        prompt("Enter your name");

    if(!name){

        return;

    }

    let score = 0;

    for(let i = 0; i < questions.length; i++){

        if(isCorrect(i)){

            score++;

        }

    }


    /*
    ==================================================
    GOOGLE APPS SCRIPT WEB APP URL
    ==================================================

    REPLACE THE URL BELOW with your current
    Google Apps Script /exec URL.

    Example:
    https://script.google.com/macros/s/XXXXXXXX/exec
    */

    let url =
    "https://script.google.com/macros/s/AKfycbyp-6oaHho0YJ_dh_m7S189TUghfzsTs_3YvRxkchmsCzuCfUPOjlK7CtzgXqGSM71d/exec";


    url +=
        "?name=" +
        encodeURIComponent(name);


    for(
        let i = 0;
        i < answers.length;
        i++
    ){

        let value = answers[i];

        /*
        MSQ answers such as
        [0,1,2] become "0,1,2"
        */

        if(Array.isArray(value)){

            value = value.join(",");

        }

        if(value === null){

            value = "";

        }

        url +=
            "&q" +
            (i + 1) +
            "=" +
            encodeURIComponent(value);

    }


    url +=
        "&score=" +
        score;


    /*
    Send the result to Google Apps Script.
    */

    window.open(url, "_blank");


    alert(
        "Exam submitted!\n\n" +
        "Score: " +
        score +
        " / " +
        questions.length
    );

}
