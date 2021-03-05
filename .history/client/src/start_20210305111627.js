import ReactDOM from "react-dom";

ReactDOM.render(<HelloWorld />, document.querySelector("main"));

///this is our component////
function HelloWorld() {
    return <div>Hello, World!</div>;
}
