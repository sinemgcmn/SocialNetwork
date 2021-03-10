// pass 'props' as an argument to get access to the info being passed down from the parent (App)
// we can also use destructuring to pull up the properties inside props
export default function Presentational({ first, last, imageUrl }) {
    // console.log('props in Presentational: ', props);

    imageUrl = imageUrl || "default.jpeg";
    return (
        <div>
            <div className="profile">
                <h1 className="profileName">
                    {first} {last}
                </h1>
                <img className="profile-pic" src={imageUrl} />
            </div>
        </div>
    );
}
