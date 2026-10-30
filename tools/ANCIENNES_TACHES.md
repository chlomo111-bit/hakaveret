# Anciennes tâches programmées de la ruche (archivées le 30.10.2026)

Ces tâches ont été désactivées par la direction des jeux le 30.10 à 10:46, puis supprimées.
Tout passe maintenant par le chat « Automatisation – הכוורת שלנו » et ses réveils send_later (voir AUTOMATISATIONS.md).
Texte complet ci-dessous, pour référence.

---

## trig_01B5kBRozohtC74Q9A5QUHvs — « Ruche – commentaires → reines »
Planning : `CRON_TZ=Asia/Jerusalem 57 7,13,18 * * 0-4`

```
Passage automatique du jeu « הכוורת שלנו » (hakaveret.online) — Instagram @hakaveret_shelanu → base Supabase. Objectif de Shlomo : un maximum d'abonnés, de commentaires et d'interactions, et faire percer les reels → on répond à TOUS les commentaires. Travaille via les outils Composio (charge-les avec ToolSearch : COMPOSIO_MULTI_EXECUTE_TOOL, COMPOSIO_REMOTE_WORKBENCH ; session Composio quelconque). Sois économe : si rien de nouveau, termine tout de suite (mais fais TOUJOURS l'étape 3bis).

RÈGLES ABSOLUES
- Utilise UNIQUEMENT le compte Instagram Composio account="instagram_recoup-katar" (username hakaveret_shelanu). Avant tout, vérifie avec INSTAGRAM_GET_USER_INFO (ig_user_id "me") que username = hakaveret_shelanu ; sinon ARRÊTE et préviens Shlomo. Jamais instagram_unhave-raband (= @chlomo_assouline) ni le compte par défaut ; n'utilise PAS proxy_execute pour Instagram.
- Supabase : account="supabase_restow-lise", outil SUPABASE_BETA_RUN_SQL_QUERY, ref "ohvmnaymozoxfirkbntt".
- Jamais de doublon : ni abeille en double, ni double réponse au même commentaire. Ne supprime rien, ne modifie aucune autre table que celles listées.
- Aucun DM, like, ni autre action que ce qui est décrit.

ÉTAPES
1. INSTAGRAM_GET_IG_USER_MEDIA (ig_user_id "39647208548257780", limit 25, fields "id,timestamp,comments_count,caption").
2. Pour chaque média avec comments_count > 0 : INSTAGRAM_GET_IG_MEDIA_COMMENTS (ig_media_id, limit 100, fields "id,text,from,timestamp,replies{username,text}"). Le nom du commentateur est from.username. Ignore les commentaires de hakaveret_shelanu.
3bis. TIRAGE — RÈGLE « COMMENTAIRE DU JOUR » (obligatoire à chaque passage, même pour les commentaires déjà traités) : pour CHAQUE commentaire d'un joueur dont la date, en heure d'Israël (Asia/Jerusalem), est aujourd'hui : insert into public.daily_commenters(day, username, post_id) values ('<date du commentaire en heure d'Israël>', lower('<username>'), '<media_id>') on conflict do nothing; (sans ça le joueur n'entre pas dans le tirage de 20:00).
3. Lis select comment_id from public.ig_seen_comments; et ne garde que les NOUVEAUX comment_id. Pour chacun (handle = lower(from.username), uniquement si handle ~ '^[a-z0-9._]{1,30}$') :
   a. insert into public.bees(handle, is_queen) values ('<handle>', true) on conflict (handle) do update set is_queen = true;
   b. TAG D'AMIS : pour chaque @mention (m = lower, sans @, valide, ≠ hakaveret_shelanu, ≠ handle) : with n as (insert into public.bees(handle, referred_by) values ('<m>','<handle>') on conflict (handle) do nothing returning handle) update public.bees set refs = refs + 1 where handle='<handle>' and exists(select 1 from n); — mentionne l'ami dans la réponse s'il est nouveau (1 ami = chapeau 🎩, 3 = abeille dorée ✨). (Ne mets pas cette requête dans la même instruction SQL qu'une autre écriture sur la même ligne de bees.)
   c. ANIMAL 24 H : חתול/cat→cat, כלב/כלבלב/dog→dog, אריה/lion→lion, צפרדע/frog→frog, פנדה/panda→panda, חזיר/pig→pig, חד קרן/חד־קרן/unicorn→unicorn, ארנב/ארנבת/bunny→bunny (et 🐱🐶🦁🐸🐼🐷🦄🐰) : update public.bees set style = coalesce(style,'{}'::jsonb) || jsonb_build_object('animal','<clé>','animal_until','<date du commentaire (heure d'Israël) + 1 jour>') where handle='<handle>';
   d. Réponds à CHAQUE nouveau commentaire (INSTAGRAM_POST_IG_COMMENT_REPLIES), puis insert into public.ig_seen_comments(comment_id, handle) values ('<id>','<handle>') on conflict do nothing; (si la réponse échoue, ne l'insère pas).
      STYLE : jamais de copier-coller ; TOUJOURS en hébreu ; 1 phrase chaleureuse/drôle qui réagit au commentaire ; souvent une relance (« תייגו חבר », « 200 אבקות + תגובה על הפוסט של היום = כרטיס להגרלה », « שתפו בסטורי + תייגו אותנו = +1000 אבקות »). Si le commentaire est sur le post du jour, tu peux confirmer « ✅ אתם ברשימה של ההגרלה (עם 200 אבקות) ». Pas d'URL : « הקישור בביו 🔗 ». Le vendredi après-midi et le samedi : le tirage du vendredi a lieu samedi 18:30 (במוצאי שבת), celui du samedi à 20:00.
4. BONUS STORY (+1000 pollens, 1×/jour) : INSTAGRAM_LIST_ALL_CONVERSATIONS (limit 20, fields "id,updated_time,participants") ; pour chaque conversation mise à jour dans les dernières 24 h : INSTAGRAM_GET_CONVERSATION ; chaque message reçu d'un joueur (from ≠ hakaveret_shelanu) SANS texte (= mention/partage de story) daté d'aujourd'hui (heure d'Israël) → select public.award_story_bonus('<username>'); (renvoie already=true s'il l'a déjà eu aujourd'hui). Ne pas envoyer de DM.
5. Fin : ne rien envoyer à Shlomo sauf problème grave — message court en français.
```

