<html lang="en-US">

<head>
    <meta charset='utf-8'>
    <meta http-equiv= "X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,maximum-scale=2">
    <title> Internship </title>
    <style>
        html,
        body { 
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        }
        
#viewDiv {
            padding: 0;
            margin: 0;
            height: 100%;
            width: 100%;
            min-height: 650px;
            min-width: 800px;
            border: 1px solid #444444;
        }

.inner {
        position: relative;
        max-width: 1000px;
        padding: 20px 10px;
        margin: 0 auto;
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
    <link rel="stylesheet" href="https://js.arcgis.com/4.29/esri/themes/light/main.css" />
    <script src="https://js.arcgis.com/4.29/"></script>
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>

</head> 

<body>

<div id="viewDiv"></div>
    <div id="titleDiv" class="esri-widget">
      <div id="titleText">Stormwater Assets in the Summit Subdivision</div>
      <div>Warren County, Kentucky</div>
    </div>
<script src="./files/SummitSW/SUMMIT_ASSET.js"></script> 
    
</body>
</html>
