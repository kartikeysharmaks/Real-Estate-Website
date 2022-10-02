import { db } from "../firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const propertyCollectionRef = collection(db, "properties");
class PropertyDataService {
  addProperty = (newProperty) => {
    return addDoc(propertyCollectionRef, newProperty);
  };

  updateProperty = (id, updatedProperty) => {
    const propertyDoc = doc(db, "properties", id);
    return updateDoc(propertyDoc, updatedProperty);
  };

  deleteProperty = (id) => {
    const propertyDoc = doc(db, "properties", id);
    return deleteDoc(propertyDoc);
  };

  getAllProperty = () => {
    return getDocs(propertyCollectionRef);
  };

  getProperty = (id) => {
    const propertyDoc = doc(db, "properties", id);
    return getDoc(propertyDoc);
  };
};

export default new PropertyDataService();