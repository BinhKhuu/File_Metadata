var express = require('express')
var autoReap = require('multer-autoreap')
var path = require('path')
var multer = require('multer')
var app = express()
var upload = multer({dest: 'uploads/'})
app.use(express.static(path.join(__dirname, 'public')))
app.use(autoReap)
var port = Number(process.env.PORT || 8080)
app.get('/', function(req,res){
	res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.post('/filesize',upload.single('file'),function(req,res){
	var fileMetaData = {'size' : req.file.size}
	res.json(fileMetaData)
})

app.listen(port,function(err){
	if(err) console.log(err)
	console.log('listening on port: ' + port.toString())
})

