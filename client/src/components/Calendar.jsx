import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { BsFillTrashFill } from 'react-icons/bs';

function Calendar(props) {
  const [name, setName] = useState("January")
  const [year, setYear] = useState(2023)
  const [dateModalOpen, setDateModalOpen] = useState(1)
  const render = useRef(0)

const monthsNames = ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"]

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

function previousMonth() {
  if (render.current == 0) {
    render.current = 10
    setName(monthsNames[render.current])
    setYear(year - 1)
  }else {
  render.current = render.current - 1
  setName(monthsNames[render.current])
}
}

function nextMonth() {
  if (render.current == 10) {
    render.current = 0
    setName(monthsNames[render.current])
    setYear(year + 1)
  } else {
      render.current = render.current + 1
  setName(monthsNames[render.current])
  }

}

  return (
    <>
    <DateModal setDateModalOpen={setDateModalOpen}  dateModalOpen={dateModalOpen}/>
    <div className='mx-auto w-[60%] h-fit p-2 rounded-3xl shadow-2xl border-gray-500 border-2 bg-dimWhite'>
      <div className='flex items-center gap-4'>
      <div className='font-bold text-3xl mr-auto'>{year}</div>
      <div onClick={() => {setDateModalOpen(1)}} className='font-bold cursor-pointer text-[3rem]'>+</div>
      </div>
      <div className='flex gap-2 text-[3rem]'>
      <div onClick={previousMonth} className="mt-3 cursor-pointer ml-auto"> <AiOutlineArrowLeft/> </div>
      <div>{name}</div>
      <div onClick={nextMonth} className="mt-3 cursor-pointer mr-auto"><AiOutlineArrowRight/></div>      
      </div>

      <div className='flex flex-wrap w-[100%] justify-start ml-24 mb-6' >
      {months[render.current]?.map((d) => <div onClick={()=> setDateModalOpen([2, d, year, name])} className='w-[12rem] hover:bg-gray-200 cursor-pointer font-bold text-xl h-[12rem] border-black border-[1px]'>{d}</div> )}
      </div>

    </div>
    </>
  );
}

export default Calendar


const DateModal = (props) => {
  const {setDateModalOpen, dateModalOpen} = props
  return (
    <>
    {dateModalOpen?
    <div className='w-screen flex items-center justify-center h-screen absolute top-0 bg-transBlack'>
      <div className={`flex-col justify-center border-black border-2 items-center bg-white w-[20%] rounded-xl shadow-2xl ${dateModalOpen[0] == 2? "h-[30%]":"h-[40%]"}`}>
          <div className='text-2xl flex justify-center font-bold border-b-black border-b-2 h-fit w-[100%]'><h1 className='ml-auto'>{dateModalOpen == 1? "Add a date": dateModalOpen[0] == 2? dateModalOpen[3] + " " + dateModalOpen[1] + ", " + dateModalOpen[2]:null}</h1>
          <div onClick={()=> setDateModalOpen(false)} className='ml-auto mr-2 cursor-pointer'>x</div></div>
          {dateModalOpen == 1?
          <>
          <div className='flex flex-col items-center gap-2 mt-4'>
          <h1 className='font-bold text-2xl'>Select a date</h1>
          <input type="date" className='border-black border-2 rounded-lg mb-8'/>
          <h1 className='font-bold text-2xl'>Add a note for yourself</h1>
          <input type="text" className='w-[70%] border-black border-2 rounded-lg h-48' />
          </div>
          <div className='flex font-bold text-2xl justify-center mt-5'>
            <button className='mx-auto bg-red-300 p-4 rounded-xl hover:bg-red-400'>Discard</button>
            <button className='mx-auto bg-blue-300 hover:bg-blue-400 rounded-xl p-4'>Save Date</button>
          </div>
          </>
          :dateModalOpen[0] == 2?
          <>
          <h1 className='font-bold text-2xl pl-2 mt-2'>Stuff saved for this date:</h1>
          <div className='bg-white flex flex-col w-[90%] mt-4 h-52 mx-auto border-black border-2 overflow-y-scroll'>
            <div className='border-black border-2 h-20 p-2 hover:bg-gray-200 cursor-pointer'>
              <div className='flex gap-3'>
                
              <h1 className='font-bold'>Date name</h1>
              <div className='ml-auto'><FiEdit /></div>
              <div className='mr-2'><BsFillTrashFill /></div>
              </div>
              <p className='truncate'>date content jak;ldsf l;kajsdfk;lj a;sldkjf ;lkasjdfkl ja;slkdjf ;kld j</p>
            </div>
            <div className='border-black border-2 h-20 p-2 hover:bg-gray-200 cursor-pointer'>
              <h1>Date name</h1>
              <p className='truncate'>date content jak;ldsf l;kajsdfk;lj a;sldkjf ;lkasjdfkl ja;slkdjf ;kld j</p>
            </div>
            <div className='border-black border-2 h-20 p-2 hover:bg-gray-200 cursor-pointer'>
              <h1>Date name</h1>
              <p className='truncate'>date content jak;ldsf l;kajsdfk;lj a;sldkjf ;lkasjdfkl ja;slkdjf ;kld j</p>
            </div>
            <div className='border-black border-2 h-20 p-2 hover:bg-gray-200 cursor-pointer'>
              <h1>Date name</h1>
              <p className='truncate'>date content jak;ldsf l;kajsdfk;lj a;sldkjf ;lkasjdfkl ja;slkdjf ;kld j</p>
            </div>
            <div className='border-black border-2 h-20 p-2 hover:bg-gray-200 cursor-pointer'>
              <h1>Date name</h1>
              <p className='truncate'>date content jak;ldsf l;kajsdfk;lj a;sldkjf ;lkasjdfkl ja;slkdjf ;kld j</p>
            </div>
          </div>
          <div className='flex justify-center'><button className='font-bold text-black mt-2  border-blue-300 border-4 hover:bg-gray-200 rounded-xl p-4 text-2xl'>Add a note</button></div>
          </>
          :null
          }
      </div>
    </div>
    :null}
    </>
  )

}

