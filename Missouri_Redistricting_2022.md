<html lang="en-US">

<head>
    <meta charset="utf-8">
    <meta http-equiv= "X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />
    <style>
      html,
      body,
      #viewDiv {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        min-height: 450px;
        min-width: 625px;
      }
    img:hover {
    box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
    class="center";
    }

    * {
    box-sizing: border-box;
    }

    .row {
    display: flex;
    }

    /* Create three equal columns that sits next to each other */
    .column {
    flex: 50%;
    padding: 5px;
    }
    
    figure figcaption {
    text-align: center;
    }

    h3 {text-align: center;}
    
    .imgContainer{
    float:left;
    }
    .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    }
    
    </style>
    
    <link rel="stylesheet" href="https://js.arcgis.com/4.28/esri/themes/light/main.css" />
    <script src="https://js.arcgis.com/4.28/"></script>
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
</head> 

<body>

<h1> Missouri's 2022 Congressional Redistricting </h1> <br>

<figure>
    <img src="https://i.imgur.com/euS37YR.jpg" alt="United States Congressional Districts" class="center" style="width: 625px; height: 450px;">
    <figcaption><em> The 118th United States Congress</em> </figcaption>
</figure> <br> <br> 

<p> During the 2020 redistricting cycle, I worked as the GIS Redistricting Analyst for the Missouri House of Representatives. In this position, I assisted representatives with drawing plans for new congressional districts. Here, I intend to discuss congressional redistricting in general, as well as provide an analysis on changes in Missouri's congressional districts. Due to the nature of my position, however, I cannot provide a critical evaluation on the quality of a congressional redistricting plan. </p> <br> 

<p3> Congressional redistricting occurs every ten years after both the US Census and apportionment are completed. Apportionment is the process by which each state’s population and population change is used to calculate its number of congressional seats. In Missouri, the congressional map is drawn by the state legislature and passed like a normal bill. Depending on the state, Congressional maps are passed by state legislatures, nonpartisan/bipartisan citizens commissions, or select commissions.  </p3> <br> <br>

<figure>
<img src="https://i.imgur.com/gRiNord.png" class="center" style="width: 625px"> 
<figcaption> <em> The result of the most recent congressional apportionment process. Missouri remained steady with eight seats. </em> </figcaption>    
</figure> <br>

<p4> Congressional maps are drawn using boundary and population information from the US Census bureau. Topologically Integrated Geographic Encoding and Referencing (TIGER) line files such as counties, cities, voting precincts, and census blocks serve as boundary files, and the population and demographic information is included in PL 94-171. </p4> <br> <br>

<iframe src="https://www.arcgis.com/apps/instant/portfolio/index.html?appid=4cdbe664bc2049378d3a17c923f07824" title="ESRI Census Demographic Web Maps" style="width: 625px; height: 600px;"> 
<figcaption> <em> The company ESRI provides visually stylistic demographic data from the 2020 US Census </em> </figcaption>
</iframe> <br>
 
<p5> When the census data is ready, the process of map drawing may begin. Counties, cities, voting precincts, and census blocks are assigned to new congressional districts. Typically, software such as Maptitude for Redistricting or ESRI Redistricting are used to create and manage redistricting plans. In the past two redistricting cycles, online redistricting programs have opened the process to the public, who can now more easily provide input on the process to map makers.   </p5> <br> <br>

<p6> Many requirements and criteria apply when drawing congressional districts. Attempting to work in even a few of the following factors becomes complex. This list of criteria is simply a glimpse at what may be considered in drawing congressional districts.  </p6> <br> 

<hr> 

<h3 class="center"> Rules for Congressional Redistricting </h3> <br>

<p> <em> Population Equality </em> is essential, as congressional districts must be drawn down to the person. This rule stems from the Reynolds v Sims (1964) decision that the equal protection clause from the 14th Amendment also applies to legislative districts -- this is where the phrase "one person, one vote" originates.  While this may vary somewhat depending on redistricting provisions in a state's constitution (e.g. in Iowa and West Virginia counties cannot be split), generally, population deviations must be as minimal as practicable. This is a hard requirement, as failing to uphold population equality can render a map unconstitutional.  </p> <br> 
<figure>
<img src="https://i.imgur.com/EhQxOLe.jpeg" class="center"> 
<figcaption> <em> An example of population deviations "as minimal as practicable". </em>  </figcaption>
</figure> <br>


