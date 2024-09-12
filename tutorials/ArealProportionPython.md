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
<img src="https://i.imgur.com/XCFsAB4.jpeg" class="center" style="width: 625px"> 
<figcaption> Figure 1. A Modelbuilder depiction of the Areal Proportion Analysis Workflow </figcaption>
</figure> <br>

<h3> Writing the Script in Python </h3> <br>

<p> With the workflow established, a python script can be created. To write this script, it is important that a python interface, such as IDLE, is downloaded, as this will make the process easier. Since this article is intended for use with ArcGIS applications, this script will be written in ArcPy, though a similar script coulc be created in QGIS.  </p> <br>

<p>  </p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>


</code></pre></div></div> 

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
