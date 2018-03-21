"use strict";

// questions pulled from w3 schools
const questions = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    options: ['javascript', 'script', 'scripting', 'js'],
    correctAnswer: 'script',
    userGuess: ''
  },
  {
    question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
    options: ['script src= xxx.js ', 'script name= xxx.js ', 'script href= xxx.js '],
    correctAnswer: 'script src= xxx.js ',
    userGuess: ''
  },
  {
    question: 'How do you write "Hello World" in an alert box?',
    options: ['alert(\'Hello World\')', 'msgBox(\'Hello World\')', 'msg(\'Hello World\')', 'alertBox(\'Hello World\')'],
    correctAnswer: 'alert(\'Hello World\')',
    userGuess: ''
  },
  {
    question: 'How do you create a function in JavaScript?',
    options: ['function:myFunction()', 'function myFunction()', 'function = myFunction()'],
    correctAnswer: 'function myFunction()',
    userGuess: ''
  }
]


// evaluates how many questions were correct
function evaluate(questionArray) {

  return questionArray
    .map(function(question) {
      return Number(question.correctAnswer === question.userGuess)
    })
    .reduce(function(accumulator, currentValue) {
      return accumulator + currentValue
    })

} // evaluate()


// handles click event for a guess
$('#questions').on('click', '.radio-input', function() {
  const answer = $(this);
  questions[answer.data('key')].userGuess = answer.val();
}); // radio-input handler


// don't worry about code below as much, but feel free to check it out

// renders questions to the page --> not a great solution...
function render(questionArray) {
  for (var i = 0; i < questionArray.length; i++) {
    const q = questionArray[i];
    let $card = $('<div class="card">');
    $card.append(`<div class="card-header"><h4 class="title is-4">${q.question}</h4></div>`);
    let control = q.options.reduce((str, option) => str + `<label class="radio"><input class="radio-input" type="radio" name="answer" value="${option}" data-key="${i}">${option}</label>`);
    $card.append(`<div class="card-content"><form id="question-${i}"><div class="control">${control}</div></form></div>`)
    $('#questions').append($card);
  }
} // render

// init stuff
render(questions);
$('#results').hide();
// handle submit
$('#submit').on('click', function() {
  $('#quiz').hide();
  let $results = $('#results');
  $results.append(`<h1 class="title is-1">Score: ${evaluate(questions)}/${questions.length}</h1>`)
  $results.show();
});
