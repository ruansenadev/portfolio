export interface Admin {
  _id: string;
  name: string;
  last_name: string;
  birthdate: Date;
  address: { city: string | null, state: string | null };
  photo: string;
  profession: string;
  biodata: string;
  logo: string | null;
  nickname: string | null;
  skills: { [key: string]: any } | null;
  social: { [key: string]: string } | null;
  fullName: string | null;
  location: string | null;
  age: number | null;
}
