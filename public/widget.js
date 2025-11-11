/**
 * AI Agent Webcall Widget
 * A customizable widget for initiating webcalls with AI agents
 */

(function() {
  'use strict';

  // Default configuration
  const defaultConfig = {
    position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
    primaryColor: '#007bff',
    buttonText: 'Hablar con Agente IA',
    agentName: 'Asistente IA',
    agentAvatar: null,
    greeting: '¡Hola! ¿En qué puedo ayudarte hoy?',
    callEndpoint: null, // URL to initiate the call
    apiKey: null, // API key for authentication
    onCallStart: null,
    onCallEnd: null,
    onError: null
  };

  class AIWebcallWidget {
    constructor(config = {}) {
      this.config = { ...defaultConfig, ...config };
      this.isOpen = false;
      this.inCall = false;
      this.container = null;
      this.init();
    }

    init() {
      this.injectStyles();
      this.createWidget();
      this.attachEventListeners();
    }

    injectStyles() {
      if (document.getElementById('ai-webcall-widget-styles')) {
        return;
      }

      const link = document.createElement('link');
      link.id = 'ai-webcall-widget-styles';
      link.rel = 'stylesheet';
      link.href = this.getStylesheetPath();
      document.head.appendChild(link);
    }

    getStylesheetPath() {
      const script = document.currentScript || document.querySelector('script[src*="widget.js"]');
      if (script) {
        const scriptPath = script.src;
        return scriptPath.replace('widget.js', 'widget.css');
      }
      return 'widget.css';
    }

    createWidget() {
      // Create main container
      this.container = document.createElement('div');
      this.container.className = 'ai-webcall-widget';
      this.container.setAttribute('data-position', this.config.position);

      // Create widget button
      const button = document.createElement('button');
      button.className = 'ai-webcall-widget-button';
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      `;
      button.style.backgroundColor = this.config.primaryColor;

      // Create widget panel
      const panel = document.createElement('div');
      panel.className = 'ai-webcall-widget-panel';
      panel.innerHTML = `
        <div class="ai-webcall-widget-header">
          <div class="ai-webcall-widget-agent-info">
            ${this.config.agentAvatar ? 
              `<img src="${this.config.agentAvatar}" alt="${this.config.agentName}" class="ai-webcall-widget-avatar">` :
              `<div class="ai-webcall-widget-avatar-placeholder" style="background-color: ${this.config.primaryColor}">
                ${this.config.agentName.charAt(0).toUpperCase()}
              </div>`
            }
            <div class="ai-webcall-widget-agent-details">
              <span class="ai-webcall-widget-agent-name">${this.config.agentName}</span>
              <span class="ai-webcall-widget-agent-status">Disponible</span>
            </div>
          </div>
          <button class="ai-webcall-widget-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="ai-webcall-widget-body">
          <div class="ai-webcall-widget-greeting">${this.config.greeting}</div>
          <button class="ai-webcall-widget-call-button" style="background-color: ${this.config.primaryColor}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            ${this.config.buttonText}
          </button>
          <div class="ai-webcall-widget-call-status" style="display: none;">
            <div class="ai-webcall-widget-call-animation">
              <div class="ai-webcall-widget-call-pulse"></div>
            </div>
            <p class="ai-webcall-widget-call-text">Conectando...</p>
            <button class="ai-webcall-widget-end-call-button" style="background-color: #dc3545;">
              Finalizar Llamada
            </button>
          </div>
        </div>
      `;

      this.container.appendChild(button);
      this.container.appendChild(panel);
      document.body.appendChild(this.container);
    }

    attachEventListeners() {
      const button = this.container.querySelector('.ai-webcall-widget-button');
      const closeButton = this.container.querySelector('.ai-webcall-widget-close');
      const callButton = this.container.querySelector('.ai-webcall-widget-call-button');
      const endCallButton = this.container.querySelector('.ai-webcall-widget-end-call-button');

      button.addEventListener('click', () => this.togglePanel());
      closeButton.addEventListener('click', () => this.closePanel());
      callButton.addEventListener('click', () => this.startCall());
      endCallButton.addEventListener('click', () => this.endCall());
    }

    togglePanel() {
      if (this.isOpen) {
        this.closePanel();
      } else {
        this.openPanel();
      }
    }

    openPanel() {
      const panel = this.container.querySelector('.ai-webcall-widget-panel');
      panel.style.display = 'block';
      setTimeout(() => {
        panel.classList.add('open');
      }, 10);
      this.isOpen = true;
    }

    closePanel() {
      const panel = this.container.querySelector('.ai-webcall-widget-panel');
      panel.classList.remove('open');
      setTimeout(() => {
        panel.style.display = 'none';
      }, 300);
      this.isOpen = false;
    }

    async startCall() {
      if (this.inCall) return;

      try {
        this.inCall = true;
        this.showCallStatus('Connecting...');

        // Call the onCallStart callback if provided
        if (typeof this.config.onCallStart === 'function') {
          await this.config.onCallStart();
        }

        // If callEndpoint is provided, make an API call
        if (this.config.callEndpoint) {
          const headers = {
            'Content-Type': 'application/json'
          };
          
          // Add API key to headers if provided
          if (this.config.apiKey) {
            headers['Authorization'] = `Bearer ${this.config.apiKey}`;
          }
          
          const response = await fetch(this.config.callEndpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              timestamp: new Date().toISOString()
            })
          });

          if (!response.ok) {
            throw new Error('Failed to initiate call');
          }

          const data = await response.json();
          this.showCallStatus('Conectado');
          
          // Handle the call connection (this would integrate with WebRTC or similar)
          console.log('Call initiated:', data);
        } else {
          // Simulate call connection for demo purposes
          setTimeout(() => {
            this.showCallStatus('Conectado');
          }, 1500);
        }
      } catch (error) {
        console.error('Error starting call:', error);
        this.handleError(error);
        this.inCall = false;
        this.hideCallStatus();
      }
    }

    endCall() {
      if (!this.inCall) return;

      this.inCall = false;
      this.hideCallStatus();

      // Call the onCallEnd callback if provided
      if (typeof this.config.onCallEnd === 'function') {
        this.config.onCallEnd();
      }
    }

    showCallStatus(text) {
      const callButton = this.container.querySelector('.ai-webcall-widget-call-button');
      const callStatus = this.container.querySelector('.ai-webcall-widget-call-status');
      const callText = this.container.querySelector('.ai-webcall-widget-call-text');

      callButton.style.display = 'none';
      callStatus.style.display = 'block';
      callText.textContent = text;
    }

    hideCallStatus() {
      const callButton = this.container.querySelector('.ai-webcall-widget-call-button');
      const callStatus = this.container.querySelector('.ai-webcall-widget-call-status');

      callStatus.style.display = 'none';
      callButton.style.display = 'flex';
    }

    handleError(error) {
      alert('Error al iniciar la llamada. Por favor, inténtalo de nuevo.');
      
      if (typeof this.config.onError === 'function') {
        this.config.onError(error);
      }
    }

    destroy() {
      if (this.container) {
        this.container.remove();
      }
    }
  }

  // Expose the widget to the global scope
  window.AIWebcallWidget = AIWebcallWidget;

  // Auto-initialize if data attributes are present
  document.addEventListener('DOMContentLoaded', function() {
    const autoInitElement = document.querySelector('[data-ai-webcall-widget]');
    if (autoInitElement) {
      const config = {
        position: autoInitElement.dataset.position,
        primaryColor: autoInitElement.dataset.primaryColor,
        buttonText: autoInitElement.dataset.buttonText,
        agentName: autoInitElement.dataset.agentName,
        agentAvatar: autoInitElement.dataset.agentAvatar,
        greeting: autoInitElement.dataset.greeting,
        callEndpoint: autoInitElement.dataset.callEndpoint,
        apiKey: autoInitElement.dataset.apiKey
      };
      
      // Remove undefined values
      Object.keys(config).forEach(key => {
        if (config[key] === undefined) {
          delete config[key];
        }
      });

      new AIWebcallWidget(config);
    }
  });
})();
