const express = require("express");
const router = express.Router();
const auth = require("../../autentikacija/auth");

//Unosim Question Model

const Post = require("../../models/posts");
const Comment = require("../../models/comment")
//Ruta koja omogucava da vidimo sve Questions
//@ruta metoda    GET api/posts
//@radimo     Get All Posts
//@pristum   Public (Kada tek neko dodje da vidi sva pitanja)
router.get("/",(req,res)=>{
    Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
})

//Ruta koju ciljamo kada zelimo objaviti Post
//@ruta metoda   POST api/posts
//@radimo     Create A Post
//@pristup   Private (
router.post("/",auth,(req,res)=>{
    const newPost = new Post({
        score:req.body.score,
        viewCount:req.body.viewCount,
        body:req.body.question,
        ownerUserid:req.body.ownerUserid
    })
    newPost.save()
        .then(post=>res.json(post))
})
// Route za kupnjenje postova specificnog usrea po ID iz Reduxa
//putanja metoda   Post api/posts/specific
//radimo     Questions od usera saljemo ID
//pristup   Private
//OVO
router.post("/spec", async(req,res)=>{
    console.log(req.body.auth)
    let specQ = await Post.find({ownerUserid:req.body.auth})
        .populate("comments")
        console.log(specQ)
        res.json(specQ)
})

// Route za dodavanje komentara
//putanja metoda   Post api/posts/comment
//radimo     kacimo koment na specific post
//pristup   Private

router.post("/comment",auth,async (req,res)=>{
    let comment = new Comment({
        content:req.body.content,
        user:req.body.user,
        post:req.body.post
    })
    comment = await comment.save()
    console.log(comment)
    await Post.updateOne({_id:req.body.post},{$push:{comments:comment._id}})

    let dbpost = await Post.findById({_id:req.body.post})
        .populate("comments")
        res.json(dbpost)
        console.log(dbpost)
        /*.then(post=>{
            async ()=>{
                let newPost = await post.populate("comments")
                res.json(newPost)
                console.log(res.json(newPost))
            }
            
        })*/
})
//Ruta za brisanje pitanja 
//@putanja metoda   POST api/posts/:id
//@radimo     Delete an Item
//@pristup   Private
router.delete("/:id",auth,(req,res)=>{
    Post.findById(req.params.id)
    .then(post=>post.remove().then(()=>{res.json({success:true})}))
    .catch(err=>res.status(404).json({success:false}))
})


module.exports = router;