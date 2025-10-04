/**
 * ELEV8TION Navigation Component
 * Cosmic-themed sidebar navigation with active state management
 */

const Navigation = (function() {
    'use strict';

    let currentPage = '';
    let sidebarCollapsed = false;

    /**
     * Initialize navigation
     */
    function init() {
        // Load sidebar state from preferences
        const prefs = DB.get(DB.COLLECTIONS.PREFERENCES);
        sidebarCollapsed = prefs?.sidebar_collapsed || false;

        // Detect current page
        currentPage = getCurrentPage();

        // Render sidebar
        renderSidebar();

        // Apply collapsed state
        if (sidebarCollapsed) {
            $('#sidebar').addClass('collapsed');
            $('#main-content').addClass('expanded');
        }

        // Set active menu item
        setActive(currentPage);

        // Bind events
        bindEvents();
    }

    /**
     * Get current page from URL
     */
    function getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf('/') + 1);

        // Remove .html extension
        return filename.replace('.html', '') || 'dashboard';
    }

    /**
     * Get path prefix based on current directory depth
     * Returns '' for root level, '../' for subdirectories
     */
    function getPathPrefix() {
        const path = window.location.pathname;

        // Count directory depth by counting slashes after 'organized'
        const organizedIndex = path.indexOf('/organized/');
        if (organizedIndex === -1) {
            // Fallback: check if we're in a subdirectory
            const pathSegments = path.split('/').filter(seg => seg && seg !== 'organized');
            const htmlIndex = pathSegments.findIndex(seg => seg.endsWith('.html'));

            if (htmlIndex > 0) {
                // We're in a subdirectory
                return '../';
            }
            return '';
        }

        const afterOrganized = path.substring(organizedIndex + '/organized/'.length);
        const segments = afterOrganized.split('/').filter(seg => seg);

        // If only filename (e.g., 'dashboard.html' or 'index-local.html'), we're at root
        if (segments.length === 1) {
            return '';
        }

        // If we have directory/file.html, we're one level deep
        if (segments.length === 2) {
            return '../';
        }

        // For deeper nesting (shouldn't happen in current structure)
        return '../'.repeat(segments.length - 1);
    }

    /**
     * Build navigation path based on current location
     * @param {string} targetPath - The target path (e.g., 'dashboard.html', 'crm/contacts.html')
     */
    function buildPath(targetPath) {
        const prefix = getPathPrefix();
        return prefix + targetPath;
    }

    /**
     * Render sidebar HTML
     */
    function renderSidebar() {

        const userProfile = DB.get(DB.COLLECTIONS.USER_PROFILE);
        const stats = DB.getDashboardStats();

        const sidebarHtml = `
            <!-- Cosmic Sidebar -->
            <aside id="sidebar" class="cosmic-sidebar">
                <!-- Brand -->
                <div class="sidebar-brand">
                    <div class="brand-logo" style="
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                        background: linear-gradient(to bottom right, rgba(55, 48, 163, 0.4), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8));
                        border: 2px solid rgba(99, 102, 241, 0.3);
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.8);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 16px;
                        font-weight: 700;
                        color: white;
                        letter-spacing: -0.5px;
                    ">KC</div>
                    <div class="brand-text">
                        <h4>${userProfile.business_name || 'ELEV8TION'}</h4>
                        <p>Business Hub</p>
                    </div>
                </div>

                <!-- Quick Stats -->
                <div class="sidebar-stats glass-light">
                    <div class="stat-item">
                        <i class="fas fa-project-diagram"></i>
                        <span>${stats.active_projects}</span>
                        <small>Active Projects</small>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-tasks"></i>
                        <span>${stats.pending_tasks}</span>
                        <small>Pending Tasks</small>
                    </div>
                </div>

                <!-- Navigation Menu -->
                <nav class="sidebar-nav">
                    <!-- Dashboard -->
                    <a href="${buildPath('dashboard.html')}" class="nav-item" data-page="dashboard">
                        <i class="fas fa-home"></i>
                        <span>Dashboard</span>
                    </a>

                    <!-- CRM Section -->
                    <div class="nav-section">
                        <div class="nav-section-title">
                            <i class="fas fa-users"></i>
                            <span>CRM</span>
                        </div>
                        <a href="${buildPath('crm/contacts.html')}" class="nav-item" data-page="contacts">
                            <i class="fas fa-address-book"></i>
                            <span>Contacts</span>
                            <span class="badge">${stats.total_contacts}</span>
                        </a>
                        <a href="${buildPath('crm/leads.html')}" class="nav-item" data-page="leads">
                            <i class="fas fa-funnel-dollar"></i>
                            <span>Leads</span>
                        </a>
                        <a href="${buildPath('crm/deals.html')}" class="nav-item" data-page="deals">
                            <i class="fas fa-handshake"></i>
                            <span>Deals</span>
                        </a>
                    </div>

                    <!-- Projects Section -->
                    <div class="nav-section">
                        <div class="nav-section-title">
                            <i class="fas fa-project-diagram"></i>
                            <span>Projects</span>
                        </div>
                        <a href="${buildPath('projects/list.html')}" class="nav-item" data-page="list">
                            <i class="fas fa-folder-open"></i>
                            <span>All Projects</span>
                        </a>
                        <a href="${buildPath('projects/tasks.html')}" class="nav-item" data-page="tasks">
                            <i class="fas fa-tasks"></i>
                            <span>Tasks</span>
                        </a>
                        <a href="${buildPath('projects/time.html')}" class="nav-item" data-page="time">
                            <i class="fas fa-clock"></i>
                            <span>Time Tracking</span>
                        </a>
                    </div>

                    <!-- Finance Section -->
                    <div class="nav-section">
                        <div class="nav-section-title">
                            <i class="fas fa-dollar-sign"></i>
                            <span>Finance</span>
                        </div>
                        <a href="${buildPath('finance/invoices.html')}" class="nav-item" data-page="invoices">
                            <i class="fas fa-file-invoice-dollar"></i>
                            <span>Invoices</span>
                            ${stats.unpaid_invoices > 0 ? `<span class="badge badge-warning">${stats.unpaid_invoices}</span>` : ''}
                        </a>
                        <a href="${buildPath('finance/expenses.html')}" class="nav-item" data-page="expenses">
                            <i class="fas fa-receipt"></i>
                            <span>Expenses</span>
                        </a>
                        <a href="${buildPath('finance/reports.html')}" class="nav-item" data-page="reports">
                            <i class="fas fa-chart-line"></i>
                            <span>Reports</span>
                        </a>
                    </div>

                    <!-- Other -->
                    <a href="${buildPath('calendar/index.html')}" class="nav-item" data-page="index">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Calendar</span>
                    </a>
                    <a href="${buildPath('documents/index.html')}" class="nav-item" data-page="index">
                        <i class="fas fa-folder"></i>
                        <span>Documents</span>
                    </a>
                    <a href="${buildPath('settings/index.html')}" class="nav-item" data-page="index">
                        <i class="fas fa-cog"></i>
                        <span>Settings</span>
                    </a>
                </nav>

                <!-- Sidebar Footer -->
                <div class="sidebar-footer">
                    <button id="sidebar-toggle" class="btn btn-sm glass-light">
                        <i class="fas fa-angles-left"></i>
                    </button>
                    <button id="logout-btn" class="btn btn-sm btn-danger">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        `;

        // Insert sidebar if not exists
        if (!$('#sidebar').length) {
            $('body').prepend(sidebarHtml);
        } else {
            $('#sidebar').replaceWith(sidebarHtml);
        }

        // Add cosmic sidebar styles if not exists
        if (!$('#cosmic-sidebar-styles').length) {
            addSidebarStyles();
        }
    }

    /**
     * Add sidebar CSS styles
     */
    function addSidebarStyles() {
        const styles = `
            <style id="cosmic-sidebar-styles">
                /* Cosmic Sidebar */
                .cosmic-sidebar {
                    position: fixed;
                    left: 0;
                    top: 0;
                    width: 280px;
                    height: 100vh;
                    background: linear-gradient(to bottom right, rgba(55, 48, 163, 0.4), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8));
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border: 2px solid rgba(99, 102, 241, 0.3);
                    border-left: none;
                    border-top: none;
                    border-bottom: none;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
                    overflow-y: auto;
                    overflow-x: hidden;
                    z-index: 1000;
                    transition: all 0.3s ease;
                    display: flex;
                    flex-direction: column;
                }

                .cosmic-sidebar.collapsed {
                    width: 80px;
                }

                .cosmic-sidebar.collapsed .brand-text,
                .cosmic-sidebar.collapsed .sidebar-stats,
                .cosmic-sidebar.collapsed .nav-section-title span,
                .cosmic-sidebar.collapsed .nav-item span,
                .cosmic-sidebar.collapsed .badge {
                    opacity: 0;
                    width: 0;
                    overflow: hidden;
                }

                .cosmic-sidebar.collapsed .sidebar-footer button span {
                    display: none;
                }

                #main-content {
                    margin-left: 280px;
                    transition: margin-left 0.3s ease;
                    min-height: 100vh;
                }

                #main-content.expanded {
                    margin-left: 80px;
                }

                /* Sidebar Brand */
                .sidebar-brand {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 25px 20px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .brand-logo {
                    width: 50px;
                    height: 50px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    color: white;
                    flex-shrink: 0;
                }

                .brand-logo img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    border-radius: 12px;
                }

                .brand-text h4 {
                    margin: 0;
                    font-size: 18px;
                    font-weight: 700;
                    color: white;
                    white-space: nowrap;
                }

                .brand-text p {
                    margin: 0;
                    font-size: 12px;
                    color: rgba(255, 255, 255, 0.6);
                }

                /* Sidebar Stats */
                .sidebar-stats {
                    margin: 15px;
                    padding: 15px;
                    border-radius: 12px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                }

                .stat-item {
                    text-align: center;
                }

                .stat-item i {
                    display: block;
                    font-size: 20px;
                    color: #667eea;
                    margin-bottom: 5px;
                }

                .stat-item span {
                    display: block;
                    font-size: 24px;
                    font-weight: 700;
                    color: white;
                }

                .stat-item small {
                    display: block;
                    font-size: 11px;
                    color: rgba(255, 255, 255, 0.6);
                    margin-top: 3px;
                }

                /* Navigation */
                .sidebar-nav {
                    flex: 1;
                    padding: 10px 0;
                }

                .nav-section {
                    margin-bottom: 20px;
                }

                .nav-section-title {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 20px;
                    font-size: 12px;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.5);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 20px;
                    color: rgba(255, 255, 255, 0.8);
                    text-decoration: none;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .nav-item::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 3px;
                    background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .nav-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: white;
                }

                .nav-item.active {
                    background: rgba(102, 126, 234, 0.15);
                    color: white;
                }

                .nav-item.active::before {
                    opacity: 1;
                }

                .nav-item i {
                    width: 20px;
                    text-align: center;
                    font-size: 16px;
                    flex-shrink: 0;
                }

                .nav-item span:first-of-type {
                    flex: 1;
                }

                .nav-item .badge {
                    background: rgba(102, 126, 234, 0.3);
                    color: white;
                    padding: 2px 8px;
                    border-radius: 10px;
                    font-size: 11px;
                    font-weight: 600;
                }

                .nav-item .badge-warning {
                    background: rgba(255, 193, 7, 0.3);
                    color: #ffc107;
                }

                /* Sidebar Footer */
                .sidebar-footer {
                    padding: 15px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    gap: 10px;
                }

                .sidebar-footer button {
                    flex: 1;
                    white-space: nowrap;
                }

                #sidebar-toggle {
                    flex: 0;
                }

                /* Scrollbar */
                .cosmic-sidebar::-webkit-scrollbar {
                    width: 6px;
                }

                .cosmic-sidebar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                }

                .cosmic-sidebar::-webkit-scrollbar-thumb {
                    background: rgba(102, 126, 234, 0.5);
                    border-radius: 3px;
                }

                .cosmic-sidebar::-webkit-scrollbar-thumb:hover {
                    background: rgba(102, 126, 234, 0.7);
                }

                /* Mobile Responsive */
                @media (max-width: 768px) {
                    .cosmic-sidebar {
                        transform: translateX(-100%);
                    }

                    .cosmic-sidebar.mobile-open {
                        transform: translateX(0);
                    }

                    #main-content {
                        margin-left: 0 !important;
                    }
                }
            </style>
        `;

        $('head').append(styles);
    }

    /**
     * Bind event listeners
     */
    function bindEvents() {
        // Sidebar toggle
        $(document).on('click', '#sidebar-toggle', function() {
            toggle();
        });

        // Logout
        $(document).on('click', '#logout-btn', function() {
            logout();
        });

        // Nav item clicks (for SPA navigation in future)
        $(document).on('click', '.nav-item', function(e) {
            const page = $(this).data('page');
            if (page) {
                setActive(page);
            }
        });
    }

    /**
     * Set active menu item
     */
    function setActive(page) {
        $('.nav-item').removeClass('active');
        $(`.nav-item[data-page="${page}"]`).addClass('active');
        currentPage = page;
    }

    /**
     * Toggle sidebar collapsed state
     */
    function toggle() {
        sidebarCollapsed = !sidebarCollapsed;

        $('#sidebar').toggleClass('collapsed');
        $('#main-content').toggleClass('expanded');

        // Update icon
        const $icon = $('#sidebar-toggle i');
        $icon.toggleClass('fa-angles-left fa-angles-right');

        // Save preference
        DB.update(DB.COLLECTIONS.PREFERENCES, null, {
            sidebar_collapsed: sidebarCollapsed
        });
    }

    /**
     * Logout user
     */
    function logout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('isLoggedIn');
            window.location.href = buildPath('dashboard.html');
        }
    }

    /**
     * Get user profile for display
     */
    function getUserProfile() {
        return DB.get(DB.COLLECTIONS.USER_PROFILE);
    }

    /**
     * Refresh navigation (useful after data changes)
     */
    function refresh() {
        renderSidebar();
        setActive(currentPage);
    }

    // Public API
    return {
        init: init,
        setActive: setActive,
        toggle: toggle,
        getUserProfile: getUserProfile,
        refresh: refresh
    };
})();

// Make available globally
window.Navigation = Navigation;

// Auto-initialize on pages with sidebar
$(document).ready(function() {
    // Only init if not on login page
    const isLoginPage = window.location.pathname.includes('index-local');

    if (!isLoginPage && localStorage.getItem('isLoggedIn') === 'true') {
        Navigation.init();
    }
});
