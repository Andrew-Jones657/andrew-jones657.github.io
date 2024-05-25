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

<p> During the 2020 redistricting cycle, I worked as the GIS Redistricting Analyst for the Missouri House of Representatives. In this position, I assisted representatives with drawing plans for new congressional districts. Here, I intend to discuss congressional redistricting in general, as well as provide a detailed summary on changes in Missouri's congressional districts. Due to the nature of my position, however, I cannot provide a critical evaluation on the quality of Missouri's congressional redistricting plan. </p> <br>

<figure>
<img src="https://i.imgur.com/GasizLY.jpeg" class="center" style="width: 625px">
<figcaption> <em> The Missouri Legislature </em> </figcaption>    
</figure> <br>

<p3> Congressional redistricting occurs every ten years after both the US Census and the apportionment process are completed. Apportionment is the process by which the number of congressional districts for each state is determined -- this entails sophisticated mathematics using a state's population and population change. In Missouri, the congressional map is drawn by the state legislature and passed like a normal bill. Depending on the state, congressional maps are passed by state legislatures, nonpartisan or bipartisan citizens commissions, or select commissions.  </p3> <br> <br>

<figure>
<img src="https://i.imgur.com/gRiNord.png" class="center" style="width: 625px"> 
<figcaption> <em> The result of the most recent congressional apportionment process. Missouri experienced no change and continues to hold
eight congressional seats. </em> </figcaption>    
</figure> <br>

<p4> Congressional maps are drawn using boundary and population information from the US Census Bureau. Topologically Integrated Geographic Encoding and Referencing (TIGER) line files, which include counties, cities, voting precincts, and census blocks, serve as boundary files. 
The Public Law 94-171 dataset contains population and demographic information in a series of tables. Combined together, these highly detailed files are used to shape new congressional districts. </p4> <br> <br>

<figure>
<img src="https://i.imgur.com/FtJNeJR.jpeg" class="center" style="width: 625px">
<figcaption> <em> Counties, voting districts, and census blocks in the St. Louis area. </em> </figcaption>
</figure> <br>

 
<p5> When the census data is ready, the process of map drawing may begin. Typically, software such as Maptitude for Redistricting or ESRI Redistricting are used to create and manage redistricting plans. In the past two redistricting cycles, online redistricting programs have opened the process to the public, who can now more easily provide input on the process to map makers.   </p5> <br> <br>

<figure>
<img src="https://i.imgur.com/13XzQRp.jpeg" class="center" style="width: 625px">
<figcaption> <em> Maptitude for Redistricting is used by a majority of state legislatures for redistricting purposes. </em> </figcaption>
</figure> <br>

<p6> While requirements and criteria for congressional redistricting can vary from state to state, there are federal 
provisions and rulings that act as universal rules. One quickly finds that drawing a constitutional map requires
forethought, mindfulness, and preparation.   </p6> <br> <br> 

<hr> 

<h3 class="center"> Rules for Congressional Redistricting </h3> <br>

<p> <em> Population Equality </em> is essential, as congressional districts must be drawn down to the person. 
This principle stems from the Wesberry v Sanders (1964) decision, in which the US Supreme Court reviewed large population deviations in congressional districts in Georgia 
and determined that the equal protection clause from the 14th Amendment also applies to voters in congressional districts. 
While the degree of population equality may vary depending on redistricting provisions in a state's constitution (e.g. in Iowa and West Virginia counties cannot be split), generally, population deviations must be as minimal as practicable. 
Otherwise, failing to uphold population equality can render a map unconstitutional.  </p> <br> 

<figure>
<img src="https://i.imgur.com/EhQxOLe.jpeg" class="center"> 
<figcaption> <em> An example of population deviations "as minimal as practicable". </em>  </figcaption>
</figure> <br>


<p> <em> Contiguity </em> is also important, as 23 states have statute or constitutional provisions that dictate
congressional districts must consist of one geographic unit without separate portions surrounded by another district.  
Nearly all states follow this principle regardless as to whether it is codified into law. </p> <br>

<figure>
<img src="https://i.imgur.com/geQOe6F.jpeg" class="center" style="width:625px">
<figcaption> <em> A fictitious rendition of Missouri's first congressional district that is not contiguous. The separate polygon over Rock Hill would have to connect to the rest of the district to establish contiguity. </em> </figcaption>
</figure> <br>


