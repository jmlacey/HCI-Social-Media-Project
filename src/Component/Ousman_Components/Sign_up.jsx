import React, { Component } from "react";
// import logo from '../logo.png';
import logo2 from "../../logo2.svg";

class Sign_up extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //       username: "",
  //       firstname: "",
  //       lastname: "",
  //       password: "",
  //       email: "",
  //       responseMessage: "",
  //       redirect: false
  //     };
  //     this.fieldChangeHandler.bind(this);
  //   }

  //   fieldChangeHandler(field, e) {
  //     console.log("field change");
  //     this.setState({
  //       [field]: e.target.value
  //     });
  //   }

  //   componentDidMount() {
  //     // make the api call to the user API to get the user with all of their attached preferences
  //     fetch("http://stark.cse.buffalo.edu/hci/usercontroller.php", {
  //       method: "post",
  //       action: "addOrEditUserPrefs",
  //       body: JSON.stringify({
  //         action: "getCompleteUsers",
  //         user_id: this.props.userid
  //       })
  //     })
  //       .then(res => res.json())
  //       .then(
  //         result => {
  //           if (result.users) {
  //             console.log(result.users);

  //             this.setState({
  //               // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
  //               // try and make the form component uncontrolled, which plays havoc with react
  //               username: result.users[0].username || "",
  //               firstname: result.users[0].first_name || "",
  //               lastname: result.users[0].last_name || "",
  //               password: result.users[0].password|| "",
  //               email: result.users[0].email_Addr||"",
  //               redirect: true

  //             });
  //           }
  //         },
  //         error => {
  //           alert("error!");
  //         }
  //       );
  //   }

  //   submitHandler = event => {
  //     //keep the form from actually submitting
  //     event.preventDefault();

  //     //make the api call to the user controller
  //     fetch("http://stark.cse.buffalo.edu/hci/usercontroller.php", {
  //       method: "post",
  //       body: JSON.stringify({
  //         action: "addOrEditUsers",
  //         username: this.state.username,
  //         firstname: this.state.firstname,
  //         lastname: this.state.lastname,
  //         password: this.state.password,
  //         email: this.state.email,
  //         user_id: sessionStorage.getItem("user"),
  //         session_token: sessionStorage.getItem("token"),
  //         mode: "ignorenull"
  //       })
  //     })
  //       .then(res => res.json())
  //       .then(
  //         result => {
  //           this.setState({
  //             responseMessage: result.Status,
  //           });
  //         },
  //         error => {
  //           alert("error!");

  //         }
  //       );

  // // make the api call to the user prefs controller
  // fetch("http://stark.cse.buffalo.edu/hci/upcontroller.php", {
  //   method: "post",
  //   body: JSON.stringify({
  //     action: "addOrEditUserPrefs",
  //     user_id: sessionStorage.getItem("user"),
  //     session_token: sessionStorage.getItem("token")
  //   })
  // })
  //   .then(res => res.json())
  //   .then(
  //     result => {
  //       this.setState({
  //         responseMessage: result.Status
  //       });
  //     },
  //     error => {
  //       alert("error!");
  //     }
  //   );
  // };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      alanmessage: "",
      session_token: "",
      email: "",
    };
  }

  myChangeHandler = (event) => {
    this.setState({
      username: event.target.value,
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
                <p>Username is : {this.state.username}</p>
                {/* <p>Firstname is : {this.state.firstname}</p> */}
                {this.state.responseMessage}
              </form>
            </div>
          </div>
        </div>
      </html>
    );
  }
}

export default Sign_up;
