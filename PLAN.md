# PLAN.md - Technical Implementation Plan

## Tech Stack

### Frontend Framework
- **HTML5** - Semantic markup
- **CSS3** - Cosmic design system (already built)
- **jQuery 3.4.1** - DOM manipulation and event handling
- **Bootstrap 4.4.1** - Grid system and utilities

### UI Components
- **Cosmic Design System** - Custom CSS (tokens, utilities, animations, buttons, forms, cards)
- **Font Awesome 5** - Icons
- **Chart.js 3.x** - Data visualization
- **FullCalendar 5.x** - Calendar views
- **Flatpickr** - Date/time picker
- **SortableJS** - Drag-and-drop for Kanban boards

### Data Layer
- **localStorage API** - Primary data store
- **JSON** - Data serialization
- **IndexedDB** (optional) - For large files/documents if needed

### Build Tools
- **None** - Pure static files, no build process
- **Python HTTP Server** - Local development server

---

## Architecture

### Data Model

```javascript
// localStorage structure
{
  // Metadata
  "app_version": "1.0.0",
  "last_backup": "2025-10-03T12:00:00Z",

  // User Profile
  "user_profile": {
    "business_name": "My Business",
    "logo_base64": "",
    "email": "user@example.com",
    "phone": "",
    "address": "",
    "currency": "USD",
    "date_format": "MM/DD/YYYY",
    "tax_rate": 8.5,
    "invoice_prefix": "INV-",
    "invoice_number": 1001
  },

  // CRM Data
  "contacts": [
    {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "555-1234",
      "company": "Acme Corp",
      "position": "CEO",
      "address": "",
      "tags": ["vip", "client"],
      "notes": "",
      "created_at": "2025-10-01T10:00:00Z",
      "updated_at": "2025-10-01T10:00:00Z"
    }
  ],

  "leads": [
    {
      "id": "uuid",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone": "",
      "company": "",
      "stage": "qualified", // new, contacted, qualified, proposal, negotiation
      "source": "referral", // website, social, referral, cold_call, event
      "value": 5000,
      "contact_id": null, // null until converted
      "notes": "",
      "created_at": "2025-10-01T10:00:00Z",
      "updated_at": "2025-10-01T10:00:00Z"
    }
  ],

  "deals": [
    {
      "id": "uuid",
      "name": "Website Redesign Deal",
      "contact_id": "uuid",
      "project_id": "uuid",
      "stage": "negotiation", // prospecting, negotiation, won, lost
      "value": 10000,
      "probability": 70, // percentage
      "close_date": "2025-11-01",
      "notes": "",
      "created_at": "2025-10-01T10:00:00Z",
      "updated_at": "2025-10-01T10:00:00Z"
    }
  ],

  // Projects
  "projects": [
    {
      "id": "uuid",
      "name": "Website Redesign",
      "description": "Complete website overhaul",
      "client_id": "uuid",
      "status": "active", // planning, active, on_hold, completed, cancelled
      "budget": 10000,
      "start_date": "2025-10-01",
      "end_date": "2025-12-31",
      "color": "#8b5cf6",
      "created_at": "2025-10-01T10:00:00Z",
      "updated_at": "2025-10-01T10:00:00Z"
    }
  ],

  "tasks": [
    {
      "id": "uuid",
      "title": "Design homepage mockup",
      "description": "",
      "project_id": "uuid",
      "status": "todo", // todo, in_progress, review, done
      "priority": "high", // low, medium, high, urgent
      "due_date": "2025-10-15",
      "completed": false,
      "completed_at": null,
      "created_at": "2025-10-01T10:00:00Z",
      "updated_at": "2025-10-01T10:00:00Z"
    }
  ],

  "time_entries": [
    {
      "id": "uuid",
      "task_id": "uuid",
      "project_id": "uuid",
      "hours": 2.5,
      "date": "2025-10-01",
      "notes": "Initial design work",
      "billable": true,
      "created_at": "2025-10-01T10:00:00Z"
    }
  ],

  // Finance
  "invoices": [
    {
      "id": "uuid",
      "invoice_number": "INV-1001",
      "client_id": "uuid",
      "project_id": "uuid",
      "items": [
        {
          "description": "Design work",
          "quantity": 10,
          "rate": 100,
          "amount": 1000
        }
      ],
      "subtotal": 1000,
      "tax_rate": 8.5,
      "tax_amount": 85,
      "discount": 0,
      "total": 1085,
      "status": "sent", // draft, sent, paid, overdue, cancelled
      "issue_date": "2025-10-01",
      "due_date": "2025-10-31",
      "paid_date": null,
      "notes": "",
      "created_at": "2025-10-01T10:00:00Z",
      "updated_at": "2025-10-01T10:00:00Z"
    }
  ],

  "expenses": [
    {
      "id": "uuid",
      "category": "software", // travel, supplies, software, meals, other
      "amount": 50,
      "date": "2025-10-01",
      "vendor": "Adobe",
      "description": "Stock photos",
      "receipt_base64": "",
      "project_id": "uuid",
      "billable": true,
      "created_at": "2025-10-01T10:00:00Z"
    }
  ],

  // Calendar
  "events": [
    {
      "id": "uuid",
      "title": "Client Meeting",
      "start": "2025-10-15T14:00:00Z",
      "end": "2025-10-15T15:00:00Z",
      "type": "meeting", // meeting, deadline, reminder, personal
      "contact_id": "uuid",
      "location": "",
      "notes": "",
      "color": "#3b82f6",
      "created_at": "2025-10-01T10:00:00Z"
    }
  ],

  "appointments": [
    {
      "id": "uuid",
      "client_id": "uuid",
      "date": "2025-10-15",
      "time": "14:00",
      "duration": 60, // minutes
      "status": "scheduled", // scheduled, confirmed, completed, cancelled
      "notes": "",
      "created_at": "2025-10-01T10:00:00Z"
    }
  ],

  // Documents
  "documents": [
    {
      "id": "uuid",
      "name": "contract.pdf",
      "category": "contracts", // contracts, invoices, receipts, other
      "file_base64": "",
      "file_type": "application/pdf",
      "file_size": 1024,
      "project_id": "uuid",
      "contact_id": "uuid",
      "uploaded_at": "2025-10-01T10:00:00Z"
    }
  ],

  // Settings
  "categories": [
    {
      "id": "uuid",
      "type": "contact_tag", // contact_tag, expense_category, document_category
      "name": "VIP",
      "color": "#8b5cf6"
    }
  ]
}
```

