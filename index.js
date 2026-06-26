import express from "express";
import dotenv from "dotenv"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 4000;

let teas = [];
let index = 1;


app.use(express.json());
//submit teas
app.post("/teas", (req, res) => {  // post is used to create a new resource on the server. In this case, we are creating a new tea object and adding it to the teas array.
   const {name,price} = req.body;
    const newtea = {id:index++,name,price};
    teas.push(newtea);
    res.status(201).send(newtea);
})  
//getting tea
app.get("/teas", (req, res) => { // get is used to retrieve a resource from the server. In this case, we are retrieving the teas array and sending it back to the client.
    return res.status(200).send(teas);
})
//get tea by id 
app.get("/teas/:id", (req, res) => { // get is used to retrieve a resource from the server. In this case, we are retrieving a specific tea object from the teas array based on the id parameter in the URL.
    const {id} = req.params;
    const tea = teas.find((t) =>{ t.id === parseInt(id)});
    if(!tea){
        res.status(404).send({error:"tea not found"});
    }
    res.status(200).send(tea);
});
//update tea

app.put("/teas/:id",(req,res)=>{
    const {id} = req.params ;
    const {name,price} = req.body;
    teas.forEach((t)=>{
      if(t.id==parseInt(id)){
        t.name = name;
        t.price = price;
      }
    })
    res.status(200).send(teas)
})

app.delete("/teas/:id",(req,res)=>{
      let index = teas.findIndex(t=>t.id==parseInt(req.params.id))
      if(index==-1){
        return res.status(404).send("no tea found")
      }
      teas.splice(index,1)
      return res.status(200).send('deleted')



  })




app.get("/", (req, res) => { // get is used to retrieve a resource from the server. In this case, we are retrieving the teas array and sending it back to the client.
  res.send("Hello from Express!");
});
app.get("/ice-tea", (req, res) => {
  res.send("what ice tea you want? we have lemon, peach, and green tea");
});
app.get("/twitter", (req, res) => {
  res.send("this is a twitter page");
}); 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
