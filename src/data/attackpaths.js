export const attackPaths = [
  {
    id: 1,
    path: [
      "Internet-Exposed VM",
      "Compromised IAM Role",
      "Privilege Escalation",
      "Full Admin Access"
    ],
    risk: "Critical",
    description:
      "An exposed VM can be used to access an IAM role, leading to privilege escalation and full admin control."
  }
];