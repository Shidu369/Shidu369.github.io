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