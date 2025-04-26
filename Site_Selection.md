<html lang="en-US">

<head>
    <meta charset='utf-8'>
    <meta http-equiv= "X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,maximum-scale=2">
    <style>

html, body, #map{
       width: 100%;
       height: 100%;
       border: 1px solid #444444;
       min-height: 450px;
       min-width: 625px;
    }

  h1{
  text-align: center;
  }

  h2{
  text-align: center;
  }

  h3{
  text-align: center;
  }

  h5{
  text-align: center;
  }
  
  .tablecenter {
  margin-left: auto;
  margin-right: auto;
  }
  
  figure figcaption {
  text-align: center; 
  }

#myImg {
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
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

.info { 
padding: 6px 8px; font: 14px/16px Arial, Helvetica, sans-serif; background: white; background: rgba(255,255,255,0.8); 
box-shadow: 0 0 15px rgba(0,0,0,0.2); border-radius: 5px; } 
.info h4 { margin: 0 0 5px; color: #777; }
.legend { text-align: left; line-height: 18px; color: #555; } 
.legend i { width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.8; }
.dataSource { 	padding: 6px 8px; font: 14px/16px Arial, Helvetica, sans-serif; background: white; background: rgba(255,255,255,0.8); 
box-shadow: 0 0 15px rgba(0,0,0,0.2); border-radius: 5px;  }
   </style>

 <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>

 <!-- Make sure you put this AFTER Leaflet's CSS -->

 <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>

 <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet-ajax/2.1.0/leaflet.ajax.min.js"></script>

  <link rel="stylesheet" href="https://unpkg.com/leaflet.fullscreen@latest/Control.FullScreen.css" />
  <script src="https://unpkg.com/leaflet.fullscreen@latest/Control.FullScreen.js"></script> 

<script src="./files/LeafletTutorial/L.TileLayer.NoGap.js"> </script>

</head>

<body>

<h1 style="text-align:center;"> Finding an Ideal Site for a New Fire Station in Warren County, Kentucky </h1> <br>

<p> One of the most common and useful applications of GIS analysis is site selection analysis, a process through which an ideal site is chosen from many candidate sites. This analysis process often involves considering geographic factors, whether social, economic, environmental, or physical, to determine how suitable an area is for a specific land use and human activity. Consequently, it tends to be complex and iterative, as numerous techniques such as overlays, queries, buffers, intersections, raster operations, and others are common in this analysis.  </p> <br>

<p> In this project, the objective is to find an ideal site for a new professional fire station or to upgrade an existing volunteer fire station in Warren County, Kentucky. Land parcels will be used as the base layer, as land use data is considered essential. Various other spatial data relevant to site selection will be collected, processed, and categorized as either constraints or opportunities. These data will then be intersected with the land parcel data to produce a set of ideal sites. </p> <br>

<p> To assess potential upgrades to existing fire stations, population density, long-term trends, and possible future land use changes will be analyzed. As fire stations are central to this analysis, a site that optimally enhances fire response services for the surrounding population will need to be identified. This will be achieved through service area analysis, areal proportion analysis, and location allocation analysis methods. </p> <br>

<p> <em> To best read content on this article, you may need zoom in on your browser using CTRL and the + key or CTRL and UP on the mouse scroll wheel. You can also click on images to see a zoomed in pop up. </em> </p> <br>

<h3> Spatial Data for the Site Selection Analysis and General Workflow </h3> <br>

<p> Data for this project is derived from multiple sources. These include economic data (such as median property value), demographic data (including census data), governmental data (covering land use, future land use, transportation, and zoning), and physical data (encompassing elevation, karst, and water). Detailed information about these data sources, including their types and purposes, is provided in Table 1 below. A visualization of each data layer is also depicted in Figure 1. </p> <br>

<table><caption>Table 1. Spatial Data used in the Site Selection Analysis </caption>
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
	<td>US Census SF1 Data, TIGER lines (Block, Block Group, Tract, and County levels)</td>
	<td>US Census Bureau, TIGER lines</td>
	<td>Population density and projections, Demand weights for location - allocation analysis </td>
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
	<td> US Census Bureau, ESRI Online </td>
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
<td> Used for network dataset construction, close proximity to major roads as an opportunity </td>
<td> Soft Opportunity </td>
<td> Buffer 1/3rd mile: 0.75</td>
</tr>
<tr>
<td> City County Planning Commission (CCPC) Parcel Data </td>
<td> Bowling Green Open Data Hub </td>
<td> Base Layer for Analysis, Query certain types of land use, Impose >= 1 acre land parcel size requirement </td>
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
<img class="myImages" id="myImg" src="https://i.imgur.com/07mO4wR.jpeg" alt="Various spatial data in Warren County" style="width:100%;max-width:625px">
<figcaption> Figure 1. A Visualization of the Spatial Data used in the Site Selection Process </figcaption>
</figure> <br>


<p> The detailed workflow for this project is presented in Figure 2 below. As mentioned earlier, it is a complex, albeit iterative analysis. The site selection process is focused on narrowing down information to criteria deemed important by the user. The latter half of the workflow is more dependent on correctly establishing field values, parameters, and settings for the service area and location allocation analyses within the network dataset.  </p> <br>

<p> Click on the hyper link by Figure 2 to download the flow chart. </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/vKeMTww.jpeg" alt="Project Workflow" style="width:100%;max-width:625px">
<figcaption> Figure 2. <a href="https://i.imgur.com/vKeMTww.jpeg"> Project Workflow </a> </figcaption>
</figure> <br>

<h3> A Brief Summary on the Site Selection Criteria </h3>

<p> Some site selection criteria are tailored to avoid physical impediments. Bodies of water and floodplains were excluded as potential candidate sites. Various areas of Warren County are topographically prominent; therefore, land parcels with a slope change exceeding 15 feet were avoided as candidate sites. Unique to Warren County is its karst landscape, which can lead to the formation of sinkholes. Consequently, land parcels with known karst geology were removed from the candidate site list.</p> <br>

<p> To ensure a quick response to emergencies, fire stations must be located near major roads. In the site selection process, land parcels within one-third of a mile from major roads were assigned a positive weight. </p> <br>

<p> Since the presence of a professional fire station can lower home insurance rates, a quantile classification of property home values from the American Community Survey (at the Census Tract level) was utilized to ensure equitable distribution of these discounts. Lower-valued homes were weighted more heavily than higher-valued homes.  </p> <br> 

<p> Land parcels must provide sufficient space to accommodate a fire station. The required acreage varies based on station size, with some sources recommending at least five acres (according to the American Planning Association). However, for this study, the size of the smallest existing professional fire station land parcel will be used; in this case, a one-acre land parcel will be considered.</p> <br>

<h3> Demographic and Zoning Data Important for Site Selection </h3> <br>

<p> Before the fire response service in Warren County is examined, the distribution and changes in the overall population are worth observing. Figure 3 below depicts a dot density map of Warren County, which had a population of 134,510 people at that time. Bowling Green, which contains more than half of Warren County’s population at 72,642 people, is situated between I-65 and I-165 in the center of the county. A moderate population density is observed in the suburban sprawl northeast and south of Bowling Green, while the remainder of Warren County, characterized by its more rural nature, displays a low population density.  </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/MgyutPx.jpeg" alt="2020 Warren County Population Density" style="width:100%;max-width:625px">
<figcaption> Figure 3. Dot Density Population of Warren County in 2020 </figcaption>
</figure> <br>

<p> Beyond population density in 2020, population change since 2000 illustrates which areas in Warren County may require improved fire service. Figure 4 below displays a choropleth map of percent population change between 2000 and 2020, along with the population dot density in 2000 overlaid with the absolute population change dot density from 2000 to 2020. During this time, Warren County experienced growth of 42,032 people, with most of this growth occurring in newly developed suburbs. Subdivisions such as Whispering Hills in western Bowling Green, Northridge to the northeast of Bowling Green, and Springfield south of Bowling Green were established during this period. Some of the highest population growth was recorded in the corridor between Russellville Road and I-65. Given the significant growth in these newly developed suburban areas, a high weight was assigned to these locations in the site selection analysis, as continued growth is likely in these regions. </p> <br>

<p> <em> A quick note on Figure 4: since the boundaries of census block groups change over time, one cannot directly calculate the population change between 2000 and 2020. Instead, census blocks from 2000 must be aggregated to the boundaries of the 2020 census block groups. Then, a population change estimate can be calculated. This process is also known as areal proportion analysis. </em>  </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/RVkydLo.jpeg" alt="Population Change in Warren County 2000-2020" style="width:100%;max-width:625px">
<figcaption> Figure 4. Population Changes in Warren County between 2000 and 2020 </figcaption>
</figure> <br>

<p> Like population density and trends, existing land use is considered an important element of this study. As mentioned above in Figure 1, land use types in the site selection process are limited to agricultural, commercial, public, or vacant. These land use types were selected on the basis that they would be the easiest to rezone. The map of land use in Warren County, produced by the Bowling Green Warren County City County Planning Commission (CCPC), illustrates how land use is distributed among land parcels (Figure 5). It should be noted that the yellow and red areas represent residential parcels. These parcels contain most of the population seen in Figures 3 and 4, making it important to ensure that they are near a new or improved fire station.  </p> <br>

<figure>
<img class="myImages" src="https://i.imgur.com/09vHtse.jpeg" alt="Land Use in Warren County" style="width:100%;max-width:625px">
<figcaption> Figure 5. Land Use in Warren County </figcaption>
</figure>

<p> The CCPC also provides a future land use map, which shows how Warren County’s land use may change over the next 20 years (Figure 6). This map, released in 2012, contains predictions for 2030. The areas designated as low and rural density land use on this map are of particular importance, as they suggest that much of the agricultural land close to Bowling Green will transition to a more populated, residential nature. Consequently, it will be important for these areas to have adequate fire response services, and for this reason, low density and rural density were assigned positive weights in the site selection process. </p> <br>

<figure>
<img class="myImages" src="https://i.imgur.com/MdrSqxv.jpeg" alt="Future Land Use Map (2030) of Warren County" style="width:100%;max-width:625px">
<figcaption> Figure 6. Future Land Use Map (2030) of Warren County </figcaption>
</figure> <br>


<h3> Considering Fire Response Times and Establishing the Network Dataset and its Parameters </h3> <br>

<p> Quantifying the response quality of a fire station in a spatial model is complex. Depending on the type of emergency, various goal times are set by first responders that they wish to meet within a certain percentage of cases. Additionally, different types of emergencies require different vehicles and response procedures. Addressing every possible nuance in a GIS environment is challenging and extends beyond the scope of this project. To resolve this issue, some generalizations will be made regarding the response of fire stations to emergencies.  </p> <br>

<p> Bowling Green and Warren County provide two different types of fire services. The City of Bowling Green is served by a fully staffed professional fire service, whereas Warren County’s fire service is more reliant on volunteers. In the GIS representation, city fire stations will be classified as “professional,” while county fire stations will be classified as “volunteer.” Since city fire stations are fully staffed, a one-minute startup delay is assigned to them, reflecting the expectation of a quick response to emergencies. In contrast, volunteer fire stations may require responders to arrive before preparing to respond to an emergency; therefore, a seven-minute startup delay is assigned to these fire stations. </p> <br>

<p> The overall fire response will be measured by the amount of time taken to travel from a fire station to a location in Warren County—a detailed breakdown of these ratings is presented in Table 2. These ratings are based on a summary of observations from Lexipol (Moore-Merrell, 2023). It should be noted that fire service exists beyond the 20-minute threshold; however, response times are significantly slower. The goal of the service area analysis is to maximize effective fire service coverage to the highest number of people, so the fire station with the highest number of individuals in the first two response categories (eight minutes or less) will be selected as the ideal station.   </p> <br>

<table class="tablecenter"> <caption>Table 2. Fire Response Time Quality </caption>
<thead>
<tr>
<th> Response Time </th>
<th> Rating </th>
</tr>
</thead>
<tbody>
<tr>
<td> Under five minutes </td>
<td> Excellent </td>
</tr>
<tr>
<td> Five to eight minutes </td>
<td> Good </td>
</tr>
<tr>
<td> Eight to ten minutes </td>
<td> Fair </td>
</tr>
<tr>
<td> Ten to 12 minutes </td>
<td>  Delayed</td>
</tr>
<tr>
<td> 12 to 15 minutes </td>
<td> Poor </td>
</tr>
<tr>
<td> 15 to 20 minutes </td>
<td> Unacceptable </td>
</tr>
</tbody>
</table> <br>

<p> Concerning travel speeds, speed limits by road type are presented in Table 3. However, the major roads in Warren County have been linear referenced, allowing for more detailed variations in their travel speeds. Since fire response vehicles carry large amounts of water, they are very heavy and cannot necessarily travel at or above the speed limit safely. For this reason, travel speeds will be reduced by five miles per hour. Use of interstates and parkways will also be restricted due to the high speeds.  </p> <br>

<table class="center"> <caption> Table 3. Speed Limits by Road Type </caption>
<thead> 
<tr>
<th> Type </th>
<th> Speed </th>
<th> Restriction </th>
<th> Travel Speed </th>
</tr>
</thead>
<tbody>
<tr>
<td> Country Road </td>
<td> 55 </td>
<td> Allowed </td>
<td> 50 </td>
</tr>
<tr>
<td> City Street </td>
<td> 30 </td>
<td> Allowed </td>
<td> 25 </td>
</tr>
<tr>
<td> Federal Department </td>
<td> 55 </td>
<td> Allowed </td>
<td> 50 </td>
</tr>
<tr>
<td> Interstate </td>
<td> 70 </td>
<td> Not Allowed </td>
<td> 65 </td>
</tr>
<tr>
<td> University Roads </td>
<td> 25 </td>
<td> Allowed </td>
<td> 20 </td>
</tr>
<tr>
<td> Kentucky State Highway </td>
<td> 55 </td>
<td> Allowed </td>
<td> 50 </td>
</tr>
<tr>
<td> Franklin Simpson Parks and Rec </td>
<td> 25 </td>
<td> Allowed </td>
<td> 20 </td>
</tr>
<tr>
<td> Louie B. Nunn Cumberland Expressway </td>
<td> 70 </td>
<td> Not Allowed </td>
<td> 65 </td>
</tr>
<tr>
<td> Private Road </td>
<td> 30 </td>
<td> Allowed </td>
<td> 25 </td>
</tr>
<tr>
<td> Private Street </td>
<td> 30 </td>
<td> Allowed </td>
<td> 25 </td>
</tr>
<tr>
<td> Private Venue </td>
<td> 30 </td>
<td> Allowed </td>
<td> 25 </td>
</tr>
<tr>
<td> US Highway </td>
<td> 55 </td>
<td> Allowed </td>
<td> 50 </td>
</tr>
<tr>
<td> Wendell H. Ford Western Kentucky Parkway </td>
<td> 70 </td>
<td> Not Allowed </td>
<td> 65 </td>
</tr>
<tr>
<td> Old Kentucky State Highways </td>
<td> 35 </td>
<td> Allowed </td>
<td> 30 </td>
</tr>
</tbody>
</table> <br>

<p> Having considered how fire response behavior should function, parameters for the network dataset can be set up (Table 4). Except for costs, these parameters have been previously described. The costs represent the accumulation of travel time from the fire station to a location in Warren County. Time is calculated in the road network by dividing distance by travel speed and then multiplying by 60 to convert from seconds to minutes. The delay is based on a generalized assumption that fire response vehicles will need to slow down at junctions to either turn or pass through carefully. Since this cost is expressed in minutes, a value of 0.1667 (ten seconds) is input as the cost at junctions.   </p> <br>

<table class="center"><caption> Table 4. Network Dataset Parameters </caption> 
<thead>
<tr>
<th> Fire Station Type </th>
<th> Restriction </th>
<th> Costs </th>
<th> Speed </th>
</tr>
</thead>
<tbody>
<tr>
<td> Professional (One-Minute Startup Delay) </td>
<td> Road Access (Boolean: 0 Allowed 1 Not Allowed) </td> 
<td> Time in Minutes ( [Distance] / [Travel Speed] * 60 ) </td>
 <td> Five mph lower than posted speed limit </td>
</tr>
<tr> 
<td> Volunteer (Seven-Minute Startup Delay) </td>
<td> </td>
<td> Delay in Minutes (10 seconds per junction) </td>
<td> </td>
</tr>
</tbody>
</table> <br>

<h3> Selecting Candidate Fire Stations </h3> <br>

<p> To measure the response quality of the current and candidate fire stations, a service area analysis model will be created. Service area analysis is a type of network analysis used to determine the region that encompasses all accessible streets within a specific impedance. In this case, the service area will be divided according to the cutoff times presented in Table 5; these polygons will represent travel times from all fire stations. </p> <br>


<table> <caption> Table 5. Parameters for the Service Area Analysis </caption>
<thead>
<tr>
<th> Facilities </th>
<th> Time Attribute </th>
<th> Cutoffs </th>
<th> Polygon Settings </th>
<th> Trim Distance </th>
</tr>
</thead>
<tbody>
<tr>
<td> Fire Stations </td>
<td> Delay </td>
<td> 5, 8, 10, 12, 15, 20 Minutes </td>
<td> High Precision, Boundary Type: Dissolve, Polygon: Rings </td>
<td> Trim Distance: 531 Meters </td>
</tr>
</tbody>
</table> <br>

<p> After the service area analysis parameters in Table 5 are established, a service area analysis model of the current fire service in Warren County is created (Figure 7). The city of Bowling Green is clearly shown to have excellent fire service, as few parts of the city have a response time exceeding eight minutes. Many of the county suburbs adjacent to Bowling Green are also found to have good service. Areas with poor fire service tend to be in the rural parts of Warren County, which exhibit low population densities as established by Figure 3. </p> <br>


<figure>
<img class="myImages" src="https://i.imgur.com/hdprVyx.jpg" alt="Current Fire Service in Warren County" style="width:100%;max-width:625px">
<figcaption> Figure 7. Current Fire Service in Warren County</figcaption>
</figure> <br>

<p> After the workflow for the site selection analysis is completed, the final candidate sites are presented in Figure 8 below. The candidate land parcels are weighed using an unclassified color scheme, with darker blue sites being considered more desirable. The highest-scoring candidate sites are in suburban areas north of Bowling Green along Highway 526 and Highway 957. The second highest-weighted cluster of candidate sites is found south of Bowling Green in newly developed suburban areas. Establishing a new professional fire station in either of these clusters would greatly improve the current fire service; therefore, it is deemed best to select one site north of Bowling Green and one site south of Bowling Green. The two best sites are highlighted with an orange boundary and are situated alongside Mt. Olivet Rd to the north and Hounds Run to the south. Other candidate sites were identified, though smaller populations in these sites mean they did not score as high as they Mt. Olivet and Hounds Run sites. </p> <br>

<figure>
<img class="myImages" src="https://i.imgur.com/mPZVjOY.jpeg" alt="Candidate Sites for New Fire Stations in Warren County" style="width:100%;max-width:625px">
<figcaption> Figure 8. Candidate Sites for New Fire Stations in Warren County</figcaption>
</figure> <br>

<h3> Using Location-Allocation Analysis to Find the Ideal Improved Fire Station </h3>

<p> To find the volunteer fire station that would best improve the current fire service after an upgrade, the underlying population demand for each fire station needs to be analyzed. This can best be accomplished using location-allocation analysis, which is an algorithm that identifies an optimal facility location given a set of demand points. Location-allocation analysis will be applied to the current fire stations in Warren County to determine which volunteer stations outside the current fire service experience the highest population demand. The parameters and setup for the location-allocation analysis layer are displayed in Table 6 below. </p>

<table> <caption> Table 6. Parameters for Location-Allocation Analysis </caption>
<thead>
<tr> 
<th> Facilities </th>
<th> Demand Points </th>
<th> Problem Type </th>
<th> Cutoffs </th>
<th> Cost Attributes </th>
<th> Number of Facilities </th>
</tr>
</thead>
<tbody>
<tr>
<td> Fire Stations </td>
<td> Census Block Centroids (weighted by 2020 Population) </td>
<td> Maximize Coverage </td>
<td> Eight Minutes </td>
<td> Time and Delay </td>
<td> 32 (All Existing Fire Stations) </td>
</tr>
</tbody>
</table> <br>

<p> A quick note on two parameters unique to location-allocation analysis is provided. Demand points represent the need for a service. The location-allocation analysis will aggregate the population demands so that they can be viewed in tabular form. Location-allocation analysis includes seven different "problem types" that can be solved—these include minimizing the number of facilities, maximizing market share, minimizing weighted impedance, among others. However, in this case, maximizing coverage is the desired effect. A shared response agreement exists between Warren County and the City of Bowling Green, whereby both entities assist each other with fire emergencies, so there is no limit on the amount of service a station can provide. </p> <br>

<p> Below is the current fire demand per fire station, overlaid on the current fire service (Figure 9). Fire stations connected to more census block centroids are associated with a higher demand from the nearby population. </p>

<figure>
<img class="myImages" src="https://i.imgur.com/UHlr6JD.jpeg" alt="Current Population Demands for Fire Service in Warren County, Kentucky" style="width:100%;max-width:625px">
<figcaption> Figure 9. Current Population Demands for Fire Service in Warren County </figcaption>
</figure> <br>

<p> Looking at Table 6, the three volunteer fire stations with the highest population demand are identified as Woodburn Fire Station 2, Alvaton Fire Station 4, and Browning Fire Station 2. However, upon reviewing Figure 9, it is clear that much of the allocated census block population for the Alvaton and Browning stations already receives good service from other fire stations. Even though these two stations have high population demands, improvements would only slightly enhance overall fire response. It would be more beneficial to consider volunteer fire stations in densely populated suburban areas that are further removed from the City of Bowling Green. </p> <br>

<p> Considering some of the locations further down Table 6, Richardsville Fire Station 3 is positioned after Browning Fire Station 2, but it is likely to face the same issue as the previous two stations. While the corridor between Morgantown Rd and Russellville Rd is growing, it is currently characterized by slow growth. Next on the list are Alvaton Fire Station 1 and Plano Fire Station 1. Both of these fire stations are located in densely populated suburban areas, making one of them a better choice for improvement. The fire stations further down Table 6 are primarily rural in nature or already classified as professional city fire stations, so Alvaton Fire Station 1 and Plano Fire Station 1 will be selected as the final candidates. Alongside Woodburn Fire Station 2, these two fire stations complete the candidate site choices. </p> <br>

<table class="table table-bordered table-hover table-condensed"> <caption> Table 7. Population Demand per Fire Station </caption> 
<thead><tr><th title="Field #1">Address</th>
<th title="Field #2">Name</th>
<th title="Field #3">Facility Type</th>
<th title="Field #4">Allocated Census Blocks</th>
<th title="Field #5">Allocated Census Block Population</th>
<th title="Field #6">Station Type</th>
</tr></thead>
<tbody><tr>
<td>835 MORGANTOWN RD</td>
<td>Westside Fire Station</td>
<td>Required</td>
<td align="right">218</td>
<td align="right">22477</td>
<td>Professional</td>
</tr>
<tr>
<td>201 CHERRY FARM LN</td>
<td>Greenwood Fire Station</td>
<td>Required</td>
<td align="right">136</td>
<td align="right">14581</td>
<td>Professional</td>
</tr>
<tr>
<td>150 BENNETT LN</td>
<td>Southside Fire Station</td>
<td>Required</td>
<td align="right">141</td>
<td align="right">14187</td>
<td>Professional</td>
</tr>
<tr>
<td>701 E 7TH AV</td>
<td>Central Fire Station</td>
<td>Required</td>
<td align="right">276</td>
<td align="right">14105</td>
<td>Professional</td>
</tr>
<tr>
<td>1102 WOODHURST ST</td>
<td>Airport Fire Station</td>
<td>Required</td>
<td align="right">63</td>
<td align="right">6473</td>
<td>Professional</td>
</tr>
<tr>
<td>7055 NASHVILLE RD</td>
<td>Woodburn Fire Station 2</td>
<td>Required</td>
<td align="right">67</td>
<td align="right">6137</td>
<td>Volunteer</td>
</tr>
<tr>
<td>3383 CUMBERLAND TRACE RD</td>
<td>Alvaton Fire Station 4</td>
<td>Required</td>
<td align="right">67</td>
<td align="right">5663</td>
<td>Volunteer</td>
</tr>
<tr>
<td>325 KITCHENS SOUTH RD</td>
<td>Browning Fire Station 2</td>
<td>Required</td>
<td align="right">39</td>
<td align="right">4674</td>
<td>Volunteer</td>
</tr>
<tr>
<td>288 OAK ST</td>
<td>Richardsville Fire Station 3</td>
<td>Required</td>
<td align="right">51</td>
<td align="right">4497</td>
<td>Volunteer</td>
</tr>
<tr>
<td>6403 OLD SCOTTSVILLE RD</td>
<td>Alvaton Fire Station 1</td>
<td>Required</td>
<td align="right">46</td>
<td align="right">3643</td>
<td>Volunteer</td>
</tr>
<tr>
<td>3210 PLANO RD</td>
<td>Plano Fire Station 1</td>
<td>Required</td>
<td align="right">29</td>
<td align="right">3636</td>
<td>Volunteer</td>
</tr>
<tr>
<td>756 GLASGOW RD</td>
<td>Transpark Fire Station</td>
<td>Required</td>
<td align="right">47</td>
<td align="right">3271</td>
<td>Professional</td>
</tr>
<tr>
<td>122 JFS CIR</td>
<td>Alvaton Fire Station 3</td>
<td>Required</td>
<td align="right">34</td>
<td align="right">2854</td>
<td>Volunteer</td>
</tr>
<tr>
<td>7124 WOODBURN ALLEN SPRINGS RD</td>
<td>Plano Fire Station 2</td>
<td>Required</td>
<td align="right">39</td>
<td align="right">2703</td>
<td>Volunteer</td>
</tr>
<tr>
<td>385 LOVERS LN</td>
<td>Lovers Ln Fire Station</td>
<td>Required</td>
<td align="right">49</td>
<td align="right">2680</td>
<td>Professional</td>
</tr>
<tr>
<td>529 BROOKWOOD DR</td>
<td>Barren River Fire Station 2</td>
<td>Required</td>
<td align="right">36</td>
<td align="right">2079</td>
<td>Volunteer</td>
</tr>
<tr>
<td>1107 MT OLIVET GIRKIN RD</td>
<td>Richardsville Fire Station 2</td>
<td>Required</td>
<td align="right">17</td>
<td align="right">2069</td>
<td>Volunteer</td>
</tr>
<tr>
<td>124 MAIN ST S</td>
<td>Smiths Grove Fire Station 1</td>
<td>Required</td>
<td align="right">84</td>
<td align="right">1835</td>
<td>Volunteer</td>
</tr>
<tr>
<td>250 PORTER PKE</td>
<td>Northside Fire Station</td>
<td>Required</td>
<td align="right">17</td>
<td align="right">1683</td>
<td>Professional</td>
</tr>
<tr>
<td>8352 CEMETERY RD</td>
<td>Alvaton Fire Station 2</td>
<td>Required</td>
<td align="right">23</td>
<td align="right">1638</td>
<td>Volunteer</td>
</tr>
<tr>
<td>1185 RICHARDSVILLE RD</td>
<td>Richardsville Fire Station 1</td>
<td>Required</td>
<td align="right">18</td>
<td align="right">1631</td>
<td>Volunteer</td>
</tr>
<tr>
<td>900 WOODBURN ALLEN SPRINGS RD</td>
<td>Woodburn Fire Station 1</td>
<td>Required</td>
<td align="right">45</td>
<td align="right">1248</td>
<td>Volunteer</td>
</tr>
<tr>
<td>198 SLIM ISLAND RD</td>
<td>Richardsville Fire Station 5</td>
<td>Required</td>
<td align="right">29</td>
<td align="right">1206</td>
<td>Volunteer</td>
</tr>
<tr>
<td>5636 PORTER PKE</td>
<td>Gott Fire Station</td>
<td>Required</td>
<td align="right">19</td>
<td align="right">1110</td>
<td>Volunteer</td>
</tr>
<tr>
<td>6906 GOTTS HYDRO RD</td>
<td>Smiths Grove Fire Station 2</td>
<td>Required</td>
<td align="right">31</td>
<td align="right">1054</td>
<td>Volunteer</td>
</tr>
<tr>
<td>9408 KY HWY 185</td>
<td>Richardsville Fire Station 4</td>
<td>Required</td>
<td align="right">23</td>
<td align="right">966</td>
<td>Volunteer</td>
</tr>
<tr>
<td>255 HADLEY SCHOOL RD</td>
<td>Hadley Fire Station </td>
<td>Required</td>
<td align="right">50</td>
<td align="right">832</td>
<td>Volunteer</td>
</tr>
<tr>
<td>3866 BROWNING RD</td>
<td>Browning Fire Station 1</td>
<td>Required</td>
<td align="right">20</td>
<td align="right">696</td>
<td>Volunteer</td>
</tr>
<tr>
<td>3773 RIVERSIDE BENLEO RD</td>
<td>Richardsville Fire Station 6</td>
<td>Required</td>
<td align="right">19</td>
<td align="right">681</td>
<td>Volunteer</td>
</tr>
<tr>
<td>11047 GLASGOW RD</td>
<td>Smiths Grove Fire Station 3</td>
<td>Required</td>
<td align="right">17</td>
<td align="right">673</td>
<td>Volunteer</td>
</tr>
<tr>
<td>121 JENKINS RD</td>
<td>Barren River Fire Station 1</td>
<td>Required</td>
<td align="right">20</td>
<td align="right">672</td>
<td>Volunteer</td>
</tr>
<tr>
<td>1424 SUNNYSIDE GOTTS RD</td>
<td>Gott Fire Station 2</td>
<td>Required</td>
<td align="right">11</td>
<td align="right">348</td>
<td>Volunteer</td>
</tr>
</tbody>
</table> <br>




<h3> The Top Five Candidate Fire Stations </h3> <br>

<p> With the candidate fire stations selected, a service area analysis can be conducted for each station. Figure 10 below illustrates how each of the new candidate stations augments the fire response time, as well as Warren County's population density. Each candidate station covers a densely populated area, making it difficult to determine which one is best based on visual analysis alone. An areal proportion analysis is needed to construct a table of population values for comparing the response quality for each map in Figure 10. </p> <br>

<figure>
<img class="myImages" src="https://i.imgur.com/LoAuPiu.jpeg" alt="Fire Service Response Times for each Candidate Station" style="width:100%;max-width:625px">
<figcaption> Figure 10. Fire Service Response Times for each Candidate Station </figcaption>
</figure> <br>

<p> To provide a more detailed look at each of the maps from Figure 10, a Leaflet web map was created to display the results of the service area analysis for the current fire service and the potential candidate stations (Figure 11). </p> <br>

<div id="map"></div>

<script src="./files/FireSiteSelection/FireService.js"> </script>
<figure>
<figcaption> Figure 11. Fire Service Response Times Leaflet Web Map  </figcaption>
</figure> <br>

<p> The population covered for each map in Figure 10 is presented in Table 8 below. The candidate fire stations are ranked based on which station serves as the best improvement to the current fire response under eight minutes. Each of the candidate stations provides a solid boost to the current fire performance, but Alvaton Fire Station 1 is ranked in first place. Alvaton represents a densely populated area that does not currently receive good fire service, particularly since it is located further from Bowling Green than the other candidate sites. An improved fire station in Alvaton would bring the highest number of people into good coverage. </p> <br>

<table class="tablecenter"><caption> Table 8. Population covered by Fire Response under each potential Candidate Station </caption>  
<thead>
<tr>
<th> </th>
<th> Current Service </th>
<th> Alvaton Fire Station 1 </th>
<th> Hounds Run New Fire Station </th>
<th> Mt Olivet New Fire Station </th>
<th> Plano Fire Station 1 </th>
<th> Woodburn Fire Station 2 </th>
</tr>
</thead>
<tbody>
<tr>
<td> 0-5 Minutes </td>
<td> 70,576 </td>
<td> 73,270 </td>
<td> 74,157 </td>
<td> 73,594 </td>
<td> 74,688 </td>
<td> 74,858 </td>
</tr>
<tr>
<td> 5-8 Minutes </td>
<td> 33,944 </td>
<td> 35,200 </td>
<td> 33,822 </td>
<td> 33,856 </td>
<td> 33,099 </td>
<td> 32,987 </td>
</tr>
<tr> 
<td> 8-10 Minutes </td>
<td> 13,653 </td>
<td> 13,747 </td>
<td> 11,519 </td>
<td> 13,685 </td>
<td> 12,950 </td>
<td> 13,616 </td>
</tr>
<tr>
<td> 10-12 Minutes </td>
<td> 6,321 </td>
<td> 6,177 </td>
<td> 6,766 </td>
<td> 6,357 </td>
<td> 6,450 </td>
<td> 6,235 </td>
</tr>
<tr>
<td> 12-15 Minutes </td>
<td> 6,319 </td>
<td> 3,934 </td>
<td> 5,853 </td>
<td> 5,662 </td>
<td> 5,005 </td>
<td> 5,501 </td>
</tr>
<tr>
<td> 15-20 Minutes </td>
<td> 1,532 </td>
<td> 676 </td>
<td> 872 </td>
<td> 848 </td>
<td> 805 </td>
<td> 812 </td>
</tr>
<tr>
<td> 0-20 Minutes </td>
<td> 132,345 </td>
<td> 133,004 </td>
<td> 132,989 </td>
<td> 133,002 </td>
<td> 132,997 </td>
<td> 133,009 </td>
</tr>
<tr>
<td> 0-8 Minutes </td>
<td> 104,520 </td>
<td> 108,470 </td>
<td> 107,979 </td>
<td> 107,450 </td>
<td> 107,787 </td>
<td> 107,845 </td>
</tr>
<tr>
<td> % 0-8 Minutes </td>
<td> 77.7% </td>
<td> 80.64% </td>
<td> 80.28% </td>
<td> 79.88% </td>
<td> 80.13% </td>
<td> 80.18% </td>
</tr>
<tr> 
<td> Rank </td>
<td> 6 </td>
<td> 1 </td>
<td> 2 </td>
<td> 5 </td>
<td> 4 </td>
<td> 3 </td>
</tr>
</tbody>
</table> <br>

<p> To provide a clearer view of the fire service from the improved Alvaton Fire Station 1, it was singled out from Figure 10 and presented below (Figure 12). The differences are striking, as the entire Alvaton area is now shown to have good fire service. Unlike the other candidate stations, it is only minimally connected to Bowling Green's current fire service via Highway 231.  </p> <br>

<figure>
<img class="myImages" src="https://i.imgur.com/z9eSK3q.jpeg" alt="Alvaton Fire Station 1 Improvement Response Service" style="width:100%;max-width:625px">
<figcaption> Figure 12. Alvaton Fire Station 1 Improvement Response Service </figcaption>
</figure> <br>

<h3> Discussion and Some Final Thoughts </h3> <br>

<p>  The project is now concluded, having selected an optimal site for an improved fire station. It is important to note that the results of this study were sensitive to parameters. If "good" fire service were considered to be ten minutes instead of eight, a different candidate fire station may have been deemed ideal. Additionally, limitations on whether a fire station could be improved or expansions in the number of fire stations for improvement would also yield different results.  </p> <br>

<p> The original idea for this project stemmed from an urban GIS applications course taken at Western Kentucky University. The project was simpler, as it did not involve the use of soft constraints or opportunities (i.e., weighing spatial layers numerically) or location-allocation analysis to potentially improve a fire station. Fewer types of spatial data were involved in finding a suitable site. At some point, this project may be redone using more advanced geospatial techniques and more detailed datasets.  </p> <br>



<h3> List of Figures and Tables </h3> <br>
<p> Figure 1. A Visualization of the Spatial Data used in the Site Selection Process  </p>
<p> Figure 2. Project Workflow </p>
<p> Figure 3. Dot Density Population of Warren County in 2020 </p>
<p> Figure 4. Population Changes in Warren County between 2000 and 2020  </p>
<p> Figure 5. Land Use in Warren County </p>
<p> Figure 6. Future Land Use Map (2030) of Warren County </p>
<p> Figure 7. Current Fire Service in Warren County </p>
<p> Figure 8. Candidate Sites for New Fire Stations in Warren County </p>
<p> Figure 9. Current Population Demands for Fire Service in Warren County </p>
<p> Figure 10. Fire Service Response Times for each Candidate Station  </p>
<p> Figure 11. Fire Service Response Times Leaflet Web Map </p>
<p> Figure 12. Alvaton Fire Station 1 Improvement Response Service </p>
<p> Table 1. Spatial Data used in the Site Selection Analysis  </p>
<p> Table 2. Fire Response Time Quality  </p>
<p> Table 3. Speed Limits by Road Type </p>
<p> Table 4. Network Dataset Parameters  </p>
<p> Table 5. Parameters for the Service Area Analysis  </p>
<p> Table 6. Parameters for Location-Allocation Analysis </p>
<p> Table 7. Population Demand per Fire Station </p>
<p> Table 8. Population covered by Fire Response under each potential Candidate Station  </p> <br>

<h3> References </h3> <br>

<div class="wysiwyg lengthy" ><p class="reference">U.S. Census Bureau. (n.d.). <em>Explore Census data</em>. <a href="https://data.census.gov/" target="_blank" rel="nofollow noopener noreferrer">https://data.census.gov/</a></p>

<p class="reference">U.S. Census Bureau. (2024, January 9). <em>TIGER/Line shapefiles</em>. Census.gov. <a href="https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html" target="_blank" rel="nofollow noopener noreferrer">https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html</a></p>

<p class="reference"> <em> Ky Water Resources Polygons sinkholes</em>. (n.d.). <a href="https://opengisdata.ky.gov/datasets/kygeonet::ky-water-resources-polygons-sinkholes/about" target="_blank" rel="nofollow noopener noreferrer">https://opengisdata.ky.gov/datasets/kygeonet::ky-water-resources-polygons-sinkholes/about</a></p>
 
<p class="reference">Moore-Merrell, L. (2023, July 26). <em>Understanding and measuring fire department response times</em>. Lexipol. <a href="https://www.lexipol.com/resources/blog/understanding-and-measuring-fire-department-response-times/?fwp" target="_blank" rel="nofollow noopener noreferrer">https://www.lexipol.com/resources/blog/understanding-and-measuring-fire-department-response-times/?fwp</a></p>

<p class="reference"> <em> KyFromAbove - Kentucky’s Aerial Photography & Elevation Data Program</em>. (n.d.). <a href="https://kyfromabove.ky.gov/" target="_blank" rel="nofollow noopener noreferrer">https://kyfromabove.ky.gov/</a></p>

<p class="reference"> <em> DataMart</em>. (n.d.). <a href="https://datamart.kytc.ky.gov/" target="_blank" rel="nofollow noopener noreferrer">https://datamart.kytc.ky.gov/</a></p>

<p class="reference"> <em> City of Bowling Green Open data Hub</em>. (n.d.). <a href="https://data-bgky.hub.arcgis.com/" target="_blank" rel="nofollow noopener noreferrer">https://data-bgky.hub.arcgis.com/</a></p>

<p class="reference"> <em> Fire house location planning</em>. (n.d.). American Planning Association. <a href="https://www.planning.org/pas/reports/report98.htm" target="_blank" rel="nofollow noopener noreferrer">https://www.planning.org/pas/reports/report98.htm</a></p>






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