## trig_01UMNVrorvVo84G2eQ1cHANa — « Ruche – production du jour (quotidien) »
Planning : `CRON_TZ=Asia/Jerusalem 11 6 * * 0-5`

```
Tu gères en autonomie complète le jeu Instagram « הכוורת שלנו » (@hakaveret_shelanu, hakaveret.online) pour Shlomo. Il a donné son accord pour tout publier, modifier le jeu, créer/modifier les automatisations et programmations SANS lui demander. Production du matin.
1. Dépôt GitHub chlomo111-bit/hakaveret (sinon add_repo owner "chlomo111-bit", repo "hakaveret", access "push", puis clone). Lis tools/ROUTINE.md EN ENTIER et applique-le (autonomie, règle Instagram obligatoire, croissance, tirage au sort 20:00 en direct, méthode vidéo validée, paliers, événements du jour). Outils : Composio (Instagram account instagram_recoup-katar UNIQUEMENT — vérifier username hakaveret_shelanu avant chaque publication —, Supabase account supabase_restow-lise), create_trigger / send_later pour programmer.
2. En premier : débrief très court à Shlomo en français (SendUserMessage) : abonnés, nouvelles abeilles, gagnant du tirage d'hier (à payer 20 ₪ s'il ne l'a pas fait), commentaire le plus liké.
3. 07:00 : post 4:5 + story avec un vrai hook (événement du jour, tirage 20:00 en direct, 200 pollens = ticket, tag d'ami). Programme dans la journée au moins 2 stories utiles avec des chiffres réels (ex. 12:30 course aux 200, 19:00 « שעה להגרלה בשידור חי »).
4. Vidéo du jour : choisis l'heure de mise en ligne, écris le texte (hébreu, balises ElevenLabs v3, ~25 s) et programme (send_later) son envoi à Shlomo 2 à 3 heures AVANT cette heure — c'est la SEULE chose qu'on lui demande (la voix Juniper). Quand le MP3 arrive : méthode vidéo validée (transcription mot à mot + musique rythmée), puis publication à l'heure prévue. Si la vidéo raconte le tirage, ne la monter/publier qu'APRÈS le tirage.
5. Ne préviens Shlomo ensuite qu'en cas de problème grave.
```
(Dernier lancement 30.10 06:11 resté « en attente » : le post de 07:00 du 30.10 n'est pas parti, publié à la main vers 10:45.)

## trig_01WSeUeThqhm1iSfbS6vyg3F — « Ruche – tirage au sort 20:00 »
Planning : `CRON_TZ=Asia/Jerusalem 1 20 * * 0-4,6`

```
Tirage au sort quotidien du jeu « הכוורת שלנו » (@hakaveret_shelanu, hakaveret.online). Shlomo a autorisé la publication sans confirmation. Réponds en français à Shlomo ; textes Instagram TOUJOURS en hébreu.
Outils Composio (charge via ToolSearch COMPOSIO_MULTI_EXECUTE_TOOL). Supabase : account "supabase_restow-lise", SUPABASE_BETA_RUN_SQL_QUERY, ref "ohvmnaymozoxfirkbntt". Instagram : account "instagram_recoup-katar" UNIQUEMENT (ig_user_id 39647208548257780) — vérifie d'abord que username = hakaveret_shelanu, sinon ARRÊTE.
Règle (depuis le 29.10) : 200 pollens récoltés aujourd'hui = 1 ticket ; un seul gagnant tiré au sort, 20 ₪.
1. SQL : select public.run_lottery((now() at time zone 'Asia/Jerusalem')::date); → {winner, entrants} (si "already": true, le tirage est déjà fait : ne republie rien, arrête).
2. Crée une story JPEG 1080×1920, style de la ruche (fond brun-doré #1A1108 → miel, police Heebo très grasse — npm i @fontsource/heebo puis rendu HTML avec Playwright, déjà installé —, texte blanc + mots clés #FFC24B, pastille jaune en haut « 🎟️ ההגרלה של הערב »).
   - S'il y a un gagnant : « 🎉 הזוכה של הערב: @<winner> » + « 20 ₪ 💸 » + « <entrants> משתתפים · מחר עוד הגרלה ב־20:00 » + « אספו 200 אבקות 🌼 · הקישור בביו ».
   - Sinon : « אף אחד לא הגיע ל־200 אבקות… 😱 » + « מחר ההגרלה ב־20:00 · מי יהיה הראשון? 🌼 ».
   Pousse l'image dans le dépôt GitHub chlomo111-bit/hakaveret (add_repo owner "chlomo111-bit", repo "hakaveret", access "push", puis clone ; git pull --rebase avant push ; ne touche à aucun autre fichier) sous media/<AAAA-MM-JJ>/story_tirage.jpg, puis publie-la : INSTAGRAM_POST_IG_USER_MEDIA (media_type STORIES, image_url https://raw.githubusercontent.com/chlomo111-bit/hakaveret/main/media/<date>/story_tirage.jpg) → INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH. Une seule publication (vérifie INSTAGRAM_GET_IG_USER_STORIES avant).
3. Envoie à Shlomo un message court (SendUserMessage + PushNotification) : gagnant @…, nombre de participants, « 20 ₪ à envoyer par Bit ». S'il n'y a pas de gagnant, dis-le en une ligne.
```

## trig_01BJvLmFrUjUgN7hkaJE8w9v — « Ruche – story résultat billet (mer.–jeu.) »
Planning : `CRON_TZ=Asia/Jerusalem 14 22 28 10 *` (ancien système des 3 billets, obsolète depuis le 29.10)

```
Tu gères en autonomie complète le jeu Instagram « הכוורת שלנו » (@hakaveret_shelanu). Shlomo a autorisé les publications sans confirmation.
1. Assure-toi d'avoir le dépôt GitHub chlomo111-bit/hakaveret (sinon add_repo owner "chlomo111-bit", repo "hakaveret", access "push", puis clone).
2. Suis tools/ROUTINE.md, section « Soir » : lis le gagnant du billet du jour dans Supabase (account supabase_restow-lise), crée la story résultat (JPEG 1080×1920, style de la ruche), pousse-la dans media/<date>/, attends le déploiement, puis publie-la tout de suite sur Instagram via Composio account instagram_recoup-katar UNIQUEMENT (media_type STORIES, une seule publication).
Ne préviens Shlomo qu'en cas de problème grave (message court en français).
```

## trig_01EnF8Eg1eiy8EHN77iGSr8o — « Ruche – reel « יום 1 » 19:30 » (ponctuel 27.10, annulé)

```
Publie UN reel Instagram sur le compte @hakaveret_shelanu UNIQUEMENT (Shlomo a autorisé). Outils Composio (charge via ToolSearch : COMPOSIO_SEARCH_TOOLS, COMPOSIO_GET_TOOL_SCHEMAS, COMPOSIO_MULTI_EXECUTE_TOOL). Compte Composio : account="instagram_recoup-katar" (jamais un autre), ig_user_id "39647208548257780".

1. INSTAGRAM_POST_IG_USER_MEDIA : ig_user_id "39647208548257780", video_url "https://hakaveret.online/media/reel_jour1.mp4" (si refusé : "https://raw.githubusercontent.com/chlomo111-bit/hakaveret/main/media/reel_jour1.mp4"), media_type "REELS", share_to_feed true, caption = exactement le texte entre les lignes ===== ci-dessous (garde les sauts de ligne, emojis et hashtags tels quels).
2. INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH avec ce creation_id, max_wait_seconds 300. Ne publie jamais deux fois : si le publish renvoie une erreur ambiguë, vérifie d'abord avec INSTAGRAM_GET_IG_USER_MEDIA (limit 3) si un reel avec ce texte vient d'être publié avant de réessayer.
3. Une fois publié : poste UN commentaire de premier niveau sur ce reel (cherche l'outil Composio pour commenter un média Instagram) avec exactement : כתבו "דבורה" ותוך כמה שעות הדבורה שלכם בכוורת 🐝
4. Ne fais rien d'autre. Ne préviens l'utilisateur qu'en cas d'échec (message court en français), sinon rien.

=====
🐝 יום 1 בכוורת 👑
בשבע בבוקר הגיעה תגובה מ־@rvm9664… ועכשיו יש לכוורת מלכה חדשה 👑
התגובה של @amazing_place_5 הייתה מילה אחת: "כוורת". זה הספיק לכתר 😅
ומלאך ענק עם הילה מסתובב מעל כולם… מי זה? 😇
והבוקר @cori_cohen מצאה את השטר הראשון 🏆
ומהיום: 3 שטרות של 20 ₪ מסתתרים בכוורת כל יום, בשעות מפתיעות 💸

רוצים דבורה עם השם שלכם? כתבו "דבורה" 👇
🔗 הקישור בביו
ומה יקרה מחר? התגובה עם הכי הרבה לייקים קובעת 👇
המבצע אינו קשור לאינסטגרם ואינו ממומן על ידה.
#הכוורת_שלנו #משחק #דבורים #זכייה #ישראל
=====
```

## trig_01TpjowVSn3WC5cp2K7tu8yF — « Ruche – passage commentaires avant le tirage de samedi 20:00 » (ponctuel 31.10 19:40, créé le 30.10 puis désactivé)

```
Samedi soir, jeu « הכוורת שלנו » : avant le tirage de 20:00, il faut un passage commentaires pour enregistrer les joueurs qui ont commenté (règle « commentaire du jour »). Ta seule tâche : déclencher maintenant avec fire_trigger (outils Claude_Code_Remote) la tâche programmée existante trig_01B5kBRozohtC74Q9A5QUHvs (Ruche – commentaires → reines), sans rien modifier d'autre. Termine par une ligne. Ne préviens Shlomo qu'en cas d'échec.
```
