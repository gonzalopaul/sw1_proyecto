$(document).ready(function() {
  $("#contactForm").submit(function(event) {
    event.preventDefault();

    // Obtener los valores de los campos
    const tipo = $("#tipo").val();
    const nombre = $("#nombre").val();
    const email = $("#email").val();
    const mensaje = $("#mensaje").val();

    // envío de formulario (utilizar Ajax para enviar los datos al servidor)
    
    alert("Formulario enviado correctamente");

  });
});
