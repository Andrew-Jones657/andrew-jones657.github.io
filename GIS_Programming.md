<html>
  <head>

  </head>
  <body>
    <p> Welcome to my programming page, here I have various GIS scripts I have developed and used over the years.  </p> <br>

    <h3> Arcade Scripts </h3>
    
    <h3> Python Scripts </h3>

    <h4> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/Python/Statistics_Update.py"> Descriptive Statistics Tool for ArcGIS  </a> </h4>

    <p> This tool is designed to calculate some basic descriptive statistics based off a user input list of numbers. In order for it work correctly, it needs to be saved as a script in a toolbox in ArcGIS and then these parameters must be setup. </p>

    <a href="https://i.imgur.com/JMczU4a.jpeg"><img src="https://i.imgur.com/JMczU4a.jpeg" title="Tool Parameters" class="center"> </a> <br>

    <p> Dynamic Version </p>

    <pre><code> 
## ---------------------------------------------------------------------------
## Statistics.py
## Created on: 2019-4-4
## Last Modified on: 2024-05-07
## Created by: Andrew Jones
## Usage: FunSum(numberList), FunMean(numberList), FunMax(numberlist),
## FunMin(numberList), FunRange(numberList), FunVar(numberList), FunStdDev(numberList)
## Description: This dynamic script calculates the summation of a list of numbers
##              as well as the mean, maximum, minimum, range, variation, and
##              standard deviation.
##              The input list is read from a tool dialog box,
##              while the result is reported in the tool report window.
##              Users have the option of selecting which statistical measures to include. 
## Note: The script was modified from Statistics_Static.py so that it can function as
##       an ArcGIS script tool.
## ---------------------------------------------------------------------------

# Import arcpy  and SSUtilities
# These two modules must be imported for geoprocessing and I/O 
import arcpy
import SSUtilities

# Summation Function
def FunSum(NumList):
    # Calculate sum with a for loop
    theSum = 0                     # assign zero initially so theSum variable is created
    for theNum in NumList:
        theSum = theSum + theNum   # summation of the numbers in the list
    return theSum                  # return the sum

# Mean Function
def FunMean(NumList):
    theSum = FunSum(NumList)        # calls the sum of the numbers in the number list
    theMean = theSum / len(NumList) # divides the sum of the numbers in the number list by the amount of numbers
    return theMean                     # return the mean

# Maxmimum Function
def FunMax(NumList):
    theMax = NumList[0]            # assigns the number list to the function
    for theNum in NumList:
        if theMax < theNum:           # evaluates the max from the number list
            theMax = theNum          

    return theMax                     # return the max

# Minimum Function
def FunMin(NumList):
    theMin = NumList[0]           # assigns the number list to the function
    for theNum in NumList:
        if theMin > theNum:          # evaluates the min from the num list
            theMin = theNum          

    return theMin                    # return the min

# Range Function
def FunRange(NumList):
    theRange = FunMax(NumList) - FunMin(NumList) # subtracts the max from the min

    return theRange                                    # return the range

# Variation Function
def FunVar(NumList):
    theMean = FunMean(NumList)                          # calls the mean
    theSumSqDif = 0                                        # establishes the sum of squared differences
    for theNum in NumList:
        theSumSqDif = theSumSqDif + (theNum - theMean) **2 # evaluates the sum of squared differences
    theVar = theSumSqDif / len(NumList)                 # calculates the variance

    return theVar                                          # return the variance

# Standard Deviation Function
def FunStdDev(NumList):
    theMean = FunMean(NumList)                          # calls the mean
    theSumSqDif = 0                                        # establishes the sum of squared differences
    for theNum in NumList:
        theSumSqDif = theSumSqDif + (theNum - theMean) **2 # evaluates the square root of a sum of squared diffences
    theVar = theSumSqDif / len(NumList)                 # calculates the Variance
    theStdDev = (theVar **(0.5))        # calculates the standard deviation by taking the square root of the variance 
    
    return theStdDev                    # return the standard deviation

# Script tool arguments (Input - global variables)
InitialNumListtAsText = arcpy.GetParameterAsText(0) # Read 1st parameter
SumChecked = arcpy.GetParameterAsText(1) # Read 2nd parameter
MeanChecked = arcpy.GetParameterAsText(2) # Read 3rd parameter
MaxChecked = arcpy.GetParameterAsText(3) # Read 4th parameter
MinChecked = arcpy.GetParameterAsText(4) # Read 5th parameter
RangeChecked = arcpy.GetParameterAsText(5) # Read 6th parameter
VarChecked = arcpy.GetParameterAsText(6) # Read 7th parameter
StdDevChecked = arcpy.GetParameterAsText(7) # Read 8th parameter

