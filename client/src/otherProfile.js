import { Component } from "react";
// import axios from "./axios";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("this.props.match:", this.props.match);
        console.log("the id is:", this.props.match.params.id);
        //TO DO:
        //we should make a req to our server to get the other user'd data
        //if we try to view our OWN profile by going to /user/OURID then we should make sure
        //to send the user back to the "/" route -> to render our profile component

        if (this.props.match.params.id == 100) {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div>
                <h1> I am the other profile</h1>
                <h2> Hello I am the responsible....</h2>
            </div>
        );
    }
}
