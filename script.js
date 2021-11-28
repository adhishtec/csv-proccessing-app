// selecting file upload element
const input = document.querySelector('.file-upload-field');

// Eventlistener registered for file upload change event

input.addEventListener('change', handleInputFileEvent);

// Onchange handler
function handleInputFileEvent(e) {
	const file = e.target.files[0];
	if (file.name.split('.')[1].toUpperCase() != 'CSV') {
		alert('Invalid csv file !');
		e.target.parentNode.reset();
		return;
	} else {
		document.querySelector('.file-info').innerHTML =
			'<p>File Name: ' + file.name + ' | ' + file.size + ' Bytes.</p>';
		fileReader(e.target);
	}
}

// Added generic piece to add 2 similar elements in DOM.
function addElement(elementName, className, text, preContent) {
	const newDiv = document.createElement(elementName);
	newDiv.className = className;
	var para = document.createElement('p');
	var pre = document.createElement('pre');
	pre.textContent = preContent;
	var node = document.createTextNode(text);
	para.appendChild(node);
	para.appendChild(pre);
	newDiv.appendChild(para);
	const currentDiv = document.querySelector('.form-container');
	currentDiv.appendChild(newDiv);
}

// added file reader to extract file content.
const fileReader = (file) => {
	const reader = new FileReader();
	reader.onload = function () {
		const text = reader.result;
		processFileText(text);
	};
	reader.readAsText(file.files[0]);
};

// If file is not empty or invalid, this function will process file content and render in UI
function processFileText(text) {
	if (typeof text !== 'string' && !text.length) {
		alert('Invalid text !!');
		return;
	}
	addElement('div', 'file-result', 'Your input text is:', text);
	const matrixArray = text.split('\n');
	if (matrixArray.length) {
		let newMatrix = [];
		for (let oneRow of matrixArray) {
			let modifiedRow = [];
			let oneRowArray = oneRow.split(',');
			oneRowArray.forEach((element) => {
				element !== '0' ? modifiedRow.push(element) : null;
			});
			newMatrix.push(modifiedRow.join(','));
		}

		addElement(
			'div',
			'file-result',
			'Your output text is:',
			newMatrix.join('\n')
		);
	}
}
