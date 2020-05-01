import React, { Component } from "react";
// import logo from '../logo.png';
import logo2 from "../../logo2.svg";

class Sign_up extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      userId: "",
      confirmPassword: "",
      newPassword: "",
      otp: "",

      //idk
      alanmessage: "",
      session_token: "",
    };
    this.OTPSubmit = this.OTPSubmit.bind(this);
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
          this.setState({
            userId: result.userId,
          });
        },
        (error) => {
          alert("error!");
        }
      );
  };

  OTPSubmit() {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/SocialAuth.php",
      {
        method: "post",
        body: JSON.stringify({
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
          console.log(result.message);
        },
        (error) => {
          alert("error!");
        }
      );
    alert("Log in using your email and new password!");
  }

  render() {
    return (
      <div class="col-3 col-s-3 menu">
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <div class="col-3 col-s-3 divide gauche">
          <div class="centered">
            <img src={logo2} alt="" className="malik" />
          </div>
        </div>
        <div class="col-3 col-s-3 divide droit">
          <div class="centered">
            <div className=" col-3 col-s-3 signformDiv">
              <h1>CREATE AN ACCOUNT</h1>
              <form className="col-3 col-s-3" onSubmit={this.submitHandler}>
                <label for="fname">Email</label>
                <input
                  type="text"
                  placeholder="Your email"
                  onChange={this.emailChangeHandler}
                  value={this.state.email}
                ></input>

                <input type="submit" value="SEND ONE TIME PASSWORD"></input>
              </form>

              <form className="col-5 col-s-3" onSubmit={this.OTPSubmit}>
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
                  onChange={this.passChangeHandler}
                  value={this.state.newPassword}
                ></input>

                <label>Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  onChange={this.confirmChangeHandler}
                  value={this.state.confirmPassword}
                ></input>

                <input type="submit" value="SIGN UP"></input>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sign_up;
