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

<p> In this tutorial, LIDAR data from KYFromAbove will be downloaded, processed, and modeled. KYFromAbove is a government-sponsored geoportal "focused on building and maintaining a current basemap for the Commonwealth that can meet the needs of its users at the state, federal, local, and regional level" (KYFromAbove, 2024). The goal is to create hillshade data that demonstrates elevation change and lighting in one particular LIDAR tile. To provide additional clarity, the workflow for downloading and using LIDAR data will be the focus of this tutorial. If LIDAR data from outside Kentucky is to be used, the same general steps can be applied. Some possible sources of LIDAR data can be found <a href="https://gisgeography.com/top-6-free-lidar-data-sources/">here</a>. </p> <br>
  
<p> <em> It should be noted that the "Spatial Analyst" extension for ArcGIS Pro is required to create a hillshade. If this extension is not enabled, the intermediary raster dataset can be exported to QGIS for hillshade creation.  </em> </p> <br>

<p> Begin by navigating to <a href="https://kyfromabove.ky.gov/">KYFromAbove</a>. Scroll down until "Download Point Cloud Data" is found, and "View" should be selected (Figure 1).  </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/yo7ecd7.jpeg" alt="Point Cloud Data" style="width:100%;max-width:625px">
<figcaption> Figure 1. Finding Point Cloud Data on KYFromAbove   </figcaption>
</figure> <br>

<p> An index grid map of Kentucky will be displayed, with each grid containing compressed LIDAR (LAZ) data representing the corresponding area. The grids are numbered according to their position, with tile grids in Kentucky following the format NxxxExxx, where “x” is a number. The grid map should be zoomed in on, and the desired tile should be clicked to display its metadata and download link. The latest version of the data can be downloaded using the FTP link. Any grid can be used for this project, as all grids are processed in the same way. Grid N169E188 has been selected for this tutorial (Figure 2). However, it is recommended that a grid with some buildings be chosen so that the results of the project are more impressive.  </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/mqkr31z.jpeg" alt="LIDAR Web Map " style="width:100%;max-width:625px">
<figcaption> Figure 2. Selecting a LIDAR Index Grid to Download on the ArcGIS Web Map    </figcaption>
</figure> <br>

<p> Next, the LAZ data must be decompressed. A LAZ file is a compressed format used to store LIDAR data, while a LAS file is the uncompressed version of a LAZ file and is compatible with GIS software. LAS files are typically compressed into LAZ files due to the large amount of space LAS files occupy. </p> <br>

<p> To decompress the LAZ dataset, the "Convert LAS" tool in ArcGIS Pro should be used. It may be helpful for a folder to be created for the uncompressed LAS data. The LAZ dataset should be input, the target folder for the LAS dataset specified, "Compression" should be set to "No Compression", and LAS Options should be left at their default settings (Figure 3). The tool should then be run.  </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/KTdJ6BD.jpeg" alt="Decompressing LAZ" style="width:100%;max-width:625px">
<figcaption> Figure 3. Converting LAZ to LAS on ArcGIS Pro   </figcaption>
</figure> <br>

<p> The newly uncompressed LAS dataset from the target folder should be added to ArcGIS Pro. When zoomed out, it will appear as a red square overlaid on part of Bowling Green. Upon zooming in, however, it will be displayed as a dense set of multicolored points, with blue points representing lower elevation and red points representing higher elevations (Figure 4). </p> <br>

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

<p> To use this LAS data with elevation and raster functions, it must be transformed into a proper LAS dataset. "Create LAS Dataset" should be looked up in the toolbox. The LAS data should be input, and the remaining options can be left at their default settings. </p> <br>
  
<p> As a side note, if multiple LAS files are available, they can be input and combined into one large LAS dataset. Technically, a LAS dataset for all of downtown Bowling Green could be created in this way, although it would be time-consuming. The LAS Dataset should then be created (Figure 5). (Figure 5). </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/8uX8Bl5.jpeg" alt="Creating LAS Dataset" style="width:100%;max-width:625px">
<figcaption> Figure 5. Creating an LAS Dataset   </figcaption>
</figure> <br>

<h3> Working with a LAS Dataset </h3> <br>

<p> Some time should be taken to review the LAS Dataset options (LAS Dataset Layer, Data, Classification), which appear at the top ribbon when the LAS Dataset is selected in the table of contents. The most noteworthy options are found under "LAS Dataset Layer," where the density of the LAS points can be adjusted, as well as the symbology and LAS Point parameters. The symbology settings can be modified to display different point, surface, and line options—observe how these settings reveal different types of information about the physical landscape. </p> <br>
  
