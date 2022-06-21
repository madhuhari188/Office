import mongoose from "mongoose";

const Schema = mongoose.Schema;

const dubSchema = new Schema({
   Data:[ {URL:String,
    ['Total(sec)']:String,
    ['Active(sec)']:String,
    Domain:String,
    Page:String,
    Title:String}]
});

const Dumb = mongoose.model('Dumb',dubSchema);

export default Dumb;