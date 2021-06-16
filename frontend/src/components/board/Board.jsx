import React, {useContext} from 'react'
import './board.css'

import {Store, setModal, setIsDeleteModal, setIsUpdateModal, setBoard} from '../../contexts/TrelloContext'
import { TaskList } from '../task-list/TaskList'
import deleteIcon from '../../static/delete.png'
import editIcon from '../../static/edit.png'


function Board({ id, name, tasks}) {

    const { dispatch } = useContext(Store)

    return (
        <div className='board' draggable>
            <img
                src={deleteIcon}
                className='delete-icon'
                style={{width:'25px', height:'25px', margin:'0 0 0 10px'}}
                onClick={() =>{ 
                    dispatch(setBoard({id, name, tasks}))
                    dispatch(setIsDeleteModal(true))
                    dispatch(setModal(true))
                    
                }}
                alt='Delete Board'
            >
                    
            </img>
            
            <section className='username' >
                <h1>{name}</h1>
                <img src={editIcon} className='edit-icon' alt='Edit Username'
                     onClick={() => {
                        dispatch(setModal(true))
                        dispatch(setIsUpdateModal(true))
                        dispatch(setBoard({id, name, tasks}))
                    }}
                ></img>
            </section>
            <TaskList tasks={tasks} id={id} name={name}/> 
        </div>
    )
}

export default Board

