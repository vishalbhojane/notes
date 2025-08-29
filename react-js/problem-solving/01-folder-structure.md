```jsx
import React, {useState} from 'react';

const data = [
  {
    id: 1,
    name: 'src',
    isFolder: true,
    children: [
      {
        id: 2,
        name: 'App.js',
        isFolder: false,
      },
      {
        id: 3,
        name: 'index.js',
        isFolder: false,
      },
      {
        id: 4,
        name: 'components',
        isFolder: true,
        children: [],
      },
    ],
  },
];

const FolderStructure = ({root, setExplorerData}) => {
  const [expanded, setExpanded] = useState(true); // local state for expand/collapse

  // ------------------ ADD ------------------
  const handleAddItem = (targetNode, type) => {
    const name = window.prompt(`Enter ${type} name:`);
    if (!name) return;

    const newItem = {
      id: `${targetNode}-${Date.now()}`,
      name,
      isFolder: type === 'folder',
    };

    if (type === 'folder') {
      newItem['children'] = [];
    }

    const addItemToNode = node => {
      if (node.id === targetNode) {
        return {
          ...node,
          children: [...(node.children ?? []), newItem],
        };
      }

      return node.isFolder
        ? {...node, children: node.children.map(addItemToNode)}
        : node;
    };

    setExplorerData(prev => prev.map(addItemToNode));
    setExpanded(true); // auto expand when adding
  };

  // ------------------ DELETE ------------------
  const handleDeleteItem = targetNodeId => {
    const deleteNode = node => {
      if (!node.children) return node;

      return {
        ...node,
        children: node.children
          .filter(ch => ch.id !== targetNodeId)
          .map(deleteNode),
      };
    };

    setExplorerData(prev =>
      prev.filter(node => node.id !== targetNodeId).map(deleteNode)
    );
  };

  // ------------------ RENAME ------------------
  const handleRenameItem = targetNodeId => {
    const renameNode = node => {
      if (node.id === targetNodeId) {
        const newName = window.prompt('Enter new name:', node.name);
        if (!newName) return node;
        return {...node, name: newName};
      }

      return node.isFolder
        ? {...node, children: node.children.map(renameNode)}
        : node;
    };

    setExplorerData(prev => prev.map(renameNode));
  };

  // ------------------ RENDER ------------------
  return root.isFolder ? (
    <div style={{marginLeft: '10px'}}>
      <div>
        <span
          style={{cursor: 'pointer', fontWeight: 'bold'}}
          onClick={() => setExpanded(prev => !prev)}
        >
          {expanded ? '📂' : '📁'} {root.name}
        </span>{' '}
        <button onClick={() => handleAddItem(root.id, 'folder')}>
          +Folder
        </button>
        <button onClick={() => handleAddItem(root.id, 'file')}>+File</button>
        <button onClick={() => handleRenameItem(root.id)}>✏️ Rename</button>
        <button onClick={() => handleDeleteItem(root.id)}>❌ Delete</button>
      </div>

      {expanded &&
        root.children &&
        root.children.map(item => (
          <FolderStructure
            key={item.id}
            root={item}
            setExplorerData={setExplorerData}
          />
        ))}
    </div>
  ) : (
    <div style={{marginLeft: '20px'}}>
      <span>📄 {root.name}</span>{' '}
      <button onClick={() => handleRenameItem(root.id)}>✏️ Rename</button>
      <button onClick={() => handleDeleteItem(root.id)}>❌ Delete</button>
    </div>
  );
};

export default function App() {
  const [explorerData, setExplorerData] = useState(data);
  return (
    <div>
      <h2>File Explorer</h2>
      {explorerData.map(item => (
        <FolderStructure
          key={item.id}
          root={item}
          setExplorerData={setExplorerData}
        />
      ))}
    </div>
  );
}
```
