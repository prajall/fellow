import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type TextFieldProps = {
  form: any;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
};

export function TextField({
  form,
  name,
  label,
  placeholder,
  type = "text",
  className,
}: TextFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} placeholder={placeholder} type={type} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
