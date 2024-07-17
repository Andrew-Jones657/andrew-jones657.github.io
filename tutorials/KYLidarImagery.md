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

  figure figcaption {
  text-align: center; 
         }
      .row {
    display: flex;
    }

    /* Create three equal columns that sits next to each other */
  .column {
    flex: 50%;
    padding: 5px;
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

<h1> KYFromAbove: Downloading and Processing LIDAR data </h1> <br>

<p> LIDAR data is incredibly important because it allows us to create detailed and accurate maps of the Earth's surface and objects on it. By using laser beams to measure distances, LIDAR can create 3D models of forests, cities, and even the ocean floor with high precision. This data is crucial for urban planning, managing natural resources, studying climate change, and understanding geological processes. It helps scientists, engineers, and planners make informed decisions about infrastructure, conservation efforts, disaster response, and more. In essence, LIDAR data provides a valuable perspective on our world that helps us protect the environment, plan for the future, and improve our understanding of Earth's complex systems. </p> <br>

<p> In this tutorial, we will be downloading, processing, and modeling LIDAR data from KYFromAbove -- a government sponsored website that is "focused on building and maintaining a current basemap for the Commonwealth that can meet the needs of its users at the state, federal, local, and regional level" (KYFromAbove, 2024). The goal is to create hillshade data that demonstrates the elevation change in a particular LIDAR tile. To provide additional clarity, this tutorial is focused on the workflow for downloading and using LIDAR data. If you wish to use LIDAR data outside of Kentucky, the same general steps apply. Some possible sources of LIDAR data can be found <a href="https://gisgeography.com/top-6-free-lidar-data-sources/"> here</a>. <em> Do note that you will need the "Spatial Analyst" extension for ArcGIS Pro to </em> </p> <br>

<p> Begin by going to <a href="https://kyfromabove.ky.gov/"> KYFromAbove</a>. Scroll down until you find "Download Point Cloud Data" and select "View" (Figure 1).  </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/yo7ecd7.jpeg" alt="Point Cloud Data" style="width:100%;max-width:625px">
<figcaption> Figure 1. Finding Point Cloud Data on KYFromAbove   </figcaption>
</figure> <br>

<p> This will bring up an index grid map of KY, with each grid containing compressed LIDAR (LAZ) data representing the corresponding area. The grids are numbered by their position, with tile grids in Kentucky following the format of NxxxExxx, where “x” is a number. Zoom in on to the grid map and click on the desired tile to bring up its metadata and download link. Download the latest version of the data using the FTP link. Any grid is viable for this project, because they are all processed in the same way. Grid N169E188 was selected for this tutorial (Figure 2). It is recommended, however, to choose a grid with some buildings in it so that the result of this project is more impressive.   </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/mqkr31z.jpeg" alt="LIDAR Web Map " style="width:100%;max-width:625px">
<figcaption> Figure 2. Selecting a LIDAR Index Grid to Download on the ArcGIS Web Map    </figcaption>
</figure> <br>

<p> Next, this LAZ data needs to be decompressed. A LAZ file is a compressed file type used to store LIDAR data. A LAS file is the uncompressed form of a LAZ file and is compatible with GIS software. LAS files are typically compressed into LAZ files due to the sheer amount of space LAS files take up. </p> <br>

<p> To decompress the LAZ dataset, use the "Convert LAS" tool on ArcGIS Pro. It may be helpful to create a folder for the uncompressed LAS data. Input the LAZ dataset, the target folder for the LAS dataset, set "Compression" to "No Compression", and leave LAS Options as default (Figure 3). Run the tool.  </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/VX7E2pf.jpeg" alt="Decompressing LAZ" style="width:100%;max-width:625px">
<figcaption> Figure 3. Converting LAZ to LAS on ArcGIS Pro   </figcaption>
</figure> <br>

<p> Add the newly uncompressed LAS dataset from the target folder into ArcGIS Pro. Zoomed out, it appears as a red square overlaid on part of Bowling Green. When zooming in, however, it appears as a dense set of multicolored points, where blue points represent lower elevation and red points represent higher elevations (Figure 4). </p> <br>

 <div class="row">
  <div class="column">
    <img src="https://i.imgur.com/oWrramV.jpeg" alt= "LAS from a Distance" style="width:40%">
  </div>
  <div class="column">
    <img src="https://i.imgur.com/j8znyIA.jpeg" alt="LAS up close " style="width:40%">
  </div>
</div> 

<figure>
<figcaption> Figure 4. LAS Data from a Distance and LAS Data up close. </figcaption>
</figure> <br>

<p> To use this LAS data with elevation and raster functions, it needs to be transformed into a proper LAS dataset. Lookup "Create LAS Dataset" in the toolbox. Input the LAS data -- the rest of the options can be left as default. As a side note, if you had multiple LAS files, they could be input and turned into one large LAS dataset. Technically we could create a LAS dataset for all of downtown Bowling Green -- it would just be time consuming to do so. Create the LAS Dataset (Figure 5). </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/sRBNlZv.jpeg" alt="Creating LAS Dataset" style="width:100%;max-width:625px">
<figcaption> Figure 5. Creating an LAS Dataset   </figcaption>
</figure> <br>

<p> Take some time to look at the LAS Dataset options (LAS Dataset Layer, Data, Classification). They appear at the top ribbon when the LAS Dataset is selected in the table of contents. Most noteworthy are the "LAS Dataset Layer" options: here, the density of the LAS points can be altered, as well as the symbology and LAS Point parameters. The symbology settings can be altered to display different point, surface, and line options -- take some time to observe how these settings display different kinds of information about the physical landscape. "LAS Points" refers the classification of the LIDAR data: these classifications can include all elevations (including building and tree tops), only ground elevations, non-ground elevations, or the first return points. For "Data", Notice that there are numerous different options for analyses here: information on concepts or objects such as power lines, buildings, statistics, area and volume, outliers, surface derivatives, and visibility can be created here.    </p> <br>

<p> To create a hillshade, this LIDAR data will first need to be transformed into raster data. Ensure that the "LAS Points" setting is set to "All Points" so that it captures buildings and tree tops. Search for the LAS Dataset to Raster tool in the geoprocessing toolbox. This tool has several important parameters, so take time to look over them.  </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/URUnKrx.jpeg" alt="Creating a raster" style="width:100%;max-width:625px">
<figcaption> Figure 6. Creating a Raster from the LAS Dataset   </figcaption>
</figure> <br>

<p> For this tutorial, the "Output raster" should be a .img raster file -- simply add the ".img" file extension to the end of the "Output Raster" name. A .img file is a type of file that contains a digital representation of an image using tiny pixels organized in a square grid that represent a cell value; the .img file format is owned by ERDAS, a company specializing in remote sensing data capture.     </p> <br>

<p> Looking at "Interpolation Type", note that there are numerous ways in which a raster can be interpolated. The primary choices here are either “Binning” or “Triangulation”. Leave the parameter as default with "Binning". For "Cell Assignment" use "Nearest" and for "Void Fill Method" use "Linear".  </p> <br>

<p> The "Output Data Type" should be set to "Integer".  </p> <br>

<p> "Sampling Type" can be left on the default "Cell Size" option. The "Sampling Value" and "Z factor" can be left on their respective default values as well. </p> <br>

<p> Under the "Environments" tab, there are a few more settings. </p> <br>

<p> Search for the "Hillsahde" tool in the geoprocessing toolbox. </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/0lEyIJZ.jpeg" alt="Creating a Hillshade" style="width:100%;max-width:625px">
<figcaption> Figure 7. Creating a Hillshade from the Raster Dataset   </figcaption>
</figure> <br>


<h3> List of Figures and Tables </h3> <br>

<h3> References </h3> <br>


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

</body>

</html>
