function getAll(){
    $.ajax({
        type: "GET",
        url: "/getallloc",
        async: false,
        success: function (ress) {
            for(i=0;i<3;i++){
                console.log(re)
            }
            console.log(ress)
        }
    })
}

function showNelems(n) {
   // alert('inside onclick')
    let count = $('#ncount').children("option:selected")[0].value
    window.location.href = '/getnloc/'+count 
}


function sendSMS(ip,latitude,longitude,city) {
   var number= document.getElementById("phone").value
  if(isvalidphone(number)) 
  {
    var obj={
        Message: 'IP Adsress: '+ip+' \n'+'Latitude: '+latitude+'\n'+'longitude: '+longitude+' \n'+'City: '+city+' \n',
        Number: '1'+number,
        Subject: 'IDTCorp'
       }
    
        // var requestConfig = {
        //     type : "GET",
        //      async: false,
        //     url: '/message/',
        //     data: JSON.stringify(obj),
        //     success: function(ress){
        //         console.log(ress)
                
        //     }
        // };
    
        $.ajax({
            type: "GET",
            url: "/message/",
            async: false,
            data: obj,
            success: function(ress){
                alert("Message Sent!");
                console.log(ress)
            }
        })
    
  }
  else{
    alert("Phone is not valid!");
  }
   
}
function isvalidphone(phone){
    if(!phone){
        return false;
    }

    if(phone.length!=10){
        return false;
    }
    if(isNaN(phone)){
        return false;
    }
return true;
}