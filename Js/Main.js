var RegistrationFormError = document.getElementById('RegistrationFormError');
var RegistrationFormSuccess = document.getElementById('RegistrationFormSuccess');
var AuthorizationFormError = document.getElementById('AuthorizationFormError');
var AuthorizationFormSuccess = document.getElementById('AuthorizationFormSuccess');

let userGlobal = {     
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
  let name = getCookie('name', json=true);
  let login = getCookie('userLogIn', json=true) 
  userGlobal.name = name;
  userGlobal.userLogIn = login;
  UserLogIn(userGlobal.name);
}
function CookiesDelete() {
  var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        setCookie(name, "", {expires: -1})
    }
}

function checklogin() {
  var login = document.getElementById('RegistrationLogin').value;
  Send ='Login=' + encodeURIComponent(login)+'&Operation=Checklogin';
  var entFieldlogin = document.getElementById('RegistrationLogin');
  var loginmessage = document.getElementById('loginmessage');
  loginmessage.innerHTML="";

  var request = new XMLHttpRequest();
  request.open('POST','phpFiles/action.php',true);
  request.addEventListener('readystatechange', function() {
      if ((request.readyState==4) && (request.status==200)) { 
        console.log(request.responseText);
        if (request.responseText=='not found') {
          entFieldlogin.classList.remove("Errormess");
        }else
        {
          entFieldlogin.classList.add("Errormess");
          loginmessage.innerHTML="пользователь с таким логином уже зарегистрирован";
        }
      }

  });
   request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(Send);
}

function checkEmail() {
  var Email = document.getElementById('RegistrationEmail').value;
  Send ='Email='+encodeURIComponent(Email)+'&Operation=CheckEmail';
  var entFieldEmail = document.getElementById('RegistrationEmail');
  var emailmessage = document.getElementById('emailmessage');
  emailmessage.innerHTML="";

  var request = new XMLHttpRequest();
  request.open('POST','phpFiles/action.php',true);
  request.addEventListener('readystatechange', function() {
      if ((request.readyState==4) && (request.status==200)) { 
        console.log(request.responseText);
        if (request.responseText=='not found') {
          entFieldEmail.classList.remove("Errormess");
        }else
        {
          entFieldEmail.classList.add("Errormess");
          emailmessage.innerHTML="пользователь с такой почтой уже зарегистрирован";
        }
      }

  });
   request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(Send);
}

function InputCheck() {
  var login = document.getElementById('RegistrationLogin').value;
  var Name = document.getElementById('RegistrationName').value;
  var Email = document.getElementById('RegistrationEmail').value;
  var Pass = document.getElementById('RegistrationPass').value;
  var Pass1 = document.getElementById('RegistrationPass1').value;
  var Button = document.getElementById('RegistrationSend');
  
  var Passisre = /(?=.*[0-9])(?=^\S+$)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/;
  var PassisValid = Passisre.test(Pass);  
  var loginre =/(?=^\S*$)(?=^.{6,30}$)/;
  var loginisValid = loginre.test(login);
  var Namere =/(?=^\D*$)(?=^\S*$)(?=^.{2,20}$)/;
  var NameisValid = Namere.test(Name);
  var Emailre = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/; 
  var EmailisValid = Emailre.test(Email);
  var confirm_password = false;
  var confirm_ligin = false;
  var errormassege="";
  if (Pass==Pass1) {
    confirm_password= true;
  }else{
    confirm_password= false;
    if (Pass.length>0) {
      errormassege+= ("Пароли не совпадают");
    }
  }    
  if (!PassisValid&&Pass.length>0) {
    errormassege+= ("<br>Этот пароль не подходит")
  }
  if (!loginisValid&&login.length>0) {
    errormassege+= ("<br>Этот логин не подходит <br> минимум 6 символов")
  }
  if (!NameisValid&&Name.length>0) {
    errormassege+= ("<br>Этот имя не подходит <br> минимум 2 символов, только буквы")
  }
  if (!EmailisValid&&Email.length>0) {
    errormassege+= ("<br>Неправильное написание почты, пожалуйста проверьте")
  }

  if (PassisValid&&loginisValid&&confirm_ligin&&
    NameisValid&&EmailisValid&&confirm_password) {
    Button.disabled=false;
  }else
  {Button.disabled=true;}

  RegistrationFormError.innerHTML = errormassege
  /*console.log("Pass1 ="+Pass);
  console.log("Pass2 ="+Pass1);
  console.log("PassisValid ="+PassisValid);
  console.log("loginisValid ="+loginisValid);
  console.log("NameisValid ="+NameisValid);
  console.log("EmailisValid ="+EmailisValid);*/
}

