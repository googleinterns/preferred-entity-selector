let tabl;
let orgUnits;
let numRows;

describe('Testing the initButtons and addButtons function', ()=>
{
    beforeEach(function()
    {
        numRows = 3;
        tabl = document.createElement('table');
        tabl.setAttribute("role", "grid");
        for (let i = 0; i < numRows; i++)
        {
            tabl.insertRow();
        }
        orgUnits = tabl.rows;
        for(let i = 0; i < numRows; i++)
        {
            orgUnits[i].setAttribute("data-row-id", i);
        }
        document.body.appendChild(tabl);
    })

    afterEach(function()
    {
        tabl.remove();
    })

    it('Should add "+" buttons to all rows except first, should store OU on clicking "+" button and change button to "-", should remove OU from storage on clicking "-"', ()=>
    {
        //initialize mock storage
        var mockChrome = {
            dict: {},
            get : function(arg1, arg2)
            {
                arg2(this.dict);
            },
            set : function(pair)
            {
                for (let key in pair)
                {
                    mockChrome.dict[key] = pair[key];
                }
            },
            remove : function(dataid)
            {
                this.dict[dataid]= undefined;
            }
          };

        //initialize arguments for addButtons
        OBJ = mockChrome;
        tabl.addEventListener('click',addRemoveButtonClick);
        let OUs = tabl.rows;
        let numRows = OUs.length;

        //call addButtons with mock Storage
        addButtons(tabl, OUs, numRows, mockChrome);

        //no buttons on the first (header) row
        let row = OUs[0];
        let plus = row.getElementsByClassName('pClass');
        let minus = row.getElementsByClassName('mClass');
        expect(plus.length+minus.length).toEqual(0);

        //check that there are "+" buttons on each row
        for (i = 1; i < 3; i++ )
        {
            row = OUs[i];
            plus = row.getElementsByClassName('pClass');
            expect(plus.length).toEqual(1);
        }

        row = OUs[1];
        plus = row.getElementsByClassName('pClass')[0];
        expect(plus.getAttribute('class')).toEqual('pClass');

        //add OU to preferred entities by clicking on plus
        plus.click();

        //button must have become a "-" button
        expect(plus.getAttribute('class')).toEqual('mClass');

        //check if OU is in storage
        expect(mockChrome.dict[1]!==undefined).toBeTruthy();

        //click again to remove OU from storage
        plus.click();

        //button must have become "+" button
        expect(plus.getAttribute('class')).toEqual('pClass');

        //check if OU is in storage
        expect(mockChrome.dict[1]===undefined).toBeTruthy();
    })

    it('Should not add a button to any row that has a button already', ()=>
    {

        initButtons(tabl);

        let row = orgUnits[0];
        let plusButtons = row.getElementsByClassName('pClass');
        let minusButtons = row.getElementsByClassName('mClass')
        expect(plusButtons.length+minusButtons.length).toEqual(0);

        row = orgUnits[1];
        plusButtons = row.getElementsByClassName('pClass');
        minusButtons = row.getElementsByClassName('mClass')
        expect(plusButtons.length+minusButtons.length).toEqual(1);

        row = orgUnits[2];
        plusButtons = row.getElementsByClassName('pClass');
        minusButtons = row.getElementsByClassName('mClass')
        expect(plusButtons.length+minusButtons.length).toEqual(1);

        addButtons(orgUnits, numRows);

        row = orgUnits[0];
        plusButtons = row.getElementsByClassName('pClass');
        minusButtons = row.getElementsByClassName('mClass')
        expect(plusButtons.length+minusButtons.length).toEqual(0); //should not be equal to 1

        row = orgUnits[1];
        plusButtons = row.getElementsByClassName('pClass');
        minusButtons = row.getElementsByClassName('mClass')
        expect(plusButtons.length+minusButtons.length).toEqual(1); //should not be equal to 2

        row = orgUnits[2];
        plusButtons = row.getElementsByClassName('pClass');
        minusButtons = row.getElementsByClassName('mClass')
        expect(plusButtons.length+minusButtons.length).toEqual(1); //should not be equal to 2
    })
}) 


//TODO: Make tests in this section independent.
//TODO: To be modified to accommodate Chrome Storage

// describe('Testing monitorChanges function (mutation observer)', ()=>{
//     beforeEach(function()
//     {
//         tabl = document.querySelector('table[role=grid]');
//         orgUnits = tabl.rows;
//     })

//     it('Sanity check to ensure that a new row is getting added', ()=>{
//         initButtons(tabl);
//         monitorChanges();
//         tabl.insertRow();
//         numRows = orgUnits.length;
//         expect(numRows).toEqual(4);  
//         let row = orgUnits[0];
//         let temp = row.getElementsByClassName('bClass');
//         expect(temp.length).toEqual(0);
//     })

//     it('Should not result in 0 buttons in any row (except row 0) or more than 1 button in any row and should add a button to a new row automatically', ()=>{
//         let row = orgUnits[0];
//         let temp = row.getElementsByClassName('bClass');
//         expect(temp.length).toEqual(0);
//         for (let i = 1; i < numRows; i++)
//         {
//             let row = orgUnits[i];
//             let temp = row.getElementsByClassName('bClass');
//             expect(temp.length).toEqual(1);
//         }
//         tabl.remove();
//     })
// }) 



