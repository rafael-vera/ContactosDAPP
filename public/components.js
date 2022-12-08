export function vistaSinVincular() {
    return `<h1>Sin vincular</h1>`;
}

export function vistaVinculado(cuenta) {
    return `<h1>Vinculado</h1>`;
}

export function estructuraTabla() {
    return `<table id="tabla" class="table table-striped table-bordered text-center">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                        <th>Cuenta</th>
                    </tr>
                </thead>
                <tbody id="cuerpoTabla">
                </tbody>
            </table>`;
}

export function formularioAgregarContacto() {
    return `<h3 class="mb-5">Agregar Contacto</h3>
            <div id="formulario">
                <div class="d-flex justify-content-evenly my-3">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="floating-nombre" name="nombre" required>
                        <label for="floating-nombre">Nombre</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" class="form-control" id="floating-apellido" name="apellido" required>
                        <label for="floating-apellido">Apellido</label>
                    </div>
                </div>
                <div class="form-floating mb-3">
                    <input type="tel" class="form-control" id="floating-telefono" name="telefono" required>
                    <label for="floating-telefono">Telefono</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floating-correo" name="correo" required>
                    <label for="floating-correo">Correo</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floating-cuenta" name="cuenta" required>
                    <label for="floating-cuenta">Cuenta de blockchain</label>
                </div>
                <button type="button" id="enviar" class="btn btn-success">Agregar</button>
            </div>`;
}

export function formularioEditarContacto(id, nombre, apellido, telefono, correo, cuenta) {
    return `<h3 class="mb-5">Editar Contacto</h3>
            <div id="formulario">
                <div class="d-flex justify-content-evenly my-3">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="floating-nombre" name="nombre" value="${nombre}" required>
                        <label for="floating-nombre">Nombre</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" class="form-control" id="floating-apellido" name="apellido" value="${apellido}" required>
                        <label for="floating-apellido">Apellido</label>
                    </div>
                </div>
                <div class="form-floating mb-3">
                    <input type="tel" class="form-control" id="floating-telefono" name="telefono" value="${telefono}" required>
                    <label for="floating-telefono">Telefono del contacto</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floating-correo" name="correo" value="${correo}" required>
                    <label for="floating-correo">Correo del contacto</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floating-cuenta" name="cuenta" value="${cuenta}" required>
                    <label for="floating-cuenta">Cuenta de blockchain</label>
                </div>
                <input type="hidden" name="id" value="${id}">
                <div class="d-flex justify-content-evenly my-3">
                    <button type="button" id="cancelar" class="btn btn-danger">Cancelar</button>
                    <button type="button" id="enviar" class="btn btn-success">Editar</button>
                </div>
            </div>`;
}