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

  h3 {
  text-align: center;
  }
  
  figure figcaption {
  text-align: center; 
  }
  
    </style>
</head>


<body>

<h1 style="text-align:center;"> Interpolation Methods: Using Kriging on a Dataset </h1> <br>

<p> Interpolation methods in GIS are vital techniques used to estimate values at unsampled locations within a geographic space based on known values from sampled points. These methods play a crucial role in generating continuous surfaces from discrete data points, facilitating spatial analysis and visualization. Common interpolation techniques include inverse distance weighting (IDW), which assigns weights to neighboring points based on their proximity; kriging, a geostatistical method that models spatial dependence; and spline interpolation, which fits a mathematical function through points to create a smooth surface. Each method has its strengths and applicability depending on the nature of the data and the spatial variability being analyzed, ensuring accurate representation and prediction in GIS applications ranging from environmental modeling to urban planning.
</p> <br>

<p> This project is broken into two parts. The first looks at historical drought anomaly data from June of 1999 in Kentucky using interpolation techniques, and the second looks at September of 1998 using multivariate statistical methods.  </p>

<h3> Drought Anomaly Data for this Project </h3> <br>

<p> The drought dataset was collected between July of 1998 and June of 2001. It is a cumulative dataset, so each proceeding month includes the values from the previous months. Most of the values within the dataset are negative, indicating that some form of drought was occuring at those particular weather stations. By selecting June 1999 for the first portion of the project, a year of drought anomaly values are being analyzed.   </p> <br>

<p> The dataset takes the form of 56 weather stations in the form of points. These points will be interpolated to look at drought anomaly surfaces. Before looking at that, it is important to conduct a visual analysis of drought data via a chloropleth and graduated symbol map.  </p>

<p> (Map of Weather Stations here) </p> <br>

<p> First, it would do well to consider visual patterns of drought intensity. There is a definite pattern to the intensity of droughts in Kentucky as of June of 1999 (Figure ?). There appears to be a directional effect occurring with regards to droughts in Kentucky, as moving from west to east results in going from an area with no or little droughts to an area with a large deficiency in precipitation. Western Kentucky, which typically experiences intense storms and more erratic weather than the rest of Kentucky, was generally free of droughts or only experienced a minor decrease in rainfall. Eastern Kentucky, which typically has more rain showers than the rest of the state, had multiple stations reporting a precipitation deficiency of more than ten inches. The spatial patterns occurring on this map are contrary to Kentucky’s typical precipitation patterns, as western Kentucky generally experiences droughts due to erratic precipitation and Eastern Kentucky typically has higher recorded precipitation values -- or orographic rainfall.  </p> <br>

<p> There are some limitations within the dataset that need to be discussed. Since the boundary of the study area is the human-imposed border of Kentucky, critical drought values occurring just outside of Kentucky will not be calculated in the interpolation model. Similarly, there are few weather stations positioned on the edge of Kentucky, which may result in high error along the border. The edge effects can be mitigated by applying a buffer on the boundary of Kentucky and then running an interpolation model. Ideally, there would also be data on weather stations just outside of Kentucky in neighboring states so that the edge effects could be mitigated.   </p> <br>

<h3> Inverse Distanced Weighed Interpolation  </h3> <br>

<p> Moving on, an inverse distance weighted (IDW) surface of the drought anomaly values can be created. The IDW is presented in Figure ? below. </p> <br>

<p> (Stick IDW here) </p> <br>

<p> There are a few definitions unique to interpolative methods that need to be defined before analyzing the IDW. These pertain to the prediction accuracy of the surface created by the IDW, as well as how trustworthy the surface is. Analysis of accuracy refers to the accuracy of an interpolation model. This means examining errors, the difference between the predicted and observed values at known locations. Analysis of accuracy is done through validation and cross validation. Deterministic methods are limited to analyses of accuracy, which only consider prediction accuracy based on the sample data. Analysis of uncertainty refers to the trustworthiness of predicted values and how confident the user is about them. These analyses require a measure of uncertainty alongside the prediction surface, which limits analysis of uncertainty to stochastic interpolation methods such as kriging.  </p> <br>

