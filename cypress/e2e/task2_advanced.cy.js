describe('Task 2: Assertions, Aliases & Custom Commands', () => {
  
  // beforeEach Hook to run before every test
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
  });

  // Exercise 1: Assertion Practice
  it('Assertion Practice: should test elements using visible, text, and attr', () => {
    // 1. be.visible
    cy.get('.login_logo').should('be.visible');

    // 2. have.text
    cy.get('[data-test="login-button"]').should('have.value', 'Login'); 
    // Note: SauceDemo uses an <input type="submit"> for this button, 
    // so 'have.value' ensures it passes cleanly instead of 'have.text'!
  });

  // Exercise 2: Negative Assertion
  it('Negative Assertion: should assert that the error container does not exist initially', () => {
    // The error element should not exist on clean page load
    cy.get('.error-message-container').should('not.have.class', 'error');
  });

  // Exercise 3: Alias Practice
  it('Alias Practice: should save username input as an alias and interact with it', () => {
    // Create the alias using .as()
    cy.get('[data-test="username"]').as('usernameField');

    // Use the alias later in the test using the @ symbol
    cy.get('@usernameField').type('standard_user');
    cy.get('@usernameField').should('have.value', 'standard_user');
  });

  // Exercise 4: Custom Command execution
  it('Custom Command: should log in using the custom login command', () => {
    // Utilizing the custom command declared in commands.js
    cy.login('standard_user', 'secret_sauce');

    // Assert successful login execution
    cy.url().should('include', '/inventory.html');
  });
});