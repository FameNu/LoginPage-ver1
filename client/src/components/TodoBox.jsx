import React from 'react'

function TodoBox(params) {
    const { id, title, description, status } = params.todo

    const handleToDone = (e) => {
        params.setToDone(e)
    }

    const handleRemoveTodo = (e) => {
        params.removeTodo(e)
    }

    return (
        <div className='container-todo' id={id}>
            <div className='todo-info'>
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
            <div className='btn-box'>
                <button className={status} onClick={handleToDone}>{status}</button>
                <button onClick={handleRemoveTodo}>Remove</button>
            </div>
        </div>
    )
}

export default TodoBox
