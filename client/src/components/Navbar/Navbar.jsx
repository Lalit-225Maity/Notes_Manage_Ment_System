import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { BsDot } from "react-icons/bs";
import { FaNotesMedical } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import './Navbar.css'
import { MdOutlineArrowDropDown } from "react-icons/md";
import axios from 'axios';
const Navbar = ({setcr}) => {
    const location = useLocation();
    const [val, setval] = useState('');
    const [oprndrop, setoprndrop] = useState(false);
    const [count, setcount] = useState(0)
useEffect(() => {
     (async()=>{
       try {
        const response=await axios.get('/api/fetchnote');
       
     setcount(response.data.length)
        
       } catch (error) {
        
       }
     })();
  }, [])
    useEffect(() => {
        if (location.pathname === '/') {
            setval('All Notes')
        }
        else if (location.pathname.includes('pin')) {
            setval('Pinned')
        }
    }, [location.pathname]);
    const [change, setchange] = useState('');
    const {
        register,
        watch,
    } = useForm();
    const {
        register: noteregister,
        handleSubmit: notesubmit, setValue: notevalue,
        reset: notereset,
        formState: { isSubmitting: notesubmitting }
    } = useForm();

    const color = [
        {
            col: "#E87F24"
        },
        {
            col: "#5E7AC4"
        },
        {
            col: "#2F6B3F"
        },
        {
            col: "#FF5A5A"
        },
        {
            col: "#85193C"
        },

    ]
    const createNote = async (data) => {
        await new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const response = await axios.post('/api/notes', data);
                    console.log(response.data);
                    setchange(false);
                    setcr(true);
                    resolve("Hi its Complete");

                } catch (error) {
                    console.log(error.response.data.message);
                    setcr(false);
                    reject();
                }
            }, 3000);
        })
    }
    return (
        <div className="navbar">
            <div className="nav-one">
                <h3>{val}</h3>
                <div className="nav-right">
                    <div className="search-bar">
                        <img src="/loupe (1).png" alt="Error" />
                        <input type="text" {...register("search")} />
                    </div>
                    <button onClick={() => { setchange(true) }}>
                        <FaNotesMedical />  New Note
                    </button>
                </div>
            </div>
            <div className="nav-two">
                <p><BsDot className='icon_1' />total {count}</p>
                <p><BsDot className='icon_2' />pinned</p>
                <p><BsDot className='icon_3' />showing</p>
            </div>
            {change && (
                <div className="popover">
                    <form onSubmit={notesubmit(createNote)}>
                        <div className="newnote">
                            <h4>New Note</h4>
                            <span onClick={() => { setchange(false) }}><RxCross2 className='icon_6' /></span>
                        </div>
                        <label>Title</label>
                        <input type="text" {...noteregister("title")} placeholder='Note Title' />
                        <label>Content</label>
                        <textarea type="text" {...noteregister("content")} placeholder='write your note here' />
                        <div className="tg-col">

                            <div className="tag-note" >
                                <label>Tag</label>
                                <div className="tag-inpt" onClick={() => { setoprndrop(true) }} > <input type="text" {...noteregister("tag")} defaultValue={"Personal"} /><MdOutlineArrowDropDown /></div>
                                {oprndrop && (
                                    <div className="tag-contents">
                                        <p onClick={(e) => { notevalue("tag", "Personal"); setoprndrop(false); e.stopPropagation() }}>Personal</p>
                                        <p onClick={(e) => { notevalue("tag", "Important"); setoprndrop(false); e.stopPropagation() }}>Important</p>
                                        <p onClick={(e) => { notevalue("tag", "Pinned"); setoprndrop(false); e.stopPropagation() }}>Pinned</p>
                                        <p onClick={(e) => { notevalue("tag", "Work"); setoprndrop(false); e.stopPropagation() }}>Work</p>
                                    </div>
                                )}
                            </div>



                            <div className="color-heading">
                                <label>Colors</label>
                                <div className="colors">
                                    {color.map((i) => (
                                        <label className="color-option">
                                            <input
                                                type="radio"
                                                value={i.col}
                                                {...noteregister("color")}
                                                onClick={(e) => { e.stopPropagation() }}
                                            />
                                            <span style={{ backgroundColor: i.col }}></span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                        </div>



                        <div className="add-cancel">
                            <button onClick={(e) => { setchange(false); }} type="button" className='cancel-btn'>Cancel</button>
                            <button type="submit">{notesubmitting ? (
                                <div className="loading">
                                    <div className="spin"></div>
                                    <p>creating....</p>
                                </div>
                            ) : "Add Note"}</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Navbar
