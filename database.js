var sqlite3=require("sqlite3"); //this is module sqlite3
var express=require("express");


var app=express();	      //this is app express
app.use(express.json());  //fetch data from body while edit data	

// make database and create table use get method 
app.get("/create_table", function(req,res){      		//router or path endpoint
	var db=new sqlite3.Database("icc", function(err){   //open the database
	if(!err){
		db.run("create table indian_cricket_team (id integer primary key autoincrement, name text, state text, city text)",function(err, data){
			if(!err){
				console.log("table succesfully")
				return res.send("created table succesfully");
			}else{
				console.log(data)
				return res.send("table is already exists");	
			}	
		})
		}	
	})		
});




// });

get all courses name using get method
app.get("/all_courses", function(req,res){
	let db=new sqlite3.Database("icc", function(err){  			          //open database
	if (!err){
		db.all("select * from indian_cricket_team",  function(err,data){  //get all data from table using query
		if (!err){
			return (res.send(data));
		}
		console.log(err);
		return (res.json("error data reading"));
		});
	}
	else{
		console.log("error creating database");
	}
});
});




get all details by calling id by using get method
app.get("/all_courses/:id", function(req,res){
	var id = req.params.id;							      //params using fetch id when user input(parameter)
	let db=new sqlite3.Database("icc", function(err){     //open database
	if(!err){
		db.all("select * from indian_cricket_team  where id ="+id, function(err,all_data){ //database query
		if(all_data.length>0){  						  //use length of index value inrement
			return res.send(all_data);
		}else{
			return res.send({data:"please select correct id........"});
		}
		});	
	}
	});
});

//insert data in table by using post method
app.post("/all_courses/insert_data", function(req,res){
	let name=req.body.name;   	//req.body fetch data edit data postman
	let state=req.body.state;
	let city=req.body.city;

	let db=new sqlite3.Database("icc",function(err){
		if(!err){
			db.run('insert into indian_cricket_team (name, state, city) values("'+ name +'", "'+ state +'" , "'+ city +'");');
			console.log('insert into indian_cricket_team (name, state, city) values("'+ name +'", "'+ state +'" , "'+ city +'");');
			res.send(req.body);
		}
		else{
			console.log("error data inserting data")
		}
	});
});

app.put("/edit_data/:id", function(req,res){
	let name=req.body.name
	let state=req.body.state
	let city=req.body.city
	let db=new sqlite3.Database("icc", function(err){
	if(err){
		return res.send("{ErrMsg:there is prblem while while editing data}")
	}else{
		db.run('update indian_cricket_team set name="'+ name +'", state="'+ state +'", city="'+ city +'"  where id="'+req.params.id+'"', function(err){
		 return res.send("you have update data successfully.")
	})
}
	});
});	




app.delete("/delete_data/:id", function(req,res){
	let db=new sqlite3.Database("icc",function(err){
	if(!err){
		db.run("delete from indian_cricket_team where id="+req.params.id, function(err,data){
		if(!err){
			console.log("done");
			res.send(" Data deleted succesfully");
		}else{
			res.json('there is no available id in local server')
		}
		});
	}else{
		res.json("error while deleting data");
	}
	});
});

app.listen(4000, function(){  //port which is running 
	console.log("server is running.....");
});

// https://github.com/mdaijaj/Express-Database-with-sqlite3/blob/master/database.js