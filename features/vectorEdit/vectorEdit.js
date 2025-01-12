
// svg-container
// editableSVG
// "code-form"
const svgContainer = document.querySelector('.svg-container');
const editableSVG = document.querySelector('.editableSVG');
const codeForm = document.querySelector('.code-form');
// const mover = document.querySelector('.mover');
console.log(svgContainer);
console.log(editableSVG);
// console.log(mover);
console.log(codeForm);


codeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitCodeForm();
});

function submitCodeForm() {
    console.log('code form submitted');
    // const formattedShader = readShaderFromForm();   // format the form to make sure it works idk lol
    const formattedFormData = readFormData(codeForm);

    console.log(formattedFormData);
    editableSVG.innerHTML = formattedFormData;
}

function readFormData(form) {
    // get data from the form
    const formData = new FormData(form);

    // Extract the 'stuff' field value from formData
    const code = formData.get('stuff');
    // Replace newlines with actual newlines for console logging
    const formattedCode = code.trim().replace(/(?:\r\n|\r|\n)/g, '\n');
    // console.log(formattedCode);
    // reloadFragShader(formattedShader);
    return formattedCode;
}