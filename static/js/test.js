// d3.json('metadata/940').then(function(d) {
//     var panel = d3.select('#sample-metadata');
//     panel.html("");
//     var metaData = Object.entries(d);
//     metaData.forEach(function(data) {
//         panel.append('h6').text(`${data[0]}: ${data[1]}`);
//      });
//  });

d3.json('samples/940').then(function(d) {
    var pieData = [{
        values: d.sample_values.slice(0,10),
        labels: d.otu_ids.slice(0,10),
        hoverinfo: d.otu_labels.slice(0,10),
        type: 'pie'
    }];

    var trace = {
        x: d.otu_ids,
        y: d.sample_values,
        mode: 'markers', 
        type: 'scatter', 
        marker: {
            color: d.otu_ids,
            size: d.sample_values
        }, 
        text: d.otu_labels
    }
    
    var bubbleData = [trace]

    Plotly.plot("bubble", bubbleData)
    Plotly.plot("pie", pieData);
});


