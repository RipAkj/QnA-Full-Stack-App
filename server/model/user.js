import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    UserName: { type: String, required: true },
    EmailId: { type: String, required: true },
    Password: { type: String, required: true },
    id: { type: String },
})

export default mongoose.model('User', userSchema);