<p> 
Congressional districts should be <em> Compact</em>, meaning residents within the district live close to one another. 
These districts are square shaped without strange protrusions. 18 states have a statutorial or constitutional requirement for compact districts. 
Compactness is, however, a more difficult criteria to evaluate than population deviations or contiguity, 
as the line between a compact and non-compact district can be ambiguous. 
Compactness is typically measured through visual examination and mathematical tests such as Roeck, Schwartzberg, Polbsy-Popper, etc.  </p> <br>

<figure>
<img src="https://i.imgur.com/0ug1IbG.jpeg" class="center" style="width:625px">
<figcaption> <em> Kentucky's newly redistricted first congressional district brought up some concerns regarding its compactness. </em> </figcaption>
</figure> <br>


<p> Section II of the <em> Voting Rights Act of 1965</em> prohibits voting practices or procedures that discriminate 
on the basis of race, color, or membership in certain language minority groups. 
Thornburg v. Gingles (1986) delineates necessary preconditions for minority groups
to elect their candidate of choice.  </p> <br> 

<figure>
<img src="https://i.imgur.com/MxywcnN.jpeg" class="center" style="width:625px">
<figcaption> <em> Missouri's first congressional district is generally regarded as a VRA protected district, as has contained a plurality Black or African-American population since the mid 1960s. </em> </figcaption>
    
</figure> <br> 

<hr> 

<h3 class="center"> Congressional Redistricting Criteria </h3> <br>

<p> Below are general criteria used in congressional redistricting. These are guidelines rather than hard requirements. </p> <br>

<p> <em> Communities of Interest </em>(COIs) is a term used to describe any group of people in a location or area with a shared interest, practice, occupation, lifestye, activities, etc. 
COIs can be helpful in that they describe qualitative aspects of the underlying population that cannot be observed in census data alone. 
However, it is not always possible to preserve every possible COI. This may be due to COIs overlapping, or other constitutional
or statutory requirements superceding potential COIs.  </p>
 
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


<p> <em> Boundary Preservation </em>suggests that congressional districts should follow natural and human boundaries such as rivers, 
municipality lines, country borders, roads, etc. Generally, congressional districts with preserved boundaries appear clear and 
are more easily understood by the public.  </p> <br>

<figure>
<img src="https://i.imgur.com/SvhMiKf.jpeg" alt="Colorado First" style="width:625px">
<figcaption> <em> The city limits of Denver constitute the vast majority of Colorado's first congressional district. </em> </figcaption>
</figure> <br>

<p> The theme of <em> Region </em>from cultural geography plays a role in creating congressional districts. Region 
refers to a geography with relatively homogeneous human activity. In the context of redistricting,  
a region can be considered a large community of interest. 
Examples of this in Missouri could include formal and vernacular regions such as St. Louis, Kansas City, the Ozarks, 
the Bootheel, Little Dixie, the Lead Belt, etc.   </p> <br>

<figure>
<img src="https://i.imgur.com/AFA4epU.jpeg" class="center" style="width:625px"> 
<figcaption> <em> Missouri's eighth congressional district has long contained Missouri's Bootheel. </em> </figcaption>
</figure> <br>
<p> Preserving areas, such as cities and counties, is usually refered to as <em>Minimizing Splitting</em>. 
This is similar to boundary preservation, albeit it with the intent of maintaining geographies.    
Generally, this is in the interest of good governance, as congressional districts with few splits are clearly delineated and create 
less of an administrative burden on government entities such as election officials.   </p> <br>

 <div class="row">
  <div class="column">
    <img src="https://i.imgur.com/WBJ6g3B.jpeg" alt="Jefferson County 2012" style="width:100%">
  </div>
  <div class="column">
    <img src="https://i.imgur.com/HQHi4XK.jpg" alt="Jackson County 2022" style="width:100%;height:260px">
  </div>
</div> 

<figure>
<figcaption> <em> Under the 2012 congressional district plan, Jefferson County was split three ways. Under the current plan, Jackson County is split three ways. </em></figcaption>
</figure> <br>

