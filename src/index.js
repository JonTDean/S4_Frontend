
const playButton = document.getElementById("playButton");
// const scoreForm = document.getElementById("scoreForm");
const scoreBoard = document.getElementById("scoreBoard");
const scoreOl = document.getElementById("scoreList"); 
const noScoreP = document.getElementById("noScores");
let olCounter = [];
console.log("Index.JS Loaded");


// Creates a new score from the incoming form submit
scoreForm.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log(`The Username is: ${e.target.name.value}`);
    console.log(`The Score is: ${e.target.score.value}`);
    
    const newScore = {
        userScore: e.target.score.value,
        userName: e.target.name.value,
    };

    fetch("http://localhost:3000/scores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newScore)
    })
    .then(resp => resp.json())
    .then(json => console.log(json))
    .then(alert("Score Submitted!"))
    .catch(error => alert(error));

    location.href = "./index.html";
});

// Populates the score boards
function populateScoreBoard(){
    fetch(`http://localhost:3000/scores`)
    .then(resp => resp.json())
    .then(json => {
        // console.log(json);
        return json;
    })
    .then(json => sortResults(json, "userScore", false) )
}

// Creates Multiple Scores
function createMultipleScores(incomingData){
    incomingData.forEach(createScore) 
}

// Creates a Single Score
function createScore(score){
    let scoreLi = document.createElement("li");
    let scoreMainContainer = document.createElement("div");
    let pLiN = document.createElement("p");
    let pLiS = document.createElement("p");
    let pDaN = document.createElement("p");
    let pDaS = document.createElement("p");
    let delContainer = document.createElement("div");
    let delButton = document.createElement("button");
    let updButton = document.createElement("button");

    scoreMainContainer.id = `${score.id}`;
    scoreMainContainer.classList.add("scoreListing");

    pLiN.id = "liName";
    pLiS.id = "liScore";
    pDaN.id = "dataName";
    pDaS.id = "dataScore";

    delContainer.id = "deleteContainer";
    delButton.id = "deleteScoreButton";
    delButton.classList.add("button");
    updButton.id = "updateNameButton";
    updButton.classList.add("button");

    pLiN.innerText = "Name";
    pLiS.innerText = "Score";
    pDaN.innerText = `${score.userName}`;
    pDaS.innerText = `${score.userScore}`;

    delButton.innerText = "Delete";
    updButton.innerText = "Update";

    delContainer.appendChild(delButton);
    delContainer.appendChild(updButton);
    scoreMainContainer.appendChild(pLiN);
    scoreMainContainer.appendChild(pDaN);
    scoreMainContainer.appendChild(pLiS);
    scoreMainContainer.appendChild(pDaS);
    scoreMainContainer.appendChild(delContainer); 
    scoreLi.appendChild(scoreMainContainer);
    scoreOl.appendChild(scoreLi);

    olCounter.push(`${score.id}`)
    if(olCounter.length > 0){
        noScoreP.classList.add("hidden");
    }
}

// Event Delegation Props to Aleksa for the guide https://medium.com/swlh/the-art-of-javascript-event-delegation-d9e0e8a01d9d
scoreOl.addEventListener("click", function(e){
    console.log(e.target.id);
    // Delete Score
    if(e.target.id === "deleteScoreButton"){

        const config = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }
        fetch(`http://localhost:3000/scores/${e.target.parentNode.parentNode.id}`, config)
        .then(function(){
            console.log("Delete Successful");

            // Deletes the LI from the DOM
            e.target.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode);
            alert("Score Deleted!");
        })
        .catch(error => alert(error) );

    // Update Score UserName    
    }else if (e.target.id === "updateNameButton"){
        let newName = prompt("Please enter your name", `Undefined${e.target.parentNode.parentNode.id}`);

        const config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                userName: newName
            })
        }

        fetch(`http://localhost:3000/scores/${e.target.parentNode.parentNode.id}`, config)
        .then(resp => resp.json())
        .then(function(){
            console.log("Update Successful");
            alert(`Score Name Updated to ${newName}!`);
        })
        .catch(error => alert(error) );

    }
    
    setTimeout(function(){ location.href = "./index.html"; }, 1000);
})

// Sorts Results Highest to Lowest
function sortResults(data, prop, order) {
    let sorted = data.sort(function(x, y) {
        // console.log(x.userScore)
        // console.log(y.userScore)
        if (order) {
            return (x[prop] > y[prop]) ? 1 : ((x[prop] < y[prop]) ? -1 : 0);
        } else {
            return (y[prop] > x[prop]) ? 1 : ((y[prop] < x[prop]) ? -1 : 0);
        }
    });

    // console.log(sorted.userScore)
    createMultipleScores(sorted);
}

if (scoreOl){
    populateScoreBoard()
}
