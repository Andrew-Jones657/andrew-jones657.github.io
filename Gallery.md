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

.panel-container {
                position: relative;
            width: 100%;
            height: 100%;
      }

.panel-side {
                padding: 2px;
            box-sizing: border-box;
            width: 200px;
            height: 100%;
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

  
  .tablecenter {
  margin-left: auto;
  margin-right: auto;
  }
  
  figure figcaption {
  text-align: center; 
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

     .lineThick{
    width: 100%;
    height: 1px;
    border-bottom: 2px solid black;
    position: absolute;
    }

    .line{
    width: 100%;
    height: 1px;
    border-bottom: 1px solid black;
    position: absolute;
    }


    </style>
    <link rel="stylesheet" href="https://js.arcgis.com/4.31/esri/themes/light/main.css" />
    <script src="https://js.arcgis.com/4.31/"></script>
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>

</head> 


<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-KEPNKDPP7J"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-KEPNKDPP7J');
</script>

<body>

<h1 style="text-align:center;"> Map Gallery </h1> <br>

<p> This page serves as a gallery of single-theme cartographic products that I have created. </p> <br>


<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/ojy2Ad7.jpeg" alt="BG_Income" style="width:100%;max-width:625px"> 
<figcaption> Diversity, Housing, and Income in Bowling Green KY </figcaption>
</figure> <br>

<p> 7/2/2025 </p> <br>

<div class="line"></div> <br>


<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/f7a7Etc.jpeg" alt="Nordlingen" style="width:100%;max-width:625px"> 
<figcaption> The Nördlinger Ries </figcaption>
</figure> <br>


<p> 2/20/2025 </p> <br>

<div class="line"></div> <br>

<figure>
<a target="_blank" href="https://andrew-jones657.github.io/Covington_German_App">
<img class="myImages" id="myImg" src="https://i.imgur.com/h2rvQAN.png" alt="Covington German Web Map" style="width:100%;max-width:625px"> </a>
<figcaption> Covington's German Element: Social Institutions from 1861 to 1920 </figcaption>
</figure> <br>

<p> Click on the image to be directed to the interactive map, desktop recommended. </p> 

<p> 2/4/2025 </p> <br>

<div class="line"></div> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/r7drTrN.jpeg" alt="Warren County 2024 Presidential" style="width:100%;max-width:625px">
<figcaption> 2024 US Presidential Results, Precinct Level, Warren County Kentucky </figcaption>
</figure> <br>

<p> 12/7/2024 </p> <br>

<div class="line"></div> <br>


<figure>
<a target="_blank" href="https://andrew-jones657.github.io/StravaBike">
<img class="myImages2" id="myImg2" src="https://i.imgur.com/t17mFgN.png" alt="Strava Bike Rides Thumbnail" style="width:100%;max-width:625px"> </a> 
<figcaption> Bike Rides Recorded with Strava, 2024  </figcaption>
</figure> <br>

<p> Click on the image to be directed to the interactive map, desktop recommended. </p>

<p> 10/21/2024 </p> <br>


<div class="line"></div> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/ImFb6we.jpeg" alt="Louisville Minority Change" style="width:100%;max-width:625px">
<figcaption> Percent Minority Population Change in Jefferson County, Kentucky 2000 - 2020 </figcaption>
</figure> <br>

<p> 10/16/2024 </p> <br>


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
  