<p> <em> Preserving District Cores </em> means keeping the majority of a district's population within the same district during redistricting,
rather than drawing a completely different district. This is typically a method incorporated in least-change congressional maps.   </p> <br>

 <div class="row">
  <div class="column">
    <img src="https://i.imgur.com/wRRVOQq.jpeg" alt="Missouri's seventh congressional district in 2012" style="width:100%">
  </div>
  <div class="column">
    <img src="https://i.imgur.com/xeE00eu.jpeg" alt="Missouri's seventh congressional district in 2022" style="width:100%;height:220px">
  </div>
</div> 

<figure>
<figcaption> <em> The location of Missouri's seventh congressional district in the southwest corner and the district's steady population growth
means it experiences few changes during congressional redistricting.  </em></figcaption>
</figure> <br>

<p> <em> Safe Districts </em> have a strong partisan lean. These districts usually have predictable general elections.  </p> <br>

<figure>
<img src="https://i.imgur.com/ZLNPwCt.jpeg" class="center" style="width:625px">
<figcaption> <em> Missouri's congressional districts tend to have predictable general election results. </em></figcaption>
</figure> <br>

<p> <em> Competitive or Proportional Districts </em>tend to have moderate partisan leans. 
Competitive districts, as the name suggests, are congressional districts drawn to be as competitive as possible. 
Proportional districts are districts drawn to reflect the margins of statewide elections.  </p> <br>

<figure>
<img src="https://i.imgur.com/5bFZs0t.jpeg" class="center" style="width:625px">
<figcaption> <em> Michigan's congressional districts, drawn by an indepedent commission, tend to be proportional to the states overall election results. </em> </figcaption>
</figure> <br>

<p7> These criteria and provisions are an example of what is considered during congressional redistricting and perhaps showcase the 
complexity of the process. Naturally, statutory and constitutional provisions will dictate what guidelines are incorporated during the map drawing process.   </p7> <br>

<p> Shifting focus over to Missouri, the 2011 cycle provides a good deal of context as to how 
congressional districts were previously redistricted.  </p> <br>

<h3 class="center"> Missouri's 2011 Redistricting Cycle </h3>
<figure>
<a href="https://i.imgur.com/WH8hI3i.jpg"><img src="https://i.imgur.com/WH8hI3i.jpg" title="Missouri's Congressional Districts from 2013-2023" class="center" style="width: 625px; height: 450px;"> </a> 
<figcaption> <em> Missouri's congressional districts from 2013 to 2023 </em> </figcaption>
</figure> <br>
<p> The 2011 redistricting cycle was bound to be tumultuous, as Missouri lost a congressional district after the 2010 apportionment process. When a state loses a congressional district, the remaining districts must absorb the population of the lost district: this means every district must expand. Alongside existing population deviations, this can result in drastically altered districts. This also meant one of Missouri's <a href="https://i.imgur.com/3u5ebKr.jpg"> nine </a> congressmen at the time would no longer have a district. </p> <br> 

<p> At this point in time, the Missouri House and Senate had both been controlled by Republicans since 2003. While Democrats held the governor's seat, Republicans had control of the map drawing process with a near supermajority. Given the Republican control over the legislature, the proposed redistricting bills in the House, <a href="https://i.imgur.com/coCwNLG.jpeg"> HB 193</a>, and the Senate, <a href="https://i.imgur.com/qUJGsTG.jpeg"> SB 264</a>, were fairly similar to one another. Ultimately, both chambers of the legislature agreed on the map shown above and sent it to governor. Despite the governor's veto, the Republicans were able to override the veto with support from some Democrats.  </p> <br>

<p> District-by-district changes between 2001 and 2011: </p> <br>

