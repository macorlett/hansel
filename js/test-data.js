// the following is test data to be inserted into the users local files
// ---------------------------------------------------------------------
//
// in the future this will be replaced with a pull from the servers db

// example of trail data
var trailData={
    "id":"123",
    "name":"Blob's trail",
    "author":"@Blob",
    "updated":1407730753,
    "crumbs":[
      {
      "type":"location",
      "lat":-41.2929,
      "lon":174.7749,
      "zoom":16,
      "threshold":10,
      "place":"62 Ghuznee street",
      "map":""
      },
      {
      "type":"image",
      "sucess_type":"click",
      "message":"In fermentum urna erat, eget tristique quam porttitor non. Aliquam mattis tellus libero, nec fringilla diam auctor ac volutpat.",
      "location":[{"lat":"","lon":"","threshold":""}], //only used if success_type is location
      "answer":"" //only used if success_type is answer
      },
      {
      "type":"text",
      "success_type":"answer", // can also be click
      "message":"this has a 140 character limit",
      "answer":"1234!", //only used if success_type is answer
      }
    ]
}