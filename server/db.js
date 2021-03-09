const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/social"
);

////////////PART-1////////////////////////

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

////////////PART-3////////////////////////

module.exports.userInputForReset = (email, secretCode) => {
    const q = `
        INSERT INTO reset_codes (email, secret_code)
        VALUES ($1, $2)
        RETURNING id;
    `;
    const params = [email, secretCode];
    return db.query(q, params);
};
