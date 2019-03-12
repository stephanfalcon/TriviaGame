start = $(".start")
answer = $(".answer")
game = $(".game")
questionNum=0;
correct = 0;
incorrect = 0;
time = 30;
nomore = false;
question = [
    quest1 = {
        que : "what color is a fire truck",

        correct : "red",
        incorrect:["blue","green","purple"]
    },
    quest2 = {
        que: "what sound does a dog make?",

        correct:"woof",
        incorrect:["meow","oink","hello there I am a dog"]
    },
    quest={
        que:"why is the sky blue",

        correct:"the reflection of the ocean back into the atmosphere?",
        incorrect:["Magic elves make it blue","bob ross paints the sky every morning","that is the color of space"]
    },
    quest={
        que:"where is the great wall of china?",

        correct:"china",
        incorrect:["russia","australia","the great wall of china is fake news"]
    },
    // quest={
    //     que:"when is noon",

    //     correct:"12 oclock",
    //     incorrect:["","",""]
    // },
    // quest={
    //     que:"",

    //     correct:"",
    //     incorrect:["","",""]
    // },
    // quest={
    //     que:"",

    //     correct:"",
    //     incorrect:["","",""]
    // },
    // quest={
    //     que:"",

    //     correct:"",
    //     incorrect:["","",""]
    // },
    // quest={
    //     que:"",

    //     correct:"",
    //     incorrect:["","",""]
    // },
    // quest={
    //     que:"",

    //     correct:"",
    //     incorrect:["","",""]
    // },
    // quest={
    //     que:"",

    //     correct:"",
    //     incorrect:["","",""]
    // },
    // quest={
    //     que:"",

    //     correct:"",
    //     incorrect:["","",""]
    // },

]
//game start function
start.on("click", function(){
    newQuest(question[questionNum])
    tStart()
})


// VERY IMPORTANT
// REMEMBER THIS
// THIS IS IMPORTANT
// !!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
$(document).on("click",".answer", function(){
    text = $(this).text()
    answerCheck(text)
    newQuest(question[questionNum])
})
// $(".main").on("click", function(event){
//     console.log(event.hasClass("answer"))
// })
// new question function
function newQuest(what){
    // checks if there are any questions left
    if(questionNum== question.length){
        noMore()

        return;
    }
    
    // empties the game div so questions dont repeat
    game.empty()
    // creates new elemements with answers and question
    answers = []
    q = $("<h2></h2>").text(what.que)
    answers.push(what.correct);
    for(i in what.incorrect){
        answers.push(what.incorrect[i]);
    }
    // appends the q the elements to the game board
    game.append(q)
    shuffle(answers);

    for (i in answers){
        a = $("<h3></h3>")
        a.text(answers[i])
        a.addClass("answer")
        a.hover(
            function(){
                $(this).css("background", "black")
                $(this).css("color","white")
            },
            function(){
                $(this).css("background", "none")
                $(this).css("color","black")
            })
        game.append(a)
    }
    
}

// check that sees if what you picked is right or not
function answerCheck(text){
    if (text == question[questionNum].correct){
        correct++;
    }else{
        incorrect++;
    }
    time = 30
    questionNum++
}
// function for when there are no more questions
function noMore(){
    game.empty()
    $("#timer").empty()
    nomore=true
    div = $("<div>")
    finished = $("<h2>")
    finished.text("Your final score is:")
    score =$("<div>")
    score.addClass("row")
    final = $("<h2>")
    $(final).text(`correct: ${correct}   incorrect:${incorrect}`)
    score.append(final)
    div.append(finished,score)
    game.append(div)
    
}
// function to shuffle the answers 
function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

// while there are elements in the array
    while (ctr > 0) {
// pick a random index
        index = Math.floor(Math.random() * ctr);
// decrease ctr by 1
        ctr--;
// and swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

function tStart(){
    
    timer = setInterval(function(){
        if(nomore==true){
            clearInterval(timer)
            return
        }
        decrement()
        time--
        console.log(time)
        if(time<1){
            answerCheck("")
            newQuest(question[questionNum])
            
        }
    },1000)
    
}
function decrement(){
    $("#timer").text(time)
}
