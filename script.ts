let hit1Button = document.getElementById("hit1")
let hit2Button = document.getElementById("hit2")
let startGameButton = document.getElementById("startgame")
let team1Score = 0,team2Score = 0;
let team1Player = 0,team2Player = 0;
let currentRow = 1,currentCol = 1;
let score1=0,score2=0;
let generateResults = document.getElementById("generateResults");

let createDiv = (className: string) => {
    let element = document.createElement("div");
    element.className = className;
    return element;
};
let brow = {
    0: "TEAM ",
    1: "B1",
    2: "B2",
    3: "B3",
    4: "B4",
    5: "B5",
    6: "B6",
    7: "TOTAL",
  };
let createRowDiv = (row:number,col:number,teamname:string)=>{
    let ele;
    if (col === 0 || col === 7) {
        ele = createDiv("col-3 border border-dark");
      } else {
        ele = createDiv("col-1 border border-dark");
      }
    ele.setAttribute("row",row.toString())
    ele.setAttribute("col",col.toString())
    ele.setAttribute("teamname",teamname.split(" ").join(""));
    if(row===0 && col==0){
        ele.innerHTML = teamname;
    }else if(row===0){
        ele.innerHTML = brow[col];
    }else if(col===0){
        ele.innerHTML = `Player${row}`;
    }
    return ele;
}
let gameStarted = false;
class Game{
teams : Array<Team> = new Array();
currentTeam : Team;

constructor(){
    startGameButton.setAttribute("disabled","true");
    (currentCol = 1),(currentRow=1);
    this.teams.push(new Team("Team1"));
    this.teams.push(new Team("Team2"));
    this.displayTeam(this.teams[0].name, "Table1");
    this.displayTeam(this.teams[1].name, "Table2");
    this.startTimer();
}

displayTeam(teamname:string,id:string)
{
    let dispele = document.getElementById(`${id}`);
    dispele.innerHTML=""
    for(let i=0;i<11;i++)
    {
        let row = createDiv("row")
        for(let j=0;j<8;j++)
        {
            let div = createRowDiv(i,j,teamname);
            row.append(div)
        }
        dispele?.append(row);
    }
    console.log(dispele)
}

startTimer(){
    let timer = document.getElementById("timer");
    generateResults.setAttribute("disabled","true");
    hit2Button.setAttribute("disabled","true");
    this.currentTeam = this.teams[0]
    let time=60;

    let interval = setInterval(()=>{
        timer.innerHTML = (time--).toString();
        if(time==30){
            (currentRow=1),(currentCol=1);
            hit1Button?.setAttribute("disabled","true");
            hit2Button?.removeAttribute("disabled");
            this.currentTeam = this.teams[1];
        }else if(time==0){
            hit2Button?.setAttribute("disabled","true");
            generateResults?.removeAttribute("disabled");
            this.currentTeam=null;
            clearInterval(interval)
        }
    },1000)
}
}

class Team{
    name:string;
    players:Array<Player> = new Array(11);
    totalScore:number=0;

    constructor(name:string){
        this.name=name;
        for(let i=1;i<=10;i++){
            this.players[i] = new Player(`Player${i}`);
        }
    }
}

class Player{
    name:string;
    score:number;

    constructor(name:string){
        this.name = name;
    }
}

let updateScore = (score:number,id:string)=>{
    let scoreId = id==="Team1" ?"score1":"score2";
    let updateScore = document.getElementById(scoreId);
    let currentScore = parseInt(updateScore.innerHTML);
    updateScore.innerHTML = (currentScore+score).toString();
}
let game;
let totalScore;
let updatePlayerScore = (score:number,row:number,name:string)=>{
    let playerScore = document.querySelector(`[teamname="${name}"][row="${currentRow}"][col="7"]`);
    let currentScore = playerScore.innerHTML;

    if(!currentScore){
        totalScore = score;
    }else{
        totalScore+=score;
    }
    if(name === "Team1"){
        if(team1Score<totalScore){
            team1Score = Math.max(team1Score,totalScore);
            team1Player = row;
        }
    }else{
        if(team2Score<totalScore){
            team2Score = Math.max(team2Score,totalScore);
            team2Player = row;
        }
    }

    playerScore.innerHTML = totalScore.toString();
}

let batting = (team:Team)=>{
    let name = team.name;
    console.log(name)
    let currentBox = document.querySelector(`[teamname="${name}"][row="${currentRow}"][col="${currentCol}"]`);
    let run = Math.floor(Math.random()*7);
    console.log(run,currentRow,currentCol)
    if(currentRow<=10){
        updateScore(run,team.name);
        updatePlayerScore(run,currentRow,name);
        currentBox.innerHTML = run.toString();
        if(run === 0){
            currentRow++;
            currentCol=1;
        }else{
            if(currentCol === 6){
                currentRow++;
                currentCol=1;
            }else{
                currentCol++;
            }
        }
    }
}

startGameButton?.addEventListener("click",()=>{
    let score1Holder = document.getElementById("score1")
    let score2Holder = document.getElementById("score2")
    score1Holder.innerHTML = "0";
    score2Holder.innerHTML = "0";   

    if(!gameStarted){
        game = new Game();
        (currentRow=1),(currentCol=1)
        generateResults.setAttribute("disabled","true");
        hit1Button?.removeAttribute("disabled");

        hit1Button?.addEventListener("click",()=>{
            batting(game.currentTeam);
        })
        hit2Button?.addEventListener("click",()=>{
            batting(game.currentTeam);
        })

    }
})

generateResults?.addEventListener("click",()=>{
    score1 = parseInt(document.getElementById("score1").innerHTML)
    score2 = parseInt(document.getElementById("score2").innerHTML)
    if(score1>score2){
        let matchWinner = document.getElementById("matchWonBy");
        let manOfTheMatch = document.getElementById("manOfTheMatch");
        matchWinner.innerHTML = "TEAM 1";
        manOfTheMatch.innerHTML = `Player ${team1Player} Score : ${team1Score} `;
    }else{
        let matchWinner = document.getElementById("matchWonBy");
        let manOfTheMatch = document.getElementById("manOfTheMatch");
        matchWinner.innerHTML = "TEAM 2";
        manOfTheMatch.innerHTML = `Player ${team2Player} Score : ${team2Score} `;
    }
    startGameButton.removeAttribute("disabled");
    (team1Score=0),(team2Score=0)
})