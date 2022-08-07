import React,{ useState } from 'react'

const AuthInput = ({ name, label, inputType, show, handleChange, autoFocus }) => {
    const [type, setType] = useState(inputType);

    const changeType = (e) => {
        e.preventDefault();
        if(type==='text')
        setType('password');
        else
        setType('text');
    }
    return (
        <div className='AuthInput'>
            <label htmlFor={label}>{label}</label>
            <div className="Input-div">
            <input name={name} type={type} onChange={handleChange} autoFocus={autoFocus}/>
            { show ? (<button onClick={changeType}><i className={type==='text' ? 'fas fa-eye-slash':'fas fa-eye'}></i></button>):null}
            </div>
        </div>
    )
}

export default AuthInput
