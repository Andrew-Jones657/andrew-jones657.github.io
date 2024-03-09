<!DOCTYPE html>
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
      }
    </style>
    <link rel="stylesheet" href="https://js.arcgis.com/4.28/esri/themes/light/main.css" />
    <script src="https://js.arcgis.com/4.28/"></script>
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
</head> 

<body>


<p3> Congressional redistricting occurs every ten years after both the US Census and apportionment are completed. Apportionment is the process by which each state’s population and population change is used to calculate its number of congressional seats. In Missouri, the congressional map is drawn by the state legislators and passed like a normal bill. Depending on the state, Congressional maps are passed by state legislatures, nonpartisan/bipartisan citizens commissions, or select commissions.  </p3> <br> <br>

<p4> Congressional maps are drawn using boundary and population information from the US Census bureau. Topologically Integrated Geographic Encoding and Referencing (TIGER) line files such as counties, cities, voting precincts, and census blocks serve as boundary files, and the population and demographic information is included in PL 94-171. </p4> <br> <br>

<p5> After the data is prepared, the process of map drawing may begin. Counties, cities, voting precincts, and census blocks are assigned district numbers to create new congressional districts. Typically, software such as Maptitude for Redistricting or ESRI Redistricting are used to create and manage redistricting plans. In the past two redistricting cycles, online redistricting programs have opened the process to the public, who can now more easily provide input on the process to map makers.   </p5> <br> <br>

<p6> Many requirements and criteria apply when drawing a congressional district – attempting to work in even a few of the following factors becomes complex. This is not intended to be a deeply extensive list, but simply a glimpse at what all may be considered in drawing congressional districts.  </p6> <br> <br> 



<table>
  <tr>
      <td> Requirement </td>
      <td> Population </td>
      <td> 
          <ul> 
          <li> Congressional districts must be drawn down to the person, with population deviations as minimal as practicable. </li> 
          <li> Some states may have constitutional rules that allow for some flexibility on this (such as preventing splitting counties), but, in general, congressional districts are permitted far smaller   population deviations than other types of political districts. </li>
          </ul>  
      </td>
  </tr>
  <tr>
      <td> Requirement </td>
      <td> Contiguity </td>
      <td>  
          <ul>
          <li> Congressional districts must also be contiguous, meaning that districts are one geographic unit without separate portions surrounded by another district.  </li>
          <li> At the highest geographic scale, this means that all the census blocks within a district are connected by at least one edge (not vertex).  </li>
          </ul>
      </td>
  </tr>
  <tr>
     <td> Requirement</td>
     <td> Voting Rights Act</td>
     <td> Minority groups have the opportunity to elect their candidate of choice following the Gingles factors from Thornberry v Gingles (1986):
         <ol>
         <li> There is a sufficiently large and geographically compact racial minority or language group to form a majority in a single-member district. </li>
         <li> This minority group is politically cohesive (members vote similarly) </li>
         <li> The majority votes sufficiently as a bloc to enable it … usually to defeat the minority’s preferred candidate. </li>
         </ol>
     </td>    
  </tr>
  <tr> 
      <td> Requirement </td>
      <td> Compactness </td>
      <td> 
         <ul>
         <li> Congressional districts should be compact, meaning they are square shaped and do not have strange protrusions. </li>
         <li> This is a more difficult criteria to evaluate than population deviations or contiguity, as the line between a compact and non-compact district can be more ambiguous. </li>
         <li> Compactness is typically measured with mathematical tests such as Roeck, Schwartzberg, Polbsy-Popper, etc. </li>
         </ul>
      </td>
  </tr>
  <tr>
     <td> Criteria </td>
     <td> Communities of Interest </td>
     <td> 
        <ul>
        <li> A term used to describe any group of people in a location or area with a shared interest, practice, occupation, lifestye, activities, etc. </li>
        <li> Many factors can constitute a community of interest: this can be helpful in that it describes so many qualitative aspects of the underlying population that cannot be observed in census data alone.  </li>
        <li> However, district numbers are fixed and require a certain population, so it is not always possible to preserve every possible community of interest. </li>
        </ul>
     </td>
  </tr>
  <tr>
     <td> Criteria </td>
     <td> Boundary Preservation </td>
     <td> 
        <ul> 
        <li> Districts should follow natural and human boundaries such as rivers, municipality lines, country borders, roads, etc. </li>    
        <li> Generally, districts with preserved boundaries appear less arbitrarily drawn and are more easily understood by the public. </li>    
        </ul>
     </td>
  </tr>
  <tr>
     <td> Criteria </td>
     <td> Cultural and Physical Geography</td>
     <td>
        <ul>
        <li> Cultural and physical geography often play into creating congressional districts where inhabitants have a shared lifestyle/area that they live in.  </li>
        <li> Examples of this in Missouri could include formal and vernacular regions such as St Louis, Kansas City, the Ozarks, the Bootheel, Little Dixie, the Lead Belt, etc. </li>    
        <li> Such districts are often based on shared history between inhabitants, linking back to Communities of Interest. </li>     
        </ul>
     </td>
  </tr>
  <tr> 
     <td> Criteria </td>
     <td> Minimize Splitting </td>
     <td> 
        <ul>
        <li> A straightforward criterion that states counties, cities, and voting districts should be split as minimally as possible. </li>
        <li> Generally, this is in the interest of good governance, as it is much easier for the public to understand unsplit congressional districts and for county officials to conduct elections. </li>    
        </ul>     
     </td>
  </tr>
  <tr>
     <td> Criteria </td>
     <td> Preserving District Cores </td>
     <td>
        <ul>
        <li> Preserving district cores means keeping the bulk of the population within the same district during redistricting.  </li>   
        <li> This is typically a method incorporated in least-change maps. </li>
        </ul>        
     </td> 
  </tr>
  <tr>
    <td> Criteria </td>
    <td> Safe Districts </td>
    <td>
       <ul>
       <li>  This refers to drawing districts that have a strong partisan lean.  </li>  
       <li>  Districts are drawn as such to keep congressional election results consistent. </li>    
       </ul>   
    </td>
  </tr>
  <tr> 
     <td> Criteria </td>
     <td> Competitive/Proportional Districts </td>
     <td> 
        <ul>
        <li> Competitive districts, as the name suggests, are congressional districts drawn as close to 50/50 partisan values as possible.  </li>
        <li> Proportional districts are districts drawn to reflect the margins of statewide elections. </li>    
        </ul>
     </td> 
  </tr>
