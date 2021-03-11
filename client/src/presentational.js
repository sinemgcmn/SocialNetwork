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
                <h1 className="profileName">
                    {first} {last}
                </h1>
                <img
                    onClick={() => toggleUploader()}
                    className="profile-pic"
                    src={imageUrl}
                />
            </div>
        </div>
    );
}
