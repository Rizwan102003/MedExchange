import { User, Listing, Category } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-123-4567',
    location: 'New York, NY',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '555-987-6543',
    location: 'Los Angeles, CA',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
];

export const mockCategories: Category[] = [
  { id: 'cat-1', name: 'Mobility', icon: 'wheelchair' },
  { id: 'cat-2', name: 'Orthopedic', icon: 'bone' },
  { id: 'cat-3', name: 'Respiratory', icon: 'lungs' },
  { id: 'cat-4', name: 'Daily Living', icon: 'helping-hand' },
  { id: 'cat-5', name: 'Medical Furniture', icon: 'bed' },
  { id: 'cat-6', name: 'Monitoring', icon: 'activity' },
];

export const mockListings: Listing[] = [
  // Mobility Category
  {
    id: 'listing-1',
    title: 'Wheelchair - Folding',
    description: 'Lightly used wheelchair in excellent condition. Folds easily for transport and storage. No damage or wear.',
    price: 120,
    images: [
      'https://images.pexels.com/photos/3771060/pexels-photo-3771060.jpeg',
      'https://images.pexels.com/photos/4226893/pexels-photo-4226893.jpeg',
    ],
    condition: 'Good',
    category: 'Mobility',
    location: 'Boston, MA',
    createdAt: '2025-04-01T14:32:00Z',
    seller: mockUsers[0],
    featured: true,
  },
  {
    id: 'listing-7',
    title: 'Walker with Seat',
    description: 'Folding walker with built-in seat. Includes basket for carrying items. Very stable and in excellent condition.',
    price: 65,
    images: [
      'https://images.pexels.com/photos/7108418/pexels-photo-7108418.jpeg',
    ],
    condition: 'Good',
    category: 'Mobility',
    location: 'Portland, OR',
    createdAt: '2025-04-05T10:45:00Z',
    seller: mockUsers[0],
  },
  {
    id: 'listing-9',
    title: 'Electric Mobility Scooter',
    description: 'Pride Mobility Victory 10 4-wheel scooter. Range up to 15 miles. Includes battery charger and basket.',
    price: 899,
    images: [
      'https://images.pexels.com/photos/8460158/pexels-photo-8460158.jpeg',
    ],
    condition: 'Like New',
    category: 'Mobility',
    location: 'Seattle, WA',
    createdAt: '2025-04-06T09:15:00Z',
    seller: mockUsers[1],
  },

  // Orthopedic Category
  {
    id: 'listing-2',
    title: 'Knee Brace - Size Large',
    description: 'Athletic knee brace, provides excellent support. Used for 3 months post-surgery, now no longer needed.',
    price: 45,
    images: [
      'https://images.pexels.com/photos/4226767/pexels-photo-4226767.jpeg',
    ],
    condition: 'Like New',
    category: 'Orthopedic',
    location: 'Chicago, IL',
    createdAt: '2025-04-02T10:15:00Z',
    seller: mockUsers[1],
  },
  {
    id: 'listing-8',
    title: 'Back Brace - Medium',
    description: 'Lumbar support back brace. Adjustable straps for comfortable fit. Provides excellent support for lower back.',
    price: 25,
    images: [
      'https://images.pexels.com/photos/4225920/pexels-photo-4225920.jpeg',
    ],
    condition: 'Good',
    category: 'Orthopedic',
    location: 'Austin, TX',
    createdAt: '2025-04-05T16:20:00Z',
    seller: mockUsers[1],
  },
  {
    id: 'listing-10',
    title: 'Ankle Support Brace',
    description: 'Professional grade ankle brace with adjustable straps. Perfect for sports or recovery.',
    price: 35,
    images: [
      'https://images.pexels.com/photos/4047186/pexels-photo-4047186.jpeg',
    ],
    condition: 'New',
    category: 'Orthopedic',
    location: 'Miami, FL',
    createdAt: '2025-04-06T11:30:00Z',
    seller: mockUsers[0],
  },

  // Medical Furniture Category
  {
    id: 'listing-3',
    title: 'Electric Hospital Bed',
    description: 'Full electric hospital bed with remote control. Adjustable head and foot positions. Includes mattress. 2 years old, excellent condition.',
    price: 850,
    images: [
      'https://images.pexels.com/photos/3376799/pexels-photo-3376799.jpeg',
      'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg',
    ],
    condition: 'Good',
    category: 'Medical Furniture',
    location: 'Miami, FL',
    createdAt: '2025-04-02T16:45:00Z',
    seller: mockUsers[0],
  },
  {
    id: 'listing-11',
    title: 'Overbed Table',
    description: 'Adjustable height overbed table with tilting top. Perfect for eating or working in bed.',
    price: 45,
    images: [
      'https://images.pexels.com/photos/3845731/pexels-photo-3845731.jpeg',
    ],
    condition: 'Good',
    category: 'Medical Furniture',
    location: 'Houston, TX',
    createdAt: '2025-04-06T14:20:00Z',
    seller: mockUsers[1],
  },
  {
    id: 'listing-12',
    title: 'Patient Lift Chair',
    description: 'Electric lift chair with multiple positions. Helps with standing up. Clean and well-maintained.',
    price: 425,
    images: [
      'https://images.pexels.com/photos/3771115/pexels-photo-3771115.jpeg',
    ],
    condition: 'Good',
    category: 'Medical Furniture',
    location: 'Denver, CO',
    createdAt: '2025-04-06T16:45:00Z',
    seller: mockUsers[0],
  },

  // Respiratory Category
  {
    id: 'listing-4',
    title: 'Portable Oxygen Concentrator',
    description: 'Inogen One G3 portable oxygen concentrator. Battery life up to 4 hours. Includes carrying case and extra battery.',
    price: 1200,
    images: [
      'https://images.pexels.com/photos/3957987/pexels-photo-3957987.jpeg',
    ],
    condition: 'Good',
    category: 'Respiratory',
    location: 'Phoenix, AZ',
    createdAt: '2025-04-03T09:20:00Z',
    seller: mockUsers[1],
    featured: true,
  },
  {
    id: 'listing-13',
    title: 'CPAP Machine',
    description: 'ResMed AirSense 10 CPAP machine. Includes humidifier and heated tube. Low hours of use.',
    price: 550,
    images: [
      'https://images.pexels.com/photos/3845741/pexels-photo-3845741.jpeg',
    ],
    condition: 'Like New',
    category: 'Respiratory',
    location: 'San Diego, CA',
    createdAt: '2025-04-07T08:30:00Z',
    seller: mockUsers[0],
  },
  {
    id: 'listing-14',
    title: 'Nebulizer System',
    description: 'Compact nebulizer system for respiratory medication delivery. Includes adult and pediatric masks.',
    price: 40,
    images: [
      'https://images.pexels.com/photos/3846022/pexels-photo-3846022.jpeg',
    ],
    condition: 'Good',
    category: 'Respiratory',
    location: 'Las Vegas, NV',
    createdAt: '2025-04-07T10:15:00Z',
    seller: mockUsers[1],
  },

  // Monitoring Category
  {
    id: 'listing-5',
    title: 'Digital Blood Pressure Monitor',
    description: 'Omron digital blood pressure monitor. Accurate and easy to use. Includes storage case.',
    price: 35,
    images: [
      'https://images.pexels.com/photos/4226215/pexels-photo-4226215.jpeg',
    ],
    condition: 'Like New',
    category: 'Monitoring',
    location: 'Seattle, WA',
    createdAt: '2025-04-03T11:10:00Z',
    seller: mockUsers[0],
  },
  {
    id: 'listing-15',
    title: 'Pulse Oximeter',
    description: 'Fingertip pulse oximeter with LED display. Measures oxygen saturation and pulse rate.',
    price: 25,
    images: [
      'https://images.pexels.com/photos/4226219/pexels-photo-4226219.jpeg',
    ],
    condition: 'New',
    category: 'Monitoring',
    location: 'Portland, OR',
    createdAt: '2025-04-07T13:45:00Z',
    seller: mockUsers[1],
  },
  {
    id: 'listing-16',
    title: 'Glucose Monitoring System',
    description: 'Complete diabetes monitoring kit. Includes meter, test strips, and carrying case.',
    price: 65,
    images: [
      'https://images.pexels.com/photos/4226227/pexels-photo-4226227.jpeg',
    ],
    condition: 'Good',
    category: 'Monitoring',
    location: 'Chicago, IL',
    createdAt: '2025-04-07T15:30:00Z',
    seller: mockUsers[0],
  },

  // Daily Living Category
  {
    id: 'listing-6',
    title: 'Shower Chair',
    description: 'Adjustable shower chair with back support. Non-slip feet. Makes bathing safer for those with mobility issues.',
    price: 40,
    images: [
      'https://images.pexels.com/photos/3952040/pexels-photo-3952040.jpeg',
    ],
    condition: 'Good',
    category: 'Daily Living',
    location: 'Denver, CO',
    createdAt: '2025-04-04T14:30:00Z',
    seller: mockUsers[1],
  },
  {
    id: 'listing-17',
    title: 'Toilet Safety Frame',
    description: 'Adjustable width toilet safety rails. Easy installation, no tools required.',
    price: 35,
    images: [
      'https://images.pexels.com/photos/3952042/pexels-photo-3952042.jpeg',
    ],
    condition: 'Like New',
    category: 'Daily Living',
    location: 'Boston, MA',
    createdAt: '2025-04-08T09:20:00Z',
    seller: mockUsers[0],
  },
  {
    id: 'listing-18',
    title: 'Reacher Grabber Tool',
    description: 'Lightweight reaching aid with magnetic tip. Extends reach by 32 inches.',
    price: 15,
    images: [
      'https://images.pexels.com/photos/3952044/pexels-photo-3952044.jpeg',
    ],
    condition: 'New',
    category: 'Daily Living',
    location: 'Austin, TX',
    createdAt: '2025-04-08T11:45:00Z',
    seller: mockUsers[1],
  },
];