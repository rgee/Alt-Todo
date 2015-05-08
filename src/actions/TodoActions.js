const alt = require('../zio-alt');

class TodoActions {
  fetchTodos() {
    this.dispatch([{
      name: 'go to the store',
      id: '1',
      completed: false
    }]);
  }

  createTodo(name) {
    this.dispatch({
      name,
      id: ''+Math.floor(Math.random()*10000),
      completed: false
    });
  }

  markComplete(todo) {
    this.dispatch(todo);
  }
}

module.exports = alt.createActions(TodoActions);