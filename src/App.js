import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toDoList: JSON.parse(localStorage.getItem("ToDoList")) || [],
      doneList: JSON.parse(localStorage.getItem("DoneList")) || [],
      newTaskName: ""
    };
  }

  toDoneList = clickedItem => {
    const newToDoList = this.state.toDoList.filter(item => {
      if (item.id !== clickedItem.id) {
        return true;
      } else {
        return false;
      }
    });
    let newDoneList = this.state.doneList;
    newDoneList.push(clickedItem);
    localStorage.setItem("ToDoList", JSON.stringify(newToDoList));
    localStorage.setItem("DoneList", JSON.stringify(newDoneList));
    this.setState({ toDoList: newToDoList, doneList: newDoneList });
  };

  addNewTask = () => {
    let newToDoList = this.state.toDoList;
    newToDoList.push({
      id: Math.random() * (1000 - 1) + 1,
      text: this.state.newTaskName
    });
    localStorage.setItem("ToDoList", JSON.stringify(newToDoList));
    this.setState({
      toDoList: newToDoList,
      newTaskName: ""
    });
  };

  render() {
    return (
      <div className="App">
        <div>
          <h4>To do</h4>
          <ul>
            {this.state.toDoList.map(item => {
              return (
                <li key={item.id} onClick={() => this.toDoneList(item)}>
                  {item.text}
                </li>
              );
            })}
          </ul>
          <div className="add-task-block">
            <input
              type="text"
              value={this.state.newTaskName}
              onChange={e => this.setState({ newTaskName: e.target.value })}
              placeholder="Enter new task"
            />
            <button type="button" onClick={this.addNewTask}>
              Add
            </button>
          </div>
        </div>
        <div>
          <h4>Done</h4>
          <ul>
            {this.state.doneList.map(item => {
              return <li key={item.id}>{item.text}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
