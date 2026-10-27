# Routine quotidienne autonome — הכוורת שלנו (@hakaveret_shelanu)

Shlomo a donné l'autonomie complète (27.10.2026) : publier chaque jour stories + reel + nouveautés, et modifier le jeu, SANS lui demander de confirmation. Le prévenir UNIQUEMENT en cas de problème grave (connexion cassée, mauvais compte, publication impossible), par un message court en français.

## Identifiants
- Instagram (Composio) : account `instagram_recoup-katar` UNIQUEMENT (username hakaveret_shelanu), ig_user_id `39647208548257780`. Vérifier le username avant toute action ; jamais @chlomo_assouline.
- Supabase (Composio, SUPABASE_BETA_RUN_SQL_QUERY) : account `supabase_restow-lise`, ref `ohvmnaymozoxfirkbntt`.
- Site : dépôt GitHub `chlomo111-bit/hakaveret` (GitHub Pages, domaine hakaveret.online). S'il n'est pas dans la session : add_repo (owner chlomo111-bit, repo hakaveret, access push) puis git clone. Commits signés : user.name "chlomo111-bit", user.email "chlomo111-bit@users.noreply.github.com".
- Voix : ElevenLabs, TOUJOURS James (voice_id `EkK5I93UQWFDigLMpZcX`, model `eleven_v3`, flow `aQELt3ILFku8anM2IK25`), 1 seule génération (generations_count 1). Télécharger le MP3 (content_url) avec curl. Si le téléchargement est bloqué : reel sans voix (musique + gros textes + bruitages) et le signaler à Shlomo une seule fois.

## Objectif éditorial (le plus important)
- CHOQUER : chaque reel commence par un hook fou dans la 1re seconde (« יש משחק שמחלק כסף אמיתי… », « מישהו כמעט לקח 50 ₪ תוך 3 דקות », « דבורה ענקית פלשה לכוורת הלילה 😱 »…). Il se passe chaque jour un truc dingue dans la ruche, annoncé au début (« חכו לסוף 😱 ») et révélé à la fin.
- Vidéos dynamiques et énergiques : plans de 1–2 s, zooms rapides, secousses de caméra, flashs, textes qui claquent, musique rythmée, whoosh/boom sur les coupes. Voix James plus rapide/excitée (tags v3 comme [excited], [shouting]). 20–30 s max.
- Toujours les vrais joueurs (vrais @ de la table bees), jamais de chiffres inventés.
- Description = mini-histoire du jour avec les joueurs tagués (@), titre « 🐝 יום N בכוורת », CTA « כתבו "דבורה" 👇 », « 🔗 הקישור בביו », « ומה יקרה מחר? התגובה עם הכי הרבה לייקים קובעת 👇 », « המבצע אינו קשור לאינסטגרם ואינו ממומן על ידה. », 5 hashtags (#הכוורת_שלנו #משחק #דבורים #זכייה #ישראל). Après publication : poster un commentaire CTA (Shlomo l'épingle).

## Production du matin (tâche ~08:10)
1. Données : bees (count, reines, nouveaux depuis hier avec created_at), treasure_wins d'hier, commentaires du dernier reel avec like_count (champ `from` pour le username).
2. Événement du jour = commentaire le plus liké sous le reel d'hier (hors compte du jeu). S'il est réalisable et sans risque (pas de contenu choquant/haineux, pas de données perso) → le réaliser dans le jeu. Sinon le suivant. Si rien : inventer un événement fou mais simple (abeille géante, pluie de miel, billet doré qui vaut double ce jour-là UNIQUEMENT si annoncé comme visuel — ne jamais promettre d'argent en plus des 50 ₪/jour).
3. Modifier `index.html` (le jeu) pour l'événement, tester avec Playwright (pas d'erreur, boucle OK, InstancedMesh setColorAt(0)), commit + push. Ajouter une actualité : `insert into public.news(title, body) values (...)`.
4. Reel « יום N » (N = jours depuis DAY_START 2026-10-27, +1) : écrire le texte voix (hébreu, ~20–25 s), générer la voix, repérer les pauses (ffmpeg silencedetect), écrire `tools/hooks/jourN.js` (chorégraphie caméra + textes, voir jour1.js), capturer avec `tools/capture_reel.py` (installer d'abord `npm i three@0.128.0 @fontsource/heebo` dans <SP>/three3 ; env GAME=index.html BEES=<json bees réels> HOOK=… OUT=<dossier frames> ; vérifier quelques images avant le rendu complet), musique `tools/musique_fond.py` (adapter durée/tempo), montage ffmpeg 1080×1920 30 fps (H.264 -preset veryfast -crf 20, AAC).
5. Stories du jour (JPEG 1080×1920, style de la ruche : fond miel sombre, Heebo 900, blanc + mots clés #FFC24B, « הקישור בביו 🔗 ») : 09:00 billet (nouveau billet caché), 13:00 nouveauté/événement du jour + nouveaux joueurs, 17:00 question « מה יקרה מחר בכוורת? 🤔 כתבו בתגובות לרילס ».
6. Pousser les médias dans `media/` (noms datés, ex. media/2026-10-28/reel.mp4), attendre ~1 min le déploiement.
7. Programmer la publication avec create_trigger (run_once_at, initiation own_followup, notifications {}) : stories 09:00 / 13:00 / 17:00 (si l'heure est passée, publier tout de suite) et reel 19:30 Israël (+ commentaire CTA). Chaque tâche : créer le conteneur (media_type STORIES ou REELS, share_to_feed true), publier une seule fois (vérifier avant tout nouvel essai qu'il n'est pas déjà publié).

## Soir (tâche ~21:15)
- Lire treasure_wins du jour (jour = heure Israël − 9 h). Story résultat : gagnant → « 🏆 @… מצא/ה את השטר! », sinon « 😱 אף אחד לא מצא את השטר… מחר ב־09:00 שטר חדש ». Publier directement.

## Règles
- Économe : une seule génération de voix, pas de rendus inutiles.
- Ne jamais toucher aux autres projets/automatisations de Shlomo.
- Jamais de doublon (abeilles, réponses, publications).
