-- Ce script permet de migrer vos données en dur vers la base de données Supabase.
-- À exécuter dans le SQL Editor de Supabase.

-- Nettoyage pour éviter les doublons si vous l'exécutez plusieurs fois
TRUNCATE TABLE team_members, projects;


-- 1. Insérer les membres de l'équipe
INSERT INTO team_members (first_name, last_name, role_fr, role_en, description_fr, is_board_member, order_index)
VALUES 
('Sourou Denis', 'AHISSOU', 'Président du Conseil d''Administration', 'Chairman of the Board', 'Professeur d''EPS, expert Francophonie, formateur en secourisme et consultant en genre & développement durable.', true, 1),
('Pélagie', 'KOUCHAINON', 'Secrétaire Générale', 'General Secretary', 'Garante du bon fonctionnement administratif et de la coordination des activités de l''ONG.', true, 2),
('Zinsou Damien', 'AHISSOU', 'Directeur Exécutif', 'Executive Director', 'Agronome, journaliste, écrivain et poète-slameur. Activiste engagé pour la culture et le développement.', true, 3),
('Sèyido Sylvain', 'DJOUGBELE', 'Chef département Santé & Bien-être', 'Head of Health Department', 'Infirmier spécialiste, consultant en santé mentale et gestionnaire de projets de santé communautaire.', true, 4),
('Ambroise', 'AHISSOU', 'Membre', 'Member', 'Instituteur, engagé pour l''éducation et le développement des jeunes au Bénin.', false, 5),
('Luc', 'AHISSOU', 'Membre', 'Member', 'Technicien supérieur, expert en automatisation IA, développeur web et fondateur de Digital Pulse.', false, 6);


-- 2. Insérer les projets (Vos 4 projets mock)
INSERT INTO projects (title_fr, title_en, category_fr, category_en, description_fr, date_start, is_published, cover_image)
VALUES 
('Université de la Nature (Ecoversities Afrika)', 'Nature University', 'Environnement & Climat', 'Environment & Climate', 'Programme immersif pour reconnecter les jeunes à la nature, valoriser les savoirs endogènes et promouvoir des solutions écologiques locales.', '2026-02-01', true, 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800'),
('Programme "L''Éducation c''est l''Avenir"', 'Education is the Future', 'Éducation & Leadership', 'Education & Leadership', 'Renforcement des capacités des jeunes leaders communautaires et soutien scolaire aux enfants en situation de vulnérabilité.', '2025-01-01', true, 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800'),
('Campagne digitale pour la paix', 'Digital Peace Campaign', 'Paix & Solidarité', 'Peace & Solidarity', 'Sensibilisation massive sur les réseaux sociaux pour des élections apaisées et la préservation de la cohésion sociale au Bénin.', '2026-01-01', true, 'https://images.unsplash.com/photo-1529156069898-49953eb1b5ae?auto=format&fit=crop&q=80&w=800'),
('Festisol Ouémé 2025', 'Festisol Ouémé 2025', 'Culture & Patrimoine', 'Culture & Heritage', 'Festival des solidarités mettant en valeur les initiatives citoyennes locales et l''engagement des jeunes.', '2025-11-01', true, 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800');
