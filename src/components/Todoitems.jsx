
// ToDoitems.jsx 

import React, { useRef, useState, useEffect } from 'react'
import Tick from '../assets/tick.png'
import NotTick from '../assets/not_tick.png'
import DeleteIcon from '../assets/delete.png'
import EditIcon from '../assets/edit.png'

let count = 0
const Todoitems = ({ task, id, status, edit, deleteItem, toggleItem, enableEdit, disableEdit, updateTask }) => {
  const [currentTask, setCurrentTask] = useState(task);
  const inputRef = useRef(null)
  const updateButtonRef = useRef(null); 

  useEffect(() => {
    if (edit) {
      disableEdit(id); // Call disableEdit if the component is mounted with edit mode active
    }
  }, []);
  
  return (
    <div className={`flex items-center my-3 gap-2 rounded-full ${edit ? 'bg-gray-200' : 'bg-transparent'}`}>
      <div className={`flex flex-1 items-center overflow-hidden `}>
        <img onClick={() => toggleItem(id)} src={status ? Tick : NotTick} alt="" className='w-7 cursor-pointer' />
        
        <input ref={inputRef} className={`text-slate-700 ml-4 text-[20px] font-semibold decoration-slate-500 w-full bg-transparent
              ${status ? 'line-through' : ''}  focus:outline-none`} value={currentTask} readOnly={!edit}
          
          onChange={(e) => {
            setCurrentTask(e.target.value)
          }}

          onBlur={(e)=>{
            if (updateButtonRef.current && updateButtonRef.current.contains(e.relatedTarget)) return;
            disableEdit(id)
            setCurrentTask(task)
          }}
        />
        
      </div>
      {
        edit ? (
          <button ref={updateButtonRef} className='border-none rounded-full bg-orange-600 text-white
                text-sm font-medium' 
                onClick={() => {
                  disableEdit(id)
                  if (currentTask && task !== currentTask) updateTask(id, currentTask)
                  else setCurrentTask(task)
                }}
                >
            Update
          </button>
        ) : (
         <>
          {
            !status ? (
              <img  onClick={() =>  {
                enableEdit(id)
                inputRef.current.focus()
              }} src={EditIcon} alt="" className='w-4 cursor-pointer' />
            ):(
              <></>
            )
          }
          <img onClick={() => deleteItem(id)} src={DeleteIcon} alt="" className='w-4 cursor-pointer' />
         </>
        )
      }
    </div>
  )
}

export default Todoitems
