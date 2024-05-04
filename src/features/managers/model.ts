import {
  addDoc,
  collection,
  doc,
  endAt,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { IAdminDb, IAdminDoc, ICreateAdminInput } from "./type";
import { db } from "@/utils/firebase";
import { COLLECTIONS } from "@/constants/common";
import { hashPassword } from "@/utils/common/password";
import { IGetDataInput, IPaginationRes } from "../type";
import { getLastVisibleDoc } from "@/utils/common/queries";

const adminRef = collection(db, COLLECTIONS.ADMIN);

export const findAdminByEmail = async (
  email: string
): Promise<IAdminDb | undefined> => {
  const existedAdmin = await getDocs(
    query(adminRef, where("email", "==", email))
  );

  if (!existedAdmin.docs[0]) {
    return undefined;
  }

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
    isActive: data.isActive,
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
  });

  const newAdmin = await getDoc(newAdminRef);
  return { id: newAdmin.id, ...newAdmin.data() };
};

export const getManagers = async (
  data: IGetDataInput
): Promise<IPaginationRes<IAdminDb>> => {
  const { keyword, page, size, orderField, orderType } = data;
  const queries = [];
  queries.push(orderBy(orderField, orderType));
  const queriesKeyword = [];
  if (keyword) {
    const keywordQueries =
      orderType === "asc"
        ? [startAt(keyword), endAt(keyword + "\uf8ff")]
        : [startAt(keyword + "\uf8ff"), endAt(keyword)];
    if (orderField !== "email") {
      keywordQueries.unshift(orderBy("email") as any);
    }

    queriesKeyword.push(
      ...[orderBy("email"), startAt(keyword), endAt(keyword + "\uf8ff")]
    );
    queries.push(...keywordQueries);
  }

  if (page > 1) {
    const lastDoc = await getLastVisibleDoc(
      query(adminRef, ...queries),
      page,
      Number(size || 5)
    );
    queries.push(startAfter(lastDoc));
  }

  const managersDocsRef = await getDocs(
    query(adminRef, ...queries, limit(size || 5))
  );

  const managers = managersDocsRef.docs.slice(0, 5).map((d) => ({
    ...(d.data() as IAdminDoc),
    id: d.id,
  }));

  const total = await getCountFromServer(query(adminRef, ...queriesKeyword));

  return { meta: { total: total.data().count }, data: managers };
};

export const updateActiveAdmin = async (id: string, isActive: boolean) => {
  await updateDoc(doc(adminRef, id), {
    isActive,
  });

  const newCategory = await getDoc(doc(adminRef, id));

  return { id: newCategory.id, ...(newCategory.data() as IAdminDoc) };
};
