import { BookUser } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-card shadow-corporate">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <BookUser className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground">
              Contact Management
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your business contacts efficiently
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}