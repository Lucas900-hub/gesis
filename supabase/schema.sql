-- Schema for GESIS NGO Website

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE member_role AS ENUM (
  'founder',
  'adherent',
  'active',
  'sympathizer',
  'honorary'
);

CREATE TYPE contact_subject AS ENUM (
  'partnership',
  'education',
  'media',
  'donation',
  'volunteer',
  'membership',
  'community_project',
  'general_info',
  'other'
);

-- ============================================================================
-- TABLES
-- ============================================================================

-- 1. Site Settings (Global configuration, social links, contact info)
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name VARCHAR(255) NOT NULL DEFAULT 'GESIS',
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  whatsapp_number VARCHAR(50),
  address TEXT,
  facebook_url TEXT,
  linkedin_url TEXT,
  instagram_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Team Members (Board members & team)
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_fr VARCHAR(255) NOT NULL,
  role_en VARCHAR(255) NOT NULL,
  description_fr TEXT,
  description_en TEXT,
  image_url TEXT,
  is_board_member BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Projects & Activities
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_fr VARCHAR(255) NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  description_fr TEXT,
  description_en TEXT,
  content_fr TEXT,
  content_en TEXT,
  category_fr VARCHAR(100),
  category_en VARCHAR(100),
  date_start DATE,
  date_end DATE,
  cover_image TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Partners
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  description_fr TEXT,
  description_en TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. News & Blog
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_fr VARCHAR(255) NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt_fr TEXT,
  excerpt_en TEXT,
  content_fr TEXT,
  content_en TEXT,
  cover_image TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_fr VARCHAR(255) NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  description_fr TEXT,
  description_en TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location_fr VARCHAR(255),
  location_en VARCHAR(255),
  cover_image TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Testimonials
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_name VARCHAR(150) NOT NULL,
  author_role_fr VARCHAR(150),
  author_role_en VARCHAR(150),
  content_fr TEXT NOT NULL,
  content_en TEXT NOT NULL,
  avatar_url TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Documents & Resources (Statuts, Règlements, etc.)
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_fr VARCHAR(255) NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size VARCHAR(50),
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. FAQ
CREATE TABLE faq (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_fr TEXT NOT NULL,
  question_en TEXT NOT NULL,
  answer_fr TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Contact Messages (Form submissions)
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject contact_subject NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Volunteer Applications
CREATE TABLE volunteer_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  skills VARCHAR(255),
  availability VARCHAR(255),
  motivation TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, accepted, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. Membership Applications
CREATE TABLE membership_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  city VARCHAR(150),
  profession VARCHAR(150),
  member_type VARCHAR(100),
  motivation TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. Donations (Log)
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255),
  country VARCHAR(100),
  amount DECIMAL(12,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'FCFA',
  program_supported VARCHAR(255),
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 14. Key Statistics
CREATE TABLE statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label_fr VARCHAR(100) NOT NULL,
  label_en VARCHAR(100) NOT NULL,
  value VARCHAR(50) NOT NULL,
  icon VARCHAR(50),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- RLS POLICIES (Row Level Security)
-- ============================================================================

-- /!\ CRITICAL SECURITY WARNING /!\
-- Function to check if user is authenticated (admin).
-- IMPORTANT: Make sure "Allow new users to sign up" is DISABLED in your Supabase Authentication settings!
-- If it is enabled, anyone can sign up and they will be considered 'authenticated', 
-- which gives them full admin access to the entire database through this function.
CREATE OR REPLACE FUNCTION is_admin() RETURNS BOOLEAN AS $$
  SELECT auth.role() = 'authenticated';
$$ LANGUAGE sql SECURITY DEFINER;

-- Apply RLS to all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;

-- Public Read Policies (for active/published content)
CREATE POLICY "Public can read site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public can read team members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public can read published projects" ON projects FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read partners" ON partners FOR SELECT USING (true);
CREATE POLICY "Public can read published news" ON news FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read published events" ON events FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read published testimonials" ON testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read public documents" ON documents FOR SELECT USING (is_public = true);
CREATE POLICY "Public can read published FAQ" ON faq FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read statistics" ON statistics FOR SELECT USING (true);

-- Public Insert Policies (for forms)
CREATE POLICY "Public can insert contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert volunteer applications" ON volunteer_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert membership applications" ON membership_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert donations" ON donations FOR INSERT WITH CHECK (true);

-- Admin Policies (Full access for authenticated users)
CREATE POLICY "Admin full access site_settings" ON site_settings FOR ALL USING (is_admin());
CREATE POLICY "Admin full access team_members" ON team_members FOR ALL USING (is_admin());
CREATE POLICY "Admin full access projects" ON projects FOR ALL USING (is_admin());
CREATE POLICY "Admin full access partners" ON partners FOR ALL USING (is_admin());
CREATE POLICY "Admin full access news" ON news FOR ALL USING (is_admin());
CREATE POLICY "Admin full access events" ON events FOR ALL USING (is_admin());
CREATE POLICY "Admin full access testimonials" ON testimonials FOR ALL USING (is_admin());
CREATE POLICY "Admin full access documents" ON documents FOR ALL USING (is_admin());
CREATE POLICY "Admin full access faq" ON faq FOR ALL USING (is_admin());
CREATE POLICY "Admin full access contact_messages" ON contact_messages FOR ALL USING (is_admin());
CREATE POLICY "Admin full access volunteer_applications" ON volunteer_applications FOR ALL USING (is_admin());
CREATE POLICY "Admin full access membership_applications" ON membership_applications FOR ALL USING (is_admin());
CREATE POLICY "Admin full access donations" ON donations FOR ALL USING (is_admin());
CREATE POLICY "Admin full access statistics" ON statistics FOR ALL USING (is_admin());

-- ============================================================================
-- SEED DATA
-- ============================================================================

INSERT INTO site_settings (site_name, contact_email, contact_phone, whatsapp_number, address, facebook_url, linkedin_url)
VALUES (
  'GESIS',
  'contact@egssi.org',
  '+2290161868920',
  '+2290161868920',
  'Village de Drogbo, Maison AHISSOU, Adjarra, Arrondissement II, Département de l''Ouémé, Bénin',
  'https://www.facebook.com/profile.php?id=100056785756664',
  'https://www.linkedin.com/company/ong-gesis'
);

INSERT INTO statistics (label_fr, label_en, value, icon, order_index) VALUES
('Bénéficiaires', 'Beneficiaries', '500+', 'users', 1),
('Domaines', 'Domains', '9', 'layers', 2),
('Activités réalisées', 'Activities Done', '12+', 'check-circle', 3),
('Depuis', 'Since', '2020', 'calendar', 4);
