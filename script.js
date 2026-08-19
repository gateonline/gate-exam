/* =========================================
   GENERAL PAGE
   ========================================= */

body {

    font-family: Arial, sans-serif;

    margin: 0;

    background: #ffffff;

}


/* =========================================
   HEADER
   ========================================= */

.header {

    background: #1e3a8a;

    color: white;

    padding: 15px 25px;

}


.header h2 {

    margin: 0;

    font-size: 24px;

}


/* =========================================
   MAIN CONTAINER
   ========================================= */

.container {

    display: flex;

    min-height: 90vh;

}


/* =========================================
   QUESTION AREA
   ========================================= */

.question-area {

    width: 70%;

    padding: 30px;

    box-sizing: border-box;

}


#question {

    white-space: pre-line;

    font-size: 20px;

    line-height: 1.6;

    margin-bottom: 25px;

}


/* =========================================
   OPTIONS
   ========================================= */

#options {

    font-size: 17px;

}


.option {

    display: flex;

    align-items: flex-start;

    gap: 10px;

    padding: 12px;

    margin-bottom: 8px;

    border-radius: 5px;

    cursor: pointer;

}


.option:hover {

    background: #f1f5f9;

}


.option input {

    margin-top: 5px;

}


/* =========================================
   BUTTONS
   ========================================= */

.buttons {

    margin-top: 35px;

}


.buttons button {

    margin: 5px;

    padding: 11px 16px;

    border: 1px solid #888;

    background: #ffffff;

    color: #111111;

    border-radius: 4px;

    cursor: pointer;

    font-size: 14px;

}


.buttons button:hover {

    background: #e5e7eb;

}


/* =========================================
   RIGHT QUESTION PALETTE
   ========================================= */

.palette-section {

    width: 30%;

    background: #f1f1f1;

    padding: 25px;

    box-sizing: border-box;

}


.palette-section h3 {

    margin-top: 0;

    margin-bottom: 20px;

    font-size: 20px;

}


/* =========================================
   COLOR LEGEND
   ========================================= */

.legend {

    display: flex;

    flex-direction: column;

    gap: 10px;

    margin-bottom: 25px;

    font-size: 14px;

}


.legend-item {

    display: flex;

    align-items: center;

    gap: 10px;

}


/* Small boxes beside the legend */

.legend-box {

    width: 22px;

    height: 22px;

    display: inline-block;

    border-radius: 3px;

    border: 1px solid #777;

}


/* GREEN = ANSWERED */

.legend-box.answered {

    background: #22c55e;

}


/* PURPLE = MARKED FOR REVIEW */

.legend-box.review {

    background: #9333ea;

}


/* GREY = NOT ANSWERED */

.legend-box.not-answered {

    background: #d1d5db;

}


/* =========================================
   QUESTION NUMBER GRID
   ========================================= */

.palette {

    display: grid;

    grid-template-columns: repeat(5, 50px);

    gap: 10px;

}


/* =========================================
   ALL QUESTION BUTTONS
   ========================================= */

.palette button {

    height: 45px;

    width: 45px;

    border: 1px solid #777;

    border-radius: 4px;

    font-size: 15px;

    cursor: pointer;

}


/* =========================================
   NOT ANSWERED
   ========================================= */

.palette button.not-answered {

    background: #d1d5db !important;

    color: #111111 !important;

    border-color: #999999;

}


/* =========================================
   ANSWERED
   ========================================= */

.palette button.answered {

    background: #22c55e !important;

    color: white !important;

    border-color: #15803d;

}


/* =========================================
   MARKED FOR REVIEW
   ========================================= */

.palette button.review {

    background: #9333ea !important;

    color: white !important;

    border-color: #6b21a8;

}


/* =========================================
   HOVER EFFECT
   ========================================= */

.palette button:hover {

    opacity: 0.8;

}
