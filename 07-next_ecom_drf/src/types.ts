import z from "zod";
import { ZodSchema } from "zod/v3";

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
  size: string;
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
