// Configuration file for AI Webcall Widget
// Copy this file to config.js and update with your values
// Add config.js to .gitignore to keep your API key secure

window.AI_WIDGET_CONFIG = {
  // Your API endpoint for initiating calls
  callEndpoint: 'https://api.retellai.com/v2/create-web-call',
  
  // Your API key for authentication
  apiKey: 'public_key_4db1c113d457f03adf35c',
  
  // ===== SINGLE AGENT CONFIGURATION =====
  // Use this for single agent setup (traditional mode)
  
  // Agent ID from Retell AI Dashboard (REQUIRED for single agent)
  // Get this from: https://dashboard.retellai.com/dashboard/agent
  agentId: 'agent_e94333dabc8e9fcc92b32a33cb', // TODO: Replace with your actual agent ID
  
  // Optional: Agent version (defaults to latest if not specified)
  agentVersion: 0,
  
  // Optional: Custom metadata for tracking
  metadata: {
    source: 'website-widget',
    page: 'home'
  },
  
  // Optional: Dynamic variables for the LLM
  retellLlmDynamicVariables: {
    customer_name: 'Visitante'
  },
  
  // Optional: Customize widget appearance
  agentName: 'Asistente IA',
  primaryColor: '#007bff',
  position: 'bottom-right',
  
  // ===== MULTIPLE AGENTS CONFIGURATION =====
  // Enable this section for multiple agents support
  
  // Set to true to enable multiple agents mode
  enableMultipleAgents: false, // Change to true to enable multiple agents
  
  // Show agent selector in widget panel (only when enableMultipleAgents is true)
  showAgentSelector: true,
  
  // Define your agents here (only used when enableMultipleAgents is true)
  agents: {
    // Agente Carlos - Español Mexicano
    carlos: {
      agentName: 'Agente Carlos',
      agentId: 'agent_carlos_mx_001', // TODO: Replace with your actual agent ID
      agentVersion: 0,
      primaryColor: '#059669',
      buttonText: 'Hablar con Carlos',
      greeting: '¡Hola! Soy Carlos, tu asistente virtual especializado en atención al cliente para México y Centroamérica. ¿En qué puedo ayudarte hoy, compadre?',
      metadata: { 
        accent: 'mexican', 
        region: 'mx',
        language: 'es',
        specialization: 'customer_service'
      },
      retellLlmDynamicVariables: {
        agent_personality: 'mexican_friendly',
        greeting_style: 'informal_mexican'
      }
    },
    
    // Agente Carmen - Español Castellano
    carmen: {
      agentName: 'Agente Carmen',
      agentId: 'agent_carmen_es_001', // TODO: Replace with your actual agent ID
      agentVersion: 0,
      primaryColor: '#dc2626',
      buttonText: 'Hablar con Carmen',
      greeting: '¡Hola! Soy Carmen, vuestra asistente virtual de España. Estoy aquí para ayudaros con lo que necesitéis. ¿En qué puedo serviros?',
      metadata: { 
        accent: 'spanish', 
        region: 'es',
        language: 'es',
        specialization: 'customer_service'
      },
      retellLlmDynamicVariables: {
        agent_personality: 'spanish_formal',
        greeting_style: 'formal_spanish'
      }
    },
    
    // Agente Sofía - Español Argentino
    sofia: {
      agentName: 'Agente Sofía',
      agentId: 'agent_sofia_ar_001', // TODO: Replace with your actual agent ID
      agentVersion: 0,
      primaryColor: '#0ea5e9',
      buttonText: 'Hablar con Sofía',
      greeting: '¡Hola, che! Soy Sofía, tu asistente virtual de Argentina. Estoy acá para ayudarte con lo que necesites. ¿Cómo andás?',
      metadata: { 
        accent: 'argentinian', 
        region: 'ar',
        language: 'es',
        specialization: 'customer_service'
      },
      retellLlmDynamicVariables: {
        agent_personality: 'argentinian_casual',
        greeting_style: 'informal_argentinian'
      }
    },
    
    // Agente Alejandro - Español Colombiano
    alejandro: {
      agentName: 'Agente Alejandro',
      agentId: 'agent_alejandro_co_001', // TODO: Replace with your actual agent ID
      agentVersion: 0,
      primaryColor: '#eab308',
      buttonText: 'Hablar con Alejandro',
      greeting: '¡Hola! Soy Alejandro, tu asistente virtual colombiano. Con mucho gusto te voy a ayudar en lo que necesites. ¿Qué tal el día?',
      metadata: { 
        accent: 'colombian', 
        region: 'co',
        language: 'es',
        specialization: 'customer_service'
      },
      retellLlmDynamicVariables: {
        agent_personality: 'colombian_polite',
        greeting_style: 'formal_colombian'
      }
    },
    
    // Agent Isabella - American English
    isabella: {
      agentName: 'Agent Isabella',
      agentId: 'agent_isabella_us_001', // TODO: Replace with your actual agent ID
      agentVersion: 0,
      primaryColor: '#7c3aed',
      buttonText: 'Talk to Isabella',
      greeting: 'Hi there! I\'m Isabella, your English-speaking AI assistant. I\'m here to help you with whatever you need. How can I assist you today?',
      metadata: { 
        accent: 'american', 
        region: 'us',
        language: 'en',
        specialization: 'customer_service'
      },
      retellLlmDynamicVariables: {
        agent_personality: 'american_professional',
        greeting_style: 'friendly_professional'
      }
    },
    
    // Agente Genérico - Configuración base
    generic: {
      agentName: 'Agente IA Costa Networks',
      agentId: 'agent_generic_001', // TODO: Replace with your actual agent ID
      agentVersion: 0,
      primaryColor: '#667eea',
      buttonText: 'Hablar con Agente IA',
      greeting: '¡Hola! Soy tu agente de voz inteligente. Estoy aquí para mostrarte cómo funciona nuestra tecnología de IA conversacional. ¿En qué puedo ayudarte?',
      metadata: { 
        accent: 'neutral', 
        region: 'generic',
        language: 'es',
        specialization: 'general'
      },
      retellLlmDynamicVariables: {
        agent_personality: 'neutral_professional',
        greeting_style: 'standard'
      }
    }
  },
  
  // Callback functions for multi-agent events
  onAgentChange: function(agentKey, agentConfig) {
    console.log('Agent changed to:', agentKey, agentConfig);
    // Add your custom logic here when agent changes
    // Example: Track analytics, update UI, etc.
  }
};
