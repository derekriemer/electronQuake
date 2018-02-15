var APIFetcher = require("../APIFetch").APIFetcher;

class EarthquakeFeedAPI {
  constructor(magnitude, timeRange){
    this.URL = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${magnitude}_${timeRange}.geojson`;
  }

  async getQuakesList() {
    let api = new APIFetcher(this.URL);
    return api.fetch();
  }
}
exports.EarthquakeFeedAPI = EarthquakeFeedAPI;