const { mongo, getUuid, moment } = require('../helper/utils');
const {
    USER_COLLECTION = 'userDetails'
} = process.env;

const UserModel = () => {

    const duplicate = async (name, id) => {
        const query = { name: name.toLowerCase(), _id: { $ne: id } };
        const result = await mongo.findOne(collectionName, query);
      
        if (result) {
          return true;
        }
        return false;
      };

    const get = async (rData , userInfo = {}) => {

        try {   
            
            let result = await mongo.findAll( USER_COLLECTION, {});

            if( result && result.length > 0 ){

                return {
                    status: 200,
                    success: true,
                    status: result,
                    msg: 'Successfully Get Users',
                }

            } else {

                return {
                    status: 400,
                    success: false,
                    status: result || [],
                    msg: 'Users Not Found',
                }
            }
            
        } catch (error) {
            console.log(`getUsers Error:  ${error}`);
            return {
                statusCode: 500,
                status: [],
                success: false,
                msg: 'Internal server Error',
                error: error
            }
        }
    };

    const create = async ( rData , userInfo = {}) => {

        try {

            //validate request Data
            let tCheck = await Util.checkQueryParams(rData, {
                name: "required|string",
                img: "required|string",
                summary: "required|string",
            });
        
            if (tCheck && tCheck.error && tCheck.error == "PARAMETER_ISSUE") {
                return {
                    statusCode: 404,
                    success: false,
                    msg: "PARAMETER_ISSUE",
                    err: tCheck,
                };
            }

            let id = rData.id || getUuid;

            const isDuplicated = await duplicate(rData.name, id);

            if (isDuplicated) {
                return {
                    statusCode: 404,
                    success: false,
                    msg: "DUPLICATE NAME",
                    err: "",
                };
            }

            let insertObj = {
                _id: id,
                name: rData.name,
                img: rData.img,
                summary: rData.summary
            }

            let insertResult = await mongo.insertOne( USER_COLLECTION, insertObj );

            if( insertResult ){

                return {
                    status: 200,
                    success: true,
                    status: insertResult.result,
                    msg: 'Successfully User Created',
                }
            } else {
                return {
                    status: 400,
                    success: false,
                    status: insertResult.result || {},
                    msg: 'Failed To Create User',
                }
            }
            
        } catch (error) {
            console.log(`createUser Error:  ${error}`);
            return {
                statusCode: 500,
                status: [],
                success: false,
                msg: 'Internal server Error',
                error: error
            }
        }
    };


    const update = async (rData , userInfo = {}) => {

        try {
             //validate request Data
            let tCheck = await Util.checkQueryParams(rData, {
                id: "required",
            });

            if (tCheck && tCheck.error && tCheck.error == "PARAMETER_ISSUE") {
                return {
                    statusCode: 404,
                    success: false,
                    msg: "PARAMETER_ISSUE",
                    err: tCheck,
                };
            }

            let filter = {
                _id: rData.id,
            };

            let userDetail = await mongo.findOne( USER_COLLECTION, filter);

            if( userDetail ){

                let upsertData = {};

                if( rData.name && rData.name != userDetail.name ){
                    upsertData.name = rData.name;
                }
                if( rData.img && rData.img != userDetail.img ){
                    upsertData.img = rData.img;
                }
                if( rData.summary && rData.summary != userDetail.summary ){
                    upsertData.summary = rData.summary;
                }

                let updateResult =  await mongo.updateOne(USER_COLLECTION, filter, upsertData);

                if( updateResult ){
                    return {
                        status: 200,
                        success: true,
                        status: updateResult.result || [],
                        msg: 'Successfully Updated User',
                    }
                } else {
                    return {
                        status: 400,
                        success: false,
                        status: [],
                        msg: 'Failed to Update User',
                    }
                }

            } else {

                return {
                    status: 400,
                    success: false,
                    status: [],
                    msg: 'User Details Not Found',
                }
            }
            
        } catch (error) {
            console.log(`updateUser Error:  ${error}`);
            return {
                statusCode: 500,
                status: [],
                success: false,
                msg: 'Internal server Error',
                error: error
            }
        }
    };


    const destroy = async ( id ) => {

        try {

            let tCheck = await Util.checkQueryParams(rData, {
                id: "required",
            });

            if (tCheck && tCheck.error && tCheck.error == "PARAMETER_ISSUE") {
                return {
                    statusCode: 404,
                    success: false,
                    msg: "PARAMETER_ISSUE",
                    err: tCheck,
                };
            }

            let filter = {
                _id: rData.id
            }

            let checkUserExist = await mongo.findOne(USER_COLLECTION, filter);

            if( !checkUserExist ){
                return {
                    status: 400,
                    success: false,
                    status: [],
                    msg: 'User Not Exist',
                }
            }

            let updateResult = await mongo.remove(USER_COLLECTION, filter);

            if( updateResult ){
                return {
                    status: 200,
                    success: true,
                    status: [],
                    msg: 'Successfully Deleted User',
                }
            } else {
                return {
                    status: 400,
                    success: false,
                    status: [],
                    msg: 'Failed to Delete User',
                }
            }
            
        } catch (error) {
            console.log(`deleteUser Error:  ${error}`);
            return {
                statusCode: 500,
                status: [],
                success: false,
                msg: 'Internal server Error',
                error: error
            }
        }
    };



    return {
        get,
        create,
        update,
        destroy
    }
}

module.exports = UserModel;