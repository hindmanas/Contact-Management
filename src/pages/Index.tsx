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
      title: "Contact Added",
      description: "The contact has been successfully added to your directory.",
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
      title: "Contact Deleted",
      description: "The contact has been successfully removed from your directory.",
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
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-5xl space-y-8">
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
    </div>
  );
};

export default Index;