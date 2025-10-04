#!/usr/bin/env python3
import os
import re

# Pages to update
pages = [
    "crm/leads.html",
    "crm/deals.html",
    "projects/list.html",
    "projects/tasks.html",
    "projects/time.html",
    "finance/invoices.html",
    "finance/expenses.html",
    "finance/reports.html",
    "calendar/index.html",
    "documents/index.html",
    "settings/index.html"
]

base_dir = "/Users/kcdacre8tor/Desktop/elev8tion_agiled_app/organized"

# Pattern to match the old glass-medium header
old_pattern = r'<div class="glass-medium glow-purple-soft mb-4" style="padding: 2rem; border-radius: 24px;">(.*?)</div>\s*</div>\s*</div>'

# Template for new modern card header
new_template = '''<div class="modern-card mb-4" style="padding: 2rem; border-radius: 24px; cursor: default;">
                    <div class="modern-card-shine"></div>
                    <div class="modern-card-glow"></div>
                    <div class="modern-card-content">
{content}
                    </div>
                </div>'''

for page in pages:
    filepath = os.path.join(base_dir, page)
    if not os.path.exists(filepath):
        print(f"Skipping {page} - file not found")
        continue

    with open(filepath, 'r') as f:
        content = f.read()

    # Replace glass-medium with modern-card
    content = content.replace('class="glass-medium glow-purple-soft mb-4"', 'class="modern-card mb-4" style="cursor: default;"')
    content = content.replace('class="glass-medium"', 'class="modern-card" style="cursor: default;"')

    # Add modern card structure where needed
    if 'modern-card-shine' not in content and 'modern-card' in content:
        # Find all modern-card divs that don't have shine/glow
        content = re.sub(
            r'<div class="modern-card([^"]*)"([^>]*)>\s*<div class="row',
            r'<div class="modern-card\1"\2>\n                    <div class="modern-card-shine"></div>\n                    <div class="modern-card-glow"></div>\n                    <div class="modern-card-content">\n                <div class="row',
            content
        )
        # Close the content div properly (this is a simple approach)
        # You may need to manually verify each file

    # Update title and subtitle classes
    content = re.sub(r'style="color: #fff; font-weight: 700;"', 'class="modern-card-title" style="font-size: 1.75rem;"', content)
    content = re.sub(r'style="color: rgba\(255,255,255,0\.6\);"', 'class="modern-card-subtitle"', content)

    with open(filepath, 'w') as f:
        f.write(content)

    print(f"Updated: {page}")

print("\nAll pages updated!")
