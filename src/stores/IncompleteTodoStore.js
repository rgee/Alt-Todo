const alt = require('../zio-alt');
const TodoActions = require('../actions/TodoActions');

class IncompleteTodoStore {
  constructor() {
    this.todos = [];
    this.bindListeners({
      handleFetchTodos: TodoActions.FETCH_TODOS,
      handleNewTodo: TodoActions.CREATE_TODO,
      handleMarkCompleted: TodoActions.MARK_COMPLETE
    });
  }

  handleMarkCompleted(completeTodo) {
    this.todos = this.todos.filter((todo) => {
      return todo.id !== completeTodo.id
    });
  }

  handleFetchTodos(todos) {
    this.todos = todos;
  }

  handleNewTodo(newTodo) {
    if (this.todos.indexOf(newTodo) === -1) {
      this.todos.push(newTodo);
    }
  }
}

module.exports = alt.createStore(IncompleteTodoStore, 'IncompleteTodoStore');