import { model, models, Schema } from 'mongoose'

const CourseSchema = new Schema({
    year: { type: String },
    subject: { type: String },
    course: { type: String },
    term: { type: String },
})

const Courses = models.courses || model("courses", CourseSchema)
export default Courses