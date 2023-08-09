/* This is the data that we use to populate the sunburst chart */
/* This is the data that we use to populate the sunburst chart */

const GamePie = () => {
    const gameData = [
        { 
          mainBranch: 'Game Programmer',
          subBranches: [
            { name: 'Programming Languages', description: 'Learn programming languages commonly used in game development, such as C++, C#, or Python. Understanding these languages is essential for developing game logic and mechanics.', resources: ['images/c++.png'] },
            { name: 'Game Engines', description: 'Familiarize yourself with popular game engines like Unity or Unreal Engine. Game engines provide tools and frameworks for building games efficiently.', resources: ['images/ue5.png'] },
            { name: 'Game Development Patterns', description: 'Study common game development patterns, such as object-oriented programming, state machines, and event-driven architecture.', resources: ['images/w3schools.png'] },
            { name: 'Graphics and Physics', description: 'Learn about computer graphics and physics simulation, which are crucial for creating realistic visuals and immersive gameplay.', resources: ['images/gamephysics.png'] }
          ],
          color: '#6f42c1',
          description: 'Game programmers are responsible for writing the code that brings games to life. They work on game mechanics, AI, user interfaces, and optimize performance for a smooth gaming experience.',
          resources: ['Resource 1 for Game Programming Basics', 'Resource 2 for Game Programming Basics']
        },
        { 
          mainBranch: '3D Artist',
          subBranches: [
            { name: '3D Modeling', description: 'Learn 3D modeling tools like Blender, Maya, or 3ds Max. Master the art of creating 3D characters, environments, and objects for games.', resources: ['images/blenderguru.png'] },
            { name: 'Texturing and Shading', description: 'Understand texturing techniques and materials to bring life to 3D models. Learn about PBR (Physically Based Rendering) for realistic textures.', resources: ['images/texture-shading.png'] },
            { name: 'Character Animation', description: 'Explore character animation principles and tools to make game characters move naturally and convincingly.', resources: ['images/whatisanimation.png'] },
            { name: 'Optimization for Games', description: 'Learn how to optimize 3D models and assets for game performance without compromising visual quality.', resources: ['images/optimizingames.png'] }
          ],
          color: '#6f42c1',
          description: '3D artists create the visual elements of games. They work on modeling, texturing, and animating characters, objects, and environments to enhance the games visual appeal.',
          resources: ['Resource 1 for 3D Art Fundamentals', 'Resource 2 for 3D Art Fundamentals']
        },
        { 
          mainBranch: 'Landscape Artist',
          subBranches: [
            { name: 'Environment Design', description: 'Study environmental design principles to create captivating and immersive game worlds. Learn about composition, lighting, and mood.', resources: ['images/environmentaldesign.png'] },
            { name: 'Terrain Creation', description: 'Master terrain creation tools to build natural landscapes and terrains for games.', resources: ['images/terrain.png '] },
            { name: 'Foliage and Vegetation', description: 'Learn how to create realistic foliage and vegetation to populate game environments.', resources: ['images/folliage.png'] },
            { name: 'Level Design', description: 'Understand level design concepts and flow to create engaging and challenging game levels.', resources: ['images/leveldesign.png'] }
          ],
          color: '#6f42c1',
          description: 'Landscape artists focus on designing and creating game environments, including terrains, landscapes, foliage, and overall level design. They play a crucial role in shaping the games visual and immersive experience.',
          resources: ['Resource 1 for Landscape Art Basics', 'Resource 2 for Landscape Art Basics']
        },
        { 
          mainBranch: 'Game Planner',
          subBranches: [
            { name: 'Game Design Principles', description: 'Study game design principles and mechanics to create engaging and enjoyable gameplay experiences.', resources: ['images/gamedesignprinciples.png'] },
            { name: 'Game Story and Narrative', description: 'Learn about storytelling and narrative design to create compelling game plots and character arcs.', resources: ['images/storynarrator.png'] },
            { name: 'Gameplay Testing', description: 'Understand the importance of gameplay testing and user feedback in refining and improving game design.', resources: ['images/gametesting.png'] },
            { name: 'Game Monetization', description: 'Explore strategies for monetizing games, such as in-app purchases, ads, or subscription models.', resources: ['images/monetizinggame.png'] }
          ],
          color: '#6f42c1',
          description: 'Game planners, also known as game designers, are responsible for shaping the overall vision and mechanics of a game. They define the rules, levels, and gameplay elements that make the game enjoyable and engaging.',
          resources: ['Resource 1 for Game Design Basics', 'Resource 2 for Game Design Basics']
        },
        // Add additional game career branches here...
      ];
      
      // The rest of the code remains the same as before (convert data to Plotly format and create the sunburst chart).
      
      
      
          // Convert the data to the required format for Plotly sunburst chart
          const labels = [];
          const parents = [];
          const values = [];
        
          gameData.forEach(mainBranchData => {
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
      
          Plotly.newPlot('gamechart', plotlyData, layout);
       
          /* this section deals with making the chart interactive */
          document.getElementById('gamechart').on('plotly_click', event => {
            if (event.points && event.points.length > 0) {
              const point = event.points[0];
              const selectedLabel = point.label;
          
              // Find the data for the clicked item (main branch or submodule)
              const selectedItem = gameData.find(item => item.mainBranch === selectedLabel || item.subBranches.some(sub => sub.name === selectedLabel));
              let selectedSubmodule;
          
              // Update the information div with the information
              if (selectedItem) {
                if (selectedItem.mainBranch == selectedLabel) {
                  document.getElementById('gametitle').textContent = selectedItem.mainBranch;
                  document.getElementById('gamedesc').textContent = selectedItem.description || '';
                 // const resourcesList = document.getElementById('gameresources');
                 // resourcesList.innerHTML = selectedItem.resources ? selectedItem.resources.map(resource => `<img src="../${resource}"/>`).join('') : '';
                } else {
                  selectedSubmodule = selectedItem.subBranches.find(sub => sub.name === selectedLabel);
                  if (selectedSubmodule) {
                    document.getElementById('gametitle').textContent = selectedSubmodule.name;
                    document.getElementById('gamedesc').textContent = selectedSubmodule.description || '';
                    const resourcesList = document.getElementById('gameresources');
                    resourcesList.innerHTML = selectedSubmodule.resources ? selectedSubmodule.resources.map(resource => `<img src='../${resource}'/>`).join('') : '';
                  }
                }
              }
            }
          });
}

GamePie();

      
      
  