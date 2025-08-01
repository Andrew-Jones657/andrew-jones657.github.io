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
       border: 1px solid #444444;
       min-height: 450px;
       min-width: 625px;
    }
        #myImg {
  border-radius: 1px;
  cursor: pointer;
  transition: 0.3s;
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
    
  #myImg:hover {
  opacity: 0.7;
        }

  figure figcaption {
  text-align: center;  
  }

figcaption {
  text-align: center;
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

<h1 style="text-align:center;"> Leaflet and Open Web Mapping </h1> <br>

<p> Open source web mapping applications like Leaflet play a crucial role in democratizing access to mapping technology and spatial data visualization. They empower developers, businesses, and communities to create interactive maps that are customizable, scalable, and adaptable to diverse needs. Leaflet, with its lightweight and modular design, offers a user-friendly platform for displaying geographical information on websites and mobile applications. Its extensive plugin ecosystem further enhances functionality, allowing integration with various data sources and advanced spatial analysis tools. By leveraging open source technologies like Leaflet, users can innovate freely, collaborate globally, and harness the power of spatial data to solve real-world challenges in fields ranging from urban planning and environmental management to logistics and tourism. </p> <br>

<p> There are often times when it is advantageous to disseminate data in a dynamic, interactive web map rather than a static map file or paper map. A major reason is scalability, or the ability for the user to zoom in and out of the map to capture details at various scales that could not be replicated on a static map -- this can be enormously useful in displaying dense datasets such as census blocks or clustered points. Web maps can also display multimedia (audio, images, video), whereas static maps are limited to what is printed on the map at the time of its publication. Last, web maps can be customized to display multiple different spatial datasets or layers that may be too cumbersome for a single static map. Nevertheless, static maps still have their place. When it comes to displaying a single detailed snapshot of a phenomena at an optimized spatial scale, they can be quite effective. Web map development also requires a moderate level of proficiency in JavaScript. This will become apparent when attempting to replicate features from ArcGIS or QGIS. </p> <br>

<p> In this tutorial, a simple choropleth Leaflet web map will be created. The aim is to incorporate some of Leaflet's primary features such as a basemap, geojson layer, renderers to symbolize data, and pop-up features to make the map more informative. In an effort to incorporate different kinds of data, the example dataset consists of state level educational attainment data from the 2022 American Community Survey (ACS). The goal is to map out the percentage of the population with a Bachelor's degree or higher. As a point of reference, this tutorial is based on and modifies the code from the Leaflet <a href="https://leafletjs.com/examples/choropleth/"> choropleth map tutorial</a> from Volodymyr Agafonkin, Leaflet's creator. Naturally, there are some additional steps and different design choices that warrant creating this tutorial.  </p> <br>

<h3> Some Basic Assumptions in Web Mapping </h3> <br>

<p> Compared to ArcGIS Pro or QGIS, where large projects may be laden with different types of datasets, web maps are much more minimal and typically focus on displaying a single theme. Since the map data must be transferred over the web, it should be kept in mind that large datasets can take a long time to load for the end user. This is also why shapefiles and feature classes, commonly used in ArcGIS Pro, are less frequent in front-end web APIs. These file formats can become quite large, and their multi-file structure makes them unwieldy for web mapping. More commonly used for web mapping are the GeoJSON (Geographic JavaScript Object Notation) and KML (Keyhole Markup Language) formats, as both are lightweight and have relatively simple structures.  </p>

For this particular tutorial, <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/LeafletTutorial/US_States_Bach.geojson">this processed dataset of the 50 US States with Bachelor's Degree data</a>. It was obtained from the U.S. Census TIGER Lines website, with ACS educational attainment data added via a table join, and then converted to a GeoJSON file (<a href="/tutorials/CensusData"> a separate tutorial is available for this workflow </a>). It should be noted that for uploading to GitHub, it is best to keep the file size under 10 MB.

<h3> Basic Javascript for Leaflet </h3> <br>

<p> For web maps, most of the customization work is done using JavaScript. JavaScript, along with HTML and CSS, are core languages of the web and are used in the vast majority of websites worldwide. Each of these languages can be considered front-end languages, responsible for creating the visual elements with which the user interacts. To minimize errors, it is typically best for a simple web map to be started, with features added one by one. If an error does occur, the cause is not always immediately clear, so adding small pieces of code gradually makes troubleshooting more straightforward.</p> <br>

<p> To start, these tags must be placed in the "head" element of the HTML in order for Leaflet and AJAX to be called. </p>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/AyzdnAZ.jpeg" alt="Leaflet Tags" style="width:100%;max-width:625px">
<figcaption> Figure 1. The HTML Tags to Call Leaflet </figcaption>
</figure> <br>

<p> Additionally, some CSS should be created to add design and size to the web map. This CSS must be placed inside the "head" element, before the "script" tags shown in Figure 1 above. 

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/VXnjkpJ.jpeg" alt="Leaflet CSS" style="width:100%;max-width:625px">
<figcaption> Figure 2. The Basic CSS Design for Leaflet </figcaption>
</figure> <br>


<p> The code below is used to create a basic Leaflet web map of the 50 US States and the District of Columbia. The map and map object are created by the first line, which can later be used with other codes. The setView command is appended to the map creation to position the map over the 50 contiguous states. Next, a tile layer is loaded into Leaflet, with OpenStreetMaps being used in this case. This layer is employed as a backdrop and point of reference for the other layer that will be input. In this instance, the other layer is a geojson file of the 50 US States and Washington D.C. If this layer had been hosted on a web server, the script could have been simply loaded into Leaflet. However, since it is being loaded from a GitHub repository, an additional extension is required to easily extract the geojson from a URL. The Leaflet Ajax extension is used for this purpose, simplifying the process of creating another script. The direct URL to the geojson is stored in a variable, and then it is instantiated into the map using a specific Leaflet Ajax command. </p> <br>

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
<figcaption> Figure 3. The Javascript for the Basic Leaflet Web Map </figcaption>

<h3> The Basic Web Map on Codepen </h3> <br>

<p> To see how the HTML, CSS, and JavaScript work individually, CodePen can be used to display the work-in-progress map (Figure 4). On the left side, the different languages that form the basic map can be viewed. On the right side, it can be observed that the map has been successfully rendered. Two additional instances of CodePen will be used to display progress as the web map is developed.  </p> <br>

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="xxoOGvX" data-pen-title="Leaflet Tutorial 1" data-user="aj65714" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/aj65714/pen/xxoOGvX">
  Leaflet Tutorial 1</a> by Andrew (<a href="https://codepen.io/aj65714">@aj65714</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script> 
<figcaption> Figure 4. The Basic Leaflet Web Map on CodePen </figcaption> <br>

<p> Looking at how the entire script is written in one file, Figure 5 below depicts how the entire script works together. Typically, to maintain organization, the JavaScript portion is loaded as a separate file. To view the script, right-click on the web page and select "View Page Source" from the dropdown menu. This will open the HTML, CSS, and JavaScript for the webpage. </p> <br>


<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/XaJTK4I.jpeg" alt="Leaflet Step 1 " style="width:100%;max-width:625px">
<figcaption> Figure 5. A Snapshot Look at the Entire Code for the Basic Leaflet Web Map </figcaption>
</figure> <br>


<h3> Editing the Web Map to Display Information about the Geojson Layer </h3> <br>

<p> The basic Leaflet instance has been successfully initialized, and the geojson layer appears to be functioning. However, the map is not particularly useful yet, as it does not visualize any data or convey information about educational attainment rates to the viewer.</p> <br>

<p> Enhancements will be needed to make the web map more informative. Since educational attainment rates are percentages, a choropleth map would be an effective way to display this data. Additionally, pop-up text bubbles can be created to show the percentage of adults over 25 with a Bachelor's degree or higher in each state. </p> <br>

<p> Two functions are used to add color to the map’s educational attainment data. Both functions are set to "return" their outputs to the global scope; otherwise, their values could not be accessed later in other functions. The first function, getColor(d), is a simple method for assigning shades of purple to different data intervals — higher values are shaded in darker purple. In this case, the values were extracted from a quantile classification of the same data in ArcGIS Pro and rounded. The d input variable serves as a placeholder for a set of values, and the "?" symbol is shorthand for an if-else statement (e.g., if the value of d is greater than 21, the hex color #9e9ac8 is used). The final hex color code is applied to all other values. To generate the hex values for the purple color ramp, <a href="https://colorbrewer2.org/#type=sequential&scheme=Purples&n=7">Colorbrewer</a> was used. </p> <br>

<p> The second function acts as a general renderer that uses the "getColor" function to fill in the colors. It inputs the educational attainment data into the "getColor" function and replaces the "d" input variable accordingly. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
function getColor(d) {
    		return d > 24  ? '#4a1486' :
           	       d > 23  ? '#6a51a3' :
       		       d > 22  ? '#807dba' :
           	       d > 21  ? '#9e9ac8' :
           	       d > 19  ? '#bcbddc' :
           	       d > 17  ? '#dadaeb' :
           	       d > 13  ? '#f2f0f7' :
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
</code></pre></div></div> 
<figcaption> Figure 6. Creating the Choropleth Map Symbology with JavaScript </figcaption> <br>

<p> Next, pop-up text bubbles will be created to allow users to view the percentage of adults over 25 holding a Bachelor's degree or higher in each state. This is achieved using the "onEachFeature" function, which will be added as a parameter to the "L.GeoJSON.AJAX(geojsonurl).addTo(map);" line. The "onEachFeature" function takes the geojson layer and its field values as inputs. The "feature.properties" are accessed through conditional logic, allowing the feature values in the geojson layer to be called within the popup. The "layer.bindPopup" option is used to create the pop-up itself. </p> <br>

<p> The content within the pop-up consists of strings concatenated with blank spaces and the feature properties from the geojson layer. Line breaks, denoted by "</br>", are used to separate the different pieces of text within the pop-up, improving readability. </p> <br>

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
</code></pre></div></div> 
<figcaption> Figure 7. Creating the Basic Popups for each State with JavaScript </figcaption> <br>

<p> It is important to ensure that the "style" and "onEachFeature" functions are applied to the geojson layer. This can be accomplished by including these functions as parameters within the "L.GeoJSON.AJAX" command. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
        // Provide the geoJSON layer 
        const geojsonLayer = new L.GeoJSON.AJAX(geojsonurl, {
		style,
		onEachFeature: onEachFeature
	}).addTo(map);
</code></pre></div></div> 
<figcaption> Figure 8. Applying the Style and onEachFeature Functions to the AJAX GeoJSON Load </figcaption> <br>

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="MWMjmMY" data-pen-title="Leaflet Tutorial Step 2" data-user="aj65714" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/aj65714/pen/MWMjmMY">
  Leaflet Tutorial Step 2</a> by Andrew (<a href="https://codepen.io/aj65714">@aj65714</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script> 
<figcaption> Figure 9. The Work in Progress Leaflet Web Map </figcaption> <br>

<p> This product is now more useful than the initial version. The percentage of Bachelor's degree holders over 25 is displayed as a choropleth map, and the pop-ups provide the exact percentage of Bachelor's attainment in each state. However, there are a few more features that could further enhance the map's usability and presentation. The web map could use a title with pop-up data, legend, data attribution element, and fullscreen option.  </p> <br>

<h3> Refining the Web Map for the Final Iteration </h3> <br>

<p> Starting with a title, a few changes can be implemented here. To begin, context can be provided to the user through the addition of a title. Since the current pop-up method is somewhat cumbersome (e.g., requiring clicks on each state to see data), the pop-ups can be integrated into the title by adding a mouse hover event listener. The margin of error for the educational attainment data can also be included in the title. </p> <br>

<p> First, since these are new, custom-defined elements, some CSS needs to be added to the style section. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
	// Some css for the title/pop up element we wish to create
	.info { 
	padding: 6px 8px; font: 14px/16px Arial, Helvetica, sans-serif; background: white; background: rgba(255,255,255,0.8); 
	box-shadow: 0 0 15px rgba(0,0,0,0.2); border-radius: 5px; } 
	.info h4 { margin: 0 0 5px; color: #777; }
</code></pre></div></div> 
<figcaption> Figure 10. Additional CSS for the Title and Hover Popup Dynamic HTML Box </figcaption>

<p> Next, the title and pop-ups can be configured. Several different functions need to be defined for this process. First, to create the box for the title and pop-ups, a control structure must be established using the "L.control()" command. This command instructs Leaflet to include a particular element, such as zoom buttons, a scale bar, a layer toggle, etc. In this case, however, the control structure is a custom-defined element..  </p> <br>

<p> The following portion is more complex. A function needs to be created that will generate and update a new "div" element on the web map. This is achieved using "L.DomUtil.create()". DOM (Document Object Model) serves as a universal Application Programming Interface (API) for managing dynamic HTML. The variable this is assigned a "_div" element, which is then given the "update()" function in the subsequent line. Finally, it is returned so that it affects the script globally (i.e., it actually updates the title and pop-up text element).  </p> <br>

<p> Now, the pop-up information beneath the title can be populated. This is done by adding the "update" option to the "info" variable. A function is created that takes in the properties of the geojson layer, and its contents are defined within the "contents" variable.   </p> <br>

<p> Finally, the new title and popup info are added to the map. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
	// Leaflet control structure that shows state info on hover
	const info = L.control();

	// Create a text bubble element on the top right part of the map using the DomUtil method
	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

  	// Fill in the empty text bubble on the top right part of the map with information from the geojson dataset 
	info.update = function (props) {
		const contents = props ? `<b>${props.NAME}</b><br />${props.PER_BACH}% (${props.MOE}% Margin of Error)` : 'Hover over a state';
		this._div.innerHTML = `<em>Percentage of Population over 25 with <br> a Bachelor's Degree or Higher in 2022</em>${contents}`;
	};

	// Add the pop up data viewer to the top right part of the map
	info.addTo(map);

	</code></pre></div></div> 
 	<figcaption> Figure 11. Creating a Control Structure for the Title and Popups </figcaption> <br>

<p> Next, some highlight features can be written. These will consist of three different functions that involve a user's mouse click or touch on a smart device, with the "e" input variable representing the mouse action. The last function should be familiar, as it is the "onEachFeature" function.  </p> <br>

<p> The first function, "highlightFeature(e)", is used to highlight the state that is being hovered over by the user. First, the current position of the mouse or touch is stored as a "layer". Then, stylized options, similar to those of a renderer, are applied to that "layer". The "layer.bringToFront();" function ensures that the layer does not appear behind the current geojson layer. Finally, the underlying information from the geojson layer is used to update the title and pop-up dynamic HTML. </p> <br>

<p> The second function, "resetHighlight(e)", disables the highlight on the current state when the user hovers over another state. This function is fairly straightforward: the geojson layer is appended with the "resetStyle(e.target)" function, and the title and pop-up dynamic HTML are updated using the "update()" function. </p> <br>

<p> The third function, "zoomToFeature(e)", is used to zoom into a state when it is clicked by the user. This function is also straightforward, as a Leaflet map command is used to fit the web map to the boundary. The user's mouse click and the built-in "getBounds()" function serve as input parameters. </p> <br>

<p> The final function should be familiar, as it invokes the "onEachFeature" function. The previous "onEachFeature" function can be deleted and replaced with this one. </p> <br>
 
<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>

 	// Make the geojson layer highlightable and set the style of the highlights
	function highlightFeature(e) {
		const layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7
		});

		layer.bringToFront();

		info.update(layer.feature.properties);
	}

 	// Reset the currently selected highlights when the user hovers to another state
	function resetHighlight(e) {
		geojsonLayer.resetStyle(e.target);
		info.update();
	}

	// Zoom on a state when it is clicked on
	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	// Create popups and bind the Name and Percent Bachelor Degree Holder fields from the geojson file to the popups. You can paste this over the previous "onEachFeature" function.
        function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}

</code></pre></div></div> 
<figcaption> Figure 12. Configuring the Mouse Hover Popups  </figcaption> <br>

<p> Next, a legend can be created and added to the map. As with the title and pop-ups, this will be done using a control structure. </p> <br>

<p> Similarly to the title and pop-up dynamic HTML, some CSS will be needed to style the legend and ensure that it is properly positioned and formatted on the map. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
	
	// some css for the legend element
	.legend { text-align: left; line-height: 18px; color: #555; } 
	.legend i { width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.8; }
 
</code></pre></div></div> 
<figcaption> Figure 13. CSS for the Legend Element </figcaption> <br>

<p> This next portion is a little more difficult. To set up the elements in the legend, another control structure needs to be created. Again, a legend function can be described via the DOM Util method; however, some consideration must be given to how this will work. To start, the break values for the legend are assigned to a list variable called "grades." Next, a title for the legend is created using the "push" command. For this to work, an empty list called "labels" is used to receive the "push" command as input.  </p> <br>

<p> Creating the legend values requires additional work. Since the data is represented in intervals, it would be ideal for the user to see both the lower and upper breaks for each interval. A method must be devised to allow these lower and upper breaks to appear on the legend. This is accomplished by creating "from" and "to" variables. Once these variables are declared, a "for" loop is created to iterate through each data interval. The length of the "grades" list, or seven units, is used to iterate through each lower and upper break, forming the intervals that will be displayed on the legend. </p> <br>

<p> These breaks are then pushed as labels to the dynamic HTML, with descriptive div elements used to format how the message should appear. To tie the dynamic HTML into the control structure, the "div.innerHTML" is updated by joining the "labels" array using the "labels.join('<br>')" parameter. Finally, the div element is returned at the global level. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>

	// Define a function that creates a legend similar to the hover text bubble earlier. The break points for the     
	// choropleth map are manually input as grades, and a title for the legend is first added to the legend using   
	// the push command. Then, "from" and "to" are defined within the function to create intervals for each  classification level. To push these intervals as labels  
	// a for loop is used to iterate through each case sequentially. The final labels are then joined back in with line breaks as html and then returned.
	legend.onAdd = function (map) {

		const div = L.DomUtil.create('div', 'info legend');
		const grades = [13, 16, 19, 21, 22, 23, 25];
		let labels = [];
		labels.push(
			`<div ><p class='legend-title'>% Bachelor's <br> Attainment </p></div>`
		);
		let from, to;

		for (let i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(`<i style="background:${getColor(from + 1)}"></i> ${from}${to ? `&ndash;${to}%` : '%+'}`);
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

	// Add the legend to the map
	legend.addTo(map);
 
</code></pre></div></div> 
<figcaption> Figure 14. Creating a Control Structure for the Legend </figcaption> <br>

<p> Another useful feature is a link to the web map's ACS dataset. This can be created using the same DOM Util method as the other elements. </p> <br>

<p> As with the other dynamic HTML elements, some CSS will be needed to style the link. This CSS is essentially the same as the styling used for the title and pop-up elements, ensuring consistency across all dynamic features on the map. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>

 	//some css for the legend element
	.dataSource { 	padding: 6px 8px; font: 14px/16px Arial, Helvetica, sans-serif; background: white; background: rgba(255,255,255,0.8); 
	box-shadow: 0 0 15px rgba(0,0,0,0.2); border-radius: 5px;  }

 </code></pre></div></div> 
 <figcaption> Figure 15. CSS for the Data Source Element </figcaption> <br>

 <p> This next portion should look familiar to the previous one. Another data control structure is used, this time positioned in the bottom-left part of the screen. Since the legend breaks are not a concern here, the code is much simpler in comparison. An empty list, "dSource", is created, and then the text is inserted using "dSource.push()". In this list, the "Data Source" caption and the link to the ACS dataset are placed. Afterward, the list is joined with "innerHTML", returned to the global scope, and added to the map.  </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
	
	// Assign a control on the bottom left part of the web map for the data source
	const dataSource = L.control({position: 'bottomleft'});
 
	// Create a data source element with the DOM Util method
	dataSource.onAdd = function (map) {

		const div = L.DomUtil.create('div', 'info dataSource');
		let dSource = [];
		dSource.push(
			`<div ><p style='data-source'><p> Data Source:</p> <a href="https://data.census.gov/table/ACSDP5Y2022.DP02?g=010XX00US$0400000&y=2022&d=ACS%205-Year%20Estimates%20Data%20Profiles">ACS 2022 5-Year <br> Estimates Data Profile</a></p></div>`
		);

		div.innerHTML = dSource.join('<br>');
		return div;

	};
 
	// Add the data source to the map
	dataSource.addTo(map);


</code></pre></div></div> 
 <figcaption> Figure 16. Creating a Control Structure for the Data Source Element  </figcaption> <br>

<p> Finally, a fullscreen option can be added to the web map. Normally, this would be a complex procedure, as writing a new fullscreen script would warrant its own tutorial. Fortunately, a downloadable extension by GitHub user Brunob provides this functionality efficiently. Similar to the Leaflet tags, the fullscreen extension requires some HTML tags to be loaded. </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/5D4P4ZO.jpeg" alt="Leaflet HTML Final" style="width:100%;max-width:625px">
<figcaption> Figure 17. The Final Leaflet HTML Tags </figcaption>
</figure> <br>

<p> The implementation of the control structure for the fullscreen option is relatively simple. Creating the control structure and adding it to the map should be familiar by now. The two new components involve console log parameters, which are used to trigger the "window.console" and "window.console.log" methods. These parameters will cause a text message to appear when fullscreen mode is enabled. The "window.console" is invoked using conditional logic, allowing the "window.console.log" message to be written to the console. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>

      // create fullscreen control
      var fsControl = L.control.fullscreen();

      // add fullscreen control to the map
      map.addControl(fsControl);

      // detect fullscreen toggling
      map.on('enterFullscreen', function(){
      		if(window.console) window.console.log('enterFullscreen');
      });

      map.on('exitFullscreen', function(){
		if(window.console) window.console.log('exitFullscreen');
      });

</code></pre></div></div> 
<figcaption> Figure 18. Implementing the Fullscreen Exentsion  </figcaption> <br>

<h3> The Final Product </h3> <br>

<p> Having completed the final adjustments, the product can now be posted on CodePen. </p> <br>

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="JjQKLqe" data-pen-title="Leaflet Final" data-user="aj65714" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/aj65714/pen/JjQKLqe">
  Leaflet Final</a> by Andrew (<a href="https://codepen.io/aj65714">@aj65714</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script> 
<figcaption> Figure 19. The Final Leaflet Web Map </figcaption> <br>

<p> It should be noted that there is a known issue with embedding Leaflet maps on GitHub Pages. It is possible that the edges of the tile layers may display thick white borders, and the GeoJSON layer may not align properly with the reference points on the tile layer (Figure 20). </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/3XZuK1d.jpeg" alt="Leaflet Issue" style="width:100%;max-width:625px">
<figcaption> Figure 20. The White Tile Edge Issue with Leaflet Maps on GitHub </figcaption>
</figure> <br>


<p> It may be possible to correct this with <a href="https://github.com/Leaflet/Leaflet.TileLayer.NoGap"> this script</a> from Ivan Sanchez.  </p> <br>



<h3> List of Figures and Tables </h3>
<p> Figure 1. The HTML Tags to Call Leaflet  </p>
<p> Figure 2. The Basic CSS Design for Leaflet  </p>
<p> Figure 3. The JavaScript for the Basic Leaflet Web Map </p>
<p> Figure 4. The Basic Leaflet Web Map on CodePen </p>
<p> Figure 5. A Snapshot Look at the Entire Code for the Basic Leaflet Web Map </p>
<p> Figure 6. Creating the Choropleth Map Symbology with JavaScript </p>
<p> Figure 7. Creating the Basic Popups for each State with JavaScript </p>
<p> Figure 8. Applying the Style and onEachFeature Functions to the AJAX GeoJSON Load </p>
<p> Figure 9. The Work in Progress Leaflet Web Map </p>
<p> Figure 10. Additional CSS for the Title and Hover Popup Dynamic HTML Box  </p>
<p> Figure 11. Creating a Control Structure for the Title and Popups </p>
<p> Figure 12. Configuring the Mouse Hover Popups </p>
<p> Figure 13. CSS for the Legend Element </p>
<p> Figure 14. Creating a Control Structure for the Legend </p>
<p> Figure 15. CSS for the Data Source Element </p>
<p> Figure 16. Creating a Control Structure for the Data Source Element </p>
<p> Figure 17. The Final Leaflet HTML Tags </p>
<p> Figure 18. Implementing the Fullscreen Exentsion  </p>
<p> Figure 19. The Final Leaflet Web Map </p>
<p> Figure 20. The White Tile Edge Issue with Leaflet Maps on GitHub </p>

<div class="wysiwyg lengthy" > <h3> References </h3> <br>

<p> Agafonkin, V. (n.d.).<em>Interactive Choropleth Map - Leaflet - a JavaScript library for interactive maps</em>. Leafletjs. <a href="https://leafletjs.com/examples/choropleth/">https://leafletjs.com/examples/choropleth/</a> </p> <br>

<p> Sanchez, I. (n.d.).<em> GitHub - Leaflet/Leaflet.TileLayer.NoGap: Experiment trying to get rid of the 1px gap between tiles</em>. GitHub. <a href="https://github.com/Leaflet/Leaflet.TileLayer.NoGap"> https://github.com/Leaflet/Leaflet.TileLayer.NoGap</a> </p> <br>

<p> Brunob. (n.d.). <em> GitHub - brunob/leaflet.fullscreen: Leaflet.Control.FullScreen for Leaflet</em>. GitHub.<a href="https://github.com/brunob/leaflet.fullscreen"> https://github.com/brunob/leaflet.fullscreen</a> </p> <br>

<p> Brewer, C., Harrower, M., & The Pennsylvania University. (n.d.).<em> ColorBrewer: Color advice for maps</em>. https://colorbrewer2.org/#type=sequential&scheme=Purples&n=7 </p>

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
  