</table>

<p7> Considering all the criteria and requirements for redistricting (Table 1), one quickly finds that that it is impossible to create a map incorporating all the criteria. Some of these criteria, such as competitiveness and safe districts, outright contradict one another. Typically, whatever entity draws the congressional districts will focus on a few of these criteria during the mapmaking process.  </p7> <br>

<h2> History of the process </h2>

<p8> Touching on some history of congressional redistricting in Missouri towards the end of the 20th century, the process had been plagued by a good deal of stalemates. In both the 1970s and 1980s cycle, the legislature failed to agree on a congressional map. The Democrat dominated state legislature could not create consensus among its caucus members or broker an arrangement with republicans, and ultimately the congressional map was drawn by the courts. In particular, the 1980s cycle dealt with the loss of a congressional district which exacerbated tensions even further. However, in the 1990s and 2000s cycles, Democrats were able to successfully pass maps. </p8>

<p9>  </p9> 

<h3> Redistricting in the new Millenium </h3>

<a href="https://i.imgur.com/3u5ebKr.jpg"><img src="https://i.imgur.com/3u5ebKr.jpg" title="Missouri's Congressional Districts from 2003-2013" class="center"> </a> <br>

<p10> The 2001 redistricting cycle serves as a salient place to begin, as it occurred during a transitionary period in Missouri’s political landscape: the flip of the state legislature from Democrat control to Republican control. This would have stark consequences down the line, but during the 2001 redistricting cycle, legislative power was split between the chambers. While the governor’s seat and the house were still held by Democrats, the Republicans had gained the senate in the previous 2000 election.  </p11> <br> <br>

<p11> The process of passing the map took some bipartisan compromise. Two different maps, HB 1000 (link) and SB 536 (link) were drafted in each chamber respectively. Most of the debate stemmed over how to deal with the congressional districts in the St. Louis area.  </p11> <br> <br>

