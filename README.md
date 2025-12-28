# Jackson Hole Snow Tracker

A dynamic, real-time snow conditions dashboard featuring Jackson Hole ski conditions and a vintage split-flap display leaderboard of top US ski resorts.

## Features

### 🕐 Live Clock
- Real-time display of current date and time
- Updates every second

### ⛷️ Jackson Hole Current Conditions
- Temperature
- 24-hour snowfall
- Base depth
- Current conditions

### 🌨️ Dynamic Snow Animation
- Animated snowfall visualization
- Intensity varies based on current snowfall amount
- More snow = more snowflakes

### 📊 4-Week Snow History
- Visual bar chart showing daily snowfall
- Covers the past 28 days
- Easy-to-read snow accumulation trends

### 🏆 Top 10 Resorts Leaderboard
- Rankings of US ski resorts by 7-day snowfall
- **Vintage split-flap/flip display animation** (like old train station boards)
- Live updates with smooth flipping animations
- Gold/silver/bronze styling for top 3 resorts

## Getting Started

### Quick Start (View Demo)

Simply open `index.html` in any modern web browser:

```bash
# Option 1: Simple HTTP server (Python)
python3 -m http.server 8000
# Then visit http://localhost:8000

# Option 2: Simple HTTP server (Node.js)
npx http-server
```

### Getting Real Snow Data

To display actual, up-to-date snow conditions:

1. **Install dependencies:**
```bash
npm install
```

2. **Run the scraper to fetch current snow data:**
```bash
npm run scrape
```

This will scrape OnTheSnow.com and other resort websites to get real 7-day snowfall totals for top US resorts. The data is saved to `snow-data.json`.

3. **View the updated dashboard:**
```bash
npm start
# Or use: python3 -m http.server 8000
```

4. **Optional: Schedule regular updates**

To keep data fresh, you can set up a cron job (Linux/Mac) or Task Scheduler (Windows):

```bash
# Run scraper every 6 hours
0 */6 * * * cd /path/to/project && npm run scrape
```

## Technology Stack

- **HTML5** - Structure
- **CSS3** - Styling and animations
- **Vanilla JavaScript** - All functionality (no frameworks!)
- **Canvas API** - Snow animation and charts

## Features Breakdown

### Split-Flap Display
The leaderboard uses a custom-built split-flap display component that mimics vintage train station departure boards:
- Smooth flip animations
- Realistic mechanical appearance
- Automatic updates every 3-7 seconds
- Individual digit animations

### Snow Visualization
Dynamic particle system that:
- Generates snowflakes based on current snowfall
- Realistic physics (gravity, wind)
- Smooth 60fps animation

### Responsive Design
- Adapts to different screen sizes
- Mobile-friendly layout
- Grid-based responsive design

## Data Source

This project includes a web scraper (`scraper.js`) that fetches real-time snow data from public sources:

### What Gets Scraped

- **OnTheSnow.com** - 7-day snowfall totals for major US resorts
- **Resort statistics**: 24hr snowfall, base depth, temperature
- **Top 10 rankings**: Automatically sorted by 7-day snowfall

### Data Structure

The scraper creates a `snow-data.json` file with:

```json
{
  "lastUpdated": "2025-01-15T10:30:00.000Z",
  "jacksonHole": {
    "name": "Jackson Hole, WY",
    "snowfall24": 6,
    "snowfall7day": 18,
    "baseDepth": 95,
    "temperature": 22,
    "conditions": "Powder"
  },
  "top10Resorts": [
    {
      "name": "Alta Ski Area, UT",
      "snowfall7day": 24,
      ...
    }
  ],
  "snowHistory": [...]
}
```

### Scraper Features

- Sequential scraping to avoid overwhelming servers
- Error handling with fallback data
- Automatic sorting by snowfall
- Configurable resort list in `scraper.js`
- 1-second delay between requests

## Customization

### Add More Resorts

Edit the `resorts` array in `scraper.js`:

```javascript
const resorts = [
    { name: 'Your Resort, ST', url: 'https://www.onthesnow.com/state/resort/skireport' },
    // Add more resorts here
];
```

### Update Data Refresh Interval

In `script.js`, modify the `refreshData()` function:

```javascript
setTimeout(refreshData, 30 * 60 * 1000); // Currently 30 minutes
```

### Change Color Scheme

Edit `styles.css`:
- Background gradients (body selector)
- Text colors
- Split-flap display colors (.flip-digit class)

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Future Enhancements

- [x] Real-time data scraping
- [ ] User location detection for nearest resorts
- [ ] Multiple resort comparison view
- [ ] Live webcam feeds integration
- [ ] 7-day weather forecast
- [ ] Social media sharing
- [ ] Push notifications for powder alerts
- [ ] Historical snow data comparison
- [ ] Lift status and trail maps

## License

MIT License - feel free to use and modify!

## Author

Created with ❄️ for powder enthusiasts
