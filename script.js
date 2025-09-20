// EDU-GREEN Complete Working JavaScript - Enhanced with Functional Games and Login System

// Configuration and Global Variables
const API_BASE = 'http://localhost:5000/api';
let authToken = null;
let currentUser = null;
let isGuest = true;
let currentGame = null;
let gameState = {};
let userPoints = 1250;
let streak = 7;

// Game Data Arrays
const quizQuestions = [
    {
        question: "What percentage of Earth's freshwater is frozen in ice caps and glaciers?",
        options: ["50%", "68%", "25%", "90%"],
        correct: 1,
        explanation: "About 68% of Earth's freshwater is frozen in ice caps and glaciers."
    },
    {
        question: "Which gas is the primary contributor to global warming?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correct: 1,
        explanation: "Carbon dioxide (CO₂) is the primary greenhouse gas driving global warming."
    },
    {
        question: "How long does it take for a plastic bottle to decompose naturally?",
        options: ["10 years", "50 years", "100 years", "450+ years"],
        correct: 3,
        explanation: "Plastic bottles can take 450 years or more to decompose completely."
    },
    {
        question: "What is the most effective way to reduce your carbon footprint?",
        options: ["Recycling", "Using LED bulbs", "Reducing meat consumption", "Taking shorter showers"],
        correct: 2,
        explanation: "Reducing meat consumption, especially beef, has the largest impact on reducing carbon footprint."
    },
    {
        question: "Which renewable energy source produces the most electricity globally?",
        options: ["Solar", "Wind", "Hydroelectric", "Geothermal"],
        correct: 2,
        explanation: "Hydroelectric power is currently the largest source of renewable electricity worldwide."
    },
    {
        question: "What percentage of waste can typically be recycled or composted?",
        options: ["30%", "50%", "75%", "90%"],
        correct: 2,
        explanation: "Approximately 75% of waste can be recycled or composted with proper sorting."
    },
    {
        question: "Which ecosystem absorbs the most carbon dioxide?",
        options: ["Rainforests", "Oceans", "Grasslands", "Deserts"],
        correct: 1,
        explanation: "Oceans absorb about 30% of all CO₂ released into the atmosphere."
    },
    {
        question: "How much water does the average person use per day globally?",
        options: ["20 liters", "50 liters", "150 liters", "300 liters"],
        correct: 2,
        explanation: "The average person uses about 150 liters of water per day globally."
    },
    {
        question: "What is the main cause of deforestation worldwide?",
        options: ["Logging", "Agriculture", "Urban development", "Mining"],
        correct: 1,
        explanation: "Agriculture is responsible for about 80% of global deforestation."
    },
    {
        question: "Which transportation method has the lowest carbon emissions per passenger?",
        options: ["Car", "Bus", "Train", "Airplane"],
        correct: 2,
        explanation: "Trains generally have the lowest carbon emissions per passenger kilometer."
    }
];

const wasteItems = [
    { name: "Plastic Bottle", type: "plastic", emoji: "🍶" },
    { name: "Newspaper", type: "paper", emoji: "📰" },
    { name: "Glass Jar", type: "glass", emoji: "🫙" },
    { name: "Apple Core", type: "organic", emoji: "🍎" },
    { name: "Cardboard Box", type: "paper", emoji: "📦" },
    { name: "Soda Can", type: "plastic", emoji: "🥤" },
    { name: "Wine Bottle", type: "glass", emoji: "🍷" },
    { name: "Banana Peel", type: "organic", emoji: "🍌" },
    { name: "Plastic Bag", type: "plastic", emoji: "🛍️" },
    { name: "Magazine", type: "paper", emoji: "📖" }
];

const carbonChoices = [
    { activity: "Walking to work", impact: "low", emoji: "🚶", footprint: 0 },
    { activity: "Driving a car", impact: "high", emoji: "🚗", footprint: 8 },
    { activity: "Taking public transport", impact: "low", emoji: "🚌", footprint: 2 },
    { activity: "Flying internationally", impact: "high", emoji: "✈️", footprint: 50 },
    { activity: "Eating local vegetables", impact: "low", emoji: "🥬", footprint: 1 },
    { activity: "Eating imported beef", impact: "high", emoji: "🥩", footprint: 15 },
    { activity: "Using solar panels", impact: "low", emoji: "☀️", footprint: 0 },
    { activity: "Using coal power", impact: "high", emoji: "⛽", footprint: 20 },
    { activity: "Recycling bottles", impact: "low", emoji: "♻️", footprint: -2 },
    { activity: "Throwing away plastic", impact: "high", emoji: "🗑️", footprint: 5 }
];

const biodiversityData = [
    { species: "Polar Bear", habitat: "Arctic", emoji: "🐻‍❄️", habitat_emoji: "🧊" },
    { species: "Cactus", habitat: "Desert", emoji: "🌵", habitat_emoji: "🏜️" },
    { species: "Coral", habitat: "Ocean", emoji: "🪸", habitat_emoji: "🌊" },
    { species: "Tiger", habitat: "Forest", emoji: "🐅", habitat_emoji: "🌲" },
    { species: "Penguin", habitat: "Antarctic", emoji: "🐧", habitat_emoji: "❄️" },
    { species: "Butterfly", habitat: "Garden", emoji: "🦋", habitat_emoji: "🌺" }
];

