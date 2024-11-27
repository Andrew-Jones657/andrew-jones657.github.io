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
    .imgContainer{
    float:left;
    }
    
    </style>
</head>


<body>

<h1 style="text-align:center;"> Data Analysis in ArcGIS Pro and R: Analyzing a Drought Anomaly Dataset with Interpolation Methods and Multivariate Techniques </h1> <br>

<p> GIS data analysis plays a crucial role in both interpolation methods and multivariate methods by enabling the visualization, interpretation, and prediction of spatial relationships between variables. In interpolation, GIS helps estimate unknown values at unmeasured locations by using techniques like Inverse Distance Weighting (IDW), Kriging, and spline interpolation to create continuous surfaces from sparse data points. In multivariate methods, GIS facilitates the analysis of complex interactions between multiple spatial and non-spatial variables through techniques such as Principal Component Analysis (PCA), cluster analysis, and multiple regression, allowing for the identification of patterns, correlations, and predictions based on spatially distributed factors. These methods, powered by GIS, are applied across various fields like environmental monitoring, urban planning, and public health to provide deeper insights and support decision-making. </p> <br>

<h3> Interpolation Methods in GIS: IDW and Kriging Interpolation </h3> <br>

<p> Interpolation methods in GIS are vital techniques used to estimate values at unsampled locations within a geographic space based on known values from sampled points. These methods play a crucial role in generating continuous surfaces from discrete data points, facilitating spatial analysis and visualization. Common interpolation techniques include inverse distance weighting (IDW), which assigns weights to neighboring points based on their proximity; kriging, a geostatistical method that models spatial dependence; and spline interpolation, which fits a mathematical function through points to create a smooth surface. Each method has its strengths and applicability depending on the nature of the data and the spatial variability being analyzed, ensuring accurate representation and prediction in GIS applications ranging from environmental modeling to urban planning.
</p> <br>

<p> (something to transition into intent) </p> <br>

<p> The intent of this project is to explore a large drought dataset with data analysis techniques. The underlying dataset, in particular, is realistic in the sense that it has some degree of skewness, underlieing trends, negative values, and involves physically collected data. To conduct the data analysis, ArcGIS Pro and R statistical programming language are used. </p> <br>
    
<p> Aptly, this project is broken into two parts. The first looks at historical cumulative drought anomaly data by June of 1999 in Kentucky using interpolation techniques, and the second looks at the entire dataset, i.e. June 2001, using multivariate statistical methods.   </p> <br>

<h3> Drought Anomaly Data for this Project </h3> <br>

<p> The drought dataset was collected between July 1998 and June 2001. It is cumulative, meaning that each month’s data includes values from previous months. Most values in the dataset are negative, indicating a deficiency in precipitation at the weather stations. For the initial portion of the project, drought anomaly values from June 1999 will be analyzed, covering a full year of data.  </p> <br>

<p> The dataset comprises 56 weather stations represented as points. These points will be interpolated to create drought anomaly surfaces. To begin, it is essential to conduct a visual analysis of the drought data using a choropleth and graduated symbol map (Figure 1). A simplified version of the dataset can be found here (link): this simplified dataset contains the reference information as well as cumulative drought values for June 1999 and June 2001. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/ei7BZYD.jpeg" alt="Drought by Weather Station" style="width:100%;max-width:625px">
<figcaption> Figure 1. Cumulative Drought Values by Weather Station from July 1998 to June 1999 </figcaption>
</figure> <br>


<p> First, it’s important to examine the visual patterns of drought intensity in Kentucky as of June 1999 (Figure 1). A clear pattern emerges: drought areas are clustered, with a notable transition from west to east. Western Kentucky, which typically experiences intense storms and more erratic weather, was largely free of drought or saw only minor decreases in rainfall. In contrast, eastern Kentucky, known for its higher frequency of rain showers, had multiple stations reporting precipitation deficiencies exceeding ten inches. These spatial patterns deviate from Kentucky’s usual precipitation trends, where western Kentucky often faces drought conditions and eastern Kentucky typically records higher rainfall levels, including orographic effects. </p>

