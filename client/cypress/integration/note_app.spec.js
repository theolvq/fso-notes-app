describe('Note App', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000');
  });
  it('front page can be opened', function () {
    cy.contains('HTML');
    cy.contains('note app');
  });

  it('login form can be opened', function () {
    cy.contains('Login').click();
  });

  it('user can login', function () {
    cy.contains('Login').click();
    cy.get('#username').type('daawa');
    cy.get('#password').type('WhistlerBaby');
    cy.get('#login-btn').click();
    cy.contains('Welcome Theo Leveque');
  });

  describe('when logged in', () => {
    beforeEach(function () {
      cy.contains('Login').click();
      cy.get('#username').type('daawa');
      cy.get('#password').type('WhistlerBaby');
      cy.get('#login-btn').click();
    });

    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('#newNote').type('a note created by cypress');
      cy.contains('Add').click();
      cy.contains('a note created by cypress');
    });
  });
});