# Replace ; with , so the input number list can be used as a list in Python
NumListtAsText = "[" + InitialNumListtAsText.replace(";", ",") + "]"

# Assign true if the 2nd parameter (Sum) is checked
SumChecked = SumChecked == "true"
MeanChecked = MeanChecked == "true"
MaxChecked = MaxChecked == "true"
MinChecked = MinChecked == "true"
RangeChecked = RangeChecked == "true"
VarChecked = VarChecked == "true"
StdDevChecked = StdDevChecked == "true"

# Convert a string, e.g. "[1, 2]", to a list, [1, 2]
NumList = eval(NumListtAsText)

# Local variables
numList = NumList
sumChecked = SumChecked
meanChecked = MeanChecked
maxChecked = MaxChecked
minChecked = MinChecked
rangeChecked = RangeChecked
varChecked = VarChecked 
stddevChecked = StdDevChecked

# Call FunSum function
if sumChecked:                   # if Sum is checked
    thisSum = FunSum(numList)
else:
    print("The Sum was not checked.")

# Call FunMean function
if meanChecked:                  # if Mean is checked
    thisMean = FunMean(numList)
else:
    print("The Mean was not checked.")

# Call FunMax function
if maxChecked:                   # if Maximum is checked
    thisMax = FunMax(numList)
else:
    print("The Maximum was not checked.")

# Call FunMin function
if minChecked:                   # if Minimum is checked
    thisMin = FunMin(numList)
else:
    print("The Minimum was not checked.")

# Call FunRange function
if rangeChecked:                 # if Range is checked
    thisRange = FunRange(numList)
else:
    print("The Range was not checked.")

# Call FunVar function
if varChecked:                   # if Variation is checked
    thisVar = FunVar(numList)
else:
    print("The Variation was not checked.")

# Call FunStdDev function
if stddevChecked:                # if Standard Deviation is checked
    thisStdDev = FunStdDev(numList)
else:
    print("The Standard Deviation was not checked.")
    
# Create Output Text Table
# So the input and output can be reported in the tool report window
header = "Calculate Statistics"
# Report the input list of number first
row1 = [ "The List of Numbers: ", numList ]
total = [ row1 ]


# Report the sum or state of the sum check box
if sumChecked:                   # if Sum is checked
    nextRow1 = [ "Sum: ", thisSum ]
else:
    nextRow1 = [ "The sum checkbox is not checked!" ]

# Report the mean or state of the mean check box
if meanChecked:
    nextRow2 = [ "Mean: ", thisMean ]
else:
    nextRow2 = [ "The mean checkbox is not checked!" ]

# Report the max or state of the max check box         
if maxChecked:
    nextRow3 = [ "Maximum: ", thisMax]
else:
    nextRow3 = [ "The maximum checkbox is not checked!" ]

# Report the min or state of the min check box         
if minChecked:
    nextRow4 = [ "Minimum: ", thisMin]
else:
    nextRow4 = [ "The minimum checkbox is not checked!" ]

# Report the range or state of the range check box         
if rangeChecked:
    nextRow5 = [ "Range: ", thisRange ]
else:
    nextRow5 = [ "The range checkbox is not checked!" ]

# Report the variation or state of the variation check box
if varChecked:
    nextRow6 = [ "Variation: ", thisVar ]
else:
    nextRow6 = [ "The variation checkbox is not checked!" ]

# Report the standard deviation or state of the standard deviation check box
if stddevChecked:
    nextRow7 = [ "Standard Deviation: ", thisStdDev ]
else:
    nextRow7 = [ "The standard deviation checkbox is not checked!" ]

# Add the rows together for each function to form a table
total.append(nextRow1) # Add a new row (Sum)
total.append(nextRow2) # Mean
total.append(nextRow3) # Maximum
total.append(nextRow4) # Minimum
total.append(nextRow5) # Range
total.append(nextRow6) # Variation
total.append(nextRow7) # Standard Deviation

