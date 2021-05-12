//Crear footer del modal
const modalFooter = document.createElement('div');
modalFooter.className = 'modal-footer';

//Crear contenido del modal
const modalContent = document.createElement('div');
modalContent.className = 'modal-content';

//Crear modal
const modal = document.createElement('div');
modal.className = 'modal';
modal.id = 'modal-limpio'
modal.appendChild(modalContent);
modal.appendChild(modalFooter);
document.body.appendChild(modal);

//Crear contenido del modal dependiendo del botón
function abrirModal(elemento, tag = undefined, bloqTag){
    elemento.href = '#modal-limpio';

    //Botón añadir
    if (elemento.textContent === 'add'){

    //Borrar contenido del content y footer
        while (modalContent.firstChild) {
            modalContent.removeChild(modalContent.firstChild);
        }
        while (modalFooter.firstChild) {
            modalFooter.removeChild(modalFooter.firstChild);
        }

        //Insertar contenido del modal
        const formEtiqueta = document.createElement('form');
        const tituloFormulario = document.createElement('h4');
        tituloFormulario.textContent = 'Elija una etiqueta';
        formEtiqueta.appendChild(tituloFormulario);

        //Opciones
        let etiquetas = ['div', 'form', 'h4', 'h6', 'p'];
        let nomEtiquetas = ['Caja', 'Formulario', 'Titulo', 'Subtitulo', 'Parrafo']
        //Crear opciones
        for (let i = 0; i < etiquetas.length; i++) {
            const label = document.createElement('label');
            const input = document.createElement('input');
            const span = document.createElement('span');
            const br = document.createElement('br');

            input.className = 'with-gap';
            input.name = 'group1';
            input.type = 'radio';
            input.id = etiquetas[i];
            input.value = etiquetas[i];
        
            span.className = 'black-text';
            span.textContent = nomEtiquetas[i];
            
            label.appendChild(input);
            label.appendChild(span);
            
            formEtiqueta.appendChild(label);
            formEtiqueta.appendChild(br);
        }

        //Insertar foemulario
        modalContent.append(formEtiqueta);

        //Botón Cancelar
        const btnCancelar = document.createElement('a');
        btnCancelar.className = 'btn red modal-close';
        btnCancelar.textContent = 'Cancelar'
        
        //Botón Continuar
        const btnContinuar = document.createElement('a');
        btnContinuar.className = 'btn green';
        btnContinuar.textContent = 'Continuar';
    
        modalFooter.appendChild(btnCancelar);
        modalFooter.appendChild(btnContinuar);
        btnContinuar.addEventListener('click', function(){validarSelección(btnContinuar, tag)});

        //Validar la selección de una etiqueta
        function validarSelección(elemento, tag){
            this.tag = tag;
            for (let i = 0; i < etiquetas.length; i++){
                if (document.getElementById(`${etiquetas[i]}`).checked){
                    tag = document.getElementById(`${etiquetas[i]}`).value;
                }
            }

            if (tag === undefined){
                mensaje('Seleccione una etiqueta', 'dangerous', 'red', tituloFormulario);
            }else{
                if (tag === 'div' || tag === 'form'){
                    abrirModal(elemento, tag, 1);
                }else{
                    abrirModal(elemento, tag);
                }
            }
        }
    //Botón continuar 
    }else if (elemento.textContent == 'Continuar'){

        //Borrar contenido del content y footer
        while (modalContent.firstChild) {
            modalContent.removeChild(modalContent.firstChild);
        }
        while (modalFooter.firstChild) {
            modalFooter.removeChild(modalFooter.firstChild);
        }

        //Crear contenido
        const formEtiqueta = document.createElement('form');
        //const br = document.createElement('br');
        const idLabel = document.createElement('label');
        const idInput = document.createElement('input');
        const claseLabel = document.createElement('label');
        const claseInput = document.createElement('input');
        const conttLabel = document.createElement('label');
        const contInput = document.createElement('input');

        idLabel.for = 'id-tag';
        idLabel.textContent = 'Id';
        idInput.id = 'id-tag';
        idInput.type = 'text';
        idInput.required = true;

        formEtiqueta.appendChild(idLabel);
        idLabel.appendChild(idInput);

        claseLabel.for = 'clase-tag';
        claseLabel.textContent = 'Clase';
        claseInput.id = 'clase-tag';
        claseInput.type = 'text';

        formEtiqueta.appendChild(claseLabel);
        formEtiqueta.appendChild(claseInput);

        conttLabel.for = 'cont-tag';
        conttLabel.textContent = 'Contenido';
        contInput.id = 'cont-tag';
        contInput.type = 'text';

        //Desabilitar campo contenido cuando aplique
        if(bloqTag){
            contInput.disabled = 'disabled';
        }

        formEtiqueta.appendChild(conttLabel);
        formEtiqueta.appendChild(contInput);

        modalContent.appendChild(formEtiqueta);

        const btnCancelar = document.createElement('a');
        btnCancelar.className = 'btn red modal-close';
        btnCancelar.textContent = 'Cancelar';
        modalFooter.appendChild(btnCancelar);
        const btnTerminar = document.createElement('a');
        btnTerminar.className = 'btn green';
        btnTerminar.textContent = 'Terminar';
        modalFooter.appendChild(btnTerminar);
        //Botón terminar
        btnTerminar.addEventListener('click', function(){
            //Validar campos
            if (!idInput.value) {
                mensaje('El campo Id es obligatorio', 'dangerous', 'red', formEtiqueta);
            }else{
                if (tag == 'h4' || tag == 'h6' || tag == 'p') {
                    if (!contInput.value) {
                        mensaje('El campo Contenido está vacío', 'dangerous', 'red', formEtiqueta);
                    }else{
                        anadirEtiqueta(tag, idInput.value, claseInput.value, contInput.value);
                        btnTerminar.className = 'btn green modal-close';
                    }
                }else{
                    anadirEtiqueta(tag, idInput.value, claseInput.value, contInput.value);
                    btnTerminar.className = 'btn green modal-close';
                }
            }
        });

    }else if (elemento.firstChild.textContent == 'edit'){

        //Borrar contenido del content y footer
        while (modalContent.firstChild) {
            modalContent.removeChild(modalContent.firstChild);
        }
        while (modalFooter.firstChild) {
            modalFooter.removeChild(modalFooter.firstChild);
        }

        //Crear contenido
        const formEtiqueta = document.createElement('form');
        //const br = document.createElement('br');
        const idLabel = document.createElement('label');
        const idInput = document.createElement('input');
        const claseLabel = document.createElement('label');
        const claseInput = document.createElement('input');
        const conttLabel = document.createElement('label');
        const contInput = document.createElement('input');
        
        
        idLabel.for = 'id-tag';
        idLabel.textContent = 'Id';
        idInput.id = 'id-tag';
        idInput.type = 'text';
        idInput.required = true;

        if (elemento.className === 'btn black modal-trigger btnEditar') {
            let textoId = btnEditar.parentNode.parentNode.childNodes[1].childNodes[1].id;
            idInput.value = textoId;
        }else{
            let textoId = elemento.parentNode.parentNode.firstChild.firstChild.id;
            idInput.value = textoId;
        }
        
        formEtiqueta.appendChild(idLabel);
        idLabel.appendChild(idInput);
        
        claseLabel.for = 'clase-tag';
        claseLabel.textContent = 'Clase';
        claseInput.id = 'clase-tag';
        claseInput.type = 'text';
        
        if (elemento.className === 'btn black modal-trigger btnEditar') {
            let textoClase = btnEditar.parentNode.parentNode.childNodes[1].className;
            claseInput.value = textoClase;
        }else{
            let textoClase = elemento.parentNode.parentNode.firstChild.className;
            claseInput.value = textoClase;
        }
        
        formEtiqueta.appendChild(claseLabel);
        formEtiqueta.appendChild(claseInput);
        
        conttLabel.for = 'cont-tag';
        conttLabel.textContent = 'Contenido';
        contInput.id = 'cont-tag';
        contInput.type = 'text';
        
        //Desabilitar campo contenido cuando aplique
        if(tag == 'div' || tag == 'form'){
            contInput.disabled = 'disabled';
        
        }

        if (tag == 'form'){
            let textoCont = '';
            contInput.value = textoCont;
        }else{
            if (elemento.className === 'btn black modal-trigger btnEditar') {
                let textoContenido = btnEditar.parentNode.parentNode.childNodes[1].childNodes[1].textContent;
                contInput.value = textoContenido;
            }else{
                let textoCont = elemento.parentNode.parentNode.firstChild.firstChild.textContent;
                contInput.value = textoCont;
            }
        }

        formEtiqueta.appendChild(conttLabel);
        formEtiqueta.appendChild(contInput);
        
        modalContent.appendChild(formEtiqueta);
        
        const btnCancelar = document.createElement('a');
        btnCancelar.className = ' btn red modal-close';
        btnCancelar.textContent = 'Cancelar';
        const btnModificar = document.createElement('a');
        btnModificar.className = 'btn green';
        btnModificar.textContent = 'Modificar';
        modalFooter.appendChild(btnCancelar);
        modalFooter.appendChild(btnModificar);
        //Botón terminar
        btnModificar.addEventListener('click', function(){
            //Validar campos
            if (!idInput.value) {
                mensaje('El campo Id es obligatorio', 'dangerous', 'red', formEtiqueta);
            }else{
                if (tag == 'h4' || tag == 'h6' || tag == 'p') {
                    if (!contInput.value) {
                        mensaje('El campo Contenido está vacío', 'dangerous', 'red', formEtiqueta);
                    }else{
                        //else{
                            elemento.parentNode.parentNode.firstChild.firstChild.id = idInput.value;
                            elemento.parentNode.parentNode.firstChild.firstChild.className = claseInput.value;
                            elemento.parentNode.parentNode.firstChild.firstChild.textContent = contInput.value;
                        //}
                        btnModificar.className = 'btn green modal-close';
                    }
                }else{
                    if (elemento.className === 'btn black modal-trigger btnEditar') {
                        btnEditar.parentNode.parentNode.childNodes[1].childNodes[1].id = idInput.value;
                        btnEditar.parentNode.parentNode.childNodes[1].className = claseInput.value;
                        btnEditar.parentNode.parentNode.childNodes[1].childNodes[1].textContent = contInput.value;
                    }else{
                        elemento.parentNode.parentNode.firstChild.firstChild.id = idInput.value;
                        elemento.parentNode.parentNode.firstChild.firstChild.className = claseInput.value;
                    }
                    btnModificar.className = 'btn green modal-close';
                }
            }
        });
    }else if (elemento.textContent === 'delete'){

        //Borrar contenido del content y footer
        while (modalContent.firstChild) {
            modalContent.removeChild(modalContent.firstChild);
        }
        while (modalFooter.firstChild) {
            modalFooter.removeChild(modalFooter.firstChild);
        }

        const h5 = document.createElement('h5');
        h5.textContent = `¿Está seguro de que desea eliminar una etiqueta ${tag}?`;
        modalContent.appendChild(h5);
        const btnNo = document.createElement('a');
        btnNo.className = 'btn red modal-close';
        btnNo.textContent = 'NO';
        const btnSi = document.createElement('a');
        btnSi.className = 'btn green';
        btnSi.textContent = 'SI';
        modalFooter.appendChild(btnNo);
        modalFooter.appendChild(btnSi);

        btnSi.addEventListener('click', ()=> {
            elemento.parentNode.parentNode.remove();
            btnSi.className = 'modal-close';
        });
    }
}

