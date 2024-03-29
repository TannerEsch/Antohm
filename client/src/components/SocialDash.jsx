import React, {useContext, useEffect, useRef, useState, } from 'react'
import axios from 'axios'
import { DataContext } from '../App'
import {Post, Usercard} from './'
import handleFile from '../utils/FileUpload'
import { AiFillGithub, AiFillLinkedin  } from 'react-icons/ai';
import { RiTwitterFill } from 'react-icons/ri';
import { FaClipboardList } from 'react-icons/fa';
import { BiCamera } from 'react-icons/bi';

const SocialDash = () => {
  const {currentUser} = useContext(DataContext)
  const [profileModal, setProfileModal] = useState(false)
  const [posts, setPosts] = useState()
  
  useEffect(() => {
      axios.get(`https://thrive-server.herokuapp.com/user/${currentUser?.id}/posts`)
     .then(response => {
      setPosts(response.data.usersPosts.reverse().map((p, index) =>  <Post index={index} niche={p.niche} subNiche={p.subNiche} pfp={currentUser.pfp} image={p.image} postID={p._id} posterID={p.UserID._id} username={p.UserID.name} displayName={p.UserID.displayName} bookmarks={p.bookmarks} comments={p.comments} likes={p.likes} datePosted={p.date} content={p.content} sourced={p.sourced}    /> ))
     }).catch(err => console.log(err))
  }, [currentUser])

  function changeFeed(current) {
    switch (current) {
      case 'posts': 
      axios.get(`https://thrive-server.herokuapp.com/user/${currentUser?.id}/posts`)
     .then(response => {
      setPosts(response.data.usersPosts.reverse().map((p, index) =>  <Post index={index} niche={p.niche} subNiche={p.subNiche} pfp={currentUser.pfp} image={p.image} postID={p._id} posterID={p.UserID._id} username={p.UserID.name} displayName={p.UserID.displayName} bookmarks={p.bookmarks} comments={p.comments} likes={p.likes} datePosted={p.date} content={p.content} sourced={p.sourced}    /> ))
     }).catch(err => console.log(err))
     break;

      case 'likes':
        axios.get(`https://thrive-server.herokuapp.com/user/${currentUser?.id}/likes`)
        .then(response => {
         setPosts(response.data.usersLikes.reverse()?.map((p, index) =>  <Post index={index} niche={p.niche} subNiche={p.subNiche} pfp={p.likeTo.pfp} image={p.image} postID={p.likeOn._id} posterID={p.likeTo._id} username={p.likeTo.name} displayName={p.likeTo.displayName} bookmarks={p.likeOn.bookmarks} comments={p.likeOn.comments} likes={p.likeOn.likes} datePosted={p.likeOn.date} content={p.likeOn.content} sourced={p.likeOn.sourced}    /> ))
        }).catch(err => console.log(err))
        break;

      case 'comments':
        axios.get(`https://thrive-server.herokuapp.com/user/${currentUser?.id}/comments`)
        .then(response => {
          setPosts(response.data.usersComments.reverse()?.map((p, index) =>  <Post index={index} niche={p.niche} subNiche={p.subNiche} pfp={p.commentTo.pfp} image={p.image} postID={p._id} posterID={p.commentFrom._id} username={p.commentFrom.name} displayName={p.commentFrom.displayName} bookmarks={p.bookmarks} comments={p.comments} likes={p.likes} datePosted={p.postID.date} content={p.content} sourced={p.sourced}    /> ))
        }).catch(err => console.log(err))
        break;

      case 'bookmarks':
        axios.get(`https://thrive-server.herokuapp.com/user/${currentUser?.id}/bookmarks`)
        .then(response => {
          setPosts(response.data.usersBookmarks.reverse()?.map((p, index) =>  <Post niche={p.niche} subNiche={p.subNiche} pfp={p.bookmarkTo.pfp} image={p.image} postID={p.post._id} posterID={p.bookmarkTo._id} username={p.bookmarkTo.name} displayName={p.bookmarkTo.displayName} bookmarks={p.post.bookmarks} comments={p.post.comments} likes={p.post.likes} datePosted={p.post.date} content={p.post.content} sourced={p.post.sourced}    /> ))
        }).catch(err => console.log(err))
        break;
      // case 'following':
      //   axios.get(`https://thrive-server.herokuapp.com//user/${currentUser?.id}/following`)
      //   .then(response => {
      //     setPosts(response.data.usersFollowing.following.reverse()?.map((p, index) =>  <Post index={index} pfp={p.pfp} username={p.name} displayName={p.displayName} posterID={p._id} currentFeed={'following'} /> ))
      //   }).catch(err => console.log(err))
      //   break;
      // case 'followers':
      //   axios.get(`https://thrive-server.herokuapp.com/user/${currentUser?.id}/followers`)
      //   .then(response => {
      //     setPosts(response.data.usersFollowers.followers.reverse()?.map((p, index) =>  <Post index={index} pfp={p.pfp} username={p.name} displayName={p.displayName} posterID={p._id} currentFeed={'followers'} /> ))
      //     }).catch(err => console.log(err))
      //     break;
  }
}
  return (
    <>
      {profileModal? <EditProfileModal setProfileModal={setProfileModal}/> : null}
      <div className='fixed ml-64 mt-16 3xl:ml-24 2xl:ml-5 1.5xl:ml-0 lg:hidden' >
          <Usercard />
      </div>
    
    <div className='flex flex-col justify-center text-center lg:w-screen'>
      
    <div className='mx-auto w-[35%] border-gray-400 border-[1px] lg:w-screen '>
    <input type="file" id="file-input" className='invisible absolute' onChange={(e) => handleFile({"type": "header", "e": e, "userid": currentUser.id })} />
    <label htmlFor="file-input"><img src={currentUser.header} className='bg-gray-300 w-[100%] h-[8rem] cursor-pointer object-cover'/></label>
    

    <div className='bg-white h-[12rem] flex flex-col justify-end'>

      <div className='flex mb-4 ml-4 gap-2 cursor-pointer'>
      <div className='flex flex-col '>
      <div className='flex gap-4'>
      <label htmlFor="file-input"><img src={currentUser.pfp} className='bg-white border-[1px] mt-4 border-black cursor-pointer rounded-[50%] w-24 h-24'/></label>
      <input type="file" id="file-input" className='invisible absolute' onChange={(e) => handleFile({"type": "pfp", "e": e, "userid": currentUser.id })} />
      <div className='flex gap-3 items-end'>
      <div className='font-bold text-2xl'>{currentUser.name} <br /> <p className='font-bold ml-1 text-lg'>@{currentUser.displayName}</p> </div>
      <div onClick={() => setProfileModal(true)} className='bg-white rounded-3xl hover:bg-gray-300 border-blue-400 border-4 p-2 font-bold h-fit w-fit 3xs:px-[3px]'>Edit Profile</div>
      </div>
      </div>
      <div className='text-left w-[30rem] h-[5rem] mt-2 text-lg'>{currentUser?.bio ?? null}</div>
      </div>
      </div>
    <ul className='flex gap-16 justify-center text-lg font-bold border-gray-400 border-[1px] w-[100%] 2xl:gap-10 lg:gap-20 1.5xl:gap-5 md:gap-20 sm:gap-10 xs:gap-5 2xs:text-sm'>
      <li className="cursor-pointer hover:underline" onClick={(e) => changeFeed('posts')}>Posts</li>
      <li className="cursor-pointer hover:underline" onClick={(e) => changeFeed('likes')}>Likes</li>
      <li className="cursor-pointer hover:underline" onClick={(e) => changeFeed('comments')}>Comments</li>
      <li className="cursor-pointer hover:underline" onClick={(e) => changeFeed('bookmarks')}>Bookmarks</li>
    </ul>
    </div>
    {posts} 
    </div>

    </div>
   
  </>
  )
}

