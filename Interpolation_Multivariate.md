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

<p> The drought dataset was collected between July of 1998 and June of 2001. It is a cumulative dataset, so each proceeding month includes the values from the previous months. Most of the values within the dataset are negative, indicating that some deficiency in precipitation at those weather stations. By selecting June 1999 for the first portion of the project, a year of drought anomaly values are being analyzed.   </p> <br>

<p> The dataset takes the form of 56 weather stations in the form of points. These points will be interpolated to look at drought anomaly surfaces. First, it is important to conduct a visual analysis of the drought data with a chloropleth and graduated symbol map (Figure 1).  </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/ei7BZYD.jpeg" alt="Drought by Weather Station" style="width:100%;max-width:625px">
<figcaption> Figure 1. Cumulative Drought Values by Weather Station from July 1998 to June 1999 </figcaption>
</figure> <br>


<p> First, it is important to consider visual patterns of drought intensity. There is a definite pattern to the intensity of droughts in Kentucky as of June of 1999 (Figure 1). Areas experiencing drought seem to be clustered, as moving from west to east results in going from an area with no or little droughts to an area with a large deficiency in precipitation. Western Kentucky, which typically experiences intense storms and more erratic weather than the rest of Kentucky, was generally free of droughts or only experienced a minor decrease in rainfall. Eastern Kentucky, which typically has more rain showers than the rest of the state, had multiple stations reporting a precipitation deficiency of more than ten inches. The spatial patterns occurring on this map are contrary to Kentucky’s typical precipitation patterns, as western Kentucky generally experiences droughts due to erratic precipitation and Eastern Kentucky typically has higher recorded precipitation values -- or orographic rainfall.  </p> <br>

<p> There are some limitations within the dataset that need to be discussed. Since the boundary of the study area is the human-imposed border of Kentucky, critical drought values occurring just outside of Kentucky will not be calculated in the interpolation model. Similarly, there are few weather stations positioned on the edge of Kentucky, which may result in high error along the border. The edge effects can be mitigated by applying a buffer on the boundary of Kentucky and then running an interpolation model. Ideally, there would also be data on weather stations just outside of Kentucky in neighboring states so that the edge effects could be further mitigated.   </p> <br>

<h3> Inverse Distanced Weighed Interpolation  </h3> <br>

<p> Moving on, an inverse distance weighted (IDW) surface of the drought anomaly values can be created. IDWs are the simplest of the interpolation methods, though they can be parameter sensitive. 
These deterministic interpolation models are a member of the so-called "exact interpolators", since the predicted values at known locations are exactly the observed values (or 1). 
As they are deterministic models, they assume that the spatial association of the data is known -- in this case the weights are created by an arbitrary mathematical function (i.e. distance decay). This means that it requires expert knowledge and assumptions regarding the parameters, such as search distance and number of neighbors to use, to create an informative IDW. The IDW depicting drought anomalies is presented in Figure 2 below. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/FgL2aYh.jpeg" alt="IDW" style="width:100%;max-width:625px">
<figcaption> Figure 2. IDW of Cumulative Drought Anomalies from July 1998 to June 1999  </figcaption>
</figure> <br>

<p> Certain trends can be seen regardings statewide drought anomalies (Figure 2). Comparing values from the western portion of the state to the eastern portion, it becomes apparent that anisotropy is taking effect in Kentucky, as values in western Kentucky are positive, indicating no drought is occuring, compared to eastern Kentucky, where the drought is severe and the cumulative rainfall patterns are negative. In particular, northeastern Kentucky along the Ohio River and Big Sandy River presents the most severe instance of a drought. In central Kentucky, the cumulative precipitation is generally negative, though there is some variation, as various areas with higher precipitation show the drought is not forming a trend line.   </p> <br>

<h3> Limitations of the IDW Model </h3>

