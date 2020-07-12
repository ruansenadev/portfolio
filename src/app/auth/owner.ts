export interface Owner {
  name: string,
  surname: string,
  email: string,
  password: string,
  photo: string,
  birth: Date,
  nickname: string | null,
  logo: string | null,
  biodata: string,
  profession: string,
  skills: { [key: string]: any },
  social: { [key: string]: string }
}
