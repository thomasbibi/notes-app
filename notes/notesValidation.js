import Joi from 'joi';

export const createNoteValidation = Joi.object({
 title : Joi.string().required(),
 content : Joi.string().required()
});

export const updateNoteValidation = Joi.object({
    noteId : Joi.number().required(),
    title : Joi.string().optional(),
    content :  Joi.string().optional()
});




