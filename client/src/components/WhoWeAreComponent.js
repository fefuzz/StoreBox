import React from 'react'

import '../styles/general_disclaimer.css'
import logo from '../images/logo_simple.svg'

function WhoWeAreComponent() {
    return (
        <div className='Infos'>
            <a className='back-button-link' href="https://www.storebox.app">HOME</a>

            <div className="info-title-section">
                <img src={logo} alt="storebox-logo"/>
                <h2 className='info-title'>About Us - A.K.A. Welcome to Storebox!</h2>
            </div>

            <div className='info-section-title'>
                <h3>Wait a second...</h3>
                <p>
                    Hi, my name is Pierpaolo Vanni, 
                    I am an Italian developer who works mainly in the field of web development.
                    I graduated from the University of Pisa in the Computer Engineering course (three-year degree), in addition to my work, I often dabble in personal projects such as this one
                    You can also find me on <a href="https://github.com/fefuzz" target="_blank">GitHub</a> where you will find all the projects i work on or have worked on in the past, or in my <a hre="https://fefuzz.github.io/myPortfolio/">personal portfolio</a>, where you will find my curriculum vitae.
                    My email is pierpaolovanni@gmail.com , feel free to contact me for any questions.
                </p>
            </div>

            <div className='info-section'>
                <h3>What is Storebox?</h3>
                <p>   
                    In our world, no one does anything for free, we all know this, but there are some things that are offered to us without having to pay for them.
                    An example is Telegram, which provides a beautiful messaging system with an infinite amount of cool features including the possibility of uploading files up to 2GB in size. 
                    The idea of ​​creating an application that would take advantage of this functionality to be able to upload and download files quickly and easily crossed my mind a long time ago, 
                    but it was only from September 2020 that I started working actively on this project, Thus was born Storebox, a Telegram-based cloud storage system, completely free just like Telegram itself.
                    I developed this project by deciding to proceed with a web-app divided into a Back-End part (consisting of a NodeJs / Express server) and a Front-End part that is built on a ReactJs application.
                </p>
            </div>

            <div className='info-section'>
                <h3>Free as the birds that fly...</h3>
                <p>
                Storebox is free and always will be, earning has never been one of the reasons why I created Storebox and this is (imho) the strong point of this application.
                There are no other web storage systems that provide their services for free, Storebox does!
                I strongly believe in free software, which is why I put the complete source code of my site on github at <a href="https://github.com/fefuzz/StoreBox" target="_blank" >this link</a>
                In addition to this, I am happy to accept help from anyone who wanted to collaborate on the project, contact me at my email if you are one of these people.
                </p>
            </div>

            <div className='info-section'>
                <h3>What about Privacy?</h3>
                <p>
                Although I recommend that you first read the section of our <a href="https://www.storebox.app/privacy_policy" target="_blank">Privacy Policy</a>, 
                I want to have a friendlier speech now. 
                I am a guy whose passion is computer science, I developed this project for personal knowledge, for curiosity and certainly not to spy on you.
                Beyond that, my project code is completely public on my github profile, so anyone can see that I don't do anything weird with the files uploaded to the system.
                In fact, your files will be kept inside the Storebox servers only for the time necessary to upload to / download from Telegram, after which they will be deleted
                In the same way, I have no intention of spying on your personal chats, and the files will only be sent to your private chat (you may in fact notice the same files, on your saved telegram messages) 
                in this way they will remain completely private and accessible only by you.
                </p>
            </div>

            <div className='info-section'>
                <h3>That's it...</h3>
                <p>
                This is storebox, I hope my application can help you to keep your files organized completely free. 
                I hope you will be happy to use Storebox, for any clarification or doubt, please contact me at my email address.
                Happy surfing!
                </p>
            </div>

        </div>
    )
}

export default WhoWeAreComponent
