/**
 * ELEV8TION Dashboard Module
 * Main business dashboard with stats, charts, and widgets
 */

const Dashboard = (function() {
    'use strict';

    let revenueChart = null;

    /**
     * Initialize dashboard
     */
    function init() {
        // Check authentication
        if (!localStorage.getItem('isLoggedIn')) {
            window.location.href = 'index-local.html';
            return;
        }

        // Set current date
        $('#current-date').text(Utils.formatDate(new Date(), 'MMMM DD, YYYY'));

        // Load all dashboard data
        loadStats();
        loadRevenueChart();
        loadRecentActivity();
        loadPendingTasks();
        loadUpcomingEvents();

        // Set welcome message with business name
        const userProfile = DB.get(DB.COLLECTIONS.USER_PROFILE);
        if (userProfile && userProfile.business_name) {
            $('#welcome-message').text(`Welcome to ${userProfile.business_name}! Here's what's happening with your business today.`);
        }

        // Refresh data every 5 minutes
        setInterval(refreshDashboard, 5 * 60 * 1000);
    }

    /**
     * Load dashboard statistics
     */
    function loadStats() {
        const stats = DB.getDashboardStats();

        const statsConfig = [
            {
                icon: 'fa-users',
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                label: 'Total Contacts',
                value: stats.total_contacts || 0,
                trend: null,
                link: 'crm/contacts.html'
            },
            {
                icon: 'fa-project-diagram',
                gradient: 'linear-gradient(135deg, #50b5ff 0%, #3b82f6 100%)',
                label: 'Active Projects',
                value: stats.active_projects || 0,
                trend: null,
                link: 'projects/list.html'
            },
            {
                icon: 'fa-tasks',
                gradient: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
                label: 'Pending Tasks',
                value: stats.pending_tasks || 0,
                trend: null,
                link: 'projects/tasks.html'
            },
            {
                icon: 'fa-file-invoice-dollar',
                gradient: 'linear-gradient(135deg, #fc5a5a 0%, #ff4757 100%)',
                label: 'Unpaid Invoices',
                value: stats.unpaid_invoices || 0,
                trend: null,
                link: 'finance/invoices.html'
            },
            {
                icon: 'fa-dollar-sign',
                gradient: 'linear-gradient(135deg, #3dd598 0%, #22c55e 100%)',
                label: 'Total Revenue',
                value: Utils.formatCurrency(stats.total_revenue || 0),
                trend: { direction: 'up', value: '+12%' },
                link: 'finance/reports.html'
            },
            {
                icon: 'fa-handshake',
                gradient: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                label: 'Active Deals',
                value: DB.count(DB.COLLECTIONS.DEALS),
                trend: null,
                link: 'crm/deals.html'
            }
        ];

        let html = '';
        statsConfig.forEach(stat => {
            html += `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="modern-stat-card" onclick="window.location.href='${stat.link}'">
                        <!-- Shine effect -->
                        <div class="modern-card-shine"></div>

                        <!-- Glow overlay -->
                        <div class="modern-card-glow"></div>

                        <!-- Content -->
                        <div class="modern-card-content d-flex align-items-center gap-3">
                            <div class="modern-card-icon">
                                <i class="fas ${stat.icon}" style="font-size: 1.75rem;"></i>
                            </div>
                            <div class="flex-1">
                                <div class="modern-card-value">${stat.value}</div>
                                <div class="modern-card-subtitle">${stat.label}</div>
                                ${stat.trend ? `
                                    <div class="stat-trend ${stat.trend.direction}" style="margin-top: 0.5rem;">
                                        <i class="fas fa-arrow-${stat.trend.direction === 'up' ? 'up' : 'down'} mr-1"></i>
                                        ${stat.trend.value}
                                    </div>
                                ` : ''}
                            </div>
                            <div class="modern-card-arrow">
                                <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" style="width: 1.25rem; height: 1.25rem; color: rgb(129, 140, 248);">
                                    <path d="M9 5l7 7-7 7" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        $('#stats-cards').html(html);
    }

    /**
     * Load revenue chart
     */
    function loadRevenueChart() {
        const ctx = document.getElementById('revenue-chart').getContext('2d');

        // Get revenue data for last 6 months
        const now = new Date();
        const months = [];
        const revenueData = [];

        for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            months.push(Utils.formatDate(date, 'MMM YYYY'));

            const revenue = DB.getRevenueByMonth(date.getFullYear(), date.getMonth() + 1);
            revenueData.push(revenue);
        }

        // Destroy existing chart if any
        if (revenueChart) {
            revenueChart.destroy();
        }

        revenueChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Revenue',
                    data: revenueData,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#667eea',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 14, 23, 0.95)',
                        titleColor: '#fff',
                        bodyColor: 'rgba(255, 255, 255, 0.8)',
                        borderColor: 'rgba(102, 126, 234, 0.3)',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return 'Revenue: ' + Utils.formatCurrency(context.parsed.y);
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                            borderColor: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.6)',
                            callback: function(value) {
                                return Utils.formatCurrency(value);
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            borderColor: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.6)'
                        }
                    }
                }
            }
        });
    }

    /**
     * Load recent activity
     */
    function loadRecentActivity() {
        const activities = [];

        // Get recent items from various collections
        const contacts = DB.getAll(DB.COLLECTIONS.CONTACTS).slice(-5).reverse();
        const projects = DB.getAll(DB.COLLECTIONS.PROJECTS).slice(-5).reverse();
        const invoices = DB.getAll(DB.COLLECTIONS.INVOICES).slice(-5).reverse();
        const tasks = DB.getAll(DB.COLLECTIONS.TASKS).slice(-5).reverse();

        // Combine and sort by created_at
        contacts.forEach(item => activities.push({ type: 'contact', data: item, time: item.created_at }));
        projects.forEach(item => activities.push({ type: 'project', data: item, time: item.created_at }));
        invoices.forEach(item => activities.push({ type: 'invoice', data: item, time: item.created_at }));
        tasks.forEach(item => activities.push({ type: 'task', data: item, time: item.created_at }));

        activities.sort((a, b) => new Date(b.time) - new Date(a.time));

        let html = '';

        if (activities.length === 0) {
            html = `
                <div style="text-align: center; padding: 40px 20px; color: rgba(255,255,255,0.5);">
                    <i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 15px; opacity: 0.3;"></i>
                    <p style="margin: 0;">No recent activity</p>
                </div>
            `;
        } else {
            activities.slice(0, 10).forEach(activity => {
                const icon = getActivityIcon(activity.type);
                const color = getActivityColor(activity.type);
                const text = getActivityText(activity);

                html += `
                    <div class="activity-item">
                        <div class="d-flex align-items-start">
                            <div style="width: 36px; height: 36px; border-radius: 50%; background: ${color}15; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <i class="fas ${icon}" style="color: ${color}; font-size: 14px;"></i>
                            </div>
                            <div class="ml-3" style="flex: 1;">
                                <div style="color: rgba(255,255,255,0.9); font-size: 14px; margin-bottom: 3px;">${text}</div>
                                <div style="color: rgba(255,255,255,0.4); font-size: 12px;">${Utils.formatRelativeTime(activity.time)}</div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        $('#recent-activity').html(html);
    }

    function getActivityIcon(type) {
        const icons = {
            contact: 'fa-user-plus',
            project: 'fa-project-diagram',
            invoice: 'fa-file-invoice-dollar',
            task: 'fa-check-circle'
        };
        return icons[type] || 'fa-circle';
    }

    function getActivityColor(type) {
        const colors = {
            contact: '#667eea',
            project: '#50b5ff',
            invoice: '#3dd598',
            task: '#ffc107'
        };
        return colors[type] || '#ffffff';
    }

    function getActivityText(activity) {
        switch (activity.type) {
            case 'contact':
                return `New contact added: <strong>${activity.data.name}</strong>`;
            case 'project':
                return `Project created: <strong>${activity.data.name}</strong>`;
            case 'invoice':
                return `Invoice generated: <strong>${activity.data.invoice_number}</strong>`;
            case 'task':
                return `Task ${activity.data.completed ? 'completed' : 'created'}: <strong>${activity.data.title}</strong>`;
            default:
                return 'Activity recorded';
        }
    }

    /**
     * Load pending tasks
     */
    function loadPendingTasks() {
        const tasks = DB.filter(DB.COLLECTIONS.TASKS, task => !task.completed)
            .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
            .slice(0, 5);

        let html = '';

        if (tasks.length === 0) {
            html = `
                <div style="text-align: center; padding: 40px 20px; color: rgba(255,255,255,0.5);">
                    <i class="fas fa-check-double" style="font-size: 48px; margin-bottom: 15px; opacity: 0.3;"></i>
                    <p style="margin: 0;">No pending tasks!</p>
                </div>
            `;
        } else {
            tasks.forEach(task => {
                const project = task.project_id ? DB.get(DB.COLLECTIONS.PROJECTS, task.project_id) : null;
                const priorityColor = Utils.getStatusColor(task.priority || 'medium');
                const isOverdue = task.due_date && Utils.isPast(task.due_date);

                html += `
                    <div class="task-item" onclick="window.location.href='projects/tasks.html'">
                        <div class="d-flex align-items-center justify-content-between">
                            <div style="flex: 1;">
                                <div style="color: rgba(255,255,255,0.9); font-weight: 500; margin-bottom: 4px;">
                                    ${task.title}
                                </div>
                                <div style="font-size: 12px; color: rgba(255,255,255,0.5);">
                                    ${project ? `<i class="fas fa-folder mr-1"></i>${project.name}` : ''}
                                    ${task.due_date ? `<i class="fas fa-calendar ml-2 mr-1"></i>${Utils.formatDate(task.due_date)}` : ''}
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                ${isOverdue ? '<span style="background: rgba(252, 90, 90, 0.2); color: #fc5a5a; padding: 4px 10px; border-radius: 10px; font-size: 11px; font-weight: 600;">OVERDUE</span>' : ''}
                                <div style="width: 8px; height: 8px; border-radius: 50%; background: ${priorityColor};"></div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        $('#pending-tasks').html(html);
    }

    /**
     * Load upcoming events
     */
    function loadUpcomingEvents() {
        const events = DB.getUpcomingEvents(14); // Next 2 weeks

        let html = '';

        if (events.length === 0) {
            html = `
                <div style="text-align: center; padding: 40px 20px; color: rgba(255,255,255,0.5);">
                    <i class="fas fa-calendar-times" style="font-size: 48px; margin-bottom: 15px; opacity: 0.3;"></i>
                    <p style="margin: 0;">No upcoming events</p>
                </div>
            `;
        } else {
            events.slice(0, 5).forEach(event => {
                const eventDate = new Date(event.start);
                const isToday = Utils.isToday(eventDate);

                html += `
                    <div class="event-item" onclick="window.location.href='calendar.html'">
                        <div class="d-flex justify-content-between align-items-start">
                            <div style="flex: 1;">
                                <div style="color: rgba(255,255,255,0.9); font-weight: 500; margin-bottom: 4px;">
                                    ${event.title}
                                </div>
                                <div style="font-size: 12px; color: rgba(255,255,255,0.5);">
                                    <i class="far fa-clock mr-1"></i>
                                    ${Utils.formatDateTime(event.start, 'MMM DD, YYYY - HH:mm')}
                                </div>
                            </div>
                            ${isToday ? '<span style="background: rgba(61, 213, 152, 0.2); color: #3dd598; padding: 4px 10px; border-radius: 10px; font-size: 11px; font-weight: 600;">TODAY</span>' : ''}
                        </div>
                    </div>
                `;
            });
        }

        $('#upcoming-events').html(html);
    }

    /**
     * Refresh all dashboard data
     */
    function refreshDashboard() {
        loadStats();
        loadRevenueChart();
        loadRecentActivity();
        loadPendingTasks();
        loadUpcomingEvents();
    }

    // Public API
    return {
        init: init,
        refresh: refreshDashboard
    };
})();

/**
 * Quick Actions Module
 */
const QuickActions = {
    newContact: function() {
        Modals.form({
            title: 'New Contact',
            icon: 'fas fa-user-plus',
            fields: [
                { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'John Doe' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
                { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 (555) 123-4567' },
                { name: 'company', label: 'Company', type: 'text', placeholder: 'Acme Corp' },
                { name: 'position', label: 'Position', type: 'text', placeholder: 'CEO' }
            ],
            submitText: 'Create Contact',
            submitClass: 'btn-primary'
        }).then(data => {
            DB.create(DB.COLLECTIONS.CONTACTS, data);
            Utils.showToast('Contact created successfully!', 'success');
            Dashboard.refresh();
        }).catch(() => {});
    },

    newProject: function() {
        const contacts = DB.getAll(DB.COLLECTIONS.CONTACTS);

        Modals.form({
            title: 'New Project',
            icon: 'fas fa-project-diagram',
            fields: [
                { name: 'name', label: 'Project Name', type: 'text', required: true, placeholder: 'Website Redesign' },
                { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
                { name: 'client_id', label: 'Client', type: 'select', options: contacts.map(c => ({ value: c.id, label: c.name })) },
                { name: 'status', label: 'Status', type: 'select', required: true, value: 'planning', options: [
                    { value: 'planning', label: 'Planning' },
                    { value: 'active', label: 'Active' },
                    { value: 'on_hold', label: 'On Hold' },
                    { value: 'completed', label: 'Completed' }
                ]},
                { name: 'start_date', label: 'Start Date', type: 'date' },
                { name: 'end_date', label: 'End Date', type: 'date' },
                { name: 'budget', label: 'Budget', type: 'number', min: 0, step: 100 }
            ],
            submitText: 'Create Project'
        }).then(data => {
            DB.create(DB.COLLECTIONS.PROJECTS, data);
            Utils.showToast('Project created successfully!', 'success');
            Dashboard.refresh();
        }).catch(() => {});
    },

    newTask: function() {
        const projects = DB.getAll(DB.COLLECTIONS.PROJECTS);

        Modals.form({
            title: 'New Task',
            icon: 'fas fa-tasks',
            fields: [
                { name: 'title', label: 'Task Title', type: 'text', required: true, placeholder: 'Complete homepage design' },
                { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
                { name: 'project_id', label: 'Project', type: 'select', options: projects.map(p => ({ value: p.id, label: p.name })) },
                { name: 'priority', label: 'Priority', type: 'select', required: true, value: 'medium', options: [
                    { value: 'low', label: 'Low' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'high', label: 'High' },
                    { value: 'urgent', label: 'Urgent' }
                ]},
                { name: 'due_date', label: 'Due Date', type: 'date' }
            ],
            submitText: 'Create Task'
        }).then(data => {
            data.status = 'todo';
            data.completed = false;
            DB.create(DB.COLLECTIONS.TASKS, data);
            Utils.showToast('Task created successfully!', 'success');
            Dashboard.refresh();
        }).catch(() => {});
    },

    newInvoice: function() {
        const contacts = DB.getAll(DB.COLLECTIONS.CONTACTS);

        Modals.form({
            title: 'New Invoice',
            icon: 'fas fa-file-invoice-dollar',
            fields: [
                { name: 'client_id', label: 'Client', type: 'select', required: true, options: contacts.map(c => ({ value: c.id, label: c.name })) },
                { name: 'issue_date', label: 'Issue Date', type: 'date', required: true, value: new Date().toISOString().split('T')[0] },
                { name: 'due_date', label: 'Due Date', type: 'date', required: true },
                { name: 'notes', label: 'Notes', type: 'textarea', rows: 2 }
            ],
            submitText: 'Create Invoice'
        }).then(data => {
            const userProfile = DB.get(DB.COLLECTIONS.USER_PROFILE);
            const invoiceNumber = userProfile.invoice_prefix + userProfile.invoice_number;

            DB.create(DB.COLLECTIONS.INVOICES, {
                ...data,
                invoice_number: invoiceNumber,
                status: 'draft',
                items: [],
                subtotal: 0,
                tax_rate: userProfile.tax_rate,
                tax_amount: 0,
                discount: 0,
                total: 0
            });

            // Increment invoice number
            DB.update(DB.COLLECTIONS.USER_PROFILE, null, {
                invoice_number: userProfile.invoice_number + 1
            });

            Utils.showToast('Invoice created successfully!', 'success');
            Dashboard.refresh();
        }).catch(() => {});
    },

    logExpense: function() {
        const projects = DB.getAll(DB.COLLECTIONS.PROJECTS);

        Modals.form({
            title: 'Log Expense',
            icon: 'fas fa-receipt',
            fields: [
                { name: 'description', label: 'Description', type: 'text', required: true, placeholder: 'Office supplies' },
                { name: 'amount', label: 'Amount', type: 'number', required: true, min: 0, step: 0.01 },
                { name: 'category', label: 'Category', type: 'select', required: true, options: [
                    { value: 'travel', label: 'Travel' },
                    { value: 'supplies', label: 'Supplies' },
                    { value: 'software', label: 'Software' },
                    { value: 'meals', label: 'Meals' },
                    { value: 'other', label: 'Other' }
                ]},
                { name: 'vendor', label: 'Vendor', type: 'text', placeholder: 'Amazon' },
                { name: 'date', label: 'Date', type: 'date', required: true, value: new Date().toISOString().split('T')[0] },
                { name: 'project_id', label: 'Project', type: 'select', options: projects.map(p => ({ value: p.id, label: p.name })) },
                { name: 'billable', label: 'Billable', type: 'checkbox', checkboxLabel: 'This expense is billable to client' }
            ],
            submitText: 'Log Expense'
        }).then(data => {
            DB.create(DB.COLLECTIONS.EXPENSES, data);
            Utils.showToast('Expense logged successfully!', 'success');
            Dashboard.refresh();
        }).catch(() => {});
    }
};

// Initialize dashboard on page load
$(document).ready(function() {
    Dashboard.init();
});
