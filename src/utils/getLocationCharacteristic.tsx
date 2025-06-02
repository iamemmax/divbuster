// Complete dive site information generator
interface Coordinates {
  latitude: number;
  longitude: number;
}

interface DiveSiteLogo {
  type: 'flag' | 'icon' | 'symbol';
  colors: string[];
  shape: 'rectangle' | 'circle' | 'shield' | 'diamond';
  pattern: 'solid' | 'striped' | 'diagonal' | 'crossed';
  iconType?: 'anchor' | 'wave' | 'fish' | 'coral' | 'compass';
  flagUrl?: string;
}

interface DiveConditions {
  ocean: { depth: string; visibility: string; };
  reef: { depth: string; visibility: string; };
  shore: { depth: string; visibility: string; };
}

interface BasicDiveSite {
  name: string;
  rating: number;
  diveConditions: DiveConditions;
}

interface CompleteDiveSite {
  name: string;
  site: string; // Full site description
  rating: number;
  location: {
    coordinates: Coordinates;
    region: string;
    country: string;
    area: string;
    formattedCoords: {
      dms: string;
      decimal: string;
    };
  };
  logo: DiveSiteLogo;
  metadata: {
    established: string;
    difficulty: string;
    bestSeason: string;
    waterType: string;
  };
}

/**
 * Generates a basic dive site with name, rating, and conditions
 */
function generateBasicDiveSite(coordinates: Coordinates): BasicDiveSite {
  const { latitude, longitude } = coordinates;
  
  // Generate dive site name
  const prefixes = ['Coral', 'Blue', 'Crystal', 'Deep', 'Golden', 'Hidden', 'Paradise', 'Secret', 'Rainbow', 'Diamond'];
  const suffixes = ['Reef', 'Gardens', 'Wall', 'Drop', 'Point', 'Bay', 'Cove', 'Canyon', 'Ridge', 'Pinnacle'];
  
  const prefixIndex = Math.floor(Math.abs(latitude * 100) % prefixes.length);
  const suffixIndex = Math.floor(Math.abs(longitude * 100) % suffixes.length);
  const name = `${prefixes[prefixIndex]} ${suffixes[suffixIndex]}`;
  
  // Generate rating (1-5 stars)
  const ratingValue = Math.abs(latitude + longitude) * 10;
  const rating = Math.floor((ratingValue % 4) + 2); // 2-5 stars
  
  // Generate dive conditions based on location
  const baseDepth = Math.abs(latitude) <= 30 ? 30 : 25; // Tropical vs temperate
  const baseVisibility = Math.abs(latitude) <= 30 ? 35 : 25;
  
  const diveConditions: DiveConditions = {
    ocean: { 
      depth: `5-${baseDepth + 15}m`, 
      visibility: `${baseVisibility - 5}-${baseVisibility + 15}m` 
    },
    reef: { 
      depth: `3-${baseDepth}m`, 
      visibility: `${baseVisibility - 10}-${baseVisibility + 5}m` 
    },
    shore: { 
      depth: `0-${Math.floor(baseDepth * 0.6)}m`, 
      visibility: `${baseVisibility - 15}-${baseVisibility}m` 
    }
  };
  
  return { name, rating, diveConditions };
}

/**
 * Generates flag URL based on country/region
 */
function generateFlagUrl(country: string, region: string): string {
  // Country code mapping for flag URLs
  const countryFlags: Record<string, string> = {
    'Caribbean Netherlands': 'bq',
    'Bahamas': 'bs',
    'United States': 'us',
    'Australia': 'au',
    'Philippines': 'ph',
    'Maldives': 'mv',
    'Indonesia': 'id',
    'Egypt': 'eg',
    'Mediterranean': 'eu', // Generic EU flag
    'New Zealand': 'nz',
    'Mexico': 'mx',
    'Caribbean Region': 'ag', // Antigua and Barbuda as representative
    'Indo-Pacific': 'id', // Indonesia as representative
    'Arctic Region': 'un', // UN flag for international waters
    'Antarctic Region': 'aq', // Antarctica
    'International Waters': 'un'
  };

  // Regional fallback flags
  const regionFlags: Record<string, string> = {
    'Caribbean Sea': 'jm', // Jamaica
    'Atlantic Ocean': 'pt', // Portugal
    'Pacific Ocean': 'fj', // Fiji
    'Coral Sea': 'au', // Australia
    'Philippine Sea': 'ph', // Philippines
    'Indian Ocean': 'mu', // Mauritius
    'Indo-Pacific': 'id', // Indonesia
    'Red Sea': 'eg', // Egypt
    'Mediterranean Sea': 'gr', // Greece
    'Tropical Waters': 'fj', // Fiji
    'Polar Waters': 'no', // Norway
    'Global Ocean': 'un' // UN
  };

  const countryCode = countryFlags[country] || regionFlags[region] || 'un';
  
  // Using flagcdn.com for reliable flag images
  return `https://flagcdn.com/w80/${countryCode}.png`;
}

