
const CyberSecurityPie = () => {
    const cyberSecurityData = [
        { 
          mainBranch: 'Cybersecurity Analyst',
          subBranches: [
            { name: 'Threat Detection', description: 'Learn methods for identifying and analyzing potential security threats and vulnerabilities.', resources: ['Introduction to Threat Detection', 'Network Intrusion Detection'] },
            { name: 'Incident Response', description: 'Understand how to respond to and mitigate security incidents, including containment and recovery strategies.', resources: ['Incident Response Planning', 'Security Incident Handling'] },
            { name: 'Vulnerability Assessment', description: 'Study techniques for assessing and prioritizing vulnerabilities within systems and networks.', resources: ['Vulnerability Assessment Process', 'Penetration Testing'] },
            { name: 'Security Monitoring', description: 'Explore continuous monitoring of networks and systems to ensure timely threat identification.', resources: ['Security Information and Event Management (SIEM)', 'Security Monitoring Tools'] }
          ],
          color: '#17a2b8',
          description: 'Cybersecurity Analysts monitor and respond to security threats, assess vulnerabilities, and implement strategies to safeguard systems and data.',
          resources: ['Resource 1 for Cybersecurity', 'Resource 2 for Cybersecurity']
        },
        { 
          mainBranch: 'Ethical Hacker',
          subBranches: [
            { name: 'Penetration Testing', description: 'Learn techniques for simulating cyber attacks to identify vulnerabilities and weaknesses.', resources: ['Introduction to Penetration Testing', 'Certified Ethical Hacker (CEH) Training'] },
            { name: 'Web Application Security', description: 'Study security practices for identifying and mitigating vulnerabilities in web applications.', resources: ['Web Application Security Fundamentals', 'OWASP Top Ten'] },
            { name: 'Wireless Network Security', description: 'Understand security measures to protect wireless networks and prevent unauthorized access.', resources: ['Wireless Network Security Best Practices', 'Wi-Fi Hacking Prevention'] },
            { name: 'Social Engineering', description: 'Explore psychological manipulation techniques used in hacking attacks and strategies to counter them.', resources: ['Social Engineering Awareness', 'Phishing Prevention'] }
          ],
          color: '#17a2b8',
          description: 'Ethical Hackers identify and exploit vulnerabilities in systems and networks to strengthen cybersecurity defenses and prevent malicious attacks.',
          resources: ['Resource 1 for Ethical Hacking', 'Resource 2 for Ethical Hacking']
        },
        { 
          mainBranch: 'Security Architect',
          subBranches: [
            { name: 'Security Design', description: 'Learn principles and practices for designing secure systems, networks, and applications.', resources: ['Security Architecture Fundamentals', 'Secure System Design'] },
            { name: 'Security Policies', description: 'Understand the creation and enforcement of security policies and procedures for organizations.', resources: ['Security Policy Development', 'Policy Enforcement Techniques'] },
            { name: 'Risk Assessment', description: 'Study methods for identifying, assessing, and managing security risks within an organization.', resources: ['Risk Management in Cybersecurity', 'Security Risk Assessment Tools'] },
            { name: 'Compliance and Regulations', description: 'Explore industry regulations and compliance standards related to cybersecurity.', resources: ['Cybersecurity Compliance Frameworks', 'GDPR and Data Protection'] }
          ],
          color: '#17a2b8',
          description: 'Security Architects design and implement security solutions, create security policies, and ensure compliance with industry standards and regulations.',
          resources: ['Resource 1 for Security Architecture', 'Resource 2 for Security Architecture']
        },
        { 
          mainBranch: 'Cybersecurity Consultant',
          subBranches: [
            { name: 'Security Auditing', description: 'Learn methods for conducting security audits to evaluate an organization\'s security posture.', resources: ['Security Audit Process', 'Security Audit Tools'] },
            { name: 'Incident Response Planning', description: 'Study strategies for helping organizations develop effective incident response plans.', resources: ['Incident Response Planning Best Practices', 'Creating Incident Response Playbooks'] },
            { name: 'Security Training and Education', description: 'Explore ways to educate and train employees on cybersecurity best practices.', resources: ['Cybersecurity Awareness Training', 'Employee Security Education'] },
            { name: 'Vendor Risk Management', description: 'Understand how to assess and manage security risks associated with third-party vendors.', resources: ['Vendor Risk Assessment Frameworks', 'Managing Third-Party Risks'] }
          ],
          color: '#17a2b8',
          description: 'Cybersecurity Consultants provide expertise to organizations in assessing security risks, developing incident response plans, and implementing security measures.',
          resources: ['Resource 1 for Cybersecurity Consulting', 'Resource 2 for Cybersecurity Consulting']
        },
        // Add more cybersecurity career branches here...
    ];
  
    // Rest of the code remains the same as before (convert data to Plotly format and create the sunburst chart).
    // ...
      // Convert the data to the required format for Plotly sunburst chart
      const labels = [];
      const parents = [];
      const values = [];
    
      cyberSecurityData.forEach(mainBranchData => {
        labels.push(mainBranchData.mainBranch);
        parents.push("");
        values.push(mainBranchData.subBranches.length);
      
        mainBranchData.subBranches.forEach(subBranch => {
          labels.push(subBranch.name);
          parents.push(mainBranchData.mainBranch);
          values.push(1);
        });
      });
  
      // Create an array of colors to cycle through
      const colors = ['#6f42c1', '#17a2b8', '#e83e8c', '#fd7e14'];
  
      // Create a mapping of parent values to colors
      const parentToColor = {};
      parents.forEach((parent) => {
      if (!parentToColor.hasOwnProperty(parent)) {
          parentToColor[parent] = colors[Object.keys(parentToColor).length % colors.length];
      }
      });
  
      // Get the colors for each parent in the sunburst chart
      const colorsCycled = parents.map(parent => parentToColor[parent]);
  
      const plotlyData = [{
        type: "sunburst",
        labels: labels,
        parents: parents,
        values: values,
        outsidetextfont: { size: 20, color: "white" },
        leaf: { opacity: 0.5 },
        marker: { line: { width: 2 }, colors:colorsCycled,
        hoverinfo: 'label', // Show label on hover
      },
        textposition: 'inside',
        insidetextorientation: 'radial',
        color:'white'
      }];
  
      const layoutGame = {
        margin: { l: 0, r: 0, b: 0, t: 0 },
        width: 500,
        height: 500
      };
  
      Plotly.newPlot('cyberchart', plotlyData, layoutGame);
   
      /* this section deals with making the chart interactive */
      document.getElementById('cyberchart').on('plotly_click', event => {
        if (event.points && event.points.length > 0) {
          const point = event.points[0];
          const selectedLabel = point.label;
      
          // Find the data for the clicked item (main branch or submodule)
          const selectedItem = cyberSecurityData.find(item => item.mainBranch === selectedLabel || item.subBranches.some(sub => sub.name === selectedLabel));
          let selectedSubmodule;
      
          // Update the information div with the information
          if (selectedItem) {
            if (selectedItem.mainBranch == selectedLabel) {
              document.getElementById('cybertitle').textContent = selectedItem.mainBranch;
              document.getElementById('cyberdesc').textContent = selectedItem.description || '';
              const resourcesList = document.getElementById('cyberresources');
              resourcesList.innerHTML = selectedItem.resources ? selectedItem.resources.map(resource => `<li>${resource}</li>`).join('') : '';
            } else {
              selectedSubmodule = selectedItem.subBranches.find(sub => sub.name === selectedLabel);
              if (selectedSubmodule) {
                document.getElementById('cybertitle').textContent = selectedSubmodule.name;
                document.getElementById('cyberdesc').textContent = selectedSubmodule.description || '';
                const resourcesList = document.getElementById('cyberresources');
                resourcesList.innerHTML = selectedSubmodule.resources ? selectedSubmodule.resources.map(resource => `<li>${resource}</li>`).join('') : '';
              }
            }
          }
        }
      });
}

CyberSecurityPie();
