// 1. Clock Functionality
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    const timeString = `${hours}:${minutes} ${ampm}`;
    document.getElementById('clock').textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();

// 2. Window Management (Open/Close/Z-Index)
let zIndexCounter = 10;

function openWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'flex';
    bringToFront(win);
}

function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
}

function bringToFront(element) {
    zIndexCounter++;
    element.style.zIndex = zIndexCounter;
}

// Add click event to all windows to bring them to front when clicked
document.querySelectorAll('.window').forEach(win => {
    win.addEventListener('mousedown', () => {
        bringToFront(win);
    });
});

// 3. Draggable Windows Logic
function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    // The header is the handle for dragging
    const header = element.querySelector('.title-bar');

    if (header) {
        header.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e.preventDefault();
        // Get the mouse cursor position at startup
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        
        // Bring window to front when dragging starts
        bringToFront(element);
    }

    function elementDrag(e) {
        e.preventDefault();
        // Calculate the new cursor position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        // Set the element's new position
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // Stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Initialize drag for all windows
document.querySelectorAll('.window').forEach(win => {
    makeDraggable(win);
});
/* --- EXISTING CODE ABOVE (Clock, Drag, Open/Close) --- */

// --- NEW FUNCTIONS ---

// 1. Boot System Logic
function bootSystem() {
    // Hide the BIOS screen
    const bootScreen = document.getElementById('boot-screen');
    bootScreen.style.display = 'none';

    // Show Desktop and Taskbar
    document.getElementById('main-desktop').style.display = 'block';
    document.getElementById('taskbar').style.display = 'flex';

    // Play Sound
    const audio = document.getElementById('startup-sound');
    // We try/catch because some browsers are very strict about audio
    try {
        audio.play();
    } catch (err) {
        console.log("Audio autoplay blocked or file missing");
    }
}

// 2. BSOD Logic
function triggerBSOD() {
    document.getElementById('bsod').style.display = 'block';
}

function reboot() {
    // Simply reload the page to simulate a reboot
    location.reload();
}

// Optional: specific key press to reboot
document.addEventListener('keydown', function(event) {
    const bsod = document.getElementById('bsod');
    // If BSOD is visible, any key reloads
    if (bsod.style.display === 'block') {
        location.reload();
    }
});
// --- CLIPPY LOGIC ---
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

// --- EASY GAME LOGIC ---
let score = 0;
let gameActive = false;
let gameTimer;

function startMalfunction() {
    // 1. Open the game window automatically
    openWindow('game-window');
    
    // 2. Change Clippy's text to warn the user
    const clippyText = document.getElementById('clippy-text');
    clippyText.textContent = "OH NO! You broke it! Quick, fix the errors before we crash!";
    
    // 3. Reset and Start the game
    startGame();
}

function startGame() {
    score = 0;
    gameActive = true;
    document.getElementById('game-area').classList.add('malfunction-flash');
    document.getElementById('game-status').textContent = "Clicks: 0/5";
    document.getElementById('target-btn').style.display = 'block';
    
    // Clear any old timers
    clearTimeout(gameTimer);
    
    // 4. Set a 10-second limit before BSOD
    gameTimer = setTimeout(() => {
        if (gameActive) {
            triggerBSOD(); // Trigger the crash if not finished in time
        }
    }, 10000); 

    moveTarget();
}

document.getElementById('target-btn').onclick = function() {
    if (!gameActive) return;
    score++;
    document.getElementById('game-status').textContent = `Clicks: ${score}/5`;
    
    if (score >= 5) {
        // SUCCESS
        gameActive = false;
        clearTimeout(gameTimer); // Stop the crash timer
        this.style.display = 'none';
        document.getElementById('game-status').textContent = "SYSTEM STABILIZED!";
        document.getElementById('clippy-text').textContent = "Phew! That was close.";
        document.getElementById('game-area').classList.remove('malfunction-flash');
    } else {
        moveTarget();
    }
};
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