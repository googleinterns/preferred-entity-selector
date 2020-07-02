var pageType = undefined;
/** Enum for page types. */
const PAGE_TYPES = {
  ORG_LIST_PAGE: 0,
  SETTINGS_PAGE: 1, // includes onoff page
  OTHER: 2,
};

(function()
{
  checkTabUrl();
  ar = document.getElementById("addRemove");
  injectContent(ar);
}()
);

//Checks url of the current tab to detect settings or OU list page
function findPagecase(givenurl)
{
  let orgunitspage = givenurl.match(/admin.google.com\/u\/[0-9]+\/ac\/orgunits/g);
  let settingspage = givenurl.match(/admin.google.com\/u\/[0-9]+\/ac\/appsettings\/[0-9]+\/.+/g);
  let onoffpage = givenurl.match(/admin.google.com\/u\/[0-9]+\/ac\/settings\/serviceonoff.*/g);
  pageType = PAGE_TYPES.OTHER;
  if (orgunitspage != null) 
  {
    pageType = PAGE_TYPES.ORG_LIST_PAGE;
  }
  else if (settingspage !=null || onoffpage != null)
  {
    pageType=PAGE_TYPES.SETTINGS_PAGE;
  }
  return pageType;
}

// Asynchronous function, calls waitForPagecase for value to be defined
function checkTabUrl()
{
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  let url = tabs[0].url;
  findPagecase(url);
});
waitForPagecase();
}
 
//waits for pageType to become defined
//once value is defined, calls "disableButtons" to disable based on url
function waitForPagecase()
{
  if( pageType == undefined)
  {
    setTimeout(waitForPagecase, 50);
  }
  else
  {
    s = document.getElementById("select");
    ar = document.getElementById("addRemove");
    disableButtons(s, ar, pageType);
  }
}

//disable select or add/remove button based on url
//if neither url matches, background.js disables the extension.
function disableButtons(s, ar, pageType)
{
  // Settings page case --> disable Add/Remove
  if (pageType ==PAGE_TYPES.SETTINGS_PAGE) 
  { 
    if(null != s)
    {
      s.style.backgroundColor = "#4385f5";
    }
    if(null != ar)
    {
      ar.style.backgroundColor = "#7eaaf8";
      ar.disabled = true;
    }
  }

  // OU list page case --> disable select
  if (pageType ==PAGE_TYPES.ORG_LIST_PAGE)
  {
    if(null != s)
    {
      s.style.backgroundColor = "#7eaaf8";
      s.disabled = true;
    }
    if(null != ar)
    {
      ar.style.backgroundColor = "#4385f5";
    }
  }
}

//attach listener to add/remove button
function injectContent(ar)
{
  ar.addEventListener('click', addRemovefunc);     
}
//inject content.js into DOM on click of the add/remove button
function addRemovefunc () 
{
    window.close()
    chrome.tabs.executeScript({
        file: 'content.js'
      }); 
}


