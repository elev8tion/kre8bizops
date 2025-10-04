// PASTE THIS ENTIRE SCRIPT INTO YOUR BROWSER CONSOLE (F12 or Cmd+Option+I)
// Then press Enter to execute

console.log('🔄 Clearing all ELEV8TION data...');

// Clear all existing ELEV8TION data
Object.keys(localStorage).forEach(key => {
    if (key.startsWith('elev8tion_')) {
        localStorage.removeItem(key);
        console.log('  Removed:', key);
    }
});

console.log('✓ All data cleared\n');
console.log('📝 Inserting mock data...\n');

// Helper functions
function generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}

function formatDate(daysOffset = 0) {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    return date.toISOString().split('T')[0];
}

// 1. CONTACTS
const contacts = [
    {
        id: generateId(),
        name: 'Sarah Johnson',
        email: 'sarah.johnson@techcorp.com',
        phone: '(555) 123-4567',
        company: 'TechCorp Solutions',
        position: 'CEO',
        type: 'client',
        status: 'active',
        tags: ['VIP', 'High Value'],
        notes: 'Key decision maker for enterprise deals.',
        address: '123 Tech Street, San Francisco, CA 94105',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: generateId(),
        name: 'Michael Chen',
        email: 'mchen@innovate.io',
        phone: '(555) 234-5678',
        company: 'Innovate.io',
        position: 'CTO',
        type: 'lead',
        status: 'active',
        tags: ['Hot Lead', 'Follow-up'],
        notes: 'Interested in premium package.',
        address: '456 Innovation Ave, Austin, TX 78701',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: generateId(),
        name: 'Emily Rodriguez',
        email: 'emily.r@designstudio.com',
        phone: '(555) 345-6789',
        company: 'Creative Design Studio',
        position: 'Creative Director',
        type: 'client',
        status: 'active',
        tags: ['VIP'],
        notes: 'Long-term client.',
        address: '789 Design Blvd, New York, NY 10001',
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: generateId(),
        name: 'David Thompson',
        email: 'dthompson@startup.co',
        phone: '(555) 456-7890',
        company: 'Startup Ventures Co',
        position: 'Founder',
        type: 'lead',
        status: 'active',
        tags: ['Hot Lead', 'Urgent'],
        notes: 'Fast-growing startup.',
        address: '321 Venture Lane, Seattle, WA 98101',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: generateId(),
        name: 'Lisa Anderson',
        email: 'l.anderson@global-corp.com',
        phone: '(555) 567-8901',
        company: 'Global Corp International',
        position: 'VP Operations',
        type: 'client',
        status: 'active',
        tags: ['High Value'],
        notes: 'Potential for expansion.',
        address: '654 Global Plaza, Chicago, IL 60601',
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
    }
];

localStorage.setItem('elev8tion_contacts', JSON.stringify(contacts));
console.log('✓ Created 5 contacts');

// 2. PROJECTS
const projects = [
    {
        id: generateId(),
        name: 'Website Redesign - TechCorp',
        description: 'Complete overhaul of corporate website',
        client: 'TechCorp Solutions',
        status: 'active',
        startDate: '2025-09-01',
        endDate: '2025-11-30',
        budget: 45000,
        tags: ['Development', 'High Value'],
        progress: 65,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: generateId(),
        name: 'Mobile App Development - Innovate',
        description: 'iOS and Android app',
        client: 'Innovate.io',
        status: 'planning',
        startDate: '2025-10-15',
        endDate: '2026-03-15',
        budget: 120000,
        tags: ['Development', 'VIP'],
        progress: 15,
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: generateId(),
        name: 'Marketing Campaign Q4',
        description: 'Digital marketing campaign',
        client: 'Creative Design Studio',
        status: 'active',
        startDate: '2025-09-20',
        endDate: '2025-12-31',
        budget: 30000,
        tags: ['Marketing', 'Urgent'],
        progress: 45,
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: generateId(),
        name: 'CRM Integration - Startup Ventures',
        description: 'Custom CRM integration',
        client: 'Startup Ventures Co',
        status: 'on_hold',
        startDate: '2025-08-01',
        endDate: '2025-10-15',
        budget: 25000,
        tags: ['Development'],
        progress: 30,
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: generateId(),
        name: 'Brand Identity - Global Corp',
        description: 'Complete brand refresh',
        client: 'Global Corp International',
        status: 'completed',
        startDate: '2025-06-01',
        endDate: '2025-09-15',
        budget: 55000,
        tags: ['Marketing', 'High Value'],
        progress: 100,
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    }
];

