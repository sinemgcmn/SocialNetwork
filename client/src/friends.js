//you'll need to use useSelector hook TWICE to accomplish this.
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
    receiveFriends,
    acceptFriends,
    declineFriends,
    unfriend,
} from "./actions";

export default function FriendOrNot() {
    const dispatch = useDispatch();
    const friends = useSelector(
        (state) =>
            state.friendsAndWannabes &&
            state.friendsAndWannabes.filter((friend) => friend.accepted == true)
    );

    const wannabies = useSelector(
        (state) =>
            state.friendsAndWannabes &&
            state.friendsAndWannabes.filter(
                (wannabie) => wannabie.accepted == false
            )
    );

    console.log("wannabies", wannabies);
    console.log("friends", friends);

    useEffect(() => {
        dispatch(receiveFriends());
    }, []);

    if (!friends) {
        return null;
    }

    if (!wannabies) {
        return null;
    }

    return (
        <div>
            <div className="searchRecentFriends">
                <h1 className="mostRecentHeadline">Friends</h1>
                <div className="mostRecent">
                    {friends &&
                        friends.map((friend) => {
                            return (
                                <div key={friend.id}>
                                    <div className="mostRecentImg">
                                        <Link to={`/user/${friend.id}`}>
                                            <img src={friend.imageurl} />
                                        </Link>
                                    </div>
                                    <div className="mostRecentNames">
                                        <p>
                                            {friend.first_name}{" "}
                                            {friend.last_name}
                                        </p>

                                        <button
                                            className="friendButton"
                                            onClick={() =>
                                                dispatch(unfriend(friend.id))
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>

            <div className="searchResult">
                <h1 className="mostRecentHeadline">Friend Requests</h1>
                <div className="mostSearch">
                    {wannabies &&
                        wannabies.map((wannabie) => {
                            return (
                                <div key={wannabie.id}>
                                    <div className="mostRecentImg">
                                        <Link to={`/user/${wannabie.id}`}>
                                            <img src={wannabie.imageurl} />
                                        </Link>
                                    </div>
                                    <div className="mostRecentNames">
                                        <p>
                                            {wannabie.first_name}{" "}
                                            {wannabie.last_name}
                                        </p>

                                        <button
                                            className="friendButtonWannabies"
                                            onClick={() =>
                                                dispatch(
                                                    acceptFriends(wannabie.id)
                                                )
                                            }
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="friendButtonWannabies"
                                            onClick={() =>
                                                dispatch(
                                                    declineFriends(wannabie.id)
                                                )
                                            }
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
