import React from 'react'
import axios from 'axios'
import './AllNotes.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { MdDelete } from "react-icons/md";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink
} from "@react-pdf/renderer";
const AllNotes = ({ cr }) => {
  const [allnotesdata, setallnotesdata] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/fetchnote');
        console.log(response.data);
        setallnotesdata(response.data)

      } catch (error) {

      }
    })();
  }, [cr])

  const MyPDF = ({ note }) => (
    <Document>
      <Page size="A4" style={{ fontSize: "12px", backgroundColor: note.color,alignItems:"center"}}>
        <View style={{ width: "100vw" }}>
          <Text style={{ color: "black", fontSize: "20px" }}>Lalit Nest</Text>
          <Text>Download in {new Date().toLocaleDateString()}</Text>
          <View style={{flexDirection: "row",gap:10}}>
            <Text>Title</Text>
            <Text>{note.title}</Text>
          </View>
          <View >
            <Text>{note.content}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
  const delete_note = (_id) => {
    setTimeout(async () => {
      const response = await axios.post('/api/deletenote', { _id });
      console.log(response.data);

    }, 3000);
  }
  return (
    <div className='all-notes'>
      <section>
        <span className="allnote-heading">
          <img src="/notes (1).png" alt="" />
          <h4>ALL NOTES</h4>
        </span>
        <div className="all-notes-section">
          {allnotesdata.length > 0 && allnotesdata.map((i) => (
            <div className="user-notes" style={{ backgroundColor: i.color }} id='myusernotes'>
              <div className="all-details-notes"  >
                <h4>{i.tag}</h4>
                <p className='title-name'>Title : {i.title}</p>
                <p>{i.content}</p>
              </div>
              <div className="edit-delete-pdf">
                <button onClick={() => { delete_note(i._id) }}><MdDelete className='icon_10' /></button>
                <PDFDownloadLink
                  document={<MyPDF note={i} />}
                  fileName={`note-${i._id}.pdf`}
                  className='pdf-btn'
                >
                  Download
                </PDFDownloadLink>
              </div>
            </div>

          ))}
        </div>
      </section>
    </div>
  )
}

export default AllNotes