<p12> In the House, the debate stemmed mainly over how to maintain the two Democrat congressional districts in the St. Louis area. Both the first and the third districts, represented by Democrats, had to expand to be in equal in population to other districts. The House plan had the first expand far west into suburbs, while the third picked up some liberal inner-ring (I170) suburbs. The third also shed some more Republican municipalities in South St. Louis County. The second then would take in all of St. Charles County.  The fifth in Kansas City would have taken in more of Jackson County, leaving only northeast Jackson County in the sixth. The rural districts were generally similar, though they had some minor adjustments as well. The house map (link) was ultimately passed on a partisan vote.  </p12> <br> <br>

<p13> In the Senate, many senators felt that the first congressional district should not expand further west into St. Louis County and should instead take in the rest of St. Louis City, which would then represent a singular community of interest. This would have left the third district more conservative, as parts of South and West St. Louis County would have been used to make up for that population change. The fifth district in Jackson County would have taken in democrat leaning suburbs in Clay County and lose portions of Jackson County. Like in the House plan, the changes to the rural districts in the Senate plan were mainly to maintain minimal population deviations. </p13> <br> <br>

<p14> Ultimately, with a democratic house and governor, compromise was reached with SCS HS HB 1000 (link), which maintained the layout of the first and third district from HCS HB 1000, while incorporating the second district layout from SCS SB 536. The fifth district ultimately took in portions of Cass County. The layouts for the rural districts were also the result of compromise and different from the original bills. </p14> <br> <br>

<p> Looking at the makeup of the districts and how they changed since 1992: </p> <br> 

<ol>
<li> The first congressional district consisted of northern and central corridors of St Louis City as well as northern suburbs in St Louis County. It changed greatly in this cycle, as it was reworked to lose inner ring suburbs and gain more of northwestern St Louis County suburbs such as Breckenridge Hills, Bridgeton, Creve Coeur, Edmunson, Florissant, Frontenac, Hazelwood, Ladue, Maryland Heights, Olivette, Overland, St. Ann, and Woodson Terrace. Although it lost some black population in this change, the district remained the state’s single majority black and most democratic district.  </li>
<li> The second congressional district consisted of western St. Louis County, suburban portions of St. Charles County, and Lincoln County. It gained Lincoln County and more of St. Charles County in this cycle to make up for the parts of St. Louis County it lost. It did, however, gain some South St. Louis County municipalities such as Concord, Crestwood, Grantwood Village, Sappington and parts of Kirkwood and Sunset Hills.  </li>
<li> The third congressional district consisted of South St. Louis City, Central and Southern St. Louis County suburbs, Jefferson County, and Ste. Genevieve County. It gained many liberal inner-ring suburbs in this cycle such as Brentwood, Clayton, Maplewood, Richmond Heights, Rock Hill, and parts of Kirkwood, University City, and Webster Groves. It was a democrat leaning district consisting mainly of white middle- and working-class democrats.  </li>
<li> The fourth congressional district consisted of rural western Missouri, mid Missouri, and Kansas City suburbs and exurbs. It had moved further south in this cycle, gaining Barton, Cedar, Dade, and parts of Polk County, while losing its eastern counties, namely Maries, Miller, Osage, and parts of Camden County to the ninth. It also lost urbanized portions in Cass and Jackson Counties. Although it had a Republican lean, it was represented by a longtime conservative Democrat.   </li>
<li> The fifth congressional district consisted of Kansas City in Jackson County, as well as parts of Independence, Lee’s Summit, and southeastern Jackson County. Parts of suburban Cass County, such as Raymore and Belton, were added into the fifth in this cycle. Like the first and third districts, the fifth was a reliable democrat district.   </li>
<li> The sixth district consisted of rural northwestern Missouri and northern Kansas City and suburbs. Other than losing Ray County and gaining some portions of Jackson County, it remained the same.  </li>
<li> The seventh district consisted of southwestern Missouri, including the Springfield and Joplin areas, as well as portions of Polk and Taney Counties. It grew greatly since the 1990s, and lost Barton, Cedar, Dade, Douglas, and Ozark Counties. It also lost portions of Polk and Taney Counties.    </li>
<li> The eighth congressional district consisted of much of southern and southeastern Missouri, including Cape Girardeau, the Bootheel, Poplar Bluff, and much of the Ozarks. It gained Douglas, Ozark, and Taney Counties while losing Crawford County.  </li>
<li> The ninth congressional district consisted of rural northeastern Missouri, mid Missouri, and St Louis exurbs. It included Hannibal, Kirksville, Columbia, and parts of Lake of the Ozarks. Since it had lost Lincoln County and large parts of St. Charles County to the second, it expanded further south to include Crawford, Maries, Miller, Osage, and parts of Camden County. </li>
</ol> <br> <br>

