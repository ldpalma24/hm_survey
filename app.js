const apiUrl = "https://hmanantialencuesta.vercel.app/api/survey";

document.addEventListener("DOMContentLoaded", () => {
  const surveys = document.querySelectorAll("survey-widget");
  let currentIndex = 0; // Start from the first question
  let isAnimating = false;

  function updateProgressBar(index) {
    surveys.forEach((survey, i) => {
      const progressSteps = survey.shadowRoot.querySelectorAll(".progress-step");
      progressSteps.forEach((step, j) => {
        if (j < index) { // Change condition to < instead of <=
          step.classList.add("progress-step-active");
        } else {
          step.classList.remove("progress-step-active");
        }
      });
    });
  }

  function showSurvey(index, animationIn, animationOut) {
    if (index < 0 || index >= surveys.length) return;

    surveys.forEach((survey, i) => {
      const widget = survey.shadowRoot.querySelector('.widget');
      const progressIndicators = survey.shadowRoot.querySelector('.progress-indicators');

      if (i === currentIndex && animationOut) {
        widget.style.animation = `${animationOut} 0.5s ease forwards`;
      }

      if (i === index) {
        survey.classList.add('active');
        survey.classList.remove('hidden');
        survey.style.opacity = "1";
        survey.style.pointerEvents = "auto";
        survey.style.position = "relative";
        survey.style.zIndex = "1";
        widget.style.animation = `${animationIn} 0.5s ease forwards`;
        widget.onanimationend = () => {
          isAnimating = false;
        };
        if (i === 0) {
          progressIndicators.style.display = 'none';
        } else {
          progressIndicators.style.display = 'flex';
        }
      } else {
        survey.classList.remove('active');
        survey.classList.add('hidden');
        survey.style.pointerEvents = "none";
        survey.style.position = "absolute";
        survey.style.zIndex = "0";
      }
    });

    currentIndex = index;
    updateProgressBar(index);
  }

  function handleSurveyAccepted() {
    if (isAnimating || currentIndex >= surveys.length - 1) return;
    isAnimating = true;
    showSurvey(currentIndex + 1, 'slide-in', 'slide-out');
  }

  function handleSurveyRejected() {
    if (isAnimating || currentIndex <= 0) return;
    isAnimating = true;
    showSurvey(currentIndex - 1, 'slide-in-reverse', 'slide-out-reverse');
  }

  document.body.addEventListener("survey-accepted", () => {
    if (currentIndex === surveys.length - 1) {
      submitSurvey();
    } else {
      handleSurveyAccepted();
    }
  });

  document.body.addEventListener("survey-rejected", handleSurveyRejected);

  document.body.addEventListener('option-selected', (event) => {
    const { question, answer } = event.detail;
    switch (question) {
      case '¿Podría decirnos su nombre y apellido?':
        surveyData.nombre = answer;
        break;
      case '¿Podría decirnos su número de habitación?':
        surveyData.nrohab = answer;
        break;
      case '¿Podría decirnos su fecha de salida?':
        surveyData.fsalida = answer;
        break;
      case '¿De qué manera fue atentido durante el proceso del check in?':
        surveyData.check_in = answer;
        break;
      case '¿En qué condiciones se encontraba la habitación que le fue asignada?':
        surveyData.hab = answer;
        break;
      case '¿De qué manera calificaría las condiciones del baño?':
        surveyData.bath = answer;
        break;
      case '¿Cómo calificaría generalmente al restaurant Red Sport Bar?':
        surveyData.redp = answer;
        break;
      case '¿Cómo calificaría generalmente al restaurant Manolo´s?':
        surveyData.manolo = answer;
        break;
      case '¿Qué tal estuvieron las opciones y la calidad del desayuno?':
        surveyData.desay = answer;
        break;
      case '¿Qué tan efectivo fue el Room Service cuando lo solicitó?':
        surveyData.rmserv = answer;
        break;
      case '¿En base a su criterio cómo calificaría la piscina?':
        surveyData.pool = answer;
        break;
      case 'Cómo fue la atención al momento de realizar el check out?':
        surveyData.check_out = answer;
        break;
      case 'Generalmente ¿Podría calificar al Hotel dejando un comentario sobre su estadia?':
        surveyData.gneral = answer;
        break;
    }
  });

  async function submitSurvey() {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyData),
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();
      console.log("Success:", data);
      alert("Encuesta guardada exitosamente: " + data.message);
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al guardar la encuesta.");
    }
  }

  // Show the first survey without animation
  showSurvey(currentIndex, '', '');
});

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
    gneral: document.querySelector('[name="gneral"]:checked')?.value,
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