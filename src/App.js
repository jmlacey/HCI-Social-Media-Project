import React from "react";
import "./App.css";
import PostForm from "./Component/PostForm.js";
import Modal from "./Component/Modal.js";
import logo from "./Component/logo.png";
import MyFriendList from "./Component/Josh_Components/MyFriendList.js";
import MyLogin from "./Component/Ousman_Components/Login.jsx";
import SignUp from "./Component/Ousman_Components/Sign_up.jsx";
import Setting from "./Component/Ousman_Components/Setting.jsx";
import Buddy from "./Component/Zach_components/Buddy.js";
import RealProfile from "./Component/Zach_components/Profile.js";
import ProfilePic from "./Component/Zach_components/ProfilePic.js";

class MainContent extends React.Component {
  constructor(props) {
    super(props);

    //necessary binding for state change
    this.startEdit = this.startEdit.bind(this);
    this.doneEdit = this.doneEdit.bind(this);

    this.state = {
      section: "signup",
      //section: "test",
      openModal: false,
      allowEdit: false,
      profile: false,
      email: "",
      sessiontoken: "",
      alanmessage: "",

      username: "",
      password: "",
      user_id: "",
      userid: "",
    };
  }

  //following 2 functions allow for state change between viewing and editing profile
  startEdit() {
    this.setState({ allowEdit: true, section: "allowEdit" });
  }

  doneEdit() {
    this.setState({ profile: true, section: "profile" });
  }

  render() {
    if (this.state.section === "test") {
      return (
        <div className="App">
          <RealProfile />
        </div>
      );
    }

    if (this.state.section === "signup") {
      return (
        <div className="App">
          <SignUp />
        </div>
      );
    }

    if (this.state.section === "login") {
      return (
        <div className="App">
          <MyLogin toggleLogin={this.props.toggleLogin} />
        </div>
      );
    }

    if (this.state.section === "friends") {
      return (
        <div>
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

    if (this.state.section === "profile") {
      return (
        <div className="profilePage">
          <ProfilePic />
          <RealProfile />
        </div>
      );
    }

    if (this.state.section === "Discussion") {
      return (
        <div className="discussionPage">
          <PostForm />
        </div>
      );
    }

    if (this.state.section === "allowEdit") {
      return (
        <div>
          <Setting />
        </div>
      );
    }

    // if (this.state.section === "test") {
    //   return <MyFriendList userid={sessionStorage.getItem("user")} />;
    // }
    // if (this.state.section === "main") {
    //   return (
    //     <div>
    //       <p>Social Media Test Harness</p>
    //       <LoginForm />
    //       <PostForm />
    //     </div>
    //   );
    // } else if (this.state.section === "friend") {
    //   return (
    //     <div>
    //       <p>Friends</p>
    //       <FriendForm userid={sessionStorage.getItem("user")} />
    //       <FriendList userid={sessionStorage.getItem("user")} />
    //     </div>
    //   );
    // } else if (this.state.section === "settings") {
    //   return (
    //     <div className="settings">
    //       <p>Settings</p>
    //       <Profile userid={sessionStorage.getItem("user")} />
    //     </div>
    //   );
    // }
    else {
      return <p>Unidentified Section!</p>;
    }
  }
}

function setMenuOption(mode, maincontent, e) {
  maincontent.current.setState({
    section: mode,
  });
}

function toggleModal(app) {
  app.setState({
    openModal: !app.state.openModal,
  });
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      isLogin: false,
    };

    this.toggleLogin = this.toggleLogin.bind(this);
  }

  toggleLogin() {
    this.setState({
      isLogin: !this.state.isLogin,
    });
  }
  logout() {
    alert("Logging out : " + sessionStorage.getItem("email"));

    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/SocialAuth.php",
      {
        method: "post",
        body: JSON.stringify({
          //API FIELDS
          action: "logout",
          username: sessionStorage.getItem("email"),
          session_token: sessionStorage.getItem("token"),
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          //DO WHATEVER YOU WANT WITH THE JSON HERE
          alert("Log out complete!");
          sessionStorage.removeItem("token");
        },
        (error) => {
          alert("Log out failed");
        }
      );
  }

  render() {
    // this.toggleLogin();
    sessionStorage.setItem("token", "0");
    let mainContent = React.createRef();
    if (this.state.isLogin) {
      return (
        <div className="App">
          <header className="header">
            <h1 style={{ color: "white", padding: 5, marginTop: 20 }}>
              SLEEP.IO
            </h1>
            <img src={logo} alt="" className="headerImg" />
            <div className="container">
              <nav className="navBar">
                <div className="Nav_Div">
                  <ul className="sideBar">
                    <li className="Nav_Element">
                      <a
                        className="element_link"
                        onClick={(e) =>
                          setMenuOption("Discussion", mainContent, e)
                        }
                      >
                        Discussion
                      </a>

                      <a
                        className="element_link"
                        onClick={(e) =>
                          setMenuOption("friends", mainContent, e)
                        }
                        
                      >
                        Friends
                      </a>

                      <a
                        className="element_link"
                        onClick={(e) =>
                          setMenuOption("profile", mainContent, e)
                        }
                      >
                        Profile
                      </a>

                      <a
                        className="element_link"
                        onClick={(e) => setMenuOption("buddy", mainContent, e)}
                      >
                        Buddy
                      </a>

                      <a className="element_link" onClick={(e) => setMenuOption("allowEdit", mainContent, e)}>
                        Setting
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </header>

          <div className="maincontent" id="mainContent">
            <MainContent
              ref={mainContent}
              toggleLogin={() => this.toggleLogin()}
            />
          </div>

          <Modal
            show={this.state.openModal}
            onClose={(e) => toggleModal(this, e)}
          >
            This is a modal dialog!
          </Modal>
        </div>
      );
    } else
      return (
        <div className="App">
          <header className="header">
            <h1 style={{ color: "white", padding: 5, marginTop: 20 }}>
              SLEEP.IO
            </h1>
            <img src={logo} alt="" className="headerImg" />
            <div className="container">
              <nav className="navBar">
                <div className="Nav_Div">
                  <ul className="sideBar">
                    <li className="Nav_Element">
                      <a
                        className="element_link"
                        onClick={(e) => setMenuOption("login", mainContent, e)}
                      >
                        Login
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>

            <nav className="r">
              {/* <form className="login" style={{ paddingRight: 5 }}>
      <label style={{ color: "white" }} for="username">
        Username
      </label>
      <input
        type="text"
        id="usename"
        placeholder="Your username"
        className="inputBox"
      ></input> 
      <label for="password" style={{ color: "white" }}>
        Password
      </label>
      <input
        type="text"
        id="password"
        placeholder="Your password"
        className="inputBox"
      ></input>
      <input type="submit" value="Login"></input>
    </form> */}
            </nav>
          </header>

          <div className="maincontent" id="mainContent">
            <MainContent
              ref={mainContent}
              toggleLogin={() => this.toggleLogin()}
            />
          </div>

          <Modal
            show={this.state.openModal}
            onClose={(e) => toggleModal(this, e)}
          >
            This is a modal dialog!
          </Modal>
        </div>
      );
  }
}
export default App;