<p> <em> Contiguity </em> is also particularly important, as congressional districts must consist of one geographic unit without separate portions surrounded by another district. Like population equality, this is also a hard requirement. </p> <br>

<figure>
<img src="https://i.imgur.com/geQOe6F.jpeg" class="center" style="width:625px">
<figcaption> <em> A fictitious rendition of Missouri's first congressional district that is not contiguous. The separate polygon over Rock Hill would have to connect to the rest of the district to establish contiguity. </em> </figcaption>
</figure> <br>



<p> Congressional districts should be <em> Compact</em>, meaning residents within the district live close to one another. Compact districts tend to be square shaped and do not have strange protrusions. While this is important and in some cases a hard requirement, this is a more difficult criteria to evaluate than population deviations or contiguity, as the line between a compact and non-compact district can be ambiguous. Compactness is typically measured with mathematical tests such as Roeck, Schwartzberg, Polbsy-Popper, etc. </p> <br>
<figure>
<img src="https://i.imgur.com/0ug1IbG.jpeg" class="center" style="width:625px">
<figcaption> <em> Kentucky's newly redistricted first congressional district brought up some concerns regarding its compactness. </em> </figcaption>
</figure> <br>



<p> Section II of the <em> Voting Rights Act of 1965 </em> delineates circumstances or factors in which minority groups have the opportunity to elect their candidate of choice. </p> <br> 
<figure>
<img src="https://i.imgur.com/MxywcnN.jpeg" class="center" style="width:625px">
<figcaption> <em> Missouri's first congressional district is generally regarded as a VRA protected district, as it contains a plurality Black/African-American population. </em> </figcaption>
    
</figure> <br> 

<hr> 

<h3 class="center"> Congressional Redistricting Criteria </h3> <br>

<p> Below are general criteria used in congressional redistricting. These are guidelines rather than hard requirements. </p> <br>

<p> <em> Communities of Interest </em> is a term used to describe any group of people in a location or area with a shared interest, practice, occupation, lifestye, activities, etc. Many factors can constitute a community of interest: this can be helpful in that it describes qualitative aspects of the underlying population that cannot be observed in census data alone. However, as other rules are paramount, it is not always possible to preserve every possible community of interest. </p>
 
 <div class="row">
  <div class="column">
    <img src="https://i.imgur.com/v0ydmYx.jpeg" alt="HB 2117" style="width:100%">
  </div>
  <div class="column">
    <img src="https://i.imgur.com/HQHi4XK.jpeg" alt="HB 2909" style="width:100%">
  </div>
</div> 

<figure>
<figcaption> <em> Missouri's fifth congressional district under HB 2117 versus HB 2909. Under HB 2117, the district preserved more of Jackson County, whereas under HB 2909 the district unites more of Kansas City. </em></figcaption>
</figure> <br>


<p> <em> Boundary Preservation </em> suggests that congressional districts should follow natural and human boundaries such as rivers, municipality lines, country borders, roads, etc. Generally, districts with preserved boundaries appear less arbitrarily drawn and are more easily understood by the public.  </p> <br>

<figure>
<img src="https://i.imgur.com/SvhMiKf.jpeg" alt="Colorado First" style="width:625px">
<figcaption> <em> The city limits of Denver constitute Colorado's first congressional district. </em> </figcaption>
</figure> <br>

<p> <em> Cultural and Physical Geography </em> often play a role into creating congressional districts, as districts may contain regions where inhabitants have a shared lifestyle or area. Examples of this in Missouri could include formal and vernacular regions such as St Louis, Kansas City, the Ozarks, the Bootheel, Little Dixie, the Lead Belt, etc. Such districts are often based on shared history between inhabitants, linking back to Communities of Interest.  </p> <br>

