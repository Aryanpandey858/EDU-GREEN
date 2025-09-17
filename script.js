// ECO-GREEN JavaScript

// API Configuration
const API_BASE = 'http://localhost:5000/api';
let authToken = localStorage.getItem('token');

// Initialize data
let userPoints = 1250;
let streak = 7;

// Eco tips database
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

// Game content for each game
const gameContent = {
    'recycle-rush': {
        title: '🗂️ Recycle Rush',
        points: 75,
        content: `
            <div style="text-align: center;">
                <div style="font-size: 4rem; margin-bottom: 2rem;">🗂️</div>
                <h3>Recycle Rush</h3>
                <p style="color: #7f8c8d; margin: 1rem 0;">
                    Sort waste items into the correct recycling bins as fast as you can!
                </p>
                <div style="margin: 2rem 0;">
                    <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
                        <div style="background: #3498db; color: white; padding: 1rem; border-radius: 10px; min-width: 80px;">
                            ♻️<br>Plastic
                        </div>
                        <div style="background: #2ecc71; color: white; padding: 1rem; border-radius: 10px; min-width: 80px;">
                            📄<br>Paper
                        </div>
                        <div style="background: #f39c12; color: white; padding: 1rem; border-radius: 10px; min-width: 80px;">
                            🍾<br>Glass
                        </div>
                        <div style="background: #27ae60; color: white; padding: 1rem; border-radius: 10px; min-width: 80px;">
                            🍎<br>Organic
                        </div>
                    </div>
                </div>
                <p style="color: var(--primary-green); font-weight: bold;">
                    Earn +75 Points for completing this game!
                </p>
            </div>
        `
    },
    'water-saver': {
        title: '💧 Water Saver Puzzle',
        points: 60,
        content: `
            <div style="text-align: center;">
                <div style="font-size: 4rem; margin-bottom: 2rem;">💧</div>
                <h3>Water Saver Puzzle</h3>
                <p style="color: #7f8c8d; margin: 1rem 0;">
                    Fix water leaks and learn conservation techniques through interactive scenarios.
                </p>
                <div style="background: linear-gradient(to bottom, #87CEEB, #4682B4); border-radius: 15px; padding: 2rem; margin: 2rem 0;">
                    <div style="color: white; font-size: 2rem; margin-bottom: 1rem;">🚿</div>
                    <p style="color: white;">Click to fix leaks and save water!</p>
                </div>
                <p style="color: var(--primary-green); font-weight: bold;">
                    Earn +60 Points for completing this game!
                </p>
            </div>
        `
    },
    'carbon-crusher': {
        title: '⚡ Carbon Crusher',
        points: 80,
        content: `
            <div style="text-align: center;">
                <div style="font-size: 4rem; margin-bottom: 2rem;">⚡</div>
                <h3>Carbon Crusher</h3>
                <p style="color: #7f8c8d; margin: 1rem 0;">
                    Make eco-friendly choices and learn about reducing your carbon footprint.
                </p>
                <div style="display: flex; justify-content: center; gap: 2rem; margin: 2rem 0; flex-wrap: wrap;">
                    <div style="background: var(--bg-light); padding: 1.5rem; border-radius: 10px; text-align: center; min-width: 120px;">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🚗</div>
                        <small>High Carbon</small>
                    </div>
                    <div style="color: #27ae60; font-size: 2rem; margin: auto;">VS</div>
                    <div style="background: var(--primary-green); color: white; padding: 1.5rem; border-radius: 10px; text-align: center; min-width: 120px;">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🚲</div>
                        <small>Low Carbon</small>
                    </div>
                </div>
                <p style="color: var(--primary-green); font-weight: bold;">
                    Earn +80 Points for completing this game!
                </p>
            </div>
        `
    },
    'edunova-quiz': {
        title: '🧠 EduNova Quiz',
        points: 90,
        content: `
            <div style="text-align: center;">
                <div style="font-size: 4rem; margin-bottom: 2rem;">🧠</div>
                <h3>EduNova Environmental Quiz</h3>
                <p style="color: #7f8c8d; margin: 1rem 0;">
                    Test your knowledge about environmental science, climate change, and sustainability.
                </p>
                <div style="background: var(--bg-light); padding: 2rem; border-radius: 15px; margin: 2rem 0;">
                    <div style="color: var(--text-dark); font-weight: bold; margin-bottom: 1rem;">Sample Question:</div>
                    <p style="color: #7f8c8d;">"What percentage of the Earth's water is freshwater?"</p>
                    <div style="margin-top: 1rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                        <div style="background: white; padding: 0.5rem; border-radius: 5px; font-size: 0.9rem;">A) 97%</div>
                        <div style="background: white; padding: 0.5rem; border-radius: 5px; font-size: 0.9rem;">B) 71%</div>
                        <div style="background: var(--primary-green); color: white; padding: 0.5rem; border-radius: 5px; font-size: 0.9rem;">C) 3% ✓</div>
                        <div style="background: white; padding: 0.5rem; border-radius: 5px; font-size: 0.9rem;">D) 25%</div>
                    </div>
                </div>
                <p style="color: var(--primary-green); font-weight: bold;">
                    Earn +90 Points for completing this game!
                </p>
            </div>
        `
    },
    'biodiversity-defender': {
        title: '🦋 Biodiversity Defender',
        points: 70,
        content: `
            <div style="text-align: center;">
                <div style="font-size: 4rem; margin-bottom: 2rem;">🦋</div>
                <h3>Biodiversity Defender</h3>
                <p style="color: #7f8c8d; margin: 1rem 0;">
                    Match animals and plants with their correct habitats to learn about ecosystems.
                </p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
                    <div>
                        <h4 style="margin-bottom: 1rem;">Species</h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div style="background: var(--bg-light); padding: 1rem; border-radius: 10px; text-align: center;">
                                <div style="font-size: 1.5rem;">🐻‍❄️</div>
                                <small>Polar Bear</small>
                            </div>
                            <div style="background: var(--bg-light); padding: 1rem; border-radius: 10px; text-align: center;">
                                <div style="font-size: 1.5rem;">🌵</div>
                                <small>Cactus</small>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 style="margin-bottom: 1rem;">Habitats</h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div style="background: var(--secondary-blue); color: white; padding: 1rem; border-radius: 10px; text-align: center;">
                                <div style="font-size: 1.5rem;">🧊</div>
                                <small>Arctic</small>
                            </div>
                            <div style="background: var(--accent-orange); color: white; padding: 1rem; border-radius: 10px; text-align: center;">
                                <div style="font-size: 1.5rem;">🏜️</div>
                                <small>Desert</small>
                            </div>
                        </div>
                    </div>
                </div>
                <p style="color: var(--primary-green); font-weight: bold;">
                    Earn +70 Points for completing this game!
                </p>
            </div>
        `
    }
};

