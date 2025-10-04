/**
 * ELEV8TION Data Layer - localStorage Management
 * Handles all CRUD operations, relationships, and data persistence
 * Single-user, local-first architecture
 */

const DB = (function() {
    'use strict';

    // Collection names
    const COLLECTIONS = {
        USER_PROFILE: 'user_profile',
        CONTACTS: 'contacts',
        LEADS: 'leads',
        DEALS: 'deals',
        PROJECTS: 'projects',
        TASKS: 'tasks',
        TIME_ENTRIES: 'time_entries',
        INVOICES: 'invoices',
        EXPENSES: 'expenses',
        EVENTS: 'events',
        APPOINTMENTS: 'appointments',
        DOCUMENTS: 'documents',
        CATEGORIES: 'categories',
        PREFERENCES: 'preferences'
    };

    // Initialize data store on first load
    function initialize() {
        const appVersion = localStorage.getItem('app_version');

        if (!appVersion) {
            // First time setup
            localStorage.setItem('app_version', '1.0.0');
            localStorage.setItem('last_backup', new Date().toISOString());

            // Initialize empty collections
            Object.values(COLLECTIONS).forEach(collection => {
                if (!localStorage.getItem(collection)) {
                    if (collection === 'user_profile' || collection === 'preferences') {
                        localStorage.setItem(collection, JSON.stringify(getDefaultData(collection)));
                    } else {
                        localStorage.setItem(collection, JSON.stringify([]));
                    }
                }
            });
        }
    }

    // Get default data for new installations
    function getDefaultData(collection) {
        const defaults = {
            user_profile: {
                business_name: 'My Business',
                logo_base64: '',
                email: '',
                phone: '',
                address: '',
                currency: 'USD',
                date_format: 'MM/DD/YYYY',
                tax_rate: 8.5,
                invoice_prefix: 'INV-',
                invoice_number: 1001
            },
            preferences: {
                theme: 'cosmic-dark',
                sidebar_collapsed: false,
                items_per_page: 25,
                default_view: 'grid',
                notifications_enabled: true
            }
        };

        return defaults[collection] || {};
    }

    // ============================================
    // CORE CRUD OPERATIONS
    // ============================================

    /**
     * Get single item by ID
     */
    function get(collection, id) {
        try {
            const data = getAll(collection);

            // Handle single objects (user_profile, preferences)
            if (!Array.isArray(data)) {
                return data;
            }

            return data.find(item => item.id === id) || null;
        } catch (error) {
            console.error(`Error getting ${collection}:${id}`, error);
            return null;
        }
    }

    /**
     * Get all items from collection
     */
    function getAll(collection) {
        try {
            const data = localStorage.getItem(collection);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error(`Error getting all ${collection}`, error);
            return [];
        }
    }

    /**
     * Create new item
     */
    function create(collection, data) {
        try {
            const items = getAll(collection);

            // Generate ID if not provided
            if (!data.id) {
                data.id = generateId();
            }

            // Add timestamps
            data.created_at = new Date().toISOString();
            data.updated_at = new Date().toISOString();

            items.push(data);
            localStorage.setItem(collection, JSON.stringify(items));

            return data;
        } catch (error) {
            console.error(`Error creating ${collection}`, error);
            return null;
        }
    }

    /**
     * Update existing item
     */
    function update(collection, id, updates) {
        try {
            const items = getAll(collection);

            // Handle single objects (user_profile, preferences)
            if (!Array.isArray(items)) {
                const updated = { ...items, ...updates, updated_at: new Date().toISOString() };
                localStorage.setItem(collection, JSON.stringify(updated));
                return updated;
            }

            const index = items.findIndex(item => item.id === id);

            if (index === -1) {
                console.error(`Item ${id} not found in ${collection}`);
                return null;
            }

            // Merge updates and add timestamp
            items[index] = {
                ...items[index],
                ...updates,
                updated_at: new Date().toISOString()
            };

            localStorage.setItem(collection, JSON.stringify(items));
            return items[index];
        } catch (error) {
            console.error(`Error updating ${collection}:${id}`, error);
            return null;
        }
    }

    /**
     * Delete item by ID
     */
    function deleteItem(collection, id) {
        try {
            const items = getAll(collection);
            const filtered = items.filter(item => item.id !== id);

            if (filtered.length === items.length) {
                console.error(`Item ${id} not found in ${collection}`);
                return false;
            }

            localStorage.setItem(collection, JSON.stringify(filtered));
            return true;
        } catch (error) {
            console.error(`Error deleting ${collection}:${id}`, error);
            return false;
        }
    }

    /**
     * Delete multiple items by IDs
     */
    function deleteMany(collection, ids) {
        try {
            const items = getAll(collection);
            const filtered = items.filter(item => !ids.includes(item.id));
            localStorage.setItem(collection, JSON.stringify(filtered));
            return true;
        } catch (error) {
            console.error(`Error deleting multiple ${collection}`, error);
            return false;
        }
    }

    // ============================================
    // SEARCH & FILTER OPERATIONS
    // ============================================

    /**
     * Search collection by query string
     */
    function search(collection, query) {
        try {
            const items = getAll(collection);
            const lowerQuery = query.toLowerCase();

            return items.filter(item => {
                // Search in all string and array fields
                return Object.values(item).some(value => {
                    if (typeof value === 'string') {
                        return value.toLowerCase().includes(lowerQuery);
                    }
                    if (Array.isArray(value)) {
                        return value.some(v =>
                            typeof v === 'string' && v.toLowerCase().includes(lowerQuery)
                        );
                    }
                    return false;
                });
            });
        } catch (error) {
            console.error(`Error searching ${collection}`, error);
            return [];
        }
    }

    /**
     * Filter collection by predicate function
     */
    function filter(collection, predicate) {
        try {
            const items = getAll(collection);
            return items.filter(predicate);
        } catch (error) {
            console.error(`Error filtering ${collection}`, error);
            return [];
        }
    }

    /**
     * Sort collection by field
     */
    function sort(collection, field, direction = 'asc') {
        try {
            const items = getAll(collection);
            return items.sort((a, b) => {
                const aVal = a[field];
                const bVal = b[field];

                if (direction === 'asc') {
                    return aVal > bVal ? 1 : -1;
                } else {
                    return aVal < bVal ? 1 : -1;
                }
            });
        } catch (error) {
            console.error(`Error sorting ${collection}`, error);
            return [];
        }
    }

    // ============================================
    // SPECIALIZED QUERIES
    // ============================================

    /**
     * Get contacts by tag
     */
    function getContactsByTag(tag) {
        return filter(COLLECTIONS.CONTACTS, contact =>
            contact.tags && contact.tags.includes(tag)
        );
    }

    /**
     * Get all tasks for a project
     */
    function getProjectTasks(projectId) {
        return filter(COLLECTIONS.TASKS, task => task.project_id === projectId);
    }

    /**
     * Get invoices by status
     */
    function getInvoicesByStatus(status) {
        return filter(COLLECTIONS.INVOICES, invoice => invoice.status === status);
    }

    /**
     * Get time entries for date range
     */
    function getTimeEntriesInRange(startDate, endDate) {
        return filter(COLLECTIONS.TIME_ENTRIES, entry => {
            const entryDate = new Date(entry.date);
            return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
        });
    }

    /**
     * Get revenue for month
     */
    function getRevenueByMonth(year, month) {
        const invoices = filter(COLLECTIONS.INVOICES, invoice => {
            if (invoice.status !== 'paid') return false;

            const paidDate = new Date(invoice.paid_date);
            return paidDate.getFullYear() === year && paidDate.getMonth() === month - 1;
        });

        return invoices.reduce((total, invoice) => total + (invoice.total || 0), 0);
    }

    /**
     * Get expenses by category
     */
    function getExpensesByCategory(category) {
        return filter(COLLECTIONS.EXPENSES, expense => expense.category === category);
    }

    /**
     * Get upcoming events (next 7 days)
     */
    function getUpcomingEvents(days = 7) {
        const now = new Date();
        const future = new Date();
        future.setDate(future.getDate() + days);

        return filter(COLLECTIONS.EVENTS, event => {
            const eventDate = new Date(event.start);
            return eventDate >= now && eventDate <= future;
        });
    }

    // ============================================
    // RELATIONSHIPS & JOINS
    // ============================================

    /**
     * Get project with all tasks
     */
    function getProjectWithTasks(projectId) {
        const project = get(COLLECTIONS.PROJECTS, projectId);
        if (!project) return null;

        project.tasks = getProjectTasks(projectId);
        return project;
    }

    /**
     * Get contact with full history
     */
    function getContactWithHistory(contactId) {
        const contact = get(COLLECTIONS.CONTACTS, contactId);
        if (!contact) return null;

        // Get related data
        contact.deals = filter(COLLECTIONS.DEALS, deal => deal.contact_id === contactId);
        contact.projects = filter(COLLECTIONS.PROJECTS, project => project.client_id === contactId);
        contact.invoices = filter(COLLECTIONS.INVOICES, invoice => invoice.client_id === contactId);
        contact.appointments = filter(COLLECTIONS.APPOINTMENTS, apt => apt.client_id === contactId);

        return contact;
    }

    /**
     * Get invoice with client details
     */
    function getInvoiceWithClient(invoiceId) {
        const invoice = get(COLLECTIONS.INVOICES, invoiceId);
        if (!invoice) return null;

        invoice.client = get(COLLECTIONS.CONTACTS, invoice.client_id);
        invoice.project = invoice.project_id ? get(COLLECTIONS.PROJECTS, invoice.project_id) : null;

        return invoice;
    }

    // ============================================
    // AGGREGATIONS & STATISTICS
    // ============================================

    /**
     * Get dashboard statistics
     */
    function getDashboardStats() {
        const contacts = getAll(COLLECTIONS.CONTACTS);
        const projects = getAll(COLLECTIONS.PROJECTS);
        const tasks = getAll(COLLECTIONS.TASKS);
        const invoices = getAll(COLLECTIONS.INVOICES);

        const activeProjects = projects.filter(p => p.status === 'active').length;
        const pendingTasks = tasks.filter(t => !t.completed).length;
        const unpaidInvoices = invoices.filter(i => i.status === 'sent' || i.status === 'overdue');
        const totalRevenue = invoices
            .filter(i => i.status === 'paid')
            .reduce((sum, i) => sum + (i.total || 0), 0);

        return {
            total_contacts: contacts.length,
            active_projects: activeProjects,
            pending_tasks: pendingTasks,
            unpaid_invoices: unpaidInvoices.length,
            total_revenue: totalRevenue
        };
    }

    // ============================================
    // BACKUP & RESTORE
    // ============================================

    /**
     * Export all data as JSON
     */
    function exportAll() {
        const data = {
            app_version: localStorage.getItem('app_version'),
            exported_at: new Date().toISOString()
        };

        Object.values(COLLECTIONS).forEach(collection => {
            data[collection] = getAll(collection);
        });

        return JSON.stringify(data, null, 2);
    }

    /**
     * Import data from JSON
     */
    function importAll(jsonData) {
        try {
            const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

            // Validate data structure
            if (!data.app_version) {
                throw new Error('Invalid backup file');
            }

            // Import each collection
            Object.values(COLLECTIONS).forEach(collection => {
                if (data[collection]) {
                    localStorage.setItem(collection, JSON.stringify(data[collection]));
                }
            });

            localStorage.setItem('last_backup', new Date().toISOString());
            return true;
        } catch (error) {
            console.error('Error importing data', error);
            return false;
        }
    }

    /**
     * Clear all data (with confirmation)
     */
    function clearAll() {
        Object.values(COLLECTIONS).forEach(collection => {
            localStorage.removeItem(collection);
        });

        localStorage.removeItem('app_version');
        localStorage.removeItem('last_backup');

        // Reinitialize
        initialize();
        return true;
    }

    /**
     * Get storage usage info
     */
    function getStorageInfo() {
        let totalSize = 0;
        const breakdown = {};

        Object.values(COLLECTIONS).forEach(collection => {
            const data = localStorage.getItem(collection) || '';
            const size = new Blob([data]).size;
            breakdown[collection] = size;
            totalSize += size;
        });

        return {
            total_bytes: totalSize,
            total_kb: Math.round(totalSize / 1024),
            total_mb: Math.round(totalSize / 1024 / 1024 * 100) / 100,
            breakdown: breakdown,
            limit_mb: 10, // Typical localStorage limit
            usage_percent: Math.round((totalSize / (10 * 1024 * 1024)) * 100)
        };
    }

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    /**
     * Generate unique ID
     */
    function generateId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Count items in collection
     */
    function count(collection) {
        const items = getAll(collection);
        return Array.isArray(items) ? items.length : 0;
    }

    /**
     * Check if item exists
     */
    function exists(collection, id) {
        return get(collection, id) !== null;
    }

    // Initialize on load
    initialize();

    // Public API
    return {
        // Collections
        COLLECTIONS: COLLECTIONS,

        // Core CRUD
        get: get,
        getAll: getAll,
        create: create,
        update: update,
        delete: deleteItem,
        deleteMany: deleteMany,

        // Search & Filter
        search: search,
        filter: filter,
        sort: sort,

        // Specialized Queries
        getContactsByTag: getContactsByTag,
        getProjectTasks: getProjectTasks,
        getInvoicesByStatus: getInvoicesByStatus,
        getTimeEntriesInRange: getTimeEntriesInRange,
        getRevenueByMonth: getRevenueByMonth,
        getExpensesByCategory: getExpensesByCategory,
        getUpcomingEvents: getUpcomingEvents,

        // Relationships
        getProjectWithTasks: getProjectWithTasks,
        getContactWithHistory: getContactWithHistory,
        getInvoiceWithClient: getInvoiceWithClient,

        // Aggregations
        getDashboardStats: getDashboardStats,

        // Backup & Restore
        exportAll: exportAll,
        importAll: importAll,
        clearAll: clearAll,
        getStorageInfo: getStorageInfo,

        // Utilities
        generateId: generateId,
        count: count,
        exists: exists,
        initialize: initialize
    };
})();

// Make available globally
window.DB = DB;
