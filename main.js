import confetti from 'canvas-confetti';
import './style.css'

const app = document.getElementById('app');
const balloonContainer = document.getElementById('balloon-container');
const continueBtn = document.getElementById('continue-btn');
const balloonCounterText = document.getElementById('balloon-counter-text');
const countdownOverlay = document.getElementById('countdown-overlay');
const countdownVal = document.getElementById('countdown-val');
const popSound = document.getElementById('pop-sound');
const fireworksSound = document.getElementById('fireworks-sound');

// Balloon Configuration
const balloonColors = ['#FF4D4D', '#FFD700', '#FF69B4', '#00BFFF', '#ADFF2F'];
const balloonCount = 15;
let poppedCount = 0;
const targetPops = 10;

function createBalloon() {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');

  // Random props
  const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
  const size = Math.floor(Math.random() * 30) + 50; // 50-80px
  const left = Math.floor(Math.random() * 100); // 0-100%
  const duration = Math.floor(Math.random() * 5) + 5; // 5-10s
  const delay = Math.floor(Math.random() * 5); // 0-5s

  balloon.style.backgroundColor = color;
  balloon.style.width = `${size}px`;
  balloon.style.height = `${size * 1.2}px`;
  balloon.style.left = `${left}%`;
  balloon.style.animation = `floatUp ${duration}s linear ${delay}s infinite`;

  // Interaction: Pop!
  balloon.addEventListener('click', (e) => {
    // Play Sound (clone to allow overlapping sounds)
    const sound = popSound.cloneNode();
    sound.volume = 0.5;
    sound.play().catch(e => console.log("Audio play failed", e));

    popBalloon(e.clientX, e.clientY, color);
    balloon.remove();

    // Update Game State
    poppedCount++;
    updateGameState();

    // Respawn
    setTimeout(createBalloon, 1000);
  });

  balloonContainer.appendChild(balloon);
}

function popBalloon(x, y, color) {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { x: x / window.innerWidth, y: y / window.innerHeight },
    colors: [color],
    disableForReducedMotion: true
  });
}

function updateGameState() {
  if (poppedCount < targetPops) {
    balloonCounterText.innerText = `Pop 10 balloons to continue! (${poppedCount}/${targetPops})`;
  } else if (poppedCount === targetPops) {
    balloonCounterText.innerText = "Yay! You did it!";
    continueBtn.classList.remove('hidden');

    // Quick celebration for unlocking
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 }
    });
  }
}

// Initialize Balloons
for (let i = 0; i < balloonCount; i++) {
  createBalloon();
}

// Continue Button Interaction
continueBtn.addEventListener('click', () => {
  startGrandFinale();
});

function startGrandFinale() {
  // 1. Play Fireworks Sound loop
  fireworksSound.volume = 0.6;
  fireworksSound.play().catch(e => console.log("Audio play failed", e));

  // 2. Start Infinite Fireworks Visuals
  const duration = 6000; // Run for slightly longer than countdown
  const animationEnd = Date.now() + duration;

  const fireworksInterval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      clearInterval(fireworksInterval);
      return;
    }

    // Random fireworks
    confetti({
      particleCount: 50,
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      origin: {
        x: Math.random(),
        // since they fall down, start a bit higher than random
        y: Math.random() - 0.2
      },
      colors: balloonColors
    });
  }, 250);

  // 3. Show Countdown Overlay
  countdownOverlay.classList.remove('hidden');
  let timeLeft = 5;

  const countdownInterval = setInterval(() => {
    timeLeft--;
    countdownVal.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      finishFinale();
    }
  }, 1000);
}

function finishFinale() {
  // Stop fireworks sound? Maybe fade out.
  // For now, let it loop or stop.
  fireworksSound.pause();

  // Update UI to final state
  countdownOverlay.innerHTML = `
        <div style="text-align: center; z-index: 30;">
            <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">I hope you know how much ur Momo Loves You</h1>
            <h2 style="font-size: 2rem; color: var(--color-gold); margin-bottom: 2rem;">Oh You Dont?</h2>
            <p style="font-size: 1.2rem; margin-bottom: 2rem; color: #ccc;">Continue For a glimpse of it.</p>
            
            <button id="final-continue-btn" style="
                background: var(--color-glass);
                border: 1px solid var(--color-glass-border);
                color: white;
                padding: 1rem 3rem;
                font-size: 1.2rem;
                font-family: var(--font-main);
                border-radius: 50px;
                cursor: pointer;
                transition: all 0.3s;
                text-transform: uppercase;
                letter-spacing: 2px;
            ">
                Continue
            </button>
        </div>
    `;

  // One last big blast
  confetti({
    particleCount: 500,
    spread: 180,
    origin: { y: 0.6 }
  });

  // Add listener to new button
  // Use a slight timeout to ensure innerHTML is rendered and element exists
  setTimeout(() => {
    const btn = document.getElementById('final-continue-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        window.location.href = '/glimpse.html';
      });
    }
  }, 100);
}
