import React from 'react'
import './Sidebar.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
const Sidebar = () => {
    const navigate = useNavigate();
    const [allnote, setallnote] = useState(true);
    const [pined, setpined] = useState(false);
    const [work, setwork] = useState(false)
    const [imp, setimp] = useState(false)
    const [per, setper] = useState(false)
    const [all, setall] = useState(false);
    const [myuser, setmyuser] = useState('');
    const [userlogin, setuserlogin] = useState(false);
    const CloseClick = () => {
        setall(false);
        setimp(false);
        setper(false);
        setwork(false)

    }
    useEffect(() => {
        const user = localStorage.getItem("User");
        if (user) {
            setuserlogin(true);
            setmyuser(JSON.parse(user));
        }
        else {
            setuserlogin(false);
        }
    }, [])
const Logout=()=>{
    localStorage.removeItem("User");
    window.location.reload();
}
    return (
        <aside>
            <div className="side-bar">
                <span className='header'>
                    <h1>Lalit</h1>
                    <h1>Nest</h1>
                </span>
                <div className="notes">
                    <button onClick={() => { navigate('/'); CloseClick(); setallnote(true); setpined(false) }} className={allnote ? "active" : "not-active"}>
                        <img src="/pencil.png" alt="Error" />
                        <p>All Notes</p>
                    </button>
                    <button onClick={() => { navigate('pin'); setallnote(false); setpined(true) }} className={pined ? "active" : "not-active"}>
                        <img src="/pin.png" alt="" />
                        <p>Pinned</p>
                    </button>
                </div>

                <div className="tags">
                    <h4>Tags</h4>
                    <div className="tag-content">
                        <button onClick={() => {
                            navigate('/'); setall(true); setimp(false);
                            setper(false);
                            setwork(false);
                        }} className={all ? "click" : "not-click"}>All</button>
                        <button onClick={() => { navigate('personal'); setper(true); setwork(false); setimp(false); setall(false) }} className={per ? "click" : "not-click"}  >Personal</button>
                        <button onClick={() => { navigate('important'); setper(false); setwork(false); setimp(true); setall(false) }} className={imp ? "click" : "not-click"}>Important</button>
                        <button onClick={() => { navigate('work'); setper(false); setwork(true); setimp(false); setall(false) }} className={work ? "click" : "not-click"}>Work</button>
                    </div>


                </div>
            </div>
            <div className="login-user">
                {userlogin ? (
                    <div className="users">
                          <div className="app-user">
                            <h4>{myuser.charAt(0)}</h4>
                            <p>{myuser}</p> 
                         
                          </div>
                          <button onClick={()=>{navigate('profile')}}>see your profile</button>
                    </div>
                ): <button onClick={() => { navigate('/login') }}>Login</button>}
            </div>
        </aside>
    )
}

export default Sidebar
