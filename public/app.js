import {
    vistaSinVincular,
    vistaVinculado,
    estructuraTabla,
    formularioAgregarContacto,
    formularioEditarContacto
} from "./components.js"

// Descomenta la línea de abajo para mostrar la vista sin vincular
document.getElementById("vistaCuentaUsuario").innerHTML = vistaSinVincular();
// Descomenta la línea de abajo para mostrar la vista cuando ya está vinculado
//document.getElementById("vistaCuentaUsuario").innerHTML = vistaVinculado();