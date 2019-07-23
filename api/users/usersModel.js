const db = require('../../data/dbConfig.js');

module.exports = {
    getUsers: function() {
        return db('users');
    },

    getUserById: async function(id) {
        let user = await db('users')
            .where({ id })
            .first();
        if (user) {
            return usser;
        } else {
            return -1;
        }
    },

    getUserByEmail: async function(email) {
        let user = await db('users')
            .where({ email })
            .first();
        if (user) {
            return usser;
        } else {
            return -1;
        }
    },

    addUser: async function(user) {
        await db('users').insert(user);
        return this.getUserById(user.id);
    },

    getUserAccountBalance: function(id) {
        return db('users')
            .where({ id: id })
            .first()
            .select('accountBalance');
    },

    getLast4: function(id) {
        return db('users')
            .where({ id: id })
            .first()
            .select('last4');
    },

    updateUser: function(id, changes) {
        return db('users')
            .where({ id })
            .update(changes)
            .then(count => (count > 0 ? this.getUserById(id) : null));
    },

    deleteUser: async function(id) {
        const activitiesDeleted = await db('activities')
            .where('userId', '=', `${id}`)
            .del();
        if (activitiesDeleted >= 0) {
            return db('users')
                .where({ id })
                .del();
        }
    }
};
