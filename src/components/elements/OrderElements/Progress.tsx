// ProgressBar.jsx
import React from 'react';

interface ProgressBarProps {
    progressValue: number;
}

const ProgressBar = ({ progressValue }: ProgressBarProps) => {
    return (
        <progress className="progress progress-success w-1/3 h-4 border border-black shadow-lg" value={progressValue} max="10"></progress>
    );
};

export default ProgressBar;
