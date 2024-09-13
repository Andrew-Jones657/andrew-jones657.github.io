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

<p> In this tutorial, the areal proportion analysis workflow will be automated. Areal proportion analysis involves examining the relative sizes of different spatial units within a geographic area to understand their distribution and impact. This analysis can be useful for estimating demographic characteristics between different sized geographic areas, such as census blocks and zip codes. </p> <br>

<p> This tutorial uses ArcPy and SSutilities, so it is specifically intended for ArcGIS Pro. Often, other GIS operations will pull in different libraries such as NumPy, GeoPandas, etc. </p> <br>

<h3> The workflow for Areal Proportion Analysis </h3> <br> 

<p> Before attempting to automate a GIS workflow, it is important to understand how the workflow functions. This is best done by manually executing the workflow in order to understand the steps and nuances that need to be taken, as well as which geoprocessing tools are involved.  </p> <br>

<p> Areal Proportion requires that there are two different spatial layers: one of them needs to be smaller in size with population (or numeric) values, while the other larger layer may be empty (i.e. no numeric values). In the smaller spatial layer, add a field called “AREA” and calculate its geometry in your desired unit (I recommend square miles). Next, intersect both the layers, and give the new layer an easily identifiable name. In the newly intersected layer, add a field called “NEWAREA” and calculate its geometry in the same unit used in the previous “AREA” field. Now, add yet another new field called “NEWPOP” and calculate it using this formula: “ [POP] * [NEWAREA] / [AREA]”. Now, the “NEWPOP” field needs to be summed up to the aggregated units in the larger spatial layer. This can be accomplished using the Summary Statistics tool, with the “NEWPOP” field being summed up to the original larger spatial layer. This new table can be called ____ POP TABLE. Finally, to save the changes on a permanent feature class, join the table to the larger spatial layer and export it as a new shapefile or feature class.  </p> <br>

<p> These steps can be seen in a modelbuilder simulation below (Figure 1). </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/XCFsAB4.jpeg" class="center" style="width: 625px"> 
<figcaption> Figure 1. A Modelbuilder depiction of the Areal Proportion Analysis Workflow </figcaption>
</figure> <br>

<h3> Writing the Script in Python </h3> <br>

<p> With the workflow established, a python script can be created. To write this script, it is important that a python interface, such as IDLE, is downloaded, as this will make the process easier. Since this article is intended for use with ArcGIS applications, this script will be written in ArcPy, though a similar script coulc be created in QGIS.  </p> <br>

<p> When working in a separate python interface, arcpy needs to first be imported to the script, this can be done by adding the command "import arcpy". "SSutilities" will also be imported to construct a results table that appears when the script has completed its run. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
import arcpy
import SSUtilities
</code></pre></div></div> <br>

<p> Next, it is important to set up the environment settings, which include the workspace, overwriting outputs, and adding outputs to the map. This can be achieved with these codes: </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
from arcpy import env # Bring in the workspace
arcpy.env.overwriteOutput = True
arcpy.env.addOutputsToMap = True
</code></pre></div></div> <br>

<p> At this point, it is important to consider what should be used as an input parameter. Certainly, the small and large spatial layers should be considered parameters. Similarly, if working with multiple numeric fields, there should be a specific field used in the analysis. Finally, a “to” and “from” join field should be identified to join the large layer with the intersected layer. These will be identified using the “arcpy.GetParameterAsText(n)” command. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
blockLayer = arcpy.GetParameterAsText(0)
aggregateLayer = arcpy.GetParameterAsText(1)
populationField = arcpy.GetParameterAsText(2)
blockJoinField = arcpy.GetParameterAsText(3)
aggregateJoinField = arcpy.GetParameterAsText(4)
</code></pre></div></div> <br>

<p> It is important to set the workspace for the feature layer to be dynamic, this can be done by using the “Describe” command. The 'r""' is used to assign a relative system path. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
desc = arcpy.Describe(blockLayer)
workSpace = r"" + desc.path
</code></pre></div></div> <br>

<p> The larger spatial layer needs to become a feature layer in order to edit it or use it in a geoprocessing workflow, this can be done with the aptly named “MakeFeatureLayer” command. First, it needs to be assigned a name, “aggregateLayer”, then the “MakeFeatureLayer” command from the "Management" toolbox can be used to create the feature layer. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
Aggregate_Layer_Feature_Layer = "aggregateLayer"
arcpy.management.MakeFeatureLayer(in_features=aggregateLayer, out_layer=Aggregate_Layer_Feature_Layer)
</code></pre></div></div> <br>

<p> At the end of the workflow, the table is joined back to the larger spatial layer. In order for this to work, a field needs to be added to the layer that matches the join field in the smaller spatial layer. This can be done with the “Management.Add_Field” command.  </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
Aggregate_Layer_Feature_Layer_JField = arcpy.management.AddField(in_table=Aggregate_Layer_Feature_Layer, field_name=blockJoinField, field_type="TEXT", field_is_required="NON_REQUIRED")[0] 
</code></pre></div></div> <br>

<p> An area field representing the area of each unit on the smaller spatial layer must be created.  </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
Block_with_Area_Field = arcpy.management.AddField(in_table=blockLayer, field_name="Area", field_type="DOUBLE", field_is_required="NON_REQUIRED")[0]
</code></pre></div></div> <br>

<p> Then, the area field is calculated with calculate geometry. To do this in python, the command !shape.area@squaremiles! is used. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
Block_Filled_Area_ = arcpy.management.CalculateField(in_table=Block_with_Area_Field, field="Area", expression="!shape.area@squaremiles!", expression_type="PYTHON_9.3")[0]
</code></pre></div></div> <br>

