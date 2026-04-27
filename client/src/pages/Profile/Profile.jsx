import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Cell, Scatter, Area, Line } from 'recharts';

import axios from 'axios'
import './Profile.css'
const Profile = () => {
  const [val, setval] = useState([])
  const [workdetail, setworkdetail] = useState([])
  const [imp, setimp] = useState([])
  const [personals, setpersonals] = useState([])
  const [userProfile, setuserProfile] = useState(null)

  useEffect(() => {
    const Item = localStorage.getItem("Profile");
    if (Item) {
      setuserProfile(JSON.parse(Item));

    }
  }, [])
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/fetchnote');
        const checkvalue = response.data.filter((i) => {
          return i.tag === 'Pinned'
        })
        setval(checkvalue);
        const personal_val = response.data.filter((i) => {
          return i.tag === 'Personal'
        })
        setpersonals(personal_val)
        const Important_values = response.data.filter((i) => {
          return i.tag === 'Important'
        })

        setimp(Important_values)
        setworkdetail(response.data.filter(i => i.tag === 'Work'))


      } catch (error) {
        console.log(error);

      }
    })();
  }, [])

  const data = [
    { name: "Pinned", note: val.length, color: "#E87F24" },
    { name: "Personal", note: personals.length, color: "#5E7AC4" },
    { name: "Important", note: imp.length, color: "#FF5A5A" },
    { name: "Work", note: workdetail.length, color: "#85193C" }


  ];

  return (
    <div className='user-profile'>
      <div className="user-details">
        {userProfile &&
          <div className="profile-detail">
            <div className="profile-user" >
              <button>{userProfile.name.charAt(0)}</button>
              <div className="user-other-details">
                <h4>{userProfile.name}</h4>
                <p>Email ID : {userProfile.emailID}</p>
                <p>Phone Number : {userProfile.phoneNumber}</p>
              </div>
            </div>
            <BarChart
              style={{ width: '60%', maxHeight: '60vh', aspectRatio: 1.618 }}
              responsive
              data={data}

              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
             
              <XAxis dataKey="name" />
              <YAxis width={50} domain={[0, 'auto']}   allowDecimals={false}
              />
              <Tooltip />

              <Bar dataKey="note" activeBar={false} radius={[10, 10, 0, 0]} maxBarSize={60} >
                {data.map((i, key) => (
                  <Cell key={key} fill={i.color} />
                ))}
              </Bar>


            </BarChart>
            <ComposedChart
              style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
              responsive
              data={data}
              margin={{
                top: 20,
                right: 0,
                bottom: 0,
                left: 0,
              }}
            >
            
              <XAxis dataKey="name" scale="band" />
              <YAxis width="auto" niceTicks="snap125" domain={[0, 'auto']}   allowDecimals={false}/>
              <Tooltip />

              <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
              <Bar dataKey="note" maxBarSize={60}   >
                {data.map((i, key) => (
                  <Cell key={key} fill={i.color} />
                ))}
              </Bar>
              <Line type="monotone" dataKey="note" stroke="#ff7300" />


            </ComposedChart>


          </div>
        }
      </div>


    </div>
  )
}

export default Profile
