import React, { useState, useEffect } from 'react'
import './Login.css'
import gambar1 from '../../Assets/img/Rectangle 62.png'
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';



export const Login = () => {
    var axios = require('axios');
    const navigate = useNavigate();
    const authDefault = auth;
    const provider = new GoogleAuthProvider();

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [ToRegister, setToRegister] = useState(null)
    
    useEffect(() => {
      setToRegister(0)
    }, [])
    

    const [alertStatus, setAlertStatus] = useState(false);


    const changeEmail = (e) => {
        setEmail(e.target.value);

    }

    const changePass = (e) => {
        setPass(e.target.value);

    }

    



    // const login = () => {
    //     let validateEmail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/
    //     let validatePass = /([A-Z]{1}[a-z]{1,}[0-9]{1,})/


    //     if (validateEmail.test(email) && validatePass.test(pass)) {
    //         return navigate('home');
    //     }else{
    //         return setAlertStatus(true);
    //     }
    // }

    const handleLoginToAdmin = () => {
        var data = {
            "email": email,
            "password": pass
        };

        var config = {
            method: 'post',
            url: 'https://rent-car-appx.herokuapp.com/admin/auth/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data, "login Success");
                sessionStorage.setItem("Token Admin", response.data.access_token)
                navigate(`/home`)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const handleGoogleSign = () => {
        signInWithPopup(authDefault, provider).then((data) => {
            console.log(data, "ini data");
            console.log(JSON.stringify(data.user.accessToken));
            sessionStorage.setItem("Token Customer", data.user.accessToken);
            navigate(`/homepagecust`)
        }).catch((err) => {
            console.log(err, "ini error");
        })
    }

    const handleToRegister = () => {
        navigate(`/`)

        // console.log(ToRegister, "ini adalah value")
    }


    return (
        <div className='container-login'>
            <div className='gambar-1'>
                {/* <img src={gambar1} alt='' className='gbr-1'/> */}
            </div>

            <div className='field-login'>
                <img src={gambar1} alt='' className='property-login' />
                <h2 className='property-login Title'>Welcome, Admin BCR</h2>

                {alertStatus ? <div className='alert'>
                    Masukkan username dan password yang benar. Perhatikan penggunaan huruf kapital.
                </div> : null}

                <label className='property-login email-pass'>Email</label>
                <input type='email' placeholder='Contoh: johndee@gmail.com' className='input-field property-login' onChange={changeEmail} ></input>

                <label className='property-login email-pass'>Password</label>
                <input type='password' placeholder='6+ karakter' className='input-field property-login' onChange={changePass}></input>

                <button className='btn-login' onClick={handleLoginToAdmin}>Sign in</button>
                <GoogleButton className='google-btn ' onClick={handleGoogleSign} />

                <button className='btn-to-login' onClick={handleToRegister}>Don't have account? Register Here!</button>
            </div>
        </div>
    )
}