<p> There are a few definitions unique to interpolative methods that need to be defined to explain the limitations of the IDW surface. These pertain to the prediction accuracy of the surface created by the IDW, as well as how trustworthy the surface is. Analysis of accuracy refers to the accuracy of an interpolation model. This means examining errors, the difference between the predicted and observed values at known locations. Analysis of accuracy is done through validation and cross validation. Deterministic methods are limited to analyses of accuracy, which only consider prediction accuracy based on the sample data. Analysis of uncertainty refers to the trustworthiness of predicted values and how confident the user is about them. These analyses require a measure of uncertainty alongside the prediction surface, which limits analysis of uncertainty to stochastic interpolation methods such as kriging.  </p> <br>

<p> The prediction accuracy of the IDW surface can be evaluated by using validation or cross validation to check for errors in the surface – this is achieved by measuring the difference between predicted and observed values. With a large sample size, validation is typically used to sample a subset of the data and optimize an ideal model. With a small sample size, cross-validation is employed to interpolate over each of the points, one-by-one. This is done by removing a point, interpolating with the remaining points, then putting the removed point back in and iterating to the next point until the process is done for each point. Cross-validation is the default process and is done automatically for kriging. It is not done for an IDW surface, however.   </p> <br>

<p> The trustworthiness of the IDW surface cannot be computed with an IDW alone, because IDWs do not have a measure of uncertainty (as they are deterministic models and cannot account for randomness). In order to assess the trustworthiness of this interpolation model, a different stochastic method such as kriging would have to be used.  </p> <br>

<p> Finally, some limitations of the IDW model need to be considered. Major limitations include the average and bulls eye effect. If some of the chosen values used to interpolate are not within the threshold distance of any samples, they will not produce a surface: this can make outliers and edge values particularly difficult to interpolate around accurately. Depending on the number of points selected, proper continuity may also not be achieved if there are too few points. Each point in an IDW has the same weight, which can create issues for particularly high or low values. This can lead to the “bull’s eye” effect, where distant points will simply create a distance decay circle that does not properly reflect the subject being studied. Similarly, the range of interpolated values cannot exceed the number of observed values. To mitigate the edge effect, it is important that values are also positioned on the edge of the study area, though this is difficult to achieve in practice.  </p> <br>

<p> In order to create a kriging data model, some exploratory data analysis needs to be conducted. First, a histogram and some general descrptive statistics for the June 1999 values can be created. </p> <br>

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

<p> Kriging produces the best results when data fits the normal distribution. To analyze the drought anomaly data for June of 1999, a normal QQplot was created (Figure 4). </p>

<h3> Exploratory Data Analysis </h3> <br>
<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/NyMQkOO.jpeg" alt="QQPlot" style="width:100%;max-width:625px">
<figcaption> Figure 4. QQPlot of Cumulative Drought Anomalies from July 1998 to June 1999  </figcaption>
</figure> <br>


<p> The field values for June of 1999 are fairly normal, though there is a positive skew to the values of roughly 0.5.  Unfortunately, since drought values include negative values to indicate a lack of rainfall, it is impossible to apply a log, arcsin, or box transformation to reduce skewness and kurtosis. This can be observed in the histogram in Figure 4, where the right tail of the distribution is longer than the left tail. Similarly, the QQplot in Figure 5 shows some curving past the mean on the right-hand side, denoting a degree of skewness. Considering the context of this study, however, these June 1999 drought anomaly values should be compatible with ordinary kriging interpolation methods. For consideration, if these skewness and kurtosis values existed on a dataset for a subject such as critical resource mining, then more measures would have to be taken to ensure the analysis is accurate. </p> <br>


<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/52T6KDS.jpeg" alt="Trend Analysis" style="width:100%;max-width:625px">
<figcaption> Figure 5. Trend Analysis of Cumulative Drought Anomalies from July 1998 to June 1999   </figcaption>
</figure> <br>



<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/637kvtM.jpeg" alt="Semivariogram" style="width:100%;max-width:625px">
<figcaption> Figure 6. Semivariogram of Cumulative Drought Anomalies from July 1998 to June 1999   </figcaption>
</figure> <br>