//Función para enviar mensajes en pantalla
function mensaje(mensaje, icon, color, seccion){

    const div = document.createElement('div');
    const imgMensaje = document.createElement('i');
    const contMensaje = document.createElement('h6');

    div.className = color + ' valign-wrapper white-text z-depth-3';
    imgMensaje.className = 'material-icons';
    imgMensaje.textContent = icon;
    contMensaje.textContent = mensaje;

    div.appendChild(imgMensaje);
    div.appendChild(contMensaje);
    seccion.appendChild(div);

    //Duración del mensaje
    setTimeout(() => document.querySelector('.z-depth-3').remove(), 3000);
}

//Insertar etiqueta en pantalla
function anadirEtiqueta(etiqueta, id, clase, contenido){
    
    const nEtiqueta = document.createElement(`${etiqueta}`);
    nEtiqueta.id = id;
    nEtiqueta.textContent = contenido;

    function crearDiv(){
        const row = document.createElement('div');
        let estructura = 'col9 ' + clase;
        row.className = 'container section row valign-wrapper white';
        // nEtiqueta.className = estructura;
        const nDiv = document.createElement('div');
        nDiv.className = estructura;
        row.appendChild(nDiv);
        nDiv.appendChild(nEtiqueta);
        const divBtn = crearBotones();
        row.appendChild(divBtn);
        document.body.appendChild(row);
        return row;
    }
    
    //Etiqueta div
    if (etiqueta == 'div'){

        crearDiv();

    //Etiqueta form
    }else if (etiqueta == 'form'){

        crearDiv();
        const tituloNuevoForm = document.createElement('h6');
        tituloNuevoForm.textContent = 'Formulario de prueba';
        tituloNuevoForm.className = 'center-align text-darken-1 grey-text';
        const inputNuevoForm1 = document.createElement('input');
        inputNuevoForm1.type = 'text';
        const labelNuevoForm1 = document.createElement('label');
        labelNuevoForm1.textContent = 'Nombre';
        labelNuevoForm1.appendChild(inputNuevoForm1);
        const inputNuevoForm2 = document.createElement('input');
        inputNuevoForm2.type = 'text';
        const labelNuevoForm2 = document.createElement('label');
        labelNuevoForm2.textContent = 'Documento';
        labelNuevoForm2.appendChild(inputNuevoForm2);

        nEtiqueta.appendChild(tituloNuevoForm);
        nEtiqueta.appendChild(labelNuevoForm1);
        nEtiqueta.appendChild(labelNuevoForm2);
    
    //Etiqueta h4, h6 y p
    }else if (etiqueta == 'h4' || etiqueta == 'h6' || etiqueta == 'p'){

        crearDiv();
    }
}

