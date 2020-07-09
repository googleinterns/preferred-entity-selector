let storageObj;
if (chrome.storage !== undefined)
{
    storageObj = chrome.storage.sync;
}

/**
 * Accesses chrome storage and displays the form of preferred entities with radio buttons
 */
function createForm()
{
	storageObj.get(null, function (data) 
	{ 
		let keys = Object.keys(data);
		let numKeys = keys.length;

		let selectForm = document.getElementById('radioButtons');

		for (let i = 0; i < numKeys; i++)
		{
			let elt = document.createElement('input');
			elt.setAttribute("type", "radio");
			elt.setAttribute("value", keys[i]);
			elt.setAttribute("name", "preferred");

			let label = document.createElement('label');
			label.appendChild(elt);
			let OUName = document.createTextNode(data[keys[i]]);
	    	label.appendChild(OUName);

			selectForm.appendChild(label);
			let breakLine = document.createElement('br');
			selectForm.appendChild(breakLine);
		}
	});
}

/**
 * Adds a listener to 'applyButton' in the extension that executes 'applyFunc' on click. 
 * @param {button object} applyButton - Button on the popup that allows the admin to choose a preferred entity.
 */
function applyListener(applyButton)
{
	applyButton.addEventListener('click', applyFunc);
}

/**
 * Gets the dataRowId from the name of the selected entity and sends it to the content script
 */
function applyFunc()
{
	let selectForm = document.getElementById('radioButtons');
	let dataRowId = null;
	storageObj.get(null, function (data)
	{
		let selectForm = document.getElementById('radioButtons');
		let numButtons = selectForm.length;

		for (let i = 0; i < numButtons; i++)
		{
			if (selectForm[i].checked == true)
			{
				dataRowId = selectForm[i].value;
				break;
			}
		}

		if (dataRowId == null)
		{
			alert('Please choose an OU');
		}
		else
		{
			//TODO: Send dataRowId to content script (message passing)
		}
	})
	return dataRowId; //required for testing purposes
}

(function()
{
  createForm();
  let applyButton = document.getElementById("apply");
  applyListener(applyButton);
}()
);
