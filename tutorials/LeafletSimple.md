<html lang="en-US">

<head>
    <meta charset='utf-8'>
    <meta http-equiv= "X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,maximum-scale=2">
    <style>
    body {
       margin: 0;
       padding: 0;
    }
    html, body, #map{
       width: 100%;
       height: 100%;
       border: 2px;
    }
        #myImg {
  border-radius: 1px;
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

  <style>#map { width: 800px; height: 500px; }
	.info { 
	padding: 6px 8px; font: 14px/16px Arial, Helvetica, sans-serif; background: white; background: rgba(255,255,255,0.8); 
	box-shadow: 0 0 15px rgba(0,0,0,0.2); border-radius: 5px; } 
	.info h4 { margin: 0 0 5px; color: #777; }
	.legend { text-align: left; line-height: 18px; color: #555; } 
	.legend i { width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.8; }
	.dataSource { 	padding: 6px 8px; font: 14px/16px Arial, Helvetica, sans-serif; background: white; background: rgba(255,255,255,0.8); 
	box-shadow: 0 0 15px rgba(0,0,0,0.2); border-radius: 5px;  }
   </style>
  
 <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>

 <!-- Make sure you put this AFTER Leaflet's CSS -->

 <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet-ajax/2.1.0/leaflet.ajax.min.js"></script>
  
  <link rel="stylesheet" href="https://unpkg.com/leaflet.fullscreen@latest/Control.FullScreen.css" />
  <script src="https://unpkg.com/leaflet.fullscreen@latest/Control.FullScreen.js"></script> 
  
</head>

<body>

<h3> Why Web Mapping is Essential </h3>

<p> Open source web mapping applications like Leaflet play a crucial role in democratizing access to mapping technology and spatial data visualization. They empower developers, businesses, and communities to create interactive maps that are customizable, scalable, and adaptable to diverse needs. Leaflet, with its lightweight and modular design, offers a user-friendly platform for displaying geographical information on websites and mobile applications. Its extensive plugin ecosystem further enhances functionality, allowing integration with various data sources and advanced spatial analysis tools. By leveraging open source technologies like Leaflet, users can innovate freely, collaborate globally, and harness the power of spatial data to solve real-world challenges in fields ranging from urban planning and environmental management to logistics and tourism. </p> <br>

<p> In this tutorial, we will be creating a simple Leaflet web map. The aim is to incorporate some of Leaflet's primary features: we weill use a basemap, markers, renderers to symbolize data, and pop-up features to make the map more informative. In an effort to incorporate different kinds of data, we will be looking at state level educational attainment data from the American Community Survey (ACS). The goal is to map out the percentage of the population with a Bachelor's degree or higher. As a point of reference, this tutorial is based on the <a href="https://leafletjs.com/examples/choropleth/"> chloropleth map tutorial</a> from Leaflet. Naturally, there are some additional steps and different design choices that warrant creating this tutorial.  </p> <br>

<h3> Some Basic Assumptions in Web Mapping </h3> <br>

<p> If you have not made a web map before, it is important to describe the thought process that goes into creating them. Compared to ArcGIS Pro or QGIS, where you may have massive projects laden with different types of large datasets, web maps are much more minimal and typically focused on displaying a single theme. Since the map data has to tranfer over the web, one must be mindful of how large datasets can take a long time to load for the end user. This is also why shapefiles and feature classes, often used in ArcGIS Pro, are not as common on front end web APIs. These files formats can become quite large and their multi file format makes them unwieldy to use for web mapping. More common for web mapping are the geojson (geographic javascript object notation) and KML (Keyhole Markup Language) formats, as they are both lightweight and have a fairly simple structure.  </p>

<p> For this particular tutorial, you can use <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/LeafletTutorial/US_States_Bach.geojson">this processed dataset of the 50 US States with Bachelor's Degree data</a>. I obtained it from the US Census TIGER Lines website, added the ACS educational attainment data via a table join, and then converted it to a geojson file (<a href="/tutorials/CensusData">I have another tutorial for this workflow</a>). Initially the file was too big (~37 megabytes) to work with Leaflet. I had to go back to ArcGIS Pro and simplify the US States polygon to reduce its file size to one megabyte.  </p> <br>

<h3> Basic Javascript for Leaflet </h3> <br>

<p> For web maps, most of the customization work is done in javascript. Typically it is best to approach this by starting with a simple web map and adding features one by one to minimize errors.   </p> <br>

<p> The code below creates a basic Leaflet web map of the 50 US States and the District of Columbia. I have added lines to each comment to explain what they do. The first line creates the map and map object that can later be used with other codes -- the setView command is appended to the map creation to hover the map over the 50 contiguous states. Next, a tile layer is loaded into Leaflet -- in this case it is OpenStreetMaps. This layer serves as a backdrop and point of reference for the other layer that we will input. In this case, that other layer is a geojson file of the 50 US States and Washington D.C.. If this layer had been hosted on a web server, then we could simply load the script into Leaflet. Since we are loading it from a GitHub repository, however, we have to use an additional extension to easily extract the geojson from a url. This is where the Leaflet Ajax extension comes in -- it simplifies the process of having to come up with another script. The direct url to the geojson is stored in a variable, and then a specific Leaflet Ajax command instantiates it into the map. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>

// Create a map object and set the view (latitude-longitude) and zoom level
var map = L.map('map').setView([40.0491, -97.965], 4);

// Load in a Open Street Map tile layer to serve as a basemap and add it to the map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// the url for the geojson file
const geojsonurl = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/LeafletTutorial/US_States_Bach.geojson";
   
// Loads the geojson layer from the url into the map 
const geojsonLayer = new L.GeoJSON.AJAX(geojsonurl).addTo(map);

</code></pre></div></div> <br>

<h3> The Basic Web Map on Codepen </h3> <br>

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="xxoOGvX" data-pen-title="Leaflet Tutorial 1" data-user="aj65714" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/aj65714/pen/xxoOGvX">
  Leaflet Tutorial 1</a> by Andrew (<a href="https://codepen.io/aj65714">@aj65714</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script> <br> 

<p> Here is how the entire script looks. </p> <br>


<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/O3zmqLB.jpeg" alt="Leaflet Step 1 " style="width:100%;max-width:625px">
<figcaption> Figure 1. The Basic Leaflet Web Map </figcaption>
</figure> <br>


<h3> Going Back and Adding More Features </h3> <br>

<p> So far the outline of the states is displayed and Leaflet is functioning, which is a good starting point. This map is not particularly useful yet, as it does not visualize data or convey information to the viewer. </p> <br>

<p> Let's add some enhancements to make this web map more useful. Since we have percentages as our underlieing data, a chloropleth map would work well here. Additionally, we can create some pop ups that show the percentage of adults over 25 with a Bachelor's degree or higher. </p> <br>

<p> Starting with some color for the map, we can create this using two functions. The first, "function getColor(d)", is a straightforward means of assigning data intervals a shade of purple -- higher values are shaded in darker purple. In this case, I pulled the values off a quantile classification of the same data in ArcGIS Pro. The second function serves as a general renderer that uses the first to fill the color. </p>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
function getColor(d) {
    		return d > 24.3  ? '#4a1486' :
           	       d > 22.8  ? '#6a51a3' :
       		       d > 21.7  ? '#807dba' :
           	       d > 20.5  ? '#9e9ac8' :
           	       d > 19    ? '#bcbddc' :
           	       d > 16.7  ? '#dadaeb' :
           	       d > 13.4  ? '#f2f0f7' :
                      '#fcfbfd';
	}

function style(feature) {
    		return {
        		weight: 2,
        		opacity: 1,
        		color: 'white',
        		dashArray: '3',
        		fillOpacity: 0.7,
        		fillColor: getColor(feature.properties.PER_BACH)
          	};
	}
</code></pre></div></div> <br>

<p> We can also create a template for pop ups. This will allow users to see the percentage of adults over 25 holding a Bachelor's degree or higher for each state.  </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
// Create popups and bind the Name and Percent Bachelor Degree Holder fields from the geojson file to the popups
    function onEachFeature(feature, layer) {
  		    if (feature.properties) {
                		layer.bindPopup(
					'Percent of adults over the age of 25 in' + ' ' + feature.properties.NAME + ' ' + 'holding a Bachelors degree or higher:' + ' ' + feature.properties.PER_BACH + '%' +
                    			'</br>' + ' ' + '</br>' +
                                        'This measurement has a ±' + ' ' + feature.properties.MOE + '%' + ' ' + 'margin of error.');
  	            }
    }
</code></pre></div></div> <br>

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="MWMjmMY" data-pen-title="Leaflet Tutorial Step 2" data-user="aj65714" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/aj65714/pen/MWMjmMY">
  Leaflet Tutorial Step 2</a> by Andrew (<a href="https://codepen.io/aj65714">@aj65714</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script> <br>

<p> This product is more useful than what we had earlier, as we can see states that are shaded with a darker shade of purple have a higher percentage of Bachelor's degree holders over 25. The pop ups also provide a message telling us what the percentage is in each state. There are a few more features that would bolster this product however. The web map could use a title, legend, and easier way to view the underlying data in the pop ups.  </p> <br>

<h3> The Final Product </h3> <br>

<p> Having prepared the last few adjustments, we can now look at our final product on codepen and embedded into the website itself. </p> <br>

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="JjQKLqe" data-pen-title="Leaflet Final" data-user="aj65714" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/aj65714/pen/JjQKLqe">
  Leaflet Final</a> by Andrew (<a href="https://codepen.io/aj65714">@aj65714</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script> <br>


<h3> List of Figures and Tables </h3>
<p> Figure . </p>

<h3> References </h3> <br>

<p> https://leafletjs.com/examples/choropleth/ </p> <br>

<p> https://leaflet-extras.github.io/leaflet-providers/preview/ </p> <br>


<div id="map" style="width: 650px; height: 425px;">

<script src="/files/LeafletTutorial/LeafletTutorial.js"></script>  <br>


<div id="myModal" class="modal">
   <span class="close">&times;</span>
   <img class="modal-content" id="img01">
   <div id="caption"></div>   
</div> 

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
