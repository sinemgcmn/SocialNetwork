export default function Presentational({
    first,
    last,
    imageUrl,
    toggleUploader,
    classForImg,
    classForImgSmall,
}) {
    // console.log("props in Presentational: ", props);

    imageUrl = imageUrl || "default.jpeg";
    return (
        <div>
            <div className={classForImg}>
                <img
                    onClick={toggleUploader}
                    className={classForImgSmall}
                    src={imageUrl}
                    alt={`${first + last}`}
                />
            </div>
        </div>
    );
}
