/**
 * ELEV8TION Data Tables Component
 * Sortable, searchable, paginated tables with cosmic styling
 */

const DataTable = (function() {
    'use strict';

    /**
     * Initialize table system
     */
    function init() {
        addTableStyles();
    }

    /**
     * Add cosmic table styles
     */
    function addTableStyles() {
        if ($('#cosmic-table-styles').length) return;

        const styles = `
            <style id="cosmic-table-styles">
                /* Cosmic Data Table Container */
                .cosmic-datatable {
                    background: rgba(26, 27, 38, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 15px;
                    overflow: hidden;
                }

                /* Table Header with Controls */
                .table-header {
                    padding: 20px 25px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 15px;
                }

                .table-title {
                    font-size: 20px;
                    font-weight: 700;
                    color: white;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .table-title i {
                    color: var(--glow-purple-primary, #667eea);
                }

                .table-actions {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                }

                .table-search {
                    position: relative;
                }

                .table-search input {
                    padding-left: 40px;
                    min-width: 250px;
                }

                .table-search i {
                    position: absolute;
                    left: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: rgba(255, 255, 255, 0.4);
                }

                /* Table Wrapper */
                .table-wrapper {
                    overflow-x: auto;
                }

                /* Cosmic Table */
                .cosmic-table {
                    width: 100%;
                    border-collapse: collapse;
                    color: rgba(255, 255, 255, 0.9);
                }

                .cosmic-table thead {
                    background: rgba(102, 126, 234, 0.1);
                }

                .cosmic-table th {
                    padding: 15px 20px;
                    text-align: left;
                    font-weight: 600;
                    color: white;
                    border-bottom: 2px solid rgba(102, 126, 234, 0.3);
                    white-space: nowrap;
                    cursor: pointer;
                    user-select: none;
                    position: relative;
                }

                .cosmic-table th:hover {
                    background: rgba(102, 126, 234, 0.15);
                }

                .cosmic-table th.sortable::after {
                    content: '\f0dc';
                    font-family: 'Font Awesome 5 Free';
                    font-weight: 900;
                    margin-left: 8px;
                    opacity: 0.3;
                    font-size: 12px;
                }

                .cosmic-table th.sort-asc::after {
                    content: '\f0de';
                    opacity: 1;
                    color: #667eea;
                }

                .cosmic-table th.sort-desc::after {
                    content: '\f0dd';
                    opacity: 1;
                    color: #667eea;
                }

                .cosmic-table tbody tr {
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    transition: all 0.2s ease;
                }

                .cosmic-table tbody tr:hover {
                    background: rgba(255, 255, 255, 0.05);
                }

                .cosmic-table tbody tr.selected {
                    background: rgba(102, 126, 234, 0.15);
                }

                .cosmic-table td {
                    padding: 15px 20px;
                    color: rgba(255, 255, 255, 0.8);
                }

                /* Table Cell Types */
                .cell-badge {
                    display: inline-block;
                    padding: 4px 12px;
                    border-radius: 12px;
                    font-size: 12px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .cell-avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                    font-size: 14px;
                }

                .cell-actions {
                    display: flex;
                    gap: 8px;
                }

                .cell-actions .btn {
                    padding: 6px 12px;
                    font-size: 13px;
                }

                /* Empty State */
                .table-empty {
                    text-align: center;
                    padding: 60px 20px;
                    color: rgba(255, 255, 255, 0.5);
                }

                .table-empty i {
                    font-size: 64px;
                    margin-bottom: 20px;
                    opacity: 0.3;
                }

                .table-empty h4 {
                    color: rgba(255, 255, 255, 0.7);
                    margin-bottom: 10px;
                }

                /* Table Footer with Pagination */
                .table-footer {
                    padding: 20px 25px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 15px;
                }

                .table-pagination-info {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 14px;
                }

                .table-pagination {
                    display: flex;
                    gap: 5px;
                }

                .page-btn {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: rgba(255, 255, 255, 0.8);
                    padding: 8px 14px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 14px;
                }

                .page-btn:hover:not(:disabled) {
                    background: rgba(102, 126, 234, 0.2);
                    border-color: rgba(102, 126, 234, 0.3);
                    color: white;
                }

                .page-btn.active {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-color: transparent;
                    color: white;
                    font-weight: 600;
                }

                .page-btn:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }

                /* Checkbox */
                .table-checkbox {
                    width: 18px;
                    height: 18px;
                    cursor: pointer;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .table-header {
                        flex-direction: column;
                        align-items: stretch;
                    }

                    .table-actions {
                        flex-direction: column;
                    }

                    .table-search input {
                        width: 100%;
                    }

                    .table-footer {
                        flex-direction: column;
                        align-items: stretch;
                    }

                    .table-pagination {
                        justify-content: center;
                    }

                    .cosmic-table {
                        font-size: 14px;
                    }

                    .cosmic-table th,
                    .cosmic-table td {
                        padding: 10px;
                    }
                }
            </style>
        `;

        $('head').append(styles);
    }

    /**
     * Create a data table
     */
    function create(containerId, options) {
        const defaults = {
            title: 'Data Table',
            icon: 'fas fa-table',
            data: [],
            columns: [],
            searchable: true,
            sortable: true,
            selectable: false,
            pagination: true,
            perPage: 10,
            actions: [],
            emptyMessage: 'No data available',
            onRowClick: null,
            onSelectionChange: null
        };

        const config = { ...defaults, ...options };

        // Initialize state
        const state = {
            currentPage: 1,
            sortColumn: null,
            sortDirection: 'asc',
            searchQuery: '',
            selectedRows: new Set(),
            filteredData: [...config.data]
        };

        // Store config and state
        const tableId = 'table-' + Utils.generateShortId();
        $(`#${containerId}`).data('tableConfig', config);
        $(`#${containerId}`).data('tableState', state);
        $(`#${containerId}`).data('tableId', tableId);

        // Render table
        render(containerId);

        return {
            refresh: () => render(containerId),
            setData: (data) => {
                config.data = data;
                state.filteredData = [...data];
                state.currentPage = 1;
                render(containerId);
            },
            getSelected: () => Array.from(state.selectedRows),
            clearSelection: () => {
                state.selectedRows.clear();
                render(containerId);
            }
        };
    }

    /**
     * Render table
     */
    function render(containerId) {
        const $container = $(`#${containerId}`);
        const config = $container.data('tableConfig');
        const state = $container.data('tableState');
        const tableId = $container.data('tableId');

        // Apply search filter
        if (state.searchQuery) {
            state.filteredData = config.data.filter(row => {
                return config.columns.some(col => {
                    const value = getNestedValue(row, col.field);
                    return String(value).toLowerCase().includes(state.searchQuery.toLowerCase());
                });
            });
        } else {
            state.filteredData = [...config.data];
        }

        // Apply sorting
        if (state.sortColumn) {
            state.filteredData.sort((a, b) => {
                const aVal = getNestedValue(a, state.sortColumn);
                const bVal = getNestedValue(b, state.sortColumn);

                if (state.sortDirection === 'asc') {
                    return aVal > bVal ? 1 : -1;
                } else {
                    return aVal < bVal ? 1 : -1;
                }
            });
        }

        // Pagination
        const totalPages = Math.ceil(state.filteredData.length / config.perPage);
        const startIndex = (state.currentPage - 1) * config.perPage;
        const endIndex = startIndex + config.perPage;
        const pageData = state.filteredData.slice(startIndex, endIndex);

        // Build HTML
        let html = '<div class="cosmic-datatable">';

        // Header
        html += '<div class="table-header">';
        html += `<h3 class="table-title"><i class="${config.icon}"></i>${config.title}</h3>`;
        html += '<div class="table-actions">';

        if (config.searchable) {
            html += `
                <div class="table-search">
                    <i class="fas fa-search"></i>
                    <input type="text" class="form-control" placeholder="Search..." id="${tableId}-search" value="${state.searchQuery}">
                </div>
            `;
        }

        config.actions.forEach(action => {
            html += `<button class="btn ${action.class || 'btn-primary'}" data-action="${action.id}">
                ${action.icon ? `<i class="${action.icon}"></i>` : ''} ${action.label}
            </button>`;
        });

        html += '</div></div>';

        // Table
        html += '<div class="table-wrapper">';

        if (pageData.length > 0) {
            html += '<table class="cosmic-table">';

            // Header
            html += '<thead><tr>';

            if (config.selectable) {
                html += `<th style="width: 40px;"><input type="checkbox" class="table-checkbox" id="${tableId}-select-all"></th>`;
            }

            config.columns.forEach(col => {
                const sortClass = state.sortColumn === col.field ? `sort-${state.sortDirection}` : '';
                html += `<th class="${col.sortable !== false ? 'sortable' : ''} ${sortClass}" data-field="${col.field}" style="${col.width ? 'width: ' + col.width : ''}">
                    ${col.label}
                </th>`;
            });

            html += '</tr></thead>';

            // Body
            html += '<tbody>';
            pageData.forEach((row, index) => {
                const rowId = row.id || index;
                const selected = state.selectedRows.has(rowId) ? 'selected' : '';

                html += `<tr class="${selected}" data-row-id="${rowId}">`;

                if (config.selectable) {
                    html += `<td><input type="checkbox" class="table-checkbox row-checkbox" ${selected ? 'checked' : ''}></td>`;
                }

                config.columns.forEach(col => {
                    const value = getNestedValue(row, col.field);
                    html += `<td>${col.render ? col.render(value, row) : value}</td>`;
                });

                html += '</tr>';
            });
            html += '</tbody>';

            html += '</table>';
        } else {
            html += `
                <div class="table-empty">
                    <i class="fas fa-inbox"></i>
                    <h4>No Data</h4>
                    <p>${config.emptyMessage}</p>
                </div>
            `;
        }

        html += '</div>';

        // Footer with pagination
        if (config.pagination && state.filteredData.length > 0) {
            html += '<div class="table-footer">';
            html += `<div class="table-pagination-info">Showing ${startIndex + 1} to ${Math.min(endIndex, state.filteredData.length)} of ${state.filteredData.length} entries</div>`;
            html += '<div class="table-pagination">';

            html += `<button class="page-btn" data-page="prev" ${state.currentPage === 1 ? 'disabled' : ''}><i class="fas fa-chevron-left"></i></button>`;

            for (let i = 1; i <= totalPages; i++) {
                if (i === 1 || i === totalPages || (i >= state.currentPage - 1 && i <= state.currentPage + 1)) {
                    html += `<button class="page-btn ${i === state.currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
                } else if (i === state.currentPage - 2 || i === state.currentPage + 2) {
                    html += '<span style="padding: 8px; color: rgba(255,255,255,0.4);">...</span>';
                }
            }

            html += `<button class="page-btn" data-page="next" ${state.currentPage === totalPages ? 'disabled' : ''}><i class="fas fa-chevron-right"></i></button>`;

            html += '</div></div>';
        }

        html += '</div>';

        // Render
        $container.html(html);

        // Bind events
        bindTableEvents(containerId);
    }

    /**
     * Bind table events
     */
    function bindTableEvents(containerId) {
        const $container = $(`#${containerId}`);
        const config = $container.data('tableConfig');
        const state = $container.data('tableState');

        // Search
        $container.find('input[type="text"]').on('input', Utils.debounce(function() {
            state.searchQuery = $(this).val();
            state.currentPage = 1;
            render(containerId);
        }, 300));

        // Sort
        $container.find('th.sortable').on('click', function() {
            const field = $(this).data('field');

            if (state.sortColumn === field) {
                state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                state.sortColumn = field;
                state.sortDirection = 'asc';
            }

            render(containerId);
        });

        // Pagination
        $container.find('.page-btn').on('click', function() {
            const page = $(this).data('page');
            const totalPages = Math.ceil(state.filteredData.length / config.perPage);

            if (page === 'prev') {
                state.currentPage = Math.max(1, state.currentPage - 1);
            } else if (page === 'next') {
                state.currentPage = Math.min(totalPages, state.currentPage + 1);
            } else {
                state.currentPage = page;
            }

            render(containerId);
        });

        // Row selection
        if (config.selectable) {
            // Select all
            $container.find('#' + $container.data('tableId') + '-select-all').on('change', function() {
                const checked = $(this).is(':checked');
                const startIndex = (state.currentPage - 1) * config.perPage;
                const pageData = state.filteredData.slice(startIndex, startIndex + config.perPage);

                pageData.forEach(row => {
                    const rowId = row.id;
                    if (checked) {
                        state.selectedRows.add(rowId);
                    } else {
                        state.selectedRows.delete(rowId);
                    }
                });

                render(containerId);

                if (config.onSelectionChange) {
                    config.onSelectionChange(Array.from(state.selectedRows));
                }
            });

            // Individual row
            $container.find('.row-checkbox').on('change', function() {
                const rowId = $(this).closest('tr').data('row-id');

                if ($(this).is(':checked')) {
                    state.selectedRows.add(rowId);
                } else {
                    state.selectedRows.delete(rowId);
                }

                render(containerId);

                if (config.onSelectionChange) {
                    config.onSelectionChange(Array.from(state.selectedRows));
                }
            });
        }

        // Row click
        if (config.onRowClick) {
            $container.find('tbody tr').on('click', function(e) {
                if (!$(e.target).is('.table-checkbox') && !$(e.target).closest('.cell-actions').length) {
                    const rowId = $(this).data('row-id');
                    const rowData = config.data.find(row => row.id === rowId);
                    config.onRowClick(rowData);
                }
            });
        }

        // Action buttons
        $container.find('[data-action]').on('click', function() {
            const actionId = $(this).data('action');
            const action = config.actions.find(a => a.id === actionId);
            if (action && action.onClick) {
                action.onClick();
            }
        });
    }

    /**
     * Get nested object value by path
     */
    function getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj) || '';
    }

    // Public API
    return {
        init: init,
        create: create
    };
})();

// Make available globally
window.DataTable = DataTable;

// Auto-initialize
$(document).ready(function() {
    DataTable.init();
});
