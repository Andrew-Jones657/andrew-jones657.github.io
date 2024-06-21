<html lang="en-US">

<head>
    <meta charset='utf-8'>
    <meta http-equiv= "X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,maximum-scale=2">
    <style>
    #myImg{
  border-radius: 2px;
  cursor: pointer;
  transition: 0.3s;
  }

  figure figcaption {
  text-align: center; 
  }

  
  #myImg:hover {opacity: 0.7;}

  /* The Modal (background) */
  .modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
  }

 /* Modal Content (Image) */
 .modal-content {
  margin: auto;
  display: block;
  width: 80%;
  max-height: 750 px;
  max-width: 1000px;
  }

  /* Caption of Modal Image (Image Text) - Same Width as the Image */
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

  /* Add Animation - Zoom in the Modal */
  .modal-content, #caption {
  animation-name: zoom;
  animation-duration: 0.6s;
  }

  @keyframes zoom {
  from {transform:scale(0)}
  to {transform:scale(1)}
  }

  /* The Close Button */
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

 /* 100% Image Width on Smaller Screens */
 @media only screen and (max-width: 900px){
  .modal-content {
    width: 100%;
  }
}
    </style>






</head>

<body>

<h1> Finding an Ideal Site for a new Fire Station in Warren County, Kentucky </h1> <br>

<p> One of the most common and useful applications of GIS analysis is land suitability analysis, a process through which an ideal site is chosen from many candidate sites. This analysis process often involves considering geographic factors, whether social, economic, environmental, or physical, to determine how suitable an area is for a specific land use and human activity. Consequently, it tends to be complex and iterative, as numerous techniques such as overlays, queries, buffers, intersections, raster operations, and others are common in this analysis.  </p> <br>

<p> In this project, the objective is to find an ideal site for a new professional fire station or upgrade an existing volunteer fire station in Warren County, Kentucky. Since land use data is essential to this study, land parcels will serve as the base layer. Various other spatial data relevant to locating an ideal site will be collected, processed, and weighed as either a constraint or an opportunity. Then, these data will be intersected with the land parcel data to produce a set of ideal sites. Population density, long term population trends, and potential future land use changes will be used to identify existing fire stations suitable for an upgrade to a professional fire station. As fire stations are the object of this analysis, it is also important to locate a fire station that will best improve the fire response service to the underlying population. This will be achieved using service area analysis, areal proportion analysis, and location allocation analysis methods.  </p> <br>

<h3> Spatial Data for the Site Selection Analysis and General Workflow </h3> <br>

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
<img id="myImg" class="Constraints and Opportunities" src="https://i.imgur.com/07mO4wR.jpeg" alt="Various spatial data in Warren County" style="width:100%;max-width:625px">
<figcaption> Figure 1. Various spatial data in Warren County used to narrow down an ideal site. </figcaption>
</figure>
<div id="myModal" class="modal">
   <span class="close">&times;</span>
   <img class="modal-content" id="img01">
   <div id="Various spatial data in Warren County used to narrow down an ideal site."></div>   
</div> <br>

<p> The detailed workflow for this project is presented in Figure 2 below. As mentioned earlier, it is a complex albeit iterative analysis. The site selection process is focused on narrowing down information to whatever criteria the user deems important. The latter half of the workflow is more dependent on correctly establishing field values, parameters, and settings for the service area and location allocation analyses within the network dataset.  </p> <br>



<figure> 
<img id="myImg" class="Overall Project Workflow" src="https://i.imgur.com/vKeMTww.jpeg" alt="Project Workflow" style="width:100%;max-width:625px">
<figcaption> Figure 2. Project workflow </figcaption>
</figure>
<div id="myModal" class="modal">
   <span class="close">&times;</span>
   <img class="modal-content" id="img01">
   <div id="Project workflow"></div>   
</div> <br>

<h3> Demographic and Zoning Data Important for Site Selection </h3> <br>

<h3> Considering Fire Response Times and Establishing the Network Dataset and its Parameters </h3> <br>

<p> Placeholder </p>








<script>
// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
} 
</script>
</body>

</html>
