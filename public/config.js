// Configuration file for AI Webcall Widget
// Copy this file to config.js and update with your values
// Add config.js to .gitignore to keep your API key secure

window.AI_WIDGET_CONFIG = {
  // Your API endpoint for initiating calls
  callEndpoint: 'https://api.retellai.com/v2/create-web-call',
  
  // Your API key for authentication
  apiKey: 'public_key_4db1c113d457f03adf35c',
  
  // Agent ID from Retell AI Dashboard (REQUIRED)
  // Get this from: https://dashboard.retellai.com/dashboard/agent
  // Example: 'oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD'
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
  position: 'bottom-right'
};