<p> "LAS Points" refers to the classification of the LIDAR data: classifications can include all elevations (such as building and treetop heights), ground elevations only, non-ground elevations, or first return points. Under "Data," numerous options for analysis are available, including the creation of information on concepts or objects such as power lines, buildings, statistics, area and volume, outliers, surface derivatives, and visibility.   </p> <br>

<p> To create a hillshade, the LIDAR data will need to be transformed into raster data. It should be ensured that the "LAS Points" setting is set to "All Points" so that both buildings and treetops are captured. The "LAS Dataset to Raster" tool should be searched for and selected in the geoprocessing toolbox. This tool has several important parameters that require thorough review, so time should be taken to examine them.  </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/naE0k8d.jpeg" alt="Creating a raster" style="width:100%;max-width:625px">
<figcaption> Figure 6. Creating a Raster from the LAS Dataset   </figcaption>
</figure> <br>

<h3> LIDAR to Raster: Some Information on Raster Datasets </h3> <br>

<p> As a quick break from the workflow, the next few steps will describe some parameters used in creating raster datasets, along with general information on the raster data format. When it comes time to fill in the parameters, a line-by-line approach to the geoprocessing tool will be taken, and a brief summary of each parameter's options will be provided. </p> <br>
  
<p> Raster datasets exist in the form of a grid, composed of a series of rows and columns. While rasters can also exist in rectangular form, other irregular shapes would not be feasible since they cannot be easily stored in a row and column format. Tiny pixels organized in the grid serve as cell values, which quantify the raster.   </p> <br>

<p> The amount of data that can be stored in a raster depends on its bit number. An 8-bit raster can contain 255 values, a 16-bit raster can contain 65,535 values, and a 32-bit raster can contain 4,294,967,295 values. With the LAS Dataset to Raster tool, a 32-bit signed raster has been created.  </p> <br>

<p> Raster data also exists in signed and unsigned formats. Signed rasters can contain negative values, whereas unsigned rasters contain only positive values. For instance, an 8-bit unsigned raster's values range from 0 to 255, whereas an 8-bit signed raster's values range from -128 to 127. </p> <br>

<p> At this point, each parameter in Figure 6 can be examined and discussed. Raster extensions include TIFF, BMP, GIF, IMG, GRID, JPG, PNG, or BIL. For this tutorial, the "Output raster" (Figure 6) should be set to a .img raster file — simply add the ".img" file extension to the end of the "Output Raster" name. IMG is a proprietary file format owned by ERDAS, a company specializing in remote sensing data capture. IMG rasters are typically of high quality, but they require more storage space. Table 1 below provides a basic overview of the uses for different file formats. An exhaustive list can be found <a href="https://pro.arcgis.com/en/pro-app/latest/help/data/imagery/supported-raster-dataset-file-formats.htm"> here</a>. </p> <br>


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
<td> Negative values are supported by these image file formats when the raster is over 8 bits in size. This allows for broader applications of the raster data, though it comes at the cost of increased storage space usage.</td>
</tr>
<tr>
<td> JPG, GIF, PNG, BMP </td>
<td> Compressed </td>
<td> Compressed image file formats are more space efficient. This comes at the cost of reduced resolution quality. </td>
</tr>
</tbody>
</table> <br>


<p> When looking at "Interpolation Type," it should be noted that there are several methods by which a raster can be interpolated. The primary choices are "Binning" or "Triangulation" (Table 2). </p> <br>

<table title="Binning vs Triangulation"> <caption> Table 2. Binning vs Triangulation Interpolation </caption>
<thead>
<th> Interpolation Type </th>
<th> Description </th>
</thead>
<tbody>
<tr>
<td> Binning </td>
<td> The value of a pixel is determined by binning, which involves observing the points within the pixel to calculate the final value. </td>
</tr>
<tr>
<td> Triangulation </td>
<td> Triangulation is performed using a method called Delaunay triangulation, which creates a surface from a network of triangular facets composed of nodes and edges that cover the surface and are rasterized. Triangulation is best applied when the point density of the LAS dataset is low, typically when the point size of the pixel is less than three to four times larger than the average distance between pixels. </td>
</tr>
</tbody>
</table> <br>
  
<p> The parameter should be left as default with "Binning." It should be noted that when switching between "Binning" and "Triangulation," the parameters below them are changed. Table 3 below summarizes each of the parameters for "Binning." </p> <br>

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

