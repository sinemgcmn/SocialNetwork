import React from "react";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    handleChange(e) {
        console.log("change is running");
        console.log("e.target.value:", e.target.value);
    }

    render() {
        return;
        <div>
            <h1>Registration</h1> // JSX... looks like html BUT it is JS.
            <input
                name="first"
                placeholder="first"
                onChange={this.handleChange}
            />
            //onchange is reactv syntax but handlechange is function we define
            so you cannot change onchange but you can call handlechange whatever
            you like!!!//
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
