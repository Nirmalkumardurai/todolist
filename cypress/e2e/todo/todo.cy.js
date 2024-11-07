/// <reference types="cypress" />
import { text } from "../../page/todo";

const todo = require('../../page/todo')
describe('launching TODO website', () => {

  const url = 'https://todomvc.com/examples/react/dist/'
  let newitem;

  beforeEach(() => {
    cy.visit(url)
    cy.fixture('tododata').as('todolistdata')
  })

  it('should allow a user to Verify The URL ', () => {
    cy.url().should('include', url)

  })

  //  const newitem = ["welcome", "apple", "headphone"]

  it('should allow a user to Add new todo items', () => {
    cy.get('@todolistdata').then((data) => {


      data.newitem.forEach(value => {
        todo.addtodo(value)
      })
      todo.gettodocount().then(count => {
        const getvalueinlist = parseInt(count.match(/\d+/)[0], 10);
        const arraycount = data.newitem.length
        expect(getvalueinlist).to.equal(arraycount)
      })
    })

  })

  it('should allow a user to edit a todo item', () => {
    cy.get('@todolistdata').then((data) => {
      data.newitem.forEach(value => {
        todo.addtodo(value)
      })
      todo.editTodoItem('welcome', 'newcar');
      todo.getTodoItems().should('contain.text', 'newcar');
    })
  });

  it('should allow a user to delete a todo item', () => {
    cy.get('@todolistdata').then((data) => {
      const deletename = "welcome"
      data.newitem.forEach(value => {
        todo.addtodo(value)
      })
      todo.deleteItem(deletename);
      todo.getTodoItems().should('not.contain.text', deletename);
    })
  });

  it('should mark a to-do as completed', () => {
    todo.addtodo('Complete');
    todo.markTodoCompleted('Complete');
    todo.getTodoItems()
      .contains('Complete')
      .parents('li')
      .should('have.class', 'completed');
  });

  it('should filter active and completed to-dos', () => {
    cy.get('@todolistdata').then((data) => {
      const complite = "welcome"
      data.newitem.forEach(value => {
        todo.addtodo(value)
      })
      todo.markTodoCompleted(complite);
      todo.filterActiveItems();
      todo.gettodocount().then(count => {
      const getvalueinlist = parseInt(count.match(/\d+/)[0], 10);
      const arraycount = data.newitem.length-1
      todo.getTodoItems().should('have.length', arraycount);
      todo.filterCompletedItems();
      todo.getTodoItems().should('have.length',1);
    });
  })
})
})