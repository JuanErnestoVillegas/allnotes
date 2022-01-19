if(localStorage.getItem('userlog') === null && !localStorage.getItem('userlog')){
    window.location.assign(window.location.origin+'/login.html');      
} 