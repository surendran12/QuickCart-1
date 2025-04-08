import mongoose from "mongoose";

let cached = global.mongoose

if(!cached) {
    cached = global.mongoose = { conn: null, promise: null}
}

async function connectedDB() {
    if(cached.conn) {
        return cached.conn
    }

    if(!cached.promise) {
        const opts = {
            bufferCommends:false
        }

        cached.promise = mongoose.connect(`${proccess.env.MONGODB_URI}/quickcart`, opts).then(mongoose => {
            return mongoose
        })
    }

    cached.conn = await cached.promise
    return cached.conn
}

export default connectedDB