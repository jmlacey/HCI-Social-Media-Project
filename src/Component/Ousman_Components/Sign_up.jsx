import React, { Component } from "react";
// import logo from '../logo.png';
import logo2 from "../../logo2.svg";

class Sign_up extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      alanmessage: "",
      session_token: "",
      newPassword: "",
      otp: "",
    };
  }

  myChangeHandler = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  otpChangeHandler = (event) => {
    this.setState({
      otp: event.target.value,
    });
  };

  passChangeHandler = (event) => {
    this.setState({
      newPassword: event.target.value,
    });
  };

  emailChangeHandler = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  passwordChangeHandler = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  cPasswordChangeHandler = (event) => {
    this.setState({
      confirmPassword: event.target.value,
    });
  };

  submitHandler = (event) => {
    //keep the form from actually submitting
    event.preventDefault();
    //console.log(this.state.email);
    //make the api call to the authentication page
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/SocialAuth.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "register",
          //username: this.state.username,
          //password: this.state.password,
          email_addr: this.state.email,
          //confirmPassword: this.state.confirmPassword,
          //session_token: sessionStorage.getItem("token"),
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.user) {
            alert("User already exists");
            sessionStorage.setItem("token", result.user.session_token);
            sessionStorage.setItem("user", result.user.user_id);

            this.setState({
              sessiontoken: result.user.session_token,
              alanmessage: result.user.session_token,
            });
          } else {
            alert(
              "New account created! Check your email for a one time password."
            );
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            this.setState({
              sessiontoken: "",
              alanmessage: result.message,
            });
          }
        },
        (error) => {
          alert("error!");
        }
      );
  };

  render() {
    return (
      <html>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <div class="split left">
          <div class="centered">
            <img src={logo2} alt="" className="malik" />
          </div>
        </div>
        <div class="split right">
          <div class="centered">
            <div className="signformDiv">
              <h1>CREATE AN ACCOUNT</h1>
              <form onSubmit={this.submitHandler}>
                <label for="fname">Username</label>
                <input
                  type="text"
                  placeholder="Your Username"
                  onChange={this.myChangeHandler}
                  value={this.state.username}
                ></input>
                <label for="fname">Email</label>
                <input
                  type="text"
                  placeholder="Your email"
                  onChange={this.emailChangeHandler}
                  value={this.state.email}
                ></input>

                <label>Password</label>
                <input
                  type="text"
                  placeholder="Your password"
                  onChange={this.passwordChangeHandler}
                  value={this.state.password}
                ></input>
                <label>Confirm Password</label>
                <input
                  type="text"
                  placeholder="Confirm password"
                  onChange={this.cPasswordChangeHandler}
                  value={this.state.confirmPassword}
                ></input>
                {/* <label for="gender">Gender</label>
                                    <select >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select> */}

                {/* <div className="birthForm">


+                                    </div> */}

                <input type="submit" value="SIGN UP"></input>
              </form>

              <form onSubmit={this.submitHandler}>
              <label>Enter OTP</label>
              <input
                type="text"
                placeholder="Your OTP"
                onChange={this.otpChangeHandler}
                value={this.state.otp}
              ></input>

                <label>New Password</label>
                <input
                type="text"
                placeholder="Your New Password"
                onChange={this.passChangeHandler}
                value={this.state.newPassword}
              ></input>


                <input type="submit" value="SIGN UP"></input>
              </form>
            </div>
          </div>
        </div>
      </html>
    );
  }
}

export default Sign_up;
