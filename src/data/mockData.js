export const mockProperties = [
  {
    id: '1',
    name: 'Sunset Residences',
    location: '123 Marina Blvd, San Francisco, CA',
    description: 'Waterfront luxury condos with bay views. Prime location near dining and transit. Tokenized ownership with 6.2% annual yield.',
    image: '/img/property1.jpg',
    imageFallback: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=260&fit=crop',
    totalTokens: 10000,
    pricePerToken: 150,
    yield: '6.2%',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Downtown Loft Complex',
    location: '456 Main St, Austin, TX',
    description: 'Modern loft units in the heart of Austin. Walkable to offices and nightlife. Strong rental demand and 5.8% yield.',
    image: '/img/property2.jpg',
    imageFallback: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=260&fit=crop',
    totalTokens: 5000,
    pricePerToken: 220,
    yield: '5.8%',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Riverside Heights',
    location: '789 River Rd, Portland, OR',
    description: 'Green-certified apartments with river views. Sustainable design and strong tenant retention.',
    image: '/img/property3.jpg',
    imageFallback: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=260&fit=crop',
    totalTokens: 8000,
    pricePerToken: 180,
    yield: '5.5%',
    status: 'Active',
  },
];

export const mockWallet = {
  address: 'GABC...xyz9',
  balance: '2,450.00',
  currency: 'XLM',
  tokensHeld: [
    { symbol: 'SUNSET', amount: '120', propertyName: 'Sunset Residences' },
    { symbol: 'DOWNTOWN', amount: '50', propertyName: 'Downtown Loft Complex' },
  ],
  connected: true,
};

export const mockTransactions = [
  { id: '1', date: '2025-02-20', action: 'Buy', amount: '15 SUNSET', status: 'Completed' },
  { id: '2', date: '2025-02-19', action: 'Transfer', amount: '5 DOWNTOWN', status: 'Completed' },
  { id: '3', date: '2025-02-18', action: 'Buy', amount: '20 SUNSET', status: 'Completed' },
  { id: '4', date: '2025-02-17', action: 'Dividend', amount: '+12.40 XLM', status: 'Completed' },
  { id: '5', date: '2025-02-16', action: 'Transfer', amount: '10 SUNSET', status: 'Pending' },
];

export const sidebarMenuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'ChartBar' },
  { path: '/dashboard/properties', label: 'Properties', icon: 'Home' },
  { path: '/dashboard/wallet', label: 'Wallet', icon: 'Wallet' },
  { path: '/dashboard/transactions', label: 'Transactions', icon: 'DocumentText' },
];

// Dashboard overview (Stripe Lite)
export const dashboardOverview = {
  totalProperties: 3,
  totalTokensOwned: 420,
  portfolioValue: 89400,
  connectedWallet: 'GABC...xyz9',
};

// Ownership % and total value per property (for chart + property cards)
export const dashboardProperties = [
  {
    id: '1',
    name: 'Dar es Salaam Beach Apartment',
    location: 'Dar es Salaam, Tanzania',
    totalValue: 120000,
    tokenName: 'DARBEACH',
    totalTokens: 1000,
    yourTokenBalance: 500,
    ownershipPercent: 50,
  },
  {
    id: '2',
    name: 'Zanzibar Villa',
    location: 'Zanzibar, Tanzania',
    totalValue: 250000,
    tokenName: 'ZANZIVILLA',
    totalTokens: 500,
    yourTokenBalance: 150,
    ownershipPercent: 30,
  },
  {
    id: '3',
    name: 'Arusha Lodge',
    location: 'Arusha, Tanzania',
    totalValue: 98000,
    tokenName: 'ARULODGE',
    totalTokens: 800,
    yourTokenBalance: 160,
    ownershipPercent: 20,
  },
];