# Construct a table so it can be reported in the tool result window
tableOut = SSUtilities.outputTextTable(total,header=header,pad=1)
arcpy.AddMessage(tableOut)
</code></pre>

    <h4> Find and Save Unique Values in a Table </h4>


    <h3> ArcGIS Javascript API </h3>

    <p> Here I will post code for the various instances of the ArcGIS Javascript API I have scattered around this website. Feel free to modify the code for your purposes -- do note that you need these tags ( <link rel="stylesheet" href="https://js.arcgis.com/4.29/esri/themes/light/main.css" />
    <script src="https://js.arcgis.com/4.29/"></script> ) in your html for the API to function.  </p> <br>

    <p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/travelmap/travel_map.js"> Travel Photo Map (Home Page) </a> </p> <br>

    <pre><code> 
	     <head>
 	     <link rel="stylesheet" href="https://js.arcgis.com/4.29/esri/themes/light/main.css" />
             <script src="https://js.arcgis.com/4.29/"></script>
    	     </head>
	<script>
    	require([
		"esri/Map", 
		"esri/Basemap", 
		"esri/widgets/Home", 
		"esri/layers/FeatureLayer", 
		"esri/layers/GeoJSONLayer",
		"esri/popup/content/ImageMediaInfo",
		"esri/renderers/UniqueValueRenderer", 
		"esri/symbols/SimpleFillSymbol",
	        "esri/widgets/Legend",
		"esri/widgets/Bookmarks", 
		"esri/widgets/Fullscreen", 
		"esri/widgets/Expand",
		"esri/views/MapView",
		"esri/webmap/Bookmark"
		], (Map, Basemap, Home, FeatureLayer, GeoJSONLayer, ImageMediaInfo, UniqueValueRenderer, SimpleFillSymbol, Legend, Bookmarks, Fullscreen, Expand, MapView, Bookmark) => {

       // Link to the raw .geojson file containing travel information and photo links
       const geojsonurl = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/travelmap/travel22_23.geojson";

       // Enable clustering for points to reduce clutter on the map
       const clusterConfig = {
          type: "cluster",
          clusterRadius: "100px",
          // {cluster_count} is an aggregate field containing
          // the number of features comprised by the cluster
          popupTemplate: {
            title: "Cluster summary",
            content: "This cluster represents {cluster_count} travel photos.",
            fieldInfos: [{
              fieldName: "cluster_count",
              format: {
                places: 0,
                digitSeparator: true
              }
            }]
          },
          clusterMinSize: "24px",
          clusterMaxSize: "60px",
          labelingInfo: [{
            deconflictionStrategy: "none",
            labelExpressionInfo: {
              expression: "Text($feature.cluster_count, '#,###')"
            },
            symbol: {
              type: "text",
              color: "#3b3b3b",
              font: {
                weight: "bold",
                family: "Noto Sans",
                size: "12px"
              }
            },
            labelPlacement: "center-center",
          }]
        };
   
       // Define the popup for each point which shows the name of the location, when the photo was taken, and the photo itself 
       const template = {
	 title: "{Name}",
	 content: "{Name} taken on {Month} {Day}, {Year} <br> <br> <img src={Url}.jpg width='450' height=auto >"
	};	

	


       // Create a unique value symbology using the "State" variable and "uniqueValueGroups []" so that trips are grouped by a unique color  
       const renderer = ({
        type: "unique-value",
        field: "State",
    	uniqueValueGroups: [{
            heading: "Monument Valley, Feb 2022",
            classes: [{
                label: "Arizona and Utah",
                symbol: { type: "simple-marker", color: "rgba(79, 111, 190, 1)", outline: { color: "rgba(123, 159, 226, 0.8)", width: 5 }, },
                values: ["Arizona", "Utah"]
            }]
         }, {
            heading: "Johnson's Shut Ins, May 2022",
            classes: [{
                label: "Missouri",
                symbol: { type: "simple-marker", color: "rgba(12, 122, 36, 1)",  outline: { color: "rgba(26, 175, 58, 0.8)",   width: 5 },  },
                values: "Missouri"	  
	    }]
         }, {
            heading: "Denver and Rocky Mountain National Park, Aug 2022",
            classes: [{
                label: "Colorado",
                symbol: {type: "simple-marker", color: "rgba(220, 73, 29, 1)",  outline: { color: "rgba(242, 104, 63, 0.8)",  width: 5 }  },
                values: "Colorado"	  
	    }]
         }, {
            heading: "Austin, Jun 2023",
            classes: [{
                label: "Texas",
                symbol: {type: "simple-marker", color: "rgba(148, 223, 0, 1)",  outline: { color: "rgba(182, 238, 70, 0.8)",  width: 5 }  },
                values: "Texas"	  
	    }]
         }, {
            heading: "Waterton Lakes and Glacier National Parks, Aug 2023",
            classes: [{
                label: "Alberta and Montana",
                symbol: {type: "simple-marker", color: "rgba(244, 119, 8, 1)",  outline: { color: "rgba(232, 140, 60, 0.8)",  width: 5 }  },
                values: ["Alberta", "Montana"]	  
	    }]
         }, {
            heading: "Bavaria and Northeast Italy, Nov 2023",
            classes: [{
                label: "Bavaria, Tyrol, Trention-South Tyrol, Veneto, and Friuli-Venezia Giulia",
                symbol: {type: "simple-marker", color: "rgba(41, 157, 186, 1)", outline: { color: "rgba(75, 190, 219, 0.8)",  width: 5 }  },
                values: ["Bavaria", "Tyrol", "Trention-South Tyrol", "Veneto", "Friuli-Venezia Giulia"]	  
	    }]
	  }]
	});


	// load in the geoJSON travel point layer
	const geojsonLayer = new GeoJSONLayer({
		url: geojsonurl,
		featureReduction: clusterConfig,
		popupTemplate: template,
		title: "Travel Destinations by Trip and State",
		renderer: renderer
	});

	// create a new map object with the openstreetmap baselayer 
	const map = new Map({
		basemap: "topo-vector",
		layers: [geojsonLayer]
	});

	// set the view position for the map
	const view = new MapView({
		container: "viewDiv",
		map: map,
		zoom: 5,
		center: [-98.7996, 39.9930]
	});

       // Limit zooming to prevent incorrect aggregations between clusters
       view.constraints = {
         minZoom: 5,
         maxZoom: 19
        };
	
	// Set Bookmarks to easily navigate to different travel destinations
        const bookmarks = new Bookmarks({
          view: view,
          bookmarks: [
            new Bookmark({
              name: "Monument Valley, Feb 2022",
	      thumbnail: "https://i.imgur.com/y4VOhVh.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    wkid: 102100
                  },
                  xmin: -12492283.6535338,
                  ymin: 4211729.40905857,
                  xmax: -12156768.6993028,
                  ymax: 4482380.95589102
                }
              }
            }),
            new Bookmark({
              name: "Johnson's Shut Ins, May 2022",
	      thumbnail: "https://i.imgur.com/RhRyi4b.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    latestWkid: 3857,
                    wkid: 102100
                  },
                  xmin: -10113901.611936,
                  ymin: 4513459.214434251,
                  xmax: -10110033.3878775,
                  ymax: 4516579.61432023
                }
              }
            }),
            new Bookmark({
              name: "Denver and Rocky Mountain National Park, Aug 2022",
	      thumbnail: "https://i.imgur.com/EEA8ppT.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    wkid: 102100
                  },
                  xmin: -11812438.8418179,
                  ymin: 4785441.5498655,
                  xmax: -11640655.1852516,
                  ymax: 4924015.14184372
                }
              }
            }),
            new Bookmark({
              name: "Austin, June 2023",
	      thumbnail: "https://i.imgur.com/XT2Cvom.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    latestWkid: 3857,
                    wkid: 102100
                  },
                  xmin: -10904800.9192392,
                  ymin: 3529678.25750133,
                  xmax: -10867025.2936679,
                  ymax: 3560150.91263788
                }
              }
            }),
            new Bookmark({
              name: "Waterton Lakes and Glacier National Parks, Aug 2023",
	      thumbnail: "https://i.imgur.com/xijfzut.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    latestWkid: 3857,
                    wkid: 102100
                  },
                  xmin: -12746990.8621478,
                  ymin: 6164763.2107844,
                  xmax: -12566862.6426801,
                  ymax: 6310068.15356655
                }
              }
            }),
            new Bookmark({
              name: "Bavaria and Northeast Italy, Nov 2023",
	      thumbnail: "https://i.imgur.com/Eg0xBWI.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    latestWkid: 3857,
                    wkid: 102100
                  },
                  xmin: 868728.175506883,
                  ymin: 5647081.72596466,
                  xmax: 1727646.45833829,
                  ymax: 6339949.68585575
                }
              }
            }),
          ]
        });

	const bkExpand = new Expand({
          view: view,
          content: bookmarks
        });	

       const fullscreen = new Fullscreen({
  	view: view
	});
	
       const homeWidget = new Home({
  	  view: view
	});

       const legend = new Legend({
  	  view: view,
	  content: [geojsonLayer],
	  style: "card"
        });

       const legendExpand = new Expand({
	  view: view,
	  content: legend,
	  closeOnEsc: false
	});


     view.ui.add(bkExpand, "top-right");
     view.ui.add(fullscreen, "top-left");
     view.ui.add(homeWidget, "top-left");
     view.ui.add(legendExpand, "bottom-right");
     
     });

    </script>
    </code></pre>

    <p> Stormwater Assets in the Summit Subdivision (Internship Storymap </p> <br>

    

    <p>This is the <code>Panel</code> constructor:</p>
    <pre><code>function Panel(element, canClose, closeHandler) {
      this.element = element;
      this.canClose = canClose;
      this.closeHandler = function () { if (closeHandler) closeHandler() };
    }</code></pre>
    
    <py-script>
      print("Hello World")
    </py-script>
  </body>
</html>

