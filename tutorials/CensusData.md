<html>
  
<head>
    <meta charset="utf-8" />
    <meta http-equiv= "X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
    <style>
        html,
        body { 
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        }

  figure figcaption {
  text-align: center; 
         }
         
  #viewDiv {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  min-height: 450px;
  mid-width: 650px;
  border: 1px solid #444444;
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

  <h1> Downloading and Processing US Census Data for GIS Implementation </h1> <br>

  <p> Using US Census data in GIS allows analysts to map and visualize demographic trends such as population distribution, age demographics, and socioeconomic status across different geographic areas. By integrating Census data into GIS platforms, urban planners can make informed decisions      regarding infrastructure development, resource allocation, and community outreach initiatives. This spatial analysis helps governments and organizations understand spatial patterns and make evidence-based policy decisions tailored to specific localities. </p> <br>

  <p> In this tutorial, we will be downloading census files for Boone County, Missouri. These files should contain information about the total population as well as racial and ethnic groups at the census tract level. The goal is to create a population chloropleth map at the census tract level, so we will be searching for both census tracts datasets and census tract boundary files. Essentially, this will be a table and a shapefile, though the table will require some processing to be usable in a GIS environment.  </p> <br>

  <p> US Census data is based on a hierarchical system. At the lowest level (or highest geographic scale) are census blocks, which are formed by human made and natural features such as streets, roads, railroads, streams, and visible physical and cultural features. Since they are at the bottom    of the geographic hierarchy, they form other census geographies when aggregated. Above census blocks are block groups, tracts (which is what we will look at), counties, states, divisions, regions, and finally the entire nation. Figure 1 below depicts the standard hierarchy as well as specific       offshoots.  </p> <br>

  
  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/0ptopke.jpeg" alt="Census Geography Hierarchy" style="width:100%;max-width:625px">
  <figcaption> Figure 1. The Hierarchy of Census Geographies  </figcaption>
  </figure> <br>

  <h3> Searching for Population Tables at the Census Tract Level </h3> <br>

  <p> We can visit the US Census data website  <a href="https://data.census.gov/">here</a>. Since we want to implement this table in a GIS software, we have to be prudent as to how we search for data -- the US Census has a massive number of similaraly named datasets which can be quite confusing to navigate through. Realistically, we will have to use the "advanced search" option to apply a couple of filters to narrow down our dataset. Select “advanced search” under the main search bar to begin (Figure 2). </p>  <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/BusE2V2.jpeg" alt="US Census Data" style="width:100%;max-width:625px">
  <figcaption> Figure 2. The US Census Data Website  </figcaption>
  </figure> <br>

  <p> On the left side of the webpage are multiple different subjects through which the search can be refined. </p> <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/mT8nRO2.jpeg" alt="US Census Advanced Search" style="width:100%;max-width:625px">
  <figcaption> Figure 3. The Advanced Search Pane on the US Census Data Website  </figcaption>
  </figure> <br>

  <p> Now we can start to filter this data to download what we need.  Starting with “Geographies”, click on “Census Tract”, choose “Missouri” from the popup list, then choose “Boone County”, and finally check on “All Census Tracts within Boone County, Missouri”. This limits the datasets to census tracts in Boone County, Missouri.  </p> <br>

  <p> Next, under “Topics”, select “Populations and People”. A list of ethnic and racial groups should pop up, ultimately check “Race and Ethnicity”. This should provide us with the option to map out specific racial or ethnic groups.  </p> <br>

  <p> Now, looking at “Surveys”, there are a several different options. To map the total population in 2020, we need information from an official census release rather than a survey. Select “Decennial Census” and then select “Demographic and Housing Characteristics”. Each of the options here is based on the same underlying data, though we chose Demographic and Housing Characteristics as it is easier to process than the others.  </p> <br>

  <p> Under “Years”, select “2020” as we need 2020 US Census data. At this point you should have something that looks like Figure 4 below. </p> <br>

  <figure> 
  <img class="myImages" id="myImg" src="https://i.imgur.com/wwVNZch.jpeg" alt="US Census Advanced Search" style="width:100%;max-width:625px">
  <figcaption> Figure 3. US Census Advanced Search Filters Input  </figcaption>
  </figure> <br>

  <p> The top option, “P9”, works out quite well for the purpose of this tutorial. This dataset has information on whether the population is Hispanic or Latino, and not Hispanic or Latino, as well as a racial break down for both of those categories. It is important to note that being Hispanic or Latino is counted by the census as an ethnicity, whereas being Black or African American, Asian, American Indian or Alaska Native, Nativa Hawaiian or Pacific Islander, or White are counted as racial groups.   </p> <br>

  <p> This file needs to be downloaded in a specific way. You can collapse the search menu and look at the table, but you do not want to use the .zip, .csv, or .xlsx download options directly above the table – these options format the table in a way that makes it difficult to use in GIS. Instead, under the results menu, you can click “P9” and then select “download” above it. The file needs to be downloaded like this because it preserves the “GEOID” field, which will be the unique identifier field used to join it to the census tract boundaries.    </p> <br>

  <p> With our census dataset file downloaded, we can go ahead and find the census tract boundaries before processing our dataset file.  </p> <br>

  <h3> Finding GIS Boundary Files at the Census Tract Level </h3> <br>


  </body>


  
