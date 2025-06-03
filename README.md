# Snipify: Code Snippet Collector

A Chrome extension that helps developers collect, organize, and manage code snippets directly from their browser.

## Features

- **Easy Snippet Collection**: Save code snippets with a simple copy-paste interface
- **Tagging System**: Organize snippets with custom tags for better categorization
- **Search Functionality**: Quickly find snippets using tag-based search
- **Import/Export**: Backup and restore your snippets with JSON import/export
- **Clean Interface**: User-friendly popup interface with tabbed navigation

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/Kunalagarwal26/Snipify-Code-Snippet-Collector.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory

## Usage

1. Click the Snipify icon in your Chrome toolbar to open the popup
2. Use the "Add Snippet" tab to:
   - Paste your code snippet
   - Add relevant tags (comma-separated)
   - Save the snippet
3. Use the "Saved Snippets" tab to:
   - View all saved snippets
   - Search snippets by tags
   - Export your snippets to JSON
   - Import snippets from a JSON file

## Project Structure

```
├── manifest.json      # Extension configuration
├── popup.html        # Main popup interface
├── popup.js          # Popup functionality
├── background.js     # Background service worker
├── content.js        # Content script for webpage interaction
├── styles.css        # UI styling
└── icon.png          # Extension icon
```

## Development

### Prerequisites

- Google Chrome browser
- Basic knowledge of JavaScript and Chrome Extension development

### Building from Source

1. Clone the repository:
   ```bash
   git clone https://github.com/Kunalagarwal26/Snipify-Code-Snippet-Collector.git
   ```

2. Make your changes to the code

3. Load the extension in Chrome:
   - Go to `chrome://extensions/`
   - Enable Developer mode
   - Click "Load unpacked"
   - Select the project directory

### Testing

1. After making changes, reload the extension in `chrome://extensions/`
2. Test the functionality in the browser
3. Check the browser console for any errors

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Chrome Extension Manifest V3
- Uses Chrome Storage API for data persistence 