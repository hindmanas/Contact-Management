import { Loader2, Users, UserCircle, ShieldAlert } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Contact } from "@/hooks/useContacts";

interface ContactsTableProps {
  contacts: Contact[];
  isLoading: boolean;
}

export function ContactsTable({
  contacts,
  isLoading,
}: ContactsTableProps) {
  if (isLoading) {
    return (
      <Card className="animate-fade-in border-border/50 shadow-elevated">
        <CardContent className="flex flex-col items-center justify-center py-20">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
            <Loader2 className="relative h-12 w-12 animate-spin text-primary" />
          </div>
          <p className="mt-4 text-lg font-medium text-muted-foreground">Loading contacts...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in-up border-border/50 shadow-elevated" style={{ animationDelay: "0.1s" }}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-accent blur-sm" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                <Users className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
            <div>
              <CardTitle className="font-heading text-2xl font-bold text-foreground">
                Contact Directory
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                View all saved contacts
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="h-8 gap-1.5 px-3 text-sm font-semibold">
            <UserCircle className="h-4 w-4" />
            {contacts.length} {contacts.length === 1 ? "Contact" : "Contacts"}
          </Badge>
        </div>
        
        <Alert className="mt-4 border-amber-500/50 bg-amber-500/10">
          <ShieldAlert className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-700 dark:text-amber-400">
            Contact deletion is restricted to authorized administrators only. Please contact the website owner to remove entries.
          </AlertDescription>
        </Alert>
      </CardHeader>
      <CardContent>
        {contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/60 bg-muted/30 py-16 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Users className="h-10 w-10 text-muted-foreground/60" />
            </div>
            <h3 className="mb-2 font-heading text-xl font-semibold text-foreground">No contacts yet</h3>
            <p className="max-w-sm text-muted-foreground">
              Your contact directory is empty. Add your first contact using the form above.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border/60">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="h-14 font-bold text-foreground">Name</TableHead>
                  <TableHead className="h-14 font-bold text-foreground">Email</TableHead>
                  <TableHead className="h-14 font-bold text-foreground">Phone</TableHead>
                  <TableHead className="h-14 font-bold text-foreground">Notes</TableHead>
                  <TableHead className="h-14 font-bold text-foreground">Added</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact, index) => (
                  <TableRow
                    key={contact.id}
                    className="group animate-fade-in transition-colors hover:bg-accent/30"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                          {contact.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-foreground">{contact.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-muted-foreground">{contact.email}</TableCell>
                    <TableCell className="py-4 text-muted-foreground">{contact.phone}</TableCell>
                    <TableCell className="max-w-[200px] truncate py-4 text-muted-foreground">
                      {contact.message || (
                        <span className="italic text-muted-foreground/50">No notes</span>
                      )}
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge variant="outline" className="font-medium">
                        {format(new Date(contact.created_at), "MMM dd, yyyy")}
                      </Badge>
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