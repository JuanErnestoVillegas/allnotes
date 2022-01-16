if(localStorage.getItem('userlog') === null && !localStorage.getItem('userlog')){
    window.location.assign(window.location.origin+'/login.html');  
    
} else{
    usuario_logueado = JSON.parse(localStorage.getItem("userlog"));
    localStorage.getItem('userlog',JSON.stringify(idUser));
    document.getElementById("labeluser").value = usuario;
    document.getElementById("idusuario").value = idUser;
}