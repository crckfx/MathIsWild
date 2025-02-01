# scroll jacking
this feature only works properly on firefox.
- there are bugs with chrome where the snap margins are not respected
- lots of research amounted to "chromiums's scroll snapping implementation is currently buggy"

## 1. scroll-jack.html
- this one uses 2 css docs; *scroll-jack.css* and *gSnap.css*
- this is the **first** attempt to do scroll jacking 
- it uses the Lachoutlaws method of styling elements' background image
- it uses a special "content" wrapping to place the header inside an element (hacky)

## 2. scroll-jack-2.html
- one css doc: *sj2.css*
- uses the **.full-page** wrapper straight onto the body

## 3. scroll-jack-3.html
- one css doc: *sj2.css*
- uses the site's **page wrapper** 

## 4. scroll-jack-4.html
- one css doc: *sj2.css*
- uses **.full-page** and a fixed header