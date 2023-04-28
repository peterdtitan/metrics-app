<a name="readme-top"></a>

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
  - [🚀 Live Presentation](#live-demo)
- [💻 Getting Started](#getting-started)
  - [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Usage](#usage)
  - [Run tests](#run-tests)
- [👥 Authors](#authors)
- [🔭 Future Features](#future-features)
- [🤝 Contributing](#contributing)
- [⭐️ Show your support](#support)
- [🙏 Acknowledgements](#acknowledgements)
- [❓ FAQ (OPTIONAL)](#faq)
- [📝 License](#license)

<!-- PROJECT DESCRIPTION -->

# 📖 Metrics App <a name="about-project"></a>

**Metrics App** is an app designed to give each user an idea of what the air quality is like around supported cities of the world. It features a countries page with dynamic navigation to states and then cities within the country, before returning an info on the selected city. It makes use of the redux store to update the countries as well as the state and cities for each country. Data on the city is fetched on each render as the values are constantly changed.

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

> The following tech stack was used to build this project:

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://javascript.com/">JavaScript</a></li>
    <li><a href="https://react.com/">React</a></li>
    <li><a href="https://tailwindcss.com/">Tailwind CSS</a></li>
  </ul>
</details>


<details>
<summary>Cloud Functions</summary>
  <ul>
    <li><a href="https://www.iqair.com/air-pollution-data-api">Open AIR API</a></li>
  </ul>
</details>

<!-- Features -->

### Key Features <a name="key-features"></a>

- **View all countries on the homepage**
- **Select a country to view states and cities**
- **Show recently viewed countries on the homepage with a badge**

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## 🚀 Live Demo Link <a name="live-demo"></a>

> View project demo on Render:

- [Live Link](https://metrics-app.onrender.com/)

- [Video Presentation](https://www.loom.com/share/ded06fb3da914ccabec519b06ec16bf8)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Prerequisites

In order to run this project you need:

```
  npm 
```

### Setup

Clone this repository to your desired folder:

```sh
  cd my-folder
  git clone https://github.com/peterdtitan/javascript-tv-app.git
```

### Install

Install this project with:

```
  npm install
```

### Usage

To run the project, execute the following command:

```
  npm start
```

### Run tests

To run tests using jest, run the following command:

```
  npm test
```


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- AUTHORS -->

## 👥 Authors <a name="authors"></a>

> The following users authored this project codebase:

👤 **Author1**

- GitHub: [Peter Okorafor](https://github.com/peterdtitan)
- Twitter: [PeterDeTitan](https://twitter.com/PeterDeTitan)
- LinkedIn: [Peter OKorafor](https://linkedin.com/in/peterokorafor)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE FEATURES -->

## 🔭 Future Features <a name="future-features"></a>

> In the future, the following features will be considered: 

- [ ] **Responsiveness for smaller devices**
- [ ] **More data on Air quality with detailed legends**
- [ ] **Embed light mode and dark mode features**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SUPPORT -->

## ⭐️ Show your support <a name="support"></a>

> If you like this project please follow and give it a star ⭐️

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGEMENTS -->

## 🙏 Acknowledgments <a name="acknowledgements"></a>

> I would like to thank [Microverse Inc](https://www.github.com/microverseinc) for providing the project requirements, the open API.

> Special thanks to [Nelson Sakwa on Behance](https://www.behance.net/gallery/31579789/Ballhead-App-(Free-PSDs)) for his original design idea (UI).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## ❓ FAQ <a name="faq"></a>

- **Is this an Open Source Project?**

  - Yes it is, however, there would not be subsequent deployments and maintenance of the app is dependent on third party APIs.

- **Can you make multiple requests to the API?**

  - Unfortunately, no you can not. It is limited to 10 calls per second so data mapping and loading (dispatch to store) at once is not possible.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## 📝 License <a name="license"></a>

This project is [MIT](./MIT.md) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
