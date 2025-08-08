// Admin Dashboard JavaScript
const API_BASE = window.location.origin + '/api';
let currentUser = null;
let currentMessages = [];
let currentPage = 1;
let selectedMessage = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
});

// Authentication
function checkAuthStatus() {
    const token = localStorage.getItem('adminToken');
    if (token) {
        // Verify token is still valid
        fetch(`${API_BASE}/admin/stats`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                showDashboard();
                loadDashboardData();
            } else {
                localStorage.removeItem('adminToken');
                showLoginForm();
            }
        })
        .catch(() => {
            localStorage.removeItem('adminToken');
            showLoginForm();
        });
    } else {
        showLoginForm();
    }
}

function login(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const credentials = {
        username: formData.get('username'),
        password: formData.get('password')
    };

    fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('adminToken', data.token);
            currentUser = data.user;
            showDashboard();
            loadDashboardData();
            hideLoginError();
        } else {
            showLoginError(data.message || 'Login failed');
        }
    })
    .catch(error => {
        showLoginError('Network error. Please try again.');
        console.error('Login error:', error);
    });
}

function logout() {
    localStorage.removeItem('adminToken');
    currentUser = null;
    showLoginForm();
}

function showLoginForm() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
}

function showDashboard() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    
    if (currentUser) {
        document.getElementById('adminName').textContent = `Welcome, ${currentUser.username}`;
    }
}

function showLoginError(message) {
    const errorEl = document.getElementById('loginError');
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
}

function hideLoginError() {
    document.getElementById('loginError').classList.add('hidden');
}

// Dashboard Data Loading
function loadDashboardData() {
    loadStats();
    loadMessages();
}

function loadStats() {
    const token = localStorage.getItem('adminToken');
    
    fetch(`${API_BASE}/admin/stats`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('totalMessages').textContent = data.data.total;
            document.getElementById('unreadMessages').textContent = data.data.unread;
            document.getElementById('todayMessages').textContent = data.data.today;
            document.getElementById('weekMessages').textContent = data.data.thisWeek;
        }
    })
    .catch(error => {
        console.error('Error loading stats:', error);
    });
}

function loadMessages(page = 1) {
    const token = localStorage.getItem('adminToken');
    
    fetch(`${API_BASE}/admin/messages?page=${page}&limit=20`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            currentMessages = data.data.messages;
            renderMessages(data.data.messages);
            renderPagination(data.data.pagination);
            currentPage = page;
        }
    })
    .catch(error => {
        console.error('Error loading messages:', error);
    });
}

