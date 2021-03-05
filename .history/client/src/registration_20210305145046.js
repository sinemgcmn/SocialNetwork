import React from "react";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {};
        //method 1 - binding
        //method 2 = arrow function
    }

    handleChange(e) {
        console.log("change is running");
        console.log("e.target.value:", e.target.value);
        this.setState(
            {
                [e.target.name]: e.target.value,
                // first: e.target.value, // first refers the first input
                //set state is async
            },
            () => console.log("this state:", this.state)
        );
    }
    // console.log("this state:", this.state);
    // so be careful that
    //this console.log can be run before this.state statement done.

    render() {
        return (
            <div>
                <h1>Registration</h1>

                <input
                    name="first"
                    placeholder="first"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="last"
                    placeholder="last"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="email"
                    placeholder="email"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="password"
                    placeholder="password"
                    onChange={(e) => this.handleChange(e)}
                />
                <button></button>
            </div>
        );
    }
}
