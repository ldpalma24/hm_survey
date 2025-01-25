const apiUrl = "https://hm-survey.vercel.app/api/survey";

document.addEventListener("DOMContentLoaded", function () {
  let currentStep = 0;
  const steps = document.querySelectorAll(".step");

  // Muestra la primera sección al iniciar
  showStep(currentStep);

  // Función para mostrar el paso actual
  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      step.classList.remove("active");
      if (index === stepIndex) {
        step.classList.add("active");
      }
    });
    window.scrollTo(0, 0); // Desplazarse hacia arriba al cambiar de paso
  }

  // Manejar el envío del formulario
  document.getElementById("surveyForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const surveyData = {
        nombre: document.querySelector('[name="nombre"]').value,
        nrohab: parseInt(document.querySelector('[name="nrohab"]').value, 10),
        fsalida: document.querySelector('[name="fsalida"]').value, 
        check_in: document.querySelector('[name="check_in"]:checked')?.value,
        hab: document.querySelector('[name="hab"]:checked')?.value,
        bath: document.querySelector('[name="bath"]:checked')?.value,
        redp: document.querySelector('[name="redp"]:checked')?.value,
        manolo: document.querySelector('[name="manolo"]:checked')?.value,
        desay: document.querySelector('[name="desay"]:checked')?.value,
        rmserv: document.querySelector('[name="rmserv"]:checked')?.value,
        pool: document.querySelector('[name="pool"]:checked')?.value,
        check_out: document.querySelector('[name="check_out"]:checked')?.value,
        gneral: document.querySelector('[name="gneral"]:checked')?.value
      };
    
    // Validar que todos los campos estén completos
    if (Object.values(surveyData).some(value => value === undefined || value === "")) {
      alert("Por favor, responde todas las preguntas antes de enviar.");
      return;
    }


    try {
      // Enviar los datos al backend
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyData), // Enviar el objeto en formato JSON
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();
      console.log("Success:", data);
      alert("Encuesta guardada exitosamente: " + data.message);

      // Opcional: Reiniciar el formulario
      document.getElementById("surveyForm").reset();
      currentStep = 0;
      showStep(currentStep);
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al guardar la encuesta.");
    }
  });
});