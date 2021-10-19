window.onload = init;
var headers= {};
var url= "http://localhost:3000"

function init() {
    if(localStorage.getItem("token")){
        headers = {
            headers: {
                'Authorization': "bearer" + localStorage.getItem("token")
            }
        }
    }
    else{
        window.location.href="index.html";
    }
}

function loadUser(){
    axios.get(url + "/usuario", headers)
    .then(function(res){
        console.log(res);
        displayUser(res.data.message);
    }).catch(function(err){
        console.log(err);
    })
}

function displayUser(usuario) {
    var body = document.querySelector("body");
    for(var i = 0; i<usuario.length; i++){
        body.innerHTML +=`<h3>${t_user[i].user_name}</h3>`;
    }
}