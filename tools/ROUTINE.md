# Routine quotidienne autonome — הכוורת שלנו (@hakaveret_shelanu)

## 📜 NOUVEAU RÈGLEMENT (Shlomo, 03.11.2026) — PRIORITAIRE SUR TOUT LE RESTE
Remplace « une vidéo du jour obligatoire chaque jour », « 1 post + 1 reel par jour » et le Shabbat fixe à 18:30.
1. **Alternance** (même rythme pour tous les jeux) : un jour REEL, le jour suivant POST normal. Mar. 3.11 = reel (1er), mer. 4.11 = post, jeu. 5.11 = reel, ven. 6.11 = post, sam. 7.11 soir = reel, dim. 8.11 = post, lun. 9.11 = reel… Jamais deux reels de suite, jamais de vidéo de remplissage.
   - Jour POST : post publié à 08:30 (pas avant 08:00), base de la loterie (commentaire sous le post = ×2).
   - Jour REEL : pas de post. Le reel sort à 19:00 (règle de Shlomo, 3.11) — TEST validé par Shlomo le 4.11 : jeudi 5.11 (épisode 2) à 21:00, juste après le tirage ; comparer la portée à 24 h avec l’épisode 1 (19:00 : 99 comptes, 161 vues) puis garder la meilleure heure. Pour le tirage, ×2 = commentaire du jour sous le reel du jour OU sous le dernier post (les passages enregistrent les deux dans daily_commenters).
2. **Structure du reel** : (1) explication courte de la ruche pour les nouveaux (« כל עוקב = דבורה, אוספים אבקה, כל ערב הגרלה ») ; (2) « אתמול הכוורת הייתה ב־X (דבורים / אבקה / עוקבים), היום אנחנו ב־Y » (vrais chiffres : honey_days, nombre d'abeilles, followers) ; (3) le commentaire du jour ; (4) ce qui s'est passé hier. « מהדורת הכוורת » (journal.js) reste au milieu.
3. **Mini-série animée** : chaque reel = un épisode (« פרק N »), suspense, rebondissement, fin sur une question/cliffhanger qui donne envie de voir le suivant. Toujours caméra 3D qui bouge, son parfaitement synchronisé.
4. **Paliers d'abonnés** (game_meta key `last_palier`) : à chaque passage, si followers ≥ last_palier+10 → tous les joueurs reçoivent +100 🌼 (`update honey set total=total+100`) OU un ticket en plus ce soir-là, story + news « 🎉 עוד 10 עוקבים! », puis last_palier = palier atteint. Tous les 100 (100, 200…) → GRAND événement dans la ruche (reel ce jour-là si l'alternance le permet, sinon post + stories). Jamais de vrai argent.
5. **Shabbat** : vendredi = post normal seulement (pas de reel) + story « שבת שלום » 1 h avant l'entrée de Shabbat (vérifier chaque semaine l'horaire d'allumage des bougies, Tel Aviv). RIEN entre l'entrée et la sortie de Shabbat (horaire réel de la havdala, vérifié chaque semaine — plus le 18:30 fixe). La loterie du vendredi se fait samedi soir à la sortie.
6. **Stories** : minimum 3 par jour en semaine, pas de maximum. Alterner images et PETITES VIDÉOS en story (8–15 s, capture 3D de la ruche qui bouge + musique/sons, SANS voix ElevenLabs ; 1080×1920, cadrage vérifié). Une photo seule toute la journée = trop sec.
9. **Partage = objectif n°1 de chaque reel** (Shlomo, 4.11 17:50) : avant d'écrire, se demander QUI va envoyer la vidéo à QUI et pourquoi (ex. un joueur l'envoie à ses amis pour qu'ils votent pour lui ; « envoie à l'ami qui dort comme l'ours »). Mettre dans le reel une mécanique concrète qui oblige à envoyer (vote, concours, tag d'un ami précis), dite à voix ET écrite à l'écran. Mesurer les partages du reel précédent (ep1 : 4 partages grâce à « שלחו לחבר »). Garder les reels ≤ 25–30 s (ep1 : 10,4 s regardées en moyenne sur 40 s).
8. **Avant chaque texte de vidéo** (Shlomo, 3.11 17:45) : TOUJOURS analyser le contenu précédent — vues/portée/partages du reel d'avant (INSTAGRAM_GET_IG_MEDIA_INSIGHTS) + tous ses commentaires — et en tirer le texte (qui citer, quel hook, quel CTA). Écrire l'analyse en tête de voix.txt. (Depuis le 4.11 20:53 : Claude génère lui-même la voix, voir section VOIX.)
7. **Priorité absolue** : samedi soir, juste après la sortie de Shabbat, TOUJOURS un reel, quelle que soit l'alternance. Dimanche = post, puis l'alternance reprend.

