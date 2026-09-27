export const servicesCatalog = {
  version: 1,
  updatedAt: "2026-09-24",
  categories: [
    {
      id: "numerology",
      title: "Numerologist",
      summary: "Clarity in career, relationships, business, health or personal growth.",
      icon: "hash",
      consultationType: "numerology",
      services: [
        { id: "num-overall", title: "Overall Numerology Analysis", description: "Comprehensive analysis of your life path.", keywords: [] },
        { id: "num-relationship", title: "Relationship Compatibility Analysis", description: "Compatibility for relationships and marriage.", keywords: [] },
        { id: "num-business", title: "Business Partnership Compatibility Analysis", description: "Ensure harmony in business partnerships.", keywords: [] },
        { id: "num-launch", title: "Business Launch Date Analysis", description: "Find the most auspicious date to launch your business.", keywords: [] },
        { id: "num-name", title: "Name Correction", description: "For a fulfilling life.", keywords: [] },
        { id: "num-baby", title: "New Born Baby Naming", description: "Auspicious naming for your newborn.", keywords: ["New Born Baby Name"] },
        { id: "num-lucky", title: "Lucky Numbers, colors, dates, days and year", description: "Your personalized lucky elements.", keywords: [] },
        { id: "num-business-name", title: "Business Name Analysis", description: "Analyzing the vibration of your business name.", keywords: [] },
        { id: "num-mobile", title: "Lucky Mobile Number", description: "Find a mobile number that attracts success.", keywords: [] },
        { id: "num-career", title: "Career and Profession Guidance", description: "Clarity on your professional path.", keywords: [] },
        { id: "num-health", title: "Health and well being", description: "Guidance on well-being and health trends.", keywords: [] },
      ]
    },
    {
      id: "vastu",
      title: "Vastu Consultant",
      summary: "Harmonizing spaces for prosperity and peace.",
      icon: "compass",
      consultationType: "vastu-residential",
      services: [
        { id: "vastu-residential", title: "Residential Vastu", description: "Vastu for homes and residential spaces.", keywords: [], requiresProperty: true },
        { id: "vastu-commercial", title: "Commercial Vastu", description: "Shops, restaurants, showrooms, customer attraction zone, sales optimization.", keywords: [], requiresProperty: true },
        { id: "vastu-corporate", title: "Corporate Vastu", description: "Offices, CEO cabin, departments, team placement, space purification.", keywords: [], requiresProperty: true },
        { id: "vastu-industrial", title: "Industrial Vastu", description: "Factories, manufacturing units, machinery placement and production flow, utilities and efficiency.", keywords: ["factory", "manufacturing", "machinery"], requiresProperty: true },
      ]
    },
    {
      id: "tarot",
      title: "Tarot Reader",
      summary: "Insights and guidance through Tarot.",
      icon: "sparkles",
      consultationType: "tarot",
      services: [
        { id: "tarot-readings", title: "Tarot Card Readings", description: "General tarot card readings.", keywords: [] },
        { id: "tarot-love", title: "Love and Relationship Guidance", description: "Guidance on your love life and relationships.", keywords: [] },
        { id: "tarot-career", title: "Career and Finance Guidance", description: "Insights into your career and financial path.", keywords: [] },
        { id: "tarot-life-purpose", title: "Life Purpose and Direction", description: "Finding your true life purpose.", keywords: [] },
        { id: "tarot-year-ahead", title: "Year Ahead and Monthly Predictions", description: "Predictions for the upcoming year and months.", keywords: [] },
        { id: "tarot-remedies", title: "Remedies and Spiritual Guidance", description: "Spiritual guidance and practical remedies.", keywords: [] },
      ]
    },
    {
      id: "counsellor",
      title: "Counsellor",
      summary: "Emotional support and personal growth.",
      icon: "heart-handshake",
      consultationType: "counselling",
      services: [
        { id: "counsel-emotional", title: "Emotional Healing and Support", description: "Support for emotional healing.", keywords: [] },
        { id: "counsel-relationship", title: "Relationship Counselling", description: "Counselling for relationship issues.", keywords: [] },
        { id: "counsel-life-coach", title: "Life Coaching", description: "Coaching to achieve your life goals.", keywords: [] },
        { id: "counsel-personal", title: "Personal Growth and Self Awareness", description: "Enhancing self-awareness and personal growth.", keywords: [] },
      ]
    },
    {
      id: "corporate-trainer",
      title: "Corporate Trainer",
      summary: "Empowering teams and organizations.",
      icon: "presentation",
      consultationType: "corporate-training",
      services: [
        { id: "corp-leadership", title: "Leadership and Team Development", description: "Developing strong leadership and effective teams.", keywords: [] },
        { id: "corp-communication", title: "Communication and Soft Skills", description: "Improving workplace communication and soft skills.", keywords: [] },
        { id: "corp-goal", title: "Goal Setting and Productivity", description: "Strategies for goal setting and increasing productivity.", keywords: [] },
        { id: "corp-wellness", title: "Workplace Wellness Programs", description: "Programs to enhance employee well-being.", keywords: [] },
      ]
    },
    {
      id: "stress-anxiety",
      title: "Stress and Anxiety Management Specialist",
      summary: "Techniques for peace and emotional balance.",
      icon: "brain-circuit",
      consultationType: "stress-anxiety",
      services: [
        { id: "stress-management", title: "Stress Management Techniques", description: "Practical techniques to manage daily stress.", keywords: [] },
        { id: "anxiety-support", title: "Anxiety and Overthinking Support", description: "Support for anxiety and overthinking.", keywords: [] },
        { id: "mindfulness", title: "Mindfulness and Relaxation Training", description: "Training in mindfulness and relaxation.", keywords: [] },
        { id: "emotional-balance", title: "Emotional Balance and Peace", description: "Achieving inner peace and emotional balance.", keywords: [] },
      ]
    },
    {
      id: "sound-healer",
      title: "Sound Healer",
      summary: "Healing through sound therapy.",
      icon: "music",
      consultationType: "sound-healing",
      services: [
        { id: "sound-therapy", title: "Sound Therapy", description: "Therapeutic use of sound.", keywords: [] },
        { id: "sound-healing", title: "Sound Healing", description: "Healing using sound frequencies.", keywords: [] },
      ]
    }
  ]
};
