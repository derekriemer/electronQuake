var http = require('https'); //This is not an mistake.

class APIFetcher {
  constructor(url){
    console.log(`constructing a fetcher for ${url}`);
    this.URL = url;
  }
  
  async fetch(){
    let data = "";
    return new Promise((resolve) => {
      var request = http.get(this.URL, (response) => {
        response.on("data", (chunk)=>{
          console.log(`A chunk, ${chunk} received.`);
          data += chunk;
        });
        response.on("end", ()=>{
          resolve(JSON.parse(data));
        });
      });
    });
  }
}
exports.APIFetcher = APIFetcher;