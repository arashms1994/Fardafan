export interface FamilyFormState {
  fullName: string;
  birthDate: Date | null;
  job: string;
  education: string;
  phoneNumber: string;
  relation: string;
}

export interface FormField {
  key: string;
  label: string;
  type: string;
}

export interface familyFormProps {
  GUID: string;
  relation: string;
  fields: FormField[];
  rowNumber: number;
  onDataChange: (guid: string, data: any) => void;
}
