function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
  d3.json(`/metadata/${sample}`).then(function(d) {
    var panel = d3.select('#sample-metadata');
    panel.html("");
    var metaData = Object.entries(d);
    metaData.forEach(function(data) {
      panel.append('h6').text(`${data[0]}: ${data[1]}`);
    });
  })
    // Use d3 to select the panel with id of `#sample-metadata`
    // Use `.html("") to clear any existing metadata
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {
d3.json(`samples/${sample}`).then(function(d) {
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

    Plotly.newPlot("bubble", bubbleData)
    Plotly.newPlot("pie", pieData);
});
  
 // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

