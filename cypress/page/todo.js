class todo {
    constructor() {
        this.todopagetext = '#todo-input';
        this.todocount = '.footer span.todo-count';
        this.todoItems = '.todo-list li';
        this.toggleAll = '.toggle-all';
        this.clearCompletedButton = '.clear-completed';
        this.filterActive = 'a[href="#/active"]';
        this.filterCompleted = 'a[href="#/completed"]';
        this.rediobutton = "//label[contains(text(),'new')]/preceding-sibling::input"
    }

    addtodo(entertext) {
        cy.get(this.todopagetext)
            .type(entertext + '{enter}')
    }
    gettodocount() {
        return cy.get(this.todocount)
            .invoke('text')
    }
    getTodoItems() {
        return cy.get(this.todoItems);
    }
    todoitems() {
        cy.get(this.todoItems)
    }
    editTodoItem(oldText, newText) {
        cy.contains(this.todoItems, oldText)
            .dblclick();
        cy.focused()
            .clear()
            .type(`${newText}{enter}`);
    }
    deleteItem(item) {
        cy.contains(this.todoItems, item)
            .trigger('mouseover')
            .find('.destroy')
            .click({ force: true });
        // cy.xpath("//label[contains(text(),"+item+")]/preceding-sibling::input[@type='checkbox']") ////label[contains(text(),'welcome')]/preceding-sibling::input[@type='checkbox']
        // .check()
        // .trigger('mousemove')
        // .find('.destroy')
        // .click({ force: true });
    }
    markTodoCompleted(item) {
        cy.contains(this.todoItems, item)
            .find('.toggle')
            .check();
    }
    filterActiveItems() {
        cy.get(this.filterActive).click();
      }
    
      filterCompletedItems() {
        cy.get(this.filterCompleted).click();
      }
}
module.exports = new todo()