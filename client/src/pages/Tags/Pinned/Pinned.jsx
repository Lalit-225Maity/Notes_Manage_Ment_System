import React from 'react'
import './Pinned.css'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { MdDelete } from "react-icons/md";
const Pinned = ({ setcount }) => {
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
      <div className="pin-section-notes">
        {pindata.length > 0 && pindata.map((i) => (
          <div className="pin-wrapper" style={{ backgroundColor: i.color }}>
            <h4>{i.tag}</h4>
            <div className="pin-para">
              <p className='title-para'>Title : {i.title}</p>
              <p>{i.content}</p>

            </div>
            <div className="pin-delete-download">
              <p>{new Date(i.updatedAt).toDateString()}</p>
              <button onClick={() => { }}><MdDelete className='icon_11'/>  </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default Pinned
