export interface Command {
  name: string;
  description: string;
  action: (args: string[]) => string | Promise<string>;
  aliases?: string[];
}

export interface TerminalConfig {
  commands: Command[];
  links: { [key: string]: string };
  banner: string;
  prompt: string;
  welcomeMessage: string;
}

export const terminalConfig: TerminalConfig = {
  banner: `
██████╗  ██████╗ ███████╗ █████╗ ███╗   ███╗██╗ ██████╗  ██████╗ ███████╗
██╔══██╗██╔═══██╗╚══███╔╝██╔══██╗████╗ ████║██║██╔════╝ ██╔═══██╗██╔════╝
██║  ██║██║   ██║  ███╔╝ ███████║██╔████╔██║██║██║  ███╗██║   ██║███████╗
██║  ██║██║   ██║ ███╔╝  ██╔══██║██║╚██╔╝██║██║██║   ██║██║   ██║╚════██║
██████╔╝╚██████╔╝███████╗██║  ██║██║ ╚═╝ ██║██║╚██████╔╝╚██████╔╝███████║
╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝ ╚═════╝  ╚═════╝ ╚══════╝
                                                                           
`,
  prompt: "dozamigos@visitante:~$",
  welcomeMessage: "Bem-vindo ao terminal Dozamigos! Digite 'help' para ver os comandos disponíveis.",
  
  links: {
    pobreflix: "https://pobreflix.wolf-homelab.com.br/",
    pobrefy: "https://pobrefy.wolf-homelab.com.br/",
    arquivos: "https://documentos.wolf-homelab.com.br/share/Tlb6ihYU",
    prompt: "https://github.com/luanwolf/PromptAuxiliar/releases/tag/Prompt-Auxiliar-1.4"
  },

  commands: [
    {
      name: "help",
      description: "Mostra todos os comandos disponíveis",
      aliases: ["h", "?"],
      action: () => {
        const commands = terminalConfig.commands;
        let help = "Comandos disponíveis:\n\n";
        commands.forEach(cmd => {
          help += `  ${cmd.name.padEnd(12)} - ${cmd.description}\n`;
          if (cmd.aliases && cmd.aliases.length > 0) {
            help += `${' '.repeat(16)}(aliases: ${cmd.aliases.join(', ')})\n`;
          }
        });
        return help;
      }
    },
    {
      name: "links",
      description: "Mostra todos os links disponíveis",
      aliases: ["l"],
      action: () => {
        let output = "Links disponíveis:\n\n";
        Object.entries(terminalConfig.links).forEach(([name, url]) => {
          output += `  ${name.padEnd(12)} - ${url}\n`;
        });
        output += "\nUse 'open <nome>' para abrir um link.";
        return output;
      }
    },
    {
      name: "sanguis",                  // ← palavra-chave principal que o usuário digita
      aliases: ["orchidaceae", "orchid"],     // ← apelidos opcionais (facilita digitar variantes)
      description: "???", // ← aparece no 'help'
      action: async () => {
        // Abre o link em nova aba
        window.open("/aurora-escarlate.html", "_blank");
        
        // Retorna uma mensagem no terminal (obrigatório retornar string ou Promise<string>)
        return "Acessando a Aurora Escarlate...";
      },
    },
    {
      name: "open",
      description: "Abre um link em uma nova aba",
      aliases: ["go"],
      action: (args: string[]) => {
        if (args.length === 0) {
          return "Uso: open <nome_do_link>\nUse 'links' para ver os links disponíveis.";
        }
        
        const linkName = args[0].toLowerCase();
        const url = terminalConfig.links[linkName];
        
        if (url) {
          window.open(url, '_blank');
          return `Abrindo ${linkName}... (${url})`;
        } else {
          return `Link '${linkName}' não encontrado. Use 'links' para ver os links disponíveis.`;
        }
      }
    },
    {
      name: "clear",
      description: "Limpa a tela do terminal",
      aliases: ["cls"],
      action: () => "CLEAR"
    },
    {
      name: "about",
      description: "Informações sobre o terminal",
      action: () => {
        return `Dozamigos Terminal v1.0

Este é um terminal web interativo criado para navegar facilmente
entre diferentes links e recursos.

Desenvolvido com React + TypeScript + Tailwind CSS.
        
Digite 'help' para ver todos os comandos disponíveis.`;
      }
    },
    {
      name: "date",
      description: "Mostra a data e hora atual",
      action: () => new Date().toLocaleString('pt-BR')
    }
  ]
};
