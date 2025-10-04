# ELEV8TION BUSINESS HUB - MANUAL TEST PLAN

**Version:** 1.0
**Date:** October 3, 2025
**Tester:** ___________________
**Browser:** ___________________
**OS:** ___________________

---

## PREPARATION

### Before You Begin

1. **Start Local Server**
   ```bash
   cd /Users/kcdacre8tor/Desktop/elev8tion_agiled_app/organized
   ./start-server.sh
   ```

2. **Clear Browser Data** (for fresh test)
   - Open DevTools (F12)
   - Go to Application → Local Storage
   - Delete all ELEV8TION data
   - Refresh page

3. **Open Test URL**
   ```
   http://localhost:8080/index-local.html
   ```

---

## TEST SECTION 1: LOGIN & AUTHENTICATION

### Test 1.1: Successful Login

**Steps:**
1. [ ] Open `http://localhost:8080/index-local.html`
2. [ ] Enter email: `test@example.com`
3. [ ] Enter password: `password123`
4. [ ] Click "Sign In" button

**Expected Results:**
- [ ] ✅ Redirect to dashboard.html
- [ ] ✅ Sidebar appears on left side
- [ ] ✅ Dashboard content loads
- [ ] ✅ No console errors

**Status:** ⬜ Pass ⬜ Fail

**Notes:**
_______________________________________________

---

### Test 1.2: Login Validation

**Steps:**
1. [ ] Open login page
2. [ ] Leave email blank
3. [ ] Enter password: `test`
4. [ ] Click "Sign In"

**Expected Results:**
- [ ] ✅ Email validation error shown
- [ ] ✅ Password minimum length error shown
- [ ] ✅ Form does not submit

**Status:** ⬜ Pass ⬜ Fail

**Notes:**
_______________________________________________

---

## TEST SECTION 2: NAVIGATION

### Test 2.1: Dashboard Navigation

**Steps:**
1. [ ] From dashboard, click "Contacts" in sidebar
2. [ ] Verify contacts page loads
3. [ ] Click "Dashboard" in sidebar
4. [ ] Verify return to dashboard

**Expected Results:**
- [ ] ✅ Contacts page loads correctly
- [ ] ✅ Contacts link highlighted in sidebar
- [ ] ✅ Dashboard reloads correctly
- [ ] ✅ Dashboard link highlighted in sidebar
- [ ] ✅ Sidebar stays consistent

**Status:** ⬜ Pass ⬜ Fail

---

### Test 2.2: All Pages Navigation

**Test each page link:**

| Page Link | URL Loads | Sidebar Active | CSS OK | JS OK | Status |
|-----------|-----------|----------------|--------|-------|--------|
| Dashboard | [ ] | [ ] | [ ] | [ ] | ⬜ |
| Contacts | [ ] | [ ] | [ ] | [ ] | ⬜ |
| Leads | [ ] | [ ] | [ ] | [ ] | ⬜ |
| Deals | [ ] | [ ] | [ ] | [ ] | ⬜ |
| Projects | [ ] | [ ] | [ ] | [ ] | ⬜ |
| Tasks | [ ] | [ ] | [ ] | [ ] | ⬜ |
| Time Tracking | [ ] | [ ] | [ ] | [ ] | ⬜ |
| Invoices | [ ] | [ ] | [ ] | [ ] | ⬜ |
| Expenses | [ ] | [ ] | [ ] | [ ] | ⬜ |
| Reports | [ ] | [ ] | [ ] | [ ] | ⬜ |
| Calendar | [ ] | [ ] | [ ] | [ ] | ⬜ |
| Documents | [ ] | [ ] | [ ] | [ ] | ⬜ |
| Settings | [ ] | [ ] | [ ] | [ ] | ⬜ |

**Overall Status:** ⬜ Pass ⬜ Fail

---

## TEST SECTION 3: CONTACTS MODULE (CRUD)

### Test 3.1: Create Contact

