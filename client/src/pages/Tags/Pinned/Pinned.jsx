import React from 'react'
import './Pinned.css'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
const Pinned = ({setcount}) => {
  const [pindata, setpindata] = useState([])
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/fetchnote');
         
        const check = response.data.filter((i) => {
          return i.tag === 'Pinned'
        })
       
        setcount(check.length)
        
        setpindata(check);
      } catch (error) {
        console.log(error.response.data.message);

      }
    })()
  }, [])
  return (
    <div className='pinned-notes'>
      {pindata.length > 0 && pindata.map((i) => (
        <div className="pin-wrapper" style={{ backgroundColor: i.color }}>
          <button>{i.tag}</button>
          <div className="pin-para">
            <h5>Title : {i.title}</h5>
            <p>{i.content}</p>
            
          </div>
           <div className="pin-delete-download">
              <p>{new Date(i.updatedAt).toDateString()}</p>
              <button onClick={() => { }}> <img src="/delete.png" alt="Error" /></button>

            </div>

        </div>
      ))}

    </div>
  )
}

export default Pinned
