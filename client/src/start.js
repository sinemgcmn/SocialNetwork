import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
//the redux-promise middleware allows you to pass to dispatch a promise that will resolve with an action rather than just an action.
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);
import { init } from "./socket";

import Footer from "./footer";
import Header from "./header";
import Welcome from "./welcome";
import App from "./app";

let elem;
if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    init(store); // this will be init and this will init the init fucntion in socket.io
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
ReactDOM.render(<Footer />, document.querySelector("footer"));
ReactDOM.render(<Header />, document.querySelector("header"));
