import React, { useState, useRef, useEffect, useContext } from 'react';
import { DataContext } from '../App';
import axios from 'axios';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { BiNotepad } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { BsFillTrashFill } from 'react-icons/bs';

const monthsNames = ["January", "February", "March", "April", 'May', "June", "July", "August", "September", "October", "November", "December"]

const months =[
  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],

  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],

  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
  
  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],

  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],

  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  
  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],

  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],

  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],

  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],

  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],

  [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
]

export function Calendar() {
  const { currentUser } = useContext(DataContext)
  const [name, setName] = useState(monthsNames[new Date().getMonth() + 1])
  const [year, setYear] = useState(new Date().getFullYear())
  const [day, setDay] = useState(new Date().getDate())
  const [dateItems, setDateItems] = useState()
  const [editting, setEditting] = useState(false)
  const [areYouSure, setAreYouSure] = useState(false)
  const [dateModalOpen, setDateModalOpen] = useState(false)
  const [addDateModal, setAddDateModal] = useState(false)
  const [savedDates, setSavedDates] = useState([])
  const render = useRef(new Date().getMonth() + 1)

  
  
  useEffect(() => {
    axios.get(`http://localhost:8000/user/dates/${currentUser.id}`).then((res) => {
      setSavedDates(res.data.savedDates)
    })
  }, [])



function previousMonth() {
  if (render.current == 0) {
    render.current = 11
    setName(monthsNames[render.current])
    setYear(year - 1)
  }else {
  render.current = render.current - 1
  setName(monthsNames[render.current])
}
}

function nextMonth() {
  if (render.current == 11) {
    render.current = 0
    setName(monthsNames[render.current])
    setYear(year + 1)
  } else {
      render.current = render.current + 1
  setName(monthsNames[render.current])
  }

}

async function checkDate(date) {
  date = date.toLocaleDateString('zh-ch', {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })
 let dateString = date.toString().replace('/', '-').replace('/', '-')
  function checkit() {
    return new Promise((resolve, reject) => {
      savedDates?.forEach((item) => {
        if (item.date == dateString) {
          resolve(setDateModalOpen([2, item, dateString]))
        }
      })
      reject(false)
    })
  }
  try{
    await checkit()
  } catch (err) {
    setAddDateModal(dateString)
  }
}

function checkDate2(date){
  let dateLength;
  date = date.toLocaleDateString('zh-ch', {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })
 let dateString = date.toString().replace('/', '-').replace('/', '-')
  savedDates?.forEach((item) => {
    if (item.date == dateString) {
      dateLength = item.notes.length
    }
  })
  if (dateLength >= 1) {
  return dateLength + ' item(s)'
  }
}

  return (
    <>
    <AddDateModal addDateModal={addDateModal} setAddDateModal={setAddDateModal} />
    <ClickedDateModal setDateModalOpen={setDateModalOpen} addDateModal={addDateModal} setAddDateModal={setAddDateModal} setAreYouSure={setAreYouSure} dateModalOpen={dateModalOpen} setEditting={setEditting}/>
    <EdittingModal editting={editting} setEditting={setEditting}  />
    <MakeSure setAreYouSure={setAreYouSure} areYouSure={areYouSure}/>
    <div className='mx-auto w-[60%] h-fit p-2 rounded-3xl shadow-2xl border-gray-500 border-2 bg-dimWhite'>
      <div className='flex items-center gap-4'>
      <div className='font-bold text-3xl mr-auto'>{year}</div>
      <div onClick={() => setAddDateModal(true)} className='font-bold cursor-pointer text-[3rem]'>+</div>
      </div>
      <div className='flex gap-2 text-[3rem]'>
      <div onClick={previousMonth} className="mt-3 cursor-pointer ml-auto"> <AiOutlineArrowLeft/> </div>
      <div>{name}</div>
      <div onClick={nextMonth} className="mt-3 cursor-pointer mr-auto"><AiOutlineArrowRight/></div>      
      </div>

      <div className='flex flex-wrap w-[100%] justify-start ml-24 mb-6' >
        
      {months[render.current]?.map((d) => 
      <>
      <div onClick={()=> checkDate(new Date(`${name} ${d} ${year}`))} className='w-[12rem] hover:bg-gray-200 cursor-pointer font-bold text-xl h-[12rem] border-black border-[1px]'> <p className='bg-blue-300 text-2xl pl-1'>{d}</p> 
      <p className='bg-green-300'>{day? d==day && name == monthsNames[new Date().getMonth() + 1]? 'today':null:null}</p> 
       <div className='bg-red-300 pl-1 text-black'>{checkDate2(new Date(`${name} ${d} ${year}`))}</div>
      </div>
      </>
      )}
      </div>

    </div>
    </>
  );
}

