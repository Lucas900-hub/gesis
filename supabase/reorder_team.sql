-- 1. Le Président passe en premier (index 1)
UPDATE team_members 
SET order_index = 1, is_board_member = true
WHERE last_name = 'AHISSOU' AND first_name ILIKE '%Sourou%';

-- 2. Catherine Rebecca TOHOSSI passe en deuxième (index 2) car elle est membre du bureau
UPDATE team_members 
SET order_index = 2, is_board_member = true
WHERE last_name = 'TOHOSSI';

-- 3. Estelle HOUNKPATIN (Membre fondatrice, pas dans le bureau exécutif direct mais importante)
UPDATE team_members 
SET order_index = 3, is_board_member = false
WHERE last_name = 'HOUNKPATIN';

-- 4. Paulin Bodounrin ADEKAMBI (Membre, placé en bas)
UPDATE team_members 
SET order_index = 4, is_board_member = false
WHERE last_name = 'ADEKAMBI';

-- 5. S'assurer que tous les autres membres sans ordre spécifique se retrouvent après
UPDATE team_members
SET order_index = 10
WHERE order_index IS NULL;
