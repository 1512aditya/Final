const mongoose = require('mongoose')
//const mongoURI = 'mongodb+srv://aditya:aditya@demo-cluster.nii2ouy.mongodb.net/coffeebyus?retryWrites=true&w=majority' 
const mongoURI = 'mongodb+srv://aditya:aditya123@demo-cluster.vyvkn46.mongodb.net/coffeebyus?retryWrites=true&w=majority'
const mongodb = async () => {
    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {

        if (err) console.log("--", err);
        else {
            console.log("connected to mongo");
            const fetched_data = await mongoose.connection.db.collection("sample1");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCatagory = await mongoose.connection.db.collection("food_catagories");
                foodCatagory.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        global.sample = data;
                        global.foodCatagory = catData;
                    }
                })
            })

        }
    });
}

module.exports = mongodb();