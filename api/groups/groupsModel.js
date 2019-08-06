const db = require('../../data/dbConfig.js');

module.exports = {
    // getAllGroups: function() {
    //     return db('groups');
    // },

    // Used by Lambda X
    getOwnedGroups: function(uid) {
        return db('users as u')
            .select('g.id', 'g.name', 'g.callStatus')
            .innerJoin('usersGroupsOwnership as o', 'u.id', 'o.userId')
            .innerJoin('groups as g', 'o.groupId', 'g.id')
            .where('u.id', uid);
    },
    // Used by Lambda X
    getBelongedGroups: function(uid) {
        return db('users as u')
            .select('g.id', 'g.name', 'g.callStatus')
            .innerJoin('usersGroupsMembership as m', 'u.id', 'm.userId')
            .innerJoin('groups as g', 'm.groupId', 'g.id')
            .where('u.id', uid);
    },
    // Used by Lambda X
    getInvitedGroups: function(uid) {
        return db('users as u')
            .select('g.id', 'g.name', 'g.callStatus')
            .innerJoin('usersGroupsInvitations as i', 'u.id', 'i.userId')
            .innerJoin('groups as g', 'i.groupId', 'g.id')
            .where('u.id', uid);
    },
    // Used by Lambda X
    addGroup: async function(groupName, uid) {
        const [id] = await db('groups').insert({ name: groupName }, ['id']);
        await db('usersGroupsOwnership').insert({
            userId: uid,
            groupId: id.id
        });
        return db('groups')
            .where('id', id.id)
            .first();
    },
    // Used by Lambda X
    getGroupByID: async function(id, uid) {
        // Checks usersGroupsMembership table for matching group that the user is a part of
        let member = await db('groups as g')
            .select(
                'g.id',
                'g.name',
                'g.phoneNumber',
                'g.callStatus',
                'g.createdAt'
            )
            .innerJoin('usersGroupsMembership as m', 'g.id', 'm.groupId')
            .where('groupId', id)
            .where('m.userId', uid);
        // Checks usersGroupsOwnership table for matching group that the user is a part of
        let owner = await db('groups as g')
            .select(
                'g.id',
                'g.name',
                'g.phoneNumber',
                'g.callStatus',
                'g.createdAt'
            )
            .innerJoin('usersGroupsOwnership as o', 'g.id', 'o.groupId')
            .where('groupId', id)
            .where('o.userId', uid);
        if (member[0]) {
            return member[0];
        }
        if (owner[0]) {
            return owner[0];
        }
        return -1;
    },

    updateGroup: function(id, changes) {
        return db('groups')
            .where({ id })
            .update(changes)
            .then(count => (count > 0 ? this.getGroupByID(id) : null));
    },

    deleteGroup: function(id) {
        return db('groups')
            .where({ id })
            .del();
    }
};
