import { UseFormReturn } from "react-hook-form";
import z from "zod";

export interface FormFieldProp {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  options?: any;
  required: boolean;
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
}

export interface AuthUserProps {
  id: number;
  email: string;
  name: string;
  role: string;
}
