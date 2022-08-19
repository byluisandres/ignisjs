import mongoose from "mongoose";

const database = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const url = `${connection.connection.host}: ${connection.connection.port}`;
        console.log(`connection in ${url}`);

    } catch (error) {
        console.log(`error ${error.message}`);
        process.exit(1);
    }
}

export default database;