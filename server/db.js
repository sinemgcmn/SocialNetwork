const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/social"
);

////////////PART-1//////REG AND LOG//////////////////

module.exports.userInputForReg = (first, last, email, password) => {
    const q = `
        INSERT INTO users (first_name, last_name, email, password_hash)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
    `;
    const params = [first, last, email, password];
    return db.query(q, params);
};

module.exports.userInputForLog = (email) => {
    const q = `
        SELECT email, password_hash, id
        FROM users  
        WHERE email = '${email}'
    `;

    const params = email;
    return db.query(q, params);
};

////////////PART-3//////RESET//////////////////

module.exports.userInputForReset = (email, secretCode) => {
    const q = `
        INSERT INTO reset_codes (email, secret_code)
        VALUES ($1, $2)
        RETURNING id;
    `;
    const params = [email, secretCode];
    return db.query(q, params);
};

module.exports.userCodeForReset = (secretCode) => {
    const q = `
        SELECT secret_code 
        FROM reset_codes  
        WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';
    `;

    const params = secretCode;
    return db.query(q, params);
};

module.exports.updatePassword = (email, password) => {
    const q = `
        UPDATE users
        SET password_hash = $2
        WHERE email = $1;
    `;
    const params = [email, password];
    return db.query(q, params);
};

module.exports.selectFromResetCode = (secretCode) => {
    const q = `
        SELECT email
        FROM reset_codes  
        WHERE secret_code = '${secretCode}';
    `;

    const params = secretCode;
    return db.query(q, params);
};

////////////PART-4////////PROFILE PIC////////////////

module.exports.selectUserInputForPic = (userId) => {
    const q = `
        SELECT first_name, last_name, imageUrl, bio, id
        FROM users
        WHERE id = ${userId};
    `;

    const params = userId;
    return db.query(q, params);
};

module.exports.updatePic = (userId, url) => {
    const q = `
        UPDATE users
        SET imageurl = $2
        WHERE id = $1
        RETURNING imageurl;
    `;
    const params = [userId, url];
    return db.query(q, params);
};

////////////PART-5////////BIO////////////////
module.exports.updateBioInfo = (userId, bio) => {
    const q = `
        UPDATE users
        SET bio = $2
        WHERE id = $1
        RETURNING bio;
    `;
    const params = [userId, bio];
    return db.query(q, params);
};

////////////PART-7////////FILTER////////////////

module.exports.resultUsers = () => {
    const q = `
        SELECT first_name, last_name, imageUrl, id
        FROM users
        ORDER BY id DESC
        LIMIT 6;
    `;
    return db.query(q);
};

module.exports.filterUsers = (searchTerm) => {
    const q = `
    SELECT first_name,last_name, imageUrl, id
    FROM users
    WHERE first_name ILIKE $1
    LIMIT 5;
    `;

    const params = [searchTerm + "%"];
    return db.query(q, params);
};

////////////PART-8////////REQUEST////////////////

module.exports.insertFriendInfo = (sender, recipient) => {
    const q = `
        INSERT INTO friendships (sender_id, recipient_id)
        VALUES ($1, $2)
        RETURNING id;
    `;

    const params = [sender, recipient];
    return db.query(q, params);
};

module.exports.updateAcceptedInfo = (id, accepted) => {
    const q = `
        UPDATE friendships
        SET accepted = $2
        WHERE id = $1;
    `;
    const params = [id, accepted];
    return db.query(q, params);
};

module.exports.deleteFriendInfo = (id) => {
    const q = `
        DELETE 
        FROM friendships 
        WHERE id = $1;
    `;
    const params = [id];
    return db.query(q, params);
};

module.exports.selectFriendship = (sender, recipient) => {
    const q = `
        SELECT * FROM friendships 
        WHERE (recipient_id = $1 AND sender_id = $2) 
        OR (recipient_id = $2 AND sender_id = $1);
    `;

    const params = [sender, recipient];
    return db.query(q, params);
};

///////PART 9///////////////

module.exports.selectFriendsAndWannabes = (user) => {
    const q = `
        SELECT users.id, first_name, last_name, imageurl, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
    `;

    const params = [user];
    return db.query(q, params);
};

//////PART-10///////////

module.exports.selectMessage = () => {
    const q = `
        SELECT users.id, messages.id, first_name, last_name, imageurl, chat
        FROM messages
        JOIN users
        ON (sender_id = users.id)
        ORDER BY messages.id DESC
        LIMIT 10
    `;

    return db.query(q);
};

module.exports.insertMessage = (chat, sender) => {
    const q = `
        INSERT INTO messages (chat, sender_id)
        VALUES ($1, $2)
        RETURNING id;
    `;

    const params = [chat, sender];
    return db.query(q, params);
};

module.exports.selectInfoFromMessage = () => {
    const q = `
        SELECT users.id, messages.id, first_name, last_name, imageurl, chat
        FROM messages
        JOIN users
        ON (sender_id = users.id)
    `;

    return db.query(q);
};

//// bonus- delete////

module.exports.forgetUser = (userId) => {
    const q = `
        DELETE
        FROM users
        WHERE id = $1;
    `;
    const params = userId;
    return db.query(q, params);
};

module.exports.forgetFriendship = (userId) => {
    const q = `
        DELETE
        FROM friendships
        WHERE (recipient_id = $1 OR sender_id = $1) 
    `;
    const params = userId;
    return db.query(q, params);
};

module.exports.forgetMessages = (userId) => {
    const q = `
        DELETE
        FROM messages
        WHERE sender_id = $1;
    `;
    const params = userId;
    return db.query(q, params);
};

module.exports.getPhotoUrl = (userId) => {
    const q = `
    SELECT imageUrl
    FROM users
    WHERE id = ${userId};
    `;
    const params = userId;
    return db.query(q, params);
};