export const SavedDates = ({setTaskOrDate}) => {
  const [dateModalOpen, setDateModalOpen] = useState(false)
  const [addDateModal, setAddDateModal] = useState(false)
  const [areYouSure, setAreYouSure] = useState(false)
  const [editting, setEditting] = useState(false)
  const {currentUser} = useContext(DataContext)
  const [savedDates, setSavedDates] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:8000/user/dates/${currentUser.id}`).then((res) => {
      setSavedDates(res.data.savedDates)
    })
  }, [])

  return(
    <>
    <ClickedDateModal setDateModalOpen={setDateModalOpen} dateModalOpen={dateModalOpen} setAreYouSure={setAreYouSure} setEditting={setEditting}/>
    <AddDateModal addDateModal={addDateModal} setAddDateModal={setAddDateModal} />
    <EdittingModal editting={editting} setEditting={setEditting} />
    <MakeSure setAreYouSure={setAreYouSure} areYouSure={areYouSure} />
  <div className=' w-[30rem] h-[40rem] m-5 mt-[15rem] bg-white absolute right-0 rounded-3xl shadow-2xl overflow-y-scroll' id="todolist">

<div className='flex justify-center items-center border-black border-b-[1px]'>
<div className= 'font-bold mt-4 text-[2rem] fixed '>Saved Dates</div>
<div className='ml-auto text-[2rem]' onClick={() => setTaskOrDate(1)}><BiNotepad/></div>
<div onClick={() => setAddDateModal(true)} className='text-[3rem] mr-4'> + </div>
</div>

{savedDates?.map((date) => 
<>  
<div onClick={() => setDateModalOpen([2, date])} className='p-2 border-[1px] border-gray-400 hover:bg-gray-300 cursor-pointer'> 
<h1 className='font-bold'>{date?.date}</h1>
<p>{date?.notes.length == 0? null: date.notes[0].content}</p>
</div>
</>  
)}

</div>
    </>
  )
}

const ClickedDateModal = ({setDateModalOpen, dateModalOpen, setEditting, setAreYouSure, addDateModal, setAddDateModal}) => {
  return(
  <>
  {dateModalOpen?
  <div className='w-screen flex items-center justify-center h-screen absolute top-0 bg-transBlack'>
  <div className={`flex-col justify-center border-black border-2 items-center bg-white w-[20%] rounded-xl shadow-2xl h-[30%]`}>
    <div className='text-2xl flex justify-center font-bold border-b-black border-b-2 h-fit w-[100%]'><h1 className='ml-auto'>{dateModalOpen[2]}</h1>
    <div onClick={()=> setDateModalOpen(false)} className='ml-auto mr-2 cursor-pointer'>x</div></div>
    <h1 className='font-bold text-2xl pl-2 mt-2'>Stuff saved for this date:</h1>
    <div className='bg-white flex flex-col w-[90%] mt-4 h-52 mx-auto border-black border-2 overflow-y-scroll'>
      {dateModalOpen[1].notes.map((note) =>
            <div className='border-black border-2 h-fit p-2 hover:bg-gray-200 cursor-pointer'>
        <div className='flex gap-3'>
          
        <div onClick={() => setEditting({'dateId': dateModalOpen[1]._id, "noteId":note._id})} className='ml-auto'><FiEdit /></div>
        <div onClick={() => setAreYouSure({'dateId': dateModalOpen[1]._id, "noteId":note._id})} className='mr-2'><BsFillTrashFill /></div>
        </div>
        <p>{note.content}</p>
      </div>
      )}
    </div>
    <div className='flex justify-center gap-4'>
    <button onClick={() => setAreYouSure({'dateId': dateModalOpen[1]._id})} className='font-bold text-black mt-2  border-red-300 border-4 hover:bg-gray-200 rounded-xl p-4 text-2xl'>Unsave date</button>
    <button onClick={() => setAddDateModal(dateModalOpen[2])} className='font-bold text-black mt-2  border-blue-300 border-4 hover:bg-gray-200 rounded-xl p-4 text-2xl'>Add a note</button>
    </div>
  </div>
  </div>
  :null}
</>
)
}

const AddDateModal = ({addDateModal, setAddDateModal}) => {
  const {currentUser} = useContext(DataContext)
  const [saved, setSaved] = useState([])
  const dateRef = useRef()
  const contentRef = useRef()
  useEffect(() => {
  axios.get(`http://localhost:8000/user/dates/${currentUser.id}`).then((res) => {
    setSaved(res.data.savedDates)
  })
  dateRef.current = addDateModal
  }, [])

  function addDate(e){
    let executed = false
    try{
  saved.forEach((date) => {
    if(date.date == addDateModal){
     axios.put(`http://localhost:8000/user/adddatenote/${currentUser.id}/${date._id}`, {"content": contentRef.current}).then(response=> console.log(response, "1"))
     executed = true
    throw new Error("stop")
    }
  }) 
  } catch (error) {
    console.log(error)
  }

  if(!executed){
    axios.put(`http://localhost:8000/user/date/${currentUser.id}`, {"date": `${dateRef?.current? dateRef.current: addDateModal}`, "notes": contentRef.current}).then(response=> console.log(response, "2"))
  }
  }

  return (
    <>
    {addDateModal?
      <>
      <div className='w-screen flex items-center justify-center h-screen absolute z-10 top-0 bg-transBlack'>
      <div className={`flex-col justify-center border-black border-2 items-center bg-white w-[20%] rounded-xl shadow-2xl h-[40%]"}`}>
      <div className='text-2xl flex justify-center font-bold border-b-black border-b-2 h-fit w-[100%]'><h1 className='ml-auto'>Add a date</h1>
      <div onClick={()=> setAddDateModal(false)}  className='ml-auto mr-2 cursor-pointer'>x</div></div>
      <div className='flex flex-col items-center gap-2 mt-4'>
      <h1 className='font-bold text-2xl'>Select a date</h1>
      <input type="date" defaultValue={addDateModal?addDateModal:null} onChange={(e) => dateRef.current = e.target.value } className='border-black border-2 rounded-lg mb-8'/>
      <h1 className='font-bold text-2xl'>Add a note for yourself</h1>
      <input type="text" onChange={(e) => contentRef.current = e.target.value } className='w-[70%] border-black border-2 rounded-lg h-48' />
      </div>
      <div className='flex font-bold text-2xl justify-center mt-5 mb-2'>
        <button onClick={()=> setAddDateModal(false)} className='mx-auto bg-red-300 p-4 rounded-xl hover:bg-red-400'>Discard</button>
        <button onClick={addDate} className='mx-auto bg-blue-300 hover:bg-blue-400 rounded-xl p-4'>Save Date</button>
      </div>
      </div>
      </div>
      </>
      :null}
      </>
  )
} 





