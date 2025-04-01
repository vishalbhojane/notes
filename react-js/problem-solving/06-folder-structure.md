```jsx
import {useState} from 'react';
import {folderData} from './folderData';
import Folder from './Folder';

const FolderStructure = () => {
  const [explorerData, setExplorerData] = useState(folderData);

  const handleAddItem = (parentId, itemName, isFolder) => {
    const newItem = {
      id: `${parentId}-${Date.now()}`,
      name: itemName,
      isFolder: isFolder,
      children: isFolder ? [] : undefined,
    };

    const addItemToNode = (node) => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...(node.children || []), newItem],
        };
      }
      return {
        ...node,
        children: node.children ? node.children.map(addItemToNode) : [],
      };
    };

    setExplorerData((prev) => prev.map(addItemToNode));
  };

  return explorerData.map((item) => (
    <Folder key={item.id} root={item} onAddItem={handleAddItem} />
  ));
};

export default FolderStructure;
```

```jsx
import {useState} from 'react';

const Folder = ({root, onAddItem}) => {
  const [expanded, setIsExpanded] = useState(false);

  const toggleFolder = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleAddItem = (isFolder) => {
    const itemName = prompt(`Enter the ${isFolder ? 'folder' : 'file'} name:`);
    if (itemName) {
      onAddItem(root.id, itemName, isFolder);
    }
  };

  return (
    <div>
      {root.isFolder ? (
        <>
          <div>
            <span onClick={toggleFolder}>{expanded ? '-' : '+'}</span>
            {root.name}
            <span style={{paddingLeft: '12px'}}>
              <button onClick={() => handleAddItem(false)}>+ File</button>
              <button onClick={() => handleAddItem(true)}>+ Folder</button>
            </span>
          </div>
          {expanded && (
            <div style={{paddingLeft: '24px'}}>
              {root.children?.map((child) => (
                <Folder key={child.id} root={child} onAddItem={onAddItem} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div>
          <span>📄</span>
          {root.name}
        </div>
      )}
    </div>
  );
};

export default Folder;
```

```js
export const folderData = [
  {
    name: 'src',
    id: '1',
    isFolder: true,
    children: [
      {
        name: 'components',
        id: '2',
        isFolder: true,
        children: [
          {
            name: 'Header.jsx',
            id: '3',
            isFolder: false,
          },
          {
            name: 'Footer.jsx',
            id: '4',
            isFolder: false,
          },
        ],
      },
      {
        name: 'App.js',
        id: '5',
        isFolder: false,
      },
    ],
  },
  {
    name: 'public',
    id: '6',
    isFolder: true,
    children: [
      {
        name: 'index.html',
        id: '7',
        isFolder: false,
      },
      {
        name: 'styles',
        id: '8',
        isFolder: true,
        children: [
          {
            name: 'style.css',
            id: '9',
            isFolder: false,
          },
        ],
      },
    ],
  },
];
```
