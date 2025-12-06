// DOM Elements
const lockDate = document.getElementById('lockDate');
const lockTime = document.getElementById('lockTime');
const clockFont = document.getElementById('clockFont');
const wallpaperUpload = document.getElementById('wallpaperUpload');
const notificationForms = document.getElementById('notificationForms');
const addNotificationBtn = document.getElementById('addNotificationBtn');
const downloadBtn = document.getElementById('downloadBtn');

// Preview elements
const lockScreen = document.getElementById('lockScreen');
const wallpaper = document.getElementById('wallpaper');
const previewDate = document.getElementById('previewDate');
const previewTime = document.getElementById('previewTime');
const notificationContainer = document.getElementById('notificationContainer');

// State
let notifications = [];
let notificationIdCounter = 0;
let wallpaperUrl = null;

// Notification class
class Notification {
    constructor(id) {
        this.id = id;
        this.appName = 'Messages';
        this.time = 'now';
        this.message = 'Your message here...';
        this.iconUrl = null;
        this.isProfile = false; // Circular for contacts
        this.showBadge = false; // iMessage badge
    }
}

// Initialize with 2 default notifications (like in the screenshot)
function init() {
    const notif1 = new Notification(notificationIdCounter++);
    notif1.appName = 'Hubby ❤️ 🫧😩';
    notif1.message = 'I love you so much my love. Not a day goes by where I don\'t think about spending the rest of my days with you or missing seeing your wonderful face especially when you smile and blush it\'s honestly the most wonderful thing in the world 😘';
    notif1.isProfile = true;
    notif1.showBadge = true;

    const notif2 = new Notification(notificationIdCounter++);
    notif2.appName = 'Netflix Rewards';
    notif2.message = 'Congrats! You just got paid $19.2 for watching Stranger Things S5 EP.1';
    notif2.isProfile = false;

    notifications.push(notif1, notif2);
    renderForms();
    updatePreview();
}

// Add notification
addNotificationBtn.addEventListener('click', () => {
    const notif = new Notification(notificationIdCounter++);
    notifications.push(notif);
    renderForms();
    updatePreview();
});

// Remove notification
function removeNotification(id) {
    notifications = notifications.filter(n => n.id !== id);
    renderForms();
    updatePreview();
}

// Render notification forms
function renderForms() {
    notificationForms.innerHTML = '';

    notifications.forEach((notif, index) => {
        const formDiv = document.createElement('div');
        formDiv.className = 'notification-form';
        formDiv.innerHTML = `
            <div class="notification-form-header">
                <span class="notification-form-title">Notification ${index + 1}</span>
                ${notifications.length > 1 ? `<button class="btn-remove" onclick="removeNotification(${notif.id})">Remove</button>` : ''}
            </div>

            <label>App Name / Contact</label>
            <input type="text" class="input notif-app-name" data-id="${notif.id}" value="${notif.appName}" placeholder="Messages, Hubby, etc.">

            <label>Time</label>
            <input type="text" class="input notif-time" data-id="${notif.id}" value="${notif.time}" placeholder="now, 5m ago, etc.">

            <label>Message</label>
            <textarea class="input notif-message" data-id="${notif.id}" rows="3" placeholder="Enter your message...">${notif.message}</textarea>

            <label>Icon / Profile Photo</label>
            <input type="file" class="input notif-icon" data-id="${notif.id}" accept="image/*">

            <label class="checkbox-label">
                <input type="checkbox" class="notif-profile" data-id="${notif.id}" ${notif.isProfile ? 'checked' : ''}>
                <span>Circular (for contact photos)</span>
            </label>

            <label class="checkbox-label">
                <input type="checkbox" class="notif-badge" data-id="${notif.id}" ${notif.showBadge ? 'checked' : ''}>
                <span>Show iMessage badge</span>
            </label>
        `;

        notificationForms.appendChild(formDiv);
    });

    // Attach event listeners
    document.querySelectorAll('.notif-app-name').forEach(input => {
        input.addEventListener('input', handleFormChange);
    });

    document.querySelectorAll('.notif-time').forEach(input => {
        input.addEventListener('input', handleFormChange);
    });

    document.querySelectorAll('.notif-message').forEach(textarea => {
        textarea.addEventListener('input', handleFormChange);
    });

    document.querySelectorAll('.notif-icon').forEach(input => {
        input.addEventListener('change', handleIconUpload);
    });

    document.querySelectorAll('.notif-profile').forEach(checkbox => {
        checkbox.addEventListener('change', handleFormChange);
    });

    document.querySelectorAll('.notif-badge').forEach(checkbox => {
        checkbox.addEventListener('change', handleFormChange);
    });
}

