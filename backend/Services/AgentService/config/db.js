import mongoose from 'mongoose'
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo DB connected ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error connecting to Database ${error}`)
    }
}
export default connectDB