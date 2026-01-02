import { BookUser } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 blur-sm" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl gradient-primary shadow-glow">
              <BookUser className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
              Contact Management
            </h1>
            <p className="text-sm font-medium text-muted-foreground">
              Organize and manage your business contacts
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}