import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFileSync } from 'fs';

// Resort data with their OnTheSnow URLs
const resorts = [
    { name: 'Jackson Hole, WY', url: 'https://www.onthesnow.com/wyoming/jackson-hole/skireport' },
    { name: 'Alta Ski Area, UT', url: 'https://www.onthesnow.com/utah/alta/skireport' },
    { name: 'Snowbird, UT', url: 'https://www.onthesnow.com/utah/snowbird/skireport' },
    { name: 'Park City, UT', url: 'https://www.onthesnow.com/utah/park-city-mountain-resort/skireport' },
    { name: 'Mammoth Mountain, CA', url: 'https://www.onthesnow.com/california/mammoth-mountain/skireport' },
    { name: 'Palisades Tahoe, CA', url: 'https://www.onthesnow.com/california/palisades-tahoe/skireport' },
    { name: 'Aspen Snowmass, CO', url: 'https://www.onthesnow.com/colorado/aspen-snowmass/skireport' },
    { name: 'Vail, CO', url: 'https://www.onthesnow.com/colorado/vail/skireport' },
    { name: 'Telluride, CO', url: 'https://www.onthesnow.com/colorado/telluride/skireport' },
    { name: 'Big Sky, MT', url: 'https://www.onthesnow.com/montana/big-sky-resort/skireport' },
    { name: 'Steamboat, CO', url: 'https://www.onthesnow.com/colorado/steamboat/skireport' },
    { name: 'Breckenridge, CO', url: 'https://www.onthesnow.com/colorado/breckenridge/skireport' }
];

// Scrape a single resort
async function scrapeResort(resort) {
    try {
        console.log(`Scraping ${resort.name}...`);

        const response = await axios.get(resort.url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 10000
        });

        const $ = cheerio.load(response.data);

        // Extract snow data - OnTheSnow has specific selectors
        let snowfall24 = 0;
        let snowfall7day = 0;
        let baseDepth = 0;
        let temperature = null;
        let conditions = 'Unknown';

        // Try to find 24hr snowfall
        $('div.snow-report__stat').each((i, elem) => {
            const label = $(elem).find('.snow-report__stat-label').text().trim().toLowerCase();
            const value = $(elem).find('.snow-report__stat-value').text().trim();

            if (label.includes('24') && label.includes('hr')) {
                snowfall24 = parseInt(value) || 0;
            }
            if (label.includes('7') && label.includes('day')) {
                snowfall7day = parseInt(value) || 0;
            }
            if (label.includes('base')) {
                baseDepth = parseInt(value) || 0;
            }
        });

        // Try alternative selectors if first attempt didn't work
        if (snowfall7day === 0) {
            // Look for any element that might contain 7-day data
            const text = $('body').text();
            const match7day = text.match(/7[\s-]*day[:\s]*(\d+)/i);
            if (match7day) {
                snowfall7day = parseInt(match7day[1]);
            }
        }

        // Look for temperature
        const tempText = $('.temperature').text() || $('[class*="temp"]').first().text();
        const tempMatch = tempText.match(/(-?\d+)/);
        if (tempMatch) {
            temperature = parseInt(tempMatch[1]);
        }

        return {
            name: resort.name,
            snowfall24,
            snowfall7day,
            baseDepth,
            temperature,
            conditions,
            lastUpdated: new Date().toISOString()
        };
    } catch (error) {
        console.error(`Error scraping ${resort.name}:`, error.message);
        // Return default data on error
        return {
            name: resort.name,
            snowfall24: 0,
            snowfall7day: 0,
            baseDepth: 0,
            temperature: null,
            conditions: 'Data unavailable',
            lastUpdated: new Date().toISOString(),
            error: error.message
        };
    }
}

// Main scraping function
async function scrapeAllResorts() {
    console.log('Starting snow data scrape...\n');

    const results = [];

    // Scrape resorts sequentially to avoid overwhelming servers
    for (const resort of resorts) {
        const data = await scrapeResort(resort);
        results.push(data);
        // Wait a bit between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Sort by 7-day snowfall (descending) and take top 10
    const top10 = results
        .sort((a, b) => b.snowfall7day - a.snowfall7day)
        .slice(0, 10);

    // Find Jackson Hole data
    const jacksonHole = results.find(r => r.name.includes('Jackson Hole'));

    const output = {
        lastUpdated: new Date().toISOString(),
        jacksonHole: jacksonHole || results[0],
        top10Resorts: top10,
        // Generate 4-week history (simulated for now - would need historical API)
        snowHistory: generateHistoricalData()
    };

    // Save to JSON file
    writeFileSync('snow-data.json', JSON.stringify(output, null, 2));

    console.log('\n✓ Snow data saved to snow-data.json');
    console.log(`\nTop 10 Resorts by 7-day snowfall:`);
    top10.forEach((resort, i) => {
        console.log(`${i + 1}. ${resort.name}: ${resort.snowfall7day}"`);
    });

    return output;
}

// Generate simulated historical data (in real app, would fetch from historical API)
function generateHistoricalData() {
    const days = 28;
    const data = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);

        // Simulate realistic snowfall pattern
        const baseSnow = Math.random() * 8;
        const storm = Math.random() > 0.7 ? Math.random() * 12 : 0;
        const snowfall = Math.round(baseSnow + storm);

        data.push({
            date: date.toISOString().split('T')[0],
            snowfall
        });
    }

    return data;
}

// Run the scraper
scrapeAllResorts()
    .then(() => {
        console.log('\n✓ Scraping complete!');
        process.exit(0);
    })
    .catch(error => {
        console.error('\n✗ Scraping failed:', error);
        process.exit(1);
    });
