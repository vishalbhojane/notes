```jsx
interface ProgressBarProps {
  id: number;
  progress: number;
  total: number;
}

const ProgressBar = ({progress, total}: ProgressBarProps) => {
  const percentage = (progress / total) * 100;
  const isCompleted = progress >= total;

  return (
    <div className="progressbar-wrap">
      <div
        className="progressbar-progress"
        style={{
          width: `${percentage}%`,
          backgroundColor: isCompleted ? '#4CAF50' : '#ff9800',
        }}
      />
    </div>
  );
};
```

```css
.progressbar-wrap {
  overflow: hidden;
  width: 100%;
  height: 10px;
  background-color: #ccc;
  margin: 5px 0;
  position: relative;
}

.progressbar-progress {
  height: 100%;
  background-color: green;
}
```

```jsx
const ProgressBars = () => {
  const CONCURRENCY_LIMIT = 2;
  const [progressBarId, setProgressBarId] = useState(1);
  const [progressBars, setProgressBars] = useState<ProgressBarProps[]>([]);

  const handleAddProgressBar = () => {
    setProgressBarId((prev) => prev + 1);
    setProgressBars((prev) => [
      ...prev,
      {id: progressBarId, progress: 0, total: 100},
    ]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressBars((prev) => {
        const incomplete = prev.filter(
          (progressBar) => progressBar.progress < progressBar.total,
        );

        const currentBatch = incomplete.slice(0, CONCURRENCY_LIMIT);
        const currentBatchIds = new Set(currentBatch.map((pb) => pb.id));

        return prev.map((progressBar) => {
          if (currentBatchIds.has(progressBar.id)) {
            return {
              ...progressBar,
              progress: progressBar.progress + 1,
            };
          }
          return progressBar;
        });
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <button onClick={handleAddProgressBar}>Add</button>
      {progressBars.map((progressBar) => {
        return (
          <ProgressBar
            id={progressBar.id}
            key={progressBar.id}
            progress={progressBar.progress}
            total={progressBar.total}
          />
        );
      })}
    </div>
  );
};
```
