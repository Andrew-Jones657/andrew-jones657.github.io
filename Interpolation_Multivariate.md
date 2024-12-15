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

<p> The intent of this project is to explore a large drought dataset using data analysis techniques. The underlying dataset, in particular, is considered realistic due to its skewness, underlying trends, negative values, and the inclusion of physically collected data. Data analysis is conducted using ArcGIS Pro and the R statistical programming language. </p> <br>

<p> Aptly, this project is composed of two portions. The first portion examines historical cumulative drought anomaly data by June of 1999 in Kentucky using interpolation techniques, while the second portion analyzes the entire dataset using multivariate statistical methods.   </p> <br>

<h3> Drought Anomaly Data for this Project </h3> <br>

<p> The drought dataset was collected between July 1998 and June 2001, and comprises 56 weather stations represented as points (Figure 1). A simplified version of the dataset can be found <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/KYDrought/KYDrought.geojson"> here</a>: this simplified dataset contains the reference information as well as cumulative drought values for June 1999 and June 2001. Additionally, <a href="https://psl.noaa.gov/data/usclimdivs/data/map.html#Kentucky%20"> Kentucky's climate divisions </a>are used as a backdrop; these climate divisions consist of counties with similar weather patterns. </p> <br>
    
<p> The dataset is cumulative, meaning that each month’s data includes values from previous months. Most values in the dataset are negative, indicating a deficiency in precipitation at the weather stations. For the initial portion of the project, drought anomaly values from June 1999 will be analyzed, covering a full year of data.  These points will be interpolated to create drought anomaly surfaces. Later, multivariate clustering methods will be applied to evaluate trends characterizing the drought anomalies recorded by each weather station, and the stations will be grouped into clusters. </p> <br>


<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/N9HTp8v.jpeg" alt="Interpolation Techniques" style="width:100%;max-width:625px">
<figcaption> Figure 1. Kentucky Weather Stations and Climate Divisions </figcaption>
</figure> <br>


<h3> Interpolation Methods in GIS: IDW and Kriging Interpolation </h3> <br>

<p> Interpolation methods in GIS are vital techniques used to estimate values at unsampled locations within a geographic space based on known values from sampled points. These methods play a crucial role in generating continuous surfaces from discrete data points, facilitating spatial analysis and visualization. Common interpolation techniques include inverse distance weighting (IDW), which assigns weights to neighboring points based on their proximity; kriging, a geostatistical method that models spatial dependence; and spline interpolation, which fits a mathematical function through points to create a smooth surface. Each method has its strengths and applicability depending on the nature of the data and the spatial variability being analyzed, ensuring accurate representation and prediction in GIS applications ranging from environmental modeling to urban planning.
</p> <br>

<p> There are many ways to interpolate spatial data. The most common methods include trend surface analysis, inverse distance weighting, global polynomial, kriging, natural neighbor, and spline interpolation (Figure 2). In this project, IDW and kriging models will be implemented to measure the spatial dispersion of drought anomalies in Kentucky.  </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/Ec0rGJq.png" alt="Interpolation Techniques" style="width:100%;max-width:625px">
<figcaption> Figure 2. Spatial Interpolation Techniques (Shrestha, 2023) </figcaption>
</figure> <br>



<p> First, it is essential to conduct a visual analysis of the drought data using a choropleth and graduated symbol map (Figure 3). This map displays the drought deficiencies or surpluses recorded by each weather station as of June 1999. Notably, a clear pattern emerges: areas experiencing drought are clustered, with a notable transition from west to east. Western Kentucky, which typically experiences intense storms and more erratic weather, was largely free of drought or experienced only minor decreases in rainfall. In contrast, eastern Kentucky, known for its higher frequency of rain showers, had multiple stations reporting precipitation deficiencies exceeding ten inches. These spatial patterns deviate from Kentucky’s usual precipitation trends, where western Kentucky often faces drought conditions and eastern Kentucky typically records higher rainfall levels, including orographic effects. </p>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/ei7BZYD.jpeg" alt="Drought by Weather Station" style="width:100%;max-width:625px">
<figcaption> Figure 3. Cumulative Drought Values by Weather Station from July 1998 to June 1999 </figcaption>
</figure> <br>

<p> There are limitations within the dataset that should be addressed. The study area is bounded by Kentucky’s borders, meaning that significant drought values occurring just outside the state will not be included in the interpolation model. Additionally, there are few weather stations along the edges of Kentucky, which may lead to increased error in those areas. To mitigate these edge effects, a buffer could be applied around Kentucky's boundary before running the interpolation model. Ideally, incorporating data from weather stations in neighboring states would further enhance the analysis by reducing edge effects.  </p> <br>

<h3> Inverse Distanced Weighted Interpolation  </h3> <br>

<p> Next, an inverse distance weighted (IDW) surface can be created to represent the drought anomaly values. The IDW model is one of the simplest interpolation methods, though it can be sensitive to parameter choices. These deterministic interpolation models are known as "exact interpolators" because the predicted values at known locations exactly match the observed values. As deterministic models, IDWs assume that the spatial relationships in the data are well understood; in this case, weights are calculated using a mathematical function based on distance decay. Creating an informative IDW requires expert knowledge and careful consideration of parameters such as search distance and the number of neighbors. </p> <br>

