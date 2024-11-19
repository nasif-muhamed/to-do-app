// Todo.jsx 

import React from 'react'
import todo_icon from '../assets/todo_icon.png'
import Todoitems from './Todoitems'
import { useRef, useState, useEffect } from 'react'

function Todo() {

    const inputRef = useRef()
    const [toDoList, setToDoList] = useState(localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [])

    useEffect(()=>{
        localStorage.setItem('tasks', JSON.stringify(toDoList))
    }, [toDoList])

    const add = () => {
        const inputText = inputRef.current.value.trim();
        if (inputText === '') {return null}

        const newTodo = {
            id: Date.now(),
            task: inputText,
            status: false,
            edit: false
        }

        setToDoList((prevList) => [...prevList, newTodo]);
        inputRef.current.value = '';
    }

    const deleteItem = (id) => {
        setToDoList((prevList) => prevList.filter(item => item.id !== id))
    }

    const toggleItem = (id) => {
        setToDoList((prevList) => {
            return prevList.map(item => {
                if (id === item.id){
                    return {...item, status: !item.status}
                } 
                return item
            })
        })
    }

    const enableEdit = (id) => {
        setToDoList((prevList)=> {
            return prevList.map(item=>{
                if (item.id === id){
                    return {...item, edit: true}
                }
                return item
            })
        })
    } 

    const disableEdit = (id) => {
        console.log('disableEdit')
        setToDoList((prevList)=> {
            return prevList.map(item=>{
                if (item.id === id){
                    return {...item, edit: false}
                }
                return item
            })
        })
    }

    const updateTask = (id, currentTask) => {
        setToDoList((prevList)=> {
            return prevList.map(item=>{
                if (item.id === id){
                    return {...item, task: currentTask}
                }
                return item
            })
        })
    }

    return (
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7
         min-h-[550px] rounded-xl text-black'>
            {/* ---------- Title ----------- */}
            <div className='flex itmes-center mt-7 gap-2 '>
                <img className='w-8' src={todo_icon} alt="" />
                <h1 className='text-3xl font-semibold select-none'>To-Do List</h1>
            </div>

            {/* ---------- input box ----------- */}
            <div className='flex items-center my-7 bg-gray-200 rounded-full'>
                <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 
                pr-2 placeholder:text-slate-600' type="text" placeholder='Add your task' />

                <button className='border-none rounded-full bg-orange-600 w-32 h-14 text-white
                text-lg font-medium' onClick={add}>Add+</button>
            </div>

                {/* ---------- input box ----------- */}
                <div className='overflow-y-auto max-h-[300px] custom-scrollbar'>

                    {toDoList.map((obj, index)=>{
                        return <Todoitems key={index} task={obj.task} id={obj.id} 
                        status={obj.status} edit = {obj.edit} deleteItem={deleteItem} toggleItem={toggleItem} enableEdit = {enableEdit} disableEdit = {disableEdit} updateTask = {updateTask} />
                    })}

                </div>
        </div>
    )
}

export default Todo
