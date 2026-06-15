export const profileData = {
  name: "Oscar Senior",
  location: "United Kingdom",
  bio: "Penetration tester and red team operator. Completed Red Teaming, Jr Penetration Tester, and Pre Security pathways on TryHackMe.",
  status: "ACTIVE",
  
  tryhackme: {
    username: "Oscar.Senior",
    profileUrl: "https://tryhackme.com/p/Oscar.Senior",
    rank: "#45,295",
    tier: "MASTER",
    tierBadge: "0xB",
    rooms: 156,
    badges: 22,
    streak: 0,
  },

  pathways: [
    {
      name: "Red Teaming",
      completed: "Dec 18, 2024",
      icon: "Zap",
    },
    {
      name: "Jr Penetration Tester",
      completed: "Oct 28, 2024",
      icon: "Shield",
    },
    {
      name: "Pre Security",
      completed: "Sep 30, 2024",
      icon: "Lock",
    },
  ],

  achievements: [
    {
      name: "Red Teaming Path",
      fullName: "Red Teaming Pathway Complete",
      issuer: "TryHackMe",
      icon: "Zap",
      earned: "Dec 18, 2024",
      category: "Learning Paths",
    },
    {
      name: "Jr Penetration Tester",
      fullName: "Junior Penetration Tester Pathway Complete",
      issuer: "TryHackMe",
      icon: "Shield",
      earned: "Oct 28, 2024",
      category: "Learning Paths",
    },
    {
      name: "Pre Security",
      fullName: "Pre Security Pathway Complete",
      issuer: "TryHackMe",
      icon: "Lock",
      earned: "Sep 30, 2024",
      category: "Learning Paths",
    },
  ],

  skills: {
    "Red Team": [
      "C2 Operations",
      "Lateral Movement",
      "Privilege Escalation",
      "Evasion Techniques",
    ],
    "Core": [
      "Linux",
      "Bash",
      "HTTP/DNS",
      "Web Security",
      "Network Fundamentals",
    ],
  },

  sections: [
    { number: "01", name: "BIO", id: "bio" },
    { number: "02", name: "ARSENAL", id: "arsenal" },
    { number: "03", name: "ACHIEVEMENTS", id: "achievements" },
  ],
};
