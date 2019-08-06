const db = require('../../../data/dbConfig.js');

module.exports = {
    // Used by Lambda X
    getGroupOwners: function(groupId) {
        return db('usersGroupsOwnership')
            .select(
                'usersGroupsOwnership.groupId',
                'users.displayName',
                'users.email'
            )
            .where({ groupId })
            .join('users', 'usersGroupsOwnership.userId', 'users.id');
    },

    getGroupOwnersDetailed: function(groupId) {
        return db('usersGroupsOwnership')
            .select(
                'usersGroupsOwnership.createdAt as ownerCreatedAt',
                'users.*'
            )
            .where({ groupId })
            .join('users', 'usersGroupsOwnership.userId', 'users.id');
    },

    addGroupOwner: async function(owner) {
        await db('usersGroupsOwnership').insert(owner);
        return this.getGroupOwners(owner.groupId);
    },

    deleteGroupOwner: async function(userId, groupId) {
        await db('usersGroupsOwnership')
            .where({ userId, groupId })
            .del();
        return this.getGroupOwners(groupId);
    }
};
