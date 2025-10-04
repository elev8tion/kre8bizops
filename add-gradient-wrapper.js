#!/usr/bin/env node

/**
 * Add gradient-button-wrapper.js to all HTML files
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const scriptsToAddAfter = [
    'enhancements.js',
    'validation.js'
];

const scriptToAdd = 'gradient-button-wrapper.js';

// Find all HTML files
const htmlFiles = glob.sync('**/*.html', {
    cwd: __dirname,
    ignore: ['**/components/**', '**/*.bak.html', '**/node_modules/**']
});

console.log(`Found ${htmlFiles.length} HTML files to process\n`);

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Skip if already has gradient-button-wrapper
    if (content.includes('gradient-button-wrapper.js')) {
        console.log(`⏭️  Skipped (already has wrapper): ${file}`);
        return;
    }

    // Check if file has btn-primary buttons
    if (!content.includes('btn-primary')) {
        console.log(`⏭️  Skipped (no btn-primary): ${file}`);
        return;
    }

    let updated = false;

    // Try to add after enhancements.js or validation.js
    for (const scriptName of scriptsToAddAfter) {
        const regex = new RegExp(`(<script src="[^"]*${scriptName}"><\\/script>)`, 'g');

        if (content.match(regex)) {
            // Determine the correct relative path
            const depth = file.split('/').length - 1;
            const prefix = depth > 0 ? '../'.repeat(depth) : './';
            const scriptTag = `\n    <!-- Gradient Button Wrapper -->\n    <script src="${prefix}js/${scriptToAdd}"></script>`;

            content = content.replace(regex, `$1${scriptTag}`);
            updated = true;
            break;
        }
    }

    if (updated) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated: ${file}`);
    } else {
        console.log(`⚠️  Could not update (no anchor found): ${file}`);
    }
});

console.log('\n✨ Done!');