<p> There certainly appears to be a second order trend in this data. The trend analysis in Figure 4 shows an upwards projecting U-shaped curve, indicating that drought values in central Kentucky are close to the mean while drought values in western and eastern Kentucky are far from the mean. Fortunately, this trend curve is rather broad, and will not affect the kriging interpolation too much. Similarly, the semivariogram in Figure 5 shows distant values on the right side of the figure, which denotes high and low values being diffused from the mean (or in other words, high and low values are autocorrelated with one another).   </p> <br>

<h3> Ordinary Kriging </h3> <br>

<p> Ordinary kriging is a stochastic method used for spatial interpolation and modeling. Compared to the deterministic IDW method, kriging has a few underlieing assumptions concerning the data. </p> <br>
    <ol>
    <li> The interpolation surface has a constant mean, with no underlieing trend. </li>
    <li> The variation of the surface is the same in each direction (also known as isotropic).  </li>
    <li> The semivariogram consists of a basic mathematical model with some clearly defined user parameters. </li>
    <li> The same variograms is applied over the entire study area. </li>
    </ol> <br>
    
<p> Unlike the IDW model, kriging is based on a description of spatial autocorrelation given by sample data, as the user must setup up an explicit function to describe the spatial autocorrelation.  
    It is an optimal method in the sense that it makes the best use of what can be inferred about the spatial structure in the interpolation surface from an analysis of the sample points. 
    Additionally, kriging allows for the quantification of interpolation errors and analysis of uncertainty, which lends it more statistical rigor. 
    However, it is also more complicated to conduct than an IDW, both conceptually and in terms of computation power.  </p> <br>



<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/5IDy5kN.jpeg" alt="Kriging" style="width:100%;max-width:625px">
<figcaption> Figure 7. Ordinary Kriging of Cumulative Drought Anomalies from July 1998 to June 1999   </figcaption>
</figure> <br>


<p> The trends in the kriging drought anomaly map are similar to those produced in the IDW map, though the interpolation is now more natural looking (Figure 7). The average and bulls eye effect from the IDW are no longer present here. Like in the IDW, there is a west to east trend in Kentucky, where drought anomalies are more severe in the eastern portion of the state compared to the western portion. In particular, northeastern Kentucky and now central Kentucky appear to be suffering the most severe droughts. Some areas, however, show variation in droughts as the area around Louisville and southeastern Kentucky are not as affected as central and northeastern Kentucky. Numerous kriging models were created before selecting this one: the parameters in Table 2 created a kriging map that best balanced the values of the cross validation statistics.  </p>

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
<td> Nugget </td>
<td> 6.8 </td>
</tr>
<tr>
<td> Model Type </td>
<td> Spherical </td>
</tr>
<tr>
<td> Angle </td>
<td> 65° </td>
</tr>
<tr>
<td> Direction </td>
<td> 65° </td>
</tr>
<tr>
<td> Minor to Max Range </td>
<td> 300,000 -- 397,000 </td>
</tr>
<tr>
<td> Partial Sill </td>
<td> 3.5 </td>
</tr>
<tr> 
<td> Bandwidth </td>
<td> 1.93 </td>
</tr>
</tbody>
</table>



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

<p> Based on the standard error map in Figure 8, values around central Kentucky and eastern Kentucky display a more reliably predicted values than those found around the edge of Kentucky. This is due to there being few weather stations along the edge of Kentucky, which means that there were fewer locations with drought values to use in the Kriging interpolation model. Ideally, weather stations outside of Kentucky would be included in a buffer to mitigate these higher standard error values, though such data are not easy to acquire in practice.  Table 3 reports the summary cross-validation statistics for the kriging model: while the mean and Root-Mean-Square are not quite at zero, the Root-Mean-Square standardized value is very close to one, indicating a good fit.  </p> <br>


