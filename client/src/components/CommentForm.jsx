import React, {useState, useContext, useRef} from 'react'
import axios from 'axios';
import { DataContext } from '../App'
import { AiOutlineFileGif, AiFillPicture } from 'react-icons/ai';
import { GrEmoji } from 'react-icons/gr';

const commentForm = (props) => {
    const {posterID, postID} = props
    const {currentUser} = useContext(DataContext)
    const postForm = useRef()

    const handleSubmit = () => {
        axios.put(`https://thrive-server.herokuapp.com/post/comment/${postID}/${currentUser.id}/${posterID}`, {"content": postForm.current.value})
        .then(response => {
              console.log('success')
        })
    }
    

  return (
    <>
    <div className='border-black border-[1px] h-fit p-4 bg-white'>

        <div onClick={handleSubmit} className=' relative cursor-pointer ml-auto mr-2 top-[7.5rem] bg-blue-500 h-10 w-24 text-center text-white font-bold p-2 rounded-3xl'>post</div>

<input type="text" className='border-black border-[1px] rounded-3xl w-[100%] h-32 text-center' ref={postForm} placeholder='Send a comment!' />
<div className='flex gap-4 relative mt-[-1.2rem] ml-5'>
    <div><AiOutlineFileGif /></div>
    <div><AiFillPicture /></div>
    <div><GrEmoji /></div>
</div>


    </div>
  </>
  )
}

export default commentForm