let ar = document.getElementById("addRemove");
let s = document.getElementById("select");
/**
 * testing function findPageType
 */
describe('Testing pageType that determines enabling/disabling of buttons depending on URL', ()=>{
  it('Should enable Settings button on appSettings url (case 1)', ()=>{
    let pageType = findPageType("https://admin.google.com/u/4/ac/appsettings/725740718362/videoSettings");
    expect(pageType).toEqual(1);
  })

  it('Should enable Settings button on settings/serviceonoff url (case 1)', ()=>{
    let pageType = findPageType("https://admin.google.com/u/4/ac/settings/serviceonoff?iid=646&aid=725740718362");
    expect(pageType).toEqual(1);
  })

  it('Should enable Add/Remove button on OUlist url (case 0)', ()=>{
    let pageType = findPageType("https://admin.google.com/u/4/ac/orgunits");
    expect(pageType).toEqual(0);
  })
  it('Should disable extension on any other admin console url (case 2)', ()=>{
    let pageType = findPageType("https://admin.google.com/u/4/ac/apps");
    expect(pageType).toEqual(2);
  })
  it('Should disable extension on any other console url (case 2)', ()=>{
    let pageType = findPageType("https://github.com/");
    expect(pageType).toEqual(2);
  })
})

/**
 * testing function disableButtons
 */

describe('Testing enabling and disabling of buttons depending on pageType', ()=>
{
  beforeEach(function() 
  {
    //back to default for future tests
    s = document.getElementById("select");
    ar = document.getElementById("addRemove");
  });

  afterEach(function() 
  {
    //back to default for future tests
    if (s !== null)
    {
      s.disabled = false;
    }
    if (ar !== null)
    {
      ar.disabled = false;
    }
  });

  it('Should disable add/remove button on settings url for pageType 1', ()=>{ 
    disableButtons(s, ar, 1);
    expect(ar.disabled).toBeTruthy();
  })

  it('Should disable select button on settings url for pageType 0', ()=>{ 
    disableButtons(s, ar, 0);
    expect(s.disabled).toBeTruthy();
  })

  it('Should disable neither buttons for pageType 2 as any other url disables extension', ()=>{ 
    disableButtons(s, ar, 2);
    expect(s.disabled).toBeFalsy();
    expect(ar.disabled).toBeFalsy();
    s.remove();
    ar.remove();
  })
})
