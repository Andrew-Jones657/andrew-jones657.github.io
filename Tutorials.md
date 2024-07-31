<html lang="en-US">

<head>
    <meta charset='utf-8'>
    <meta http-equiv= "X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,maximum-scale=2">
    <style>
    img {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    width: 500px;
    }

    h3{
    text-align:center;
    }

    img:hover {
    box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
    class="center";
    }
    
    figure figcaption {
    text-align: center;
    }

    .row {
    display: flex;
    }

    /* Create three equal columns that sits next to each other */
    .columnImg {
    flex: 33%;
    padding: 5px;
    }

    .columnSpace {
    flex: 7%;
    padding: 5px;
    }
    
    .columnText {
    flex: 60%;
    padding: 5px;
    }

    .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    }


    .lineThick{
    width: 625px;
    height: 1px;
    border-bottom: 2px solid black;
    position: absolute;
    }

    .line{
    width: 625px;
    height: 1px;
    border-bottom: 1px solid black;
    position: absolute;
    }
    
    </style>
</head>

<body>

<h1 style="text-align:center;"> Welcome to my Tutorials Page </h1> <br>

<p> Here are various GIS tutorials I have prepared. Many of the tutorials are related to the projects under my projects page in that these tutorials "fill in the gaps" concerning some of the workflows. While informal in nature, it is assumed you have a good grasp of GIS fundamentals (i.e. Data Management, some Python exposure, some familiarity with raster and vector data formats).  </p> <br>

<div class="lineThick"></div> <br>

 <div class="row">
  <div class="columnImg">
    <a target="_blank" href="/tutorials/CensusData">
    <img src="https://i.imgur.com/3Kl75Zs.jpeg" alt="US Census" style="width:100%">
    </a>
  </div>
  <div class="columnSpace"> 
  </div>
  <div class="columnText">
    <h5> Downloading and Processing US Census Data for GIS Implementation </h5>
    <p> A guide to finding, downloading, and processing 2000 - 2020 US Census data for use in GIS systems. </p>
  </div>
</div> 

<div class="line"></div> <br>


 <div class="row">
  <div class="columnImg">
    <a target="_blank" href="/tutorials/GoogleLocation">
    <img src="https://i.imgur.com/gwkJfUs.jpg" alt="Google Location" style="width:100%">
    </a>
  </div>
  <div class="columnSpace"> 
  </div>
  <div class="columnText">
    <h5> Your Location History: Using Google Location History in ArcGIS Pro  </h5>
    <p> Methods for downloading and processing your Google Location History into useable spatial data. </p>
  </div>
</div> 

<div class="line"></div> <br>


<figure>
<a target="_blank" href="/tutorials/KYLidarImagery">
    <img src="https://i.imgur.com/nSm2QXS.jpeg" alt="LIDAR" class="center">
</a>
    <figcaption> KYFromAbove: Downloading and Processing LIDAR data  </figcaption>
</figure> <br> <br> 


<p> <a href="/tutorials/LeafletSimple">Disseminating Spatial Data Online: Creating a Simple Leaflet Web Map (WIP)</a> </p> <br>

<p> Hosting GIS Data on the Cloud: A Guide to Setting up Geoserver on Amazon Web Services (WIP) </p> <br>

<p> Creating a Regression Model: Analyzing the 2016 US Presidential Election (WIP) </p> <br>

</body>

</html>
