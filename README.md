# Tempomat, a CI monitor for all your devices

Tempomat is a macOS/iPhone/iPad application to monitor your CI pipelines, the main app sits on the macOS menu bar and displays numbers to show you how many builds are broken/pending/passed, with companion apps for iPhone and iPad.

It supports the following CI/CD systems:
- Circle CI
- Github Actions
- Travis CI
- Bitrise
- Microsoft Appcenter
- Gitlab (no hosted instances atm, only public service)

The project was heavily inspired by [CCMenu](http://ccmenu.org), which is still functional and free, however it does have some limitations, ex. it only show the status of the `master` branch and it is a read-only integration, it cannot interact with the APIs of the systems, **Tempomat** solves all this issues by integrating directly with the APIs, meaning a richer integration

![Tempomat Preview](https://github.com/ospfranco/tempomat/blob/master/assets/Banner2.jpg?raw=true)

[Get it on the app store](https://apps.apple.com/de/app/tempomat-ci-status-monitor/id1509296762?l=en)

## Features
- See all of your repository branches in a single place
- Securely store tokens on your device
- Connects with different CI systems APIs to provide a rich integration
- Written in React-Native = good performance
- Receive a notification when a build breaks
- Trigger rebuild right from your desktop

## Licensing
Tempomat is licensed under the Outrun Labs EULA 1.1.

The TL;DR is:

- Free for non-commercial and educational use.
- Commercial use requires the purchase of a license.
- You may not redistribute source code or binaries under a different license.

There is nothing stopping you from building the project from the source and just running it yourself, just don't try to rebrand it an sell it under a different name, there is a packaged version on the app stores for a small fee which would be a great way of giving back.

## Android Support
This being a RN app can also run on android, however I have run out of free time to add such big features without receiving some economic incentive, if you do create a PR I would gladly merge it and release it though, you only need to create a small amount of native code to securely store strings on mobile devices.

## Contributing
Feel free to open a PR, I will gladly review it and merge into master and manage all the release cycles.
