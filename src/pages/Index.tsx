import { Header } from "@/components/Header";
import { ContactForm } from "@/components/ContactForm";
import { ContactsTable } from "@/components/ContactsTable";
import { useContacts } from "@/hooks/useContacts";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { contacts, isLoading, addContact, deleteContact } = useContacts();
  const { toast } = useToast();

  const handleAddSuccess = () => {
    toast({
      title: "✓ Contact Added Successfully",
      description: "The contact has been added to your directory.",
    });
  };

  const handleAddError = (message: string) => {
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  };

  const handleDeleteSuccess = () => {
    toast({
      title: "✓ Contact Deleted",
      description: "The contact has been removed from your directory.",
    });
  };

  const handleDeleteError = (message: string) => {
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent))_0%,transparent_50%)] opacity-50" />
      
      <Header />
      
      <main className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-10">
          <ContactForm
            onSubmit={addContact}
            onSuccess={handleAddSuccess}
            onError={handleAddError}
          />
          <ContactsTable
            contacts={contacts}
            isLoading={isLoading}
            onDelete={deleteContact}
            onDeleteSuccess={handleDeleteSuccess}
            onDeleteError={handleDeleteError}
          />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Contact Management System • Built with modern web technologies
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;