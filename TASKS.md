# TASKS.md - Implementation Task List

This build will be executed by **orchestrated sub-agents** working in parallel where possible, with detailed step-by-step instructions and accountability hooks.

---

## PHASE 1: CORE INFRASTRUCTURE (Foundation)
**Parallel Execution: Agent 1-3**

### TASK 1.1: Build Data Layer (db.js)
**Agent:** Data-Layer-Agent
**Dependencies:** None
**Output:** `/organized/js/db.js`

**Steps:**
1. Create db.js file with localStorage wrapper
2. Implement CRUD operations (create, read, update, delete)
3. Add search and filter methods
4. Implement relationship queries (e.g., getProjectWithTasks)
5. Add data validation methods
6. Implement export/import functions
7. Add sample data seeding for development
8. Test with 1000+ records for performance

**Acceptance Criteria:**
- [ ] Can create/read/update/delete all entity types
- [ ] Search works across all collections
- [ ] Export produces valid JSON
- [ ] Import restores all data correctly
- [ ] Handles localStorage quota errors gracefully

**Hook:** Update progress: "Data layer complete - ${testsPassed}/${totalTests} tests passed"

---

### TASK 1.2: Build Utility Functions (utils.js)
**Agent:** Utils-Agent
**Dependencies:** None
**Output:** `/organized/js/utils.js`

**Steps:**
1. Create utils.js file
2. Add ID generation (UUID v4)
3. Add date formatting functions
4. Add currency formatting
5. Add validation functions (email, phone, required)
6. Add DOM helper functions (modals, toasts, confirmations)
7. Add form serialization helpers
8. Add debounce/throttle functions

**Acceptance Criteria:**
- [ ] generateId() produces unique IDs
- [ ] Date formatting works for all formats
- [ ] Currency displays with correct symbols
- [ ] Email validation catches invalid emails
- [ ] Toast notifications display correctly

**Hook:** Update progress: "Utilities complete - ${functionCount} functions implemented"

---

### TASK 1.3: Build Navigation Component
**Agent:** Nav-Agent
**Dependencies:** cosmic-design-system.css
**Output:** `/organized/js/navigation.js` + `/organized/templates/sidebar.html`

**Steps:**
1. Create sidebar HTML template with cosmic styling
2. Add navigation items for all modules
3. Implement active state highlighting
4. Add mobile menu toggle
5. Add user profile display in sidebar
6. Implement navigation.js with init() and setActive()
7. Add logout functionality
8. Style with cosmic theme (glass-medium, glow-purple)

**Acceptance Criteria:**
- [ ] Sidebar displays all module links
- [ ] Active page is highlighted
- [ ] Mobile menu works on small screens
- [ ] Logout clears session and redirects
- [ ] Cosmic styling matches design system

**Hook:** Update progress: "Navigation complete - ${menuItems} items added"

---

## PHASE 2: SHARED COMPONENTS (Reusable UI)
**Parallel Execution: Agent 4-6**

### TASK 2.1: Build Modal Component
**Agent:** Modal-Agent
**Dependencies:** cosmic-buttons.css, utils.js
**Output:** `/organized/templates/modal.html` + CSS

**Steps:**
1. Create modal HTML template (glass-medium background)
2. Add modal header, body, footer sections
3. Implement showModal() and hideModal() in utils.js
4. Add ESC key and backdrop click to close
5. Add modal sizes (small, medium, large)
6. Style with cosmic design (purple glow borders)
7. Create confirmation modal variant
8. Create form modal variant

**Acceptance Criteria:**
- [ ] Modal opens/closes smoothly
- [ ] ESC key closes modal
- [ ] Backdrop click closes modal
- [ ] Multiple modals can be managed
- [ ] Form submission works from modals

**Hook:** Update progress: "Modal component ready - ${variantCount} variants created"

---

### TASK 2.2: Build Data Table Component
**Agent:** Table-Agent
**Dependencies:** utils.js
**Output:** `/organized/templates/datatable.html` + `/organized/js/datatable.js`

