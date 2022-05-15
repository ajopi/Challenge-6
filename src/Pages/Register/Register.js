import React, { useEffect, useState } from 'react'
import "./Register.css"
import gambar1 from '../../Assets/img/Rectangle 62.png'
import { NavLink, useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { auth } from "../../firebase"
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Login } from '../Login/Login';


export const Register = () => {
    var axios = require('axios');
    const navigate = useNavigate();
    // google btn
    const authDefault = auth;
    const provider = new GoogleAuthProvider();


    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const [alertStatus, setAlertStatus] = useState(false);

    const [ToLogin, setToLogin] = useState(0)


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

    const handleAdminRegister = () => {
        
        var data = {
            "email": email,
            "password": pass,
            "role": "admin"
        };

        var config = {
            method: 'post',
            url: 'https://rent-car-appx.herokuapp.com/admin/auth/register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data, "Register Success");
                alert("Register Success!")
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

    useEffect(() => {
        console.log(ToLogin, "ini adalah login value");

      }, [])
    const handleToLogin = () => {
        // setToLogin(1);
        // console.log(ToLogin, "new Token");
        // if (ToLogin === 1) {
        //    return <Login/>
        // }

        navigate('/login')
    }


    return (
        <div className='container-login'>
            <div className='gambar-1'>
                {/* <img src={gambar1} alt='' className='gbr-1'/> */}
            </div>

            <div className='field-login'>
                <img src={gambar1} alt='' className='property-login' />
                <h2 className='property-login Title'>Create New Account!</h2>

                {alertStatus ? <div className='alert'>
                    Masukkan username dan password yang benar. Perhatikan penggunaan huruf kapital.
                </div> : null}

                <label className='property-login email-pass'>Email</label>
                <input type='email' placeholder='Contoh: johndee@gmail.com' className='input-field property-login' onChange={changeEmail} ></input>

                <label className='property-login email-pass'>Password</label>
                <input type='password' placeholder='6+ karakter' className='input-field property-login' onChange={changePass}></input>

                <button className='btn-login' onClick={handleAdminRegister}>Sign up</button>

                <GoogleButton className='google-btn' onClick={handleGoogleSign} />
                <button className='btn-to-login' onClick={handleToLogin}>Already have account? Login Here!</button>
            </div>
        </div>
    )
}