<p> Now, the two spatial layers can be intersected. This uses the “analysis.Intersect” option from Arcpy. Since this procedure will create a new feature layer, a system path needs to be assigned to the new file. The previous "workSpace" variable can be concatenated with a "\\" and a string, "Block_Intersect", that will serve as the new layer's name. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
Aggregate_Block_Intersect_ = workSpace + "\\" + "Block_Intersect" 
arcpy.analysis.Intersect(in_features=[[Block_Filled_Area_, ""], [Aggregate_Layer_Feature_Layer_JField, ""]], out_feature_class=Aggregate_Block_Intersect_)
</code></pre></div></div> <br>

<p> Again, a field representing the area of the intersected spatial layer is added.  </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
Aggregate_Block_Intersect_Empty_New_Area_ = arcpy.management.AddField(in_table=Aggregate_Block_Intersect_, field_name="New_Area", field_type="DOUBLE")[0]
</code></pre></div></div> <br>

<p> Likewise, the geometry of the added field is calculated.  </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
Aggregate_Block_Intersect_Populated_Area_ = arcpy.management.CalculateField(in_table=Aggregate_Block_Intersect_Empty_New_Area_, field="New_Area", expression="!shape.area@squaremiles!", expression_type="PYTHON_9.3")[0]
</code></pre></div></div> <br>

<p> Another field is added to contain the areal proportion population. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
Aggregate_Block_Intersect_Empty_New_Pop_ = arcpy.management.AddField(in_table=Aggregate_Block_Intersect_Populated_Area_, field_name=populationField, field_type="LONG")[0]
</code></pre></div></div> <br>

<p> Then, the field is calculated. To fit in the expression from the field calculator, “f” is used to denote the mathematical relationship in quotes, and visual basic is used for simplicity.  </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
Aggregate_Block_Intersect_Filled_Population_ = arcpy.management.CalculateField(in_table=Aggregate_Block_Intersect_Empty_New_Pop_, field=populationField, expression=f"[{populationField}] * [New_Area] / [Area]", expression_type="VB")[0]
</code></pre></div></div> <br>


<p> Approaching the end of the workflow, the summary statistics table now needs to be created. To create a table, a desktop path and a name need to be defined – like the “Block_Intersection” feature layer earlier. The “statistics” tool is another analysis tool: to choose a summation, write “SUM” by the statistics field. The group by which the field values will be summed is the “aggregateJoinField”, which is one of the user defined inputs. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
Aggregate_Population_Table = workSpace + "\\" + "AGG_TABLE" 
arcpy.analysis.Statistics(in_table=Aggregate_Block_Intersect_Filled_Population_, out_table=Aggregate_Population_Table, statistics_fields=[[populationField, "SUM"]], case_field=[aggregateJoinField])
</code></pre></div></div> <br>

<p> Finally, the join between the larger spatial layer and the summary statistics table can be performed.  </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
Aggregate_Population_Layer_ = arcpy.management.AddJoin(in_layer_or_view=Aggregate_Layer_Feature_Layer, in_field=blockJoinField, join_table=Aggregate_Population_Table, join_field=aggregateJoinField, join_type="KEEP_ALL")[0]
</code></pre></div></div> <br>

<p>  The analytical workflow is done at this point, though with the SSUtilities package, some general information on the tool can be produced. This will require creating a small table that details the input spatial layers as well as the output. This can be done with a few strings and lists.  </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
header = "Areal Proportion Analysis"
# Report the input list of parameters first
row1 = [ "The Block Layer: ", blockLayer ]
row2 = [ "The Aggregate Layer: ", aggregateLayer  ]
row3 = [ "The Output Dbase File Name: ", Aggregate_Population_Table ]
total = [ row1, row2, row3 ]
</code></pre></div></div> <br>

<p> To save the joined larger spatial layer, simply export it to a shapefile or geodatabase. The entire script is depicted below and can be downloaded <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/Python/AggPopEstimator.py"> here</a>.  </p> <br>


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

<p> For the script to function like a geoprocessing tool in ArcGIS Pro, several parameters need to be established under the script’s property settings. On ArcGIS Pro, create a new toolbox under the catalog pane. Right-click on the toolset and create a new script. Copy and paste the python code from IDLE into the new script and save it.  </p> <br>

<h3> Setting up the Script Parameters </h3> <br>

<p> Each of the variables that were assigned “arcpy.GetParameterAsText” need to be defined for the script to be usable. For both of the spatial layers, they must be input as a "feature layer" Data Type. The other three parameters are simply fields. The "Default" values  Figure 2 below depicts the parameter settings.  </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/ctqad00.jpg" class="center" style="width: 625px"> 
<figcaption> Figure 2. The Parameter Settings for the Python Script inside ArcGIS Pro </figcaption>
</figure> <br>

<h3> Some Cartographic Products Created with Areal Proportion Analysis </h3> <br>

<p> The most obvious example of the use of Areal Proportion Analysis is working with census geographies smaller than the county level. I detail these in my <a href="https://andrew-jones657.github.io/Site_Selection"> Site Selection project</a> and <a href="https://andrew-jones657.github.io/tutorials/CensusData"> Census Data tutorial</a>.  </p> <br>




<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/RVkydLo.jpg" class="center" style="width: 625px"> 
<figcaption> Figure 3. Estimated Population Change between 2000 and 2020 in Warren County </figcaption>
</figure> <br>


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
