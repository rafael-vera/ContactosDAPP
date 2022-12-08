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
        // Muestra el formulario para agregar un contacto
        document.querySelector("#vistaFormulario").innerHTML = formularioAgregarContacto();
        // Agrega funcionalidad al botón de agregar
        document.querySelector("#enviar").addEventListener("click", () => {
            // Se obtiene los datos
            // Se envian al método para agregar
        });
        // Agrega funcionalidad al botón de actualizar
        document.querySelector("#btnActualizar").addEventListener("click", async () => {
            // Cuando se presione se vuelve a cargar la lista de contactos
            await this.getContacts();
        });
        // Muestra la lista de contactos
        await this.getContacts();
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
            //cuerpoTabla.innerHTML = cuerpoTabla.innerHTML + filaTabla(i+1, contacts[1][""]);
        }
        // Se agrega funcionalidad a los botones
        for (let i=0; i<contacts[0].toNumber(); i++) {
        }
        // Datatables
    }

    async createContact(nombre, apellido, telefono, correo, cuenta) {
        try {
            // Se agrega el contacto
            // Se actualiza la lista de contactos
            this.getContacts();
        } catch (error) {
            console.log(error);
        }
    }

    updateContact(id, nombre, apellido, telefono, correo, cuenta) {
        try {
            // Se actualiza el contacto
            // Se actualiza la lista de contactos
            this.getContacts();
        } catch (error) {
            console.log(error);
        }
    }

    deleteContact(id) {
        try {
            // Se elimina el contacto
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
