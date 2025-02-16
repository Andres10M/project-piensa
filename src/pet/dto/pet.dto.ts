export class CreatePetDto {
  name: string;
  breed?: string;
  age?: number;
  weight?: number;
  gender?: string;
  healthNotes?: string;
  ownerId: string; // ownerId debe ser un string
}
