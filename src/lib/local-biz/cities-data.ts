import { City } from '@/types/local-biz';

export interface StateCityGroup {
  state: string;
  cities: string[];
}

export const INDIAN_STATES_AND_CITIES: StateCityGroup[] = [
  {
    state: 'Maharashtra',
    cities: [
      'Mumbai',
      'Pune',
      'Nagpur',
      'Thane',
      'Pimpri-Chinchwad',
      'Nashik',
      'Kalyan-Dombivli',
      'Vasai-Virar',
      'Navi Mumbai',
      'Chhatrapati Sambhajinagar (Aurangabad)',
      'Solapur',
      'Bhiwandi',
      'Amravati',
      'Malegaon',
      'Kolhapur',
      'Nanded',
      'Sangli',
      'Jalgaon',
      'Akola',
      'Latur',
      'Dhule',
      'Ahmednagar',
      'Chandrapur',
      'Parbhani',
      'Ichalkaranji',
      'Jalna',
      'Ambarnath',
      'Bhusawal',
      'Panvel',
      'Badlapur',
      'Beed',
      'Gondia',
      'Satara',
      'Yavatmal',
      'Osmanabad',
      'Nandurbar',
      'Wardha',
      'Udgir',
    ],
  },
  {
    state: 'Uttar Pradesh',
    cities: [
      'Lucknow',
      'Kanpur',
      'Ghaziabad',
      'Agra',
      'Meerut',
      'Varanasi',
      'Prayagraj (Allahabad)',
      'Aligarh',
      'Bareilly',
      'Moradabad',
      'Saharanpur',
      'Gorakhpur',
      'Noida',
      'Firozabad',
      'Jhansi',
      'Muzaffarnagar',
      'Mathura',
      'Budaun',
      'Rampur',
      'Shahjahanpur',
      'Farrukhabad',
      'Hapur',
      'Ayodhya',
      'Mirzapur',
      'Bulandshahr',
      'Sambhal',
      'Amroha',
      'Hardoi',
      'Fatehpur',
      'Raebareli',
      'Orai',
      'Sitapur',
      'Bahraich',
      'Modinagar',
      'Unnao',
      'Jaunpur',
      'Lakhimpur',
      'Hathras',
      'Banda',
      'Pilibhit',
      'Mughalsarai',
      'Barabanki',
    ],
  },
  {
    state: 'West Bengal',
    cities: [
      'Kolkata',
      'Howrah',
      'Asansol',
      'Siliguri',
      'Durgapur',
      'Maheshtala',
      'Rajpur Sonarpur',
      'Bhatpara',
      'South Dumdum',
      'Gopalpur',
      'Bally',
      'Kamarhati',
      'Kulti',
      'Bardhaman',
      'Naihati',
      'Baranagar',
      'Shrirampur',
      'Habra',
      'Kharagpur',
      'Shantipur',
      'Dankuni',
      'Dhuliyan',
      'Ranaghat',
      'Haldia',
      'Raiganj',
      'Krishnanagar',
      'Nabadwip',
      'Medinipur',
      'Jalpaiguri',
      'Balurghat',
      'Bankura',
    ],
  },
  {
    state: 'Tamil Nadu',
    cities: [
      'Chennai',
      'Coimbatore',
      'Madurai',
      'Tiruchirappalli',
      'Tiruppur',
      'Salem',
      'Erode',
      'Vellore',
      'Thoothukudi',
      'Tirunelveli',
      'Thanjavur',
      'Dindigul',
      'Ranipet',
      'Sivakasi',
      'Karur',
      'Ooty',
      'Nagercoil',
      'Hosur',
      'Kanchipuram',
      'Ambur',
      'Karaikudi',
      'Kumbakonam',
      'Pudukkottai',
    ],
  },
  {
    state: 'Andhra Pradesh',
    cities: [
      'Visakhapatnam',
      'Vijayawada',
      'Guntur',
      'Nellore',
      'Kurnool',
      'Rajamahendravaram',
      'Kadapa',
      'Tirupati',
      'Anantapur',
      'Vizianagaram',
      'Eluru',
      'Proddatur',
      'Nandyal',
      'Adoni',
      'Ongole',
      'Madanapalle',
      'Chittoor',
      'Machilipatnam',
      'Tenali',
    ],
  },
  {
    state: 'Madhya Pradesh',
    cities: [
      'Indore',
      'Bhopal',
      'Jabalpur',
      'Gwalior',
      'Ujjain',
      'Sagar',
      'Dewas',
      'Satna',
      'Ratlam',
      'Rewa',
      'Katni',
      'Singrauli',
      'Burhanpur',
      'Khandwa',
      'Bhind',
      'Chhindwara',
      'Shivpuri',
      'Guna',
      'Damoh',
    ],
  },
  {
    state: 'Gujarat',
    cities: [
      'Ahmedabad',
      'Surat',
      'Vadodara',
      'Rajkot',
      'Bhavnagar',
      'Jamnagar',
      'Junagadh',
      'Gandhinagar',
      'Nadiad',
      'Anand',
      'Morbi',
      'Mehsana',
      'Bharuch',
      'Vapi',
      'Navsari',
      'Veraval',
      'Porbandar',
      'Godhra',
    ],
  },
  {
    state: 'Rajasthan',
    cities: [
      'Jaipur',
      'Jodhpur',
      'Kota',
      'Bikaner',
      'Ajmer',
      'Udaipur',
      'Bhilwara',
      'Alwar',
      'Bharatpur',
      'Sikar',
      'Sri Ganganagar',
      'Pali',
      'Chittorgarh',
      'Tonk',
      'Kishangarh',
      'Beawar',
      'Hanumangarh',
    ],
  },
  {
    state: 'Karnataka',
    cities: [
      'Bengaluru',
      'Hubballi-Dharwad',
      'Mysuru',
      'Kalaburagi (Gulbarga)',
      'Mangaluru',
      'Belagavi',
      'Davanagere',
      'Ballari',
      'Tumakuru',
      'Shivamogga',
      'Raichur',
      'Bidar',
      'Hosapete',
      'Hassan',
      'Gadag-Betageri',
      'Udupi',
    ],
  },
  {
    state: 'Bihar',
    cities: [
      'Patna',
      'Gaya',
      'Bhagalpur',
      'Muzaffarpur',
      'Purnia',
      'Darbhanga',
      'Bihar Sharif',
      'Arrah',
      'Begusarai',
      'Katihar',
      'Munger',
      'Chhapra',
      'Bettiah',
      'Saharsa',
      'Sasaram',
      'Hajipur',
    ],
  },
  {
    state: 'Telangana',
    cities: [
      'Hyderabad',
      'Warangal',
      'Nizamabad',
      'Khammam',
      'Karimnagar',
      'Ramagundam',
      'Mahbubnagar',
      'Nalgonda',
      'Adilabad',
    ],
  },
  {
    state: 'Kerala',
    cities: [
      'Thiruvananthapuram',
      'Kochi',
      'Kozhikode',
      'Kollam',
      'Thrissur',
      'Alappuzha',
      'Palakkad',
      'Kannur',
      'Kottayam',
    ],
  },
  {
    state: 'Haryana',
    cities: [
      'Faridabad',
      'Gurugram',
      'Panipat',
      'Ambala',
      'Yamunanagar',
      'Rohtak',
      'Hisar',
      'Karnal',
      'Sonipat',
      'Panchkula',
    ],
  },
  {
    state: 'Punjab',
    cities: [
      'Ludhiana',
      'Amritsar',
      'Jalandhar',
      'Patiala',
      'Bathinda',
      'Hoshiarpur',
      'Mohali',
      'Pathankot',
      'Moga',
    ],
  },
  {
    state: 'Jharkhand',
    cities: [
      'Dhanbad',
      'Ranchi',
      'Jamshedpur',
      'Bokaro Steel City',
      'Deoghar',
      'Phusro',
      'Hazaribagh',
      'Giridih',
    ],
  },
  {
    state: 'Odisha',
    cities: [
      'Bhubaneswar',
      'Cuttack',
      'Rourkela',
      'Berhampur',
      'Sambalpur',
      'Puri',
      'Balasore',
    ],
  },
  {
    state: 'Chhattisgarh',
    cities: [
      'Raipur',
      'Bhilai',
      'Bilaspur',
      'Korba',
      'Rajnandgaon',
      'Jagdalpur',
    ],
  },
  {
    state: 'Assam',
    cities: [
      'Guwahati',
      'Silchar',
      'Dibrugarh',
      'Jorhat',
      'Nagaon',
    ],
  },
  {
    state: 'Jammu & Kashmir',
    cities: [
      'Srinagar',
      'Jammu',
      'Anantnag',
    ],
  },
  {
    state: 'Delhi NCR',
    cities: [
      'New Delhi',
      'Delhi',
    ],
  },
  {
    state: 'Chandigarh (UT)',
    cities: [
      'Chandigarh',
    ],
  },
  {
    state: 'Uttarakhand',
    cities: [
      'Dehradun',
      'Haridwar',
      'Haldwani',
      'Roorkee',
    ],
  },
  {
    state: 'Himachal Pradesh',
    cities: [
      'Shimla',
    ],
  },
  {
    state: 'Tripura',
    cities: [
      'Agartala',
    ],
  },
  {
    state: 'Meghalaya',
    cities: [
      'Shillong',
    ],
  },
  {
    state: 'Goa',
    cities: [
      'Panaji',
      'Margao',
    ],
  },
  {
    state: 'Puducherry',
    cities: [
      'Puducherry',
      'Ozhukarai',
    ],
  },
  {
    state: 'Manipur',
    cities: [
      'Imphal',
    ],
  },
  {
    state: 'Mizoram',
    cities: [
      'Aizawl',
    ],
  },
  {
    state: 'Nagaland',
    cities: [
      'Dimapur',
      'Kohima',
    ],
  },
  {
    state: 'Arunachal Pradesh',
    cities: [
      'Itanagar',
    ],
  },
  {
    state: 'Sikkim',
    cities: [
      'Gangtok',
    ],
  },
  {
    state: 'Andaman & Nicobar',
    cities: [
      'Port Blair',
    ],
  },
];

