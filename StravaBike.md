<html lang="en-US">

<head>
    <meta charset='utf-8'>
    <meta http-equiv= "X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,maximum-scale=2">
    <style>
            html,
            body,
            #viewDiv {
	    height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
	    min-height: 750px;
            min-width: auto;
            border: 1px solid #444444;
      }
.inner {
  position: relative;
  max-width: 1000px;
  padding: 20px 10px;
  margin: 0 auto;
      }

#timeSlider {
        position: absolute;
        left: 100px;
        right: 100px;
        bottom: 0px;
	width: auto;
      }
      

#titleDiv {
        padding: 10px;
      }

#titleText {
        font-size: 20pt;
        font-weight: 60;
        padding-bottom: 10px;
      }
      
</style>
    <link rel="stylesheet" href="https://js.arcgis.com/4.31/esri/themes/light/main.css" />
    <script src="https://js.arcgis.com/4.31/"></script>


</head>
<body>
  



<div id="timeSlider"></div>
<div id="viewDiv"></div>
<div id="titleDiv" class="esri-widget">	
	<div id="titleText">My Bike Rides Recorded with Strava in 2024 </div>
	<div> April to October, 2024 </div>
        </div>

<script src="./files/Strava/Strava2024.js"></script> <br> 
<figure>
<figcaption> My Bike Rides in Warren County in 2024 </figcaption>
</figure> <br>

<p> 10/21/2024 </p> <br>

<p> User Notes: Click on or hover over any visible bike ride path to see specific details regarding that ride. By default, the time slider on the top left portion of the web map is set to iterate through a week of bike rides at a time. These bike rides are symbolized by the month in which they occured. The list of bike rides by date on the right side of the interactive map is a list of all bike rides in the current view extent -- even those that may be hidden under the time slider filter. To view all bike rides, simply drag each of the two dots in the time filter as far apart from each other as possible.   </p> <br>

</body>
</html>
