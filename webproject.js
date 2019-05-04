function loadgame() {
    var canvas = document.getElementById("mycanvas");
    document.getElementById("button").setAttribute("style", "display:none");
	document.getElementById("ground").setAttribute("style", "display:inherit;position:absolute;top:610px;left:210px;");
	document.getElementById("Tower").setAttribute("style", "display:inherit;position:absolute;top:160px;left:148px;");
	document.getElementById("wall").setAttribute("style", "display:inherit;position:absolute;top:173px;left:1237px;");
	document.getElementById("Helthbar").setAttribute("style", "display:inherit;position:absolute;top:0px;left:150px;");
	var anime;
    var ctx = canvas.getContext("2d");
    var ballRadius = 10;
    var x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var boomx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var boomy = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var boomcounter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var boomRadius = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var fallingspeed = 2;
    var dy = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var manHeight = 90;
    var manWidth = 75;
    var manX = canvas.width - manWidth - 600;
    var manY = canvas.height - manHeight - 100;
    var rightPressed = false;
    var leftPressed = false;
    var barrierPressed = false;
    var barrierActive = false;
	var finalsmash = false;
    var barrierTime = 0;
    var score = 0;
    var lives = 1000;
    var time = 0;
    var level = 1;
	var TowerButton = 0;
	var prepareFinalSmash = 0;
	
    for (var k = 0; k < 10; k++) {
        x[k] = Math.random() * canvas.width;
        dy[k] = 3 + Math.random() * 2;
    }
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    
    function keyDownHandler(e) {
        if (e.keyCode == 68) {
            rightPressed = true;
        }
        else if (e.keyCode == 65) {
            leftPressed = true;
        }
        else if (e.keyCode == 75)
            barrierPressed = true;
		else if (e.keyCode == 74)
            finalsmash = true;
    }
    function keyUpHandler(e) {
        if (e.keyCode == 68) {
            rightPressed = false;
        }
        else if (e.keyCode == 65) {
            leftPressed = false;
        }
        else if (e.keyCode == 75)
            barrierPressed = false;
		else if (e.keyCode == 74)
            finalsmash = false;
    }
	var missile = document.createElement("img");
    missile.src = "images/missile.svg";
    function drawBall(x, y) {
        ctx.beginPath();
		ctx.drawImage(missile,x,y);
        /*ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();*/
        ctx.closePath();
    }
	var i = 0;
	var repeat = false;
	var solwdown = 0;
    function drawMan() {
        /*ctx.beginPath();
        ctx.arc(manX + manWidth / 2, manY + 20, 20, 0, Math.PI * 2);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.moveTo(manX + manWidth / 2, manY + 40);
        ctx.lineTo(manX + manWidth / 2 + 25, manY + 60);
        ctx.moveTo(manX + manWidth / 2, manY + 40);
        ctx.lineTo(manX + manWidth / 2 - 25, manY + 60);
        ctx.moveTo(manX + manWidth / 2, manY + 40);
        ctx.lineTo(manX + manWidth / 2, manY + 65);
        ctx.lineTo(manX + manWidth / 2 - 25, manY + 90);
        ctx.moveTo(manX + manWidth / 2, manY + 65);
        ctx.lineTo(manX + manWidth / 2 + 25, manY + 90);
        ctx.strokeStyle = "#000000";
        ctx.stroke();
        ctx.closePath();*/
		
			var people = document.createElement("img");
			people.src = "images/people1.png";
			if(rightPressed != true /*|| leftPressed == true*/)
			{
				if(manX <= 97 || prepareFinalSmash == 1)
				{
					people.src = "images/empty.svg";
				}
				else
				{
					people.src = "images/people0"+i+".png";
				}
			
				if(solwdown==0)
				{
					i++
				}
				
				solwdown++
				if(solwdown == 3)
				{
					solwdown = 0;
				}
				
				if(i == 5)
				{
					i = 0;
				}
				else if(i == 0 || i == 1 || i == 2)
				{
					manY = canvas.height - manHeight - 100 + i;
				}
				else if(i == 3 )
				{
					manY = canvas.height - manHeight - 100 + 4;
				}
				else if(i == 4 )
				{
					manY = canvas.height - manHeight - 100 + 2;
				}
			
			}
			ctx.drawImage(people,manX,manY);
		
		
		var Shield = document.createElement("img");
		Shield.src = "images/Shield.svg";
        ctx.beginPath();
        if (barrierActive) {
			ctx.drawImage(Shield,manX-58,manY-18);
            /*ctx.arc(manX + manWidth / 2, manY + manHeight / 2, manHeight / 2 + 10, Math.PI * 0.5, Math.PI * 1.5);
            ctx.lineWidth = 10;
            ctx.strokeStyle = "#00FFFF";
            ctx.stroke();
            ctx.lineWidth = 1;*/
        }
		if(manX < canvas.width - manWidth - 80)
		{
			manX+=3;
		}
        ctx.closePath();
    }
    function drawScore() {
        ctx.font = "25px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText(score, 8, 18);
    }
    function drawLives() {
        /*ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: " + lives, canvas.width - 200, 20);*/
    }
	var red = 255;
	var green = 125;
	var blue = 0;
    function drawEnergyBar() {
        ctx.beginPath();
        ctx.rect(0, 610, 50, barrierTime/2);
		if(barrierTime > -800)
		{
			ctx.fillStyle = "#00FFFF";
		}
		else if(barrierTime <= -800)
		{
			ctx.fillStyle = "rgb("+ red +","+ green +","+ blue +")";
			red+=2;
			green+=2;
			blue+=2;
			if(red>255)
			{
				red=0;
			}
			if(green>255)
			{
				green=0;
			}
			if(blue>225)
			{
				blue=0;
			}
		}
        ctx.fill();
        ctx.closePath();
    }
	function drawHealthBar(anime) {
        ctx.beginPath();
        ctx.rect(185, 0, lives*0.85, 22);
		if(lives >= 700)
		{
			ctx.fillStyle = "#33FF33";
		}
		else if(lives < 700 && lives >= 300)
		{
			ctx.fillStyle = "#FFFF33";
		}
		else if(lives < 300 && lives > 100)
		{
			ctx.fillStyle = "#FF3333";
		}
		else
		{
			ctx.fillStyle = "#880000";
		}

		//ctx.fillStyle = "rgb("+ red +","+ green +","+ blue +")";
        ctx.fill();
        ctx.closePath();
    }
    function levelUp() {
        if (time < 500)
            time++;
        else if (level < 10) {
			fallingspeed+=0.5;
            level++;
            time = 0;
        }
    }
    function activeBarrier() {
        if (barrierPressed /*&& barrierTime < 0*/) {
			barrierTime+=4;
			if(barrierTime < 0)
			{
				barrierActive = true;
			}
			else
			{
				barrierActive = false;
			}            
        }
		else
		{
			barrierActive = false;
		}   
		
    }
	function drawEnegryTower() {//畫能量塔按鈕動作和按按鈕小人
		if(manX <= 98 && solwdown==0)
		{
			document.getElementById("ButtonMan").setAttribute("style", "display:inherit;position:absolute;top:502px;left:257px;");
			document.getElementById("ButtonMan").setAttribute("src", "images/people1"+i+".png");
			if(i%2 == 0)
			{
				document.getElementById("Tower").setAttribute("src", "images/Tower.svg");
			}
			else
			{
				document.getElementById("Tower").setAttribute("src", "images/Tower2.svg");
			}
		}
		else if(solwdown==0)
		{
			document.getElementById("Tower").setAttribute("src", "images/Tower.svg");
		}
		if(manX > 98)
		{
			document.getElementById("ButtonMan").setAttribute("style", "display:none;position:absolute;top:-13px;left:0px;");
		}
    }
	function GameOver(){
		cancelAnimationFrame(anime);
        alert("GAME OVER");
		var name = '';
		while(name === '')
			name = window.prompt('Please enter your name');
		if(name != undefined)
			ranking(name,score);/**/
		document.location.href = "projext.html";
	}
	//var boomRadius = 20;
	function missileboom(x1,y1,boomRadius)
	{
		ctx.beginPath();
		ctx.arc(x1+18, y1+20, boomRadius, 0, Math.PI * 2-0.001 ,false);
		ctx.fillStyle = "#FFBB00";
		ctx.fill();
		ctx.closePath();
	}
	/*function drawBoom(x1,y1,boomRadius)
	{
		ctx.beginPath();
		ctx.arc(x1, y1, boomRadius, 0, Math.PI * 2-0.001 ,false);
		ctx.fillStyle = "#FFBB00";
		ctx.fill();
		ctx.closePath();
	}*/
	var Fman = 0;
	var Fbar = 0;
	var Fmanback = false;
	var Fbarback = false;
	function drawFinalSmash()
	{
		document.getElementById("ground").setAttribute("src", "groundF.png");
		Fbarback = false;
		Fmanback = false;
		Fman = 0;
		Fbar = 1;
		document.getElementById("ButtonMan").setAttribute("style", "position:absolute;top:-13px;left:0px;display:none");
		document.getElementById("FinalMan").setAttribute("style", "display:inherit;position:absolute;top:467px;left:"+ (manX+100) +"px;");
		for(var i = 0 ; i < 13 ;i++)
		{
			setTimeout(function(){drawFman();},i*40);
		}
		document.getElementById("FinalBar").setAttribute("style", "display:inherit;position:absolute;top:"+ -350 +"px;left:"+ (manX+70) +"px;");
		for(var i = 0 ; i < 64 ;i++)
		{
			setTimeout(function(){drawFbar();},600+i*40);
		}
		for(var i = 0 ; i < 12 ;i++)
		{
			setTimeout(function(){drawFman();},3160+i*40);
		}
		setTimeout(function(){FinalSmashEnd();},5000);
		prepareFinalSmash = 0;
	}
	function drawFman()
	{
		if(!Fmanback){
			Fman++;
			if(Fman == 13){
				Fmanback = true;
			}
		}
		else if(Fmanback){
			Fman--;
		}
		document.getElementById("FinalMan").setAttribute("src", "images/FinalMan/Op"+Fman+".png");
	}
	function drawFbar()
	{
		document.getElementById("FinalBar").setAttribute("height", "900");
		document.getElementById("FinalBar").setAttribute("width", Fbar*15 );
		document.getElementById("FinalBar").setAttribute("style", "display:inherit;position:absolute;top:"+ -350 +"px;left:"+ (manX+78-Fbar*7.5) +"px;");
		document.getElementById("FinalBar").setAttribute("src", "images/FinalBar/"+Fbar+".svg");
		if(!Fbarback){
			Fbar++;
			if(Fbar == 32){
				Fbarback = true;
			}
		}
		else if(Fbarback){
			Fbar--;
			if(Fbar==1)
			{
				document.getElementById("FinalBar").setAttribute("style", "display:none;");
			}
		}
	}
	function FinalSmashEnd()
	{
		document.getElementById("ground").setAttribute("src", "ground.gif");
		document.getElementById("FinalMan").setAttribute("style", "display:none;");
	}
	function Continue()
	{
		anime = requestAnimationFrame(draw);
	}
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "black";
        ctx.fillRect(1150, 0, canvas.width, canvas.height);
		if(lives > 1000){
			lives = 1000;
		}
		else if(lives < 0){
			lives=0;
		}
        for (var i = 0; i < level; i++)
            drawBall(x[i], y[i]);
        drawMan();
        drawScore();
        drawEnergyBar();
		drawHealthBar();
        drawLives();
        levelUp();
        activeBarrier();
		drawEnegryTower();
		if(manX > 1010)
		{
			document.getElementById("wall").setAttribute("src", "images/wall2.svg");
			lives-=1;
			if (lives <= 0) {
				ctx.clearRect(185, 0, 500, 30);
				setTimeout(function(){ GameOver(anime); }, 1000);
            }
		}
		else
		{
			document.getElementById("wall").setAttribute("src", "images/wall.svg");
		}
        for (var j = 0; j < level; j++) {
			if(boomRadius[j] != 0)
			{
				missileboom(boomx[j],boomy[j],boomRadius[j])
				boomRadius[j]+=15;
				if(boomRadius[j]>=80)
				{
					boomRadius[j]=0;
				}
			}
            y[j] += dy[j];
            if (y[j] + dy[j] - ballRadius > manY - 44 && y[j] /*+ dy[j]*/ + ballRadius < manY + manHeight + 20) {
                if (x[j] + ballRadius > manX - 20 && x[j] < manX + manWidth - 10) {
                    if (!barrierActive)
						lives-=100;
					boomRadius[j] = 20;
                    missileboom(x[j],y[j],boomRadius[j]);
					boomx[j] = x[j];
					boomy[j] = y[j];
					x[j] = 100 + Math.random() * (900);
					dy[j] = 4 + Math.random() * fallingspeed;
					y[j] = 0;
                    if (lives <= 0) {
						ctx.clearRect(185, 0, 500, 30);
						setTimeout(function(){ GameOver(); }, 1000);
						/*cancelAnimationFrame(anime);
                        alert("GAME OVER");
						var name = '';
						while(name === '')
							name = window.prompt('Please enter your name');
						if(name != undefined)
							ranking(name,score);*/
                    }
                }
            }
            if (y[j] + dy[j] > canvas.height - ballRadius) {
                x[j] = 100 + Math.random() * (900);
                dy[j] = 4 + Math.random() * fallingspeed;
                y[j] = 0;
            }
        }
        if (manX < 0)
            manX = 0;
        if (manX < 101 && barrierTime > -800)
            barrierTime--;
        if (rightPressed && manX < canvas.width - manWidth - 80) {
            manX += 4;
        }
        else if (leftPressed && manX > 95) {
            manX -= 7;
        }
		barrierTime-=0.2;
		if(barrierTime < -800)
		{
			barrierTime = -800;
		}
		else if(barrierTime > 1)
		{
			barrierTime = 1;
		}
		
		score++;
		if(lives){
			setTimeout(Continue,prepareFinalSmash*5000);
		}
		
		if(prepareFinalSmash == 1)
		{
			for (var j = 0; j < level; j++) {
				if(x[j] > manX-220 && x[j] < manX+300){
					    lives+=80;
						boomRadius[j] = 20;
						setTimeout(function(){missileboom(x[j],y[j],boomRadius[j]);},2000);
						boomx[j] = x[j];
						boomy[j] = y[j];
						x[j] = 100 + Math.random() * (900);
						dy[j] = 3 + Math.random() * fallingspeed;
						y[j] = 0;
				}
			}
			drawFinalSmash();
		}	
		
		if(finalsmash && barrierTime <= -800)
		{
			barrierTime=0;
			prepareFinalSmash = 1;
		}
    }
	draw();
}
function ranking(name,score){
	$.ajax({
	url:'ranking.php',
	data:{
		name:name,
		score:score
	},
	type:'POST',
	datatype:'html',
		success: function( output ) {
			$("#rank").html(output);
	    },
		error : function(){
		    alert( "Request failed." );
		}
	});
}
