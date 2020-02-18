const mongoCollections = require("../config/mongoCollections");
const location= mongoCollections.location;
var ObjectId = require('mongodb').ObjectId;

const getLocationById = async function getLocationById(id){
    const locationCollection = await location();

    var o_id = new ObjectId(id);

    const commentOne = await locationCollection.findOne({ _id: o_id });
}
const postLocation = async function postLocation(IP, latitude, longitude, city, ak) {
    // if (!title || typeof title !== 'string') throw "Pleas enter valid title.";
    // if (!description || typeof description !== 'string') throw "Pleas enter valid description.";
    // if (typeof completed !== 'boolean') throw "Please enter valid boolean value for completed task.";
    // if (!hoursEstimated || typeof hoursEstimated !== 'number') throw "Please enter valid hours estimated.";

    const locationCollection = await location();
    const dateTime = new Date().toDateString('en-US');
    
 
    const locationInfo = {
        id: await locationCollection.count()+1,
        ip: IP,
        latitude: latitude,
        longitude: longitude,
        city: city,
        date: dateTime,
        ak: ak
    }

    const insertInfo = await locationCollection.insertOne(locationInfo);

    const id = insertInfo.insertedId.toString();
    return await this.getLocationById(id);
}

const getAll = async function getAll() {
    const locationCollection = await location();

    const All = await locationCollection.find({}).toArray();
    return All;
}

const getOne= async function getOne(ak){
    const locationCollection = await location();

    

    const locOne = await locationCollection.find({ ak: ak }).toArray();
    return locOne.reverse();
}

module.exports = {
    postLocation,
    getAll,
    getLocationById,
    getOne
}