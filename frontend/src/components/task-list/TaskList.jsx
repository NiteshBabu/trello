import React, {useContext, useState} from 'react'

import './taskList.css'
import {Store, setModal,setIsTaskCreateModal, setBoard, setUsers} from '../../contexts/TrelloContext'
import deleteIcon from '../../static/delete2.png'
import newTaskIcon from '../../static/plus.png'

export function TaskList({id, name, tasks}) {
    const { dispatch, state } = useContext(Store)
    const { board } = state
    return (
        <section className='tasks'>
            <div className='task-header'>
                <p className='caption'>Tasks</p>
                <div onClick={() =>{
                    dispatch(setModal(true))
                    dispatch(setIsTaskCreateModal(true))
                    dispatch(setBoard({id, name, tasks}))
                }}>
                    <img src={newTaskIcon} className='new-task-icon' alt='New Task'></img>
                </div>
            </div>
            <section className='wrapper'>
                {tasks && tasks.length > 0 ? tasks.map(task => <TaskItem {...task} key={task.id} user_id={id}/>) : <h5 style={{textAlign : 'center'}}>No Tasks To Show</h5>}
            </section>
        </section>
    )
}


const TaskItem = ({id, details, user_id}) => {
    const { state, dispatch } = useContext(Store)
    const { users } = state
    const [completed, setCompleted] = useState(false)
    
    const deleteTask = id =>{
        fetch(`http://localhost:8000/api/delete?task_id=${id}`)
        .then(resp => resp.json())
        .then(d => {
            dispatch(
                setUsers(
                    users.map(user =>{
                        if (user_id === user.id) return {...user, tasks:user.tasks.filter(task => task.id !== id)}
                        return user
                    })
                )
            )
        })
    }

    return(
        <li className='task-item'
            onClick={() => setCompleted(!completed)}
            style={ completed ? {textDecoration:'line-through', opacity:'.5'} : {}}
        >
            {details}
            <div className='delete-icon-wrapper'>
                <img src={deleteIcon} className='delete-icon' onClick={() => deleteTask(id)} alt='Delete Task'></img>
            </div>
        </li>
    )
}