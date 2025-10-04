/**
 * API Service Layer for NoCodeBackend Integration
 * Provides CRUD operations for all entities
 */
const APIService = (function() {
    'use strict';

    // Available collections/tables
    const COLLECTIONS = {
        CONTACTS: 'contacts',
        LEADS: 'leads',
        DEALS: 'deals',
        PROJECTS: 'projects',
        TASKS: 'tasks',
        INVOICES: 'invoices',
        EXPENSES: 'expenses',
        TIME_ENTRIES: 'time_entries',
        DOCUMENTS: 'documents',
        SETTINGS: 'settings'
    };

    /**
     * Generic API request handler
     */
    async function makeRequest(endpoint, method = 'GET', data = null) {
        const url = API_CONFIG.buildUrl(endpoint);
        const options = {
            method: method,
            headers: API_CONFIG.getHeaders()
        };

        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, options);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || `API Error: ${response.status}`);
            }

            return result;
        } catch (error) {
            console.error('API Request Failed:', error);
            throw error;
        }
    }

    /**
     * CREATE - Add new record
     */
    async function create(collection, data) {
        const endpoint = `/create/${collection}`;
        const result = await makeRequest(endpoint, 'POST', data);
        return result.id; // Return the new ID
    }

    /**
     * READ ALL - Get all records with optional filtering and pagination
     */
    async function readAll(collection, options = {}) {
        const { page = 1, limit = 100, filters = {} } = options;

        // Build query params for filtering
        let queryParams = `page=${page}&limit=${limit}`;
        Object.keys(filters).forEach(key => {
            queryParams += `&${key}=${encodeURIComponent(filters[key])}`;
        });

        const endpoint = `/read/${collection}?${queryParams}`;
        const result = await makeRequest(endpoint, 'GET');
        return result.data || [];
    }

    /**
     * READ ONE - Get single record by ID
     */
    async function readOne(collection, id) {
        const endpoint = `/read/${collection}/${id}`;
        const result = await makeRequest(endpoint, 'GET');
        return result.data;
    }

    /**
     * UPDATE - Update existing record
     */
    async function update(collection, id, data) {
        const endpoint = `/update/${collection}/${id}`;
        await makeRequest(endpoint, 'PUT', data);
        return true;
    }

    /**
     * DELETE - Remove record
     */
    async function remove(collection, id) {
        const endpoint = `/delete/${collection}/${id}`;
        await makeRequest(endpoint, 'DELETE');
        return true;
    }

    /**
     * SEARCH - Search for records
     */
    async function search(collection, searchData) {
        const endpoint = `/search/${collection}`;
        const result = await makeRequest(endpoint, 'POST', searchData);
        return result.data || [];
    }

    /**
     * High-level convenience methods for common operations
     */

    // Contacts
    const contacts = {
        create: (data) => create(COLLECTIONS.CONTACTS, data),
        getAll: (options) => readAll(COLLECTIONS.CONTACTS, options),
        getById: (id) => readOne(COLLECTIONS.CONTACTS, id),
        update: (id, data) => update(COLLECTIONS.CONTACTS, id, data),
        delete: (id) => remove(COLLECTIONS.CONTACTS, id),
        search: (searchData) => search(COLLECTIONS.CONTACTS, searchData)
    };

    // Leads
    const leads = {
        create: (data) => create(COLLECTIONS.LEADS, data),
        getAll: (options) => readAll(COLLECTIONS.LEADS, options),
        getById: (id) => readOne(COLLECTIONS.LEADS, id),
        update: (id, data) => update(COLLECTIONS.LEADS, id, data),
        delete: (id) => remove(COLLECTIONS.LEADS, id),
        search: (searchData) => search(COLLECTIONS.LEADS, searchData)
    };

    // Deals
    const deals = {
        create: (data) => create(COLLECTIONS.DEALS, data),
        getAll: (options) => readAll(COLLECTIONS.DEALS, options),
        getById: (id) => readOne(COLLECTIONS.DEALS, id),
        update: (id, data) => update(COLLECTIONS.DEALS, id, data),
        delete: (id) => remove(COLLECTIONS.DEALS, id),
        search: (searchData) => search(COLLECTIONS.DEALS, searchData)
    };

    // Projects
    const projects = {
        create: (data) => create(COLLECTIONS.PROJECTS, data),
        getAll: (options) => readAll(COLLECTIONS.PROJECTS, options),
        getById: (id) => readOne(COLLECTIONS.PROJECTS, id),
        update: (id, data) => update(COLLECTIONS.PROJECTS, id, data),
        delete: (id) => remove(COLLECTIONS.PROJECTS, id),
        search: (searchData) => search(COLLECTIONS.PROJECTS, searchData)
    };

    // Tasks
    const tasks = {
        create: (data) => create(COLLECTIONS.TASKS, data),
        getAll: (options) => readAll(COLLECTIONS.TASKS, options),
        getById: (id) => readOne(COLLECTIONS.TASKS, id),
        update: (id, data) => update(COLLECTIONS.TASKS, id, data),
        delete: (id) => remove(COLLECTIONS.TASKS, id),
        search: (searchData) => search(COLLECTIONS.TASKS, searchData)
    };

    // Invoices
    const invoices = {
        create: (data) => create(COLLECTIONS.INVOICES, data),
        getAll: (options) => readAll(COLLECTIONS.INVOICES, options),
        getById: (id) => readOne(COLLECTIONS.INVOICES, id),
        update: (id, data) => update(COLLECTIONS.INVOICES, id, data),
        delete: (id) => remove(COLLECTIONS.INVOICES, id),
        search: (searchData) => search(COLLECTIONS.INVOICES, searchData)
    };

    // Expenses
    const expenses = {
        create: (data) => create(COLLECTIONS.EXPENSES, data),
        getAll: (options) => readAll(COLLECTIONS.EXPENSES, options),
        getById: (id) => readOne(COLLECTIONS.EXPENSES, id),
        update: (id, data) => update(COLLECTIONS.EXPENSES, id, data),
        delete: (id) => remove(COLLECTIONS.EXPENSES, id),
        search: (searchData) => search(COLLECTIONS.EXPENSES, searchData)
    };

    // Time Entries
    const timeEntries = {
        create: (data) => create(COLLECTIONS.TIME_ENTRIES, data),
        getAll: (options) => readAll(COLLECTIONS.TIME_ENTRIES, options),
        getById: (id) => readOne(COLLECTIONS.TIME_ENTRIES, id),
        update: (id, data) => update(COLLECTIONS.TIME_ENTRIES, id, data),
        delete: (id) => remove(COLLECTIONS.TIME_ENTRIES, id),
        search: (searchData) => search(COLLECTIONS.TIME_ENTRIES, searchData)
    };

    // Documents
    const documents = {
        create: (data) => create(COLLECTIONS.DOCUMENTS, data),
        getAll: (options) => readAll(COLLECTIONS.DOCUMENTS, options),
        getById: (id) => readOne(COLLECTIONS.DOCUMENTS, id),
        update: (id, data) => update(COLLECTIONS.DOCUMENTS, id, data),
        delete: (id) => remove(COLLECTIONS.DOCUMENTS, id),
        search: (searchData) => search(COLLECTIONS.DOCUMENTS, searchData)
    };

    // Settings
    const settings = {
        create: (data) => create(COLLECTIONS.SETTINGS, data),
        getAll: (options) => readAll(COLLECTIONS.SETTINGS, options),
        getById: (id) => readOne(COLLECTIONS.SETTINGS, id),
        update: (id, data) => update(COLLECTIONS.SETTINGS, id, data),
        delete: (id) => remove(COLLECTIONS.SETTINGS, id),
        search: (searchData) => search(COLLECTIONS.SETTINGS, searchData)
    };

    // Public API
    return {
        COLLECTIONS,

        // Generic methods
        create,
        readAll,
        readOne,
        update,
        remove,
        search,

        // Entity-specific methods
        contacts,
        leads,
        deals,
        projects,
        tasks,
        invoices,
        expenses,
        timeEntries,
        documents,
        settings
    };
})();

// Make available globally
window.APIService = APIService;
