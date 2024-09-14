import mongoose from 'mongoose'
import config from '../config/config'
// import { Pool } from 'pg';
import userModel from '../model/userModel';
import { IUser } from '../types/userType';
import blogModel from '../model/blogModel';
import { IBlog } from '../types/blogType';

// const pgPool = new Pool({
//     host: config.POSTGRES_HOST,
//     port: parseInt(config.POSTGRES_PORT ?? '5432', 10),
//     user: config.POSTGRES_USER,
//     password: config.POSTGRES_PASSWORD,
//     database: config.POSTGRES_DB,
// });


export default {
    mongoConnect: async () => {
        try {
            // Attempt to connect to the MongoDB database
            await mongoose.connect(config.MONGODB_DATABASE_URL as string);
            // Return a connection object for further logging if needed
            return mongoose.connection;
        } catch (error) {
            throw error

        }
    },
    //postgres connection
    // postgresConnect: async () => {
    //     try {
    //         await pgPool.connect();
    //         return pgPool;
    //     } catch (error) {
    //         throw error;

    //     }
    // },
    findUserByEmail: (email: string) => {
        return userModel.findOne({ email: email });
    },
    registerUser: (payload: IUser) => {
        return userModel.create(payload);
    },
    createBlog:(payload: IBlog) => {
        return blogModel.create(payload);
    },
    getById: (_id: string) => {
        return blogModel.findById(_id);
    },
    getAllBlogs: () => {
        return blogModel.find({});
    },
    update: (_id: string, p0: { title: string; content: string; image_url: string; }) => {
        return blogModel.updateOne({ _id }, { $set: p0 });
    },
    delete: (_id: string) => {
        return blogModel.deleteOne({ _id });
    },

}
