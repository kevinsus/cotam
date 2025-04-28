import { model, models, Schema } from 'mongoose'

// To interact with mongodb database (sending types and properties to the db)
const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exist!'],
        required: [true, 'Email is required!']
    },
    username: {
        type: String,
        required: [true, 'Email is required!']
    },
    image: {
        type: String,
    },
    password: {
        type: String,
    },
})

// Models = object provided by Mongoose containing all registered models
// Model = represents the user information

// In Express JS which requires the backend to run continuously
// In Next JS, the routes is created and run only when they are called

const User = models.users || model("users", UserSchema)
export default User