import {
    vistaSinVincular,
    vistaVinculado,
    estructuraTabla,
    filaTabla,
    formularioAgregarContacto,
    formularioEditarContacto
} from "./components.js"

class App {
    constructor(provider, userAccount) {
        this._web3Provider = provider;
        this._userAccount = userAccount;
    }

    async init() {
        await this._loadContract();
        await this._setViews();
    }

    async _setViews() {
        // Muestra la dirección del usuario
        document.querySelector("#vistaCuentaUsuario").innerHTML = vistaVinculado(this._userAccount);
        // Muestra formulario para agregar contactos
        await this._setViewAddContact();
        // Agrega funcionalidad al botón de actualizar
        document.querySelector("#btnActualizar").addEventListener("click", async () => {
            // Cuando se presione se vuelve a cargar la lista de contactos
            await this.getContacts();
        });
        // Muestra la lista de contactos
        await this.getContacts();
    }

    async _setViewAddContact() {
        // Muestra el formulario para agregar un contacto
        document.querySelector("#vistaFormulario").innerHTML = formularioAgregarContacto();
        // Agrega funcionalidad al botón de agregar
        document.querySelector("#enviar").addEventListener("click", async () => {
            // Se obtiene los datos
            const nombre = document.getElementsByName("nombre")[0].value;
            const apellido = document.getElementsByName("apellido")[0].value;
            const telefono = document.getElementsByName("telefono")[0].value;
            const correo = document.getElementsByName("correo")[0].value;
            let cuenta = document.getElementsByName("cuenta")[0].value;
            if (cuenta === "") {
                cuenta = "0x0000000000000000000000000000000000000000";
            }
            // Se envian al método para agregar
            await this.createContact(nombre, apellido, telefono, correo, cuenta);
        });
    }

    async _loadContract() {
        try {
            const result = await fetch("Contacts.json");
            const contactsJSON = await result.json();
            let contracts = {};
            contracts.ContactsContract = TruffleContract(contactsJSON);
            contracts.ContactsContract.setProvider(this._web3Provider);
            this._contactsContract = await contracts.ContactsContract.deployed();
        } catch(error) {
            console.log(error);
        }
    }

    async getContacts() {
        // Agrega la estructura de tabla
        document.querySelector("#estructuraTabla").innerHTML = estructuraTabla();
        // Se pide los contactos
        const contacts = await this._contactsContract.getContacts({from: this._userAccount});
        // Se obtiene el lugar donde mostrar los contactos
        let cuerpoTabla = document.querySelector("#cuerpoTabla");
        // Se agrega cada uno a la tabla
        for (let i=0; i<contacts[0].toNumber(); i++) {
            cuerpoTabla.innerHTML = cuerpoTabla.innerHTML + filaTabla(
                i+1,
                contacts[1][i]["firstName"],
                contacts[1][i]["lastName"],
                contacts[1][i]["telephoneNumber"],
                contacts[1][i]["email"],
                contacts[1][i]["account"]
            );
        }
        // Se agrega funcionalidad a los botones
        for (let i=0; i<contacts[0].toNumber(); i++) {
            // Se agrega el evento para actualizar
            document.querySelector(`#btnEdit${i+1}`).addEventListener("click", () => {
                // Carga el formulario de editar con la información del contacto
                document.querySelector("#vistaFormulario").innerHTML = formularioEditarContacto(
                    i+1,
                    contacts[1][i]["firstName"],
                    contacts[1][i]["lastName"],
                    contacts[1][i]["telephoneNumber"],
                    contacts[1][i]["email"],
                    contacts[1][i]["account"]
                );
                // Agrega funcionalidad al botón de cancelar
                document.querySelector("#cancelar").addEventListener("click", async () => {
                    // Muestra formulario para agregar contactos
                    await this._setViewAddContact();
                });
                // Agrega funcionalidad al botón de enviar
                document.querySelector("#enviar").addEventListener("click", async () => {
                    // Se obtienen los datos
                    const id = document.getElementsByName("id")[0].value;
                    const nombre = document.getElementsByName("nombre")[0].value;
                    const apellido = document.getElementsByName("apellido")[0].value;
                    const telefono = document.getElementsByName("telefono")[0].value;
                    const correo = document.getElementsByName("correo")[0].value;
                    let cuenta = document.getElementsByName("cuenta")[0].value;
                    if (cuenta === "") {
                        cuenta = "0x0000000000000000000000000000000000000000";
                    }
                    // Se envian al metodo para editar
                    await this.updateContact(
                        id,
                        nombre,
                        apellido,
                        telefono,
                        correo,
                        cuenta
                    );
                });
            });
            // Se agrega el evento para eliminar
            document.querySelector(`#btnDelete${i+1}`).addEventListener("click", async () => {
                // Elimina el contacto
                await this.deleteContact(i+1);
            });
        }
        // Datatables
        $(document).ready( function () {
            $('#tabla').DataTable();
        } );
    }

    async createContact(nombre, apellido, telefono, correo, cuenta) {
        try {
            // Se agrega el contacto
            const result = await this._contactsContract.addContact(
                nombre,
                apellido,
                telefono,
                correo,
                cuenta,
                {from: this._userAccount}
            );
            // Se actualiza la lista de contactos
            this.getContacts();
        } catch (error) {
            console.log(error);
        }
    }

    async updateContact(id, nombre, apellido, telefono, correo, cuenta) {
        try {
            // Se actualiza el contacto
            const result = await this._contactsContract.updateContact(
                id,
                nombre,
                apellido,
                telefono,
                correo,
                cuenta,
                {from: this._userAccount}
            );
            // Se actualiza la lista de contactos
            this.getContacts();
        } catch (error) {
            console.log(error);
        }
    }

    async deleteContact(id) {
        try {
            // Se elimina el contacto
            const result = await this._contactsContract.deleteContact(
                id,
                {from: this._userAccount}
            );
            // Se actualiza la lista de contactos
            this.getContacts();
        } catch (error) {
            console.log(error);
        }
    }
}

// Aparece todo limpio
let vistaCuentaUsuario = document.querySelector("#vistaCuentaUsuario");
vistaCuentaUsuario.innerHTML = vistaSinVincular();
let btnContectar = vistaCuentaUsuario.querySelector("#conectar");
btnContectar.addEventListener("click", async () => {
    // Verificar Web3
    if(window.ethereum) {
        // Pedir conexion
        const accounts = await window.ethereum.request({
           method: "eth_requestAccounts",
        });
        // Si hay conexion entonces crea una instancia de la App
        let app = new App(window.ethereum, accounts[0]);
        await app.init();
    } else {
        alert("No tienes instalado ninguna herramienta de Ethereum.");
    }
});
