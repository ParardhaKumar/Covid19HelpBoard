document.getElementById("displayState").style.display = "none";
document.getElementById("displayNum").style.display = "none";

function retrieveState(){
  pincode = document.getElementById("pin").value;
  if(pincode.length==6){
    console.log(pincode)
    fetch("https://api.postalpincode.in/pincode/" + pincode).then(function(body){
        var parsedData = body.json();
        parsedData.then(function(result){
          if(result[0]["Status"] === "Success"){
            var loc = result[0]["PostOffice"][0]["State"];
            console.log(loc)
            document.getElementById("displayState").style.display = "block";
            document.getElementById("displayState").innerHTML = "You are in <span style='color:yellow;'>" + loc + "</span>";
            fetch("https://api.rootnet.in/covid19-in/contacts").then(function(body){
              var parsedData = body.json();
              parsedData.then(function(result){
                if(result["success"] === true){
                  for(i in result["data"]["contacts"]["regional"]){
                    if(result["data"]["contacts"]["regional"][i]["loc"]==loc){
                      document.getElementById("displayNum").style.display = "block";
                      document.getElementById("displayNum").innerHTML = "Your <span style='color:red;'> emergency contact </span> is <span style='color:red;'>" + result["data"]["contacts"]["regional"][i]["number"] + "</span>"
                    }
                  }
                }
              })
            });
          }
        });
      })

  }
}
