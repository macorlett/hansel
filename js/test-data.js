// the following is test data to be inserted into the users local files
// ---------------------------------------------------------------------
//
// in the future this will be replaced with a pull from the servers db

// example of trail data
var trail={
    "id":"123",
    "name":"Blob's trail",
    "author":"@Blob",
    "updated":1407730741,
    "crumbs":[
      {
      "type":"location",
      "lng":-41.293008,
      "lat":174.775097,
      "zoom":16,
      "place":"62 Ghuznee street",
      "map":""
      }
    ]
}

//store data locally
function storeLocal(data){
  if(typeof(Storage)!=="undefined"){
    var store=JSON.stringify(data);
    var keyName=data.id+data.author;
    var status="processing";

    //check if the data already exists
    if(storeCheck(keyName)){
      // is it up to date?
      if(!storeUpdated(keyName,data.updated)){
        //if not up to date then replace it
        localStorage.setItem(keyName,store);
        status="data updated";
      }
    }else{
      // if it doesn't exist create it
      localStorage.setItem(keyName,store);
      status="data stored locally";
    }
  }else{
    //redirect to the page that tells the user they need to upgrade their browser
    window.location="{{ site.url }}/browser.html";
  }
}

//check if data is already stored
function storeCheck(key){
  if(localStorage.getItem(key)===null){
    return false; // doesn't exist
  }else{
    return true; // data with this key exists
  }
}

//check if data is up to date
function storeUpdated(key,time){
  var data=JSON.parse(localStorage.getItem(key));
  
  if(data.updated>=time){
    return true; //data is up to date
  }else{
    return false; //data is out of date
  }
}

function getCrumb(key,pos){
  var trail=JSON.parse(localStorage.getItem(key));

  return trail.crumbs[pos];
}

//$(document).ready(storeLocal(trail));