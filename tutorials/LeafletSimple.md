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
    h3 {
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

<p> There are often times when it is advantageous to disseminate data in a dynamic, interactive web map rather than a static map file or paper map. A major reason is scalability, or the ability for the user to zoom in and out of the map to capture details at various scales that could not be replicated on a static map -- this can be enormously useful in displaying dense datasets such as census blocks or clustered points. Web maps can also display multimedia (audio, images, video), whereas static maps are limited to what is printed on the map at the time of its publication. Last, web maps can be customized to display multiple different spatial datasets or layers that may be too cumbersome for a single static map. Nevertheless, static maps still have their place. When it comes to displaying a single detailed snapshot of a phenomena at an optimized spatial scale, they can be quite effective. Web map development also requires a moderate level of proficiency in javascript. This will become apparent when attempting to replicate features from ArcGIS or QGIS. </p> <br>

<p> In this tutorial, a simple choropleth Leaflet web map will be created. The aim is to incorporate some of Leaflet's primary features such as a basemap, geojson layer, renderers to symbolize data, and pop-up features to make the map more informative. In an effort to incorporate different kinds of data, the example dataset consists of state level educational attainment data from the 2022 American Community Survey (ACS). The goal is to map out the percentage of the population with a Bachelor's degree or higher. As a point of reference, this tutorial is based on and modifies the code from the Leaflet <a href="https://leafletjs.com/examples/choropleth/"> choropleth map tutorial</a> from Volodymyr Agafonkin, Leaflet's creator. Naturally, there are some additional steps and different design choices that warrant creating this tutorial.  </p> <br>

<h3> Some Basic Assumptions in Web Mapping </h3> <br>

<p> Compared to ArcGIS Pro or QGIS, where you may have massive projects laden with different types of large datasets, web maps are much more minimal and typically focused on displaying a single theme. Since the map data has to tranfer over the web, one must be mindful that large datasets can take a long time to load for the end user. This is also why shapefiles and feature classes, often used in ArcGIS Pro, are not as common on front end web APIs. These files formats can become quite large and their multi file format makes them unwieldy to use for web mapping. More common for web mapping are the geojson (geographic javascript object notation) and KML (Keyhole Markup Language) formats, as they are both lightweight and have a fairly simple structure.  </p>

<p> For this particular tutorial, you can use <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/LeafletTutorial/US_States_Bach.geojson">this processed dataset of the 50 US States with Bachelor's Degree data</a>. I obtained it from the US Census TIGER Lines website, added the ACS educational attainment data via a table join, and then converted it to a geojson file (<a href="/tutorials/CensusData">I have another tutorial for this workflow</a>). Note that it is best to have a small file size (10 mb or less) if you intend to upload it to GitHub. </p> <br>

<h3> Basic Javascript for Leaflet </h3> <br>

<p> For web maps, most of the customization work is done using javascript. Javascript, along with html and css, are core languages of the web, and they are used in a vast majority of websites worldwide. Each of these languages can be considered front-end languages, creating visual elements with which the user interacts. To minimize errors, it is typically best to start with a simple web map and then add in features one-by-one. If an error does occur, it is not always immediately clear what is causing it, so adding in small pieces of code steadily renders troubleshooting straightforward.  </p> <br>

<p> To start, these tags must be placed in the head element of the html in order to call Leaflet and AJAX. </p>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/AyzdnAZ.jpeg" alt="Leaflet Tags" style="width:100%;max-width:625px">
<figcaption> Figure 1. The HTML Tags to Call Leaflet </figcaption>
</figure> <br>

<p> Additionally, some css needs to be created to add design and size to the webmap. This css should go inside the head element before the script tags in Figure ? above. </p>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/VXnjkpJ.jpeg" alt="Leaflet CSS" style="width:100%;max-width:625px">
<figcaption> Figure 2. The Basic CSS Design for Leaflet </figcaption>
</figure> <br>



<p> The code below creates a basic Leaflet web map of the 50 US States and the District of Columbia. The first line creates the map and map object that can later be used with other codes -- the setView command is appended to the map creation to hover the map over the 50 contiguous states. Next, a tile layer is loaded into Leaflet -- in this case it is OpenStreetMaps. This layer serves as a backdrop and point of reference for the other layer that we will input. In this case, that other layer is a geojson file of the 50 US States and Washington D.C.. If this layer had been hosted on a web server, then we could simply load the script into Leaflet. Since we are loading it from a GitHub repository, however, we have to use an additional extension to easily extract the geojson from a url. This is where the Leaflet Ajax extension comes in -- it simplifies the process of having to come up with another script. The direct url to the geojson is stored in a variable, and then a specific Leaflet Ajax command instantiates it into the map. </p> <br>

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

<p> To see how the html, css, and javascript work individually, CodePen can be used to display the work-in-progress map (Figure ?). On the left side, look through each of the different languages that form the basic map. On the right side, notice that the map has successfully rendered. Two more instances of CodePen will be used to display progress as the web map is developed.  </p> <br>

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="xxoOGvX" data-pen-title="Leaflet Tutorial 1" data-user="aj65714" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/aj65714/pen/xxoOGvX">
  Leaflet Tutorial 1</a> by Andrew (<a href="https://codepen.io/aj65714">@aj65714</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script> 
<figcaption> Figure 4. The Basic Leaflet Web Map on CodePen </figcaption> <br>

<p> Looking at how the entire script is written in one file, Figure ? below depicts how the entire script works together. Usually, to keep things organized, the javascript portion is loaded in as a separate file. Right-click on this web page and select "View Page Source" on the dropdown menu. This will open the html, css, and javascript for the webpage. Then, scroll down to Line ??? -- this is the final Leaflet web map loaded in from a different folder on GitHub. </p> <br>


<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/XaJTK4I.jpeg" alt="Leaflet Step 1 " style="width:100%;max-width:625px">
<figcaption> Figure 5. A Snapshot look at the Entire Code for the Basic Leaflet Web Map </figcaption>
</figure> <br>


<h3> Editing the Web Map to Display Information about the Geojson Layer </h3> <br>

<p> The basic Leaflet instance has successfully started and the geojson layer appears to work. This map is not particularly useful yet, as it does not visualize data or convey any information about educational attainment rates to the viewer. </p> <br>

<p> Some enhancements will be needed to make this web map more useful. Since educational attainment rates are percentages, a choropleth map would work well here. Additionally, pop up text bubbles can be created that show the percentage of adults over 25 with a Bachelor's degree or higher in each state. </p> <br>

<p> Two functions can be used to add color to the map's educational attainment data. Both are set to "return" their outputs to the global level -- otherwise, their values could not be used later on in other functions. The first, "function getColor(d)", is a straightforward means of assigning data intervals a shade of purple -- higher values are shaded in darker purple. In this case, the values were pulled off a quantile classification of the same data in ArcGIS Pro and rounded. The "d" input variable is simply a placeholder for a set of values, and the "?" symbol is shorthand for an if-else statement (e.g. if the value of d is greater than 21 the '#9e9ac8' hexcode is used). The final hexcode constitutes all other values. To create the hex values for the purple color ramp, <a href="https://colorbrewer2.org/#type=sequential&scheme=Purples&n=7">Colorbrewer</a> was used. </p> <br>
	
<p> The second function serves as a general renderer that uses the first to fill the color. It also inputs the education attainment data into the "getColor" function and replaces the "d" input variable. </p> <br>

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
<figcaption> Figure 6. Creating the Choropleth Map Symbology with Javascript </figcaption> <br>

<p> Next, some pop up text bubbles will be created. This will allow users to see the percentage of adults over 25 holding a Bachelor's degree or higher for each state. This is done using the "onEachFeature" function, which will be added to the "L.GeoJSON.AJAX(geojsonurl).addTo(map);" line as a parameter. The "onEachFeature" function takes in the geojson layer and its fields values as inputs. The "feature.properties" are invoked using conditional logic so that the feature values in the geojson layer can be called in the popup. The "layer.bindPopup" option is used to create a popup. </p> <br>

<p> The content within the popup itself consists of strings concatenated with blank spaces and the feature properties from the geojson layer. Some line breaks, denoted by '</br>' are used to separate the text. </p> <br>

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
<figcaption> Figure 7. Creating the Basic Popups for each State with Javascript </figcaption> <br>

<p> It is important to ensure that the "style" and "onEachFeature" functions get applied to the geojson layer. This can be added using some brackets in the L.GeoJSON.AJAX command. </p> <br>
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

<p> This product is more useful than the first incarnation. The percentage of Bachelor's degree holders over 25 is now displayed as a choropleth map, and the pop ups describe the exact percentage of bacherlor's attainment in each state. There are a few more features that would bolster this product however. The web map could use a title with pop up data, legend, data source bubble, and fullscreen option.  </p> <br>

<h3> Refining the Web Map for the Final Iteration </h3> <br>

<p> Starting with a title, there are a few changes that can be implemented here. To start, a title would provide context to the user. Since the current pop up method is a little cumbersome (e.g. having to click every state to see data), the popups can be tied into the title by adding a mouse hover event listener. The margin of error for the educational attainment data can also be included the title. </p> <br>

<p> First, since these are new customly defined elements, some css needs to be added in the style section. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
	// Some css for the title/pop up element we wish to create
	.info { 
	padding: 6px 8px; font: 14px/16px Arial, Helvetica, sans-serif; background: white; background: rgba(255,255,255,0.8); 
	box-shadow: 0 0 15px rgba(0,0,0,0.2); border-radius: 5px; } 
	.info h4 { margin: 0 0 5px; color: #777; }
</code></pre></div></div> <br>

<p> Next, the title and popups can be configured. This requires defining several different functions. First, to create the box for the title and popups, a control structure must be created via "L.control();": this is a command that tells Leaflet to include a certain element such as zoom buttons, a scale bar, a layer toggle, etc. In this case, however, the control structure is a custom defined element.  </p> <br>

<p> The following portion is a little more complicated. A function need to be created that will create and update a new div element on the web map. This is achieved using "L.DomUtil.create". DOM stands for Document Object Model, which functions as a universal Application Program Interface (API) for mananging dynamic html. The variable "this" is assigned a "_div" element, which is then given the update() function in the next line. Finally, it is returned so that it affects the script globally (i.e. actually updates the title/popup text element).   </p> <br>

<p> Now, the popup information under the title can be populated. This is done using by adding the update option to the info variable. A function takes in the properties of the geojson layer, and its contents are described in the "contents" variable.   </p> <br>

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

	</code></pre></div></div> <br>

<p> Next, some highlight features can be written. This will consist of three different functions involving a user's mouse click or touch on a smart device -- the "e" input variable represents the input mouse action. The last function should be familiar, as it is the "onEachFeature" function.  </p> <br>

<p> The first function, "highlightFeature(e)", is used to highlight whichever state the user is hovering over. First, the current position of the mouse or touch is stored as a "layer". Then, that "layer" is given stylized options similar to a renderer. The "layer.bringToFront();" function ensures that it will not appear behind the current geojson layer. Last, the underlieing information from the geojson layer is used to update the title and pop up dynamic html. </p> <br>

<p> The second function, "resethighlight(e)", disables the highlight on the current state when the user hovers onto another state. This one is fairly straightforward: the geojson layer is appended with a "resetStyle(e.target)" function, and then the title and popup dynamic html is updated with the "update()" function.  </p> <br>

<p> The third function, "zoomToFeature(e)", zooms onto a state when it is clicked by the user. This one is also straightforward, as it uses a Leaflet map command to fit the web map to the boundary -- the user's mouse click and the "getBounds()" built in function are input parameters.  </p> <br>

<p> The final function should look familiar, as it invokes the "onEachFeature" function. The previous "onEachFeature" function can be deleted and replaced with this one.  </p> <br>
 
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

</code></pre></div></div> <br>

<p> Next, a legend can be created and added to the map. Like the title and pop ups, this will be done with a control structure.  </p> <br>

<p> Like, the title and pop up dynamic html, some css will be needed here. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
	
	// some css for the legend element
	.legend { text-align: left; line-height: 18px; color: #555; } 
	.legend i { width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.8; }
 
</code></pre></div></div> <br>

<p> This next portion is a little more difficult. To setup the elements in the legend, another control structure needs to be created. Again, a legend function can be described via the DOM Util method, however, some consideration needs to take place as to how this will work. To start, the break values from legends can be assigned to a list variable called "grades". Next, a title for the legend can be created using the "push" command, though for this to work, an empty list called "labels" will take the "push" command as an input.   </p> <br>

<p> Creating the legend values takes some more work, however. Since the data is represented in intervals, it would be ideal for the user to see the bottom and top breaks for each interval. A method needs to be devised that allows these lower and upper breaks to appear on the legend: this will be accomplished by creating a "from" and "to" variable. With these variables declared, a for loop can be created to join each data interval together. Using the length of the grades list, or seven units, each lower and upper break are iterated through to create a legend. Then, these breaks are pushed as labels to the dynamic html, with some descriptive div elements describing how the message should appear. To tie this dynamic html into the control structure, the "div.innerHTML" is joined using the "labels.join('<br>') parameter. Finally, the div element is returned the global level.  </p> <br>

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
 
</code></pre></div></div> <br>

<p> Another useful feature is a link to the web map's ACS dataset. This can be created using the same DOM Util method as the other elements.  </p> <br>

<p> Like the other dynamic html elements, some css is needed to describe it. This is basically the same as the title and popup css. </p> <br>

<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>

 	//some css for the legend element
	.dataSource { 	padding: 6px 8px; font: 14px/16px Arial, Helvetica, sans-serif; background: white; background: rgba(255,255,255,0.8); 
	box-shadow: 0 0 15px rgba(0,0,0,0.2); border-radius: 5px;  }

 </code></pre></div></div> <br>

 <p> This next portion should look familiar to the last one. Another data control structure is used, this time on the bottom left part of the screen. Since the legend breaks are not a concern on this one, the code is quite simple in comparison. An empty list "dSource" is created and then the text is inserted into using "dSource.push". In here, the "Data Source" caption and the link from the ACS dataset is placed. Then, it is once again joined with innerHTML, returned to the global settings, and added to the map.   </p> <br>

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


</code></pre></div></div> <br>

<p> Finally, a fullscreen option can be added to the web map. Normally, this would be a complex procedure, as writing a new script would constitute creatong another tutorial. Thankfully, there is a downloadable extension on GitHub by user Brunob that efficiently provides this functionality. Like the Leaflet tags, the fullscreen extension has some html tags that need to be loaded.  </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/5D4P4ZO.jpeg" alt="Leaflet HTML Final" style="width:100%;max-width:625px">
<figcaption> Figure ?. The Final Leaflet HTML Tags </figcaption>
</figure> <br>

<p> The implementation of the control structure for the fullscreen option is fairly simple. Creating the control structure and adding it to the map should be familiar by now. The two new parts involve console log parameters. These invoke the "window.console" and "window.console.log". For users, this will appear as a text bubble when fullscreen mode is enabled. The "window.console" is invoked using conditional logic so that the "window.console.log" message can be written. </p> <br>

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

</code></pre></div></div> <br>

<h3> The Final Product </h3> <br>

<p> Having prepared the last few adjustments, the final product can be posted on codepen and embedded into the website itself. </p> <br>

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="JjQKLqe" data-pen-title="Leaflet Final" data-user="aj65714" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/aj65714/pen/JjQKLqe">
  Leaflet Final</a> by Andrew (<a href="https://codepen.io/aj65714">@aj65714</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script> <br>


<p> Do note that there is a known issue with embedding leaflet maps on GitHub Webpages. It is possible that the edges of the tile layers will have thick white borders and that the geojson layer will not line up with the reference points on the tile layer. </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/3XZuK1d.jpeg" alt="Leaflet Issue" style="width:100%;max-width:625px">
<figcaption> Figure ?. The White Tile Edge Issue with Leaflet Maps on GitHub </figcaption>
</figure> <br>


	
<p> It may be possible to correct this with <a href="https://github.com/Leaflet/Leaflet.TileLayer.NoGap"> this script</a> from Ivan Sanchez.  </p> <br>





<h3> List of Figures and Tables </h3>
<p> Figure 1. The HTML Tags to Call Leaflet  </p>
<p> Figure 2. The Basic CSS Design for Leaflet  </p>
<p> Figure 3.  </p>

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
  
</body>


</html>
