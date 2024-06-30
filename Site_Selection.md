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

<h3> Finding an Ideal Site for a New Fire Station in Warren County, Kentucky </h3> <br>

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


<p> The detailed workflow for this project is presented in Figure 2 below. As mentioned earlier, it is a complex albeit iterative analysis. The site selection process is focused on narrowing down information to whatever criteria the user deems important. The latter half of the workflow is more dependent on correctly establishing field values, parameters, and settings for the service area and location allocation analyses within the network dataset.  </p> <br>

<p> Click on the hyper link by Figure 2 to download the flow chart. </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/vKeMTww.jpeg" alt="Project Workflow" style="width:100%;max-width:625px">
<figcaption> Figure 2. <a href="https://i.imgur.com/vKeMTww.jpeg"> Project Workflow </a> </figcaption>
</figure> <br>

<h3> A Brief Summary on the Site Selection Criteria </h3>

<p> Some of the site selection criteria are tailored towards avoiding physical impediments. Bodies of water or floodplains were discluded as potential candidate sites. Various parts of Warren County are topographically prominent, so land parcels with a change in slope over 15 feet were avoided as candidate sites. More unique to Warren County is its karst landscape, which can result in the formation of sinkholes -- land parcels with known karst geology were removed from the candidate site list. </p> <br>

<p> To respond quickly to emergencies, the fire stations must be located close to major roads. To accommodate this in the site selection process, land parcels within a 1/3rd mile of major roads were weighed positively. </p> <br>

<p> Since the presence of a professional fire station can lower home insurance rates, a quantile classification of property home values from the American Community Survey (Census Tract level) was used to ensure that these discounts were equitably distributed. Lower valued homes were weighed higher than higher valued homes.  </p> <br> 

<p> Land parcels need to have enough space to accommodate a fire station. The amount of acreage that is required depends on how large the station is, with some sources recommending at least five acres (American planning association). For this study, however, the smallest existing professional fire stations land parcel size will be used -- in this case, it is a one-acre land parcel. </p> <br>

<h3> Demographic and Zoning Data Important for Site Selection </h3> <br>

<p> Before looking at the fire response service in Warren County, it is worthwhile to observe the distribution of and changes in the overall population. Figure 3 below depicts a dot density map of Warren County, whose population at the time was 134,510 people. Bowling Green, containing more than half of Warren County’s population at 72,642 people, is essentially saddled between I-65 and I-165 in the center of the county. Suburban sprawl northeast and south of Bowling Green shows a moderate population density, and the rest of Warren County, more rural in character, has a low population density.  </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/MgyutPx.jpeg" alt="2020 Warren County Population Density" style="width:100%;max-width:625px">
<figcaption> Figure 3. Dot Density Population of Warren County in 2020 </figcaption>
</figure> <br>

<p> Beyond population density in 2020, population changes since 2000 illustrate how the population distribution has changed. Figure 4 below shows a choropleth map of percent population change between 2000 and 2020, as well as the population dot density in 2000 overlayed with the absolute population change dot density between 2000 and 2020. In this time, Warren County grew by 42,032 people, with population growth primarily occurring in newly developed suburbs. Subdivisions such as Whispering Hills in western Bowling Green, Northridge to the northeast of Bowling Green, and Springfield south of Bowling Green came into existence during this period. Some of the highest population growth occurred in the corridor between Russellville Road and I-65. Considering how much population growth occurred in newly developed suburban areas, these areas were weighed highly in the site selection analysis, as it is likely that growth will continue there.  </p> <br>

<p> -Briefly Describe Areal Proportion Analysis- </p> <br>

<figure> 
<img class="myImages" id="myImg" src="https://i.imgur.com/RVkydLo.jpeg" alt="Population Change in Warren County 2000-2020" style="width:100%;max-width:625px">
<figcaption> Figure 4. Population Changes in Warren County between 2000 and 2020 </figcaption>
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

<p> Bowling Green and Warren County provide two different kinds of fire services. The City of Bowling Green has a fully staffed professional fire service, whereas Warren County’s fire service is more reliant on volunteers. To represent this in a GIS, city fire stations will be classified as “professional” and county fire stations will be classified as “volunteer”. Since city fire stations are fully staffed, it is expected that they can respond to emergencies quickly, thus, they are assigned a one-minute startup delay. Volunteer fire stations, however, might require responders to first come in to prepare to respond to an emergency, so these fire stations are assigned a seven-minute startup delay. </p> <br>

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

<p> To measure the response quality of the current and candidate fire stations, a service area analysis model will be created. Service area analysis is a type of network analysis for determining the region that encompasses all accessible streets (streets that lied within a specific impedance). For example, the 20-minute service area for a network location (such as a fire station) includes all the streets that can be reached within 20 minutes from that location.  </p> <br>

<p> With the network dataset parameters prepared, the settings for the service area analysis can be established. Table 5 below depicts the parameters used in the fire response service area analysis. </p> <br>

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

<p> After establishing the service area analysis parameters in Table 5, a service area analysis model of the current fire service in Warren County was created (Figure 7). The city of Bowling Green clearly has excellent fire service, as few parts of the city have a response time over eight minutes.  Many of the county suburbs adjacent to Bowling Green also have good service. The areas with poor fire service tend to be in rural parts of Warren County, which have low population densities as established by Figure 3. </p> <br>


<figure>
<img class="myImages" src="https://i.imgur.com/hdprVyx.jpg" alt="Current Fire Service in Warren County" style="width:100%;max-width:625px">
<figcaption> Figure 7. Current Fire Service in Warren County</figcaption>
</figure> <br>

