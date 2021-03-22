import BioEditor from "./bioEditor";
import Presentational from "./presentational";

export default function Profile(props) {
    // console.log("props in Profile:", props);
    return (
        <>
            <div className="mostRecentProfile">
                <div className="searchProfile">
                    <h1 className="mostRecentHeadlineProfile">
                        {props.first} {props.last}
                    </h1>
                    <Presentational
                        imageUrl={props.imageUrl}
                        toggleUploader={props.toggleUploader}
                    />
                    <BioEditor
                        bio={props.bio}
                        updateBio={(bio) => props.updateBio(bio)}
                    />
                </div>
            </div>
        </>
    );
}
