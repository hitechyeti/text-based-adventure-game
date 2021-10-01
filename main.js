function attacking (att, def){
    console.log(att.proff + " attack is " + att.attack);
    console.log(def.proff + " has " + def.hp + " hp");
    let dodging = Math.floor(Math.random() * 100 + def.dodge);
    console.log(dodging);
    if (dodging >= 100){
        console.log(def.proff + " has " + def.hp + " hp");
        return def.proff + " dodged attack of " + att.proff;
    } else {
        def.hp = def.hp - att.attack;
        if (def.hp < 0){
            console.log(def.proff + " got hit by " + att.proff + " and lost " + att.attack + " hp");
            return def.proff + " has 0 hp and is dead";
        }
        console.log(def.proff + " has " + def.hp + " hp");
        return def.proff + " got hit by " + att.proff + " and lost " + att.attack + " hp \nNow he has " + def.hp + " hp";
    }
  }

var story;
function getStory(name) {
    return {
        currentScene: "attack",
        attack: {
        title: "Chapter 1",
        story: `Once up a time our game started YAY! ${name}`,
        choices: [
            {
                choice: "Yes for choice one",
                destination: 'battle'
            },
            {
                choice: "Go Home",
                destination: 'goHome'
            }
        ]
        },
        battle: {
            title: 'Chapter 2',
            story: 'its time to battle',
            choices: [
                {
                    choice: "Attack with a sword yo!",
                    destination: "sword"
                },
                {
                    choice: "Attack with a caddlestick?",
                    destination: "candlestick"
                }
            ]
        },
        goHome: {
            title: "Go Home!",
            story: "Wow you are home already?!?!",
            defaultDestination: 'attack',
            image: "picture.png",
            buttonText: "Let's try again"
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var button = document.querySelector('#start-button')
    var content = document.querySelector('#content')
    button.addEventListener('click', function() {
        var input = document.querySelector('#name-input')
        story = getStory(name.value)
        renderScreen()
    })
})

function renderScreen() {
    var text = "Next"
    var image = "";
    if (story[story.currentScene].image) {
        image = "<img></img>"
    }
    if (story[story.currentScene].buttonText) {
        text = story[story.currentScene].buttonText
    }
    content.innerHTML = `
    <h1>${story[story.currentScene].title}</h1>
    <p>${story[story.currentScene].story}</p>
    ${image}
    ${getInputs()}
    <button id = "submit-button">${text}</button>
    `
    if (story[story.currentScene].image) {
        document.querySelector("img").src = `./img/${story[story.currentScene].image}`
    }
    var button = document.querySelector("#submit-button");
    button.addEventListener('click', function() {
        getInputValue()
    })
}

function getInputValue() {
    var inputs = document.querySelectorAll('input[type="radio"]');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            story.currentScene = inputs[i].getAttribute('data-destination')
            renderScreen();
            return;
        }
    }
    story.currentScene = story[story.currentScene].defaultDestination
    renderScreen()
}

getInputs()
function getInputs() {
    var input = ""
    if (!story[story.currentScene].choices){
        return ""
    }
    for(var i = 0; i < story[story.currentScene].choices.length; i++) {
        input += `
        <div>
            <input data-destination = ${story[story.currentScene].choices[i].destination} id = "radio${i}" type = "radio" name = "choices" />
            <label for "radio${i}">${story[story.currentScene].choices[i].choice}</label>
        </div>`
    }
    return input;
}