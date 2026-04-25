# MoTekLab Proxy Suite - Official Distribution Hub

Welcome to the official distribution repository for **MoTekLab Proxy Suite**. This repository is dedicated to providing the latest stable binaries, documentation, and update metadata for the MoTekLab community.

## 🚀 Overview

MoTekLab Proxy Suite is a professional-grade proxy management and automation engine. It empowers security researchers, data scientists, and developers with a robust toolset for harvesting, validating, and utilizing proxies at scale.

### Core Capabilities:
- **Autonomous Harvesting**: Scrapes proxies from 500+ verified sources including GitHub, APIs, and raw web targets.
- **Multi-Vector Validation**: High-performance checking engine that verifies anonymity (Elite, Anonymous, Transparent), speed, and SSL support.
- **Intelligent Rotation**: Integrated proxy server with support for cascading, round-robin, and random rotation strategies.
- **Privacy Hardening**: Automatic stripping of identifying headers and leak prevention (WebRTC/DNS).
- **Stealth Discovery**: Uses local search intelligence to discover new proxy sources without triggering CAPTCHAs.

## 📦 Downloads & Installation

The latest stable binaries are maintained in the [dist](./dist) folder. We recommend using the **AppImage** for Linux for the most seamless experience.

| Platform | Format | Recommendation |
| :--- | :--- | :--- |
| **Linux (Universal)** | [.AppImage](./dist/MoTekLab_Proxy_Suite.AppImage) | **Primary** - Works on almost all distributions. |
| **Linux (Debian/Ubuntu)** | [.deb](./dist/MoTekLab_Proxy_Suite.deb) | Secondary - For native system integration. |

### Installation Instructions:

#### Linux (AppImage)
1. Download the latest `.AppImage` file from the [Releases](https://github.com/motaz-hefny/md-converter/releases) page.
2. Grant execution permissions:
   ```bash
   chmod +x MoTekLab_Proxy_Suite-0.1.13.AppImage
   ```
3. Launch the application:
   ```bash
   ./MoTekLab_Proxy_Suite-0.1.13.AppImage
   ```

#### Linux (Debian/Ubuntu)
1. Download the `.deb` package.
2. Install via terminal:
   ```bash
   sudo dpkg -i MoTekLab_Proxy_Suite-0.1.13.deb
   sudo apt-get install -f # Fix potential dependencies
   ```

## 🔄 Update System

MoTekLab Proxy Suite features a native update mechanism. The application periodically checks this repository's [latest.json](./dist/latest.json) for new versions. When an update is detected, you will receive a notification with a direct link to the new binary.

## 📝 Change Log

### [v0.1.13] - 2026-04-25
#### Added
- Native "Check for Updates" functionality in the About tab.
- Platform-aware update recommendations (AppImage vs .deb).
- Dynamic versioning in UI (StatusBar and About tab).

#### Fixed
- Resolved database contention during high-concurrency scraping missions.
- Fixed a critical IPC shielding issue that could cause renderer crashes.
- Corrected version mismatch in translations.

#### Changed
- Enhanced proxy harvester discovery logic to prefer SSL-encrypted sources.

## 🛡️ Security & Privacy

MoTekLab Proxy Suite is designed with a "Local First" philosophy. All proxy lists, job histories, and configuration settings are stored locally in an encrypted database on your machine. We do not transmit your proxy data to external servers.

---
© 2026 MoTekLab. Advanced Agentic Systems for a Secure Future.
