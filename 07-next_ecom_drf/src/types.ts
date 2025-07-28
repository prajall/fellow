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
  footer_above?: React.ReactNode;
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
  status: boolean;
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

export interface CategoryProps {
  id: number;
  name: string;
  description: string;
}

export interface CategoryAPIProps {
  count: number;
  next?: string;
  previous?: string;
  results: CategoryProps[];
}

export interface Order {
  id: number;
  product: {
    id: number;
    name: string;
    description: string;
    category: string;
    category_id: number;
    price: string;
    discount: string;
    image: string | null;
    stock: number;
  };
  customer: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
  quantity: number;
  price: string;
  status: string;
}

export interface ProductImageProps {
  id: number;
  image: string;
  product: number;
  index: number;
}
