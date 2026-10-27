# Routine quotidienne autonome — הכוורת שלנו (@hakaveret_shelanu)

Shlomo a donné l'autonomie complète (27.10.2026) : publier chaque jour stories + reel + nouveautés, et modifier le jeu, SANS lui demander de confirmation. Le prévenir UNIQUEMENT en cas de problème grave (connexion cassée, mauvais compte, publication impossible), par un message court en français.

## Identifiants
- Instagram (Composio) : account `instagram_recoup-katar` UNIQUEMENT (username hakaveret_shelanu), ig_user_id `39647208548257780`. Vérifier le username avant toute action ; jamais @chlomo_assouline.
- Supabase (Composio, SUPABASE_BETA_RUN_SQL_QUERY) : account `supabase_restow-lise`, ref `ohvmnaymozoxfirkbntt`.
- Site : dépôt GitHub `chlomo111-bit/hakaveret` (GitHub Pages, domaine hakaveret.online). S'il n'est pas dans la session : add_repo (owner chlomo111-bit, repo hakaveret, access push) puis git clone. Commits signés : user.name "chlomo111-bit", user.email "chlomo111-bit@users.noreply.github.com".
- Voix : ElevenLabs, TOUJOURS James (voice_id `EkK5I93UQWFDigLMpZcX`, model `eleven_v3`, flow `aQELt3ILFku8anM2IK25`), 1 seule génération (generations_count 1). Télécharger le MP3 (content_url) avec curl. Si le téléchargement est bloqué : reel sans voix (musique + gros textes + bruitages) et le signaler à Shlomo une seule fois.

