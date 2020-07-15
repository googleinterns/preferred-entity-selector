/*global storageObj,addButtons,addRemoveButtonClick,monitorChanges*/
/*eslint no-undef: "error"*/

let tabl;
let orgUnits;
let numRows;

describe('Testing the addButtons function for OU list', ()=>
{
    let mockChrome;
    beforeEach(function()
    {
        numRows = 3;
        tabl = document.createElement('table');
        tabl.setAttribute('role', 'grid');
        for (let i = 0; i < numRows; i++)
        {
            tabl.insertRow();
        }
        orgUnits = tabl.rows;
        orgUnits[1].setAttribute("data-row-id", "OU-0")
        orgUnits[2].setAttribute("data-row-id", "OU-1")
        document.body.appendChild(tabl);

        //initialize mock storage
        mockChrome = {
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
                this.dict[dataid] = undefined;
            }
        };

        //initialize arguments for addButtons
        storageObj = mockChrome;
        tabl.addEventListener('click', addRemoveButtonClick);
    });

    afterEach(function()
    {
        tabl.remove();
    });

    it('Should add "+" buttons to all rows except first', ()=>
    {
        //call addButtons with mock Storage
        addButtons();
        //no buttons on the first (header) row
        let row = orgUnits[0];
        let plus = row.getElementsByClassName('pClass');
        let minus = row.getElementsByClassName('mClass');
        expect(plus.length+minus.length).toEqual(0);

        //check that there are "+" buttons on each row
        for (let i = 1; i < numRows; i++ )
        {
            row = orgUnits[i];
            plus = row.getElementsByClassName('pClass');
            expect(plus.length).toEqual(1);
        }
    });

    it('Should store OU key-value pair in mock storage when "+" button clicked', ()=>
    {
        //call addButtons with mock Storage
        addButtons();

        let row = orgUnits[1];
        let plus = row.getElementsByClassName('pClass')[0];
        expect(plus.getAttribute('class')).toEqual('pClass');

        //add OU to preferred entities by clicking on plus
        plus.click();

        //check if OU is in storage
        expect(mockChrome.dict["OU-0"] !== undefined).toBeTruthy();
    });

    it('Should change "+" button to a "-" button when clicked', ()=>
    {
        //call addButtons with mock Storage
        addButtons();

        let row = orgUnits[1];
        let plus = row.getElementsByClassName('pClass')[0];
        expect(plus.getAttribute('class')).toEqual('pClass');

        //add OU to preferred entities by clicking on plus
        plus.click();

        //button must have become a "-" button
        expect(plus.getAttribute('class')).toEqual('mClass');
    });

    it('Should remove OU key-value pair from mock storage when "-" button clicked', ()=>
    {
        //call addButtons with mock Storage
        addButtons();

        let row = orgUnits[1];
        let plus = row.getElementsByClassName('pClass')[0];

        //add OU to preferred entities by clicking on plus
        plus.click();

        //click again to remove OU from storage
        plus.click();

        //check if OU is in storage
        expect(mockChrome.dict["OU-0"] === undefined).toBeTruthy();
    });

    it('Should change the "-" button to a "+" button when clicked', ()=>
    {
        //call addButtons with mock Storage
        addButtons();
        
        let row = orgUnits[1];
        let plus = row.getElementsByClassName('pClass')[0];

        //add OU to preferred entities by clicking on plus
        plus.click();

        //click again to remove OU from storage
        plus.click();

        //button must have become "+" button
        expect(plus.getAttribute('class')).toEqual('pClass');
    });

    it('Should not add a button to any row that has a button already', ()=>
    {
        addButtons();

        let row = orgUnits[0];
        let plusButtons = row.getElementsByClassName('pClass');
        let minusButtons = row.getElementsByClassName('mClass');
        expect(plusButtons.length+minusButtons.length).toEqual(0);

        row = orgUnits[1];
        plusButtons = row.getElementsByClassName('pClass');
        minusButtons = row.getElementsByClassName('mClass');
        expect(plusButtons.length+minusButtons.length).toEqual(1);

        row = orgUnits[2];
        plusButtons = row.getElementsByClassName('pClass');
        minusButtons = row.getElementsByClassName('mClass');
        expect(plusButtons.length+minusButtons.length).toEqual(1);

        addButtons(orgUnits, numRows);

        row = orgUnits[0];
        plusButtons = row.getElementsByClassName('pClass');
        minusButtons = row.getElementsByClassName('mClass');
        expect(plusButtons.length+minusButtons.length).toEqual(0); //should not be equal to 1

        row = orgUnits[1];
        plusButtons = row.getElementsByClassName('pClass');
        minusButtons = row.getElementsByClassName('mClass');
        expect(plusButtons.length+minusButtons.length).toEqual(1); //should not be equal to 2

        row = orgUnits[2];
        plusButtons = row.getElementsByClassName('pClass');
        minusButtons = row.getElementsByClassName('mClass');
        expect(plusButtons.length+minusButtons.length).toEqual(1); //should not be equal to 2
    });
});