**Steps:**
1. [ ] Navigate to CRM → Contacts
2. [ ] Click "Add Contact" button
3. [ ] Fill form:
   - Name: `Alice Johnson`
   - Email: `alice@techcorp.com`
   - Phone: `+1 555-0100`
   - Company: `TechCorp Industries`
   - Position: `Chief Technology Officer`
   - Tags: `VIP`, `Partner` (press Enter after each)
   - Notes: `Key decision maker for enterprise deals`
4. [ ] Click "Create Contact"

**Expected Results:**
- [ ] ✅ Modal closes smoothly
- [ ] ✅ Green toast notification: "Contact created successfully!"
- [ ] ✅ Table refreshes automatically
- [ ] ✅ Alice Johnson appears in contact list
- [ ] ✅ Contact shows correct company and tags
- [ ] ✅ No console errors

**Status:** ⬜ Pass ⬜ Fail

**Screenshot:** (if failed)

---

### Test 3.2: View Contact

**Steps:**
1. [ ] Click on "Alice Johnson" row in table
2. [ ] Review modal content

**Expected Results:**
- [ ] ✅ Modal opens with contact details
- [ ] ✅ Shows: Email, Phone, Company, Position
- [ ] ✅ Shows tags: VIP, Partner
- [ ] ✅ Shows activity summary (0 projects, 0 invoices, 0 deals)
- [ ] ✅ Shows notes field
- [ ] ✅ "Edit" and "Close" buttons present

**Status:** ⬜ Pass ⬜ Fail

---

### Test 3.3: Edit Contact

**Steps:**
1. [ ] Click "Edit" button in view modal (or edit icon)
2. [ ] Change phone to: `+1 555-0101`
3. [ ] Add tag: `Important`
4. [ ] Update notes: `Approved for Q1 2025 project`
5. [ ] Click "Update Contact"

**Expected Results:**
- [ ] ✅ Modal closes
- [ ] ✅ Toast: "Contact updated successfully!"
- [ ] ✅ Table shows updated phone number
- [ ] ✅ New tag appears
- [ ] ✅ Refresh page - changes persist

**Status:** ⬜ Pass ⬜ Fail

---

### Test 3.4: Search Contacts

**Steps:**
1. [ ] Create 3 more contacts (any names)
2. [ ] In search box, type: `Alice`
3. [ ] Verify search results

**Expected Results:**
- [ ] ✅ Table filters to show only Alice Johnson
- [ ] ✅ Other contacts hidden
- [ ] ✅ Clear search shows all contacts again

**Status:** ⬜ Pass ⬜ Fail

---

### Test 3.5: Sort Contacts

**Steps:**
1. [ ] Click "Name" column header
2. [ ] Verify contacts sorted A-Z
3. [ ] Click "Name" again
4. [ ] Verify contacts sorted Z-A

**Expected Results:**
- [ ] ✅ Ascending sort works
- [ ] ✅ Descending sort works
- [ ] ✅ Sort icon updates

**Status:** ⬜ Pass ⬜ Fail

---

### Test 3.6: Delete Contact

**Steps:**
1. [ ] Click trash icon for Alice Johnson
2. [ ] Read confirmation message
3. [ ] Click "Confirm"

**Expected Results:**
- [ ] ✅ Confirmation dialog shows
- [ ] ✅ Message: "Are you sure you want to delete Alice Johnson?"
- [ ] ✅ After confirm: Toast shows "Contact deleted successfully!"
- [ ] ✅ Alice removed from table
- [ ] ✅ Refresh page - deletion persists

**Status:** ⬜ Pass ⬜ Fail

---

## TEST SECTION 4: PROJECTS MODULE

### Test 4.1: Create Project

