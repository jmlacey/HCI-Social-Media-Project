import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      alanmessage: "",
      sessiontoken: ""
    };
  }

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
            sessionStorage.setItem("token", result.user.session_token);
            sessionStorage.setItem("user", result.user.user_id);

            this.setState({
              sessiontoken: result.user.session_token,
              alanmessage: result.user.session_token,
            });
          } else {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
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

  render() {
    if (!sessionStorage.getItem("token")) {
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
                type="text"
                id="lname"
                name="lastname"
                placeholder="Your password"
                onChange={this.passwordChangeHandler}
              ></input>

              <input type="submit" value="Login"></input>
            </form>

            <p>Username is : {this.state.username}</p>
            <p>Password is : {this.state.password}</p>
          </div>
        </div>
      );
    } else {
      alert("Passed the token thing!");
      console.log("Returning welcome message");
      if (this.state.username) {
        return <p>Welcome, {this.state.username}</p>;
      } else {
        return <p>{this.state.alanmessage}</p>;
      }
    }
  }
}

export default Header;
