/**
 * ELEV8TION Enhancements Module
 * Advanced features: Export/Import, Search, Theme Toggle, CSV Export, etc.
 */

const Enhancements = (function() {
    'use strict';

    // ============================================
    // EXPORT/IMPORT FUNCTIONALITY
    // ============================================

    /**
     * Export all data as JSON backup
     */
    function exportData() {
        const data = DB.exportAll();
        const timestamp = new Date().toISOString().split('T')[0];
        Utils.downloadJson(data, `elev8tion-backup-${timestamp}.json`);
        Utils.showToast('Data exported successfully!', 'success');
    }

    /**
     * Import data from JSON file
     */
    function importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';

        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);

                    Utils.confirmDelete('This will replace all existing data. Are you sure?').then(confirmed => {
                        if (confirmed) {
                            const success = DB.importAll(data);
                            if (success) {
                                Utils.showToast('Data imported successfully! Reloading...', 'success');
                                setTimeout(() => location.reload(), 1500);
                            } else {
                                Utils.showToast('Failed to import data. Invalid file.', 'error');
                            }
                        }
                    });
                } catch (error) {
                    Utils.showToast('Invalid backup file', 'error');
                }
            };

            reader.readAsText(file);
        };

        input.click();
    }

    // ============================================
    // GLOBAL SEARCH
    // ============================================

    let searchResults = [];

    /**
     * Initialize global search
     */
    function initSearch() {
        const $searchBar = $('#global-search-input');

        if ($searchBar.length) {
            $searchBar.on('input', Utils.debounce(function() {
                const query = $(this).val();
                if (query.length >= 2) {
                    performGlobalSearch(query);
                } else {
                    hideSearchResults();
                }
            }, 300));
        }
    }

    /**
     * Perform search across all collections
     */
    function performGlobalSearch(query) {
        searchResults = [];

        // Search contacts
        const contacts = DB.search(DB.COLLECTIONS.CONTACTS, query);
        contacts.forEach(item => searchResults.push({ type: 'contact', data: item, link: 'crm/contacts.html' }));

        // Search projects
        const projects = DB.search(DB.COLLECTIONS.PROJECTS, query);
        projects.forEach(item => searchResults.push({ type: 'project', data: item, link: 'projects/list.html' }));

        // Search tasks
        const tasks = DB.search(DB.COLLECTIONS.TASKS, query);
        tasks.forEach(item => searchResults.push({ type: 'task', data: item, link: 'projects/tasks.html' }));

        // Search invoices
        const invoices = DB.search(DB.COLLECTIONS.INVOICES, query);
        invoices.forEach(item => searchResults.push({ type: 'invoice', data: item, link: 'finance/invoices.html' }));

        // Search deals
        const deals = DB.search(DB.COLLECTIONS.DEALS, query);
        deals.forEach(item => searchResults.push({ type: 'deal', data: item, link: 'crm/deals.html' }));

        displaySearchResults();
    }

    /**
     * Display search results dropdown
     */
    function displaySearchResults() {
        let $dropdown = $('#search-results-dropdown');

        if (!$dropdown.length) {
            $dropdown = $('<div>')
                .attr('id', 'search-results-dropdown')
                .addClass('glass-medium')
                .css({
                    position: 'absolute',
                    top: '60px',
                    right: '20px',
                    width: '400px',
                    maxHeight: '500px',
                    overflowY: 'auto',
                    borderRadius: '15px',
                    padding: '10px',
                    zIndex: 1000,
                    display: 'none'
                });
            $('body').append($dropdown);
        }

        if (searchResults.length === 0) {
            $dropdown.html(`
                <div style="padding: 20px; text-align: center; color: rgba(255,255,255,0.5);">
                    <i class="fas fa-search" style="font-size: 32px; margin-bottom: 10px; opacity: 0.3;"></i>
                    <p style="margin: 0;">No results found</p>
                </div>
            `).fadeIn(200);
            return;
        }

        let html = '<div style="padding: 10px;">';

        searchResults.slice(0, 10).forEach(result => {
            const icon = getSearchIcon(result.type);
            const color = getSearchColor(result.type);
            const title = getSearchTitle(result);
            const subtitle = getSearchSubtitle(result);

            html += `
                <div class="search-result-item" onclick="window.location.href='${result.link}'" style="
                    padding: 12px;
                    margin-bottom: 8px;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: rgba(255,255,255,0.03);
                ">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 36px; height: 36px; border-radius: 50%; background: ${color}15; display: flex; align-items: center; justify-content: center;">
                            <i class="fas ${icon}" style="color: ${color}; font-size: 14px;"></i>
                        </div>
                        <div style="flex: 1;">
                            <div style="color: rgba(255,255,255,0.9); font-weight: 500; margin-bottom: 2px;">${title}</div>
                            <div style="color: rgba(255,255,255,0.5); font-size: 12px;">${subtitle}</div>
                        </div>
                    </div>
                </div>
            `;
        });

        if (searchResults.length > 10) {
            html += `<div style="text-align: center; padding: 10px; color: rgba(255,255,255,0.5); font-size: 12px;">Showing 10 of ${searchResults.length} results</div>`;
        }

        html += '</div>';
        $dropdown.html(html).fadeIn(200);
    }

    function hideSearchResults() {
        $('#search-results-dropdown').fadeOut(200);
    }

    function getSearchIcon(type) {
        const icons = {
            contact: 'fa-user',
            project: 'fa-project-diagram',
            task: 'fa-tasks',
            invoice: 'fa-file-invoice',
            deal: 'fa-handshake'
        };
        return icons[type] || 'fa-circle';
    }

    function getSearchColor(type) {
        const colors = {
            contact: '#667eea',
            project: '#50b5ff',
            task: '#ffc107',
            invoice: '#3dd598',
            deal: '#764ba2'
        };
        return colors[type] || '#ffffff';
    }

    function getSearchTitle(result) {
        switch (result.type) {
            case 'contact':
                return result.data.name;
            case 'project':
            case 'task':
                return result.data.name || result.data.title;
            case 'invoice':
                return result.data.invoice_number;
            case 'deal':
                return result.data.title;
            default:
                return 'Item';
        }
    }

    function getSearchSubtitle(result) {
        switch (result.type) {
            case 'contact':
                return result.data.email || result.data.company || 'Contact';
            case 'project':
                return `Project • ${result.data.status}`;
            case 'task':
                return `Task • ${result.data.status}`;
            case 'invoice':
                return `Invoice • ${result.data.status}`;
            case 'deal':
                return `Deal • ${result.data.stage}`;
            default:
                return '';
        }
    }

    // ============================================
    // THEME TOGGLE
    // ============================================

    /**
     * Initialize theme toggle
     */
    function initTheme() {
        const savedTheme = localStorage.getItem('app_theme') || 'dark';
        applyTheme(savedTheme);
    }

    /**
     * Toggle between dark and light theme
     */
    function toggleTheme() {
        const currentTheme = localStorage.getItem('app_theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('app_theme', newTheme);
    }

    /**
     * Apply theme to document
     */
    function applyTheme(theme) {
        if (theme === 'light') {
            $('body').addClass('light-theme');
            $('#theme-toggle-icon').removeClass('fa-sun').addClass('fa-moon');
        } else {
            $('body').removeClass('light-theme');
            $('#theme-toggle-icon').removeClass('fa-moon').addClass('fa-sun');
        }
    }

    // ============================================
    // CSV EXPORT
    // ============================================

    /**
     * Export contacts to CSV
     */
    function exportContactsCSV() {
        const contacts = DB.getAll(DB.COLLECTIONS.CONTACTS);
        const csv = convertToCSV(contacts, ['name', 'email', 'phone', 'company', 'position', 'created_at']);
        downloadCSV(csv, 'contacts.csv');
        Utils.showToast('Contacts exported to CSV!', 'success');
    }

    /**
     * Export projects to CSV
     */
    function exportProjectsCSV() {
        const projects = DB.getAll(DB.COLLECTIONS.PROJECTS);
        const csv = convertToCSV(projects, ['name', 'description', 'status', 'start_date', 'end_date', 'budget', 'created_at']);
        downloadCSV(csv, 'projects.csv');
        Utils.showToast('Projects exported to CSV!', 'success');
    }

    /**
     * Export invoices to CSV
     */
    function exportInvoicesCSV() {
        const invoices = DB.getAll(DB.COLLECTIONS.INVOICES);
        const csv = convertToCSV(invoices, ['invoice_number', 'client_id', 'status', 'issue_date', 'due_date', 'total', 'created_at']);
        downloadCSV(csv, 'invoices.csv');
        Utils.showToast('Invoices exported to CSV!', 'success');
    }

    /**
     * Convert array of objects to CSV
     */
    function convertToCSV(data, fields) {
        if (!data || data.length === 0) return '';

        const headers = fields.join(',');
        const rows = data.map(item => {
            return fields.map(field => {
                let value = item[field] || '';
                // Escape commas and quotes
                if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                    value = `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            }).join(',');
        });

        return [headers, ...rows].join('\n');
    }

    /**
     * Download CSV file
     */
    function downloadCSV(csv, filename) {
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // ============================================
    // STORAGE USAGE INDICATOR
    // ============================================

    /**
     * Display storage usage
     */
    function displayStorageUsage() {
        const info = DB.getStorageInfo();

        return `
            <div class="storage-usage-widget">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span style="color: rgba(255,255,255,0.7); font-size: 13px;">Storage Used</span>
                    <span style="color: rgba(255,255,255,0.9); font-weight: 600; font-size: 13px;">${info.total_kb} KB / ${info.limit_mb} MB</span>
                </div>
                <div style="background: rgba(255,255,255,0.1); border-radius: 10px; height: 8px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); height: 100%; width: ${info.usage_percent}%; transition: width 0.3s;"></div>
                </div>
                <div style="color: rgba(255,255,255,0.5); font-size: 11px; margin-top: 5px;">${info.usage_percent}% used</div>
            </div>
        `;
    }

    // ============================================
    // AUTO-SAVE DRAFT
    // ============================================

    let autoSaveTimeout;
    const AUTOSAVE_DELAY = 2000; // 2 seconds

    /**
     * Initialize auto-save for forms
     */
    function initAutoSave(formId, storageKey) {
        const $form = $(`#${formId}`);

        if ($form.length) {
            // Load saved draft
            loadDraft(formId, storageKey);

            // Save on input
            $form.on('input change', 'input, textarea, select', function() {
                clearTimeout(autoSaveTimeout);
                autoSaveTimeout = setTimeout(() => {
                    saveDraft(formId, storageKey);
                }, AUTOSAVE_DELAY);
            });
        }
    }

    /**
     * Save form data as draft
     */
    function saveDraft(formId, storageKey) {
        const $form = $(`#${formId}`);
        const formData = {};

        $form.find('input, textarea, select').each(function() {
            const $field = $(this);
            const name = $field.attr('name');

            if (name) {
                if ($field.attr('type') === 'checkbox') {
                    formData[name] = $field.is(':checked');
                } else {
                    formData[name] = $field.val();
                }
            }
        });

        localStorage.setItem(`draft_${storageKey}`, JSON.stringify({
            data: formData,
            saved_at: new Date().toISOString()
        }));

        showAutoSaveIndicator();
    }

    /**
     * Load draft data into form
     */
    function loadDraft(formId, storageKey) {
        const draftJson = localStorage.getItem(`draft_${storageKey}`);

        if (draftJson) {
            try {
                const draft = JSON.parse(draftJson);
                const $form = $(`#${formId}`);

                Object.keys(draft.data).forEach(name => {
                    const $field = $form.find(`[name="${name}"]`);

                    if ($field.attr('type') === 'checkbox') {
                        $field.prop('checked', draft.data[name]);
                    } else {
                        $field.val(draft.data[name]);
                    }
                });

                Utils.showToast('Draft restored', 'info', 2000);
            } catch (e) {
                console.error('Error loading draft', e);
            }
        }
    }

    /**
     * Clear draft after successful save
     */
    function clearDraft(storageKey) {
        localStorage.removeItem(`draft_${storageKey}`);
    }

    /**
     * Show auto-save indicator
     */
    function showAutoSaveIndicator() {
        let $indicator = $('#autosave-indicator');

        if (!$indicator.length) {
            $indicator = $('<div>')
                .attr('id', 'autosave-indicator')
                .css({
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    padding: '8px 15px',
                    background: 'rgba(102, 126, 234, 0.9)',
                    color: 'white',
                    borderRadius: '20px',
                    fontSize: '12px',
                    zIndex: 9999,
                    display: 'none'
                })
                .html('<i class="fas fa-check mr-1"></i>Draft saved');

            $('body').append($indicator);
        }

        $indicator.fadeIn(200);
        setTimeout(() => $indicator.fadeOut(200), 1500);
    }

    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================

    /**
     * Get notifications
     */
    function getNotifications() {
        const notifications = [];

        // Overdue tasks
        const overdueTasks = DB.filter(DB.COLLECTIONS.TASKS, task =>
            !task.completed && task.due_date && Utils.isPast(task.due_date)
        );

        overdueTasks.forEach(task => {
            notifications.push({
                type: 'warning',
                icon: 'fa-exclamation-triangle',
                title: 'Overdue Task',
                message: task.title,
                link: 'projects/tasks.html',
                time: task.due_date
            });
        });

        // Overdue invoices
        const overdueInvoices = DB.filter(DB.COLLECTIONS.INVOICES, invoice =>
            invoice.status === 'sent' && invoice.due_date && Utils.isPast(invoice.due_date)
        );

        overdueInvoices.forEach(invoice => {
            notifications.push({
                type: 'error',
                icon: 'fa-file-invoice-dollar',
                title: 'Overdue Invoice',
                message: invoice.invoice_number,
                link: 'finance/invoices.html',
                time: invoice.due_date
            });
        });

        // Upcoming events (today and tomorrow)
        const upcomingEvents = DB.getUpcomingEvents(2);

        upcomingEvents.forEach(event => {
            if (Utils.isToday(event.start)) {
                notifications.push({
                    type: 'info',
                    icon: 'fa-calendar',
                    title: 'Event Today',
                    message: event.title,
                    link: 'calendar.html',
                    time: event.start
                });
            }
        });

        return notifications.sort((a, b) => new Date(b.time) - new Date(a.time));
    }

    /**
     * Display notification badge
     */
    function updateNotificationBadge() {
        const notifications = getNotifications();
        const $badge = $('#notification-badge');

        if (notifications.length > 0) {
            $badge.text(notifications.length).show();
        } else {
            $badge.hide();
        }
    }

    /**
     * Show notifications dropdown
     */
    function showNotifications() {
        const notifications = getNotifications();

        let html = '<div style="padding: 15px;">';
        html += '<h5 style="margin: 0 0 15px 0; color: rgba(255,255,255,0.9);">Notifications</h5>';

        if (notifications.length === 0) {
            html += `
                <div style="text-align: center; padding: 30px; color: rgba(255,255,255,0.5);">
                    <i class="fas fa-bell-slash" style="font-size: 32px; margin-bottom: 10px; opacity: 0.3;"></i>
                    <p style="margin: 0;">No notifications</p>
                </div>
            `;
        } else {
            notifications.forEach(notif => {
                const color = notif.type === 'error' ? '#fc5a5a' : notif.type === 'warning' ? '#ffc107' : '#667eea';

                html += `
                    <div onclick="window.location.href='${notif.link}'" style="
                        padding: 12px;
                        margin-bottom: 10px;
                        border-radius: 10px;
                        cursor: pointer;
                        background: rgba(255,255,255,0.03);
                        border-left: 3px solid ${color};
                    ">
                        <div style="display: flex; gap: 12px;">
                            <i class="fas ${notif.icon}" style="color: ${color}; margin-top: 2px;"></i>
                            <div style="flex: 1;">
                                <div style="color: rgba(255,255,255,0.9); font-weight: 500; margin-bottom: 2px;">${notif.title}</div>
                                <div style="color: rgba(255,255,255,0.7); font-size: 13px; margin-bottom: 4px;">${notif.message}</div>
                                <div style="color: rgba(255,255,255,0.4); font-size: 11px;">${Utils.formatRelativeTime(notif.time)}</div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        html += '</div>';

        return html;
    }

    // ============================================
    // BULK ACTIONS
    // ============================================

    let selectedItems = [];

    /**
     * Initialize bulk selection
     */
    function initBulkActions(tableId) {
        const $table = $(`#${tableId}`);

        if ($table.length) {
            // Select all checkbox
            $table.on('change', '.select-all-checkbox', function() {
                const isChecked = $(this).is(':checked');
                $table.find('.select-item-checkbox').prop('checked', isChecked);
                updateBulkToolbar();
            });

            // Individual checkbox
            $table.on('change', '.select-item-checkbox', function() {
                updateBulkToolbar();
            });
        }
    }

    /**
     * Update bulk actions toolbar
     */
    function updateBulkToolbar() {
        selectedItems = [];
        $('.select-item-checkbox:checked').each(function() {
            selectedItems.push($(this).data('id'));
        });

        const $toolbar = $('#bulk-actions-toolbar');

        if (selectedItems.length > 0) {
            if (!$toolbar.length) {
                const toolbar = $('<div>')
                    .attr('id', 'bulk-actions-toolbar')
                    .addClass('glass-medium')
                    .css({
                        position: 'fixed',
                        bottom: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '15px 25px',
                        borderRadius: '50px',
                        zIndex: 1000,
                        display: 'flex',
                        gap: '15px',
                        alignItems: 'center'
                    })
                    .html(`
                        <span style="color: rgba(255,255,255,0.9); font-weight: 500;">
                            <span id="selected-count">${selectedItems.length}</span> selected
                        </span>
                        <button class="btn btn-sm btn-danger" onclick="Enhancements.bulkDelete()">
                            <i class="fas fa-trash mr-1"></i>Delete
                        </button>
                        <button class="btn btn-sm btn-secondary" onclick="Enhancements.clearSelection()">
                            Cancel
                        </button>
                    `);

                $('body').append(toolbar);
            } else {
                $toolbar.find('#selected-count').text(selectedItems.length);
            }
        } else {
            $toolbar.remove();
        }
    }

    /**
     * Bulk delete selected items
     */
    function bulkDelete(collection) {
        Utils.confirmDelete(`Delete ${selectedItems.length} items?`).then(confirmed => {
            if (confirmed) {
                DB.deleteMany(collection, selectedItems);
                Utils.showToast(`${selectedItems.length} items deleted`, 'success');
                clearSelection();
                location.reload();
            }
        });
    }

    /**
     * Clear selection
     */
    function clearSelection() {
        selectedItems = [];
        $('.select-item-checkbox, .select-all-checkbox').prop('checked', false);
        $('#bulk-actions-toolbar').remove();
    }

    // ============================================
    // RECENT ITEMS WIDGET
    // ============================================

    /**
     * Track recently viewed item
     */
    function trackRecentItem(type, id) {
        const recent = JSON.parse(localStorage.getItem('recent_items') || '[]');

        // Remove if already exists
        const filtered = recent.filter(item => !(item.type === type && item.id === id));

        // Add to beginning
        filtered.unshift({
            type: type,
            id: id,
            viewed_at: new Date().toISOString()
        });

        // Keep only last 10
        const trimmed = filtered.slice(0, 10);

        localStorage.setItem('recent_items', JSON.stringify(trimmed));
    }

    /**
     * Get recent items widget HTML
     */
    function getRecentItemsWidget() {
        const recent = JSON.parse(localStorage.getItem('recent_items') || '[]');

        if (recent.length === 0) {
            return '<p style="color: rgba(255,255,255,0.5); text-align: center; padding: 20px;">No recent items</p>';
        }

        let html = '<div style="padding: 10px;">';

        recent.slice(0, 5).forEach(item => {
            const data = DB.get(DB.COLLECTIONS[item.type.toUpperCase() + 'S'], item.id);

            if (data) {
                const icon = getSearchIcon(item.type);
                const color = getSearchColor(item.type);
                const title = data.name || data.title || data.invoice_number || 'Item';

                html += `
                    <div style="padding: 10px; margin-bottom: 8px; border-radius: 8px; background: rgba(255,255,255,0.03); cursor: pointer;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <i class="fas ${icon}" style="color: ${color};"></i>
                            <div style="flex: 1;">
                                <div style="color: rgba(255,255,255,0.9); font-size: 14px;">${title}</div>
                                <div style="color: rgba(255,255,255,0.5); font-size: 11px;">${Utils.formatRelativeTime(item.viewed_at)}</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        });

        html += '</div>';
        return html;
    }

    // ============================================
    // PRINT INVOICE
    // ============================================

    /**
     * Print invoice in friendly format
     */
    function printInvoice(invoiceId) {
        const invoice = DB.getInvoiceWithClient(invoiceId);
        const userProfile = DB.get(DB.COLLECTIONS.USER_PROFILE);

        if (!invoice) {
            Utils.showToast('Invoice not found', 'error');
            return;
        }

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Invoice ${invoice.invoice_number}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; }
                    .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
                    .invoice-details { margin-bottom: 30px; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
                    th { background: #f5f5f5; }
                    .total { text-align: right; font-size: 18px; font-weight: bold; }
                    @media print { button { display: none; } }
                </style>
            </head>
            <body>
                <div class="header">
                    <div>
                        <h1>${userProfile.business_name}</h1>
                        <p>${userProfile.address || ''}</p>
                        <p>${userProfile.phone || ''}</p>
                        <p>${userProfile.email || ''}</p>
                    </div>
                    <div>
                        <h2>INVOICE</h2>
                        <p><strong>${invoice.invoice_number}</strong></p>
                        <p>Date: ${Utils.formatDate(invoice.issue_date)}</p>
                        <p>Due: ${Utils.formatDate(invoice.due_date)}</p>
                    </div>
                </div>

                <div class="invoice-details">
                    <h3>Bill To:</h3>
                    <p><strong>${invoice.client ? invoice.client.name : 'N/A'}</strong></p>
                    <p>${invoice.client ? invoice.client.email : ''}</p>
                    <p>${invoice.client ? invoice.client.phone : ''}</p>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${(invoice.items || []).map(item => `
                            <tr>
                                <td>${item.description}</td>
                                <td>${item.quantity}</td>
                                <td>${Utils.formatCurrency(item.rate)}</td>
                                <td>${Utils.formatCurrency(item.amount)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <div class="total">
                    <p>Subtotal: ${Utils.formatCurrency(invoice.subtotal)}</p>
                    <p>Tax (${invoice.tax_rate}%): ${Utils.formatCurrency(invoice.tax_amount)}</p>
                    <p>Discount: ${Utils.formatCurrency(invoice.discount)}</p>
                    <h3>Total: ${Utils.formatCurrency(invoice.total)}</h3>
                </div>

                ${invoice.notes ? `<p><strong>Notes:</strong> ${invoice.notes}</p>` : ''}

                <button onclick="window.print()" style="margin-top: 20px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Print Invoice</button>
            </body>
            </html>
        `);
        printWindow.document.close();
    }

    // ============================================
    // TAG MANAGEMENT
    // ============================================

    /**
     * Get all unique tags from contacts
     */
    function getAllTags() {
        const contacts = DB.getAll(DB.COLLECTIONS.CONTACTS);
        const tags = new Set();

        contacts.forEach(contact => {
            if (contact.tags && Array.isArray(contact.tags)) {
                contact.tags.forEach(tag => tags.add(tag));
            }
        });

        return Array.from(tags).sort();
    }

    /**
     * Filter by tag
     */
    function filterByTag(tag, collection = DB.COLLECTIONS.CONTACTS) {
        return DB.filter(collection, item =>
            item.tags && item.tags.includes(tag)
        );
    }

    // ============================================
    // INITIALIZE
    // ============================================

    /**
     * Initialize all enhancements
     */
    function init() {
        initSearch();
        initTheme();
        updateNotificationBadge();

        // Update notifications every minute
        setInterval(updateNotificationBadge, 60000);

        // Close search dropdown when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('#global-search-input, #search-results-dropdown').length) {
                hideSearchResults();
            }
        });
    }

    // Public API
    return {
        init: init,

        // Export/Import
        exportData: exportData,
        importData: importData,

        // Search
        performGlobalSearch: performGlobalSearch,

        // Theme
        toggleTheme: toggleTheme,

        // CSV Export
        exportContactsCSV: exportContactsCSV,
        exportProjectsCSV: exportProjectsCSV,
        exportInvoicesCSV: exportInvoicesCSV,

        // Storage
        displayStorageUsage: displayStorageUsage,

        // Auto-save
        initAutoSave: initAutoSave,
        clearDraft: clearDraft,

        // Notifications
        getNotifications: getNotifications,
        showNotifications: showNotifications,
        updateNotificationBadge: updateNotificationBadge,

        // Bulk Actions
        initBulkActions: initBulkActions,
        bulkDelete: bulkDelete,
        clearSelection: clearSelection,

        // Recent Items
        trackRecentItem: trackRecentItem,
        getRecentItemsWidget: getRecentItemsWidget,

        // Print
        printInvoice: printInvoice,

        // Tags
        getAllTags: getAllTags,
        filterByTag: filterByTag
    };
})();

// Make available globally
window.Enhancements = Enhancements;

// Initialize on page load
$(document).ready(function() {
    Enhancements.init();
});
