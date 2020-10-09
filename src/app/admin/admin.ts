export interface Admin {
  _id?: string;
  name: string;
  email: string;
  last_name: string;
  birthdate: Date;
  address: { city?: string, state?: string };
  photo: string;
  profession: string;
  biodata: string;
  logo?: string;
  nickname?: string;
  skills?: { [key: string]: any };
  social?: { [key: string]: string };
  fullName: string;
  location: string | null;
  age: number;
}
