export interface User {
  id: number;
  email: string;
  name: string;
  profile_image: string;
}

export interface Group {
  id: number;
  name: string;
  group_image?: string;
  total_members: number;
  members: User[];
}

export interface GroupResponse {
  id: number;
  name: string;
  group_image?: string;
  total_members: number;
}

export interface ExpenseParticipant {
  user_id: number;
  user_name?: string;
  allocated_amount: number;
  paid_amount: number;
}

export interface Expense {
  id: number;
  group_id: number;
  title: string;
  total_amount: number;
  participants: ExpenseParticipant[];
  created_at: Date;
}

export interface Debt {
  id?: number;
  group_id?: number;
  user_a: User;
  user_b: User;
  amount: number;
}

export interface CreateGroupData {
  name: string;
}

export interface CreateExpenseData {
  group_id: number;
  title: string;
  total_amount: number;
  participants: ExpenseParticipant[];
}

export interface SettleDebtData {
  group_id: number;
  user_a: number;
  user_b: number;
  amount: number;
}
