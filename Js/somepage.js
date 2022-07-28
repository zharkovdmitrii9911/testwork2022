var worker = new Worker('Main.js');
var Checkfield = document.getElementById('Checkfield');
let user = {     
    name: "",  
    userLogIn: ""       
  };
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  if (getCookie("name")!=undefined) 
  if (getCookie("name")!="")
  {
    user.name = getCookie('name', json=true);
    user.userLogIn = getCookie('userLogIn', json=true) 
    Checkfield.innerHTML = "ваш логин : "+user.UserLogIn+"<br> и зовут вас: "+user.name;

    }else{
        Checkfield.innerHTML= "вы не вошли!"
    }
