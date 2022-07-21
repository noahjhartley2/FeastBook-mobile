const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { json } = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const  objectId = require('mongodb').ObjectId;
const path = require('node:path');


const url = 'mongodb+srv://dbuser:weakPASSWORD21@cluster0.ygm9c8s.mongodb.net/?retryWrites=true&w=majority'; 
//const url = process.env.MONGODB_URI;

var corsOptions = {
  // origin: 'http://localhost:19006'
  origin: '*'
}

const client = new MongoClient(url);
client.connect();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());

const buildPath = path.normalize(path.join(__dirname, './web-build'));
app.use(express.static(buildPath));

const rootRouter = express.Router();
/* 
* all your other routes go here
*/


// app.get("/", async (req, res, next)=>
// {
//     const db = client.db("FeastBook");
//     console.log("/ working")
//     res.send("hello")
//     let data = db.collection('Users')
// })

app.get("/api/users", async (req, res, next)=>
{
    const db = client.db("FeastBook");
   
    db.collection('Users').find({}).toArray((err, results) =>
    {
      if (err) throw err

      console.log("users displayed")
      res.json(results)
    })
})

app.get("/api/posts", async (req, res, next)=>
{
    const db = client.db("FeastBook");
   
    db.collection('Posts').find({}).sort({date: -1}).toArray((err, results) =>
    {
      if (err) throw err

      console.log("posts displayed")
      let posts = {results: results, error: err};
      res.json(posts)
    })
})

app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

  let error = 'Invalid login';

  const { login, password } = req.body;

  const db = client.db("FeastBook");
  const results = await db.collection('Users').find({login:{$regex: '^' + login + '$', $options: 'i'}, password:password}).toArray();

  let id = -1;
  let firstName = '';
  let lastName = '';

  if( results.length > 0 )
  {
    id = results[0]._id;
    firstName = results[0].firstname;
    lastName = results[0].lastname;
    error = '';
  }

  let ret = { id:id, firstname:firstName, lastname:lastName, error: error};
  res.status(200).json(ret);
});

app.post('/api/register', async (req, res, next) => 
{
  // incoming: firstName, lastName, login, password, email
  // outgoing: id, firstName, lastName, login, password, error

  let error = '';
  let bool = true;

  const { firstName, lastName, login, password, email} = req.body;

  const db = client.db("FeastBook");

  const numUsers = await db.collection('Users').find({login:{$regex: '^' + login + '$', $options: 'i'}}).toArray();
  try
  {
    if(numUsers.length <= 0)
    {
      // email verification 

      db.collection('Users').insertOne({firstname: firstName, lastname: lastName, login:login, password:password, email: email})
      console.log("user added");
      bool = true;
    }
    else
    {
      console.log("User already exists")
      bool = false;
      error = "user already exist"
    }
  }
  catch(e)
  {
    error = e.toString();
    bool = false;
  }
  
  let ret = { added:bool, firstName:firstName, lastName:lastName, login:login, password:password, email: email, error: error};
  res.status(200).json(ret);
});

app.delete('/api/deleteuser', async (req, res, next) => 
{

  // deletes the current user being used and all of their posts

  let error = '';
  let deleted = false
  const { id } = req.body;

  const db = client.db("FeastBook");


  const result = await db.collection('Users').deleteOne({_id: objectId(id)})
  deleted = true;

  if (result.deletedCount > 0)
  {
    console.log("User deleted")
  }

  res.status(200).send(result);
  // let ret = { id:id, deleted: deleted, error:''};
  // res.status(200).json(ret);
});

app.post('/api/searchuser', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  let error = '';

  const {search } = req.body;

  let _search = search.trim();
  
  const db = client.db("FeastBook");
  const results = await db.collection('Users').find({login:{$regex: '^'+_search+'.*', $options: 'ir'}}).toArray();
  
  let _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    let temp = 
    {
      login: results[i].login,
      id: results[i]._id
    }
    _ret.push(temp);
  }
  
  let ret = {results:_ret, error:error};
  res.status(200).json(ret);
});

app.post('/api/updateuser', async (req, res, next) => 
{

  // deletes the current user being used and all of their posts

  let error = '';
  let deleted = false
  const db = client.db("FeastBook");

  const { id, firstName, lastName} = req.body;

  let oldfirstName = '';
  let oldlastName = '';


  const old = await db.collection('Users').find({_id: objectId(id)}).toArray();

  db.collection('Users').updateOne({_id: objectId(id)}, {$set: {firstname: firstName, lastname: lastName}}, function(err, result)
  {
    if (err) 
    {
      throw err;
    }
  })
  
  if(old.length > 0 )
  {
    oldfirstName = old[0].firstname;
    oldlastName = old[0].lastname;
  }
  
  let ret = {id: id, oldfirstname: oldfirstName, oldlastname: oldlastName, firstame: firstName, lastname: lastName, error:error};
  res.status(200).json(ret);
});

app.post('/api/updatepassword', async (req, res, next) => 
{

  // updates password while in account

  let error = '';
  let deleted = false
  const db = client.db("FeastBook");

  const { id, currentPassword, newPassword1, newPassword2} = req.body;

  let oldPassword = currentPassword;
  let newpassword = newPassword1;
  let updated = false;

  const old = await db.collection('Users').find({_id: objectId(id)}).toArray();

  if(old.length > 0 )
  {
    if (old[0].password === oldPassword)
    {
      if (newPassword1 === newPassword2)
      {
        db.collection('Users').updateOne({_id: objectId(id)}, {$set: {password: newPassword1}}, function(err, result)
        {
          if (err) 
          {
            throw err;
          }
        })
  
        updated = true;
      }
      else
      {
        updated = false;
        error = 'passwords do not match'
      }
    }
    else
    {
      updated = false;
      error = 'current password incorrect'
    }
  }

  let ret = {id: id, updated: updated, error:error};
  res.status(200).json(ret);
});

