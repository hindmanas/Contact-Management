import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, User, Mail, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { contactSchema, type ContactFormData } from "@/lib/validations";

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<{ success: boolean; error?: string }>;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export function ContactForm({ onSubmit, onSuccess, onError }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  const handleFormSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const result = await onSubmit(data);
      if (result.success) {
        reset();
        onSuccess();
      } else {
        onError(result.error || "Failed to submit contact");
      }
    } catch {
      onError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="animate-fade-in overflow-hidden border-border/50 shadow-elevated">
      <div className="h-1.5 w-full gradient-primary" />
      <CardHeader className="pb-2 pt-6">
        <CardTitle className="font-heading text-2xl font-bold text-foreground">
          Add New Contact
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Enter the contact details below to add them to your directory.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2.5">
              <Label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <User className="h-4 w-4 text-primary" />
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                {...register("name")}
                className={`h-12 bg-muted/30 transition-all duration-200 placeholder:text-muted-foreground/60 focus:bg-card ${
                  errors.name ? "border-destructive focus-visible:ring-destructive" : "focus:shadow-glow"
                }`}
              />
              {errors.name && (
                <p className="text-sm font-medium text-destructive animate-fade-in">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Mail className="h-4 w-4 text-primary" />
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@company.com"
                {...register("email")}
                className={`h-12 bg-muted/30 transition-all duration-200 placeholder:text-muted-foreground/60 focus:bg-card ${
                  errors.email ? "border-destructive focus-visible:ring-destructive" : "focus:shadow-glow"
                }`}
              />
              {errors.email && (
                <p className="text-sm font-medium text-destructive animate-fade-in">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Phone className="h-4 w-4 text-primary" />
              Phone Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              {...register("phone")}
              className={`h-12 bg-muted/30 transition-all duration-200 placeholder:text-muted-foreground/60 focus:bg-card ${
                errors.phone ? "border-destructive focus-visible:ring-destructive" : "focus:shadow-glow"
              }`}
            />
            {errors.phone && (
              <p className="text-sm font-medium text-destructive animate-fade-in">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="message" className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <MessageSquare className="h-4 w-4 text-primary" />
              Notes <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Add any additional information or notes about this contact..."
              rows={4}
              {...register("message")}
              className={`resize-none bg-muted/30 transition-all duration-200 placeholder:text-muted-foreground/60 focus:bg-card ${
                errors.message ? "border-destructive focus-visible:ring-destructive" : "focus:shadow-glow"
              }`}
            />
            {errors.message && (
              <p className="text-sm font-medium text-destructive animate-fade-in">{errors.message.message}</p>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              size="lg"
              className="h-12 min-w-[160px] gap-2.5 gradient-primary font-semibold shadow-glow transition-all duration-300 hover:shadow-elevated disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Add Contact
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}