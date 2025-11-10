# AI Agent Webcall Widget

A customizable, embeddable JavaScript widget that enables website visitors to initiate video calls with AI agents. Perfect for customer support, sales demos, and interactive AI assistants.

## ✨ Features

- 🚀 **Easy Integration** - Add to any website with just a few lines of code
- 🎨 **Fully Customizable** - Match your brand with custom colors, text, and positioning
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🎯 **Multiple Positions** - Place the widget in any corner of the screen
- 🔌 **Event Callbacks** - Hook into widget events with custom JavaScript functions
- 🌐 **WebRTC Ready** - Built to integrate with real-time video call infrastructure
- 💪 **Zero Dependencies** - Lightweight vanilla JavaScript with no external dependencies

## 🚀 Quick Start

### Basic Usage

1. **Include the widget files in your HTML:**

```html
<link rel="stylesheet" href="widget.css">
<script src="widget.js"></script>
```

2. **Initialize the widget:**

```html
<script>
  new AIWebcallWidget({
    position: 'bottom-right',
    primaryColor: '#007bff',
    agentName: 'AI Assistant',
    greeting: 'Hello! How can I help you today?'
  });
</script>
```

That's it! The widget will appear on your page ready to use.

### Auto-initialization with Data Attributes

Alternatively, you can use data attributes for simpler initialization:

```html
<div data-ai-webcall-widget
     data-position="bottom-right"
     data-primary-color="#007bff"
     data-agent-name="AI Assistant"
     data-greeting="Hello! How can I help you today?">
</div>
```

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `position` | string | `'bottom-right'` | Widget position: `'bottom-right'`, `'bottom-left'`, `'top-right'`, `'top-left'` |
| `primaryColor` | string | `'#007bff'` | Primary brand color for buttons and accents |
| `buttonText` | string | `'Talk to AI Agent'` | Text displayed on the call button |
| `agentName` | string | `'AI Assistant'` | Display name of the AI agent |
| `agentAvatar` | string | `null` | URL to agent's avatar image |
| `greeting` | string | `'Hello! How can I help you today?'` | Welcome message shown in the widget |
| `callEndpoint` | string | `null` | API endpoint to call when initiating a call |
| `apiKey` | string | `null` | API key for authentication (sent in Authorization header) |
| `onCallStart` | function | `null` | Callback fired when a call starts |
| `onCallEnd` | function | `null` | Callback fired when a call ends |
| `onError` | function | `null` | Error handler callback |

## 🔑 API Key Configuration

For secure API integration, see [CONFIGURATION.md](CONFIGURATION.md) for detailed setup instructions.

**Quick example with API key:**

```javascript
new AIWebcallWidget({
  callEndpoint: 'https://api.example.com/initiate-call',
  apiKey: 'your-api-key-here',
  agentName: 'Support Agent'
});
```

**Recommended: Use a separate config file (not committed to git):**

```html
<script src="config.js"></script>
<script src="widget.js"></script>
<script>
  new AIWebcallWidget({
    apiKey: window.AI_WIDGET_CONFIG.apiKey,
    callEndpoint: window.AI_WIDGET_CONFIG.callEndpoint
  });
</script>
```

See `config.js.example` for a template.

## 🌐 Hosting Options

### GitHub Pages (Recommended)

This repository includes GitHub Actions workflow for automatic deployment:

1. Enable GitHub Pages in your repository settings
2. Select "GitHub Actions" as the deployment source
3. Push to `main` branch - the widget will be automatically deployed
4. Access at: `https://your-username.github.io/ai-agent-webcall-widget/`

The workflow uses your self-hosted runner (`costa-runner`) for deployment.

### Other Hosting Options

You can host the widget files on any static hosting service:
- Netlify (drag & drop)
- Vercel
- AWS S3 + CloudFront
- Cloudflare Pages
- Any web hosting service

Simply upload `widget.js`, `widget.css`, and optionally `example.html`.

For detailed hosting instructions, see [CONFIGURATION.md](CONFIGURATION.md).

## 📖 Examples

### Custom Styling

```javascript
new AIWebcallWidget({
  position: 'bottom-left',
  primaryColor: '#8b5cf6',
  agentName: 'Support Bot',
  agentAvatar: 'https://example.com/avatar.jpg',
  greeting: 'Hi there! Need help? Start a video call with me.'
});
```

### With API Integration

```javascript
new AIWebcallWidget({
  callEndpoint: 'https://api.example.com/initiate-call',
  onCallStart: function() {
    console.log('Call is starting...');
    // Your custom logic here
  },
  onCallEnd: function() {
    console.log('Call has ended');
    // Your custom logic here
  },
  onError: function(error) {
    console.error('Call error:', error);
    // Handle errors
  }
});
```

### Multiple Agents

You can create multiple widget instances for different agents:

```javascript
// Support agent
const supportWidget = new AIWebcallWidget({
  position: 'bottom-right',
  agentName: 'Support Team',
  primaryColor: '#10b981'
});

// Sales agent
const salesWidget = new AIWebcallWidget({
  position: 'bottom-left',
  agentName: 'Sales Team',
  primaryColor: '#f59e0b'
});
```

## 🎯 API Methods

### Creating a Widget Instance

```javascript
const widget = new AIWebcallWidget(config);
```

### Destroying a Widget

```javascript
widget.destroy();
```

## 🔧 Integration with WebRTC

The widget is designed to work with your WebRTC infrastructure. When a call is initiated:

1. The widget fires the `onCallStart` callback
2. If `callEndpoint` is configured, it makes a POST request to your API
3. Your backend should return WebRTC connection details
4. You can handle the WebRTC connection in the `onCallStart` callback

Example backend integration:

```javascript
new AIWebcallWidget({
  callEndpoint: 'https://api.example.com/initiate-call',
  onCallStart: async function() {
    // Your WebRTC initialization code
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: true, 
      audio: true 
    });
    // Initialize WebRTC peer connection
    // ...
  }
});
```

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📦 File Structure

```
ai-agent-webcall-widget/
├── widget.js          # Main widget JavaScript
├── widget.css         # Widget styles
├── example.html       # Demo/example page
├── package.json       # Package metadata
└── README.md          # Documentation
```

## 🧪 Testing Locally

1. Clone the repository
2. Open `example.html` in your browser, or
3. Run a local server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using npm script
npm run serve
```

Then visit `http://localhost:8000/example.html`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this widget in your projects!

## 🆘 Support

For issues, questions, or feature requests, please open an issue on GitHub.

---

Made with ❤️ for better AI-human interactions