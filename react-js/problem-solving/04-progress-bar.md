```jsx
import './ProgressBar.css';

const ProgressBar = ({progress}) => {
  return (
    <div className="progressbar">
      <div className="progressbar-wrap">
        <div
          className="progressbar-progress"
          style={{width: `${Math.max(0, Math.min(progress, 100))}%`}}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
```

```css
.progressbar-wrap {
  overflow: hidden;
  border-radius: 12px;
}

.progressbar-progress {
  height: 24px;
  background-color: green;
  transition: width 0.3s ease-in-out;
  border-radius: 12px;
}
```