<p> However, there are limitations within the dataset that should be addressed. The study area is bounded by Kentucky’s borders, meaning that significant drought values occurring just outside the state will not be included in the interpolation model. Additionally, there are few weather stations along the edges of Kentucky, which may lead to increased error in those areas. To mitigate these edge effects, a buffer could be applied around Kentucky's boundary before running the interpolation model. Ideally, incorporating data from weather stations in neighboring states would further enhance the analysis by reducing edge effects.  </p> <br>

<h3> Inverse Distanced Weighed Interpolation  </h3> <br>

<p> Next, an inverse distance weighted (IDW) surface can be created to represent the drought anomaly values. IDW is one of the simplest interpolation methods, though it can be sensitive to parameter choices. These deterministic interpolation models are known as "exact interpolators" because the predicted values at known locations exactly match the observed values. Because they are deterministic, IDWs assume that the spatial relationships in the data are well understood; in this case, weights are calculated using a mathematical function based on distance decay. Creating an informative IDW requires expert knowledge and careful consideration of parameters such as search distance and the number of neighbors. The IDW surface depicting drought anomalies is shown in Figure 2 below. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/FgL2aYh.jpeg" alt="IDW" style="width:100%;max-width:625px">
<figcaption> Figure 2. IDW of Cumulative Drought Anomalies from July 1998 to June 1999  </figcaption>
</figure> <br>

<p> Certain trends in statewide drought anomalies are evident (Figure 2). Comparing the western and eastern portions of Kentucky reveals a clear anisotropic effect: western Kentucky shows positive values, indicating the absence of drought, while eastern Kentucky experiences severe drought, reflected in negative cumulative rainfall patterns. Notably, northeastern Kentucky, particularly along the Ohio River and Big Sandy River, exhibits the most severe drought conditions. In central Kentucky, cumulative precipitation is generally negative, although there is some variation, as certain areas with higher precipitation indicate that drought conditions are not forming a consistent trend.   </p> <br>

<h3> Limitations of the IDW Model </h3>

<p> To explain the limitations of the inverse distance weighted (IDW) surface, it is important to define several key concepts related to interpolation methods. These concepts pertain to the prediction accuracy of the surface created by IDW and its trustworthiness. </p>

<p> <em> Analysis of accuracy </em> refers to the examination of errors—the differences between predicted and observed values at known locations. This analysis is conducted through validation and cross-validation. Deterministic methods like IDW are limited to accuracy analysis, focusing solely on prediction accuracy based on the sample data. In contrast, <em> analysis of uncertainty </em> evaluates the trustworthiness of predicted values and the user’s confidence in them. This requires a measure of uncertainty alongside the prediction surface, which is typically limited to stochastic interpolation methods such as kriging. </p> <br>

<p> The prediction accuracy of the IDW surface can be assessed using <em> validation </em> or <em> cross-validation </em> to identify errors. Validation involves sampling a subset of data to optimize the model, while cross-validation is used with smaller sample sizes. In cross-validation, each data point is removed one at a time, and the remaining points are used to make predictions for that removed point. This process is repeated for each point. While cross-validation is the default method for kriging, it is not applied to IDW surfaces.  </p> <br>

<p> The <em>trustworthiness </em> of the IDW surface cannot be evaluated using IDW alone, as it lacks a measure of uncertainty; being a deterministic model, it does not account for randomness. To assess the trustworthiness of the interpolation model, a stochastic method like kriging must be employed.  </p> <br>

<p> Several limitations of the IDW model must be considered. Major limitations include the average effect and the bull’s eye effect. If some values used for interpolation fall outside the threshold distance from any samples, they will not produce a valid surface, making it difficult to accurately interpolate around outliers and edge values. Additionally, if too few points are selected, proper continuity may not be achieved. In IDW, each point carries the same weight, which can skew results when particularly high or low values are present, leading to the "bull's eye" effect—where distant points create distance decay circles that fail to accurately represent the area being studied. Furthermore, the range of interpolated values cannot exceed the number of observed values. To mitigate edge effects, it is crucial to have values positioned along the edges of the study area, although this is challenging in practice. </p> <br>