// API Functions
async function makeAPICall(endpoint, method = 'GET', data = null) {
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }

    if (data) {
        config.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_BASE}${endpoint}`, config);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'API request failed');
        }
        
        return result;
    } catch (error) {
        console.error('API Error:', error);
        showToast(error.message, 'error');
        return null;
    }
}

// Authentication functions
async function login(email, password) {
    const result = await makeAPICall('/auth/login', 'POST', { email, password });
    
    if (result) {
        authToken = result.token;
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        updateUserDisplay(result.user);
        showToast('Login successful!', 'success');
        return result;
    }
    return null;
}

async function register(userData) {
    const result = await makeAPICall('/auth/register', 'POST', userData);
    
    if (result) {
        authToken = result.token;
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        updateUserDisplay(result.user);
        showToast('Registration successful!', 'success');
        return result;
    }
    return null;
}

async function getCurrentUser() {
    if (!authToken) return null;
    
    const result = await makeAPICall('/auth/me');
    if (result) {
        updateUserDisplay(result);
        return result;
    }
    return null;
}

// Game functions
async function submitGameScore(gameId, score) {
    if (!authToken) {
        showToast('Please login first', 'error');
        return null;
    }
    
    const result = await makeAPICall(`/games/${gameId}/score`, 'POST', { score });
    
    if (result) {
        updateUserPoints(result.user.points);
        showToast(`Game completed! +${result.points_earned} points earned!`, 'success');
        return result;
    }
    return null;
}

// Challenge functions
async function submitChallenge(challengeId, submissionData) {
    if (!authToken) {
        showToast('Please login first', 'error');
        return null;
    }
    
    const result = await makeAPICall(`/challenges/${challengeId}/submit`, 'POST', submissionData);
    
    if (result) {
        showToast('Challenge submitted successfully!', 'success');
        return result;
    }
    return null;
}

// Leaderboard functions
async function loadLeaderboard() {
    const result = await makeAPICall('/leaderboard/schools');
    
    if (result && result.schools) {
        updateLeaderboardDisplay(result.schools);
        return result;
    }
    return null;
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

// Game modal functions
function openGameModal(gameType) {
    const modal = document.getElementById('gameModal');
    const title = document.getElementById('gameTitle');
    const gameInterface = document.getElementById('gameInterface');
    
    if (gameContent[gameType]) {
        title.textContent = gameContent[gameType].title;
        gameInterface.innerHTML = gameContent[gameType].content;
        
        // Add start game button
        gameInterface.innerHTML += `
            <div style="margin-top: 2rem;">
                <button class="btn btn-primary" onclick="startGame('${gameType}')">Start Game</button>
            </div>
        `;
    }
    
    modal.style.display = 'flex';
}

function closeGameModal() {
    const modal = document.getElementById('gameModal');
    modal.style.display = 'none';
}

function startGame(gameType) {
    if (!gameContent[gameType]) return;
    
    const points = gameContent[gameType].points;
    
    // Simulate game completion
    userPoints += points;
    updateUserPoints();
    
    // Show completion message
    const gameInterface = document.getElementById('gameInterface');
    gameInterface.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 2rem;">🎉</div>
            <h3 style="color: var(--primary-green);">Congratulations!</h3>
            <p style="margin: 1rem 0; color: #7f8c8d;">
                You completed ${gameContent[gameType].title}!
            </p>
            <p style="color: var(--primary-green); font-weight: bold; font-size: 1.2rem;">
                +${points} Points Earned!
            </p>
            <div style="margin-top: 2rem;">
                <button class="btn btn-primary" onclick="openGameModal('${gameType}')">Play Again</button>
                <button class="btn btn-secondary" onclick="closeGameModal()" style="margin-left: 1rem;">Close</button>
            </div>
        </div>
    `;
    
    // Submit score to backend if logged in
    if (authToken) {
        submitGameScore(gameType, points);
    }
    
    createConfetti();
    
    // Check for achievements
    if (userPoints >= 1500) {
        earnAchievement('🎮', 'Gamer', 'Played your first eco-game!');
    }
}

