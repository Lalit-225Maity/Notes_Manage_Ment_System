import React from 'react'
import axios from 'axios'
import './AllNotes.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaNoteSticky } from 'react-icons/fa6'
const AllNotes = ({cr}) => {
const [allnotesdata, setallnotesdata] = useState([]);
  useEffect(() => {
     (async()=>{
       try {
        const response=await axios.get('/api/fetchnote');
        console.log(response.data);
        setallnotesdata(response.data);
        
       } catch (error) {
        
       }
     })();
  }, [cr])
  
  return (
    <div className='all-notes'>
      {allnotesdata.map((i)=>(
        <div className="all-user-notes" style={{backgroundColor:i.color}}>
         <div className="tag-user">
              {i.tag}
            </div>
           <h4>Title : {i.title}</h4>
            <p>{i.content}</p>
            
        </div>
      ))}
    </div>
  )
}

export default AllNotes
