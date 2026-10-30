# Routine quotidienne autonome — הכוורת שלנו (@hakaveret_shelanu)

## ⭐ RÈGLES OBLIGATOIRES POUR TOUS LES JEUX (Shlomo, 30.10.2026) — PRIORITAIRES sur tout ce qui suit
En cas de contradiction avec une section plus ancienne de ce fichier (billets, passages 8:52/11:52…, post de 07:00 « billet », soir 21:15…), CES RÈGLES l'emportent.
1. VIDÉO DU JOUR : chaque jour un reel qui raconte ce qui s'est passé dans le jeu (vrais joueurs tagués, vrais chiffres) et se termine par « מה יקרה מחר? התגובה עם הכי הרבה לייקים קובעת ». AVANT d'écrire la vidéo : lire TOUS les commentaires du post/reel précédent ; le commentaire valable le plus liké décide de ce qui arrive. Texte écrit pour la voix (hébreu, balises Eleven v3) envoyé à Shlomo 2–3 h avant la mise en ligne (SendUserMessage + PushNotification) : SEULE chose qu'on lui demande. Couverture dédiée (jamais une image noire).
2. CHAQUE JOUR QUELQUE CHOSE D'EXTRAORDINAIRE dans le jeu (événement fou, surprise, nouveauté visible), idéalement tiré des commentaires / de la boîte à idées, raconté dans la vidéo.
3. LOTERIE 20 ₪ CHAQUE SOIR À 20:00 (1 gagnant, payé par Shlomo par Bit). 2 conditions : (a) commenter le POST DU JOUR, (b) 200 pollens récoltés dans la journée. AUCUNE condition d'abonnement (ne jamais écrire « עקבו » comme condition). Le POST DU JOUR est créé CHAQUE MATIN par la production (4:5, hook + rappel des 2 conditions + « הגיבו כאן »), à épingler (l'API ne permet pas d'épingler → demander à Shlomo seulement si c'est utile) ; ne jamais l'oublier. Tirage en direct dans le jeu à 20:00 (lottery_live), story du résultat, message à Shlomo (gagnant + « 20 ₪ à payer par Bit »).
3 bis. PRIX « המגיב של היום » (meilleur commentateur) — en ligne depuis le 30.10 (SQL : tools/sql_meilleur_commentateur.sql, déjà appliqué) :
   - Chaque passage journalise TOUS les commentaires de joueurs du jour sur TOUS les posts : `select public.log_comment('<comment_id>','<username>','<media_id>','<timestamp ISO>','<texte>');` (idempotent ; un texte identique répété le même jour = invalide/spam ; table comment_log).
   - Classement : `select * from public.top_commenters(<jour>);` (égalité = celui qui a atteint ce nombre en premier).
   - 20:00 : `select public.award_top_commenter(<jour>);` (une fois/jour, table top_commenter_awards). Le jeu le fait aussi tout seul à 20:00 (commenter_state) : couronne 3D + étiquette violette « 💬👑 המגיב של היום » sur son abeille jusqu'au lendemain soir, bloc « פרס המגיב של היום » dans la fiche.
   - Annonce dans la story du résultat + réponse à l'un de ses commentaires : « מה יקרה מחר בזכותך? ». Il répond (commentaire sous le post du jour suivant ou réponse) AVANT 12:00 le lendemain. Les passages repèrent sa réponse → `select public.set_commenter_wish(<jour de l'award>, '<souhait>', 'accepted'|'adapted'|'refused');` (refuser insultant / sexuel / visant une vraie personne / impossible → proposer une version proche, status adapted). Sans réponse à 12:00 : status 'none', rien de plus.
   - Le souhait est réalisé dans le jeu le jour même (EN PLUS de l'événement du commentaire le plus liké), puis status 'done', et raconté dans la vidéo en le taguant (« @x החליט ש… »). Pas d'argent.
4. PASSAGES : 4 par jour — 5:55*, 11:55*, 16:55* et 19:55 (*cron unique « 55 5,11,16,19 », soit 5 min avant 6:00/12:00/17:00 ; 19:55 = 5 min avant la loterie). Lire tous les nouveaux commentaires de toutes les publications récentes, répondre à chacun (hébreu, court, varié, jamais de copier-coller, pas d'URL → « הקישור בביו »), mettre à jour bees/reines/tags/animaux/bonus story, log_comment pour TOUS les commentaires du jour, repérer la réponse du meilleur commentateur de la veille (jusqu'à 12:00), enregistrer les commentateurs du post du jour (daily_commenters), relever les abonnés (game_meta.ig_followers) ; vérifier que le post du jour existe (sinon le créer). À 19:55 en plus : story « 5 דקות להגרלה! » (nombre de participants = `select count(*) from lottery_eligible(<jour>)`, meilleur commentateur du moment, rappel des 2 conditions).
5. SHABBAT : rien entre vendredi 16:00 et samedi 18:30 (Israël). Toute tâche qui se déclenche dans ce créneau s'arrête immédiatement. Loterie + couronne + vidéo du vendredi faites samedi à partir de 18:30 (loterie du vendredi d'abord, puis celle du samedi à 20:00). Le vendredi, le post du jour sort le matin et la vidéo AVANT 16:00.
6. ÉCONOMIE : passage sans nouveau commentaire ni rien à faire → fin immédiate. Tâches programmées de la ruche (une seule par fonction) : « Ruche – passages » (trig_01B5kBRozohtC74Q9A5QUHvs), « Ruche – loterie 20:00 + המגיב של היום » (trig_01WSeUeThqhm1iSfbS6vyg3F), « Ruche – production du matin » (trig_01UMNVrorvVo84G2eQ1cHANa). Ne pas en créer d'autres récurrentes ; les publications ponctuelles (send_later / run_once) restent permises.

Shlomo a donné l'autonomie complète (27.10.2026) : publier chaque jour stories + reel + nouveautés, et modifier le jeu, SANS lui demander de confirmation. Le prévenir UNIQUEMENT en cas de problème grave (connexion cassée, mauvais compte, publication impossible), par un message court en français.

## AUTONOMIE (Shlomo, 29.10 07:43)
Ne JAMAIS demander l'autorisation pour les automatisations et programmations (tâches programmées, stories, publications, modifications du jeu) : les faire directement.
SEULE chose à demander : la voix des vidéos. Envoyer le texte à Shlomo 2 à 3 heures AVANT l'heure de mise en ligne prévue de la vidéo (programmer ce rappel avec send_later si besoin) ; ensuite tout est autonome (montage, publication).

## ⚠️ RÈGLE INSTAGRAM OBLIGATOIRE (Shlomo, 28.10 21:40)
Toute action Instagram via Composio (publier, lire les commentaires, statistiques) : UNIQUEMENT account="instagram_recoup-katar" (@hakaveret_shelanu). JAMAIS instagram_unhave-raband (= @chlomo_assouline malgré son nom), JAMAIS le compte par défaut. Avant CHAQUE publication : INSTAGRAM_GET_USER_INFO / GET_IG_USER_MEDIA → username doit être exactement hakaveret_shelanu ; sinon ne rien publier et prévenir Shlomo.

## Identifiants
- Instagram (Composio) : account `instagram_recoup-katar` UNIQUEMENT (username hakaveret_shelanu), ig_user_id `39647208548257780`. Vérifier le username avant toute action ; jamais @chlomo_assouline.
- Supabase (Composio, SUPABASE_BETA_RUN_SQL_QUERY) : account `supabase_restow-lise`, ref `ohvmnaymozoxfirkbntt`.
- Site : dépôt GitHub `chlomo111-bit/hakaveret` (GitHub Pages, domaine hakaveret.online). S'il n'est pas dans la session : add_repo (owner chlomo111-bit, repo hakaveret, access push) puis git clone. Commits signés : user.name "chlomo111-bit", user.email "chlomo111-bit@users.noreply.github.com".
- Voix (changement demandé par Shlomo le 27.10 au soir : « plus dynamique et énergique ») : ElevenLabs **Liam – Energetic, Social Media Creator** (voice_id `TX3LPaxmHKxFdv7VOQHJ`), model `eleven_v3`, avec tags [excited]/[shouting]/[fast]. Ancienne voix (si Shlomo veut revenir) : James (voice_id `EkK5I93UQWFDigLMpZcX`, model `eleven_v3`, flow `aQELt3ILFku8anM2IK25`), 1 seule génération (generations_count 1). Télécharger le MP3 (content_url) avec curl. Si le téléchargement est bloqué : reel sans voix (musique + gros textes + bruitages) et le signaler à Shlomo une seule fois.

## CROISSANCE — objectif n°1 (Shlomo, 28.10 14:33) — AUTONOMIE TOTALE
Objectif : un maximum d'abonnés, de commentaires et d'interactions. Agir sans demander (Shlomo l'a dit), en gardant l'usage léger. Argument massue : « אין עוד משחק שנותן כסף כל יום — 60 ₪ ביום, 3 שטרות של 20 ₪ ».
Leviers à utiliser CHAQUE jour :
1. « תייגו חבר » (depuis le 28.10) : un ami tagué dans un commentaire = une abeille à son nom (bees.referred_by) ; le tagueur gagne +1 refs (1 = chapeau 🎩, 3 = abeille dorée ✨). Le passage commentaires le gère et répond en mentionnant l'ami (qui reçoit une notif → nouvel abonné). Le rappeler dans CHAQUE légende et dans le commentaire du post de 07:00.
2. Post de 07:00 : légende qui demande un commentaire ET un tag (« תייגו חבר שצריך 20 ₪ »).
3. Story « בעוד 10 דקות שטר חדש בכוורת » ~10 min avant chaque billet (heures dans billet_slots) : la production du matin les génère et les programme (create_trigger run_once, une par billet).
4. Story gagnant le soir en mentionnant @gagnant (il repartage → ses abonnés découvrent le jeu).
5. Reel quotidien : hook choc 1re seconde, l'événement voté « מה יקרה מחר », fin = CTA commentaire + tag.
6. Commentaire CTA sous chaque reel (« מה יקרה מחר? »), l'idée la plus likée devient l'événement du lendemain (nommer l'auteur dans le reel).
7. Réponses rapides et variées (5 passages/jour : 8:52, 11:52, 14:52, 17:52, 20:52) — toujours en hébreu, sans URL. À CHAQUE passage : enregistrer les commentateurs du post du jour dans daily_commenters (voir « RÈGLE COMMENTAIRE DU JOUR »).
8. Paliers d'abonnés/abeilles (100, 150, 200…) = événement spécial + reel (comme כוורת הזהב à 50).
9. Hashtags : 5, en hébreu, liés à l'Israël/jeu/argent (#משחק #זכייה #ישראל …), varier un peu chaque jour.
Ne jamais : acheter des abonnés, follow/unfollow en masse, DM non sollicités, giveaway trompeur (le règlement reste exact : 3×20 ₪ par jour).

## 🧩 FONCTIONS COMMUNES À TOUS LES JEUX (ordre du directeur des jeux, validé par Shlomo le 29.10 23:31) — en ligne depuis le 29.10 au soir
SQL complet : tools/sql_fonctions_communes.sql (déjà appliqué). Dans le jeu : boutons « 🎯 משימות X/3 » et « 💡 תיבת רעיונות » dans la barre du haut.
1. Monnaie unique = pollen / אבקה (table honey : today + total ; historique par jour dans honey_days, rempli automatiquement par trigger).
2. Concours 20:00 : inchangé (200 pollens + commentaire du post du jour dès le 30.10). Statut X/200 ✓/✗ affiché dans la barre, la fiche de l'abeille et la fiche « 🎯 ».
3. Missions du jour : 3 par jour (daily_missions(d) : 1 mission pollen 50/100/150 + 2 parmi login, comment, invite, evening, chat, idea), bonus 10–50 pollens crédités côté serveur par missions_state(h) (table mission_claims, une fois par mission/jour). Remise à zéro à minuit (Israël). Les missions « comment » (post du jour) et « invite » (ami tagué qui rejoint) dépendent du passage commentaires → continuer à remplir daily_commenters et bees.referred_by. Missions du jour : `select public.daily_missions((now() at time zone 'Asia/Jerusalem')::date);` → peut servir de rappel dans la story du matin (« 🎯 המשימות של היום… »).
4. Boîte à idées : table ideas (200 caractères max, 3/jour/joueur, filtre anti-insultes/liens/téléphones). Colonne `reviewed`.
5. Chat public en direct (realtime sur messages) : 140 caractères, 1 message / 10 s, filtre serveur mod_check (insultes, contenu sexuel, liens, téléphones, e-mails), bouton 🚩 (report_message), masquage auto à 3 signalements (messages.hidden), suppression depuis l'admin (feuille ניהול → « 🚩 הודעות מדווחות », ou 🗑 dans le chat après mot de passe). AUCUN message privé entre joueurs (jeu ouvert aux jeunes) : ne jamais en ajouter.
6. Statistiques : player_stats(h) (fiche « הסטטיסטיקות שלי ») et global_stats() (joueurs, abonnés, pollen du jour, participants au tirage). Les abonnés viennent de game_meta.ig_followers.
7. Classements : leaderboard(h) → top 10 du jour et général (pollen total) + place du joueur même hors top 10 (onglet 🏆 du panneau).

### Étapes ajoutées à la routine du MATIN (production ~06:10), après le débrief
a. Abonnés : INSTAGRAM_GET_USER_INFO (ig_user_id 39647208548257780, fields username,followers_count, account instagram_recoup-katar) → `insert into public.game_meta(key,value,updated_at) values ('ig_followers','<N>',now()) on conflict (key) do update set value=excluded.value, updated_at=now();` (sert aux stats globales du jeu).
b. 💡 Idées : `select id, handle, body, likes, created_at from public.ideas where not reviewed order by likes desc, id;` → s'il y a de BONNES idées (réalisables, utiles, sans risque), les résumer à Shlomo en UNE seule ligne en français dans le débrief (« 💡 Idées : @x propose …, @y … »). Sinon ne rien dire. Puis `update public.ideas set reviewed = true where not reviewed;`. Une idée retenue peut devenir l'événement du jour (citer l'auteur).
c. 🚩 Modération : `select public.admin_reported(<mot de passe admin si connu>)` ou directement `select id, handle, body, reports, hidden from public.messages where reports > 0 order by id desc limit 20;` → supprimer les messages clairement inacceptables (`delete from public.messages where id = …`). Si un même joueur abuse plusieurs fois : prévenir Shlomo en une phrase.
d. Communication : rappeler de temps en temps (pas tous les jours) dans une story « 🎯 3 משימות חדשות כל יום = בונוס אבקה » et « 💬 צ'אט חי בכוורת ».

## 🎉 29.10 : PALIER 100 ABEILLES ATTEINT (nuit du 28 au 29.10, @aviv_ben_shlush = la 100e)
- Événement fou du palier (décidé le 29.10 04:30) : « הכוורת ממריאה לחלל 🚀 » — dans le jeu (#ev100) : alarme, compte à rebours 3-2-1, décollage, les abeilles forment « 100 », la ruche reste dans l'espace (violet/étoiles). Lien avec le commentaire « טיל » de @rahelassouline → « ביקשתם טיל ». BONUS : pollen ×2 toute la journée du 29.10 (plus facile d'atteindre 200 pour le tirage).
- 29.10 : post 100 abeilles PUBLIÉ à 07:43 (https://www.instagram.com/p/DfESH-olaR7/, id 18051801353815835, + commentaire d'appel animal) + story 07:00 publiée (media/2026-10-29/post_0700.jpg, story_0700.jpg). Reel tirage programmé à 08:30 (tâche trig_014oviy5gM2EkGN7jva3pxu6). Ne pas republier.
- À annoncer dans le post/story de 07:00 (« 💯 100 דבורים! הכוורת עפה לחלל 🚀 · היום אבקה ×2 ») et dans la légende du reel de 08:30. Prochain palier : 150.

## 📸 BONUS STORY +1000 (Shlomo, 29.10 13:15)
- Un joueur qui partage en story en taguant @hakaveret_shelanu reçoit +1000 pollens, UNE fois par jour : SQL `select public.award_story_bonus('<handle>')` (table story_bonus ; renvoie already=true si déjà reçu aujourd'hui). Affiché dans le jeu (fiche de son abeille).
- Détection : l'API ne donne pas le contenu des mentions de story, elles arrivent comme des messages privés SANS texte. À chaque passage commentaires : lister les conversations mises à jour depuis le dernier passage ; pour chaque message reçu d'un joueur, sans texte, de moins de 24 h → award_story_bonus (pas de DM : l'API refuse l'envoi, erreur 2534022 ; le joueur voit les pollens dans le jeu). Si Shlomo signale une story à la main → créditer aussi.
- À rappeler dans les légendes et les stories : « שתפו בסטורי + תייגו אותנו = +1000 אבקות 🌼 ».

## TIRAGE AU SORT 20:00 (décision de Shlomo, 28.10 soir) — REMPLACE LES 3 BILLETS dès le 29.10
- Fini les 3 billets (ensure_slots ne crée plus rien à partir du 29.10). Nouvelle règle : 200 pollens récoltés dans la journée = 1 ticket ; chaque soir à 20:00, UN gagnant tiré au sort parmi les tickets du jour gagne 20 ₪.
- Depuis le 30.10 : il faut AUSSI avoir commenté le post du jour (voir « RÈGLE COMMENTAIRE DU JOUR » ci-dessus).
- Seuil 200 choisi d'après le record du 28.10 (140, @yakov_malka4193), arrondi au-dessus.
- DB : honey(today, day) ; lottery_state(h) (pour le jeu) ; run_lottery(d) (tirage, une seule fois par jour, table lottery_draws).
- TIRAGE EN DIRECT (29.10) : à 20:00 pile, chaque joueur dans le jeu voit le show « 🔴 LIVE » (roulette des participants → révélation du gagnant + caméra sur son abeille). Le premier client à 20:00 déclenche le tirage via lottery_live() (une seule fois/jour). La tâche de 20:01 ne fait que lire le résultat. Annonce « 🔴 שידור חי ב־20:00 » dans les stories. Contenu : le lendemain, recréer le show en capture (hook avec LIVE_CLOCK) avec le VRAI gagnant pour le reel récap — seulement APRÈS le tirage (règle de Shlomo).
- Tâche programmée 20:01 : run_lottery(aujourd'hui) → story gagnant (mentionner @gagnant) + message à Shlomo (gagnant à payer). 0 ticket → story « אף אחד לא הגיע ל־200… מחר? ».
- Annonce : reel « נגמר הקל » (media/2026-10-29/reel_tirage.mp4, voix Juniper de Shlomo) + post/story de 07:00 du 29.10.
- Le post de 07:00 garde la question animal 24 h + tag d'ami (plus de billet_gate nécessaire pour le tirage).

## 💬 RÈGLE « COMMENTAIRE DU JOUR » POUR LE TIRAGE (Shlomo, 29.10 — en vigueur dès le 30.10)
- Pour participer au tirage de 20:00 il faut, LE MÊME JOUR : 200 pollens ET un commentaire sur le « post du jour » de @hakaveret_shelanu. Sans commentaire = pas de tirage, même avec 200 pollens. (Le tirage du 29.10 reste à l'ancienne règle.)
- « Post du jour » = le dernier post publié ce jour-là (heure d'Israël) sur le compte (post ou reel du feed). Le commentaire compte jusqu'à minuit (en pratique : avant le tirage de 20:00).
- DB : table `daily_commenters(day, username, post_id)` ; `lottery_eligible(d)` = honey.today ≥ 200 ET présent dans daily_commenters (à partir du 30.10) ; run_lottery / lottery_live / lottery_state l'utilisent (lottery_state renvoie aussi `comment_rule` et `commented` → le jeu affiche à chaque joueur 200 אבקות ✓/✗ et תגובה ✓/✗).
- ÉTAPE OBLIGATOIRE À CHAQUE PASSAGE COMMENTAIRES (8:52, 11:52, 14:52, 17:52, 20:52). ⚠️ Le dernier passage AVANT le tirage est celui de 17:52 : les commentaires postés entre ~18:00 et 20:00 ne sont pas enregistrés à temps (le jeu dit « תגיבו מוקדם »). Une tâche légère à 19:47 (enregistrement seul, sans réponse) comblerait ce trou : sa création a été refusée par les permissions le 29.10, à proposer à Shlomo :
  1. INSTAGRAM_GET_IG_USER_MEDIA (fields id,timestamp,caption, limit 5) → post du jour = le plus récent dont la date (Asia/Jerusalem) = aujourd'hui. S'il n'y en a pas encore aujourd'hui : rien à enregistrer.
  2. INSTAGRAM_GET_IG_MEDIA_COMMENTS sur ce post (fields id,text,from,timestamp ; toutes les pages) → pour chaque commentaire d'un joueur (≠ hakaveret_shelanu) daté d'aujourd'hui (Israël) :
     `insert into public.daily_commenters(day, username, post_id) values ((now() at time zone 'Asia/Jerusalem')::date, lower('<username>'), '<media_id>') on conflict do nothing;`
     (on enregistre TOUS les commentateurs, même ceux déjà dans ig_seen_comments — ig_seen_comments ne sert qu'à ne pas répondre deux fois.)
  3. Si un nouveau post est publié dans la journée, les commentateurs déjà enregistrés du post précédent restent valables (la table ne fait qu'ajouter).
- Communication : le rappeler dans le post/story de 07:00, les stories du jour et la story 19:00 (« 🎟️ 200 אבקות + תגובה על הפוסט של היום = כרטיס להגרלה »). Dans les réponses aux commentaires du post du jour, on peut confirmer « ✅ אתם ברשימה של ההגרלה (אם תגיעו ל־200 אבקות) ».
- 30.10 07:00 (production du matin) : le post et la story de 07:00 DOIVENT annoncer la nouvelle règle : « 🆕 מהיום: כדי להיכנס להגרלה של 20:00 צריך 200 אבקות + תגובה על הפוסט הזה 💬 » ; légende avec CTA « הגיבו כאן 👇 = כרטיס להגרלה של הערב (עם 200 אבקות) + תייגו חבר ». Ensuite, chaque jour, rappeler la règle dans le post de 07:00 (plus court).

## 29.10 : « חיה ל־24 שעות » (idée de Shlomo, 28.10)
- Story teaser publiée le 28.10 ~20:30 (media/2026-10-28/story_animal.jpg).
- Post de 07:00 du 29.10 : question « איזו חיה הייתם רוצים להיות ל־24 שעות? 🐱🐶🦁🐸🐼🐷🦄🐰 כתבו חיה + תייגו חבר → הדבורה שלכם הופכת לחיה! ». Ce post reste le post billet (billet_gate).
- Le passage commentaires transforme la dabora : animaux supportés par le jeu = cat חתול, dog כלב, lion אריה, frog צפרדע, panda פנדה, pig חזיר, unicorn חד־קרן/חד קרן, bunny ארנב/ארנבת. SQL : update bees set style = coalesce(style,'{}'::jsonb) || jsonb_build_object('animal','<clé>','animal_until','<date du commentaire + 1 jour>') where handle='<handle>';
- Reel du 29.10 : montrer la ruche remplie d'animaux (vraies abeilles transformées) = l'événement fou du jour.

## NOUVELLE MÉTHODE VIDÉO (Shlomo, 28.10 08:45) — OBLIGATOIRE
- MISE EN PAGE des posts/stories (bug du 29.10 : cadres coupés à droite, bande noire à gauche) : utiliser tools/post_template.py (flex centré, box-sizing:border-box, padding 70px, width 100%) et TOUJOURS regarder l'image (Read) avant de publier.
- MÉTHODE VALIDÉE « top incroyable » (Shlomo, 28.10, reel_tirage) : 1) pousser le MP3 de Shlomo dans le dépôt, 2) ElevenLabs creative_attach_reference_file (URL raw.githubusercontent) + creative_transcribe_audio (eleven_scribe_v1) → minutage exact de chaque mot, 3) caler chaque texte/plan sur ces temps (modèle : tools/hooks/tirage.js), 4) musique dramatique rythmée synthétisée avec impacts sur les mots clés (modèle : tools/music_tirage.py), ducking sous la voix (sidechaincompress). Ne JAMAIS caler « à l'estimation ».
1. D'abord écrire les PAROLES (texte voix hébreu, avec tags ElevenLabs v3 [excited] etc., + tableau moment/image/voix, durée visée) et les ENVOYER à Shlomo.
2. Shlomo génère la voix lui-même (voix Juniper) et envoie le MP3.
3. Ensuite seulement : créer la vidéo calée sur SA voix (silencedetect pour les pauses), puis publier. Ne jamais générer la voix soi-même ni monter la vidéo avant d'avoir son MP3.

## Objectif éditorial (le plus important)
- RÈGLE N°1 de Shlomo (27.10.2026) : carte blanche, MAIS jamais de spam et toujours du contenu de qualité, comme un professionnel. Moins mais mieux : 1 reel/jour max, ~4 stories/jour max, pas de contenu dépassé (chiffres et joueurs à jour), pas de doublon. Dans le doute, ne pas publier.
- CHOQUER : chaque reel commence par un hook fou dans la 1re seconde (« יש משחק שמחלק כסף אמיתי… », « מישהו לקח 20 ₪ תוך 3 דקות », « דבורה ענקית פלשה לכוורת הלילה 😱 »…). Il se passe chaque jour un truc dingue dans la ruche, annoncé au début (« חכו לסוף 😱 ») et révélé à la fin.
- Vidéos dynamiques et énergiques : plans de 1–2 s, zooms rapides, secousses de caméra, flashs, textes qui claquent, musique rythmée, whoosh/boom sur les coupes. Voix James plus rapide/excitée (tags v3 comme [excited], [shouting]). 20–30 s max.
- Toujours les vrais joueurs (vrais @ de la table bees), jamais de chiffres inventés.
- Description = mini-histoire du jour avec les joueurs tagués (@), titre « 🐝 יום N בכוורת », CTA « כתבו "דבורה" 👇 », « 🔗 הקישור בביו », « ומה יקרה מחר? התגובה עם הכי הרבה לייקים קובעת 👇 », « המבצע אינו קשור לאינסטגרם ואינו ממומן על ידה. », 5 hashtags (#הכוורת_שלנו #משחק #דבורים #זכייה #ישראל). Après publication : poster un commentaire CTA (Shlomo l'épingle).

## Billets (depuis le 27.10.2026 10:45, règle de Shlomo) — UN SEUL billet par personne et par jour (depuis le 28.10 16:25)
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
1. Données : bees (count, reines, nouveaux depuis hier avec created_at), lottery_draws d'hier, + étapes « FONCTIONS COMMUNES » (abonnés → game_meta, idées, modération), commentaires du dernier reel avec like_count (champ `from` pour le username).
2. Événement du jour = commentaire le plus liké sous le reel d'hier (hors compte du jeu). S'il est réalisable et sans risque (pas de contenu choquant/haineux, pas de données perso) → le réaliser dans le jeu. Sinon le suivant. Si rien : inventer un événement fou mais simple (abeille géante, pluie de miel, effet visuel spectaculaire — ne jamais promettre d'argent en plus des 3×20 ₪/jour).
3. Modifier `index.html` (le jeu) pour l'événement, tester avec Playwright (pas d'erreur, boucle OK, InstancedMesh setColorAt(0)), commit + push. Ajouter une actualité : `insert into public.news(title, body) values (...)`.
4. Reel « יום N » (N = jours depuis DAY_START 2026-10-27, +1) : écrire le texte voix (hébreu, ~20–25 s), générer la voix, repérer les pauses (ffmpeg silencedetect), écrire `tools/hooks/jourN.js` (chorégraphie caméra + textes, voir jour1.js), capturer avec `tools/capture_reel.py` (installer d'abord `npm i three@0.128.0 @fontsource/heebo` dans <SP>/three3 ; env GAME=index.html BEES=<json bees réels> HOOK=… OUT=<dossier frames> ; vérifier quelques images avant le rendu complet), musique `tools/musique_fond.py` (adapter durée/tempo), montage ffmpeg 1080×1920 30 fps (H.264 -preset veryfast -crf 20, AAC).
5. Stories du jour (JPEG 1080×1920, style de la ruche : fond miel sombre, Heebo 900, blanc + mots clés #FFC24B, « הקישור בביו 🔗 ») : 09:00 billets du jour (« 3 שטרות של 20 ₪ היום! רק מי שהגיב על הפוסט של הבוקר רואה אותם »), 13:00 nouveauté/événement du jour + nouveaux joueurs, 17:00 question « מה יקרה מחר בכוורת? 🤔 כתבו בתגובות לרילס ».
6. Pousser les médias dans `media/` (noms datés, ex. media/2026-10-28/reel.mp4). URL à donner à Instagram : https://raw.githubusercontent.com/chlomo111-bit/hakaveret/main/media/... (disponible tout de suite, fiable). Si Instagram refuse une vidéo depuis raw, essayer https://hakaveret.online/media/... (GitHub Pages, parfois plusieurs minutes de retard).
7. Programmer la publication avec create_trigger (run_once_at, initiation own_followup, notifications {}) : stories 09:00 / 13:00 / 17:00 (si l'heure est passée, publier tout de suite) et reel 19:30 Israël (+ commentaire CTA). Chaque tâche : créer le conteneur (media_type STORIES ou REELS, share_to_feed true), publier une seule fois (vérifier avant tout nouvel essai qu'il n'est pas déjà publié).

## Soir (tâche ~21:15)
- 28.10 : story résultat PUBLIÉE à 22:17 (media/2026-10-28/story_resultat.jpg : @saardano11 ×2, @zoharkoresh_ + teaser tirage 20:00). Ne pas republier.
- Lire les gagnants du jour (requête ci-dessus) après le 3e billet. Story résultat : liste des gagnants « 🏆 היום זכו: @… @… » ; billets non trouvés → « 😱 שטר אחד לא נמצא… מחר 3 שטרות חדשים ». Publier directement. (La tâche du soir doit tourner APRÈS l'ouverture du 3e billet : si le 3e billet n'est pas encore trouvé, le dire.)

## Palier 50 abeilles : « כוורת הזהב » (demande de Shlomo, 27.10.2026)
- Dans le jeu (index.html, bloc ÉVÉNEMENT 50 ABEILLES) : dès 50 abeilles, chaque joueur voit une fois l'événement (alarme rouge → מלכת־העל géante → les abeilles forment « 50 » → explosion d'or) puis la ruche reste dorée avec pluie d'or et la Super-Reine qui tourne. hakaveret.online/#ev50 le rejoue (aperçu / capture reel).
- Avant 50 : le compteur affiche « 50 🤯 » et un toast tease « ב־50 דבורים יקרה בכוורת משהו מטורף… ». À utiliser dans les stories/reels pour pousser le parrainage.
- Le jour où bees >= 50 : reel spécial capturé avec #ev50 (vrais @ de la table bees) + story « 🤯 50 דבורים! הכוורת הפכה לכוורת הזהב ».
- PALIER ATTEINT le 27.10 vers 15:00 (61 abeilles). Le reel « יום 1 » de 19:30 a été annulé (contenu dépassé, et déjà un reel publié ce jour-là). → Le reel du 28.10 au matin = le reel « כוורת הזהב / 50 דבורים » (capture #ev50 avec les vrais @), en racontant aussi la journée folle d'hier (Ron, billet doublé).
- ANTI-SPAM : maximum 1 reel et ~4 stories par jour. Avant toute publication, vérifier avec INSTAGRAM_GET_IG_USER_MEDIA et INSTAGRAM_GET_IG_USER_STORIES qu'un contenu identique ou très proche n'est pas déjà en ligne.

## Reel du 28.10 : DÉJÀ PUBLIÉ à 08:38 (session principale, voix Juniper) → https://www.instagram.com/reel/DfBzhIgjcgV/ — 2e reel demandé par Shlomo : « récap météore » (media/2026-10-28/reel_recap_meteor.mp4, voix Juniper) publié à 11:30 par la session principale. AUCUN autre reel le 28.10.

## (ancien) Reel du 28.10 : voix fournie par Shlomo
- Shlomo a envoyé la voix du reel « 50 abeilles / récap » : media/2026-10-28/voix_reel_50.mp3 → l'utiliser TELLE QUELLE (ne pas regénérer de voix pour ce reel). Caler les plans sur ses pauses (silencedetect).

## Débrief du matin (demande de Shlomo, 27.10.2026)
- TOUT D'ABORD tester l'accès à la voix : `curl -sS -o /dev/null -w "%{http_code}" https://storage.googleapis.com/` (200/400 = OK, 000/403 du proxy = bloqué). Shlomo a ajouté storage.googleapis.com aux domaines autorisés le 27.10 : dire dans le débrief si la voix James est utilisable aujourd'hui ou toujours bloquée.
- Au tout début de la production du matin, envoyer à Shlomo un débrief des 24 dernières heures (SendUserMessage + PushNotification, en français, court) :
  abonnés (INSTAGRAM_GET_USER_INFO followers_count ; repère 27.10 13:00 = 29), nouvelles abeilles et reines (bees.created_at sur 24 h ; repère 27.10 13:00 = 37 abeilles), gagnants des billets d'hier (treasure_wins), champion du miel, stories/reels publiés,
  et LE COMMENTAIRE LE PLUS LIKÉ des 24 h sur tous les médias (INSTAGRAM_GET_IG_MEDIA_COMMENTS avec fields "id,text,from,timestamp,like_count", hors hakaveret_shelanu) : citer le texte, l'auteur et le nombre de likes, + les 2 suivants.
