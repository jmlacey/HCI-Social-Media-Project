import React, { Component } from 'react';
import logo from '../logo.png';


class  Header extends Component {
    state = {  }
    render() { 
        return ( 
            <body>
            <header className="header">
                    <h1 style={{ color: 'white', padding: 5, marginTop: 20 }}>SLEEP.IO</h1>
                    <img src={logo} alt="" className = "headerImg"/>


                    <div className="container">

                        <nav className="navBar">
                            <div className="Nav_Div">
                                <ul className="sideBar">
                                    <li className="Nav_Element"><a className="element_link" href="/">Home</a></li>
                                    <li className="Nav_Element"><a className="element_link" href="/">About</a></li>
                                    <li className="Nav_Element"><a className="element_link" href="/">Portfolio</a></li>
                                    <li className="Nav_Element"><a className="element_link" href="/">Contact</a></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </header>


                <div className= "formDiv">
                <form action="/action_page.php">
                    <label for="fname">Username</label>
                    <input type="text" id="fname" name="firstname" placeholder="Your username"></input>
                        <label for="lname">Password</label>
                        <input type="text" id="lname" name="lastname" placeholder="Your password"></input>

                            <input type="submit" value="Login"></input>
                            <ul className="sideBar2">
                            <li><a className= "loginButton" href="/">Forgot Password</a></li>
                           <li><a className= "loginButton" href="/">Sign Up</a></li>
                           </ul>

                </form>
            </div>
                </body>

                





         );
    }
}
 
export default Header;
