formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    
    var nome = document.getElementById('nome').value;
    var value = document.getElementById('value').value;
    var type = document.getElementById('Type').value;

    console.log('Nome:', nome);
    console.log('value', value);
    console.log('Type:', type);
    
});
function styles(){
let style = `
    <style>
    html{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    </style> 
    `
    let body = document.getElementsByTagName('body');
    body.innerHTML = `
    <style>
    html{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #000000;
    }
    </style> 
    `
    
    
    
}
styles();