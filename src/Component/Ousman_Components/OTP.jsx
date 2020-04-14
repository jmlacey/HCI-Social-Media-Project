import React, { Component } from 'react';

class  otp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          newPassword: "",
          otp: "",
          alanmessage: "",
          session_token: "",
        };
      }

      myChangeHandler = (event) => {
        this.setState({
          otp: event.target.value,
        });
      };
    
      passChangeHandler = (event) => {
        this.setState({
          newPassword: event.target.value,
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
            //   username: this.state.username,
              password: this.state.password,
              otp: this.state.otp
            //   email_addr: this.state.email,
            //   confirmPassword: this.state.confirmPassword,
            //   session_token: sessionStorage.getItem("token"),
            }),
          }
        )
          .then((res) => res.json())
          .then(
            (result) => {
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


            <div className="signformDiv">
            <h1>CREATE AN ACCOUNT</h1>
            <form onSubmit={this.submitHandler}>
              <label for="fname">Enter OTP</label>
              <input
                type="text"
                placeholder="Your OTP"
                onChange={this.myChangeHandler}
                value={this.state.otp}
              ></input>

                <label for="fname">New Password</label>
                <input
                type="text"
                placeholder="Your New Password"
                onChange={this.passChangeHandler}
                value={this.state.newPassword}
              ></input>


                <input type="submit" value="SIGN UP"></input>
                <p>Username is : {this.state.username}</p>
                {/* <p>Firstname is : {this.state.firstname}</p> */}
                {this.state.responseMessage}
              </form>
            </div>  
         );
    }
}
 
export default otp;