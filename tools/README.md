# Outils de la ruche (modèle réutilisable)

- `supabase.sql` : base complète (bees, billet, chat, news, parrainage, séries). Remplacer MOT_DE_PASSE_A_CHANGER avant de lancer.
- `capture_reel.py <dossier_avec_three3> <nb_images>` : filme le vrai jeu (Playwright + swiftshader) image par image en 1080×1920 / 30 fps. La chorégraphie (caméra + textes) est dans `window.capHook(t)`.
- `musique_fond.py sortie.wav` : musique douce + oiseaux + bourdonnement (numpy), durée réglée dans le fichier.
- Montage : `ffmpeg -framerate 30 -i f%04d.jpg -i fond.wav -i voix.mp3 -filter_complex "[1:a]volume=0.8[b];[2:a]adelay=200|200,volume=1.6,apad[v];[b][v]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.95[a]" ...`
- Note : le billet (claim_treasure) utilise le jour = heure d'Israël − 9 h (régénération à 09:00).
