import ReactDOM from "react-dom";

ReactDOM.render(<HelloWorld />, document.querySelector("main"));

///this is our component////
function HelloWorld() {
    const name = "Andrea";
    return 
    (  <div>Hello, {name}!</div>;)
  
}
