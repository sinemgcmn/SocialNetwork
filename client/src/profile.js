import BioEditor from "./bioEditor";
import Presentational from "./presentational";

export default function Profile(props) {
    // console.log("props in Profile:", props);
    return (
        <>
            <h1 className="profileName">
                {props.first} {props.last}
            </h1>
            <Presentational
                imageUrl={props.imageUrl}
                toggleUploader={props.toggleUploader}
            />
            <BioEditor bio={props.bio} updateBio={props.updateBio} />
        </>
    );
}
