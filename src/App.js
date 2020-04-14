import React from "react";
import "./App.css";
import PostForm from "./Component/PostForm.js";
import FriendList from "./Component/FriendList.js";
import LoginForm from "./Component/LoginForm.js";
import Profile from "./Component/Profile.js";
import FriendForm from "./Component/FriendForm.js";
import Modal from "./Component/Modal.js";
<<<<<<< Updated upstream
=======
import logo from "./Component/logo.png";
import View from "./Component/Anthony_Components/viewprofile.jsx";
import Picture from "./Component/Anthony_Components/profilepicture";
import Feed from "./Component/Discussion.jsx";

//My stuff
import MyFriendList from "./Component/Josh_Components/MyFriendList.js";
import MyLogin from "./Component/Ousman_Components/Login.jsx";
import MySign_Up from "./Component/Ousman_Components/Sign_up.jsx";
import Buddy from "./Component/Zach_components/Buddy.js";
import NewFriendButton from "./Component/Josh_Components/NewFriendButton.js";
>>>>>>> Stashed changes

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: "main",
      openModal: false
    };
  }

  render() {
<<<<<<< Updated upstream
=======
    if (this.state.section === "signup") {
      return (
        <div className="App">
          <MySign_Up signup = {this.changeToLogin}/>
        </div>
      );
    }

    if (this.state.section === "login") {
      return (
        <div className="App">
          <MyLogin />
        </div>
      );
    }

    if (this.state.section === "friends") {
      return (
        <div>
          <NewFriendButton />
          <MyFriendList userid={sessionStorage.getItem("user")} />
        </div>
      );
    }

    if (this.state.section === "buddy") {
      return (
        <div className="buddyPage">
          <Buddy />
        </div>
      );
    }
    //anthony's profile page...
    if (this.state.section === "profile") {
      return (
        <div>
          {" "}
          <Picture /> <View userid={sessionStorage.getItem("user")} />
        </div>
      );
    }

    //made for feed
    if (this.state.section === "Feed") {
      return (
        <div>
          <Feed />
        </div>
      );
    }

    if (this.state.section === "test") {
      return <MyFriendList userid={sessionStorage.getItem("user")} />;
    }

>>>>>>> Stashed changes
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
    let post = require("./post.svg");
    let friend = require("./friends.svg");
    let setting = require("./settings.svg");
    let help = require("./help.svg");
    let mainContent = React.createRef();

    return (
      <div className="App">
        <header className="App-header">
          <div id="sidenav" className="sidenav">
            <ul id="side-menu-items">
              <li className="pm admin student">
                <button
                  className="link-button"
                  onClick={e => setMenuOption("main", mainContent, e)}
                >
                  <img
                    src={post}
                    className="sidenav-icon"
                    alt="Posts"
                    title="Posts"
                  />
                </button>
              </li>
              <li className="pm admin">
                <button
                  className="link-button"
                  onClick={e => setMenuOption("friends", mainContent, e)}
                >
                  <img
                    src={friend}
                    className="sidenav-icon"
                    alt="Friends"
                    title="Friends"
                  />
                </button>
              </li>
              <li className="pm admin">
                <button
                  className="link-button"
                  onClick={e => setMenuOption("settings", mainContent, e)}
                >
                  <img
                    src={setting}
                    className="sidenav-icon"
                    alt="Settings"
                    title="Settings"
                  />
                </button>
              </li>
              <li className="pm admin">
                <button
                  className="link-button"
                  onClick={e => toggleModal(this, e)}
                >
                  <img
                    src={help}
                    className="sidenav-icon"
                    alt="Settings"
                    title="Settings"
                  />
                </button>
              </li>
            </ul>
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
