// Variables
const canvas = document.getElementById('visualizerCanvas');
const ctx = canvas.getContext('2d');
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const audioElement = new Audio('clubtropicana.mp3'); // Replace with your audio file

let isPlaying = false;

// Set up the audio analyser
audioElement.crossOrigin = "anonymous";
const source = audioContext.createMediaElementSource(audioElement);
source.connect(analyser);
analyser.connect(audioContext.destination);

// Start the audio playback
audioElement.play();

// Initialize the visualizer
analyser.fftSize = 256; // Adjust this for more or less frequency data
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Pause and play on spacebar press
document.body.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) { // Spacebar
        if (isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play();
        }
        isPlaying = !isPlaying;
    }
});

// Main animation loop
function animate() {
    analyser.getByteFrequencyData(dataArray);

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Your visualizer code here
const particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 1 + Math.random() * 4;
        this.speedX = (Math.random() - 0.5) * 10;
        this.speedY = (Math.random() - 0.5) * 10;
        this.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.radius -= 0.2;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawVisualizer() {
    analyser.getByteFrequencyData(dataArray);

    for (let i = 0; i < bufferLength; i++) {
        const frequency = dataArray[i];

        if (frequency > 150) {
            for (let j = 0; j < frequency / 10; j++) {
                const x = canvas.width / 2;
                const y = canvas.height / 2;
                particles.push(new Particle(x, y));
            }
        }
    }

    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        if (particle.radius > 0) {
            particle.update();
            particle.draw();
        } else {
            particles.splice(i, 1);
        }
    }
}

function animate() {
    analyser.getByteFrequencyData(dataArray);

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Call the drawVisualizer function to update the visuals
    drawVisualizer();

    if (isPlaying) {
        requestAnimationFrame(animate);
    }
}

// Start the animation loop
animate();

    
    // Use the dataArray to create visual effects based on audio data

    if (isPlaying) {
        requestAnimationFrame(animate);
    }
}

// Start the animation loop
animate();
