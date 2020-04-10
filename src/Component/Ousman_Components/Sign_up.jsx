import React, { Component } from 'react';
import logo from '../logo.png';
import logo2 from '../logo2.svg';




class Sign_up extends Component {
    state = {}
    render() {
        return (
            <html>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <body>
                    {/* <header className="header">
                    <h1 style={{ color: 'white', padding: 5, marginTop: 20 }}>SLEEP.IO</h1>
                    <img src={logo} alt="" className = "headerImg" />
                    <nav className="r">
                        <div className="login" style={{paddingRight:5}}>
                            <label style={{ color: "white" }} for="username">Username</label>
                            <input type="text" id="usename" placeholder="Your username" className="inputBox"></input>
                            </div>
                            <div className="login" style={{paddingLeft:5}}>
                            <label for="password" style={{ color: "white" }}>Password</label>
                            <input type="text" id="password" placeholder="Your password" className="inputBox"></input>
                        </div>
                        <div>
                        <input type="button" value="Login" className="loginButton2"></input>

                        </div>
                    </nav>


                </header> */}

                    <div class="split left">
                        <div class="centered">
                            <img src={logo2} alt="" className="malik" />
                        </div>
                    </div>

                    <div class="split right">
                        <div class="centered">
                            <div className="signformDiv">

                                <h1>CREATE AN ACCOUNT</h1>
                                <form action="/action_page.php">
                                    <label for="fname">First Name</label>
                                    <input type="text" id="fname" name="firstname" placeholder="Your First Name"></input>
                                    <label for="lname">Last Name</label>
                                    <input type="text" id="lname" name="lastname" placeholder="Your Last Name"></input>

                                    <label for="fname">Email</label>
                                    <input type="text" id="fname" name="firstname" placeholder="Your email"></input>
                                    <label for="lname">Password</label>
                                    <input type="text" id="lname" name="lastname" placeholder="Your password"></input>
                                    <label for="country">Gender</label>
                                    <select id="country" name="country">
                                        <option value="australia">Male</option>
                                        <option value="canada">Female</option>
                                        <option value="usa">Other</option>
                                    </select>

                                    <div className="birthForm">
                                        <form>
                                            <label for="birthday">Birthday:</label>
                                            <input type="date" id="birthday" name="birthday"></input>
                                        </form>
                                    </div>

                                    <input type="submit" value="SIGN UP"></input>
                                </form>
                            </div>
                        </div>
                    </div>

                </body>
            </html>
        );
    }
}

export default Sign_up;