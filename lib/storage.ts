import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { Destination, UserProfile } from '@/types';
import { SEED_DESTINATIONS } from './seedData';
import { connectToDatabase } from './mongodb';
import DestinationModel from '@/models/Destination';
import UserModel from '@/models/User';

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

interface LocalDB {
  destinations: Destination[];
  users: Array<{
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    role: 'user' | 'admin';
    homeCity?: string;
    interests?: string[];
    savedDestinations?: string[];
    isVerified?: boolean;
    otpCode?: string | null;
    otpExpiry?: string | null;
  }>;
}

function getInitialDB(): LocalDB {
  const salt = bcrypt.genSaltSync(10);
  return {
    destinations: SEED_DESTINATIONS.map((d, i) => ({
      ...d,
      _id: `dest_${i + 1}`,
      id: `dest_${i + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
    users: [
      {
        id: 'user_admin_1',
        name: 'Priyanshu (Admin)',
        email: 'admin@travelpaglu.com',
        passwordHash: bcrypt.hashSync('admin123', salt),
        role: 'admin',
        homeCity: 'Delhi',
        interests: ['Mountains', 'Spiritual', 'Budget', 'Offbeat'],
        savedDestinations: ['dest_1', 'dest_2'],
        isVerified: true,
      },
      {
        id: 'user_student_1',
        name: 'Aarav Sharma',
        email: 'student@travelpaglu.com',
        passwordHash: bcrypt.hashSync('student123', salt),
        role: 'user',
        homeCity: 'Kanpur',
        interests: ['Budget', 'Mountains', 'Treks'],
        savedDestinations: ['dest_1'],
        isVerified: true,
      },
    ],
  };
}

function readLocalDB(): LocalDB {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const init = getInitialDB();
      fs.writeFileSync(DB_FILE, JSON.stringify(init, null, 2), 'utf-8');
      return init;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading local JSON DB:', err);
    return getInitialDB();
  }
}

function writeLocalDB(data: LocalDB): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing local JSON DB:', err);
  }
}

// ----------------- Unified Destination Methods -----------------

export async function getAllDestinations(query?: { search?: string; maxBudget?: number; tag?: string }): Promise<Destination[]> {
  const mongoose = await connectToDatabase();
  let list: Destination[] = [];

  if (mongoose) {
    try {
      const count = await DestinationModel.countDocuments();
      if (count === 0) {
        // Seed MongoDB if empty
        await DestinationModel.insertMany(SEED_DESTINATIONS);
      }
      const mongoDocs = await DestinationModel.find().lean();
      list = mongoDocs.map((doc: any) => ({
        ...doc,
        _id: doc._id.toString(),
        id: doc._id.toString(),
      }));
    } catch (e) {
      console.warn('Fallback to local DB for getAllDestinations');
      const db = readLocalDB();
      list = db.destinations;
    }
  } else {
    const db = readLocalDB();
    list = db.destinations;
  }

  // Filter if criteria passed
  if (query) {
    if (query.search) {
      const q = query.search.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.state.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (query.maxBudget) {
      list = list.filter((d) => d.totalPerPerson <= (query.maxBudget || 999999));
    }
    if (query.tag) {
      const tq = query.tag.toLowerCase();
      list = list.filter((d) => d.tags.some((t) => t.toLowerCase() === tq));
    }
  }

  return list;
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  const mongoose = await connectToDatabase();
  if (mongoose) {
    try {
      const doc = await DestinationModel.findOne({ slug: slug.toLowerCase() }).lean();
      if (doc) {
        return {
          ...(doc as any),
          _id: (doc as any)._id.toString(),
          id: (doc as any)._id.toString(),
        };
      }
    } catch (e) {
      console.warn('Fallback to local DB for getDestinationBySlug');
    }
  }

  const db = readLocalDB();
  const found = db.destinations.find((d) => d.slug.toLowerCase() === slug.toLowerCase());
  return found || null;
}

export async function getDestinationById(id: string): Promise<Destination | null> {
  const mongoose = await connectToDatabase();
  if (mongoose) {
    try {
      const doc = await DestinationModel.findById(id).lean();
      if (doc) {
        return {
          ...(doc as any),
          _id: (doc as any)._id.toString(),
          id: (doc as any)._id.toString(),
        };
      }
    } catch (e) {
      console.warn('Fallback to local DB for getDestinationById');
    }
  }

  const db = readLocalDB();
  const found = db.destinations.find((d) => d._id === id || d.id === id);
  return found || null;
}

export async function createDestination(destData: Partial<Destination>): Promise<Destination> {
  // calculate totalPerPerson if not present
  const total = (destData.budgetItems || []).reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
  const fullData = {
    ...destData,
    totalPerPerson: total,
    slug: (destData.slug || destData.name || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  };

  const mongoose = await connectToDatabase();
  if (mongoose) {
    try {
      const created = await DestinationModel.create(fullData);
      return {
        ...(created.toObject() as any),
        _id: created._id.toString(),
        id: created._id.toString(),
      };
    } catch (e) {
      console.warn('Fallback to local DB for createDestination');
    }
  }

  const db = readLocalDB();
  const newId = `dest_${Date.now()}`;
  const newDest: Destination = {
    ...(fullData as Destination),
    _id: newId,
    id: newId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.destinations.push(newDest);
  writeLocalDB(db);
  return newDest;
}

export async function updateDestination(id: string, destData: Partial<Destination>): Promise<Destination | null> {
  const total = (destData.budgetItems || []).reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
  const updatePayload = {
    ...destData,
    ...(destData.budgetItems ? { totalPerPerson: total } : {}),
    updatedAt: new Date().toISOString(),
  };

  const mongoose = await connectToDatabase();
  if (mongoose) {
    try {
      const updated = await DestinationModel.findByIdAndUpdate(id, updatePayload, { new: true }).lean();
      if (updated) {
        return {
          ...(updated as any),
          _id: (updated as any)._id.toString(),
          id: (updated as any)._id.toString(),
        };
      }
    } catch (e) {
      console.warn('Fallback to local DB for updateDestination');
    }
  }

  const db = readLocalDB();
  const idx = db.destinations.findIndex((d) => d._id === id || d.id === id);
  if (idx === -1) return null;
  db.destinations[idx] = {
    ...db.destinations[idx],
    ...updatePayload,
  };
  writeLocalDB(db);
  return db.destinations[idx];
}

export async function deleteDestination(id: string): Promise<boolean> {
  const mongoose = await connectToDatabase();
  if (mongoose) {
    try {
      await DestinationModel.findByIdAndDelete(id);
      return true;
    } catch (e) {
      console.warn('Fallback to local DB for deleteDestination');
    }
  }

  const db = readLocalDB();
  const initialLen = db.destinations.length;
  db.destinations = db.destinations.filter((d) => d._id !== id && d.id !== id);
  writeLocalDB(db);
  return db.destinations.length < initialLen;
}

// ----------------- Unified User & Auth Methods -----------------

export async function findUserByEmail(email: string) {
  const normalized = email.toLowerCase().trim();
  const mongoose = await connectToDatabase();
  if (mongoose) {
    try {
      const user = await UserModel.findOne({ email: normalized }).lean();
      if (user) {
        return {
          id: (user as any)._id.toString(),
          _id: (user as any)._id.toString(),
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
          homeCity: user.homeCity,
          interests: user.interests,
          savedDestinations: (user.savedDestinations || []).map((id) => id.toString()),
          isVerified: user.isVerified || false,
        };
      }
    } catch (e) {
      console.warn('Fallback to local DB for findUserByEmail');
    }
  }

  const db = readLocalDB();
  const user = db.users.find((u) => u.email.toLowerCase() === normalized);
  if (!user) return null;
  return {
    ...user,
    _id: user.id,
    password: user.passwordHash,
    isVerified: user.isVerified || false,
  };
}

export async function createUser(data: { name: string; email: string; password: string; homeCity?: string; interests?: string[]; role?: 'user' | 'admin' }) {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(data.password, salt);
  const normalized = data.email.toLowerCase().trim();

  const mongoose = await connectToDatabase();
  if (mongoose) {
    try {
      const created = await UserModel.create({
        name: data.name,
        email: normalized,
        password: passwordHash,
        role: data.role || 'user',
        homeCity: data.homeCity || '',
        interests: data.interests || [],
        savedDestinations: [],
        isVerified: false,
      });
      return {
        id: created._id.toString(),
        name: created.name,
        email: created.email,
        role: created.role,
        homeCity: created.homeCity,
        interests: created.interests,
        savedDestinations: [],
      };
    } catch (e) {
      console.warn('Fallback to local DB for createUser');
    }
  }

  const db = readLocalDB();
  const existing = db.users.find((u) => u.email.toLowerCase() === normalized);
  if (existing) {
    throw new Error('User already exists with this email');
  }

  const newUser = {
    id: `user_${Date.now()}`,
    name: data.name,
    email: normalized,
    passwordHash,
    role: data.role || 'user',
    homeCity: data.homeCity || '',
    interests: data.interests || [],
    savedDestinations: [],
  };

  db.users.push(newUser);
  writeLocalDB(db);
  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    homeCity: newUser.homeCity,
    interests: newUser.interests,
    savedDestinations: [],
  };
}

export async function toggleUserWishlist(userEmail: string, destinationId: string): Promise<string[]> {
  const normalized = userEmail.toLowerCase().trim();
  const mongoose = await connectToDatabase();

  if (mongoose) {
    try {
      const user = await UserModel.findOne({ email: normalized });
      if (user) {
        const strList = (user.savedDestinations || []).map((id) => id.toString());
        const exists = strList.includes(destinationId);
        if (exists) {
          user.savedDestinations = (user.savedDestinations as any[]).filter((id) => id.toString() !== destinationId);
        } else {
          (user.savedDestinations as any[]).push(destinationId);
        }
        await user.save();
        return (user.savedDestinations || []).map((id) => id.toString());
      }
    } catch (e) {
      console.warn('Fallback to local DB for toggleUserWishlist');
    }
  }

  const db = readLocalDB();
  const user = db.users.find((u) => u.email.toLowerCase() === normalized);
  if (!user) return [];
  if (!user.savedDestinations) user.savedDestinations = [];

  const exists = user.savedDestinations.includes(destinationId);
  if (exists) {
    user.savedDestinations = user.savedDestinations.filter((id) => id !== destinationId);
  } else {
    user.savedDestinations.push(destinationId);
  }
  writeLocalDB(db);
  return user.savedDestinations;
}
export async function setVerificationOTP(email: string, otp: string): Promise<boolean> {
  const normalized = email.toLowerCase().trim();
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  const mongoose = await connectToDatabase();
  if (mongoose) {
    try {
      const user = await UserModel.findOne({ email: normalized });
      if (user) {
        user.otpCode = otp;
        user.otpExpiry = expiry;
        await user.save();
        return true;
      }
    } catch (e) {
      console.warn('Fallback to local DB for setVerificationOTP');
    }
  }

  const db = readLocalDB();
  const idx = db.users.findIndex((u) => u.email.toLowerCase() === normalized);
  if (idx !== -1) {
    db.users[idx].otpCode = otp;
    db.users[idx].otpExpiry = expiry.toISOString();
    writeLocalDB(db);
    return true;
  }
  return false;
}

export async function verifyOTP(email: string, otp: string): Promise<boolean> {
  const normalized = email.toLowerCase().trim();
  const mongoose = await connectToDatabase();
  
  if (mongoose) {
    try {
      const user = await UserModel.findOne({ email: normalized });
      if (user) {
        if (user.otpCode === otp && user.otpExpiry && new Date() < new Date(user.otpExpiry)) {
          user.isVerified = true;
          user.otpCode = null;
          user.otpExpiry = null;
          await user.save();
          return true;
        }
        return false;
      }
    } catch (e) {
      console.warn('Fallback to local DB for verifyOTP');
    }
  }

  const db = readLocalDB();
  const idx = db.users.findIndex((u) => u.email.toLowerCase() === normalized);
  if (idx !== -1) {
    const user = db.users[idx];
    if (user.otpCode === otp && user.otpExpiry && new Date() < new Date(user.otpExpiry)) {
      db.users[idx].isVerified = true;
      db.users[idx].otpCode = null;
      db.users[idx].otpExpiry = null;
      writeLocalDB(db);
      return true;
    }
  }
  return false;
}