<p> Under "Output Data Type," the options "Floating" or "Integer" are available. For the purposes of this tutorial, either option can be selected, though the choice ultimately depends on the intended use of the raster data. A summary of the differences is presented in Table 5 below. </p> <br>

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
<td> "Floating" rasters include decimal points, making them ideal for displaying elevation data. The caveat is that, since infinitesimal values are included, an attribute table cannot be created for the raster. Generally, this makes floating point rasters ideal for data visualization, but less useful for analytical workflows. </td>
</tr>
<tr>
<td> Integer </td>
<td> Integer rasters retain an attribute table, as their values are countable. If a TIN model for 3D modeling with building footprints is to be created, or if elevation values need to be extracted to a feature layer, selecting an "Integer" raster type may be more appropriate. The disadvantage of integer rasters is that they cannot display data with the same level of detail as floating-point rasters.</td>  
</tr>
</tbody>
</table> <br>



<p> "Sampling Type" offers two choices: "Cell Size" and "Observations" (Table 6). Both options include the "Sampling Value" and "Z Factor" sub-options. Since a square grid of LIDAR data is used, "Cell Size" should be selected as the "Sampling Type." </p> <br>
  
<p> For "Sampling Value," a lower sampling value produces a higher resolution raster. The default value of ten can be left as is, although other values (such as 1, 5, 25, or 100) may be tested by running the tool to observe how the resolution of the output raster is affected. </p> <br>
  
<p> The "Z Factor" is used to convert x and y units to a z unit with a different unit of measurement. For example, if the x and y units are in feet and the z coordinate is in meters, the Z factor would be set to 3.28084 to convert the z units from meters to feet. It is also used to apply vertical exaggeration in 3D modeling, making vertical features more prominent. The Z factor can be left at the default value of one, as no conversion of measurements or 3D modeling is required. </p> <br>

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
  
<p> The parameters "Output Coordinates," "Raster Analysis," and "Geodatabase" are straightforward, as they refer to the output coordinate system of the raster, how the raster's inputs and snap size should be considered, and whether a specific geodatabase configuration keyword is required. Particular attention should be given to the "Raster Storage" parameter, as it will affect the appearance of the raster dataset. The "Pyramid" option is checked by default: pyramids are built to potentially expedite the drawing speed of the raster dataset. Pyramids are essentially down-sampled versions of the raster dataset, which can then be displayed more quickly in ArcGIS Pro. When zooming in, the details from the original raster will be displayed. This is useful for large rasters, as it prevents ArcGIS from needing to load every detail at once.   </p> <br>

<p> Specific "Pyramid levels" can also be specified. If the field is left empty, all pyramids will be built. If a specific number is entered, that number of pyramids will be constructed. Below "Pyramid levels" is the "Skip first" option, which is unchecked by default—this would skip the creation of the first pyramid level of the raster.    </p> <br>

<p> The "Resampling Techniques" are described in Table 7 below. This parameter affects how the values of neighboring cells are used to assign a value to the output raster cell.  </p> <br>

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
<td> The Nearest Neighbor method assigns the value of the closest cell to the output cell. This method is ideal for discrete data, such as land use, that uses integer values, as it does not smooth out the data.  </td>
</tr>
<tr>
<td> Bilinear Interpolation </td>
<td> Bilinear Interpolation is typically used for continuous datasets, such as elevation, as the weighted distance average of the four nearest cell values is used to determine the value of a new cell.  </td>  
</tr>
<tr>
<td> Cubic Convolution </td>
<td> Cubic Convolution is similar to the bilinear interpolation method, with the difference being that the weighted distance average of the nearest 16 cell values is used. This results in a less distorted raster, which is ideal for continuous data, though it comes at the cost of higher processing time. Output cell values can also fall outside the range of the input cells. </td>  
</tr>
</tbody>
</table>

<p> "Raster Statistics" is checked by default. Raster statistics consist of standard descriptive statistics (i.e., mean, maximum, minimum, standard deviation) calculated from the cell values of each band in a raster. These statistics are necessary for certain operations, such as applying a contrast stretch or classifying data. Even if unchecked, raster statistics can still be calculated later. Below are the "X skip factor," "Y skip factor," and "Statistics ignore value(s)." The X and Y skip factors, as the names imply, impose a skip distance between samples along the x and y axes. This can be used to limit or manage samples during raster statistics creation. "Statistics ignore value(s)" is a semicolon-separated list of values that should be excluded from raster statistics.  </p> <br>

<p> Finally, the "Compression" field is available. Typically, the default value "LZ77" can be left unchanged, as this compression method is compatible with a wide range of raster types and preserves all cell values in the raster. A detailed breakdown on raster compression can be found <a href="https://desktop.arcgis.com/en/arcmap/latest/manage-data/raster-and-images/raster-compression.htm"> here</a>.  </p> <br>

