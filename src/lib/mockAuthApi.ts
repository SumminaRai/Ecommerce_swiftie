//creating a fake backend\

import { User } from "@/types";
import { resolve } from "path";

//adding password 
interface StoredUser extends User{
  password: string;
}


const USERS_KEY = " swiftie-users";
const delay = ( ms=400) => new Promise((resolve)=> setTimeout(resolve, ms));

function readUsers():StoredUser[]{
  try{
    return JSON.parse(localStorage.getItem(USERS_KEY)?? "[]");
  }
  catch{
    return[];
  }
}

function toUser(stored: StoredUser): User{
  return {id: stored.id, name: stored.name, email: stored.email};
}

export async function signupRequest(
  name: string,
  email: string,
  password: string
): Promise<User> {

  await delay();
  const users = readUsers();
  const cleanEmail = email.trim().toLowerCase();

  if(users.some((u)=> u.email === cleanEmail)){
    throw new Error (" An account with this email already exists");
  }

  const newUser: StoredUser ={
    id: String(Date.now()),
    name: name.trim(),
    email: cleanEmail,
    password,
  };
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
}

export async function loginRequest(email:string, password: string): Promise<User>{
 
  await delay();
  const cleanEmail = email.trim().toLowerCase();
  
  const found = readUsers().find((u)=> u.email === cleanEmail && u.password===password);

  if(!found) throw new Error("Invalid email or password");
  return toUser(found);
};