## Objectif éditorial (le plus important)
- CHOQUER : chaque reel commence par un hook fou dans la 1re seconde (« יש משחק שמחלק כסף אמיתי… », « מישהו לקח 20 ₪ תוך 3 דקות », « דבורה ענקית פלשה לכוורת הלילה 😱 »…). Il se passe chaque jour un truc dingue dans la ruche, annoncé au début (« חכו לסוף 😱 ») et révélé à la fin.
- Vidéos dynamiques et énergiques : plans de 1–2 s, zooms rapides, secousses de caméra, flashs, textes qui claquent, musique rythmée, whoosh/boom sur les coupes. Voix James plus rapide/excitée (tags v3 comme [excited], [shouting]). 20–30 s max.
- Toujours les vrais joueurs (vrais @ de la table bees), jamais de chiffres inventés.
- Description = mini-histoire du jour avec les joueurs tagués (@), titre « 🐝 יום N בכוורת », CTA « כתבו "דבורה" 👇 », « 🔗 הקישור בביו », « ומה יקרה מחר? התגובה עם הכי הרבה לייקים קובעת 👇 », « המבצע אינו קשור לאינסטגרם ואינו ממומן על ידה. », 5 hashtags (#הכוורת_שלנו #משחק #דבורים #זכייה #ישראל). Après publication : poster un commentaire CTA (Shlomo l'épingle).

## Billets (depuis le 27.10.2026 10:45, règle de Shlomo)
- Exception unique : le 27.10 slot 3 (17:58) = billet cadeau violet 40 ₪ offert par @ronen18 (colonnes billet_slots.gift_from / gift_msg). Les jours suivants : de nouveau 3×20 ₪ normaux, ne jamais remettre de gift sans demande de Shlomo.
- 3 billets de 20 ₪ par jour (60 ₪/jour), à des heures aléatoires et espacées : créneau 1 entre 09:00 et 11:30, créneau 2 entre 13:00 et 16:00, créneau 3 entre 18:00 et 21:30 (table billet_slots, générée automatiquement par la fonction ensure_slots). Un gagnant par billet (treasure_wins : day + slot). Le jeu affiche le compte à rebours jusqu'au prochain billet.
- Gagnants du jour : select slot, handle, found_at from treasure_wins where day = (now() at time zone 'Asia/Jerusalem')::date order by slot;
- Ne jamais promettre d'autres montants. Dans les textes : « 3 שטרות של 20 ₪ ביום ».

## Pollen / miel (depuis le 27.10.2026)
- Dans le jeu, en pilotant son abeille on attrape des boules de pollen → miel 🍯 (table honey : today, total). Champion du jour : select handle, today from honey where day=(now() at time zone 'Asia/Jerusalem')::date order by today desc limit 3; → à citer dans les reels/stories (« 🍯 @… a récolté N miels aujourd'hui ! »).

## Règle du post de 07:00 (depuis le 28.10.2026, idée de Shlomo)
- Chaque jour à 07:00 : un POST (image 1080×1350, 4:5) + une STORY qui rappellent les 3 billets de 20 ₪ du jour et les gagnants d'hier (« 🏆 אתמול זכו: @… »), avec la règle : « 🔒 השטר של היום גלוי רק למי שמגיב/ה על הפוסט הזה! ». Description du post avec CTA « הגיבו כאן 👇 כדי לראות את השטרות של היום ».
- Juste après la publication du post de 07:00 : `insert into public.billet_gate(day, post_id) values ((now() at time zone 'Asia/Jerusalem')::date, '<id du post publié>') on conflict (day) do update set post_id=excluded.post_id;`
- Le jeu cache alors le billet (et refuse la réclamation) à toute abeille qui n'est pas dans `billet_eligible` pour ce jour. Les passages commentaires ajoutent les commentateurs de ce post : `insert into public.billet_eligible(day, handle) values (<day du gate>, '<handle>') on conflict do nothing;` (et les créent aussi comme reines).

## Production du matin (tâche ~06:10)
0. D'abord le post + la story de 07:00 (règle du billet ci-dessus), programmés à 07:00 avec une tâche qui publie puis remplit billet_gate.
1. Données : bees (count, reines, nouveaux depuis hier avec created_at), treasure_wins d'hier, commentaires du dernier reel avec like_count (champ `from` pour le username).
2. Événement du jour = commentaire le plus liké sous le reel d'hier (hors compte du jeu). S'il est réalisable et sans risque (pas de contenu choquant/haineux, pas de données perso) → le réaliser dans le jeu. Sinon le suivant. Si rien : inventer un événement fou mais simple (abeille géante, pluie de miel, effet visuel spectaculaire — ne jamais promettre d'argent en plus des 3×20 ₪/jour).
3. Modifier `index.html` (le jeu) pour l'événement, tester avec Playwright (pas d'erreur, boucle OK, InstancedMesh setColorAt(0)), commit + push. Ajouter une actualité : `insert into public.news(title, body) values (...)`.
4. Reel « יום N » (N = jours depuis DAY_START 2026-10-27, +1) : écrire le texte voix (hébreu, ~20–25 s), générer la voix, repérer les pauses (ffmpeg silencedetect), écrire `tools/hooks/jourN.js` (chorégraphie caméra + textes, voir jour1.js), capturer avec `tools/capture_reel.py` (installer d'abord `npm i three@0.128.0 @fontsource/heebo` dans <SP>/three3 ; env GAME=index.html BEES=<json bees réels> HOOK=… OUT=<dossier frames> ; vérifier quelques images avant le rendu complet), musique `tools/musique_fond.py` (adapter durée/tempo), montage ffmpeg 1080×1920 30 fps (H.264 -preset veryfast -crf 20, AAC).
5. Stories du jour (JPEG 1080×1920, style de la ruche : fond miel sombre, Heebo 900, blanc + mots clés #FFC24B, « הקישור בביו 🔗 ») : 09:00 billets du jour (« 3 שטרות של 20 ₪ היום! רק מי שהגיב על הפוסט של הבוקר רואה אותם »), 13:00 nouveauté/événement du jour + nouveaux joueurs, 17:00 question « מה יקרה מחר בכוורת? 🤔 כתבו בתגובות לרילס ».
6. Pousser les médias dans `media/` (noms datés, ex. media/2026-10-28/reel.mp4). URL à donner à Instagram : https://raw.githubusercontent.com/chlomo111-bit/hakaveret/main/media/... (disponible tout de suite, fiable). Si Instagram refuse une vidéo depuis raw, essayer https://hakaveret.online/media/... (GitHub Pages, parfois plusieurs minutes de retard).
7. Programmer la publication avec create_trigger (run_once_at, initiation own_followup, notifications {}) : stories 09:00 / 13:00 / 17:00 (si l'heure est passée, publier tout de suite) et reel 19:30 Israël (+ commentaire CTA). Chaque tâche : créer le conteneur (media_type STORIES ou REELS, share_to_feed true), publier une seule fois (vérifier avant tout nouvel essai qu'il n'est pas déjà publié).

## Soir (tâche ~21:15)
- Lire les gagnants du jour (requête ci-dessus) après le 3e billet. Story résultat : liste des gagnants « 🏆 היום זכו: @… @… » ; billets non trouvés → « 😱 שטר אחד לא נמצא… מחר 3 שטרות חדשים ». Publier directement. (La tâche du soir doit tourner APRÈS l'ouverture du 3e billet : si le 3e billet n'est pas encore trouvé, le dire.)

## Palier 50 abeilles : « כוורת הזהב » (demande de Shlomo, 27.10.2026)
- Dans le jeu (index.html, bloc ÉVÉNEMENT 50 ABEILLES) : dès 50 abeilles, chaque joueur voit une fois l'événement (alarme rouge → מלכת־העל géante → les abeilles forment « 50 » → explosion d'or) puis la ruche reste dorée avec pluie d'or et la Super-Reine qui tourne. hakaveret.online/#ev50 le rejoue (aperçu / capture reel).
- Avant 50 : le compteur affiche « 50 🤯 » et un toast tease « ב־50 דבורים יקרה בכוורת משהו מטורף… ». À utiliser dans les stories/reels pour pousser le parrainage.
- Le jour où bees >= 50 : reel spécial capturé avec #ev50 (vrais @ de la table bees) + story « 🤯 50 דבורים! הכוורת הפכה לכוורת הזהב ».
- PALIER ATTEINT le 27.10 vers 15:00 (61 abeilles). Le reel « יום 1 » de 19:30 a été annulé (contenu dépassé, et déjà un reel publié ce jour-là). → Le reel du 28.10 au matin = le reel « כוורת הזהב / 50 דבורים » (capture #ev50 avec les vrais @), en racontant aussi la journée folle d'hier (Ron, billet doublé).
- ANTI-SPAM : maximum 1 reel et ~4 stories par jour. Avant toute publication, vérifier avec INSTAGRAM_GET_IG_USER_MEDIA et INSTAGRAM_GET_IG_USER_STORIES qu'un contenu identique ou très proche n'est pas déjà en ligne.

## Débrief du matin (demande de Shlomo, 27.10.2026)
- Au tout début de la production du matin, envoyer à Shlomo un débrief des 24 dernières heures (SendUserMessage + PushNotification, en français, court) :
  abonnés (INSTAGRAM_GET_USER_INFO followers_count ; repère 27.10 13:00 = 29), nouvelles abeilles et reines (bees.created_at sur 24 h ; repère 27.10 13:00 = 37 abeilles), gagnants des billets d'hier (treasure_wins), champion du miel, stories/reels publiés,
  et LE COMMENTAIRE LE PLUS LIKÉ des 24 h sur tous les médias (INSTAGRAM_GET_IG_MEDIA_COMMENTS avec fields "id,text,from,timestamp,like_count", hors hakaveret_shelanu) : citer le texte, l'auteur et le nombre de likes, + les 2 suivants.
- Indiquer l'événement retenu pour la journée (= ce commentaire s'il est réalisable). Jamais de contenu politique (visages de politiciens, partis…) : passer au suivant.
- Le reel de Ron (@ronen18, billet doublé en cadeau 40 ₪) attend la voix MP3 que Shlomo doit envoyer : ne pas le refaire sans cette voix (images déjà prêtes dans la session du 27.10).

## Profil Instagram toujours à jour (demande de Shlomo, 27.10.2026)
- Carrousel « איך משחקים? » (media/regles/, 5 slides 1080×1350) publié le 27.10.2026 : Shlomo l'épingle. Dès qu'une règle change (montants, horaires, nouvelle mécanique), regénérer les slides concernées et republier un nouveau carrousel des règles, puis envoyer à Shlomo (message court) : « épingle le nouveau carrousel » + la bio mise à jour à coller (l'API ne permet ni d'épingler, ni de modifier la bio, ni de créer des highlights).

## Règles
- Économe : une seule génération de voix, pas de rendus inutiles.
- Ne jamais toucher aux autres projets/automatisations de Shlomo.
- Jamais de doublon (abeilles, réponses, publications).
