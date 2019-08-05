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

    getGroupByID: function(id) {
        return db('groups')
            .where({ id })
            .first();
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
