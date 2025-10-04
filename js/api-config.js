/**
 * API Configuration for NoCodeBackend
 * SECURITY NOTE: In production, move these to environment variables
 */
const API_CONFIG = {
    baseUrl: 'https://api.nocodebackend.com',
    instance: '36905_elev8tion_agiled_app',
    secretKey: '169eae73ae616cd80b3443da6323d0962663e237b9fbdd5ffb81bf6005cf',

    // Helper to get authorization header
    getHeaders: function() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.secretKey}`,
            'Instance': this.instance
        };
    },

    // Helper to build full URL
    buildUrl: function(endpoint) {
        return `${this.baseUrl}${endpoint}?Instance=${this.instance}`;
    }
};

// Export for use in other files
window.API_CONFIG = API_CONFIG;
