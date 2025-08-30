```jsx
import React, {useState} from 'react';

const data = [
  {
    id: 1,
    label: 'parent 1',
    children: [
      {
        id: 2,
        label: 'child 1',
      },
      {
        id: 3,
        label: 'child 2',
        children: [
          {
            id: 4,
            label: 'grandchild 1',
          },
        ],
      },
      {
        id: 5,
        label: 'child 3',
      },
    ],
  },
  {
    id: 6,
    label: 'parent 2',
    children: [
      {
        id: 7,
        label: 'child 4',
      },
    ],
  },
];

// Helper function to get all descendant IDs of a node
const getAllDescendantIds = node => {
  const ids = [];

  const collectIds = item => {
    if (item.children) {
      item.children.forEach(child => {
        ids.push(child.id);
        collectIds(child);
      });
    }
  };

  collectIds(node);
  return ids;
};

// Helper function to check if all children are checked
const areAllChildrenChecked = (node, checkedIds) => {
  if (!node.children || node.children.length === 0) return false;
  return node.children.every(child => checkedIds.has(child.id));
};

// Helper function to check if some children are checked
const areSomeChildrenChecked = (node, checkedIds) => {
  if (!node.children || node.children.length === 0) return false;
  const checkedChildren = node.children.filter(child =>
    checkedIds.has(child.id)
  );
  return (
    checkedChildren.length > 0 && checkedChildren.length < node.children.length
  );
};

// Helper function to determine checkbox state
const getCheckboxState = (node, checkedIds) => {
  if (!node.children || node.children.length === 0) {
    return {
      checked: checkedIds.has(node.id),
      indeterminate: false,
    };
  }

  const allChecked = areAllChildrenChecked(node, checkedIds);
  const someChecked = areSomeChildrenChecked(node, checkedIds);

  return {
    checked: allChecked,
    indeterminate: someChecked && !allChecked,
  };
};

const Checkbox = ({item, checkedIds, onCheckboxChange}) => {
  const {checked, indeterminate} = getCheckboxState(item, checkedIds);
  const hasChildren = item.children && item.children.length > 0;

  const handleChange = () => {
    const descendantIds = getAllDescendantIds(item);
    const allRelatedIds = [item.id, ...descendantIds];

    if (checked || indeterminate) {
      // Uncheck this item and all descendants
      onCheckboxChange(allRelatedIds, false);
    } else {
      // Check this item and all descendants
      onCheckboxChange(allRelatedIds, true);
    }
  };

  return (
    <div style={{marginLeft: '20px'}}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          ref={input => {
            if (input) {
              input.indeterminate = indeterminate;
            }
          }}
          onChange={handleChange}
        />
        <span>{item.label}</span>
      </label>
      {hasChildren && (
        <div style={{marginLeft: '20px'}}>
          {item.children.map(child => (
            <Checkbox
              key={child.id}
              item={child}
              checkedIds={checkedIds}
              onCheckboxChange={onCheckboxChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [checkedIds, setCheckedIds] = useState(new Set());

  const handleCheckboxChange = (ids, shouldCheck) => {
    setCheckedIds(prev => {
      const newSet = new Set(prev);
      ids.forEach(id => {
        if (shouldCheck) {
          newSet.add(id);
        } else {
          newSet.delete(id);
        }
      });
      return newSet;
    });
  };

  return (
    <div>
      {data.map(item => (
        <Checkbox
          key={item.id}
          item={item}
          checkedIds={checkedIds}
          onCheckboxChange={handleCheckboxChange}
        />
      ))}
    </div>
  );
};

export default App;
```
