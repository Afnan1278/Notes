require('dotenv').config();
const h = require('../helper');
const { Sequelize,DataTypes,Op  } = require('sequelize');
const logger = require('../utils/logger');


const sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, '', 
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      define:{
          timestamps: false,
    },
    logging: (h.dotenvIsTrue(process.env.DB_LOGGING))?(log)=>{logger.log(log)}:false, 
      
});

/**
 * load model 
 * @param {*} name 
 */
const model = (name)=>{
  try{
    let modal_name = '../models/'+name.trim().toLowerCase();  
    let model = require(modal_name)(sequelize, DataTypes);  
    return model;
  }catch(error){
    throw error;
  } 
}

const queryAll = async(query,params)=>{
  let result = await sequelize.query(query,
      { replacements: params, type: sequelize.QueryTypes.SELECT }
  );
  return result;
}
const queryOne = async(query,params)=>{
  let result = await sequelize.query(query,
      { replacements: params, type: sequelize.QueryTypes.SELECT }
  );
  if(result) return result[0];
  return result;
}

module.exports = {model,queryAll,queryOne,sequelize,DataTypes,Op}
