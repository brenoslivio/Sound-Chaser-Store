import '../css/register.css';
import React from 'react';

function Register(){

    return (
        <div className="register-page">
            <div class="layer">
                <div class="register-container">
                    <div class="title"> Register </div>
                    <div class="icon-register">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                    </div>
                    
                    <div class="form"> 
                        
                        <input type="text" id="register_name" placeholder="Name"/>
                        <input type="text" id="register_mail" placeholder="E-mail"/>
                        <input type="text" id="register_phone" placeholder="Phone number"/>
                        <input type="text" id="register_password" placeholder="Password"/>
                        <input type="text" id="register_confirm" placeholder="Confirm your password"/>
                    
                        <button id="form-register-btn">Register</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register;