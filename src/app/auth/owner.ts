export interface Owner {
  name: string,
  surname: string,
  email: string,
  password: string,
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
