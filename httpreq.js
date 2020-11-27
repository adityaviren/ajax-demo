const { Console } = require("console");

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest; 
function showTime(){
    const date = new Date();
    return date.getHours() + "Hrs: " +date.getMinutes() + "Mins: " +date.getSeconds()+ "Secs ";
}
function makeAJAXCall(methodType, url, callback, async = true, data = null){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        console.log(methodType+ " State Change Called. Ready State: "+ xhr.readyState+" Status:" +xhr.status);
       if(xhr.readyState === 4) {
            if(xhr.status === 200 || xhr.status === 201){
                callback(xhr.responseText);
            }else if(xhr.status >= 400){
                console.log("Handle 400 Client err or 500 server err")
            }
        }
    }
    xhr.open(methodType, url , async);
    xhr.send();
    console.log(methodType+ " request sent to server at: " +showTime()); 
}
 
const getURL = "http://localhost:3000/employees/1";
function getUserDetails(data){
    console.log("Get User Data: " +data)
}

makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("Made GET AJAX Call to Server at "+showTime());

const deleteURL="http://localhost:3000/employees/4";
function userDeleted(Data){
    console.log("User deleted"+ data);
}
makeAJAXCall("Delete",deleteURL,userDeleted,false);

const postURL="http://localhost:3000/employees";
const emplData={"name":"Harry","salary":"5000"};
function userAdded(data){
    console.log("User added: "+data)
}
makeAJAXCall("POST",postURL,userAdded,true,emplData);