const ecoTips = [
    "💡 Switch to LED bulbs - they use 80% less energy than traditional bulbs!",
    "🚿 Take shorter showers - you can save up to 25 gallons per day!",
    "🌱 Plant native species - they require less water and support local wildlife!",
    "♻️ Recycle properly - clean containers before putting them in recycling bins!",
    "🚲 Walk or bike for short trips - it's good for you and the environment!",
    "🥤 Use a reusable water bottle - avoid single-use plastics!",
    "🌡️ Adjust your thermostat by 2°C - save energy without losing comfort!",
    "📱 Unplug devices when not in use - they still consume energy when plugged in!"
];

// Authentication Functions
function initializeApp() {
    const stored_token = localStorage.getItem('eco_green_token');
    const stored_user = localStorage.getItem('eco_green_user');
    
    if (stored_token && stored_user) {
        authToken = stored_token;
        currentUser = JSON.parse(stored_user);
        isGuest = false;
        updateAuthUI();
        updateUserDisplay();
    } else {
        setTimeout(() => {
            showLoginModal();
        }, 1000);
    }
    
    setupEventHandlers();
    showToast('Welcome to EDU-GREEN! Complete games and challenges to earn points!', 'success');
}

function showLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Helper function to update institution label based on type
function updateInstitutionLabel() {
    const institutionType = document.getElementById('regInstitutionType').value;
    const institutionLabel = document.getElementById('institutionLabel');
    
    switch(institutionType) {
        case 'school':
            institutionLabel.textContent = 'School Name:';
            break;
        case 'college':
            institutionLabel.textContent = 'College Name:';
            break;
        case 'university':
            institutionLabel.textContent = 'University Name:';
            break;
        default:
            institutionLabel.textContent = 'Institution Name:';
    }
}

// Enhanced user profile display
function updateUserDisplay() {
    if (currentUser) {
        userPoints = currentUser.points;
        streak = currentUser.streak;
        
        // Update username display with full name if available
        const usernameElement = document.getElementById('username');
        if (usernameElement && currentUser.firstName) {
            usernameElement.textContent = `${currentUser.firstName} ${currentUser.lastName || ''}`.trim();
        } else if (usernameElement) {
            usernameElement.textContent = currentUser.username;
        }
    }
    const pointsElement = document.getElementById('userPoints');
    const streakElement = document.getElementById('streak');
    if (pointsElement) pointsElement.textContent = userPoints.toLocaleString();
    if (streakElement) streakElement.textContent = streak;
}

// Enhanced profile details function
function showProfileDetails() {
    if (!currentUser) {
        showToast('Please login to view profile details', 'error');
        return;
    }
    
    let profileInfo = `Profile Details:\n\n`;
    profileInfo += `Name: ${currentUser.firstName || ''} ${currentUser.lastName || ''}\n`;
    profileInfo += `Email: ${currentUser.email}\n`;
    
    if (currentUser.phone) profileInfo += `Phone: ${currentUser.phone}\n`;
    if (currentUser.institution) profileInfo += `Institution: ${currentUser.institution}\n`;
    if (currentUser.grade) profileInfo += `Grade: ${currentUser.grade}\n`;
    if (currentUser.studentId) profileInfo += `Student ID: ${currentUser.studentId}\n`;
    if (currentUser.city) profileInfo += `Location: ${currentUser.city}, ${currentUser.state || ''}\n`;
    
    profileInfo += `\nGame Stats:\n`;
    profileInfo += `Total Points: ${currentUser.points}\n`;
    profileInfo += `Current Streak: ${currentUser.streak} days\n`;
    
    if (currentUser.interests && currentUser.interests.length > 0) {
        profileInfo += `\nInterests: ${currentUser.interests.join(', ')}`;
    }
    
    alert(profileInfo);
}

// Make functions globally available
window.updateInstitutionLabel = updateInstitutionLabel;
window.showProfileDetails = showProfileDetails;

function hideLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function switchToRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('authTitle').textContent = 'Register for ECO-GREEN';
}

function switchToLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('authTitle').textContent = 'Login to ECO-GREEN';
}

function continueAsGuest() {
    isGuest = true;
    hideLoginModal();
    updateAuthUI();
    showToast('Welcome, Guest! Sign up to save your progress! 🌟', 'success');
}

async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            authToken = data.token;
            currentUser = data.user;
            isGuest = false;
            
            localStorage.setItem('edu_green_token', authToken);
            localStorage.setItem('edu_green_user', JSON.stringify(currentUser));
            
            hideLoginModal();
            updateAuthUI();
            updateUserDisplay();
            showToast('Welcome back! 🌟', 'success');
        } else {
            showToast(data.error || 'Login failed', 'error');
        }
    } catch (error) {
        console.warn('Login error:', error);
        simulateLogin(email, password);
    }
}

async function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const school = document.getElementById('regSchool').value;
    
    try {
        const response = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password, school })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            authToken = data.token;
            currentUser = data.user;
            isGuest = false;
            
            localStorage.setItem('eco_green_token', authToken);
            localStorage.setItem('eco_green_user', JSON.stringify(currentUser));
            
            hideLoginModal();
            updateAuthUI();
            updateUserDisplay();
            showToast('Welcome to ECO-GREEN! 🎉', 'success');
        } else {
            showToast(data.error || 'Registration failed', 'error');
        }
    } catch (error) {
        console.warn('Registration error:', error);
        simulateRegister(username, email, school);
    }
}