<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/gXzBwVP.png" alt="IDW" style="width:100%;max-width:625px">
<figcaption> Figure ?. The Bull's Eye Effect  </figcaption>
</figure> <br>

<p> Before creating a kriging interpolation model, exploratory data analysis is necessary to assess whether a dataset is . This includes a number of statistical measures, such as histograms, descriptive statistics, QQplots, semivariograms, and trend analyses for the June 1999 values.  </p> <br>

<h3> Exploratory Data Analysis </h3> <br>

<p> To analyze the distribution of drought deficiencies as of June 1999, a histogram was created to visualize the data (Figure 3). Additionally, descriptive statistics are presented in Table 1. The histogram indicates that the data for June 1999 follows a fairly normal distribution, albeit with a slight positive skew of approximately 0.5 (Table 1). The kurtosis value is relatively high at 3.84, suggesting that many observations are clustered around the mean. However, since drought values can be negative to represent a lack of rainfall, applying transformations such as logarithmic, arcsine, or Box-Cox is not feasible for reducing skewness and kurtosis. This asymmetry is evident in Figure 3, where the right tail of the distribution is longer than the left tail. </p> <br>

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

<p> Kriging yields optimal results when the data adheres to a normal distribution. To evaluate the drought anomaly data for June 1999, a normal QQ plot was generated (Figure 4). This QQ plot reveals a noticeable curvature on the right side, indicating some degree of skewness. However, given the context of this study, the June 1999 drought anomaly values are expected to be compatible with ordinary kriging interpolation methods.  </p> <br>


<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/NyMQkOO.jpeg" alt="QQPlot" style="width:100%;max-width:625px">
<figcaption> Figure 4. QQPlot of Cumulative Drought Anomalies from July 1998 to June 1999  </figcaption>
</figure> <br>


<p> A trend analysis graph was created to determine if directional effects were present in the dataset. This was done by generating a 3D scatterplot to examine the relationship between latitude, longitude, and drought values. Upon closer inspection, the scatterplot reveals a shape resembling the outline of Kentucky. Notably, the low, red points indicate areas where drought anomalies are most severe. The analysis suggests a second-order trend, with Figure 5 showing an upward, U-shaped curve for both latitude and longitude. This pattern implies that drought values in central Kentucky are close to the mean, while those in western and eastern Kentucky show significant deviations from the mean. Similarly, the drought levels in southern Kentucky are less severe than those in northern Kentucky. </p> <br>
    
<p> The broad nature of this trend curve is unlikely to have a substantial effect on the kriging interpolation. If the trend effects (anisotropy) were extremely prominent, it would be possible to remove them, though doing so would limit the creation of other kriging models (e.g. standard error and prediction).   </p> <br>


<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/Si8aGfA.jpeg" alt="Trend Analysis" style="width:100%;max-width:625px">
 <div class="row">
  <div class="column">
    <img class="myImages" id="myImg" src="https://i.imgur.com/BsgwwWk.jpeg" alt="LON" style="width:100%">
  </div>
  <div class="column">
    <img class="myImages" id="myImg" src="https://i.imgur.com/GWXSWWU.jpeg" alt="LAT" style="width:100%">
  </div>
</div>
<figcaption> Figure 5. Trend Analysis of Cumulative Drought Anomalies from July 1998 to June 1999   </figcaption>    
</figure>    <br>

<p> To visualize how the drought anomalies display spatial autocorrelation, a semivariogram was created (Figure 6). The semivariogram illustrates distant values on the right side, indicating that both high and low values are dispersed from the mean. In other words, high and low values exhibit autocorrelation with one another.  </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/EbNdkPI.jpeg" alt="Semivariogram" style="width:100%;max-width:625px">
<figcaption> Figure 6. Semivariogram Cloud of Cumulative Drought Anomalies from July 1998 to June 1999   </figcaption>
</figure> <br>



<h3> Ordinary Kriging </h3> <br>

