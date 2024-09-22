const mongoose = require('mongoose')


try {

    var url = `mongodb://localhost:27017/LicenseApplication`;
    // console.log("url ---",url);
    // var url = `mongodb://admin:Mongodb01!@203.150.143.70:27017/ATK?authSource=admin`;
    var option =  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    }
  mongoose.connect(url,option)
  mongoose.connection.on('connected', function () {  
    console.log('DB Connection');
    console.log(url);
  }); 
  mongoose.connection.on('error',function (err) {  
    console.log('DB Connection error: ' + err);
  }); 
} catch (error) {
    console.log(error);
}

