<!DOCTYPE html>
<html>
<head>
  <title>Drag and Drop Website Builder</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f2f2f2;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .header {
      background-color: #333;
      color: #fff;
      padding: 20px;
      text-align: center;
    }
    
    .container {
      flex-grow: 1;
      display: flex;
    }
    
    .sidebar {
      width: 200px;
      background-color: #ddd;
      padding: 10px;
    }
    
    .content {
      flex-grow: 1;
      background-color: #fff;
      border: 2px dashed #ccc;
      height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 24px;
      color: #aaa;
    }
    
    .footer {
      background-color: #333;
      color: #fff;
      padding: 20px;
      text-align: center;
    }
    
    .fab {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #333;
      color: #fff;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <header class="header">
    <h1>Drag and Drop Post Maker</h1>
    <span><a href="#">Home</a></span>
    <span><a href="#">About</a></span>
    <span><a href="#">Contact</a></span>
  </header>
  
  <div class="container">
  <div class="sidebar">
  <h3>Element Templates</h3>
  <div class="element-template" draggable="true" data-element-type="view">
    <div class="view-element">
      <h3>View Element</h3>
      <p>This is a view element.</p>
    </div>
  </div>

  <div class="element-template" draggable="true" data-element-type="text">
    <div class="text-element">
      <h3>Text Block Element</h3>
      <p>This is a text block element.</p>
    </div>
  </div>

  <div class="element-template" draggable="true" data-element-type="image">
    <div class="image-element">
      <img src="example.jpg" alt="Example Image">
      <h3>Image Element</h3>
      <p>This is an image element.</p>
    </div>
  </div>

  <div class="element-template" draggable="true" data-element-type="button">
    <div class="button-element">
      <button>Click Me</button>
      <h3>Button Element</h3>
      <p>This is a button element.</p>
    </div>
  </div>
</div>

    
    <div class="workspace" ondragover="allowDrop(event)" ondrop="drop(event)">
      <span>Drag and drop elements here</span>
      <span>to start Making your post</span>
    </div>
    
    <div class="sidebar">
  <h3>Side Drawer</h3>
  <ul>
    <li draggable="true"  ondragstart="dragStart(event)"><a href="#">View</a></li>
    <li draggable="true"  ondragstart="dragStart(event)"><a href="#">Text</a></li>
    <li draggable="true"  ondragstart="dragStart(event)"><a href="#">Image</a></li>
  </ul>
</div>
  </div>
  
  <footer class="footer">
    <p>© 2023 Your Post Maker. All rights reserved.</p>
  </footer>
  
  <div class="fab">
    <i class="material-icons">add</i>
  </div>
</body>
<script>
// Get the sidebar and workspace elements
const sidebar = document.querySelector('.sidebar');
const workspace = document.querySelector('.workspace');

// Event listener for drag start
sidebar.addEventListener('dragstart', dragStart);

// Event listener for drag over and drop
workspace.addEventListener('dragover', dragOver);
workspace.addEventListener('drop', drop);

// Touch event listener for component selection
workspace.addEventListener('touchstart', selectComponent);

// Drag start event handler
function dragStart(event) {
  const elementData = event.target.cloneNode(true);
  event.dataTransfer.setData('text/plain', elementData.outerHTML);
}

// Drag over event handler
function dragOver(event) {
  event.preventDefault();
}

// Drop event handler
function drop(event) {
  event.preventDefault();
  const elementHTML = event.dataTransfer.getData('text/plain');
  const droppedElement = document.createElement('div');
  droppedElement.innerHTML = elementHTML;
  
  // Add resizing handles to the dropped element
  const resizeHandles = document.createElement('div');
  resizeHandles.className = 'resize-handles';
  droppedElement.appendChild(resizeHandles);

  // Add rotation handle to the dropped element
  const rotateHandle = document.createElement('div');
  rotateHandle.className = 'rotate-handle';
  droppedElement.appendChild(rotateHandle);

  workspace.appendChild(droppedElement);
}

// Touch event handler for component selection
function selectComponent(event) {
  const selectedComponent = event.target;

  // Check if the selected component is a valid element to show options
  if (
    selectedComponent.classList.contains('resize-handles') ||
    selectedComponent.classList.contains('rotate-handle')
  ) {
    // Show options for resizing and rotating the component
    showOptions(selectedComponent);
  }
}

// Show options for resizing and rotating the component
function showOptions(component) {
  // Implement your logic here to display options for resizing and rotating the component
  // You can show a context menu or overlay with appropriate buttons or controls
  // Update the size and rotation properties of the component based on user interaction
  // You can use the existing resize and rotate functions to handle the changes
}

</script>
</html>