<p> Unlike the IDW model, kriging is based on a description of spatial autocorrelation given by sample data, as the user must create an explicit function to model the spatial autocorrelation with a semivariogram. Kriging is an optimal method in the sense that it makes the best use of what can be inferred about the spatial structure in the interpolation surface from an analysis of the sample points. Additionally, kriging allows for the quantification of interpolation errors and analysis of uncertainty, which lends it more statistical rigor. Compared to the deterministic IDW method, kriging has several assumptions concerning the underlying dataset. </p> <br>
    <ol>
    <li> The interpolation surface has a constant mean, with no underlieing trend. </li>
    <li> The data arise from a stochastic stationary process. </li>
    <li> The variation of the surface is the same in each direction (also known as isotropic).  </li>
    <li> The semivariogram consists of a mathematical model with clearly defined user parameters. </li>
    <li> The same variograms is applied over the entire study area. </li>
    </ol> <br>

<p> The differences between kriging and the idw model are visualized in the illustration below (Figure ?).  </p>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/j2TlB49.png" alt="IDWvKriging" style="width:100%;max-width:625px">
<figcaption> Figure ?. Kriging vs IDW Interpolation Models (Posts, 2018)   </figcaption>
</figure> <br>

<p> The parameters below were used to model the semivariogram for kriging interpolation.  </p> <br>
    
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
</table> <br>

<p> The modeled semivariogram is presented below (Figure ?).  </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/637kvtM.jpeg" alt="Semivariogram" style="width:100%;max-width:625px">
<figcaption> Figure ?. The Modeled Semivariogram   </figcaption>
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


<p> The trends in the kriging drought anomaly map are similar to those produced in the IDW map, though the interpolation is now more natural looking (Figure 7). The average and bulls eye effect from the IDW are no longer present here. Like in the IDW, there is a west to east trend in Kentucky, where drought anomalies are more severe in the eastern portion of the state compared to the western portion. In particular, northeastern Kentucky and now central Kentucky appear to be suffering the most severe droughts. Some areas, however, show variation in droughts as the area around Louisville and southeastern Kentucky are not as affected as central and northeastern Kentucky. Numerous kriging models were created before selecting this one: the parameters in Table 2 created a kriging map that best balanced the values of the cross validation statistics.  </p> <br>



<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/5IDy5kN.jpeg" alt="Kriging" style="width:100%;max-width:625px">
<figcaption> Figure 7. Ordinary Kriging of Cumulative Drought Anomalies from July 1998 to June 1999   </figcaption>
</figure> <br>


<p> A powerful capability of kriging is the ability to create a model that displays the standard error of the kriging interpolation. Based on the standard error map in Figure 8 below, values around central Kentucky and eastern Kentucky display a more reliably predicted values than those found around the edge of Kentucky. This is due to there being few weather stations along the edge of Kentucky, which means that there were fewer locations with drought values to use in the Kriging interpolation model. Ideally, weather stations outside of Kentucky would be included in a buffer to mitigate these higher standard error values, though such data are not easy to acquire in practice.  Table 3 reports the summary cross-validation statistics for the kriging model: while the mean and Root-Mean-Square are not quite at zero, the Root-Mean-Square standardized value is very close to one, indicating a good fit.  </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/LnitCej.jpeg" alt="KrigingSTDE" style="width:100%;max-width:625px">
<figcaption> Figure 8. Ordinary Kriging Standard Errors of Cumulative Drought Anomalies from July 1998 to June 1999   </figcaption>
</figure> <br>


<p>  Figure 9 shows a probability map of cumulative precipitation anomalies in Kentucky potentially crossing the -7.5 in. drought marker threshold, which is the median value for June 1999. The areas that require drought emergency response are primarily in northeastern Kentucky, though portions of central Kentucky also have a high probability crossing the threshold. This area tends to have a higher probability (between 70% and 100%) of crossing the -7.5 in. cumulative precipitation amount. The weather station map, IDW, and Kriging map all reported that this area was experiencing the highest degree of drought in Kentucky during June 1999. So, out of all the areas in Kentucky afflicted by drought, northeastern Kentucky should receive most of the remediation efforts.  </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/v2cImXo.jpeg" alt="KrigingProb" style="width:100%;max-width:625px">
<figcaption> Figure 9. Probability Kriging of Cumulative Drought Anomalies from July 1998 to June 1999   </figcaption>
</figure> <br>