<p> Certain trends in statewide drought anomalies are evident (Figure 4). Comparing the western and eastern portions of Kentucky reveals a clear anisotropic effect: western Kentucky shows positive values, indicating the absence of drought, while eastern Kentucky experiences severe drought, reflected in negative cumulative rainfall patterns. Notably, northeastern Kentucky, particularly along the Ohio River and Big Sandy River, exhibits the most severe drought conditions. In central Kentucky, cumulative precipitation is generally negative, although there is some variation, as certain areas with higher precipitation indicate that drought conditions are not forming a consistent trend.   </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/FgL2aYh.jpeg" alt="IDW" style="width:100%;max-width:625px">
<figcaption> Figure 4. IDW of Cumulative Drought Anomalies from July 1998 to June 1999  </figcaption>
</figure> <br>


<h3> Limitations of the IDW Model </h3>

<p> To explain the limitations of the inverse distance weighted (IDW) surface, it is important to define several key concepts related to interpolation methods. These concepts pertain to the prediction accuracy of the surface created by IDW and its trustworthiness. </p>

<p> <em> Analysis of accuracy </em> refers to the examination of errors—the differences between predicted and observed values at known locations. This analysis is conducted through validation and cross-validation. Deterministic methods like IDW are limited to accuracy analysis, focusing solely on prediction accuracy based on the sample data. In contrast, <em> analysis of uncertainty </em> evaluates the trustworthiness of predicted values and the user’s confidence in them. This requires a measure of uncertainty alongside the prediction surface, which is typically limited to stochastic interpolation methods such as kriging. </p> <br>

<p> The prediction accuracy of the IDW surface can be assessed using <em> validation </em> or <em> cross-validation </em> to identify errors. Validation involves sampling a subset of data to optimize the model, while cross-validation is used with smaller sample sizes. In cross-validation, each data point is removed one at a time, and the remaining points are used to make predictions for that removed point. This process is repeated for each point. While cross-validation is the default method for kriging, it is not applied to IDW surfaces.  </p> <br>

<p> The <em>trustworthiness </em> of the IDW surface cannot be evaluated using IDW alone, as it lacks a measure of uncertainty; being a deterministic model, it does not account for randomness. To assess the trustworthiness of the interpolation model, a stochastic method like kriging must be employed.  </p> <br>

<p> In addition to the key definitions, it is important to consider the limitations of the interpolation surface. Two major limitations are the average effect and the bull’s eye effect. When some values used for interpolation fall outside the threshold distance from any sample points, a valid surface cannot be generated, making it difficult to interpolate accurately around outliers and edge values. Furthermore, if too few points are selected, continuity may be compromised. In the IDW model, each point is given equal weight, which can distort results when extreme values are present, leading to the "bull's eye" effect—where distant points create distance decay circles that do not accurately represent the study area (Figure 5). Additionally, the range of interpolated values cannot exceed the range of observed values. To minimize edge effects, it is essential to position values along the edges of the study area, though this can be challenging in practice. </p> <br>


<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/gXzBwVP.png" alt="IDW" style="width:100%;max-width:625px">
<figcaption> Figure 5. The Bull's Eye Effect  </figcaption>
</figure> <br>

<p> Before creating a kriging interpolation model, it is necessary to conduct exploratory data analysis to determine if the dataset is suitable for kriging. This involves several statistical measures, including histograms, descriptive statistics, QQ plots, semivariograms, and trend analyses for the June 1999 values. </p> <br>

<h3> Exploratory Data Analysis </h3> <br>

<p> To analyze the distribution of drought deficiencies as of June 1999, a histogram was created to visualize the data (Figure 6). Additionally, descriptive statistics are provided in Table 1. The histogram indicates that the data for June 1999 follows a fairly normal distribution, with a slight positive skew of approximately 0.5 (Table 1). The kurtosis value is relatively high at 3.84, suggesting that many observations are clustered around the mean. However, because drought values can be negative to represent a lack of rainfall, applying transformations such as logarithmic, arcsine, or Box-Cox is not feasible for reducing skewness and kurtosis. This asymmetry is evident in Figure 6, where the right tail of the distribution is longer than the left tail. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/ACNMao3.jpeg" alt="Histogram" style="width:100%;max-width:625px">
<figcaption> Figure 6. Histogram of Cumulative Drought Anomalies from July 1998 to June 1999  </figcaption>
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


<p> Kriging yields optimal results when the data adheres to a normal distribution. To evaluate the drought anomaly data for June 1999, a normal QQ plot was generated (Figure 7). This QQ plot reveals a noticeable curvature on the right side, indicating some degree of skewness. A Shapiro-Wilk normality test yielded a W-score of 0.99647 and a p-value of 0.1209. Under a 95% confidence level, one fails to reject the null hypothesis that the sample data (June 1999) is from a normal distribution. The significance level, <em> α</em>, would have to be set to 0.13 (or 87% confidence) to reject the null hypothesis. Given the exploratory context of this study, the June 1999 drought anomaly values are expected to be compatible with ordinary kriging interpolation methods. </p> <br>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <figure>                                                                                          
<img class="myImages" id="myImg" src="https://i.imgur.com/NyMQkOO.jpeg" alt="QQPlot" style="width:100%;max-width:625px">
<figcaption> Figure 7. QQPlot of Cumulative Drought Anomalies from July 1998 to June 1999  </figcaption>
</figure> <br>


