const questionSets = [
    [
        {
            question: `Which of the following assigns the value “happy” into a variable called “feel”?`,
            choices: [
                {text: `let feel = "happy";`, correct: true},
                {text: `let feel = happy;`, correct: false},
                {text: `let feel -> "happy";`, correct: false}
            ]
        },
        {
            question: `Given the following code: let x = 5 + 6; <br>
                        What is the value stored in x?`,
            choices: [
                {text: `11 (Number)`, correct: true},
                {text: `56 (Number)`, correct: false},
                {text: `"5+6" (String)`, correct: false}
            ]
        },
        {
            question: `Given the following code: let x = “7” + “8”; <br>
                        What is the value stored in x?`,
            choices: [
                {text: `"78"`, correct: true},
                {text: `"15"`, correct: false},
                {text: `"7+8"`, correct: false}
            ]
        },
        {
            question: `Given the following code: <br>
                        let x = 3; <br>
                        let y = 4; <br>
                        z = x + y; <br>
                        What is the value stored in z?`,
            choices: [
                {text: `7`, correct: true},
                {text: `8`, correct: false},
                {text: `9`, correct: false}
            ]
        },
        {
            question: `let x = 3; <br>
                        x = 4; <br>
                        y = x + x; <br>
                        What is the value stored in y?`,
            choices: [
                {text: `8`, correct: true},
                {text: `7`, correct: false},
                {text: `9`, correct: false}
            ]
        },
    ],
    [
        {
            question: `Which of the following are valid JavaScript statements?`,
            choices: [
                {text: `let x = 3; let y = 4;`, correct: true},
                {text: `let x = 3, let y = 4`, correct: false},
                {text: `let x = 3 and let y = 4;`, correct: false}
            ]
        },
        {
            question: `Given the following 2 code snippet: <br>
                        I. let x = 5 + 6; &nbsp; &nbsp; II. let x=5+6; <br>
                        Which of them are valid JavaScript statements?`,
            choices: [
                {text: `Both I and II`, correct: true},
                {text: `I only`, correct: false},
                {text: `II only`, correct: false}
            ]
        },
        {
            question: `Given the following code: let x = 20; <br>
                        What is the data type of x?`,
            choices: [
                {text: `Number`, correct: true},
                {text: `String`, correct: false},
                {text: `Boolean`, correct: false}
            ]
        },
        {
            question: `Given the following code: let x = “twenty”; <br>
                        What is the data type of x?`,
            choices: [
                {text: `String`, correct: true},
                {text: `Number`, correct: false},
                {text: `Boolean`, correct: false}
            ]
        },
        {
            question: `Which of the following lines of code makes y become ten times of x?`,
            choices: [
                {text: `y = x * 10;`, correct: true},
                {text: `y = 10x;`, correct: false},
                {text: `x * 10 = y;`, correct: false}
            ]
        }
    ]
];

export function getQuestionSet(i) {
    if (i < questionSets.length) {
        return questionSets[i];
    } else {
        return questionSets[0];
    }
        
}