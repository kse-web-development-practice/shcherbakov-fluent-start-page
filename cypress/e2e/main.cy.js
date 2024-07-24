/* eslint-disable cypress/unsafe-to-chain-command */
// Fix intellisense in VS Code
/// <reference types="cypress" />

// Before testing, must run dev server: npm run dev
// Note: can't manage to make bookmarks Drag&Drop work so this feature is not tested
describe('e2e test', () => {
	beforeEach(() => {
		cy.viewport(1280, 720);
		cy.visit('http://localhost:3000');
	});

	afterEach(() => {
		cy.clearAllLocalStorage();
	});

	// =============
	//   Main view
	// =============

	describe('Main view', () => {
		const bookmarkGroupsSelector = 'section[class*="bookmark-group"]';

		describe('Bookmark link', () => {
			it('should have a link', () => {
				cy.get('[class*="bookmark-group"]:first-child [gs-x=0][gs-y=0] a').should('have.attr', 'href', 'https://google.com');
			});
		});

		describe('Deleting a bookmark', () => {
			it('should delete a bookmark and it should not appear after reloading', () => {
				cy.get(bookmarkGroupsSelector)
					.first()
					.get('.grid-stack-item')
					.its('length')
					.then((initialNumberOfBookmarks) => {
						cy.get(bookmarkGroupsSelector)
							.first()
							.get('[class*="bookmark-item"]:first-child button[class*=bookmark-item__edit-button]')
							.first()
							.click();

						cy.get('[class*="modal"][role="dialog"]').within((modal) => {
							cy.wrap(modal).contains('Edit a bookmark');
							cy.wrap(modal).get('button').contains('Remove').click();
							cy.wrap(modal).should('not.exist');
						});

						expect(cy.get(bookmarkGroupsSelector).first().get('.grid-stack-item').its('length'), initialNumberOfBookmarks - 1);
					});
			});
		});

		describe('Renaming a bookmark group', () => {
			it('should change a bookmark group name and load it after reloading the page', () => {
				cy.get('[class*="bookmark-group__header"]')
					.first()
					.within((element) => {
						cy.wrap(element).click();
						cy.wrap(element).get('input').clear();
						cy.wrap(element).get('input').type('New group name{enter}');
						cy.wrap(element).contains('New group name');
					});

				cy.reload();
				cy.get('[class*="bookmark-group__header"]').first().contains('New group name');
			});
		});

		describe('Creating a new group', () => {
			it('should create a new group and load it after reloading the page', () => {
				cy.get(bookmarkGroupsSelector)
					.its('length')
					.then((initialNumberOfGroups) => {
						cy.get('[class*="bookmark-container__new-group-button"]').click();
						cy.get(bookmarkGroupsSelector).should('have.length', initialNumberOfGroups + 1);

						cy.reload();
						cy.get(bookmarkGroupsSelector).should('have.length', initialNumberOfGroups + 1);
					});
			});
		});

		describe('Removing a bookmark group', () => {
			it('should remove a bookmark group and it should not appear after reloading the page', () => {
				cy.get(bookmarkGroupsSelector)
					.its('length')
					.then((initialNumberOfGroups) => {
						cy.get('header[class*="bookmark-group__header"]')
							.first()
							.within((header) => {
								cy.wrap(header).get('button[aria-label="Remove group"]').click();
							});
						cy.get(bookmarkGroupsSelector).should('have.length', initialNumberOfGroups - 1);

						cy.reload();
						cy.get(bookmarkGroupsSelector).should('have.length', initialNumberOfGroups - 1);
					});
			});
		});

		describe('Reordering groups', () => {
			it('should make the second group as a first one and be the same after reloading the page', () => {
				cy.get('header[class*="bookmark-group__header"]')
					.first()
					.within((header) => {
						cy.wrap(header).get('button[aria-label="Move group back"]').click();
					});
				cy.get(bookmarkGroupsSelector).first().contains('Group 2');

				cy.reload();
				cy.get(bookmarkGroupsSelector).first().contains('Group 2');
			});
		});
	});

	// ========================
	//   Create bookmark view
	// ========================

	describe('Create bookmark view', () => {
		beforeEach(() => {
			cy.get('a[class*="sidebar__item"][href="/add"]').click();
		});

		describe('Create a bookmark', () => {
			it('should create a wide sized bookmark that leads to typed url', () => {
				const expectedName = 'Simple bookmark';
				const expectedUrl = 'https://example.com';

				cy.get('input[name="text"]').type(expectedName);
				cy.get('input[name="link"]').type(expectedUrl);
				cy.get('select[name="size"]').select('Wide');
				cy.get('button[type="submit"]').click();

				cy.location('pathname').should('eq', '/');
				cy.get('.grid-stack-item[gs-w=4][gs-h=2]').contains(expectedName).should('have.attr', 'href', expectedUrl);
			});
		});
	});

	// =====================
	//   App settings view
	// =====================

	describe('App settings view', () => {
		beforeEach(() => {
			cy.get('a[class*="sidebar__item"][href="/settings"]').click();
		});

		describe('Change theme', () => {
			it('should change app appearance to light and save', () => {
				cy.get('label').contains('Mode').get('input[value="light"]').check();
				cy.get('html.light').should('exist');

				cy.reload();
				cy.get('html.light').should('exist');
			});
		});

		describe('Clearing data', () => {
			it('should reset data after changing a color theme', () => {
				cy.get('label').contains('Mode').get('input[value="light"]').check();
				cy.get('html.light').should('exist');

				cy.get('button').contains('Clear').click();
				cy.get('html.dark').should('exist');
			});
		});
	});
});
