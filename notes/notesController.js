import { createNoteService, deleteNoteService, getNotesService, updateNoteService } from "./notesServices.js";


export const createNoteController = async(req,res)=>{
    try{
       const { ...data } = req.body;
       const userId = req.session.userId
    await createNoteService(data,userId);
    res.status(200).json({message:"Note Created Successfully",success:true});
    }catch(err){
        return res.status(500).json({message:err.message,success:false});
    }
}

export const getNotesController = async(req,res)=>{
    try{
        const userId = req.session.userId
        const data = await getNotesService(userId);
    res.status(200).json({message:"Note Fetched Successfully",success:true,data});
    }catch(err){
        return res.status(500).json({message:err.message,success:false});
    }
}

export const updateNote = async(req,res)=>{
    try{
        const { noteId,...data } = req.body;
        const userId = req.session.userId;
        await updateNoteService(noteId,data,userId);
    res.status(200).json({message:"Note updated Successfully",success:true});
    }catch(err){
        return res.status(500).json({message:err.message,success:false});
    }
}

export const deleteNoteController = async(req,res)=>{
    try{
        const { noteId } = req.query;
        const userId = req.session.userId;
        await deleteNoteService(noteId,userId);
    res.status(200).json({message:"Note Deleted Successfully",success:true});
    }catch(err){
        return res.status(500).json({message:err.message,success:false});
    }
}