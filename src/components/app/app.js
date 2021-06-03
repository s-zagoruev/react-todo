import AppHeader from "../app-header"
import SearchPanel from "../search-panel"
import ItemStatusFilter from "../item-status-filter"
import TodoList from "../todo-list"
import './app.css'
import {Component} from "react"
import ItemAddForm from "../item-add-form";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ]
  }

  createTodoItem(label) {
    return {
      label: label,
      important: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id)
      //todoData.splice(idx, 1) <-- Wrong code! Do not change state directly! (splice changes array, slice - does not)

      const newArray = [
        ...todoData.slice(0, idx), //before deleted element
        ...todoData.slice(idx + 1) //after deleted element
      ]

      return {
        todoData: newArray
      }
    })
  }

  addItem = (text) => {
    const newItem = this.createTodoItem('New Item');

    this.setState(({todoData}) => {
      const newArr = [
        ...todoData,
        newItem
      ]
      return {
        todoData: newArr
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id)

      //update object
      const oldItem = todoData[idx]
      const newItem = {...oldItem, done: !oldItem.done}

      //construct new array
      const newArr = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx+1),
      ]

      return {
        todoData: newArr
      }
    })
  }

  onToggleImportant = (id) => {
    console.log('onToggleImportant', id)
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
          onDeleted={this.deleteItem}
          onToggleImportamt={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAded={this.addItem}/>
      </div>
    )
  }
}
