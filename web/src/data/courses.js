export const courses = [
    {
        id: 1,
        title: 'Bitcoin Fundamentals',
        description: 'Master the basics of Bitcoin, blockchain technology, and how cryptocurrency transactions work.',
        level: 'Beginner',
        duration: '4 weeks',
        students: '12,345',
        rating: '4.8',
        icon: '₿',
        price: 'Free',
        instructor: 'John Doe',
        topics: [
            'Introduction to Bitcoin',
            'Blockchain Technology',
            'Bitcoin Mining',
            'Wallet Security',
            'Transaction Process'
        ],
        longDescription: 'This comprehensive course will teach you everything you need to know about Bitcoin from the ground up. You\'ll learn about the history of Bitcoin, how blockchain technology works, and how to safely store and transact with cryptocurrency.'
    },
    {
        id: 2,
        title: 'Ethereum & Smart Contracts',
        description: 'Learn how to build decentralized applications (DApps) on the Ethereum blockchain using Solidity.',
        level: 'Intermediate',
        duration: '6 weeks',
        students: '8,921',
        rating: '4.7',
        icon: '⧫',
        price: '$99',
        instructor: 'Jane Smith',
        topics: [
            'Ethereum Architecture',
            'Smart Contract Development',
            'Solidity Programming',
            'DApp Development',
            'Web3.js Integration'
        ],
        longDescription: 'Dive deep into Ethereum and learn how to create smart contracts and decentralized applications. This course covers Solidity programming, testing, deployment, and best practices for building on Ethereum.'
    },
    {
        id: 3,
        title: 'Cryptocurrency Trading',
        description: 'Understand market analysis, trading strategies, and risk management in cryptocurrency markets.',
        level: 'Intermediate',
        duration: '5 weeks',
        students: '15,678',
        rating: '4.6',
        icon: '📈',
        price: '$149',
        instructor: 'Mike Johnson',
        topics: [
            'Technical Analysis',
            'Chart Patterns',
            'Trading Strategies',
            'Risk Management',
            'Portfolio Management'
        ],
        longDescription: 'Learn professional cryptocurrency trading techniques, from technical analysis to portfolio management. Understand market psychology and develop strategies for successful trading.'
    },
    {
        id: 4,
        title: 'DeFi Protocols',
        description: 'Explore decentralized finance (DeFi) protocols, yield farming, and liquidity provision.',
        level: 'Advanced',
        duration: '8 weeks',
        students: '5,432',
        rating: '4.9',
        icon: '🏦',
        price: '$199',
        instructor: 'Sarah Williams',
        topics: [
            'DeFi Fundamentals',
            'Yield Farming',
            'Liquidity Pools',
            'DEX Protocols',
            'Risk Assessment'
        ],
        longDescription: 'Master the world of decentralized finance. Learn about lending protocols, yield farming strategies, liquidity provision, and how to navigate the DeFi ecosystem safely.'
    },
    {
        id: 5,
        title: 'NFT Creation & Marketing',
        description: 'Create, mint, and market your own NFTs on various blockchain platforms.',
        level: 'Beginner',
        duration: '3 weeks',
        students: '9,876',
        rating: '4.5',
        icon: '🎨',
        price: '$79',
        instructor: 'Alex Chen',
        topics: [
            'NFT Basics',
            'Creating Digital Art',
            'Minting Process',
            'Marketing Strategies',
            'Community Building'
        ],
        longDescription: 'Learn how to create and sell NFTs. This course covers the entire process from creating digital assets to minting and marketing your NFT collection.'
    },
    {
        id: 6,
        title: 'Blockchain Security',
        description: 'Learn about cryptocurrency security, wallet protection, and common attack vectors.',
        level: 'Advanced',
        duration: '6 weeks',
        students: '6,543',
        rating: '4.8',
        icon: '🔒',
        price: '$179',
        instructor: 'David Lee',
        topics: [
            'Cryptography Basics',
            'Wallet Security',
            'Common Attacks',
            'Security Best Practices',
            'Smart Contract Auditing'
        ],
        longDescription: 'Understand the security aspects of blockchain technology. Learn how to protect your assets, identify vulnerabilities, and implement security best practices.'
    }
]

export const featuredCourses = courses.slice(0, 3)
