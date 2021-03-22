//this where we are going to add listeners
// import { chatMessages, chatMessage } from "./actions";
import { io } from "socket.io-client";

//this will be set up if the below function is called.
export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect(); //this sets up the connection with client

        // socket.on("chatMessages", (msgs) => store.dispatch(chatMessages(msgs))); //event listener

        // socket.on("chatMessage", (msg) => store.dispatch(chatMessage(msg))); // event listener
    }
};
