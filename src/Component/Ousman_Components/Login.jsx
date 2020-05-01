import React, { Component } from "react";
import RealProfile from "../Zach_components/Profile.js";
import ProfilePic from "../Zach_components/ProfilePic.js";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      alanmessage: "",
      sessiontoken: "",
      user_id: "",
      userid: "",

      //For resetting password
      email: "",
      forgotPassword: false,
      newPassword: "",
      confirmPassword: "",
      otp: "",
    };
  }

  otpChangeHandler = (event) => {
    this.setState({
      otp: event.target.value,
    });
  };

  newPassChangeHandler = (event) => {
    this.setState({
      newPassword: event.target.value,
    });
  };

  confirmChangeHandler = (event) => {
    this.setState({
      confirmPassword: event.target.value,
    });
  };

  emailChangeHandler = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  myChangeHandler = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  passwordChangeHandler = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  submitHandler = (event) => {
    //keep the form from actually submitting
    event.preventDefault();

    //make the api call to the authentication page
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/SocialAuth.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "login",
          username: this.state.username,
          password: this.state.password,
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(this.state);
          if (result.user) {
            this.props.toggleLogin();
            sessionStorage.setItem("token", result.user.session_token);
            sessionStorage.setItem("user", result.user.user_id);
            sessionStorage.setItem("email", result.user.email_addr);
            // alert("Welcome " + sessionStorage.getItem("email") + "!");
            if (
              result.user.status === null ||
              result.user.status === "reinit"
            ) {
              fetch(
                "http://stark.cse.buffalo.edu/cse410/reactioneers/api/upcontroller.php",
                {
                  method: "post",
                  body: JSON.stringify({
                    action: "addOrEditUserPrefs",
                    user_id: sessionStorage.getItem("user"),
                    session_token: sessionStorage.getItem("token"),
                    userid: sessionStorage.getItem("user"),
                    prefname: "lastWokeUp",
                  }),
                }
              );

              fetch(
                "http://stark.cse.buffalo.edu/cse410/reactioneers/api/upcontroller.php",
                {
                  method: "post",
                  body: JSON.stringify({
                    action: "addOrEditUserPrefs",
                    user_id: sessionStorage.getItem("user"),
                    session_token: sessionStorage.getItem("token"),
                    userid: sessionStorage.getItem("user"),
                    prefname: "TimeZone",
                  }),
                }
              )
                .then((res) => res.json())
                .then(
                  (result) => {
                    console.log(result.message);
                  },
                  (error) => {
                    // alert("CURSES! FOILED AGAIN!");
                  }
                );

              fetch(
                "http://stark.cse.buffalo.edu/cse410/reactioneers/api/upcontroller.php",
                {
                  method: "post",
                  body: JSON.stringify({
                    action: "addOrEditUserPrefs",
                    user_id: sessionStorage.getItem("user"),
                    session_token: sessionStorage.getItem("token"),
                    userid: sessionStorage.getItem("user"),
                    prefname: "WakeTime",
                  }),
                }
              )
                .then((res) => res.json())
                .then(
                  (result) => {
                    console.log(result.message);
                  },
                  (error) => {
                    // alert("CURSES! FOILED AGAIN!");
                  }
                );

              fetch(
                "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
                {
                  method: "post",
                  body: JSON.stringify({
                    //API FIELDS
                    action: "addOrEditUsers",
                    user_id: result.user.user_id,
                    userid: result.user.user_id,
                    session_token: result.user.session_token,
                    status: "0",
                  }),
                }
              )
                .then((res) => res.json())
                .then(
                  (result) => {
                    //DO WHATEVER YOU WANT WITH THE JSON HERE
                    // alert("STATUS INITIALIZED.");
                  },
                  (error) => {
                    alert("error!");
                  }
                );

              fetch(
                "http://stark.cse.buffalo.edu/cse410/reactioneers/api/upcontroller.php",
                {
                  method: "post",
                  body: JSON.stringify({
                    action: "addOrEditUserPrefs",
                    user_id: sessionStorage.getItem("user"),
                    session_token: sessionStorage.getItem("token"),
                    userid: sessionStorage.getItem("user"),
                    prefname: "SleepyPoints",
                    prefvalue: 0,
                  }),
                }
              );

              fetch(
                "http://stark.cse.buffalo.edu/cse410/reactioneers/api/upcontroller.php",
                {
                  method: "post",
                  body: JSON.stringify({
                    action: "addOrEditUserPrefs",
                    user_id: sessionStorage.getItem("user"),
                    session_token: sessionStorage.getItem("token"),
                    userid: sessionStorage.getItem("user"),
                    prefname: "SleepCycleActivated",
                    prefvalue: false,
                  }),
                }
              );

              fetch(
                "http://stark.cse.buffalo.edu/cse410/reactioneers/api/uacontroller.php",
                {
                  method: "post",
                  body: JSON.stringify({
                    action: "addOrEditUserArtifacts",
                    user_id: sessionStorage.getItem("user"),
                    session_token: sessionStorage.getItem("token"),
                    userid: sessionStorage.getItem("user"),
                    artifacttype: "ProfilePic",
                  }),
                }
              );

              fetch(
                "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
                {
                  method: "post",
                  body: JSON.stringify({
                    //API FIELDS
                    action: "addOrEditUsers",
                    user_id: sessionStorage.getItem("user"),
                    userid: sessionStorage.getItem("user"),
                    session_token: sessionStorage.getItem("token"),
                    userrole: "nobody",
                  }),
                }
              );
            }

            this.setState({
              sessiontoken: result.user.session_token,
              alanmessage: result.user.session_token,
            });
          } else {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("email");
            this.setState({
              sessiontoken: "",
              alanmessage: result.message,
              redirect: true,
            });
          }
        },
        (error) => {
          alert("error!");
        }
      );
  };

  logout() {
    alert(
      "Logging out : " +
        sessionStorage.getItem("email") +
        ". We are sorry to see you go :("
    );

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
          sessionStorage.removeItem("token");
        },
        (error) => {
          alert("error!");
        }
      );
  }

  forgotPasswordButton = () => {
    this.setState({
      forgotPassword: true,
    });

    alert(
      "Enter your email to recieve a one time password. Then, use the one time password to change your actual password!"
    );
  };

  deleteAccount() {
    // alert("Deleting Account : " + sessionStorage.getItem("userid"));

    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          //API FIELDS
          action: "deleteUsers",
          session_token: sessionStorage.getItem("token"),
          user_id: sessionStorage.getItem("user"),
          userid: sessionStorage.getItem("user"),
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.user) {
            //DO WHATEVER YOU WANT WITH THE JSON HERE
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("email");
            this.setState({
              session_token: "",
              user_id: "",
              user: "",
            });
          }
        },
        (error) => {
          alert("error!");
        }
      );
  }

  SendOTP = () => {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/SocialAuth.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "forgotpassword",
          email_addr: this.state.email,
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          alert(
            "Check your " +
              this.state.email +
              " email for your one time password"
          );
        },
        (error) => {
          alert("error!");
        }
      );
  };

  changeThePassword = () => {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/SocialAuth.php",
      {
        method: "post",
        body: JSON.stringify({
          //API FIELDS
          action: "setpassword",
          email_addr: this.state.email,
          token: this.state.otp,
          newpassword: this.state.newPassword,
          confirmpassword: this.state.confirmPassword,
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          alert(
            "Log in using your " +
              this.state.email +
              " adress and your new password!"
          );
          //DO WHATEVER YOU WANT WITH THE JSON HERE
          this.setState({
            forgotPassword: false,
          });
        },
        (error) => {
          alert("error!");
        }
      );
  };

  Reinitialize = () => {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          //API FIELDS
          action: "addOrEditUsers",
          user_id: sessionStorage.getItem("user"),
          session_token: sessionStorage.getItem("token"),
          userid: sessionStorage.getItem("user"),
          status: "reinit",
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {},
        (error) => {
          alert("error!");
        }
      );
  };

  render() {
    if (
      !sessionStorage.getItem("token") ||
      sessionStorage.getItem("token") === "0"
    ) {
      if (this.state.forgotPassword) {
        return (
          <div>
            <label for="fname">Email</label>
            <input
              type="text"
              placeholder="Your email"
              onChange={this.emailChangeHandler}
              value={this.state.email}
            ></input>

            <input
              type="submit"
              value="SEND ONE TIME PASSWORD"
              onClick={this.SendOTP}
            ></input>

            <label>Enter OTP</label>
            <input
              type="text"
              placeholder="Your OTP"
              onChange={this.otpChangeHandler}
              value={this.state.otp}
            ></input>

            <label>New Password</label>
            <input
              type="password"
              placeholder="Your New Password"
              onChange={this.newPassChangeHandler}
              value={this.state.newPassword}
            ></input>

            <label>Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm New Password"
              onChange={this.confirmChangeHandler}
              value={this.state.confirmPassword}
            ></input>

            <input
              type="submit"
              value="Change Password"
              onClick={this.changeThePassword}
            ></input>
          </div>
        );
      }

      return (
        <div className="formDiv">
          <div class="centered">
            <form action="/action_page.php" onSubmit={this.submitHandler}>
              <label for="fname">Email</label>
              <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="Your email"
                onChange={this.myChangeHandler}
              ></input>
              <label for="lname">Password</label>
              <input
                type="password"
                id="lname"
                name="lastname"
                placeholder="Your password"
                onChange={this.passwordChangeHandler}
              ></input>

              <input type="submit" value="Login"></input>
            </form>

            <input
              type="submit"
              value="Forgot Password"
              onClick={this.forgotPasswordButton}
            ></input>
          </div>
        </div>
      );
    } else {
      return (
        // <div className="formDiv">
        //   <div class="centered">
        //     <form onSubmit={this.Reinitialize}>
        //       <input type="submit" value="reinit"></input>
        //     </form>

        //     <form onSubmit={this.logout}>
        //       <input type="submit" value="Logout"></input>
        //     </form>

        //     <form onSubmit={this.deleteAccount}>
        //       <input type="submit" value="Delete Account"></input>
        //     </form>
        //   </div>
        // </div>
        <div>
          <ProfilePic />
          <RealProfile />
        </div>
      );
      /*
      alert("Hooray! You are logged in!");
      console.log("Returning welcome message");
      if (this.state.username) {
        return <p>Welcome, {this.state.username}</p>;
      } else {
        return <p>{this.state.alanmessage}</p>;
        
      }
      */
    }
  }
}

export default Header;
