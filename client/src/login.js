import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
    // class component
    constructor() {
        super(); // this must be written where there is a constructor.
        this.state = {
            error: false,
        }; // a sthis has a parent constructor, we should bind the data wirth 'this'.
    }

    handleClick() {
        // console.log("clicked!");
        axios
            .post("/login", this.state)
            .then(({ data }) => {
                console.log("data:", data);
                if (data.success === true) {
                    location.replace("/");
                } else if (data.success === false) {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("err in axios POST/ registration:", err);
            });
    }

    handleChange(e) {
        //To handle the changes coming from user interface, we should you HANDLECHANGE function and SETSTATE.
        //setState() enqueues changes to the component state and tells React
        //that this component and its children need to be re-rendered with the updated state.
        // console.log("change is running");
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            // this callback runs after setState finishes updating state
            // because we're logging state here in the callback, this means this
            // log won't run until state has been updated, ensuring us that
            // we're seeing the most updated log
            () => console.log("this state after setState:", this.state)
        );
    }

    render() {
        return (
            <div>
                <h1 className="headerTop">CATPSTER</h1>
                <p className="headerBottom">
                    We Always Celebrate Caturday in Berlin
                </p>
                {this.state.error && <h1> something went wrong</h1>}
                <input
                    className="regInputs"
                    name="email"
                    placeholder="email"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    className="regInputs"
                    name="password"
                    placeholder="password"
                    onChange={(e) => this.handleChange(e)}
                />
                <button onClick={() => this.handleClick()}> Submit</button>
            </div>
        );
    }
}