function simulateLogin(email, password) {
    currentUser = {
        id: 1,
        username: email.split('@')[0],
        email: email,
        school: 'Delhi Public School, Bangalore',
        points: userPoints,
        streak: streak
    };
    isGuest = false;
    
    localStorage.setItem('eco_green_user', JSON.stringify(currentUser));
    
    hideLoginModal();
    updateAuthUI();
    updateUserDisplay();
    showToast('Welcome back! (Demo Mode) 🌟', 'success');
}

function simulateRegister(username, email, school) {
    currentUser = {
        id: 1,
        username: username,
        email: email,
        school: school,
        points: 1250,
        streak: 1
    };
    isGuest = false;
    
    localStorage.setItem('eco_green_user', JSON.stringify(currentUser));
    
    hideLoginModal();
    updateAuthUI();
    updateUserDisplay();
    showToast('Welcome to ECO-GREEN! (Demo Mode) 🎉', 'success');
}

function logout() {
    authToken = null;
    currentUser = null;
    isGuest = true;
    
    localStorage.removeItem('edu_green_token');
    localStorage.removeItem('edu_green_user');
    
    updateAuthUI();
    userPoints = 1250;
    streak = 7;
    updateUserDisplay();
    showToast('Logged out successfully!', 'success');
}

function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const authButtons = document.getElementById('authButtons');
    const userInfo = document.getElementById('userInfo');
    const username = document.getElementById('username');
    
    if (isGuest) {
        if (authButtons) authButtons.style.display = 'block';
        if (userInfo) userInfo.style.display = 'none';
    } else {
        if (authButtons) authButtons.style.display = 'none';
        if (userInfo) userInfo.style.display = 'block';
        if (username) username.textContent = currentUser.username;
    }
}

function updateUserDisplay() {
    if (currentUser) {
        userPoints = currentUser.points;
        streak = currentUser.streak;
    }
    const pointsElement = document.getElementById('userPoints');
    const streakElement = document.getElementById('streak');
    if (pointsElement) pointsElement.textContent = userPoints.toLocaleString();
    if (streakElement) streakElement.textContent = streak;
}

