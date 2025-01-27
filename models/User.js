import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";
import Note from "./Note.js";
import bcrypt from 'bcrypt';


const User = sequelize.define(
    'Users',
    {
        userId : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : true    
        },
        email : {
            type : DataTypes.STRING
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        }

    },{
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
)


User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});



export default User;