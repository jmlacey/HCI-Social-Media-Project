import React, { Component } from "react";
import s3 from "./logo.png";

class Header extends Component {
  state = {};
  render() {
    return (
      <body>
        <header className="header">
          <h1 style={{ color: "white", padding: 5, marginTop: 20 }}>
            SLEEP.IO
          </h1>
          <img src={s3} alt="" className="headerImg" />

          <div className="container">
            <nav className="navBar">
              <div className="Nav_Div">
                <ul className="sideBar">
                  <li className="Nav_Element">
                    <a className="element_link" href="/">
                      Home
                    </a>
                  </li>
                  <li className="Nav_Element">
                    <a className="element_link" href="/">
                      About
                    </a>
                  </li>
                  <li className="Nav_Element">
                    <a className="element_link" href="/">
                      Portfolio
                    </a>
                  </li>
                  <li className="Nav_Element">
                    <a className="element_link" href="/">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
      </body>
    );
  }
}

export default Header;
