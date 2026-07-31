import { ReactElement, cloneElement, isValidElement } from "react";

import Label from "./Label";
import HelperText from "./HelperText";
import { cn } from "@/lib/utils/cn";

interface FormFieldProps {
  id: string;
  label: string;
  children: ReactElement<Record<string, unknown>>;
  helperText?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export default function FormField({
  id,
  label,
  children,
  helperText,
  error,
  required = false,
  className,
}: FormFieldProps) {
  const describedBy = error ? `${id}-error` : helperText ? `${id}-helper` : undefined;

  const child = cloneElement(children, {
    id,
    error: Boolean(error),
    "aria-describedby": describedBy,
  });

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>
        {label}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </Label>

      {child}

      {error ? (
        <HelperText id={`${id}-error`} error>
          {error}
        </HelperText>
      ) : helperText ? (
        <HelperText id={`${id}-helper`}>{helperText}</HelperText>
      ) : null}
    </div>
  );
}

FormField.displayName = "FormField";
