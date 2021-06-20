describe('Note App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Theo',
      username: 'daawa',
      password: 'whistler',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('login form can be opened', function () {
    cy.contains('Login').click();
  });

  it('user can login', function () {
    cy.contains('Login').click();
    cy.get('#username').type('daawa');
    cy.get('#password').type('whistler');
    cy.get('#login-btn').click();
    cy.contains('Welcome Theo');
  });
  it('login fails with wrong password', function () {
    cy.contains('Login').click();
    cy.get('#username').type('daawa');
    cy.get('#password').type('wrong');
    cy.get('#login-btn').click();

    cy.get('.notification')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)');

    cy.get('html').should('not.contain', 'Welcome Theo');
  });

  describe('when logged in', () => {
    beforeEach(function () {
      cy.login({ username: 'daawa', password: 'whistler' });
      // cy.contains('Login').click();
      // cy.get('#username').type('daawa');
      // cy.get('#password').type('whistler');
      // cy.get('#login-btn').click();
    });

    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('#newNote').type('a note created by cypress');
      cy.contains('Add').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({ content: 'another note on cypress', important: false });
      });
      it('it can be made important', function () {
        cy.contains('another note on cypress')
          .parent()
          .contains('make important')
          .click();
        cy.contains('another note on cypress')
          .parent()
          .contains('make not important');
      });
    });

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false });
        cy.createNote({ content: 'second note', important: false });
        cy.createNote({ content: 'third note', important: false });
      });

      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').click();
        cy.contains('second note')
          .parent()
          .find('button')
          .should('contain', 'make not important');
      });
    });
  });
});