<h> The 2012 cycle </h>

<a href="https://i.imgur.com/WH8hI3i.jpg"><img src="https://i.imgur.com/WH8hI3i.jpg" title="Missouri's Congressional Districts from 2013-2023" class="center"> </a> <br>

<p> Before it even began, the 2011 redistricting cycle was bound to be saddled with turmoil, as Missouri lost a congressional district after the 2010 US Census reapportionment. When a state loses a congressional district, not only does it have to adjust for existing population deviations, but the remaining districts must also absorb the population of the lost district: this means every district must expand. This also meant one of the nine congressmen at the time would no longer have a seat. </p> <br> <br>

<p> At this point, the Missouri House and Senate had both been controlled by Republicans since 2003. While Democrats held the governorship, it would be the Republicans who had control of the map drawing process. Given the Republican control over the legislature, the proposed redistricting bills in the House, HB 193, (link) and Senate, SB 264, (link) were fairly similar to one another.  </p>

<p> </p>

<ol>
<li> The first district took in all of St Louis City, as well as taking in many of the liberal inner ring (Interstate 170) urban municipalities that it had exchanged out in the previous redistricting cycle. This included Maplewood and parts Clayton, Richmond Heights, Rock Hill, and Webster Groves. The district lost parts of Bridgeton, Creve Coeur, Frontenac, Ladue, Maryland Heights, and Westwood that it had gained in the previous redistricting cycle. With this configuration, it maximized the number of African American or Black residents and remained the most Democrat district in the state. </li>  
<li> The second district took back portions of northwestern and southern St. Louis County that were in the first and third districts respectively. The district retained southern portions of St. Charles County with municipalities such as Cottleville and Weldon Springs, alongside portions of Dardenne Prairie, O’Fallon, St. Charles, and St. Peters. A portion of Jefferson County was added to the second as well, consisting of St. Louis suburbs such as Arnold and Murphy, as well as some unincorporated parts.  </li>
<li> The third congressional district was radically altered to absorb the central Missouri and St Louis exurbs of the old ninth. This meant it no longer contained St. Louis City or St. Louis County, and instead consisted of St. Louis suburbs, exurbs, and parts of central Missouri as far west as the Lake of the Ozarks. Callaway, Cole, Franklin, Gasconade, Lincoln, Maries, Miller, Montgomery, Osage, Warren, and parts of Camden, Jefferson, and St. Charles Counties formed the newly drawn district. The parts of Jefferson County included Imperial down to Crystal City, as well as northwest Jefferson County. In St. Charles, this included parts of Dardenne Prairie, O’Fallon, St. Charles, and St. Peters. The rest of the county not mentioned before were included in the third (e.g. Lake St. Louis and Wentzville).  </li>
<li> The fourth district, like the third, experienced a heavy revamping. While retaining a western and central Missouri focus, it was drawn more into central Missouri. It lost Lafayette, Polk, Ray, Saline, and portions of Camden, Jackson, and Webster Counties. It gained Boone, Cooper, Howard, Randolph as well as portions of Audrain and Cass Counties. Notable changes include losing the state capital, Jefferson City, and gaining the college town, Columbia.  </li>
<li> The fifth district was given a unique configuration – parts of Clay, Lafayette, Ray, and Saline counties were added onto the Kansas City based district. Portions in Cass County, such as Belton and Raymore, as well as part of Jackson County were removed. This rendered the district one of the most unique in the country in terms of rural and urban representation.  </li>
<li> The sixth district took in the rural northeastern counties from the former the ninth district disappeared, namely Adair, Clark, Knox, Lewis, Macon, Marion, Monroe, Pike, Scotland, Shelby, Ralls, and parts of Audrain, creating one large agricultural north Missouri district. In Jackson County, it took in a little more of Lee’s Summit while losing some of Blue Springs. It also lost some Democrat leaning parts of Kansas City in Clay County.   </li>
<li> The seventh district, like in the previous cycle, was the least altered. It took in the rest of Taney and Polk Counties as well as part of Webster County.  </li>
<li> The eighth district added Crawford and Ste. Genevieve Counties, as well as parts of Jefferson County. The portion of Taney County was removed.  </li>
</ol> <br> <br>

