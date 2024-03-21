import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/auth.js';
import jwt from 'jsonwebtoken'
const Authrouter = express.Router();
Authrouter.post('/register', async (req,res)=>{
    const body = req.body;
    body.password = await bcrypt.hash(body.password,10)
    const Users = new User(body)
    const response = await Users.save();
    res.send(Users)
})
Authrouter.post('/login', async (req,res)=>{
    const body = req.body;
    // Check user có tồn tại hay không
    const user = await User.findOne({email: body.email})
    if(user===null){
        res.send({status:false,message:"Người dùng không tồn tại"})
    }
    else {
        // console.log(user);
        // lấy thông tin mật khẩu
        const password = user.password
        const verify = await bcrypt.compare(body.password,password)
        if (verify){
            const token = jwt.sign({uid:user._id},'123456')
            res.send({status:true,message:"Đăng nhập thành công",user:user,token:token})
        }
        else {
            res.send({status:false,message:"sai mật khẩu"})
        }
    }
})
export default Authrouter;