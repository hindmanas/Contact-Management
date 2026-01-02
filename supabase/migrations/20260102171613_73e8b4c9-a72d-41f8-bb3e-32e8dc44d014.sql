-- Create contacts table for storing contact form submissions
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contacts (public contact form)
CREATE POLICY "Anyone can submit contacts" 
ON public.contacts 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to view contacts (for display in table)
CREATE POLICY "Anyone can view contacts" 
ON public.contacts 
FOR SELECT 
USING (true);

-- Allow anyone to delete contacts
CREATE POLICY "Anyone can delete contacts" 
ON public.contacts 
FOR DELETE 
USING (true);