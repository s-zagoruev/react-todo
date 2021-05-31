import React from 'react'
import ReactDOM from 'react-dom'
import AppHeader from "./components/app-header"
import SearchPanel from "./components/search-panel"
import TodoList from "./components/todo-list"
import ItemStatusFilter from "./components/item-status-filter";

const App = () => {
  const totoData = [
    {label: 'Drink Coffee', important: false, id: 1},
    {label: 'Make Awesome App', important: true, id: 2},
    {label: 'Have a lunch', important: false, id: 3},
  ]
  const style = { padding: '10px' }
  return (
    <div style={style}>
      <AppHeader toDo={3} done={2}/>
      <div className="top-panel d-flex">
        <SearchPanel/>
        <ItemStatusFilter />
      </div>
      <TodoList todos={totoData}/>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))
