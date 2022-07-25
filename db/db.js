import mongoose from 'mongoose';

(async () => {
    try {
        const db = await mongoose.connect('mongodb://localhost/voting-app', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log(`database is connected to: ${db.connection.name}`);

    } catch (error) {
        console.error(error);
    }
})()