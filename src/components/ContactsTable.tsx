import { useState } from "react";
import { Trash2, Loader2, Users } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Contact } from "@/hooks/useContacts";

interface ContactsTableProps {
  contacts: Contact[];
  isLoading: boolean;
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>;
  onDeleteSuccess: () => void;
  onDeleteError: (message: string) => void;
}

export function ContactsTable({
  contacts,
  isLoading,
  onDelete,
  onDeleteSuccess,
  onDeleteError,
}: ContactsTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const result = await onDelete(id);
      if (result.success) {
        onDeleteSuccess();
      } else {
        onDeleteError(result.error || "Failed to delete contact");
      }
    } catch {
      onDeleteError("An unexpected error occurred");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <Card className="shadow-corporate-lg border-border/60">
        <CardContent className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-muted-foreground">Loading contacts...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-corporate-lg border-border/60">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl font-heading text-foreground">
              Contact Directory
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {contacts.length} {contacts.length === 1 ? "contact" : "contacts"} in your directory
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-foreground">No contacts yet</h3>
            <p className="text-sm text-muted-foreground">
              Add your first contact using the form above.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Phone</TableHead>
                  <TableHead className="font-semibold">Message</TableHead>
                  <TableHead className="font-semibold">Date Added</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell className="text-muted-foreground">{contact.email}</TableCell>
                    <TableCell className="text-muted-foreground">{contact.phone}</TableCell>
                    <TableCell className="max-w-xs truncate text-muted-foreground">
                      {contact.message || "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(contact.created_at), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            disabled={deletingId === contact.id}
                          >
                            {deletingId === contact.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Contact</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete <strong>{contact.name}</strong>? This
                              action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(contact.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}