// Game Modal Functions
function openGameModal(gameType) {
    console.log('Opening game modal for:', gameType);
    
    currentGame = gameType;
    const modal = document.getElementById('gameModal');
    const title = document.getElementById('gameTitle');
    const gameInterface = document.getElementById('gameInterface');
    
    if (!modal || !gameInterface) {
        console.error('Game modal elements not found!');
        alert('Game modal not found. Please refresh the page.');
        return;
    }
    
    const gameTitles = {
        'recycle-rush': 'Recycle Rush',
        'water-saver': 'Water Saver Puzzle',
        'carbon-crusher': 'Carbon Crusher',
        'edunova-quiz': 'EduNova Quiz',
        'biodiversity-defender': 'Biodiversity Defender'
    };
    
    if (title) {
        title.textContent = gameTitles[gameType] || 'Eco Game';
    }
    
    gameInterface.innerHTML = '<div style="text-align: center; padding: 2rem;">Loading game...</div>';
    modal.style.display = 'flex';
    
    setTimeout(() => {
        try {
            switch(gameType) {
                case 'recycle-rush':
                    initRecycleRush();
                    break;
                case 'water-saver':
                    initWaterSaver();
                    break;
                case 'carbon-crusher':
                    initCarbonCrusher();
                    break;
                case 'edunova-quiz':
                    initEduNovaQuiz();
                    break;
                case 'biodiversity-defender':
                    initBiodiversityDefender();
                    break;
                default:
                    gameInterface.innerHTML = `
                        <div style="text-align: center; padding: 2rem;">
                            <h3>Game "${gameType}" not implemented yet</h3>
                            <p>This game is coming soon!</p>
                            <button class="btn btn-secondary" onclick="closeGameModal()">Close</button>
                        </div>
                    `;
            }
        } catch (error) {
            console.error('Error initializing game:', error);
            gameInterface.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <h3>Game Error</h3>
                    <p>Sorry, there was an error loading this game.</p>
                    <button class="btn btn-secondary" onclick="closeGameModal()">Close</button>
                </div>
            `;
        }
    }, 100);
}

function closeGameModal() {
    const modal = document.getElementById('gameModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    currentGame = null;
    gameState = {};
    
    if (gameState.gameTimer) clearInterval(gameState.gameTimer);
    if (gameState.spawnTimer) clearInterval(gameState.spawnTimer);
    if (gameState.questionTimer) clearInterval(gameState.questionTimer);
}

// RECYCLE RUSH GAME
function initRecycleRush() {
    gameState = {
        score: 0,
        timeLeft: 120,
        currentItems: [],
        correctSorts: 0,
        totalItems: 0
    };
    
    const gameInterface = document.getElementById('gameInterface');
    gameInterface.innerHTML = `
        <div class="game-stats">
            <div class="stat-item">
                <div class="stat-value" id="recycleScore">0</div>
                <div class="stat-label">Score</div>
            </div>
            <div class="stat-item">
                <div class="stat-value" id="recycleTime">2:00</div>
                <div class="stat-label">Time Left</div>
            </div>
            <div class="stat-item">
                <div class="stat-value" id="recycleAccuracy">100%</div>
                <div class="stat-label">Accuracy</div>
            </div>
        </div>
        
        <div class="items-container" id="itemsContainer">
            <p>Drag items to the correct recycling bins!</p>
        </div>
        
        <div class="bins-container">
            <div class="bin plastic" data-type="plastic" ondrop="drop(event)" ondragover="allowDrop(event)">
                <div style="font-size: 3rem;">🔵</div>
                <div class="bin-label">Plastic</div>
            </div>
            <div class="bin paper" data-type="paper" ondrop="drop(event)" ondragover="allowDrop(event)">
                <div style="font-size: 3rem;">📄</div>
                <div class="bin-label">Paper</div>
            </div>
            <div class="bin glass" data-type="glass" ondrop="drop(event)" ondragover="allowDrop(event)">
                <div style="font-size: 3rem;">🟡</div>
                <div class="bin-label">Glass</div>
            </div>
            <div class="bin organic" data-type="organic" ondrop="drop(event)" ondragover="allowDrop(event)">
                <div style="font-size: 3rem;">🟢</div>
                <div class="bin-label">Organic</div>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 2rem;">
            <button class="btn btn-primary" onclick="startRecycleRush()">Start Game</button>
        </div>
    `;
}

window.startRecycleRush = function() {
    gameState.gameTimer = setInterval(() => {
        gameState.timeLeft--;
        updateRecycleTimer();
        
        if (gameState.timeLeft <= 0) {
            endRecycleRush();
        }
    }, 1000);
    
    spawnWasteItem();
    gameState.spawnTimer = setInterval(spawnWasteItem, 3000);
};

function spawnWasteItem() {
    if (gameState.timeLeft <= 0) return;
    
    const randomItem = wasteItems[Math.floor(Math.random() * wasteItems.length)];
    const itemsContainer = document.getElementById('itemsContainer');
    
    const item = document.createElement('div');
    item.className = 'waste-item';
    item.draggable = true;
    item.dataset.type = randomItem.type;
    item.innerHTML = `${randomItem.emoji}<br><small>${randomItem.name}</small>`;
    
    item.ondragstart = function(event) {
        event.dataTransfer.setData("text/plain", randomItem.type);
        event.dataTransfer.setData("element-id", item.id);
        item.classList.add('dragging');
    };
    
    item.ondragend = function() {
        item.classList.remove('dragging');
    };
    
    item.id = 'waste-' + Date.now();
    itemsContainer.appendChild(item);
    gameState.totalItems++;
}

window.allowDrop = function(event) {
    event.preventDefault();
    event.currentTarget.classList.add('drag-over');
};

window.drop = function(event) {
    event.preventDefault();
    const binType = event.currentTarget.dataset.type;
    const itemType = event.dataTransfer.getData("text/plain");
    const elementId = event.dataTransfer.getData("element-id");
    const item = document.getElementById(elementId);
    
    event.currentTarget.classList.remove('drag-over');
    
    if (item) {
        item.remove();
        
        if (binType === itemType) {
            gameState.correctSorts++;
            gameState.score += 10;
            showToast('Correct! +10 points', 'success');
        } else {
            gameState.score = Math.max(0, gameState.score - 5);
            showToast('Wrong bin! -5 points', 'error');
        }
        
        updateRecycleScore();
    }
};

function updateRecycleTimer() {
    const minutes = Math.floor(gameState.timeLeft / 60);
    const seconds = gameState.timeLeft % 60;
    const timeElement = document.getElementById('recycleTime');
    if (timeElement) {
        timeElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

function updateRecycleScore() {
    const scoreElement = document.getElementById('recycleScore');
    const accuracyElement = document.getElementById('recycleAccuracy');
    if (scoreElement) scoreElement.textContent = gameState.score;
    
    const accuracy = gameState.totalItems > 0 ? Math.round((gameState.correctSorts / gameState.totalItems) * 100) : 100;
    if (accuracyElement) accuracyElement.textContent = accuracy + '%';
}

function endRecycleRush() {
    clearInterval(gameState.gameTimer);
    clearInterval(gameState.spawnTimer);
    
    document.getElementById('itemsContainer').innerHTML = '';
    
    const finalScore = Math.max(0, Math.min(gameState.score, 75));
    const gameInterface = document.getElementById('gameInterface');
    
    gameInterface.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 2rem;">🎉</div>
            <h3 style="color: var(--primary-green);">Game Complete!</h3>
            <p style="margin: 1rem 0;">Final Score: ${gameState.score}</p>
            <p style="margin: 1rem 0;">Accuracy: ${Math.round((gameState.correctSorts / Math.max(gameState.totalItems, 1)) * 100)}%</p>
            <p style="color: var(--primary-green); font-weight: bold; font-size: 1.2rem;">
                +${finalScore} Points Earned!
            </p>
            <div style="margin-top: 2rem;">
                <button class="btn btn-primary" onclick="openGameModal('recycle-rush')">Play Again</button>
                <button class="btn btn-secondary" onclick="closeGameModal()" style="margin-left: 1rem;">Close</button>
            </div>
        </div>
    `;
    
    awardPoints(finalScore);
    createConfetti();
}

// CARBON CRUSHER GAME
function initCarbonCrusher() {
    console.log('Initializing Carbon Crusher');
    
    gameState = {
        score: 0,
        carbonSaved: 0,
        choicesMade: 0,
        correctChoices: 0,
        totalChoices: 6
    };
    
    const choices = shuffleArray([...carbonChoices]).slice(0, 6);
    
    const gameInterface = document.getElementById('gameInterface');
    gameInterface.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <h3>Choose the Eco-Friendly Options!</h3>
            <p>Click on activities with lower carbon footprint</p>
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 10px; margin: 1rem 0;">
                <div>Score: <span id="carbonScore" style="font-weight: bold; color: #28a745;">0</span></div>
                <div>CO₂ Saved: <span id="carbonSaved" style="font-weight: bold; color: #007bff;">0</span> kg</div>
                <div>Choices Made: <span id="choicesMade">0</span>/${gameState.totalChoices}</div>
            </div>
        </div>
        
        <div id="carbonChoices" style="display: grid; gap: 1rem; margin: 2rem 0;">
            ${choices.map((choice, index) => `
                <div id="choice-${index}" style="
                    padding: 1rem; 
                    border: 2px solid #dee2e6; 
                    border-radius: 10px; 
                    cursor: pointer; 
                    background: white;
                    transition: all 0.3s;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                " onclick="makeChoice(${index}, '${choice.impact}', ${choice.footprint})">
                    <div style="font-size: 2rem;">${choice.emoji}</div>
                    <div>
                        <div style="font-weight: bold;">${choice.activity}</div>
                        <div style="font-size: 0.9rem; color: #666;">Click to choose</div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div style="text-align: center; margin-top: 2rem;">
            <button class="btn btn-primary" onclick="finishCarbonGame()">Finish Game</button>
        </div>
    `;
    
    gameState.choices = choices;
}

window.makeChoice = function(index, impact, footprint) {
    console.log('Making choice:', index, impact, footprint);
    
    const element = document.getElementById(`choice-${index}`);
    if (!element || element.style.opacity === '0.5') return;
    
    element.style.opacity = '0.5';
    element.style.cursor = 'default';
    element.onclick = null;
    
    if (impact === 'low') {
        element.style.borderColor = '#28a745';
        element.style.backgroundColor = '#d4edda';
        gameState.correctChoices++;
        gameState.score += 15;
        gameState.carbonSaved += Math.abs(footprint) || 5;
        showToast('Great eco choice! +15 points', 'success');
    } else {
        element.style.borderColor = '#dc3545';
        element.style.backgroundColor = '#f8d7da';
        gameState.score += 5;
        showToast('High carbon choice. +5 points', 'error');
    }
    
    gameState.choicesMade++;
    
    const scoreElement = document.getElementById('carbonScore');
    const savedElement = document.getElementById('carbonSaved');
    const madeElement = document.getElementById('choicesMade');
    
    if (scoreElement) scoreElement.textContent = gameState.score;
    if (savedElement) savedElement.textContent = gameState.carbonSaved;
    if (madeElement) madeElement.textContent = gameState.choicesMade;
    
    if (gameState.choicesMade >= gameState.totalChoices) {
        setTimeout(finishCarbonGame, 1000);
    }
};

window.finishCarbonGame = function() {
    const accuracy = Math.round((gameState.correctChoices / Math.max(gameState.choicesMade, 1)) * 100);
    const finalScore = Math.min(gameState.score, 80);
    
    const gameInterface = document.getElementById('gameInterface');
    gameInterface.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 2rem;">⚡</div>
            <h3 style="color: #28a745;">Carbon Game Complete!</h3>
            <div style="background: #f8f9fa; padding: 2rem; border-radius: 15px; margin: 2rem 0;">
                <p style="margin: 0.5rem 0;"><strong>Eco-Friendly Choices:</strong> ${gameState.correctChoices}/${gameState.choicesMade}</p>
                <p style="margin: 0.5rem 0;"><strong>CO₂ Saved:</strong> ${gameState.carbonSaved}kg</p>
                <p style="margin: 0.5rem 0;"><strong>Accuracy:</strong> ${accuracy}%</p>
                <p style="color: #28a745; font-weight: bold; font-size: 1.2rem; margin-top: 1rem;">
                    +${finalScore} Points Earned!
                </p>
            </div>
            <div>
                <button class="btn btn-primary" onclick="openGameModal('carbon-crusher')" style="margin: 0.5rem;">Play Again</button>
                <button class="btn btn-secondary" onclick="closeGameModal()" style="margin: 0.5rem;">Close</button>
            </div>
        </div>
    `;
    
    awardPoints(finalScore);
    createConfetti();
};

// EDUNOVA QUIZ GAME
function initEduNovaQuiz() {
    console.log('Initializing Quiz');
    
    gameState = {
        currentQuestion: 0,
        score: 0,
        selectedAnswer: null,
        questions: shuffleArray([...quizQuestions]).slice(0, 5)
    };
    
    const gameInterface = document.getElementById('gameInterface');
    gameInterface.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <h3>Environmental Knowledge Quiz</h3>
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 10px;">
                <div>Question <span id="questionNum">1</span> of ${gameState.questions.length}</div>
                <div>Score: <span id="quizScore" style="font-weight: bold; color: #28a745;">0</span></div>
            </div>
        </div>
        
        <div id="questionContainer" style="margin: 2rem 0;">
            <div style="text-align: center; padding: 2rem;">
                <button class="btn btn-primary" onclick="startQuiz()">Start Quiz</button>
            </div>
        </div>
    `;
}

window.startQuiz = function() {
    displayQuestion();
};

function displayQuestion() {
    const question = gameState.questions[gameState.currentQuestion];
    const container = document.getElementById('questionContainer');
    
    container.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: 15px; border: 1px solid #dee2e6;">
            <h4 style="margin-bottom: 2rem; color: #333;">${question.question}</h4>
            <div id="optionsContainer" style="display: grid; gap: 1rem;">
                ${question.options.map((option, index) => `
                    <div id="option-${index}" style="
                        padding: 1rem; 
                        border: 2px solid #dee2e6; 
                        border-radius: 10px; 
                        cursor: pointer; 
                        background: #f8f9fa;
                        transition: all 0.3s;
                    " onclick="selectOption(${index})">
                        ${option}
                    </div>
                `).join('')}
            </div>
            <div style="text-align: center; margin-top: 2rem;">
                <button class="btn btn-primary" id="submitBtn" onclick="submitAnswer()" disabled>Submit Answer</button>
            </div>
        </div>
    `;
    
    const questionNumElement = document.getElementById('questionNum');
    if (questionNumElement) {
        questionNumElement.textContent = gameState.currentQuestion + 1;
    }
    gameState.selectedAnswer = null;
}

window.selectOption = function(index) {
    for (let i = 0; i < gameState.questions[gameState.currentQuestion].options.length; i++) {
        const opt = document.getElementById(`option-${i}`);
        if (opt) {
            opt.style.border = '2px solid #dee2e6';
            opt.style.background = '#f8f9fa';
        }
    }
    
    const selected = document.getElementById(`option-${index}`);
    if (selected) {
        selected.style.border = '2px solid #007bff';
        selected.style.background = '#e3f2fd';
    }
    
    gameState.selectedAnswer = index;
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.disabled = false;
    }
};

window.submitAnswer = function() {
    const question = gameState.questions[gameState.currentQuestion];
    const isCorrect = gameState.selectedAnswer === question.correct;
    
    for (let i = 0; i < question.options.length; i++) {
        const opt = document.getElementById(`option-${i}`);
        if (opt) {
            opt.onclick = null;
            opt.style.cursor = 'default';
            
            if (i === question.correct) {
                opt.style.border = '2px solid #28a745';
                opt.style.background = '#d4edda';
            } else if (i === gameState.selectedAnswer && !isCorrect) {
                opt.style.border = '2px solid #dc3545';
                opt.style.background = '#f8d7da';
            }
        }
    }
    
    if (isCorrect) {
        gameState.score += 10;
        showToast('Correct! +10 points', 'success');
    } else {
        showToast('Wrong answer. The correct answer is highlighted.', 'error');
    }
    
    const quizScoreElement = document.getElementById('quizScore');
    if (quizScoreElement) {
        quizScoreElement.textContent = gameState.score;
    }
    
    setTimeout(() => {
        gameState.currentQuestion++;
        
        if (gameState.currentQuestion >= gameState.questions.length) {
            endQuiz();
        } else {
            displayQuestion();
        }
    }, 2500);
};

function endQuiz() {
    const finalScore = Math.min(gameState.score, 90);
    const accuracy = Math.round((gameState.score / (gameState.questions.length * 10)) * 100);
    
    const container = document.getElementById('questionContainer');
    container.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 2rem;">🧠</div>
            <h3 style="color: #28a745;">Quiz Complete!</h3>
            <div style="background: #f8f9fa; padding: 2rem; border-radius: 15px; margin: 2rem 0;">
                <p><strong>Final Score:</strong> ${gameState.score}/${gameState.questions.length * 10}</p>
                <p><strong>Accuracy:</strong> ${accuracy}%</p>
                <p style="color: #28a745; font-weight: bold; font-size: 1.2rem; margin-top: 1rem;">
                    +${finalScore} Points Earned!
                </p>
            </div>
            <div>
                <button class="btn btn-primary" onclick="openGameModal('edunova-quiz')" style="margin: 0.5rem;">Play Again</button>
                <button class="btn btn-secondary" onclick="closeGameModal()" style="margin: 0.5rem;">Close</button>
            </div>
        </div>
    `;
    
    awardPoints(finalScore);
    createConfetti();
}

// BIODIVERSITY DEFENDER GAME
function initBiodiversityDefender() {
    console.log('Initializing Biodiversity Defender');
    
    gameState = {
        score: 0,
        matches: 0,
        attempts: 0,
        currentPair: 0,
        pairs: shuffleArray([...biodiversityData]).slice(0, 4)
    };
    
    const gameInterface = document.getElementById('gameInterface');
    gameInterface.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <h3>Match Species to Habitats!</h3>
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 10px;">
                <div>Score: <span id="bioScore" style="font-weight: bold; color: #28a745;">0</span></div>
                <div>Matches: <span id="bioMatches" style="font-weight: bold; color: #007bff;">0</span>/${gameState.pairs.length}</div>
            </div>
        </div>
        
        <div id="biodiversityGame">
            <div style="text-align: center; margin: 2rem 0;">
                <button class="btn btn-primary" onclick="startBioGame()">Start Matching</button>
            </div>
        </div>
    `;
}

window.startBioGame = function() {
    showBioPair();
};

function showBioPair() {
    if (gameState.currentPair >= gameState.pairs.length) {
        endBioGame();
        return;
    }
    
    const pair = gameState.pairs[gameState.currentPair];
    const container = document.getElementById('biodiversityGame');
    
    const allHabitats = ['Arctic', 'Desert', 'Ocean', 'Forest', 'Antarctic', 'Garden', 'Rainforest'];
    const wrongHabitats = allHabitats.filter(h => h !== pair.habitat).slice(0, 2);
    const habitatOptions = shuffleArray([pair.habitat, ...wrongHabitats]);
    
    container.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 6rem; margin: 2rem 0;">${pair.emoji}</div>
            <h4 style="margin-bottom: 2rem;">Where does the ${pair.species} live?</h4>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; max-width: 600px; margin: 0 auto;">
                ${habitatOptions.map((habitat, index) => `
                    <div class="habitat-option" style="padding: 1.5rem; background: #f8f9fa; border-radius: 15px; cursor: pointer; border: 3px solid transparent; text-align: center;" onclick="selectBioHabitat('${habitat}', '${pair.habitat}')">
                        <div style="font-size: 3rem; margin-bottom: 0.5rem;">${getHabitatEmoji(habitat)}</div>
                        <div style="font-weight: bold;">${habitat}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getHabitatEmoji(habitat) {
    const emojiMap = {
        'Arctic': '🧊',
        'Desert': '🏜️',
        'Ocean': '🌊',
        'Forest': '🌲',
        'Antarctic': '❄️',
        'Garden': '🌺',
        'Rainforest': '🌴'
    };
    return emojiMap[habitat] || '🌍';
}

window.selectBioHabitat = function(selected, correct) {
    gameState.attempts++;
    
    document.querySelectorAll('.habitat-option').forEach(opt => {
        opt.onclick = null;
        opt.style.cursor = 'default';
    });
    
    const options = document.querySelectorAll('.habitat-option');
    const pair = gameState.pairs[gameState.currentPair];
    
    if (selected === correct) {
        gameState.matches++;
        gameState.score += 15;
        
        options.forEach(opt => {
            if (opt.textContent.includes(selected)) {
                opt.style.border = '3px solid #28a745';
                opt.style.background = '#d4edda';
            }
        });
        
        showToast(`Correct! ${pair.species} lives in ${correct}`, 'success');
    } else {
        options.forEach(opt => {
            if (opt.textContent.includes(selected)) {
                opt.style.border = '3px solid #dc3545';
                opt.style.background = '#f8d7da';
            } else if (opt.textContent.includes(correct)) {
                opt.style.border = '3px solid #28a745';
                opt.style.background = '#d4edda';
            }
        });
        
        showToast(`Wrong! ${pair.species} lives in ${correct}`, 'error');
    }
    
    const scoreElement = document.getElementById('bioScore');
    const matchesElement = document.getElementById('bioMatches');
    if (scoreElement) scoreElement.textContent = gameState.score;
    if (matchesElement) matchesElement.textContent = gameState.matches;
    
    setTimeout(() => {
        gameState.currentPair++;
        showBioPair();
    }, 2500);
};

function endBioGame() {
    const accuracy = Math.round((gameState.matches / gameState.attempts) * 100);
    const finalScore = Math.min(gameState.score, 70);
    
    const container = document.getElementById('biodiversityGame');
    container.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 2rem;">🦋</div>
            <h3 style="color: #28a745;">Biodiversity Game Complete!</h3>
            <div style="background: #f8f9fa; padding: 2rem; border-radius: 15px; margin: 2rem 0;">
                <p><strong>Correct Matches:</strong> ${gameState.matches}/${gameState.pairs.length}</p>
                <p><strong>Accuracy:</strong> ${accuracy}%</p>
                <p style="color: #28a745; font-weight: bold; font-size: 1.2rem; margin-top: 1rem;">
                    +${finalScore} Points Earned!
                </p>
            </div>
            <div>
                <button class="btn btn-primary" onclick="openGameModal('biodiversity-defender')" style="margin: 0.5rem;">Play Again</button>
                <button class="btn btn-secondary" onclick="closeGameModal()" style="margin: 0.5rem;">Close</button>
            </div>
        </div>
    `;
    
    awardPoints(finalScore);
    createConfetti();
}

// WATER SAVER GAME
function initWaterSaver() {
    gameState = {
        score: 0,
        waterSaved: 0,
        leaksFixed: 0,
        totalLeaks: 6,
        timeLeft: 90
    };
    
    const gameInterface = document.getElementById('gameInterface');
    gameInterface.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <h3>Find and fix water leaks to save water!</h3>
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 10px;">
                <div>Score: <span id="waterScore" style="font-weight: bold; color: #28a745;">0</span></div>
                <div>Water Saved: <span id="waterSaved" style="font-weight: bold; color: #007bff;">0</span>L</div>
                <div>Time Left: <span id="waterTime" style="font-weight: bold; color: #dc3545;">1:30</span></div>
            </div>
        </div>
        
        <div style="position: relative; background: linear-gradient(to bottom, #87CEEB, #4682B4); border-radius: 15px; padding: 2rem; margin: 2rem 0; min-height: 300px;">
            <div style="color: white; text-align: center; margin-bottom: 2rem;">
                <h4>🏠 House Water System</h4>
                <p>Click on the leaking areas to fix them!</p>
            </div>
            <div id="waterSystem">
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 2rem;">
            <button class="btn btn-primary" onclick="startWaterSaver()">Start Game</button>
        </div>
    `;
}

window.startWaterSaver = function() {
    gameState.gameTimer = setInterval(() => {
        gameState.timeLeft--;
        updateWaterTimer();
        
        if (gameState.timeLeft <= 0) {
            endWaterSaver();
        }
    }, 1000);
    
    generateWaterLeaks();
};

function generateWaterLeaks() {
    const waterSystem = document.getElementById('waterSystem');
    const leakPositions = [
        { top: '20%', left: '15%', type: 'faucet' },
        { top: '40%', left: '70%', type: 'pipe' },
        { top: '60%', left: '30%', type: 'toilet' },
        { top: '80%', left: '60%', type: 'shower' },
        { top: '30%', left: '50%', type: 'pipe' },
        { top: '70%', left: '80%', type: 'faucet' }
    ];
    
    leakPositions.forEach((leak, index) => {
        const leakElement = document.createElement('div');
        leakElement.style.cssText = `
            position: absolute;
            top: ${leak.top};
            left: ${leak.left};
            width: 40px;
            height: 40px;
            background: radial-gradient(circle, #ff6b6b, #ff8e8e);
            border-radius: 50%;
            cursor: pointer;
            animation: pulse 1s infinite;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
        `;
        leakElement.innerHTML = '💧';
        leakElement.onclick = () => fixLeak(index, leakElement);
        leakElement.id = `leak-${index}`;
        
        waterSystem.appendChild(leakElement);
    });
}

function fixLeak(leakIndex, element) {
    element.style.display = 'none';
    gameState.leaksFixed++;
    gameState.score += 10;
    gameState.waterSaved += Math.floor(Math.random() * 20) + 10;
    
    showToast(`Leak fixed! +10 points`, 'success');
    updateWaterStats();
    
    if (gameState.leaksFixed >= gameState.totalLeaks) {
        setTimeout(endWaterSaver, 500);
    }
}

function updateWaterTimer() {
    const minutes = Math.floor(gameState.timeLeft / 60);
    const seconds = gameState.timeLeft % 60;
    const timeElement = document.getElementById('waterTime');
    if (timeElement) {
        timeElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

function updateWaterStats() {
    const scoreElement = document.getElementById('waterScore');
    const savedElement = document.getElementById('waterSaved');
    if (scoreElement) scoreElement.textContent = gameState.score;
    if (savedElement) savedElement.textContent = gameState.waterSaved;
}

function endWaterSaver() {
    clearInterval(gameState.gameTimer);
    
    const finalScore = Math.min(gameState.score, 60);
    const gameInterface = document.getElementById('gameInterface');
    
    gameInterface.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 2rem;">💧</div>
            <h3 style="color: #28a745;">Water Conservation Complete!</h3>
            <div style="background: #f8f9fa; padding: 2rem; border-radius: 15px; margin: 2rem 0;">
                <p><strong>Leaks Fixed:</strong> ${gameState.leaksFixed}/${gameState.totalLeaks}</p>
                <p><strong>Water Saved:</strong> ${gameState.waterSaved} liters</p>
                <p style="color: #28a745; font-weight: bold; font-size: 1.2rem; margin-top: 1rem;">
                    +${finalScore} Points Earned!
                </p>
            </div>
            <div>
                <button class="btn btn-primary" onclick="openGameModal('water-saver')" style="margin: 0.5rem;">Play Again</button>
                <button class="btn btn-secondary" onclick="closeGameModal()" style="margin: 0.5rem;">Close</button>
            </div>
        </div>
    `;
    
    awardPoints(finalScore);
    createConfetti();
}

// QUICK QUIZ FOR CHALLENGES
function openQuickQuiz() {
    openGameModal('edunova-quiz');
}

// Utility Functions
function awardPoints(points) {
    userPoints += points;
    updateUserDisplay();
    
    if (currentUser) {
        currentUser.points = userPoints;
        localStorage.setItem('edu_green_user', JSON.stringify(currentUser));
    }
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Navigation functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Original functionality (preserved)
function showAchievements() {
    alert('🏅 Your Achievements:\n\n✅ RECYCLE HERO - Recycled 15 items\n✅ GREEN STREAK - 7 days of eco-actions\n🔒 Water Saver - Save 100L of water\n🔒 TREE TROOPER - Plant over 50 trees (12/50)\n🔒 ENERGY NINJA - Save energy for 60 days (18/60)\n🔒 RECYCLING MASTER - Recycle over 50 items (15/50)\n\nComplete more challenges to unlock new badges!');
}

function showImpactDetails() {
    alert('🌍 Your Environmental Impact:\n\n🌳 Trees Planted: 12\n💨 CO₂ Saved: 45 kg\n🚗 Equivalent to 2 weeks without driving\n\nKeep up the great work!');
}

function showSchoolDetails() {
    alert('🏫 School Performance:\n\nCurrent Rank: #3\nTotal Points: 8,450\nGoal: Top 2 schools\nPoints needed: 1,751\n\nMotivate your classmates to participate more!');
}

function showResources() {
    alert('📚 Eco Resources:\n\n• Climate Change Facts\n• Renewable Energy Guide\n• Waste Management Tips\n• Carbon Footprint Calculator\n• Local Environmental Groups\n• Green Living Blog\n\nVisit our resource center for detailed guides!');
}

function uploadPhoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            awardPoints(50);
            showToast('Photo uploaded successfully! +50 points earned!', 'success');
            createConfetti();
        }
    };
    
    input.click();
}

function showEcoTips() {
    const randomTip = ecoTips[Math.floor(Math.random() * ecoTips.length)];
    showToast(randomTip, 'success');
}

// UI Utility Functions
function showToast(message, type = 'success') {
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 4000);
}

function createConfetti() {
    const colors = ['#2ecc71', '#3498db', '#f39c12', '#e74c3c', '#9b59b6'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 3000);
        }, i * 50);
    }
}

// Event handlers
function setupEventHandlers() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    const gameModal = document.getElementById('gameModal');
    const loginModal = document.getElementById('loginModal');
    
    if (gameModal) {
        gameModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeGameModal();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeGameModal();
        }
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

console.log('EDU-GREEN Complete Game System Loaded!');