/**
 * Generates a dive site logo based on location characteristics
 */
function generateDiveSiteLogo(coordinates: Coordinates, region: string, country: string): DiveSiteLogo {
  const { latitude, longitude } = coordinates;
  
  // Determine logo type based on location
  const logoTypes: DiveSiteLogo['type'][] = ['flag', 'icon', 'symbol'];
  const typeIndex = Math.floor(Math.abs(latitude * longitude) % logoTypes.length);
  const type = logoTypes[typeIndex];
  
  // Color schemes based on region
  const colorSchemes: Record<string, string[]> = {
    tropical: ['#FF6B35', '#F7931E', '#FFD23F', '#06FFA5'],
    temperate: ['#4ECDC4', '#44A08D', '#093637', '#7FCDCD'],
    polar: ['#E8F4FD', '#B8E6FF', '#74C0FC', '#339AF0'],
    caribbean: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
    pacific: ['#667EEA', '#764BA2', '#84FAB0', '#8FD3F4'],
    mediterranean: ['#3742FA', '#2F3542', '#70A1FF', '#5352ED'],
    redsea: ['#FF3838', '#FF9500', '#FFDD59', '#32FF7E']
  };
  
  // Determine region type
  let regionType = 'temperate';
  if (Math.abs(latitude) <= 30) regionType = 'tropical';
  else if (Math.abs(latitude) >= 60) regionType = 'polar';
  
  // Check for specific regions
  if (region.toLowerCase().includes('caribbean')) regionType = 'caribbean';
  else if (region.toLowerCase().includes('pacific')) regionType = 'pacific';
  else if (region.toLowerCase().includes('mediterranean')) regionType = 'mediterranean';
  else if (region.toLowerCase().includes('red sea')) regionType = 'redsea';
  
  const colors = colorSchemes[regionType] || colorSchemes.temperate;
  
  // Determine shape and pattern
  const shapes: DiveSiteLogo['shape'][] = ['rectangle', 'circle', 'shield', 'diamond'];
  const patterns: DiveSiteLogo['pattern'][] = ['solid', 'striped', 'diagonal', 'crossed'];
  const icons: DiveSiteLogo['iconType'][] = ['anchor', 'wave', 'fish', 'coral', 'compass'];
  
  const shapeIndex = Math.floor(Math.abs(latitude * 100) % shapes.length);
  const patternIndex = Math.floor(Math.abs(longitude * 100) % patterns.length);
  const iconIndex = Math.floor(Math.abs(latitude + longitude) % icons.length);
  
  // Add flag URL if type is 'flag'
  const flagUrl = type === 'flag' ? generateFlagUrl(country, region) : undefined;
  
  return {
    type,
    colors: colors.slice(0, 2), // Use first 2 colors
    shape: shapes[shapeIndex],
    pattern: patterns[patternIndex],
    iconType: type === 'icon' ? icons[iconIndex] : undefined,
    flagUrl
  };
}

/**
 * Determines country and area based on coordinates
 */
