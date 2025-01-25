class SurveyComments extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          .widget {
            position: relative;
            display: flex;
            flex-direction: column;
            width: 90%;
            max-width: 580px;
            height: auto;
            margin: auto;
            box-shadow: 0px 20px 25px #1c1b2126;
            border-radius: 32px;
            background-color: #ffffff;
            animation: slide-in 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
            padding: 20px;
            text-align: center;
          }
  
          .question-title {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
          }
  
          .answer-input {
            width: 100%;
            height: 150px;
            padding: 10px;
            border-radius: 8px;
            border: 1px solid rgba(31, 36, 41, 0.2);
            background-color: rgba(31, 36, 41, 0.05);
            font-size: 16px;
            resize: none;
          }
  
          .button-container {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
          }
  
          .button {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
          }
  
          .button-rechazar {
            background-color: #ccc;
            color: #333;
          }
  
          .button-aceptar {
            background-color: #628BCB;
            color: white;
          }
        </style>
  
        <div class="widget">
          <div class="question-title">
            Generalmente, ¿Podría calificar al Hotel dejando un comentario sobre su estadía?
          </div>
          <textarea class="answer-input" placeholder="Escriba su comentario aquí..."></textarea>
          <div class="button-container">
            <button class="button button-rechazar">Anterior</button>
            <button class="button button-aceptar">Enviar</button>
          </div>
        </div>
      `;
    }
  }
  
  customElements.define("survey-comments", SurveyComments);
  