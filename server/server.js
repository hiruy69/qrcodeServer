const  express =  require('express');
const bodyParser =  require( 'body-parser');
const  db =  require( './repositories/users'); 
require("dotenv").config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')




const port = 3000;
const app = express();
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(cors())
app.listen(port, () => console.log(`Node-JWT-SQLite-Starer is listening on port ${port}!`));
app.use(bodyParser.json());


const verifyToken = (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"] || req.headers['authorization'];
  
    console.log(token)
    if (!token) {
      return res.status(403).send("permission denied!!!");
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      console.log(decoded)
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };
  
/* app.get('/', async (req, res) =>{
    res.render('home',{me: 'me'})
}) */

app.post('/register', async (req, res) =>{
    const {password, ...user} = req.body

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    user.password = encryptedPassword
    try{
        const result = await db.createUser(user)
        
        const token = jwt.sign(
            { user_id: result[0], username: user.username },process.env.TOKEN_KEY);
        
        res.status(200).json({access_token:token})
        
    }
    
    catch (err) {
       
        res.status(403).json({error:err})
    }
}) 



app.get('/users',verifyToken, async (req, res) =>{
    const result = await db.getUsers()
    res.status(200).json({users : result})
}) 


app.get('/user',verifyToken, async (req, res) =>{
    const result = await db.getUser(req.body)
    res.status(200).json({user : result})
})


app.post('/login', async (req, res) =>{
   
    try {
        // Get user input
        const { username, password } = req.body;
    
        // Validate user input
        if (!(username && password)) {
          res.status(400).send("All input is required");
        }
        
        // Validate if user exist in our database
        const use = await db.getUser({ 'username': username });
        const user = use[0]
        
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user.id, username: username },process.env.TOKEN_KEY);
    
    
          // user
          res.status(200).json({access_token:token});
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        //res.status(400).json({error:err});
      }
}) 

app.get('/qrcodes',verifyToken, async (req, res) =>{
    const result = await db.getItems()
    res.status(200).json({users : result})
}) 


app.get('/qrcode',verifyToken, async (req, res) =>{
    const result = await db.getItem(req.body)
    res.status(200).json({user : result})
})


app.post('/saveqrcode', verifyToken, async (req, res) =>{
    
    const result = await db.createItem(req.body)
    if (result ){
        res.status(200).json({ qr : result })
    }
    else{
        res.status(403)
    }
}) 

app.post('/updateqrcode', verifyToken, async (req, res) =>{
    const {id , ...data} = req.body
    const result = await db.updateItem({id:id},data)
    if (result ){
        res.status(200).json({ qr : result })
    }
    else{
        res.status(403)
    }
}) 





app.post('/deleteuser', verifyToken, async (req, res) =>{
    try{
        const result = await db.deleteUser(req.body)
        
        res.status(200).json({result:'deleted succesfully'})
        
    }
    
    catch (err) {
       
        res.status(403).json({error:err})
    }
}) 


app.post('/deleteitem', verifyToken, async (req, res) =>{
    try{
        const result = await db.deleteItem(req.body)
        
        res.status(200).json({result:'deleted succesfully'})
        
    }
    
    catch (err) {
       
        res.status(403).json({error:err})
    }
})


app.post('/changepassword', verifyToken, async (req, res) =>{
    try {
        // Get user input
        const { username, password, new_password } = req.body;
    
        // Validate user input
        if (!(username && password && new_password)) {
          res.status(400).json({error:"All input is required"});
        }
        // Validate if user exist in our database
        const use = await db.getUser({ 'username': username });
        const user = use[0]
        
        if (user && (await bcrypt.compare(password, user.password))) {
        
        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(new_password, 10);
        
        const use = await db.updateUser({ 'username': username },{'password':encryptedPassword});
         
        res.status(200).json({result: 'Password changed '});
        
        }
        res.status(400).json({error: "Invalid Credentials"});
      } catch (err) {
        //res.status(400).json({error:err});
      }
})



