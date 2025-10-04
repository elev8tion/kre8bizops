/**
 * Data Layer - Unified interface for both IndexedDB and API
 * This allows gradual migration from IndexedDB to API
 */
const DataLayer = (function() {
    'use strict';

    // Configuration - set to true to use API, false to use IndexedDB
    const USE_API = true;

    // Collections mapping
    const COLLECTIONS = DB.COLLECTIONS;

    /**
     * Get all records from a collection
     */
    async function getAll(collection, options = {}) {
        if (USE_API) {
            try {
                return await APIService.readAll(collection, options);
            } catch (error) {
                console.error(`API Error in getAll(${collection}):`, error);
                // Fallback to IndexedDB if API fails
                return DB.getAll(collection);
            }
        } else {
            return DB.getAll(collection);
        }
    }

    /**
     * Get a single record by ID
     */
    async function get(collection, id) {
        if (USE_API) {
            try {
                return await APIService.readOne(collection, id);
            } catch (error) {
                console.error(`API Error in get(${collection}, ${id}):`, error);
                return DB.get(collection, id);
            }
        } else {
            return DB.get(collection, id);
        }
    }

    /**
     * Save a record (create or update)
     */
    async function save(collection, data) {
        if (USE_API) {
            try {
                if (data.id) {
                    // Update existing
                    await APIService.update(collection, data.id, data);
                    return data.id;
                } else {
                    // Create new
                    const newId = await APIService.create(collection, data);
                    return newId;
                }
            } catch (error) {
                console.error(`API Error in save(${collection}):`, error);
                return DB.save(collection, data);
            }
        } else {
            return DB.save(collection, data);
        }
    }

    /**
     * Delete a record
     */
    async function deleteRecord(collection, id) {
        if (USE_API) {
            try {
                await APIService.remove(collection, id);
                return true;
            } catch (error) {
                console.error(`API Error in delete(${collection}, ${id}):`, error);
                return DB.delete(collection, id);
            }
        } else {
            return DB.delete(collection, id);
        }
    }

    /**
     * Search records
     */
    async function search(collection, searchData) {
        if (USE_API) {
            try {
                return await APIService.search(collection, searchData);
            } catch (error) {
                console.error(`API Error in search(${collection}):`, error);
                // Fallback to local filter
                const all = DB.getAll(collection);
                return all.filter(item => {
                    return Object.keys(searchData).every(key => {
                        if (!searchData[key]) return true;
                        return item[key] && item[key].toString().toLowerCase().includes(searchData[key].toLowerCase());
                    });
                });
            }
        } else {
            const all = DB.getAll(collection);
            return all.filter(item => {
                return Object.keys(searchData).every(key => {
                    if (!searchData[key]) return true;
                    return item[key] && item[key].toString().toLowerCase().includes(searchData[key].toLowerCase());
                });
            });
        }
    }

    /**
     * Get dashboard stats (special case - uses IndexedDB for now)
     */
    function getDashboardStats() {
        return DB.getDashboardStats();
    }

    /**
     * Get contact with history (special case)
     */
    async function getContactWithHistory(id) {
        if (USE_API) {
            try {
                const contact = await APIService.readOne(COLLECTIONS.CONTACTS, id);
                // For now, return contact without history
                // TODO: Implement activity history API
                return contact;
            } catch (error) {
                console.error(`API Error in getContactWithHistory(${id}):`, error);
                return DB.getContactWithHistory(id);
            }
        } else {
            return DB.getContactWithHistory(id);
        }
    }

    // Public API
    return {
        COLLECTIONS,
        USE_API,
        getAll,
        get,
        save,
        delete: deleteRecord,
        search,
        getDashboardStats,
        getContactWithHistory
    };
})();

// Make available globally
window.DataLayer = DataLayer;
