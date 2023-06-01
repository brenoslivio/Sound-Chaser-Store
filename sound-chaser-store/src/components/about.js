import '../css/about.css';
import React from 'react';

function about(){

    return (
        <div className="about-page">
            <div className="layer">
                <div className="about">
                    <div className="title"> About </div>
                    <div className="description"> 
                        Website created for the class SCC0219 - Introduction to Web Development.
                        <br/><br/>
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly 
                        used to demonstrate the visual form of a document or a typeface without 
                        relying on meaningful content. Lorem ipsum may be used as a placeholder 
                        before final copy is available. It is also used to temporarily replace text in 
                        a process called greeking, which allows designers to consider the form of 
                        a webpage or publication, without the meaning of the text influencing the design. 
                    </div>
                    
                    <div className="creators">
                        <div className="photo">
                            <img src="/imgs/profile.jpg" alt="Creator"/>
                        </div>
                        <div className="text">
                            Creator
                            <br/><br/>
                            Breno L. S. de Almeida
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default about;