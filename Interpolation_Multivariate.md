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
    </style>
</head>


<body>

<h1 style="text-align:center;"> Interpolation Methods: Using Kriging on a Dataset </h1> <br>

<p> Interpolation methods in GIS are vital techniques used to estimate values at unsampled locations within a geographic space based on known values from sampled points. These methods play a crucial role in generating continuous surfaces from discrete data points, facilitating spatial analysis and visualization. Common interpolation techniques include inverse distance weighting (IDW), which assigns weights to neighboring points based on their proximity; kriging, a geostatistical method that models spatial dependence; and spline interpolation, which fits a mathematical function through points to create a smooth surface. Each method has its strengths and applicability depending on the nature of the data and the spatial variability being analyzed, ensuring accurate representation and prediction in GIS applications ranging from environmental modeling to urban planning.
</p> <br>

<p> This project is broken into two parts. The first looks at historical cumulative drought anomaly data from June of 1999 (so values include July 1998 - June 1999) in Kentucky using interpolation techniques, and the second looks at the entire dataset (July 1998 - June 2001) using multivariate statistical methods.  </p> <br>

<h3> Drought Anomaly Data for this Project </h3> <br>

<p> The drought dataset was collected between July of 1998 and June of 2001. It is a cumulative dataset, so each proceeding month includes the values from the previous months. Most of the values within the dataset are negative, indicating that some form of drought was occuring at those particular weather stations. By selecting June 1999 for the first portion of the project, a year of drought anomaly values are being analyzed.   </p> <br>

<p> The dataset takes the form of 56 weather stations in the form of points. These points will be interpolated to look at drought anomaly surfaces. Before looking at that, it is important to conduct a visual analysis of drought data via a chloropleth and graduated symbol map.  </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/ei7BZYD.jpeg" alt="Drought by Weather Station" style="width:100%;max-width:625px">
<figcaption> Figure 1. Cumulative Drought Values by Weather Station from July 1998 to June 1999 </figcaption>
</figure> <br>


<p> First, it would do well to consider visual patterns of drought intensity. There is a definite pattern to the intensity of droughts in Kentucky as of June of 1999 (Figure 1). There appears to be a directional effect occurring with regards to droughts in Kentucky, as moving from west to east results in going from an area with no or little droughts to an area with a large deficiency in precipitation. Western Kentucky, which typically experiences intense storms and more erratic weather than the rest of Kentucky, was generally free of droughts or only experienced a minor decrease in rainfall. Eastern Kentucky, which typically has more rain showers than the rest of the state, had multiple stations reporting a precipitation deficiency of more than ten inches. The spatial patterns occurring on this map are contrary to Kentucky’s typical precipitation patterns, as western Kentucky generally experiences droughts due to erratic precipitation and Eastern Kentucky typically has higher recorded precipitation values -- or orographic rainfall.  </p> <br>

<p> There are some limitations within the dataset that need to be discussed. Since the boundary of the study area is the human-imposed border of Kentucky, critical drought values occurring just outside of Kentucky will not be calculated in the interpolation model. Similarly, there are few weather stations positioned on the edge of Kentucky, which may result in high error along the border. The edge effects can be mitigated by applying a buffer on the boundary of Kentucky and then running an interpolation model. Ideally, there would also be data on weather stations just outside of Kentucky in neighboring states so that the edge effects could be mitigated.   </p> <br>

<h3> Inverse Distanced Weighed Interpolation  </h3> <br>

<p> Moving on, an inverse distance weighted (IDW) surface of the drought anomaly values can be created. The IDW is presented in Figure 2 below. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/FgL2aYh.jpeg" alt="IDW" style="width:100%;max-width:625px">
<figcaption> Figure 2. IDW of Cumulative Drought Anomalies from July 1998 to June 1999  </figcaption>
</figure> <br>



<p> There are a few definitions unique to interpolative methods that need to be defined before analyzing the IDW. These pertain to the prediction accuracy of the surface created by the IDW, as well as how trustworthy the surface is. Analysis of accuracy refers to the accuracy of an interpolation model. This means examining errors, the difference between the predicted and observed values at known locations. Analysis of accuracy is done through validation and cross validation. Deterministic methods are limited to analyses of accuracy, which only consider prediction accuracy based on the sample data. Analysis of uncertainty refers to the trustworthiness of predicted values and how confident the user is about them. These analyses require a measure of uncertainty alongside the prediction surface, which limits analysis of uncertainty to stochastic interpolation methods such as kriging.  </p> <br>

