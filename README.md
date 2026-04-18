# Sito Idraulico - {{NOME_AZIENDA}}

Sito statico in HTML, CSS e JavaScript vanilla. Nessun build step, nessuna
dipendenza: basta caricare i file su un qualunque hosting per pubblicarlo.

## Struttura

```
ideaidraulica/
  index.html          pagina unica con tutte le sezioni
  css/style.css       stile (bianco/azzurro, responsive, menu a tendina)
  js/script.js        menu mobile, dropdown desktop, lightbox galleria, counter
  img/
    logo.svg          logo (usato anche come favicon)
    hero.svg          placeholder immagine hero
    about.svg         placeholder foto "chi siamo"
    gallery/
      placeholder.svg placeholder foto galleria (9 copie in index.html)
  robots.txt          per i motori di ricerca
  sitemap.xml         sitemap base
  README.md           questo file
```

## Come personalizzare i contenuti

Tutto il testo da sostituire e' marcato con doppie parentesi graffe, tipo
`{{NOME_AZIENDA}}`, `{{TELEFONO}}`, `{{SERVIZIO_1_NOME}}` ecc.

1. Apri `index.html` con un editor di testo (VS Code, Notepad++, Sublime...).
2. Usa "Trova e sostituisci" (`CTRL+H`) per rimpiazzare ogni placeholder.
3. Stessa cosa in `robots.txt` e `sitemap.xml` per il campo `{{DOMINIO}}`.
4. Aggiorna lo schema JSON-LD in testa a `index.html` con i dati corretti.

### Lista dei placeholder usati

- Azienda: `{{NOME_AZIENDA}}`, `{{CLAIM_FOOTER}}`, `{{PIVA}}`, `{{DOMINIO}}`
- Contatti: `{{TELEFONO}}` (visualizzato), `{{TELEFONO_RAW}}` (solo cifre, es.
  `393331234567`), `{{WHATSAPP_RAW}}` (solo cifre con prefisso internazionale,
  es. `393331234567`), `{{EMAIL}}`, `{{INSTAGRAM_USER}}`
- Indirizzo: `{{INDIRIZZO}}`, `{{CAP}}`, `{{CITTA}}`, `{{LAT}}`, `{{LNG}}`
- Orari: `{{ORARI_SETTIMANA}}`, `{{ORARI_SABATO}}`
- Statistiche: `{{ANNI_ESPERIENZA}}`, `{{N_INTERVENTI}}`, `{{N_ZONE}}`, `{{RATING}}`
- Chi siamo: `{{TESTO_CHI_SIAMO_1}}`, `{{TESTO_CHI_SIAMO_2}}`
- Servizi (per ogni servizio 1, 2, 3): `{{SERVIZIO_X_NOME}}`,
  `{{SERVIZIO_X_DESCRIZIONE}}`, `{{SERVIZIO_X_PRESTAZIONE_1..4}}`
- Zone di intervento: `{{ZONA_1}}` ... `{{ZONA_8}}`
- Testimonianze (per ogni 1, 2, 3): `{{TESTIMONIANZA_X_TESTO}}`,
  `{{TESTIMONIANZA_X_NOME}}`, `{{TESTIMONIANZA_X_INIZIALE}}`,
  `{{TESTIMONIANZA_X_CITTA}}`

## Sostituire le immagini

1. Logo: sostituire `img/logo.svg` con il logo reale (mantieni il formato SVG
   o usa PNG quadrato almeno 256x256).
2. Hero: sostituire `img/hero.svg` con una foto orizzontale 1200x900 circa,
   preferibilmente in formato `.webp` o `.jpg` (ricorda di aggiornare l'estensione
   nel tag `<img src>`).
3. About: stesso procedimento con `img/about.svg`.
4. Galleria: sostituire i 9 riferimenti a `img/gallery/placeholder.svg` in
   `index.html` con i nomi dei tuoi file (es. `img/gallery/01.jpg`, `02.jpg`,
   `...`) e caricare le foto nella cartella `img/gallery/`.
5. Social preview: aggiungere `img/og-cover.jpg` (1200x630) per anteprime su
   Facebook, WhatsApp, LinkedIn.

## Mappa Google Maps

In `index.html`, nella sezione "Zone", c'e' un `<iframe>` con `src` provvisorio.
Per sostituirlo:

1. Vai su [Google Maps](https://maps.google.com) e cerca la tua sede.
2. Clicca "Condividi" > "Incorpora una mappa" > copia l'URL dentro `src="..."`.
3. Sostituisci l'intero valore dell'attributo `src` dell'iframe.

## Deploy

Puoi pubblicare il sito su qualsiasi hosting statico:

- **Aruba / hosting classico**: carica l'intera cartella via FTP nella root.
- **Netlify**: trascina la cartella su [netlify.com/drop](https://app.netlify.com/drop).
- **GitHub Pages**: crea un repo pubblico, carica i file, attiva Pages da
  Settings > Pages > Branch `main` / folder `/`.
- **Vercel**: collega il repo e fai deploy.

## Accessibilita' e performance

- Tutte le immagini hanno `alt` descrittivi: ricorda di personalizzarli.
- Le immagini sono caricate con `loading="lazy"` (tranne l'hero).
- Il sito e' responsive mobile-first, con una barra fissa "Chiama / WhatsApp"
  in basso su smartphone.
- Contrasti colore conformi WCAG AA.

## Browser supportati

Ultime versioni di Chrome, Firefox, Safari, Edge. Compatibile iOS 14+ e
Android 10+.
