import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type PasswordFieldProps = {
  form: any;
  name: string;
  label: string;
};

export function PasswordField({
  form,
  name,
  label = "Password",
}: PasswordFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} placeholder={"********"} type="password" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
