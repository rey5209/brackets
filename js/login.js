
// pag puuumunta kang login, tiyak KELANGAN MO ULET MAG LOGIN!! 8===D
sessionStorage.clear();

$json_login_credentials = []

// Get the date of being edited
fetch("js/accounts.json")
  .then(response => { return response.json(); })
  .then(function(data) { 
    $json_login_credentials = data
}).catch(function(error) {
  console.log(error);
}); 

fetch("js/days.json")
    .then(response => {
      return response.json();
    })
    .then(function(data) {  

      $('#day_pickr').empty()
      data.forEach(setDays);
      // data.yesterday.forEach(setViewsYesteday); 

      function setDays(item, index) { 
        $('#day_pickr').append('<option data-link="'+item.link+'" data-json="'+item.json_name+'" ">'+item.day+'</option>') 
      }
      
  }).catch(function(error) {
    console.log(error);
  }); 
var enterLock = false;


$(document).on('keypress',function(e) {
    if(e.which == 13 && enterLock == false) {
        enterLock = true;
        // alert('You pressed enter!');
        submitLogin()
    }
});

$('#btn_login').on("click", function() {
    submitLogin()
})


    
    
function submitLogin(){
         
    // console.log($json_login_credentials)

    
    var found = checkCredentials( $('#login_user_name').val(),  $('#login_password').val());
    // var found = loginValidation( $('#login_user_name').val(),  $('#login_password').val());



    if(found.length > 0){
      $('#exampleModal').modal({backdrop: 'static', keyboard: false});
      $('#exampleModal').modal('show');

      
      $('#btn_select').on("click", function() {
          
          found[0].json_name = $('#day_pickr').find(":selected").data('json')
          found[0].link = $('#day_pickr').find(":selected").data('link')

          // ENCRYPT STRINGIFY JSON TO URLPARAM
          var encrypted = CryptoJS.AES.encrypt( JSON.stringify(found[0]) , "GALIT-AKO-SA-PINK!"); 
              encrypted = encrypted.toString().replace(/\+/g, "PLUS"); 
              //SINCE IT WILL BE SENT TO THE LINK, THE + SIGN WILL BECOMME NEWLINE THERE AND WILL RESULT ERROR
        

         Swal.fire({
            title: 'Logged in',
            text: "Welcome! "+found[0].first_name+" "+found[0].last_name+"!",
            icon: 'success'
        }).then((result) => {
            enterLock = false;
            // sessionStorage.setItem("username", found[0].first_name+" "+found[0].last_name);
            // sessionStorage.setItem("profile", found[0].profile);
            // sessionStorage.setItem("login_credentials",JSON.stringify(found[0]));
            // document.location='index.html'; 
            document.location= found[0].link+"?data="+encrypted; 
            // do something
        });
        
      }) 
        // console.log(found[0].username);
    }else 
        Swal.fire({
            title: 'Invalid Credentials!',
            text: 'Please contact your CFO advisor to provide your own credential details',
            icon: 'error',
            confirmButtonText: 'Confirm'
        }).then((result) => {
            enterLock = false; 
            // do something
        });;
}
 


function checkCredentials(user, pass) {
  return $json_login_credentials.filter(
      function(data){ return data.username.toLowerCase() == user.toLowerCase() &&  data.password == pass}
  ); 
}


// function loginValidation(user, pass){

//     var return_data = [];
  
//     $.ajax({
//       url: 'includes/loginValidation.php',
//       async: false,
//       method: "POST",
//       enctype: "multipart/form-data",
//       data: {user : user, pass: pass},   
//        dataType:"json", 
//        success: function(data) {
           
//         //   console.log(data) 
   
//         return_data = data;
//        },
//        error: function(request, error) { 
//           console.log(request)
//           console.log(error)
//           console.log("Something went wrong");

//           return_data = [];
//        }
//     });

    
//     return return_data;

//   }