import '../css/contact.css';
import React from 'react';

function Contact(){

    return (
        <div className="contact-page">
            <div className="layer">
                <div className="contact">
                    <div className="title"> Contact </div>

                    <div className="address">
                        <svg className="icon-address" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z"/>
                        </svg>  Address  <br/><br/>
                        Avenida Trabalhador são-carlense, <br/>
                        400 - Centro CEP: 13566-590 <br/>
                        São Carlos - SP
                    </div>

                    <div className="phone">
                        <svg className="icon-phone" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                        </svg> Phone number  <br/><br/>
                        55 (16) 99999-9999
                    </div>

                    <br/>
                    
                    <iframe title="Google Maps - Store Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3699.111725038447!2d-47.89712098442982!3d-22.007029711917205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b877325a2f2381%3A0x7923e6d8ad682ad1!2sICMC+-+S%C3%A3o+Carlos!5e0!3m2!1spt-BR!2sbr!4v1500405778880" frameborder="0" style={{border:0}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                </div>
            </div>
        </div>
    )
}

export default Contact;