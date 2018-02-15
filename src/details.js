class Details {
    constructor(data){
        this.data = data;
    }

    fillTable(tBody){
        function createRow(left, right){
            let tr = document.createElement("tr");
            let th = document.createElement("th");
            th.innerText = left;
            let td = document.createElement("td");
            td.innerText = right;
            tr.appendChild(th);
            tr.appendChild(td);
            return tr;
        }
        let data = this.data;
        tBody.appendChild(createRow("Title", data.properties.title));
        tBody.appendChild(createRow("Magnitude", data.properties.mag));
        tBody.appendChild(createRow("Place", data.properties.place));
        let date = new Date(data.properties.time);
        let localDate = date.toLocaleString();
        tBody.appendChild(createRow("Date and Time", localDate));
    }
}
exports.Details = Details;