<p> By using kriging interpolation, a good model depicted where drought was most severe in Kentucky by June 1999. However, that was one month out of 36 different months in the dataset. It would be inefficient to attempt to create a stable kriging interpolation model for each month in this time period. Instead, it would prove valuable to incorporate multivariate statistical measures to observe similarities and differences across the entire dataset.   </p>

<h1 style="text-align:center;"> Multivariate Methods: Observing Trends in the Entire Dataset </h1> <br>

<p> Multivariate statistics play a crucial role in Geographic Information Systems (GIS) by enabling the analysis of complex spatial data involving multiple variables simultaneously. Through techniques such as principal component analysis (PCA), cluster analysis, and canonical correlation analysis, multivariate statistics help to uncover patterns, relationships, and underlying structures within geospatial datasets. For instance, PCA can reduce the dimensionality of data, highlighting the most significant variables that influence spatial phenomena, while cluster analysis can identify distinct geographical areas with similar characteristics. By applying these statistical methods, GIS professionals can gain deeper insights into spatial processes, enhance predictive modeling, and make more informed decisions about land use, environmental management, and urban planning. </p> <br>

<h3> Mapping Another Month from the Drought Anomaly Data </h3> <br>

<p> As mentioned prior, the drought dataset is a cumulative dataset that was collected between July of 1998 and June of 2001. For the interpolative methods, only June of 1999 was analyzed (meaning one year of accumulated drought values). In this portion of the analysis, multivariate statistical methods will be used to analyze trends in the entire dataset. To start, a visualization for a different month was created. In this case, June of 2001 was chosen, as it displays the final cumulative result of the entire dataset (Figure 10). </p> <br>

<figure>
<img class="myImages" id="myImg" src= "https://i.imgur.com/PLyAwFW.jpeg" alt="2001Map" style="width:100%;max-width:625px">
<figcaption> Figure 10. Cumulative Drought by Weather Station in Kentucky from July 1998 to June 2001   </figcaption>
</figure> <br>

<p> Observing the values in the legend, there were precipitation deficiencies ranging from approximately -9 to -44 inches across Kentucky by June of 2001. The weather stations recording the highest precipitation deficiencies were in central Kentucky as well as parts of the Bluegrass. Generally, drought conditions tended to be less severe in western and northern Kentucky. </p> <br>

<p> Compared to the values from June 1999, the cumulative effects of the drought in June 2001 can be observed, as the most severe droughts peak at -44 inches compared to -18. Northeastern Kentucky, where the drought had been most severe in June 1999, has some of the mildest drought values by June of 2001. The directional effects (west to northeast) that were present in June of 1999 have also changed, as the most severe drought values are now in central Kentucky.  </p> <br>

<p>  </p> <br>

<h3> Introducing Multivariate Methods: Agglomerative Clustering and K-Means </h3> <br>

<p> Unfortunately, there are only so many ways to analyze multivariate data in ArcGIS Pro. Moving forwads, data will be prepared and analyzed in RStudio. First, a simple empirical look will be taken using agglomerative clustering methods to create a dendrogram of the cumulative drought anomalies at each weather station. Then, a more refined analysis will be conducted with K-means.     </p> <br>

<p> Concerning multivariate methods, it is often the case that there is no clear answer as to which method or set of parameters is statistically ideal. Heuristics and empirical observation are usually incorporated as starting points, and from there, certain measures can be chosen to help illustrate trends more clearly.  </p> <br>

<p> <em> Note: It is possible to conduct a K-means analysis in ArcGIS Pro with the multivariate clustering tool in the spatial statistics toolbox. A time-series box plot can also be created from this tool, as well as an analysis of the psuedo-F score. For agglomerative clustering, a dendrogram can be created in ArcGIS Pro, though it requires a signature file. RStudio, however, provides algorithms that can be used to depict and evaluate the quality of a clustering. </em> </p> <br>

<p> Agglomerative clustering has the advantage of displaying data in a dendrogram, which is a diagram that shows the hierarchical relationship between objects. This method is visually easy to follow, as clear break points show how the data can be categorized in different numbers of clusters. Since this is a visual depiction of clustering, however, a large number of data values can render it inconvenient to use. (Order of data?) </p> <br>