<p> A trend analysis graph was created to determine if directional effects were present in the dataset. This was done by generating a 3D scatterplot to examine the relationship between latitude, longitude, and drought values. Upon closer inspection, the scatterplot reveals a shape resembling the outline of Kentucky. Notably, the low, red points indicate areas where drought anomalies are most severe. The analysis suggests a second-order trend, with Figure 8 showing an upward, U-shaped curve for both latitude and longitude. This pattern implies that drought values in central Kentucky are close to the spatial mean, while those in western and eastern Kentucky show significant deviations from the mean. Similarly, the drought levels in southern Kentucky are less severe than those in northern Kentucky. </p> <br>
    
<p> The broad nature of this trend curve is unlikely to have a substantial effect on the kriging interpolation. If the trend effects (anisotropy) were extremely prominent, it would be possible to remove them, though doing so would limit the creation of other kriging models (e.g. standard error and prediction). The directional effects will be accounted for in the kriging model by setting a direction and angle that corresponds with the shifts in drought values in eastern and western Kentucky.  </p> <br>


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
<figcaption> Figure 8. Trend Analysis of Cumulative Drought Anomalies from July 1998 to June 1999   </figcaption>    
</figure>    <br>

<p> One particular type of geostatistical graph helpful for kriging is the semivariogram, which shows the relationship between the distance between two points and the difference in their values. A semivariogram has several properties: </p> <br>

<ol>
<li> The <em> nugget </em> is the value of the semivariogram at a very small distance, often at zero distance. It represents the initial variability or spatial variability that is observed when two data points are very close to each other. When spatial autocorrelation is modeled with a semivariogram, the nugget is the value where the curve starts, before it begins to rise as the distance between points increases. </li>
<li> The <em> range </em> is the distance at which the semivariogram reaches a <em> sill </em> (or the value at which it levels off). Beyond this range, the values of the semivariogram do not change much, meaning that the data points are no longer strongly correlated. </li>
<li> The <em> partial sill </em> is the difference between the sill and the nugget. The <em> sill </em> is the value at which the semivariogram levels off at large distances. The partial sill indicates much variation remains in the data after accounting for the nugget. </li>
</ol> <br>
    
<p> The semivariogram cloud below (Figure 9) illustrates distant values on the right side, indicating that both high and low values are dispersed from the mean. In other words, high and low values exhibit autocorrelation with one another. Later on, the values in this semivariogram will be averaged into a certain number of points and used to model a function: this function will describe spatial autocorrelation for the kriging surface.  </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/EbNdkPI.jpeg" alt="Semivariogram" style="width:100%;max-width:625px">
<figcaption> Figure 9. Semivariogram Cloud of Cumulative Drought Anomalies from July 1998 to June 1999   </figcaption>
</figure> <br>



<h3> Ordinary Kriging </h3> <br>

<p> Unlike the IDW model, kriging is based on a description of spatial autocorrelation given by sample data, as the user must create a function to model the spatial autocorrelation with a semivariogram. Kriging is an optimal method in the sense that it makes the best use of what can be inferred about the spatial structure in the interpolation surface from an analysis of the sample points. Kriging also allows for the quantification of interpolation errors and analysis of uncertainty, which lends it more statistical rigor. Unlike the IDW method, kriging has several assumptions concerning the underlying dataset. </p> <br>
    <ol>
    <li> The interpolation surface has a constant mean, with no underlieing trend. </li>
    <li> The data arise from a stochastic stationary process. </li>
    <li> The variation of the surface is the same in each direction (also known as isotropic).  </li>
    <li> The semivariogram consists of a mathematical model with clearly defined user parameters. </li>
    <li> The same semivariogram is applied over the entire study area. </li>
    </ol> <br>

<p> The differences between kriging and the idw model are visualized in the illustration below (Figure 10). Note that kriging uses the distance between each point to create a weighted value, whereas the IDW searches for a certain number of points and assigns a value of one for included values and zero for excluded values.  </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/j2TlB49.png" alt="IDWvKriging" style="width:100%;max-width:625px">
<figcaption> Figure 10. Kriging vs IDW Interpolation Models (Posts, 2018)   </figcaption>
</figure> <br>

<p> The parameters below were used to model the semivariogram for kriging interpolation. This set of parameters was chosen from a set of numerous kriging models, as it best matched the underlying dataset and produced the most balanced set of cross validation statistics.  </p> <br>
    
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
<td> 7.0024 </td>
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

<p> The modeled semivariogram is presented below (Figure 11). The line represents how spatial autocorrelation is measured through the study area. Ideally, the function would run through and intersect with each of the averaged binned values -- this is not always easy to achieve in practice, particularly when accounting for directional effects.   </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/5bngnme.png" alt="Modeled Semivariogram" style="width:100%;max-width:625px">
<figcaption> Figure 11. The Modeled Semivariogram on ArcGIS Pro  </figcaption>
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


<p> Although the trends from the kriging model are similar to those produced in the IDW map, the interpolation appears cleaner now (Figure 12). The average and bull's eye effect from the IDW are no longer present here. Like in the IDW, there is a west to east trend in Kentucky, where drought anomalies are more severe in the eastern portion of the state compared to the western portion. In particular, northeastern Kentucky and now central Kentucky appear to be suffering the most severe droughts. Some areas, however, show variation in droughts as the area around Louisville and southeastern Kentucky are not as affected as central and northeastern Kentucky. Numerous kriging models were created before selecting this one: the parameters in Table 2 created a kriging map that best balanced the values of the cross validation statistics.  </p> <br>



<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/5IDy5kN.jpeg" alt="Kriging" style="width:100%;max-width:625px">
<figcaption> Figure 12. Ordinary Kriging of Cumulative Drought Anomalies from July 1998 to June 1999   </figcaption>
</figure> <br>


