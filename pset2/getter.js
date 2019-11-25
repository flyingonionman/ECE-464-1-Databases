/*
  Connection to the Mongodb
*/
const CONNECTION_URL = "mongodb+srv://Meandros:N5088EvzpPRK1f9W@cluster0-vygef.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "Cluster0";
const mongoose = require('mongoose')
const userSchema = require('./userSchema.js')

async function run() {
    console.log("Running...");

    await mongoose.connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    choice = await process.argv[2];
    holder = await process.argv[3];
    console.log(choice);

    console.log(holder);
    if (choice == "rank"){
        const User = mongoose.model('user', userSchema, 'user')
        const docs = await User.find({rank : holder});
        console.log(docs);
        process.exit(0);
    }

    if (choice == "name"){
        const User = mongoose.model('user', userSchema, 'user')
        const docs = await User.find({name : holder});
        console.log(docs);
        process.exit(0);
    }
    
  }
  
run()