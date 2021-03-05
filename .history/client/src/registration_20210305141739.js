import React from "react";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return;
        <div>
            <h1>Registration</h1> // JSX... looks like html BUT it is JS.
            <input
                name="first"
                placeholder="first"
                onChange={this.handleChange}
            />{" "}
            //onchange is reactv syntax but handlechange is function we define
            so you cannot change onchange but you can call handlechange whatever
            you like!!!
            <input name="last" placeholder="last" />
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <button></button>
        </div>;
    }
}
