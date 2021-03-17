import { Component } from "react";
import axios from "./axios";
import FriendButton from "./friendButton";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: "",
        };
    }

    componentDidMount() {
        // console.log("this.props.match:", this.props.match);
        // console.log("the id is:", this.props.match.params.id);

        axios
            .post("/otherUsers", { id: this.props.match.params.id })
            .then(({ data }) => {
                if (data.success == false) {
                    this.props.history.push("/");
                } else {
                    // console.log("datafromotherprofile:", data);

                    this.setState({ userInfo: data });
                }
            })
            .catch(function (err) {
                console.log("error from post req", err);
            });
    }

    render() {
        return (
            <div>
                <h1>
                    {this.state.userInfo.first_name}{" "}
                    {this.state.userInfo.last_name}
                </h1>
                <img
                    src={this.state.userInfo.imageurl}
                    alt={`${
                        this.state.userInfo.first_name +
                        this.state.userInfo.last_name
                    }`}
                />
                <h1>{this.state.userInfo.bio}</h1>

                <FriendButton id={this.props.match.params.id} />
            </div>
        );
    }
}
