# DLRG Kursmappen – Web-App

Stundenverlaufspläne für den Beckenrand: Schwimmabzeichen Bronze/Silber/Gold
und Rettungsschwimmabzeichen Bronze/Silber. Läuft auf dem Handy, funktioniert
offline und braucht keinen Server-Unterbau – reine statische Dateien.

## Was drin ist

| Datei | Zweck |
|---|---|
| `index.html` | die komplette App (Oberfläche, Logik, Timer) |
| `data.js` | alle Kursinhalte als Daten |
| `img/regel-1…10.webp` | die zehn Baderegel-Grafiken |
| `sw.js` | Offline-Cache (Service Worker) |
| `manifest.webmanifest`, `icon-*.png` | Installation als App-Symbol |

## Auf GitHub Pages veröffentlichen

1. Neues Repository anlegen, diese Dateien in den Wurzelordner legen.
2. **Settings → Pages → Source: „Deploy from a branch"**, Branch `main`, Ordner `/ (root)`.
3. Nach ein paar Minuten ist die Seite unter
   `https://<benutzername>.github.io/<repo>/` erreichbar.

Wichtig: Bei kostenlosen GitHub-Konten funktioniert Pages nur aus **öffentlichen**
Repositories. Die Seite ist damit für jeden erreichbar, der die Adresse kennt.
`index.html` enthält bereits `<meta name="robots" content="noindex,nofollow">`,
damit Suchmaschinen sie nicht aufnehmen. Wer die Grafiken nicht öffentlich
ablegen möchte, hält das Repo privat und gibt die Dateien direkt an die
Hilfsausbilder weiter (siehe unten).

## Ohne Server verteilen

Ordner als ZIP weitergeben, entpacken, `index.html` öffnen. Die App läuft
vollständig, nur der Offline-Cache bleibt inaktiv (Service Worker brauchen
`http(s)://`). Für den Dauereinsatz auf dem Handy ist die gehostete Variante
besser.

## Auf dem Handy einrichten

Adresse im Browser öffnen, dann:

- **Android/Chrome:** Menü → „Zum Startbildschirm hinzufügen"
- **iPhone/Safari:** Teilen-Symbol → „Zum Home-Bildschirm"

Danach startet die App im Vollbild und funktioniert ohne Empfang, sobald sie
einmal geladen wurde.

## Inhalte ändern

Die Kursinhalte stehen in `data.js`. Nach jeder Änderung in `sw.js` die Zeile

```js
const VERSION = 'kursmappen-v1';
```

hochzählen (`v2`, `v3`, …). Sonst zeigen bereits installierte Handys weiter den
alten Stand aus dem Cache.

## Umzug auf den DLRG-Server

Alle Pfade sind relativ, es gibt keinen Build-Schritt. Den Ordnerinhalt in ein
Verzeichnis auf dem Webserver kopieren – fertig. Voraussetzung für den
Offline-Betrieb ist HTTPS (bei GitHub Pages und üblichen DLRG-Hostings gegeben).

## Bedienung

- Startseite → Kurs → Einheit.
- Der farbige Zeit-Block links neben jeder Phase startet direkt einen Countdown
  für diese Phase.
- Das Uhr-Symbol unten rechts öffnet feste Zeiten (1:15, 1:30, 3:00, 10:00,
  15:00, 30:00) und eine Stoppuhr.
- Bei Ablauf vibriert das Handy und gibt einen Signalton.
- „Display anlassen" verhindert, dass der Bildschirm am Beckenrand ausgeht.
- Bei den Schwimmabzeichen lässt sich die Baderegel-Grafik antippen und
  formatfüllend zum Zeigen anzeigen.

## Hinweis zu den Grafiken

Die Baderegel-Grafiken sind DLRG-Material und hier für die Ausbildung
eingebunden. Vor einer dauerhaften öffentlichen Veröffentlichung außerhalb des
Verbands die Verwendung mit der zuständigen Gliederung abstimmen.
