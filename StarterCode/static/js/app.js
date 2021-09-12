samples = '/Challenges/plotly-challenge/StarterCode/samples.json'

d3.json(samples).then(data => {

  // Bar chart data
  let sampleValues = data.samples[0].sample_values;
  let ids = data.samples[0].otu_ids;
  let id_names = ids.slice(0,10).map(name=>`OTU ${name}`).reverse();
  let labels = data.samples[0].otu_labels;

  // Trace for the belly button Data
  let trace = {
    x: sampleValues.slice(0,10).reverse(),
    y: id_names,
    text: labels,
    type: 'bar',
    orientation: 'h'
  };

  // Data array
  let barTrace = [trace];

  // Apply a title to the layout
  let layout = {
    title: 'Top OTU\'s'
  };

  // Render the plot to the div tag with id "bar"
  Plotly.newPlot('bar', barTrace, layout);

  // Trace for the belly button Data
  let trace2 = {
    x: ids,
    y: sampleValues.reverse(),
    text: labels,
    mode: 'markers',
    marker: {
      size: sampleValues,
      color: ids,
      colorscale: 'Earth'
    }
  };

  // Data array
  let bubbleTrace = [trace2];

  // Render the plot to the div tag with id "bar"
  Plotly.newPlot('bubble', bubbleTrace, layout);
});

function dropDown() {
  // Grab a reference to the dropdown select element
  let selectDropdown = d3.select('#selDataset');

  // Populate the select options by using the list of sample names
  d3.json(samples).then((data) => {
    let name = data.names;

    name.forEach((sample) => {
      selectDropdown
        .append("option")
        .text(sample)
        .property("value", sample);
    })
  });
};

function metaData(sample) {
  d3.json(samples).then((data) => {
    let metadata = data.metadata;

    // Filter the data
    let dataArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = dataArray[0];

    // Use d3 to select the required panel
    let panelData = d3.select('#sample-metadata');

    // This needed to clear the previous selections
    panelData.html("");

    // Using Object.entries function to add the metadata values to the panelData frame
    Object.entries(result).forEach(([key, value]) => {
      panelData.append('h6').text(`${key}: ${value}`);
    });
  })
};

function optionChanged(newSample) {
  // Load new data into metaData frame when the "this" values changes
  metaData(newSample);
};

dropDown();