var paddleHeight = 85;
var paddleWidth= 12
var ballRadius = 15;
var halfPaddleHeight = paddleHeight/2;
var speedOfPaddle1 = 0;
var speedOfPaddle2 = 0;
var positionOfPaddle1 = 220;
var positionOfPaddle2 = 220;
var topPositionOfBall = 510;
var leftPositionOfBall = 820;
var topSpeedOfBall = 10;
var leftSpeedOfBall = 0;
var score1 = 0;
var score2 = 0;

//2players
function startBall(){
    topPositionOfBall = 510;
    leftPositionOfBall = 820;

    if(Math.random() < 0.5)
    {
        var side = 1;
    }
    else
    {
        var side = -1;
    }

    leftSpeedOfBall = side * (Math.random() * 6 + 5)
    topSpeedOfBall = Math.random() * 6 + 5;

}

function finishBall(){


    if(score1 == 5 || score2 ==5){
        score1 =0;
        score2=0;
        leftSpeedOfBall = 0
        topSpeedOfBall = 0;
        positionOfPaddle1 = 220;
        positionOfPaddle2 = 220;
        topPositionOfBall = 510;
        leftPositionOfBall = 820;
        document.getElementById('finish-bar').style.display ='flex';
        document.getElementById('finish-bar').style.justifyContent ='center';
        document.getElementById('finish-bar').style.color ='white';
        document.getElementById('finish-bar').style.fontSize ='70px';


    }

}


document.addEventListener('keydown', function(e){
    //w
    if(e.keyCode == 87  || e.which == 87){
        speedOfPaddle1=-10;
    }
    //s
    if(e.keyCode == 83  || e.which == 83){
        speedOfPaddle1=10;
    }

    //up
    if(e.keyCode == 38  || e.which == 38){
        speedOfPaddle2=-10;
    }
    //down
    if(e.keyCode == 40  || e.which == 40){
        speedOfPaddle2=10;
    }
})

document.addEventListener('keyup', function(e){
    //w
    if(e.keyCode == 87  || e.which == 87){
        speedOfPaddle1=0;
    }
    //s
    if(e.keyCode == 83  || e.which == 83){
        speedOfPaddle1=0;
    }

    //up
    if(e.keyCode == 38  || e.which == 38){
        speedOfPaddle2=0;
    }
    //down
    if(e.keyCode == 40  || e.which == 40){
        speedOfPaddle2=0;
    }
})

window.setInterval(function show(){
    positionOfPaddle1 += speedOfPaddle1;
    positionOfPaddle2 += speedOfPaddle2;

    topPositionOfBall += topSpeedOfBall;
    leftPositionOfBall += leftSpeedOfBall;


    //owerflow top
    if(positionOfPaddle1 <= 1){
        positionOfPaddle1 = 1;
    }
    if(positionOfPaddle2 <= 1){
        positionOfPaddle2 = 1;
    }

    //owerflow bottom
    if(positionOfPaddle1 >= window.innerHeight - paddleHeight){
        positionOfPaddle1 = window.innerHeight - paddleHeight
    }

    if(positionOfPaddle2 >= window.innerHeight - paddleHeight){
        positionOfPaddle2 = window.innerHeight - paddleHeight
    }

    if(topPositionOfBall <=10 || topPositionOfBall >= window.innerHeight - ballRadius-20){
        topSpeedOfBall = -topSpeedOfBall;
    }

    if(leftPositionOfBall <= paddleWidth){
        if(topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight){
            leftSpeedOfBall = -leftSpeedOfBall;
        }
        else{
            score2++;
            startBall();
            if(score2 ==5){
                finishBall();
            }
        }
    }

    if(leftPositionOfBall >= window.innerWidth - ballRadius -paddleWidth){
        if(topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight){
            leftSpeedOfBall = - leftSpeedOfBall;
        }
        else{
            score1++;          
            startBall();
            if(score1 ==5){
                finishBall();
            }
        }
    }

    document.getElementById('paddle1').style.top = positionOfPaddle1 + 'px';
    document.getElementById('paddle2').style.top = positionOfPaddle2 + 'px';

    document.getElementById('ball').style.top = topPositionOfBall + 'px';
    document.getElementById('ball').style.left = leftPositionOfBall + 'px';

    document.getElementById('score1').innerHTML = score1.toString();  
    document.getElementById('score2').innerHTML = score2.toString();
}, 1000/60)