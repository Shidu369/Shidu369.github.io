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

let score = 0;
let gameActive = false;
let integrity = 100;
let integrityInterval;

function startMalfunction() {
    // 0. Close all open windows first
    document.querySelectorAll('.window[data-taskbar="true"]').forEach(win => {
        win.style.display = 'none';
    });
    updateTaskbar();

    // 1. Instantly show the scary window
    const gameWin = document.getElementById('game-window');
    gameWin.style.display = 'flex';
    bringToFront(gameWin);

    // 2. Add global chaos (Shaking and Flashing)
    document.body.classList.add('screen-glitch');
    
    // 3. Make Clippy Panic
    const clippyText = document.getElementById('clippy-text');
    clippyText.innerHTML = "<b style='color:red;'>FATAL ERROR: SYSTEM CORRUPTION DETECTED! HELP!!</b>";

    // Pause Clippy's normal text rotation during game
    window.clippyGameActive = true;

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
            gameActive = false;
            window.clippyGameActive = false; // Resume Clippy text rotation
            clearInterval(integrityInterval);
            triggerBSOD(); // CRASH!
        }
    }, 70);

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
        window.clippyGameActive = false; // Resume Clippy text rotation
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