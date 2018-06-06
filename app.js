var express = require ("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose");

mongoose.connect("mongodb://charlielin:test123@ds251210.mlab.com:51210/restful_blog_test", { useMongoClient: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
})

var Blog = mongoose.model("Blog", blogSchema);



app.get("/", function(req, res){
	res.redirect("/blogs");
})
app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if (err){
			console.log("ERROR");
		} else{
			res.render("index", {blogs: blogs});
		}
	})
})




app.listen(5123, () => {
    console.log(`Server running at http://localhost:5123`);
});