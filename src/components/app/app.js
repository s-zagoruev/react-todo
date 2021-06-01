import AppHeader from "../app-header"
import SearchPanel from "../search-panel"
import ItemStatusFilter from "../item-status-filter"
import TodoList from "../todo-list"
import './app.css'

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

export default App
