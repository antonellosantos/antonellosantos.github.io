window.onload = function(){
    
    var chart = [];
    var title = ""; 
    var chartApp = document.getElementById("div_chart");
    var num_charts = -1;

    $('#home').on('click',function(){
        $('#div_table').show().hide(); 
        $('#div_chart').show().hide(); 
        $('#div_upload').show().hide(); 
        
        $('#div_home').show();
        
        console.log('home_working');
    });
    
    $('#tables').on('click',function(){
        $('#div_home').show().hide(); 
        $('#div_chart').show().hide();
        $('#div_upload').show().hide();
        
        $('#div_table').show();
        
        console.log('tables_working');
    });
    
    $('#charts').on('click',function(){
        $('#div_home').show().hide(); 
        $('#div_table').show().hide();
        $('#div_upload').show().hide();
        
        $('#div_chart').show();
        
        console.log('charts_working');
    });
    
    $('#upload').on('click',function(){
        $('#div_home').show().hide(); 
        $('#div_table').show().hide();
        $('#div_chart').show().hide();
        
        $('#div_upload').show();
        
        console.log('upload_working');
    });
    
    $('#logout').on('click',function(){
        window.location = "index.html";
        console.log('logout_working');
    });
    
    
    $("#file-chooser").change(function(event){
        var JSONfile = event.target.files[0]; 
        console.log(JSONfile.type);
        if(JSONfile.type != "application/json") { 
        alert("Please upload a JSON file."); 
        return false;
        }else{
            alert("JSON File uploaded!");   
            if (JSONfile) {
                var readJSON = new FileReader();
                readJSON.onload = function(e) { 
                    var JSONcontents = e.target.result;
                    var json = JSON.parse(JSONcontents);
                    traverse(json,JSONtoTableChart);
                    $('#table').show();
                    $('.show_data').show();
                    $('.no_data').show().hide();
                };
                readJSON.readAsText(JSONfile);
            }else { 
                console.log("JSON File failed to load");
            }
        }
    });
    
    //METHODS
    
    $("#chart_select").change(function () {
        var thisVal = this.value;      
        var chartnum = chart.length - 1;
        while (chartnum >= 0){
            var datachart = chart[chartnum].data;
            var optionchart = chart[chartnum].options;
            var chartApp = document.getElementsByClassName(chart[chartnum].data.datasets[0].label);
            myChart = new Chart(chartApp, {
            type: thisVal,
            data: datachart,
            options: optionchart
            });    
            chartnum--;          
        }
    });
    
    
    function addJSONToTable(key, value) {
        $('#table tr:last').append('<td>' + value + '<\/td>');
    }
    
    function addTableHeader(x){
        if(x !== "sales")
        $("#table").append("<tr>" + "<th>" + x.split("_").join(" ") + ": </th>" + "</tr>");          
    }
    
    function addChartData(chart, label, data) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });

        chart.update();
    }
                
 
    function makeChart(key){
        var new_chart = document.createElement('canvas');
        new_chart.className = key;
        chartApp.appendChild(new_chart);
        new_chart.style.backgroundColor = "#f9f9f9";
        num_charts++;
        chart[num_charts] = new Chart(new_chart,
        {
        "type":"bar",
        "data":{"labels":[],
        "datasets":[{"label":key,
        "data":[],
        "fill":false,
        backgroundColor: [
                'rgba(0,48,135, 0.5)',
                'rgba(0,94,184, 0.5)',
                'rgba(0,114,206, 0.5)',
                'rgba(65,182,230, 0.5)',
                'rgba(0,169,206, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(5,163,164, 0.5)',
                'rgba(0,99,115, 0.5)',
        ],
        "borderWidth":1}]},
        "options":{
        responsive: false,
        maintainAspectRatio: true,
        "scales":{
            "yAxes":[{
                "ticks":{
                    "beginAtZero":true}}]}}});                                 
        new_chart.style.display = "inline-block";
        new_chart.width = "1900"
    
    }
    
    function JSONtoTableChart(key,value) {
        if (value == "[object Object]"){
            addTableHeader(key); 
            title = key.split("_").join(" ");
        }
        else{
                if (typeof value !== "string" && document.getElementsByClassName(title).length === 0){
                    makeChart(title);
                    addChartData(chart[num_charts], key, value);
                    $('#table tr:last').remove();
                }else if(document.getElementsByClassName(title).length !== 0){
                    addChartData(chart[num_charts], key, value);
                }else
                    addJSONToTable(key, value); 
        }
    }
    
    function traverse(json,JSONtoTableChart) {
        for(var i in json) {
            JSONtoTableChart.apply(this,[i,json[i]]);  
            if (json[i] !== null && typeof(json[i])=="object") {
                traverse(json[i],JSONtoTableChart);
            }
        }
    }
    
    $("#date_picker").change(function(event){
        $("tr").show();
        var count = 0;
        var chosenDate = document.getElementById("date_picker").value;

        if (chosenDate !== ''){
            $("td").filter(function() {
                return $(this).text().indexOf("") !== -1;
            }).parent().hide();             
            $("th").filter(function() {
                return $(this).text().indexOf("") !== -1;
            }).parent().hide();
            $("td").filter(function() {
                if($(this).text().indexOf(chosenDate) !== -1){
                    count++;
                    return $(this).html();
                }                 
            }).parent().show();      
        }
        const customer_count = document.getElementById('customer_count');
        customer_count.appendChild(document.createTextNode(`There are ${count} people who grabbed a bite in the Krusty Krab`));
        
        
        console.log(count);
                                         
    });
    
    
    
    
    
    
    
    
    
}