describe('Login and Signup', () => {
  beforeEach(() => {
  });

  it('should allow a user to sign up and log in successfully', () => {
    cy.visit('http://localhost:4200/login');

    cy.get('[data-testid=signup-username-input]').type('testuser');
    cy.get('[data-testid=signup-email-input]').type('test@example.com');
    cy.get('[data-testid=signup-password-input]').type('password123');
    cy.get('[data-testid=signup-button]').click();


    cy.get('[data-testid=login-email-input]').type('testuser'); 
    cy.get('[data-testid=login-password-input]').type('password123');
    cy.get('[data-testid=login-button]').click();

  });

  it('should display an alert for invalid login credentials', () => {
    cy.visit('http://localhost:4200/login');

    cy.get('[data-testid=login-email-input]').type('wrong@example.com');
    cy.get('[data-testid=login-password-input]').type('incorrect');
    cy.get('[data-testid=login-button]').click();

  });

  it('should have a responsive layout on different viewports', () => {
    cy.viewport(1280, 800);
    cy.visit('http://localhost:4200/login');
  
    cy.viewport(1366, 768);
    cy.visit('http://localhost:4200/login');
  
    cy.viewport(1024, 768);
    cy.visit('http://localhost:4200/login');
  
    cy.viewport('ipad-2');
    cy.visit('http://localhost:4200/login');
  
    cy.viewport('ipad-mini');
    cy.visit('http://localhost:4200/login');
  
    cy.viewport(414, 736);
    cy.visit('http://localhost:4200/login');
  
    cy.viewport(375, 667);
    cy.visit('http://localhost:4200/login');
  
    cy.viewport(320, 568);
    cy.visit('http://localhost:4200/login');
  
    cy.viewport(600, 800);
    cy.visit('http://localhost:4200/login');
  
    cy.viewport(2560, 1080);
    cy.visit('http://localhost:4200/login');
  });
  

  it('should redirect to the login page after clicking the logout button', () => {
    cy.visit('http://localhost:4200/login');
    cy.get('[data-testid=login-email-input]').type('testuser');
    cy.get('[data-testid=login-password-input]').type('password123');
    cy.get('[data-testid=login-button]').click();

    cy.visit('http://localhost:4200/admin/users');
    
    cy.get('[data-testid=logout-button]').click();
    cy.url().should('include', '/login');
  });
});

it('should have statement coverage', () => {
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
it('should have decision coverage', () => {
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

it('should have decision coverage for logout', () => {
  cy.visit('http://localhost:4200/login');
  cy.get('[data-testid=login-email-input]').type('testuser');
  cy.get('[data-testid=login-password-input]').type('password123');
  cy.get('[data-testid=login-button]').click();

  cy.visit('http://localhost:4200/admin/users');

  cy.get('[data-testid=logout-button]').click();

  cy.url().should('include', '/login');
});
it('should have condition coverage', () => {
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

it('should have condition coverage for logout', () => {
  cy.visit('http://localhost:4200/login');
  cy.get('[data-testid=login-email-input]').type('testuser');
  cy.get('[data-testid=login-password-input]').type('password123');
  cy.get('[data-testid=login-button]').click();

  cy.visit('http://localhost:4200/admin/users');

  cy.get('[data-testid=logout-button]').click();

  cy.url().should('include', '/login');
});
it('should have decision/condition coverage', () => {
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

it('should have decision/condition coverage for logout', () => {
  cy.visit('http://localhost:4200/login');
  cy.get('[data-testid=login-email-input]').type('testuser');
  cy.get('[data-testid=login-password-input]').type('password123');
  cy.get('[data-testid=login-button]').click();

  cy.visit('http://localhost:4200/admin/users');

  cy.get('[data-testid=logout-button]').click();

  cy.url().should('include', '/login');
});
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
