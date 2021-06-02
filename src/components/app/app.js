import AppHeader from "../app-header"
import SearchPanel from "../search-panel"
import ItemStatusFilter from "../item-status-filter"
import TodoList from "../todo-list"
import './app.css'
import {Component} from "react"

export default class App extends Component {
  state = {
    todoData: [
      {label: 'Drink Coffee', important: false, id: 1},
      {label: 'Make Awesome App', important: true, id: 2},
      {label: 'Have a lunch', important: false, id: 3},
    ]
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id)
      //todoData.splice(idx, 1) <-- Wrong code! Do not change state directly! (splice changes array, slice - does not)

      const newArray = [
        ...todoData.slice(0, idx), //before deleted element
        ...todoData.slice(idx+1)   //after deleted element
      ]

      return {
        todoData: newArray
      }
    })
  }

  render() {
    return (
      <div className="todo-app">
        <AppHeader toDo={3} done={2}/>
        <div className="top-panel d-flex">
          <SearchPanel/>
          <ItemStatusFilter/>
        </div>
        <TodoList
          todos={this.state.todoData}
          onDeleted={this.deleteItem}/>
      </div>
    )
  }
}