<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/v2cImXo.jpeg" alt="KrigingProb" style="width:100%;max-width:625px">
<figcaption> Figure 9. Probability Kriging of Cumulative Drought Anomalies from July 1998 to June 1999   </figcaption>
</figure> <br>

<p> Figure 9 shows a probability map of cumulative precipitation anomalies in Kentucky potentially crossing the -7.5 in. drought marker threshold (the median of the June 1999 values). The areas that require drought emergency response are primarily in northeastern Kentucky, though portions of central Kentucky also have a high probability crossing the threshold. This area tends to have a higher probability (between 70% and 100%) of crossing the -7.5 in. cumulative precipitation amount. The weather station map, IDW, and Kriging map all reported that this area was experiencing the highest degree of drought in Kentucky during June 1999. So, out of all the areas in Kentucky afflicted by drought, northeastern Kentucky should receive most of the remediation efforts.  </p> <br>

<h1 style="text-align:center;"> Multivariate Methods: Applying some Measures to a Different Month </h1> <br>

<p> Multivariate statistics play a crucial role in Geographic Information Systems (GIS) by enabling the analysis of complex spatial data involving multiple variables simultaneously. Through techniques such as principal component analysis (PCA), cluster analysis, and canonical correlation analysis, multivariate statistics help to uncover patterns, relationships, and underlying structures within geospatial datasets. For instance, PCA can reduce the dimensionality of data, highlighting the most significant variables that influence spatial phenomena, while cluster analysis can identify distinct geographical areas with similar characteristics. By applying these statistical methods, GIS professionals can gain deeper insights into spatial processes, enhance predictive modeling, and make more informed decisions about land use, environmental management, and urban planning. </p> <br>

<h3> Mapping Another Month from the Drought Anomaly Data </h3> <br>

<p> As mentioned prior, the drought dataset is a cumulative dataset that was collected between July of 1998 and June of 2001. For the interpolative methods, only June of 1999 was analyzed (meaning one year of accumulated drought values). In this portion of the analysis, multivariate statistical methods will be used to analyze trends in the entire dataset. To start, a visualization for a different month was created. In this case, June of 2001 was chosen, as it displays the final cumulative result of the entire dataset. </p> <br>

<figure>
<img class="myImages" id="myImg" src= "https://i.imgur.com/PLyAwFW.jpeg" alt="2001Map" style="width:100%;max-width:625px">
<figcaption> Figure 10. Cumulative Drought by Weather Station in Kentucky from July 1998 to June 2001   </figcaption>
</figure> <br>

<p> Observing the values in the legend, there were precipitation deficiencies ranging from approximately -9 to -44 inches across Kentucky by June of 2001. The weather stations recording the highest precipitation deficiencies were in central Kentucky as well as parts of the Bluegrass. Generally, drought conditions tended to be less severe in western and northern Kentucky. </p> <br>

<p> Compared to the values from June 1999, the cumulative effects of the drought in June 2001 can be observed, as the most severe droughts peak at -44 inches compared to -18. Northeastern Kentucky, where the drought had been most severe in June 1999, has some of the mildest drought values by June of 2001. The directional effects (west to northeast) that were present in June of 1999 have also changed, as the most severe drought values are now in central Kentucky.  </p> <br>

<p> Unfortunately, there are only so many ways to analyze multivariate data in ArcGIS Pro. From this point on, the data will be prepared and analyzed in RStudio. First, a simple empirical look will be taken using agglomerative clustering methods to create a dendrogram of the cumulative drought anomalies at each weather station. Then, a more refined analysis will be conducted with K-means.     </p> <br>

<p> <em> Note: It is possible to conduct a K-means analysis in ArcGIS Pro with the multivariate clustering tool in the spatial statistics toolbox. A time-series box plot can also be created from this tool, as well as an analysis of the psuedo-F score. For agglomerative clustering, a dendrogram can be created in ArcGIS Pro, though it requires a signature file. RStudio, however, provides algorithms that can be used to depict and evaluate the quality of a clustering. </em> </p> <br>

