function buildMetadata(sample) {

  // Fetch data for Metadata Panel and populate HTML from /metadata endpoint
  d3.json(`/metadata/${sample}`).then(function(d) {
    var panel = d3.select('#sample-metadata');
    panel.html("");
    var metaData = Object.entries(d);
    metaData.forEach(function(data) {
      panel.append('h6').text(`${data[0]}: ${data[1]}`);
    });
  });
}
// Build pie and scatter plots using Plotly from /sample/{sample} endpoint
function buildCharts(sample) {
d3.json(`samples/${sample}`).then(function(d) {
  // Pie Chart
  var pieData = [{
      values: d.sample_values.slice(0,10),
      labels: d.otu_ids.slice(0,10),
      hoverinfo: d.otu_labels.slice(0,10),
      type: 'pie'
    }];
  // Scatter Chart
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

}
// This runs on page-load. It should populate the page with the first data entry. 
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

