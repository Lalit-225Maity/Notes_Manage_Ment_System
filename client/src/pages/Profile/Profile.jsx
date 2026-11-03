import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';

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
  const totalNotes = data.reduce((total, item) => total + item.note, 0);

  return (
    <main className='user-profile'>
      <div className="user-details">
        <header className="profile-page-heading">
          <div>
            <p className="profile-eyebrow">ACCOUNT OVERVIEW</p>
            <h1>Your profile</h1>
            <p className="profile-subtitle">A quick look at your notes and how they’re organized.</p>
          </div>
          <div className="profile-total"><span>{totalNotes}</span><small>notes saved</small></div>
        </header>

        {userProfile && (
          <section className="profile-detail" aria-label="Profile details and note activity">
            <div className="profile-user">
              <div className="profile-avatar" aria-hidden="true">{userProfile.name?.charAt(0) || '?'}</div>
              <div className="user-other-details">
                <span className="profile-label">YOUR ACCOUNT</span>
                <h2>{userProfile.name}</h2>
                <p>{userProfile.emailID}</p>
                <p>{userProfile.phoneNumber}</p>
              </div>
            </div>

            <div className="profile-stats" aria-label="Notes by category">
              {data.map((item) => (
                <div className="profile-stat" key={item.name} style={{ '--stat-color': item.color }}>
                  <span>{item.name}</span>
                  <strong>{item.note}</strong>
                </div>
              ))}
            </div>

            <div className="profile-charts">
              <section className="profile-chart-card">
                <div className="profile-chart-heading">
                  <div><span>COLLECTION</span><h2>Notes by category</h2></div>
                  <span className="chart-total">{totalNotes} total</span>
                </div>
                <div className="profile-chart">
                  <BarChart data={data} responsive margin={{ top: 12, right: 8, left: -16, bottom: 0 }}>
                    <CartesianGrid stroke="#edf0e9" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#7c8678', fontSize: 12 }} />
                    <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: '#929b8e', fontSize: 11 }} />
                    <Tooltip cursor={{ fill: '#f4f7f1' }} />
                    <Bar dataKey="note" name="Notes" radius={[8, 8, 0, 0]} maxBarSize={56}>
                      {data.map((item) => <Cell key={item.name} fill={item.color} />)}
                    </Bar>
                  </BarChart>
                </div>
              </section>

              <section className="profile-chart-card">
                <div className="profile-chart-heading">
                  <div><span>BREAKDOWN</span><h2>Notes share</h2></div>
                  <span className="chart-total">By category</span>
                </div>
                <div className="profile-chart">
                  <PieChart responsive>
                    <Tooltip />
                    <Pie data={data} dataKey="note" nameKey="name" innerRadius="52%" outerRadius="82%" paddingAngle={4} stroke="none">
                      {data.map((item) => <Cell key={item.name} fill={item.color} />)}
                    </Pie>
                  </PieChart>
                </div>
              </section>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default Profile
