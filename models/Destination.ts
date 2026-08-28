import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDestination extends Document {
  slug: string;
  name: string;
  state: string;
  mapCoordinates: {
    x: number;
    y: number;
    stateId?: string;
  };
  heroImage: string;
  quote: string;
  quoteAuthor?: string;
  about: {
    history: string;
    culture: string;
    geography: string;
  };
  howToReach: Array<{
    mode: string;
    steps: string;
    costPerPerson: number;
    notes: string;
  }>;
  stay: {
    budget: Array<{ name: string; type?: string; price: string; notes: string }>;
    premium: Array<{ name: string; type?: string; price: string; notes: string }>;
  };
  food: Array<{
    name: string;
    price: string;
    notes: string;
    isVeg?: boolean;
  }>;
  localTravel: Array<{
    mode: string;
    price: string;
    notes?: string;
  }>;
  placesToVisit: Array<{
    name: string;
    image: string;
    blurb: string;
  }>;
  proTips: string[];
  budgetItems: Array<{
    label: string;
    amount: number;
    category: 'Travel' | 'Stay' | 'Food' | 'Local Transport' | 'Misc';
  }>;
  totalPerPerson: number;
  gallery: Array<{
    url: string;
    caption: string;
  }>;
  tags: string[];
  stateMapHighlight?: string;
  publishedBy?: Schema.Types.ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
}

const DestinationSchema: Schema<IDestination> = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    name: { type: String, required: true },
    state: { type: String, required: true },
    mapCoordinates: {
      x: { type: Number, required: true, default: 50 },
      y: { type: Number, required: true, default: 50 },
      stateId: { type: String }
    },
    heroImage: { type: String, required: true },
    quote: { type: String, required: true },
    quoteAuthor: { type: String, default: 'TravelPaglu Explorer' },
    about: {
      history: { type: String, default: '' },
      culture: { type: String, default: '' },
      geography: { type: String, default: '' },
    },
    howToReach: [
      {
        mode: { type: String, required: true },
        steps: { type: String, required: true },
        costPerPerson: { type: Number, required: true },
        notes: { type: String, default: '' },
      },
    ],
    stay: {
      budget: [
        {
          name: { type: String, required: true },
          type: { type: String, default: 'budget' },
          price: { type: String, required: true },
          notes: { type: String, default: '' },
        },
      ],
      premium: [
        {
          name: { type: String, required: true },
          type: { type: String, default: 'premium' },
          price: { type: String, required: true },
          notes: { type: String, default: '' },
        },
      ],
    },
    food: [
      {
        name: { type: String, required: true },
        price: { type: String, required: true },
        notes: { type: String, default: '' },
        isVeg: { type: Boolean, default: true },
      },
    ],
    localTravel: [
      {
        mode: { type: String, required: true },
        price: { type: String, required: true },
        notes: { type: String, default: '' },
      },
    ],
    placesToVisit: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        blurb: { type: String, required: true },
      },
    ],
    proTips: [{ type: String }],
    budgetItems: [
      {
        label: { type: String, required: true },
        amount: { type: Number, required: true },
        category: {
          type: String,
          enum: ['Travel', 'Stay', 'Food', 'Local Transport', 'Misc'],
          default: 'Misc',
        },
      },
    ],
    totalPerPerson: { type: Number, required: true, default: 0 },
    gallery: [
      {
        url: { type: String, required: true },
        caption: { type: String, default: '' },
      },
    ],
    tags: [{ type: String }],
    stateMapHighlight: { type: String },
    publishedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Destination: Model<IDestination> =
  mongoose.models.Destination || mongoose.model<IDestination>('Destination', DestinationSchema);

export default Destination;
