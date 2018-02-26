function arabicToRoman(num){
    let map = [
        [1000,"M"],
        [900,"DM"],
        [500,"D"],
        [400,"CD"],
        [100,"C"],
        [90,"LC"],
        [50,"L"],
        [40,"XL"],
        [10,"X"],
        [9,"VX"],
        [5,"V"],
        [4,"IV"],
        [1,"I"],
    ]

    var roman = "";
    for(let i of map){
        while(num-i[0]>= 0){
            num = num-i[0];
            roman += i[1];
        }
    }
    return roman;
}

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
        if(data.properties.felt)
            tBody.appendChild(createRow("Felt By", `${data.properties.felt} People`));
        if(data.properties.cdi)
            tBody.appendChild(createRow("Intensity", `${arabicToRoman(data.properties.cdi)}`));
        tBody.appendChild(createRow("Depth", `${data.geometry.coordinates[2]}KM`));
        tBody.appendChild(createRow("Type", data.properties.type));
        tBody.appendChild(createRow("Reviewed by a Human?",
            (data.properties.status  == "reviewed" ? "yes" : "No")));
    }
}
exports.Details = Details;