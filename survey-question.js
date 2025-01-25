class SurveyQuestion extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    static get observedAttributes() {
      return ["question-text"];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      this.render();
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
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
        </style>
  
        <div class="survey-container">
          <h2 class="question-title">${this.getAttribute("question-text") || "Pregunta no definida"}</h2>
          <div class="options-wrapper">
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
        </div>
      `;
  
      this.addOptionButtonListeners();
    }

    isThirdSurvey() {
      const index = Array.from(document.querySelectorAll('survey-widget')).indexOf(this.closest('survey-widget'));
      return index === 2; // Ensure the index is correct
    }
  
    addOptionButtonListeners() {
      const buttons = this.shadowRoot.querySelectorAll(".option-button");
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          buttons.forEach((btn) => btn.setAttribute("aria-checked", "false"));
          button.setAttribute("aria-checked", "true");
        });
      });
    }
  }
  
  customElements.define("survey-question", SurveyQuestion);
