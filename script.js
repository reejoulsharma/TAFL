/**
 * Turing Machine Simulator
 * A visual, interactive simulator for understanding Turing Machines
 */

class TuringMachine {
    constructor() {
        // Machine state
        this.tape = [];
        this.headPosition = 0;
        this.currentState = 'q0';
        this.rules = [];
        this.isRunning = false;
        this.stepCount = 0;
        this.blankSymbol = '␣';
        this.runInterval = null;
        this.speed = 500;

        // Preset machines
        this.presets = {
            binaryIncrement: {
                description: 'Increments a binary number by 1',
                rules: [
                    { currentState: 'q0', read: '0', write: '0', move: 'R', nextState: 'q0' },
                    { currentState: 'q0', read: '1', write: '1', move: 'R', nextState: 'q0' },
                    { currentState: 'q0', read: '␣', write: '␣', move: 'L', nextState: 'q1' },
                    { currentState: 'q1', read: '0', write: '1', move: 'N', nextState: 'qH' },
                    { currentState: 'q1', read: '1', write: '0', move: 'L', nextState: 'q1' },
                    { currentState: 'q1', read: '␣', write: '1', move: 'N', nextState: 'qH' }
                ],
                defaultInput: '1011'
            },
            palindrome: {
                description: 'Checks if a binary string is a palindrome',
                rules: [
                    // Start: check first character
                    { currentState: 'q0', read: '0', write: '␣', move: 'R', nextState: 'q1' },
                    { currentState: 'q0', read: '1', write: '␣', move: 'R', nextState: 'q2' },
                    { currentState: 'q0', read: '␣', write: '␣', move: 'N', nextState: 'qA' },
                    // q1: saw 0, go right to find end
                    { currentState: 'q1', read: '0', write: '0', move: 'R', nextState: 'q1' },
                    { currentState: 'q1', read: '1', write: '1', move: 'R', nextState: 'q1' },
                    { currentState: 'q1', read: '␣', write: '␣', move: 'L', nextState: 'q3' },
                    // q2: saw 1, go right to find end
                    { currentState: 'q2', read: '0', write: '0', move: 'R', nextState: 'q2' },
                    { currentState: 'q2', read: '1', write: '1', move: 'R', nextState: 'q2' },
                    { currentState: 'q2', read: '␣', write: '␣', move: 'L', nextState: 'q4' },
                    // q3: check if last is 0
                    { currentState: 'q3', read: '0', write: '␣', move: 'L', nextState: 'q5' },
                    { currentState: 'q3', read: '1', write: '1', move: 'N', nextState: 'qR' },
                    { currentState: 'q3', read: '␣', write: '␣', move: 'N', nextState: 'qA' },
                    // q4: check if last is 1
                    { currentState: 'q4', read: '0', write: '0', move: 'N', nextState: 'qR' },
                    { currentState: 'q4', read: '1', write: '␣', move: 'L', nextState: 'q5' },
                    { currentState: 'q4', read: '␣', write: '␣', move: 'N', nextState: 'qA' },
                    // q5: go back to start
                    { currentState: 'q5', read: '0', write: '0', move: 'L', nextState: 'q5' },
                    { currentState: 'q5', read: '1', write: '1', move: 'L', nextState: 'q5' },
                    { currentState: 'q5', read: '␣', write: '␣', move: 'R', nextState: 'q0' }
                ],
                defaultInput: '1001'
            },
            unaryAddition: {
                description: 'Adds two unary numbers (1s separated by 0)',
                rules: [
                    { currentState: 'q0', read: '1', write: '1', move: 'R', nextState: 'q0' },
                    { currentState: 'q0', read: '0', write: '1', move: 'R', nextState: 'q1' },
                    { currentState: 'q1', read: '1', write: '1', move: 'R', nextState: 'q1' },
                    { currentState: 'q1', read: '␣', write: '␣', move: 'L', nextState: 'q2' },
                    { currentState: 'q2', read: '1', write: '␣', move: 'N', nextState: 'qH' }
                ],
                defaultInput: '111011'
            },
            binaryDecrement: {
                description: 'Decrements a binary number by 1',
                rules: [
                    { currentState: 'q0', read: '0', write: '0', move: 'R', nextState: 'q0' },
                    { currentState: 'q0', read: '1', write: '1', move: 'R', nextState: 'q0' },
                    { currentState: 'q0', read: '␣', write: '␣', move: 'L', nextState: 'q1' },
                    { currentState: 'q1', read: '0', write: '1', move: 'L', nextState: 'q1' },
                    { currentState: 'q1', read: '1', write: '0', move: 'N', nextState: 'qH' },
                    { currentState: 'q1', read: '␣', write: '␣', move: 'N', nextState: 'qH' }
                ],
                defaultInput: '1010'
            },
            onesComplement: {
                description: "Computes the One's complement of a binary string",
                rules: [
                    { currentState: 'q0', read: '0', write: '1', move: 'R', nextState: 'q0' },
                    { currentState: 'q0', read: '1', write: '0', move: 'R', nextState: 'q0' },
                    { currentState: 'q0', read: '␣', write: '␣', move: 'N', nextState: 'qH' }
                ],
                defaultInput: '1011'
            },
            twosComplement: {
                description: "Computes the Two's complement of a binary string",
                rules: [
                    { currentState: 'q0', read: '0', write: '0', move: 'R', nextState: 'q0' },
                    { currentState: 'q0', read: '1', write: '1', move: 'R', nextState: 'q0' },
                    { currentState: 'q0', read: '␣', write: '␣', move: 'L', nextState: 'q1' },
                    { currentState: 'q1', read: '0', write: '0', move: 'L', nextState: 'q1' },
                    { currentState: 'q1', read: '1', write: '1', move: 'L', nextState: 'q2' },
                    { currentState: 'q1', read: '␣', write: '␣', move: 'N', nextState: 'qH' },
                    { currentState: 'q2', read: '0', write: '1', move: 'L', nextState: 'q2' },
                    { currentState: 'q2', read: '1', write: '0', move: 'L', nextState: 'q2' },
                    { currentState: 'q2', read: '␣', write: '␣', move: 'N', nextState: 'qH' }
                ],
                defaultInput: '0110'
            }
        };

        // DOM elements
        this.elements = {
            tape: document.getElementById('tape'),
            currentState: document.getElementById('currentState'),
            headPosition: document.getElementById('headPosition'),
            stepCount: document.getElementById('stepCount'),
            inputString: document.getElementById('inputString'),
            loadInput: document.getElementById('loadInput'),
            stepBtn: document.getElementById('stepBtn'),
            runBtn: document.getElementById('runBtn'),
            pauseBtn: document.getElementById('pauseBtn'),
            resetBtn: document.getElementById('resetBtn'),
            speed: document.getElementById('speed'),
            speedValue: document.getElementById('speedValue'),
            presetSelect: document.getElementById('presetSelect'),
            rulesBody: document.getElementById('rulesBody'),
            addRule: document.getElementById('addRule'),
            stateDiagram: document.getElementById('stateDiagram'),
            logContainer: document.getElementById('logContainer'),
            clearLog: document.getElementById('clearLog')
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadPreset('binaryIncrement');
        this.loadInputToTape();
    }

    bindEvents() {
        this.elements.loadInput.addEventListener('click', () => this.loadInputToTape());
        this.elements.stepBtn.addEventListener('click', () => this.step());
        this.elements.runBtn.addEventListener('click', () => this.run());
        this.elements.pauseBtn.addEventListener('click', () => this.pause());
        this.elements.resetBtn.addEventListener('click', () => this.reset());
        this.elements.addRule.addEventListener('click', () => this.addRuleRow());
        this.elements.clearLog.addEventListener('click', () => this.clearLog());
        
        this.elements.speed.addEventListener('input', (e) => {
            this.speed = parseInt(e.target.value);
            this.elements.speedValue.textContent = `${this.speed}ms`;
        });

        this.elements.presetSelect.addEventListener('change', (e) => {
            if (e.target.value !== 'custom') {
                this.loadPreset(e.target.value);
            }
        });

        this.elements.inputString.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.loadInputToTape();
            }
        });
    }

    loadPreset(presetName) {
        const preset = this.presets[presetName];
        if (!preset) return;

        this.rules = JSON.parse(JSON.stringify(preset.rules));
        this.elements.inputString.value = preset.defaultInput;
        this.renderRulesTable();
        this.updateStateDiagram();
        this.loadInputToTape();
        this.log(`Loaded preset: ${presetName}`, 'state');
    }

    loadInputToTape() {
        this.pause();
        const input = this.elements.inputString.value || '';
        
        // Initialize tape with blank symbols padding
        this.tape = [this.blankSymbol, this.blankSymbol];
        for (const char of input) {
            this.tape.push(char);
        }
        this.tape.push(this.blankSymbol, this.blankSymbol, this.blankSymbol);
        
        this.headPosition = 2; // Start at first input character
        this.currentState = 'q0';
        this.stepCount = 0;
        
        this.renderTape();
        this.updateDisplay();
        this.updateStateDiagram();
        this.log(`Loaded input: "${input}"`, 'step');
    }

    renderTape() {
        this.elements.tape.innerHTML = '';
        
        this.tape.forEach((symbol, index) => {
            const cell = document.createElement('div');
            cell.className = 'tape-cell';
            if (index === this.headPosition) {
                cell.classList.add('active');
            }
            cell.textContent = symbol;
            cell.dataset.index = index;
            this.elements.tape.appendChild(cell);
        });

        // Scroll to keep head in view
        const activeCell = this.elements.tape.querySelector('.active');
        if (activeCell) {
            activeCell.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }

    updateDisplay() {
        this.elements.currentState.textContent = this.currentState;
        this.elements.headPosition.textContent = this.headPosition;
        this.elements.stepCount.textContent = this.stepCount;
    }

    step() {
        if (this.isHalted()) {
            this.log('Machine has halted. Reset to continue.', 'halt');
            return false;
        }

        const currentSymbol = this.tape[this.headPosition];
        const rule = this.findRule(this.currentState, currentSymbol);

        if (!rule) {
            this.log(`No rule found for state "${this.currentState}" reading "${currentSymbol}". Halting.`, 'halt');
            this.currentState = 'qH';
            this.updateDisplay();
            this.updateStateDiagram();
            this.highlightActiveRule(null);
            return false;
        }

        // Log the step
        this.stepCount++;
        this.log(`Step ${this.stepCount}: State=${this.currentState}, Read="${currentSymbol}"`, 'step');

        // Execute the rule
        // 1. Write
        if (rule.write !== currentSymbol) {
            this.tape[this.headPosition] = rule.write;
            this.log(`  → Write "${rule.write}"`, 'write');
            this.animateCellModification(this.headPosition);
        }

        // 2. Move
        if (rule.move === 'L') {
            this.headPosition--;
            this.log(`  → Move Left`, 'move');
        } else if (rule.move === 'R') {
            this.headPosition++;
            this.log(`  → Move Right`, 'move');
        }

        // Extend tape if needed
        this.ensureTapeBounds();

        // 3. Transition
        const oldState = this.currentState;
        this.currentState = rule.nextState;
        if (oldState !== this.currentState) {
            this.log(`  → Transition to "${this.currentState}"`, 'state');
        }

        // Update UI
        this.renderTape();
        this.updateDisplay();
        this.updateStateDiagram();
        this.highlightActiveRule(rule);

        // Check for halt/accept states
        if (this.isHalted()) {
            if (this.currentState === 'qA') {
                this.log('✓ Machine accepted! (Reached accept state)', 'accept');
            } else if (this.currentState === 'qR') {
                this.log('✗ Machine rejected! (Reached reject state)', 'halt');
            } else {
                this.log('Machine halted.', 'halt');
            }
            return false;
        }

        return true;
    }

    findRule(state, symbol) {
        return this.rules.find(r => r.currentState === state && r.read === symbol);
    }

    isHalted() {
        return ['qH', 'qA', 'qR', 'halt', 'accept', 'reject'].includes(this.currentState.toLowerCase());
    }

    ensureTapeBounds() {
        // Add blank cells at the start if needed
        while (this.headPosition < 2) {
            this.tape.unshift(this.blankSymbol);
            this.headPosition++;
        }
        
        // Add blank cells at the end if needed
        while (this.headPosition >= this.tape.length - 2) {
            this.tape.push(this.blankSymbol);
        }
    }

    animateCellModification(index) {
        setTimeout(() => {
            const cell = this.elements.tape.children[index];
            if (cell) {
                cell.classList.add('modified');
                setTimeout(() => cell.classList.remove('modified'), 500);
            }
        }, 50);
    }

    run() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.elements.runBtn.disabled = true;
        this.elements.pauseBtn.disabled = false;
        this.elements.stepBtn.disabled = true;

        const executeStep = () => {
            if (!this.isRunning) return;
            
            const canContinue = this.step();
            if (canContinue && this.isRunning) {
                this.runInterval = setTimeout(executeStep, this.speed);
            } else {
                this.pause();
            }
        };

        executeStep();
    }

    pause() {
        this.isRunning = false;
        if (this.runInterval) {
            clearTimeout(this.runInterval);
            this.runInterval = null;
        }
        
        this.elements.runBtn.disabled = false;
        this.elements.pauseBtn.disabled = true;
        this.elements.stepBtn.disabled = false;
    }

    reset() {
        this.pause();
        this.loadInputToTape();
        this.clearLog();
        this.log('Machine reset.', 'step');
    }

    // Rules Table Management
    renderRulesTable() {
        this.elements.rulesBody.innerHTML = '';
        
        this.rules.forEach((rule, index) => {
            this.addRuleRow(rule, index);
        });
    }

    addRuleRow(rule = null, index = null) {
        const row = document.createElement('tr');
        const isNew = rule === null;
        
        if (isNew) {
            rule = { currentState: 'q0', read: '0', write: '0', move: 'R', nextState: 'q0' };
            index = this.rules.length;
            this.rules.push(rule);
        }

        row.dataset.index = index;
        row.innerHTML = `
            <td><input type="text" value="${rule.currentState}" data-field="currentState" maxlength="10"></td>
            <td><input type="text" value="${rule.read}" data-field="read" maxlength="1"></td>
            <td><input type="text" value="${rule.write}" data-field="write" maxlength="1"></td>
            <td>
                <select data-field="move">
                    <option value="L" ${rule.move === 'L' ? 'selected' : ''}>Left (L)</option>
                    <option value="R" ${rule.move === 'R' ? 'selected' : ''}>Right (R)</option>
                    <option value="N" ${rule.move === 'N' ? 'selected' : ''}>None (N)</option>
                </select>
            </td>
            <td><input type="text" value="${rule.nextState}" data-field="nextState" maxlength="10"></td>
            <td><button class="btn btn-danger delete-rule">Delete</button></td>
        `;

        // Bind events for this row
        row.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('change', (e) => {
                const field = e.target.dataset.field;
                const rowIndex = parseInt(row.dataset.index);
                this.rules[rowIndex][field] = e.target.value;
                this.elements.presetSelect.value = 'custom';
                this.updateStateDiagram();
            });
        });

        row.querySelector('.delete-rule').addEventListener('click', () => {
            const rowIndex = parseInt(row.dataset.index);
            this.rules.splice(rowIndex, 1);
            this.renderRulesTable();
            this.elements.presetSelect.value = 'custom';
            this.updateStateDiagram();
        });

        this.elements.rulesBody.appendChild(row);
    }

    highlightActiveRule(rule) {
        // Remove previous highlights
        this.elements.rulesBody.querySelectorAll('tr').forEach(row => {
            row.classList.remove('active-rule');
        });

        if (!rule) return;

        // Find and highlight the matching rule
        const rows = this.elements.rulesBody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            if (this.rules[index] === rule) {
                row.classList.add('active-rule');
            }
        });
    }

    // State Diagram
    updateStateDiagram() {
        const states = new Set();
        
        // Collect all states
        this.rules.forEach(rule => {
            states.add(rule.currentState);
            states.add(rule.nextState);
        });

        // Always include q0 and halt states if they exist in rules
        states.add('q0');

        this.elements.stateDiagram.innerHTML = '';
        
        states.forEach(state => {
            const node = document.createElement('div');
            node.className = 'state-node';
            node.textContent = state;
            
            if (state === this.currentState) {
                node.classList.add('active');
            }
            
            if (['qH', 'qR', 'halt', 'reject'].includes(state.toLowerCase())) {
                node.classList.add('halt');
            }
            
            if (['qA', 'accept'].includes(state.toLowerCase())) {
                node.classList.add('accept');
            }

            this.elements.stateDiagram.appendChild(node);
        });
    }

    // Logging
    log(message, type = 'step') {
        // Remove placeholder if exists
        const placeholder = this.elements.logContainer.querySelector('.log-placeholder');
        if (placeholder) {
            placeholder.remove();
        }

        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.textContent = message;
        
        this.elements.logContainer.appendChild(entry);
        this.elements.logContainer.scrollTop = this.elements.logContainer.scrollHeight;
    }

    clearLog() {
        this.elements.logContainer.innerHTML = '<p class="log-placeholder">Execution steps will appear here...</p>';
    }
}

// Initialize the simulator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.turingMachine = new TuringMachine();
});
