/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // <--- C'est LA ligne magique
  images: {
    unoptimized: true, // Nécessaire pour un hébergement statique classique
  },
};

module.exports = nextConfig
