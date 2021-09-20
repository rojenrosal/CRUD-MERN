const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();

const GroceryModel = require('./models/Grocery');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://newuser:rojen@crud.aiprm.mongodb.net/grocery?retryWrites=true&w=majority", {
    useNewUrlParser: true,
});

app.post('/insert', async (req,res) => {

    const itemName = req.body.itemName;
    const amount = req.body.amount;
    const grocery = new GroceryModel({itemName: itemName , itemLastPurschase: amount });
    try{
        await grocery.save();
        res.send("inserted data");

    } catch(err){
        console.log(err);
    }
}) ;

app.get("/read", async (req, res) => {
    GroceryModel.find({}, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });


  app.put('/update', async (req,res) => {

    const newItem = req.body.newItem;
    const id = req.body.id;
    
    try{
       await GroceryModel.findById(id, (err, updatedItem) => {
            updatedItem.itemName = newItem;
            updatedItem.save();
        });

    } catch(err){
        console.log(err);
    }
}) ;

app.delete('/delete/:id', async (req,res) => {
const id = req.params.id;

await GroceryModel.findByIdAndRemove(id).exec();
res.setDefaultEncoding("Deleted");
});

app.listen(3001, () => {
    console.log("Server is running on port 3001...");
});