app.post('/api/userposts', async (req, res, next) => 
{
  // incoming: userId, 
  // return list of their posts

  let error = 'No posts found';

  const {id} = req.body;

  let id_ = id.trim();
  const db = client.db("FeastBook");
  const results = await db.collection('Posts').find({userid: id_ }).sort({date: -1}).toArray();
  
  let _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    let temp = 
    {
      _id: results[i]._id,
      name: results[i].name,
      photo: results[i].photo,
      likes: results[i].likes,
      ingredients: results[i].ingredients,
      directions: results[i].directions,
      date: results[i].date
    }
    _ret.push(temp);
  }

  if (_ret.length >= 1)
  {
    error = ''
  }
  
  let ret = {results:_ret, error:error};
  res.status(200).json(ret);
});

app.post('/api/createpost', async (req, res, next) => 
{
  // incoming: photo, ingredients, directions
  // outgoing: posted or not posted

  let error = '';
  let bool = true;
  let likes = 0;

  const {userid, name, photo, ingredients, directions} = req.body;

  const db = client.db("FeastBook");
  db.collection('Posts').insertOne({userid: userid, name: name, photo: photo, likes: 0, ingredients:ingredients, directions:directions, favorited: [], date: new Date()})
  console.log("post added");
  bool = true;
  
  let ret = { added:bool, error: error};
  res.status(200).json(ret);
});

app.delete('/api/deletepost', async (req, res, next) => 
{

  // deletes the current post with the post id

  let deleted = false
  const {id, postid} = req.body;
  const db = client.db("FeastBook");
  const user = await db.collection('Posts').find({_id: objectId(postid)}).toArray()
  
  if (user.length > 0)
  {
    if (id === user[0].userid)
    {
      
      const result = await db.collection('Posts').deleteOne({_id: objectId(postid)})
      deleted = true;
      if (result.deletedCount > 0)
      {
        console.log("post deleted");
        res.status(200).send(result);
      }
    }
    else
    {
      console.log("post not deleted id does not match userid");
      let error = 
      {
        error: "id does not match userid",
        deleted: false
    }
      res.status(200).send(error);
    }
  }
  else
  {
    let error = 
    {
      error: "post not in userid",
      deleted: false
    }
    res.status(200).send(error);
  }

  // res.status(200).send(result);
  // let ret = { id:id, deleted: deleted, error:''};
  // res.status(200).json(ret);
});

app.post('/api/likepost', async (req, res, next) => 
{
  // incoming: photo, ingredients, directions
  // outgoing: liked true or false

  let error = '';
  let bool = true;

  const {userid, postid} = req.body;

  const db = client.db("FeastBook");
  const user = await db.collection('Users').find({_id: objectId(userid)}).toArray();
  const post = await db.collection('Posts').find({_id: objectId(postid)}).toArray();

  if (user.length > 0 && post.length > 0)
  {
    db.collection('Posts').updateOne({_id: objectId(postid)}, {$inc: {likes: 1 } }, function(err, result)
    {
      if (err) 
      {
        throw err;
      }
      console.log("post liked");      
    })

    db.collection('Posts').updateOne({_id: objectId(postid)}, {$push: {favorited: {id: userid}} }, function(err, result)
    {
      if (err) 
      {
        throw err;
      }
      console.log("user added to favorited array");      
    })

    // db.collection('Favorites').insertOne({postid: post[0]._id, userid: userid, name: post[0].name, photo: '', likes: post[0].likes, 
    //   ingredients: post[0].ingredients, directions: post[0].directions, date: post[0].date, posterid: post[0].userid})
    bool = true;
  }
  else
  {
    error = 'User or post does not exist';
    bool = false;
  }

  
  let ret = { liked:bool, error: error};
  res.status(200).json(ret);
});

app.post('/api/dislikepost', async (req, res, next) => 
{
  // incoming: photo, ingredients, directions
  // outgoing: posted or not posted

  let error = '';
  let bool = true;

  const {userid, postid} = req.body;

  const db = client.db("FeastBook");
  const user = await db.collection('Users').find({_id: objectId(userid)}).toArray();
  const post = await db.collection('Posts').find({_id: objectId(postid)}).toArray();

  if (user.length > 0 && post.length > 0)
  {
    db.collection('Posts').updateOne({_id: objectId(postid)}, {$inc: {likes: -1 } }, function(err, result)
    {
      if (err) 
      {
        throw err;
      }
      console.log("post disliked");      
    })

    db.collection('Posts').updateOne({_id: objectId(postid)}, {$pull: {favorited: {id: userid}} }, function(err, result)
    {
      if (err) 
      {
        throw err;
      }
      console.log("user removed from favorited array");      
    })

  }
  else
  {
    error = 'User or post does not exist';
    bool = false;
  }

  bool = true;
  
  let ret = { disliked:bool, error: error};
  res.status(200).json(ret);
});

app.post("/api/getfavorite", async (req, res, next)=>
{
  const {userid} = req.body;
  let error = " ";
  const db = client.db("FeastBook");
  const results = await db.collection('Posts').find({favorited: {$elemMatch: {id: userid}}}).sort({date: -1}).toArray();
  console.log(results);

  let posts = {results: results, error: error};
  res.status(200).json(posts)
});

rootRouter.get('(/*)?', async (req, res, next) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});
app.use(rootRouter);

app.listen(port); 