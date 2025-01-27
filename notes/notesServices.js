import Note from "../models/Note.js";


export const createNoteService = async(data,userId)=>{
    try {
        const result = await Note.create({...data,createdBy:userId,updatedBy:userId});
        return result;
    } catch (e) {
        throw e;
    }
}

export const getNotesService = async(userId)=>{
    try {
        const result = await Note.findAll({where:{createdBy : userId}});
        return result;
    } catch (e) {
        throw e;
    }
}

export const updateNoteService = async(noteId,data,userId)=>{
    try {
        const result = await Note.update(data,{where:{noteId,createdBy:userId}});
        return result;
    } catch (e) {
        throw e;
    }
}

export const deleteNoteService = async(noteId,userId)=>{
    try {
        const result = await Note.destroy({where:{noteId,createdBy:userId}});
        return result;
    } catch (e) {
        throw e;
    }
}