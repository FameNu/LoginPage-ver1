import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TodoBox from './TodoBox.jsx'
import '../styles/todo.css'

const url = 'http://localhost:3000/'

function TodoListBox(params) {
    const [todoTitle, setTodoTitle] = useState('')
    const [todoDescription, setTodoDescription] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [todoList, setTodoList] = useState(null)

    const addTodo = async () => {
        if (!todoTitle) setErrMsg('Please enter title')
        const newTodo = {
            title: todoTitle,
            description: todoDescription,
        }
        try {
            const response = await axios.post(
                `${url}addTodo?name=${params.username}`,
                newTodo
            )
            setTodoList(response.data.user.todolist)
            setTodoTitle('')
            setTodoDescription('')
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const removeTodo = async (e) => {
        const id = e.target.parentNode.parentNode.id
        try {
            const response = await axios.post(`${url}removeTodo`, {
                name: params.username,
                id,
            })
            setTodoList(response.data.user.todolist)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const setTodoToDone = async (e) => {
        const id = e.target.parentNode.parentNode.id
        try {
            const response = await axios.post(`${url}setToDone`, {
                name: params.username,
                id,
            })
            setTodoList(response.data.user.todolist)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const handleTitle = (e) => {
        setTodoTitle(e.target.value)
    }

    const handleDescription = (e) => {
        setTodoDescription(e.target.value)
    }

    useEffect(() => {
        setTodoList(params.todoList)
    }, [params.todoList])

    return (
        <div className='box-todo'>
            <div className='todo-add'>
                <h2>
                    Add Todo{' '}
                    <span className='text-danger'>
                        {errMsg}
                    </span>
                </h2>
                <div className='box-todo-input'>
                    <label htmlFor='todo-title'>Title</label>
                    <input
                        type='text'
                        id='todo-title'
                        readOnly={!params?.username}
                        value={todoTitle}
                        onChange={handleTitle}
                    />
                </div>
                <div className='box-todo-input'>
                    <label htmlFor='todo-description'>Description</label>
                    <textarea
                        id='todo-description'
                        readOnly={!params?.username}
                        value={todoDescription}
                        onChange={handleDescription}
                    />
                </div>
                <button disabled={!params?.username} onClick={addTodo}>
                    Add
                </button>
            </div>
            <hr />
            <div className='container-list'>
                {todoList && todoList.length != 0 ? (
                    todoList.map((todo) => (
                        <TodoBox
                            todo={todo}
                            key={todo.id}
                            removeTodo={removeTodo}
                            setToDone={setTodoToDone}
                        />
                    ))
                ) : (
                    <h3>No Todo Found</h3>
                )}
            </div>
        </div>
    )
}

export default TodoListBox