export default SocialDash

const EditProfileModal = ({setProfileModal}) => {
  const {currentUser} = useContext(DataContext)
  const twitterRef = useRef()
  const githubRef = useRef()
  const linkedinRef = useRef()
  const websiteRef = useRef()
  const bioRef = useRef()
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  function handleSubmit() {
    axios.put(`https://thrive-server.herokuapp.com/user/update/${currentUser.id}`, {
      linkedIn: linkedinRef.current.value,
      github: githubRef.current.value,
      twitter: twitterRef.current.value,
      website: websiteRef.current.value,
      bio: bioRef.current.value,
    })
    .then(() => {
    }).catch(err => console.log(err))
  }


  return(
    <>
    <div className='w-screen h-screen flex items-center justify-center absolute bg-transBlack'>
    <div className='absolute bg-white rounded-2xl border-gray-300 border-[1px] w-[18rem] h-fit'>

    <label htmlFor="header-input" className='cursor-pointer'><img src={currentUser.header} className='w-[100%] object-cover opacity-80 rounded-2xl h-16  rounded-br-none rounded-bl-none border-gray-400 border-b-black border-b-[1px]'/><div className='mt-[-3rem] mb-5 absolute ml-[1.2rem] text-2xl'><BiCamera/></div></label>
    <input type="file" id="header-input" className='hidden' onChange={(e) => handleFile({"type": "header", "e": e, "userid": currentUser.id })} />

    <div className='flex flex-col items-center gap-1 justify-center mt-[-3.5rem]'>
        <label htmlFor="pfp-input" className='cursor-pointer'><img src={currentUser.pfp} className=' rounded-[50%] opacity-80 outline outline-1 w-16 mt-5 mb-3'/><div className='mt-[-3rem] mb-5 absolute ml-[1.2rem] text-2xl'><BiCamera/></div></label>
        <input type="file" id="pfp-input" className='hidden' onChange={(e) => handleFile({"type": "pfp", "e": e, "userid": currentUser.id })} />
        <p className='font-bold text-xl underline'>Personal Info</p>
        <label  className='font-bold' htmlFor="name-input">Name</label>
        <input ref={nameRef} className='text-lg px-5 text-center border-2 rounded-xl border-gray-500 truncate' defaultValue={currentUser.name}/>
        <label className='font-bold' htmlFor="email-input">Email</label>
        <input ref={emailRef} className='text-lg px-5 text-center border-2 rounded-xl border-gray-500 truncate' defaultValue={currentUser.email}/>
        <label className='font-bold' htmlFor="password-input">Password</label>
        <input ref={passwordRef} className='text-lg px-5 text-center border-2 rounded-xl border-gray-500 truncate' defaultValue="*********"/>

        <label className='font-bold' htmlFor="bio">Bio</label>
        <input ref={bioRef} type="text" className='text-lg px-5 text-center border-2 rounded-xl border-gray-500 truncate' maxLength="140" id='bio' defaultValue={currentUser?.bio ?? 'add a bio!'} />

            <div className='flex flex-col items-center gap-3 border-t-black border-t-2 w-[100%] mt-2'>
            <p className='font-bold text-xl underline'>Public Links</p>
            <div className='flex flex-col items-center'>
            <div><AiFillGithub /> </div>
            <label className='font-bold' htmlFor="password-input">Github</label>
            <input ref={githubRef} className='text-lg px-5 text-center border-2 rounded-xl border-gray-500 truncate' defaultValue={currentUser?.github ?? 'add a link!'}/>
            </div>

            <div className='flex flex-col items-center'>
            <div><RiTwitterFill /> </div>
            <label className='font-bold' htmlFor="password-input">Twitter</label>
            <input ref={twitterRef} className='text-lg px-5 text-center border-2 rounded-xl border-gray-500 truncate' defaultValue={currentUser?.twitter ?? 'add a link!' }/>
            </div>

            <div className='flex flex-col items-center'>
            <div><AiFillLinkedin /> </div>
            <label  className='font-bold' htmlFor="password-input">LinkedIn</label>
            <input ref={linkedinRef} className='text-lg px-5 text-center border-2 rounded-xl border-gray-500 truncate' defaultValue={currentUser?.linkedin ?? 'add a link!'}/>
            </div>

            <div className='flex flex-col items-center'>
            <div><FaClipboardList /> </div>
            <label className='font-bold' htmlFor="password-input">Website</label>
            <input ref={websiteRef} className='text-lg px-5 text-center border-2 rounded-xl border-gray-500 truncate' defaultValue={currentUser?.website ?? 'add a link!'}/>
            </div>
            </div>
            <div className='flex font-bold text-md border-t-black border-t-2 w-[100%] justify-center mt-2'>
            <button onClick={() => setProfileModal(false)} className='bg-red-300 rounded-bl-2xl hover:bg-red-400 w-[50%]'>Discard Changes</button>
            <button onClick={handleSubmit} className='bg-blue-300 rounded-br-2xl hover:bg-blue-400 w-[50%]'>Save Changes</button>
            </div>
      </div>
    </div>
    </div>
    </>
  )

}