//Botón añadir principal
const btnAnadir = document.querySelector('.btnAnadir');
btnAnadir.addEventListener('click', function(){abrirModal(btnAnadir)});

//Botón editar principal
const btnEditar = document.querySelector('.btnEditar');
btnEditar.addEventListener('click', function(){abrirModal(btnEditar)});

//Crear botones
function crearBotones(){
    const divBtn = document.createElement('div');
    divBtn.className = 'col s3';
    const btnAdd = document.createElement('a');
    const iconoAdd = document.createElement('i'); 
    btnAdd.className = "btn black modal-trigger";

    btnAdd.addEventListener('click', function(){abrirModal(btnAdd)});

    iconoAdd.className = 'material-icons';
    iconoAdd.textContent = 'add';
    const btnEdit = document.createElement('a');
    const iconoEdit = document.createElement('i'); 
    btnEdit.className = "btn black modal-trigger";
    iconoEdit.className = 'material-icons';
    iconoEdit.textContent = 'edit';

    btnEdit.addEventListener('click', function(){abrirModal(btnEdit, btnEdit.parentNode.parentNode.firstChild.firstChild.localName)});

    const btnDelete = document.createElement('a');
    const iconoDelete = document.createElement('i'); 
    btnDelete.className = "btn black modal-trigger";
    iconoDelete.className = 'material-icons';
    iconoDelete.textContent = 'delete';

    btnDelete.addEventListener('click', function(){abrirModal(btnDelete, btnEdit.parentNode.parentNode.firstChild.firstChild.localName)});

    // btnAdd.appendChild(iconoAdd);
    btnEdit.appendChild(iconoEdit);
    btnDelete.appendChild(iconoDelete);
    // divBtn.appendChild(btnAdd);
    divBtn.appendChild(btnEdit);
    divBtn.appendChild(btnDelete);

    return divBtn;
}