**Steps:**
1. [ ] Navigate to Projects → All Projects
2. [ ] Click "New Project"
3. [ ] Fill form:
   - Name: `Website Redesign 2025`
   - Description: `Complete overhaul of company website`
   - Client: (select a contact)
   - Status: `Active`
   - Start Date: (today's date)
   - End Date: (30 days from now)
   - Budget: `15000`
   - Color: `🟣 Purple`
4. [ ] Click "Create Project"

**Expected Results:**
- [ ] ✅ Project created
- [ ] ✅ Appears in project list
- [ ] ✅ Shows correct status badge
- [ ] ✅ Shows client name
- [ ] ✅ Budget formatted as currency

**Status:** ⬜ Pass ⬜ Fail

---

### Test 4.2: View Project Details

**Steps:**
1. [ ] Click on "Website Redesign 2025"
2. [ ] Review project modal

**Expected Results:**
- [ ] ✅ Modal shows full project details
- [ ] ✅ Client name displayed
- [ ] ✅ Dates formatted correctly
- [ ] ✅ Budget shown as $15,000.00
- [ ] ✅ Progress bar at 0% (no tasks yet)
- [ ] ✅ Tasks section shows "No tasks yet"

**Status:** ⬜ Pass ⬜ Fail

---

### Test 4.3: Project Statistics

**Steps:**
1. [ ] Create projects with different statuses:
   - 1 Planning
   - 2 Active
   - 1 On Hold
   - 1 Completed
2. [ ] Check stat cards at top of page

**Expected Results:**
- [ ] ✅ Planning: 1
- [ ] ✅ Active: 2
- [ ] ✅ On Hold: 1
- [ ] ✅ Completed: 1
- [ ] ✅ Stats update when projects created/deleted

**Status:** ⬜ Pass ⬜ Fail

---

## TEST SECTION 5: TASKS MODULE

### Test 5.1: Create Task

**Steps:**
1. [ ] Navigate to Projects → Tasks
2. [ ] Click "New Task"
3. [ ] Fill form:
   - Title: `Design Homepage Mockup`
   - Description: `Create high-fidelity mockup in Figma`
   - Project: `Website Redesign 2025`
   - Assigned To: (your name)
   - Priority: `High`
   - Due Date: (7 days from now)
   - Estimated Hours: `8`
4. [ ] Click "Create Task"

**Expected Results:**
- [ ] ✅ Task created successfully
- [ ] ✅ Appears in task list
- [ ] ✅ Shows project name
- [ ] ✅ Shows priority badge (High)
- [ ] ✅ Shows due date

**Status:** ⬜ Pass ⬜ Fail

---

### Test 5.2: Complete Task

**Steps:**
1. [ ] Find "Design Homepage Mockup" task
2. [ ] Click checkbox or "Mark Complete" button
3. [ ] Verify task status

**Expected Results:**
- [ ] ✅ Task marked as completed
- [ ] ✅ Visual indicator (strikethrough, checkmark, etc.)
- [ ] ✅ Task moves to "Completed" section if filtered
- [ ] ✅ Project progress updates

**Status:** ⬜ Pass ⬜ Fail

---

## TEST SECTION 6: INVOICES MODULE

### Test 6.1: Create Invoice

**Steps:**
1. [ ] Navigate to Finance → Invoices
2. [ ] Click "New Invoice"
3. [ ] Fill form:
   - Client: (select a contact)
   - Project: `Website Redesign 2025`
   - Invoice Date: (today)
   - Due Date: (30 days from now)
   - Line Items:
     - Description: `Design Services`, Quantity: `40`, Rate: `150`
     - Description: `Development`, Quantity: `60`, Rate: `125`
   - Tax Rate: `8.5`
   - Notes: `Payment due within 30 days`
4. [ ] Click "Create Invoice"

**Expected Results:**
- [ ] ✅ Invoice created
- [ ] ✅ Invoice number auto-generated (e.g., INV-1001)
- [ ] ✅ Subtotal calculated: $13,500
- [ ] ✅ Tax calculated: $1,147.50
- [ ] ✅ Total: $14,647.50
- [ ] ✅ Status: "Draft" or "Sent"

**Status:** ⬜ Pass ⬜ Fail

---

### Test 6.2: Invoice Status Changes

**Steps:**
1. [ ] Edit invoice
2. [ ] Change status to: "Sent"
3. [ ] Save
4. [ ] Edit again
5. [ ] Change status to: "Paid"
6. [ ] Enter paid date: (today)
7. [ ] Save

**Expected Results:**
- [ ] ✅ Status updates correctly
- [ ] ✅ Status badge color changes
- [ ] ✅ Paid invoices show paid date
- [ ] ✅ Dashboard stats update (unpaid invoices decreases)

**Status:** ⬜ Pass ⬜ Fail

---

## TEST SECTION 7: INTEGRATION TESTS

### Test 7.1: Complete Business Flow

**Create a complete customer journey:**

**Step 1: Create Contact**
- [ ] Create contact: "Bob Martinez"
- [ ] Email: bob@startup.com
- [ ] Company: "Startup Inc"

**Step 2: Create Deal**
- [ ] Navigate to CRM → Deals
- [ ] Create deal: "Startup Website Project"
- [ ] Link to: Bob Martinez
- [ ] Value: $20,000
- [ ] Stage: "Proposal"

**Step 3: Create Project**
- [ ] Navigate to Projects
- [ ] Create project: "Startup Inc Website"
- [ ] Link to client: Bob Martinez
- [ ] Budget: $20,000
- [ ] Status: Active

**Step 4: Create Tasks**
- [ ] Create 3 tasks linked to project:
   1. "Requirements Gathering"
   2. "Design Phase"
   3. "Development Phase"

**Step 5: Log Time**
- [ ] Navigate to Projects → Time Tracking
- [ ] Log 5 hours on "Requirements Gathering"
- [ ] Date: today

**Step 6: Create Invoice**
- [ ] Navigate to Finance → Invoices
- [ ] Create invoice for Bob Martinez
- [ ] Link to project
- [ ] Amount: $20,000
- [ ] Status: Sent

**Step 7: Verify Relationships**
- [ ] View Bob Martinez contact
- [ ] Should show:
   - 1 project
   - 1 invoice
   - 1 deal

**Expected Results:**
- [ ] ✅ All items created successfully
- [ ] ✅ Relationships maintained correctly
- [ ] ✅ Navigation between related items works
- [ ] ✅ No data loss or corruption

**Status:** ⬜ Pass ⬜ Fail

---

### Test 7.2: Data Persistence

**Steps:**
1. [ ] Create 5 contacts
2. [ ] Create 3 projects
3. [ ] Create 2 invoices
4. [ ] Close browser completely
5. [ ] Reopen browser
6. [ ] Navigate to app
7. [ ] Check all data

**Expected Results:**
- [ ] ✅ All contacts still present
- [ ] ✅ All projects still present
- [ ] ✅ All invoices still present
- [ ] ✅ Relationships intact
- [ ] ✅ No data corruption

**Status:** ⬜ Pass ⬜ Fail

---

### Test 7.3: Cross-Page Data Updates

**Steps:**
1. [ ] Create contact "Sarah Lee"
2. [ ] Create project linked to Sarah Lee
3. [ ] Go back to Contacts
4. [ ] View Sarah Lee
5. [ ] Should show 1 project

**Expected Results:**
- [ ] ✅ Project count updates automatically
- [ ] ✅ Data synced across pages
- [ ] ✅ No manual refresh needed

**Status:** ⬜ Pass ⬜ Fail

---

## TEST SECTION 8: EDGE CASES

### Test 8.1: Empty States

**Steps:**
1. [ ] Clear all localStorage
2. [ ] Navigate to each module
3. [ ] Verify empty state messages

**Expected Results:**
- [ ] ✅ Friendly message shown (not blank page)
- [ ] ✅ "Create" button prominently displayed
- [ ] ✅ No errors in console
- [ ] ✅ Example: "No contacts found. Click 'Add Contact' to create your first contact."

**Status:** ⬜ Pass ⬜ Fail

---

### Test 8.2: Special Characters

**Steps:**
1. [ ] Create contact with name: `O'Brien & Sons, Inc.`
2. [ ] Email: `test+tag@example.com`
3. [ ] Notes: `Testing: <script>alert('XSS')</script>`
4. [ ] Save and view

**Expected Results:**
- [ ] ✅ Name saved with apostrophe and ampersand
- [ ] ✅ Email with plus sign works
- [ ] ✅ Script tags NOT executed (escaped)
- [ ] ✅ All special characters display correctly

**Status:** ⬜ Pass ⬜ Fail

---

### Test 8.3: Large Data Set

**Steps:**
1. [ ] Open browser console
2. [ ] Run this script:
   ```javascript
   for (let i = 1; i <= 50; i++) {
     DB.create(DB.COLLECTIONS.CONTACTS, {
       name: `Test Contact ${i}`,
       email: `test${i}@example.com`,
       company: `Company ${i}`,
       phone: `555-01${String(i).padStart(2, '0')}`
     });
   }
   ```
3. [ ] Refresh contacts page
4. [ ] Test pagination, search, sort

**Expected Results:**
- [ ] ✅ All 50 contacts created
- [ ] ✅ Pagination shows multiple pages
- [ ] ✅ Search filters correctly
- [ ] ✅ Sorting works on all columns
- [ ] ✅ Page loads in < 2 seconds

**Status:** ⬜ Pass ⬜ Fail

---

### Test 8.4: Delete with Dependencies

**Steps:**
1. [ ] Create contact
2. [ ] Create project linked to contact
3. [ ] Create 3 tasks linked to project
4. [ ] Try to delete contact

**Expected Results:**
- [ ] ✅ Warning message shown
- [ ] ✅ "This contact has related items..."
- [ ] ✅ Option to proceed or cancel
- [ ] ✅ If proceed: contact deleted, project orphaned

**Status:** ⬜ Pass ⬜ Fail

---

## TEST SECTION 9: UI/UX TESTING

### Test 9.1: Modal Functionality

**Test all modal behaviors:**

| Test | Pass | Fail |
|------|------|------|
| Modal opens on button click | [ ] | [ ] |
| Modal closes on X button | [ ] | [ ] |
| Modal closes on ESC key | [ ] | [ ] |
| Modal closes on overlay click | [ ] | [ ] |
| Form validation shows errors | [ ] | [ ] |
| Required fields enforced | [ ] | [ ] |
| Modal animations smooth | [ ] | [ ] |
| Multiple modals can open | [ ] | [ ] |
| Data submits correctly | [ ] | [ ] |
| Cancel doesn't save data | [ ] | [ ] |

**Overall Status:** ⬜ Pass ⬜ Fail

---

### Test 9.2: Table Features

**Test all table behaviors:**

| Feature | Works | Status |
|---------|-------|--------|
| Column sorting (asc) | [ ] | ⬜ |
| Column sorting (desc) | [ ] | ⬜ |
| Search/filter | [ ] | ⬜ |
| Pagination controls | [ ] | ⬜ |
| Items per page | [ ] | ⬜ |
| Row click action | [ ] | ⬜ |
| Action buttons | [ ] | ⬜ |
| Empty state message | [ ] | ⬜ |
| Loading state | [ ] | ⬜ |
| Responsive on mobile | [ ] | ⬜ |

**Overall Status:** ⬜ Pass ⬜ Fail

---

### Test 9.3: Sidebar Behavior

**Steps:**
1. [ ] Click sidebar collapse button
2. [ ] Verify sidebar collapses (icons only)
3. [ ] Verify main content expands
4. [ ] Click expand button
5. [ ] Verify sidebar expands
6. [ ] Refresh page
7. [ ] Verify state persists

**Expected Results:**
- [ ] ✅ Collapse animation smooth
- [ ] ✅ Icons remain visible when collapsed
- [ ] ✅ Text hides when collapsed
- [ ] ✅ Main content adjusts width
- [ ] ✅ State saved in localStorage
- [ ] ✅ State persists after refresh

**Status:** ⬜ Pass ⬜ Fail

---

## TEST SECTION 10: BROWSER COMPATIBILITY

### Test on Multiple Browsers

**Test the complete flow on each browser:**

#### Chrome (Latest)
- [ ] Login works
- [ ] All pages load
- [ ] CRUD operations work
- [ ] Modals function correctly
- [ ] No console errors
- [ ] localStorage persists

**Status:** ⬜ Pass ⬜ Fail

#### Firefox (Latest)
- [ ] Login works
- [ ] All pages load
- [ ] CRUD operations work
- [ ] Modals function correctly
- [ ] No console errors
- [ ] localStorage persists

**Status:** ⬜ Pass ⬜ Fail

#### Safari (Latest)
- [ ] Login works
- [ ] All pages load
- [ ] CRUD operations work
- [ ] Modals function correctly
- [ ] No console errors
- [ ] localStorage persists

**Status:** ⬜ Pass ⬜ Fail

#### Edge (Latest)
- [ ] Login works
- [ ] All pages load
- [ ] CRUD operations work
- [ ] Modals function correctly
- [ ] No console errors
- [ ] localStorage persists

**Status:** ⬜ Pass ⬜ Fail

---

## TEST SECTION 11: RESPONSIVE DESIGN

### Test at Different Screen Sizes

#### Desktop (1920x1080)
- [ ] Sidebar fully visible
- [ ] Tables display correctly
- [ ] Modals centered
- [ ] No horizontal scroll

**Status:** ⬜ Pass ⬜ Fail

#### Laptop (1366x768)
- [ ] Layout adapts
- [ ] All elements visible
- [ ] Modals fit screen

**Status:** ⬜ Pass ⬜ Fail

#### Tablet (768x1024)
- [ ] Sidebar collapsible
- [ ] Tables scroll horizontally
- [ ] Forms usable

**Status:** ⬜ Pass ⬜ Fail

#### Mobile (375x667)
- [ ] Sidebar off-canvas
- [ ] Stacked layouts
- [ ] Touch-friendly buttons

**Status:** ⬜ Pass ⬜ Fail

---

## TEST SECTION 12: PERFORMANCE

### Test Performance Metrics

**Measure and record:**

| Metric | Target | Actual | Pass |
|--------|--------|--------|------|
| Page load time | < 1s | _____ | [ ] |
| Time to interactive | < 2s | _____ | [ ] |
| Modal open time | < 300ms | _____ | [ ] |
| Table render (100 rows) | < 500ms | _____ | [ ] |
| Search response | < 100ms | _____ | [ ] |
| localStorage read | < 5ms | _____ | [ ] |
| localStorage write | < 10ms | _____ | [ ] |

**Overall Performance:** ⬜ Pass ⬜ Fail

---

## TEST SECTION 13: SECURITY

### Basic Security Checks

**Test these scenarios:**

1. **XSS Prevention**
   - [ ] Try entering `<script>alert('XSS')</script>` in text fields
   - [ ] Expected: Script NOT executed, displayed as text

2. **SQL Injection** (N/A - no server)
   - [ ] N/A for localStorage version

3. **Authentication**
   - [ ] Try accessing `/dashboard.html` without login
   - [ ] Expected: Redirect to login page

4. **Data Validation**
   - [ ] Try entering invalid email formats
   - [ ] Try negative numbers in amount fields
   - [ ] Expected: Validation errors shown

**Status:** ⬜ Pass ⬜ Fail

---

## FINAL SUMMARY

### Test Execution Summary

**Total Tests Executed:** _____
**Tests Passed:** _____
**Tests Failed:** _____
**Success Rate:** _____%

### Critical Issues Found

1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

### Minor Issues Found

1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

### Recommendations

1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

### Overall Assessment

⬜ **APPROVED FOR PRODUCTION** - All tests passed, no critical issues
⬜ **APPROVED WITH MINOR FIXES** - Most tests passed, minor issues to address
⬜ **NEEDS MAJOR WORK** - Multiple critical issues found
⬜ **REJECTED** - System not functional

---

**Tester Signature:** _____________________
**Date:** _____________________
**Time Spent Testing:** _____ hours