localStorage.setItem('elev8tion_projects', JSON.stringify(projects));
console.log('✓ Created 5 projects');

// 3. TASKS
const tasks = [
    {
        id: generateId(),
        title: 'Design Homepage Mockup',
        description: 'Create initial design concepts',
        project: 'Website Redesign - TechCorp',
        assignedTo: 'Design Team',
        priority: 'high',
        status: 'in_progress',
        dueDate: formatDate(7),
        tags: ['Design', 'Urgent'],
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: generateId(),
        title: 'Client Meeting Preparation',
        description: 'Prepare presentation slides',
        project: 'Mobile App Development - Innovate',
        assignedTo: 'Sales Team',
        priority: 'high',
        status: 'pending',
        dueDate: formatDate(-1), // OVERDUE
        tags: ['Sales', 'Urgent'],
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: generateId(),
        title: 'Social Media Content Calendar',
        description: 'Plan Q4 content calendar',
        project: 'Marketing Campaign Q4',
        assignedTo: 'Marketing Team',
        priority: 'medium',
        status: 'in_progress',
        dueDate: formatDate(0),
        tags: ['Marketing'],
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: generateId(),
        title: 'API Documentation',
        description: 'Complete technical documentation',
        project: 'CRM Integration - Startup Ventures',
        assignedTo: 'Dev Team',
        priority: 'low',
        status: 'pending',
        dueDate: formatDate(-7), // OVERDUE
        tags: ['Development'],
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: generateId(),
        title: 'Final Brand Guidelines',
        description: 'Deliver final brand guidelines',
        project: 'Brand Identity - Global Corp',
        assignedTo: 'Design Team',
        priority: 'medium',
        status: 'completed',
        dueDate: '2025-09-10',
        completedDate: '2025-09-10',
        tags: ['Marketing', 'High Value'],
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
    }
];

localStorage.setItem('elev8tion_tasks', JSON.stringify(tasks));
console.log('✓ Created 5 tasks (2 overdue)');

