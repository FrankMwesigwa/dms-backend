import  mongoose from 'mongoose';

const connection = async () => {
    try {
        const connectionParams = {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify: false,
            useCreateIndex: true,
        };
        await mongoose.connect(process.env.DB_URI, connectionParams);
        console.log("connected to database.");
    } catch (error) {
        console.log(error, "could not connect database.");
    }
};

export default connection;