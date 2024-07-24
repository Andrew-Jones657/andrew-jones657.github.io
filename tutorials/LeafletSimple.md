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
    }
  </style>
  
 <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>

 <!-- Make sure you put this AFTER Leaflet's CSS -->

 <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>

  
  <link rel="stylesheet" href="https://unpkg.com/leaflet.fullscreen@latest/Control.FullScreen.css" />
  <script src="https://unpkg.com/leaflet.fullscreen@latest/Control.FullScreen.js"></script> 
  
</head>

<body>

<h3> Why Web Mapping is Essential </h3>

<p> Open source web mapping applications like Leaflet play a crucial role in democratizing access to mapping technology and spatial data visualization. They empower developers, businesses, and communities to create interactive maps that are customizable, scalable, and adaptable to diverse needs. Leaflet, with its lightweight and modular design, offers a user-friendly platform for displaying geographical information on websites and mobile applications. Its extensive plugin ecosystem further enhances functionality, allowing integration with various data sources and advanced spatial analysis tools. By leveraging open source technologies like Leaflet, users can innovate freely, collaborate globally, and harness the power of spatial data to solve real-world challenges in fields ranging from urban planning and environmental management to logistics and tourism. </p> <br>

<p> In this tutorial, we will be creating a simple Leaflet web map. The aim is to incorporate some of Leaflet's primary features: we weill use a basemap, markers, renderers to symbolize data, and pop-up features to make the map more informative. In an effort to incorporate different kinds of data, we will be looking at state level educational attainment data from the American Community Survey. The goal is to map out the percentage of the population with a Bachelor's degree or higher. As a point of reference, this tutorial is based on the <a href="https://leafletjs.com/examples/choropleth/"> chloropleth map tutorial</a> from Leaflet. There are some differences however that warrant creating this tutorial.  </p> <br>

<h3> Setting up the HTML and CSS </h3> <br>

<p> Generally, web maps have three core components: html, css, and javascript. The html is often a set of links that allow the web map to be displayed on the web page. For Leaflet, this is as simple as putting these two snippets of code in the head of your webpage: </p> <br> 

<code> 


<!DOCTYPE html>
<html>
<head>
  <title>Leaflet Preview</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

 <!-- This script link estblishes the Leaflet CSS -->
 
 <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>

 <!-- This script link establishes Leaflet itself. It has to come after the CSS link -->

 <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>
  
<!-- This script link establishes Leaflet AJAX, which allows for easy access and use of a .js or .geojson file on the internet-->
  
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet-ajax/2.1.0/leaflet.ajax.min.js"></script>
  
</head>
  
<!-- The <body> portion of the html should contain the <div> element with the map -->
<body>
  <div id="map"></div>  
</body>
</html>

</code>

<p> Beyond the links, a "div" element is usually used to create the map container.  </p> <br> 

<h3> Basic Javascript for Leaflet </h3> <br>

<p> </p>

<h3> The Basic Web Map on Codepen </h3> <br>

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="xxoOGvX" data-pen-title="Leaflet Tutorial 1" data-user="aj65714" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/aj65714/pen/xxoOGvX">
  Leaflet Tutorial 1</a> by Andrew (<a href="https://codepen.io/aj65714">@aj65714</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

<h3> Going Back and Adding More Features </h3> <br>

<p> So far the outline of the states is displayed and Leaflet is functioning, which is a good starting point. This map is not particularly useful yet, as it does not visualize data or convey information to the viewer. </p>

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="MWMjmMY" data-pen-title="Leaflet Tutorial Step 2" data-user="aj65714" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/aj65714/pen/MWMjmMY">
  Leaflet Tutorial Step 2</a> by Andrew (<a href="https://codepen.io/aj65714">@aj65714</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


<h3> References </h3>

<p> https://leafletjs.com/examples/choropleth/ </p>
  
</body>


</html>
