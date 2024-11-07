<html>
  
<head>
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
  
  h3{
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
  </head>
  <body>

<h1 style="text-align:center;"> Automating GIS Workflows: Creating a Python Script to Automate Areal Proportion Analysis </h1> <br>

<p> Python has become an indispensable tool in automating Geographic Information Systems (GIS) workflows due to its versatility and the rich ecosystem of libraries it offers. By leveraging libraries such as ArcPy for Esri’s ArcGIS platform or GeoPandas for open-source GIS, Python enables users to script and automate complex geospatial tasks with ease. This includes automating data processing, performing spatial analyses, and generating maps. With Python, GIS professionals can create custom tools and workflows that streamline repetitive tasks, ensure consistency, and enhance productivity. Additionally, Python’s integration with web mapping libraries like Folium or Plotly facilitates the creation of interactive and dynamic geospatial visualizations, further expanding its utility in the GIS domain. </p> <br>

<p> In this tutorial, the workflow for areal proportion analysis will be automated. Areal proportion analysis involves examining the relative sizes of different spatial units within a geographic area to understand their distribution and impact. This type of analysis is particularly useful for estimating demographic characteristics across varying geographic scales, such as between census blocks and zip codes. </p> <br>

<p> Figure 1 below provides a visual depiction of areal proportion analysis, where smaller spatial units are aggregated into larger units. </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/HNXFGt5.jpg" style="width:100%;max-width:625px"> 
<figcaption> Figure 1. A Visual Depiction of Areal Proportion Analysis  </figcaption>
</figure> <br>


<p> This tutorial utilizes ArcPy and SSUtilities, so it is specifically designed for ArcGIS Pro. In many cases, other GIS operations may require additional libraries such as NumPy, GeoPandas, or others, depending on the specific analysis or functionality needed. </p> <br>

<h3> The workflow for Areal Proportion Analysis </h3> <br> 

<p> Before attempting to automate a GIS workflow, it is essential to understand how the workflow operates. The best way to achieve this is by manually executing the steps to familiarize yourself with the process, understand the necessary nuances, and identify which geoprocessing tools are involved.  </p> <br>

<p> Areal proportion analysis requires two spatial layers: one smaller layer with population (or numeric) values, and one larger layer, which may be empty (i.e., no numeric values). </p> <br>

<ol>
  <li> <em> Prepare the Smaller Layer </em>: In the smaller spatial layer, add a field called “AREA” and calculate its geometry in your desired unit (e.g., square miles).  </li>
  <li> <em> Intersect the Layers </em>: Next, intersect the two layers. Give the new intersected layer an easily identifiable name.  </li>
  <li> <em> Add and Calculate Geometry in the Intersected Layer </em>: In the newly intersected layer, add a field called “NEWAREA” and calculate its geometry in the same unit used for the “AREA” field in the smaller layer.  </li>
  <li> <em> Calculate Population Proportions </em>: Add another new field called “NEWPOP” and calculate its value using the formula: <br> <code> [POP] * [NEWAREA] / [AREA] </code> <br> This formula scales the population from the smaller units to the intersected areas based on their relative sizes.  </li>
  <li> <em> Summing the Population Values </em>: The “NEWPOP” field needs to be summed up to the aggregated units in the larger spatial layer. This can be done using the Summary Statistics tool, which sums the "NEWPOP" field for each feature in the original larger spatial layer. <br> This new table should be saved with an identifiable name, such as POP_TABLE. </li>
  <li> <em> Join and Export </em>: Finally, to save the changes to a permanent feature class, join the summary table to the larger spatial layer and export it as a new shapefile or feature class. </li>
</ol> <br>

<p> These steps are visualized in a modelbuilder simulation below (Figure 2). </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/XCFsAB4.jpeg" style="width:100%;max-width:625px"> 
<figcaption> Figure 2. A Modelbuilder depiction of the Areal Proportion Analysis Workflow </figcaption>
</figure> <br>



<h3> Writing the Script in Python </h3> <br>

<p> With the workflow established, a Python script can now be created to automate the process. To write this script, it is important to use a Python interface, such as IDLE, which will facilitate the development and testing of the script. Since this tutorial is focused on ArcGIS applications, the script will be written using ArcPy, although a similar script could be written in QGIS with PyQGIS.  </p> <br>

<p> When working in a separate Python interface, the arcpy module must first be imported into the script. This can be done by adding the command: </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
import arcpy
import SSUtilities
</code></pre></div></div> <br>

<p> Additionally, the SSUtilities module will be imported to construct a results table that will display once the script has completed its execution. This module is useful for creating summary reports and tracking the status of the script during its run. </p> <br>

<p> Next, it is important to set up the environment settings for the script. These settings define the workspace, enable overwriting of existing outputs, and ensure that outputs are added to the map. The following ArcPy commands can be used to configure these settings: </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
from arcpy import env # Bring in the workspace
arcpy.env.overwriteOutput = True
arcpy.env.addOutputsToMap = True
</code></pre></div></div> <br>

<p> At this point, it is important to consider what should be used as an input parameter. Certainly, the small and large spatial layers should be considered parameters. Similarly, if working with multiple numeric fields, there should be a specific field used in the analysis. Finally, a “to” and “from” join field should be identified to join the large layer with the intersected layer. These will be identified using the “arcpy.GetParameterAsText(n)” command. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
blockLayer = arcpy.GetParameterAsText(0) # Small spatial layer (with population or numeric data)
aggregateLayer = arcpy.GetParameterAsText(1) # Large spatial layer (to aggregate data to)
populationField = arcpy.GetParameterAsText(2) #  The numeric field (e.g., population)
blockJoinField = arcpy.GetParameterAsText(3) # "From" field in the smaller layer (used to join)
aggregateJoinField = arcpy.GetParameterAsText(4) # "To" field in the larger layer (used to join)
</code></pre></div></div> <br>

<p> These parameters make the script more flexible, allowing users to easily customize the input layers and fields based on their specific dataset. Once the input parameters are set up, proceed with the geoprocessing steps and calculations as described in the workflow. </p> <br>

<p> It is important to set the workspace for the feature layer dynamically to ensure that the script works in different environments or locations without needing to hardcode paths. This can be achieved using the "Describe" command in ArcPy, which provides information about the properties of a dataset, such as its path, data type, and other properties. The "Describe" function dynamically assigns the workspace to the feature layer. </p> <br>

<p> To assign a relative system path for the workspace, use the r"" (raw string) syntax, which treats backslashes in file paths correctly without needing to escape them. By setting the workspace dynamically, the script becomes more flexible and portable, eliminating the need for hardcoded file paths. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
desc = arcpy.Describe(blockLayer) # Get the path of the input layer dynamically
workSpace = r"" + desc.path # Extracts the directory path of the layer
</code></pre></div></div> <br>

<p> The larger spatial layer must be converted into a feature layer to enable editing or use in a geoprocessing workflow. This conversion is performed using the “MakeFeatureLayer” tool. First, a name, such as “aggregateLayer,” should be assigned to the layer. Then, the “MakeFeatureLayer” tool from the "Management" toolbox can be executed to create the feature layer. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
Aggregate_Layer_Feature_Layer = "aggregateLayer"
arcpy.management.MakeFeatureLayer(in_features=aggregateLayer, out_layer=Aggregate_Layer_Feature_Layer)
</code></pre></div></div> <br>

<p> At the end of the workflow, the table must be joined back to the larger spatial layer. To facilitate this, a field that matches the join field in the smaller spatial layer needs to be added to the larger layer. This can be accomplished using the “Management.Add_Field” command. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
Aggregate_Layer_Feature_Layer_JField = arcpy.management.AddField(in_table=Aggregate_Layer_Feature_Layer, field_name=blockJoinField, field_type="TEXT", field_is_required="NON_REQUIRED")[0] 
</code></pre></div></div> <br>

<p> An area field representing the area of each unit on the smaller spatial layer must be created.  </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
Block_with_Area_Field = arcpy.management.AddField(in_table=blockLayer, field_name="Area", field_type="DOUBLE", field_is_required="NON_REQUIRED")[0]
</code></pre></div></div> <br>

<p> The area field is then calculated using the Calculate Geometry tool. In Python, this can be done with the expression !shape.area@squaremiles!. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
Block_Filled_Area_ = arcpy.management.CalculateField(in_table=Block_with_Area_Field, field="Area", expression="!shape.area@squaremiles!", expression_type="PYTHON_9.3")[0]
</code></pre></div></div> <br>

<p> The two spatial layers can now be intersected using the “Analysis.Intersect” tool from ArcPy. Since this operation will create a new feature layer, a system path must be assigned to the resulting file. The existing "workSpace" variable can be concatenated with "\\" and the string "Block_Intersect" to define the name of the new layer. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
Aggregate_Block_Intersect_ = workSpace + "\\" + "Block_Intersect" 
arcpy.analysis.Intersect(in_features=[[Block_Filled_Area_, ""], [Aggregate_Layer_Feature_Layer_JField, ""]], out_feature_class=Aggregate_Block_Intersect_)
</code></pre></div></div> <br>

<p> A field representing the area of the intersected spatial layer is added.  </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
Aggregate_Block_Intersect_Empty_New_Area_ = arcpy.management.AddField(in_table=Aggregate_Block_Intersect_, field_name="New_Area", field_type="DOUBLE")[0]
</code></pre></div></div> <br>

<p> The geometry of the added field is calculated.  </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
Aggregate_Block_Intersect_Populated_Area_ = arcpy.management.CalculateField(in_table=Aggregate_Block_Intersect_Empty_New_Area_, field="New_Area", expression="!shape.area@squaremiles!", expression_type="PYTHON_9.3")[0]
</code></pre></div></div> <br>

<p> Another field is added to store the areal proportion population. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
Aggregate_Block_Intersect_Empty_New_Pop_ = arcpy.management.AddField(in_table=Aggregate_Block_Intersect_Populated_Area_, field_name=populationField, field_type="LONG")[0]
</code></pre></div></div> <br>

<p> The field is then calculated. To define the mathematical relationship in the field calculator, the expression is enclosed in quotes with "f" used to represent the formula. Visual Basic is used for simplicity in the calculation.  </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
Aggregate_Block_Intersect_Filled_Population_ = arcpy.management.CalculateField(in_table=Aggregate_Block_Intersect_Empty_New_Pop_, field=populationField, expression=f"[{populationField}] * [New_Area] / [Area]", expression_type="VB")[0]
</code></pre></div></div> <br>


<p> As the workflow nears completion, the summary statistics table must be created. A desktop path and a name must first be defined for the table, similar to the "Block_Intersect" feature layer created earlier. The "Statistics" tool, which is another analysis tool, is then used. To calculate the sum, "SUM" should be specified for the statistics field. The field by which the values will be grouped for summation is the “aggregateJoinField,” which is one of the user-defined inputs. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
Aggregate_Population_Table = workSpace + "\\" + "AGG_TABLE" 
arcpy.analysis.Statistics(in_table=Aggregate_Block_Intersect_Filled_Population_, out_table=Aggregate_Population_Table, statistics_fields=[[populationField, "SUM"]], case_field=[aggregateJoinField])
</code></pre></div></div> <br>

<p> Finally, the join between the larger spatial layer and the summary statistics table can be executed.  </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
Aggregate_Population_Layer_ = arcpy.management.AddJoin(in_layer_or_view=Aggregate_Layer_Feature_Layer, in_field=blockJoinField, join_table=Aggregate_Population_Table, join_field=aggregateJoinField, join_type="KEEP_ALL")[0]
</code></pre></div></div> <br>

<p>  The analytical workflow is now complete. However, using the SSUtilities package, general information about the tool can still be generated. This involves creating a small table that details the input spatial layers as well as the output. This can be accomplished by utilizing a few strings and lists. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
header = "Areal Proportion Analysis"
# Report the input list of parameters first
row1 = [ "The Block Layer: ", blockLayer ]
row2 = [ "The Aggregate Layer: ", aggregateLayer  ]
row3 = [ "The Output Dbase File Name: ", Aggregate_Population_Table ]
total = [ row1, row2, row3 ]
</code></pre></div></div> <br>

<p> To save the joined larger spatial layer, export it to a shapefile or geodatabase. The entire script is depicted below and can be downloaded <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/Python/AggPopEstimator.py"> here</a>.  </p> <br>


<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
##----------------------------------------------------------------------
## AggPopEstimator.py
## Created on: 5-14-2024
## Last Modified on: 5-15-2024
## Created by: Andrew Jones
## Usage: AggPopEstimator(blockLayer), AggPopEstimator(aggregateLayer),
## AggPopEstimator(populationField), AggPopEstimator(blockJoinField), AggPopEstimator(aggregateJoinField)
##              In order to use this script, the user needs to have a census block layer 
##              containing population data. The user must also have a larger layer that will 
##              act as the aggregation layer. 
##              Additionally, the user needs to identify the desired population field as 
##              well as the fields used to join the table to the aggregate layer. Typically 
##              this is the same field as the block field. Remember to setup the parameters or this tool will not function!
##              So far, this tool has successfully functioned using census blocks, block groups, tracts, and zip codes. 
## Description: This script is designed to automate an areal proportion analysis
##              and aggregate the population values of census blocks to larger geographic units. 
##              The results are stored in a dBase table which can then be joined to the larger geographic unit.
##              Areal proportion analysis assumes that the population within census blocks is evenly dispersed.
## Note: This tool may result in an error message if it is run more than once while the aggregate table 
##       is on the active ArcGIS Pro Table of Contents. Remove the aggregate table from the Table of Contents to avoid this.
##       Additionally, this tool was designed to work with census boundary files. Using it on other boundaries may create unexpected
##       results. 
## ----------------------------------------------------------------------
import arcpy
import SSUtilities
from sys import argv

# Set the environmental options 
from arcpy import env # Bring in the workspace
arcpy.env.overwriteOutput = True
arcpy.env.addOutputsToMap = True

# Script tool arguments (Input - Global variables)
blockLayer = arcpy.GetParameterAsText(0)
aggregateLayer = arcpy.GetParameterAsText(1)
populationField = arcpy.GetParameterAsText(2)
blockJoinField = arcpy.GetParameterAsText(3)
aggregateJoinField = arcpy.GetParameterAsText(4)

# Set the workspace of the feature layer to be dynamic
desc = arcpy.Describe(blockLayer)
workSpace = r"" + desc.path

# Make the feature layer for the aggregate layer
Aggregate_Layer_Feature_Layer = "aggregateLayer"
arcpy.management.MakeFeatureLayer(in_features=aggregateLayer, out_layer=Aggregate_Layer_Feature_Layer)

# Creata the join field small spatial layer in the larger spatial layer
Aggregate_Layer_Feature_Layer_JField = arcpy.management.AddField(in_table=Aggregate_Layer_Feature_Layer, field_name=blockJoinField, field_type="TEXT", field_is_required="NON_REQUIRED")[0] 

# Add the area field to the block field
Block_with_Area_Field = arcpy.management.AddField(in_table=blockLayer, field_name="Area", field_type="DOUBLE", field_is_required="NON_REQUIRED")[0]

# Calculate the added area field 
Block_Filled_Area_ = arcpy.management.CalculateField(in_table=Block_with_Area_Field, field="Area", expression="!shape.area@squaremiles!", expression_type="PYTHON_9.3")[0]

# Intersect the block and aggregate layers 
Aggregate_Block_Intersect_ = workSpace + "\\" + "Block_Intersect" 
arcpy.analysis.Intersect(in_features=[[Block_Filled_Area_, ""], [Aggregate_Layer_Feature_Layer, ""]], out_feature_class=Aggregate_Block_Intersect_)

# Add the new area field to the intersected layer
Aggregate_Block_Intersect_Empty_New_Area_ = arcpy.management.AddField(in_table=Aggregate_Block_Intersect_, field_name="New_Area", field_type="DOUBLE")[0]

# Calculate the new area field  
Aggregate_Block_Intersect_Populated_Area_ = arcpy.management.CalculateField(in_table=Aggregate_Block_Intersect_Empty_New_Area_, field="New_Area", expression="!shape.area@squaremiles!", expression_type="PYTHON_9.3")[0]

# Add the new population field to the intersected layer
Aggregate_Block_Intersect_Empty_New_Pop_ = arcpy.management.AddField(in_table=Aggregate_Block_Intersect_Populated_Area_, field_name=populationField, field_type="LONG")[0]

# Use Areal Proportion to calculate the new population 
Aggregate_Block_Intersect_Filled_Population_ = arcpy.management.CalculateField(in_table=Aggregate_Block_Intersect_Empty_New_Pop_, field=populationField, expression=f"[{populationField}] * [New_Area] / [Area]", expression_type="VB")[0]

# Run summary statistics to aggregate the population to the aggregate layer
Aggregate_Population_Table = workSpace + "\\" + "AGG_TABLE" 
arcpy.analysis.Statistics(in_table=Aggregate_Block_Intersect_Filled_Population_, out_table=Aggregate_Population_Table, statistics_fields=[[populationField, "SUM"]], case_field=[aggregateJoinField])

# Join the table to the aggregate layer
Aggregate_Population_Layer_ = arcpy.management.AddJoin(in_layer_or_view=Aggregate_Layer_Feature_Layer, in_field=blockJoinField, join_table=Aggregate_Population_Table, join_field=aggregateJoinField, join_type="KEEP_ALL")[0] 

# Create Output Text Table
# So the input and output can be reported in the tool report window
header = "Create Unique Value Dbase file"
# Report the input list of parameters first
row1 = [ "The Block Layer: ", blockLayer ]
row2 = [ "The Aggregate Layer: ", aggregateLayer  ]
row3 = [ "The Output Dbase File Name: ", Aggregate_Population_Table ]
total = [ row1, row2, row3 ]

# Construct a table so it can be reported in the tool result window
tableOut = SSUtilities.outputTextTable(total,header=header,pad=1)
arcpy.AddMessage(tableOut)

</code></pre></div></div> <br>

<p> To enable the script to function like a geoprocessing tool in ArcGIS Pro, several parameters must be defined under the script’s property settings. </p> <br>

  <ol>
    <li> In ArcGIS Pro, create a new toolbox in the Catalog pane. </li>
    <li> Right-click the toolset and select New > Script. </li>
    <li> Copy the Python code from IDLE and paste it into the newly created script. </li>
    <li> Save the script. </li>
  </ol> <br>


<p> Once the script is saved, the necessary parameters can be defined through the script's properties to allow for input and output handling, ensuring it functions as a geoprocessing tool within ArcGIS Pro.</p> <br>

<h3> Setting up the Script Parameters </h3> <br>

<p> Each variable that uses the "arcpy.GetParameterAsText" function must be defined for the script to be fully functional. For both spatial layers, the input parameters must be assigned the "Feature Layer" data type. The remaining three parameters are field inputs, which should be defined as appropriate field types (Figure 3).  </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/ctqad00.jpg" style="width:100%;max-width:625px"> 
<figcaption> Figure 3. The Parameter Settings for the Python Script inside ArcGIS Pro </figcaption>
</figure> <br>

<h3> Some Cartographic Products Created with Areal Proportion Analysis </h3> <br>

<p> The most obvious example of the use of areal proportion analysis is working with census geographies smaller than the county level. These applications are detailed in my <a href="https://andrew-jones657.github.io/Site_Selection"> Site Selection project</a> and <a href="https://andrew-jones657.github.io/tutorials/CensusData"> Census Data tutorial</a>.  </p> <br>

<p> This python script was particularly useful in the Site Selection project. In it, I had to use areal proportion multiple times: three times to create the population change map on the census block group level (2000 – 2010, 2010 – 2020, 2000 – 2020). In doing so, I was able to estimate the population change in Warren County, KY for my Site Selection project. Areas with positive growth were weighed higher as site selection criteria.  </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/RVkydLo.jpg" style="width:100%;max-width:625px"> 
<figcaption> Figure 4. Estimated Population Change between 2000 and 2020 in Warren County </figcaption>
</figure> <br>

<p> In the same Site Selection project, I applied service area analysis multiple times for each candidate fire station. To view the population within each distance break, areal proportion analysis was used repeatedly (more than 5 times) to estimate census block values aggregated to the distance bands. Simply put, this is another example of why automating repetitive geospatial workflows is so valuable. </p> <br>

<h3> List of Figures </h3> <br>

Figure 1. A Visual Depiction of Areal Proportion Analysis <br>
Figure 2. A Modelbuilder depiction of the Areal Proportion Analysis Workflow <br>
Figure 3. The Parameter Settings for the Python Script inside ArcGIS Pro <br>
Figure 4. Estimated Population Change between 2000 and 2020 in Warren County <br>

<h3> References </h3> <br>
<p class="reference"> <em>What is ArcPy?—ArcGIS Pro | Documentation</em>. (n.d.). <a href="https://pro.arcgis.com/en/pro-app/latest/arcpy/get-started/what-is-arcpy-.htm"> https://pro.arcgis.com/en/pro-app/latest/arcpy/get-started/what-is-arcpy-.htm</a> </p>

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
