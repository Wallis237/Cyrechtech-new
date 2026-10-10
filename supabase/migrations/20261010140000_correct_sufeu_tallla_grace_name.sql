UPDATE public.team_members
SET name = 'Sufeu Tallla Grace',
    image = '/lovable-uploads/team-sufeu-tallla-grace.png'
WHERE lower(trim(name)) IN (lower('Sufeu Talla Grace'), lower('Sufeu Tallla Grace'));
