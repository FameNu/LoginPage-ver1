import { useState } from 'react'
import './App.css'
import './styles/loginBox.css'
import LoginBox from './components/LoginBox.jsx'
import TodoListBox from './components/TodoListBox.jsx'

function App() {
    const [todoList, setTodoList] = useState(null)
    const [username, setUsername] = useState('')

    function setUser(user) {
      setTodoList(user.todolist)
      setUsername(user.name)
    }

    return (
        <div className='container'>
            <LoginBox sendData={setUser} />
            <TodoListBox todoList={todoList} username={username} />
        </div>
    )
}

export default App
