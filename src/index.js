// import  express  from "express";
// import dotenv from "dotenv";
// import bodyParser  from "body-parser";
// import cors from "cors";
// import allRoutes from "./routes/allRoutes.js";
// import Sequelize from "sequelize";
// import sequelize from "../models";


// async function main(){
//     await sequelize.sync()

// }
// const db = new Sequelize('libraryapp', 'postgres', '0781110784', {
//     host: 'localhost',
//     dialect:  'postgres' ,
   
//   });

  //test db
//  db.authenticate()
// .then(()=>console.log('database connected...'))
// .catch(err=>console.log('error ' +err))

// const app=express();
//  dotenv.config();

// app.use(cors());
// app.use(bodyParser.json());

// app.get('/', (req,res)=>{
//  res.status(200).send(`<h1> hello this is my test library app </h1>`);
// });

// app.use("ap/v1",allRoutes);

// app.listen(3000,()=>{
//     console.log("server is listening to port http://localhost:3000");
// });

const {sequelize,Users,BooksTb,BrowerTb} =require('../models');
const express =require('express');
const app=express();
 
app.use(express.json());

app.get('/', (req,res)=>{
 res.status(200).send(`<h1> hello this is my test library app </h1>`);
});


// app.use("api/library",allRoutes);

//add new user 
app.post('/users',async (req,res) =>{
 const{names,email}=req.body;

 try{
    const newUser =await Users.create({names,email});

     return res.status(201).json({
       message:"user created",
       data:newUser
         });

 }catch(err){
  console.log("error "+err);
  return res.status(500).json(err)
 }
 
});

//get all users
app.get('/Users',async(req,res)=>{
       try{
             const users=await Users.findAll()

             return res.json(users);

       }catch(err){
        console.log("error "+err);
        return res.status(500).json(err)
       }
});

//get one users
app.get('/Users/:id',async(req,res)=>{
  const id=req.params.id
  try{
        const user=await Users.findOne({
           where:{id},
           include:'books'
        })

        return res.json(user);

  }catch(err){
   console.log("error "+err);
   return res.status(500).json(err)
  }
});


//add new book

app.post('/addBook',async(req,res)=>{
const {useruuId,bookisbn,booktitle,bookgnre,bookstatus}=req.body;

try{
    const user=await Users.findOne({where :{id:useruuId}})
    if(!user){
      return res.status(404).json({
        message: `this user id: ${useruuId} was not found`
      });
     }

    const newbook=await BooksTb.create({bookisbn,booktitle,bookgnre,userId : user.id,bookstatus})

    return res.status(201).json({
      message:"new book added",
      data:newbook
    })

}catch(err){
  console.log("error",+err);
  return res.status(500).json(err);
}

});

//get all books

app.get('/AllBooks',async(req,res)=>{
  try{
        const books=await BooksTb.findAll()

        return res.json(books);

  }catch(err){
   console.log("error "+err);
   return res.status(500).json(err)
  }
});

//get book by id

app.get('/book/:id',async (req,res)=>{
  const id=req.params.id
  try{
    const book=await BooksTb.findOne({
       where:{id}
    })

    if (!book) {
      return res.status(404).json({
        message: `Book with id: ${id} was not found`
      });
    }

    return res.json(book);

}catch(err){
console.log("error "+err);
return res.status(500).json(err)
}
});


//getBook Added By UserId

app.get('/allbookAddedBy/:userId',async (req,res)=>{
  const userId=req.params.userId
  try{
    const book=await BooksTb.findAll({
       where:{userId},
      
    })

    if (!book) {
      return res.status(404).json({
        message: `user with id: ${userId} was not found`
      });
    }
    else{
      return res.json(book);
    }

   

}catch(err){
console.log("error "+err);
return res.status(500).json(err)
}
});

// borrow book to one person
app.post('/borrowbook',async(req,res)=>{
  const {useruuId,bookisbn,bookchangestatus}=req.body;

  try{
    const book=await BooksTb.findOne({where:{bookisbn:bookisbn}});

    const user=await Users.findOne({where :{id:useruuId}})

     if(!user){
      return res.status(404).json({
        message: `this user id: ${useruuId} was not found`
      });
     }

     if(!book){
      return res.status(404).json({
        message: `this book  isbn: ${bookisbn} was not found`
      });
     }
    //  if(book.bookstatus="taken"){
    //   return res.status(404).json({
    //     message: `this book wth this isbn: ${bookisbn} was taken`
    //   });
    //  }

   else{
    const newborrow=await BrowerTb.create({bookisbn,userId : user.id})
    // book.bookstatus=bookchangestatus

    // await book.save()
    // id
    // const bookisbn = bookisbn;
    // const booK = await BooksTb.findByIdAndUpdate(bookisbn,{bookchangestatus}, { new: true });

    return res.status(201).json({
      message:" borrowed successfully",
      data:newborrow
    })
  }

  }catch(err){
    console.log("error "+err);
return res.status(500).json(err)
  }

});


//show all borrowed books
app.get('/showAllBorrowedBooks',async (req,res)=>{
  try{
 const borrowedBooks=await BrowerTb.findAll();

 if(!borrowedBooks){
  return res.status(404).json({
    message: `no book has borrowed`
  })
 }
 else{
  return res.json(borrowedBooks);
 }
}catch(err){
  console.log("error "+err);
return res.status(500).json(err)
}

});


//show all borrowed book by userid
app.get('/borrowedbookbyuserid/:userId',async (req,res)=>{
  const userId=req.params.userId
  try{
     
    const showAllBookBorrowedByUserId=await BrowerTb.findAll({
      where:{userId}
     }) 
     if(!showAllBookBorrowedByUserId){
       return res.status(404).json({
        message:`user with id : ${userId} does not exit `
       })
     }
     else{
      return res.json(showAllBookBorrowedByUserId);
     }

  }catch(err){
    {
      console.log("error "+ err);
      return res.status(500).json(err);
    }
  }


});


//make user delete

app.delete('/removeuser/:id',async (req,res) =>{

   const id=req.params.id;

  try{

    const user=await Users.findOne({where: {id}});
    if(!user){
      return res.status(404).json({
        message:`user with id : ${id} does not exit `
    })
  }

  else{
   await user.destroy()
   return res.json({
    message:"user removed successfully"
   })

  }

  }catch(err){
    console.log("error "+ err);
      return res.status(500).json(err);

  }


});

//update user 
app.put('/updateuser/:id',async (req,res) =>{
 const id=req.params.id;
 const{names,email}=req.body;
 try{
   const user=await Users.findOne({where :{id}})

   if(!user){
    return res.status(404).json({
      message:`user with id : ${id} does not exit `
  })}
  user.names=names
  user.email=email

  await user.save()

  return res.status(200).json({
    message:"user updated",
    data:user
  }) 
  
 }catch(err){
  console.log("Eroor" +err)
    res.status(500).json(err);
  
 }

});

app.listen({port:3000},async ()=>{
  console.log('server is running on http://localhost:3000')
  await sequelize.authenticate();
  console.log('database connected')
})