<p> Agglomerative clustering has the advantage of displaying data in a dendrogram, which is a diagram that shows the hierarchical relationship between objects. (cont...)   </p> <br>

<h3> Agglomerative Clustering </h3> <br>

<p> Instead of using the raw data, the data was standardized. Standardization is essential in cluster analysis, which includes both hierarchical and k-means clustering. Even though all the measurements in this dataset are in inches, standardization has the additional benefits of ensuring that the dataset is accurate and uniform, as well as making it easier to find errors in the data. Having a uniform dataset is particularly important in this case, since the cumulative values within it might otherwise create biased results. Similarly, standardization allows for better control over biased values and outliers.  </p> <br>

<p> To create a dendrogram, the standardized drought values were used to create a dissimilarity matrix, which measures the distance between each recorded drought value. Then, each of those observations were paired together with their closest neighbor into groups until the entire dataset was in one group. Ward’s algorithm was used to minimize the spread of the clusters. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/d7VIMdt.jpeg" alt="Dendrogram" style="width:100%;max-width:625px">
<figcaption> Figure 11. Dendrogram of Cumulative Drought Anomalies from July 1998 to June 2001   </figcaption>
</figure> <br>


<table class = "tablecenter"> <caption> Table 4. Dendrogram Parameters </caption>
<thead>
<th> Parameter </th>
<th> Value </th>
</thead>
<tbody>
<tr>
<td> Number of Clusters </td>
<td> 4 </td>    
</tr>
<tr>
<td>  </td>
<td>  </td>
</tr>
</tbody>
</table>

<p> (Discuss Dendrogram and parameters used to make it) </p> <br>

<p> The dendrogram displays the overall clustering results for four clusters, though since the dataset contains monthly information ranging from July 1998 to June 2001, it would be valuable to see how this clustered data changes from month to month. To accomplish this, the clustered data was transposed and used to create a time series graph of each cluster. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/Z7oLU83.jpeg" alt="AggTimeSeries" style="width:100%;max-width:625px">
<figcaption> Figure 12. Time Series Plot of Agglomerative Cluster Mean Centers of Cumulative Drought Anomalies from July 1998 to June 2001   </figcaption>
</figure> <br>

<p>  </p> <br>

<p> Observing the time series plot in Figure 12, it is evident that each cluster has a distinct pattern. The first cluster (x1) includes the weather stations that recorded the highest initial drought values. As time progressed, the red time series line for cluster 1 rose, indicating that the drought anomalies recorded by these weather stations were gradually dissipating. The line for cluster 2 (x2) in green shows the reverse trend from cluster 1. Initially, there was little drought recorded by these weather stations, but as time progressed, the line fell, suggesting that drought anomalies became more severe. In 1998, the line for cluster 3 (x3) roughly matches the cluster 2 line, though after this period, the two lines diverge. After 1998, Cluster 3 generally moves upwards, indicating an alleviation of drought conditions at those respective weather stations. Finally, the line for cluster 4 (x4) starts highest out of all the clusters and rises far above the rest until falling in the latter half of 2000 to meet cluster 3’s line. These weather stations experienced the least severe drought conditions. It is important to remember, however, that this a time series plot of standardized drought values; by June of 2001, every weather station was experiencing a deficiency in precipitation as depicted in figure 10. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/jdMiKkW.jpeg" alt="AggMap" style="width:100%;max-width:625px">
<figcaption> Figure 13. Agglomerative Clustering Map of Cumulative Drought Anomalies in Kentucky from July 1998 to June 2001   </figcaption>
</figure> <br>

<p> To visualize the cluster data presented in the time series plot, the cluster group mean centers were mapped out by weather station membership in figure 13.  </p> <br>

<p> Weather stations marked with the green diamond (cluster 2) show areas where the drought started off mild and worsened over time, and stations with the light red star (cluster 1) shows areas where the drought started off severe but became milder towards the end of the period. For the two clusters showing less severe drought, the light blue square (cluster 3) depicts weather stations where the drought became less severe towards the end of the period, whereas the purple triangle (cluster 4) represents the weather stations recording the least severe drought values.  </p> <br>