<a href="https://i.imgur.com/Xrk6Br4.jpg"><img src="https://i.imgur.com/Xrk6Br4.jpg" title="Missouri's Congressional Districts from 2013-2023" class="center"> </a> <br>

<p> Unlike the 2012 redistricting cycle, Missouri did not suffer from losing a congressional seat during the 2020 US Census apportionment. Republicans held both chambers of the legislature by large majorities and the governor’s seat – it had been a longtime since the conditions to pass a new congressional map were this favorable.    </p> <br> <br>

<p> Despite this, Missouri was one of the last states in the nation to pass a new congressional map. Due to the coronavirus pandemic, the 2020 census data was delayed until September of 2021, and since the governor did not request a special session for congressional redistricting, the process was delayed until the next regular session in January of 2022. In that period, there was copious debate within the Republican caucus over maintaining the “6-2” congressional balance, or six safe seats for Republicans and two safe seats for Democrats; or totally redrawing the map to create a “7-1” map, a map that would disassemble the Kansas City based fifth congressional district to create another Republican district.  </p> <br> <br>

<p>  </p>

<p> The changes to the congressional districts between 2013 and 2023: </p> <br>
<ol>
<li> The first district expanded further into St Louis County. This included parts of municipalities in central and northwestern St Louis County such as Bridgeton, Maryland Heights, Creve Coeur, Frontenac, Ladue, Brentwood, Rock Hill, Webster Groves, Richmond Heights, and unincorporated St Louis County. The district lost Bella Villa, Lemay, Maplewood, and part of Richmond Heights. </li>
<li> The second district expanded west into exurban areas, picking up Franklin County as well as parts of Warren and rural St. Charles Counties. The portion of Jefferson County was removed, as well as some suburban parts of St. Charles County. This shifted the second from being a competitive district to a Republican leaning one.  </li>
<li> The third district remained a mid-Missouri district with St. Louis suburbs, albeit with an altered composition. It now has more of suburban St. Charles County as well as the southern half of Boone County and part of the City of Columbia. Crawford, Cooper, Moniteau, and Washington counties were also added to the third district. The portion of Jefferson County in the third also shifted from being mid Jefferson County to the exurban and rural western portion of Jefferson County. The district lost Lincoln County and parts of Camden County.   </li>
<li> The fourth district regained Lafayette and Saline Counties as well as some eastern portions of Jackson County. The district also gained Howard County, as well as the northern half Boone County and the city of Columbia. Polk County to the south was added back into the district as well. Ray County was removed and placed in the sixth district.  </li>
<li> The fifth district shed its rural counties, namely Lafayette, Ray, and Saline, and took in more suburban portions of Clay and Jackson Counties. In Jackson County, all of Lee’s Summit is now contained in the fifth district. The district became more democrat leaning and more rooted in Kansas City proper.  </li>
<li> The sixth district took in Lincoln, Randolph, and Ray Counties, while losing parts of Clay and Jackson Counties. The district continues to be an agricultural northern Missouri district with some suburban and exurban areas from Kansas City and St. Louis. </li>
<li> The seventh district lost Polk County and took in more of Webster County. The district remained one of the least altered districts.   </li>
<li> The eighth district took in the populated suburbs of Jefferson County by the Mississippi River. This rendered the district as more suburban, as these portion of Jefferson County contain more than half of its population. The district lost Crawford and Washington Counties to facilitate the changes in the third district. </li>    
</ol>

<div id="viewDiv" style="width: 625px; height: 450px;"> </div>

<script src="https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/CDs/MO_CDs_13_23.js" > </script>

<p> This article is still under construction </p> <br> <br>

</body>
</html>
