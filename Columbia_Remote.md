<html lang="en-US">

<head>
    <meta charset='utf-8'>
    <meta http-equiv= "X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,maximum-scale=2">

  <title> New Urban Areas in Columbia, MO 2000-2024 </title>
    
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
  
  html, body {
	height: 100%;
    margin: 0;
             }
             
  .leaflet-container {
      width: 650px;
      height: 425px;
	  max-width: 100%;
	  max-height: 100%;
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


.imgContainer{
    float:left;
    }

.img{
object-fit: cover;
    }
    
</style>


 <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>

 <!-- Make sure you put this AFTER Leaflet's CSS -->

 <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>

 <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet-ajax/2.1.0/leaflet.ajax.min.js"></script>

<script src="./files/LeafletTutorial/L.TileLayer.NoGap.js"> </script>

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

<h3> Preparing Data for a Supervised Land Use Classification Model  </h3> <br>

<p> To create a land use classification map, a machine learning algorithm is used to convert satellite imagery into a land use classification raster. This process involves simplifying a complex dataset into a limited number of classes. To achieve this, either a supervised or unsupervised algorithm can be employed (Figure 2). For this study, supervised classification will be used to accurately characterize each classification scheme. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/tWJAHm5.jpeg" alt="Supervised Unsupervised" style="width:100%;max-width:625px">
<figcaption> Figure 2. Supervised vs Unsupervised Classification (Mishra, 2020) </figcaption>
</figure> <br>

<p> In supervised classification, training data—hand-drawn or selected—provides representative samples for each land use class. For this study, the land use classes included "water," "urban," "treetop," "agriculture," and "pastoral." Typically, at least fifty samples per class are recommended, although more may be required in practice (Lillesand et al., 2004). In this study, 200 observations were collected for each class, resulting in 1000 total observations (Figure 3). These observations were placed on a 2004 orthophoto from the Missouri Spatial Data Information Service, given latitude and longitude values, and then exported to a spreadsheet. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/auNwaMJ.jpeg" alt="Training Data" style="width:100%;max-width:625px">
<figcaption> Figure 3. Boone County Image Classification Training Data </figcaption>
</figure> <br>

<p> Since this project spans from 2000 to 2024, sourcing remote sensing imagery for these years is essential. However, the Missouri Spatial Data Information Service only offers orthophotos from 2004 and 2022. Additionally, attempting to classify large files like these on a personal computer would be time-consuming and inefficient. In this case, it is more effective to pursue a cloud-based solution. One particularly useful platform for collecting, analyzing, and disseminating remote sensing imagery is Google Earth Engine.  </p> <br>

<h3> Google Earth Engine </h3> <br>

<p> Google Earth Engine (GEE) is a powerful cloud-based platform designed for analyzing and visualizing geospatial data. It provides access to a vast repository of satellite imagery, geospatial datasets, and other environmental data, enabling researchers, scientists, and developers to perform large-scale spatial analysis and monitoring. With tools for processing and analyzing data from sources like NASA, USGS, and various global satellite networks, GEE supports applications in fields such as environmental monitoring, disaster management, agriculture, and climate change. Its cloud infrastructure allows users to conduct complex analyses efficiently without needing local computational resources. Additionally, Google Earth Engine facilitates collaboration and sharing of data and results through its online interface and APIs. </p> <br>

<p> Incorporating GEE into this workflow simplifies many potential challenges. Through GEE, a plethora of satellite images spanning a multitude of years are now easily accessible and available for analysis. This makes obtaining imagery much easier than attempting to search through specific local, statewide, and municipal sources. Moreover, GEE is capable of handling complex land use classification analyses, significantly reducing the time required for processing. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/Ig4Yc1f.png" alt="GEE Console" style="width:100%;max-width:625px">
<figcaption> Figure 4. The Google Earth Engine Console </figcaption>
</figure> <br>

<p> The caveat to the advantages of GEE is that it requires JavaScript to perform commands and operations. While this presents a more difficult learning curve for users, there are many example scripts that can be modified to perform many common remote sensing workflows. Additionally, scripts can easily be shared through the JavaScript code, making it easy to reproduce workflows and satellite imagery products. </p>

<h3> Selecting a Satellite, Imagery, and Spectral Bands for Land Classification </h3> <br>

<p> For this project, Landsat satellite imagery will be used. Landsat is a joint NASA/USGS program which provides the longest continuous space-based record of Earth’s land in existence. Since the period of this study is over twenty years, suitable imagery can be found from Landsat5 and Landsat8. The imagery from 2000 is a composite between June 1st and September 1st, and the imagery from 2024 is a composite between April 1st and June 1st. There is no particular significance to these dates, they are simply the clearest overall composites selected from those years.  </p> <br>

<p> One key aspect of remote sensing analysis is selecting the appropriate spectral bands of a satellite. Spectral bands are specific sensors on a satellite that capture distinct electromagnetic wavelengths. The choice of spectral bands significantly affects the appearance of satellite imagery, with certain combinations being ideal for highlighting features such as urban sprawl, forest cover, water bodies, and other spatial phenomena. Since the 2000 imagery is from Landsat 5 and the 2024 imagery is from Landsat 8, different band combinations must be used for each satellite to achieve optimal results in urban classification. Figure 5 below shows imagery from 2000 and 2024 using a simple RGB color scheme: this corresponds to bands 3, 2, and 1 on Landsat 5 and bands 4, 3, and 2 on Landsat 8. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/siPVHwu.jpeg" alt="Landsat RGB" style="width:100%;max-width:625px">
<figcaption> Figure 5. Simple RGB Landsat Imagery for 2000 and 2024  </figcaption>
</figure> <br>

<p> For the land classification algorithm to be effective, each of the land use types must appear distinct from one another. The traditional band combinations used to identify urban areas in Landsat imagery include bands (1, 4, 5) for Landsat 5 and bands (7, 6, 4) for Landsat 8. Both band sets were tested with the land use classification model, but ultimately, another set of bands created better results.  </p> <br>

<p> To identify unique features in Landsat 5 imagery, Gautam et al. (2017) suggested a different set of bands. For this study, the Landsat 5 imagery was classified using bands 4, 5, 6, which correspond to near infrared (0.76 - 0.90 μm), shortwave infrared 1 (1.55 - 1.75 μm), and thermal infrared 1 (10.40 - 12.50 μm). This combination of spectral bands renders imagery that depicts urban areas in purple, tree cover in brown, water in dark blue, agriculture in tan or green, and pasture in light green.  </p> <br>

<p> A similar focus on the infrared sensors was applied to the Landsat 8 imagery. The imagery was ultimately classified using bands 5, 6, 10, which correspond to near infrared (0.85 - 0.88 μm), shortwave infrared 1(1.57 - 1.65 μm), and thermal infrared 1 (10.60 - 11.19 μm). This helped mitigate the dark appearance of the Landsat 8 imagery. Figure 6 below depicts the altered imagery side-by-side below.  </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/bZOb8Ua.jpeg" alt="Landsat Special" style="width:100%;max-width:625px">
<figcaption> Figure 6. Specific Landsat Imagery to Detect Urban Features for 2000 and 2024  </figcaption>
</figure> <br>

<p> Next, the remote sensing imagery can be classified using GEE.   </p> <br>

<h3> Classifying Imagery in Google Earth Engine </h3> <br>

<p> The training data from Figure 3 and the spectral band combinations from Figure 6 can be used as parameters for the land classification algorithm. Additionally, a rectangular boundary can be drawn to limit the export results to areas around Boone County. The results of the algorithm are presented in Figure 7 below. The JavaScript code to replicate this workflow can be found at the bottom of this web page. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/6Wbbi9S.jpeg" alt="Raw Land Use" style="width:100%;max-width:625px">
<figcaption> Figure 7. The Land Use Layers from Google Earth Engine  </figcaption>
</figure> <br>

<p> Visually, the land classification algorithm performed well in terms of identifying actual urban areas, water, and treetops. The difference between pastoral and agriculture was more discrete, so those two classifications are more comingled. One challenge with Columbia is the amount of tree cover in some old neighborhoods west of downtown – these neighborhoods may be classified as something other than urban due to the prolific tree cover present. Fortunately, since this study is looking at newly developed neighborhoods, this should not present too many issues. </p> <br>

<p> While a simple visual analysis is helpful in quickly determining whether a land classification algorithm was successful, there are also proper methods of quantifying the algorithm’s quality. A confusion matrix can be used to evaluate the quality of the land use classification scheme with more statistical rigor.  </p> <br>

<h3> The Confusion Matrix </h3> <br>

<p> To evaluate the effectiveness of the land use classification scheme, a confusion matrix was generated along with the imagery export. A confusion matrix compares actual values to predicted values, with the diagonal elements (from the top-left to the bottom-right) representing the correctly classified values, or true positives (Figure ?). The off-diagonal elements indicate errors, reflecting either false positives or false negatives. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/H9DoLdK.png" alt="Confusion Matrix" style="width:100%;max-width:625px">
<figcaption> Figure 8. The Confusion Matrix (?) </figcaption>
</figure> <br>

<p> There are a few important terms to understand concerning confusion matrices. The <em>overall accuracy</em> is the number of false positives and negatives divided by the number of true positives and negatives. This measure provides a general assessment of the quality of a land classification algorithm. Additionally, there are the <em>User Accuracy (Precision)</em> and <em>Prediction Accuracy (Recall)</em>. The user accuracy refers to the probability that a value predicted to be in a certain class is truly in that class. The prediction accuracy is the probability that a given value was classified correctly. </p> <br>

<p> The confusion matrix for the 2000 land use classification can be found in Figure 9 below. The matrix images were created using an online confusion matrix calculator by Marco Vanetti (2007). The overall accuracy for the 2000 classification was 83.162%, with the highest accuracy being reported in the water, urban, and tree cover classes. These tend to be distinct, so it makes sense that the algorithm was able to identify them successfully. The agriculture and pasture classes faired worse, which was understandable given that these two are more difficult to separate from one another. In particular, agriculture classification is difficult due to the various appearances of different crops as well as harvest times.  </p> <br>


<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/GXNIidu.png" alt="2000 Land Use Matrix " style="width:100%;max-width:625px">
<figcaption> Figure 9. 2000 Land Use Classification Confusion Matrix </figcaption>
</figure> <br>

<p> The overall accuracy for the 2024 classification was 83.681%, which is roughly the same as in Figure 9 above. It is important to note that the same set of training data was used for both of these classifications, so it would have been surprising if Figure 10 had a significantly different overall accuracy. Again, the results for the confusion matrix were quite similar as well. Water, urban, and tree cover classification faired well, whereas agriculture and pasture were more difficult to correctly classify.  </p> <br>
 
<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/3CRxN13.png" alt="2024 Land Use Matrix " style="width:100%;max-width:625px">
<figcaption> Figure 10. 2024 Land Use Classification Confusion Matrix </figcaption>
</figure> <br>

<p> To evaluate the quality of the land classification categories, Cohen’s kappa coefficient can be used to consider the possibility of the land classification agreement occurring by chance (or the agreement between the classification and the truth values). The coefficient takes a value between -1 and 1, where: </p>

<ul>
<li> Below 0.20 indicates none to slight agreement </li>
<li> .21 to .39 indicates fair agreement  </li>
<li> .40 to .59 indicates moderate agreement </li>
<li> .60 to .79 indicates substantial agreement </li>
<li> .80 to 1 indicates almost perfect agreement </li>
</ul> <br>

<p> (expand on results for each matrix) </p> <br>


<h3> Refining the Land Use Rasters on ArcGIS Pro </h3> <br>

<p> A few tools in ArcGIS Pro are helpful in cleaning up the land use classification layers. By applying a majority filter and boundary clean, the land use layers have fewer single erroneous pixels and the boundaries between classification types are smoothed and generalized. </p>

<p> The final result for the 2000 land use classification is presented below in Figure 11. Visually, it has performed well at reflecting the different land cover types. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/Kalby2c.jpeg" alt="2000 Land Use" style="width:100%;max-width:625px">
<figcaption> Figure 11. Boone County 2000 Land Use </figcaption>
</figure> <br>

<p> Similarly, in Figure 12 below, the 2024 land use classification is presented. In comparison to the previous figure, the urban areas have notably expanded, particularly in Ashland, Centralia, Columbia, Hallsville, and Sturges. Fewer tree cover is present: this may be due to increased development, but it is also possible that there was less vegetative growth due to the choice of satellite imagery from Spring rather than Summer.  </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/si4PMeO.jpeg" alt="2000 Land Use" style="width:100%;max-width:625px">
<figcaption> Figure 12. Boone County 2024 Land Use </figcaption>
</figure> <br>

<p> With the land classification layers prepared, it is now possible to use raster tools to reclassify the land use layers as "urban" or "not urban" and then calculate the difference in the urban class from 2000 to 2024. The remaining layer will represent new urban areas that developed between 2000 and 2024.  </p> <br>


<h3> Final Products </h3> <br>


<p> An interactive Leaflet web map below displays the final results of the project. The red polygons denote areas that have experienced urbanization since 2000. As mentioned in the discussion for Figure 12,  Note that while polygons outside of Boone County were removed from the layer, some areas that suggest urbanization are actually the false positives from the land classification algorithm earlier.    </p> <br>


<div id="map"></div>

<script src="./files/ColumbiaRemote/Boone00_24_Growth.js"></script> <br> 

<h3> Discussion and Some Final Thoughts </h3> <br>

<p> This project represented a common workflow in remote sensing analysis, namely detecting urban growth with remote sensing imagery, land classification analysis, and raster analysis. </p> <br>

<p> Generally, the land classification algorithm performed well at identifying areas that developed since 2000. These were clearly delineated in the Leaflet web map. There was some degree of error as highlighted in the confusion matrix section, though these errors generally did not detract from accurately detecting areas of urban growth.   </p> <br>

<p> There remains the question of whether the land use classification in this project could be considered of good quality. Olson (2008) contends that while modern users are comfortable with an 80% overall accuracy rate in classified imagery, the traditional standard has been an 85% overall accuracy rate. Both confusion matrices revealed an accuracy rate of around 83%, which indicates that, while the models were good in identifying new urban growth, a further refinement of training data might assist in removing false hits and better capturing urban areas.  </p> <br>

<p> This project stemmed from my interest in urban geography and my time living in Columbia, MO, when I worked at the Missouri House of Representatives. Initially, this project was going to be focused on Bowling Green, KY, but since I had already done the site selection and network analysis project on Bowling Green, I thought it would be better to use a different location. I never had the opportunity to take a full remote sensing class at Western Kentucky University, so it was quite a learning experience to go through and prepare this material. </p> <br>

<p> As with all projects on this site, further mapping and graphical enhancements may be periodically added.  </p>


<h3> GeoJSON Links </h3>

<p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/ColumbiaRemote/BooneTrainingData.geojson"> Image Classification Training Data </a> </p>

<p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/ColumbiaRemote/BooneGrowth.geojson"> Boone County Urban Growth Areas </a> </p>

<p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/ColumbiaRemote/Boone.geojson"> Boone County, Missouri Boundary </a> </p>

<h3> Links to Google Earth Engine JavaScript </h3> <br>

<p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/ColumbiaRemote/ClassifyL5_00_456.js"> 2000 Land Use Classification </a> </p>

<p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/ColumbiaRemote/ClassifyL8_24_5610.js"> 2024 Land Use Classification </a> </p>


<h3> List of Figures and Tables </h3> <br>

<p> Figure 1. Boone County Municipality Growth between 2000 and 2020 </p>
<p> Figure 2. Supervised vs Unsupervised Classification </p>
<p> Figure 3. Boone County Image Classification Training Data </p>
<p> Figure 4. The Google Earth Engine Console </p>
<p> Figure 5. Simple RGB Landsat Imagery for 2000 and 2024 </p>
<p> Figure 6. Specific Landsat Imagery to Detect Urban Features for 2000 and 2024 </p>
<p> Figure 7. The Land Use Layers from Google Earth Engine </p>
<p> Figure 8. The Confusion Matrix </p>
<p> Figure 9. 2000 Land Use Classification Confusion Matrix </p>
<p> Figure 10. 2024 Land Use Classification Confusion Matrix </p>
<p> Figure 11. Boone County 2000 Land Use </p>
<p> Figure 12. Boone County 2024 Land Use </p>
<p> Table 1. Boone County and Columbia Population Change since 1980 </p>

<h3> References </h3>

<p> <em> How to interpret a confusion matrix for a machine learning model</em>. (2025). https://www.evidentlyai.com/classification-metrics/confusion-matrix </p> 

<p> Marco Vanetti. <em> Confusion matrix online calculator</em>. (2007). https://marcovanetti.com/pages/cfmatrix/?noc=5 </p>

<p> Denise Nedea. <em> Confusion Matrix Calculator</em>. (2020). MDApp. https://www.mdapp.co/confusion-matrix-calculator-406/ </p>

<p> Anonym. (2023). <em> The many band combinations of Landsat 8</em>. NV5 Geospatial. https://www.nv5geospatialsoftware.com/Learn/Blogs/Blog-Details/the-many-band-combinations-of-landsat-8 </p>

<p> Gautum, V., Murugan, P., & Annadurai, M. (2017). <em> A New Three Band Index for Identifying Urban Areas using Satellite Images</em>. Global Civil Engineering Challanges in Sustainable Development and Climate Change[ICGCSC-17]. https://www.researchgate.net/publication/315447944_A_New_Three_Band_Index_for_Identifying_Urban_Areas_using_Satellite_Images </p>

<p> Kevin Butler. (2019). <em> Band Combinations for Landsat 8</em>. ArcGIS Blog. https://www.esri.com/arcgis-blog/products/product/imagery/band-combinations-for-landsat-8/ </p>
 
<p> Lillesand, T.M., Kiefer, R.W. and Chipman, J.W. (2004). <em> Remote Sensing and Image Interpretation</em>. 5th Edition, John Wiley, New York. </p>

<p> Mishra, S. S. (2020). <em> GETTING TO KNOW ABOUT IMAGE CLASSIFICATION - ( PART 2 ) => Discussing about methods and types of image classification</em>. https://www.linkedin.com/pulse/getting-know-image-classification-part-2-discussing-mishra </p>

<p> E Olson, C., Jr. (2008). Is 80% Accuracy Good Enough? In <em>Asprs</em>. The Future of Land Imaging . . . Going Operational, Denver, Mountain, United States of America. https://www.asprs.org/a/publications/proceedings/pecora17/0026.pdf </p>

<p> <em> T-Test, Chi-Square, ANOVA, Regression, Correlation</em>. . . (2025). https://datatab.net/tutorial/cohens-kappa </p>

<p> <em> Common landsat Band Combinations</em>. (2021). USGS. https://www.usgs.gov/media/images/common-landsat-band-combinations </p>

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