<p> The prediction accuracy of the IDW surface can be evaluated by using validation or cross validation to check for errors in the surface – this is achieved by measuring the difference between predicted and observed values. With a large sample size, validation is typically used to sample a subset of the data and optimize an ideal model. With a small sample size, cross-validation is employed to interpolate over each of the points, one-by-one. This is done by removing a point, interpolating with the remaining points, then putting the removed point back in and iterating to the next point until the process is done for each point. Cross-validation is the default process and is done automatically for kriging. It is not done for an IDW surface however.   </p> <br>

<p> The trustworthiness of the IDW surface cannot be computed with an IDW alone, because IDWs do not have a measure of uncertainty (as they are deterministic models and cannot account for randomness). In order to assess the trustworthiness of this interpolation model, a different stochastic method such as kriging would have to be used.  </p> <br>

<p> Next, it is important to determine whether there are any statewide trends in drought anomaly data. Such a trend can be seen in Kentucky regarding drought anomalies. Comparing values from the western portion of the state to the eastern portion, it becomes apparent that anisotropy is taking effect in Kentucky, as values in western Kentucky are positive, indicating no drought is occuring, compared to eastern Kentucky, where the drought is severe and the cumulative rainfall patterns are negative. In particular, northeastern Kentucky along the Ohio River and Big Sandy River presents the most severe instance of a drought. In central Kentucky, the cumulative precipitation is generally negative, though there is some variation, as various areas with higher precipitation show the drought is not forming a trend line.   </p> <br>

<p> Finally, some limitations of the IDW model need to be considered. Major limitations include the average and bull’s eye effect. If some of the chosen values used to interpolate are not within the threshold distance of any samples, they will not produce a surface: this can make outliers and edge values particularly difficult to interpolate around accurately. Depending on the number of points selected, proper continuity may also not be achieved if there are too few points. Each point in an IDW has the same weight, which can create issues for particularly high or low values. This can lead to the “bull’s eye” effect, where distant points will simply create a distance decay circle that does not properly reflect the studied subject. Similarly, the range of interpolated values cannot exceed the number of observed values. To mitigate the edge effect, it is important that values are also positioned on the edge of the study area, though this is difficult to achieve in practice.  </p> <br>

<h3> Exploratory Data Analysis </h3> <br>
<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/ACNMao3.jpeg" alt="Histogram" style="width:100%;max-width:625px">
<figcaption> Figure 3. Histogram of Cumulative Drought Anomalies from July 1998 to June 1999  </figcaption>
</figure> <br>



<table class="tablecenter"> <caption> Table 1. Descriptive Statistics for the Drought Anomalies in June of 1999 </caption>
<thead>
<tr>
<th> Descriptive Statistic </th>
<th> Value</th>
</tr>
</thead>
<tbody>
<tr>
<td> Number of Observations </td>
<td> 56</td>
</tr>
<tr>
<td> Minimum Value </td>
<td> -18.18 in </td>
</tr>
<tr>
<td> Maximum Value </td>
<td> 6.52 in </td>
</tr>
<tr>
<td> Average </td>
<td> -6.859 in </td>
</tr>
<tr>
<td> Standard Deviation </td>
<td> 4.624 in </td>
</tr>
<tr>
<td> Skewness </td>
<td> 0.498 in </td>
</tr>
<tr>
<td> Kurtosis </td>
<td> 3.844 in </td>
</tr>
<tr>
<td> First Quartile </td>
<td> -9.24 in </td>
</tr>
<tr>
<td> Median </td>
<td> -7.46 in </td>
</tr>
<tr>
<td> Third Quartile </td>
<td> -4.7 in </td>
</tr>
<tr>
<td> Interquartile Range </td>
<td> 4.115 in </td>
</tr>
</tbody>    
</table> <br>

