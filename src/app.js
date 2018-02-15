//import "./stylesheets/main.css";

// Small helpers you might want to keep
//import "./helpers/context_menu.js";
//import "./helpers/external_links.js";

var EarthquakeFeedAPI = require("./quake/earthquakeFeedApi").EarthquakeFeedAPI;
var EarthquakeQueryAPI = require("./quake/earthquakeQueryApi").EarthquakeQueryAPI;
var Details = require("./details").Details;

async function quakeDetails(event){
  let curQuakeElem = $(event.target);
  let id = curQuakeElem.attr("data-quake-id");
  let quakeDlg = $("#quake-details");
  let quakeDetailsMsg = $("#quake-details-loading-alert");
  let quakeDetailsTBody = $("#quake-details-table-body");
  quakeDetailsTBody.text("");
  quakeDlg.modal("show");
  quakeDetailsMsg.show();
  quakeDetailsTBody.hide();
  let api = new EarthquakeQueryAPI();
  let data = await api.getQuakeFromID(id);
  var elem="";
  let rows = new Details(data);
  rows.fillTable(quakeDetailsTBody[0]);
  quakeDetailsMsg.hide();
  quakeDetailsTBody.show();
}

function refreshQuakesList(){
  let quakesList = $("#quakeslist");
  quakesList.hide();
  let quakeAlertMsg = $("#quake-loading-banner");
  quakeAlertMsg.show();
  quakeslist.innerText = "";
  let quakeApi = new EarthquakeFeedAPI(
    $("#quake-magnitude-select").find(":selected").attr("data-type"),
    $("#quake-time-range-select").find(":selected").attr("data-type")
  );
  quakeApi.getQuakesList().then((quakeData)=>{
    $("#quake-type-title").text(quakeData.metadata.title).focus();
    quakeData.features.reduce((htmlList, quake)=>{
      let li = document.createElement("li");
      let activate = document.createElement("a");
      activate.setAttribute("data-quake-id", quake.id);
      activate.addEventListener("click", quakeDetails);
      var text = "";
      text +=quake.properties.title;
      text += " At " + new Date(quake.properties.time).toLocaleString();
      activate.innerText = text;
      li.appendChild(activate);
      quakesList.append(li);
      return quakesList;
    }, quakesList);
    quakeAlertMsg.hide();
    quakesList.show();
  });
}
$(function(){
  $("#refresh-quakes-list").click(refreshQuakesList);
  refreshQuakesList();

})