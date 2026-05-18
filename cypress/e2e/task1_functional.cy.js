describe('Task 1: UI Test Suite (Functional Testing)', () => {

  // Login Test 1: Valid Credentials
  it('Login Test 1: should log in successfully with valid credentials', () => {
    cy.visit('https://www.saucedemo.com');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    
    // Assert user lands on the dashboard inventory page
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('be.visible').and('have.text', 'Products');
  });

  // Login Test 2: Incorrect Password
  it('Login Test 2: should display error message with incorrect password', () => {
    cy.visit('https://www.saucedemo.com');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('wrong_password');
    cy.get('[data-test="login-button"]').click();
    
    // Assert error message appears
    cy.get('[data-test="error"]').should('be.visible')
      .and('contain', 'Username and password do not match any user in this service');
  });

  // Login Test 3: Empty Fields
  it('Login Test 3: should display validation message when fields are empty', () => {
    cy.visit('https://www.saucedemo.com');
    cy.get('[data-test="login-button"]').click();
    
    // Assert validation message is shown
    cy.get('[data-test="error"]').should('be.visible')
      .and('contain', 'Username is required');
  });

  // Navigation Test 1: Menu Link
  it('Navigation Test 1: should open the sidebar menu and verify item matches', () => {
    // Log in first to access navigation
    cy.visit('https://www.saucedemo.com');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Click menu button
    cy.get('#react-burger-menu-btn').click();
    
    // Assert menu link is visible and has correct text
    cy.get('#about_sidebar_link').should('be.visible').and('have.text', 'About');
  });

  // Navigation Test 2: Sequential Page Visits
  it('Navigation Test 2: should visit two different pages sequentially and verify headings', () => {
    // Page 1: Login Page
    cy.visit('https://www.saucedemo.com');
    cy.get('.login_logo').should('be.visible').and('have.text', 'Swag Labs');

    // Move to Page 2 (Dashboard)
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    
    // Page 2 assertion
    cy.get('.title').should('be.visible').and('have.text', 'Products');
  });

  // Form Test 1: Checkout Form submission
  it('Form Test 1: should fill out the checkout form and assert success', () => {
    // Log in and add an item to cart to access checkout
    cy.visit('https://www.saucedemo.com');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();

    // Fill out the checkout form
    cy.get('[data-test="firstName"]').type('John');
    cy.get('[data-test="lastName"]').type('Doe');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();
    
    cy.get('[data-test="finish"]').click();

    // Assert submission success message
    cy.get('.complete-header').should('be.visible').and('have.text', 'Thank you for your order!');
  });
});