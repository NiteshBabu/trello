import React, {useEffect, useContext} from 'react';

import './trello.css'

import newUserIcon from './static/new-user.png'

import Board from './components/board/Board'
import Modal from './components/modal/Modal'

import { Store, setUsers, setModal, setIsCreateModal } from './contexts/TrelloContext'

function Trello() {
  const {state, dispatch} = useContext(Store)
  const {users, modal} = state

  const fetchUsers = () =>{
    fetch('http://localhost:8000/api/users/')
    .then(resp => resp.json())
    .then(data => {
      dispatch(setUsers(data))
    })
  }
  
  useEffect(fetchUsers, [])

  return (
    <div className="screen">
      <div 
            className='new-btn' 
            onClick={() => {
              dispatch(setIsCreateModal(true))
              dispatch(setModal(true))
            }}
        >
          <img src={newUserIcon} className='new-user' alt='New User Board'></img>
      </div>
      {modal && <Modal />}
      {users.map( user => <Board {...user} key={user.id}/> )}
    </div>
  );
}

export default Trello;
