import React,{ useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { LOGOUT } from '../../constants/actionTypes';
import decode from 'jwt-decode';

import './styles.css';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [dropDown, setDropDown] = useState(false);

    const dispatch = useDispatch();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: LOGOUT });
        window.location = '/';
        setUser(null);
    }
    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[location]);

    return (
        <>
        <div id="Navbar" className="Navbar">
            <div className="Navbar-left">
                <h2>Apna Sawaal</h2>
            </div>
            { user?.result ? (
                <>
                <div className="Navbar-right">
                    <div className="User" onClick={() => setDropDown(!dropDown)}>
                        <div className="avatar">
                        <h1>{user.result.UserName.charAt(0)}</h1>
                        </div>
                        <div className="UserInfo">
                        <div className="UserText">
                        <h3  className="usertext-home">{user.result.UserName}</h3>
                        </div>
                        </div>
                    </div>
                </div>
                </>
            ):(<div className="Navbar-right">
                <Link to='/auth' className='btn-primary'>Login</Link>
            </div>)}
        </div>
        {user?.result && <div className={dropDown ? "openlogout logout":"closelogout logout"} onClick={logout}><h3>Logout</h3></div>}
        </>
    )
}

export default Navbar
