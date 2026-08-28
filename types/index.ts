export interface HowToReachItem {
  mode: string; // e.g. "HRTC Ordinary Bus", "Volvo Semi-Sleeper", "Vande Bharat Express", "Flight"
  steps: string; // e.g. "Reach Kashmiri Gate ISBT, Delhi -> Direct Overnight HRTC Bus to Manali -> Drop at Private Bus Stand"
  costPerPerson: number; // e.g. 850
  notes: string; // e.g. "Book via hrtc.hp.gov.in 3 days in advance. Carry motion sickness medicine for ghat roads."
}

export interface StayOption {
  name: string;
  type?: 'budget' | 'premium';
  price: string; // e.g. "₹400 - ₹700 / night (Dorm)" or "₹1,800 - ₹2,500 / night"
  notes: string;
}

export interface StayCategory {
  budget: StayOption[];
  premium: StayOption[];
}

export interface FoodItem {
  name: string;
  price: string; // e.g. "₹80 - ₹120"
  notes: string; // e.g. "Try with mint chutney at local Old Manali stalls"
  isVeg?: boolean;
}

export interface LocalTravelOption {
  mode: string; // e.g. "Rented Scooty / Himalayan", "Shared Auto / E-Rickshaw", "Local HRTC Bus"
  price: string; // e.g. "₹600/day + petrol (₹200)"
  notes?: string;
}

export interface PlaceToVisit {
  name: string;
  image: string;
  blurb: string;
}

export type BudgetCategory = 'Travel' | 'Stay' | 'Food' | 'Local Transport' | 'Misc';

export interface BudgetItem {
  label: string;
  amount: number;
  category: BudgetCategory;
}

export interface GalleryPhoto {
  url: string;
  caption: string;
}

export interface Destination {
  _id?: string;
  id?: string;
  slug: string;
  name: string;
  state: string;
  mapCoordinates: {
    x: number; // percentage 0-100 on India SVG map
    y: number; // percentage 0-100 on India SVG map
    stateId?: string; // state slug
  };
  heroImage: string;
  quote: string;
  quoteAuthor?: string;
  about: {
    history: string;
    culture: string;
    geography: string;
  };
  howToReach: HowToReachItem[];
  stay: StayCategory;
  food: FoodItem[];
  localTravel: LocalTravelOption[];
  placesToVisit: PlaceToVisit[];
  proTips: string[];
  budgetItems: BudgetItem[];
  totalPerPerson: number;
  gallery: GalleryPhoto[];
  tags: string[];
  publishedBy?: string;
  stateMapHighlight?: string; // outline info
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  homeCity?: string;
  interests?: string[];
  savedDestinations?: string[]; // destination IDs or slugs
}
