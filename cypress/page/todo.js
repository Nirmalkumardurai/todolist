class todo {
    constructor() {
        this.todopagetext = '#todo-input';
        this.todocount = '.footer span.todo-count';
        this.todoItems = '.todo-list li';
        this.toggleAll = '.toggle-all';
        this.clearCompletedButton = '.clear-completed';
        this.filterActive = 'a[href="#/active"]';
        this.filterCompleted = 'a[href="#/completed"]';
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
            .find('.destroy')
            .click({ force: true });
    }
}
module.exports = new todo()