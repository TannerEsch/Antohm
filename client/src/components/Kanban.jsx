import React, { useContext, useState, useRef } from 'react'
import axios from 'axios'
import { DataContext } from '../App'
import { useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import { BsFillTrashFill } from 'react-icons/bs';

const Kanban = () => {
  const {currentUser} = useContext(DataContext)
  const [userTasks, setUserTasks] = useState()
  const [taskModal, setTaskModal] = useState(false)
  const [makeSureModal, setMakeSureModal] = useState(false)
  useEffect(() => {
    axios.get(`http://localhost:8000/user/tasks/${currentUser.id}`).then(response => setUserTasks(response.data.userTasks.tasks)).catch(err => {throw err}) 
    


    // const draggables = document.querySelectorAll('.kanban-listitem-draggable')
    // const containers = document.querySelectorAll('.kanban-inside-containers')
    // draggables.forEach(draggable => {
    //   draggable.addEventListener('dragstart', () => {
    //     draggable.classList.add('dragging')
    //     console.log("dragginx")
    //   })
    //   draggable.addEventListener('dragend', () => {
    //     draggable.classList.remove('dragging')
    //   })
    // })

    // containers.forEach(container => {
    //   container.addEventListener('dragover', e => {
    //     e.preventDefault()
    //     const afterElement = getDragAfterElement(container, e.clientY)
    //     const draggable = document.querySelector('.dragging')
    //     if(draggable == null){
    //       container.appendChild(draggable)
    //     } else {
    //       container.insertBefore(draggable, afterElement)
    //     }
    //   })
    // })

    // function getDragAfterElement(container, y) {
    //  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    //  return draggableElements.reduce((closest, child) => {
    //   const box = child.getBoundingClientRect()
    //   const offset = y - box.top - box.height / 2
    //   if(offset < 0 && offset > closest.offset) {
    //     return { offset: offset, element: child}
    //   } else {
    //       return closest
    //     }
    //  }, {offset: Number.NEGATIVE_INFINITY}).element
    // } 
  }, [])

  return (
    <>
    <TaskItemModal setTaskModal={setTaskModal} taskModal={taskModal} makeSureModal={makeSureModal} setMakeSureModal={setMakeSureModal}/>
    <MakeSure makeSureModal={makeSureModal} setMakeSureModal={setMakeSureModal} />
    <div className='mx-auto bg-dimWhite w-[60%] h-[80vh] rounded-xl border-gray-400 border-2 shadow-2xl'>
      <h1 className='font-bold text-center pt-4 text-3xl'>Welcome To your Kanban</h1>

      <div className='flex text-4xl mr-4 gap-4 mt-[-2rem] mb-6'>
      <div className='text-[5rem] ml-auto'> + </div>
      </div>

      <div className='flex h-[75%] gap-32 items-center justify-center'>
        <div className='h-[100%] w-[25%] rounded-xl bg-white shadow-2xl border-2 border-gray-400'>
            <h1 className='font-bold underline text-3xl text-center'>Todo</h1>

         <div className='kanban-todo-list'>
          {userTasks?.map(task => 
            <>
          {task.status == 'To Do' ?
          <div onClick={() => setTaskModal(task)} className='mt-3 cursor-pointer h-20 border-[1px] border-gray-500 hover:bg-gray-300'>
          <div className='pl-4 font-bold text-xl' draggable="true">{task.taskName}</div>
                <div className='flex'>
                <div className='pl-4'>{task.task}</div>
                <div className='ml-auto mr-2 bg-gray-400 rounded-xl text-white font-bold p-1'>{task.importance}</div>
                </div>
              </div>
              : null}
            </>
          )} 
         </div>
        </div>

        <div className='h-[100%] w-[25%] rounded-xl bg-white shadow-2xl border-2 border-gray-400'>
            <h1 className='font-bold underline text-3xl text-center'>In progress</h1>

         <div className='kanban-todo-list'>
          {userTasks?.map(task => 
            <>
            {task.status == 'In Progress' ?
          <div onClick={() => setTaskModal(task)} className='mt-3 cursor-pointer h-20 border-[1px] border-gray-500 hover:bg-gray-300'>
                <div className='pl-4 font-bold text-xl' draggable="true">{task.taskName}</div>
                <div className='flex'>
                <div className='pl-4'>{task.task}</div>
                <div className='ml-auto mr-2 bg-gray-400 rounded-xl text-white font-bold p-1'>{task.importance}</div>
                </div>
              </div>
              : null}
            </>
          )} 
         </div>
        </div>

        <div className='h-[100%] w-[25%] rounded-xl bg-white shadow-2xl border-2 border-gray-400'>
            <h1 className='font-bold underline text-3xl text-center'>Finished</h1>

         <div className='kanban-todo-list'>
          {userTasks?.map(task => 
            <>
          {task.status == 'Finished' ?
          <div onClick={() => setTaskModal(task)} className='mt-3 cursor-pointer h-20 border-[1px] border-gray-500 hover:bg-gray-300'>
          <div className='pl-4 font-bold text-xl' draggable="true">{task.taskName}</div>
                <div className='flex'>
                <div className='pl-4'>{task.task}</div>
                <div className='ml-auto mr-2 bg-gray-400 rounded-xl text-white font-bold p-1'>{task.importance}</div>
                </div>
              </div>
              : null}
            </>
          )} 
         </div>
        </div>
        </div>

    </div>
    </>
  )
}

export default Kanban

const TaskItemModal = ({taskModal, setTaskModal, makeSureModal, setMakeSureModal}) => {
  const {currentUser} = useContext(DataContext)
  const [addNoteModal, setAddNoteModal] = useState(false)
  return (
    <>
    <AddNote addNoteModal={addNoteModal} setAddNoteModal={setAddNoteModal} />
    {taskModal?
  <div className='w-screen flex items-center justify-center h-screen absolute top-0 bg-transBlack'>
  <div className='flex-col justify-center border-black border-2 items-center bg-white w-[30%] rounded-xl shadow-2xl h-fit'>
    <div className='text-2xl flex justify-center font-bold border-b-black border-b-2 h-fit w-[100%]'><h1 className='ml-auto'>{taskModal.taskName}</h1>
    <div onClick={()=> setTaskModal(false)} className='ml-auto mr-2 cursor-pointer'>x</div>
    </div>

    <h1 className='font-bold text-2xl pl-2 mt-2'>Task:</h1>
    <div className='bg-white w-[90%] p-2 mt-4 h-fit mx-auto border-black border-2 cursor-pointer hover:bg-gray-200'>

        <div className='flex'>
        <p className='text-2xl font-bold'>{taskModal.taskName}</p>
        <div className='text-xl ml-auto font-bold'><FiEdit /></div>
        </div>
        <p className='text-xl font-bold'>{taskModal.task}</p>
        
    </div>

    <h1 className='font-bold text-2xl pl-2 mt-2'>Subtasks:</h1>
    <div className='bg-white flex flex-col w-[90%] mt-4 h-52 mx-auto border-black border-2 overflow-y-scroll'>
      {taskModal.notes.map((note) =>
            <div className='border-black border-2 h-fit p-2 hover:bg-gray-200 cursor-pointer'>
        <div className='flex gap-3'>
          
        <div className='ml-auto'><FiEdit /></div>
        <div onClick={() => setMakeSureModal({"noteId": note._id, "taskId": taskModal._id})}className='mr-2'><BsFillTrashFill /></div>
        </div>
        <p>{note.content}</p>
      </div>
      )}

    </div>
    <div className='flex justify-center gap-4 mb-1'>
    <button className='font-bold text-black mt-2  border-red-300 border-4 hover:bg-gray-200 rounded-xl p-4 text-2xl'>Unsave date</button>
    <button onClick={()=> setAddNoteModal(taskModal)} className='font-bold text-black mt-2  border-blue-300 border-4 hover:bg-gray-200 rounded-xl p-4 text-2xl'>Add a note</button>
    </div>
  </div>
  </div>
    : null}
    </>
  )
}

const AddNote = ({addNoteModal, setAddNoteModal}) => {
  const {currentUser} = useContext(DataContext)
  const noteRef = useRef()
  const handleNewNote = () => {
    axios.put(`http://localhost:8000/user/tasknote/${currentUser.id}/${addNoteModal._id}`, {"note": noteRef.current}).then(response => console.log(response)) 
  }
  console.log(addNoteModal)

  return (
    <>
    {addNoteModal?
      <>
      <div className='w-screen flex items-center justify-center h-screen absolute z-10 top-0 bg-transBlack'>
      <div className={`flex-col justify-center border-black border-2 items-center bg-white w-[20%] rounded-xl shadow-2xl h-[40%]"}`}>
      <div className='text-2xl flex justify-center font-bold border-b-black border-b-2 h-fit w-[100%]'><h1 className='ml-auto'>Add a note</h1>
      <div onClick={()=> setAddNoteModal(false)}  className='ml-auto mr-2 cursor-pointer'>x</div></div>
      <div className='flex flex-col items-center gap-2 mt-4'>

      <h1 className='font-bold text-2xl'>Note:</h1>
      <input type="text" onChange={(e) => noteRef.current = e.target.value } className='w-[70%] border-black border-2 rounded-lg h-48' />
      </div>
      <div className='flex font-bold text-2xl justify-center mt-5 mb-2'>
        <button onClick={()=> setAddNoteModal(false)} className='mx-auto bg-red-300 p-4 rounded-xl hover:bg-red-400'>Discard</button>
        <button onClick={handleNewNote} className='mx-auto bg-blue-300 hover:bg-blue-400 rounded-xl p-4'>Save Note</button>
      </div>
      </div>
      </div>
      </>
      :null}
      </>
  )
} 

const MakeSure = ({setMakeSureModal, makeSureModal, setSuccess, setError }) => {    
  const {currentUser} = useContext(DataContext)
  console.log(makeSureModal)
  function deleteNote(){
     axios.delete(`http://localhost:8000/user/deletenote/${currentUser._id}/${makeSureModal.taskId}/${makeSureModal.noteId}`).then(response=> console.log(response) ).catch((errir) => console.log(errir))
    }
    // router.delete('/deletenote/:userID/:taskID/:noteID', ctrls.user.deleteNoteFromTask);

  function Archive() {
    axios.put(`http://localhost:8000/user/archive/${currentUser.id}/${makeSureModal.taskId}`, {
      "item": "task"
    }).then(response=> console.log(response) ).catch((errir) => console.log(errir))
  }
  return (

    <>
    {makeSureModal?
    <div className='w-screen h-screen flex items-center justify-center absolute z-[100]'>
    <div className='flex-col text-center mb-52 bg-red-300 p-2 rounded-xl scale-[1.5]'>
    <div className='flex justify-center'>
    <h1 className='font-bold text-xl ml-auto'>Are you sure?</h1>
    <div onClick={() => setMakeSureModal(false)} className='ml-auto mb-2 font-bold mr-2 cursor-pointer'>x</div>
    </div>
    <p className='font-bold'>If you delete this note, you can't recover it.</p>
    <div className='flex justify-evenly'>
    <button onClick={Archive} className='bg-blue-300 p-1 font-bold rounded-lg'>Archive</button>
    <button onClick={deleteNote} className='bg-red-400 p-1 font-bold rounded-lg'>Delete</button>
    </div>
    </div>
    </div>
    :null}
    </>
  )
}