// Badge API integration
async function loadUserBadges() {
    if (!authToken) return;
    
    const result = await makeAPICall('/badges');
    if (result && result.badges) {
        // Update local badge system with server data
        result.badges.forEach(serverBadge => {
            const badgeKey = serverBadge.name.toLowerCase().replace(' ', '-');
            if (badgeSystem.badges[badgeKey]) {
                badgeSystem.badges[badgeKey].currentProgress = serverBadge.progress;
                badgeSystem.badges[badgeKey].earned = serverBadge.earned;
            }
        });
        updateBadgeDisplay();
    }
}

async function updateBadgeProgress(action, value = 1) {
    if (!authToken) return;
    
    const result = await makeAPICall('/badges/progress', 'POST', { action, value });
    if (result && result.newly_earned && result.newly_earned.length > 0) {
        // Show newly earned badges
        result.newly_earned.forEach(badge => {
            earnAchievement(badge.emoji, badge.name, badge.description);
        });
        loadUserBadges(); // Refresh badge display
    }
}

function showAchievements() {
    alert('🏅 Your Achievements:\n\n✅ RECYCLE HERO - Recycled 15 items\n✅ GREEN STREAK - PLANTED OVER 10 TREES\n🔒 Water Saver - Save 100L of water\n🔒 TREE TROOPER - Plant over 50 trees (12/50)\n🔒ENERGY NINJA - Save unused electic energy for 60 days(18/60)\n🔒 RECYCLING MASTER - Recycle over 50 items(15/50)\n\nComplete more challenges to unlock new badges!');
}

