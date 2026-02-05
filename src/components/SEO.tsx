import Head from "next/head";

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function SEO({
  title = "DADICOOK - Restaurant Bistronomique | Cuisine du Monde",
  description = "Découvrez DADICOOK, restaurant bistronomique proposant une cuisine du monde raffinée dans une ambiance chaleureuse et conviviale. Réservez votre table en ligne.",
  image = "/og-image.png",
  url = "https://www.dadicook.fr"
}: SEOProps) {
  const fullImageUrl = image.startsWith("http") ? image : `https://www.dadicook.fr${image}`;
  const fullUrl = url.startsWith("http") ? url : `https://www.dadicook.fr${url}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="DADICOOK" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="French" />
      <meta name="author" content="DADICOOK" />
      <link rel="canonical" href={fullUrl} />
    </Head>
  );
}
