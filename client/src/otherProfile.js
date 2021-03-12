import { Component } from "react";
import axios from "./axios";

export default class OtherProfile extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <div>
                <h1> I am the other profile</h1>
                <h2> Hello I am the responsible....</h2>
            </div>
        );
    }
}
