const express = require('express');
const usuario = express.Router();
const db = require('../config/database');

usuario.post("/", async (req,res,next) =>{
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

usuario.delete("/:id([0-9]{1,3})", async (req, res, next) =>{
    const query= `DELETE FROM t_user WHERE user_id=${req.params.id}`;
    const rows= await db.query(query);

    if(rows.affectedRows == 1){
        return res.status(200).json({code: 200, message:"Empleado borrado correctamente"});
    }
    return res.status(404).json({code: 404, message:"Empleado no encontrado"});
});

usuario.put("/:id([0-9]{1,3})", async (req, res, next) =>{
    const { user_name, user_lastname, user_fon, user_mail, user_adress, user_password}=req.body;

    if(user_name && user_lastname && user_fon && user_mail && user_adress && user_password){
         let query = `UPDATE t_user SET user_name='${user_name}',user_lastname='${user_lastname}',user_fon='${user_fon}'`;
         query +=  `user_mail='${user_mail}', user_adress='${user_adress}',user_password='${user_password}', WHERE user_id=${req.params.id};`;
         const rows = await db.query(query);
         
         if(rows.affectedRows == 1){
             return res.status(200).json({code: 200, menssage: "Empleado actualizado correctamente"});
         }
         
         return res.status(500).json({code: 500, message: "ocurrió un error"});
    }
 
    return res.status(500).json({code: 500, message:"campos incompletos"});
});

usuario.patch("/:id([0-9]{1,3})", async(req, res, next) =>{

    if(req.body.pok_name){
        let query = `UPDATE t_user SET user_name='${req.body.pok_name}' WHERE user_id=${req.params.id}`;
        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(200).json({code: 200, message: "Empleado actualizado correctamente"});
        }
        return res.status(500).json({code: 500, message: "ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "empleado no encontrado"});
});

usuario.get('/', async (req,res,next) =>{
    const t_u= await db.query("SELECT * FROM t_user");
    return res.status(200).json({code: 200, menssage: t_u});

});

usuario.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    if(id>= 1 && id <= 722){
        const t_u=await db.query("SELECT * FROM t_user WHERE user_id='"+id+"';");
        return res.status(200).json({code: 200, menssage: t_u});
    }
    return res.status(404).json({code: 404, menssage: "empleado no encontrado"});
    
    
});
usuario.get('/:name([A-za-z]+)', async (req,res,next) => {
    const name = req.params.name;
    const t_u=await db.query("SELECT * FROM t_user WHERE user_name='"+name+"';");
    if(t_u.length > 0){
        return res.status(200).json({code: 200, message: t_u});
    }
    return res.status(404).json({code: 404, menssage: "empleado no encontrado"});
});

module.exports = usuario;