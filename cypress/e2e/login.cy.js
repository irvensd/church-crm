describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('displays validation errors for empty form submission', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
  });

  it('validates email format', () => {
    cy.get('input[name="email"]').type('invalid-email').blur();
    cy.contains('Invalid email format').should('be.visible');
  });

  it('validates password length', () => {
    cy.get('input[name="password"]').type('short').blur();
    cy.contains('Password must be at least 8 characters').should('be.visible');
  });

  it('successfully submits form with valid credentials', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    // Add assertions based on your app's behavior after successful login
    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="user-menu"]').should('be.visible');
  });

  it('shows error message for invalid credentials', () => {
    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    
    cy.contains('Invalid email or password').should('be.visible');
  });

  it('maintains accessibility standards', () => {
    // Run accessibility checks
    cy.injectAxe();
    cy.checkA11y();
    
    // Test keyboard navigation
    cy.get('input[name="email"]').focus().type('{tab}');
    cy.get('input[name="password"]').should('have.focus');
    cy.focused().type('{tab}');
    cy.get('button[type="submit"]').should('have.focus');
  });
}); 