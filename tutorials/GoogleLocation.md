<html>
  
<div>
    <meta charset="utf-8" />
    <meta http-equiv= "X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
    <style>
        html,
        body { 
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        }

  h1{
  text-align: center;
  }

  h2{
  text-align: center;
  }

  h3{
  text-align: center;
  }

  h5{
  text-align: center;
  }

  figure figcaption {
  text-align: center; 
         }
         
  #viewDiv {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  min-height: 450px;
  mid-width: 650px;
  border: 1px solid #444444;
        }
        #myImg {
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
        }
    
  #myImg:hover {
  opacity: 0.7;
        }
.modal {
  display: none;
  /* Hidden by default */
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Sit on top */
  padding-top: 100px;
  /* Location of the box */
  left: 0;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.9);
  /* Black w/ opacity */
}

.modal-content {
  margin: auto;
  display: block;
  width: 80%;
  max-height: 650px;
  max-width: 900px;
}

#caption {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
  text-align: center;
  color: #ccc;
  padding: 10px 0;
  height: 150px;
}

.modal-content,
#caption {
  animation-name: zoom;
  animation-duration: 0.6s;
}

@keyframes zoom {
  from {
    transform: scale(0)
  }
  to {
    transform: scale(1)
  }
}

.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

@media only screen and (max-width: 700px) {
  .modal-content {
    width: 100%;
  }
}


  </style>
    
  <link rel="stylesheet" href="https://js.arcgis.com/4.29/esri/themes/light/main.css" />
  <script src="https://js.arcgis.com/4.29/"></script>
  <script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>

</div>

<body>

<h1 style="text-align:center;"> Your Location History: Using Google Location History in ArcGIS Pro </h1> <br>


<p> It should come as no surprise that location history is recorded by Google. This is done in order to provide personalized services, such as maps, traffic updates, and location-based recommendations, using data from devices linked to a Google account. However, this data belongs to you, and with a bit of effort, it can be exported and used. To begin, "Google Takeout" should be searched for in a browser. The results should resemble Figure 1 below. </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/GAG0zZv.jpeg" alt="Google Takeout Web Search" style="width:100%;max-width:625px">
<figcaption> Figure 1. Searching for Google Takeout on the Web </figcaption>
</figure> <br>

<p> Next, a large list of different data options will appear, from which selections can be checked for export (Figure 2). For this tutorial, "Location History" should be located by scrolling down the list. </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/Sr48V31.jpeg" alt="Google Takeout Data Options" style="width:100%;max-width:625px">
<figcaption> Figure 2. Data Options from Google Takeout </figcaption>
</figure> <br>

<p> Ensure that "Location History" is checked. It is displayed below in Figure 3.   </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/1EcC8Up.jpg" alt="Google Takeout Location History" style="width:100%;max-width:625px">
<figcaption> Figure 3. Checking Off Location History in Google Takeout </figcaption>
</figure> <br>

<p> A few different options are available for how the data can be exported. A download link can be sent to your Gmail, or the Takeout data can be placed in cloud storage. Additionally, the download can be split into two-month intervals (resulting in six files) or provided as a single file for the entire year. File types include .zip or .tgz, and several file size options are available, ranging from 1 to 50 gigabytes. If the file size is smaller than the total size of the location history, multiple files will be sent to match the size of the location history. The available options are displayed in Figure 4 below. </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/SyGbtYS.jpeg" alt="Google Takeout Settings" style="width:100%;max-width:625px">
<figcaption> Figure 4. Export Options for Google Takeout  </figcaption>
</figure> <br>

<p> The Google Takeout data should be downloaded from either the email link or cloud storage and unzipped. It is likely to be quite large—mine, for example, was around 651 megabytes in size. Unfortunately, the data is in a proprietary JSON format. To use it in ArcGIS Pro, adjustments will need to be made to standardize the data. </p> <br>

<p> Given the large size of the Google Takeout data, attempting to manually edit it would be inefficient. At this point, a Python script should be considered to transform the data into a standardized JSON format or another suitable format. Fortunately, several such scripts are available on GitHub. The most accessible script is <a href="https://github.com/Andrew-Jones657/location-history-json-converter?tab=readme-ov-file"> location-history-json-convertor </a> by Gerwin Sturm (Figure 5). The location-history-json-converter.py script should be downloaded. </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/S0MFjBK.jpeg" alt="Location History Convertor" style="width:100%;max-width:625px">
<figcaption> Figure 5. Location History Convertor Python Script  </figcaption>
</figure> <br>

<p> To keep things organized, it is best for the unzipped Google Takeout data and the Python script to be moved into the same folder (Figure 6). </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/Zj9LlKg.jpeg" alt="Folder for Data" style="width:100%;max-width:625px">
<figcaption> Figure 6. Storing the Google Takeout Data and Python Script in the Same Folder   </figcaption>
</figure> <br>

