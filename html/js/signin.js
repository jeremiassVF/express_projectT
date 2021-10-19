window.onload=init;

function init(){
    if(!localStorage.getItem("token")){
        document.querySelector('.btn-secondary').addEventListener('click',function(){
            window.location.href = "login.html" 
        });
    
        document.querySelector('.btn-primary').addEventListener('click', signin);
    }
    else{
        window.location.href = "user.html";
    }
    
}

function signin(){
    var name = document.getElementById('input-name').value;
    var lastname = document.getElementById('input-lastname').value;
    var fon = document.getElementById('input-fon').value;
    var adress = document.getElementById('input-adress').value;
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/signin',
        data:{
            user_name: name,
            user_lastname: lastname,
            user_fon: fon,
            user_adress: adress,
            user_mail: mail,
            user_password: pass
        }
    }).then(function(res){
        console.log(res);
       alert("Registro exitoso"); 
        window.location.href= "login.html";
    }).catch(function(err) {
        console.log(err);
    })
}
