const mongoose = require('mongoose')
//mongo password aditya
//const mongoURI = 'mongodb+srv://aditya:aditay@demo-cluster.vyvkn46.mongodb.net/coffeebyus?retryWrites=true&w=majority' 
const mongoURI = 'mongodb+srv://aditya:aditya@demo-cluster.nii2ouy.mongodb.net/coffeebyus?retryWrites=true&w=majority' 
module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        
          if (err) console.log("error is" + err)
          else {
            console.log("connected to mongo")
             const fetched_data = await mongoose.connection.db.collection("sample");
             fetched_data.find({}).toArray(async function (err, data) {
                 if(err) console.log(err);
                 else console.log(data);
                    const categoryCollection = await mongoose.connection.db.collection("Categories");
                  categoryCollection.find({}).toArray(async function (err, Catdata) {
                      callback(err, data, Catdata);

                })
            });
            
        }
     }) 
 };
