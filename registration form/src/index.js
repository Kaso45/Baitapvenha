const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const pasth = require('path')
const collection = require("./config")
const port = 3000

// convert data to json format
app.use(express.json())
app.use(express.urlencoded({extend: false}))


// app.set('view', './view')
app.set('view engine', 'ejs')

// static file : nhúng file tĩnh
app.use(express.static("public"))

//trang đăng nhập 
app.get('/', (req, res) => {
  res.render('login', {
      title: 'Login',    
      formAction: '/login', 
      loginLink: '/register'  
  });
});

//Trang đăng ký
app.get('/signUp', (req, res) => {
  res.render('signUp')
});

// Đăng ký người dùng
app.post("/signUp", async (req,res) => {
  const data = {
  name: req.body.username,
  password: await bcrypt.hash(req.body.password, 10),//Hash password
 };

 // Kiểm tra nếu tài khoản đã tồn tại 
  const existingUser = await collection.findOne({name:data.name}); 
  if (existingUser) { 
return res.send('Tài khoản đã tồn tại');
  };

// Lưu thông tin người dùng mới 
  const userdata = await collection.insertMany(data); 
  console.log(userdata); 
  res.redirect('/');
});

  // Đăng nhập tài khoản
  app.post('/login', async (req, res) => { 
    const { username, password } = req.body;
 
  //Tìm tài khoản dựa trên username
  const user = await collection.findOne({ name: username });
  if (!user) { 
    return res.send('Tên đăng nhập hoặc mật khẩu không tồn tại');
  }
  
  //So sánh tài khoản người dùng nhập với tài khoản trên cơ sở dữ liệu
  const match = await bcrypt.compare(password, user.password);
  if (match) { 
    res.send(`Chào mừng, ${user.name}!`);
  } else { 
    res.send('Tên đăng nhập hoặc mật khẩu không tồn tại');
   }
});

 //khởi động máy chủ
 app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
