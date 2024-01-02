-- Create a custom data type for application roles.
CREATE TYPE public.app_role AS ENUM(
  'admin'
);

-- Create the users table.
CREATE TABLE public.users(
  -- Unique identifier for each user.
  id uuid NOT NULL,
  -- Timestamp of user creation.
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  -- User's name.
  name text NULL,
  -- User's email address. it will be sync with supabase auth table via triggers.
  email character varying NULL,
  -- User's role in the application.
  ROLE public.app_role NULL,
  -- URL of user's avatar image.
  avatar_url text NULL,
  -- Primary key constraint on the id column.
  CONSTRAINT users_pkey PRIMARY KEY (id),
  -- Foreign key constraint on the id column referencing supabase auth table.
  CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE
)
TABLESPACE pg_default;

-- TRIGGER: copy email at auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS TRIGGER
  AS $$
BEGIN
  INSERT INTO public.users(id, email)
    VALUES(NEW.id, NEW.email);
  RETURN new;
END;
$$
LANGUAGE plpgsql
SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_user();

-- DROP TRIGGER on_auth_user_created ON auth.users;
