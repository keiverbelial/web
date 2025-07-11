document.addEventListener('DOMContentLoaded', function() {
    // Seleccionamos el formulario de registro
    const registrationForm = document.querySelector('.registration-form');

    // Escuchamos el evento 'submit' (cuando el usuario intenta enviar el formulario)
    registrationForm.addEventListener('submit', function(event) {
        // Prevenimos el envío por defecto del formulario para poder validar
        event.preventDefault();

        // Limpiamos los mensajes de error previos
        clearErrorMessages();

        let isValid = true; // Bandera para controlar si el formulario es válido

        // --- Validación de Datos del Alumno ---
        const alumnoNombre = document.getElementById('alumno_nombre');
        if (alumnoNombre.value.trim() === '') {
            displayError(alumnoNombre, 'Por favor, ingresa el nombre completo del alumno.');
            isValid = false;
        }

        const alumnoFechaNac = document.getElementById('alumno_fecha_nac');
        if (alumnoFechaNac.value === '') {
            displayError(alumnoFechaNac, 'Por favor, selecciona la fecha de nacimiento del alumno.');
            isValid = false;
        } else {
            // Validación de edad mínima (opcional, por ejemplo, 4 años)
            const today = new Date();
            const birthDate = new Date(alumnoFechaNac.value);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 4) { // Por ejemplo, la escuela solo acepta mayores de 4 años
                displayError(alumnoFechaNac, 'El alumno debe tener al menos 4 años de edad.');
                isValid = false;
            }
        }

        const alumnoGenero = document.getElementById('alumno_genero');
        if (alumnoGenero.value === '') {
            displayError(alumnoGenero, 'Por favor, selecciona el género del alumno.');
            isValid = false;
        }

        // --- Validación de Datos del Representante ---
        const representanteNombre = document.getElementById('representante_nombre');
        if (representanteNombre.value.trim() === '') {
            displayError(representanteNombre, 'Por favor, ingresa el nombre completo del representante.');
            isValid = false;
        }

        const representanteEmail = document.getElementById('representante_email');
        if (representanteEmail.value.trim() === '') {
            displayError(representanteEmail, 'Por favor, ingresa el correo electrónico del representante.');
            isValid = false;
        } else if (!isValidEmail(representanteEmail.value)) {
            displayError(representanteEmail, 'Por favor, ingresa un correo electrónico válido.');
            isValid = false;
        }

        const representanteTelefono = document.getElementById('representante_telefono');
        // Usamos la validación 'pattern' de HTML, pero también podemos reforzarla aquí
        if (representanteTelefono.value.trim() === '') {
            displayError(representanteTelefono, 'Por favor, ingresa el número de teléfono del representante.');
            isValid = false;
        } else if (!representanteTelefono.checkValidity()) { // Usa la validación de patrón HTML5
             displayError(representanteTelefono, 'Formato de teléfono incorrecto. Usa XXXX-XXXXXXX.');
             isValid = false;
        }


        const representanteRelacion = document.getElementById('representante_relacion');
        if (representanteRelacion.value === '') {
            displayError(representanteRelacion, 'Por favor, selecciona la relación con el alumno.');
            isValid = false;
        }

        // --- Validación de Términos y Condiciones ---
        const aceptoTerminos = document.getElementById('acepto_terminos');
        if (!aceptoTerminos.checked) {
            displayError(aceptoTerminos, 'Debes aceptar los Términos y Condiciones y la Política de Privacidad.');
            isValid = false;
        }

        // Si todo es válido, puedes enviar el formulario
        if (isValid) {
            alert('¡Formulario enviado con éxito! Nos pondremos en contacto contigo pronto.');
            // Aquí enviarías el formulario. Por ahora, solo lo imprimimos en consola.
            console.log('Formulario válido. Datos a enviar:', {
                alumno_nombre: alumnoNombre.value,
                alumno_fecha_nac: alumnoFechaNac.value,
                alumno_genero: alumnoGenero.value,
                alumno_experiencia: alumnoExperiencia.value, // Asegúrate de definir alumnoExperiencia
                representante_nombre: representanteNombre.value,
                representante_email: representanteEmail.value,
                representante_telefono: representanteTelefono.value,
                representante_relacion: representanteRelacion.value,
                acepto_terminos: aceptoTerminos.checked
            });
            // registrationForm.submit(); // Descomenta esta línea para enviar el formulario real
        }
    });

    // --- Funciones Auxiliares ---

    // Función para mostrar mensajes de error
    function displayError(inputElement, message) {
        // Creamos un div para el mensaje de error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;

        // Insertamos el mensaje de error después del input
        inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
        inputElement.classList.add('input-error'); // Añade una clase para resaltar el input con error
    }

    // Función para limpiar todos los mensajes de error
    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        const errorInputs = document.querySelectorAll('.input-error');
        errorInputs.forEach(input => input.classList.remove('input-error'));
    }

    // Función simple para validar formato de email (puedes usar regex más robustas)
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // --- Código de validación para el formulario de REGISTRO (EXISTENTE) ---
    const registrationForm = document.querySelector('.registration-form');
    if (registrationForm) { // Asegúrate de que el formulario exista antes de intentar añadir el listener
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            clearErrorMessages(); // Función para limpiar errores, reutilizada
            let isValid = true;

            // ... (todas las validaciones del formulario de registro que ya creamos) ...
            const alumnoNombre = document.getElementById('alumno_nombre');
            if (alumnoNombre.value.trim() === '') {
                displayError(alumnoNombre, 'Por favor, ingresa el nombre completo del alumno.');
                isValid = false;
            }

            const alumnoFechaNac = document.getElementById('alumno_fecha_nac');
            if (alumnoFechaNac.value === '') {
                displayError(alumnoFechaNac, 'Por favor, selecciona la fecha de nacimiento del alumno.');
                isValid = false;
            } else {
                const today = new Date();
                const birthDate = new Date(alumnoFechaNac.value);
                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                if (age < 4) {
                    displayError(alumnoFechaNac, 'El alumno debe tener al menos 4 años de edad.');
                    isValid = false;
                }
            }

            const alumnoGenero = document.getElementById('alumno_genero');
            if (alumnoGenero.value === '') {
                displayError(alumnoGenero, 'Por favor, selecciona el género del alumno.');
                isValid = false;
            }

            const representanteNombre = document.getElementById('representante_nombre');
            if (representanteNombre.value.trim() === '') {
                displayError(representanteNombre, 'Por favor, ingresa el nombre completo del representante.');
                isValid = false;
            }

            const representanteEmail = document.getElementById('representante_email');
            if (representanteEmail.value.trim() === '') {
                displayError(representanteEmail, 'Por favor, ingresa el correo electrónico del representante.');
                isValid = false;
            } else if (!isValidEmail(representanteEmail.value)) {
                displayError(representanteEmail, 'Por favor, ingresa un correo electrónico válido.');
                isValid = false;
            }

            const representanteTelefono = document.getElementById('representante_telefono');
            if (representanteTelefono.value.trim() === '') {
                displayError(representanteTelefono, 'Por favor, ingresa el número de teléfono del representante.');
                isValid = false;
            } else if (!representanteTelefono.checkValidity()) {
                 displayError(representanteTelefono, 'Formato de teléfono incorrecto. Usa XXXX-XXXXXXX.');
                 isValid = false;
            }

            const representanteRelacion = document.getElementById('representante_relacion');
            if (representanteRelacion.value === '') {
                displayError(representanteRelacion, 'Por favor, selecciona la relación con el alumno.');
                isValid = false;
            }

            const aceptoTerminos = document.getElementById('acepto_terminos');
            if (!aceptoTerminos.checked) {
                displayError(aceptoTerminos, 'Debes aceptar los Términos y Condiciones y la Política de Privacidad.');
                isValid = false;
            }
            // --- FIN del código de validación del formulario de REGISTRO ---


            if (isValid) {
                alert('¡Formulario de registro enviado con éxito! Nos pondremos en contacto contigo pronto.');
                console.log('Formulario de registro válido. Datos a enviar:', {
                    alumno_nombre: alumnoNombre.value,
                    alumno_fecha_nac: alumnoFechaNac.value,
                    alumno_genero: alumnoGenero.value,
                    alumno_experiencia: document.getElementById('alumno_experiencia').value, // Asegúrate de obtener este valor
                    representante_nombre: representanteNombre.value,
                    representante_email: representanteEmail.value,
                    representante_telefono: representanteTelefono.value,
                    representante_relacion: representanteRelacion.value,
                    acepto_terminos: aceptoTerminos.checked
                });
                // registrationForm.submit();
            }
        });
    }


    // --- Código de validación para el formulario de INICIO DE SESIÓN (NUEVO) ---
    const loginForm = document.querySelector('.login-form');
    if (loginForm) { // Asegúrate de que el formulario de login exista
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Previene el envío por defecto

            clearErrorMessages(); // Limpia mensajes de error previos

            let isValid = true;

            const emailUsuario = document.getElementById('email_usuario');
            if (emailUsuario.value.trim() === '') {
                displayError(emailUsuario, 'Por favor, ingresa tu correo electrónico.');
                isValid = false;
            } else if (!isValidEmail(emailUsuario.value)) {
                displayError(emailUsuario, 'Por favor, ingresa un correo electrónico válido.');
                isValid = false;
            }

            const contrasena = document.getElementById('contrasena');
            if (contrasena.value.trim() === '') {
                displayError(contrasena, 'Por favor, ingresa tu contraseña.');
                isValid = false;
            } else if (contrasena.value.length < 6) { // Ejemplo: mínimo 6 caracteres
                displayError(contrasena, 'La contraseña debe tener al menos 6 caracteres.');
                isValid = false;
            }

            if (isValid) {
                alert('¡Inicio de sesión exitoso! Redirigiendo...');
                // Aquí, en un entorno real, enviarías las credenciales al servidor
                // para autenticación y luego redirigirías al usuario.
                console.log('Formulario de inicio de sesión válido. Credenciales:', {
                    email: emailUsuario.value,
                    password: contrasena.value,
                    recordarme: document.getElementById('recordarme').checked // Opcional: si el checkbox está marcado
                });
                // loginForm.submit(); // Descomenta esto para el envío real al backend
            }
        });
    }

    // --- Funciones Auxiliares (reutilizadas y definidas una sola vez) ---

    // Función para mostrar mensajes de error
    function displayError(inputElement, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;

        // Si el elemento es un checkbox o radio, insertamos el error después del padre del label para mejor posicionamiento
        if (inputElement.type === 'checkbox' || inputElement.type === 'radio') {
            inputElement.closest('.checkbox-group, .radio-group').appendChild(errorDiv);
        } else {
            inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
        }
        inputElement.classList.add('input-error');
    }

    // Función para limpiar todos los mensajes de error
    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        const errorInputs = document.querySelectorAll('.input-error');
        errorInputs.forEach(input => input.classList.remove('input-error'));
    }

    // Función simple para validar formato de email
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});
