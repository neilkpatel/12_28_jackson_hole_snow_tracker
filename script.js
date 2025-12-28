// Current Time Display
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('currentTime').textContent = `${dateString} • ${timeString}`;
}

// Update time every second
setInterval(updateTime, 1000);
updateTime();

// Simulated Jackson Hole Conditions
// In production, this would fetch from a real API
function updateJacksonHoleConditions() {
    const conditions = {
        temperature: Math.floor(Math.random() * 20) + 15, // 15-35°F
        snowfall24: Math.floor(Math.random() * 12) + 2, // 2-14 inches
        baseDepth: Math.floor(Math.random() * 50) + 80, // 80-130 inches
        conditions: ['Powder', 'Packed Powder', 'Light Snow', 'Heavy Snow'][Math.floor(Math.random() * 4)]
    };

    document.getElementById('temperature').textContent = `${conditions.temperature}°F`;
    document.getElementById('snowfall24').textContent = `${conditions.snowfall24}"`;
    document.getElementById('baseDepth').textContent = `${conditions.baseDepth}"`;
    document.getElementById('conditions').textContent = conditions.conditions;

    // Update snow animation based on snowfall
    updateSnowAnimation(conditions.snowfall24);
}

// Dynamic Snow Animation
function updateSnowAnimation(snowfall) {
    const canvas = document.getElementById('snowCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const snowflakes = [];
    const numFlakes = Math.min(snowfall * 10, 150); // More snow = more flakes

    class Snowflake {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 3 + 1;
            this.speed = Math.random() * 1 + 0.5;
            this.wind = Math.random() * 0.5 - 0.25;
        }

        update() {
            this.y += this.speed;
            this.x += this.wind;

            if (this.y > canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fill();
        }
    }

    for (let i = 0; i < numFlakes; i++) {
        snowflakes.push(new Snowflake());
    }

    function animateSnow() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(20, 40, 80, 0.3)');
        gradient.addColorStop(1, 'rgba(40, 60, 100, 0.5)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        snowflakes.forEach(flake => {
            flake.update();
            flake.draw();
        });

        requestAnimationFrame(animateSnow);
    }

    animateSnow();
}

// 4-Week Snow History Chart
function drawSnowHistory() {
    const canvas = document.getElementById('historyChart');
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Generate 4 weeks of data (28 days)
    const days = 28;
    const data = [];
    for (let i = 0; i < days; i++) {
        data.push(Math.floor(Math.random() * 15) + 1); // 1-16 inches per day
    }

    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const barWidth = chartWidth / days;
    const maxSnow = Math.max(...data);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bars
    data.forEach((snow, index) => {
        const barHeight = (snow / maxSnow) * chartHeight;
        const x = padding + index * barWidth;
        const y = canvas.height - padding - barHeight;

        // Gradient for bars
        const gradient = ctx.createLinearGradient(0, y, 0, canvas.height - padding);
        gradient.addColorStop(0, '#6dd5fa');
        gradient.addColorStop(1, '#2980b9');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - 2, barHeight);

        // Draw value on top
        if (snow > 5) {
            ctx.fillStyle = '#fff';
            ctx.font = '10px Courier New';
            ctx.textAlign = 'center';
            ctx.fillText(snow + '"', x + barWidth / 2, y - 5);
        }
    });

    // Draw axes
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#fff';
    ctx.font = '12px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText('4 Weeks Ago', padding + chartWidth * 0.25, canvas.height - 10);
    ctx.fillText('2 Weeks Ago', padding + chartWidth * 0.5, canvas.height - 10);
    ctx.fillText('This Week', padding + chartWidth * 0.75, canvas.height - 10);
}

// Top 10 Resorts Leaderboard Data
const leaderboardData = [
    { name: 'Alta Ski Area, UT', snowfall: 87 },
    { name: 'Snowbird, UT', snowfall: 82 },
    { name: 'Jackson Hole, WY', snowfall: 76 },
    { name: 'Mammoth Mountain, CA', snowfall: 71 },
    { name: 'Squaw Valley, CA', snowfall: 68 },
    { name: 'Park City, UT', snowfall: 64 },
    { name: 'Aspen Snowmass, CO', snowfall: 59 },
    { name: 'Vail, CO', snowfall: 55 },
    { name: 'Telluride, CO', snowfall: 52 },
    { name: 'Big Sky, MT', snowfall: 48 }
];

