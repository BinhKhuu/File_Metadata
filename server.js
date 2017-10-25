var express = require('express')
var path = require('path')
var fs = require('fs')
var multer = require('multer')
var app = express()
var upload = multer({dest: 'uploads/'})
app.use(express.static(path.join(__dirname, 'public')))
var port = Number(process.env.PORT || 8080)
var storage = multer.diskStorage({
	destination: function(req, file, callback){
		callback(null,'./uploads')
	},
	filename: function(req,file,callback){
		console.log(file)
		callback(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
	}
})
app.get('/', function(req,res){
	res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.post('/filesize',upload.single('file'),function(req,res){
	var fileSizeStr = req.file.size.toString()
	var upload = multer({
		storage: storage
	}).single('userfile')
	upload(req,res,function(err){
		res.end(fileSizeStr)
	})
})

app.listen(port,function(err){
	if(err) console.log(err)
	console.log('listening on port: ' + port.toString())
})

