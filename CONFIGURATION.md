# Configuration Guide

This file explains how to configure the AI Agent Webcall Widget for your use case.

## API Key Configuration

The widget supports API key configuration for authenticating with your backend service. There are multiple ways to configure it:

### Option 1: Via JavaScript Configuration

```html
<script>
  new AIWebcallWidget({
    position: 'bottom-right',
    primaryColor: '#007bff',
    agentName: 'AI Assistant',
    callEndpoint: 'https://your-api.example.com/initiate-call',
    apiKey: 'your-api-key-here', // Add your API key
    onCallStart: function() {
      console.log('Call started');
    }
  });
</script>
```

### Option 2: Via Data Attributes

```html
<div data-ai-webcall-widget
     data-position="bottom-right"
     data-primary-color="#007bff"
     data-agent-name="AI Assistant"
     data-call-endpoint="https://your-api.example.com/initiate-call"
     data-api-key="your-api-key-here">
</div>
```

### Option 3: Via Environment Variables (Recommended for Production)

For production deployments, it's recommended to use environment variables to avoid exposing API keys in your code.

1. Create a configuration file (not committed to git):

```javascript
// config.js (add this to .gitignore)
window.AI_WIDGET_CONFIG = {
  apiKey: 'your-api-key-here',
  callEndpoint: 'https://your-api.example.com/initiate-call'
};
```

2. Include it before the widget script:

```html
<script src="config.js"></script>
<script src="widget.js"></script>

<script>
  new AIWebcallWidget({
    position: 'bottom-right',
    apiKey: window.AI_WIDGET_CONFIG.apiKey,
    callEndpoint: window.AI_WIDGET_CONFIG.callEndpoint
  });
</script>
```

## Hosting Options

### Option 1: GitHub Pages (Simplest)

This repository is configured with GitHub Actions to automatically deploy to GitHub Pages:

1. Go to your repository Settings → Pages
2. Under "Build and deployment", select "GitHub Actions" as the source
3. The widget will be available at: `https://your-username.github.io/ai-agent-webcall-widget/`
4. Use the workflow file at `.github/workflows/deploy.yml` (configured to use your `costa-runner`)

**⚠️ Repository Visibility Requirements:**
- **Free GitHub account**: Repository must be **public** to use GitHub Pages
- **GitHub Pro/Team/Enterprise**: Can use GitHub Pages with **private** repositories

**Alternative for private repos (free account):**
- Deploy to Netlify, Vercel, Cloudflare Pages, or Firebase (supports private repos)
- Create a separate public repo for distribution only
- Self-host on your own server

### Option 2: Firebase Hosting (Recommended for Private Repos)

Firebase Hosting is an excellent alternative that works with private repositories:

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login and initialize:**
   ```bash
   firebase login
   firebase init hosting
   ```
   - Select your Firebase project (or create a new one)
   - Set public directory to `.` (current directory)
   - Configure as single-page app: No
   - Don't overwrite existing files

3. **Deploy:**
   ```bash
   firebase deploy --only hosting
   ```

4. **Access your widget at:** `https://your-project.web.app`

**Benefits:**
- Works with private repositories
- Free SSL certificates
- Global CDN distribution
- Custom domain support
- Simple CLI deployment

### Option 3: Static File Hosting

Simply upload the following files to any web server or CDN:
- `widget.js`
- `widget.css`
- `example.html` (optional, for demo)

Services you can use:
- Netlify (drag & drop)
- Vercel
- AWS S3 + CloudFront
- Cloudflare Pages
- Any web hosting service

### Option 4: NPM/CDN

You can also serve the widget files via a CDN:

1. Upload files to your CDN
2. Reference them in your HTML:

```html
<link rel="stylesheet" href="https://cdn.example.com/widget.css">
<script src="https://cdn.example.com/widget.js"></script>
```

## Backend API Endpoint

The widget expects your backend API endpoint to:

1. Accept POST requests
2. Return JSON response with call connection details
3. (Optional) Validate the API key sent in headers

Example backend endpoint structure:

```javascript
// POST /initiate-call
{
  "timestamp": "2025-11-10T22:00:00.000Z"
}

// Expected response:
{
  "callId": "unique-call-id",
  "connectionUrl": "wss://your-webrtc-server.com/connect",
  "token": "session-token"
}
```

The widget will send the API key in the `Authorization` header if configured:

```
Authorization: Bearer your-api-key-here
```

## Security Best Practices

1. **Never commit API keys to git** - Add `config.js` to `.gitignore`
2. **Use environment variables** in production
3. **Rotate API keys regularly**
4. **Use HTTPS** for all API endpoints
5. **Implement rate limiting** on your backend
6. **Validate API keys** on your backend

## GitHub Actions Configuration

The repository includes a GitHub Actions workflow that:
- Runs on your self-hosted runner (`costa-runner`)
- Automatically deploys to GitHub Pages on push to `main`
- Can be manually triggered via workflow dispatch

To use it:
1. Ensure your self-hosted runner is set up and labeled as `costa-runner`
2. Enable GitHub Pages in repository settings
3. Push to the `main` branch to trigger deployment

## Multiple Agents Configuration

The widget supports multiple agents with different specializations, accents, and configurations. This is perfect for:
- **International businesses** serving different markets
- **A/B testing** different agent personalities
- **Specialized services** by region or language
- **Customer segmentation** by preferences

### Enabling Multiple Agents

1. **In config.js**, set `enableMultipleAgents: true`:

```javascript
window.AI_WIDGET_CONFIG = {
  // Enable multiple agents support
  enableMultipleAgents: true,
  
  // Show agent selector in widget (optional)
  showAgentSelector: true,
  
  // Define your agents
  agents: {
    carlos: {
      agentName: 'Agente Carlos',
      agentId: 'your_carlos_agent_id', // From Retell AI Dashboard
      primaryColor: '#059669',
      greeting: '¡Hola! Soy Carlos, tu asistente mexicano...',
      metadata: { accent: 'mexican', region: 'mx' }
    },
    isabella: {
      agentName: 'Agent Isabella',
      agentId: 'your_isabella_agent_id', // From Retell AI Dashboard
      primaryColor: '#7c3aed',
      greeting: 'Hi! I\'m Isabella, your English assistant...',
      metadata: { accent: 'american', region: 'us', language: 'en' }
    }
    // Add more agents as needed
  }
};
```

2. **Initialize the widget** with multi-agent support:

```javascript
new AIWebcallWidget({
  ...window.AI_WIDGET_CONFIG,
  onAgentChange: function(agentKey, agentConfig) {
    console.log('Agent changed:', agentKey);
    // Track agent selection in analytics
  }
});
```

### Agent Configuration Options

Each agent in the `agents` object supports these properties:

```javascript
{
  // Required
  agentName: 'Agent Name',
  agentId: 'retell_agent_id', // From Retell AI Dashboard
  
  // Optional - Appearance
  primaryColor: '#007bff',
  agentAvatar: 'https://example.com/avatar.jpg',
  buttonText: 'Talk to Agent',
  greeting: 'Custom greeting message...',
  
  // Optional - Retell AI Configuration
  agentVersion: 0,
  metadata: {
    accent: 'american',
    region: 'us',
    language: 'en',
    specialization: 'support'
  },
  retellLlmDynamicVariables: {
    agent_personality: 'professional',
    greeting_style: 'formal'
  }
}
```

### Using Pre-configured Agents

The `config.js` includes 6 pre-configured agents:

- **🇲🇽 Agente Carlos** - Mexican Spanish (friendly, uses "compadre")
- **🇪🇸 Agente Carmen** - Castilian Spanish (formal, uses "vosotros")
- **🇦🇷 Agente Sofía** - Argentinian Spanish (casual, uses "che")
- **🇨🇴 Agente Alejandro** - Colombian Spanish (polite, neutral accent)
- **🇺🇸 Agent Isabella** - American English (professional)
- **🤖 Generic Agent** - Customizable baseline

**To use them:**
1. Update the `agentId` values with your actual Retell AI agent IDs
2. Set `enableMultipleAgents: true`
3. Deploy and test!

### Creating Agent Selection UI

The widget automatically includes an agent selector when `enableMultipleAgents: true`. You can also create custom agent selection:

```html
<!-- Custom agent selection buttons -->
<div class="agent-selection">
  <button onclick="selectAgent('carlos')">🇲🇽 Agente Carlos</button>
  <button onclick="selectAgent('isabella')">🇺🇸 Agent Isabella</button>
</div>

<script>
function selectAgent(agentKey) {
  // This function is available globally when multi-agent is enabled
  window.selectAgent(agentKey);
}
</script>
```

### Agent Metadata Usage

Use metadata to:
- **Track analytics** by agent type
- **Customize behavior** based on region/language
- **Route conversations** to appropriate specialists
- **A/B test** different approaches

```javascript
onAgentChange: function(agentKey, agentConfig) {
  // Send to analytics
  gtag('event', 'agent_selected', {
    agent_id: agentKey,
    accent: agentConfig.metadata.accent,
    region: agentConfig.metadata.region
  });
  
  // Update page language if needed
  if (agentConfig.metadata.language === 'en') {
    document.documentElement.lang = 'en';
  }
}
```

## Single Agent Configuration (Traditional)

For simple use cases, keep `enableMultipleAgents: false` and use:

```javascript
window.AI_WIDGET_CONFIG = {
  enableMultipleAgents: false,
  
  // Single agent configuration
  agentId: 'your-agent-id',
  agentName: 'Support Agent',
  primaryColor: '#007bff',
  // ... other single agent options
};
```

## Example Integration

Complete example with all options:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  
  <!-- Widget CSS -->
  <link rel="stylesheet" href="widget.css">
</head>
<body>
  <h1>My Website</h1>
  
  <!-- Configuration -->
  <script src="config.js"></script>
  
  <!-- Widget JS -->
  <script src="widget.js"></script>
  
  <!-- Initialize Widget -->
  <script>
    new AIWebcallWidget({
      // Use configuration from config.js
      ...window.AI_WIDGET_CONFIG,
      
      // Override specific options if needed
      position: 'bottom-right',
      
      // Callbacks
      onCallStart: async function() {
        console.log('Call starting...');
        // Your custom logic here
      },
      onCallEnd: function() {
        console.log('Call ended');
        // Your custom logic here
      },
      onError: function(error) {
        console.error('Error:', error);
        // Your error handling here
      },
      onAgentChange: function(agentKey, agentConfig) {
        console.log('Agent changed to:', agentKey);
        // Track in analytics, update UI, etc.
      }
    });
  </script>
</body>
</html>
```

## Need Help?

- Check the [README.md](README.md) for general documentation
- See [example.html](example.html) for a working demo
- Open an issue on GitHub for questions or problems