<p> A useful capability of kriging is the ability to create a model that displays the standard error of the kriging interpolation. Based on the standard error map in Figure 13 below, drought deficiencies around central Kentucky and eastern Kentucky display reliable predicted values compared to those found around the edge of Kentucky. This is due to there being few weather stations along the edge of Kentucky, which means that there were fewer locations with drought values to use in the Kriging interpolation model. Ideally, weather stations outside of Kentucky would be included in a buffer to mitigate these higher standard error values, though such data are not easy to acquire in practice.  Table 3 reports the summary cross-validation statistics for the kriging model: while the mean and Root-Mean-Square are not quite at zero, the Root-Mean-Square standardized value is very close to one, indicating a good fit.  </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/LnitCej.jpeg" alt="KrigingSTDE" style="width:100%;max-width:625px">
<figcaption> Figure 13. Ordinary Kriging Standard Errors of Cumulative Drought Anomalies from July 1998 to June 1999   </figcaption>
</figure> <br>


<p> Another way to depict kriging interpolation is through a probability map, which can be useful for decision management issues. Figure 14 shows a probability map of cumulative precipitation anomalies in Kentucky potentially crossing the -7.5 in. drought marker threshold, which is the median value for June 1999. The areas that require drought emergency response are primarily in northeastern Kentucky, though portions of central Kentucky also have a high probability crossing the threshold. This area tends to have a higher probability (between 70% and 100%) of crossing the -7.5 in. cumulative precipitation amount. The weather station map, IDW, and Kriging map all reported that this area was experiencing the highest degree of drought in Kentucky during June 1999. So, out of all the areas in Kentucky afflicted by drought, northeastern Kentucky should receive most of the remediation efforts.  </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/v2cImXo.jpeg" alt="KrigingProb" style="width:100%;max-width:625px">
<figcaption> Figure 14. Probability Kriging of Cumulative Drought Anomalies from July 1998 to June 1999   </figcaption>
</figure> <br>


<p> By using kriging interpolation, a good model depicted where drought was most severe in Kentucky by June 1999. However, that was one month out of 36 different months in the dataset. It would be inefficient to attempt to create a stable kriging interpolation model for each month in this time period. Instead, it would prove valuable to incorporate multivariate statistical measures to observe similarities and differences across the entire dataset.   </p>

<h1 style="text-align:center;"> Multivariate Methods: Observing Trends in the Entire Dataset </h1> <br>

<p> Multivariate statistics play a crucial role in Geographic Information Systems (GIS) by enabling the analysis of complex spatial data involving multiple variables simultaneously. Through techniques such as principal component analysis (PCA), cluster analysis, and canonical correlation analysis, multivariate statistics help to uncover patterns, relationships, and underlying structures within geospatial datasets. For instance, PCA can reduce the dimensionality of data, highlighting the most significant variables that influence spatial phenomena, while cluster analysis can identify distinct geographical areas with similar characteristics. By applying these statistical methods, GIS professionals can gain deeper insights into spatial processes, enhance predictive modeling, and make more informed decisions about land use, environmental management, and urban planning. </p> <br>

<h3> Mapping Another Month from the Drought Anomaly Data </h3> <br>

<p> As mentioned prior, the drought dataset is a cumulative dataset that was collected between July of 1998 and June of 2001. For the interpolative methods, only June of 1999 was analyzed (meaning one year of accumulated drought values). In this portion of the analysis, multivariate statistical methods will be used to analyze trends in the entire dataset. To start, a visualization for a different month was created. In this case, June of 2001 was chosen, as it displays the final cumulative result of the entire dataset (Figure 15). </p> <br>

<figure>
<img class="myImages" id="myImg" src= "https://i.imgur.com/PLyAwFW.jpeg" alt="2001Map" style="width:100%;max-width:625px">
<figcaption> Figure 15. Cumulative Drought by Weather Station in Kentucky from July 1998 to June 2001   </figcaption>
</figure> <br>

<p> Observing the values in the legend, there were precipitation deficiencies ranging from approximately -9 to -44 inches across Kentucky by June of 2001. The weather stations recording the highest precipitation deficiencies were in central Kentucky as well as parts of the Bluegrass. Generally, drought conditions tended to be less severe in western and northern Kentucky. </p> <br>

<p> Compared to the values from June 1999, the cumulative effects of the drought in June 2001 can be observed, as the most severe droughts peak at -44 inches compared to -18. Northeastern Kentucky, where the drought had been most severe in June 1999, has some of the mildest drought values by June of 2001. The directional effects (west to northeast) that were present in June of 1999 have also changed, as the most severe drought values are now in central Kentucky.  </p> <br>

<h3> Introducing Multivariate Methods: Agglomerative Clustering and K-Means </h3> <br>

<p> Now, two types of multivariate clustering methods will be used to explore trends throughout the entire drought anomaly dataset. Unlike univariate methods, it is often the case that there is no clear answer as to which methods or set of parameters are statistically ideal. Heuristics and empirical observation are usually incorporated as starting points, and from there, certain measures can be chosen to help illustrate trends more clearly. First, a simple empirical look will be made using agglomerative clustering methods to create a dendrogram of the cumulative drought anomalies at each weather station. Then, a more refined analysis will be conducted with K-means. This portion of the project is more reliant on R, as there are only so many ways to analyze multivariate data in ArcGIS Pro.      </p> <br>