describe('Testing addButtons function for groups list page', ()=>
{
    let mockChrome;
    beforeEach(function()
    {
        numRows = 3;
        tabl = document.createElement('table');
        tabl.setAttribute('role', 'grid');
        for (let i = 0; i < numRows; i++)
        {
            tabl.insertRow();
        }
        groups = tabl.rows;
        groups[1].setAttribute("data-row-id", "group-0")
        groups[2].setAttribute("data-row-id", "group-1")
        document.body.appendChild(tabl);

        //initialize mock storage
        mockChrome = {
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
                this.dict[dataid] = undefined;
            }
        };

        //initialize arguments for addButtons
        storageObj = mockChrome;
        tabl.addEventListener('click', addRemoveButtonClick);
    })

    afterEach(function()
    {
        tabl.remove();
    });

    it('Should add/remove from storage for groups', ()=>
    {
        //call addButtons with mock Storage
        addButtons();

        let row = groups[1];
        let plus = row.getElementsByClassName('pClass')[0];

        //add OU to preferred entities by clicking on plus
        plus.click();

        //check if OU is in storage
        expect(mockChrome.dict["group-0"] !== undefined).toBeTruthy();

        //click again to remove OU from storage
        plus.click();
        expect(mockChrome.dict["group-0"] === undefined).toBeTruthy();
    });  
});

describe('Testing addButtons function for users list page', ()=>
{
    let mockChrome;
    beforeEach(function()
    {
        numRows = 3;
        tabl = document.createElement('table');
        tabl.setAttribute('role', 'grid');
        for (let i = 0; i < numRows; i++)
        {
            tabl.insertRow();
        }
        users = tabl.rows;
        users[1].setAttribute("data-row-id", "user-0")
        users[2].setAttribute("data-row-id", "user-1")
        document.body.appendChild(tabl);

        //initialize mock storage
        mockChrome = {
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
                this.dict[dataid] = undefined;
            }
        };

        //initialize arguments for addButtons
        storageObj = mockChrome;
        tabl.addEventListener('click', addRemoveButtonClick);
    })

    afterEach(function()
    {
        tabl.remove();
    });

    it('Should add/remove from storage for users', ()=>
    {
        //call addButtons with mock Storage
        addButtons();

        let row = users[1];
        let plus = row.getElementsByClassName('pClass')[0];

        //add OU to preferred entities by clicking on plus
        plus.click();

        //check if OU is in storage
        expect(mockChrome.dict["user-0"] !== undefined).toBeTruthy();

        //click again to remove OU from storage
        plus.click();
        expect(mockChrome.dict["user-0"] === undefined).toBeTruthy();
    });  
});

describe('Testing monitorChanges function (mutation observer)', ()=>{
    beforeEach(function()
    {
        numRows = 3;
        tabl = document.createElement('table');
        tabl.setAttribute('role', 'grid');
        for (let i = 0; i < numRows; i++)
        {
            tabl.insertRow();
        }
        orgUnits = tabl.rows;
        for(let i = 0; i < numRows; i++)
        {
            orgUnits[i].setAttribute('data-row-id', i);
        }
        document.body.appendChild(tabl);
    });

    afterAll(function()
    {
        tabl.remove();
    });


    it('Should add a button to a newly visible row without adding extra buttons to other rows', ()=>{

        addButtons();
        monitorChanges();
        tabl.insertRow();
        for(let i = 0; i < numRows; i++)
        {
            orgUnits[i].setAttribute('data-row-id', i);
        }
        numRows = orgUnits.length;
        expect(numRows).toEqual(4);  
        let row = orgUnits[0];
        let plusButtons = row.getElementsByClassName('pClass');
        let minusButtons = row.getElementsByClassName('mClass');
        expect(plusButtons.length+minusButtons.length).toEqual(0);

        //checking that there's only one button on every present row
        for (let i = 1; i < numRows-1; i++)
        {
            let row = orgUnits[i];
            let plusButtons = row.getElementsByClassName('pClass');
            let minusButtons = row.getElementsByClassName('mClass');
            expect(plusButtons.length+minusButtons.length).toEqual(1);
        }

        //checking that there's a button added on the newly inserted row 
        //requires setInterval because mutationObserver works asynchronously
        setInterval(function()
        { 
            row = orgUnits[numRows-1];
            plusButtons = row.getElementsByClassName('pClass');
            minusButtons = row.getElementsByClassName('mClass');
            expect(plusButtons.length+minusButtons.length).toEqual(1);
        }, 1000);
    });
});
