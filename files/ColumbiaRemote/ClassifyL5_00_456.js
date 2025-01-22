

// Supervised Classification Training Data
// In SampleData00 CSV

var geometry =  ee.FeatureCollection(
  [ee.Feature(
    ee.Geometry.Point([-92.58217443664061, 38.59118215147115]),
    {}),
   ee.Feature(
    ee.Geometry.Point([-92.03423132140624,38.59118215147115]),
    {}),
   ee.Feature(
    ee.Geometry.Point([-92.03423132140624,39.28123562711803]),
    {}),
    ee.Feature(
    ee.Geometry.Point([-92.58217443664061,39.28123562711803]),
    {}),
  ee.Feature(
    ee.Geometry.Point([-92.58217443664061,38.59118215147115]),
    {})]);

Map.addLayer(SampleData00, { min: 0, max: 4, palette: ['blue', 'gray', 'green', 'yellow', 'white'] }, 'Test Data 2000')

// Load the Landsat 8 scaled radiance image collection.
var landsatCollection = ee.ImageCollection('LANDSAT/LT05/C02/T1')
    .filterDate('2000-06-01', '2000-09-01');




// Add image collection    
var trueColor321 = landsatCollection.select(['B4', 'B5', 'B6']);
var trueColor321Vis = {};
Map.addLayer(trueColor321, trueColor321Vis, 'True Color (321)');

// Center map on Columbia, MO
Map.setCenter(-92.334169, 38.953733, 14);  

// Make a cloud-free composite.
var composite = ee.Algorithms.Landsat.simpleComposite({
    collection: landsatCollection,
    asFloat: true
});    

// Use these bands for classification.
var bands = ['B4', 'B5', 'B6'];
// The name of the property on the points storing the class label.
var classProperty = 'Landcover';

// Sample the composite to generate training data.  Note that the
// class label is stored in the 'landcover' property.
var training = composite.select(bands).sampleRegions({
    collection: SampleData00,
    properties: [classProperty],
    scale: 30
});

// Train a CART classifier.
var classifier = ee.Classifier.smileCart().train({
    features: training,
    classProperty: classProperty,
});
// Print some info about the classifier (specific to CART).
print('CART, explained', classifier.explain());

// Classify the composite.
var classified = composite.classify(classifier);
Map.addLayer(classified, { min: 0, max: 4, palette: ['blue', 'gray', 'green', 'yellow', 'white'] });

// Optionally, do some accuracy assessment.  Fist, add a column of
// random uniforms to the training dataset.
var withRandom = training.randomColumn('random');

// We want to reserve some of the data for testing, to avoid overfitting the model.
var split = 0.7;  // Roughly 70% training, 30% testing.
var trainingPartition = withRandom.filter(ee.Filter.lt('random', split));
var testingPartition = withRandom.filter(ee.Filter.gte('random', split));


// Trained with 70% of our data.
var trainedClassifier = ee.Classifier.smileRandomForest(5).train({
    features: trainingPartition,
    classProperty: classProperty,
    inputProperties: bands
});

// Classify the test FeatureCollection.
var test = testingPartition.classify(trainedClassifier);


// Print the confusion matrix.
var confusionMatrix = test.errorMatrix(classProperty, 'classification');
print('Confusion Matrix', confusionMatrix);

Export.image.toDrive({
  image: classified,
  description: 'landsat00_classify',
  folder: 'GoogleEarthEngine',
  region: geometry,
  scale: 30,
  crs: 'EPSG:5070'
});