// Split-Flap Display Component
class FlipDigit {
    constructor(container, initialValue = 0) {
        this.container = container;
        this.currentValue = initialValue;
        this.targetValue = initialValue;
        this.element = this.createFlipElement();
        this.container.appendChild(this.element);
    }

    createFlipElement() {
        const flipDiv = document.createElement('div');
        flipDiv.className = 'flip-digit';

        const topDiv = document.createElement('div');
        topDiv.className = 'flip-card-top';
        topDiv.innerHTML = `<span>${this.currentValue}</span>`;

        const bottomDiv = document.createElement('div');
        bottomDiv.className = 'flip-card-bottom';
        bottomDiv.innerHTML = `<span>${this.currentValue}</span>`;

        flipDiv.appendChild(topDiv);
        flipDiv.appendChild(bottomDiv);

        return flipDiv;
    }

    async flip(newValue) {
        if (this.currentValue === newValue) return;

        this.targetValue = newValue;
        const topDiv = this.element.querySelector('.flip-card-top');
        const bottomDiv = this.element.querySelector('.flip-card-bottom');

        // Add flipping class
        topDiv.classList.add('flipping');

        // Wait for half the animation
        await new Promise(resolve => setTimeout(resolve, 300));

        // Update the value
        topDiv.innerHTML = `<span>${newValue}</span>`;
        bottomDiv.innerHTML = `<span>${newValue}</span>`;

        bottomDiv.classList.add('flipping');

        // Wait for animation to complete
        await new Promise(resolve => setTimeout(resolve, 300));

        // Remove flipping class
        topDiv.classList.remove('flipping');
        bottomDiv.classList.remove('flipping');

        this.currentValue = newValue;
    }
}

// Create Leaderboard
function createLeaderboard() {
    const leaderboard = document.getElementById('leaderboard');
    leaderboard.innerHTML = '';

    leaderboardData.forEach((resort, index) => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';

        // Rank
        const rank = document.createElement('div');
        rank.className = 'rank';
        rank.textContent = index + 1;

        // Resort Name
        const name = document.createElement('div');
        name.className = 'resort-name';
        name.textContent = resort.name;

        // Snowfall Display with Flip Digits
        const snowfallDiv = document.createElement('div');
        snowfallDiv.className = 'snowfall-display';
        snowfallDiv.id = `snowfall-${index}`;

        item.appendChild(rank);
        item.appendChild(name);
        item.appendChild(snowfallDiv);
        leaderboard.appendChild(item);
    });

    // Initialize flip digits after DOM is ready
    setTimeout(() => initializeFlipDigits(), 100);
}

// Initialize Flip Digits
const flipDigitsMap = {};

function initializeFlipDigits() {
    leaderboardData.forEach((resort, index) => {
        const container = document.getElementById(`snowfall-${index}`);
        if (!container) return;

        const snowfallStr = resort.snowfall.toString().padStart(2, '0');
        flipDigitsMap[index] = [];

        // Create flip digits for each digit in the number
        for (let i = 0; i < snowfallStr.length; i++) {
            const flipDigit = new FlipDigit(container, parseInt(snowfallStr[i]));
            flipDigitsMap[index].push(flipDigit);
        }

        // Add unit indicator
        const unit = document.createElement('span');
        unit.className = 'flip-unit';
        unit.textContent = '"';
        container.appendChild(unit);
    });

    // Start the animation sequence
    setTimeout(() => animateLeaderboard(), 1000);
}

// Animate Leaderboard with Random Changes
async function animateLeaderboard() {
    // Pick a random resort to update
    const index = Math.floor(Math.random() * leaderboardData.length);
    const currentSnowfall = leaderboardData[index].snowfall;

    // Add 1-3 inches randomly
    const newSnowfall = currentSnowfall + Math.floor(Math.random() * 3) + 1;
    leaderboardData[index].snowfall = newSnowfall;

    // Update the flip digits
    const newSnowfallStr = newSnowfall.toString().padStart(2, '0');
    const digits = flipDigitsMap[index];

    if (digits) {
        for (let i = 0; i < digits.length; i++) {
            await digits[i].flip(parseInt(newSnowfallStr[i]));
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    // Schedule next animation
    setTimeout(() => animateLeaderboard(), 3000 + Math.random() * 4000);
}

// Initialize everything
updateJacksonHoleConditions();
drawSnowHistory();
createLeaderboard();

// Refresh conditions every 5 minutes
setInterval(updateJacksonHoleConditions, 300000);
