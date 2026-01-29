// --- FAST BIOS TYPEWRITER ---
const biosLines = [
    "S-BIOS (C) 2025 Portfolio Systems Inc.",
    "Version 1.0.0  |  Build: 12/31/1999",
    "",
    "CPU: Intel(R) 80486 DX2 @ 3.6GHz",
    "GPU: Integrated",
    "Checking NVRAM ............ OK",
    "Detecting Memory .......... 8000MB OK",
    "",
    
    "USB Controllers .......... Disabled",
    "PCI Devices .............. Scanned",
    "",
    "Loading RetroOS Bootloader",
    "Verifying System Integrity",
    "",
    "SYSTEM READY",
    "",
    ">> Click to boot <<"
];

const biosTextElem = document.getElementById("bios-text");
const bootBtn = document.getElementById("boot-btn");

let lineIndex = 0;
let charIndex = 0;

function typeBiosText() {
    if (lineIndex >= biosLines.length) {
        bootBtn.style.display = "inline-block";
        return;
    }

    const line = biosLines[lineIndex];

    if (charIndex < line.length) {
        biosTextElem.textContent += line.charAt(charIndex);
        charIndex++;
        setTimeout(typeBiosText, 6); // 🔥 FAST typing
    } else {
        biosTextElem.textContent += "\n";
        charIndex = 0;
        lineIndex++;
        setTimeout(typeBiosText, 100); // quick line delay
    }
}

window.addEventListener("load", () => {
    typeBiosText();
});



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
    updateTaskbar();
}

function closeWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'none';
    updateTaskbar();
}
function updateTaskbar() {
    const tabsContainer = document.getElementById('taskbar-tabs');
    tabsContainer.innerHTML = ''; // Clear current tabs

    document.querySelectorAll('.window[data-taskbar="true"]').forEach(win => {
        if (win.style.display !== 'none') {
            const title = win.querySelector('.title-bar-text')?.textContent || "Window";
            
            const tab = document.createElement('button'); // Changed from 'div' to 'button'
            tab.className = 'task-tab';
            tab.textContent = title;

            // When clicked, bring window to front
            tab.onclick = () => {
                bringToFront(win);
                // Optional: Add an "active" class to the tab for styling
                document.querySelectorAll('.task-tab').forEach(t => t.classList.remove('active-tab'));
                tab.classList.add('active-tab');
            };

            tabsContainer.appendChild(tab);
        }
    });
}

// Add this line to your bringToFront function to highlight the tab
function bringToFront(element) {
    zIndexCounter++;
    element.style.zIndex = zIndexCounter;
    updateTaskbar();
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
    document.getElementById('boot-screen').style.display = 'none';
    document.getElementById('main-desktop').style.display = 'block';
    document.getElementById('taskbar').style.display = 'flex';

    const audio = document.getElementById('startup-sound');
    audio.pause();
    audio.currentTime = 0;

    audio.play().catch(err => {
        console.log("Audio issue:", err);
    });
}


// 2. BSOD Logic
function triggerBSOD() {
    document.getElementById('bsod').style.display = 'block';
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

function reboot() {
    // 1. Remove the terrifying CSS effects
    document.body.classList.remove('screen-glitch');
    
    // 2. Hide the BSOD
    document.getElementById('bsod').style.display = 'none';
    
    // 3. Reset the game state
    gameActive = false;
    clearInterval(integrityInterval);

    // 4. Either reload the page (cleanest) OR manually show the boot screen again
    location.reload(); 
}