var playing =false;
var score;
var chanceLeft;
var action;     //used for setInterval
var step;
var fruits = ['apple','banana','cherries','grapes','mango','orange','peach','pear','watermelon'];
$(function(){
    $("#startresetButton").button();
    
    //click startReset button
    $("#startresetButton").click(function(){
        //are we playing?
            //yes
        if(playing==true)
            {
                // reload page
                location.reload();
            }else{
                //we are not playing
                playing= true;
                
                //set score to 0
                score=0;
                $("#scorevalue").html(score);
                
                //change text of button to Reset Game
                $("#startresetButton").text("Reset Game");
                
                //show chances box
                $("#chance").show();
                chanceLeft=3;
                addHearts();
                
                //start sending fruits
                startAction();
                
                //hide gameOver box
                $("#gameOver").hide();
            }
    });
    $("#fruit1").mouseover().css("cursor","crosshair")
    $("#fruit1").mouseover(function(){
       score++;
        $("#scorevalue").html(score);   //update score
//        document.getElementById("slicesound").play();
        $("#slicesound")[0].play(); //playing sound
        
        //stop fruit
        clearInterval(action);
        
        //hide fruit through animation
        
        $("#fruit1").hide("explode",500);
        
        //send new fruit after animation is done
        setTimeout(startAction,500);
        
    });
    
    //developer tag
    $("#developer").html("&copy; pakvnet.tk");
    
    //buttons
    $("#option").button({
                icons: {
                    primary: "ui-icon-notice"
                },
                text: false
            });
    $("#developerButton").button({
        icons: {
            primary: "ui-icon-circle-check"
        },
        text: false
    });
    
    //tooltips
    $("#option").tooltip({
        show: {effect: "slideDown"}
    });
    $("#developerButton").tooltip({
        show: {effect: "slideDown"}
    });
    
    //make  dialogs
    $("#optionDialog").dialog({
        autoOpen: false,
        width: 400,
        modal: true,
        buttons: {
            "Ok": function(){$(this).dialog("close");},
//            "Cancel":function(){$(this).dialog("close");}
        }
    });
    
    $("#developerDialog").dialog({
         autoOpen: false,
        width: 540,
        modal: true,
        buttons: {
            "Ok": function(){$(this).dialog("close");},
//            "Cancel":function(){$(this).dialog("close");}
        }
    });
    
    //click on buttons to access dialog
    
    $("#option").click(function(){
        $("#optionDialog").dialog("open");
    });
    
    $("#developerButton").click(function(){
        $("#developerDialog").dialog("open");
    });
    
    //Loading ajax
    
    $("#option").click(function(){
        $("#loadGuide").show();
    });
    
    $("#developerButton").click(function(){
        $("#loadDeveloper").show();
    });
    
    

//functions

function addHearts(){
    $("#chance").empty();
    for(i=0; i<chanceLeft; i++){
        $("#chance").append('<img src="images/heart.png" class="life">');
    }
}

//start sending fruits

function startAction(){
    //show fruits
    $("#fruit1").show();
    chooseFruit();  //choose a random fruit
    randomPosition();   //generate a random position
    randomStep();       //generate a random step
    action= setInterval(function(){
        $("#fruit1").css('top', $("#fruit1").position().top + step); //move fruit down by 1 step
        if($("#fruit1").position().top > $("#gameArea").height()){
            if(chanceLeft > 1){ //check that any chance left?   
                //yes>> then
                
                 //show fruits
                $("#fruit1").show();
                chooseFruit();  //choose a random fruit
            randomPosition();  //generate a random position
            randomStep();     //generate a random step
                chanceLeft--; //reduce chance left by 1
                
                    //populate chanceLeft
                addHearts();
                
            }else{ //when chance are not left.
                playing=false;
                $("#gameOver").show().html('<p>Game over!</p><p>your score is '+score+'.</p>');
                $("#chance").hide();
                $("#startresetButton").html("Start Game");
                stopAction();
            }
        }
    }, 10); 
}

//generate a random fruit
function chooseFruit(){
    $("#fruit1").attr('src','images/'+fruits[Math.round(8*Math.random())]+'.png');
}

//generate a random position
function randomPosition(){
    $("#fruit1").css({'left': Math.round(400*Math.random()), 'top': -60});
}
function randomStep(){
    step= 1+ Math.round(5*Math.random());
}

//stop dropping fruits

function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
});