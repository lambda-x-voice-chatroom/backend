const db = require('../../data/dbConfig.js');

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    addUser,
    getUserAccountBalance,
    getLast4,
    updateUser,
    deleteUser
};

function getUsers() {
    return db('users');
}

/**
 *
 * @param {string} id
 */
async function getUserById(id) {
    let user = await db('users')
        .where({ id })
        .first();
    if (user) {
        return user;
    } else {
        return -1;
    }
}

/**
 *
 * @param {string} email
 */
async function getUserByEmail(email) {
    let user = await db('users')
        .where({ email })
        .first();
    if (user) {
        return usser;
    } else {
        return -1;
    }
}

/**
 *
 * @param {string} user
 */
async function addUser(user) {
    await db('users').insert(user);
    return getUserById(user.id);
}

/**
 *
 * @param {string} id
 */
function getUserAccountBalance(id) {
    return db('users')
        .where({ id: id })
        .first()
        .select('accountBalance');
}

/**
 *
 * @param {string} id
 */
function getLast4(id) {
    return db('users')
        .where({ id: id })
        .first()
        .select('last4');
}

/**
 *
 * @param {string} id
 * @param {object} changes
 *
 * Returns update user
 */
async function updateUser(id, changes) {
    await db('users')
        .where({ id })
        .update(changes);

    const user = await db('users')
        .where({ id })
        .first();

    return user;
}

/**
 *
 * @param {string} id
 */
async function deleteUser(id) {
    const activitiesDeleted = await db('activities')
        .where('userId', '=', `${id}`)
        .del();
    if (activitiesDeleted >= 0) {
        return db('users')
            .where({ id })
            .del();
    }
}