<p> Geographic patterns can be seen in the clustering result. Generally, western Kentucky’s weather stations were placed in clusters 3 or 4, indicating that the drought anomaly values there were lower than in other parts of Kentucky. Central Kentucky’s weather stations, however, were mainly placed into clusters 1 or 2, indicating that the drought here was more severe. Northern Kentucky and parts of the Bluegrass also had less severe drought, as evidenced by the cluster 3 markers. Eastern Kentucky experienced various regional fluctuations regarding drought severity: some counties such as Floyd, Laurel, Letcher, and Morgan had the less severe drought (represented by clusters 3 and 4), though the rest of the region suffered from more severe drought.  </p> <br>

<h3> K-Means </h3> <br>

<p> (Talk about K-Means some) </p> <br>


<table class="tablecenter"> <caption> Table 5. Between Sum of Squares over Total Sum of Squares Partition Formula Table </caption> 
<thead>
<tr>
<th> # Clusters </th>
<th> BSS / TSS Value </th>
</tr>    
</thead>
<tmain>
<tr>
<td> Two clusters </td>
<td> 46.341006 </td>
</tr>
<tr>
<td> Three clusters </td>
<td> 60.31649 </td>
</tr>
<tr>
<td> Four clusters </td>
<td> 67.4345 </td>
</tr>
<tr>
<td> Five clusters </td>
<td> 69.81098 </td>
</tr>
<tr>
<td> Six clusters </td>
<td> 76.10357 </td>
</tr>
</tmain>
</table>