**Steps:**
1. Create table HTML template with cosmic styling
2. Implement column sorting
3. Add search/filter functionality
4. Implement pagination
5. Add row actions (edit, delete, view)
6. Add bulk actions (select all, delete multiple)
7. Add empty state template
8. Style with glass-medium cards

**Acceptance Criteria:**
- [ ] Table renders data correctly
- [ ] Sorting works on all columns
- [ ] Search filters results in real-time
- [ ] Pagination handles 100+ records
- [ ] Row actions trigger callbacks

**Hook:** Update progress: "DataTable ready - supports ${maxRows} rows"

---

### TASK 2.3: Build Form Components
**Agent:** Forms-Agent
**Dependencies:** cosmic-forms.css, utils.js
**Output:** `/organized/templates/forms.html` + validation

**Steps:**
1. Create form templates (create, edit patterns)
2. Implement form validation
3. Add auto-save draft functionality
4. Create form field components (text, email, date, select, textarea)
5. Add file upload (base64 encoding)
6. Style with cosmic-input-group
7. Add success/error toast notifications
8. Implement form serialization to JSON

**Acceptance Criteria:**
- [ ] All field types render correctly
- [ ] Validation shows inline errors
- [ ] Forms submit via AJAX pattern
- [ ] Auto-save works for long forms
- [ ] File upload converts to base64

**Hook:** Update progress: "Forms ready - ${fieldTypes} field types supported"

---

## PHASE 3: DASHBOARD MODULE
**Single Agent Execution: Agent 7**

### TASK 3.1: Build Dashboard Page
**Agent:** Dashboard-Agent
**Dependencies:** db.js, utils.js, navigation.js, Chart.js
**Output:** `/organized/dashboard.html` + `/organized/js/dashboard.js`

**Steps:**
1. Create dashboard.html with sidebar navigation
2. Add 4 stats cards (revenue, projects, tasks, contacts)
3. Implement stats calculations from db.js
4. Add revenue chart (Chart.js line chart)
5. Add recent activity feed (last 10 actions)
6. Add quick action buttons (new invoice, task, contact)
7. Add upcoming events widget (next 5 events)
8. Add pending tasks widget (tasks due this week)
9. Style all widgets with cosmic cards
10. Implement real-time data loading

**Acceptance Criteria:**
- [ ] All stats display correct counts
- [ ] Chart renders revenue data
- [ ] Activity feed shows recent changes
- [ ] Quick actions open create modals
- [ ] Widgets update when data changes
- [ ] Page loads in <1 second

**Hook:** Update progress: "Dashboard complete - ${widgetCount} widgets active"

---

## PHASE 4: CRM MODULE
**Parallel Execution: Agent 8-10**

### TASK 4.1: Build Contacts Management
**Agent:** Contacts-Agent
**Dependencies:** db.js, datatable.js, forms
**Output:** `/organized/crm/contacts.html` + `/organized/js/contacts.js`

**Steps:**
1. Create contacts.html with list view
2. Implement contacts datatable
3. Add create contact modal
4. Add edit contact modal
5. Add contact detail view
6. Implement tag filtering
7. Add search functionality
8. Add bulk delete
9. Implement contact notes/timeline
10. Add export contacts to CSV

**Acceptance Criteria:**
- [ ] Can create/edit/delete contacts
- [ ] Search finds contacts by name/email/company
- [ ] Tags filter contacts correctly
- [ ] Detail view shows all contact data
- [ ] Notes save to contact timeline

**Hook:** Update progress: "Contacts module complete - ${contactCount} test contacts"

---

### TASK 4.2: Build Leads Pipeline
**Agent:** Leads-Agent
**Dependencies:** db.js, forms
**Output:** `/organized/crm/leads.html` + `/organized/js/leads.js`

**Steps:**
1. Create leads.html with pipeline view
2. Implement stage columns (new, contacted, qualified, proposal, negotiation)
3. Add drag-and-drop between stages (Sortable.js)
4. Add create lead form
5. Add lead detail view
6. Implement "convert to contact" function
7. Add lead source tracking
8. Calculate conversion rates
9. Style pipeline with cosmic cards
10. Add lead value totals per stage

