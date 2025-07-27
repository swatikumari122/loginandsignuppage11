// Global variables
let currentUser = null;
let currentView = 'dashboard';
let events = [
    {
        id: 1,
        title: 'Annual Company Party',
        type: 'party',
        date: '2024-12-25',
        time: '18:00',
        location: 'Grand Ballroom',
        description: 'Corporate celebration with team building activities',
        maxAttendees: 150,
        currentAttendees: 150,
        price: 0,
        status: 'completed'
    },
    {
        id: 2,
        title: 'Product Launch Webinar',
        type: 'webinar',
        date: '2024-12-28',
        time: '14:00',
        location: 'Online Event',
        description: 'Virtual presentation of our latest product features',
        maxAttendees: 300,
        currentAttendees: 250,
        price: 0,
        status: 'upcoming'
    },
    {
        id: 3,
        title: 'New Year Networking',
        type: 'conference',
        date: '2025-01-02',
        time: '19:00',
        location: 'Downtown Center',
        description: 'Professional networking event for the new year',
        maxAttendees: 100,
        currentAttendees: 80,
        price: 25.00,
        status: 'upcoming'
    }
];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Load user data
    loadUserData();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize notifications
    setupNotifications();
    
    console.log('Dashboard initialized');
});

// Check if user is authenticated
function checkAuth() {
    const userData = localStorage.getItem('eventsphere_user') || sessionStorage.getItem('eventsphere_user');
    
    if (!userData) {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
        return;
    }
    
    try {
        currentUser = JSON.parse(userData);
        
        // Check if session is still valid
        const loginTime = new Date(currentUser.loginTime);
        const now = new Date();
        const timeDiff = now - loginTime;
        
        const isValid = localStorage.getItem('eventsphere_user') 
            ? timeDiff < 24 * 60 * 60 * 1000 
            : true;
            
        if (!isValid) {
            logout();
        }
    } catch (error) {
        console.error('Error parsing user data:', error);
        logout();
    }
}

// Load user data into UI
function loadUserData() {
    if (currentUser) {
        document.getElementById('user-name').textContent = currentUser.name;
        document.getElementById('user-email').textContent = currentUser.email;
        document.getElementById('welcome-name').textContent = currentUser.name.split(' ')[0];
    }
}

// Setup event listeners
function setupEventListeners() {
    // Navigation clicks
    document.addEventListener('click', function(e) {
        // Close user dropdown when clicking outside
        if (!e.target.closest('.user-menu')) {
            document.getElementById('user-dropdown').classList.remove('show');
        }
        
        // Close modals when clicking outside
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });
    
    // Form submissions
    const eventForm = document.getElementById('event-form');
    if (eventForm) {
        eventForm.addEventListener('submit', handleEventCreation);
    }
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterEvents(this.dataset.filter);
        });
    });
    
    // Notifications click
    document.querySelector('.notifications').addEventListener('click', function() {
        showModal('notification-modal');
    });
}

// Setup notifications
function setupNotifications() {
    // This would typically connect to a real-time notification service
    console.log('Notifications system initialized');
}

// Navigation functions
function showDashboard() {
    switchView('dashboard-view');
    updateActiveNav('dashboard');
}

function showEvents() {
    switchView('events-view');
    updateActiveNav('events');
    loadEvents();
}

function showCreateEvent() {
    switchView('create-event-view');
    updateActiveNav('create-event');
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('event-date').min = today;
}

function showGuests() {
    switchView('guests-view');
    updateActiveNav('guests');
}

function showAnalytics() {
    switchView('analytics-view');
    updateActiveNav('analytics');
}

function showTemplates() {
    switchView('templates-view');
    updateActiveNav('templates');
}

// Switch between views
function switchView(viewId) {
    // Hide all views
    document.querySelectorAll('.content-view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show selected view
    document.getElementById(viewId).classList.add('active');
    
    // Update current view
    currentView = viewId.replace('-view', '');
}

// Update active navigation item
function updateActiveNav(activeItem) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Find and activate the correct nav item
    const navItems = document.querySelectorAll('.nav-item a');
    navItems.forEach(item => {
        const href = item.getAttribute('onclick');
        if (href && href.includes(activeItem)) {
            item.closest('.nav-item').classList.add('active');
        }
    });
}

// Load events into the events view
function loadEvents(filter = 'all') {
    const eventsGrid = document.getElementById('events-grid');
    if (!eventsGrid) return;
    
    let filteredEvents = events;
    
    if (filter !== 'all') {
        filteredEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            const now = new Date();
            
            switch (filter) {
                case 'upcoming':
                    return eventDate >= now;
                case 'past':
                    return eventDate < now;
                case 'draft':
                    return event.status === 'draft';
                default:
                    return true;
            }
        });
    }
    
    eventsGrid.innerHTML = filteredEvents.map(event => createEventCard(event)).join('');
}