<p> (Plot data from cluster_analysis() </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/n1w7LjR.jpeg" alt= "Silhouette" style="width:100%;max-width:625px">
<figcaption> Figure 14. Ideal Number of Clusters under the Elbow Method  </figcaption>
</figure> <br>

<p> Figure 14 above depicts an “elbow method” graph, which displays the total within sum of squares as a function of the number of clusters. In other words, this is a essentially a graph of the TSS value on Table ?. The point containing the ideal number of clusters occurs where the slope of the line decreases and the “elbow” bends: at this point, adding another cluster does not substantially improve the BSS / TSS value. In this case, the bend is located at four clusters, where the function’s slope decreases. The “elbow” can be seen between two and four clusters.  </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/09wT6jY.jpeg" alt= "Silhouette" style="width:100%;max-width:625px">
<figcaption> Figure 15. Ideal Number of Clusters under the Silhouette Method  </figcaption>
</figure> <br>

<p> An alternative to the elbow method, the silhouette method is another approach that measures the quality of a clustering (Figure 15). The silhouette method calculates the average silhouette width within each potential number of clusters k, where a high score indicates that each object fits well within its cluster. In this case, the silhouette method suggests grouping the data into two clusters.  </p> <br>
<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/0Kibk2H.jpeg" alt= "Gap" style="width:100%;max-width:625px">
<figcaption> Figure 16. Ideal Number of Clusters under the Gap Statistic Method  </figcaption>
</figure> <br>

<p> Third is the gap statistic method (Figure 16), which can be applied to any clustering method. 
This method evaluates the total intra-cluster variation for different values of k by comparing them to their expected values derived from the null reference distribution of the data. The optimal number of clusters will be found by the value that yields the largest gap statistic. 
Rather than being a random uniform distribution of points, this means that objects within the clustering structure are like one another. Unfortunately, since the gap statistic suggests one cluster in this case, it is not useful for this analysis. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/Eb2uLiL.jpeg" alt="IdealKCluster" style="width:100%;max-width:625px">
<figcaption> Figure 17. Ideal Number of Clusters under the Consensus Algorithm  </figcaption>
</figure> <br>

<p> Since each of the previous tests suggested a different number of clusters to retain, it proved prudent to conduct a consensus-based algorithm. With this algorithm comprised of 30 different methods, figure 17 suggests that it is ideal to retain two clusters rather than the four selected from the dendrogram earlier. This decision was supported by 11 out of 30 methods.     </p> <br>


<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/nlbbxHa.jpeg" alt="SilhouetteWidthK" style="width:100%;max-width:625px">
<figcaption> Figure 18. Cluster Silhouette Plot  </figcaption>
</figure> <br>

<p> A cluster silhouette plot was used to review the suggestion of two clusters from the consensus algorithm (Figure 18). If a sizable majority of the values within the silhouette plot are positive, then the observations were placed within the correct group.  The possible values range from -1 < p < 1, where:  </p> <br>

<p> <ul> 
<li> a value of 0 indicates an observation is between two clusters. </li>
<li> a value of -1 indicates an observation does not fit in its cluster at all. </li>
<li> a value of 1 indicates an observation fits perfectly in its cluster.  </li>
</ul> </p> <br>

<p> The average silhouette width for two clusters is 0.41, indicating an okay fit overall. One observation within each cluster does not fit well within it (the bars below the 0.00 line) </p> <br>

<p> Table 6 below presents the average silhouette width with clusters up to k=6. The best fit does occur at k=2, as it has the highest average silhouette width. </p> <br>

<table class="tablecenter"> <caption> Table 6. Table of Average Silhouette Width Scores </caption>
<thead>
<tr>
<th> Number of Cluster </th>
<th> Average Silhouette Width </th>
</tr>
</thead>
<tbody>
<tr> 
<td> 2 </td>
<td> 0.41 </td>
</tr>
<tr>
<td> 3 </td>
<td> 0.36 </td>
</tr>
<tr> 
<td> 4 </td>
<td> 0.28 </td>
</tr>
<tr> 
<td> 5 </td>
<td> 0.24 </td>
</tr>
<tr>
<td> 6 </td>
<td> 0.26 </td> 
</tr>
</tbody>
</table> <br>

<p> Another way to view the cluster data is through the cluster plot method from the “factoextra” library. This method incorporates principal component analysis to reduce the dimensionality of the dataset (36 variables to 2) so that it can be represented in a 2D graph. Observing figure 19, there is some degree of overlap between, indicating that the differences in the measured variables between groups is only small. This was also reflected in the average silhouette width only reaching 0.42 in size. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/97QvHQJ.jpeg" alt="PCAplot" style="width:100%;max-width:625px">
<figcaption> Figure 19. Cluster Variance Plot   </figcaption>
</figure> <br>

<p>  </p>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/M5MBJGG.jpeg" alt="PCAplot2" style="width:100%;max-width:625px">
<figcaption> Figure 20. Alternate Cluster Variance Plot   </figcaption>
</figure> <br>



<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/XwFVhAb.jpeg" alt="AggTimeSeries" style="width:100%;max-width:625px">
<figcaption> Figure 21. Time Series Plot of K-mean Cluster Mean Centers of Cumulative Drought Anomalies from July 1998 to June 2001   </figcaption>
</figure> <br>


<p> (Time series plot discussion) </p> <br>

<figure>
<img class="myImages" id="myImg" src= "https://i.imgur.com/WHAg7RG.jpeg" alt="KMeansMap" style="width:100%;max-width:625px">
<figcaption> Figure 22. K-Means Clustering of Cumulative Drought Anomalies in Kentucky from July 1998 to June 2001   </figcaption>
</figure> <br>

<p> (Discuss map) </p>


<h3> Links to R graphs </h3> <br>

<p> Histogram </p>
<p> QQPlot </p>
<p> Semivariogram </p>
<p> Trend Analysis </p>
<p>  </p>

<h3> List of Figures and Tables </h3> <br>

<h3> References </h3> <br>
<p> https://psl.noaa.gov/data/usclimdivs/data/map.html#Kentucky%20 </p>
<p>  </p>
<p>  </p>
<p>  </p>


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
