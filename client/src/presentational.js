export default function Presentational({
    first,
    last,
    imageUrl,
    toggleUploader,
}) {
    // console.log("props in Presentational: ", props);

    imageUrl = imageUrl || "default.jpeg";
    return (
        <div>
            <div className="profile">
                <img
                    onClick={toggleUploader}
                    className="profile-pic"
                    src={imageUrl}
                    alt={`${first + last}`}
                />
            </div>
        </div>
    );
}