<p> <em> Note: It is possible to conduct a K-means analysis in ArcGIS Pro with the multivariate clustering tool in the spatial statistics toolbox. A time-series box plot can also be created from this tool, as well as an analysis of the psuedo-F score. For agglomerative clustering, a dendrogram can be created in ArcGIS Pro, though it requires a signature file. RStudio, however, provides algorithms that can be used to depict and evaluate the quality of a clustering. </em> </p> <br>

<p> For the rest of the project, the data was standardized. Standardization is essential in cluster analysis, which includes both hierarchical and k-means clustering. Even though all the measurements in this dataset are in inches, standardization has the additional benefits of ensuring that the dataset is accurate and uniform, as well as making it easier to find errors in the data. Having a uniform dataset is particularly important in this case, since the cumulative values within it might otherwise create biased results. Similarly, standardization allows for better control over biased values and outliers.  </p> <br>


<h3> Agglomerative Clustering </h3> <br>

<p> The first multivariate clustering method that will be looked at is agglomerative clustering, also called hierarchical clustering. It functions by creating a hierarchy of clusters in a bottom up manner: </p>
<ol>
<li> Each data point starts as its own individual cluster. </li> 
<li> The two closest clusters are merged into one. </li>
<li> This merging process continues iteratively until all data points are grouped into a single cluster or a specified number of clusters is reached. </li>
</ol> <br>

<p> There are several different methods for measuring the intercluster distance. Such methods include single linkage (minimum of distances), complete linkage (maximum of distances), average linkage (average of distances), Ward's algorithm (minimizes cluster spread).  </p> <br>

<p> Agglomerative clustering has several advantages:  </p>
<ol>
<li> A specific number of clusters does not have to be predefined. Users can select a number of clusters from a visual breakpoint. </li>
<li> Clusters are not limited to a specific shape, such as a sphere. They can be arbitrary in size and shape. </li>
<li> The hierarchy of clusters can be visualized in a dendrogram, which is useful for exploring hierarchichal relationships in the data. </li>
</ol> <br>

<p> The biggest issue with agglomerative clustering is that it does not scale well with large datasets. This is due to it being a computationally expensive method and limits on how much data can be displayed using a single dendrogram. </p> <br>

<p> To create a dendrogram, the standardized drought values were used to create a dissimilarity matrix, which measures the distance between each recorded drought value. Then, each of those observations were paired together with their closest neighbor into groups until the entire dataset was in one group. Ward’s algorithm was used to minimize the spread of the clusters (Figure 16). The dendrogram could be "cut" in a variety of different ways to observe different numbers of clusters -- it would be ideal to attempt to keep a similar number of observations within each clustering. To start, the dendrogram will be cut as to create four clusters.   </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/d7VIMdt.jpeg" alt="Dendrogram" style="width:100%;max-width:625px">
<figcaption> Figure 16. Dendrogram of Cumulative Drought Anomalies from July 1998 to June 2001   </figcaption>
</figure> <br>


<p> The dendrogram displays how the weather stations with the most similar recorded drought anomalies can be grouped together into four clusters. Since this dataset contains 36 variables regarding recorded drought anomalies (July 1998 to June 2001), it would be valuable to see how each cluster changes from month to month. To accomplish this, the clustered data was transposed and used to create a time series graph of each cluster's mean center. </p> <br>

<p> Observing the time series plot in Figure 17, it is evident that each cluster has a distinct pattern, though some degree of symmetry is present. The first cluster line in red includes the weather stations that recorded the highest initial drought values. As time progressed, the red time series line for cluster 1 rose, indicating that the drought anomalies recorded by these weather stations were gradually dissipating. The line for cluster 2 in green shows the reverse trend from cluster 1. Initially, there was little drought recorded by these weather stations, but as time progressed, the line fell, suggesting that drought anomalies became more severe. In 1998, the cyan line for cluster 3 roughly matches the cluster 2 line, though after this period, the two lines diverge. After 1998, cluster 3 moves upwards, indicating an alleviation of drought conditions at those respective weather stations. Finally, the purple line for cluster 4 starts higher than the other clusters and trends above the rest until falling in the latter half of 2000 to meet cluster 3. The weather stations in cluster 4 experienced the least severe drought conditions. It is important to remember, however, that this is a time series plot of standardized drought values; by June of 2001, every weather station was experiencing a deficiency in precipitation as depicted in figure 15. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/Z7oLU83.jpeg" alt="AggTimeSeries" style="width:100%;max-width:625px">
<figcaption> Figure 17. Time Series Plot of Agglomerative Cluster Mean Centers of Cumulative Drought Anomalies from July 1998 to June 2001   </figcaption>
</figure> <br>

<p> To visualize the cluster data presented in the time series plot, the cluster group mean centers were mapped out by weather station membership in figure 18.  </p> <br>

<p> Weather stations marked with a green diamond (Cluster 2) represent areas where the drought initially began mildly and worsened over time. Stations marked with a light red star (Cluster 1) indicate regions where the drought started out severe but became milder toward the end of the period. For the two clusters showing less severe drought conditions, the light blue square (Cluster 3) highlights weather stations where the drought severity decreased over time, while the purple triangle (Cluster 4) represents stations that recorded the least severe drought levels. </p> <br>

