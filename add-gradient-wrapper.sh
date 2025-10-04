#!/bin/bash

# Add gradient-button-wrapper.js to all HTML files that have btn-primary

echo "Adding gradient-button-wrapper.js to HTML files..."
echo ""

# Find all HTML files (excluding backups and components)
find . -name "*.html" -not -path "*/components/*" -not -name "*bak*" -type f | while read file; do
    # Check if file already has the wrapper
    if grep -q "gradient-button-wrapper.js" "$file"; then
        echo "⏭️  Skipped (already has wrapper): $file"
        continue
    fi

    # Check if file has btn-primary
    if ! grep -q "btn-primary" "$file"; then
        echo "⏭️  Skipped (no btn-primary): $file"
        continue
    fi

    # Determine the relative path depth
    depth=$(echo "$file" | tr -cd '/' | wc -c)
    if [ "$depth" -gt 1 ]; then
        prefix="../"
        for ((i=2; i<depth; i++)); do
            prefix="${prefix}../"
        done
    else
        prefix=""
    fi

    # Try to add after validation.js
    if grep -q 'validation.js' "$file"; then
        # Use sed to add the script tag after validation.js
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS sed syntax
            sed -i '' "/validation.js/a\\
\\
    <!-- Gradient Button Wrapper -->\\
    <script src=\"${prefix}js/gradient-button-wrapper.js\"></script>
" "$file"
        else
            # Linux sed syntax
            sed -i "/validation.js/a\\    <!-- Gradient Button Wrapper -->\\n    <script src=\"${prefix}js/gradient-button-wrapper.js\"></script>" "$file"
        fi
        echo "✅ Updated: $file"
    elif grep -q 'enhancements.js' "$file"; then
        # Use sed to add the script tag after enhancements.js
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS sed syntax
            sed -i '' "/enhancements.js/a\\
\\
    <!-- Gradient Button Wrapper -->\\
    <script src=\"${prefix}js/gradient-button-wrapper.js\"></script>
" "$file"
        else
            # Linux sed syntax
            sed -i "/enhancements.js/a\\    <!-- Gradient Button Wrapper -->\\n    <script src=\"${prefix}js/gradient-button-wrapper.js\"></script>" "$file"
        fi
        echo "✅ Updated: $file"
    else
        echo "⚠️  Could not update (no anchor found): $file"
    fi
done

echo ""
echo "✨ Done!"
