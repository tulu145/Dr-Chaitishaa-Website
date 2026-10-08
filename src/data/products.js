/**
 * Product catalogue for Dr. Chaitishaa — Celestial Insights Healing.
 * Images: drop real files into /public/products/ and update the `image` paths.
 * price is optional — omit or set to null to hide it on the card.
 */

export const CATEGORIES = [
  { id: 'all',      label: 'All' },
  { id: 'oil',      label: 'Oil' },
  { id: 'bracelet', label: 'Bracelet' },
  { id: 'salt',     label: 'Salt' },
  { id: 'candle',   label: 'Candle' },
  { id: 'crystals', label: 'Crystals' },
];

export const products = [
  // ── Oils ──────────────────────────────────────────────────
  {
    id: 'oil-abundance',
    category: 'oil',
    name: 'Abundance Attraction Oil',
    description: 'A sacred blend of essential oils charged with Vedic mantras to attract wealth, prosperity and positive opportunities.',
    price: null,
    image: '/products/placeholder-oil.jpg',
  },
  {
    id: 'oil-protection',
    category: 'oil',
    name: 'Protection & Aura Cleanse Oil',
    description: 'Purifies your aura and creates a protective energy shield. Ideal for daily anointing and space clearing.',
    price: null,
    image: '/products/placeholder-oil.jpg',
  },
  {
    id: 'oil-love',
    category: 'oil',
    name: 'Love & Harmony Oil',
    description: 'Infused with rose, jasmine and sandalwood to nurture loving relationships and inner emotional balance.',
    price: null,
    image: '/products/placeholder-oil.jpg',
  },

  // ── Bracelets ─────────────────────────────────────────────
  {
    id: 'bracelet-tigers-eye',
    category: 'bracelet',
    name: "Tiger's Eye Power Bracelet",
    description: "Hand-knotted Tiger's Eye beads for confidence, willpower and grounded energy. Energised under full moon.",
    price: null,
    image: '/products/placeholder-bracelet.jpg',
  },
  {
    id: 'bracelet-amethyst',
    category: 'bracelet',
    name: 'Amethyst Calm Bracelet',
    description: 'Amethyst promotes clarity of mind, calm and spiritual protection. Perfect for meditation and daily wear.',
    price: null,
    image: '/products/placeholder-bracelet.jpg',
  },
  {
    id: 'bracelet-pyrite',
    category: 'bracelet',
    name: 'Pyrite Wealth Bracelet',
    description: 'Known as the "Stone of Luck", pyrite attracts abundance and shields against negative energies.',
    price: null,
    image: '/products/placeholder-bracelet.jpg',
  },

  // ── Salts ─────────────────────────────────────────────────
  {
    id: 'salt-himalayan',
    category: 'salt',
    name: 'Himalayan Energy Cleanse Salt',
    description: 'Pure pink Himalayan salt blended with herbs and crystals. Dissolve in bath water to cleanse your energy field.',
    price: null,
    image: '/products/placeholder-salt.jpg',
  },
  {
    id: 'salt-black',
    category: 'salt',
    name: 'Black Salt Negativity Shield',
    description: 'Traditional black salt used in Vedic practices to repel negative energy and protect your home and workspace.',
    price: null,
    image: '/products/placeholder-salt.jpg',
  },

  // ── Candles ───────────────────────────────────────────────
  {
    id: 'candle-prosperity',
    category: 'candle',
    name: 'Prosperity Soy Candle',
    description: 'Hand-poured soy wax candle infused with citrine chips and bergamot essential oil. Burns for 40+ hours.',
    price: null,
    image: '/products/placeholder-candle.jpg',
  },
  {
    id: 'candle-healing',
    category: 'candle',
    name: 'Healing Light Candle',
    description: 'White sage and lavender candle to purify spaces and invite tranquil, healing energy into your home.',
    price: null,
    image: '/products/placeholder-candle.jpg',
  },
  {
    id: 'candle-manifestation',
    category: 'candle',
    name: 'Manifestation Ritual Candle',
    description: 'Gold-dusted candle blended with frankincense and myrrh. Use during moon rituals and intention setting.',
    price: null,
    image: '/products/placeholder-candle.jpg',
  },

  // ── Crystals ──────────────────────────────────────────────
  {
    id: 'crystal-clear-quartz',
    category: 'crystals',
    name: 'Clear Quartz Point',
    description: 'The master healer crystal. Amplifies intentions, clears mental fog and raises the vibration of any space.',
    price: null,
    image: '/products/placeholder-crystal.jpg',
  },
  {
    id: 'crystal-rose-quartz',
    category: 'crystals',
    name: 'Rose Quartz Heart',
    description: 'The stone of unconditional love. Promotes self-love, compassion and emotional healing.',
    price: null,
    image: '/products/placeholder-crystal.jpg',
  },
  {
    id: 'crystal-black-tourmaline',
    category: 'crystals',
    name: 'Black Tourmaline Raw',
    description: 'Powerful protection stone that creates an energetic shield against negativity, stress and EMF.',
    price: null,
    image: '/products/placeholder-crystal.jpg',
  },
  {
    id: 'crystal-citrine',
    category: 'crystals',
    name: 'Citrine Tumble',
    description: 'The stone of abundance and joy. Place on your desk or cash box to attract success and prosperity.',
    price: null,
    image: '/products/placeholder-crystal.jpg',
  },
];