function renderMessages(messages) {
    const tbody = document.getElementById('messagesTable');
    tbody.innerHTML = '';

    messages.forEach((message, index) => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50 fade-in';
        row.style.animationDelay = `${index * 50}ms`;
        
        const isUnread = !message.read_at;
        const statusBadge = isUnread 
            ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Unread</span>'
            : '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Read</span>';

        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 ${isUnread ? 'font-bold' : ''}">${escapeHtml(message.name)}</div>
                <div class="text-sm text-gray-500">${escapeHtml(message.email)}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 ${isUnread ? 'font-semibold' : ''}">${escapeHtml(message.subject || 'No subject')}</div>
            </td>
            <td class="px-6 py-4">
                <div class="text-sm text-gray-900 truncate max-w-xs">${escapeHtml(message.message.substring(0, 100))}${message.message.length > 100 ? '...' : ''}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${formatDate(message.created_at)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                ${statusBadge}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button onclick="viewMessage(${message.id})" class="text-blue-600 hover:text-blue-900">
                    <i class="fas fa-eye"></i> View
                </button>
                <button onclick="markMessageAsRead(${message.id})" class="text-green-600 hover:text-green-900 ${!isUnread ? 'opacity-50' : ''}">
                    <i class="fas fa-check"></i> Read
                </button>
                <button onclick="deleteMessageConfirm(${message.id})" class="text-red-600 hover:text-red-900">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });

    if (messages.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                    <i class="fas fa-inbox text-4xl mb-4"></i>
                    <div>No messages found</div>
                </td>
            </tr>
        `;
    }
}

function renderPagination(pagination) {
    const container = document.getElementById('pagination');
    
    if (pagination.pages <= 1) {
        container.innerHTML = `
            <div class="text-sm text-gray-700">
                Showing ${pagination.total} message${pagination.total !== 1 ? 's' : ''}
            </div>
        `;
        return;
    }

    let paginationHTML = `
        <div class="text-sm text-gray-700">
            Showing ${((pagination.page - 1) * pagination.limit) + 1} to ${Math.min(pagination.page * pagination.limit, pagination.total)} of ${pagination.total} messages
        </div>
        <div class="flex space-x-2">
    `;

    // Previous button
    if (pagination.page > 1) {
        paginationHTML += `<button onclick="loadMessages(${pagination.page - 1})" class="px-3 py-1 border rounded-md text-sm hover:bg-gray-50">Previous</button>`;
    }

    // Page numbers
    for (let i = Math.max(1, pagination.page - 2); i <= Math.min(pagination.pages, pagination.page + 2); i++) {
        const isActive = i === pagination.page;
        paginationHTML += `
            <button onclick="loadMessages(${i})" class="px-3 py-1 border rounded-md text-sm ${isActive ? 'bg-amber-600 text-white' : 'hover:bg-gray-50'}">${i}</button>
        `;
    }

    // Next button
    if (pagination.page < pagination.pages) {
        paginationHTML += `<button onclick="loadMessages(${pagination.page + 1})" class="px-3 py-1 border rounded-md text-sm hover:bg-gray-50">Next</button>`;
    }

    paginationHTML += '</div>';
    container.innerHTML = paginationHTML;
}

// Message Actions
function viewMessage(messageId) {
    const message = currentMessages.find(m => m.id === messageId);
    if (!message) return;

    selectedMessage = message;
    
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Name</label>
                    <p class="mt-1 text-sm text-gray-900">${escapeHtml(message.name)}</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <p class="mt-1 text-sm text-gray-900">
                        <a href="mailto:${escapeHtml(message.email)}" class="text-blue-600 hover:text-blue-800">
                            ${escapeHtml(message.email)}
                        </a>
                    </p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Subject</label>
                    <p class="mt-1 text-sm text-gray-900">${escapeHtml(message.subject || 'No subject')}</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Date</label>
                    <p class="mt-1 text-sm text-gray-900">${formatDate(message.created_at)}</p>
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Message</label>
                <div class="mt-1 p-3 bg-gray-50 rounded-md text-sm text-gray-900 whitespace-pre-wrap">${escapeHtml(message.message)}</div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                    <label class="block text-sm font-medium text-gray-700">IP Address</label>
                    <p class="mt-1 text-sm text-gray-600">${message.ip_address || 'Not recorded'}</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Status</label>
                    <p class="mt-1 text-sm ${message.read_at ? 'text-green-600' : 'text-red-600'}">
                        ${message.read_at ? `Read on ${formatDate(message.read_at)}` : 'Unread'}
                    </p>
                </div>
            </div>
        </div>
    `;

    // Update button states
    const markReadBtn = document.getElementById('markReadBtn');
    if (message.read_at) {
        markReadBtn.classList.add('opacity-50');
        markReadBtn.disabled = true;
    } else {
        markReadBtn.classList.remove('opacity-50');
        markReadBtn.disabled = false;
    }

    document.getElementById('messageModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('messageModal').classList.add('hidden');
    selectedMessage = null;
}

function markMessageAsRead(messageId) {
    const token = localStorage.getItem('adminToken');
    
    fetch(`${API_BASE}/admin/messages/${messageId}/read`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadDashboardData(); // Refresh all data
            if (selectedMessage && selectedMessage.id === messageId) {
                closeModal();
            }
        } else {
            alert('Failed to mark message as read');
        }
    })
    .catch(error => {
        console.error('Error marking message as read:', error);
        alert('Error occurred while marking message as read');
    });
}

function markAsRead() {
    if (selectedMessage) {
        markMessageAsRead(selectedMessage.id);
    }
}

function deleteMessageConfirm(messageId) {
    if (confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
        deleteMessageById(messageId);
    }
}

function deleteMessage() {
    if (selectedMessage && confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
        deleteMessageById(selectedMessage.id);
    }
}

function deleteMessageById(messageId) {
    const token = localStorage.getItem('adminToken');
    
    fetch(`${API_BASE}/admin/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadDashboardData(); // Refresh all data
            if (selectedMessage && selectedMessage.id === messageId) {
                closeModal();
            }
        } else {
            alert('Failed to delete message');
        }
    })
    .catch(error => {
        console.error('Error deleting message:', error);
        alert('Error occurred while deleting message');
    });
}

function refreshMessages() {
    loadDashboardData();
}

// Utility Functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        return 'Today, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 2) {
        return 'Yesterday, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays <= 7) {
        return date.toLocaleDateString([], { weekday: 'short' }) + ', ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
}

// Auto-refresh every 30 seconds
setInterval(() => {
    if (!document.getElementById('dashboard').classList.contains('hidden')) {
        loadStats();
    }
}, 30000);