### File Structure

```
organized/
├── index-local.html              # Login page
├── dashboard.html                # Main dashboard
├──
├── crm/
│   ├── contacts.html             # Contacts list
│   ├── contact-detail.html       # Single contact view
│   ├── leads.html                # Leads pipeline
│   └── deals.html                # Deals pipeline
│
├── projects/
│   ├── list.html                 # Projects list
│   ├── detail.html               # Project detail + tasks
│   ├── kanban.html               # Kanban board view
│   └── time.html                 # Time tracking
│
├── finance/
│   ├── invoices.html             # Invoices list
│   ├── invoice-detail.html       # Invoice builder
│   ├── expenses.html             # Expenses list
│   └── reports.html              # Financial reports
│
├── calendar.html                 # Calendar view
├── documents.html                # Document manager
├── settings.html                 # Settings page
│
├── css/
│   ├── cosmic-*.css             # Already built
│   └── app.css                  # App-specific styles
│
├── js/
│   ├── jquery-3.4.1.min.js      # Already exists
│   ├── bootstrap.min.js         # Already exists
│   ├── chart.min.js             # NEW - Charts
│   ├── fullcalendar.min.js      # NEW - Calendar
│   ├── flatpickr.min.js         # NEW - Date picker
│   ├── sortable.min.js          # NEW - Drag-drop
│   ├── db.js                    # NEW - Data layer
│   ├── utils.js                 # NEW - Utilities
│   ├── navigation.js            # NEW - Nav component
│   └── custom.js                # Already exists, will enhance
│
└── templates/
    └── components.html           # Reusable HTML components
```

### Core JavaScript Modules

#### 1. **db.js** - Data Layer
```javascript
// CRUD operations for all entities
const DB = {
  // Generic CRUD
  get(collection, id),
  getAll(collection),
  create(collection, data),
  update(collection, id, data),
  delete(collection, id),
  search(collection, query),
  filter(collection, predicate),

  // Specialized queries
  getContactsByTag(tag),
  getProjectTasks(projectId),
  getInvoicesByStatus(status),
  getRevenueByMonth(year, month),

  // Relationships
  getProjectWithTasks(projectId),
  getContactWithHistory(contactId),

  // Backup/Restore
  exportAll(),
  importAll(data),
  clearAll()
};
```

#### 2. **utils.js** - Utilities
```javascript
// Helper functions
const Utils = {
  // ID generation
  generateId(),

  // Date handling
  formatDate(date, format),
  parseDate(string),

  // Money
  formatCurrency(amount),
  calculateTax(amount, rate),

  // Validation
  validateEmail(email),
  validateRequired(value),

  // UI helpers
  showModal(id),
  hideModal(id),
  showToast(message, type),
  confirmDelete(message)
};
```

#### 3. **navigation.js** - Navigation Component
```javascript
// Sidebar navigation with active state
const Navigation = {
  init(),
  setActive(page),
  toggle(), // Mobile menu
  getUserProfile()
};
```

### UI Component Patterns

**Reusable Components:**
1. **Modal Dialog** - For forms and confirmations
2. **Data Table** - Sortable, searchable lists
3. **Stats Card** - Dashboard metrics
4. **Form Builder** - Consistent form layouts
5. **Dropdown Menu** - Actions menu
6. **Toast Notifications** - Success/error messages
7. **Loading Spinner** - Cosmic loader
8. **Empty States** - When no data exists
9. **Sidebar Navigation** - App-wide navigation

---

## Performance Considerations

### localStorage Limits
- Max 5-10MB per domain
- Store efficiently (no redundant data)
- Compress large strings if needed
- Use IndexedDB for files >100KB

### Rendering Optimization
- Virtual scrolling for large lists (1000+ items)
- Debounce search inputs
- Lazy load images
- Cache DOM queries

### Data Indexing
- Keep indexes in memory for fast searches
- Index by: id, date, status, client_id
- Rebuild indexes on app load

---

## Security & Privacy

- All data stored in browser localStorage
- No network requests (except CDN libraries)
- Export includes encryption option (future)
- Clear data option with confirmation
- No analytics or tracking

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Not supporting:** IE11, older mobile browsers

---

## Development Workflow

1. Build core data layer (db.js)
2. Build shared components (navigation, modals, tables)
3. Build each module page-by-page
4. Test with realistic data
5. Optimize performance
6. Polish UI/UX

---

## Testing Strategy

- Manual testing with sample data
- Test localStorage limits (create 1000+ records)
- Test on different browsers
- Test data export/import
- Test offline capability (disconnect internet)

---

This plan provides the technical foundation for building a production-ready, local-first business management app.
