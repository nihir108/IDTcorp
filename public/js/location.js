var submit = document.getElementById("getLocation");
function isvalidip(ip) {
    var ipregex = /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    return ipregex.test(ip)
}

var allob;
submit.addEventListener("click", (event) => {


    // setTimeout(getAdress, 3000);
    var ip = document.getElementById("address").value
    // var regex = new RegExp("^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$");
    // if(!regex.test(input))
    // {
    //     event.preventDefault();
    // }
    if (isvalidip(ip)) {
        var access_key = '5cc099a5a5ec92c572d6f3b463bc33ad';
        var location;
        console.log("in here")
        // get the API result via jQuery.ajax
        $.ajax({
            url: 'http://api.ipstack.com/' + ip + '?access_key=' + access_key,
            dataType: 'jsonp',
            success: function (json) {
                location = json;
                console.log(json)
                // output the "capital" object inside "location"
                //  alert(json.city);
                console.log("dhsdj")
            }
        });


        // getAdress();

        function add_location(ip) {

            var requestConfig = {
                type: "GET",
                async: false,
                url: 'http://api.ipstack.com/' + ip + '?access_key=' + access_key

            };
            console.log(requestConfig)
            $.ajax(requestConfig).then(function (responseMessage) {
                console.log(responseMessage)
                // var comment_data = responseMessage.data
                // document.getElementById('"' + note_id + '"').value = ""
                // var comments = document.getElementById(index);

                // comments.innerHTML += '<div class="d-flex" style="background-color: #cccccc73;margin-bottom: 0.5%;border-radius: 11px;">' +
                //     `<div class="p-2" style="text-transform: lowercase;color: #0062cc;">${comment_data.name}</div>` +
                //     `<div class="p-2" style="font-family: sans-serif;">${comment_data.description}</div>` +
                //     `<div class="ml-auto p-2">On ${comment_data.commented_at}</div></div>`

                // $(e).parent().remove()
                // do add msg saying friend is succesfully added
            }).catch(function (error) {
                console.log(error.responseJSON)
            });;
        }

        $.ajax({
            type: "GET",
            url: 'http://api.ipstack.com/' + ip + '?access_key=' + access_key,
            async: false,
            success: function (ress) {
                location = {
                    ip: ress.ip,
                    latitude: ress.latitude,
                    longitude: ress.longitude,
                    city: ress.city
                }
                console.log(ress)
            }
        })

        $.ajax({
            type: "POST",
            url: "/",
            async: false,
            data: location,
            success: function (ress) {
                allob = ress;
                console.log(ress)
            }
        })
    }
    else {
        alert("Please enter valid IPv4")
        event.preventDefault();
    }

    //   var ip = '134.201.250.155'


    // $.ajax({
    //     type: "GET",
    //     url: "/",
    //     async: false,

    //     success: function(loc){
    //         for(i=0;i<loc.res.length;i++){
    //             show.innerHTML += '<div class="d-flex" style="background-color: #cccccc73;margin-bottom: 0.5%;border-radius: 11px;">' +
    //         `<div class="p-2" style="font-family: sans-serif;">IP: ${res.ip}</div>`+
    //             `<div class="p-2" style="font-family: sans-serif;">latitude ${res.latitude}</div>` +
    //             `<div class="p-2" style="font-family: sans-serif;">longitude ${res.longitude}</div>`+
    //             `<div class="p-2" style="font-family: sans-serif;">on ${res.date}</div>`
    //         }
    //     }
    // })

    //add_location(ip);
}, true);