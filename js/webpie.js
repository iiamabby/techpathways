const WebPie = () => {
    const webData = [
        // ... Previous data ...

        { 
          mainBranch: 'Back End Developer',
          subBranches: [
            { name: 'Server-side Languages', description: 'Master languages like Node.js, Python, Ruby, or Java for building the logic and functionality of the back end.', resources: ['images/nodesjs.png'] },
            { name: 'API Development', description: 'Learn how to design and implement APIs (Application Programming Interfaces) for communication between front end and back end systems.', resources: ['images/restapi.png'] },
            { name: 'Database Management', description: 'Become proficient in handling databases and data storage systems. Learn about querying, data modeling, and database optimization.', resources: ['images/databasedesign.png'] },
            { name: 'Authentication and Security', description: 'Understand security best practices for protecting user data and preventing unauthorized access to web applications.', resources: ['images/authentication.png'] }
          ],
          color: '#17a2b8',
          description: 'Back End Developers focus on server-side development, handling databases, APIs, and the overall functionality of web applications.',
          resources: ['Resource 1 for Back End Development', 'Resource 2 for Back End Development']
        },
        { 
          mainBranch: 'UI/UX Designer',
          subBranches: [
            { name: 'User Interface Design', description: 'Learn to create visually appealing and intuitive interfaces that enhance user interaction and experience.', resources: ['images/uiux.png'] },
            { name: 'User Experience Design', description: 'Understand the psychology of user behavior and design seamless experiences that meet user needs and expectations.', resources: ['images/ux.png'] },
            { name: 'Wireframing and Prototyping', description: 'Master tools and techniques for creating wireframes and interactive prototypes to visualize and test design ideas.', resources: ['images/wireframing.png'] },
            { name: 'Usability Testing', description: 'Learn how to conduct usability testing to gather feedback and iterate on designs for improved user satisfaction.', resources: ['images/uxtesting.png'] }
          ],
          color: '#17a2b8',
          description: 'UI/UX Designers focus on creating user-centered design solutions for web applications, ensuring a positive and engaging user experience.',
          resources: ['Resource 1 for UI/UX Design', 'Resource 2 for UI/UX Design']
        },
        {mainBranch: 'Graphic Designer',
        subBranches: [
          { name: 'Visual Design', description: 'Master principles of visual design, including layout, typography, color theory, and composition.', resources: ['images/designbasics.png'] },
          { name: 'Digital Illustration', description: 'Learn digital illustration techniques to create unique and eye-catching graphics for web applications.', resources: ['images/digitalillus.png'] },
          { name: 'Image Editing', description: 'Familiarize yourself with image editing software to enhance and manipulate images for web content.', resources: ['images/imageediting.png'] },
          { name: 'Branding and Identity', description: 'Understand how to develop branding elements like logos and visual identities that resonate with target audiences.', resources: ['images/branding.png'] }
        ],
        color: '#17a2b8',
        description: 'Graphic Designers focus on creating visually appealing graphics, illustrations, and branding elements that contribute to the aesthetics of web applications.',
        resources: ['Resource 1 for Graphic Design', 'Resource 2 for Graphic Design']
      },
      { 
        mainBranch: 'Full Stack Developer',
        subBranches: [
          { name: 'Front End Development', description: 'Master front end technologies like HTML, CSS, and JavaScript. Learn to build responsive user interfaces and interactive web components.', resources: ['images/frontenddev.png'] },
          { name: 'Back End Development', description: 'Explore server-side programming languages like Node.js, Python, or Ruby. Learn to handle data, build APIs, and manage databases.', resources: ['images/backenddev.png'] },
          { name: 'Databases', description: 'Understand database management systems such as MySQL, PostgreSQL, or MongoDB. Learn to design, query, and optimize databases.', resources: ['images/mongodb.png'] },
          { name: 'Version Control', description: 'Familiarize yourself with version control systems like Git. Learn to collaborate with others and manage code changes effectively.', resources: ['images/github.png'] }
        ],
        color: '#17a2b8',
        description: 'Full Stack Developers are proficient in both front end and back end development. They can build and maintain complete web applications, handling everything from user interfaces to databases.',
        resources: ['Resource 1 for Full Stack Development', 'Resource 2 for Full Stack Development']
      },
      { 
        mainBranch: 'Front End Web Developer',
        subBranches: [
          { name: 'HTML', description: 'Learn the structure of web pages using HTML (Hypertext Markup Language). Understand elements, tags, and semantic markup.', resources: ['images/html.png'] },
          { name: 'CSS', description: 'Master Cascading Style Sheets (CSS) to style and layout web content. Learn about selectors, properties, and responsive design.', resources: ['images/css.png'] },
          { name: 'JavaScript', description: 'Become proficient in JavaScript programming. Learn to create interactive and dynamic web pages using DOM manipulation and event handling.', resources: ['images/js.png'] },
          { name: 'Front End Frameworks', description: 'Explore popular front end libraries and frameworks like React, Vue.js, or Angular. Build efficient and reusable UI components.', resources: ['images/reactapp.png'] }
        ],
        color: '#17a2b8',
        description: 'Front End Web Developers focus on creating visually appealing and user-friendly interfaces. They work with HTML, CSS, and JavaScript to build responsive and interactive web experiences.',
        resources: ['Resource 1 for Front End Development', 'Resource 2 for Front End Development']
      },
    ];

          // Convert the data to the required format for Plotly sunburst chart
          const labels = [];
          const parents = [];
          const values = [];
        
            webData.forEach(mainBranchData => {
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
      
          const layout = {
            margin: { l: 0, r: 0, b: 0, t: 0 },
            width: 500,
            height: 500
          };
      
          Plotly.newPlot('webchart', plotlyData, layout);
       
          /* this section deals with making the chart interactive */
          document.getElementById('webchart').on('plotly_click', event => {
            if (event.points && event.points.length > 0) {
              const point = event.points[0];
              const selectedLabel = point.label;
          
              // Find the data for the clicked item (main branch or submodule)
              const selectedItem = webData.find(item => item.mainBranch === selectedLabel || item.subBranches.some(sub => sub.name === selectedLabel));
              let selectedSubmodule;
          
              // Update the information div with the information
              if (selectedItem) {
                if (selectedItem.mainBranch == selectedLabel) {
                  document.getElementById('webtitle').textContent = selectedItem.mainBranch;
                  document.getElementById('webdesc').textContent = selectedItem.description || '';
                  const resourcesList = document.getElementById('webresources');
                  resourcesList.innerHTML = selectedItem.resources ? selectedItem.resources.map(resource => `<img src="../${resource}">`).join('') : '';
                } else {
                  selectedSubmodule = selectedItem.subBranches.find(sub => sub.name === selectedLabel);
                  if (selectedSubmodule) {
                    document.getElementById('webtitle').textContent = selectedSubmodule.name;
                    document.getElementById('webdesc').textContent = selectedSubmodule.description || '';
                    const resourcesList = document.getElementById('webresources');
                    resourcesList.innerHTML = selectedSubmodule.resources ? selectedSubmodule.resources.map(resource => `<img src="../${resource}"/>`).join('') : '';
                  }
                }
              }
            }
          });
}

WebPie();