<figure>
<img src="https://i.imgur.com/AFA4epU.jpeg" class="center" style="width:625px"> 
<figcaption> <em> Missouri's eighth congressional district has long contained Missouri's Bootheel. </em> </figcaption>
</figure> <br>
<p> <em> Minimizing Splitting </em> is a straightforward criterion that states counties, cities, and voting districts should be split as minimally as possible. Generally, this is in the interest of good governance, as it is much easier for the public to understand unsplit congressional districts and for county officials to conduct elections.  </p> <br>

 <div class="row">
  <div class="column">
    <img src="https://i.imgur.com/WBJ6g3B.jpeg" alt="Jefferson County 2012" style="width:100%">
  </div>
  <div class="column">
    <img src="https://i.imgur.com/HQHi4XK.jpg" alt="Jackson County 2022" style="width:100%">
  </div>
</div> 

<figure>
<figcaption> <em> Under the 2012 congressional district plan, Jefferson County was split three ways. Under the current plan, Jackson County is split three ways. </em></figcaption>
</figure> <br>

<p> <em> Preserving District Cores </em> means keeping the bulk of the population within the same district during redistricting. This is typically a method incorporated in least-change congressional maps, which are generally modified as minimally as possible.  </p> <br>

 <div class="row">
  <div class="column">
    <img src="https://i.imgur.com/wRRVOQq.jpeg" alt="Missouri's seventh congressional district in 2012" style="width:100%">
  </div>
  <div class="column">
    <img src="https://i.imgur.com/xeE00eu.jpeg" alt="Missouri's seventh congressional district in 2022" style="width:100%">
  </div>
</div> 

<figure>
<figcaption> <em> Missouri's seventh congressional district steadfast population gain and location in southwest Missouri makes redistricting straightforward. </em></figcaption>
</figure> <br>

<p> <em> Safe Districts </em> refers to districts that have a strong partisan lean. These districts tend to keep congressional election results consistent.  </p> <br>

<figure>
<img src="https://i.imgur.com/ZLNPwCt.jpeg" class="center" style="width:625px">
<figcaption> <em> Missouri's congressional districts tend to have predictable general election results. </em></figcaption>
</figure> <br>

<p> <em> Competitive or Proportional Districts </em> are the opposite of safe districts as they tend to have moderate partisan leans. Competitive districts, as the name suggests, are congressional districts drawn as close to 50/50 partisan values as possible. Proportional districts are districts drawn to reflect the margins of statewide elections. </p> <br>

<figure>
<img src="https://i.imgur.com/5bFZs0t.jpeg" class="center" style="width:625px">
<figcaption> <em> Michigan's congressional districts, drawn by an indepedent commission, tend to be more proportional to the states overall election results. </em> </figcaption>
</figure> <br>

<p7> Considering all the criteria and requirements for redistricting, one quickly finds that that it is impossible to create a map incorporating all the criteria. Some of these criteria, such as competitiveness and safe districts, outright contradict one another. Typically, whatever entity draws the congressional districts will focus on a few of these criteria during the mapmaking process.  </p7> <br>

<p> Shifting focus over specififcally to Missouri, the previous 2012 cycle provides a good deal of context as to how congressional districts are modified under a Republican supermajority. </p> <br>

<h3 class="center"> Missouri's 2011 Redistricting Cycle </h3>
<figure>
<a href="https://i.imgur.com/WH8hI3i.jpg"><img src="https://i.imgur.com/WH8hI3i.jpg" title="Missouri's Congressional Districts from 2013-2023" class="center" style="width: 625px; height: 450px;"> </a> 
<figcaption> <em> Missouri's congressional districts from 2013 to 2023 </em> </figcaption>
</figure> <br>
<p> The 2011 redistricting cycle was bound to be tumultuous, as Missouri lost a congressional district after the 2010 US Census reapportionment. When a state loses a congressional district, the remaining districts must absorb the population of the lost district: this means every district must expand. Alongside existing population deviations, this can result in drastically altered districts. For Missouri, this also meant one of the <a href="https://i.imgur.com/3u5ebKr.jpg"> nine </a> congressmen at the time would no longer have a seat. </p> <br> 

<p> At this point in time, the Missouri House and Senate had both been controlled by Republicans since 2003. While Democrats held the governor's seat, Republicans had control of the map drawing process with a near supermajority. Given the Republican control over the legislature, the proposed redistricting bills in the House, <a href="https://i.imgur.com/coCwNLG.jpeg"> HB 193</a>, and the Senate, <a href="https://i.imgur.com/qUJGsTG.jpeg"> SB 264</a>, were fairly similar to one another.  </p> <br>