// Generate slug helper
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Legacy City ID mapping to preserve existing relations
const LEGACY_CITY_IDS: Record<string, string> = {
  'chennai': 'city-1',
  'bengaluru': 'city-2',
  'bangalore': 'city-2',
  'mumbai': 'city-3',
  'delhi': 'city-4',
  'hyderabad': 'city-5',
  'pune': 'city-6',
  'kolkata': 'city-7',
  'coimbatore': 'city-8',
  'madurai': 'city-9',
  'kochi': 'city-10',
  'ahmedabad': 'city-11',
  'jaipur': 'city-12',
  'surat': 'city-13',
  'lucknow': 'city-14',
  'chandigarh': 'city-15',
};

// Generate complete City objects list for the platform
export const ALL_INDIAN_CITIES: City[] = (() => {
  const list: City[] = [];
  let nextIndex = 16;
  const seenSlugs = new Set<string>();

  INDIAN_STATES_AND_CITIES.forEach((group) => {
    group.cities.forEach((cityName) => {
      let slug = slugify(cityName);
      if (seenSlugs.has(slug)) {
        slug = `${slug}-${slugify(group.state)}`;
      }
      seenSlugs.add(slug);

      const legacyId = LEGACY_CITY_IDS[slug] || LEGACY_CITY_IDS[slugify(cityName)];
      const id = legacyId ? legacyId : `city-${nextIndex++}`;

      // Weighted business count simulation
      const baseCount = Math.floor(Math.random() * 300) + 120;
      let multiplier = 1;
      if (['Mumbai', 'Delhi', 'New Delhi', 'Bengaluru', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad'].includes(cityName)) {
        multiplier = 10;
      } else if (['Surat', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar', 'Chandigarh'].includes(cityName)) {
        multiplier = 4;
      }

      list.push({
        id,
        name: cityName,
        slug,
        state: group.state,
        country: 'India',
        business_count: baseCount * multiplier,
        is_active: true,
      });
    });
  });

  return list;
})();

export function getStateNames(): string[] {
  return INDIAN_STATES_AND_CITIES.map((g) => g.state);
}

export function getCitiesByState(stateName: string): City[] {
  const sLower = stateName.toLowerCase();
  return ALL_INDIAN_CITIES.filter((c) => c.state.toLowerCase() === sLower);
}

