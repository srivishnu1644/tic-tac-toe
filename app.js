let boxes = document.querySelectorAll(".box");
let resetbutton = document.querySelector("#reset-button");
let newGameButton= document.querySelector("#new-button");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    msg.innerText = "";
};

const newGame = () => {
    turnO = false;
    enableBoxes();
    msgContainer.classList.add("hide");
    msg.innerText = "";
}

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        
        if(box.disabled) return;

        if(turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText= "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText.trim();
        let pos2Val = boxes[pattern[1]].innerText.trim();
        let pos3Val = boxes[pattern[2]].innerText.trim();

        if(pos1Val === "" || pos2Val === "" || pos3Val === "") {
            continue;
        }

        if(pos1Val === pos2Val && pos2Val === pos3Val){
            console.log("Winner:", pos1Val);
            showWinner(pos1Val);
            return; 
        }
    }

    
    let allFilled = true;
    for(let box of boxes) {
        if(box.innerText.trim() === "") {
            allFilled = false;
            break;
        }
    }
    if(allFilled) {
        console.log("Draw detected");
        showDraw();
    }
};

newGameButton.addEventListener("click", newGame);
resetbutton.addEventListener("click", resetGame);
