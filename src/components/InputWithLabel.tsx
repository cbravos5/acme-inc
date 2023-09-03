import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { ComponentProps, forwardRef } from "react"

type Props = {
  label?: string;
} & ComponentProps<typeof Input>;

export const InputWithLabel = forwardRef<HTMLInputElement, Props>(
  function ({ label, ...props }, ref) {
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor={props.id}>{label}</Label>
        <Input ref={ref} {...props} />
      </div>
    );
  }
);
