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

  h3{
  text-align: center;
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

<h1 style="text-align:center;"> KYFromAbove: Downloading and Processing LIDAR data </h1> <br>

<p> LIDAR data is incredibly important because it allows us to create detailed and accurate maps of the Earth's surface and objects on it. By using laser beams to measure distances, LIDAR can create 3D models of forests, cities, and even the ocean floor with high precision. This data is crucial for urban planning, managing natural resources, studying climate change, and understanding geological processes. It helps scientists, engineers, and planners make informed decisions about infrastructure, conservation efforts, disaster response, and more. In essence, LIDAR data provides a valuable perspective on our world that helps us protect the environment, plan for the future, and improve our understanding of Earth's complex systems. </p> <br>

<p> In this tutorial, we will be downloading, processing, and modeling LIDAR data from KYFromAbove -- a government sponsored geoportal that is "focused on building and maintaining a current basemap for the Commonwealth that can meet the needs of its users at the state, federal, local, and regional level" (KYFromAbove, 2024). The goal is to create hillshade data that demonstrates the elevation change and lighting in one particular LIDAR tile. To provide additional clarity, this tutorial is focused on the workflow for downloading and using LIDAR data. If you wish to use LIDAR data outside of Kentucky, the same general steps apply. Some possible sources of LIDAR data can be found <a href="https://gisgeography.com/top-6-free-lidar-data-sources/"> here</a>. </p> <br>
  
<p> <em> Do note that you will need the "Spatial Analyst" extension for ArcGIS Pro to create a hillshade. If you do not have that extension enabled, then you can export the intermediary raster dataset to QGIS to create a hillshade.  </em> </p> <br>

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
<img class="myImages" id="myImg" src="https://i.imgur.com/KTdJ6BD.jpeg" alt="Decompressing LAZ" style="width:100%;max-width:625px">
<figcaption> Figure 3. Converting LAZ to LAS on ArcGIS Pro   </figcaption>
</figure> <br>

<p> Add the newly uncompressed LAS dataset from the target folder into ArcGIS Pro. Zoomed out, it appears as a red square overlaid on part of Bowling Green. When zooming in, however, it appears as a dense set of multicolored points, where blue points represent lower elevation, and red points represent higher elevations (Figure 4). </p> <br>

 <div class="row">
  <div class="column">
    <img class="myImages" id="myImg" src="https://i.imgur.com/oWrramV.jpeg" alt= "LAS from a Distance" style="width:100%">
  </div>
  <div class="column">
    <img class="myImages" id="myImg" src="https://i.imgur.com/ovSiIsL.jpeg" alt="LAS up close " style="width:100%">
  </div>
</div> 

<figure>
<figcaption> Figure 4. LAS Data from a Distance and LAS Data up close </figcaption>
</figure> <br>

<p> To use this LAS data with elevation and raster functions, it needs to be transformed into a proper LAS dataset. Lookup "Create LAS Dataset" in the toolbox. Input the LAS data -- the rest of the options can be left as default. </p> <br>
  
<p> As a side note, if you have multiple LAS files, they could be input and turned into one large LAS dataset. Technically a LAS dataset for all downtown Bowling Green could be created like this -- it would be time consuming, however. Create the LAS Dataset (Figure 5). </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/8uX8Bl5.jpeg" alt="Creating LAS Dataset" style="width:100%;max-width:625px">
<figcaption> Figure 5. Creating an LAS Dataset   </figcaption>
</figure> <br>

<h3> Working with a LAS Dataset </h3> <br>

<p> Take some time to look at the LAS Dataset options (LAS Dataset Layer, Data, Classification). They appear at the top ribbon when the LAS Dataset is selected in the table of contents. Most noteworthy are the "LAS Dataset Layer" options: here, the density of the LAS points can be altered, as well as the symbology and LAS Point parameters. The symbology settings can be altered to display different point, surface, and line options -- observe how these settings display different kinds of information about the physical landscape. </p> <br>
  
<p> "LAS Points" refers to the classification of the LIDAR data: these classifications can include all elevations (including building and treetops), only ground elevations, non-ground elevations, or the first return points. For "Data", Notice that there are numerous different options for analyses here: information on concepts or objects such as power lines, buildings, statistics, area and volume, outliers, surface derivatives, and visibility can be created here.    </p> <br>

<p> To create a hillshade, this LIDAR data will first need to be transformed into raster data. Ensure that the "LAS Points" setting is set to "All Points" so that it captures buildings and treetops. Search for and select the "LAS Dataset to Raster" tool in the geoprocessing toolbox. This tool has several important parameters that require a comprehensive explanation, so take time to look over them.  </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/naE0k8d.jpeg" alt="Creating a raster" style="width:100%;max-width:625px">
<figcaption> Figure 6. Creating a Raster from the LAS Dataset   </figcaption>
</figure> <br>

<h3> LIDAR to Raster: Some Information on Raster Datasets </h3> <br>

<p> As a quick break from the workflow, these next few steps will describe some parameters used in creating raster datasets as well as general information on the raster data format. When it comes time to fill in the parameters, a line-by-line approach to the geoprocessing tool will be taken and a brief summary on each of the parameter's options will be given.  </p> <br>
  
<p> Raster datasets exist in the form of a grid, which is composed of a series of rows and columns. Rasters can also exist in rectangular form, though other irregular shapes would not be feasible since they cannot be stored in a row and column form easily. Tiny pixels organized in the grid serve as cell values, which quantify the raster.    </p> <br>

<p> The amount of data a raster can store depends upon its bit number. An 8-bit raster can contain 255 values, a 16-bit raster can contain 65535 values, and a 32-bit raster can contain 4294967295 values. With the LAS Dataset to Raster tool, a 32-bit signed raster was created.  </p> <br>

<p> Raster data also comes in signed and unsigned data formats. Signed rasters can contain negative values, whereas unsigned rasters contain only positive values. An 8-bit unsigned raster's values range from 0 to 255, whereas an 8-bit signed raster's values range from -128 to 127. </p> <br>

<p> At this point, we can look at and discuss each parameter in Figure 6. Raster extensions include TIFF, BMP, GIF, IMG, GRID, JPG, PNG, or BIL. For this tutorial, the "Output raster" (Figure 6) should be a .img raster file -- simply add the ".img" file extension to the end of the "Output Raster" name. IMG is a proprietary file format owned by ERDAS, a company specializing in remote sensing data capture -- IMG rasters tend to be of high-quality at the cost of more storage space.  Table 1 below presents a basic delineation of uses for different file formats. An exhaustive list can be found <a href="https://pro.arcgis.com/en/pro-app/latest/help/data/imagery/supported-raster-dataset-file-formats.htm"> here</a>. </p> <br>

<table title="Image File Extensions as Raster Datasets"> <caption> Table 1. Image Files as Raster Datasets </caption>
<thead>
<th> Image File Extensions </th>  
<th> Compression Type </th>
<th> Ideal Use </th>
</thead>
<tbody>
<tr>
<td> IMG, TIFF, GRID, BIL </td>
<td> Uncompressed </td>
<td> These image file formats support negative values when the raster is over 8-bits in size. This allows for boarder applications of the raster data, though it comes at the cost of using more storage space. </td>
</tr>
<tr>
<td> JPG, GIF, PNG, BMP </td>
<td> Compressed </td>
<td> As they are compressed, these image file formats are more space efficient. This comes at the cost of high-quality resolution  </td>
</tr>
</tbody>
</table>


<p> Looking at "Interpolation Type", note that there are numerous ways in which a raster can be interpolated. The primary choices here are either “Binning” or “Triangulation” (Table 2).</p>

<table title="Binning vs Triangulation"> <caption> Table 2. Binning vs Triangulation Interpolation </caption>
<thead>
<th> Interpolation Type </th>
<th> Description </th>
</thead>
<tbody>
<tr>
<td> Binning </td>
<td> Binning determines the value of a pixel by observing the points within the pixel to calculate the final value </td>
</tr>
<tr>
<td> Triangulation </td>
<td> Triangulation uses a method called Delaunay triangulation that creates a surface from a network of triangular facets composed of nodes and edges that cover the surface and are rasterized. Triangulation is best used when the point density of the LAS dataset is low: this is typically when the point size of the pixel is less than three to four times bigger than the average distance between pixels. </td>
</tr>
</tbody>
</table> <br>
  
<p> Leave the parameter as default with "Binning". Notice that if you switch between "Binning" and "Triangulation", the parameters below them change. Table 3 below summarizes each of the parameters for "Binning". </p> <br>

<table title="Binning Options"> <caption> Table 3. Binning Options </caption>
<thead>
<tr>
<th> Cell Assignment </th>
<th> Void Fill </th>
</tr>
</thead>
<tbody>
<tr>
<td>  
<ul>
<li> Average: uses the mean of the points in the cell </li>  
<li> IDW: uses inverse distance weight interpolation to calculate cell values -- a greater distance from a point results in a smaller value  </li>  
<li> Maximum: uses the largest point in the cell </li>  
<li> Minimum: uses the smallest point in the cell </li> 
<li> Nearest: uses the value of neighboring points so that the distance between each point is equal everywhere  </li>  
</ul>
</td>
<td>  
<ul>
<li> None: leaves those cells empty </li>  
<li> Simple: uses the mean of the nearest points to assign a value to the empty cell </li>  
<li> Linear: uses triangular interpolation to fill the empty cell -- this is similar to the "Nearest" option for cell assignment </li>  
<li> Natural Neighbor: uses a more sophisticated method of the linear void fill method for a smoother interpolation result </li>  
</ul>
</td>   
</tr>
</tbody>  
</table> <br>

<p> Likewise, Table 4 below summarizes each of the parameters for "Triangulation". </p> <br>

<table title="Triangulation Options"><caption> Table 4. Triangulation Options </caption>
<thead>
<tr>
<th> Interpolation Methods </th>
<th> Thinning Type </th>
<th> Selection Method (Window Size Only) </th>
</tr>  
</thead>
<tbody>
<tr>
<td>
<ul>
<li> Linear: uses the value of neighboring points so that the distance between each point is equal everywhere   </li>
<li> Natural Neighbor: uses a more sophisticated method of the linear void fill method for a smoother interpolation result </li>
</ul>
</td>
<td>
<ul>
<li> No Thinning: leaves the output size raster as is  </li>
<li> Window Size: this “thins” the raster which may make it faster to process </li>
</ul>
</td>
<td>
<ul> 
<li> Maximum: uses the highest point in the window size  </li>
<li> Minimum: uses the lowest point in the window size  </li>
<li> Closest to Mean: uses the closest approximation to the mean of the points in the window size </li>
</ul>
</td>
</tr>
</tbody>
</table> <br>


<p> For "Cell Assignment" use "Nearest" and for "Void Fill Method" use "Linear". These parameters will help preserve the edges of buildings, structures, and trees.  </p> <br>

<p> Under "Output Data Type", the options are "Floating" or "Integer". For the purposes of this tutorial, either option can be selected, though it ultimately depends on what you want to do with the raster data. Table 5 below presents a summary of the differences. </p>

<table title="Floating and Integer Valued Rasters"> <caption> Table 5. Floating and Integer Valued Rasters </caption>
<thead>
<tr>
<th> Output Data Type </th>
<th> Description </th>
</tr>  
</thead>
<tbody>
<tr>
<td> Floating </td>
<td> "Floating" rasters include decimal points, which makes them ideal for displaying elevation data -- the caveat to that is since infinitesimal values are included, there is no way to create an attribute table for the raster. Generally, this renders floating point rasters ideal for data visualization, but not as useful for analytical workflows. </td>
</tr>
<tr>
<td> Integer </td>
<td> Integer rasters retain an attribute table since their values are countable. If you wish to create a TIN model for 3D modeling with building footprints or need to extract elevation values to a feature layer, then it may be better to select an "Integer" type raster. The disadvantage to integer rasters is that they cannot display data in a manner as detailed as floating-point rasters. </td>  
</tr>
</tbody>
</table> <br>



<p> "Sampling Type" has two choices "Cell Size" and "Observations" (Table 6). Both options have the "Sampling Value" and "Z factor" sub options. Since we have a square grid of LIDAR data, select "Cell Size" as the "Sampling Type". </p> <br>
  
<p> For "Sampling Value", a lower sampling value produce a higher resolution raster -- it can be left on the default value of ten, though you may wish to plug in a couple of other values (such as 1, 5, 25, 100) and run the tool to see how the resolution of the output raster is affected. </p> <br>
  
<p> The "Z factor" is used to convert x and y units to a z unit that has a different unit of measurement. If, for example, the x and y units are in feet, and the z coordinate is in meters, the z factor would be 3.28084 to convert the z units into feet from meters. It is also used as a measure of vertical exaggeration in 3D modeling to make the verticality of features more striking. The Z factor can be left at the default value of one since we do not need to convert measurements or prepare any 3D models.  </p> <br>

<table> <caption> Table 6. Sampling Types for Raster Datasets </caption>
<thead>
<tr>
<th> Sampling Type </th>
<th> Description </th>
</tr>  
</thead>
<tbody>
<tr>
<td> Observations </td>
<td> The number of cells that divide the lengthiest side of the LAS dataset extent will be used. This method is ideal if the raster is rectangular rather than square shaped. </td>
</tr>
<tr>
<td> Cell Size </td>
<td> The cell size of the output raster will be used. This is the default. </td>
</tr>
</tbody>
</table> <br>

<p> Under the "Environments" tab, there are a few more settings (Figure 7). </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/xvynuS6.jpeg" alt="Environments" style="width:100%;max-width:625px">
<figcaption> Figure 7. Looking at the Environment Settings of the Create Raster from LAS Dataset Tool     </figcaption>
</figure> <br>
  
<p> "Output Coordinates", "Raster Analysis", and "Geodatabase" are straightforward parameters, as they refer to the output coordinate system of the raster, how the rasters inputs and snap size should be considered, and whether there is a specific geodatabase configuration keyword. Pay particular attention to the "Raster Storage" parameter heading, as this will affect the appearance of the raster dataset. The "Pyramid" option is checked by default: building pyramids may expedite the drawing speed of the raster dataset. Pyramids are essentially down-sampled versions of the raster dataset, which can then be displayed quicker on ArcGIS Pro. If the user zooms in, the details from the original raster will appear. This is useful for large rasters that would otherwise take a long time to display since ArcGIS does not need to load every detail at once.   </p> <br>

<p> Specific "Pyramid levels" can also be input. If the field is left empty, then all pyramids will be built. If a specific number is input, then that specific number of pyramids will be built. Below "Pyramid levels" is the option to "Skip first", which by default is unchecked -- this would skip building the first pyramid level of the raster.     </p> <br>

<p> The "Resampling Techniques" are described in Table 7 below. This affects how the values of neighboring cells are used to assign a value to the output raster cell.  </p> <br>

<table title="Resampling Techniques for Raster Datasets"> <caption> Table 7. Resampling Methods for Raster Datasets </caption>
<thead>
<tr>
<th> Method </th>
<th> Description </th>
</tr>
</thead>
<tbody>
<tr>
<td> Nearest Neighbor </td>
<td> The Nearest Neighbor method uses the value of the closest cell to assign a value to the output cell. This is the ideal method to use for discrete data, such as land use, that use integer values as this method does not smooth out the data.  </td>
</tr>
<tr>
<td> Bilinear Interpolation </td>
<td> Bilinear Interpolation is typically used for continuous data sets, such as elevation, as it uses the weighted distance average of the four nearest cell values to determine the value of a new cell.  </td>  
</tr>
<tr>
<td> Cubic Convolution </td>
<td> Cubic Convolution is similar to the bilinear interpolation method, the difference is that it uses the weighted distance average of the nearest 16 cell values. This results in a less distorted raster that is ideal for continuous data, albeit at the cost of a higher processing time. It can also have output cell values that are outside the range of the input cells.  </td>  
</tr>
</tbody>
</table>

<p> "Raster Statistics" is checked by default. Raster statistics are standard descriptive statistics (i.e. mean, maximum, minimum, standard deviation) calculated from the cell values of each band in a raster. These statistics are necessary for certain operations, such as applying a contrast stretch or classifying data. Even if it is unchecked, raster statistics can still be calculated later. Below are the "X skip factor", "Y skip factor", and "Statistics ignore value(s)". The X and Y skip factors, like the names imply, impose a certain skip distance between samples on the x and y axis. This can be used to limit or manage samples during raster statistics creation. Statistics ignore value(s) is a semi colon separated list of values that should be left out of raster statistics.  </p> <br>

<p> Finally, these is the "Compression" field. Typically, this can be left on the default value "LZ77", as that method of compression is compatible with a wide range of raster types and it preserves all cell values in the raster. A detailed breakdown on raster compression can be found <a href="https://desktop.arcgis.com/en/arcmap/latest/manage-data/raster-and-images/raster-compression.htm"> here</a>.  </p> <br>

<p> With the parameters set, run the "LAS Dataset to Raster" tool. Something like Figure 7 below should have been created. Notice that it is pixelated and has stark edges around trees and structures -- this is due to the parameters that were selected in its creation. If more intensive resampling methods and cell assignment methods were used, then there would have been a smoother gradient between elevation values.   </p> <br>

<p> Like the LAS Dataset, if you select the raster that was created in the Table of Contents, you will notice that there is a unique "Raster Layer" option by the top ribbon of ArcGIS Pro. Here you can alter the Symbology method, Stretch Type, and Resampling Type. Nothing here needs alteration, but it is worthwhile to look through and test out what these options do.  </p>
  
<p> Visually analyzing the raster, there are a few notable observations. The top-left part of the raster has bright white structures -- these are buildings on Western Kentucky University's (WKU) campus, which is situated on the historic Vinegar Hill. The bright white color denotes a higher elevation. East of the Western Kentucky University's campus are some high elevation tree tops in the College Hill Historic District, which connects to Reservoir Hill (not included in the raster). Looking south, there is a solid black line dotted with moderate sized structures that cuts the raster in half somewhat diagonally. This is the US-31W Bypass, which was once the edge of Bowling Green in the 1950s and 1960s -- it now serves as a major road in the middle of Bowling Green. In the south-central part of the raster, there is a large structure that sits lower than WKU (as it is darker in color). This is the TC Cherry Elementary School, which serves most of downtown and southern Bowling Green.       </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/enetd1E.jpeg" alt="Elevation Raster" style="width:100%;max-width:625px">
<figcaption> Figure 8. The Elevation Raster   </figcaption>
</figure> <br>




<h3> Creating a Hillshade from a Raster Dataset </h3> <br>

<p> Search for the "Hillshade" tool in the geoprocessing toolbox. Like creating a raster dataset, there are a couple parameters to consider when creating a hillshade (Table 8).  </p> <br>

<table title="Hillshade Dataset Parameters"> <caption> Table 8. Hillshade Dataset Creation Parameters </caption>
<thead>
<tr>
<th> Setting </th>
<th> Description </th>
</tr>
</thead>
<tbody>
<tr> 
<td> Azimuth </td>
<td> The angle from which the light source interacts with the hillshade. It is measured clockwise starting at north. The default azimuth is 315°, or a light source simulated from the northwest. </td>
</tr>
<tr>
<td> Altitude </td>
<td> The angle of illumination above the horizon: the value ranges from 0° to 90°. A 0° is on the horizon, whereas a 90° is directly above the hillshade.
 </td>
</tr>
<tr>
<td> Model shadows </td>
<td> A checkbox that determines whether shadows should be modeled or not. Possible values range from 0 to 255, with 0 being the darkest areas and 255 being the brightest areas. If unchecked, the hillshade will only consider local illumination angles. If checked, shadows will be considered as well. By default, this option is unchecked.  </td>
</tr>
<tr>
<td> Z factor </td>
<td> The z-factor is an adjustment factor for vertical units when they are different from the horizontal coordinate units on the surface. If all the units (x, y, and z) are the same, then the z-factor maintains the default value one; but if, for example, the x and y units are in feet, and the z coordinate is in meters, the z factor would be 3.28084 to convert the z units into feet from meters. The z-factor is also used when symbolizing to exaggerate three-dimensional features.    </td>
</tr>
</tbody>
</table> <br>

<p> The default azimuth value of 315° may seem oddly specific. There is a reason for this, however, grounded in psychology. We tend to perceive faces as lit from above and with somewhat of a leftward bias. If something is lit from below, this can create the "Crater Illusion effect", which can seemingly render elevated structures as depressions. A simple example using dots can be seen <a href="http://www.psy.ritsumei.ac.jp/akitaoka/cratorRamachandran01.jpg">here</a>. It is best to leave azimuth at the default value unless there is a good reason to alter it.  </p> <br>

<p> The altitude of the lighting source can be left as default, or it can be edited to simulate the current position of the sun. Information on the current position of the sun relative to your location of choice can be calculated <a href="https://www.suncalc.org/"> here</a>. </p> <br>

<p> The choice to model shadows is mainly an aesthetic choice. Feel free to enable it to see if it is pertinent to your data. </p> <br>

<p> The default Z factor is set to z unit into feet from meters, which will exaggerate the features somewhat. For the purposes of the tutorial, I left it at the default value. </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/mJPLxZU.jpeg" alt="Creating a Hillshade" style="width:100%;max-width:625px">
<figcaption> Figure 9. Creating a Hillshade from the Raster Dataset   </figcaption>
</figure> <br>

<p> With a hillshade created, this concludes the tutorial. Naturally, there are many things that can be done with the hillshade, raster elevation dataset, or the LIDAR data. </p> <br>


<h3> List of Figures and Tables </h3> <br>
<p> Figure 1. Finding Point Cloud Data on KYFromAbove </p>
<p> Figure 2. Selecting a LIDAR Index Grid to Download on the ArcGIS Web Map  </p>
<p> Figure 3. Converting LAZ to LAS on ArcGIS Pro  </p>
<p> Figure 4. LAS Data from a Distance and LAS Data up close </p>
<p> Figure 5. Creating a LAS Dataset </p>
<p> Figure 6. Creating a Raster from the LAS Dataset </p>
<p> Figure 7. Looking at the Environment Settings of the Create Raster from LAS Dataset Tool   </p>
<p> Figure 8. The Elevation Raster  </p> 
<p> Figure 9. Creating a Hillshade from the Raster Dataset </p> <br>

<p> Table 1. Image Files as Raster Datasets </p>
<p> Table 2. Binning vs Triangulation Interpolation </p>
<p> Table 3. Binning Options </p>
<p> Table 4. Triangulation Options </p>
<p> Table 5. Floating and Integer Valued Rasters  </p>
<p> Table 6. Sampling Types for Raster Datasets  </p>
<p> Table 7. Resampling Methods for Raster Datasets  </p> 
<p> Table 8. Hillshade Dataset Creation Parameters  </p><br>

<h3> References </h3> <br>

<div class="wysiwyg lengthy" ><p class="reference"><em>Map Viewer</em>. (n.d.). <a href="https://kygeonet.maps.arcgis.com/apps/mapviewer/index.html?webmap=b5ff91df6309491090c20333c8f58f52" target="_blank" rel="nofollow noopener noreferrer">https://kygeonet.maps.arcgis.com/apps/mapviewer/index.html?webmap=b5ff91df6309491090c20333c8f58f52</a></p>

<p class="reference"> <em>Raster file formats—ArcGIS Pro | Documentation</em>. (n.d.). <a href="https://pro.arcgis.com/en/pro-app/latest/help/data/imagery/supported-raster-dataset-file-formats.htm" target="_blank" rel="nofollow noopener noreferrer"> https://pro.arcgis.com/en/pro-app/latest/help/data/imagery/supported-raster-dataset-file-formats.htm</a> </p>

<p class="reference"> GISGeography. (2024, July 12).<em> Top 6 Free LiDAR data Sources</em>. GIS Geography. <a href="https://gisgeography.com/top-6-free-lidar-data-sources/" target="_blank" rel="nofollow noopener noreferrer"> https://gisgeography.com/top-6-free-lidar-data-sources/</a> </p>

<p class="reference"><em> Raster Compression—ArcMap | Documentation</em>. (n.d.). <a href="https://desktop.arcgis.com/en/arcmap/latest/manage-data/raster-and-images/raster-compression.htm" target="_blank" rel="nofollow noopener noreferrer">  https://desktop.arcgis.com/en/arcmap/latest/manage-data/raster-and-images/raster-compression.htm</a> </p>

<p class="reference"> 北岡明佳の錯視のページ. (n.d.). <a href="http://www.psy.ritsumei.ac.jp/akitaoka/cratorRamachandran01.jpg" target="_blank" rel="nofollow noopener noreferrer"> http://www.psy.ritsumei.ac.jp/akitaoka/cratorRamachandran01.jpg</a> </p>

<p class="reference"> <em>SunCalc sun position- und sun phases calculator</em>. (n.d.). <a href="https://www.suncalc.org/">https://www.suncalc.org/</a> </p>

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


