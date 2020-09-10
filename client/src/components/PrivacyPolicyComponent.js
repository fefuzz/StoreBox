import React from 'react'

function PrivacyPolicyComponent() {
    return (
        <div className='Infos'>
            <h2><strong>Privacy Policy</strong></h2>

            <h3><strong>Topics</strong></h3>
            <ul>
                <li>1- Overview</li>
                <li>2- What data do we collect?</li>
                <li>3- How do we collect your data?</li>
                <li>4- What data we do not collect?</li>
                <li>5- How do we use your data?</li>
                <li>6- How do we store your data?</li>
                <li>7- Marketing</li>
                <li>8- What are your data protection rights?</li>
                <li>9- Cookies and Local Storage</li>
                <li>10-How do we use cookies and Local Storage?</li>
                <li>11-How to manage cookies and Local Storage?</li>
                <li>12-Changes to our privacy policy</li>
                <li>13-How to contact us</li>
            </ul>

            <h3><strong>1-Overview</strong></h3>
            <p>
            This Privacy Policy is intended to explain what type of data is stored in Storebox servers and how our organization uses the personal data we collect from you when you use our website.
            This Privacy Policy is written following the Guidelines and the Template on the following sites:
            </p>
            <ul>
                <li><a href="https://gdpr.eu/">https://gdpr.eu/</a></li>
                <li><a href="https://ec.europa.eu/info/law/law-topic/data-protection/eu-data-protection-rules_en">https://ec.europa.eu/info/law/law-topic/data-protection/eu-data-protection-rules_en</a></li>
            </ul>

            <h3><strong>2-What data do we collect?</strong></h3>
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

            <h3><strong>3-How do we collect your data?</strong></h3>
            <p>
                You directly provide Storebox most of the data we collect, regarding the data mentioned in the previus section (Section 2), we collect and process that data in the following ways:
            </p>
            <ul>
                <li>During registration process we collect Username, Email Address and Password (the password is stored in our servers encrypted) you provide us.</li>
                <li>During the Verification Process (Number and Code sent by Telegram) we collect your Phone Number and Telegram Id</li>
                <li>During Process of Uploading your files to Telegram, Storebox collect the filename, the file type and the file uploading status (on the telegram servers) of your files as well as the file itself but regarding the latter, we store the file in our server only for the time of uploading process after which storebox undertakes to cancel the file from its servers.</li>
                <li>During the Process of Downloading your files from telegram, Storebox collect the downloading process status and the file you requested from Telegram Servers, but regarding the file itself we store the file in our server only for the time of downloading process after which storebox undertakes to cancel the file from its servers.</li>
            </ul>            

            <h3><strong>4-What data we do not collect?</strong></h3>
            <p>
                Even if Storebox has full access to the registered user's telegram account, our organization undertakes not to use, read or collect user data other than files uploaded to / downloaded from Storebox itself.
                In other words, we don't want to use your data in any way other than just downloading / uploading. 
            </p>

            <h3><strong>5-How do we use your data?</strong></h3>
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

            <h3><strong>6-How do we store your data?</strong></h3>
            <p>
                Storebox securely store your data in MongoDb Database.
                As regards the uploaded / downloaded contents, Storebox does not collect this data beyond the time necessary for the download / upload operations themselves
            </p>

            <h3><strong>7-Marketing</strong></h3>
            <p>
                Storebox would like to send you information about products and services of ours that we think you might like.
                If you have agreed to receive marketing, you may always opt out at a later date.
                You have the right at any time to stop Storebox from contacting you for marketing purposes.
            </p>

            <h3><strong>8-What are your data protection rights?</strong></h3>
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

            <h3><strong>9-Cookies and Local Storage</strong></h3>
            <p>
                Cookies are text files placed on your computer to collect standard Internet log information and visitor behavior information. When you visit our websites, we may collect information from you automatically through cookies or similar technology
                Local storage supports persistent data storage, similar to cookies but with a greatly enhanced capacity, unlike cookies, the storage limit is far larger (at least 5MB).
                Local storage is more secure, and large amounts of data can be stored locally, without affecting website performance.
            </p>

            <h3><strong>10-How do we use cookies and Local Storage?</strong></h3>
            <p>
                Storebox uses local storage and cookies in a range of ways to improve your experience on our website, including:
            </p>
            <ul>
                <li>Keeping you signed in</li>
                <li>Understand if you have the correct rights to do requests to our servers (with jwt token stored)</li>
            </ul>

            <h3><strong>11-How to manage cookies and Local Storage?</strong></h3>
            <p>
                Storebox cannot operate without the use of cookies and local storage, if you wish to use our services, you must agree to let us use cookies and local storage.
                By reading and accepting this policy, you are giving us permission to use cookies and localstorage to make our services available.
            </p>

            <h3><strong>12-Changes to our privacy policy</strong></h3>
            <p>
                Our Company keeps its privacy policy under regular review and places any updates on this web page. This privacy policy was last updated on 09 September 2020.
            </p>

            <h3><strong>13-How to contact us</strong></h3>
            <p>
                If you have any questions about Storebox's privacy policy, the data we hold on you, or you would like to exercise one of your data protection rights, please do not hesitate to contact us.
                Email us at: pierpaolovanni@gmail.com
            </p>
        </div>
    )
}

export default PrivacyPolicyComponent