<p> One assumption of kriging is that the underlieing dataset is normally distributed. To analyze the drought anomaly data for June of 1999, a normal QQplot was created (Figure ?). </p>

<h3> Exploratory Data Analysis </h3> <br>
<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/NyMQkOO.jpeg" alt="QQPlot" style="width:100%;max-width:625px">
<figcaption> Figure 4. QQPlot of Cumulative Drought Anomalies from July 1998 to June 1999  </figcaption>
</figure> <br>


<p> The field values for June of 1999 are fairly normal, though there is a positive skew to the values of roughly 0.5.  Unfortunately, since drought values include negative values to indicate a lack of rainfall, it is impossible to apply a log, arcsin, or box transformation to reduce skewness and kurtosis. This can be observed in the histogram in Figure ?, where the right tail of the distribution is longer than the left tail. Similarly, the QQplot in Figure ? shows some curving past the mean on the right-hand side, denoting a degree of skewness. Considering the context of this study, however, these June 1999 drought anomaly values should be compatible with ordinary kriging interpolation methods. For consideration, if these skewness and kurtosis values existed on a dataset for a topic such as critical resource mining, then it may not be best to proceed with a kriging analysis. </p> <br>



<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/52T6KDS.jpeg" alt="Trend Analysis" style="width:100%;max-width:625px">
<figcaption> Figure 5. Trend Analysis of Cumulative Drought Anomalies from July 1998 to June 1999   </figcaption>
</figure> <br>



<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/637kvtM.jpeg" alt="Semivariogram" style="width:100%;max-width:625px">
<figcaption> Figure 6. Semivariogram of Cumulative Drought Anomalies from July 1998 to June 1999   </figcaption>
</figure> <br>

<p> There certainly appears to be a second order trend in this data. The trend analysis in Figure 4 shows an upwards projecting U-shaped curve, indicating that drought values in central Kentucky are close to the mean while drought values in western and eastern Kentucky are far from the mean. Fortunately, this trend curve is rather broad, and will not affect the kriging interpolation too much. Similarly, the semivariogram in Figure 5 shows distant values on the right side of the figure, which denotes high and low values being diffused from the mean (or in other words, high and low values are autocorrelated with one another).   </p> <br>




<h3> Kriging </h3> <br>

<p> (Intro context to kriging map) </p> <br>


<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/5IDy5kN.jpeg" alt="Kriging" style="width:100%;max-width:625px">
<figcaption> Figure 7. Ordinary Kriging of Cumulative Drought Anomalies from July 1998 to June 1999   </figcaption>
</figure> <br>


<p> The trends in the kriging drought anomaly map are roughly similar to those produced in the IDW map, though the interpolation is now much more natural looking (Figure 7). The average and bull’s eye effect from the IDW are no longer present here. Like in the IDW, there is a west to east trend in Kentucky, where drought anomalies are more severe in the eastern portion of the state compared to the western portion. In particular, northeastern Kentucky and now central Kentucky appear to be suffering the most severe droughts. Some areas, however, show variation in droughts as the area around Louisville and southeastern Kentucky are not as affected as central and northeastern Kentucky. Numerous kriging models were created before selecting this one: the parameters in Table 2 created a kriging map that best balanced the values of the cross validation statistics.  </p>

<p> (Stick kriging table parameters in here) </p> <br>

<table class="tablecenter"> <caption> Table 2. Ordinary Kriging Parameters </caption>
<thead>
<tr>
<td> Parameter </td>
<td> Value </td>
</tr>
</thead>
<tbody>
<tr>
<td> Lag Size </td>
<td> 34600 </td>
</tr>
<tr> 
<td> Number of Lags </td>
<td> 12 </td>
</tr>
<tr>
<td> Model Type </td>
<td> Spherical </td>
</tr>
</tbody>
</table>

<p> (Discuss drought distribution from kriging here) </p> <br>


<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/LnitCej.jpeg" alt="KrigingSTDE" style="width:100%;max-width:625px">
<figcaption> Figure 8. Ordinary Kriging Standard Errors of Cumulative Drought Anomalies from July 1998 to June 1999   </figcaption>
</figure> <br>



