import { allMessages, recentMessage } from "./actions";
import { io } from "socket.io-client";
export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (msgs) => store.dispatch(allMessages(msgs)));

        socket.on("chatMessage", (msg) => store.dispatch(recentMessage(msg)));
    }
};
