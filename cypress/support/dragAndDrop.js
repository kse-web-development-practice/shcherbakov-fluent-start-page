// Based on this answer: https://stackoverflow.com/a/55436989/3694288
export function drag(dragSelector, dropSelector) {
	cy.get(dragSelector).should('exist');
	cy.get(dropSelector).should('exist');

	const draggable = Cypress.$(dragSelector)[0]; // Pick up this
	const droppable = Cypress.$(dropSelector)[0]; // Drop over this

	const coords = droppable.getBoundingClientRect();
	draggable.dispatchEvent(new MouseEvent('mousedown'));
	draggable.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 0 }));
	draggable.dispatchEvent(new MouseEvent('mousedown', { clientX: coords.left + 10, clientY: coords.top + 10 }));
	draggable.dispatchEvent(new MouseEvent('mouseup'));

	return cy.get(dropSelector);
}
