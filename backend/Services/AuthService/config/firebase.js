import { cert, initializeApp } from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json" with {type: "JSON"};

export const app = initializeApp({
  credential: cert(serviceAccount),
}); 