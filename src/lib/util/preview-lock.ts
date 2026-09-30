/**
 * Generiše HTML stranicu za zaključani prikaz sajta dok traje postavljanje na server.
 * Omogućava unos lozinke ili otključavanje putem tajnog linka (?preview=TOKEN).
 */
export function renderLockedPageHtml(hasError: boolean = false): string {
  return `<!DOCTYPE html>
<html lang="bs">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>pıko — Privatni pristup trgovini</title>
  <link rel="icon" href="/piko-favicon.png" type="image/png">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #0f1015;
      color: #f3f4f6;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .card {
      background: #181920;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1.25rem;
      max-width: 440px;
      width: 100%;
      padding: 2.5rem 2rem;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    }
    .logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .logo {
      height: 40px;
      width: auto;
      object-fit: contain;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      background: rgba(245, 158, 11, 0.12);
      color: #fbbf24;
      font-size: 0.725rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      margin-bottom: 1.25rem;
      border: 1px solid rgba(245, 158, 11, 0.3);
    }
    h1 {
      font-size: 1.35rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 0.6rem;
      color: #ffffff;
    }
    p {
      font-size: 0.875rem;
      color: #9ca3af;
      line-height: 1.55;
      margin-bottom: 1.75rem;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }
    input {
      width: 100%;
      background: #232530;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 0.75rem;
      padding: 0.9rem 1.1rem;
      color: #ffffff;
      font-size: 0.925rem;
      outline: none;
      transition: all 0.2s;
    }
    input:focus {
      border-color: #fbbf24;
      box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.2);
    }
    button {
      width: 100%;
      background: #fbbf24;
      color: #16140f;
      border: none;
      border-radius: 0.75rem;
      padding: 0.9rem 1.1rem;
      font-size: 0.925rem;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s, transform 0.1s;
    }
    button:hover {
      background: #f59e0b;
    }
    button:active {
      transform: scale(0.99);
    }
    .error {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #fca5a5;
      font-size: 0.825rem;
      padding: 0.65rem 0.85rem;
      border-radius: 0.6rem;
      margin-bottom: 1rem;
    }
    .footer-note {
      margin-top: 1.75rem;
      font-size: 0.75rem;
      color: #6b7280;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo-container">
      <img src="/piko-logo-white.png" alt="pıko" class="logo" />
    </div>
    <div><span class="badge">🔒 Privatno testiranje</span></div>
    <h1>Trgovina je u pripremi</h1>
    <p>Web trgovina se trenutno postavlja na server. Pristup je omogućen saradnicima putem tajnog linka ili unosom pristupne lozinke.</p>
    
    ${hasError ? '<div class="error">Pogrešna pristupna lozinka. Pokušajte ponovo.</div>' : ''}
    
    <form method="GET" action="">
      <input type="password" name="preview" placeholder="Unesite pristupnu lozinku..." required autofocus autocomplete="current-password" />
      <button type="submit">Otključaj trgovinu</button>
    </form>
    
    <div class="footer-note">© 2026 pıko d.o.o. Sva prava zadržana.</div>
  </div>
</body>
</html>`
}