<p> District level changes between 2001 and 2011: </p> <br>

<ol>
<li> The first district took in all of St Louis City, as well as taking in many of the liberal inner ring (Interstate 170) urban municipalities that it had lost in the previous redistricting cycle. This included Maplewood and parts of Clayton, Richmond Heights, Rock Hill, and Webster Groves. The district lost parts of Bridgeton, Creve Coeur, Frontenac, Ladue, Maryland Heights, and Westwood that it had gained in the previous redistricting cycle. With this configuration, it maximized the number of African American or Black residents and remained the most Democrat district in the state. </li> 
<li> The second district took back portions of northwestern and southern St. Louis County that were in the first and third districts respectively. The district retained southern portions of St. Charles County with municipalities such as Cottleville and Weldon Springs, alongside portions of Dardenne Prairie, O’Fallon, St. Charles, and St. Peters. A portion of Jefferson County was added to the second as well, consisting of St. Louis suburbs such as Arnold and Murphy, as well as some unincorporated parts.  </li>
<li> The third congressional district was radically altered to absorb the central Missouri and St Louis exurbs of the old ninth. This meant it no longer contained St. Louis City or St. Louis County, and instead consisted of St. Louis suburbs, exurbs, and parts of central Missouri as far west as the Lake of the Ozarks. Callaway, Cole, Franklin, Gasconade, Lincoln, Maries, Miller, Montgomery, Osage, Warren, and parts of Camden, Jefferson, and St. Charles Counties formed the newly drawn district. The parts of Jefferson County included Imperial down to Crystal City, as well as northwest Jefferson County. In St. Charles, this included parts of Dardenne Prairie, O’Fallon, St. Charles, and St. Peters. The rest of the county not mentioned before were included in the third (e.g. Lake St. Louis and Wentzville).  </li>
<li> The fourth district, like the third, experienced a heavy revamping. While retaining a western and central Missouri focus, it was drawn more into central Missouri. It lost Lafayette, Polk, Ray, Saline, and portions of Camden, Jackson, and Webster Counties. It gained Boone, Cooper, Howard, Randolph as well as portions of Audrain and Cass Counties. Notable changes include losing the state capital, Jefferson City, and gaining the college town, Columbia.  </li>
<li> The fifth district was given a unique configuration – parts of Clay, Lafayette, Ray, and Saline counties were added onto the Kansas City based district. Portions in Cass County, such as Belton and Raymore, as well as part of Jackson County were removed. This rendered the district one of the most unique in the country in terms of rural and urban representation.  </li>
<li> The sixth district took in the rural northeastern counties from the former the ninth district disappeared, namely Adair, Clark, Knox, Lewis, Macon, Marion, Monroe, Pike, Scotland, Shelby, Ralls, and parts of Audrain, creating one large agricultural north Missouri district. In Jackson County, it took in a little more of Lee’s Summit while losing some of Blue Springs. It also lost some Democrat leaning parts of Kansas City in Clay County.   </li>
<li> The seventh district, like in the previous cycle, was the least altered. It took in the rest of Taney and Polk Counties as well as part of Webster County.  </li>
<li> The eighth district added Crawford and Ste. Genevieve Counties, as well as parts of Jefferson County. The portion of Taney County was removed.  </li>
</ol> <br> <br>

<h3 class="center"> Missouri's 2022 Redistricting Cycle </h3> <br>

<a href="https://i.imgur.com/Xrk6Br4.jpg"><img src="https://i.imgur.com/Xrk6Br4.jpg" title="Missouri's Congressional Districts from 2013-2023" class="center" style="width: 625px; height: 450px;"> </a> <br>

<p> Unlike the 2012 redistricting cycle, Missouri did not suffer from losing a congressional seat during the 2020 US Census apportionment. Republicans held both chambers of the legislature by large majorities and the governor’s seat – it had been a longtime since the conditions to pass a new congressional map were this favorable.    </p> <br> <br>

<p> Despite this, Missouri was one of the last states in the nation to pass a new congressional map. Due to the coronavirus pandemic, the 2020 census data was delayed until September of 2021, and ultimately, the redistricting process was delayed until the next regular session in January of 2022. In that period, there was copious debate within the Republican caucus over maintaining the “6-2” congressional balance, or six safe seats for Republicans and two safe seats for Democrats; or totally redrawing the map to create a “7-1” map, a map that would disassemble the Kansas City based fifth congressional district to create another Republican district.  </p> <br> <br>