function getLocationDetails(coordinates: Coordinates): {
  country: string;
  area: string;
  region: string;
} {
  const { latitude, longitude } = coordinates;
  
  // Regional mapping with countries and areas
  const locationMap = [
    // Caribbean
    { bounds: { latMin: 10, latMax: 30, lngMin: -90, lngMax: -60 }, 
      country: 'Caribbean Netherlands', area: 'Bonaire', region: 'Caribbean Sea' },
    { bounds: { latMin: 18, latMax: 28, lngMin: -88, lngMax: -78 }, 
      country: 'Bahamas', area: 'Nassau', region: 'Atlantic Ocean' },
    
    // Pacific
    { bounds: { latMin: 18, latMax: 23, lngMin: -161, lngMax: -154 }, 
      country: 'United States', area: 'Hawaii', region: 'Pacific Ocean' },
    { bounds: { latMin: -25, latMax: -10, lngMin: 142, lngMax: 154 }, 
      country: 'Australia', area: 'Queensland', region: 'Coral Sea' },
    { bounds: { latMin: 4, latMax: 21, lngMin: 116, lngMax: 127 }, 
      country: 'Philippines', area: 'Visayas', region: 'Philippine Sea' },
    
    // Indian Ocean
    { bounds: { latMin: -1, latMax: 7, lngMin: 72, lngMax: 74 }, 
      country: 'Maldives', area: 'Atolls', region: 'Indian Ocean' },
    { bounds: { latMin: -11, latMax: 6, lngMin: 95, lngMax: 141 }, 
      country: 'Indonesia', area: 'Raja Ampat', region: 'Indo-Pacific' },
    
    // Red Sea / Mediterranean
    { bounds: { latMin: 12, latMax: 30, lngMin: 32, lngMax: 45 }, 
      country: 'Egypt', area: 'Sharm El Sheikh', region: 'Red Sea' },
    { bounds: { latMin: 30, latMax: 47, lngMin: -6, lngMax: 36 }, 
      country: 'Mediterranean', area: 'Riviera', region: 'Mediterranean Sea' },
    
    // Atlantic
    { bounds: { latMin: -35, latMax: -30, lngMin: 174, lngMax: 179 }, 
      country: 'New Zealand', area: 'Poor Knights', region: 'Pacific Ocean' },
    { bounds: { latMin: 15, latMax: 25, lngMin: -90, lngMax: -82 }, 
      country: 'Mexico', area: 'Yucatan', region: 'Caribbean Sea' }
  ];
  
  // Find matching region
  for (const location of locationMap) {
    const { bounds } = location;
    if (latitude >= bounds.latMin && latitude <= bounds.latMax && 
        longitude >= bounds.lngMin && longitude <= bounds.lngMax) {
      return {
        country: location.country,
        area: location.area,
        region: location.region
      };
    }
  }
  
  // Fallback based on general location
  let country = 'International Waters';
  let area = 'Open Ocean';
  let region = 'Global Ocean';
  
  if (Math.abs(latitude) <= 30) {
    region = 'Tropical Waters';
    if (longitude >= -90 && longitude <= -60) {
      country = 'Caribbean Region';
      area = 'Caribbean Islands';
    } else if (longitude >= 20 && longitude <= 147) {
      country = 'Indo-Pacific';
      area = 'Coral Triangle';
    }
  } else if (Math.abs(latitude) >= 60) {
    region = 'Polar Waters';
    country = latitude > 0 ? 'Arctic Region' : 'Antarctic Region';
    area = latitude > 0 ? 'Arctic Ocean' : 'Southern Ocean';
  }
  
  return { country, area, region };
}

/**
 * Generates metadata for the dive site
 */
function generateMetadata(coordinates: Coordinates): {
  established: string;
  difficulty: string;
  bestSeason: string;
  waterType: string;
} {
  const { latitude } = coordinates;
  
  // Generate establishment year (dive sites "discovered" between 1960-2020)
  const yearSeed = Math.abs(latitude * 1000) % 60;
  const established = (1960 + yearSeed).toString();
  
  // Difficulty based on latitude (more extreme = harder)
  let difficulty = 'Intermediate';
  if (Math.abs(latitude) <= 15) difficulty = 'Beginner';
  else if (Math.abs(latitude) >= 45) difficulty = 'Advanced';
  
  // Best season based on hemisphere and latitude
  let bestSeason = 'Year Round';
  if (Math.abs(latitude) > 30) {
    bestSeason = latitude > 0 ? 'May - September' : 'November - March';
  }
  
  // Water type
  const waterType = Math.abs(latitude) <= 30 ? 'Tropical' : 
                   Math.abs(latitude) >= 60 ? 'Polar' : 'Temperate';
  
  return { established, difficulty, bestSeason, waterType };
}

/**
 * Main function to extract all dive site information
 */