<p> Geographic patterns are evident in the clustering results. In general, weather stations in western Kentucky were grouped into clusters 3 or 4, indicating that drought anomaly values in this region were less severe compared to other parts of the state. Central Kentucky's weather stations, on the other hand, were predominantly placed in clusters 1 or 2, suggesting more severe drought conditions. Northern Kentucky and parts of the Bluegrass region also experienced less severe drought, as indicated by the cluster 3 markers. Eastern Kentucky displayed more regional variation in drought severity: some counties, including Floyd, Laurel, Letcher, and Morgan, experienced milder drought (represented by clusters 3 and 4), while the rest of the region faced more intense drought conditions.  </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/jdMiKkW.jpeg" alt="AggMap" style="width:100%;max-width:625px">
<figcaption> Figure 18. Agglomerative Clustering Map of Cumulative Drought Anomalies in Kentucky from July 1998 to June 2001   </figcaption>
</figure> <br>

<p> Having analyzed the drought anomaly dataset using agglomerative clustering, it would be useful to explore the dataset with a different clustering method. For this project, k-means clustering will be applied to evaluate an alternative clustering composition. </p> <br>

<h3> K-Means Clustering </h3> <br>

<p>  K-means clustering is a popular machine learning algorithm used for unsupervised learning, specifically for partitioning a dataset into K distinct clusters based on feature similarity. </p>
<ol>
<li> A <em> K </em> number of clusters are selected by the user. These clusters centers may be chosen from random data points within the dataset. </li>
<li> Each data point is assigned to the nearest cluster center based on a distance metric (usually Euclidean distance). This forms K clusters.</li>
<li> The centroid of each cluster is recalculated by finding the mean of all data points in the cluster. </li>
<li> Steps 2 and 3 are repeated iteratively until the centroids no longer change significantly or a predefined number of iterations is reached. </li>
</ol> <br>

<p> The K-means clustering algorithm has several advantages: </p>

<ol>
<li> It is efficient for large datasets. </li>
<li> Implementation is simple. </li>
<li> It works well when clusters are well-separated and spherical. </li>   
</ol> <br>

<p> However, the k-means method has its own set of limitations. The most notable drawback is that the number of clusters, <em>K</em>, must be determined before the analysis begins, which can be challenging without prior knowledge of the data. Selecting an inappropriate value for K can lead to ineffective clustering results. Additionally, k-means is sensitive to the initial placement of centroids, which can cause suboptimal solutions if the centroids do not accurately represent the clusters. Finally, since k-means assumes that clusters are roughly equal in size and spherical, it may not perform well on datasets with a more complex structure. </p> <br>

<p> Before performing a k-means analysis, it is important to determine the optimal number of clusters for this dataset. One straightforward method is to assess the explained variance for different numbers of clusters by examining the ratio of the between-sum of squares to the total sum of squares (see Table 4). As more clusters are added, the explained variance increases. However, after four clusters, the additional explained variance begins to diminish. </p> <br>

<table class="tablecenter"> <caption> Table 4. Between Sum of Squares over Total Sum of Squares Partition Formula Table </caption> 
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
</table> <br>

<p> There are several algorithms available to determine the ideal number of clusters, but they may sometimes yield contradictory results. In such cases, a consensus algorithm can be used to reconcile these differences. </p> <br>

<p> Figure 19 below shows an "elbow method" graph, which plots the total within-cluster sum of squares (WCSS) as a function of the number of clusters. Essentially, this graph represents the TSS value from Table 4. The ideal number of clusters is indicated by the point where the slope of the line decreases, forming an "elbow." At this point, adding more clusters does not significantly improve the BSS/TSS ratio. In this case, the elbow occurs at four clusters, where the slope of the curve begins to level off. The "elbow" is observed between two and four clusters.  </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/n1w7LjR.jpeg" alt= "Silhouette" style="width:100%;max-width:625px">
<figcaption> Figure 19. Ideal Number of Clusters under the Elbow Method  </figcaption>
</figure> <br>

<p> An alternative to the elbow method, the silhouette method provides another way to assess the quality of a clustering (Figure 20). This method calculates the average silhouette width for each potential number of clusters <em>K</em>, where a higher score indicates that the objects are well-matched within their respective clusters. In this case, the silhouette method suggests that the data should be grouped into two clusters.  </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/09wT6jY.jpeg" alt= "Silhouette" style="width:100%;max-width:625px">
<figcaption> Figure 20. Ideal Number of Clusters under the Silhouette Method  </figcaption>
</figure> <br>

<p> The third method is the gap statistic (Figure 21), which can be applied to any clustering algorithm. This method evaluates the total intra-cluster variation for different values of <em>K</em> by comparing them to the expected values derived from a null reference distribution of the data. The optimal number of clusters corresponds to the value that produces the largest gap statistic. Unlike a random uniform distribution, this indicates that the objects within the clusters are similar to each other. However, in this case, the gap statistic suggests only one cluster, making it unsuitable for this analysis. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/0Kibk2H.jpeg" alt= "Gap" style="width:100%;max-width:625px">
<figcaption> Figure 21. Ideal Number of Clusters under the Gap Statistic Method  </figcaption>
</figure> <br>

<p> Since each of the previous methods suggested a different number of clusters, it was prudent to apply a consensus-based algorithm. Comprising 30 different methods, this algorithm, as shown in Figure 22, suggests that retaining two clusters is preferable to the four clusters identified earlier from the dendrogram. This conclusion is supported by 11 out of the 30 methods. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/Eb2uLiL.jpeg" alt="IdealKCluster" style="width:100%;max-width:625px">
<figcaption> Figure 22. Ideal Number of Clusters under the Consensus Algorithm  </figcaption>
</figure> <br>