- Indiquer l'événement retenu pour la journée (= ce commentaire s'il est réalisable). Jamais de contenu politique (visages de politiciens, partis…) : passer au suivant.
- Le reel de Ron (@ronen18, billet doublé en cadeau 40 ₪) attend la voix MP3 que Shlomo doit envoyer : ne pas le refaire sans cette voix (images déjà prêtes dans la session du 27.10).

## Profil Instagram toujours à jour (demande de Shlomo, 27.10.2026)
- Carrousel « איך משחקים? » (media/regles/, 5 slides 1080×1350) publié le 27.10.2026 : Shlomo l'épingle. Dès qu'une règle change (montants, horaires, nouvelle mécanique), regénérer les slides concernées et republier un nouveau carrousel des règles, puis envoyer à Shlomo (message court) : « épingle le nouveau carrousel » + la bio mise à jour à coller (l'API ne permet ni d'épingler, ni de modifier la bio, ni de créer des highlights).

## Réponses aux commentaires (27.10 au soir, Shlomo)
- TOUJOURS en hébreu, quelle que soit la langue du commentaire ou du message (règle de Shlomo, 28.10).
- Jamais de copier-coller : chaque réponse est unique, courte, sympa, en hébreu, et réagit au commentaire. Pas d'URL dans les réponses : « הקישור בביו 🔗 » suffit.
- DM : l'API refuse souvent d'écrire hors de la fenêtre de 24 h (erreur 2534022) — dans ce cas, donner à Shlomo le texte à envoyer lui-même.

