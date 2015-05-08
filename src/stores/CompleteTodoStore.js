const alt = require('../zio-alt');
const TodoActions = require('../actions/TodoActions');

class CompleteTodoStore {
  constructor() {
    this.todos = [];
    this.bindListeners({
      handleMarkComplete: TodoActions.MARK_COMPLETE
    });
  }

  handleMarkComplete(todo) {
    if (this.todos.indexOf(todo) === -1) {
      this.todos.push(todo);
    }
  }
}

module.exports = alt.createStore(CompleteTodoStore, 'CompleteTodoStore');