<p> With the parameters set, the "LAS Dataset to Raster" tool should be run. An output similar to Figure 7 below should have been created. It should be noted that the raster appears pixelated with stark edges around trees and structures—this is due to the selected parameters. If more intensive resampling methods and cell assignment techniques had been applied, a smoother gradient between elevation values would have been produced.  </p> <br>

<p> Like the LAS Dataset, when the created raster is selected in the Table of Contents, a unique "Raster Layer" option will appear on the top ribbon of ArcGIS Pro. Here, the Symbology method, Stretch Type, and Resampling Type can be altered. No changes are necessary, but it is worthwhile to explore and test these options. </p>
  
<p> Visually analyzing the raster, several notable features can be observed. The top-left part of the raster shows bright white structures—these are buildings on the Western Kentucky University (WKU) campus, located on historic Vinegar Hill. The bright white color denotes higher elevation. East of the WKU campus, high-elevation tree tops in the College Hill Historic District can be seen, which connects to Reservoir Hill (not included in the raster). To the south, a solid black line dotted with moderate-sized structures cuts the raster somewhat diagonally. This is the US-31W Bypass, which once marked the edge of Bowling Green in the 1950s and 1960s and now serves as a major thoroughfare through the city. In the south-central part of the raster, a large structure that sits lower than WKU (as indicated by its darker color) is visible. This is the TC Cherry Elementary School, which serves much of downtown and southern Bowling Green.     </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/enetd1E.jpeg" alt="Elevation Raster" style="width:100%;max-width:625px">
<figcaption> Figure 8. The Elevation Raster   </figcaption>
</figure> <br>




<h3> Creating a Hillshade from a Raster Dataset </h3> <br>

<p> The "Hillshade" tool should be searched for in the geoprocessing toolbox. Similar to the process of creating a raster dataset, several parameters need to be considered when generating a hillshade (Table 8). </p> <br>

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
<td> The angle of illumination above the horizon: the value ranges from 0° to 90°. 0° is on the horizon, whereas 90° is directly above the hillshade.
 </td>
</tr>
<tr>
<td> Model shadows </td>
<td> A checkbox is available to determine whether shadows should be modeled. Possible values range from 0 to 255, with 0 representing the darkest areas and 255 representing the brightest areas. If unchecked, only local illumination angles will be considered in the hillshade. If checked, shadows will also be considered. By default, this option is unchecked. </td>
</tr>
<tr>
<td> Z factor </td>
<td> The z-factor is an adjustment factor applied to vertical units when they differ from the horizontal coordinate units on the surface. If all the units (x, y, and z) are the same, the z-factor remains at its default value of one. However, if, for example, the x and y units are in feet and the z coordinate is in meters, the z-factor would be set to 3.28084 to convert the z units from meters to feet. The z-factor is also used when symbolizing to exaggerate three-dimensional features.   </td>
</tr>
</tbody>
</table> <br>

<p> The default azimuth value of 315° may seem oddly specific, but there is a reason for this, grounded in psychology. It is generally perceived that faces are lit from above and with a slight leftward bias. If something is lit from below, the "Crater Illusion effect" can occur, causing elevated structures to appear as depressions. A simple example of this effect using dots can be seen <a href="http://www.psy.ritsumei.ac.jp/akitaoka/cratorRamachandran01.jpg">here</a>. The azimuth should generally be left at the default value unless there is a specific reason to alter it. </p> <br>

<p> The altitude of the lighting source can be left at its default value, or it can be adjusted to simulate the current position of the sun. Information about the current position of the sun relative to a chosen location can be calculated <a href="https://www.suncalc.org/"> here</a>. </p> <br>


<p> The choice to model shadows is primarily an aesthetic decision. It may be enabled to determine whether it is relevant to the data. </p> <br>

<p> The default z-factor is set to convert z units from meters to feet, which will exaggerate features to some degree. For the purposes of this tutorial, the default value has been maintained. </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/mJPLxZU.jpeg" alt="Creating a Hillshade" style="width:100%;max-width:625px">
<figcaption> Figure 9. Creating a Hillshade from the Raster Dataset   </figcaption>
</figure> <br>

<p> Naturally, many things can be done with the hillshade, raster elevation dataset, or the LIDAR data. These datasets can be further analyzed to extract valuable insights, such as creating 3D models, conducting terrain analysis, or identifying patterns in the landscape.  </p> <br>


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


