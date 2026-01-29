const clippyLines = [
    "It looks like you're trying to view a portfolio!",
    "I can help you find the projects folder.",
    "Did you know clicking the teal background does nothing?",
    "Check out the 'Danger' icon... if you dare!",
    "I'm here to stay, whether you like it or not!"
];

function rotateClippyText() {
    const textElem = document.getElementById('clippy-text');
    const randomLine = clippyLines[Math.floor(Math.random() * clippyLines.length)];
    textElem.textContent = randomLine;
}

// Change Clippy's text every 10 seconds
setInterval(rotateClippyText, 10000);


function clippyClick() {
    const clippyContainer = document.querySelector('.clippy-container');
    const textElem = document.getElementById('clippy-text');
    
    // Add the shake class
    clippyContainer.classList.add('shake');
    
    // Pick a "clicked" specific response
    const clickResponses = [
        "Hey! That tickles.",
        "Stop clicking me and look at the Projects!",
        "I'm made of metal, you know.",
        "Can I help you write a letter?",
        "Ouch! My paperclip head!"
    ];
    
    textElem.textContent = clickResponses[Math.floor(Math.random() * clickResponses.length)];
    
    // Remove the shake class after animation finishes (500ms)
    setTimeout(() => {
        clippyContainer.classList.remove('shake');
    }, 500);
}