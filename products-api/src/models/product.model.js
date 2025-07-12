

import { db } from '../data/data.js';

import {
    collection,
    getDocs,
    getDoc,
    doc,
    addDoc,
    updateDoc,
    deleteDoc
} from 'firebase/firestore';

const productsCollection = collection(db, 'products');

// BUSCAR PRODUCTO POR SU ID
export async function getProductsById(id) {

    // Trae la data del documento referenciado en el id
    const productDoc = await getDoc(doc(productsCollection, id));

    if (productDoc.exists()) {
        return {
            id: productDoc.id,
            ...productDoc.data()
        }   
    }
    return null;
}

// OBTENER TODOS LOS PRODUCTOS
export async function getAllProducts() {
    const productsSnapshot = await getDocs(productsCollection);

    // Transformo los documentos de Firestore en Objetos para mapearlos y mostrarlos todos
    const products = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
    return products;
}

// GUARDAR UN PRODUCTO EN FIRESTORE
export async function createProduct(product) {
    const docRef = await addDoc(productsCollection, product);
    return docRef.id;
}

// ACTUALIZAR UN PRODUCTO EN FIRESTORE
export async function updateProduct(id, product) {
    await updateDoc(doc(productsCollection, id), product);
}

// ELIMINAR UN PRODUCTO EN FIRESTORE
export async function deleteProduct(id) {
    await deleteDoc(doc(productsCollection, id));
}