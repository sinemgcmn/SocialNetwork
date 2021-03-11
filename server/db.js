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
        WHERE secret_code = '${secretCode}'
    `;

    const params = secretCode;
    return db.query(q, params);
};

////////////PART-4////////PROFILE PIC////////////////

module.exports.selectUserInputForPic = (userId) => {
    const q = `
        SELECT first_name, last_name, imageUrl, id
        FROM users
        WHERE id = ${userId}
    `;

    const params = userId;
    return db.query(q, params);
};

module.exports.updatePic = (userId, url) => {
    const q = `
        UPDATE users
        SET imageurl = $2
        WHERE id = ${userId}
    `;
    const params = [userId, url];
    return db.query(q, params);
};
