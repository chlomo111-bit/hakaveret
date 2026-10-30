# Automatisations du jeu (sauvegarde du directeur des jeux, 30/10/2026 12:45)

Inventaire de toutes les tâches programmées actives de ce jeu avant remise à zéro.
Les textes complets des tâches restent consultables dans les tâches désactivées (même ID) ;
la logique détaillée est dans tools/ROUTINE.md.

Règles communes (30/10) : vidéo du jour (le commentaire le plus liké décide), un événement extraordinaire par jour,
loterie 20 ₪ à 20:00 (commentaire sur le post du jour + seuil de monnaie, pas d'abonnement obligatoire),
« המגיב של היום » (badge + pouvoir de choisir un événement le lendemain), passages 6:00 / 12:00 / 17:00 / 19:55,
Shabbat : rien de vendredi 16:00 à samedi 18:30, tout est décalé à samedi 18:30.

| ID | Nom | Horaire (heure d'Israël) | Rôle |
|---|---|---|---|
| trig_01UMNVrorvVo84G2eQ1cHANa | Ruche – production du jour | 6:11 dim.–ven. | Débrief, post du jour + story, texte de la vidéo (voix Juniper), send_later |
| trig_01B5kBRozohtC74Q9A5QUHvs | Ruche – commentaires → reines | 7:57 · 13:57 · 18:57 dim.–jeu. | Réponses, reines, tags d'amis, animal 24 h, daily_commenters, bonus story |
| trig_01WSeUeThqhm1iSfbS6vyg3F | Ruche – tirage au sort 20:00 | 20:01 dim.–jeu. + sam. | run_lottery, story résultat, message Bit |
| trig_01BJvLmFrUjUgN7hkaJE8w9v | Ruche – story résultat billet | (obsolète, ancien billet) | À ne pas recréer |
| trig_01TpjowVSn3WC5cp2K7tu8yF | Ruche – passage avant tirage samedi | sam. 31/10 19:40 (ponctuel) | Déclenche le passage commentaires |
| trig_01WBUtskm8phZ9xLcXtnDkF5 | Ruche – story « The Noise arrive » | sam. 31/10 19:05 (ponctuel) | Story + popup vers The Noise |
| trig_014ZFkBCpt4cyFS4E64bfVnk | Ordre : éléphant + reel des animaux | 30/10 12:00 (déjà lancé) | Éléphant 🐘, reel samedi 19:30, texte voix avant 15:30 |

Seuil : 200 pollens

## Tâches du directeur qui touchent ce jeu
| ID | Nom | Horaire | Rôle |
|---|---|---|---|
| trig_01CKRu6aTLCyHxQjn1bZYJsZ | Jeux – passages du vendredi | ven. 7:50 · 13:50 | Déclenche ruche + savta |
| trig_016xihjQtAaUGjNW17P6RXG2 | Jeux – décaler Shabbat | ven. 15:45 | Décale les ponctuels à sam. 18:30 |
| trig_01SweqkEFqGvYW3p6ffWU83f | Jeux – rattrapage sortie de Shabbat | sam. 18:30 | Tirage du vendredi ruche + passages ruche/savta |
