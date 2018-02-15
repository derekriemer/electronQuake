var APIFetcher = require("../APIFetch").APIFetcher;

class EarthquakeQueryAPI {
  constructor(){
    this.URLTemplate = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&";
  }
  
  async getQuakeFromID(id){
    let URL = this.URLTemplate+`eventid=${id}`;
    let api = new APIFetcher(URL);
    return api.fetch();
  }    
}
exports.EarthquakeQueryAPI = EarthquakeQueryAPI;