## ✉️ CROSSOVER « L'ENVELOPPE » (5 jeux, samedi 7.11 19:00) — voir tools/CROSSOVER_ENVELOPPE.md (règles à suivre à la lettre, coordinateur = chat השכנים)

## 🎙️ VOIX : C'EST CLAUDE QUI LA GÉNÈRE (Shlomo, 4.11 20:53) — ne plus demander de MP3 à Shlomo
- ElevenLabs : `creative_generate_speech`, voix **Juniper – Grounded and Professional** (voice_id `aMSt68OGf4xUZAnLpTU8`), model `eleven_v4` (tags [excited]/[whispers]/[shouting]/[fast]), generations_count 1, flow `nX48CTcwK9QDmmi0CwD9`. Télécharger le content_url avec curl, puis transcription mot à mot (creative_transcribe_audio) pour la sync.
- Écrire le texte après l'analyse du contenu précédent, générer la voix vers 16:00 les jours de reel, monter et programmer la publication. Shlomo n'a plus rien à faire.
- Stories : on peut maintenant ajouter de la voix (courte, 1–2 phrases, ex. « שלי זכתה שוב! מי יעצור אותה הערב? ») sur les petites vidéos de story, en alternance avec des stories musique seule.

## 🛠️ AMÉLIORATIONS VALIDÉES PAR SHLOMO (4.11, 20:10) — en vigueur dès le 5.11
1. **Tirage plus juste** : `run_lottery` exclut automatiquement le gagnant de la veille (s'il y a au moins 2 inscrits) ; il reçoit un « 🛡️ bouclier » = +300 🌼 (champ `shield` du résultat). L'annoncer dans la story du résultat.
2. **Cadeau d'arrivée** : à chaque passage, pour tout commentateur jamais vu (pas encore dans honey) → `select public.welcome_gift('<handle>');` (abeille dorée = refs 3 + 300 🌼, une seule fois, table welcome_gifts) + réponse « 🎁 מתנת הצטרפות: דבורת זהב ✨ + 300 🌼 » + son nom dans la story du soir.
3. **Objectifs collectifs atteignables** : objectif du jour = 1,5 × la récolte totale de la veille (honey_days), arrondi à la centaine. Victoire → story de fête.
4. **Reels au centre** : les jours post, les commentaires du jour sous le DERNIER REEL comptent aussi ×2 (daily_commenters : post du jour + dernier reel). Le post reste simple.
5. **Reels ≤ 25 s** + mécanique de partage (concours, vote, « שלחו לחברים שיצביעו לכם ») dite à voix et écrite à l'écran.
6. **Badges visibles 24 h** : roi de la ruche 👑, meilleur commentateur 💬👑 (déjà : cmtCrown), gagnant du tirage 🎟️ → la caméra du reel s'arrête sur leur abeille et dit leur nom.
7. **Heure des reels** : dès 100 abonnés, lire INSTAGRAM_GET_USER_INSIGHTS `online_followers` (period lifetime) et caler l'heure sur le pic. En attendant : test 21:00 le 5.11.

## 🔁 OBJECTIF N°1 : FAIRE REPOSTER NOS REELS (Shlomo, 01/11/2026) — RÈGLE OBLIGATOIRE POUR TOUS LES JEUX
But : que les utilisateurs repostent / partagent nos reels (story, envoi à des amis, repost). C'est la meilleure façon d'avoir de nouveaux visiteurs. Tout le contenu est pensé pour ça.
1. **Reel pensé pour être partagé** : hook dès la 1re seconde, un moment drôle ou fou que les gens ont envie de montrer, et les vrais joueurs tagués (les gens repartagent quand ils se voient dans la vidéo).
2. **Appel au partage partout**, court et pas forcé : à la fin de chaque reel, dans la légende et dans le commentaire du compte. Ex. « 🔁 שתפו בסטורי ותייגו אותנו » / « שלחו למישהו שחייב לראות את זה 👀 ». On garde aussi « מה יקרה מחר? התגובה עם הכי הרבה לייקים קובעת ».
3. **Récompense dans le jeu** : qui partage le reel du jour en story en taguant le compte reçoit un bonus dans la monnaie du jeu + un badge « 🔁 שגריר » sur son personnage, et un merci en story (repartager sa story quand c'est possible). Vérification : la mention de story arrive en message privé (INSTAGRAM_LIST_ALL_CONVERSATIONS), ou capture envoyée en DM. Jamais d'argent réel, jamais de condition « suivre le compte ».
4. **Chaque jour** : partager en story notre propre reel du jour (« פרק חדש! 👇 ») dès qu'il sort, et repartager les stories des joueurs qui nous taguent.
5. **Mesurer** : à chaque passage, relever les partages du reel du jour (INSTAGRAM_GET_IG_MEDIA_INSIGHTS, métriques `shares` et `reposts`) et noter quel type de reel est le plus partagé, pour refaire ce qui marche.
6. S'applique dès la prochaine vidéo (le chat vidéos du jeu) et dès le prochain passage (le chat automatisation du jeu).

## ⭐ RÈGLES OBLIGATOIRES POUR TOUS LES JEUX (Shlomo, 30.10.2026) — PRIORITAIRES sur tout ce qui suit
En cas de contradiction avec une section plus ancienne de ce fichier (billets, passages 8:52/11:52…, post de 07:00 « billet », soir 21:15…), CES RÈGLES l'emportent.
1. VIDÉO DU JOUR : chaque jour un reel qui raconte ce qui s'est passé dans le jeu (vrais joueurs tagués, vrais chiffres) et se termine par « מה יקרה מחר? התגובה עם הכי הרבה לייקים קובעת ». AVANT d'écrire la vidéo : lire TOUS les commentaires du post/reel précédent ; le commentaire valable le plus liké décide de ce qui arrive. Texte écrit pour la voix (hébreu, balises Eleven v3) envoyé à Shlomo 2–3 h avant la mise en ligne (SendUserMessage + PushNotification) : SEULE chose qu'on lui demande. Couverture dédiée (jamais une image noire).
2. CHAQUE JOUR QUELQUE CHOSE D'EXTRAORDINAIRE dans le jeu (événement fou, surprise, nouveauté visible), idéalement tiré des commentaires / de la boîte à idées, raconté dans la vidéo.
3. LOTERIE CHAQUE SOIR À 20:00 — DEPUIS LE 1.11 PLUS DE VRAI ARGENT (règle de Shlomo, 31.10) : le gagnant reçoit 2000 🌼 dans le jeu (run_lottery les crédite tout seul) + choisit l'événement extraordinaire du lendemain (en plus de celui du meilleur commentateur). Plus de Bit, plus de « 20 ₪ » dans aucun texte, post, story, vidéo. 2 conditions inchangées : (a) commenter le POST DU JOUR, (b) 200 pollens récoltés dans la journée.
3 bis. PRIX « המגיב של היום » (meilleur commentateur) — en ligne depuis le 30.10 (SQL : tools/sql_meilleur_commentateur.sql, déjà appliqué) :
   - Chaque passage journalise TOUS les commentaires de joueurs du jour sur TOUS les posts : `select public.log_comment('<comment_id>','<username>','<media_id>','<timestamp ISO>','<texte>');` (idempotent ; un texte identique répété le même jour = invalide/spam ; table comment_log).
   - Classement : `select * from public.top_commenters(<jour>);` (égalité = celui qui a atteint ce nombre en premier).
   - 20:00 : `select public.award_top_commenter(<jour>);` (une fois/jour, table top_commenter_awards). Le jeu le fait aussi tout seul à 20:00 (commenter_state) : couronne 3D + étiquette violette « 💬👑 המגיב של היום » sur son abeille jusqu'au lendemain soir, bloc « פרס המגיב של היום » dans la fiche.
   - Annonce dans la story du résultat + réponse à l'un de ses commentaires : « מה יקרה מחר בזכותך? ». Il répond (commentaire sous le post du jour suivant ou réponse) AVANT 12:00 le lendemain. Les passages repèrent sa réponse → `select public.set_commenter_wish(<jour de l'award>, '<souhait>', 'accepted'|'adapted'|'refused');` (refuser insultant / sexuel / visant une vraie personne / impossible → proposer une version proche, status adapted). Sans réponse à 12:00 : status 'none', rien de plus.
   - Le souhait est réalisé dans le jeu le jour même (EN PLUS de l'événement du commentaire le plus liké), puis status 'done', et raconté dans la vidéo en le taguant (« @x החליט ש… »). Pas d'argent.
4. PASSAGES : 4 par jour — 5:55*, 11:55*, 16:55* et 19:55 (*cron unique « 55 5,11,16,19 », soit 5 min avant 6:00/12:00/17:00 ; 19:55 = 5 min avant la loterie). Lire tous les nouveaux commentaires de toutes les publications récentes, répondre à chacun (hébreu, court, varié, jamais de copier-coller, pas d'URL → « הקישור בביו »), mettre à jour bees/reines/tags/animaux/bonus story, log_comment pour TOUS les commentaires du jour, repérer la réponse du meilleur commentateur de la veille (jusqu'à 12:00), enregistrer les commentateurs du post du jour (daily_commenters), relever les abonnés (game_meta.ig_followers) ; vérifier que le post du jour existe (sinon le créer). À 19:55 en plus : story « 5 דקות להגרלה! » (nombre de participants = `select count(*) from lottery_eligible(<jour>)`, meilleur commentateur du moment, rappel des 2 conditions).
5. SHABBAT : rien entre vendredi 16:00 et samedi 18:30 (Israël). Toute tâche qui se déclenche dans ce créneau s'arrête immédiatement. Loterie + couronne + vidéo du vendredi faites samedi à partir de 18:30 (loterie du vendredi d'abord, puis celle du samedi à 20:00). Le vendredi, le post du jour sort le matin et la vidéo AVANT 16:00.
6. ÉCONOMIE : passage sans nouveau commentaire ni rien à faire → fin immédiate. Tâches programmées de la ruche (une seule par fonction) : « Ruche – passages » (trig_01B5kBRozohtC74Q9A5QUHvs), « Ruche – loterie 20:00 + המגיב של היום » (trig_01WSeUeThqhm1iSfbS6vyg3F), « Ruche – production du matin » (trig_01UMNVrorvVo84G2eQ1cHANa). Ne pas en créer d'autres récurrentes ; les publications ponctuelles (send_later / run_once) restent permises.
   ⚠️ 30.10 ~11:40 : la mise à jour de ces tâches (prompts + horaires 55 5,11,16,19) a été REFUSÉE par les permissions → elles tournent encore avec leurs anciens prompts/horaires (passages 7:57/13:57/18:57 dim.–jeu., loterie 20:01, production 6:11). En attendant : un trigger SQL compte automatiquement chaque commentaire traité (ig_seen_comments → comment_log) et le jeu attribue lui-même la couronne à 20:00. La production du matin et toute session qui lit ce fichier appliquent ces règles (post du jour, événement, souhait du meilleur commentateur via set_commenter_wish, story 19:55 si possible).

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
2. Post de 07:00 : légende qui demande un commentaire ET un tag (« תייגו חבר שצריך 2000 אבקות »).
3. Story « בעוד 10 דקות שטר חדש בכוורת » ~10 min avant chaque billet (heures dans billet_slots) : la production du matin les génère et les programme (create_trigger run_once, une par billet).
4. Story gagnant le soir en mentionnant @gagnant (il repartage → ses abonnés découvrent le jeu).
5. Reel quotidien : hook choc 1re seconde, l'événement voté « מה יקרה מחר », fin = CTA commentaire + tag.
6. Commentaire CTA sous chaque reel (« מה יקרה מחר? »), l'idée la plus likée devient l'événement du lendemain (nommer l'auteur dans le reel).
7. Réponses rapides et variées (5 passages/jour : 8:52, 11:52, 14:52, 17:52, 20:52) — toujours en hébreu, sans URL. À CHAQUE passage : enregistrer les commentateurs du post du jour dans daily_commenters (voir « RÈGLE COMMENTAIRE DU JOUR »).
8. Paliers d'abonnés/abeilles (100, 150, 200…) = événement spécial + reel (comme כוורת הזהב à 50).
9. Hashtags : 5, en hébreu, liés à l'Israël/jeu/argent (#משחק #זכייה #ישראל …), varier un peu chaque jour.
Ne jamais : acheter des abonnés, follow/unfollow en masse, DM non sollicités, giveaway trompeur (le règlement reste exact : prix uniquement dans le jeu depuis le 1.11).

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
- Le passage commentaires transforme la dabora : animaux supportés par le jeu = cat חתול, dog כלב, lion אריה, frog צפרדע, panda פנדה, pig חזיר, unicorn חד־קרן/חד קרן, bunny ארנב/ארנבת, elephant פיל/פילון/elephant/🐘 (ajouté le 30.10). Liste à citer dans les réponses : חתול, כלב, אריה, צפרדע, פנדה, חזיר, חד קרן, ארנב, פיל 🐘 (+ tout nouvel animal ajouté ensuite). SQL : update bees set style = coalesce(style,'{}'::jsonb) || jsonb_build_object('animal','<clé>','animal_until','<date du commentaire + 1 jour>') where handle='<handle>';
- 🐘 30.10 : éléphant ajouté au jeu (index.html : ACC.an_elephant = oreilles grises + intérieur rose, trompe, défenses, tête grise ; ANIMALS.elephant tint grey). Demandé le 29.10 par @the_noise_2026 (commentaire 18169366924471126, on lui avait répondu « n'existe pas ») → éléphant offert 24 h (animal_until 2026-10-31T12:30+02:00) + réponse sous son commentaire.
- 🎬 Reel « החיות השתלטו על הכוורת » (événement extraordinaire, voix Juniper de Shlomo) : monté le 30.10 (media/2026-10-31/reel_animaux.mp4, cover_animaux.jpg, caption_animaux.txt, hook tools/hooks/animaux.js), publication programmée SAMEDI 31.10 19:30 (trig_01D8nEJD5xEcgWweWgaMpP1E). Le commentaire valable le plus liké sous ce reel = prochain animal ajouté au jeu (production du dimanche).
- 🆕 RÈGLE (directeur des jeux, 30.10) : quand un joueur demande un animal qui n'existe pas encore, NE PAS refuser : on le CRÉE dans le jeu au prochain passage (nouvelle géométrie ACC.an_<clé> en cubes, même style, + ANIMALS.<clé> avec tint/col/he + ACC_LOCAL), on vérifie le rendu (capture Playwright), on pousse, puis on lui donne l'animal 24 h et on lui répond qu'on l'a construit pour lui. Seule limite : pas d'animal choquant/vulgaire ni de personne réelle. Mettre à jour la liste ci-dessus.
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

## 🎬 VIDÉOS — RÈGLE DE SHLOMO (30.10, 13:34) — TOUS LES JEUX
- Les vidéos de TOUS les jeux sont générées UNIQUEMENT dans le chat de la ruche (session_01P3PorVNfckHy3LzDtVio4U). Les autres chats préparent le texte voix et demandent la vidéo à ce chat.
- Chaque vidéo terminée est enregistrée : (1) sur le bureau du Mac de Shlomo (toujours allumé) : ~/Desktop/Jeux/<nom du jeu>/Vidéos/<nom du jeu> – AAAA-MM-JJ – <titre>.mp4 ; (2) envoyée dans le chat (SendUserFile) avec le nom du jeu.

## 📺 JOURNAL DU JOUR AU MILIEU DE CHAQUE VIDÉO (Shlomo, 30.10 14:02) — tous les jeux
- Chaque vidéo du jour fait une petite PAUSE au milieu : on coupe vers un PLATEAU TÉLÉ (« מהדורת הכוורת ») avec le journal du jour.
- Le journal montre LE COMMENTAIRE DU JOUR = le commentaire qui a eu le plus de likes (@auteur + texte + ❤️ nombre), comme promis aux abonnés, et dit ce qu'on en a fait dans le jeu (l'événement réalisé). Puis la vidéo reprend.
- Ce qui est annoncé au journal doit exister VRAIMENT dans le jeu le jour même.
- Plateau CHOISI (30.10, Shlomo : « je te fais confiance ») : tools/hooks/journal.js (aperçu media/journal_apercu.jpg). Déroulé 6,5 s : flash rouge « 🔴 מבזק » (1,1 s, effet glitch) → studio « מהדורת הכוורת » : présentatrice abeille en cubes (cravate + micro), écran LED avec la bulle Instagram du commentaire (@ + texte), ❤️ likes qui montent, « 🏆 התגובה של היום », puis « ✅ ce qui est arrivé dans le jeu », bandeau rouge « מבזק » qui défile → fondu au noir, retour à la vidéo.
- Utilisation dans un hook de capture : charger journal.js (pg.evaluate du fichier avant le hook), puis dans capHook, entre deux plans au milieu (vers 40–50 % de la vidéo) : `if(JOURNAL.frame(t-T0,{user,text,likes,result})) return;` pendant JOURNAL.DUR. Prévoir dans le texte voix une phrase pour ce passage (« ועכשיו… מהדורת הכוורת! התגובה של היום: … »). Musique : jingle « news » court (3 notes montantes + whoosh) au flash.
- Pour les autres jeux : même plateau, changer D.show (nom du journal) et la présentatrice (bateau = capitaine, סבתא מזל, The Noise = דודי).


## 🪙 PLUS DE VRAI ARGENT (31.10, 22:07)
- 31.10 = dernier jour avec de l'argent réel (gagnants payés : @zoharkoresh_ ven., @shahar_b.y sam.).
- À partir du 1.11 : loterie = 2000 🌼 crédités automatiquement + le gagnant décide de ce qui arrive d'extraordinaire dans le jeu le lendemain (lui répondre en commentaire « מה יקרה מחר בזכותך? »). Pièce d'or cachée (si réactivée) = 500 🌼 automatiques.
- Les anciennes lignes de ce fichier qui parlent de ₪ / Bit / billets sont historiques : ne plus les appliquer. Ne plus envoyer de message « à payer par Bit » à Shlomo.

## 📲 STORIES À VOLONTÉ — 1 POST + 1 REEL MAX PAR JOUR (règle de Shlomo, 1.11, 09:01) — ⚠️ REMPLACÉ le 3.11 par l'alternance reel/post (voir NOUVEAU RÈGLEMENT en haut)
- Publications du fil : MAXIMUM 1 post + 1 reel par jour. Jamais plus (« plus que ça c'est trop »).
- Stories : autant qu'on veut. Rythme de base : ~09:00 (nouveauté du jour), 11:00 (classement pollen), 14:00 (meilleurs commentaires), 17:00 (nouvelles abeilles), 18:30 (teaser reel / compte à rebours), 19:55 (5 דקות להגרלה), après 20:00 (gagnant), 21:30 (ce qui arrive demain).
- Outil : python3 tools/story_make.py story.json out.jpg (1080×1920, Heebo, *jaune*, _violet_). Toujours regarder l'image avant, une seule publication par créneau, copie dans ~/Desktop/Jeux/הכוורת שלנו/Images/.
- Les réveils du soir (19:55) programment les créneaux stories du lendemain dans ce chat.

## 🐻 ÉVÉNEMENT LUNDI 2.11 — « פו הדב פרץ לכוורת! » (décidé 1.11, main libre de Shlomo)
- Origine : commentaire « מחר מגיע פו הדב לכוורת ומתחיל לאכול דבש » (3 likes, 28.10), jamais réalisé.
- Dans le jeu (automatique, table hive_events + rpc bear_state) : un ours en cubes mange le miel à côté de la fontaine ; barre « חומת הדבש » = somme des pollens de TOUS les joueurs du jour ; objectif 8 000 🌼 avant 20:00.
  - Réussi → l'ours devient une statue de pierre pour toujours + tous ceux qui ont récolté ce jour-là = « 🛡️ שומרי הכוורת » (les citer en story/reel).
  - Raté → « פו הדב ניצח הפעם », il reste ; nouvel essai possible un autre jour (insert hive_events).
- Post du jour 2.11 = l'ours (hook « 🐻 פו הדב פרץ לכוורת ואוכל לנו את הדבש! », objectif commun, 200 🌼 = ticket, commentaire = ×2). Stories toutes les 2–3 h avec la barre (rpc bear_state : total/goal/players).
- Reel du soir 2.11 : la bataille contre l'ours + journal « מהדורת הכוורת ».

## 🎟️ TIRAGE — NOUVELLE RÈGLE À PARTIR DU 2.11
- 200 🌼 dans la journée = 1 ticket. Un commentaire sur le post du jour = 2 tickets (×2). Le commentaire n'est PLUS obligatoire (il avait divisé les participants par 2).
- Gain inchangé : 2000 🌼 crédités automatiquement + le gagnant choisit l'événement du lendemain.
- Textes : « 200 אבקות = כרטיס · תגובה על הפוסט = כרטיס כפול ×2 ».

## ⏰ HORAIRES DE PUBLICATION (règle de Shlomo, 2.11, 07:18)
- RIEN n'est publié avant 08:00 (post, story, reel) : ça ne sert à rien, personne ne regarde.
- La production du matin peut se préparer tôt (image, légende, événement), mais la publication du post du jour se fait à partir de 08:30 ; première story à partir de 09:00.

## ✉️ MESSAGES PRIVÉS (constat 2.11)
- L'API Instagram refuse toute réponse en DM (« outside of allowed window ») même quelques heures après le message : impossible de répondre aux DM depuis les automatisations. Lire les DM à chaque passage et signaler à Shlomo ceux qui demandent une action (ex. paiements, plaintes) ; répondre plutôt en commentaire public quand c'est possible.
