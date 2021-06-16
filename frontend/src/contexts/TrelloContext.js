import React, {createContext, useReducer} from 'react'

const initialState = {
    users : [],
    modal : false,
    isCreateModal : false,
    isDeleteModal : false,
    isUpdateModal : false,
    isTaskCreateModal : false,
    board :{
        id : '',
        name : '',
        tasks : []
    },
}

const Store = createContext(initialState)
const {Provider} = Store

const StoreProvider = ({children}) =>{
    const [state, dispatch] = useReducer((state, action)=>{
        const {type, payload} = action
        switch(type){
            case 'SET_USERS':
                return {...state, users : payload }
            case 'SET_MODAL':
                return {...state, modal : payload }
            case 'SET_CREATE_MODAL':
                return {...state, isCreateModal : payload }
            case 'SET_DELETE_MODAL':
                return {...state, isDeleteModal : payload }
            case 'SET_UPDATE_MODAL':
                return {...state, isUpdateModal : payload }
            case 'SET_BOARD':
                return {...state, board : payload }
            case 'SET_TASK':
                return {...state, isTaskCreateModal : payload }
            default:
                return new Error('Dispatch Not Mentioned')
        }
    },initialState)

    return <Provider value={{state, dispatch}}>{children}</Provider>
}

export const setUsers = payload => ({type : 'SET_USERS', payload : payload})
export const setModal = payload => ({type : 'SET_MODAL', payload : payload})
export const setIsCreateModal = payload => ({type : 'SET_CREATE_MODAL', payload : payload})
export const setIsDeleteModal = payload => ({type : 'SET_DELETE_MODAL', payload : payload})
export const setIsUpdateModal = payload => ({type : 'SET_UPDATE_MODAL', payload : payload})
export const setBoard = payload => ({type : 'SET_BOARD', payload : payload})
export const setIsTaskCreateModal = payload => ({type : 'SET_TASK', payload : payload})

export {StoreProvider, Store}