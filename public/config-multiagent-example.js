// Example configuration for multiple agents
// Copy this to config.js and update with your actual agent IDs

window.AI_WIDGET_CONFIG = {
  // ===== API CONFIGURATION =====
  callEndpoint: 'https://api.retellai.com/v2/create-web-call',
  apiKey: 'public_key_4db1c113d457f03adf35c',
  
  // ===== MULTIPLE AGENTS SETUP =====
  enableMultipleAgents: true,
  showAgentSelector: true,
  
  // Define your specialized agents
  agents: {
     // Agente Carmen - Español Castellano
    carmen: {
      agentName: 'Agente Carmen',
      agentId: 'agent_e94333dabc8e9fcc92b32a33cb', // TODO: Replace with your actual agent ID
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
    // Agente Carlos - Español Mexicano
    carlos: {
      agentName: 'Agente Carlos',
      agentId: 'agent_e94333dabc8e9fcc92b32a33cb', // TODO: Replace with your actual agent ID
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
    
    // Agente Sofía - Español Argentino
    sofia: {
      agentName: 'Agente Sofía',
      agentId: 'agent_e94333dabc8e9fcc92b32a33cb', // TODO: Replace with your actual agent ID
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
      agentId: 'agent_e94333dabc8e9fcc92b32a33cb', // TODO: Replace with your actual agent ID
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
      agentId: 'agent_e94333dabc8e9fcc92b32a33cb', // TODO: Replace with your actual agent ID
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
      agentId: 'agent_e94333dabc8e9fcc92b32a33cb', // TODO: Replace with your actual agent ID
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
  
  // ===== CALLBACKS =====
  onAgentChange: function(agentKey, agentConfig) {
    console.log('Agent changed to:', agentKey, agentConfig.agentName);
  }
};

// ===== QUICK SETUP GUIDE =====
/*
1. Get your agent IDs from Retell AI Dashboard:
   - Go to: https://dashboard.retellai.com/dashboard/agent
   - Copy each agent ID and replace the example IDs above

2. Update your API key:
   - Replace 'your-retell-api-key-here' with your actual API key

3. Enable multiple agents:
   - Set enableMultipleAgents: true (already done above)

4. Test your setup:
   - Open your website
   - Click the widget button
   - You should see an agent selector dropdown
   - Each agent should have different colors and greetings

5. Optional customizations:
   - Add more agents to the 'agents' object
   - Customize colors, greetings, and metadata
   - Add onAgentChange callback for analytics
*/