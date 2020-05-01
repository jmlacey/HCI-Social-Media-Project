import React, { Component } from "react";

export default class ProfilePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileID: "",
      profilePicURL: "",
    };
  }
  componentDidMount() {
    //Make a fetch call that grabs the three states and fills in the text boxes.

    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/usercontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "getCompleteUsers",
          userid: sessionStorage.getItem("user"),
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          let profilePicURL = "";
          let profileID = "";
          result.users[0]["user_artifacts"].forEach(function (artifact1) {
            if (artifact1.artifact_type === "ProfilePic") {
              profilePicURL = artifact1.artifact_url;
              profileID = artifact1.artifact_id;
            }
          });
          this.setState({
            profilePicURL: profilePicURL,
            profileID: profileID,
          });
        },
        (error) => {
          alert("error!");
        }
      );
  }

  uploadPicture = () => {
    console.log("This is the pic URL" + this.state.profilePicURL);

    //Make a fetch call that grabs the three states and fills in the text boxes.
    fetch(
      "http://stark.cse.buffalo.edu/cse410/reactioneers/api/uacontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "addOrEditUserArtifacts",
          user_id: sessionStorage.getItem("user"),
          session_token: sessionStorage.getItem("token"),
          userid: sessionStorage.getItem("user"),
          artifactid: this.state.profileID,
          artifacttype: "ProfilePic",
          artifacturl: this.state.profilePicURL,
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => { },
        (error) => {
          alert("error!");
        }
      );
  };

  uploadPicHandler = (event) => {
    let x = event.target;
    this.setState({
      profilePicURL: x.value,
    });
  };

  render() {
    return (
      <div className="profilePicture">
        <div className="profileBox">
          <img src={this.state.profilePicURL}></img>

          <form>
            <input
              type="text"
              placeholder="Picture URL"
              onChange={this.uploadPicHandler}
              value={this.state.profilePicURL}
            ></input>

            <input
              type="button"
              value="Upload"
              onClick={this.uploadPicture}
              className="profileButton"
            />
          </form>
        </div>
      </div>
    );
  }
}
