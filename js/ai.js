const AIPie = () => {
    const aiData = [
        { 
          mainBranch: 'Machine Learning Engineer',
          subBranches: [
            { name: 'Supervised Learning', description: 'Learn about training models with labeled data. Explore regression and classification algorithms.', resources: ['images/supervisedlearning.png'] },
            { name: 'Unsupervised Learning', description: 'Study methods for clustering and dimensionality reduction. Understand techniques like k-means and PCA.', resources: ['images/unsupervisedlearning.png'] },
            { name: 'Deep Learning', description: 'Explore neural networks and deep learning architectures. Familiarize yourself with libraries like TensorFlow and PyTorch.', resources: ['images/deeplearning.png'] },
            { name: 'Model Evaluation', description: 'Understand metrics and techniques for evaluating model performance and generalization.', resources: ['images/models.png'] }
          ],
          color: '#e83e8c',
          description: 'Machine Learning Engineers design, implement, and optimize machine learning models to solve complex problems and make data-driven predictions.',
          resources: ['Resource 1 for Machine Learning', 'Resource 2 for Machine Learning']
        },
        { 
          mainBranch: 'Data Scientist',
          subBranches: [
            { name: 'Data Analysis', description: 'Learn to clean, preprocess, and visualize data. Use tools like Pandas and Matplotlib.', resources: ['images/dataanalysis.png'] },
            { name: 'Statistical Modeling', description: 'Study statistical concepts and methods for analyzing and modeling data.', resources: ['images/stats.png'] },
            { name: 'Predictive Analytics', description: 'Apply machine learning techniques to extract insights and predictions from data.', resources: ['images/predictive.png'] },
            { name: 'Business Understanding', description: 'Understand the domain and use case to formulate data-driven solutions that align with business goals.', resources: ['images/buisness.png'] }
          ],
          color: '#e83e8c',
          description: 'Data Scientists collect, analyze, and interpret large datasets to extract valuable insights and inform decision-making.',
          resources: ['Resource 1 for Data Science', 'Resource 2 for Data Science']
        },
        /*{ 
          mainBranch: 'Natural Language Processing Engineer',
          subBranches: [
            { name: 'Text Preprocessing', description: 'Learn techniques to clean and preprocess text data for NLP tasks. Understand tokenization, stemming, and lemmatization.', resources: ['Text Preprocessing Techniques', 'NLTK Tutorials'] },
            { name: 'Word Embeddings', description: 'Explore methods for representing words as numerical vectors. Study word2vec, GloVe, and contextual embeddings.', resources: ['Word Embeddings Overview', 'Word2Vec Explained'] },
            { name: 'Sentiment Analysis', description: 'Understand how to classify text sentiment using machine learning and NLP techniques.', resources: ['Sentiment Analysis Methods', 'Text Classification with BERT'] },
            { name: 'Language Generation', description: 'Learn about generative models for text generation, including RNNs, LSTMs, and transformers.', resources: ['Text Generation Techniques', 'GPT-3 Overview'] }
          ],
          color: '#e83e8c',
          description: 'NLP Engineers focus on developing algorithms and models to understand, process, and generate human language text.',
          resources: ['Resource 1 for NLP', 'Resource 2 for NLP']
        },*/
        { 
          mainBranch: 'Computer Vision Engineer',
          subBranches: [
            { name: 'Image Processing', description: 'Explore techniques for enhancing and manipulating images. Learn about filters, transformations, and feature extraction.', resources: ['images/imageproccess.png'] },
            { name: 'Object Detection', description: 'Study methods for detecting and localizing objects in images and videos. Understand algorithms like YOLO and SSD.', resources: ['images/objectdetection.png'] },
            { name: 'Image Segmentation', description: 'Learn to segment images into meaningful regions. Explore techniques like semantic and instance segmentation.', resources: ['images/imageseg.png'] },
            { name: 'Deep Learning for Vision', description: 'Master deep learning models for vision tasks, including CNNs and architectures like ResNet and VGG.', resources: ['images/compvision.png'] }
          ],
          color: '#e83e8c',
          description: 'Computer Vision Engineers develop algorithms and models for analyzing and interpreting visual information from images and videos.',
          resources: ['Resource 1 for Computer Vision', 'Resource 2 for Computer Vision']
        },
        // Add more AI career branches here...
    ];
  
          // Convert the data to the required format for Plotly sunburst chart
          const labels = [];
          const parents = [];
          const values = [];
        
          aiData.forEach(mainBranchData => {
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
      
          Plotly.newPlot('aichart', plotlyData, layout);
       
          /* this section deals with making the chart interactive */
          document.getElementById('aichart').on('plotly_click', event => {
            if (event.points && event.points.length > 0) {
              const point = event.points[0];
              const selectedLabel = point.label;
          
              // Find the data for the clicked item (main branch or submodule)
              const selectedItem = aiData.find(item => item.mainBranch === selectedLabel || item.subBranches.some(sub => sub.name === selectedLabel));
              let selectedSubmodule;
          
              // Update the information div with the information
              if (selectedItem) {
                if (selectedItem.mainBranch == selectedLabel) {
                  document.getElementById('aititle').textContent = selectedItem.mainBranch;
                  document.getElementById('aidesc').textContent = selectedItem.description || '';
                  //const resourcesList = document.getElementById('airesources');
                  //resourcesList.innerHTML = selectedItem.resources ? selectedItem.resources.map(resource => `<img src="../${resource}"/>`).join('') : '';
                } else {
                  selectedSubmodule = selectedItem.subBranches.find(sub => sub.name === selectedLabel);
                  if (selectedSubmodule) {
                    document.getElementById('aititle').textContent = selectedSubmodule.name;
                    document.getElementById('aidesc').textContent = selectedSubmodule.description || '';
                    const resourcesList = document.getElementById('airesources');
                    resourcesList.innerHTML = selectedSubmodule.resources ? selectedSubmodule.resources.map(resource => `<img src="../${resource}"/>`).join('') : '';
                  }
                }
              }
            }
          });
}

AIPie();

      
      
  