<h3> Agglomerative Clustering </h3> <br>

<p> Instead of using the raw data values, the data was standardized. Standardization is essential in cluster analysis, which includes both hierarchical and k-means clustering. Even though all the measurements in this dataset are in inches, standardization has the additional benefits of ensuring that the dataset is accurate and uniform, as well as making it easier to find errors in the data. Having a uniform dataset is particularly important in this case, since the cumulative values within it might otherwise create biased results. Similarly, standardization allows for better control over biased values and outliers.  </p> <br>

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

<p> Observing the time series plot in Figure 12, it is evident that each cluster has a distinct pattern. The first cluster (x1) includes the weather stations that recorded the highest initial drought values. As time progressed, the red time series line for cluster 1 rose, indicating that the drought anomalies recorded by these weather stations were gradually dissipating. The line for cluster 2 (x2) in green shows the reverse trend from cluster 1. Initially, there was little drought recorded by these weather stations, but as time progressed, the line fell, suggesting that drought anomalies became more severe. In 1998, the line for cluster 3 (x3) roughly matches the cluster 2 line, though after this period, the two lines diverge. After 1998, Cluster 3 generally moves upwards, indicating an alleviation of drought conditions at those respective weather stations. Finally, the line for cluster 4 (x4) starts highest out of all the clusters and rises far above the rest until falling in the latter half of 2000 to meet cluster 3’s line. These weather stations experienced the least severe drought conditions. It is important to remember, however, that this a time series plot of standardized drought values; by June of 2001, every weather station was experiencing a deficiency in precipitation as depicted in figure 10. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/Z7oLU83.jpeg" alt="AggTimeSeries" style="width:100%;max-width:625px">
<figcaption> Figure 12. Time Series Plot of Agglomerative Cluster Mean Centers of Cumulative Drought Anomalies from July 1998 to June 2001   </figcaption>
</figure> <br>

<p>  </p> <br>


<p> To visualize the cluster data presented in the time series plot, the cluster group mean centers were mapped out by weather station membership in figure 13.  </p> <br>

<p> Weather stations marked with the green diamond (cluster 2) show areas where the drought started off mild and worsened over time, and stations with the light red star (cluster 1) shows areas where the drought started off severe but became milder towards the end of the period. For the two clusters showing less severe drought, the light blue square (cluster 3) depicts weather stations where the drought became less severe towards the end of the period, whereas the purple triangle (cluster 4) represents the weather stations recording the least severe drought values.  </p> <br>

<p> Geographic patterns can be seen in the clustering result. Generally, western Kentucky’s weather stations were placed in clusters 3 or 4, indicating that the drought anomaly values there were lower than in other parts of Kentucky. Central Kentucky’s weather stations, however, were mainly placed into clusters 1 or 2, indicating that the drought here was more severe. Northern Kentucky and parts of the Bluegrass also had less severe drought, as evidenced by the cluster 3 markers. Eastern Kentucky experienced various regional fluctuations regarding drought severity: some counties such as Floyd, Laurel, Letcher, and Morgan had the less severe drought (represented by clusters 3 and 4), though the rest of the region suffered from more severe drought.  </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/jdMiKkW.jpeg" alt="AggMap" style="width:100%;max-width:625px">
<figcaption> Figure 13. Agglomerative Clustering Map of Cumulative Drought Anomalies in Kentucky from July 1998 to June 2001   </figcaption>
</figure> <br>


<h3> K-Means Clustering </h3> <br>

<p> Another approach to multivariate clustering is k-means clustering. Under k-means, <em> n </em> observations are sorted into <em> k </em> clusters in which each observation belongs to the cluster with the nearest mean, splitting the clusters into voronoi cells. K-means minimizes within-cluster variances, but not regular Euclidean distances (expand). K-means is an efficient method in terms of computation power. Additionally, it works better on larger datasets than agglormerative clustering, and it is less sensitive to outliers. However, it can be difficult to choose an appropriate <em> k </em> value (cont...)      </p> <br>


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
<img class="myImages" id="myImg" src="https://i.imgur.com/7FeFH4f.jpeg" alt="AggMap" style="width:100%;max-width:625px">
<figcaption> Figure ?. Analysis of K-means Clustering Quality   </figcaption>
</figure> <br>


