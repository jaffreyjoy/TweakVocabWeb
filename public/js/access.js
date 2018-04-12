$.ajax({
        url: 'backend/get_users.php',
        type: 'POST',
        error: (function(data){
            // console.log(data);
            }),
        success: (function(data){
            // console.log(data);
            })
    }).done(function(response){
        // console.log("in done")
        data = JSON.parse(response);
        // console.log(data.length)

    }); 

$("#signup_form").submit(function(e){
    return false;
});



$("#login_form").submit(function(e){
    return false;
});

function submit_form()
{
    // console.log("inside")
    var fname = document.getElementById("first_name");
    var lname = document.getElementById("last_name");
    var id = document.getElementById("email_id");
    var username = document.getElementById("username");
    var pass = document.getElementById("s_password");

    if (fname.checkValidity()&&lname.checkValidity()&&id.checkValidity()&&username.checkValidity()&&pass.checkValidity() ) 
    {
        console.log("conditions met")
        $.ajax({
	        url: 'backend/signup.php',
	        type: 'POST',
	        data: {fname:fname.value,lname:lname.value,eid:id.value,uname:username.value,pass:pass.value},
	        error: (function(data){
	            // console.log(data);
	            }),
	        success: (function(data){
                    localStorage.setItem('user',username.value)
                    console.log()
                //     if (window.location.href=='http://localhost/TweakVocabWeb/public/index.html') 
                //     {
	       			     // window.location.href= 'chapters.html'
                //     }
                //     else
                //     {
                        // $('#signUpModal').modal('toggle');
                        location.reload();

                    // }
	            })
	    })
    }
    else
    {
        console.log("conditions not fulfilled")
    }
    

    
}

var data;

var password = document.getElementById("s_password")
  , confirm_password = document.getElementById("s_confirm_password");

$('#username').change(function(){
	var entered_username = $('#username').val()
	// console.log("checking")
	// console.log(data)
	if(data.filter(function(arr){return arr.username == entered_username})[0])
    {
    	alert("Username Already Exists!!")
    	$('#username').val("")
    }
    // else{
    // 	console.log("success")
    // }
})


function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    // console.log('Passwords match!!')
    confirm_password.setCustomValidity("");
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

	$.ajax({
        url: 'backend/get_users.php',
        type: 'POST',
        error: (function(data){
            // console.log(data);
            }),
        success: (function(data){
            	// console.log(data);
        		data = JSON.parse(data);
            })
    })

// loginModal

function login_click()
{
	var user = $('#id').val()
	var pass = $('#login_pass').val()

	$.ajax({
            url: 'backend/login.php',
            type: 'POST',
            data: {user:user,pass:pass},
            error: (function(data){
                // console.log("in error");
                console.log(data);
                }),
            success: (function(data){
                console.log("in success");
                if (data=="fail") 
                {
                    console.log("fail")
                    showSnackbar();                
                }
                else
                {
                    data = JSON.parse(data);
                    console.log(data);
                    console.log(data.text);

                    localStorage.setItem('user',data.username)
                    localStorage.setItem('fname',data.first_name)
                    localStorage.setItem('lname',data.last_name)
                    // window.location.href = 'chapters.html'
                    location.reload();
                }
                

                })
        })
}



// login signup toggle

$( window ).on( "load", function(){
    // console.log("working")
    var user = localStorage.getItem('user');
    console.log("user: "+ user)
    if (user==null||user=="") 
    {
        // no one logged in
        $('#login_button').show()
        $('#signup_button').show()
        $('#logout_button').hide()
        $('#text').hide()
    }
    else
    {
        // a user logged in
        $('#login_button').hide()
        $('#signup_button').hide()
        $('#logout_button').show()
        $('#text').show()
        fname = localStorage.getItem('fname')
        lname = localStorage.getItem('lname')
        $('#greeting').text("Hello "+ fname + " " + lname + "!")
        

    }

});

function logout()
{
     localStorage.setItem('user',"")
     location.reload();
}

function showSnackbar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}