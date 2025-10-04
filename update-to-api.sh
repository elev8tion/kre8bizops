#!/bin/bash

# Script to update all pages to use DataLayer instead of DB

echo "Updating all pages to use DataLayer API..."

# Array of files to update
files=(
    "crm/leads.html"
    "crm/deals.html"
    "projects/list.html"
    "projects/tasks.html"
    "projects/time.html"
    "finance/invoices.html"
    "finance/expenses.html"
)

for file in "${files[@]}"; do
    echo "Processing $file..."

    # Replace DB.getAll with DataLayer.getAll (with await)
    sed -i '' 's/DB\.getAll(DB\.COLLECTIONS\./await DataLayer.getAll(DataLayer.COLLECTIONS./g' "$file"

    # Replace DB.get with DataLayer.get (with await)
    sed -i '' 's/DB\.get(DB\.COLLECTIONS\./await DataLayer.get(DataLayer.COLLECTIONS./g' "$file"

    # Replace DB.create with DataLayer.save (with await)
    sed -i '' 's/DB\.create(DB\.COLLECTIONS\./await DataLayer.save(DataLayer.COLLECTIONS./g' "$file"

    # Replace DB.update with DataLayer.save (with await)
    sed -i '' 's/DB\.update(DB\.COLLECTIONS\./await DataLayer.save(DataLayer.COLLECTIONS./g' "$file"

    # Replace DB.delete with DataLayer.delete (with await)
    sed -i '' 's/DB\.delete(DB\.COLLECTIONS\./await DataLayer.delete(DataLayer.COLLECTIONS./g' "$file"

    echo "  ✓ $file updated"
done

echo ""
echo "All pages updated successfully!"
echo "Note: You may need to manually add 'async' to function declarations that use await"
