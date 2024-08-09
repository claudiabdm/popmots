# PopMots!

![PopMots logo](./public/logo-horizontal.png)

## Introduction

Popmots is a responsive web app that allows you to learn the 10000 most common French words with flashcards using spaced repetition.

You can study flashcards for each word. Each flashcard contain multiple meaning for the word along with examples and pronunctiation.

Data is stored locally, so no need of log in but if you want to use the app on a different device, you need to export your data and import it into the app on the other device.

Try it out at [https://popmots.com](https://popmots.com) !

## Features

- [x] Schedule cards based on the [fsrs](https://github.com/open-spaced-repetition/free-spaced-repetition-scheduler) spaced repetition algorithm
- [x] Rate flashcards by hard, good or easy to remember
- [x] 7 day forescat of due cards
- [x] Set the number of new cards per day
- [ ] (wip) PWA for offline use
- [ ] Keep data local with IndexDB (better for PWA) or use Supabase

## Tech Stack

- [Sass](https://sass-lang.com/)
- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Chart.js](https://www.chartjs.org/)
- [Spaced Repetition Scheduler](https://github.com/open-spaced-repetition/ts-fsrs)