<p> After finishing the workflow for the site selection analysis, the final candidate sites are presented in Figure 8 below. The candidate land parcels are weighed on an unclassified color scheme, with darker blue sites being more desirable. Most of the candidate parcels are in clusters along well-connected roadways. The highest scoring candidate sites were in suburban areas north of Bowling Green along Highway 526 and Highway 957. The second highest weighted cluster of candidate sites were south of Bowling Green in new suburban areas. While there were many other candidate sites, they did not weigh as highly as the two aforementioned clusters, mainly due to a lower population. Creating a new professional fire station in either of these clusters would greatly improve the current fire service, so it is best to select one site north of Bowling Green and one site south of Bowling Green -- the two best sites are highlighted with an orange boundary. </p> <br>

<figure>
<img class="myImages" src="https://i.imgur.com/mPZVjOY.jpeg" alt="Candidate Sites for New Fire Stations in Warren County" style="width:100%;max-width:625px">
<figcaption> Figure 8. Candidate Sites for New Fire Stations in Warren County</figcaption>
</figure> <br>

<h3> Using Location-Allocation Analysis to Find the Ideal Improved Fire Station </h3>

<p> To find the volunteer fire station that best benefits from an upgrade to professional status, the underlying population demand needs to be analyzed. This can best be accomplished using location-allocation analysis, which is an algorithm that finds an optimal facility location given a set of demand points. Location-allocation analysis will be applied to the current fire stations in Warren County to see which volunteer stations outside the current fire service experience the most population demand.  Table 6 below displays the parameters and setup for the location-allocation analysis layer. </p>

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

<p> Quickly explaining some of the setup parameters. Like the service area analysis, the facilities will be fire stations. Unique to location allocation analysis are demand points. In this case, the demand points will be census block centroids weighted by population -- the location allocation analysis will aggregate the population demands together and then the population demand for each fire station can viewed. Location-allocation analysis has seven different "problem types" that can be solved -- these include minimizing the number of facilities, maximizing market share, minimizing weighted impedance, etc. but in this case, maximizing coverage is the desired effect. Warren County and the City of Bowling Green have a shared response agreement where both entities will assist each other with fire emergencies, so there is not a limit in the amount of service a station can provide. The cutoff will be at eight minutes, which is the qualifying factor for good service in this analysis. Cost attributes to accumulate will be time and delay, just as in the service area analysis. Finally, the number of facilities to locate will be 32, which is the number of existing fire stations.  </p> <br>

<p> Below is the current fire demand per fire station overlaid on the current fire service (Figure 9). The fire stations connected to more census block centroids have a higher demand from the nearby population.  </p>

<figure>
<img class="myImages" src="https://i.imgur.com/UHlr6JD.jpeg" alt="Current Population Demands for Fire Service in Warren County, Kentucky" style="width:100%;max-width:625px">
<figcaption> Figure 9. Current Population Demands for Fire Service in Warren County </figcaption>
</figure> <br>

<p> Looking at Table 6, the three best candidates for improved fire stations are Woodburn Fire Station 2, Alvaton Fire Station 4, and Browning Fire Station 2. However, considering the current fire service response under the location-allocation layer, it is easy to see that much of the population demand in the Alvaton and Browning stations already receive good service from other fire stations. Even though these two stations have the highest population demand, improving them would only slightly increase good fire response overall. Instead, it is likely that the best fire stations to improve will be in the quickly growing suburban areas presented in Figures 4 and 6. </p> <br>

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

<p> With the candidate fire stations selected, a service area analysis can be conducted for each station. Figure 10 below shows how each of the new candidate stations augment the fire response time, as well as Warren County's population density. Each candidate station covers a densely populated area, so it is difficult to tell which one is best from visual analysis alone. Areal proportion analysis is needed to construct a table of population values to compare the response quality for each map in Figure 9. </p> <br>

<figure>
<img class="myImages" src="https://i.imgur.com/LoAuPiu.jpeg" alt="Fire Service Response Times for each Candidate Station" style="width:100%;max-width:625px">
<figcaption> Figure 10. Fire Service Response Times for each Candidate Station </figcaption>
</figure> <br>

<p> The population covered for each map in Figure 10 is presented in Table 5 below. The candidate fire stations are also ranked based on which provides the total number of people served in under eight minutes. In this case, Alvaton Fire Station Number 1 provides the best service.  </p> <br>

<table class="tablecenter"><caption> Table 8. Population covered by Fire Response under each potential Candidate Station </caption>  
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

<h3> Discussion and Some Final Thoughts </h3> <br>

<p> Having selected an optimal site for a fire station improvement, this concludes the project. It is important to note that this study was fairly sensitive to parameter adjustments. If "good" fire service were considered ten minutes instead of eight, then a different candidate fire station may have been the ideal one.   </p> <br>

<p> It would be interesting to see what a mathematically optimized candidate station could produce. While this study produced a very good candidate station as a result, one has to wonder how running a service area analysis from each of the candidate sites would improve the current fire service.  </p>

<p> In the future, I may add further mapping enhancements to this project. </p> <br>

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
<p> Table 1. Spatial Data used in the Site Selection Analysis  </p>
<p> Table 2. Fire Response Time Quality  </p>
<p> Table 3. Speed Limits by Road Type </p>
<p> Table 4. Network Dataset Parameters  </p>
<p> Table 5. Parameters for the Service Area Analysis  </p>
<p> Table 6. Parameters for Location-Allocation Analysis </p>
<p> Table 7. Population Demand per Fire Station </p>
<p> Table 8. Population covered by Fire Response under each potential Candidate Station  </p> <br>

<h3> References </h3> <br>

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
