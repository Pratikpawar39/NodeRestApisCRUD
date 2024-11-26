const Mongo = require("../db/mongoDB/mongo");
const ObjectID = require("mongodb").ObjectID;
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const { Validator } = require("node-input-validator");


const mongoPool = {
    get() {
      return Mongo.db;
    },
    getObjectId(id) {
      return ObjectID(id);
    },
    async findOne(collection, filter, projection = {}) {
      const result = await Mongo.db
        .collection(collection)
        .findOne(filter, projection);
      return result;
    },
    async count(collection, filter, options = {}) {
      const result = await Mongo.db.collection(collection).count(filter, options);
      return result;
    },
    async find(
      collection,
      filter = {},
      projection = {},
      skip = 0,
      limit = 200000
    ) {
  
      if(skip || limit){
        if(skip < 0){
          return{
            msg: "PARAMETER_ISSUE",
            err: "Skip parameter should be non negative"
          }
        }
  
        if(limit < 0){
          return{
            msg: "PARAMETER_ISSUE",
            err: "limit parameter should be non negative"
          }
        }
      }
  
      const result = await Mongo.db
        .collection(collection)
        .find(filter, projection)
        .skip(skip)
        .limit(limit)
        .toArray();
      return result;
    },
    async findAll(collection, filter, projection = {}, sort = {}) {
      const result = await Mongo.db
        .collection(collection)
        .find(filter, projection)
        .sort(sort)
        .toArray();
      return result;
    },
    async insertOne(collection, insertData) {
      const result = await Mongo.db.collection(collection).insertOne(insertData);
      return result;
    },
    async insertMany(collection, insertData) {
      const result = await Mongo.db.collection(collection).insertMany(insertData);
      return result;
    },
    async updateOne(collection, filter, upsetData) {
      const result = await Mongo.db
        .collection(collection)
        .updateOne(filter, upsetData, { upsert: true });
      return result;
    },
    async updateMany(collection, filter, upsetData) {
      const result = await Mongo.db
        .collection(collection)
        .updateMany(filter, upsetData, { upsert: true });
      return result;
    },
    async remove(collection, filter) {
      const result = await Mongo.db.collection(collection).deleteOne(filter);
      return result;
    },
    async removeAll(collection, filter) {
      const result = await Mongo.db.collection(collection).remove(filter);
      return result;
    },
  };

  const getUuid = () => {
    return uuidv4();
  };

  const checkQueryParams = async (getData, checkData) => {
    const v = new Validator(getData, checkData);
    let matched = await v.check();
  
    if (matched) {
      return v;
    } else {
      return {
        error: "PARAMETER_ISSUE",
        list: v.errors || "SERVER_INTERNAL_ERROR",
      };
    }
  };

  module.exports = {
    mongo: mongoPool,
    moment,
    getUuid,
    checkQueryParams
  }