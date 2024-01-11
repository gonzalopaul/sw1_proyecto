$(document).ready(function() {
    $("#loginForm").submit(function(event) {
      event.preventDefault();
  
      const email = $("#email").val();
      const password = $("#password").val();
  
      // Enviar los datos al servidor con Ajax aquí

      alert("Inicio de sesión exitoso");
    });
  });
  