const EdittingModal = ({setEditting, editting}) => {
  const {currentUser} = useContext(DataContext)
  const [date, setDate] = useState()
  const newNoteRef = useRef()

  const handleUpdate = () => {
    axios.put(`http://localhost:8000/user/date/${currentUser.id}/${editting.noteId}`, {"content": newNoteRef.current}).then((res) => {
      console.log(res)
    })
  }

  return (
    <>
    {editting?
    <div className='w-screen h-screen flex items-center justify-center absolute z-[100]'>
    <div className='flex-col text-center mb-52 bg-red-300 p-2 rounded-xl scale-[1.5]'>
    <div className='flex flex-col justify-center'>
    
    <div>
    <label htmlFor='note' className='font-bold text-xl '>Edit note</label><br />
    <input id='note' type="text" onChange={(e) => newNoteRef.current = e.target.value} />
    </div>

    </div>
    <div className='flex justify-evenly'>
    <button onClick={() => setEditting(false)} className='bg-red-400 p-1 font-bold rounded-lg'>Discard Changes</button>
    <button onClick={() => handleUpdate(false)} className='bg-blue-300 p-1 font-bold rounded-lg'>Update</button>
    </div>
    </div>
    </div>
    :null}
    </>
  )
}

const MakeSure = ({setAreYouSure, areYouSure}) => {    
  const {currentUser} = useContext(DataContext)
  console.log(areYouSure)
  function deleteNote(){
    axios.delete(`http://localhost:8000/user/deletedatenote/${currentUser.id}/${areYouSure.dateId}/${areYouSure.noteId}`).then(response=> console.log(response))
    }
  function deleteDate() {
    axios.delete(`http://localhost:8000/user/date/${currentUser.id}/${areYouSure.dateId}/delete`).then(response=> console.log(response))
  }

  function checkWhich() {
    if(areYouSure.noteId){
      deleteNote()
      setAreYouSure(false)
    } else {
      deleteDate()
      setAreYouSure(false)
    }
  }

  function Archive() {
    axios.put(`http://localhost:8000/user/archive/${currentUser.id}/${areYouSure.dateId}`, {
      "item": "date"
    }).then(response=> console.log(response))
  }
  return (

    <>
    {areYouSure?
    <div className='w-screen h-screen flex items-center justify-center absolute z-[100]'>
    <div className='flex-col text-center mb-52 bg-red-300 p-2 rounded-xl scale-[1.5]'>
    <div className='flex justify-center'>
    <h1 className='font-bold text-xl ml-auto'>Are you sure?</h1>
    <div onClick={() => setAreYouSure(false)} className='ml-auto mb-2 font-bold mr-2 cursor-pointer'>x</div>
    </div>
    <p className='font-bold'>If you delete this {areYouSure.noteId? "note" : "date"}, you can't recover it.</p>
    <div className='flex justify-evenly'>
    {areYouSure.noteId? null :<button onClick={Archive} className='bg-blue-300 p-1 font-bold rounded-lg'>Archive</button>}
    <button onClick={checkWhich} className='bg-red-400 p-1 font-bold rounded-lg'>Delete</button>
    </div>
    </div>
    </div>
    :null}
    </>
  )
}