function UserLogOut() {
  CookiesDelete();
  LogIn = document.getElementById("UnlogInFormButton");
  LogIn.classList.remove("UnVivible");
  LogOut = document.getElementById("logInFormButton");
  LogOut.classList.add("UnVivible");
  var HeaderPanel = document.getElementById('HeaderInform');
  HeaderPanel.innerHTML = "";
  
}
function UserLogIn(userLogIn) {
  forms = document.getElementsByClassName("container");
  for (let index = 0; index < forms.length; index++) {
    if (forms[index].classList.contains("formVisibility")) {
      forms[index].classList.remove("formVisibility");
    } 
  }
  LogIn = document.getElementById("UnlogInFormButton");
  LogIn.classList.add("UnVivible");
  LogOut = document.getElementById("logInFormButton");
  LogOut.classList.remove("UnVivible");
  var HeaderPanel = document.getElementById('HeaderInform');

  HeaderPanel.innerHTML = "Здравствуйте "+userLogIn+" ";
  

}

function FormShowSwich(FormShowingId,FormHiddenId) {
    FormShowing = document.getElementById(FormShowingId);
    FormHidden = document.getElementById(FormHiddenId);
    FormShowing.classList.toggle("formVisibility");
    FormHidden.classList.remove("formVisibility");
    AuthorizationFormError.innerHTML ="";
    AuthorizationFormSuccess.innerHTML="";
    RegistrationFormError.innerHTML="";
    RegistrationFormSuccess.innerHTML="";   
}




document.addEventListener("DOMContentLoaded",function() {

    var buttonRegistration = document.getElementById('RegistrationSend');

    buttonRegistration.addEventListener("click", function(){
        var login = document.getElementById('RegistrationLogin').value;
        var Name = document.getElementById('RegistrationName').value;
        var Email = document.getElementById('RegistrationEmail').value;
        var Pass = document.getElementById('RegistrationPass').value;

        Send ='Login=' + encodeURIComponent(login)+
        '&Name='+encodeURIComponent(Name)+
        '&Email='+encodeURIComponent(Email)+
        '&Pass='+encodeURIComponent(Pass)+'&Operation=registration';
        console.log(Send);
        var request = new XMLHttpRequest();
        request.open('POST','phpFiles/action.php',true);
        request.addEventListener('readystatechange', function() {
            if ((request.readyState==4) && (request.status==200)) {         
             console.log(request);
             console.log(request.responseText);
             
              if (request.responseText=='Success') {
                RegistrationFormSuccess.innerHTML=("Регистрация проведина успешно");
              }else
              {
                RegistrationFormError.innerHTML = ("Ошибка, возможно на такой логин или почту уже зарегестирован аккаунт");
                
              }
              console.log(request.responseText);
            }
        });
         request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
        request.send(Send);
    });
  });

  document.addEventListener("DOMContentLoaded",function() {

    var buttonAuthorization = document.getElementById('AuthorizationSend');

    buttonAuthorization.addEventListener("click", function(){
        var login = document.getElementById('AuthorizationLogin').value;

        var Pass = document.getElementById('AuthorizationPass').value;

        Send ='Login=' + encodeURIComponent(login)+
        '&Pass='+encodeURIComponent(Pass)+'&Operation=authorization';
        console.log(Send);
        var request = new XMLHttpRequest();
        request.open('POST','phpFiles/action.php',true);
        request.addEventListener('readystatechange', function() {
            if ((request.readyState==4) && (request.status==200)) {  
              console.log(request.responseText);
              if (request.responseText=='Error') {
                AuthorizationFormError.innerHTML = ("Ошибка, проверьте логин и пароль");
              }else
              {
                AuthorizationFormSuccess.innerHTML=("Авторизация проведина успешно");
                console.log(request.responseText);
                  user = JSON.parse(request.responseText);
                  
                  userGlobal.name = user.name;
                  userGlobal.userLogIn = user.LogIn;
                  setCookie('name', userGlobal.name,7);
                  setCookie('userLogIn', userGlobal.userLogIn,7);
                  
                  
                  UserLogIn(userGlobal.name);
                
              }
            }
        });
         request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        request.send(Send);
    });
  });
  function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}