<html lang="en-US">

<head>
    <meta charset='utf-8'>
    <meta http-equiv= "X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,maximum-scale=2">
    <style>

    </style>

<script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script> 
<link rel="stylesheet" href="./dist/css/lightbox.css">

</head>

<body>

<h1> Finding an Ideal Site for a new Fire Station in Warren County, Kentucky </h1> <br>

<p> One of the most common and useful applications of GIS analysis is land suitability analysis, a process through which an ideal site is chosen from many candidate sites. This analysis process often involves considering geographic factors, whether social, economic, environmental, or physical, to determine how suitable an area is for a specific land use and human activity. Consequently, it tends to be complex and iterative, as numerous techniques such as overlays, queries, buffers, intersections, raster operations, and others are common in this analysis.  </p> <br>

<p> In this project, the objective is to find an ideal site for a new professional fire station or upgrade an existing volunteer fire station in Warren County, Kentucky. Since land use data is essential to this study, land parcels will serve as the base layer. Various other spatial data relevant to locating an ideal site will be collected, processed, and weighed as either a constraint or an opportunity. Then, these data will be intersected with the land parcel data to produce a set of ideal sites. Population density, long term population trends, and potential future land use changes will be used to identify existing fire stations suitable for an upgrade to a professional fire station. As fire stations are the object of this analysis, it is also important to locate a fire station that will best improve the fire response service to the underlying population. This will be achieved using service area analysis, areal proportion analysis, and location allocation analysis methods.  </p> <br>

<p> Data for this project stems from many sources. These include economic (median property value), demographic (census data), governmental (land use, future land use, transportation, zoning), and physical (elevation, karst, water) data. Detailed information about these data, such as the type of data and their purpose, is contained in Table 1 below. A visualization of each data layer is also depicted in Figure 1. </p> <br>

<table><caption>Table 1. Spatial Data used in the Land Suitability Analysis </caption>
 <thead>
   <tr>
	<th>Data Layer </th>
	<th>Data Source </th>
    <th>Purpose </th>
    <th>Category </th>
    <th>Weights </th>
   </tr>
 </thead>
 <tbody>
   <tr>
	<td>US Census SF1 Data / TIGER lines (Block, Block Group, Tract, and County levels)</td>
	<td>US Census Bureau / TIGER lines</td>
	<td>Population density and projections / Demand weights for location - allocation analysis </td>
    <td>Soft Opportunity </td>
    <td> <table> 
    <tr> 
    <td> 2000 - 2020 Population Growth </td>
    <td> Weights </td>
    </tr>
    <tr>
    <td> 0-1%</td>
    <td> 0.05</td>
    </tr>
    <tr>
    <td> 1-5%</td>
    <td> 0.25</td>
    </tr>
    <tr>
    <td> 5-25% </td>
    <td> 0.5</td>
    </tr>
    <tr>
    <td> 25-50% </td>
    <td> 0.75</td>
    </tr>
    <tr> 
    <td> >50% </td>
    <td> 1 </td>
    </tr>
    </table>  
    </td>
   </tr>
   <tr>
	<td> US Census ACS Data (Median Home Value, Tract Level) </td>
	<td> US Census Bureau / ESRI Online </td>
	<td> Provide equitable property value increase for homes near new or improved fire station </td>
    <td> Soft Opportunity </td>
    <td>
    <table>
    <tr>
    <td> Quantile Classification </td>
    <td> Weight </td>
    </tr>
    <tr>
    <td> $48645 -- $142778 </td>   
    <td> 0.5 </td>
    </tr>
    <tr>
    <td> $142779 -- $187542 </td>
    <td> 0.4 </td>
    </tr>
    <tr>
    <td> $187543 -- $257888 </td>
    <td> 0.3 </td>
    </tr>
    <tr>
    <td> $257889 -- $271482 </td>
    <td> 0.2 </td>
    </tr>
    <tr>
    <td> $271483 -- $305546 </td>
    <td> 0.1 </td>
    </tr>
    <tr>
    <td> $305547 -- $385897 </td>
    <td> 0 </td>
    </tr>
    </table>
    </td>
   </tr>
<tr>
<td> Karst Areas in Kentucky </td>	
<td> KYGovMaps </td>	
<td> Avoid sites with known karst geology -- Warren County is prone to sinkhole formations </td>	
<td> Hard Constraint </td>	
<td> Boolean (a candidate site does or does not have karst geology) </td>	
</tr>
<tr> 
<td> Water TIGER lines (Area Water) </td>
<td> US Census TIGER lines </td>
<td> Avoid site in a body of water. </td>
<td> Hard Constraint </td>
<td> Boolean (A candidate site does or does not contain water) </td>
</tr>
<tr>
<td> Digital Elevation Model of Kentucky </td>
<td> KYfromAbove </td>
<td> Calculate slope to avoid areas with >15 ft slope </td>
<td> Hard Constraint </td>
<td> Boolean (A candidate site is or is not >15 ft in slope) </td>
</tr>
<tr>
<td> All Roads and Major Roads </td>
<td> KY Department of Transportation </td>
<td> Used for network dataset construction / close proximity to major roads as an opportunity </td>
<td> Soft Opportunity </td>
<td> Buffer 1/3rd mile: 0.75</td>
</tr>
<tr>
<td> City County Planning Commission (CCPC) Parcel Data </td>
<td> Bowling Green Open Data Hub </td>
<td> Base Layer for Analysis / Query certain types of land use </td>
<td> Hard Constraint </td>
<td> Boolean (A candidate site must be Agricultural, Commercial, Public, or Vacant. Other values are discluded.) </td>
</tr>
<tr>
<td> CCPC Zoning Data </td>
<td> Bowling Green Open Data Hub </td>
<td> Find and remove floodplains </td>
<td> Hard Constraint </td>
<td> Boolean (A candidate site cannot be built in a floodplain) </td>
</tr>
<tr>
<td> CCPC Future Land Use Map </td>
<td> Bowling Green Open Data Hub </td>
<td> Compare with parcel data and identify new residential areas as high population. </td>
<td> Soft Constraint </td>
<td>
<table>
<tr>
<td> Land Use Type </td>	
<td> Weight </td>	
</tr>
<tr>
<td> Low Density </td>	
<td> 0.75 </td>	
</tr>
<tr>
<td> Rural Density </td>	
<td> 0.5 </td>	 
</tr>
</table>
</td>
</tr>
<tr>
<td> Warren County Fire Stations </td>	
<td> Bowling Green Open Data Hub </td>	
<td> Used as facilities in service area analysis and location allocation analysis </td>	
<td> Not Applicable </td>	
<td> Not Applicable </td>	
</tr>

 </tbody>
 
</table> <br> <br>

<figure>
<a class="Constraints-and-Opportunities-Link" href="https://i.imgur.com/07mO4wR.jpeg" data-lightbox="Site Poster" data-title="Constraints and Opportunities" class="center"> <img class="Constraints and Opportunities" src="https://i.imgur.com/07mO4wR.jpeg" alt="Various spatial data in Warren County"> </a>
<figcaption> Figure 1. The various spatial data used as constraints or opportunities to filter parcel sites down to ideal sites. </figcaption>
</figure> <br>


<p> Placeholder </p>

  <script src="./src/js/lightbox.js"></script> 


  
</body>

</html>