// Updated badge system with API 

    const badgeSystem = {
    badges: {
        'recycle-hero': {
            name: 'Recycle Hero',
            emoji: '♻️',
            description: '100 correct waste-sorting actions',
            requirement: 100,
            category: 'recycling',
            currentProgress: 0,
            earned: false
        },
        'green-streak': {
            name: 'Green Streak',
            emoji: '🌱',
            description: '7 days of continuous eco-actions',
            requirement: 7,
            category: 'streak',
            currentProgress: 0,
            earned: false
        },
        'water-saver': {
            name: 'Water Saver',
            emoji: '💧',
            description: 'Reduce daily water usage significantly',
            requirement: 50,
            category: 'water',
            currentProgress: 0,
            earned: false
        },
        'tree-trooper': {
            name: 'Tree Trooper',
            emoji: '🌳',
            description: 'Plant trees in real world projects',
            requirement: 5,
            category: 'trees',
            currentProgress: 0,
            earned: false
        },
        'energy-ninja': {
            name: 'Energy Ninja',
            emoji: '⚡',
            description: 'Save electricity by reducing usage',
            requirement: 30,
            category: 'energy',
            currentProgress: 0,
            earned: false
        },
        'recycling-hero': {
            name: 'Recycling Hero',
            emoji: '♻️',
            description: 'Consistent recycling habits for 30 days',
            requirement: 30,
            category: 'recycling',
            currentProgress: 0,
            earned: false
        }
    },
    // Check and award badges with API integration
    checkBadges: async function(action, value = 1) {
        // Update progress locally for immediate feedback
        Object.keys(this.badges).forEach(badgeId => {
            const badge = this.badges[badgeId];
            
            if (!badge.earned && this.shouldUpdateProgress(badge, action)) {
                badge.currentProgress = Math.min(badge.currentProgress + value, badge.requirement);
                if (badge.currentProgress >= badge.requirement) {
                    badge.earned = true;
                }
            }
        });
        
        updateBadgeDisplay();
        
        // Update server
        if (authToken) {
            await updateBadgeProgress(action, value);
        }
    },
    
    shouldUpdateProgress: function(badge, action) {
        const actionMapping = {
            'recycle': ['recycling'],
            'water_save': ['water'],
            'plant_tree': ['trees'],
            'save_energy': ['energy'],
            'daily_action': ['streak']
        };
        
        return actionMapping[action] && actionMapping[action].includes(badge.category);
    }
};
// Update badge display in the UI
function updateBadgeDisplay() {
    const badgesGrid = document.querySelector('.badges-grid');
    if (!badgesGrid) return;
    
    badgesGrid.innerHTML = '';
    
    Object.values(badgeSystem.badges).forEach(badge => {
        const badgeElement = document.createElement('div');
        badgeElement.className = `badge-item ${badge.earned ? 'earned' : 'locked'}`;
        badgeElement.title = `${badge.description} (${badge.currentProgress}/${badge.requirement})`;
        
        // Add progress indicator for non-earned badges
        const progressIndicator = badge.earned ? '' : 
            `<div class="badge-progress">${badge.currentProgress}</div>`;
        
        badgeElement.innerHTML = `
            <div class="badge-emoji">${badge.emoji}</div>
            <small>${badge.name}</small>
            ${progressIndicator}
        `;
        
        badgeElement.onclick = () => showBadgeDetails(badge);
        badgesGrid.appendChild(badgeElement);
    });
}

// Show detailed badge information
function showBadgeDetails(badge) {
    const status = badge.earned ? 'Earned!' : `Progress: ${badge.currentProgress}/${badge.requirement}`;
    const progressBar = badge.earned ? '' : 
        `\n\nProgress: [${'█'.repeat(Math.floor(badge.currentProgress/badge.requirement * 20))}${'░'.repeat(20 - Math.floor(badge.currentProgress/badge.requirement * 20))}] ${Math.floor(badge.currentProgress/badge.requirement * 100)}%`;
    
    alert(`${badge.emoji} ${badge.name}\n\n${badge.description}\n\nStatus: ${status}${progressBar}`);
}

// Card detail functions  
function showImpactDetails() {
    alert('🌍 Your Environmental Impact:\n\n🌳 Trees Planted: 12\n💨 CO₂ Saved: 45 kg\n🚗 Equivalent to 2 weeks without driving\n\nKeep up the great work!');
}

function showSchoolDetails() {
    alert('🏫 School Performance:\n\nCurrent Rank: #3\nTotal Points: 8,450\nGoal: Top 2 schools\nPoints needed: 1,751\n\nMotivate your classmates to participate more!');
}

