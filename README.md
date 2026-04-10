# Turing Machine Simulator (TAFL)

A visually immersive, interactive **Turing Machine Simulator** built directly in the browser using HTML, modern CSS, and JavaScript. This tool is designed to help anyone visualize and understand the fundamental model of computation interactively.

## Features

- **Dynamic Visual Tape:** Watch as the machine's "Head" physically iterates over the infinite tape, modifying values sequentially.
- **State Diagram Tracking:** Keep track of the machine's transitions, halting conditions, and loops dynamically. 
- **Execution Logging:** Follow along exactly what the mathematical logic is doing underneath via an execution log tracking Step, State, Read, Write, and Movement.
- **Build Your Own:** A custom rule editor so you can try mapping out and building your own Turing logic.
- **Customizable Speed:** Execution speed sliders let you walk step-by-step or watch calculations fly.
- **Premium UI:** A beautifully engaging glassmorphism-styled dark mode aesthetic that makes theoretical computer science look cooler than ever.

## Included Preset Algorithms

The simulator comes pre-loaded with several classic Turing Machine functionalities so you can see it in action without configuring transition rules yourself:

- **Binary Increment**: Adds 1 to a binary number.
- **Palindrome Checker**: Dissects a binary string to check if it matches backward and forwards.
- **Unary Addition**: Adds two unary strings together. 
- **Binary Decrement**: Subtracts 1 from a binary sequence.
- **One's Complement**: Inverts all `1`s to `0`s and vice-versa within a binary sequence.
- **Two's Complement**: Computes the mathematical two's complement used in bitwise operations.

## How to Run

1. Clone or download this project to your computer.
2. The project contains zero dependencies and relies purely on standard web technologies.
3. Open `index.html` in any modern web browser (Edge, Chrome, Firefox, Safari).
4. Select a preset, manipulate the `Input String`, and hit **Run**!

## File Structure

- `index.html`: Contains the core structural markup of the simulator.
- `styles.css`: Contains the sleek visual styling, neon-colors, and animations used throughout the interface.
- `script.js`: Handles the underlying Turing mathematical operation logic, array mapping, and DOM manipulation. 

## About Turing Machines

A **Turing Machine** is a mathematical model of computation that dictates an abstract machine. Despite its simplicity, a Turing machine can be adapted to simulate the logic of any computer algorithm and is particularly useful in explaining the functions behind a CPU inside a standard computer.
