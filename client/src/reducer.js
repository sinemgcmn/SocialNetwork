export default function (state = {}, action) {
    // series of IF statements....
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        state = {
            ...state,
            friendsAndWannabes: action.friendsAndWannabes,
        };
    }

    if (action.type == "UNFRIENDS") {
        state = {
            ...state,
            friendsAndWannabes: state.friendsAndWannabes.filter((user) => {
                if (user.id != action.id) {
                    return {
                        ...user,
                    };
                }
            }),
        };
    }

    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        state = {
            ...state,
            friendsAndWannabes: state.friendsAndWannabes.map((user) => {
                if (user.id == action.id) {
                    return {
                        ...user,
                        accepted: false,
                    };
                } else {
                    return user;
                }
            }),
        };
    }

    if (action.type == "DECLINE_FRIEND_REQUEST") {
        state = {
            ...state,
            friendsAndWannabes: state.friendsAndWannabes.map((user) => {
                if (user.id != action.id) {
                    return {
                        ...user,
                        accepted: false,
                    };
                } else {
                    return user;
                }
            }),
        };
    }

    if (action.type == "GET_ALL_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.chatMessages,
        };
    }

    if (action.type == "GET_LAST_MESSAGE") {
        state = {
            ...state,
            chatMessages: [...state.chatMessages, action.chatMessage],
        };
    }

    console.log("state", state);
    return state;
}
