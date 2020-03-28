document.getElementById("displayState").style.display = "none";
document.getElementById("displayNum").style.display = "none";

function retrieveState(){
  pincode = document.getElementById("pin").value;
  if(pincode.length==6){
  // pincode = 411014;
    console.log(pincode)
    fetch("https://api.postalpincode.in/pincode/" + pincode).then(function(body){
        var parsedData = body.json();
        parsedData.then(function(result){
          if(result[0]["Status"] === "Success"){
            var loc = result[0]["PostOffice"][0]["State"];
            document.getElementById("displayState").style.display = "block";
            document.getElementById("displayState").innerHTML += loc;
            fetch("https://api.rootnet.in/covid19-in/contacts").then(function(body){
              var parsedData = body.json();
              //console.log(parsedData);
              parsedData.then(function(result){
                //console.log(result);
                if(result["success"] === true){
                  //console.log(result["data"]["contacts"]["regional"])
                  for(i in result["data"]["contacts"]["regional"]){
                    //console.log(result["data"]["contacts"]["regional"][i]["loc"]);
                    if(result["data"]["contacts"]["regional"][i]["loc"]==loc){
                      document.getElementById("displayNum").style.display = "block";
                      document.getElementById("displayNum").innerHTML += result["data"]["contacts"]["regional"][i]["number"]
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

retrieveState();