// Updated game functions to track badge progress
function startGame(gameType) {
    if (!gameContent[gameType]) return;
    
    const points = gameContent[gameType].points;
    
    // Simulate game completion
    userPoints += points;
    updateUserPoints();
    
    // Track badge progress based on game type
    switch(gameType) {
        case 'recycle-rush':
            badgeSystem.checkBadges('recycle', 5);
            break;
        case 'water-saver':
            badgeSystem.checkBadges('water_save', 10);
            break;
        case 'carbon-crusher':
            badgeSystem.checkBadges('save_energy', 5);
            break;
        case 'biodiversity-defender':
            badgeSystem.checkBadges('plant_tree', 1);
            break;
    }
    
    // Check daily action streak
    badgeSystem.checkBadges('daily_action');
    
    // Show completion message
    const gameInterface = document.getElementById('gameInterface');
    gameInterface.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 2rem;">🎉</div>
            <h3 style="color: var(--primary-green);">Congratulations!</h3>
            <p style="margin: 1rem 0; color: #7f8c8d;">
                You completed ${gameContent[gameType].title}!
            </p>
            <p style="color: var(--primary-green); font-weight: bold; font-size: 1.2rem;">
                +${points} Points Earned!
            </p>
            <div style="margin-top: 2rem;">
                <button class="btn btn-primary" onclick="openGameModal('${gameType}')">Play Again</button>
                <button class="btn btn-secondary" onclick="closeGameModal()" style="margin-left: 1rem;">Close</button>
            </div>
        </div>
    `;
    
    // Submit score to backend if logged in
    if (authToken) {
        submitGameScore(gameType, points);
    }
    
    createConfetti();
}

// Updated photo upload to track recycling badge
function uploadPhoto() {
    // Simulate photo upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            // Simulate successful upload
            if (authToken) {
                submitChallenge('photo-waste-segregation', { 
                    type: 'photo', 
                    filename: file.name,
                    size: file.size
                });
            }
            
            userPoints += 50;
            updateUserPoints();
            
            // Track recycling progress
            badgeSystem.checkBadges('recycle', 10);
            
            showToast('Photo uploaded successfully! +50 points earned!', 'success');
            createConfetti();
        }
    };
    
    input.click();
}

// Initialize app with badge system
function initializeApp() {
    // Load badge progress from storage (fallback)
    badgeSystem.loadBadgeProgress();
    updateBadgeDisplay();
    
    // Check if user is logged in
    if (authToken) {
        getCurrentUser().then(() => {
            loadUserBadges(); // Load badges from server
        });
    }
    
    // Load leaderboard
    loadLeaderboard();
    
    // Show welcome message
    setTimeout(() => {
        showToast('Welcome to ECO-GREEN! Start earning badges by completing eco-actions!', 'success');
    }, 1000);
    
    // Setup modal click outside to close
    setupModalEvents();
}

// Add fallback methods for badge system
badgeSystem.saveBadgeProgress = function() {
    localStorage.setItem('badgeProgress', JSON.stringify(this.badges));
};

badgeSystem.loadBadgeProgress = function() {
    const saved = localStorage.getItem('badgeProgress');
    if (saved) {
        try {
            const savedBadges = JSON.parse(saved);
            Object.keys(savedBadges).forEach(badgeId => {
                if (this.badges[badgeId]) {
                    this.badges[badgeId].currentProgress = savedBadges[badgeId].currentProgress || 0;
                    this.badges[badgeId].earned = savedBadges[badgeId].earned || false;
                }
            });
        } catch (e) {
            console.warn('Failed to load saved badge progress:', e);
        }
    }
};

function showResources() {
    alert('📚 Eco Resources:\n\n• Climate Change Facts\n• Renewable Energy Guide\n• Waste Management Tips\n• Carbon Footprint Calculator\n• Local Environmental Groups\n• Green Living Blog\n\nVisit our resource center for detailed guides!');
}

// Quiz and photo functions
function startQuiz() {
    if (authToken) {
        submitChallenge('quiz-climate-basics', { type: 'quiz', completed: true });
    }
    
    userPoints += 30;
    updateUserPoints();
    showToast('Quiz completed! +30 points earned!', 'success');
}

function uploadPhoto() {
    // Simulate photo upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            // Simulate successful upload
            if (authToken) {
                submitChallenge('photo-waste-segregation', { 
                    type: 'photo', 
                    filename: file.name,
                    size: file.size
                });
            }
            
            userPoints += 50;
            updateUserPoints();
            showToast('Photo uploaded successfully! +50 points earned!', 'success');
            createConfetti();
        }
    };
    
    input.click();
}

// Floating action button
function showEcoTips() {
    const randomTip = ecoTips[Math.floor(Math.random() * ecoTips.length)];
    showToast(randomTip, 'success');
}

// UI Update functions
function updateUserDisplay(user) {
    if (user) {
        document.getElementById('userPoints').textContent = user.points.toLocaleString();
        document.getElementById('streak').textContent = user.streak;
        userPoints = user.points;
        streak = user.streak;
    }
}

function updateUserPoints(newPoints = null) {
    if (newPoints !== null) {
        userPoints = newPoints;
    }
    document.getElementById('userPoints').textContent = userPoints.toLocaleString();
}

function updateLeaderboardDisplay(schools) {
    const leaderboard = document.getElementById('leaderboard');
    const existingItems = leaderboard.querySelectorAll('.leaderboard-item');
    
    // Remove existing items except header
    existingItems.forEach(item => item.remove());
    
    schools.forEach((school, index) => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';
        
        if (school.name.includes('(You)')) {
            item.style.background = 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)';
        }
        
        const rankClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';
        
        item.innerHTML = `
            <div class="rank ${rankClass}">${index + 1}</div>
            <span class="school-name">${school.name}</span>
            <span class="school-points">${school.total_points.toLocaleString()} pts</span>
        `;
        
        leaderboard.appendChild(item);
    });
}

// Utility functions
function showToast(message, type = 'success') {
    // Remove existing toasts
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

function earnAchievement(icon, title, description) {
    const badge = document.createElement('div');
    badge.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        z-index: 3000;
        text-align: center;
        animation: badgePopup 0.5s;
    `;
    badge.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 1rem; animation: spin 1s;">${icon}</div>
        <h3>${title}</h3>
        <p>${description}</p>
        <button class="btn btn-primary" onclick="this.parentElement.remove()" style="margin-top: 1rem;">Awesome!</button>
    `;
    document.body.appendChild(badge);
    
    setTimeout(() => {
        if (badge.parentNode) {
            badge.remove();
        }
    }, 5000);
}

// Initialize app
function initializeApp() {
    // Check if user is logged in
    if (authToken) {
        getCurrentUser();
    }
    
    // Load leaderboard
    loadLeaderboard();
    
    // Show welcome message
    setTimeout(() => {
        showToast('Welcome to ECO-GREEN! New eco-games are available! 🎮', 'success');
    }, 1000);
    
    // Setup modal click outside to close
    setupModalEvents();
}

// Event handlers
function setupModalEvents() {
    // Close modal when clicking outside
    const modal = document.getElementById('gameModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeGameModal();
            }
        });
    }
    
    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeGameModal();
        }
    });
}

// Logout function
function logout() {
    authToken = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Reset UI to default state
    document.getElementById('userPoints').textContent = '0';
    document.getElementById('streak').textContent = '0';
    
    showToast('Logged out successfully', 'success');
}

// Auto-save progress (runs every 30 seconds if logged in)
function autoSaveProgress() {
    if (authToken) {
        // Update user's last active time
        makeAPICall('/auth/ping', 'POST');
    }
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Auto-save interval
setInterval(autoSaveProgress, 30000);

// Achievement checking functions
function checkAchievements() {
    const achievements = [
        { id: 'first_game', condition: () => userPoints >= 1000, icon: '🎮', title: 'First Steps', description: 'Played your first game!' },
        { id: 'eco_warrior', condition: () => userPoints >= 2000, icon: '⚔️', title: 'Eco Warrior', description: 'Earned 2000+ points!' },
        { id: 'green_champion', condition: () => userPoints >= 5000, icon: '🏆', title: 'Green Champion', description: 'Reached 5000 points!' }
    ];
    
    achievements.forEach(achievement => {
        if (achievement.condition() && !hasAchievement(achievement.id)) {
            earnAchievement(achievement.icon, achievement.title, achievement.description);
            markAchievementEarned(achievement.id);
        }
    });
}

function hasAchievement(achievementId) {
    const earnedAchievements = JSON.parse(localStorage.getItem('achievements') || '[]');
    return earnedAchievements.includes(achievementId);
}

function markAchievementEarned(achievementId) {
    const earnedAchievements = JSON.parse(localStorage.getItem('achievements') || '[]');
    if (!earnedAchievements.includes(achievementId)) {
        earnedAchievements.push(achievementId);
        localStorage.setItem('achievements', JSON.stringify(earnedAchievements));
    }
}

// Performance optimization - throttled scroll events
let scrollTimeout;
function throttledScrollHandler() {
    if (scrollTimeout) return;
    
    scrollTimeout = setTimeout(() => {
        // Add any scroll-based animations or effects here
        scrollTimeout = null;
    }, 16); // ~60fps
}

window.addEventListener('scroll', throttledScrollHandler);

// Error handling for failed API calls
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    if (e.error.message.includes('fetch')) {
        showToast('Connection error. Please check your internet connection.', 'error');
    }
});

// Service worker registration for offline support (future enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('ServiceWorker registration successful');
        //     })
        //     .catch(function(error) {
        //         console.log('ServiceWorker registration failed');
        //     });
    });
}

// Export functions for potential module use
window.EcoGreen = {
    login,
    register,
    logout,
    startGame,
    submitGameScore,
    loadLeaderboard,
    showToast,
    scrollToSection
};