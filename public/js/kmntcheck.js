function pingURL() { 

    // The custom URL entered by user 
    var settings = { 

        // Defines the configurations 
        // for the request 
        cache: false, 
        dataType: "jsonp", 
        async: true, 
        crossDomain: true, 
        url: "https://kmnt.scketchzone.com", 
        method: "GET", 
        timeout: 5000,
        headers: { 
        accept: "application/json", 
        "Access-Control-Allow-Origin": "*", 
        }, 

        // Defines the response to be made 
        // for certain status codes 
        statusCode: { 
        200: function (response) { 
            document.getElementById("status").innerHTML = "You can leave a comment, they're on!"; 
        }, 
        400: function (response) { 
            document.getElementById("status").innerHTML = "You can't leave a comment, they're offline!";
        }, 
        0: function (response) { 
            document.getElementById("status").innerHTML = "You can't leave a comment, they're offline!";
        }, 
        }, 
    }; 
        // Sends the request and observes the response
         $.ajax(settings).done(function (response) {
            console.log(response);
         });        

}