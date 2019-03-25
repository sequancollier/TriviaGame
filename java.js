$(document).ready(function(){
  
  
  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click' , '.option', trivia.guessChecker);
  
})

var trivia = {
  
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 30,
  timerOn: false,
  timerId : '',
 
  questions: {
    q1: 'Which team has never won a Super Bowl?',
    q2: 'Who has the all-time record for receiving yards?',
    q3: 'What Team won the first Super Bowl ?',
    q4: 'Where is the NFL Combine held',
    q5: "Who was the first QB to throw 500 Touchdowns",
    q6: 'What Teams Motto is just win baby',
    q7: "At the begining of a drive how many plays does a team have to get a first down?"
  },
  options: {
    q1: ['Browns', 'Giants', 'Cowboys', 'Patriots'],
    q2: ['Jerry Rice', 'Randy Moss', 'Terrell Owens', 'Odell Beckham Jr.'],
    q3: ['Giants', 'Packers', 'Jets', 'Ravens'],
    q4: ['Dallas', 'London', 'NYC', 'Indianapolis'],
    q5: ['Peyton Manning','Tom Brady','Brett Favre','John Elway'],
    q6: ['Raiders','Packers','Cowboys','Giants'],
    q7: ['10', '5', '4','3']
  },
  answers: {
    q1: 'Browns',
    q2: 'Jerry Rice',
    q3: 'Packers',
    q4: 'Indianapolis',
    q5: 'Brett Favre',
    q6: 'Raiders',
    q7: '4'
  },
 
  startGame: function(){
  
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);
    
    
    $('#game').show();
    
    
    $('#results').html('');
    
   
    $('#timer').text(trivia.timer);
    
   
    $('#start').hide();

    $('#remaining-time').show();
    
    
    trivia.nextQuestion();
    
  },

  nextQuestion : function(){
    
   
    trivia.timer = 10;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);
    
    
    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    
    
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);
    
   
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];
    
    
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
    
  },
  
  timerRunning : function(){
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
   
    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
  
    else if(trivia.currentSet === Object.keys(trivia.questions).length){
      

      $('#results')
        .html('<h3>Thank you for playing!</h3>'+
        '<p>Correct: '+ trivia.correct +'</p>'+
        '<p>Incorrect: '+ trivia.incorrect +'</p>'+
        '<p>Unaswered: '+ trivia.unanswered +'</p>'+
        '<p>Please play again!</p>');
      
      
      $('#game').hide();
      
      
      $('#start').show();
    }
    
  },
  
  guessChecker : function() {
    
    
    var resultId;
    
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
    
    if($(this).text() === currentAnswer){
     
      $(this).addClass('btn-success').removeClass('btn-info');
      
      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Correct Answer!</h3>');
    }
    
    else{
    
      $(this).addClass('btn-danger').removeClass('btn-info');
      
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
    }
    
  },
  
  guessResult : function(){
    
    
    trivia.currentSet++;
    
   
    $('.option').remove();
    $('#results h3').remove();
    
    
    trivia.nextQuestion();
     
  }

}
