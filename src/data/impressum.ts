// Impressum (§ 5 DDG, § 18 Abs. 2 MStV).
//
// HOW TO SWITCH IT ON: fill in every [ЗАПОЛНИТЬ] below, then change
// IMPRESSUM_ON to true. That one switch builds /impressum/ and shows the
// "Impressum" links in the footer and on /about.
// While it is false, the page is not built and no link points to it.
// If it is true but a [ЗАПОЛНИТЬ] is left, the build stops with an error,
// so placeholders can never reach the live site.

export const IMPRESSUM_ON = false;

export const I = {
  name:        '[ЗАПОЛНИТЬ]',   // Vor- und Nachname (bei Gewerbe ggf. + Firmenname)
  street:      '[ЗАПОЛНИТЬ]',   // Straße und Hausnummer (ladungsfähige Anschrift, kein Postfach)
  city:        '[ЗАПОЛНИТЬ]',   // PLZ und Ort
  country:     'Deutschland',
  countryEn:   'Germany',
  email:       '[ЗАПОЛНИТЬ]',   // z. B. editorial@aveliq.net
  phone:       '[ЗАПОЛНИТЬ]',   // Telefonnummer (die Website hat kein Kontaktformular)
  responsible: '[ЗАПОЛНИТЬ]',   // Verantwortlich nach § 18 Abs. 2 MStV: Name (Anschrift wie oben)
};

export const IMPRESSUM_PLACEHOLDERS = Object.entries(I)
  .filter(([, v]) => v.includes('ЗАПОЛНИТЬ'))
  .map(([k]) => k);