**Acceptance Criteria:**
- [ ] Pipeline displays leads in stages
- [ ] Drag-drop updates lead stage
- [ ] Convert creates contact and links deal
- [ ] Conversion metrics calculate correctly
- [ ] Lead values sum per stage

**Hook:** Update progress: "Leads pipeline complete - ${stageCount} stages configured"

---

### TASK 4.3: Build Deals Tracking
**Agent:** Deals-Agent
**Dependencies:** db.js, contacts.js
**Output:** `/organized/crm/deals.html` + `/organized/js/deals.js`

**Steps:**
1. Create deals.html with pipeline view
2. Implement deal stages (prospecting, negotiation, won, lost)
3. Add create deal form
4. Link deals to contacts and projects
5. Add probability weighting
6. Calculate weighted pipeline value
7. Add deal timeline/history
8. Implement win/loss tracking
9. Style with cosmic cards
10. Add filters (by status, contact, date range)

**Acceptance Criteria:**
- [ ] Deals display in pipeline stages
- [ ] Can associate deal with contact/project
- [ ] Weighted value calculates correctly
- [ ] Win/loss metrics track accurately
- [ ] Filters work on all criteria

**Hook:** Update progress: "Deals module complete - ${dealCount} test deals"

---

## PHASE 5: PROJECT MANAGEMENT MODULE
**Parallel Execution: Agent 11-13**

### TASK 5.1: Build Projects List & Detail
**Agent:** Projects-Agent
**Dependencies:** db.js, contacts.js
**Output:** `/organized/projects/list.html` + `/organized/projects/detail.html`

**Steps:**
1. Create projects list view
2. Add create project form
3. Build project detail page
4. Add project status tracking
5. Implement budget vs. actual tracking
6. Link projects to clients
7. Add project timeline visualization
8. Calculate project completion percentage
9. Add project archive function
10. Style with cosmic cards and progress bars

**Acceptance Criteria:**
- [ ] Projects list shows all projects
- [ ] Detail page shows full project info
- [ ] Status updates correctly
- [ ] Budget tracking calculates accurately
- [ ] Completion % based on tasks

**Hook:** Update progress: "Projects module complete - ${projectCount} test projects"

---

### TASK 5.2: Build Task Management & Kanban
**Agent:** Tasks-Agent
**Dependencies:** db.js, projects.js, Sortable.js
**Output:** `/organized/projects/tasks.html` + `/organized/projects/kanban.html`

**Steps:**
1. Create tasks list view
2. Build Kanban board view (todo, in_progress, review, done)
3. Add create task form with project selection
4. Implement drag-and-drop on Kanban
5. Add priority and due date
6. Add task filtering (by project, status, priority)
7. Implement task completion tracking
8. Add sub-tasks functionality
9. Style Kanban with cosmic cards
10. Add task assignment (future: just track yourself)

**Acceptance Criteria:**
- [ ] Tasks list shows all tasks
- [ ] Kanban board displays tasks in columns
- [ ] Drag-drop updates task status
- [ ] Filters work on all criteria
- [ ] Task completion updates project progress

**Hook:** Update progress: "Tasks & Kanban complete - ${taskCount} test tasks"

---

### TASK 5.3: Build Time Tracking
**Agent:** Time-Agent
**Dependencies:** db.js, tasks.js
**Output:** `/organized/projects/time.html` + `/organized/js/timer.js`

**Steps:**
1. Create time tracking page
2. Build start/stop timer UI
3. Implement timer localStorage persistence
4. Add manual time entry form
5. Build time entries list
6. Add time reports (by project, by date range)
7. Calculate total billable hours
8. Add export timesheet to CSV
9. Style timer with cosmic design
10. Add running timer indicator in navigation

**Acceptance Criteria:**
- [ ] Timer starts/stops correctly
- [ ] Timer persists across page reloads
- [ ] Manual entries save correctly
- [ ] Reports calculate total hours
- [ ] Export produces valid CSV

**Hook:** Update progress: "Time tracking complete - ${entryCount} test entries"

