-- Remove the public DELETE policy from contacts table
DROP POLICY IF EXISTS "Anyone can delete contacts" ON public.contacts;