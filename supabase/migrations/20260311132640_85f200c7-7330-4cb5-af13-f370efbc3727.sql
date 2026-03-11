
-- Create workspace_modules table
CREATE TABLE IF NOT EXISTS public.workspace_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL,
  module_id text NOT NULL,
  position integer DEFAULT 0,
  settings jsonb DEFAULT '{}'::jsonb,
  is_pinned boolean DEFAULT false,
  is_standalone boolean DEFAULT false,
  added_via_collection text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(workspace_id, module_id)
);

-- Create module_bundle_relations table
CREATE TABLE IF NOT EXISTS public.module_bundle_relations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bundle_module_id text NOT NULL,
  related_module_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(bundle_module_id, related_module_id)
);

-- Create module_group_modules table
CREATE TABLE IF NOT EXISTS public.module_group_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL,
  module_key text NOT NULL,
  relationship_type text DEFAULT 'primary',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(group_id, module_key)
);

-- Enable RLS
ALTER TABLE public.workspace_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_bundle_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_group_modules ENABLE ROW LEVEL SECURITY;

-- workspace_modules: users can manage modules in their own workspaces
CREATE POLICY "Users can manage own workspace modules" ON public.workspace_modules
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.workspaces w WHERE w.id = workspace_modules.workspace_id AND w.owner_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.workspaces w WHERE w.id = workspace_modules.workspace_id AND w.owner_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all workspace modules" ON public.workspace_modules
  FOR ALL TO authenticated
  USING (is_admin(auth.uid()));

-- module_bundle_relations: readable by all authenticated
CREATE POLICY "Anyone can read bundle relations" ON public.module_bundle_relations
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage bundle relations" ON public.module_bundle_relations
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- module_group_modules: readable by all authenticated
CREATE POLICY "Anyone can read group modules" ON public.module_group_modules
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage group modules" ON public.module_group_modules
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Also add INSERT/UPDATE/DELETE policies for workspaces table (currently missing)
CREATE POLICY "Users can insert own workspaces" ON public.workspaces
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own workspaces" ON public.workspaces
  FOR UPDATE TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can delete own workspaces" ON public.workspaces
  FOR DELETE TO authenticated
  USING (auth.uid() = owner_id);