## Règles
- Économe : une seule génération de voix, pas de rendus inutiles.
- Ne jamais toucher aux autres projets/automatisations de Shlomo.
- Jamais de doublon (abeilles, réponses, publications).

## 🕯️ SHABBAT (Shlomo, 30.10) — règle commune à tous les jeux
- Rien n'est publié ni exécuté entre vendredi 16:00 et samedi 18:30 (tâches programmées décalées par la direction des jeux).
- Tirage du vendredi : PAS à 20:00. lottery_live() renvoie state 'shabbat' le vendredi ; lottery_state() renvoie shabbat=true et draw_at = samedi 18:30 (le jeu affiche « במוצאי שבת 18:30 »). Le tirage de vendredi est fait samedi 18:30 par la tâche de rattrapage (run_lottery(vendredi)) ; ensuite lottery_live() du samedi entre 18:30 et 20:00 renvoie le résultat de vendredi (show LIVE pour les joueurs restés sur la page). Samedi 20:00 : tirage normal du samedi → samedi soir = 2 tirages.
- Le vendredi, le reel et les stories doivent sortir AVANT 16:00 (voix à demander à Shlomo le matin).

## 💡 IDÉES FUTURES (demandes d'abonnés, à faire plus tard — Shlomo)
- 30.10 @shahar_b.y : « collecter du nectar (צוף) sur des fleurs → en faire du miel ; celui qui fait le plus de miel est 1er au classement ». Piste : des fleurs dans/autour de la ruche à butiner (nectar), retour à la ruche = conversion en miel, classement « מלך הדבש » (honey.total). Quand on la réalise : l'annoncer comme « הרעיון של @shahar_b.y » dans un reel + story.
