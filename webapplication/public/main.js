const socket = io();
var xTime = [];
var yPrice = [];

var canvas = document.getElementById('myChart');
var data = {
    labels: [],
    datasets: [
        {
            label: "Sennheiser HD 450BT",
            fill: false,
            borderColor: "rgba(75,192,192,1)",
            data: [],
        }
    ]
};

function adddata(time, price){
	myLineChart.data.datasets[0].data.push(price);
    myLineChart.data.labels.push(time);
    myLineChart.update();
}

var option = {
	showLines: true
};

var myLineChart = Chart.Line(canvas,{
	data:data,
    options:option
});

socket.on("file-updated", function (data) {
    var [time, price] = data.message.split(',');
    var date = new Date(parseInt(time))
    var timeString = date.toString().split(' ').splice(0, 5).join(" ");
    console.log(timeString);
    adddata(timeString,price);
});
