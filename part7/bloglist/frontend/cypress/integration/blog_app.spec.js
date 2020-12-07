describe('Blog ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.createUser({
      name: 'Midas',
      username: 'midas',
      password: 'midas'
    })
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function () {
    cy.contains('blogs')
    cy.contains('blogs app, Mikael Bärlund, mooc fullstackopen 2020')
  })


  it('login form can be opened', function () {
    cy.contains('login').click()
  })

  describe('Login  ', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('midas')
      cy.get('#password').type('midas')
      cy.get('#login-button').click()
      cy.contains('Midas logged in')
      cy.contains('logout').click()
      cy.contains('Midas logged in').should('not.exist')
    })
    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('midas')
      cy.get('#password').type('midasd')
      cy.get('#login-button').click()
      cy.get('.notification').should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Midas logged in')

    })
  })
  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'midas', password: 'midas' })
    })

    it('a new blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Cypress Writer')
      cy.get('#create-blog').click()
      cy.contains('a blog created by cypress')
    })

    describe('and 3 blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'a blog exists', author: 'Cypress Writer' })
        cy.createBlog({ title: 'another blog exists', author: 'Cypress Writer' })
        cy.createBlog({ title: 'a third blog exists', author: 'Cypress Writer' })
      })
      it('one can be liked', function () {
        cy.contains('a blog exists Cypress Writer')
          .contains('show')
          .click()

        cy.contains('a blog exists ').parent()
          .contains('like')
          .click()
        cy.contains('likes 1')
      })
      it('first can be removed', function () {
        cy.contains('a blog exists Cypress Writer')
          .contains('show')
          .click()
        cy.contains('a blog exists ').parent()
          .contains('remove')
          .click()
        cy.get('.notification').should('contain', 'removed a blog exists')
        cy.get('.blog').then((blogs) => {
          expect(blogs).to.have.lengthOf(2)
        })
      })
      it('first cannot be removed by another user', function () {
        cy.createUser({
          name: 'Elliot',
          username: 'elliot',
          password: 'elliot'
        })
        cy.logout()
        cy.login({ username: 'elliot', password: 'elliot' })
        cy.contains('a blog exists Cypress Writer')
          .contains('show')
          .click()
        cy.contains('a blog exists ').parent()
          .contains('remove')
          .click()
        cy.get('.notification').should('contain', 'cannot remove blog')
      })
    })
    describe('and 3 blogs with likes exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'a blog exists', author: 'Cypress Writer', likes: 0 })
        cy.createBlog({ title: 'another blog exists', author: 'Cypress Writer', likes: 5 })
        cy.createBlog({ title: 'a third blog exists', author: 'Cypress Writer', likes: 10 })
      })
      it('they are sorted by likes', function () {
        cy.get('.blog').then((blogs) => {
          expect(blogs[2]).to.contain('a blog')
          expect(blogs[1]).to.contain('another blog')
          expect(blogs[0]).to.contain('a third blog')
        })
      })
    })
  })
})
