let textElement = document.getElementById('text');
let optionButtonsElement = document.getElementById('option-buttons');

let state = {};

function startGame() {
    state = {};
    showTextNode(1);
}

function showTextNode(textNodeIndex) {
    let textNode = textNodes.find(node => node.id === textNodeIndex);
    textElement.innerText = textNode.text;
    while (optionButtonsElement.firstChild) optionButtonsElement.removeChild(optionButtonsElement.firstChild);

    textNode.options.forEach(option => {
        if (showOption(option)) {
            let button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option));
            optionButtonsElement.appendChild(button);
        }
    });
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    let nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) return startGame();
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

const textNodes = [
    {
        id: 1,
        text: `You are a superhero who fights against The Tricksters<br><br>While attempting to steal from a Tricksters building in Buenos Aires, You learn that Martin and Sophia, Martin and Sophia, have been kidnapped by The Tricksters, who threaten to brainwash them into becoming Tricksters henchmen unless you steal some objects for them You receives a tip from your intel that Martin and Sophia are being held captive in a moving van outside the building`,

        options: [
            {
                text: 'Agree',
                nextText: 2
            },
            {
                text: 'Attempt to stop the van',
                nextText: 3
            }
        ]
    },
    {
        id: 2,
        text: 'You venture forth in search of the van and find it But when you enter it, you find that it was a ploy Through a screen on the van, The Tricksters message you that Martin and Sophia have been brainwashed',
        options: [
            {
                text: 'Restart',
                nextText: 1
            }
        ]
    },
    {
        id: 3,
        text: 'For the first task, Zoom from The Tricksters tells you to steal a soldier from the Terracotta Army in Xi\'an, China While you are outside the dig site, you run into Venom, one of the Trickster henchmen who has been sent to aid you in the mission You enter an underground tunnel and fall into a booby trap You escape easily but Venom has a hard time doing so',
        options: [
            {
                text: 'Help Venom',
                setState: { venomFavour: true },
                nextText: 4
            },
            {
                text: 'Leave Venom',
                nextText: 4
            },
        ]
    },
    {
        id: 4,
        text: 'You enter the chamber and steal a statue, which is picked up by some Tricksters along with venom who has miraculously entered the helicopter unnoticed just as two guards enter the chamber',
        options: [
            {
                text: 'Hitch a ride on the helicopter',
                nextText: 5
            },
            {
                text: 'Hide among the soldiers',
                nextText: 6
            }
        ]
    },
    {
        id: 5,
        text: 'Your weight causes the statue to fall and break, angering Zoom and leading to Martin and Sophia\' brainwashing',
        options: [
            {
                text: 'Restart',
                nextText: 1
            }
        ]
    },
    {
        id: 6,
        text: 'You stay unnoticed among the soldiers and manage to escape through the tunnels',
        options: [
            {
                text: 'Ask for the next task',
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: 'Chroma and Ego fight for your next task In the meantime, you are allowed to talk to Martin and Sophie who are in a jail cell and you snap a photo You send the photo to your intel with a request to triangulate the location of Martin and Sophia. Finally, Chroma decides to give you the task',
        options: [
            {
                text: 'Do Chroma\'s task',
                nextText: 8
            },
        ]
    },
    {
        id: 8,
        text: 'Chroma sends you to Monte Carlo, Monaco to make off with some expensive Beluga caviar from a charity gala At the event, where Time Bomb, a Trickster, is performing, you locate Secret Agent and friend Iris, who had been tipped off about the stolen terracotta warrior and the Trickster\'s plan to steal the eggs',
        options: [
            {
                text: 'Trust Iris with the truth that you are stealing for The Tricksters',
                setState: { irisFavour: true },
                nextText: 9
            },
            {
                text: 'Lock Iris on the roof while you steal',
                nextText: 9
            }
        ]
    },
    {
        id: 9,
        text: 'Now, you start working on the eggs You spot the tins of the eggs in the kitchen',
        options: [
            {
                text: 'Stash the eggs and look for a way out',
                nextText: 10
            },
            {
                text: 'Grab the tins and make a run for it',
                nextText: 11
            }
        ]
    },
    {
        id: 10,
        text: 'You look for an opening and are interrupted by Time Bomb choking on the hors d\'oeuvres You save him with the Heimlich maneuver When you find an opening and enter the kitchen, the eggs have already been removed from their tins, leaving them with one day to expire You still manage to get away with the eggs, but Chroma declares you to have failed and Martin and Sophia are brainwashed',
        options: [
            {
                text: 'Restart',
                nextText: 1
            }
        ]
    },
    {
        id: 11,
        text: 'You grab the cart of tins and dash out with them, successfully flying out of the gala',
        options: [
            {
                text: 'Report to The Tricksters',
                nextText: 15
            }
        ]
    },
    {
        id: 12,
        text: 'Ego instructs you to travel to Hell Creek, Montana to steal a Tyrannosaurus rex bone with tissue still intact You arrive and locate the bone Once inside the museum where the bone is kept, you discovers that Secret Agents have surrounded the building',
        options: [
            {
                text: 'Hide inside a model dinosaur',
                nextText: 13
            },
            {
                text: 'Make a run for the lab',
                nextText: 14
            }
        ]
    },
    {
        id: 13,
        text: 'The dinosaur falls apart, forcing you to flee without the bone. As a result Martin and Sophia are brainwashed',
        options: [
            {
                text: 'Restart',
                nextText: 1
            },
        ]
    },
    {
        id: 14,
        text: 'You grab the bone from the lab and manage to escape through an air duct with the bone',
        options: [
            {
                text: 'Report to The Tricksters',
                nextText: 19
            },
        ]
    },
    {
        id: 15,
        text: "Back at The Tricksters, you check in with Martin and Sophia again and take another photo. You and your intel deduce that they are being held within the Arctic Circle. ",
        options: [
            {
                text: 'Attempt a rescue mission',
                nextText: 16
            },
            {
                text: "Continue with the next task",
                nextText: 12
            }
        ]
    },
    {
        id: 16,
        text: "You visit a Trickster base in the Arctic circle with suspicious activity, where you run into Venom again",
        options: [
            {
                text: 'Ask Venom for help',
                requiredState: nState => nState.venomFavour,
                nextText: 17
            },
            {
                text: "Escape Venom and continue",
                requiredState: nState => !nState.venomFavour,
                nextText: 18
            }
        ]
    },
    {
        id: 17,
        text: "Venom, thankful because you saved him from a booby trap, helps you into the base and you successfully rescue Martin and Sophia.<br><br>You could have done better by rescuing the items stolen.",
        options: [
            {
                text: 'Congratulations. Play again.',
                nextText: 1
            }
        ]
    },
    {
        id: 18,
        text: "You escape Venom, but you are inable to enter the base. Your intel tells you that Martin and Sophia have been spotted in a nearby city hours later. You go after them and have a small reunion. They come with you for an ice cream, but it's a trap. Martin and Sophia have already been brainwashed. They capture you and brainwash you too.",
        options: [
            {
                text: 'Restart',
                nextText: 1
            }
        ]
    },
    {
        id: 19,
        text: "The Tricksters arrange for you to board a ferry to the Île d'Oléron, where Martin and Sophia have been relocated in exchange for the items you stole. At the airport, you run into Iris.",
        options: [
            {
                text: 'Ask Iris for help',
                requiredState: nState => nState.irisFavour,
                nextText: 20
            },
            {
                text: "Continue on",
                nextText: 21
            }
        ]
    },
    {
        id: 20,
        text: "Iris agrees to pose as you on the ferry while the real you rescues Martin and Sophia and escapes with them in a helicopter. You deliver the items you stole to Julia's doorstep so they can be returned to their rightful places.",
        options: [
            {
                text: "Congratulations. You have reached the ultimate ending!. Play again.",
                nextText: 1
            }
        ]
    },
    {
        id: 21,
        text: "The Tricksters capture you while on the ferry and brainwash you along with Martin and Sophia, which you surmise was their plan all along",
        options: [
            {
                text: "Congratulations. You have reached the ultimate ending!. Play again.",
                nextText: 1
            }
        ]
    }
];