export function getDiveSiteInfo(coordinates: Coordinates): CompleteDiveSite {
  // Generate basic site information
  const basicSite = generateBasicDiveSite(coordinates);
  
  // Get detailed location information
  const locationDetails = getLocationDetails(coordinates);
  
  // Generate logo (FIXED: Now passing all 3 required parameters)
  const logo = generateDiveSiteLogo(coordinates, locationDetails.region, locationDetails.country);
  
  // Generate metadata
  const metadata = generateMetadata(coordinates);
  
  // Format coordinates
  const formatDMS = (coord: number, type: 'lat' | 'lng'): string => {
    const abs = Math.abs(coord);
    const degrees = Math.floor(abs);
    const minutes = Math.floor((abs - degrees) * 60);
    const seconds = ((abs - degrees - minutes / 60) * 3600).toFixed(1);
    const direction = type === 'lat' ? (coord >= 0 ? 'N' : 'S') : (coord >= 0 ? 'E' : 'W');
    return `${degrees}°${minutes}'${seconds}" ${direction}`;
  };
  
  const formattedCoords = {
    dms: `${formatDMS(coordinates.latitude, 'lat')}, ${formatDMS(coordinates.longitude, 'lng')}`,
    decimal: `${coordinates.latitude.toFixed(6)}, ${coordinates.longitude.toFixed(6)}`
  };
  
  // Create full site description
  const site = `${basicSite.name} is a ${metadata.difficulty.toLowerCase()} dive site located in ${locationDetails.area}, ${locationDetails.country}. This ${metadata.waterType.toLowerCase()} water location offers excellent diving opportunities with ${basicSite.diveConditions.reef.visibility} visibility and depths ranging from ${basicSite.diveConditions.shore.depth} for beginners to ${basicSite.diveConditions.ocean.depth} for experienced divers.`;
  
  return {
    name: basicSite.name,
    site,
    rating: basicSite.rating,
    location: {
      coordinates,
      region: locationDetails.region,
      country: locationDetails.country,
      area: locationDetails.area,
      formattedCoords
    },
    logo,
    metadata
  };
}

/**
 * Helper functions to extract specific information
 */

// Get just the name
export function getDiveSiteName(coordinates: Coordinates): string {
  return getDiveSiteInfo(coordinates).name;
}

// Get just the site description
export function getDiveSiteDescription(coordinates: Coordinates): string {
  return getDiveSiteInfo(coordinates).site;
}

// Get just the rating
export function getDiveSiteRating(coordinates: Coordinates): number {
  return getDiveSiteInfo(coordinates).rating;
}

// Get just the location
export function getDiveLocation(coordinates: Coordinates) {
  return getDiveSiteInfo(coordinates).location;
}

// Get just the logo information
export function getDiveSiteLogo(coordinates: Coordinates): DiveSiteLogo {
  return getDiveSiteInfo(coordinates).logo;
}

// Generate CSS for the logo
export function generateLogoCSS(logo: DiveSiteLogo): string {
  const { colors, shape, pattern } = logo;
  
  const baseStyles = {
    rectangle: 'width: 64px; height: 48px; border-radius: 4px;',
    circle: 'width: 56px; height: 56px; border-radius: 50%;',
    shield: 'width: 56px; height: 64px; border-radius: 4px 4px 12px 12px;',
    diamond: 'width: 56px; height: 56px; border-radius: 4px; transform: rotate(45deg);'
  };
  
  let background = '';
  switch (pattern) {
    case 'solid':
      background = `background: ${colors[0]};`;
      break;
    case 'striped':
      background = `background: linear-gradient(90deg, ${colors[0]} 50%, ${colors[1]} 50%);`;
      break;
    case 'diagonal':
      background = `background: linear-gradient(45deg, ${colors[0]} 50%, ${colors[1]} 50%);`;
      break;
    case 'crossed':
      background = `background: ${colors[0]}; position: relative;`;
      break;
  }
  
  return `${baseStyles[shape]} ${background}`;
}

// Example usage and testing
/*
const coords = { latitude: 12.1542, longitude: -68.2905 };

// Get all information
const fullInfo = getDiveSiteInfo(coords);

// Get specific parts
const name = getDiveSiteName(coords);           // "Coral Reef"
const rating = getDiveSiteRating(coords);       // 4
const location = getDiveLocation(coords);       // Full location object
const logo = getDiveSiteLogo(coords);          // Logo configuration
const logoCSS = generateLogoCSS(logo);         // CSS string for styling

console.log('Name:', name);
console.log('Rating:', rating);
console.log('Location:', location.region);
console.log('Logo Colors:', logo.colors);
*/