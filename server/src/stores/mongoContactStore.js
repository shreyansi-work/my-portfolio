import mongoose from 'mongoose';
import { ContactMessage } from '../models/ContactMessage.js';

/** Storage adapter used by the contact route. Tests swap this for an in-memory fake. */
export function createMongoContactStore() {
  return {
    isReady: () => mongoose.connection.readyState === 1,
    async save(doc) {
      const saved = await ContactMessage.create(doc);
      return { id: String(saved._id) };
    },
  };
}