<p> To evaluate the quality of the two clusters, a cluster silhouette plot was used (Figure 23). If the majority of the values in the silhouette plot are positive, it indicates that the observations have been correctly assigned to their respective clusters.  The possible values range from -1 < p < 1, where:  </p> <br>

<p> <ul> 
<li> a value of 0 indicates an observation is between two clusters. </li>
<li> a value of -1 indicates an observation does not fit in its cluster at all. </li>
<li> a value of 1 indicates an observation fits perfectly in its cluster.  </li>
</ul> </p> <br>

<p> The average silhouette width for two clusters is 0.41, indicating an acceptable fit overall. However, one observation in each cluster does not fit well, as indicated by the bars falling below the 0.00 line. These observations are Grayson 3 SW in cluster 2 and Hazard Waterworks in cluster 1. It may be worth examining this in detail later. </p> <br>


<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/nlbbxHa.jpeg" alt="SilhouetteWidthK" style="width:100%;max-width:625px">
<figcaption> Figure 23. Cluster Silhouette Plot  </figcaption>
</figure> <br>


<p> Table 5 below presents the average silhouette width with clusters up to k=6. The best fit occurs at k=2, as it has the highest average silhouette width. </p> <br>

<table class="tablecenter"> <caption> Table 5. Table of Average Silhouette Width Scores </caption>
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

<p> To visualize how each weather station fits within its cluster, principal component analysis (PCA) was used to reduce the dataset's dimensionality from 36 variables to 2, allowing it to be represented in a 2D graph. As shown in Figure 24, the two clusters are positioned close to one another, suggesting that the differences in the measured variables between the groups are minimal. This is also reflected in the average silhouette width, which is only 0.42. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/6yxs2ft.jpeg" alt="PCAplot2" style="width:100%;max-width:625px">
<figcaption> Figure 24. Cluster Variance Plot   </figcaption>
</figure> <br>

<p> Another time series plot was created to show the cluster mean centers for each month under a two-cluster configuration. Compared to the agglomerative clustering time series plot in Figure 17, the k-means clustering plot in Figure 25 reveals two nearly mirrored trends. The first cluster represents severe drought anomalies, while the second captures less severe anomalies. Unlike the plot in Figure 17, the clusters in Figure 25 do not overlap, indicating two distinct trends. </p> <br>

<figure>
<img class="myImages" id="myImg" src="https://i.imgur.com/XwFVhAb.jpeg" alt="KTimeSeries" style="width:100%;max-width:625px">
<figcaption> Figure 25. Time Series Plot of K-mean Cluster Mean Centers of Cumulative Drought Anomalies from July 1998 to June 2001   </figcaption>
</figure> <br>


<p> Finally, another cluster map is created using two clusters (Figure 26). In this simplified version, the map shows red diamonds for the most severe drought conditions and blue triangles for mild drought conditions. Cluster 1, representing the worst drought, is concentrated in central Kentucky, the southern Bluegrass region, and parts of eastern Kentucky. In contrast, Cluster 2 indicates mild drought conditions in western Kentucky, northern Kentucky, and some areas of eastern Kentucky. </p> <br>

<p> A notable shift from the agglomerative clustering map (Figure 18) is observed near the weather stations in Perry (Barbourville) and Knox (Hazard Waterworks) counties in southeastern Kentucky. These stations are the only ones to transition from cluster 2 (severe drought) in Figure 18 to cluster 2 (mild drought) in Figure 26. Both of these weather stations are on the left-most side of cluster 2 in the PCA plot in Figure 25. </p> <br>

<figure>
<img class="myImages" id="myImg" src= "https://i.imgur.com/WHAg7RG.jpeg" alt="KMeansMap" style="width:100%;max-width:625px">
<figcaption> Figure 26. K-Means Clustering of Cumulative Drought Anomalies in Kentucky from July 1998 to June 2001   </figcaption>
</figure> <br>

<h3> K-Means Clustering: Three Clusters </h3> <br>

<p> </p>

<figure>
<img class="myImages" id="myImg" src= "https://i.imgur.com/ZXM5217.jpeg" alt="ClusterSilhouette3" style="width:100%;max-width:625px">
<figcaption> Figure 27. Cluster Silhouette Plot: Three Clusters   </figcaption>
</figure> <br>

<p> (silhouette plot with 3 clusters) </p>

<figure>
<img class="myImages" id="myImg" src= "https://i.imgur.com/e4m7FYA.jpeg" alt="ClusterPCAPlot3" style="width:100%;max-width:625px">
<figcaption> Figure 28. Cluster Variance Plot: Three Clusters   </figcaption>
</figure> <br>


<p> (cluster plot with 3 cluster) </p>

<figure>
<img class="myImages" id="myImg" src= "https://i.imgur.com/0N0U0Ua.jpeg" alt="KTimeSeries3" style="width:100%;max-width:625px">
<figcaption> Figure 29. Time Series Plot of K-mean Cluster Mean Centers of Cumulative Drought Anomalies from July 1998 to June 2001: Three Clusters   </figcaption>
</figure> <br>


<p> (time series plot with 3 clusters) </p>

<figure>
<img class="myImages" id="myImg" src= "https://i.imgur.com/34iU25q.jpeg" alt="KTimeMap3" style="width:100%;max-width:625px">
<figcaption> Figure 30. K-Means Clustering of Cumulative Drought Anomalies in Kentucky from July 1998 to June 2001: Three Clusters   </figcaption>
</figure> <br>

