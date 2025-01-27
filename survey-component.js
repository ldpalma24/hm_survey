class SurveyWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.classList.add('hidden'); // Add hidden class initially
  }

  static get observedAttributes() {
    return ['img-src', 'logo-src', 'rechazar-text', 'aceptar-text', 'div-color', 'background-color'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.addEventListener('click', (event) => {
      if (event.target && event.target.classList.contains('button-aceptar')) {
        this.dispatchEvent(new CustomEvent('survey-accepted', {
          bubbles: true,
          composed: true
        }));
      } else if (event.target && event.target.classList.contains('button-rechazar')) {
        this.dispatchEvent(new CustomEvent('survey-rejected', {
          bubbles: true,
          composed: true
        }));
      } else if (event.target && event.target.classList.contains('mic-button')) {
        const dateInput = this.shadowRoot.querySelector('#checkoutDate');
        dateInput.focus();
        dateInput.click();
      }
    });
  }

  render() {
    const backgroundColor = this.getAttribute('background-color') || '#b3bbda';

    this.shadowRoot.innerHTML = `
      <style>
      :root {
        --whitewhite: rgba(255, 255, 255, 1);
        --grey-1000: rgba(31, 36, 41, 1);
        --body-medium-font-family: "Inter", Helvetica;
        --body-medium-font-weight: 500;
        --body-medium-font-size: 15px;
        --body-medium-letter-spacing: 0px;
        --body-medium-line-height: 20px;
        --body-medium-font-style: normal;
        --t2-semibold-font-family: "Inter", Helvetica;
        --t2-semibold-font-weight: 600;
        --t2-semibold-font-size: 16px;
        --t2-semibold-letter-spacing: 0px;
        --t2-semibold-line-height: 20px;
        --t2-semibold-font-style: normal;
      }

      * {
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
      }

      .container {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${backgroundColor};
        margin: 0; /* Ensure no extra margin */
        padding: 0; /* Ensure no extra padding */
      }

      a {
        text-decoration: none;
      }

      button:focus-visible {
        outline: 2px solid #4a90e2 !important;
        outline: -webkit-focus-ring-color auto 5px !important;
      }

      .m-FRAME {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }

      .widget {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 90%;
        height: auto;
        margin: auto;
        box-shadow: 0px 20px 25px #1c1b2126;
        border-radius: 32px;
        background-color: #ffffff;
        animation: var(--slide) 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards; /* Suavizar la animación */
        overflow: hidden; /* Ensure no extra space */
      }

      .image {
        width: 100%;
        height: auto;
        object-fit: cover;
        user-select: none;
        border-top-left-radius: 24px;
        border-top-right-radius: 24px;
        margin-bottom: -1px;
      }

      .div {
        flex: 1;
        background-color: ${this.getAttribute('div-color') || '#4355a3'};
        border-radius: 24px;
        z-index: 1;
        margin-top: -22px;
        height: calc(100% + 20px); /* Increase height slightly */
        width: 100%; /* Ensure it occupies full width */
        display: flex;
        flex-direction: column;
      }

      .frame-2 {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%; /* Occupy full height of .div */
        gap: 10px;
        padding: 20px;
        box-sizing: border-box; /* Ensure padding is included in width calculation */
        flex-grow: 1; /* Allow it to grow and fill available space */
      }

      .footer {
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        padding: 20px;
        background-color: transparent;
        position: absolute;
        bottom: 0;
        height: 80px; /* Set a fixed height for the footer */
      }

      .LOGO-LINEAS-negro, .rectangle {
        height: 40px;
        object-fit: cover;
      }

      .LOGO-LINEAS-negro {
        margin-left: 10px;
      }

      .frame-3 {
        display: flex;
        gap: 10px;
      }

      .base-button {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        padding: 10px;
        border-radius: 100000px;
        transition: background-color 0.4s, color 0.4s;
        font-family: var(--body-medium-font-family);
        font-weight: var(--body-medium-font-weight);
        font-size: var(--body-medium-font-size);
        letter-spacing: var(--body-medium-letter-spacing);
        line-height: var(--body-medium-line-height);
        white-space: nowrap;
        font-style: var(--body-medium-font-style);
      }

      .button-aceptar {
        background-color: white;
        color: black;
      }

      .button-aceptar:hover {
        background-color: #1F2429;
        color: white;
        cursor: pointer;
      }

      .button-rechazar {
        color: black;
      }

      .button-rechazar:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
        cursor: pointer;
      }
survey-widget {
  transition: opacity 0.6s ease-in-out;
  opacity: 0; /* Inicialmente oculto */
  pointer-events: none; /* Deshabilitar interacciones */
}
survey-widget.active {
  opacity: 1; /* Mostrar cuando está activo */
  pointer-events: auto; /* Habilitar interacciones */
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-in-reverse {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
}

@keyframes slide-out-reverse {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.progress-indicators {
  display: flex;
  align-items: center;
  gap: 2px; /* Reduced gap */
  justify-content: center;
  margin: 0 18px; /* Margen fijo a cada lado */
  width: 100%; /* Ensure it occupies full width */
  max-width: 100%; /* Let progress steps expand fully */
  margin: 0 auto; /* Center the progress indicators */
}

.progress-step {
  border-radius: 100px;
  background-color: rgba(255, 255, 255, 0.2);
  height: 4px; /* Thinner height */
  flex: 1; /* Allow it to grow and fill available space */
  margin: 0 0.5px; /* Slightly reduce gap between steps */
}

.progress-step-active {
  background: var(--whitewhite, #fff);
}

.survey-container,
.guest-info-form {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}

      .frame-1725,
      .frame-1725 * {
        box-sizing: border-box;
      }
      .frame-1725 {
        padding: 0px 20px 20px 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;
        justify-content: center;
        position: relative;
      }
      .survey-description {
        color: rgba(255, 255, 255, 0.8);
        text-align: left;
        font-family: var(--body-medium-font-family, "Inter-Medium", sans-serif);
        font-size: var(--body-medium-font-size, 15px);
        line-height: var(--body-medium-line-height, 20px);
        font-weight: var(--body-medium-font-weight, 500);
        position: relative;
        align-self: stretch;
      }
      .survey-title {
        display: flex;
        flex-direction: column;
        gap: 4px;
        align-items: center;
        justify-content: flex-start;
        align-self: stretch;
        flex-shrink: 0;
        position: relative;
      }
      .survey-question {
        color: #ffffff;
        text-align: left;
        font-family: var(--t2-semibold-font-family, "Inter-SemiBold", sans-serif);
        font-size: var(--t2-semibold-font-size, 16px);
        line-height: var (--t2-semibold-line-height, 20px);
        font-weight: var(--t2-semibold-font-weight, 600);
        position: relative;
        align-self: stretch;
      }

      /* Media queries para diseño responsivo */
      @media (min-width: 1281px) {
        .widget {
          width: 580px; /* Reduced width */
          height: 625px; /* Reduced height */
          display: flex;
          flex-direction: column;
          justify-content: center; /* Center vertically */
        }
        .image {
          height: 290px; /* Adjusted height */
        }
.div {
display: flex;
flex-direction: column;
justify-content: center; /* Centra verticalmente */
align-items: center; /* Centra horizontalmente */
text-align: center; /* Asegura que el texto esté centrado */
height: calc(100% - 290px); /* Ajusta la altura según sea necesario */
padding: 0 20px; /* Márgenes laterales */
box-sizing: border-box; /* Incluye el padding en el cálculo del ancho */
}
        .survey-description, .survey-question {
          padding: 0 10px; /* Reduced margin */
          font-size: 18px; /* Increased text size */
        }
        .survey-container {
          min-height: auto; /* Ensure a fixed height to avoid shifting */
          overflow: hidden; /* Eliminar scroll */
        }
      }

      @media (min-width: 1025px) and (max-width: 1280px) {
        .widget {
          width: 580px; /* Reduced width */
          height: 625px; /* Reduced height */
          display: flex;
          flex-direction: column;
          justify-content: center; /* Center vertically */
        }
        .image {
          height: 290px; /* Adjusted height */
        }
.div {
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centra verticalmente */
  align-items: center; /* Centra horizontalmente */
  text-align: center; /* Asegura que el texto esté centrado */
  height: calc(100% - 290px); /* Ajusta la altura según sea necesario */
  padding: 0 20px; /* Márgenes laterales */
  box-sizing: border-box; /* Incluye el padding en el cálculo del ancho */
}
        .survey-description, .survey-question {
          padding: 0 10px; /* Reduced margin */
          font-size: 18px; /* Increased text size */
        }
        .survey-container {
          min-height: auto; /* Ensure a fixed height to avoid shifting */
          overflow: hidden; /* Eliminar scroll */
        }
      }

      @media (min-width: 744px) and (max-width: 1024px) and (orientation: portrait) {
        .widget {
          width: 580px; /* Reduced width */
          height: 625px; /* Reduced height */
          display: flex;
          flex-direction: column;
          justify-content: center; /* Center vertically */
        }
        .image {
          height: 290px; /* Adjusted height */
        }
        .div {
          height: calc(100% - 290px); /* Adjusted height */
        }
        .survey-description, .survey-question {
          padding: 0 10px; /* Reduced margin */
          font-size: 18px; /* Increased text size */
        }
      }

      @media (min-width: 744px) and (max-width: 1024px) and (orientation: landscape) {
        .widget {
          width: 580px; /* Reduced width */
          height: 625px; /* Reduced height */
          display: flex;
          flex-direction: column;
          justify-content: center; /* Center vertically */
        }
        .image {
          height: 290px; /* Adjusted height */
        }
        .div {
          height: calc(100% - 290px); /* Adjusted height */
        }
        .survey-description, .survey-question {
          padding: 0 10px; /* Reduced margin */
          font-size: 18px; /* Increased text size */
        }
      }

      @media (min-width: 320px) and (max-width: 743px) {
        .widget {
          width: 380px; /* Reduced width */
          height: 555px; /* Adjusted height to remove extra space */
        }
        .image {
          height: 240px; /* Adjusted height */
        }
.div {
  padding: 0 5px 60px 5px; /* Reduce los márgenes laterales y añade padding inferior */
  height: calc(100% - 240px); /* Ajusta la altura */
}

.survey-description, .survey-question {
  align-items: center; /* Centra verticalmente */
  align-self: center; /* Centra horizontalmente */
  margin-right: -15px; /* Reduce el margen derecho */
  margin-left: -15px; /* Reduce el margen izquierdo */
  font-size: 14px; /* Mantén el tamaño del texto reducido */
  line-height: 1.5; /* Mejora la legibilidad */
  text-align: justify; /* Alinea el texto para aprovechar mejor el espacio */
}

button {
  margin-top: 10px; /* Asegura que los botones tengan espacio suficiente */
}
}
      }

      @media (min-width: 320px) and (max-width: 568px) {
        .widget {
          width: 350px; /* Reduced width */
          height: 480px; /* Further reduced height */
        }
        .image {
          height: 190px; /* Adjusted height */
        }
        .div {
          padding: 0 5px 60px 5px; /* Reduce los márgenes laterales y añade padding inferior */
          height: calc(100% - 190px); /* Ajusta la altura */
          overflow-y: hidden; /* Cambiado de auto a hidden para evitar scroll */
        }
.survey-description, .survey-question {
  align-items: center; /* Centra verticalmente */
  align-self: center; /* Centra horizontalmente */
  margin-right: -15px; /* Reduce el margen derecho */
  margin-left: -15px; /* Reduce el margen izquierdo */
  font-size: 14px; /* Corregido tamaño de fuente */
  line-height: 1.5; /* Mejora la legibilidad */
  text-align: justify; /* Alinea el texto para aprovechar mejor el espacio */
}
button {
  margin-top: 10px; /* Asegura que los botones tengan espacio suficiente */
}
      }
      .date-placeholder {
          color: rgba(31, 36, 41, 0.6);
          flex: 1;
          font: 500 15px/1 Inter, sans-serif;
          border-radius: 10px;
          background-color: rgba(31, 36, 41, 0.05);
          height: 30px; /* Reduce la altura */
          padding: 5px; /* Reduce el padding */
          border: 1px solid rgba(31, 36, 41, 0.2);
      }
      .date-input-wrapper {
          border-radius: 10px;
          background-color: rgba(31, 36, 41, 0.05);
          display: flex;
          width: 100%;
          align-items: center;
          gap: 10px;
          padding: 8px;
          border: 1px solid rgba(31, 36, 41, 0.2);
          flex-direction: row; /* Coloca el botón a la izquierda */
      }
      .option-button {
        flex: 1;
        border-radius: 8px;
        background-color: rgba(31, 36, 41, 0.05);
        width: 100%;
        padding: 8px 14px; /* Slightly reduce vertical padding */
        border: 1px solid rgba(31, 36, 41, 0.2);
        cursor: pointer;
        margin-top: 5px; /* Adjust margin to move buttons up */
        transition: background-color 0.3s, color 0.3s;
        text-align: left; /* Align text to the left */
        color: #FFFFFF; /* Set text color to white */
      }
      .options-wrapper {
        display: flex;
        width: 100%;
        flex-direction: column;
        font-size: 15px;
        color: #fff;
        font-weight: 500;
        line-height: 1;
        justify-content: center; /* Center vertically */
        align-items: center; /* Center horizontally */
        margin-top: -80px; /* Raise buttons even closer to the text */
      }
      .text-input:focus,
      .date-placeholder:focus {
        outline: none;
        border: 1px solid #1F2429; /* Black border */
        box-shadow: none;
      }
      .survey-container {
        overflow: hidden; /* Eliminar scroll */
      }
      .survey-container:last-of-type {
        margin-bottom: 0; /* Eliminar margen inferior */
        overflow: hidden; /* Asegurar que no haya scroll */
        height: 100%; /* Asegurar que ocupe toda la altura disponible */
        display: flex;
        flex-direction: column;
        justify-content: flex-start; /* Asegurar que el contenido esté alineado al inicio */
      }
      </style>
      <div class="container">
        <div class="m-FRAME">
          <div class="widget">
            <div class="frame"><img class="image" src="${this.getAttribute('img-src')}" /></div>
            <div class="div">
              <div class="frame-2">
                ${this.isFirstSurvey() ? `
                <div class="frame-1725">
                  <div class="survey-description">
                    Agradecemos profundamente su preferencia por el Hotel Manantial Valencia.
                    Ayúdenos a mejorar participando en nuestro sorteo mensual de 2 Pool Day para
                    dos personas con snacks, una cena en Manolo's y una noche de estadía,
                    válida en cualquier época del año. Su opinión nos ayuda a ser mejores.
                    Sorteo el 21 de diciembre.
                  </div>
                  <div class="survey-title">
                    <div class="survey-question">
                      ¿Desea contestar una breve encuesta para ayudarnos a mejorar nuestros
                      servicios?
                    </div>
                  </div>
                </div>` : ''}
                <div class="progress-indicators">
                  <div class="progress-step progress-step-active"></div>
                  <div class="progress-step"></div>
                  <div class="progress-step"></div>
                  <div class="progress-step"></div>
                  <div class="progress-step"></div>
                  <div class="progress-step"></div>
                  <div class="progress-step"></div>
                  <div class="progress-step"></div>
                  <div class="progress-step"></div>
                  <div class="progress-step"></div>
                  <div class="progress-step"></div>
                </div>
                ${this.isSecondSurvey() ? `
                <form role="form" class="guest-info-form">
                    <label for="fullName" class="question-title">¿Podría decirnos su nombre y apellido?</label>
                    <div class="input-wrapper">
                        <input type="text" id="fullName" class="text-input" aria-label="Nombre y Apellido" required>
                    </div>
                    <label for="roomNumber" class="question-title">¿Podría decirnos su número de habitación?</label>
                    <div class="input-wrapper">
                        <input type="text" id="roomNumber" class="text-input" aria-label="Número de habitación" required>
                    </div>
                    <label for="checkoutDate" class="question-title">¿Podría decirnos su fecha de salida?</label>
                    <div class="input-wrapper">
                        <div class="date-input-wrapper">
                            <input type="date" id="checkoutDate" class="date-placeholder" aria-label="Fecha de salida" required>
                        </div>
                    </div>
                </form>` : ''}
                ${(this.isThirdSurvey() || this.isFourthSurveyOrBeyond()) && !this.isLastSurvey() ? `
                  <style>
                  .survey-container {
                    display: flex;
                    flex-direction: column;
                    font-family: Inter, sans-serif;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    text-align: left; /* Change alignment to left */
                    margin: auto; /* Center horizontally */
                  }
                  
                  .question-title {
                    height: 59px;
                    width: 100%;
                    font-size: 16px;
                    color: var(--White-White, #fff);
                    font-weight: 600;
                    line-height: 24px; /* Increase line spacing */
                    margin-bottom: 20px; /* Match the separation of the second survey */
                  }
                  
                  .options-wrapper {
                    display: flex;
                    width: 100%;
                    flex-direction: column;
                    font-size: 15px;
                    color: #fff;
                    font-weight: 500;
                    line-height: 1;
                    justify-content: center; /* Center vertically */
                    align-items: center; /* Center horizontally */
                    margin-top: -80px; /* Raise buttons even closer to the text */
                    gap: 2px; /* Add gap between buttons */
                  }
                  
                  .option-button {
                    flex: 1;
                    border-radius: 8px;
                    background-color: rgba(31, 36, 41, 0.05);
                    width: 100%;
                    padding: 8px 14px; /* Slightly reduce vertical padding */
                    border: 1px solid rgba(31, 36, 41, 0.2);
                    cursor: pointer;
                    margin-top: 5px; /* Adjust margin to move buttons up */
                    transition: background-color 0.3s, color 0.3s;
                    text-align: left; /* Align text to the left */
                    color: #FFFFFF; /* Set text color to white */
                  }
                  
                  .option-button:first-child {
                    margin-top: 0;
                  }
                  
                  .option-button:hover, .option-button[aria-checked="true"] {
                    background-color: #1F2429;
                    color: white;
                  }
                  
                  .visually-hidden {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    border: 0;
                  }
                  .survey-container .options-wrapper {
                    width: 100%;
                    max-width: 100%;
                    margin: -18px auto 0 auto;
                  }
                  </style>
                  
                  <form class="survey-container" role="form">
                    <h2 class="question-title" id="survey-question">
                      ${this.getAttribute('question-text')}
                    </h2>
                    
                    <div class="options-wrapper" role="radiogroup" aria-labelledby="survey-question">
                      <label class="visually-hidden" for="option-excellent">Seleccionar Excelente</label>
                      <button class="option-button" type="button" role="radio" aria-checked="false" tabindex="0" id="option-excellent">
                        Excelente
                      </button>
                  
                      <label class="visually-hidden" for="option-good">Seleccionar Bueno</label>
                      <button class="option-button" type="button" role="radio" aria-checked="false" tabindex="0" id="option-good">
                        Bueno
                      </button>
                  
                      <label class="visually-hidden" for="option-regular">Seleccionar Regular</label>
                      <button class="option-button" type="button" role="radio" aria-checked="false" tabindex="0" id="option-regular">
                        Regular
                      </button>
                  
                      <label class="visually-hidden" for="option-insufficient">Seleccionar Insuficiente</label>
                      <button class="option-button" type="button" role="radio" aria-checked="false" tabindex="0" id="option-insufficient">
                        Insuficiente
                      </button>
                    </div>
                  </form>` : ''}
                ${this.isLastSurvey() ? `
  <style>
    .survey-container {
      display: flex;
      flex-direction: column;
      font-family: Inter, sans-serif;
      align-items: center;
      justify-content: flex-start; /* Align to the top */
      text-align: left; /* Change alignment to left */
      margin: auto; /* Center horizontally */
      margin-top: 5px; /* Add margin to separate from progress bar */
      position: relative; /* Keep container in place */
      min-height: 450px; /* Ensure a fixed height to avoid shifting */
    }
    
    .question-title {
      height: 59px;
      width: 100%;
      font-size: 16px;
      color: var(--White-White, #fff);
      font-weight: 600;
      line-height: 24px; /* Increase line spacing */
      margin: 60px 0 20px 0; /* Increase top margin for more separation */
    }
    
    .options-wrapper {
      display: flex;
      width: 100%;
      flex-direction: column;
      font-size: 15px;
      color: #fff;
      font-weight: 500;
      line-height: 1;
      justify-content: flex-end; /* Align to the bottom */
      align-items: center; /* Center horizontally */

      gap: 2px; /* Add gap between buttons */
      margin-top: 0 !important; 
    }
    
    .answer-input {
      flex: 1;
      border-radius: 8px;
      background-color: rgba(31, 36, 41, 0.05);
      width: 100%;
      max-width: 318px; /* Match the max-width of options-wrapper */
      padding: 8px 14px; /* Slightly reduce vertical padding */
      border: 1px solid rgba(31, 36, 41, 0.2);
      margin-top: -20px !important; /* Shift text box up */
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    textarea {
      width: 100%;
      height: 150px; /* Increase height to make the text box larger */
      background-color: transparent;
      border: none;
      color: #fff;
      outline: none;
      resize: none;
      text-align: left; /* Align text to the left */
      font-size: 15px;
      line-height: 1.5;
    }
    
    textarea::placeholder {
      color: rgba(255, 255, 255, 0.6); /* Placeholder color */
    }
    
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
  </style>
  <div class="survey-container">
    <h2 class="question-title">
      Generalmente ¿Podría calificar al Hotel dejando un comentario sobre su estadia?
    </h2>
    <form class="options-wrapper" role="form">
      <label for="answerText" class="visually-hidden">Type your answer here</label>
      <div class="answer-input">
        <textarea
          id="answerText"
          name="answerText"
          aria-label="Type your answer here"
          rows="4"
          tabindex="0"
          placeholder="Expresa tu comentario"></textarea>
      </div>
    </form>
  </div>
` : ''}
              </div>
              <footer class="footer">
                <img class="LOGO-LINEAS-negro" src="${this.getAttribute('logo-src')}" />
                <div class="rectangle"></div>
                <div class="frame-3">
                  <button class="base-button button-rechazar">${this.getAttribute('rechazar-text')}</button>
                  <button class="base-button button-aceptar">${this.getAttribute('aceptar-text')}</button>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
      <style>
      .guest-info-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          margin-top: 5px; /* Add margin to separate from progress bar */
      }
      .question-title {
          width: 100%;
          color: var(--White-White, #fff);
          font: 600 14px/1 Inter, sans-serif;
          margin: 6px 0;
          text-align: initial;
      }
      .input-wrapper {
          display: flex;
          min-height: 36px;
          width: 100%;
          max-width: 318px;
          flex-direction: column;
          color: rgba(31, 36, 41, 0.6);
          font: 500 15px/20px Inter, sans-serif;
      }
      .text-input {
          flex: 1;
          border-radius: 10px;
          background-color: rgba(31, 36, 41, 0.05);
          min-height: 36px;
          width: 100%;
          padding: 10px;
          border: 1px solid rgba(31, 36, 41, 0.2);
      }
      .date-input-wrapper {
          border-radius: 10px;
          background-color: rgba(31, 36, 41, 0.05);
          display: flex;
          width: 100%;
          align-items: center;
          gap: 10px;
          padding: 8px;
          border: 1px solid rgba(31, 36, 41, 0.2);
          flex-direction: row; /* Coloca el botón a la izquierda */
      }
      .mic-button {
          border-radius: 6px;
          background-color: rgba(31, 36, 41, 0.2);
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 4px;
      }
      .mic-icon {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 16px;
      }
      .date-placeholder {
          color: rgba(31, 36, 41, 0.6);
          flex: 1;
          font: 500 15px/1 Inter, sans-serif;
          border-radius: 10px;
          background-color: rgba(31, 36, 41, 0.05);
          height: 30px; /* Reduce la altura */
          padding: 5px; /* Reduce el padding */
          border: 1px solid rgba(31, 36, 41, 0.2);
      }
      .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
      }
      </style>
    `;
    this.addOptionButtonListeners();
  }

  addOptionButtonListeners() {
    if (this.isThirdSurvey() || this.isFourthSurveyOrBeyond()) {
      const buttons = this.shadowRoot.querySelectorAll('.option-button');
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          buttons.forEach(btn => btn.setAttribute('aria-checked', 'false'));
          button.setAttribute('aria-checked', 'true');
          this.dispatchEvent(new CustomEvent('option-selected', {
            detail: {
              question: this.getAttribute("question-text"),
              answer: button.textContent.trim()
            },
            bubbles: true,
            composed: true
          }));
        });
      });
    }
  }

  isFirstSurvey() {
    return this === document.querySelector('survey-widget');
  }

  isSecondSurvey() {
    return this === document.querySelectorAll('survey-widget')[1];
  }

  isThirdSurvey() {
    return this === document.querySelectorAll('survey-widget')[2];
  }

  isFourthSurveyOrBeyond() {
    const index = Array.from(document.querySelectorAll('survey-widget')).indexOf(this);
    return index >= 3; // Ensure the index is correct
  }

  isLastSurvey() {
    const allWidgets = document.querySelectorAll('survey-widget');
    return Array.from(allWidgets).indexOf(this) === allWidgets.length - 1;
  }
}

customElements.define("survey-widget", SurveyWidget);
