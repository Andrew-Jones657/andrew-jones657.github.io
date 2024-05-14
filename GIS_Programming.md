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
  </head>
  <body>
    <p> Welcome to my programming page, here I have various GIS scripts I have developed and used over the years. For the longer scripts, the hyperlinks on each heading will lead to the raw file hosted on github. </p> <br>

    <h3> Arcade Scripts </h3>

    <h4> Managing Labels with Arcade </h4>

    <p> One of the most useful features of Arcade is its ability to to vastly improve label depiction and information. Imagine, for instance, that you have a field with city names followed by state abbreviations. For labeling purposes, you only need the city names, and it might be the case that 
    you do not particularly want to create a variable just for different names. </p> <br>

    <p> (stick image in here of example dataset) </p> <br>
    
    <p> This small snippet of code temporarily removes the last three characters on each of the entries without altering the underlieing data, thereby allowing for cleaner labels. </p>

    <precode><code>
    var txt = $feature.NAME;  return Left(txt, Count(txt)-3)
    </code></precode>

    <p> This code works by declaring the label text as a variable so that it can be used in a function. In this case, the Left helper function is used to preserve the left part of each string up until a certain point. However, since these city names are of many various different lengths, we cannot simply pick a number to stop at, since that would exclude many entries. Instead, we take the total number of characters with the count function and subtract that by three, which removes the state abbreviation and empty space. </p> <br>

    <h4> Creating customized symbology with Arcade </h4> 

    <p> Arcade can also be used to write customized symbology schemes that are not available in ArcGIS Pro. </p>
    
    <h3> Python Scripts </h3>

    <h4> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/Python/Statistics_Update.py"> Descriptive Statistics Tool for ArcGIS  </a> </h4>

    <p> This tool is designed to calculate some basic descriptive statistics based off a user input list of numbers. Users can select which statistics they wish to include.  In order for it work correctly, it needs to be saved as a script in an ArcGIS toolbox and then the parameters in the image below     must be setup. </p> <br>

    <a href="https://i.imgur.com/JMczU4a.jpeg"><img src="https://i.imgur.com/JMczU4a.jpeg" title="Tool Parameters" class="center"> </a> <br>


    <h4> Find and Save Unique Values in a Table </h4>

    <p> This tool is designed to find the unique values in an ArcGIS field for a feature class or shapefile and then list them in a dBase file. </p>

    <h3> ArcGIS Javascript API </h3>

    <p> Here I will post code for the various instances of the ArcGIS Javascript API I have scattered around this website. Feel free to modify the code for your purposes -- do note that you need these <a href="https://i.imgur.com/rSD74RP.jpeg"> tags </a> in your html for the API to function.  </p> <br>

    <p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/travelmap/travel_map.js"> Travel Photo Map (Home Page) </a> </p> <br>

    <p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/SummitSW/SUMMIT_ASSET.js"> Stormwater Assets in the Summit Subdivision (Internship Storymap) </a> </p> <br>


	

  </body>
</html>

