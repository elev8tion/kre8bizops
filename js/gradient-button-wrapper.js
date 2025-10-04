/**
 * GRADIENT BUTTON WRAPPER
 * Automatically wraps .btn-primary content with .btn-inner div
 * This ensures all existing buttons get the new gradient style
 */

(function() {
    'use strict';

    // Function to wrap button content
    function wrapButtonContent() {
        // Find all .btn-primary buttons
        const buttons = document.querySelectorAll('.btn-primary');

        buttons.forEach(button => {
            // Skip if already wrapped
            if (button.querySelector('.btn-inner')) {
                return;
            }

            // Get all child nodes
            const content = Array.from(button.childNodes);

            // Create the inner wrapper
            const btnInner = document.createElement('div');
            btnInner.className = 'btn-inner';

            // Move all content into the wrapper
            content.forEach(node => {
                btnInner.appendChild(node.cloneNode(true));
            });

            // Clear button and add wrapped content
            button.innerHTML = '';
            button.appendChild(btnInner);
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', wrapButtonContent);
    } else {
        wrapButtonContent();
    }

    // Also run when new content is added dynamically
    // Use MutationObserver to watch for new buttons
    const observer = new MutationObserver((mutations) => {
        let shouldUpdate = false;

        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        if (node.classList && node.classList.contains('btn-primary')) {
                            shouldUpdate = true;
                        } else if (node.querySelectorAll) {
                            const buttons = node.querySelectorAll('.btn-primary');
                            if (buttons.length > 0) {
                                shouldUpdate = true;
                            }
                        }
                    }
                });
            }
        });

        if (shouldUpdate) {
            wrapButtonContent();
        }
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Expose function globally for manual calls
    window.wrapGradientButtons = wrapButtonContent;

    console.log('✨ Gradient Button Wrapper initialized');
})();
