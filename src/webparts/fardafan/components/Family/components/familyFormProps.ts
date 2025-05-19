export interface familyFormProps {
  GUID: string;
  relation: string;
  onDataChange?: (guid: string, data: any) => void;
}

export interface FamilyFormState {
  fullName: string;
  birthDate: Date | null;
  job: string;
  education: string;
  phoneNumber: string;
  relation: string;
}
