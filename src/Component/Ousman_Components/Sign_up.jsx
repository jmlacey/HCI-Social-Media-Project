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

  checkIfEmailExists() {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          //API FIELDS
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          //DO WHATEVER YOU WANT WITH THE JSON HERE
        },
        (error) => {
          alert("error!");
        }
      );
  }

  submitHandler = (event) => {
    event.preventDefault();

    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/SocialAuth.php",
      {
        method: "post",
        body: JSON.stringify({
          //API FIELDS
          action: "register",
          email_addr: this.state.email,
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          //DO WHATEVER YOU WANT WITH THE JSON HERE
          alert(
            "New account created! Check your email for a one time password."
          );
        },
        (error) => {
          alert("error!");
        }
      );
  };

  OTPSubmit() {
    alert("Log in using your email and new password!");
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/SocialAuth.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "setpassword",
          email_addr: this.state.email,
          token: this.state.otp,
          newpassword: this.state.newPassword,
        }),
      }
    );
  }

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
                <label for="fname">Email</label>
                <input
                  type="text"
                  placeholder="Your email"
                  onChange={this.emailChangeHandler}
                  value={this.state.email}
                ></input>

                <input type="submit" value="SEND ONE TIME PASSWORD"></input>
              </form>

              <form onSubmit={this.OTPSubmit}>
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
