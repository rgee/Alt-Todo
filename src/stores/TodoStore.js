const alt = require('../zio-alt');
const TodoActions = require('../actions/TodoActions');
const CompleteTodoStore = require('./CompleteTodoStore');

class TodoStore {
	constructor() {
		this.todos = [];
    this.bindListeners({
      handleFetchTodos: TodoActions.FETCH_TODOS,
      handleNewTodo: TodoActions.CREATE_TODO,
      handleMarkComplete: TodoActions.MARK_COMPLETE
    });

    this.exportPublicMethods({
      getTodo: this.getTodo
    });
	}

  getTodo(id) {
    const todos = this.getState().todos;
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        return todos[i];
      }
    }

    return null;
  }

  handleMarkComplete(id) {
    this.waitFor(CompleteTodoStore);
    const completeTodos = CompleteTodoStore.getState().todos;

    this.todos.forEach((todo) => {
      todo.complete = false;

      completeTodos.forEach((completeTodo) => {
        if (completeTodo.id === todo.id) {
          todo.complete = true;
        }
      });
    });
  }

  handleFetchTodos(todos) {
    this.todos = todos;
  }

  handleNewTodo(newTodo) {
    this.todos.push(newTodo);
  }
}

module.exports = alt.createStore(TodoStore, 'TodoStore');