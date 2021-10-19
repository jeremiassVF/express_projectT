const express =require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('../config/database');


user.post("/signin", async (req,res,next) =>{
    const { user_name, user_lastname, user_fon, user_mail, user_adress, user_password}=req.body;

   if(user_name && user_lastname && user_fon && user_mail && user_adress && user_password){
        let query = "INSERT INTO t_user (user_name, user_lastname, user_fon, user_mail, user_adress, user_password)";
        query +=  `VALUES('${user_name}','${user_lastname}','${user_fon}','${user_mail}','${user_adress}','${user_password}')`;
        const rows = await db.query(query);
        
        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, menssage: "Empleado insertado correctamente"});
        }
        
        return res.status(500).json({code: 500, message: "ocurrió un error"}) 
   }

   return res.status(500).json({code: 500, message:"campos incompletos"})
});

user.post("/login", async (req,res, next) => {
    const {user_mail, user_password} = req.body;
    const query= `SELECT * FROM t_user WHERE user_mail = '${user_mail}' AND user_password = '${user_password}';`;
    const rows = await db.query(query);

    if (user_mail && user_password){
        if(rows.length==1){
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail,
                user_admin: rows[0].user_admin
            },"debugkey");
            return res.status(200).json({code: 200, message: token });
        }
        else{
            return res.status(200).json({code: 401, message: "usuario y/o contraseña incorrectos"});
        }
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

user.post('/login/admin', async (req,res,next) => {
    const {user_mail, user_password} = req.body;
    const query= `SELECT user_admin FROM t_user WHERE user_mail = '${user_mail}' AND user_password = '${user_password}';`;
    const rows = await db.query(query);

    if (user_mail && user_password){
        if(rows.length==1){
            const token1 = jwt.sign({
                user_admin: rows[0].user_admin
            },"debugkey");
            return res.status(200).json({code: 200, message: token1 });
        }
        else{
            return res.status(200).json({code: 401, message: "usuario y/o contraseña incorrectos"});
        }
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

user.get("/", async (req, res, nest) => {
    const query = "SELECT * FROM user";
    const rows = await db.query(query);

    return res.status(200).json({code: 200, message: rows})
});

module.exports = user;