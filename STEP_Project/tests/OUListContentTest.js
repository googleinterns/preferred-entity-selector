let tabl;
let orgUnits;
let numRows;

describe('Testing the initButtons function', ()=>{
    beforeEach(function()
    {
        tabl = document.createElement('table');
        numRows = 3;
        for (let i = 0; i < numRows; i++)
        {
            tabl.insertRow();
        }
        orgUnits = tabl.rows;

    })

    afterEach(function()
    {
        for (let i = 0; i < numRows; i++)
        {
            tabl.deleteRow(0);
        }
    })

    it('Should not add a button to the first row', ()=>{
        initButtons(tabl);
        let row = orgUnits[0];
        let temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(0);
    })

    it('Should add a button to every row after that', ()=>{
        initButtons(tabl);
        let row = orgUnits[1];
        let temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(1);
        row = orgUnits[2];
        temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(1);
    })
})

describe('Testing the addButtons function', ()=>{
    beforeEach(function()
    {
        numRows = 3;
        tabl = document.createElement('table');
        for (let i = 0; i < numRows; i++)
        {
            tabl.insertRow();
        }
        orgUnits = tabl.rows;
        initButtons(tabl);
    })

    afterEach(function()
    {
        for (let i = 0; i < numRows; i++)
        {
            tabl.deleteRow(0);
        }
    })

    it('Should not add a button to the first row', ()=>{

        addButtons(orgUnits, numRows);
        let row = orgUnits[0];
        let temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(0);
    })

    it('Should not add a button to any row that has a button already', ()=>{

        let row = orgUnits[0];
        let temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(0);

        row = orgUnits[1];
        temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(1); 

        row = orgUnits[2];
        temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(1); 

        addButtons(orgUnits, numRows);

        row = orgUnits[0];
        temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(0); //should not be equal to 1

        row = orgUnits[1];
        temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(1); //should not be equal to 2

        row = orgUnits[2];
        temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(1); //should not be equal to 2
    })

    it('Should add a button to any row that does not have a button except row 0', ()=>{

        let row = orgUnits[1];
        let temp = row.getElementsByClassName('bClass');
        temp[0].remove();
        expect(temp.length).toEqual(0); 

        row = orgUnits[2];
        temp = row.getElementsByClassName('bClass');
        temp[0].remove();
        expect(temp.length).toEqual(0); 

        addButtons(orgUnits,numRows);

        row = orgUnits[1];
        temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(1); 

        row = orgUnits[2];
        temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(1); 
    })
}) 


//TODO: Make tests in this section independent.
describe('Testing monitorChanges function (mutation observer)', ()=>{
    beforeEach(function()
    {
        tabl = document.querySelector('table[role=grid]');
        orgUnits = tabl.rows;
    })

    it('Sanity check to ensure that a new row is getting added', ()=>{
        initButtons(tabl);
        monitorChanges();
        tabl.insertRow();
        numRows = orgUnits.length;
        expect(numRows).toEqual(4);  
        let row = orgUnits[0];
        let temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(0);
    })

    it('Should not result in 0 buttons in any row (except row 0) or more than 1 button in any row and should add a button to a new row automatically', ()=>{
        let row = orgUnits[0];
        let temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(0);
        for (let i = 1; i < numRows; i++)
        {
            let row = orgUnits[i];
            let temp = row.getElementsByClassName('bClass');
            expect(temp.length).toEqual(1);
        }
        tabl.remove();
    })
}) 



