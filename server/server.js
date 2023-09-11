import express from "express";
import mysql  from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
const salt = 10;

const app = express();

app.use(express.json());
app.use(cors({
    origin:['http://localhost:3000'],
    method:["POST","GET"],
    credentials:true
}
    
));
app.use(cookieParser());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"project1",
})
///////////Register post api////////////////
app.post('/register',(req,res)=>{
    const sql = "insert into login (`name`,`email`,`password`) values(?)";
    bcrypt.hash(req.body.password.toString(),salt,(err,hash)=>{
        if(err) return res.json({Error:"Error for hassing password"});
        const values = [
            req.body.name,
            req.body.email,
            hash
        ]
        db.query(sql,[values],(err,result)=>{
            if(err) return res.json({Error:"insert data error"});
            return res.json({Status:"Success"});
        })
    })
    
})

////////////Login Post/////////

app.post('/login',(req,res)=>{
    const sql = 'SELECT  * FROM login WHERE email=?';
    db.query(sql,[req.body.email],(err,data)=>{
        if(err) return res.json({Error:"Login error in server"});
        if(data.length > 0){
            bcrypt.compare(req.body.password.toString(),data[0].password,(err,response)=>{
                 if(err) return res.json({Error:"password compare error"});
                 if(response){
                    const name=data[0].name;
                    const token = jwt.sign({name},"jwt-secret-key",{expiresIn:'1d'});
                    res.cookie('token',token)
                    return res.json({Status:"Success"})
                 } else {
                    return res.json({Error:"password not match"})
                 }
            })
        } else {
            return res.json({Error:"No mail exist"});
        }
    })
})

/////token verification////////
const verifyUser = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json({Error:"You are not valid"})
    }else{
        jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
            if(err){
                return res.json({Error:"Token is not okey"})
            } else{
                req.name = decoded.name
                next();
            }
        })
    }
}

///////////GET//////////
app.get("/",verifyUser,(req,res)=>{
    return res.json({Status:"Success",name:req.name})
})

/////logout////
app.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({Status:"Success"})
})



app.listen(8000,()=>{
    console.log("Running...");
})