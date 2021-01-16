const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",(req,res)=>{
	res.render("search");
});

app.get("/results",(req,res)=>{
	const query= req.query.movie;
	const url = `http://www.omdbapi.com/?apikey=thewdb&s=${query}`;
  axios.get(url)
  .then(function (body) {
	  const result = body.data;
	  if (result.Response === "True") {
               res.render("results",{result});
            // if not, pass null to the view, which will be handled by ejs to say no movies found
            } else {
                res.render("results", {result: null});
            }
    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
	  res.send("Wrong movie name!");
  })
});
app.get("*",(req,res)=>{
	res.render("error");
})

const port = process.env.PORT || 3000;
app.listen(port, () =>{
	console.log('Movie App!!');
});