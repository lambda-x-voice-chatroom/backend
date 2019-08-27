const router = require('express').Router();

const groupsModel = require('./groupInviteesModel');
const usersModel = require('../../users/usersModel');

// api/groups/:id/groupInvitees

router.get('/', async (req, res) => {
    let id = req.groupId;
    try {
        const owners = await groupsModel.getGroupInvitees(id);
        res.status(200).json(owners);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/detailed', async (req, res) => {
    let id = req.groupId;
    try {
        const members = await groupsModel.getGroupInviteesDetailed(id);
        res.status(200).json(members);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Lambda X - Invites member to group and returns list of all invitees
router.post('/', async (req, res) => {
    let groupId = req.groupId;
    // let invitee = { ...req.body, groupId };
    // console.log(req.body.email);
    try {
        let user = await usersModel.getUserByEmail(req.body.email);

        if (user == -1) {
            res.status(404).json({ message: 'User not found' });
        } else {
            let invitee = { userId: user.id, groupId };
            const updatedGroup = await groupsModel.addGroupInvitee(invitee);

            res.status(201).json(updatedGroup);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// api/groups/:id/groupInvitees/:id

router.delete('/:id', async (req, res) => {
    let groupId = req.groupId;
    let userId = req.params.id;
    try {
        const updatedGroup = await groupsModel.deleteGroupInvitee(
            userId,
            groupId
        );
        res.status(200).json(updatedGroup);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
