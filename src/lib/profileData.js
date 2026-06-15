export const profileData = {
  name: "Oscar Senior",
  location: "United Kingdom",
  bio: "Penetration tester and red team operator. Specialized in offensive security, command & control operations, and post-exploitation techniques. Completed Red Teaming, Jr Penetration Tester, and Pre Security pathways on TryHackMe.",
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
    "Offensive Security": [
      "Penetration Testing",
      "Red Team Operations",
      "Exploit Development",
      "Social Engineering",
    ],
    "Post-Exploitation": [
      "C2 Operations",
      "Lateral Movement",
      "Privilege Escalation",
      "Evasion Techniques",
      "Persistence Mechanisms",
      "Data Exfiltration",
    ],
    "Systems & Infrastructure": [
      "Linux Security",
      "Windows Security",
      "Active Directory",
      "Network Reconnaissance",
      "Vulnerability Assessment",
    ],
    "Core Technical": [
      "Bash/Shell Scripting",
      "Python",
      "HTTP/DNS Protocols",
      "Network Fundamentals",
      "Web Application Security",
      "Reverse Engineering",
    ],
  },

  capabilities: [
    "Active Network Reconnaissance & Mapping",
    "Vulnerability Discovery & Exploitation",
    "Post-Exploitation & Persistence",
    "Lateral Movement & Privilege Escalation",
    "Command & Control Infrastructure Setup",
    "Evasion & Anti-Forensics Techniques",
    "Red Team Campaign Planning",
    "Security Assessment & Reporting",
  ],

  sections: [
    { number: "01", name: "PROFILE", id: "bio" },
    { number: "02", name: "CAPABILITIES", id: "arsenal" },
    { number: "03", name: "CREDENTIALS", id: "achievements" },
  ],
};
