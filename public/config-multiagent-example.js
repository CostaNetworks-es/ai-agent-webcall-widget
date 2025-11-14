// Example configuration for multiple agents
// Copy this to config.js and update with your actual agent IDs

window.AI_WIDGET_CONFIG = {
  // ===== API CONFIGURATION =====
  callEndpoint: 'https://api.retellai.com/v2/create-web-call',
  apiKey: 'your-retell-api-key-here',
  
  // ===== MULTIPLE AGENTS SETUP =====
  enableMultipleAgents: true,
  showAgentSelector: true,
  
  // Define your specialized agents
  agents: {
    // Mexican Spanish Agent
    carlos: {
      agentName: 'Agente Carlos',
      agentId: 'agent_carlos_mx_001', // ← Replace with your actual agent ID
      primaryColor: '#059669',
      buttonText: 'Hablar con Carlos',
      greeting: '¡Hola! Soy Carlos, tu asistente virtual mexicano. ¿En qué puedo ayudarte, compadre?',
      metadata: { 
        accent: 'mexican', 
        region: 'mx',
        language: 'es' 
      }
    },
    
    // Castilian Spanish Agent
    carmen: {
      agentName: 'Agente Carmen',
      agentId: 'agent_carmen_es_001', // ← Replace with your actual agent ID
      primaryColor: '#dc2626',
      buttonText: 'Hablar con Carmen',
      greeting: '¡Hola! Soy Carmen, vuestra asistente de España. ¿En qué puedo ayudaros?',
      metadata: { 
        accent: 'castilian', 
        region: 'es',
        language: 'es' 
      }
    },
    
    // American English Agent
    isabella: {
      agentName: 'Agent Isabella',
      agentId: 'agent_isabella_us_001', // ← Replace with your actual agent ID
      primaryColor: '#7c3aed',
      buttonText: 'Talk to Isabella',
      greeting: 'Hi! I\'m Isabella, your English-speaking assistant. How can I help you today?',
      metadata: { 
        accent: 'american', 
        region: 'us',
        language: 'en' 
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