// Create event card HTML
function createEventCard(event) {
    const eventDate = new Date(event.date);
    const day = eventDate.getDate();
    const month = eventDate.toLocaleDateString('en-US', { month: 'short' });
    
    const statusClass = event.status === 'completed' ? 'completed' : 
                       event.status === 'upcoming' ? 'upcoming' : 'draft';
    
    return `
        <div class="event-card">
            <div class="event-date">
                <span class="day">${day}</span>
                <span class="month">${month}</span>
            </div>
            <div class="event-content">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <div class="event-meta">
                    <span><i class="fas fa-users"></i> ${event.currentAttendees}/${event.maxAttendees} attendees</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                    ${event.price > 0 ? `<span><i class="fas fa-dollar-sign"></i> $${event.price}</span>` : ''}
                </div>
            </div>
            <div class="event-status ${statusClass}">${event.status}</div>
        </div>
    `;
}

// Filter events
function filterEvents(filter) {
    loadEvents(filter);
}

// Handle event creation
async function handleEventCreation(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const eventData = {
        id: events.length + 1,
        title: document.getElementById('event-title').value,
        type: document.getElementById('event-type').value,
        date: document.getElementById('event-date').value,
        time: document.getElementById('event-time').value,
        location: document.getElementById('event-location').value,
        description: document.getElementById('event-description').value,
        maxAttendees: parseInt(document.getElementById('max-attendees').value),
        currentAttendees: 0,
        price: parseFloat(document.getElementById('event-price').value),
        status: 'upcoming'
    };
    
    // Show loading state
    const submitBtn = e.target.querySelector('.btn.primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Add event to array
        events.push(eventData);
        
        // Show success message
        showNotification('Event created successfully!', 'success');
        
        // Reset form
        e.target.reset();
        
        // Switch to events view
        setTimeout(() => {
            showEvents();
        }, 1000);
        
    } catch (error) {
        showNotification('Error creating event. Please try again.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Save event as draft
async function saveDraft() {
    const eventData = {
        id: events.length + 1,
        title: document.getElementById('event-title').value || 'Untitled Event',
        type: document.getElementById('event-type').value,
        date: document.getElementById('event-date').value,
        time: document.getElementById('event-time').value,
        location: document.getElementById('event-location').value,
        description: document.getElementById('event-description').value,
        maxAttendees: parseInt(document.getElementById('max-attendees').value) || 50,
        currentAttendees: 0,
        price: parseFloat(document.getElementById('event-price').value) || 0,
        status: 'draft'
    };
    
    // Add to events array
    events.push(eventData);
    
    showNotification('Event saved as draft!', 'success');
}

// User menu functions
function toggleUserMenu() {
    const dropdown = document.getElementById('user-dropdown');
    dropdown.classList.toggle('show');
}

function showProfile() {
    showNotification('Profile management coming soon!', 'info');
}

function showSettings() {
    showNotification('Settings page coming soon!', 'info');
}

function logout() {
    // Clear user data
    localStorage.removeItem('eventsphere_user');
    sessionStorage.removeItem('eventsphere_user');
    
    // Redirect to login
    window.location.href = 'login.html';
}

// Modal functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
        
        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.opacity = '0';
        
        setTimeout(() => {
            modal.classList.remove('show');
            modal.style.display = 'none';
        }, 300);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: white;
        border-radius: 10px;
        padding: 15px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        border-left: 4px solid ${getNotificationColor(type)};
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 350px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#10b981';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#6366f1';
    }
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: #64748b;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        color: #1e293b;
    }
`;
document.head.appendChild(style);

// Search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            
            if (currentView === 'events') {
                const filteredEvents = events.filter(event => 
                    event.title.toLowerCase().includes(query) ||
                    event.description.toLowerCase().includes(query) ||
                    event.location.toLowerCase().includes(query)
                );
                
                const eventsGrid = document.getElementById('events-grid');
                if (eventsGrid) {
                    eventsGrid.innerHTML = filteredEvents.map(event => createEventCard(event)).join('');
                }
            }
        });
    }
}

// Initialize search after DOM is loaded
document.addEventListener('DOMContentLoaded', setupSearch);

// Handle responsive sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show');
}

// Add mobile menu toggle (for screens < 1024px)
if (window.innerWidth <= 1024) {
    const menuToggle = document.createElement('button');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.className = 'menu-toggle';
    menuToggle.style.cssText = `
        background: none;
        border: none;
        color: #6366f1;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 10px;
        border-radius: 5px;
        transition: background 0.3s ease;
    `;
    menuToggle.onclick = toggleSidebar;
    
    document.querySelector('.nav-left').appendChild(menuToggle);
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showDashboard,
        showEvents,
        showCreateEvent,
        handleEventCreation,
        filterEvents,
        logout
    };
}