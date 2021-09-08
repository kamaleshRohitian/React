import React, { Component } from "react";
import Login from "./components/Login";
import axios from "axios";
import Home from "./components/Home";
import Signup from "./components/Signup";
//import { Link } from "react-router-dom";
//import { Redirect } from "react-router-dom";
import { router, Switch } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import UserNavigation from "./components/UserNavigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';  
export class App extends Component {
  render() {
    let redirect = false;
    async function submitHandler(username,password) {
      console.log("inside !..." + username+" pass;"+password);

        let body ={
          "id":null,
          "username":username,
          "password":password,
          "authority":null
        }
        let login = await axios
        .post("http://localhost:8091/",body,{
          data: {},
          headers: { Authorization: 'Basic '+btoa(username+":"+password)},
          //responseType: "text",
        })
        .then(response=>{
          console.log("login return :"+response.data.authority);
          //alert("login return :"+response.data.authority);
          window.sessionStorage.setItem("authority",response.data.authority);
          window.sessionStorage.setItem("username", username);
          window.sessionStorage.setItem("password", password);
          redirect = true;
        })
        .catch((err) => {
         alert("Please check your credentials!..");
          window.location.reload();
          return;
        });

      

      if (redirect) {
        window.location = "/home";
      }
    }
    async function signupHandler(body) {
      console.log("inside !..." + body);
      let res = await axios
        .post("http://localhost:8091/signup", body, {
          data: {},
          headers: { "Content-Type": "application/json" },
          responseType: "text",
        })
        .catch((err) => {
          alert("Username already exist in the database. Try with another different username!..");
          window.location.reload();
          return;
        });
        if(res.data==="success")
        {
          alert("Your data has been added to db successfully")
          window.location.reload();
          return ;
        }
        console.log("result:"+res.data);

    }

    return (
      <div className="App">
        <Switch>
          <router path="/" exact>
            <MainNavigation />
            <Login postLogin={submitHandler} />
          </router>
          <router path="/home">
            <UserNavigation />
            <Home />
          </router>
          <router path="/signup">
            <MainNavigation />
            <Signup postSignup={signupHandler} />
          </router>
        </Switch>
      </div>
    );
  }
}

export default App;
