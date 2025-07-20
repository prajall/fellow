import { UseFormReturn } from "react-hook-form";
import z from "zod";

export interface FormFieldProp {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  options?: any;
  width?: string;
}
export interface DynamicFormProps {
  size?: string;
  formSchema: z.ZodObject<any>;
  formTitle?: string;
  formSubTitle?: string;
  fields: FormFieldProp[];
  defaultValues?: any;
  onSubmit: (values: any) => void;
  submitText: string;
  footer?: React.ReactNode;
  disableSubmit: boolean;
  noBorder?: boolean;
}

export interface AuthUserProps {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface ProductProps {
  id: number;
  category: {
    id: number;
    name: string;
    description: string;
  };
  images: any[];
  name: string;
  description: string;
  price: string;
  discount: string;
  stock?: number;
  image?: string | null;
  is_active: boolean;
  created_at: string;
}

export interface ProductAPIProps {
  results: ProductProps[];
  count: number;
  next?: string;
  previous?: string;
}

export interface ProductCreateProps {
  id: number;
  category: number;
  images: any[];
  name: string;
  description: string;
  price: string;
  discount: string;
  stock?: number;
  image?: string | null;
  is_active: boolean;
}
