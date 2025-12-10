import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

export const addFavorite = async (userId, gif) => {
  try {
    await addDoc(collection(db, "favorites"), {
      userId,
      gif,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error adding favorite:", error);
  }
};

export const getFavoritesForUser = async (userId) => {
  try {
    const q = query(collection(db, "favorites"), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
};

export const removeFavoriteByDocId = async (docId) => {
  try {
    await deleteDoc(doc(db, "favorites", docId));
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
};
