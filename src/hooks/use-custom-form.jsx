import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DatePicker } from "@/components/ui/datepicker";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DateTimePicker } from "@/components/ui/datetimepicker";

const useCustomForm = ({ defaultValues = {} }) => {
  const form = useForm({
    defaultValues,
    mode: "onChange",
  });

  const { handleSubmit, control, ...props } = form;

  const FormWrapper = ({ children, onSubmit, onError, className }) => (
    <Form {...form}>
      <form
        className={cn("h-full px-1 w-full", className)}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        {children}
      </form>
    </Form>
  );

  const FormInput = ({
    title,
    placeholder,
    description,
    id,
    type,
    className,
    ...props
  }) => (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-sm font-medium">
            {title}
            {props.required && <span className="text-destructive"> *</span>}
          </FormLabel>
          <FormControl>
            <Input
              id={id}
              {...field}
              {...props}
              type={type}
              placeholder={placeholder}
              className={cn(
                "h-10 px-3 py-2 text-sm rounded-md border border-input bg-background",
                "placeholder:text-muted-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "transition-colors duration-200",
                className
              )}
            />
          </FormControl>
          {description && (
            <FormDescription className="text-[0.8rem] text-muted-foreground">
              {description}
            </FormDescription>
          )}
          <FormMessage className="text-xs text-destructive" />
        </FormItem>
      )}
    />
  );

  const FormRadioGroup = ({ title, id, options }) => (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <RadioGroup value={field.value} onValueChange={field.onChange}>
            {options.map((option) => (
              <RadioGroupItem key={option.value} value={option.value}>
                {option.label}
              </RadioGroupItem>
            ))}
          </RadioGroup>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const FormSelect = ({
    title = "",
    id,
    options,
    placeholder = "Select an option",
    className,
  }) => (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const FormSwitch = ({ title, id }) => (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const FormCommand = ({ title, id, options }) => (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Command>
              <CommandInput
                placeholder="Search or command"
                value={field.value}
                onValueChange={field.onChange}
              />
              <CommandList>
                <CommandGroup heading="Locations">
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => field.onChange(option.value)}
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const FormTextarea = ({ title, placeholder, id }) => (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const FormCheckbox = ({ title, id, onCheckboxChange }) => (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem className="inline-flex items-center gap-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={(isChecked) => {
                field.onChange(isChecked);
                onCheckboxChange?.(id, isChecked);
              }}
            />
          </FormControl>
          <FormLabel>{title}</FormLabel>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const FormSlider = ({ title, id, min, max, step = 1 }) => (
    <FormField
      control={control}
      name={id}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{title}</FormLabel>
            <FormControl>
              <Slider
                min={min}
                max={max}
                step={step}
                value={field.value || [min, max]} // Default to min value if no value is set
                onValueChange={field.onChange} // Pass updated value to form
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );

  const FormDatePicker = ({ title, id, placeholder, required = false }) => (
    <FormField
      control={control}
      name={id}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>
            {title}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <DatePicker
              placeholder={placeholder}
              required={required}
              {...field}
              date={field.value}
              onChange={(date) => field.onChange(date)} // Handle date changes
            />
          </FormControl>
          <FormMessage>
            {fieldState.error && (
              <span className="text-red-500">{fieldState.error.message}</span>
            )}
          </FormMessage>
        </FormItem>
      )}
    />
  );

  const FormDateTimePicker = ({
    title,
    id,
    placeholder,
    required = false,
    futureOnly=false,
  }) => (
    <FormField
      control={control}
      name={id}
      rules={{
        validate: futureOnly
          ? (value) => {
            if (!value) return true;
            const now = new Date();
            const selected = new Date(value);
            return selected > now || "Date must be in the future";
          }
          : undefined,
      }}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>
            {title}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <DateTimePicker
              placeholder={placeholder}
              required={required}
              {...field}
              date={field.value}
              onChange={(date) => field.onChange(date)}
              futureOnly={futureOnly}
            />
          </FormControl>
          <FormMessage>
            {fieldState.error && (
              <span className="text-red-500">{fieldState.error.message}</span>
            )}
          </FormMessage>
        </FormItem>
      )}
    />
  );

  return {
    FormWrapper,
    FormInput,
    FormRadioGroup,
    FormSelect,
    FormSwitch,
    FormTextarea,
    FormCheckbox,
    handleSubmit,
    FormSlider,
    FormCommand,
    FormDatePicker,
    FormDateTimePicker,
    ...props,
  };
};

export default useCustomForm;
