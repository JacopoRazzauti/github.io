/**
 * Scripts specific to the Biology page.
 * Handles the section expansion functionality.
 * Menu toggle functionality is handled by js/script.js.
 */

/**
 * Toggles the expanded state of a section and collapses its sibling.
 * @param {HTMLElement} clickedSection - The section element that was clicked.
 * @param {string} oppositeSectionId - The ID of the sibling section element.
 */
function toggleExpand(clickedSection, oppositeSectionId) {
    const oppositeSection = document.getElementById(oppositeSectionId);
    const row = clickedSection.parentElement; // Assumes sections are direct children of a row
    const sections = row.getElementsByClassName('section'); // Get all sections in this row

    if (clickedSection.classList.contains('expanded')) {
        // If already expanded, collapse
        clickedSection.classList.remove('expanded');
    } else {
        // Reset all sections in the same row (collapse siblings)
        Array.from(sections).forEach(section => {
            section.classList.remove('expanded');
        });
        // Expand clicked section
        clickedSection.classList.add('expanded');
    }
}

// Note: The toggleMenu function and click outside listener are now in js/script.js
// Ensure js/script.js is linked in biology.html to handle the menu.