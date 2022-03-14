<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="images/logo.png" alt="Logo" width="80" height="80">

  <h3 align="center">Kordz (MoleDAO Hackathon Submission)</h3>

  <p align="center">
    <!--<a href="kordz.vercel.app">View Website @ kordz.vercel.app</a>-->
    <!--<br />-->
    <a href="https://mumbai.polygonscan.com/address/0x583ADc8C133fdaCEd2546c0348a5AB4aA7B5BBd6">View Smart Contract  @ Mumbai Block Explorer</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

I built Kordz in order to try my hand at blockchain development. It was pretty fun and hectic building this in a few days.

"**Kordz** is a simple but beautiful proof-of-concept of a decentralized music owning platform built with Polygon, aiming to reimagine how musicians earn a living and how fans discover new ways to connect with the music and each other. **Kordz** allows artists to sell digital songs to fans, who are then able to hold a digitally signed copy of your song (on the Polygon blockchain) that could be limited edition or even a 1/1 edition. **Kordz** encourages fans who want to support their favorite artists to support them by creating unique digital assets.

In a world where only very few extremely popular artists can earn a sustainable full-time living, **Kordz** aims to disrupt the music industry by introducing the concept of royalties, making it more possible for more people to earn a living from their music.

It is built with Next.js, and currently uses a Flask backend as temporary metadata storage. The smart contract is deployed on Polygon using the Truffle suite, making deployments simple and easy."

### Built With

- Polygon Network
- Next.js
- Truffle
- Flask
- Chakra UI

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy of **Kordz** up and running, follow these steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```
- Truffle
  ```sh
  npm install truffle -g
  ```

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/0xFabray/kordz.git
   ```

2. Fill in `.env.example` (project root) with your mnemonic and private key, then rename it to `.env`.
3. Deploy smart contract
   ```sh
   truffle migrate --network matic
   ```
4. Run Next.js frontend
   ```sh
   cd client
   yarn install
   yarn dev
   ```
5. Run Flask backend
   ```sh
   cd server
   pip install -r requirements.txt
   flask run
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