---

## PHASE 6: BILLING & FINANCE MODULE
**Parallel Execution: Agent 14-16**

### TASK 6.1: Build Invoice Management
**Agent:** Invoices-Agent
**Dependencies:** db.js, contacts.js, projects.js
**Output:** `/organized/finance/invoices.html` + `/organized/finance/invoice-detail.html`

**Steps:**
1. Create invoices list view
2. Build invoice builder/editor
3. Add line items (add/remove/calculate)
4. Implement tax and discount calculations
5. Add payment status tracking
6. Generate invoice PDF (html2pdf.js)
7. Add invoice templates
8. Implement invoice numbering
9. Add payment recording
10. Style invoice with professional layout

**Acceptance Criteria:**
- [ ] Can create/edit invoices
- [ ] Line items calculate correctly
- [ ] Tax applies accurately
- [ ] PDF generation works
- [ ] Payment status updates correctly

**Hook:** Update progress: "Invoices module complete - ${invoiceCount} test invoices"

---

### TASK 6.2: Build Expense Tracking
**Agent:** Expenses-Agent
**Dependencies:** db.js, projects.js
**Output:** `/organized/finance/expenses.html` + expense forms

**Steps:**
1. Create expenses list view
2. Add create expense form
3. Implement expense categories
4. Add receipt upload (base64)
5. Link expenses to projects
6. Add billable/non-billable flag
7. Build expense reports
8. Calculate tax-deductible totals
9. Add expense filters
10. Export expenses to CSV

**Acceptance Criteria:**
- [ ] Expenses save correctly
- [ ] Receipt images store as base64
- [ ] Categories filter expenses
- [ ] Reports calculate totals
- [ ] Export produces valid CSV

**Hook:** Update progress: "Expenses module complete - ${expenseCount} test expenses"

---

### TASK 6.3: Build Financial Reports
**Agent:** Reports-Agent
**Dependencies:** db.js, Chart.js
**Output:** `/organized/finance/reports.html` + report generators

**Steps:**
1. Create reports page
2. Build revenue report (monthly/yearly)
3. Add profit & loss statement
4. Build outstanding invoices report
5. Add expense breakdown chart
6. Implement date range filtering
7. Add report export to PDF
8. Build tax summary report
9. Style reports with cosmic design
10. Add print-friendly CSS

**Acceptance Criteria:**
- [ ] Revenue report shows accurate data
- [ ] P&L calculates correctly
- [ ] Charts render data visually
- [ ] Date filters work correctly
- [ ] PDF export looks professional

**Hook:** Update progress: "Financial reports complete - ${reportCount} reports available"

---

## PHASE 7: CALENDAR & SCHEDULING
**Single Agent: Agent 17**

### TASK 7.1: Build Calendar & Appointments
**Agent:** Calendar-Agent
**Dependencies:** db.js, FullCalendar.js, contacts.js
**Output:** `/organized/calendar.html` + calendar configuration

**Steps:**
1. Create calendar.html page
2. Integrate FullCalendar library
3. Configure day/week/month views
4. Add create event modal
5. Add create appointment modal
6. Implement event types and colors
7. Link appointments to contacts
8. Add event reminders (browser notifications)
9. Style calendar with cosmic theme
10. Add event search and filters

**Acceptance Criteria:**
- [ ] Calendar displays all events
- [ ] Can switch between views
- [ ] Events create and save correctly
- [ ] Appointments link to contacts
- [ ] Reminders show notifications

**Hook:** Update progress: "Calendar complete - ${eventCount} test events"

---

## PHASE 8: DOCUMENTS & SETTINGS
**Parallel Execution: Agent 18-19**

### TASK 8.1: Build Document Manager
**Agent:** Docs-Agent
**Dependencies:** db.js
**Output:** `/organized/documents.html` + file management

**Steps:**
1. Create documents list view
2. Add file upload (base64 encoding)
3. Implement document categories
4. Add document search
5. Link documents to projects/contacts
6. Add document preview
7. Implement download function
8. Add document deletion
9. Style with cosmic file cards
10. Add storage usage indicator

