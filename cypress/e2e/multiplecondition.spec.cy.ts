it('should have multiple-condition coverage', () => {
  cy.visit('http://localhost:4200/login');
  cy.get('[data-testid=signup-username-input]').type('testuser');
  cy.get('[data-testid=signup-email-input]').type('test@example.com');
  cy.get('[data-testid=signup-password-input]').type('password123');
  cy.get('[data-testid=signup-button]').click();

  cy.get('[data-testid=login-email-input]').type('testuser');
  cy.get('[data-testid=login-password-input]').type('password123');
  cy.get('[data-testid=login-button]').click();

  cy.url().should('include', '/admin/users');
});

it('should display an alert for invalid login credentials', () => {
  cy.visit('http://localhost:4200/login');
  cy.get('[data-testid=login-email-input]').type('wrong@example.com');
  cy.get('[data-testid=login-password-input]').type('incorrect');
  cy.get('[data-testid=login-button]').click();

  cy.on('window:alert', (message) => {
    expect(message).to.equal('Wrong Credentials');
  });
});

it('should have multiple-condition coverage for logout', () => {
  cy.visit('http://localhost:4200/login');
  cy.get('[data-testid=login-email-input]').type('testuser');
  cy.get('[data-testid=login-password-input]').type('password123');
  cy.get('[data-testid=login-button]').click();

  cy.visit('http://localhost:4200/admin/users');

  cy.get('[data-testid=logout-button]').click();

  cy.url().should('include', '/login');
});
