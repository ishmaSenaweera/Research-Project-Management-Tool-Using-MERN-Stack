const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supervisorGroupSchema = new mongoose.Schema({
    groupid: {
        type: String,
        required: true
    },
    supervisorid: {
        type: String,
        required: true
    },
    isAccepted: {
        type: Boolean,
        default: null
    },
    supervisorLastUpdate: {
        type: Date,
        default: null
    }
});
const SupervisorGroup = mongoose.model("SupervisorGroup", supervisorGroupSchema);

module.exports = SupervisorGroup;