**Acceptance Criteria:**
- [ ] Files upload and encode to base64
- [ ] Categories organize documents
- [ ] Search finds documents by name
- [ ] Links to entities work correctly
- [ ] Download reconstructs files correctly

**Hook:** Update progress: "Documents module complete - ${docCount} test docs"

---

### TASK 8.2: Build Settings & Preferences
**Agent:** Settings-Agent
**Dependencies:** db.js, utils.js
**Output:** `/organized/settings.html` + settings logic

**Steps:**
1. Create settings page with tabs
2. Build profile settings section
3. Add preferences (theme, currency, date format)
4. Build categories management
5. Implement data export function
6. Add data import function
7. Add clear all data function (with confirmation)
8. Add storage usage display
9. Style with cosmic forms
10. Add settings auto-save

**Acceptance Criteria:**
- [ ] Profile updates save correctly
- [ ] Theme changes apply immediately
- [ ] Categories CRUD works
- [ ] Export downloads complete JSON
- [ ] Import restores all data
- [ ] Clear data requires double confirmation

**Hook:** Update progress: "Settings complete - ${settingCount} settings available"

---

## PHASE 9: POLISH & INTEGRATION
**Single Agent: Agent 20**

### TASK 9.1: Global Search & Final Integration
**Agent:** Integration-Agent
**Dependencies:** All previous modules
**Output:** Global search + bug fixes + optimization

**Steps:**
1. Implement global search across all modules
2. Add search keyboard shortcut (Cmd/Ctrl+K)
3. Fix any cross-module bugs
4. Optimize localStorage queries
5. Add loading states to all pages
6. Test all CRUD operations
7. Test data relationships (contacts → projects → invoices)
8. Add comprehensive error handling
9. Test with 10,000+ records
10. Create user documentation

**Acceptance Criteria:**
- [ ] Global search finds data across all modules
- [ ] No console errors on any page
- [ ] All pages load in <1 second
- [ ] Data relationships work correctly
- [ ] App handles localStorage limits gracefully

**Hook:** Update progress: "Integration complete - ${testsPassed}/${totalTests} tests passed"

---

## ORCHESTRATION STRATEGY

### Parallel Execution Plan

**Wave 1 (Foundation):** Agents 1-3 (parallel)
- Data layer, Utils, Navigation

**Wave 2 (Components):** Agents 4-6 (parallel)
- Modals, Tables, Forms

**Wave 3 (Dashboard):** Agent 7 (solo)
- Requires foundation + components

**Wave 4 (CRM):** Agents 8-10 (parallel)
- Contacts, Leads, Deals

**Wave 5 (Projects):** Agents 11-13 (parallel)
- Projects, Tasks, Time Tracking

**Wave 6 (Finance):** Agents 14-16 (parallel)
- Invoices, Expenses, Reports

**Wave 7 (Calendar):** Agent 17 (solo)
- Calendar & Appointments

**Wave 8 (Final):** Agents 18-19 (parallel)
- Documents, Settings

**Wave 9 (Polish):** Agent 20 (solo)
- Global search, testing, optimization

---

## PROGRESS TRACKING

Each agent will update completion status using TodoWrite tool:

```javascript
// After each task completion
TodoWrite({
  taskId: "TASK-X.X",
  status: "completed",
  output: "filepath or summary",
  testsStatus: "X/Y tests passed",
  filesCreated: ["file1.js", "file2.html"],
  linesOfCode: 1234
});
```

---

## ESTIMATED TIMELINE

- **Wave 1-2:** 3-4 hours (foundation)
- **Wave 3:** 2 hours (dashboard)
- **Wave 4:** 4-5 hours (CRM)
- **Wave 5:** 4-5 hours (projects)
- **Wave 6:** 4-5 hours (finance)
- **Wave 7:** 2-3 hours (calendar)
- **Wave 8:** 2-3 hours (docs/settings)
- **Wave 9:** 2-3 hours (polish)

**Total:** ~24-30 hours of agent execution

---

**Ready to deploy sub-agent teams and begin autonomous build! 🚀**
