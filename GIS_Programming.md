<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv= "X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
    <title> GIS Programming </title>
    <style>
        html,
        body { 
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        }
	img:hover {
	box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
	class="center";
	}
	    
	h3 {text-align: center;}
	h5 {text-align: center;}
	figure figcaption {
	text-align: center;
	}

	.center {
	display: block;
	margin-left: auto;
	margin-right: auto;
	}

    </style>
  </head>
  <body>
    <p> Welcome to my programming page, here I have various GIS scripts I have developed and used over the years. For the longer scripts, the hyperlinks on each heading will lead to the raw file hosted on github. </p> <br>

    <h3> Arcade Scripts </h3>

    <h5> Managing Labels with Arcade </h5>

    <p> One of the most useful features of Arcade is its ability to to vastly improve label depiction and information. Imagine, for instance, that you have a field with city names followed by state abbreviations. For labeling purposes, you only need the city names, and it might be the case that 
    you do not particularly want to create a variable just for different names. </p> <br>

    <p> (stick image in here of example dataset) </p> <br>
    
    <p> This small snippet of code temporarily removes the last three characters on each of the entries without altering the underlieing data, thereby allowing for cleaner labels. </p>

    <pre><code>
    var txt = $feature.NAME;  return Left(txt, Count(txt)-3)
    </code></pre>

    <p> This code works by declaring the label text as a variable so that it can be used in a function. In this case, the Left helper function is used to preserve the left part of each string up until a certain point. However, since these city names are of many various different lengths, we cannot simply pick a number to stop at, since that would exclude many entries. Instead, we take the total number of characters with the count function and subtract that by three, which removes the state abbreviation and empty space. </p> <br>

    <h5> Mapping numerical plurality groups </h5> 

    <p> Arcade can also be used to write customized symbology schemes that are not available in ArcGIS Pro. This script is an abstraction based off of ESRI's demographic team work on the 2020 US Census. </p>

    <pre><code>
    var dec_var_POP1 = $feature.POP1;
    var dec_var_POP2 = $feature.POP2;
    ...
    var dec_var_POPN = $feature.POPN;

    $feature["POP1"];
    $feature["POP2"];
    ...
    $feature["POPN"];

    var fieldNames = ["POP1", "POP2", ..., "POPN"];
    var numFields = "N";
    var maxValueField = null;
    var maxValue = -Infinity;
    var value i, totalValue = null;

    for(i = 0; i < numFields: i++){
      value = $feature[fieldNames[i]];

      if(value > 0) {
        if(value > maxValue) {
	  maxValue = value;
   	  maxValueField = fieldNames[i];
        }
	else if(value == maxValue){
 	  maxValueField = null;
    	  }
        }
      }

      return maxValueField;

    </code></pre>
    
    <h3> Python Scripts </h3> <br>

    <p> Here are various python scripts I have developed. These are designed for use with ESRI's ArcGIS software. These are dynamic tools, meaning that you can use them for your own purposes as long as 
    you establish the proper parameters -- I intend to provide a screenshot of the necessary parameters for each tool. </p> <br>

    <h5> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/Python/AggPopEstimator.py"> Automating an areal proportion analysis </a> </h5>

    <figure>
    <img src="https://i.imgur.com/HNXFGt5.jpeg" style="width: 625px; height: 450px;" alt="Census tracts overlaid on census blocks" class="center">
    <figcaption> <em> Under areal proportion analysis, smaller geographic units data are aggregated to larger geographic units </em> </figcaption>
    </figure>

    <p> This script is designed to automate an areal proportion analysis, which aggregates the population values of small geographic units to larger geographic units.
	In this case, these small units are census blocks whereas the larger units are the choice of the user. </p> <br>

    <a href="https://i.imgur.com/ctqad00.jpeg"><img src="https://i.imgur.com/ctqad00.jpeg" title ="Tool Parameters" class="center"> </a> <br>

    <h5> A model to automate kernel density estimation </h5>

    <h5> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/Python/Statistics_Update.py"> Descriptive Statistics Tool for ArcGIS  </a> </h5>

    <p> This tool is designed to calculate some basic descriptive statistics based off a user input list of numbers. Users can select which statistics they wish to include.  In order for it work correctly, it needs to be saved as a script in an ArcGIS toolbox, with the following parameters established. </p> <br>

    <a href="https://i.imgur.com/JMczU4a.jpeg"><img src="https://i.imgur.com/JMczU4a.jpeg" title="Tool Parameters" class="center"> </a> <br>


    <h5> Find and Save Unique Values in a Table </h5>

    <p> This tool is designed to find the unique values in an ArcGIS field for a feature class or shapefile and then list them in a dBase file. </p>

    <h3> ArcGIS Javascript API </h3>

    <p> Here I will post code for the various instances of the ArcGIS Javascript API I have scattered around this website. Feel free to modify the code for your purposes -- do note that you need these <a href="https://i.imgur.com/rSD74RP.jpeg"> tags </a> in your html for the API to function.  </p> <br>

    <p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/travelmap/travel_map.js"> Travel Photo Map (Home Page) </a> </p> <br>

    <p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/SummitSW/SUMMIT_ASSET.js"> Stormwater Assets in the Summit Subdivision (Internship Storymap) </a> </p> <br>


	

  </body>
</html>