// Handle form changes
function handleFormChange(e) {
    const id = parseInt(e.target.dataset.id);
    const notif = notifications.find(n => n.id === id);

    if (e.target.classList.contains('notif-app-name')) {
        notif.appName = e.target.value;
    } else if (e.target.classList.contains('notif-time')) {
        notif.time = e.target.value;
    } else if (e.target.classList.contains('notif-message')) {
        notif.message = e.target.value;
    } else if (e.target.classList.contains('notif-profile')) {
        notif.isProfile = e.target.checked;
    } else if (e.target.classList.contains('notif-badge')) {
        notif.showBadge = e.target.checked;
    }

    updatePreview();
}

// Handle icon upload
function handleIconUpload(e) {
    const id = parseInt(e.target.dataset.id);
    const notif = notifications.find(n => n.id === id);
    const file = e.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            notif.iconUrl = event.target.result;
            updatePreview();
        };
        reader.readAsDataURL(file);
    }
}

// Update lock screen date/time
lockDate.addEventListener('input', () => {
    previewDate.textContent = lockDate.value;
});

lockTime.addEventListener('input', () => {
    previewTime.textContent = lockTime.value;
});

// Update clock font
clockFont.addEventListener('change', () => {
    previewTime.className = 'time';
    if (clockFont.value !== 'default') {
        previewTime.classList.add(clockFont.value);
    }
});

// Handle wallpaper upload
wallpaperUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            wallpaperUrl = event.target.result;
            wallpaper.style.backgroundImage = `url(${wallpaperUrl})`;
        };
        reader.readAsDataURL(file);
    }
});

// Update preview
function updatePreview() {
    notificationContainer.innerHTML = '';

    notifications.forEach(notif => {
        const notifDiv = document.createElement('div');
        notifDiv.className = 'notification';

        // Icon HTML
        let iconHtml = '';
        if (notif.iconUrl) {
            iconHtml = `<img src="${notif.iconUrl}" alt="icon">`;
        } else {
            iconHtml = '💬';
        }

        // Badge HTML
        const badgeHtml = notif.showBadge ? '<div class="imessage-badge"></div>' : '';

        // Exact Figma structure: Icon + Content side by side
        notifDiv.innerHTML = `
            <div class="app-icon ${notif.isProfile ? 'profile' : ''}">
                ${iconHtml}
                ${badgeHtml}
            </div>
            <div class="notification-content">
                <div class="notification-header-row">
                    <div class="app-name">${notif.appName || 'Messages'}</div>
                    <div class="notif-time">${notif.time || 'now'}</div>
                </div>
                <div class="notification-body">
                    ${notif.message || 'Your notification message will appear here...'}
                </div>
            </div>
        `;

        notificationContainer.appendChild(notifDiv);
    });
}

// Download screenshot
downloadBtn.addEventListener('click', () => {
    html2canvas(lockScreen, {
        scale: 3, // 393 * 3 = 1179px ≈ iPhone 13 Pro resolution
        useCORS: true,
        backgroundColor: null,
        logging: false
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'ios-notification-screenshot.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});

// Initialize
init();
previewDate.textContent = lockDate.value;
previewTime.textContent = lockTime.value;
