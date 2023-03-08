var direction = ["row", "row-reverse", "column", "column-reverse"];
var justify = ["flex-start", "flex-end", "center", "space-between", "space-araund"];
var align = ["stretch", "flex-start", "flex-end", "center", "baseline"];
var wrap = ["nowrap", "wrap", "wrap-reverse"];
var flow = ["holi"]

var botonesContent = [direction, justify, align, wrap, flow];
var countBotonContent = 0;


const opcionesFlexContent = document.querySelectorAll(".opciones-flex-content button");
const opcionesContent = document.querySelector(".opciones-flex");

opcionesFlexContent.forEach((element,i) => {
    countBotonContent++;
    element.addEventListener('click', (e) => {
        opcionesFlexContent.forEach(element1 => {
            element1.removeAttribute('class');
        });
        element.classList.toggle("toggle-option");
        opcionesFlex(i);
    });
});

const opcionesFlex = (a) => {
    opcionesContent.innerHTML = "";
    botonesContent[a].forEach(element => {
        var boton = document.createElement("button");
        var span = document.createElement("span");
        var textS = document.createTextNode(element)
        span.appendChild(textS);
        boton.appendChild(span);
        opcionesContent.appendChild(boton);
    });
};