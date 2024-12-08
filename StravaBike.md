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
	    min-height: 450px;
            mid-width: 650px;
            border: 1px solid #444444;
      }
.inner {
  position: relative;
  max-width: 800px;
  padding: 20px 10px;
  margin: 0 auto;
      }
.panel-container {
                position: relative;
            width: 100%;
            height: 100%;
      }

.panel-side {
                padding: 2px;
            box-sizing: border-box;
            width: 200px;
            height: 92%;
            position: absolute;
            top: 0;
            right: 0;
            color: #000000;
            background-color: #000000;
            overflow: auto;
            z-index: 60;
      }

.panel-side h3 {
                padding: 0 20px;
            margin: 20px 0;
      }

.panel-side ul {
                list - style: none;
            margin: 0;
            padding: 0;
      }

.panel-side li {
                list - style: none;
            padding: 10px 20px;
      }

.panel-result {
                cursor: pointer;
            margin: 2px 0;
            background-color: #000000;
      }

.panel-result:hover,
            .panel-result:focus {
                color: orange;
            background-color: #000000;
      }

.docking-control {
        position: absolute;
        z-index: 10;
        top: 50%;
        left: 50%;
        width: 250px;
        height: 80px;
        padding: 10px;
        box-sizing: border-box;
        margin: -40px 0 0 -125px;
        background-color: #dccab1;
        color: #dccab1;
        text-align: center;
        -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      }

.docking-control label {
        display: inline-block;
        font-weight: bold;
        margin: 0 0 10px 0;
        padding: 0;
        font-size: 16px;
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
</style>
    <link rel="stylesheet" href="https://js.arcgis.com/4.30/esri/themes/light/main.css" />
    <script src="https://js.arcgis.com/4.30/"></script>
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>

</head>
<body>
  

<div class="panel-container">
    <div class="panel-side esri-widget">
        <h3>Bike Rides by Date</h3>
        <ul id="strava_graphics">
             <li>Loading&hellip;</li>
        </ul>
    </div>
<div id="viewDiv" style="width: 800px; height: 650px;  border: 1px solid #444444;"> </div> <br>
</div>
<script src="./files/Strava/Strava2024.js"></script> <br> 
<figure>
<figcaption> My Bike Rides in Warren County in 2024 </figcaption>
</figure> <br>

<p> 10/21/2024 </p> <br>


</body>
</html>
