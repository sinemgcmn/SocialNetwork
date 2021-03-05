import React from "react";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    handleChange(e) {
        console.log("change is running");
        console.log("e.target.value:", e.target.value);
        this.setState(
            {
                first: e.target.value, // first refers the first input
                //set state is async
            },
            () => console.log("this state:", this.state)
        );
    }
    // console.log("this state:", this.state);
    // so be careful that
    //this console.log can be run before this.state statement done.

    render() {
        return;
        <div>
            <h1>Registration</h1> // JSX... looks like html BUT it is JS.
            <input
                name="first"
                placeholder="first"
                onChange={this.handleChange}
            />
            <input
                name="last"
                placeholder="last"
                onChange={this.handleChange}
            />
            <input
                name="email"
                placeholder="email"
                onChange={this.handleChange}
            />
            <input
                name="password"
                placeholder="password"
                onChange={this.handleChange}
            />
            <button></button>
        </div>;
    }
}
