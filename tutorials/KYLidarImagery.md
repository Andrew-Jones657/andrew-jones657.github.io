<html>
  
<div>
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
    
  <link rel="stylesheet" href="https://js.arcgis.com/4.29/esri/themes/light/main.css" />
  <script src="https://js.arcgis.com/4.29/"></script>
  <script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>

</div>

<body>

<h1> KYFromAbove: Downloading and Processing LIDAR data </h1> <br>

<p> LIDAR data is incredibly important because it allows us to create detailed and accurate maps of the Earth's surface and objects on it. By using laser beams to measure distances, LIDAR can create 3D models of forests, cities, and even the ocean floor with high precision. This data is crucial for urban planning, managing natural resources, studying climate change, and understanding geological processes. It helps scientists, engineers, and planners make informed decisions about infrastructure, conservation efforts, disaster response, and more. In essence, LIDAR data provides a valuable perspective on our world that helps us protect the environment, plan for the future, and improve our understanding of Earth's complex systems. </p> <br>

<p> In this tutorial, we will be downloading, processing, and modeling LIDAR data from KYFromAbove -- a government sponsored website that is "focused on building and maintaining a current basemap for the Commonwealth that can meet the needs of its users at the state, federal, local, and regional level" (KYFromAbove, 2024). The goal is to create hillshade data that demonstrates the elevation change in a particular LIDAR tile. To provide additional clarity, this tutorial is focused on the workflow for downloading and using LIDAR data. If you wish to use LIDAR data outside of Kentucky, the same general steps apply. Some possible sources of LIDAR data can be found <a href="https://gisgeography.com/top-6-free-lidar-data-sources/"> here</a>. </p> <br>

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

</body>

</html>
