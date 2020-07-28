export interface Admin {
  name: string,
  surname: string,
  birthdate: Date,
  photo: string,
  profession: string,
  biodata: string,
  logo: string | null,
  nickname: string | null,
  skills: { [key: string]: any } | null,
  social: { [key: string]: string } | null,
  fullName: string | null
}
