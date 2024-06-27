<html lang="en-US">

<head>
    <meta charset='utf-8'>
    <meta http-equiv= "X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,maximum-scale=2">
    <style>

  h1{
  text-align: center;
  }
  
  h3{
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
    </style>






</head>

<body>

<h1> Finding an Ideal Site for a New Fire Station in Warren County, Kentucky </h1> <br>

<p> One of the most common and useful applications of GIS analysis is site selection analysis, a process through which an ideal site is chosen from many candidate sites. This analysis process often involves considering geographic factors, whether social, economic, environmental, or physical, to determine how suitable an area is for a specific land use and human activity. Consequently, it tends to be complex and iterative, as numerous techniques such as overlays, queries, buffers, intersections, raster operations, and others are common in this analysis.  </p> <br>

<p> In this project, the objective is to find an ideal site for a new professional fire station or upgrade an existing volunteer fire station in Warren County, Kentucky. Since land use data is essential to this study, land parcels will serve as the base layer. Various other spatial data relevant to locating an ideal site will be collected, processed, and weighed as either a constraint or an opportunity. Then, these data will be intersected with the land parcel data to produce a set of ideal sites. Population density, long term population trends, and potential future land use changes will be used to identify existing fire stations suitable for an upgrade to a professional fire station. As fire stations are the object of this analysis, it is also important to locate a fire station that will best improve the fire response service to the underlying population. This will be achieved using service area analysis, areal proportion analysis, and location allocation analysis methods.  </p> <br>

<p> <em> To best read content on this article, you may need zoom in on your browser using CTRL and the + key or CTRL and UP on the mouse scroll wheel. You can also click on images to see a zoomed in pop up. </em></p> <br>

<h3> Spatial Data for the Site Selection Analysis and General Workflow </h3> <br>

<p> Data for this project stems from many sources. These include economic (median property value), demographic (census data), governmental (land use, future land use, transportation, zoning), and physical (elevation, karst, water) data. Detailed information about these data, such as the type of data and their purpose, is contained in Table 1 below. A visualization of each data layer is also depicted in Figure 1. </p> <br>

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
<td> Base Layer for Analysis / Query certain types of land use / Impose >= 1 acre land parcel size requirement </td>
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
<figcaption> Figure 1. Various spatial data in Warren County used to narrow down an ideal site. </figcaption>
</figure> <br>


<p> The detailed workflow for this project is presented in Figure 2 below. As mentioned earlier, it is a complex albeit iterative analysis. The site selection process is focused on narrowing down information to whatever criteria the user deems important. The latter half of the workflow is more dependent on correctly establishing field values, parameters, and settings for the service area and location allocation analyses within the network dataset.  </p> <br>

<p> Click on the hyper link by Figure 2 to download the flow chart. </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/vKeMTww.jpeg" alt="Project Workflow" style="width:100%;max-width:625px">
<figcaption> Figure 2. <a href="https://i.imgur.com/vKeMTww.jpeg"> Project workflow </a> </figcaption>
</figure> <br>

<h3> A Brief Summary on the Site Selection Criteria </h3>

<p> Some of the site selection criteria are tailored towards avoiding physical impediments. Bodies of water or floodplains were discluded as potential candidate sites. Various parts of Warren County are topographically prominent, so land parcels with a change in slope over 15 feet were avoided as candidate sites. More unique to Warren County is its karst landscape, which can result in the formation of sinkholes -- land parcels with known karst geology were removed from the candidate site list. </p> <br>

<p> To respond quickly to emergencies, the fire stations must be located close to major roads. To accomadate this in the site selection process, land parcels within a 1/3rd mile of major roads were weighed positively. </p> <br>

<p> Since the presence of a professional fire station can lower home insurance rates, a quantile classification of property home values from the American Community Survey (Census Tract level) was used to ensure that these discounts were equitably distributed. Lower valued homes were weighed higher than higher valued homes.  </p> <br> 

<p> Land parcels need to have enough space to accomadate a fire station. The amount of acreage that is required depends on how large the station is, with some sources recommending at least five acres (American planning association). For this study, however, the smallest existing professional fire stations land parcel size will be used -- in this case, it is a one acre land parcel. </p> <br>

<h3> Demographic and Zoning Data Important for Site Selection </h3> <br>

<p> Before looking at the fire response service in Warren County, it is worthwhile to observe the distribution of and changes in the overall population. Figure 3 below depicts a dot density map of Warren County, whose population at the time was 134,510 people. Bowling Green, containing more than half of Warren County’s population at 72,642 people, is essentially saddled between I-65 and I-165 in the center of the county. Suburban sprawl northeast and south of Bowling Green shows a moderate population density, and the rest of Warren County, more rural in character, has a low population density.  </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/MgyutPx.jpeg" alt="2020 Warren County Population Density" style="width:100%;max-width:625px">
<figcaption> Figure 3. Dot density population of Warren County in 2020 on the census block group level. </figcaption>
</figure> <br>

<p> Beyond population density in 2020, population changes since 2000 illustrate how the population distribution has changed. Figure 4 below shows a choropleth map of percent population change between 2000 and 2020, as well as the population dot density in 2000 overlayed with the absolute population change dot density between 2000 and 2020. In this time, Warren County grew by 42,032 people, with population growth primarily occurring in newly developed suburbs. Subdivisions such as Whispering Hills in western Bowling Green, Northridge to the northeast of Bowling Green, and Springfield south of Bowling Green came into existence during this period. Some of the highest population growth occurred in the corridor between Russellville Road and I-65. Considering how much population growth occurred in newly developed suburban areas, these areas were weighed highly in the site selection analysis, as it is likely that growth will continue there. .  </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/RVkydLo.jpeg" alt="Population Change in Warren County 2000-2020" style="width:100%;max-width:625px">
<figcaption> Figure 4. Population change in Warren County between 2000 and 2020. </figcaption>
</figure> <br>

<p> Like population density and trends, existing land use represents an important element of this study.  As mentioned above in Figure 1, land use types in the site selection process were limited to agricultural, commercial, public, or vacant. These land use types were selected on the basis that they would be the easiest to rezone. The Bowling Green Warren County City County Planning Commission’s (CCPC) map of land use in Warren County shows how land use is distributed among land parcels (Figure 5).  Note that the yellow and red areas depict residential parcels. These parcels contain most of the population seen in Figures 3 and 4, so ensuring that they are close to a new or improved fire station is important.  </p> <br>

<figure>
<img class="myImages" src="https://i.imgur.com/09vHtse.jpeg" alt="Land Use in Warren County" style="width:100%;max-width:625px">
<figcaption> Figure 5. Land Use in Warren County </figcaption>
</figure>

<p> The CCPC also has a future land use map, which shows how Warren County’s land use may change over the next 20 years (Figure 6). This map was released in 2012 with predictions for 2030. The low and rural density land use areas on this map are of particular importance, as they suggest that much of the agricultural land close to Bowling Green will take on a more populated, residential nature. Naturally, it will be important for these areas to have a good fire response service, and for this reason, low density and rural density were weighed positively in the site selection process.  </p> <br>

<figure>
<img class="myImages" src="https://i.imgur.com/MdrSqxv.jpeg" alt="Future Land Use Map (2030) of Warren County" style="width:100%;max-width:625px">
<figcaption> Figure 6. Future Land Use Map (2030) of Warren County </figcaption>
</figure> <br>


<h3> Considering Fire Response Times and Establishing the Network Dataset and its Parameters </h3> <br>

<p> Quantifying a fire station’s response quality in a spatial model is complex. Depending on the type of emergency occurring, first responders have various goal times that they wish to meet within a certain percentage of cases. Additionally, properly handling different types of emergencies requires different types of vehicles and response procedures. Attempting to deal with every possible nuance in a GIS environment becomes difficult and extends beyond the scope of this project. To resolve this issue, some generalizations will be made regarding how fire stations respond to emergencies.  </p> <br>

<p> Bowling Green and Warren County provide two different kinds of fire services. The City of Bowling Green has a fully staffed professional fire service, whereas Warren County’s fire service is more reliant on volunteers. To represent this in a GIS, city fire stations will be classified as “professional” and county fire stations will be classified as “volunteer”. Since city fire stations are fully staffed, it is expected that they are able to respond to emergencies quickly, thus, they are assigned a one-minute startup delay. Volunteer fire stations, however, might require responders to first come in to prepare to respond to an emergency, so these fire stations are assigned a seven-minute startup delay. </p> <br>

<p> The overall fire response will be measured in the amount of time it takes to get from a fire station to a location in Warren County – a detailed breakdown of these ratings is presented in Table 2. These ratings are based on a summary of observations from Lexipol (Moore-Merrell, 2023). Note that fire service still exists beyond the 20-minute threshold, it is simply very slow. Maximizing good fire service coverage to the highest number of people is the goal of the service area analysis, so the fire station that has the highest number of people in the first two response categories (eight minutes or less) will be chosen as the ideal station.   </p> <br>

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

<p> Concerning travel speeds, speed limits by road type can be found in Table 3. However, the major roads in Warren County have been linear referenced, and thus have more detailed variations in their travel speed. Since fire response vehicles carry vast amounts of water, they are very heavy and cannot necessarily travel at or above the speed limit safely. For this reason, travel speed will be reduced by five miles per hour. Interstate and parkway use will also be restricted due to the high speeds.  </p> <br>

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

<p> Having considered how fire response behavior should function, parameters for the network dataset can be setup (Table 4). Except for costs, these have been previously described. The costs represent the accumulation of travel time from the fire station to a location in Warren County. Time is created in the road network by dividing distance over travel speed, and then multiplied by 60 to convert from seconds to minutes. The delay is a generalized assumption that fire response vehicles will have to slow down at junctions to either turn or pass through carefully. Since this cost is in minutes, it was input as a 0.1667 (ten second) cost at junctions.     </p> <br>

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
<td> Delay in Minutes ( 10 seconds per junction ) </td>
<td> </td>
</tr>
</tbody>
</table> <br>

<h3> Selecting the Candidate Fire Stations </h3> <br>

<p> After setting up the network analyst dataset, a service area analysis model of the current fire service in Warren County was created (Figure 7). Observing the map, the city of Bowling Green clearly has very good fire service, as few parts of the city have a response time over eight minutes. Many of the county suburbs adjacent to Bowling Green also have good service. The areas with poor fire service tend to be in rural parts of Warren County, which have low population densities as established by Figure 3. </p> <br>


<figure>
<img class="myImages" src="https://i.imgur.com/hdprVyx.jpg" alt="Current Fire Service in Warren County" style="width:100%;max-width:625px">
<figcaption> Figure 7. Current Fire Service in Warren County</figcaption>
</figure> <br>

<p> After finishing the workflow for the site selection analysis, the final candidate sites are presented in Figure 8 below. The candidate land parcels are weighed on an unclassified color scheme, with darker blue sites being more desirable. Most of the canidiate parcels are in clusters along well-connected roadways. The highest scoring candidate sites were in suburban areas north of Bowling Green along Highway 526 and Highway 957. The second highest weighted cluster of candidate sites were south of Bowling Green in new suburban areas. While there were many other candidate sites, they did not weigh as highly as the two aforementioned clusters, mainly due to a lower population. Creating a new professional fire station in either of these clusters would greatly improve the current fire service, so it is best to select one site north of Bowling Green and one site south of Bowling Green. </p> <br>

<p> Additionally, the top two candidate stations from the site selection process are highlighted with an orange border. These were selected in a somewhat heuristic fashion -- the new stations were selected in a manner that would seemingly best improve the current fire service. <em> Since the other three stations will be improvements, this finalizes the top five candidate stations. </em> </p> <br>

<p> In order to find which stations would benefit the most from an upgrade to professional status, the underlying demand by the population also needs to be analyzed. Location-allocation analysis will be applied to the current fire stations in Warren County to see which volunteer stations currently experience the most demand. Table 6 below displays the parameters and setup for the location-allocation analysis layer. </p>

<table> <caption> Table 6. Location Allocation Analyis Setup </caption>
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

<figure>
<img class="myImages" src=" " alt="Current Population Demands for Fire Service in Warren County, Kentucky" style="width:100%;max-width:625px">
<figcaption> Figure 10. Current Population Demands for Fire Service in Warren County, Kentucky </figcaption>
</figure> <br>

<p> Considering the areas with the highest population growth in Figure 4, some of the best volunteer candidates for improvement would be Alvaton Fire Station Number 1, Plano Fire Station Number 1, and Woodburn Fire Station Number 2. Each of these fire stations lie south of Bowling Green and would benefit from an upgrade. </p> <br>

<figure>
<img class="myImages" src="https://i.imgur.com/mPZVjOY.jpeg" alt="Candidate Sites for New Fire Stations in Warren County" style="width:100%;max-width:625px">
<figcaption> Figure 8. Candidate Sites for New Fire Stations in Warren County</figcaption>
</figure> <br>

<h3> The Results of the Service Area Analysis </h3> <br>

<p> With the candidate fire stations selected, a service area analysis can be conducted for each station. Figure 9 below shows how each of the new candidate stations augment the fire response time, as well as Warren County's population density. Each candidate station covers a densely populated area, so it is difficult to tell which one is best from visual analysis alone. Areal proportion analysis is needed to construct a table of population values to compare the response quality for each map in Figure 9. </p> <br>

<figure>
<img class="myImages" src="https://i.imgur.com/LoAuPiu.jpeg" alt="Fire Service Response Times for each Candidate Station" style="width:100%;max-width:625px">
<figcaption> Figure 9. Fire Service Response Times for each Candidate Station </figcaption>
</figure> <br>

<p> The population covered for each map in Figure 9 is presented in Table 5 below. The candidate fire stations are also ranked based on which provides the best service to the highest number of people under eight minutes. In this case, Alvaton Fire Station Number 1 provides the best service. Each of the candidate stations are, however, quite close in terms of performance, and the service area analysis does not take into account the demand of the underlying population. A location allocation analysis is necessary to observe underlying population demand. </p> <br>

<table class="tablecenter"><caption> Table 5. Population covered by Fire Response under each potential Candidate Station </caption>  
<thead>
<tr>
<th> </th>
<th> Current Service </th>
<th> Alvaton </th>
<th> Hounds Run </th>
<th> Mt Olivet </th>
<th> Plano </th>
<th> Woodburn </th>
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
<td> 5 - 8 Minutes </td>
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

<h3> The Results of the Location Allocation Analysis </h3>

<p> Location Allocation analysis seeks to  </p> <br>


<p> Placeholder </p>

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
