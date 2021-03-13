import React from "react";
import axios from "./axios";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bioDraft: "",
            btnTxt: "",
            editModeIsOn: false,
        };
        console.log("props in BioEditor: ", props);
    }

    componentDidMount() {
        // console.log("grandchild just mounted");
        // console.log("props in grandchild", this.props);
        if (this.props.bio) {
            this.setState({
                btnTxt: "edit",
            });
        } else {
            this.setState({
                btnTxt: "add",
            });
        }
    }

    updateBioinEditor() {
        axios
            .post("/bio")
            .then(({ data }) => {
                console.log("datafromeditor:", data);
                this.props.updateBio(data.bio);
            })

            .catch(function (err) {
                console.log("error from post req", err);
            });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    toggleBioEditor() {
        this.setState({
            editModeIsOn: !this.state.editModeIsOn,
        });
    }

    render() {
        return (
            <>
                {!this.props.bio && (
                    <button className="regButton">{this.state.btnTxt}</button>
                )}

                {this.props.bio && (
                    <button
                        onClick={() => this.toggleBioEditor()}
                        className="regButton"
                    >
                        {this.state.btnTxt}
                    </button>
                )}

                {this.state.editModeIsOn && (
                    <textarea
                        onChange={(e) => this.handleChange(e)}
                        defaultValue={this.props.bio}
                    />
                )}
            </>
        );
    }
}

// {
//     /* {
//                     (this.state.editModeIsOn && (
//                         <textarea defaultValue={this.props.bio} />
//                     ),
//                     (
//                         <button
//                             className="regButton"
//                             onClick={(e) => this.updateBioinEditor(e)}
//                         >
//                             Save
//                         </button>
//                     ))
//                 } */
// }
