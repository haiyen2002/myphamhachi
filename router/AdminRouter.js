const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const controllerAdmin = require("../controllers/adminController");
const { ProductModel, accountmodel, orderssModel } = require("../models/db_mongoose");
const check = require("../controllers/checkAuth")
const newsModel = require("../models/news")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../public/upload"));
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
  });
  
  const upload = multer({ storage: storage });

  router.post("/addProduct", upload.array("products", 12), async (req, res)=>{
    try {
        // console.log(req.body);
        console.log(req.files);
        if (req.files.length > 0) {
            let arr = []
            for (let i = 0; i < req.files.length; i++) {
                let index = req.files[i].path.indexOf("upload");
                let link =
                  "/public/" + req.files[i].path.slice(index, req.files[i].path.length);    
                arr.push(link.split("\\").join("/"))
            }
                                     
                const data = await ProductModel.create(
                    {
                        name: req.body.name,
                        prd_key: req.body.prd_key,             
                        price: req.body.price,
                        quantity: req.body.quantity,
                        codeProduct: req.body.codeProduct,
                        descriptionDetails: req.body.descriptionDetails,
                        img: arr,
                    }
                    )
                   
                        res.json({
                          status: 200,
                          mess: "add product compelete",
                          data: data,
                        });
                      
            } else if(req.files.length == 0){
                res.json({
                    status: 400,
                    mess: "not add",
                    data: data,
                  });
         
            }
    
        
    } catch (error) {
        res.json({ status: 500, mess: "lỗi sever", error });
    }
})

router.post("/addNews", upload.single("imgNews"), async (req, res)=>{
    try {
        console.log(70, req.body);
        console.log(req.file);
        if (req.file) { 
                let index = req.file.path.indexOf("upload");
                let link =
                  "/public/" + req.file.path.slice(index, req.file.path.length);  
                let  imgNews = link.split("\\").join("/")                                     
                const data = await newsModel.create(
                    {
                        title: req.body.title,
                        content: req.body.content,
                        imgNews: imgNews,
                        description: req.body.description,
                        dateSubmit: new Date().toUTCString()
                    }
                    )
                   
                        res.json({
                          status: 200,
                          mess: "add news compelete",
                          data: data,
                        });
                      
            } else{
                res.json({
                    status: 400,
                    mess: "not add",
                    data: data,
                  });
         
            }
    
        
    } catch (error) {
        res.json({ status: 500, mess: "lỗi sever", error });
    }
})

router.put("/fixProduct/:id", upload.array("products", 12), async (req, res) => {
    try {
        // console.log(69, req.files);
        if (req.files.length > 0) {
            let arr = []
            for (let i = 0; i < req.files.length; i++) {
                let index = req.files[i].path.indexOf("upload");
                let link =
                  "/public/" + req.files[i].path.slice(index, req.files[i].path.length);    
                arr.push(link.split("\\").join("/"))
            }
            console.log(78, arr);
            const data = await ProductModel.findByIdAndUpdate(
                {_id: req.params.id},
                {
                    name: req.body.name,
                    codeProduct: req.body.codeProduct,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    prd_key: req.body.prd_key,
                    rate: req.body.Rate,
                    descriptionDetails: req.body.des,
                    img: arr

                }
                )
                if (data) {
                    res.json({
                      status: 200,
                      mess: "change product compelete",
                      data: data,
                    });
                  }
        } else {

            const data = await ProductModel.findByIdAndUpdate(
                {_id: req.params.id},
                {
                    name: req.body.name,
                    codeProduct: req.body.codeProduct,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    prd_key: req.body.prd_key,
                    rate: req.body.Rate,
                    descriptionDetails: req.body.des,
                }
                )
                if (data) {
                    res.json({
                      status: 200,
                      mess: "change product compelete",
                      data: data,
                    });
                  }
     
        }

    } catch (error) {
      res.json({ status: 500, mess: "lỗi sever", error });
    }
  });

  router.put("/fixNews/:id", upload.single("imgNews"), async (req, res) => {
    try {
        // console.log(69, req.files);
        console.log(req.file);
        if (req.file != undefined) {
    

                let index = req.file.path.indexOf("upload");
                let link =
                  "/public/" + req.file.path.slice(index, req.file.path.length);    
                let imgNews = link.split("\\").join("/")
            const data = await newsModel.findByIdAndUpdate(
                {_id: req.params.id},
                {
                    title: req.body.title,
                    content: req.body.content,
                    description: req.body.description,
                    imgNews: imgNews,          

                }
                )
                if (data) {
                    res.json({
                      status: 200,
                      mess: "change news compelete",
                      data: data,
                    });
                  }
        } else {

            const data = await newsModel.findByIdAndUpdate(
                {_id: req.params.id},
                {
                    title: req.body.title,
                    content: req.body.content,
                    description: req.body.description,
                }
                )
                if (data) {
                    res.json({
                      status: 200,
                      mess: "change news compelete",
                      data: data,
                    });
                  }
     
        }

    } catch (error) {
      res.json({ status: 500, mess: "lỗi sever", error });
    }
  });



