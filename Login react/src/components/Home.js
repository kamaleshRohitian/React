import React from 'react';


function Home(){
  const username=window.sessionStorage.getItem("username");
  if(username==null)
  {
      alert("Please sigin to access the page!.");
    window.location="/";
    return false;
  }
    return (
      <h1>Home Page</h1>
    )
}
export default Home;