// 4. INVOICES
const invoices = [
    {
        id: generateId(),
        invoiceNumber: 'INV-2025-001',
        client: 'TechCorp Solutions',
        project: 'Website Redesign - TechCorp',
        issueDate: '2025-09-15',
        dueDate: '2025-10-15',
        status: 'sent',
        items: [
            { description: 'Design Phase - Homepage', quantity: 1, rate: 8000, amount: 8000 },
            { description: 'Development Phase - Initial Setup', quantity: 1, rate: 7000, amount: 7000 }
        ],
        subtotal: 15000,
        tax: 1200,
        total: 16200,
        notes: 'Payment terms: Net 30',
        createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: generateId(),
        invoiceNumber: 'INV-2025-002',
        client: 'Creative Design Studio',
        project: 'Marketing Campaign Q4',
        issueDate: '2025-09-01',
        dueDate: '2025-09-20',
        status: 'overdue',
        items: [
            { description: 'Social Media Management', quantity: 1, rate: 5000, amount: 5000 },
            { description: 'Content Creation', quantity: 20, rate: 150, amount: 3000 }
        ],
        subtotal: 8000,
        tax: 640,
        total: 8640,
        notes: 'Follow-up needed',
        createdAt: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: generateId(),
        invoiceNumber: 'INV-2025-003',
        client: 'Global Corp International',
        project: 'Brand Identity - Global Corp',
        issueDate: '2025-09-10',
        dueDate: '2025-09-25',
        status: 'paid',
        paidDate: '2025-09-22',
        items: [
            { description: 'Brand Strategy & Research', quantity: 1, rate: 12000, amount: 12000 },
            { description: 'Logo Design & Variations', quantity: 1, rate: 8000, amount: 8000 },
            { description: 'Brand Guidelines', quantity: 1, rate: 5000, amount: 5000 }
        ],
        subtotal: 25000,
        tax: 2000,
        total: 27000,
        notes: 'Paid via wire transfer',
        createdAt: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: generateId(),
        invoiceNumber: 'INV-2025-004',
        client: 'Innovate.io',
        project: 'Mobile App Development - Innovate',
        issueDate: '2025-09-25',
        dueDate: '2025-10-25',
        status: 'draft',
        items: [
            { description: 'Project Planning & Discovery', quantity: 1, rate: 15000, amount: 15000 }
        ],
        subtotal: 15000,
        tax: 1200,
        total: 16200,
        notes: 'Draft - pending approval',
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: generateId(),
        invoiceNumber: 'INV-2025-005',
        client: 'Startup Ventures Co',
        project: 'CRM Integration - Startup Ventures',
        issueDate: '2025-08-20',
        dueDate: '2025-09-20',
        status: 'overdue',
        items: [
            { description: 'CRM Setup & Configuration', quantity: 1, rate: 6000, amount: 6000 },
            { description: 'Data Migration', quantity: 1, rate: 4000, amount: 4000 }
        ],
        subtotal: 10000,
        tax: 800,
        total: 10800,
        notes: 'Multiple follow-up attempts made',
        createdAt: new Date(Date.now() - 44 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
    }
];

localStorage.setItem('elev8tion_invoices', JSON.stringify(invoices));
console.log('✓ Created 5 invoices (2 overdue)');

// 5. DEALS
const deals = [
    {
        id: generateId(),
        title: 'Enterprise Package - TechCorp',
        company: 'TechCorp Solutions',
        contact: 'Sarah Johnson',
        value: 150000,
        stage: 'proposal',
        probability: 75,
        expectedCloseDate: '2025-11-15',
        description: 'Annual enterprise package',
        tags: ['VIP', 'High Value'],
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: generateId(),
        title: 'Mobile App Suite - Innovate',
        company: 'Innovate.io',
        contact: 'Michael Chen',
        value: 120000,
        stage: 'qualification',
        probability: 60,
        expectedCloseDate: '2025-10-30',
        description: 'Full mobile app development',
        tags: ['Hot Lead', 'Development'],
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: generateId(),
        title: 'Marketing Retainer - Creative Studio',
        company: 'Creative Design Studio',
        contact: 'Emily Rodriguez',
        value: 36000,
        stage: 'negotiation',
        probability: 85,
        expectedCloseDate: '2025-10-05',
        description: 'Annual marketing retainer',
        tags: ['Marketing', 'VIP'],
        createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: generateId(),
        title: 'Consulting Services - Startup Ventures',
        company: 'Startup Ventures Co',
        contact: 'David Thompson',
        value: 50000,
        stage: 'discovery',
        probability: 40,
        expectedCloseDate: '2025-12-01',
        description: 'Strategic consulting',
        tags: ['Hot Lead'],
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: generateId(),
        title: 'Brand Extension - Global Corp',
        company: 'Global Corp International',
        contact: 'Lisa Anderson',
        value: 85000,
        stage: 'closed_won',
        probability: 100,
        closeDate: '2025-09-20',
        description: 'Brand extension for new product line',
        tags: ['High Value', 'Marketing'],
        createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString()
    }
];

localStorage.setItem('elev8tion_deals', JSON.stringify(deals));
console.log('✓ Created 5 deals');

// 6. EXPENSES
const expenses = [
    {
        id: generateId(),
        description: 'Adobe Creative Cloud Subscription',
        amount: 599.88,
        category: 'Software',
        date: '2025-09-01',
        vendor: 'Adobe Inc.',
        paymentMethod: 'Credit Card',
        billable: false,
        status: 'paid',
        tags: ['Recurring', 'Design'],
        createdAt: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: generateId(),
        description: 'Client Dinner - TechCorp Meeting',
        amount: 287.50,
        category: 'Meals & Entertainment',
        date: '2025-09-15',
        vendor: 'The Capital Grille',
        paymentMethod: 'Company Card',
        billable: true,
        project: 'Website Redesign - TechCorp',
        status: 'paid',
        tags: ['Client Meeting'],
        createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: generateId(),
        description: 'Stock Photos & Assets',
        amount: 450.00,
        category: 'Marketing',
        date: '2025-09-20',
        vendor: 'Shutterstock',
        paymentMethod: 'Credit Card',
        billable: true,
        project: 'Marketing Campaign Q4',
        status: 'paid',
        tags: ['Marketing', 'Design'],
        createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: generateId(),
        description: 'Cloud Hosting Services - AWS',
        amount: 1247.32,
        category: 'Infrastructure',
        date: '2025-09-25',
        vendor: 'Amazon Web Services',
        paymentMethod: 'ACH',
        billable: false,
        status: 'paid',
        tags: ['Recurring', 'Development'],
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: generateId(),
        description: 'Conference Registration - WebSummit',
        amount: 1899.00,
        category: 'Professional Development',
        date: '2025-09-28',
        vendor: 'WebSummit',
        paymentMethod: 'Credit Card',
        billable: false,
        status: 'pending',
        tags: ['Training'],
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    }
];

localStorage.setItem('elev8tion_expenses', JSON.stringify(expenses));
console.log('✓ Created 5 expenses');

// 7. ACTIVITIES
const activities = [
    {
        id: generateId(),
        type: 'contact',
        action: 'created',
        description: 'Created contact: Sarah Johnson',
        timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: generateId(),
        type: 'project',
        action: 'created',
        description: 'Created project: Website Redesign - TechCorp',
        timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: generateId(),
        type: 'invoice',
        action: 'paid',
        description: 'Invoice INV-2025-003 marked as paid',
        timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: generateId(),
        type: 'task',
        action: 'completed',
        description: 'Completed task: Final Brand Guidelines',
        timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: generateId(),
        type: 'deal',
        action: 'won',
        description: 'Deal won: Brand Extension - Global Corp ($85,000)',
        timestamp: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString()
    }
];

localStorage.setItem('elev8tion_activities', JSON.stringify(activities));
console.log('✓ Created activity entries');

// 8. SETTINGS
const settings = {
    businessName: 'ELEV8TION Agency',
    businessEmail: 'contact@elev8tion.agency',
    businessPhone: '(555) 000-0000',
    businessAddress: '100 Business Blvd, Suite 200, San Francisco, CA 94105',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timezone: 'America/Los_Angeles',
    taxRate: 8,
    invoicePrefix: 'INV-',
    theme: 'light'
};

localStorage.setItem('elev8tion_settings', JSON.stringify(settings));
console.log('✓ Updated settings');

localStorage.setItem('elev8tion_mock_data_inserted', 'true');

console.log('\n🎉 DONE! Mock data inserted successfully!');
console.log('📊 Summary:');
console.log('   - 5 Contacts');
console.log('   - 5 Projects');
console.log('   - 5 Tasks (2 overdue)');
console.log('   - 5 Invoices (2 overdue)');
console.log('   - 5 Deals');
console.log('   - 5 Expenses');
console.log('   - 5 Activity entries');
console.log('\n🔄 Now reload the page (Cmd+R or F5) to see the data!');
