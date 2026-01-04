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

// --- TERRIFYING MALFUNCTION LOGIC ---
let score = 0;
let gameActive = false;
let integrity = 100;
let integrityInterval;

function startMalfunction() {
    // 1. Instantly show the scary window
    const gameWin = document.getElementById('game-window');
    gameWin.style.display = 'flex';
    bringToFront(gameWin);

    // 2. Add global chaos (Shaking and Flashing)
    document.body.classList.add('screen-glitch');
    
    // 3. Make Clippy Panic
    const clippyText = document.getElementById('clippy-text');
    clippyText.innerHTML = "<b style='color:red;'>FATAL ERROR: SYSTEM CORRUPTION DETECTED! HELP!!</b>";

    // 4. Initialize Game State
    score = 0;
    integrity = 100;
    gameActive = true;
    
    const targetBtn = document.getElementById('target-btn');
    const statusText = document.getElementById('game-status');
    const integrityBar = document.getElementById('integrity-bar');

    targetBtn.style.display = 'block';
    statusText.textContent = "GLITCHES CAUGHT: 0/5";
    integrityBar.style.width = "100%";

    // 5. Start the countdown (Integrity Drain)
    // Drains 1% every 100ms = 10 seconds total
    clearInterval(integrityInterval);
    integrityInterval = setInterval(() => {
        integrity -= 1; 
        integrityBar.style.width = integrity + "%";
        
        // If integrity hits 0, the user failed
        if (integrity <= 0) {
            clearInterval(integrityInterval);
            triggerBSOD(); // CRASH!
        }
    }, 100);

    // 6. Start moving the target immediately
    moveTarget();
}

// Function to move the error button to a random spot
function moveTarget() {
    if (!gameActive) return;
    
    const area = document.getElementById('game-area');
    const btn = document.getElementById('target-btn');
    
    const maxX = area.clientWidth - btn.offsetWidth;
    const maxY = area.clientHeight - btn.offsetHeight;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    btn.style.left = randomX + "px";
    btn.style.top = randomY + "px";
}

document.getElementById('target-btn').onclick = function() {
    if (!gameActive) return;
    
    score++;
    document.getElementById('game-status').textContent = `GLITCHES CAUGHT: ${score}/5`;
    
    if (score >= 5) {
        // --- SUCCESS CONDITION ---
        gameActive = false;
        clearInterval(integrityInterval);
        
        // 1. Stop the screen from shaking/flashing
        document.body.classList.remove('screen-glitch');
        
        // 2. Hide the red button
        this.style.display = 'none';
        
        // 3. Update Status
        document.getElementById('game-status').textContent = "SYSTEM STABILIZED";
        document.getElementById('clippy-text').textContent = "Phew... that was close!";

        // 4. WAIT 1.5 SECONDS THEN HIDE THE WINDOW
        setTimeout(() => {
            document.getElementById('game-window').style.display = 'none';
        }, 1500); // 1500ms = 1.5 seconds so the user can see they won

    } else {
        moveTarget();
    }
};