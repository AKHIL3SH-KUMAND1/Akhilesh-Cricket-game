var _this = this;
var hit1Button = document.getElementById("hit1");
var hit2Button = document.getElementById("hit2");
var startGameButton = document.getElementById("startgame");
var team1Score = 0, team2Score = 0;
var team1Player = 0, team2Player = 0;
var currentRow = 1, currentCol = 1;
var score1 = 0, score2 = 0;
var generateResults = document.getElementById("generateResults");
var createDiv = function (className) {
    var element = document.createElement("div");
    element.className = className;
    return element;
};
var brow = {
    0: "TEAM ",
    1: "B1",
    2: "B2",
    3: "B3",
    4: "B4",
    5: "B5",
    6: "B6",
    7: "TOTAL",
};
var createRowDiv = function (row, col, teamname) {
    var ele;
    if (col === 0 || col === 7) {
        ele = createDiv("col-3 border border-dark");
    }
    else {
        ele = createDiv("col-1 border border-dark");
    }
    ele.setAttribute("row", row.toString());
    ele.setAttribute("col", col.toString());
    ele.setAttribute("teamname", teamname.split(" ").join(""));
    if (row === 0 && col == 0) {
        ele.innerHTML = teamname;
    }
    else if (row === 0) {
        ele.innerHTML = brow[col];
    }
    else if (col === 0) {
        ele.innerHTML = "Player".concat(row);
    }
    return ele;
};
var gameStarted = false;
var Game = /** @class */ (function () {
    function Game() {
        this.teams = new Array();
        startGameButton.setAttribute("disabled", "true");
        (currentCol = 1), (currentRow = 1);
        this.teams.push(new Team("Team1"));
        this.teams.push(new Team("Team2"));
        this.displayTeam(this.teams[0].name, "Table1");
        this.displayTeam(this.teams[1].name, "Table2");
        this.startTimer();
    }
    Game.prototype.displayTeam = function (teamname, id) {
        var dispele = document.getElementById("".concat(id));
        dispele.innerHTML = "";
        for (var i = 0; i < 11; i++) {
            var row = createDiv("row");
            for (var j = 0; j < 8; j++) {
                var div = createRowDiv(i, j, teamname);
                row.append(div);
            }
            dispele === null || dispele === void 0 ? void 0 : dispele.append(row);
        }
        console.log(dispele);
    };
    Game.prototype.startTimer = function () {
        var _this = this;
        var timer = document.getElementById("timer");
        generateResults.setAttribute("disabled", "true");
        hit2Button.setAttribute("disabled", "true");
        this.currentTeam = this.teams[0];
        var time = 60;
        var interval = setInterval(function () {
            timer.innerHTML = (time--).toString();
            if (time == 30) {
                (currentRow = 1), (currentCol = 1);
                hit1Button === null || hit1Button === void 0 ? void 0 : hit1Button.setAttribute("disabled", "true");
                hit2Button === null || hit2Button === void 0 ? void 0 : hit2Button.removeAttribute("disabled");
                _this.currentTeam = _this.teams[1];
            }
            else if (time == 0) {
                hit2Button === null || hit2Button === void 0 ? void 0 : hit2Button.setAttribute("disabled", "true");
                generateResults === null || generateResults === void 0 ? void 0 : generateResults.removeAttribute("disabled");
                _this.currentTeam = null;
                clearInterval(interval);
            }
        }, 1000);
    };
    return Game;
}());
var Team = /** @class */ (function () {
    function Team(name) {
        this.players = new Array(11);
        this.totalScore = 0;
        this.name = name;
        for (var i = 1; i <= 10; i++) {
            this.players[i] = new Player("Player".concat(i));
        }
    }
    return Team;
}());
var Player = /** @class */ (function () {
    function Player(name) {
        this.name = name;
    }
    return Player;
}());
var updateScore = function (score, id) {
    var scoreId = id === "Team1" ? "score1" : "score2";
    var updateScore = document.getElementById(scoreId);
    var currentScore = parseInt(updateScore.innerHTML);
    updateScore.innerHTML = (currentScore + score).toString();
};
var game;
var totalScore;
var updatePlayerScore = function (score, row, name) {
    var playerScore = document.querySelector("[teamname=\"".concat(name, "\"][row=\"").concat(currentRow, "\"][col=\"7\"]"));
    var currentScore = playerScore.innerHTML;
    if (!currentScore) {
        totalScore = score;
    }
    else {
        totalScore += score;
    }
    if (name === "Team1") {
        if (team1Score < totalScore) {
            team1Score = Math.max(team1Score, totalScore);
            team1Player = row;
        }
    }
    else {
        if (team2Score < totalScore) {
            team2Score = Math.max(team2Score, totalScore);
            team2Player = row;
        }
    }
    playerScore.innerHTML = totalScore.toString();
    if (currentRow === 10) {
        hit1Button.setAttribute("disabled", "true");
        hit2Button.removeAttribute("disabled");
        _this.currentTeam = _this.teams[1];
    }
};
var batting = function (team) {
    var name = team.name;
    console.log(name);
    var currentBox = document.querySelector("[teamname=\"".concat(name, "\"][row=\"").concat(currentRow, "\"][col=\"").concat(currentCol, "\"]"));
    var run = Math.floor(Math.random() * 7);
    console.log(run, currentRow, currentCol);
    if (currentRow <= 10) {
        updateScore(run, team.name);
        updatePlayerScore(run, currentRow, name);
        currentBox.innerHTML = run.toString();
        if (run === 0) {
            currentRow++;
            currentCol = 1;
        }
        else {
            if (currentCol === 6) {
                currentRow++;
                currentCol = 1;
            }
            else {
                currentCol++;
            }
        }
    }
};
startGameButton === null || startGameButton === void 0 ? void 0 : startGameButton.addEventListener("click", function () {
    var score1Holder = document.getElementById("score1");
    var score2Holder = document.getElementById("score2");
    score1Holder.innerHTML = "0";
    score2Holder.innerHTML = "0";
    if (!gameStarted) {
        game = new Game();
        (currentRow = 1), (currentCol = 1);
        generateResults.setAttribute("disabled", "true");
        hit1Button === null || hit1Button === void 0 ? void 0 : hit1Button.removeAttribute("disabled");
        hit1Button === null || hit1Button === void 0 ? void 0 : hit1Button.addEventListener("click", function () {
            batting(game.currentTeam);
        });
        hit2Button === null || hit2Button === void 0 ? void 0 : hit2Button.addEventListener("click", function () {
            batting(game.currentTeam);
        });
    }
});
generateResults === null || generateResults === void 0 ? void 0 : generateResults.addEventListener("click", function () {
    score1 = parseInt(document.getElementById("score1").innerHTML);
    score2 = parseInt(document.getElementById("score2").innerHTML);
    if (score1 > score2) {
        var matchWinner = document.getElementById("matchWonBy");
        var manOfTheMatch = document.getElementById("manOfTheMatch");
        matchWinner.innerHTML = "TEAM 1";
        manOfTheMatch.innerHTML = "Player ".concat(team1Player, " Score : ").concat(team1Score, " ");
    }
    else {
        var matchWinner = document.getElementById("matchWonBy");
        var manOfTheMatch = document.getElementById("manOfTheMatch");
        matchWinner.innerHTML = "TEAM 2";
        manOfTheMatch.innerHTML = "Player ".concat(team2Player, " Score : ").concat(team2Score, " ");
    }
    startGameButton.removeAttribute("disabled");
    (team1Score = 0), (team2Score = 0);
});