<p> Now, the requisites for running the Python script should be considered. Python 3.2 or higher is required, so it must be ensured that it is installed and up to date. Additionally, a few Python libraries will be needed. These are listed in the "requirements.txt" file on the Python script's webpage, but they include "Ijson," "Shapely," and "python-dateutil." These libraries can be installed using PIP in the Windows Command Prompt (Figure 7). To install them, simply type "pip install ___," replacing the blank with each package name (Ijson, Shapely, python-dateutil). The Command Prompt should be left open, as it will be used in the next step. </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/4sLD272.jpeg" alt="Using PIP" style="width:100%;max-width:625px">
<figcaption> Figure 7. Using PIP to Install Required Python Packages   </figcaption>
</figure> <br>

<p> With the packages installed, the Python script can now be run. This will also be done in the Command Prompt. In Command Prompt, the folder containing the Google Takeout data and Python script should be navigated to. This can be done by typing "cd (system path to your folder)" (Figure 8). </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/o7V8NWq.jpeg" alt="CMD cd" style="width:100%;max-width:625px">
<figcaption> Figure 8. Changing your Directory on Command Prompt   </figcaption>
</figure> <br>

<p> For the purposes of this tutorial, .kml will be used as the output file format, which will later be converted into a shapefile. Other available options include .csv, .json, .js, and .gpx. To run the script, the following parameters should be entered in the Command Prompt: </p> <br>
  
<code>  python location_history_json_converter.py LocationHistory.json MyLocations.kml </code> <br> 
  
<p> The script should then be run.   </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/msHrYux.jpeg" alt="Running Python script" style="width:100%;max-width:625px">
<figcaption> Figure 9. Inputting the Parameters for and Running the Python Script    </figcaption>
</figure> <br>

<p> The .kml file should be generated successfully. It should then be added to ArcGIS Pro (or another GIS software) to visually depict the data. Converting it to a shapefile will make it easier to edit. In ArcGIS Pro, the <em> KML to Layer </em> tool should be run (a similar tool is available in QGIS). Note that if the location history file is large, running the tool may take a significant amount of time. If ArcGIS Pro seems to freeze or take too long, it may be prudent to reconsider the scope of the location data needed and request a more limited Google Takeout dataset. Figure 10 below shows the shapefile of my location history. </p> <br> 

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/gwkJfUs.jpeg" alt="Location History" style="width:100%;max-width:625px">
<figcaption> Figure 10. My Location History   </figcaption>
</figure> <br>

<p> At this point, the location history can be used in any way desired. Personally, I chose to use my Google data to create an ArcGIS JavaScript API web map that would display some of my travel photos. To do this, around 120 points that corresponded with photo locations were selected. The photos were uploaded to Imgur, and a unique field for the image links was created and populated with the Imgur URLs. The location data shapefile was then converted into a GeoJSON file (using the <em> Features To JSON </em> tool) to ensure it would work seamlessly for online display.   </p> <br>


<p> Below is an older version of the interactive web map of my travel photos from the front page of this website. The code for it can be found <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/travelmap/travel_map.js">here</a>.  </p> <br>

<div id="viewDiv" style="width: 650px; height: 450px;  border: 1px solid #444444;"> </div> <br>
<script src="/files/travelmap/travel_map.js"></script> <br> 

<h3> List of Figures and Tables </h3> <br>
<p> Figure 1. Searching for Google Takeout on the Web   </p>
<p> Figure 2. Data Options from Google Takeout  </p>
<p> Figure 3. Checking Off Location History in Google Takeout  </p>
<p> Figure 4. Export Options for Google Takeout   </p>
<p> Figure 5. Location History Convertor Python Script  </p>
<p> Figure 6. Storing the Google Takeout Data and Python Script in the Same Folder  </p>
<p> Figure 7. Using PIP to Install Required Python Packages </p>
<p> Figure 8. Changing your Directory on Command Prompt  </p>
<p> Figure 9. Inputting the Parameters for and Running the Python Script  </p>
<p> Figure 10. My Location History  </p>

<h3> References </h3> <br>

<div class="wysiwyg lengthy" > <p> Scarygami. (n.d.).<em> GitHub - Scarygami/location-history-json-converter: Convert the Location History JSON File from Google Takeout into a useable format</em>. GitHub. https://github.com/Scarygami/location-history-json-converter</p>
  
  <p> <em> Sign in - Google Accounts</em>. (n.d.). https://takeout.google.com/settings/takeout </p>


<div id="myModal" class="modal">
   <span class="close">&times;</span>
   <img class="modal-content" id="img01">
   <div id="caption"></div>   
</div> <br>


<script>
// create references to the modal...
var modal = document.getElementById('myModal');
// to all images -- note I'm using a class!
var images = document.getElementsByClassName('myImages');
// the image in the modal
var modalImg = document.getElementById("img01");
// and the caption in the modal
var captionText = document.getElementById("caption");

// Go through all of the images with our custom class
for (var i = 0; i < images.length; i++) {
  var img = images[i];
  // and attach our click listener for this image.
  img.onclick = function(evt) {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  }
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}
</script>





