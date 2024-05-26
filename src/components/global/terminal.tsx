import React, { useState, useEffect, useRef } from 'react';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [output, setOutput] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleCommand = (command: string) => {
    let newOutput = [...output];
    newOutput.push(`guest@system:~$ ${command}`);

    if (command.trim() !== '') {
      switch (command.trim()) {
        case 'whoami':
          newOutput.push('Raymond (Lei) Chi');
          break;
        case 'ls':
          newOutput.push('about projects contact resume');
          break;
        case 'clear':
          newOutput = [];
          break;
        case 'help':
          newOutput.push(
            `Available commands:\n` +
            `whoami - Displays the current user\n` +
            `ls - Lists available directories\n` +
            `cd <directory> - Changes to the specified directory\n` +
            `clear - Clears the terminal screen\n` +
            `help - Displays this help message`
          );
          break;
        default:
          if (command.startsWith('cd ')) {
            const dir = command.split(' ')[1];
            if (['about', 'projects', 'contact', 'resume'].includes(dir)) {
              window.location.href = `/${dir}`;
              return;
            } else {
              newOutput.push(`Invalid directory: ${dir}`);
            }
          } else {
            newOutput.push(`Command not found: ${command}`);
          }
      }
    }

    setOutput(newOutput);
    setHistory([...history, command]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCommand(input.trim());
    setInput('');
  };

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="close"></span>
          <span className="minimize"></span>
          <span className="maximize"></span>
        </div>
        <div className="terminal-title">Terminal</div>
      </div>
      <div className="terminal-body">
        <div className="output">
          <div>Type "help" for help</div>
          {output.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <span>guest@system:~$ </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
