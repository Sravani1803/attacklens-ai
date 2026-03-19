const severities = ["Critical", "High", "Medium"];
const categories = ["Cloud Exposure", "Identity Risk", "Vulnerability", "Misconfiguration"];

const sampleTitles = [
  "Publicly Exposed S3 Bucket",
  "Overprivileged IAM Role",
  "Unpatched Linux Server",
  "Open Security Group (0.0.0.0/0)",
  "Stale Admin Account",
  "Weak Password Policy",
  "Exposed API Endpoint",
  "Unencrypted Storage Volume",
  "Inactive MFA Configuration",
  "Suspicious Login Pattern"
];

export const findings = Array.from({ length: 25 }, (_, i) => {
  const severity = severities[Math.floor(Math.random() * severities.length)];

  const riskScore =
    severity === "Critical"
      ? Math.floor(Math.random() * 10) + 90
      : severity === "High"
      ? Math.floor(Math.random() * 15) + 75
      : Math.floor(Math.random() * 20) + 50;

  return {
    id: i + 1,
    title: sampleTitles[Math.floor(Math.random() * sampleTitles.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    severity,
    asset: `asset-${i + 1}`,
    riskScore,
    mitre: ["T1078", "T1190"],
    summary: "This finding represents a potential attack vector based on exposure and access control weaknesses.",
    remediation: "Apply least privilege, restrict exposure, and enforce security best practices.",
    confidence: ["High", "Medium"][Math.floor(Math.random() * 2)]
  };
});