export const ACRONYMS = {
  'NIST': 'National Institute of Standards and Technology',
  'CSF': 'Cybersecurity Framework (NIST)',
  'CISO': 'Chief Information Security Officer',
  'SOC': 'Security Operations Center',
  'SIEM': 'Security Information and Event Management',
  'CIRP': 'Cyber Incident Response Procedure',
  'CINC': 'Cybersecurity Incident (record)',
  'DFIR': 'Digital Forensics and Incident Response',
  'CTI': 'Cyber Threat Intelligence',
  'TLP': 'Traffic Light Protocol (FIRST.org)',
  'ISAC': 'Information Sharing and Analysis Center',
  'GRC': 'Governance, Risk, and Compliance',
  'TPRM': 'Third-Party Risk Management',
  'IAM': 'Identity and Access Management',
  'AppSec': 'Application Security',
  'SOAR': 'Security Orchestration, Automation, and Response',
  'EDR': 'Endpoint Detection and Response',
  'EPP': 'Endpoint Protection Platform',
  'WAF': 'Web Application Firewall',
  'PAM': 'Privileged Access Management',
  'IDS': 'Intrusion Detection System',
  'IPS': 'Intrusion Prevention System',
  'DLP': 'Data Loss/Leakage Prevention',
  'DPO': 'Data Privacy Officer',
  'MECE': 'Mutually Exclusive, Collectively Exhaustive',
  'TTP': 'Tactics, Techniques, and Procedures',
  'IOC': 'Indicator of Compromise',
  'OPSEC': 'Operational Security',
  'OSINT': 'Open Source Intelligence',
  'MTTD': 'Mean Time to Detect',
  'MTTR': 'Mean Time to Respond',
  'MTTC': 'Mean Time to Contain',
  'RISO': 'Regional Information Security Officer',
  'BISO': 'Business Information Security Officer',
  'IIA': 'Institute of Internal Auditors',
  'BEC': 'Business Email Compromise',
  'BES': 'Business Email Spoofing',
  'VEC': 'Vendor Email Compromise',
  'ATO': 'Account Takeover',
  'PII': 'Personally Identifiable Information',
  'PHI': 'Protected Health Information',
  'MNPI': 'Material Non-Public Information',
  'RBAC': 'Role-Based Access Control',
  'DAC': 'Discretionary Access Control',
  'MAC': 'Mandatory Access Control',
  'HSM': 'Hardware Security Module',
  'SQLi': 'SQL Injection',
  'ASM': 'Attack Surface Management',
  'UDRP': 'Uniform Domain-Name Dispute-Resolution Policy',
  'VDP': 'Vulnerability Disclosure Program',
  'RPZ': 'Response Policy Zone (DNS blocking)',
  'DDW': 'Deep and Dark Web',
  'FQDN': 'Fully Qualified Domain Name',
  'pDNS': 'Passive DNS',
  'TLD': 'Top-Level Domain',
  'TIP': 'Threat Intelligence Platform',
  'STIX': 'Structured Threat Information Expression (standard)',
  'TAXII': 'Trusted Automated eXchange of Intelligence Information',
  'YARA': 'Pattern-matching language for malware identification',
  'MSSP': 'Managed Security Service Provider',
  'NAC': 'Network Access Control',
  'XDR': 'Extended Detection and Response',
  'ISMS': 'Information Security Management System',
  'COBIT': 'Control Objectives for Information Technologies (ISACA)',
  'ITIL': 'Information Technology Infrastructure Library',
  'WEF': 'Windows Event Forwarding',
  'UCE': 'Unsolicited Commercial Email (spam)',
  'C2': 'Command and Control (attacker infrastructure)',
  'CRO': 'Chief Risk Officer',
  'GC': 'General Counsel',
  'CVE': 'Common Vulnerabilities and Exposures',
  'CIA': 'Confidentiality, Integrity, Availability (security triad)',
  'OINC': 'Operational Incident (record)',
  'OIRP': 'Operational Incident Response Procedure',
  'APT': 'Advanced Persistent Threat',
  'NetFlow': 'Network traffic metadata standard (IP flow records)',
  'WHOIS': 'Domain registrant lookup protocol',
};

export function injectAcronymTooltips() {
  const tooltip = document.getElementById('acro-tooltip');
  const ttTerm = document.getElementById('tt-term');
  const ttDef = document.getElementById('tt-def');

  if (!tooltip || !ttTerm || !ttDef) return;

  document.addEventListener('mousemove', (e) => {
    if (tooltip.classList.contains('visible')) {
      let x = e.clientX + 14;
      let y = e.clientY - 10;
      if (x + 340 > window.innerWidth) x = e.clientX - 344;
      if (y < 10) y = e.clientY + 20;
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
    }
  });

  const container = document.querySelector('.main-content') || document.querySelector('.container');
  if (!container) return;

  const sortedKeys = Object.keys(ACRONYMS).sort((a, b) => b.length - a.length);
  const escaped = sortedKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp('(?<![\\w&])(' + escaped.join('|') + ')(?![\\w&])', 'g');

  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName.toUpperCase();
        if (['SCRIPT', 'STYLE', 'ABBR', 'A', 'INPUT', 'BUTTON'].includes(tag)) return NodeFilter.FILTER_REJECT;
        if (parent.classList && parent.classList.contains('g-term')) return NodeFilter.FILTER_REJECT;
        if (parent.classList && parent.classList.contains('def-term')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const nodes = [];
  let node;
  while ((node = walker.nextNode())) nodes.push(node);

  nodes.forEach(textNode => {
    if (!pattern.test(textNode.textContent)) return;
    pattern.lastIndex = 0;

    const frag = document.createDocumentFragment();
    let lastIndex = 0;
    let match;
    const text = textNode.textContent;

    while ((match = pattern.exec(text)) !== null) {
      const term = match[1];
      if (!ACRONYMS[term]) continue;

      if (match.index > lastIndex) {
        frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }

      const abbr = document.createElement('abbr');
      abbr.className = 'acro';
      abbr.setAttribute('data-term', term);
      abbr.setAttribute('data-def', ACRONYMS[term]);
      abbr.textContent = term;

      abbr.addEventListener('mouseenter', (e) => {
        ttTerm.textContent = e.target.getAttribute('data-term');
        ttDef.textContent = e.target.getAttribute('data-def');
        tooltip.classList.add('visible');
      });
      abbr.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));

      frag.appendChild(abbr);
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      frag.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    if (frag.childNodes.length > 0) {
      textNode.parentNode.replaceChild(frag, textNode);
    }
  });
}
