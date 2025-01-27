import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";
import User from "./User.js";

const Note = sequelize.define(
    'Notes',
    {
        noteId : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        title : {
            type : DataTypes.STRING,
            allowNull : true
        },
        content : {
            type : DataTypes.STRING
        },
        createdBy : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references: {
                model: 'Users', 
                key: 'userId',  
            },
        },
        updatedBy : {
            type : DataTypes.INTEGER,
            allowNull : false,
            references: {
                model: 'Users', 
                key: 'userId',  
            },
        }

    },{
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
)
User.hasMany(Note, {foreignKey: 'createdBy'});
Note.belongsTo(User);
export default Note;