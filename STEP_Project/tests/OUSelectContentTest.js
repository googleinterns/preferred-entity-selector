let tabl;
let orgUnits;
let numRows;

describe('Testing selectClick function called when "select" button is clicked', ()=>
{
    let mockChrome;
    beforeAll(function()
    {
        //initialize mock storage to mimic chrome.storage.sync
        mockChrome = 
        {
            dict: {},
            get : function(arg1, arg2)
            {
                arg2(this.dict);
            },
            set : function(pair)
            {
                for (let key in pair)
                {
                    this.dict[key] = pair[key];
                }
            },
            remove : function(dataid)
            {
                this.dict[dataid]= undefined;
            }
        };

        //initialize the UL to mimic the DOM of the settings page
        numRows = 3;
        tabl = document.createElement('ul');
        tabl.setAttribute("role", "group");
        for (let i = 0; i < numRows; i++)
        {
            const liObj = document.createElement('li');
            const entry = document.createElement('div');
            liObj.innerText = "row"+i;
            entry.setAttribute("data-node-id", i);
            liObj.appendChild(entry);
            tabl.appendChild(liObj);
            let key = 'OU-' + i;
            mockChrome.set({[key]:liObj.innerText})
        }
        document.body.appendChild(tabl);
        storageObj = mockChrome;
    })

    afterAll(function()
    {
        tabl.remove();
    })
    
    it('Should update the mock storage if entity\'s name is changed', ()=>
    {
        tabl = document.querySelector('ul[role=group]'); 
        orgUnits = document.getElementsByTagName("li");
        row = orgUnits[1];
        //save children in temporary variable as changing innerText modifies the node
        let childDiv = row.children[0];

        //rename OU
        row.innerText = "renamed";

        //append child back as innerText change has modified the node
        row.appendChild(childDiv);

        //before selectClick, the dictionary value is row1
        expect(mockChrome.dict['OU-1']).toEqual("row1");
        selectClick();

        //after selectClick, the dictionary value has been updated to renamed
        expect(mockChrome.dict['OU-1']).toEqual("renamed");
    })
})

describe('Testing applyClick function called when "apply" button is clicked', ()=>
{
    let mockRuntime;
    let request;
    var isClicked = false;
    beforeAll(function()
    {
        //initialize mock request object
        request =
        {
            dataId: ["OU-dataContentId", "name"]
        }

        //initialize mock chrome to mimic chrome.runtime.onMessage
        mockRuntime = 
        {
            addListener : function(messageFunction)
            {
                messageFunction(request);
            }
        };

        function clickDetected(event, )
        {
            isClicked = true;
        }
        runtimeObj = mockRuntime;
       
        // initialize the UL to mimic the DOM of the settings page   
        tabl = document.createElement('ul');
        const liObj = document.createElement('li');

        //liObj is the row itself
        liObj.setAttribute("data-content-id", "dataContentId");

        //liObj expected to have 2 children in the DOM
        const childOne = document.createElement('div');
        const childTwo = document.createElement('div');

        //liObj expected to have a grandchild in the DOM
        const grandchildTwo = document.createElement('div');
        grandchildTwo.addEventListener('click',clickDetected);
        childTwo.append(grandchildTwo);
        liObj.append(childOne);
        liObj.append(childTwo);
        tabl.appendChild(liObj);        
        document.body.appendChild(tabl);
    })

    afterAll(function()
    {
        tabl.remove();
    })
    
    it('should perform a click on the required OU', ()=>
    {
        applySelect();
        expect(isClicked).toBe(true);
    })
})
