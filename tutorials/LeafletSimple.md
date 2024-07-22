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

<p> In this tutorial, we will be creating a simple Leaflet web map. The aim is to incorporate some of Leaflet's primary features: we weill use a basemap, markers, renderers to symbolize data, and pop-up features to make the map more informative. In an effort to incorporate different kinds of data, we will be looking at state level educational attainment data from the American Community Survey. The goal is to map out the percentage of the population with a Bachelor's degree or higher. </p> <br>

<h3> Setting up the HTML and CSS </h3> <br>

<p> Generally, web maps have three core components: html, css, and javascript. The html is often a set of links that allow the web map to be displayed on the web page. For Leaflet, this is as simple as putting these two snippets of code in the head of your webpage: </p> <br> 

<p> <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/> </p> <br>

 <p> <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script> </p> <br> 

<p> Beyond the links, a "div" element is usually used to create the map container.  </p> <br> 

<h3> Basic Javascript for Leaflet </h3> <br>

<p> </p>

<h3> The Basic Web Map on Codepen </h3> <br>

<h3> Going Back and Adding More Features </h3> <br>
  
</body>


</html>
