import axios from "./axios";
import React from "react";

export default class BioEditor extends React.Component {
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
        console.log("props in grandchild", this.props);
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
        console.log(this.state.bioDraft);
        axios
            .post("/bio", { bioDraft: this.state.bioDraft })
            .then((response) => {
                console.log("datafromupdateBioinEditor:", response);
                if (response.data.success) {
                    this.props.updateBio(this.state.bioDraft);
                    this.setState({
                        editModeIsOn: false,
                    });
                }
            })
            .catch(function (err) {
                console.log("error from post req", err);
            });
    }

    handleChange(e) {
        this.setState(
            {
                bioDraft: e.target.value,
            },
            () => console.log("this state after setState:", this.state)
        );
    }

    toggleBioEditor() {
        this.setState({
            editModeIsOn: !this.state.editModeIsOn,
        });
    }

    render() {
        return (
            <>
                <h1>{this.props.bio}</h1>

                {!this.state.editModeIsOn && (
                    <button
                        onClick={() => this.toggleBioEditor()}
                        onChange={(e) => this.handleChange(e)}
                        className="regButton"
                    >
                        {this.state.btnTxt}
                    </button>
                )}

                {this.state.editModeIsOn && (
                    <div>
                        <textarea
                            onChange={(e) => this.handleChange(e)}
                            defaultValue={this.props.bio}
                        />
                        <button
                            className="regButton"
                            onChange={(e) => this.handleChange(e)}
                            onClick={() => this.updateBioinEditor()}
                        >
                            Save
                        </button>
                    </div>
                )}
            </>
        );
    }
}