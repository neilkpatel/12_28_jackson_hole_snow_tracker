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

Simply open `index.html` in any modern web browser. No build process or dependencies required!

```bash
# Option 1: Direct file open
open index.html

# Option 2: Simple HTTP server (Python)
python3 -m http.server 8000
# Then visit http://localhost:8000

# Option 3: Simple HTTP server (Node.js)
npx http-server
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

Currently uses simulated data for demonstration purposes. To integrate real data:

1. **Jackson Hole Conditions**: Replace the `updateJacksonHoleConditions()` function with an API call to a weather/ski service
2. **Leaderboard Data**: Update `leaderboardData` array with real resort data from ski condition APIs

### Recommended APIs
- [OpenWeather API](https://openweathermap.org/api) - Weather data
- [OpenSnow](https://opensnow.com) - Ski-specific conditions
- Custom scraping of resort websites

## Customization

### Update Refresh Intervals
```javascript
// In script.js
setInterval(updateJacksonHoleConditions, 300000); // 5 minutes (in milliseconds)
```

### Modify Leaderboard Animation Speed
```javascript
// In animateLeaderboard() function
setTimeout(() => animateLeaderboard(), 3000 + Math.random() * 4000); // 3-7 seconds
```

### Change Color Scheme
Edit the CSS variables in `styles.css`:
- Background gradients
- Text colors
- Split-flap display colors

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Future Enhancements

- [ ] Real-time API integration
- [ ] User location detection
- [ ] Multiple resort comparison
- [ ] Webcam feeds
- [ ] Weather forecasts
- [ ] Social sharing
- [ ] Push notifications for powder alerts

## License

MIT License - feel free to use and modify!

## Author

Created with ❄️ for powder enthusiasts
