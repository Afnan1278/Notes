const db = require('../db')
const NoteModel = db.model("note");
const h = require("../helper");
const Redis = require('../cache');
const {noteFactory} = require('../notes')


const list = async (params) => {
    const recordPerPage = 20;
    if (h.isEmpty(params)) throw "params is empty or not provided";
    if (!params.page || !parseInt(params.page)) throw "page is not defined";
  
    let page = params.page ? params.page : 1;
    let offset = recordPerPage * (page - 1);
    userID = params.authUser.userID
  
  
    let search_options = {
      limit: recordPerPage,
      offset: offset,
    };
   
    const res = await NoteModel.findAndCountAll({
     
     where:{UserID:userID,Active:1},
      ...search_options,
    });
  
    return res
  };

  const getNote = async (params) => {
    if (h.isEmpty(params)) throw "params is empty or not provided";
    if (!params.id) throw "id is not defined"; 
    const userID = params.authUser.userID
    // Check if the note is cached in Redis
    const cachedNote = await  Redis.getValue(`note:${params.id}`);
    if (cachedNote) {
        return JSON.parse(cachedNote);
    } else {
    
    const note = await NoteModel.findOne({
        where:{UserID:userID,NoteID:params.id,Active:1},
    });

    if(!note) throw "Note not found"


    // Cache the note using Redis
    await Redis.client.set(`note:${note.dataValues.NoteID}`, JSON.stringify(note.dataValues))

    return note
    }
  };
  const create = async (params) => {
    if (h.isEmpty(params)) throw "param is empty or not provided";
    //factory method for creating different types of notes
    const note = noteFactory(params.type,params.title,params.content)
    //save note to database
    let _params = {
      Title: note.title,
      Content: note.content,
      Type: note.type,
      UserID:params.authUser.userID,
      Active: 1,
    };
   
  
    await NoteModel.create(_params);
  
    return "Note created successfully";
  };
  const update = async (params) => {
    if (h.isEmpty(params.body)) throw "param is empty or not provided";
    if (!params.body.id) throw "id is not defined";
    const userID = params.authUser.userID
    const note = await NoteModel.findOne({
        where:{UserID:userID,NoteID:params.body.id,Active:1},
       });
    if(!note) throw "Note not found"
    let _params = {
      Title: params.body.title,
      Content: params.body.content,
    };
   
  
    await note.update(_params);
  
    return "Note updated successfully";
  };

  const remove = async (params) => {
    if (h.isEmpty(params)) throw "param is empty or not provided";
    if (!params.id) throw "id is not defined";
    const userID = params.authUser.userID
    const note = await NoteModel.findOne({
        where:{UserID:userID,NoteID:params.id,Active:1},
       });
    if(!note) throw "Note not found"

    let _params = {
      Deleted:1,  
      Active: 0,
    };
   
  
    await note.update(_params);
  
    return "Note deleted successfully";
  };

  module.exports={list,create,getNote,update,remove}