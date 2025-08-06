import readline from 'readline';
import chalk from 'chalk';

export interface PromptOptions {
  message: string;
  default?: string;
  required?: boolean;
  multiline?: boolean;
  choices?: string[];
  validate?: (input: string) => boolean | string;
}

export class InteractivePrompts {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async prompt(options: PromptOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      const { message, default: defaultValue, required = false, choices, validate } = options;

      let promptMessage = chalk.cyan(`? ${message}`);

      if (choices) {
        promptMessage += chalk.gray(` (${choices.join('/')})`);
      }

      if (defaultValue) {
        promptMessage += chalk.gray(` (${defaultValue})`);
      }

      promptMessage += ': ';

      this.rl.question(promptMessage, (answer) => {
        const input = answer.trim() || defaultValue || '';

        // Check if required
        if (required && !input) {
          console.log(chalk.red('✗ This field is required'));
          this.prompt(options).then(resolve).catch(reject);
          return;
        }

        // Check choices
        if (choices && input && !choices.includes(input)) {
          console.log(chalk.red(`✗ Please choose from: ${choices.join(', ')}`));
          this.prompt(options).then(resolve).catch(reject);
          return;
        }

        // Validate
        if (validate && input) {
          const validation = validate(input);
          if (validation !== true) {
            console.log(chalk.red(`✗ ${typeof validation === 'string' ? validation : 'Invalid input'}`));
            this.prompt(options).then(resolve).catch(reject);
            return;
          }
        }

        resolve(input);
      });
    });
  }

  async multilinePrompt(message: string, endMarker: string = 'END'): Promise<string> {
    console.log(chalk.cyan(`? ${message}`));
    console.log(chalk.gray(`  (Type your response, then '${endMarker}' on a new line to finish)`));

    return new Promise((resolve) => {
      const lines: string[] = [];

      const collectInput = () => {
        this.rl.question('  ', (line) => {
          if (line.trim() === endMarker) {
            resolve(lines.join('\n'));
          } else {
            lines.push(line);
            collectInput();
          }
        });
      };

      collectInput();
    });
  }

  async confirm(message: string, defaultValue: boolean = false): Promise<boolean> {
    const defaultStr = defaultValue ? 'Y/n' : 'y/N';
    const answer = await this.prompt({
      message: `${message} (${defaultStr})`,
      default: defaultValue ? 'y' : 'n',
      validate: (input) => {
        const lower = input.toLowerCase();
        return ['y', 'yes', 'n', 'no'].includes(lower) || 'Please answer y/yes or n/no';
      },
    });

    const lower = answer.toLowerCase();
    return lower === 'y' || lower === 'yes';
  }

  async select(message: string, choices: Array<{name: string, value: string, description?: string}>): Promise<string> {
    console.log(chalk.cyan(`? ${message}`));

    choices.forEach((choice, index) => {
      const desc = choice.description ? chalk.gray(` - ${choice.description}`) : '';
      console.log(`  ${index + 1}. ${choice.name}${desc}`);
    });

    const answer = await this.prompt({
      message: 'Select option',
      required: true,
      validate: (input) => {
        const num = parseInt(input);
        return (num >= 1 && num <= choices.length) || `Please select 1-${choices.length}`;
      },
    });

    const index = parseInt(answer) - 1;
    return choices[index].value;
  }

  async multiSelect(message: string, choices: Array<{name: string, value: string, description?: string}>): Promise<string[]> {
    console.log(chalk.cyan(`? ${message}`));

    choices.forEach((choice, index) => {
      const desc = choice.description ? chalk.gray(` - ${choice.description}`) : '';
      console.log(`  ${index + 1}. ${choice.name}${desc}`);
    });

    const answer = await this.prompt({
      message: 'Select options (comma-separated)',
      required: true,
      validate: (input) => {
        const nums = input.split(',').map(s => parseInt(s.trim()));
        const valid = nums.every(num => num >= 1 && num <= choices.length);
        return valid || `Please select numbers 1-${choices.length}, comma-separated`;
      },
    });

    const indices = answer.split(',').map(s => parseInt(s.trim()) - 1);
    return indices.map(i => choices[i].value);
  }

  close(): void {
    this.rl.close();
  }
}
