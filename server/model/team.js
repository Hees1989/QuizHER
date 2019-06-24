const mongoose = require('mongoose');
require('./quiz');
mongoose.set('debug', true);


const teamSchema = new mongoose.Schema(
    {
        quiz:{type:mongoose.Schema.Types.ObjectId, req: 'Quiz'},
        teamName: {type: String, required: true},
        answer: {type: String},
        score: {type: Number},
    }
);

const Teams = mongoose.model('Teams',teamSchema,'Teams');


module.exports = Teams;