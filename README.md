# Intro to Classical Music

An interactive, browser-based syllabus tracker for learning classical music through guided listening sessions.

## Overview

This is a 14-week self-paced introduction to classical music, featuring carefully selected pieces from the Baroque through Contemporary periods. The application helps you track your progress through multiple listening sessions for each piece, with dedicated spaces for reflection and note-taking.

## Features

- **Progressive Listening**: Track three required listening sessions per piece, with the ability to add unlimited additional listens
- **Note Taking**: Separate note areas for each listening session to capture evolving impressions and insights
- **Auto-Save**: All progress and notes are automatically saved to your browser's local storage
- **Visual Progress**: Overall progress bar showing completion across all 14 pieces
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Expandable Cards**: Click to expand/collapse each piece for a cleaner interface
- **Listening Guidance**: Includes tips on active listening and supplementary activities

## Syllabus Contents

### Unit 1: Baroque and Classical Foundations (4 weeks)
- J.S. Bach - Brandenburg Concerto No. 3
- Vivaldi - The Four Seasons (Spring)
- Mozart - Symphony No. 40 in G minor
- Handel - Messiah (Hallelujah Chorus)

### Unit 2: Romantic Era (4 weeks)
- Beethoven - Symphony No. 5
- Chopin - Nocturne in E-flat Major, Op. 9 No. 2
- Tchaikovsky - 1812 Overture
- Brahms - Symphony No. 4 (4th movement)

### Unit 3: Late Romantic and 20th Century (4 weeks)
- Debussy - Clair de Lune
- Stravinsky - The Rite of Spring
- Gershwin - Rhapsody in Blue
- Shostakovich - Symphony No. 5 (1st movement)

### Unit 4: Modern and Contemporary (2 weeks)
- John Adams - Short Ride in a Fast Machine
- Philip Glass - Glassworks (Opening)

## How to Use

1. **Open the application**: Simply open `classical-music.html` in any modern web browser (Chrome, Firefox, Safari, Edge)

2. **Listen to each piece**: Start with Week 1 and work through the syllabus sequentially

3. **Complete listening sessions**:
   - **First Listen**: Initial impressions and general observations
   - **Second Listen**: Deeper analysis, notice new details
   - **Third Listen**: Comprehensive understanding and synthesis

4. **Track your progress**: Check off each listening session as you complete it. The main week checkbox automatically marks complete when you finish the third listen

5. **Add additional listens**: Use the "+ Add Additional Listen" button to track further engagement with pieces you want to explore more deeply

6. **Export your progress**: Open the browser console and run `exportProgress()` to download your notes and progress as JSON

## Technical Details

- Pure vanilla JavaScript (no dependencies)
- CSS custom properties for theming
- LocalStorage for data persistence
- Responsive design with mobile-first approach

## Data Management

### Export Progress
Open your browser's developer console and type:
```javascript
exportProgress()
```
This downloads a JSON file with all your progress and notes.

### Clear All Data
To start over completely:
```javascript
clearProgress()
```
⚠️ This cannot be undone!

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript
- CSS Grid and Flexbox
- LocalStorage API

## License

This project is open source and available for personal and educational use.

## Acknowledgments

Syllabus designed to provide a comprehensive introduction to Western classical music across major historical periods, with carefully selected representative works for active listening practice.
