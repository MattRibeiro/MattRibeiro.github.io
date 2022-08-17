
var base64string = atob(window.location.hash.substring(1).replace(/_/g, '/').replace(/-/g, '+'))

// var base64string = `[
//     {"label":"Accuracy", "yAxisID": "left", "data":[15, 20, 25, 20, 15]}, 
//     {"label":"Speed", "yAxisID": "right", "data":[0.5, 0.20, 0.7, 0.9, 0.15]}
//     ]`
var jsonObject = JSON.parse(base64string)
console.log('Json object', jsonObject)

var chartData = { type: 'line', data: { labels: [], datasets: [] } }
var epochs = 0;
const borderColors = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 206, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)'
];
for (var i = 0; i < jsonObject.length; i++) {
    epochs = jsonObject[i].data.length > epochs ? jsonObject[i].data.length : epochs;

    chartData.data.datasets.push( { 
        label: jsonObject[i].label, 
        data: jsonObject[i].data,
        yAxisID: jsonObject[i].yAxisID,
        borderColor: borderColors[i % borderColors.length],
        tension: 0.1
    })
}
chartData.data.labels = Array.from({length: epochs}, (_, i) => i + 1);
chartData.options = {
    scales: { 'left': {type: 'linear', position: 'left' }, 'right': {type: 'linear', position: 'right' } }
};
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, chartData);
