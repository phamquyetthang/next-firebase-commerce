import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { IAdminDb, ICreateAdminInput } from "./type";
import { db } from "@/utils/firebase";
import { COLLECTIONS } from "@/constants/common";
import { hashPassword } from "@/utils/common/password";

const adminRef = collection(db, COLLECTIONS.ADMIN);


export const findAdminByEmail = async (email: string): Promise<IAdminDb> => {
  const existedAdmin = await getDocs(
    query(adminRef, where("email", "==", email))
  );

  const admin = existedAdmin.docs[0].data() as IAdminDb;
  
  return {
    ...admin,
    id: existedAdmin.docs[0].id,
  };
};


export const createAdmin = async (data: ICreateAdminInput) => {
  const existedAdmin = await findAdminByEmail(data.email);

  if (existedAdmin) {
    throw Error("Email is existed!");
  }

  const hashedPassword = await hashPassword(data.password);

  const newAdminRef = await addDoc(adminRef, {
    email: data.email,
    password: hashedPassword,
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
  });

  const newAdmin = await getDoc(newAdminRef);
  return { id: newAdmin.id, ...newAdmin.data() };
};