router.delete("/deleteProduct/:id", async (req, res)=>{
    try {
        const order = await orderssModel.find()
        .populate("product.productId")
        // console.log(order.length);
        if(order.length > 0 ){
            const result = await ProductModel.findOne(
                {_id: req.params.id},           
            )
            var test = 0 ;
            for (let i = 0; i < order.length; i++) {
                let products = order[i].product                
                for (let j = 0; j < products.length; j++) {
                    let prdId = products[j].productId._id                   
                    if(String(prdId) == result._id){
                        test += 1          
                        break;                       
                    }               
                }              
            }     
            // console.log(157, test);
            if(test == 0){
                await ProductModel.deleteOne(
                    {_id: req.params.id},           
                )
                res.json({mess: "xóa sản phẩm thành công", status: 200})  
            }else{
                res.json({mess: "sản phẩm đang có trong 1 order", status: 400})
            }
        }else{
            await ProductModel.findByIdAndDelete({_id: req.params.id})
            res.json({mess: "xóa sản phẩm thành công", status: 200})
        }      
    } catch (error) {
        res.json({ status: 500, mess: "lỗi sever", error });
    }
})

router.put("/updateRole/:id", async (req, res)=>{
    try {
        const result = await accountmodel.findByIdAndUpdate(
            {_id: req.params.id}, 
            {role: req.body.role}
        )
        if(result){
            res.json({mess: "update Role compelete", status: 200, data: result})
        }else{
            res.json({mess: "not update compelete", status: 400})
        }
        
    } catch (error) {
        res.json({ status: 500, mess: "lỗi sever", error });
    }
})

router.put("/updateStatus/:id", async (req, res)=>{
    try {
        const result = await orderssModel.findByIdAndUpdate(
            {_id: req.params.id}, 
            {status: req.body.status}
        )
        if(result){
            res.json({mess: "update Status compelete", status: 200, data: result})
        }else{
            res.json({mess: "not update compelete", status: 400})
        }
        
    } catch (error) {
        res.json({ status: 500, mess: "lỗi sever", error });
    }
})

router.delete("/deleteUser/:id", async (req, res)=>{
    try {
        const result = await accountmodel.findByIdAndDelete(
            {_id: req.params.id},           
        )
        if(result.deletedCount !== 0){
            res.json({mess: "delete compelete", status: 200})
        }else{
            res.json({mess: "delete not compelete", status: 400})
        }
        
    } catch (error) {
        res.json({ status: 500, mess: "lỗi sever", error });
    }
})

router.delete("/deleteNews/:id", async (req, res)=>{
    try {
        const result = await newsModel.findByIdAndDelete(
            {_id: req.params.id},           
        )
        if(result.deletedCount !== 0){
            res.json({mess: "delete compelete", status: 200})
        }else{
            res.json({mess: "delete not compelete", status: 400})
        }
        
    } catch (error) {
        res.json({ status: 500, mess: "lỗi sever", error });
    }
})

router.post("/changeProfile", upload.single("thumbnail"), async (req, res) => {
    try {
      if (req.cookies.user) {
        const token = req.cookies.user;
        const id = jwt.verify(token, "Auth").id;
        // console.log(req.file);
        if (req.file != undefined) {
          let index = req.file.path.indexOf("upload");
          let link =
            "/public/" + req.file.path.slice(index, req.file.path.length);
            let avatar = link.split("\\").join("/")
          const data = await accountmodel.findByIdAndUpdate(
            { _id: id },
            {
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              phone: req.body.phone,
              email: req.body.email,
              birthday: req.body.birthday,
              avatar: avatar,
            }
          );
          if (data) {
            res.json({
              status: 200,
              mess: "change profile compelete",
              data: data,
            });
          }
        } else {
          const data = await accountmodel.findByIdAndUpdate(
            { _id: id },
            {
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              phone: req.body.phone,
              email: req.body.email,
              birthday: req.body.birthday,
            }
          );
          if (data) {
            res.json({
              status: 200,
              mess: "change profile compelete",
              data: data,
            });
          }
        }
      }
    } catch (error) {
      res.json({ status: 500, mess: "lỗi sever", error });
    }
  });

router.get("/home", check.checkLogin, check.checkAdmin , controllerAdmin.adminHome);

router.get("/listUser", check.checkLogin, check.checkAdmin ,  controllerAdmin.adminlistUser);

router.get("/listOrder", check.checkLogin, check.checkAdmin ,  controllerAdmin.adminlistOrder);

router.get("/listProduct", check.checkLogin, check.checkAdmin ,  controllerAdmin.adminlistProduct);

router.get("/addProduct", check.checkLogin, check.checkAdmin ,  controllerAdmin.adminaddProduct);

router.get("/changePass", check.checkLogin, check.checkAdmin ,  controllerAdmin.adminchangePass);

router.get("/changeProfile", check.checkLogin, check.checkAdmin ,  controllerAdmin.adminchangeProfile);

router.get("/news", check.checkLogin, check.checkAdmin ,  controllerAdmin.admiAddnews);

router.get("/listNews", check.checkLogin, check.checkAdmin ,  controllerAdmin.adminListnews);

router.get("/userOrderDetail/:id", check.checkLogin, check.checkAdmin ,  controllerAdmin.orderUserDetail);

router.post("/getPrd", controllerAdmin.getProduct)

router.post("/getUser", controllerAdmin.getUser)

router.post("/getOrder", controllerAdmin.getOrder)

router.post("/pavigationProduct", controllerAdmin.pavigationProduct)

router.post("/pavigationUser", controllerAdmin.pavigationUser)

router.post("/pavigationOrder", controllerAdmin.pavigationOrder)

router.put("/changePass", controllerAdmin.postChangePass)

router.post("/dangnhap", controllerAdmin.loginAdmin)

router.get("/dangnhap", controllerAdmin.login)

router.post("/logoutAdmin", controllerAdmin.logout)

module.exports = router;
