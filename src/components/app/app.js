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
    ],
    term: '',
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
    const newItem = this.createTodoItem(text);

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

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id)

    const oldItem = arr[idx]
    const newItem = {...oldItem, [propName]: !oldItem[propName]}

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1),
    ]
  }

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  }

  onSearchChange = (term) => {
    this.setState({term})
  }

  search (items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter(({label}) => label.toLowerCase().includes(term.toLowerCase()))
  }

  render() {
    const {todoData, term} = this.state
    const visibleItems = this.search(todoData, term)
    const doneCount = todoData.filter(el => el.done).length
    const todoCount = todoData.length - doneCount

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount}/>
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange}/>
          <ItemStatusFilter onStatusFilterChanged={this.onStatusFilterChanged}/>
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportamt={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    )
  }
}
