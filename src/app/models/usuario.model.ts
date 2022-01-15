export class Usuario {
  constructor(public uid: string, public name: string, public email: string) {}

  static fromFirebase({
    email,
    name,
    uid,
  }: {
    email: string;
    name: string;
    uid: string;
  }) {
    return new Usuario(uid, name, email);
  }
}
