import React from 'react'

import '../styles/general_disclaimer.css'
import logo from '../images/logo_simple.svg'

function PrivacyPolicyComponent() {
    return (
        <div className='Infos'>
            <a className='back-button-link' href="https://www.storebox.app">HOME</a>

            <div className="info-title-section">
                    <img src={logo} alt="storebox-logo"/>
                    <h2 className='info-title'>Privacy Policy</h2>
            </div>


            <div className='info-section-title'>
                <h3>Overview</h3>
                <p>
                    This Privacy Policy is intended to explain what type of data is stored in Storebox servers and how our organization uses the personal data we collect from you when you use our website.
                    This Privacy Policy is written following the Guidelines and the Template on the following sites: <br /><br />
                    <a href="https://gdpr.eu/" target="_blank">https://gdpr.eu/</a> <br />
                    <a href="https://ec.europa.eu/info/law/law-topic/data-protection/eu-data-protection-rules_en" target="_blank">https://ec.europa.eu/info/law/law-topic/data-protection/eu-data-protection-rules_en</a>
                </p>
            </div>
            
            <div className='info-section'>
                <h3>What data do we collect?</h3>
                <p>
                    Our Company collects the following personal data:
                </p>
                <ul>
                    <li>Email Address</li>
                    <li>Phone Number</li>
                    <li>Username</li>
                    <li>Filenames</li>
                    <li>File Types</li>
                    <li>Telegram id</li>
                    <li>Files uploaded by the user (only for the time of uploading to/downloading from Telegram Servers)</li>
                    <li>Password in Encrypted Form</li>
                    <li>Status of the file in the Telegram Servers (uploaded, uploading in progress, downloading in progress, downloaded)</li>
                </ul>
            </div>

            <div className='info-section'>
                <h3>How do we collect your data?</h3>
                <p>
                    You directly provide Storebox most of the data we collect, regarding the data mentioned in the previus section (Section 2), we collect and process that data in the following ways:
                </p>
                <ul>
                    <li>During registration process we collect Username, Email Address and Password (the password is stored in our servers encrypted) you provide us.</li>
                    <li>During the Verification Process (Number and Code sent by Telegram) we collect your Phone Number and Telegram Id</li>
                    <li>During Process of Uploading your files to Telegram, Storebox collect the filename, the file type and the file uploading status (on the telegram servers) of your files as well as the file itself but regarding the latter, we store the file in our server only for the time of uploading process after which storebox undertakes to cancel the file from its servers.</li>
                    <li>During the Process of Downloading your files from telegram, Storebox collect the downloading process status and the file you requested from Telegram Servers, but regarding the file itself we store the file in our server only for the time of downloading process after which storebox undertakes to cancel the file from its servers.</li>
                </ul>  
            </div>          

            <div className='info-section'>
                <h3>What data we do not collect?</h3>
                <p>
                    Even if Storebox has full access to the registered user's telegram account, our organization undertakes not to use, read or collect user data other than files uploaded to / downloaded from Storebox itself.
                    In other words, we don't want to use your data in any way other than just downloading / uploading. 
                </p>
            </div>


            <div className='info-section'>
                <h3>How do we use your data?</h3>
                <p>
                    Storebox collect your data so that we can:
                </p>
                <ul>
                    <li>Process your files, upload to and download from telegram</li>
                    <li>Email you in case of forgotten password, to notify you about other products and services we think you might like, as well as new features implemented.</li>
                </ul>
                <p>
                    If you agree, our company will share your data with Telegram to perform storage of the file you provide us.
                </p>
            </div>

            <div className='info-section'>
                <h3>How do we store your data?</h3>
                <p>
                    Storebox securely store your data in MongoDb Database.
                    As regards the uploaded / downloaded contents, Storebox does not collect this data beyond the time necessary for the download / upload operations themselves
                </p>
            </div>

            <div className='info-section'>
                <h3>Marketing</h3>
                <p>
                    Storebox would like to send you information about products and services of ours that we think you might like.
                    If you have agreed to receive marketing, you may always opt out at a later date.
                    You have the right at any time to stop Storebox from contacting you for marketing purposes.
                </p>
            </div>

            <div className='info-section'>
                <h3>What are your data protection rights?</h3>
                <p>
                    Storebox would like to make sure you are fully aware of all of your data protection rights. Every user is entitled do the following:
                </p>
                <ul>
                    <li>The right to access: You have the right to request Our Company for copies of your personal data.</li>
                    <li>The right to rectification: You have the right to request that Our Company correct any information you believe is inaccurate. You also have the right to request Our Company to complete the information you believe is incomplete.</li>
                    <li>The right to erasure: You have the right to request that Our Company erase your personal data, under certain conditions.</li>
                    <li>The right to restrict processing: You have the right to request that Our Company restrict the processing of your personal data, under certain conditions.</li>
                    <li>The right to object to processing: You have the right to object to Our Company’s processing of your personal data, under certain conditions.</li>
                    <li>The right to data portability: You have the right to request that Our Company transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                </ul>

                <p>
                    If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at our email:
                    pierpaolovanni@gmail.com 
                </p>
            </div>

            <div className='info-section'>
                <h3>Cookies and Local Storage</h3>
                <p>
                    Cookies are text files placed on your computer to collect standard Internet log information and visitor behavior information. When you visit our websites, we may collect information from you automatically through cookies or similar technology
                    Local storage supports persistent data storage, similar to cookies but with a greatly enhanced capacity, unlike cookies, the storage limit is far larger (at least 5MB).
                    Local storage is more secure, and large amounts of data can be stored locally, without affecting website performance.
                </p>
            </div>

            <div className='info-section'>
                <h3>How do we use cookies and Local Storage?</h3>
                <p>
                    Storebox uses local storage and cookies in a range of ways to improve your experience on our website, including:
                </p>
                <ul>
                    <li>Keeping you signed in</li>
                    <li>Understand if you have the correct rights to do requests to our servers (with jwt token stored)</li>
                </ul>
            </div>

            <div className='info-section'>
                <h3>How to manage cookies and Local Storage?</h3>
                <p>
                    Storebox cannot operate without the use of cookies and local storage, if you wish to use our services, you must agree to let us use cookies and local storage.
                    By reading and accepting this policy, you are giving us permission to use cookies and localstorage to make our services available.
                </p>
            </div>

            <div className='info-section'>
                <h3>Changes to our privacy policy</h3>
                <p>
                    Our Company keeps its privacy policy under regular review and places any updates on this web page. This privacy policy was last updated on 19 September 2020.
                </p>
            </div>

            <div className='info-section'>
                <h3>How to contact us</h3>
                <p>
                    If you have any questions about Storebox's privacy policy, the data we hold on you, or you would like to exercise one of your data protection rights, please do not hesitate to contact us.
                    Email us at: pierpaolovanni@gmail.com
                </p>
            </div>
        </div>
    )
}

export default PrivacyPolicyComponent
