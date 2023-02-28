// EDITOR DE CODIGO EN EL AREA DE PRUEBAS
var editor = CodeMirror(document.getElementById("editor"), {
    lineNumbers: true,
    mode: "xml",
    theme: "dracula"
});

var exampleHtml = "<h1>Bienvenido a mi página web</h1>";
editor.setValue(exampleHtml);

actualizarVistaPrevia();

editor.on("change", function() {
    actualizarVistaPrevia();
});

function actualizarVistaPrevia() {
    var preview = document.getElementById("preview");
    var codigoHtml = editor.getValue();
    preview.innerHTML = codigoHtml;

    preview.style = " border: 5px solid var(--fondo2)  !important;";
}


// BOTON DE COPIAR EN LAS FILAS DE LA TERCER COLUMMNA

  const copyTemplate = document.querySelector('#copy-template');
  const copyCells = document.querySelectorAll('table td:last-child');
  
  copyCells.forEach(cell => {
    const cellText = cell.textContent;
    const copyNode = document.importNode(copyTemplate.content, true);
    copyNode.querySelector('.cell-text').textContent = cellText;
    copyNode.querySelector('.copy-button').addEventListener('click', (e) => {

        var boton = e.target.querySelector('.tooltip');
        boton.textContent = '¡Copiado!';
            setTimeout(function() {
                boton.innerHTML = "Copiar";
            }, 1000);

      navigator.clipboard.writeText(cellText);
    });
    cell.parentNode.replaceChild(copyNode, cell);
  });