<p> (Map with 3 clusters) </p>

<h3> Discussion and Some Final Thoughts </h3> <br>

<p> Having explored some interpolation and multivariate methods in GIS and R, this project is now concluded. Like the other projects, this project was sensitive to user-selected parameters. During the interpolation phase, choosing a different number of points to interpolate with the IDW would have altered it greatly. Similarly, altering the kriging parameters would have created a different model -- the final model was selected as the best overall model of those created. Likewise, if for instance, three clusters were selected under k-means or aggolomerative clustereing, then that may have revealed a substantially different underlying trend concerning drought deficiencies in Kentucky.   </p> <br>

<p> This project only scratched the surface of interpolation and multivariate methods, and mainly was intended to show an applied use of some techniques on a spatial dataset. </p>

<p> Further graphical and mapping enhancements may be added to this project in the future. </p> <br>

<h3> Links to R graphs </h3> <br>

<p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/R_Examples/KrigingJUN99Histogram.R"> Histogram </a> </p>
<p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/R_Examples/KrigingJUN99QQPlot.R"> QQPlot </a> </p>
<p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/R_Examples/KrigingTrendAnalysis.R"> Trend Analysis </a> </p>
<p> <a href="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/R_Examples/KrigingVariogramCloud.R"> Variogram Cloud </a> </p>
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
<p> Figure 1. Kentucky Weather Stations and Climate Divisions  </p>
<p> Figure 2. Spatial Interpolation Techniques (Shrestha, 2023)  </p>
<p> Figure 3. Cumulative Drought Values by Weather Station from July 1998 to June 1999  </p>
<p> Figure 4. IDW of Cumulative Drought Anomalies from July 1998 to June 1999  </p>
<p> Figure 5. The Bull's Eye Effect </p>
<p> Figure 6. Histogram of Cumulative Drought Anomalies from July 1998 to June 1999  </p>
<p> Figure 7. QQPlot of Cumulative Drought Anomalies from July 1998 to June 1999 </p>
<p> Figure 8. Trend Analysis of Cumulative Drought Anomalies from July 1998 to June 1999 </p>
<p> Figure 9. Semivariogram Cloud of Cumulative Drought Anomalies from July 1998 to June 1999 </p>
<p> Figure 10. Kriging vs IDW Interpolation Models (Posts, 2018) </p>
<p> Figure 11. The Modeled Semivariogram  </p>
<p> Figure 12. Ordinary Kriging of Cumulative Drought Anomalies from July 1998 to June 1999  </p>
<p> Figure 13. Ordinary Kriging Standard Errors of Cumulative Drought Anomalies from July 1998 to June 1999 </p>
<p> Figure 14. Probability Kriging of Cumulative Drought Anomalies from July 1998 to June 1999  </p>
<p> Figure 15. Cumulative Drought by Weather Station in Kentucky from July 1998 to June 2001  </p>
<p> Figure 16. Dendrogram of Cumulative Drought Anomalies from July 1998 to June 2001  </p>
<p> Figure 17. Time Series Plot of Agglomerative Cluster Mean Centers of Cumulative Drought Anomalies from July 1998 to June 2001  </p>
<p> Figure 18. Agglomerative Clustering Map of Cumulative Drought Anomalies in Kentucky from July 1998 to June 2001  </p>
<p> Figure 19. Ideal Number of Clusters under the Elbow Method </p>
<p> Figure 20. Ideal Number of Clusters under the Silhouette Method  </p>
<p> Figure 21. Ideal Number of Clusters under the Gap Statistic Method  </p>
<p> Figure 22. Ideal Number of Clusters under the Consensus Algorithm </p>
<p> Figure 23. Cluster Silhouette Plot  </p>
<p> Figure 24. Cluster Variance Plot  </p>
<p> Figure 25. Time Series Plot of K-mean Cluster Mean Centers of Cumulative Drought Anomalies from July 1998 to June 2001  </p>
<p> Figure 26. K-Means Clustering of Cumulative Drought Anomalies in Kentucky from July 1998 to June 2001  </p>
<p> Figure 27.</p>
<p> Figure 28.</p>
<p> Figure 29.</p>
<p> Figure 30.</p>
<p> Table 1. Descriptive Statistics for the Drought Anomalies in June of 1999  </p>
<p> Table 2. Ordinary Kriging Parameters  </p>
<p> Table 3. Cross Validation Statistics  </p>
<p> Table 4. Between Sum of Squares over Total Sum of Squares Partition Formula Table  </p>
<p> Table 5. Table of Average Silhouette Width Scores  </p> <BR>

<h3> References </h3> <br>

<p> Team, P. W. (2020). <em>Climate Division Map: NOAA Physical Sciences Laboratory</em>. https://psl.noaa.gov/data/usclimdivs/data/map.html#Kentucky%20 </p>
<p> Posts, V. M. (2018, September 6).<em>Difference between IDW and Kriging – Variogram graph. Trang Vo</em>. https://trangthuyvo.wordpress.com/2018/09/05/difference-between-idw-and-kriging-variogram-graph/ </p>
<p> Shrestha, D. (2023, February 28). <em> What is Spatial Interpolation? What are the different methods of Interpolation used in GIS?</em> https://www.linkedin.com/pulse/what-spatial-interpolation-different-methods-used-gis-dinesh-shrestha/  </p>
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
