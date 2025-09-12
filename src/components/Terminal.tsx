import React, { useState, useEffect, useRef } from 'react';
import { terminalConfig } from '@/lib/terminal-config';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

const Terminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showHeader, setShowHeader] = useState(true);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Focus input on mount and click
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Scroll to bottom on new lines
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // No longer need to add welcome message to lines since it's in header

  const addLine = (type: 'input' | 'output' | 'error', content: string) => {
    setLines(prev => [...prev, { type, content, timestamp: new Date() }]);
  };

  const executeCommand = async (input: string) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Add input to history
    setCommandHistory(prev => [...prev, trimmedInput]);
    setHistoryIndex(-1);

    // Add command to terminal
    addLine('input', `${terminalConfig.prompt} ${trimmedInput}`);

    // Parse command
    const [commandName, ...args] = trimmedInput.split(' ');
    const command = terminalConfig.commands.find(
      cmd => cmd.name === commandName.toLowerCase() || 
             (cmd.aliases && cmd.aliases.includes(commandName.toLowerCase()))
    );

    if (command) {
      try {
        const result = await command.action(args);
        if (result === 'CLEAR') {
          setLines([]);
        } else {
          addLine('output', result);
        }
      } catch (error) {
        addLine('error', `Erro ao executar comando: ${error}`);
      }
    } else {
      addLine('error', `Comando não encontrado: ${commandName}. Digite 'help' para ver os comandos disponíveis.`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput('');
      setSuggestions([]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setCurrentInput(suggestions[0]);
        setSuggestions([]);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentInput(value);

    // Auto-suggest commands
    if (value.trim()) {
      const matches = terminalConfig.commands.filter(cmd =>
        cmd.name.startsWith(value.trim().toLowerCase()) ||
        (cmd.aliases && cmd.aliases.some(alias => alias.startsWith(value.trim().toLowerCase())))
      );
      setSuggestions(matches.map(cmd => cmd.name));
    } else {
      setSuggestions([]);
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className="h-screen bg-terminal-bg terminal-scanlines relative overflow-hidden cursor-text"
      onClick={handleTerminalClick}
    >
      <div 
        ref={terminalRef}
        className="h-full overflow-y-auto p-4 font-mono text-sm leading-relaxed scrollbar-hide"
      >
        {/* Header - Banner + Links + Welcome */}
        {showHeader && (
          <div className="mb-6">
            {/* Banner - Centralizado */}
            <pre className="text-terminal-green terminal-glow mb-4 typewriter whitespace-pre-wrap text-center">
              {terminalConfig.banner}
            </pre>
            
            {/* Links fixos */}
            <div className="text-center mb-4">
              <div className="text-terminal-green-bright terminal-glow text-sm">
                {Object.entries(terminalConfig.links).map(([name, url], index) => (
                  <span key={name}>
                    <span 
                      className="hover:text-terminal-yellow cursor-pointer transition-colors"
                      onClick={() => window.open(url, '_blank')}
                    >
                      {name}
                    </span>
                    {index < Object.entries(terminalConfig.links).length - 1 && (
                      <span className="text-terminal-green-dim mx-2">-</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Welcome message */}
            <div className="text-terminal-green-dim text-sm text-center mb-4">
              {terminalConfig.welcomeMessage}
            </div>
          </div>
        )}

        {/* Terminal Lines */}
        <div className="space-y-1">
          {lines.map((line, index) => (
            <div key={index} className="flex flex-col">
              <span
                className={`whitespace-pre-wrap ${
                  line.type === 'input'
                    ? 'text-terminal-green-bright terminal-glow'
                    : line.type === 'error'
                    ? 'text-terminal-red'
                    : 'text-terminal-green-dim'
                }`}
              >
                {line.content}
              </span>
            </div>
          ))}
        </div>

        {/* Current Input Line */}
        <div className="flex items-center mt-4">
          <span className="text-terminal-green terminal-glow mr-2 flex-shrink-0">
            {terminalConfig.prompt}
          </span>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none outline-none text-terminal-green-bright terminal-glow font-mono text-sm placeholder-terminal-green-dim"
              placeholder=""
              autoComplete="off"
              spellCheck="false"
            />
            <span className="absolute top-0 right-0 text-terminal-green cursor-blink">█</span>
          </div>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && currentInput.trim() && (
          <div className="mt-2 text-terminal-green-dim text-xs">
            <span>Sugestões: </span>
            {suggestions.map((suggestion, index) => (
              <span key={index} className="mr-4">
                {suggestion}
              </span>
            ))}
            <span className="text-terminal-yellow"> (TAB para completar)</span>
          </div>
        )}
      </div>

      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-terminal-bg/20 to-transparent pointer-events-none" />
    </div>
  );
};

export default Terminal;