<p> The prediction accuracy of the IDW surface can be evaluated by using validation or cross validation to check for errors in the surface – this is achieved by measuring the difference between predicted and observed values. With a large sample size, validation is typically used to sample a subset of the data and optimize an ideal model. With a small sample size, cross-validation is employed to interpolate over each of the points, one-by-one. This is done by removing a point, interpolating with the remaining points, then putting the removed point back in and iterating to the next point until the process is done for each point. Cross-validation is the default process and is done automatically for kriging. It is not done for an IDW surface however.   </p> <br>

<p> The trustworthiness of the IDW surface cannot be computed with an IDW alone, because IDWs do not have a measure of uncertainty (as they are deterministic models and cannot account for randomness). In order to assess the trustworthiness of this interpolation model, a different stochastic method such as kriging would have to be used.  </p> <br>

<p> Next, it is important to determine whether there are any statewide trends in drought anomaly data. Such a trend can be seen in Kentucky regarding drought anomalies. Comparing values from the western portion of the state to the eastern portion, it becomes apparent that anisotropy is taking effect in Kentucky, as values in western Kentucky are positive, indicating no drought is occuring, compared to eastern Kentucky, where the drought is severe and the cumulative rainfall patterns are negative. In particular, northeastern Kentucky along the Ohio River and Big Sandy River presents the most severe instance of a drought. In central Kentucky, the cumulative precipitation is generally negative, though there is some variation, as various areas with higher precipitation show the drought is not forming a trend line.   </p> <br>

<p> Finally, some limitations of the IDW model need to be considered. Major limitations include the average and bull’s eye effect. If some of the chosen values used to interpolate are not within the threshold distance of any samples, they will not produce a surface: this can make outliers and edge values particularly difficult to interpolate around accurately. Depending on the number of points selected, proper continuity may also not be achieved if there are too few points. Each point in an IDW has the same weight, which can create issues for particularly high or low values. This can lead to the “bull’s eye” effect, where distant points will simply create a distance decay circle that does not properly reflect the studied subject. Similarly, the range of interpolated values cannot exceed the number of observed values. To mitigate the edge effect, it is important that values are also positioned on the edge of the study area, though this is difficult to achieve in practice.  </p> <br>

<h3> Exploratory Data Analysis </h3> <br>

<p> (Pic of Histogram here) </p> <br>

<table>
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

<p> (Pic of QQ Plot here) </p> <br>

<p> The field values for June of 1999 are fairly normal, though there is a positive skew to the values of roughly 0.5.  Unfortunately, since drought values include negative values to indicate a lack of rainfall, it is impossible to apply a log, arcsin, or box transformation to reduce skewness and kurtosis. This can be observed in the histogram in Figure ?, where the right tail of the distribution is longer than the left tail. Similarly, the QQplot in Figure ? shows some curving past the mean on the right-hand side, denoting a degree of skewness. Considering the context of this study, however, these June 1999 drought anomaly values should be compatible with ordinary kriging interpolation methods. For consideration, if these skewness and kurtosis values existed on a dataset for a topic such as critical resource mining, then it may not be best to proceed with a kriging analysis. </p> <br>

<p> (Pic of Trend Analysis and Semivariogram/Covariance Cloud here) </p> <br>

<p> (Address Trend Analysis and Semivariogram/Covariance Cloud here) </p> <br>

<h3> Kriging </h3> <br>

<h1 style="text-align:center;"> Multivariate Methods: Applying some Measures to a Different Month </h1> <br>

<p> Multivariate statistics play a crucial role in Geographic Information Systems (GIS) by enabling the analysis of complex spatial data involving multiple variables simultaneously. Through techniques such as principal component analysis (PCA), cluster analysis, and canonical correlation analysis, multivariate statistics help to uncover patterns, relationships, and underlying structures within geospatial datasets. For instance, PCA can reduce the dimensionality of data, highlighting the most significant variables that influence spatial phenomena, while cluster analysis can identify distinct geographical areas with similar characteristics. By applying these statistical methods, GIS professionals can gain deeper insights into spatial processes, enhance predictive modeling, and make more informed decisions about land use, environmental management, and urban planning. </p> <br>

<h3> Picking Another Month from the Drought Anomaly Data </h3> <br>

<h3> Agglomerative Clustering </h3> <br>

<h3> K-Means </h3>

<h3> Final Cluster Map and Time-Series Plot </h3>


<h3> List of Figures and Tables </h3> <br>

<h3> References </h3> <br>
<p> https://psl.noaa.gov/data/usclimdivs/data/map.html#Kentucky%20 </p>

</body>

</html>
