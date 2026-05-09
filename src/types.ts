export interface CardData {
  name: string;
  photo: string | null;
  department: string;
  theme: string;
}

export type StepType = 'welcome' | 'name' | 'photo' | 'department' | 'result';

export const DEPARTMENTS = [
  'CSE', 'Civil', 'Electrical', 'Electronics', 'Mechanical', 
  'BCA', 'BBA', 'BMLT', 'BBAHM'
] as const;
