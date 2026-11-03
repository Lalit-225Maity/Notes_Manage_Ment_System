import React from 'react'
import './Pinned.css'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
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
    <main className='pinned-notes'>
      <header className="pinned-heading">
        <div className="pinned-heading-icon" aria-hidden="true">✦</div>
        <div>
          <p className="pinned-eyebrow">YOUR COLLECTION</p>
          <h1>Pinned notes <span>{pindata.length}</span></h1>
          <p className="pinned-subtitle">Keep your most important thoughts close at hand.</p>
        </div>
      </header>
      <div className="pin-section-notes">
        {pindata.length > 0 ? pindata.map((i) => (
          <article className="pin-wrapper" style={{ '--note-color': i.color || '#e3bd72' }} key={i._id}>
            <span className="pin-tag">{i.tag}</span>
            <div className="pin-para">
              <h2 className='title-para'>{i.title}</h2>
              <p className="pin-content">{i.content}</p>

            </div>
            <div className="pin-delete-download">
              <time dateTime={i.updatedAt}>{new Date(i.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</time>

            </div>

          </article>
        )) : (
          <div className="pinned-empty">
            <span aria-hidden="true">✦</span>
            <h2>No pinned notes yet</h2>
            <p>Notes tagged as pinned will appear here for quick access.</p>
          </div>
        )}

      </div>
    </main>
  )
}

export default Pinned
