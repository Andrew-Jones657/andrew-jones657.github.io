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

<p> This project is broken into two parts. The first looks at historical drought anomaly data from June of 1999 in Kentucky. This portion involves using interpolation techniques to analyze the  </p>

<h3> Drought Anomaly Data for this Project </h3> <br>

<p> In this project, historical drought anomaly data of Kentucky from June of 1999 will be analyzed using interpolation and multivariate methods.  </p>

<h3> Inverse Distanced Weighed Interpolation  </h3> <br>

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

<p> (Pic of QQ Plot here) </p> <br>


<h3> Kriging </h3> <br>

<h1 style="text-align:cemter;"> Multivariate Methods: Applying some Measures to a Different Month </h1> <br>

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
