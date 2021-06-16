import React, {useContext} from 'react'
import {Store, setUsers, setIsDeleteModal, setIsUpdateModal, setModal, setIsTaskCreateModal, setIsCreateModal,} from '../../contexts/TrelloContext'

import './modal.css'

const Modal = props => {

    const {state, dispatch} = useContext(Store)
    const {users, isUpdateModal, isDeleteModal, isTaskCreateModal, board, isCreateModal} = state

    const handleSubmit = e =>{
        e.preventDefault()
        const {name, value} = e.target.childNodes[1].control
        if (name === 'update'){
            fetch(`http://localhost:8000/api/update/${board.id}?name=${value}`)
            .then(resp => resp.json())
            .then(({name}) => {
                dispatch(setModal(false))
                dispatch(setIsUpdateModal(false))
                dispatch(setUsers(users.map( user => {
                    if (user.id === board.id){
                        return ({
                            ...user,
                            name : name
                        })
                    } 
                    return {...user}
                })))
            })}
        else if (name === 'create task'){
            fetch(`http://localhost:8000/api/create_task/?id=${board.id}&task=${value}`)
            .then(resp => resp.json())
            .then(d => {
                dispatch(setModal(false))
                dispatch(setUsers(users.map( user =>{
                    if (user.id === board.id){
                        return d
                    }
                    else{
                        return user
                    }
                })))
            })
        }

        else if(name === 'create'){
            fetch(`http://localhost:8000/api/create_user/?name=${value}`)
            .then(resp => resp.json())
            .then(d => {
                dispatch(setModal(false))
                dispatch(setUsers([...users, d]))
            }) 
        }
    }
    
    const deleteBoard = (e, id) =>{
        fetch(`http://localhost:8000/api/delete?user_id=${board.id}`)
        .then(resp => resp.json())
        .then(data => {
        //   console.log(data)
          dispatch(setUsers(users.filter(user => id !== user.id)))
        })
    }
    
    
    if (isUpdateModal){
        return (
            <div className='modal'>
                <div className='content'>
                    <form onSubmit={handleSubmit}>
                        <p className='close' onClick={()=>{
                            dispatch(setModal(false))
                            dispatch(setIsUpdateModal(false))
                            }
                        }>X</p>
                        <label>
                            <h2>Change {board.name} </h2> 
                            <input 
                                type='text' 
                                name='update' 
                                autoFocus
                                placeholder='edit username'
                                />
                        </label> 
                    </form>            
                </div>
            </div>
        )
    }
            
    else if (isDeleteModal){
        return(
            <div className='modal'>
                <div className='content'>
                    <p  className='close' 
                        onClick={()=>{
                            dispatch(setModal(false))
                            dispatch(setIsDeleteModal(false))
                            }
                        }>X</p>
                    <p>Confirm delete ?</p>
                    <button className='yes' 
                            onClick={(e)=>{
                                deleteBoard(e, board.id)
                                dispatch(setModal(false))
                                dispatch(setIsDeleteModal(false))
                    }}>Yes</button>
                    <button className='no' 
                        onClick={()=>{
                        dispatch(setModal(false))
                        dispatch(setIsDeleteModal(false))
                    }}>No</button>
                </div>
            </div>
        )
    }
    
    else if (isTaskCreateModal){
        return(
            <div className='modal'>
                <div className='content'>
                    <form onSubmit={handleSubmit}>
                        <p 
                            className='close' 
                            onClick={()=>{
                                dispatch(setModal(false)) 
                                dispatch(setIsTaskCreateModal(false))
                            }}
                        >X</p>
                        <label>
                            <h2>New Task</h2> 
                            <input 
                                type='text' 
                                name='create task' 
                                autoFocus
                                placeholder='new task'
                                />
                        </label>
                    </form>            
                </div>
            </div>
        )
    }

    else if (isCreateModal){
        return(
            <div className='modal'>
                <div className='content'>
                    <form onSubmit={handleSubmit}>
                        <p 
                            className='close' 
                            onClick={()=>{
                                dispatch(setModal(false))
                                dispatch(setIsCreateModal(false))
                            }}
                        >X</p>
                        <label>
                            <h2>New User Name</h2> 
                            <input 
                                type='text' 
                                name='create' 
                                autoFocus
                                placeholder='new username'
                                />
                        </label>
                    </form>            
                </div>
            </div>
        )
    }
}

export default Modal
                                    