<ol>
<li> The first district took in all of St Louis City, as well as taking in many of the liberal inner ring (Interstate 170) urban municipalities that it had lost in the previous redistricting cycle. This included Maplewood and parts of Clayton, Richmond Heights, Rock Hill, and Webster Groves. The district lost parts of Bridgeton, Creve Coeur, Frontenac, Ladue, Maryland Heights, and Westwood that it had gained in the previous redistricting cycle. With this configuration, it maximized the number of African American or Black residents and remained the most Democrat district in the state. </li> <br>
<li> The second district took back portions of northwestern and southern St. Louis County that were in the first and third districts respectively. The district retained southern portions of St. Charles County with municipalities such as Cottleville and Weldon Springs, alongside portions of Dardenne Prairie, O’Fallon, St. Charles, and St. Peters. A portion of Jefferson County was added to the second as well, consisting of St. Louis suburbs such as Arnold and Murphy, as well as some unincorporated parts.  </li> <br>
<li> The third congressional district was radically altered to absorb the central Missouri and St Louis exurbs of the old ninth. This meant it no longer contained St. Louis City or St. Louis County, and instead consisted of St. Louis suburbs, exurbs, and parts of central Missouri as far west as the Lake of the Ozarks. Callaway, Cole, Franklin, Gasconade, Lincoln, Maries, Miller, Montgomery, Osage, Warren, and parts of Camden, Jefferson, and St. Charles Counties formed the newly drawn district. The parts of Jefferson County included Imperial down to Crystal City, as well as northwest Jefferson County. In St. Charles, this included parts of Dardenne Prairie, O’Fallon, St. Charles, and St. Peters. The rest of the county not mentioned before were included in the third (e.g. Lake St. Louis and Wentzville).  </li> <br>
<li> The fourth district, like the third, experienced a heavy revamping. While retaining a western and central Missouri focus, it was drawn more into central Missouri. It lost Lafayette, Polk, Ray, Saline, and portions of Camden, Jackson, and Webster Counties. It gained Boone, Cooper, Howard, Randolph as well as portions of Audrain and Cass Counties. Notable changes include losing the state capital, Jefferson City, and gaining the college town, Columbia.  </li> <br>
<li> The fifth district was given a unique configuration – parts of Clay, Lafayette, Ray, and Saline counties were added onto the Kansas City based district. Portions in Cass County, such as Belton and Raymore, as well as part of Jackson County were removed. This rendered the district one of the most unique in the country in terms of rural and urban representation.  </li> <br>
<li> The sixth district took in the rural northeastern counties from the former the ninth district disappeared, namely Adair, Clark, Knox, Lewis, Macon, Marion, Monroe, Pike, Scotland, Shelby, Ralls, and parts of Audrain, creating one large agricultural north Missouri district. In Jackson County, it took in a little more of Lee’s Summit while losing some of Blue Springs. It also lost some Democrat leaning parts of Kansas City in Clay County.   </li> <br>
<li> The seventh district, like in the previous cycle, was the least altered. It took in the rest of Taney and Polk Counties as well as part of Webster County.  </li> <br>
<li> The eighth district added Crawford and Ste. Genevieve Counties, as well as parts of Jefferson County. The portion of Taney County was removed.  </li> <br>
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

<p> Below, I designed a web map that displays the changes in Missouri's congressional districts. To the left of the swipe widget are the new congressional districts, and to the right are the previous congressional districts.  </p> <br>

<div id="viewDiv" style="width: 625px; height: 450px; border: 1px solid #444444;"> </div>

<script src="./files/CDs/MO_CDs_13_23.js" > </script> <br>

<h3> What does the Future hold? </h3> <br>

<p> It is not easy to predict future apportionment changes from so far out in time, though according to the Brennan Center and the American Redistricting Project, Missouri appears to be on course to hold steady and maintain its eight congressional districts. How the congressional districts change is difficult to discern, as it will be highly dependent on political control of state government in the next decade. </p> <br>

<p> This article is still under construction. I may also periodically come back and update it with further mapping enhancements. </p> <br> <br>

<h3> Additional Resources </h3>

<p> <a href="https://i.imgur.com/3u5ebKr.jpg" class="center"> Missouri's Congressional Districts from 2001 - 2012 </a> </p> <br>

<p> <a href="https://davesredistricting.org/" class="center"> Dave's Redistricting </a> </p> <br>

<p> <a href="https://www.caliper.com/redistricting-software.htm"> Maptitude for Redistricting </a> </p> <br>

<p> <a href="https://house.mo.gov/default.aspx" class="center"> Missouri House of Representatives </a> </p> <br>

<p> <a href="https://www.senate.mo.gov/" class="center"> Missouri Senate </a> </p> <br>

<p> <a href="https://maps.geo.census.gov/ddmv/map.html" class="center"> 2020 Census Demographic Data Map Viewer </a> </p> <br>

<p> <a href="https://www.arcgis.com/apps/instant/portfolio/index.html?appid=4cdbe664bc2049378d3a17c923f07824" class="center"> ESRI Atlas of Census 2020 Redistricting Data </a> </p> <br>

<h3> References </h3>

</body>
</html>