<p> [img][/img] </p>

<p> Figure 14 below depicts an “elbow method” graph, which displays the total within sum of squares as a function of the number of clusters. In other words, this is a essentially a graph of the TSS value on Table 5. The point containing the ideal number of clusters occurs where the slope of the line decreases and the “elbow” bends: at this point, adding another cluster does not substantially improve the BSS / TSS value. In this case, the bend is located at four clusters, where the function’s slope decreases. The “elbow” can be seen between two and four clusters.  </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/n1w7LjR.jpeg" alt= "Silhouette" style="width:100%;max-width:625px">
<figcaption> Figure 14. Ideal Number of Clusters under the Elbow Method  </figcaption>
</figure> <br>

<p> An alternative to the elbow method, the silhouette method is another approach that measures the quality of a clustering (Figure 15). The silhouette method calculates the average silhouette width within each potential number of clusters k, where a high score indicates that each object fits well within its cluster. In this case, the silhouette method suggests grouping the data into two clusters.  </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/09wT6jY.jpeg" alt= "Silhouette" style="width:100%;max-width:625px">
<figcaption> Figure 15. Ideal Number of Clusters under the Silhouette Method  </figcaption>
</figure> <br>

<p> Third is the gap statistic method (Figure 16), which can be applied to any clustering method. 
This method evaluates the total intra-cluster variation for different values of k by comparing them to their expected values derived from the null reference distribution of the data. The optimal number of clusters will be found by the value that yields the largest gap statistic. 
Rather than being a random uniform distribution of points, this means that objects within the clustering structure are like one another. Unfortunately, since the gap statistic suggests one cluster in this case, it is not useful for this analysis. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/0Kibk2H.jpeg" alt= "Gap" style="width:100%;max-width:625px">
<figcaption> Figure 16. Ideal Number of Clusters under the Gap Statistic Method  </figcaption>
</figure> <br>

<p> Since each of the previous tests suggested a different number of clusters to retain, it proved prudent to conduct a consensus-based algorithm. With this algorithm comprised of 30 different methods, figure 17 suggests that it is ideal to retain two clusters rather than the four selected from the dendrogram earlier. This decision was supported by 11 out of 30 methods.     </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/Eb2uLiL.jpeg" alt="IdealKCluster" style="width:100%;max-width:625px">
<figcaption> Figure 17. Ideal Number of Clusters under the Consensus Algorithm  </figcaption>
</figure> <br>

<p> A cluster silhouette plot was used to review the suggestion of two clusters from the consensus algorithm (Figure 18). If a sizable majority of the values within the silhouette plot are positive, then the observations were placed within the correct group.  The possible values range from -1 < p < 1, where:  </p> <br>

<p> <ul> 
<li> a value of 0 indicates an observation is between two clusters. </li>
<li> a value of -1 indicates an observation does not fit in its cluster at all. </li>
<li> a value of 1 indicates an observation fits perfectly in its cluster.  </li>
</ul> </p> <br>

<p> The average silhouette width for two clusters is 0.41, indicating an okay fit overall. One observation within each cluster does not fit well within it (the bars below the 0.00 line) </p> <br>


<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/nlbbxHa.jpeg" alt="SilhouetteWidthK" style="width:100%;max-width:625px">
<figcaption> Figure 18. Cluster Silhouette Plot  </figcaption>
</figure> <br>



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
<img class="myImages" id="myImg" src="https://i.imgur.com/M5MBJGG.jpeg" alt="PCAplot2" style="width:100%;max-width:625px">
<figcaption> Figure 19. Cluster Variance Plot   </figcaption>
</figure> <br>

<p> In comparison to the time series plot for agglomerative clustering from Figure 12 earlier, the k-means clustering plot in Figure 20 reveals two nearly mirrored trends. The first cluster represents severe drought anomalies, while the second captures less severe anomalies. Unlike the plot in Figure 12, none of the clusters intersect here, indicating two distinct trends. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/XwFVhAb.jpeg" alt="AggTimeSeries" style="width:100%;max-width:625px">
<figcaption> Figure 20. Time Series Plot of K-mean Cluster Mean Centers of Cumulative Drought Anomalies from July 1998 to June 2001   </figcaption>
</figure> <br>


