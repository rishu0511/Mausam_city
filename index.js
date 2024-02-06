import express from "express";
import bodyparser from "body-parser";
import axios from "axios";
const app = express();
const port= 3000;
const API_key = "9d159926fb8c9e6cfd91f069d195f1fd";
const API_url = "http://api.openweathermap.org/geo/1.0/direct?"

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

let latitude = 0;
let longitude =0;
let city="Saharanpur";
let state="Uttar Pradesh";

app.get("/" , async(req,res)=>{
    try {
        const response = await axios.get(`${API_url}q=${city}&limit=5&appid=${API_key}`);
        const location = response.data;
        const len_data = location.length;
          for (let i=0;i<len_data;i++) {
            var loc_state = location[i].state;
            if(loc_state ===state){
              var user_loc= location[i];
              
              latitude = user_loc.lat;
              longitude=user_loc.lon

            }
          }
        const weather = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`);
        const weather_data = weather.data;
        const dat = weather_data.dt;
        function find_date(DATE){
          const d = new Date(DATE*1000);
          const date = d.toUTCString();
          const DDte= String(date);
          const taree= new Date(DDte);
          const tareekh= d.setUTCHours(5.5);
          const all_date=[]
          const Month=["January","February","March","April","May","June","July","Augast","September","October","Nnovember","December"]
          const week=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
          const Dat = taree.getDate();
          const day= taree.getDay();
          const month =taree.getMonth();
          const year =taree.getFullYear();
          const hours=taree.getHours();
          const minutes=taree.getMinutes();
          all_date.push(week[day],Dat,Month[month],year,hours,minutes);
          return all_date;
        }
        
        const sun_r=find_date(weather_data.sys.sunrise)
        const sun_s=find_date(weather_data.sys.sunset)
        const temp=weather_data.main.temp-273;
        const temp_max=weather_data.main.temp_max-273;
        const temp_min=weather_data.main.temp_min-273;
        const descript = weather_data.weather[0];
        let photo ="shiny/shiny_1"
        if(descript.main==="Fog" ){
          const fog=["fog_1","fog_2","fog_3","fog_4"];
          const random_fog=fog[Math.floor(Math.random()*4)]
          photo="fog/" + random_fog;
        }else if(descript.main==="Smoke" ){
          const fog_s=["fog_1","fog_2","fog_3","fog_4"];
          const random_S=fog_s[Math.floor(Math.random()*4)]
          photo="fog/" + random_S;
        }else if(descript.main==="Clouds"){
          const cloud=["cloudy_1","cloudy_2"];
          const random=cloud[Math.floor(Math.random()*2)]
          photo="cloudy/" + random;
        } else if(descript.main==="Mist"){
          photo="shiny/mist"
        }else{
          photo="shiny/shiny_1"
        }
        res.render("index.ejs",{
          des:descript.main,
          cloud:descript.description,
          place:weather_data,
          temp:Math.floor(temp),
          max_temp:Math.floor(temp_max),
          min_temp:Math.floor(temp_min),
          sun_rm:sun_r[5],
          sun_rh:sun_r[4],
          sun_sm:sun_s[5],
          sun_sh:sun_s[4],
          wind_speed:weather_data.wind.speed,
          Photo:photo,
        })
        } catch (error) {
          res.status(500).json({ message: "Error fetching posts" });
          console.log(error);
        }
});
app.get("/new",async(req,res)=>{
  try {

        const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`);
        const weather_data = weather.data;
        const dat = weather_data.dt;
        function find_date(DATE){
          const d = new Date(DATE*1000);
          const date = d.toUTCString();
          const DDte= String(date);
          const taree= new Date(DDte);
          const tareekh= d.setUTCHours(5.5);
          const all_date=[]
          const Month=["January","February","March","April","May","June","July","Augast","September","October","Nnovember","December"]
          const week=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
          const Dat = taree.getDate();
          const day= taree.getDay();
          const month =taree.getMonth();
          const year =taree.getFullYear();
          const hours=taree.getHours();
          const minutes=taree.getMinutes();
          all_date.push(week[day],Dat,Month[month],year,hours,minutes);
          return all_date;
        }
        const sun_r=find_date(weather_data.sys.sunrise)
        const sun_s=find_date(weather_data.sys.sunset)
        const temp=weather_data.main.temp-273;
        const temp_max=weather_data.main.temp_max-273;
        const temp_min=weather_data.main.temp_min-273;
        const descript = weather_data.weather[0];
        let photo = "shiny/shiny_1"
        if(descript.main==="Fog" ){
          const fog=["fog_1","fog_2","fog_3","fog_4"];
          const random_fog=fog[Math.floor(Math.random()*4)]
          photo="fog/" + random_fog;
        }else if(descript.main==="Smoke" ){
          const fog_s=["fog_1","fog_2","fog_3","fog_4"];
          const random_S=fog_s[Math.floor(Math.random()*4)]
          photo="fog/" + random_S;
        }else if(descript.main==="Clouds"){
          const cloud=["cloudy_1","cloudy_2"];
          const random=cloud[Math.floor(Math.random()*2)]
          photo="cloudy/" + random;
        } else if(descript.main==="Mist"){
          photo="shiny/mist"
        }else{
          photo="shiny/shiny_1"
        }
        res.render("modify.ejs",{
          des:descript.main,
          cloud:descript.description,
          place:weather_data,
          temp:Math.floor(temp),
          max_temp:Math.floor(temp_max),
          min_temp:Math.floor(temp_min),
          sun_rm:sun_r[5],
          sun_rh:sun_r[4],
          sun_sm:sun_s[5],
          sun_sh:sun_s[4],
          wind_speed:weather_data.wind.speed,
          Photo:photo,
        })

      } catch (error) {
          res.status(500).json({ message: "Error fetching posts" });
          console.log(error)
      }

})
app.post("/find_weather",async(req,res)=>{
  city=req.body.city;
  state= req.body.state;
  res.redirect("/");


})
app.listen(port,()=>{
    console.log(`server is litsning on port ${port}`)
})