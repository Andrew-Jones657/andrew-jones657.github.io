<html lang="en-US">

<head>
    <meta charset='utf-8'>
    <meta http-equiv= "X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,maximum-scale=2">
    <style>
      h3{
  text-align: center;
  }
  
  .tablecenter {
  margin-left: auto;
  margin-right: auto;
  }

  #myImg {
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  }

  h3 {
  text-align: center;
  }
  
  figure figcaption {
  text-align: center; 
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

.row {
    display: flex;
    }

/* Create three equal columns that sits next to each other */
    .column {
    flex: 50%;
    padding: 5px;
    }

.imgContainer{
    float:left;
    }

.img{
object-fit: cover;
    }
    
</style>
</head>

<body>

<h1> Remote Sensing Analysis: Detecting Land Use Change with Google Earth Engine </h1> <br>


<p> Remote sensing has emerged as a powerful tool for monitoring land use change, providing valuable insights into environmental and urban dynamics. By utilizing satellite imagery and aerial photography, researchers can analyze variations in land cover over time, detecting shifts from natural landscapes to urban developments, agricultural expansion, or deforestation. This technology allows for the collection of large-scale data, enabling the assessment of changes in land use patterns across diverse regions. Moreover, remote sensing facilitates the identification of trends and the impacts of human activities on ecosystems, aiding in effective land management and policymaking. Through advanced analytical techniques, such as machine learning and image classification, remote sensing continues to enhance our understanding of the complex interplay between human development and environmental sustainability. </p> <br>

<p> This project is focused on urban development in Boone County, Missouri between 2000 and 2024 using remote sensing methods. Boone County, located in the center of Missouri, has experienced enormous population growth since the 1940s. Its county seat, Columbia, holds over two thirds of its population.  Alongside this growth comes the expansion of the City of Columbia and the construction of new subdivisions in both Columbia and Boone County. The final goal will be to create a cartographic product showing newly developed urban and suburban areas in Boone County. </p> <br>

<h3> Census Data and Municipal Boundaries </h3> <br>

<p> Since 1980, both Boone County and its seat, Columbia, have experienced significant population growth. Boone County’s population has nearly doubled, while Columbia’s has more than doubled (Table 1). Since 2000, both the county and the city have grown by over 45,000 residents. Much of this growth is attributed to the development of new suburban areas. </p> <br>

<table class="tablecenter"> <caption> Table 1. Boone County and Columbia Population Change since 1980 </caption>
<thead>
<th> Year </th>
<th> Boone County Population Change </th>
<th> City of Columbia Population Change </th>
</thead>
<tr>
<td> 1980 </td>
<td> 100,376 (24.1%) </td>
<td> 62,061 (6.0%) </td>
</tr>
<tr> 
<td> 1990 </td>
<td> 112,379 (12.0%) </td>
<td> 69,101 (11.0%) </td>
</tr>
<tr>
<td> 2000 </td>
<td> 135,343 (20.5%) </td>
<td> 84,531 (28.4%) </td>
</tr>
<tr>
<td> 2010 </td>
<td> 162,642 (20.1%) </td>
<td> 108,500 (28.4%) </td>
</tr>
<tr>
<td> 2020 </td>
<td> 183,610 (12.9%) </td>
<td> 126,654 (16.4%) </td>
</tr>
<tr>
<td> 2023* </td>
<td> 189,643 (3.28%) </td>
<td> 129,330 (2.4%) </td>
</tr>
</table> <br>

<p> The census boundaries (or municipal boundaries of cities and towns) in Boone County were sourced from the US Census Bureau. These datasets are essential for tracking the growth of municipalities and for later preparing the land classification map, serving as a reference to identify areas that transitioned to suburban development. </p> <br>

<p> When combined with the 2000 and 2020 US Census TIGER boundaries, a simple illustration shows how Columbia expanded over this period. Notably, Columbia grew in all directions, and many of the smaller towns also experienced growth (Figure 1). This growth is further reflected in the strong population increase shown in Table 1. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/1qZsXMo.jpeg" alt="Municipality Changes" style="width:100%;max-width:625px">
<figcaption> Figure 1. Boone County Municipality Growth between 2000 and 2020 </figcaption>
</figure> <br>

<p> However, the nature of this expansion, particularly in terms of developed neighborhoods, is not easily discernible. Figure 1 only illustrates areas that have been incorporated into nearby municipalities, and it is also possible that new suburban areas exist outside the City of Columbia. This is where a land use classification map becomes particularly useful in identifying overall development. </p> <br>

<h3> A Visual Observation of Boone County and Gathering Training Data </h3>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/auNwaMJ.jpeg" alt="Training Data" style="width:100%;max-width:625px">
<figcaption> Figure 2. Boone County Image Classification Training Data </figcaption>
</figure> <br>


<h3> Google Earth Engine </h3> <br>


<h3> Selecting a Satellite, Imagery, and Spectral Bands for Land Classification </h3> <br>

 <div class="row">
  <div class="column">
    <img src="https://i.imgur.com/GQ0kO2P.png" alt="Raw 2000 Bands 1_4_5" style="width:100%">
  </div>
  <div class="column">
    <img src="https://i.imgur.com/eVqj7wh.png" alt="Raw 2024 7_6_4" style="width:100%">
  </div>
</div> <br>

 <div class="row">
  <div class="column">
    <img src="https://i.imgur.com/rr5C23W.png" alt="Raw 2000 Bands 4_5_6" style="width:100%">
  </div>
  <div class="column">
    <img src="https://i.imgur.com/yB0TgyL.png" alt="Raw 2024 5_6_10" style="width:100%">
  </div>
</div> <br>



<h3> Classifying Imagery in Google Earth Engine </h3> <br>

 <div class="row">
  <div class="column">
    <img src="https://i.imgur.com/KJGSiYJ.png" alt="Raw 2000 Land Use" style="width:100%">
  </div>
  <div class="column">
    <img src="https://i.imgur.com/LFLo2zR.png" alt="Raw 2024 Land Use" style="width:100%">
  </div>
</div> <br>

<h3> The Confusion Matrix </h3> <br>

<h3> Moving to ArcGIS Pro </h3> <br>

<h3> Final Products </h3> <br>

<h3> Discussion </h3> <br>

<h3> Links to Google Earth Engine Javascript </h3> <br>

<h3> List of Figures and Tables </h3>

<h3> References </h3>

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
