# Automatisations — הכוורת שלנו (@hakaveret_shelanu)

Règle de la direction des jeux (30.10.2026) : UN seul chat par jeu, « Automatisation – הכוורת שלנו », qui fait tout lui-même.
Plus aucune tâche programmée récurrente indépendante : ce chat se réveille avec ses propres send_later.
Les anciennes tâches (désactivées le 30.10 à 10:46, puis supprimées) sont archivées dans tools/ANCIENNES_TACHES.md.

## Réveils en place (au 30.10, 13:10)
| Quand (Israël) | Tâche | Contenu |
|---|---|---|
| ven. 30.10 15:00 | trig_01DbpuEsEn6KJbqsZSTMYEZy | Vérif avant Shabbat : reel « החיות השתלטו על הכוורת » (media/2026-10-31/reel_animaux.mp4) prêt + publication programmée sam. 19:30 |
| sam. 31.10 18:30 | trig_013oUomqTwWpwSXkmRo95xG9 | Sortie de Shabbat : programmer le réveil 19:55, tirage du VENDREDI (run_lottery('2026-10-30') + award_top_commenter + story + message Bit à Shlomo), passage complet, vérifier le reel de 19:30 |
| sam. 31.10 19:05 | trig_01WBUtskm8phZ9xLcXtnDkF5 (ancienne tâche isolée, désactivation refusée par les permissions) | Story « 🎤 חדש! The Noise » + popup vers thenoise.hakaveret.online |
| sam. 31.10 19:20 | trig_01F7FBkCXDhciDLzgy4Mf3gZ (send_later, chat de la ruche) | Filet de sécurité : ne fait la story/popup The Noise QUE si 19:05 ne l'a pas faite (jamais 2, jamais 0) |
| sam. 31.10 19:55 | à créer à 18:30 | Passage + story « 5 דקות להגרלה! » + tirage du samedi 20:00 |

## Rythme normal (dimanche → jeudi)
- Passages commentaires : 6:00, 12:00, 17:00 et 19:55 (5 min avant le tirage). À chaque passage : réponses à tous les commentaires, abeilles/reines, tags d'amis, animaux, bonus story, ET inscription des commentateurs du jour dans daily_commenters.
- Production du matin : post du jour (4:5) + story, vidéo du jour (texte voix envoyé à Shlomo 2–3 h avant, voix Juniper).
- 20:00 : tirage en direct dans le jeu (lottery_live) ; ensuite story du gagnant + message « 20 ₪ à payer par Bit ».
- Shabbat : rien entre vendredi 16:00 et samedi 18:30 ; le tirage du vendredi se fait samedi 18:30 (voir ROUTINE.md, section SHABBAT).

## Identifiants
- Instagram Composio : instagram_recoup-katar UNIQUEMENT (vérifier username hakaveret_shelanu avant chaque publication).
- Supabase : supabase_restow-lise, ref ohvmnaymozoxfirkbntt.

## 🎬 VIDÉOS — RÈGLE DE SHLOMO (30.10, 13:34) — TOUS LES JEUX
- Les vidéos de TOUS les jeux sont générées UNIQUEMENT dans le chat de la ruche (session_01P3PorVNfckHy3LzDtVio4U). Les autres chats préparent le texte voix et demandent la vidéo à ce chat.
- Chaque vidéo terminée est enregistrée : (1) sur le bureau du Mac de Shlomo (toujours allumé) : ~/Desktop/Vidéos jeux/<nom du jeu>/<nom du jeu> – AAAA-MM-JJ – <titre>.mp4 ; (2) envoyée dans le chat (SendUserFile) avec le nom du jeu.
