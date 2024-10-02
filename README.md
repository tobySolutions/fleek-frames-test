# Fleek Frames Test

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- Fleek CLI
- ngrok

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/fleek-user-dungeon.git
    cd fleek-user-dungeon
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```


3. **Build with rollup**
    ```bash
    npm run build
    ```

4. **Deploy the Fleek function**
    ```bash
    fleek functions deploy --name fudGame --path fleek.js
    ```

5. **Local testing**
    ```bash
    npm run dev
    ```

6. **Connect with ngrok and the Farcaster debugger**
    - Start ngrok
    ```bash
    ngrok http 3000
    ```
    - Use the generated ngrok URL with the Farcaster debugger: [Farcaster Frame Debugger](https://warpcast.com/~/developers/frames)

7. Alternative you can use Frames to test the game, just run the express server and [FramesJS](https://framesjs.org/) will take care of the rest.


### Playing the Game

You can access the game using the following link:
[Fleek User Dungeon](https://warpcast.com/an0n/0x3748eeea)

## Technical Details

- **Game Mechanics**: Built using [ROT.js](https://ondras.github.io/rot.js/hp/), a JavaScript library for roguelike games.
- **Rendering**: Custom SVG engine for rendering game visuals.
- **State Management**: State is manually compressed and then gzip compressed to fit within the Farcaster's constraints.
  
## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch
    ```bash
    git checkout -b feature/YourFeature
    ```
3. Commit your changes
    ```bash
    git commit -m 'Add some feature'
    ```
4. Push to the branch
    ```bash
    git push origin feature/YourFeature
    ```
5. Open a pull request

## License

This project is licensed under the MIT License.

## Contact

If you have any questions, feel free to open an issue or reach out to the project maintainer @eugenioclrc and @rotcivegaf.

---

Enjoy your adventure in Fleek User Dungeon!