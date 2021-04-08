import React, {Fragment, useState} from 'react'
import uuid from 'uuid/dist/v4.js';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    //Crear sTATE DE CITAS

    const [cita, actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });

    const [error, actualizarError] = useState(false);



    //funcion que se ejecuta cada que el usuraio escribe en un input
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        }) 
    }

    // extraer valores 

    const {mascota, propietario, fecha, hora, sintomas} = cita;

    const submitCita = e => {
        e.preventDefault();

        //validar 

        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            //console.log('Hay un error')
                actualizarError(true);
                return;
        }

        //Eliminar mensaje previo
        actualizarError(false);
        //asignar un ID
        cita.id = uuid();
        console.log(cita)


        // crear cita 
        crearCita(cita);

        // reiniciar el form
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })

    }

    return (
       <Fragment>
           <h2>Crear Citas</h2>

           {error ? <p className="alerta-error">Todos los campos son obligatorios</p>
           : null}

           <form
                onSubmit={submitCita}
           >
               <label>Nombre Mascota</label>
               <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
               />

               <label>Nombre Dueño</label>
               <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                /> 

               <label>Fecha</label>
               <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
               />

                <label>Hora</label>
               <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                /> 

                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
               ></textarea>

               <button
                    type="submit"
                    className="u-full-width button-primary"
                    >Agregar Cita </button>

           </form>
       </Fragment>
    );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
};

export default Formulario;