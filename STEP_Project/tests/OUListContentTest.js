let tabl;
let OUs;
let numRows;

describe('Testing the addButtons function', ()=>{
    beforeEach(function()
    {
        tabl = document.querySelector('table[role=grid]');
        OUs = tabl.rows;
        numRows = OUs.length;
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

        tabl.remove();
    })
}) 
