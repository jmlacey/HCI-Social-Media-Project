import React from "react";
import "./App.css";
import PostForm from "./Component/PostForm.js";
import FriendList from "./Component/FriendList.js";
import LoginForm from "./Component/LoginForm.js";
import Profile from "./Component/Profile.js";
import FriendForm from "./Component/FriendForm.js";
import Modal from "./Component/Modal.js";
import logo from "./Component/logo.png";

//My stuff
import MyFriendList from "./Component/Josh_Components/MyFriendList.js";

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: "test",
      openModal: false
    };
  }

  render() {
    if (this.state.section === "test") {
      
      return <MyFriendList userid={sessionStorage.getItem("user")} />;
    }

    if (this.state.section === "main") {
      return (
        <div>
          <p>Social Media Test Harness</p>
          <LoginForm />
          <PostForm />
        </div>
      );
    } else if (this.state.section === "friends") {
      return (
        <div>
          <p>Friends</p>
          <FriendForm userid={sessionStorage.getItem("user")} />
          <FriendList userid={sessionStorage.getItem("user")} />
        </div>
      );
    } else if (this.state.section === "settings") {
      return (
        <div className="settings">
          <p>Settings</p>
          <Profile userid={sessionStorage.getItem("user")} />
        </div>
      );
    } else {
      return <p>Unidentified Section!</p>;
    }
  }
}

function setMenuOption(mode, maincontent, e) {
  maincontent.current.setState({
    section: mode
  });
}

function toggleModal(app) {
  app.setState({
    openModal: !app.state.openModal
  });
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false
    };
  }

  render() {
    let mainContent = React.createRef();

    return (
      <div className="App">
        <header className="App-header">

          
          OUSMAN'S TOP BAR GOES HERE!!! OUSMAN'S TOP BAR GOES HERE!!! OUSMAN'S
          TOP BAR GOES HERE!!! OUSMAN'S TOP BAR GOES HERE!!!
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
          
          
          <div className="maincontent" id="mainContent">
            <MainContent ref={mainContent} />
          </div>
        </header>
        <Modal show={this.state.openModal} onClose={e => toggleModal(this, e)}>
          This is a modal dialog!
        </Modal>
      </div>
    );
  }
}
export default App;