<table class="tablecenter"> <caption> Table 3. Cross Validation Statistics </caption>
<thead> 
<tr>
<th> Statistic </th>
<th> Measured Value </th>
</tr>
</thead>
<tbody>
<tr>
<td> Count </td>
<td> 56</td>
</tr>
<tr> 
<td> Mean </td>
<td> -0.042 </td>
</tr>
<tr>
<td> Root-Mean-Square </td>
<td> 3.243 </td>
</tr>
<tr>
<td> Mean Standardized </td>
<td> -0.011 </td>
</tr>
<tr>
<td> Root-Mean-Square Standardized </td>
<td> 1.011 </td>
</tr>
<tr> 
<td> Average Standard Error </td>
<td> 3.176 </td>
</tr>
</tbody>
</table> <br>

<p> Based on the standard error map in Figure 8, values around central Kentucky and eastern Kentucky indicate a more reliable prediction than values around the edge of Kentucky. This is due to there being few weather stations along the edge of Kentucky, which means that there were fewer locations with drought values to use in the Kriging interpolation model. Ideally, weather stations outside of Kentucky would be included in a buffer to mitigate these higher standard error values, though such data are not always easy to acquire in practice.  Table 2 reports the summary cross-validation statistics for the kriging model: while the mean and Root-Mean-Square are not quite at zero, the Root-Mean-Square standardized value is very close to one, indicating a good fit.  </p> <br>


<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/v2cImXo.jpeg" alt="KrigingProb" style="width:100%;max-width:625px">
<figcaption> Figure 9. Probability Kriging of Cumulative Drought Anomalies from July 1998 to June 1999   </figcaption>
</figure> <br>

<p> Figure 9 shows a probability map of cumulative precipitation anomalies in Kentucky potentially crossing the -7.5 in. drought marker threshold. The areas that require drought emergency response are primarily northeastern Kentucky, though portions of central Kentucky also have a high probability. This area tends to have a higher probability (between 70% and 100%) of crossing the -7.5 in. cumulative precipitation amount. The weather station map, IDW, and Kriging map all reported that this area was experiencing the highest degree of drought in Kentucky during June 1999. So, out of all the areas in Kentucky afflicted by drought, northeastern Kentucky should receive most of the remediation efforts.  </p> <br>

<h1 style="text-align:center;"> Multivariate Methods: Applying some Measures to a Different Month </h1> <br>

<p> Multivariate statistics play a crucial role in Geographic Information Systems (GIS) by enabling the analysis of complex spatial data involving multiple variables simultaneously. Through techniques such as principal component analysis (PCA), cluster analysis, and canonical correlation analysis, multivariate statistics help to uncover patterns, relationships, and underlying structures within geospatial datasets. For instance, PCA can reduce the dimensionality of data, highlighting the most significant variables that influence spatial phenomena, while cluster analysis can identify distinct geographical areas with similar characteristics. By applying these statistical methods, GIS professionals can gain deeper insights into spatial processes, enhance predictive modeling, and make more informed decisions about land use, environmental management, and urban planning. </p> <br>

<h3> Picking Another Month from the Drought Anomaly Data </h3> <br>

<p> As mentioned prior, the drought dataset is a cumulative dataset that was collected between July of 1998 and June of 2001. For the interpolative methods, only June of 1999 was analyzed (meaning one year of accumulated drought values). In this portion of the analysis, multivariate statistical methods will be used to analyze trends in the entire dataset. To start, a visualization for a different month was created. In this case, June of 2001 was chosen. </p> <br>

<p> (June 2001 Weather Station map here) </p> <br>

<p> (Stuff about map) </p> <br>

<p> Unfortunately, there are only so many ways to analyze multivariate data in ArcGIS Pro. From this point on, most of the data will be prepared and analyzed in R. First, a simple empirical look will be taken using agglomerative clustering methods to create a dendogram of the cumulative drought anomalies at each weather station. Then, further tests will be conducted with K-means.     </p> <br>

<h3> Agglomerative Clustering </h3> <br>



<h3> K-Means </h3>



<h3> Links to R graphs </h3> <br>

<h3> List of Figures and Tables </h3> <br>

<h3> References </h3> <br>
<p> https://psl.noaa.gov/data/usclimdivs/data/map.html#Kentucky%20 </p>

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