// Chart data: ownership distribution (for pie/bar)
export const ownershipChartData = [
  { label: 'Dar es Salaam Beach Apartment', percent: 50, totalValue: 120000, color: '#635bff' },
  { label: 'Zanzibar Villa', percent: 30, totalValue: 250000, color: '#00d4aa' },
  { label: 'Arusha Lodge', percent: 20, totalValue: 98000, color: '#697386' },
];

// Properties page: full list with type, token, balance, featured, addedDate
export const propertiesPageList = [
  {
    id: '1',
    name: 'Dar es Salaam Beach Apartment',
    location: 'Dar es Salaam, Tanzania',
    type: 'Apartment',
    totalValue: 120000,
    tokenName: 'DARBEACH',
    totalTokens: 1000,
    yourTokenBalance: 500,
    featured: true,
    addedDate: '2025-01-15',
  },
  {
    id: '2',
    name: 'Zanzibar Villa',
    location: 'Zanzibar, Tanzania',
    type: 'Villa',
    totalValue: 250000,
    tokenName: 'ZANZIVILLA',
    totalTokens: 500,
    yourTokenBalance: 150,
    featured: true,
    addedDate: '2025-01-10',
  },
  {
    id: '3',
    name: 'Arusha Lodge',
    location: 'Arusha, Tanzania',
    type: 'Lodge',
    totalValue: 98000,
    tokenName: 'ARULODGE',
    totalTokens: 800,
    yourTokenBalance: 160,
    featured: false,
    addedDate: '2025-02-01',
  },
  {
    id: '4',
    name: 'Sunset Residences',
    location: 'San Francisco, CA',
    type: 'Apartment',
    totalValue: 1500000,
    tokenName: 'SUNSET',
    totalTokens: 10000,
    yourTokenBalance: 120,
    featured: true,
    addedDate: '2024-11-20',
  },
  {
    id: '5',
    name: 'Downtown Loft Complex',
    location: 'Austin, TX',
    type: 'Apartment',
    totalValue: 1100000,
    tokenName: 'DOWNTOWN',
    totalTokens: 5000,
    yourTokenBalance: 50,
    featured: false,
    addedDate: '2024-12-05',
  },
  {
    id: '6',
    name: 'Riverside Heights',
    location: 'Portland, OR',
    type: 'Apartment',
    totalValue: 1440000,
    tokenName: 'RIVER',
    totalTokens: 8000,
    yourTokenBalance: 0,
    featured: false,
    addedDate: '2025-02-10',
  },
];

// Wallet page: overview + token balances + transaction history
export const walletOverview = {
  address: 'GABC4HMQXYZ7EXAMPLE9',
  addressShort: 'GABC...XYZ',
  network: 'Stellar Testnet',
  connected: true,
  portfolioValue: 89400,
  totalTokensOwned: 420,
};

export const walletTokenBalances = [
  { token: 'DARBEACH', property: 'Dar es Salaam Beach Apartment', balance: 500, totalTokens: 1000, value: 60000 },
  { token: 'ZANZIVILLA', property: 'Zanzibar Villa', balance: 150, totalTokens: 500, value: 75000 },
  { token: 'ARULODGE', property: 'Arusha Lodge', balance: 160, totalTokens: 800, value: 19600 },
];

export const walletTransactions = [
  { id: '1', date: '2025-02-20', type: 'Buy', token: 'DARBEACH', amount: '15', status: 'Completed', txHash: 'a1b2c3d4...' },
  { id: '2', date: '2025-02-19', type: 'Transfer', token: 'ZANZIVILLA', amount: '10', status: 'Completed', txHash: 'e5f6g7h8...' },
  { id: '3', date: '2025-02-18', type: 'Buy', token: 'ARULODGE', amount: '20', status: 'Completed', txHash: 'i9j0k1l2...' },
  { id: '4', date: '2025-02-17', type: 'Dividend', token: 'XLM', amount: '+12.40', status: 'Completed', txHash: 'm3n4o5p6...' },
  { id: '5', date: '2025-02-16', type: 'Transfer', token: 'DARBEACH', amount: '5', status: 'Pending', txHash: 'q7r8s9t0...' },
];
