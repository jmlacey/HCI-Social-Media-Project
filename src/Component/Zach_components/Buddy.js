import React from "react";

export default class Buddy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //FOR NOW WE ARE STORING THE BUDDY NAME IN USER ROLE. It will be an id.
      //326 is Wagz1 user id, for testing
      buddyID: "",
    };
  }

  componentDidMount() {
    //Getting the buddy indo
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "getUsers",
          userid: sessionStorage.getItem("user"),
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            buddyID: result.users[0].user_role,
          });
        },
        (error) => {
          alert("error!");
        }
      );
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Test add buddy by id"
          onChange={this.emailChangeHandler}
          value={this.state.email}
        ></input>
      </div>
    );
  }
}