<p> Figure 21 displays the k-means cluster map using two clusters. By simplifying to two clusters, the map shows red diamonds representing the worst drought conditions and blue triangles for mild drought conditions. The most severe drought (cluster 1) is concentrated in central Kentucky, the southern Bluegrass region, and parts of eastern Kentucky. In contrast, cluster 2 indicates mild drought conditions in western Kentucky, northern Kentucky, and some areas of eastern Kentucky. </p> <br>

<p> A notable shift from the agglomerative clustering map (Figure 13) is observed near the weather stations in Perry and Knox counties. These stations are the only ones to transition from cluster 2 (severe drought) in Figure 13 to cluster 2 (mild drought) in Figure 21. This shift aligns with the edge cases identified in Figure 19. </p> <br>

<figure>
<img class="myImages" id="myImg" src= "https://i.imgur.com/WHAg7RG.jpeg" alt="KMeansMap" style="width:100%;max-width:625px">
<figcaption> Figure 21. K-Means Clustering of Cumulative Drought Anomalies in Kentucky from July 1998 to June 2001   </figcaption>
</figure> <br>

<p> (Discuss Results here) </p>

<h3> Links to R graphs </h3> <br>

<p> Histogram </p>
<p> QQPlot </p>
<p> Trend Analysis </p>
<p> Variogram </p>
<p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/R_Examples/MultivariateDendrogramPlot.R"> Dendrogram </a> </p>
<p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/R_Examples/MultivariateAggTimeSeries.R"> Agglormerative Clustering Time Series Plot </a> </p>
<p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/R_Examples/MultivariateElbowPlot.R"> Elbow Method Plot </a> </p>
<p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/R_Examples/MultivariateSilhouettePlot.R"> Silhouette Method Plot </a> </p>
<p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/R_Examples/MultivariateGapStatisticPlot.R"> Gap Statistic Method Plot </a> </p>
<p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/R_Examples/MultivariateConsensusAlgorithm.R"> Consensus Algorithm Plot </a> </p>
<p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/R_Examples/MultivariateSilhouetteWidthPlot.R"> Cluster Silhouette Plot </a> </p>
<p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/R_Examples/MultivariateClusterPlotPCA.R"> Cluster Variance Plot </a> </p>
<p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/R_Examples/MultivariateKmeansTimeSeries.R"> K-means Clustering Time Series Plot </a> </p>
<p>  </p>


<h3> List of Figures and Tables </h3> <br>
<p> Figure 1. </p>
<p> Figure 2. </p>
<p> Figure 3. </p>
<p> Figure 4. </p>
<p> Figure 5. </p>
<p> Figure 6. </p>
<p> Figure 7. </p>
<p> Figure 8. </p>
<p> Figure 9. </p>
<p> Figure 10. </p>
<p> Figure 11. </p>
<p> Figure 12. </p>
<p> Figure 13. </p>
<p> Figure 14. </p>
<p> Figure 15. </p>
<p> Figure 16. </p>
<p> Figure 17. </p>
<p> Figure 18. </p>
<p> Figure 19. </p>
<p> Figure 20. </p>
<p> Figure 21. </p>
<p> Table 1. </p>
<p> Table 2. </p>
<p> Table 3. </p>
<p> Table 4. </p>
<p> Table 5. </p>
<p> Table 6. </p>
<h3> References </h3> <br>
<p> Team, P. W. (n.d.). <em>Climate Division Map: NOAA Physical Sciences Laboratory</em>. https://psl.noaa.gov/data/usclimdivs/data/map.html#Kentucky%20 </p>
<p> Posts, V. M. (2018, September 6).<em>Difference between IDW and Kriging – Variogram graph. Trang Vo</em>. https://trangthuyvo.wordpress.com/2018/09/05/difference-between-idw-and-kriging-variogram-graph/ </p>
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
