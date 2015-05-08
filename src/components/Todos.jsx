const React = require('react');
const TodoStore = require('../stores/TodoStore');
const IncompleteTodoStore = require('../stores/IncompleteTodoStore');
const CompleteTodoStore = require('../stores/CompleteTodoStore');
const TodoActions = require('../actions/TodoActions');

class Todos extends React.Component {
  constructor() {
    this.state = this.getStoreState();
  }

  getStoreState() {
    return {
      complete: CompleteTodoStore.getState().todos,
      incomplete: IncompleteTodoStore.getState().todos
    };
  }

  onChange() {
    this.setState(this.getStoreState());
  }

  componentDidMount() {
    IncompleteTodoStore.listen(this.onChange.bind(this));
    CompleteTodoStore.listen(this.onChange.bind(this));
    TodoActions.fetchTodos();
  }

  componentDidUnmount() {
    IncompleteTodoStore.unListen(this.onChange);
    CompleteTodoStore.unListen(this.onChange);
  }

  render() {
    const { complete, incomplete, pendingTodo } = this.state;
    return (
      <div className="Todos">
        <div className="Todos-incomplete">
          <h1>Incomplete</h1>
          <ul className="Todos-list">
            {incomplete.map((todo) => {
              return <li key={`incomplete-${todo.id}`} className="Todos-todo">{todo.name}
              <button data-id={todo.id} onClick={this.handleCompleteClick}>Complete</button></li>;
            })}
          </ul>
          <input type="text" onChange={this.handleTextChange.bind(this)} value={pendingTodo} />
          <button onClick={this.handleAddClick.bind(this)}>Add</button>
        </div>
        <div className="Todos-complete">
          <h1>Complete</h1>
          <ul className="Todos-list">
            {complete.map((todo) => {
              return <li key={`complete-${todo.id}`} className="Todos-todo">{todo.name}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }

  handleTextChange(e) {
    this.setState({ pendingTodo: e.target.value });
  }

  handleAddClick(e) {
    const { pendingTodo } = this.state;
    if (pendingTodo) {
      this.setState({ pendingTodo: '' });
      TodoActions.createTodo(pendingTodo);
      e.stopPropagation();
    }
  }

  handleCompleteClick(e) {
    TodoActions.markComplete(TodoStore.getTodo(e.target.getAttribute('data-id')));
  }
}

module.exports = Todos;