import axios from "axios";

export async function receiveFriends() {
    const { data } = await axios.get("/api/friends");
    // .then((data) => console.log(data));
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        friendsAndWannabes: data.success,
    };
}

// WANNABIES

export async function acceptFriends(id) {
    console.log("accept-id", id);
    await axios.post(`/accept/${id}`);
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        id,
    };
}

export async function declineFriends(id) {
    console.log("decline-id", id);
    await axios.post(`/decline/${id}`);
    return {
        type: "DECLINE_FRIEND_REQUEST",
        id,
    };
}

//UNFRIENDS

export async function unfriend(id) {
    console.log("unfriend", id);
    await axios.post(`/unfriend/${id}`);
    console.log("unfriend-id", id);
    // .then(({ rows }) => console.log(rows));
    return {
        type: "UNFRIENDS",
        id,
    };
}