<p>  </p>

<p> District level changes between 2011 and 2022: </p> <br>
<ol>
<li> The first district expanded further into St Louis County. This included parts of municipalities in central and northwestern St Louis County such as Bridgeton, Maryland Heights, Creve Coeur, Frontenac, Ladue, Brentwood, Rock Hill, Webster Groves, Richmond Heights, and unincorporated St Louis County. The district lost Bella Villa, Lemay, Maplewood, and part of Richmond Heights. </li>
<li> The second district expanded west into exurban areas, picking up Franklin County as well as parts of Warren and rural St. Charles Counties. The portion of Jefferson County was removed, as well as some suburban parts of St. Charles County. This shifted the second from being a competitive district to a Republican leaning one.  </li>
<li> The third district remained a mid-Missouri district with St. Louis suburbs, albeit with an altered composition. It now has more of suburban St. Charles County as well as the southern half of Boone County and part of the City of Columbia. Crawford, Cooper, Moniteau, and Washington counties were also added to the third district. The portion of Jefferson County in the third also shifted from being mid Jefferson County to the exurban and rural western portion of Jefferson County. The district lost Lincoln County and parts of Camden County.   </li>
<li> The fourth district regained Lafayette and Saline Counties as well as some eastern portions of Jackson County. The district also gained Howard County, as well as the northern half Boone County and the city of Columbia. Polk County to the south was added back into the district as well. Ray County was removed and placed in the sixth district.  </li>
<li> The fifth district shed its rural counties, namely Lafayette, Ray, and Saline, and took in more suburban portions of Clay and Jackson Counties. In Jackson County, all of Lee’s Summit is now contained in the fifth district. The district became more democrat leaning and more rooted in Kansas City proper.  </li>
<li> The sixth district took in Lincoln, Randolph, and Ray Counties, while losing parts of Clay and Jackson Counties. The district continues to be an agricultural northern Missouri district with some suburban and exurban areas from Kansas City and St. Louis. </li>
<li> The seventh district lost Polk County and took in more of Webster County. The district remained one of the least altered districts.   </li>
<li> The eighth district took in the populated suburbs of Jefferson County by the Mississippi River. This rendered the district as more suburban, as these portion of Jefferson County contain more than half of its population. The district lost Crawford and Washington Counties to facilitate the changes in the third district. </li>    
</ol> <br>

<p> Below is a web app that displays the changes in Missouri's congressional districts. To the left of the swipe widget are the new congressional districts, and to the right are the previous congressional districts.  </p> <br>

<div id="viewDiv" style="width: 625px; height: 450px;"> </div>

<script src="./files/CDs/MO_CDs_13_23.js" > </script> <br>

<h3> What does the Future hold? </h3> <br>

<p> It is not easy to predict future apportionment changes from so far out in time, though according to the Brennan Center and the American Redistricting Project, Missouri appears to be on course to hold steady and maintain its eight congressional districts. How the congressional districts change is difficult to discern, as it will be highly dependent on political control of state government in the next decade. </p> <br>

<p> This article is still under construction </p> <br> <br>

<h3> Additional Resources and References </h3>

<p> <a href="https://i.imgur.com/3u5ebKr.jpg" class="center"> Missouri's Congressional Districts from 2001 - 2012 </a> </p> <br>

<p> <a href="https://davesredistricting.org/" class="center"> Dave's Redistricting </a> </p> <br>

<p> <a href="https://house.mo.gov/default.aspx" class="center"> Missouri House of Representatives </a> </p> <br>

<p> <a href="https://www.senate.mo.gov/" class="center"> Missouri Senate </a> </p> <br>

<p> <a href="https://maps.geo.census.gov/ddmv/map.html" class="center"> 2020 Census Demographic Data Map Viewer </a> </p> <br>

<p> <a href="https://www.arcgis.com/apps/instant/portfolio/index.html?appid=4cdbe664bc2049378d3a17c923f07824" class="center"> ESRI Atlas of Census 2020 Redistricting Data </a> </p> <br>

</body>
</html>
