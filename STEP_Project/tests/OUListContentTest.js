let tabl;
let OUs;
let numRows;

describe('Testing the initButtons function', ()=>{
    beforeEach(function()
    {
        tabl = document.createElement('table');
        for (let i = 0; i < 3; i++)
        {
            tabl.insertRow();
        }
        OUs = tabl.rows;
        numRows = OUs.length;

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
        let row = OUs[0];
        let temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(0);
    })

    it('Should add a button to every row after that', ()=>{
        initButtons(tabl);
        let row = OUs[1];
        let temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(1);
        row = OUs[2];
        temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(1);
    })
})

describe('Testing the addButtons function', ()=>{
    beforeEach(function()
    {
        tabl = document.createElement('table');
        for (let i = 0; i < 3; i++)
        {
            tabl.insertRow();
        }
        OUs = tabl.rows;
        numRows = OUs.length;
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

        addButtons(OUs, numRows);
        let row = OUs[0];
        let temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(0);
    })

    it('Should not add a button to any row that has a button already', ()=>{

        let row = OUs[0];
        let temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(0);

        row = OUs[1];
        temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(1); 

        row = OUs[2];
        temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(1); 

        addButtons(OUs, numRows);

        row = OUs[0];
        temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(0); //should not be equal to 1

        row = OUs[1];
        temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(1); //should not be equal to 2

        row = OUs[2];
        temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(1); //should not be equal to 2
    })

    it('Should add a button to any row that does not have a button except row 0', ()=>{

        let row = OUs[1];
        let temp = row.getElementsByClassName('bClass');
        temp[0].remove();
        expect(temp.length).toEqual(0); 

        row = OUs[2];
        temp = row.getElementsByClassName('bClass');
        temp[0].remove();
        expect(temp.length).toEqual(0); 

        addButtons(OUs,numRows);

        row = OUs[1];
        temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(1); 

        row = OUs[2];
        temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(1); 
    })
}) 

describe('Testing monitorChanges function (mutation observer)', ()=>{
    beforeEach(function()
    {
        tabl = document.querySelector('table[role=grid]');
        OUs = tabl.rows;
    })

    it('Sanity check to ensure that a new row is getting added', ()=>{
        initButtons(tabl);
        monitorChanges();
        tabl.insertRow();
        numRows = OUs.length;
        expect(numRows).toEqual(4);  
    })

    it('Should not result in 0 buttons in any row (except row 0) or more than 1 button in any row and should add a button to a new row automatically', ()=>{
        let row = OUs[0];
        let temp = row.getElementsByClassName('bClass');
        expect(temp.length).toEqual(0);
        for (let i = 1; i < numRows; i++)
        {
            let row = OUs[i];
            let temp = row.getElementsByClassName('bClass');
            expect(temp.length).toEqual(1);
        }
        tabl.remove();
    })
}) 



