/// <reference types="cypress" />
import { text } from "../../page/todo";

const todo = require('../../page/todo')
describe('launching TODO website', () => {

  beforeEach(() => {
    cy.visit('https://todomvc.com/examples/react/dist/')
  })

  it('Verify The URL ', () => {
    cy.url().should('include', "https://todomvc.com/examples/react/dist/")

  })
  const newitem = ["welcome", "apple", "headphone"]

  it('Add new todo items', () => {
    newitem.forEach(value => {
      todo.addtodo(value)
    })
    todo.gettodocount().then(count => {
      const getvalueinlist=parseInt(count.match(/\d+/)[0],10);
      const arraycount=newitem.length
      expect(arraycount).to.equal(arraycount)
    })


  })
  it('should allow a user to edit a to-do item', () => {
    newitem.forEach(value => {
      todo.addtodo(value)
    })
    todo.editTodoItem('welcome', 'newcar');
    todo.getTodoItems().should('contain.text', 'newcar');
  });
  it('should allow a user to delete a to-do item', () => {
    const deletename = "newjoin"
    newitem.forEach(value => {
      todo.addtodo(value)
    })
    todo.deleteItem(deletename);
    todo.getTodoItems().should('not.contain.text', deletename);
  });
})