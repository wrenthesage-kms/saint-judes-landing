@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Libre+Franklin:wght@400;500;600;700;800;900&display=swap');

:root {
  --black: #090a09;
  --charcoal: #121412;
  --deep: #181b17;
  --paper: #d8d1bb;
  --paper-dark: #a9a18b;
  --bone: #e8e0c9;
  --green: #596447;
  --dark-green: #273127;
  --olive: #747858;
  --rust: #873c27;
  --rust-dark: #4d2419;
  --yellow: #c4a75b;
  --red: #7f2c24;
  --line: rgba(216, 209, 187, 0.18);
  --mono: "DM Mono", monospace;
  --sans: "Libre Franklin", sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background:
    radial-gradient(
      circle at 20% 0%,
      rgba(89, 100, 71, 0.16),
      transparent 28rem
    ),
    radial-gradient(
      circle at 90% 50%,
      rgba(135, 60, 39, 0.10),
      transparent 30rem
    ),
    var(--black);
  color: var(--paper);
  font-family: var(--sans);
  line-height: 1.65;
  overflow-x: hidden;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 100;
  opacity: 0.035;
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 3px,
      #fff 4px
    );
}

.site-noise {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 99;
  opacity: 0.035;
  background:
    radial-gradient(
      circle at 10% 20%,
      #fff 0 1px,
      transparent 1px
    ),
    radial-gradient(
      circle at 70% 60%,
      #fff 0 1px,
      transparent 1px
    );
  background-size: 17px 19px, 23px 29px;
}

a {
  color: inherit;
}

img {
  display: block;
  max-width: 100%;
}

.site-header {
  min-height: 100vh;
  padding: 1rem;
  border-bottom: 1px solid var(--line);
  background:
    linear-gradient(
      135deg,
      rgba(89, 100, 71, 0.10),
      transparent 35%
    ),
    linear-gradient(
      320deg,
      rgba(135, 60, 39, 0.12),
      transparent 40%
    );
}

.header-top {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 2rem;
  align-items: center;
  border-bottom: 1px solid var(--line);
  padding-bottom: 0.75rem;
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.back-link {
  text-decoration: none;
}

.back-link:hover {
  color: var(--yellow);
}

.header-label {
  color: var(--paper-dark);
}

#local-clock {
  color: var(--yellow);
}

.header-line {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.6rem 0;
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  color: var(--rust);
}

.hero {
  max-width: 1500px;
  margin: 6rem auto 0;
  display: grid;
  grid-template-columns:
    minmax(0, 1.25fr)
    minmax(300px, 0.75fr);
  gap: 5rem;
  align-items: end;
}

.eyebrow,
.section-label,
.field-label {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--yellow);
}

.hero h1 {
  margin: 0.25rem 0 1rem;
  font-size: clamp(6rem, 17vw, 15rem);
  line-height: 0.78;
  letter-spacing: -0.09em;
  font-weight: 900;
  color: var(--bone);
  text-transform: uppercase;
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.hero-meta span {
  padding: 0.35rem 0.6rem;
  border: 1px solid rgba(196, 167, 91, 0.5);
  color: var(--yellow);
  font-family: var(--mono);
  font-size: 0.65rem;
}

.hero-description {
  max-width: 650px;
  font-size: clamp(1rem, 1.4vw, 1.3rem);
  color: var(--paper-dark);
}

.hero-image {
  margin: 0;
  transform: rotate(1deg);
}

.hero-image img {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  filter: saturate(0.7) contrast(1.1);
  border: 1px solid rgba(216, 209, 187, 0.2);
}

figcaption {
  padding-top: 0.45rem;
  font-family: var(--mono);
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--paper-dark);
}

.record-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  padding: 0.6rem 1rem;
  background: rgba(9, 10, 9, 0.94);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
}

.record-nav a {
  padding: 0.4rem 0.6rem;
  text-decoration: none;
  font-family: var(--mono);
  font-size: 0.58rem;
  color: var(--paper-dark);
}

.record-nav a:hover,
.record-nav a.active {
  color: var(--bone);
  background: var(--dark-green);
}

main {
  width: min(1400px, calc(100% - 2rem));
  margin: 0 auto;
}

.page-section {
  position: relative;
  padding: 8rem 0;
  border-bottom: 1px solid var(--line);
}

.section-label {
  margin-bottom: 1.5rem;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: baseline;
  margin-bottom: 3rem;
  border-bottom: 1px solid var(--line);
  padding-bottom: 1rem;
}

.section-heading h2 {
  margin: 0;
  font-size: clamp(2.5rem, 6vw, 6rem);
  line-height: 0.9;
  letter-spacing: -0.06em;
  text-transform: uppercase;
}

.section-heading p {
  margin: 0;
  font-family: var(--mono);
  font-size: 0.65rem;
  color: var(--paper-dark);
}

.character-statement {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem;
  background: var(--deep);
  border-left: 4px solid var(--green);
  position: relative;
}

.character-statement p {
  font-size: clamp(1.1rem, 1.7vw, 1.5rem);
}

.statement-mark {
  position: absolute;
  top: -1rem;
  left: 1rem;
  font-family: Georgia, serif;
  font-size: 8rem;
  color: var(--olive);
  opacity: 0.3;
}


/* WREN */

.wren-section {
  background: var(--green);
  color: #10120e;
  margin-left: calc((1400px - 100vw) / 2);
  margin-right: calc((1400px - 100vw) / 2);
  padding-left: max(1rem, calc((100vw - 1400px) / 2));
  padding-right: max(1rem, calc((100vw - 1400px) / 2));
}

.wren-section .section-label {
  color: #10120e;
}

.wren-wrap {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 4rem;
  align-items: start;
}

.wren-heading span {
  font-family: var(--mono);
  font-size: 0.65rem;
}

.wren-heading h2 {
  margin: 0.5rem 0 0;
  max-width: 600px;
  font-size: clamp(3rem, 7vw, 7rem);
  line-height: 0.84;
  letter-spacing: -0.07em;
}

.wren-note {
  max-width: 850px;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.16);
  border: 1px solid rgba(0, 0, 0, 0.25);
}

.wren-note p {
  font-size: 1.05rem;
}


/* DATA */

.data-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--line);
}

.data-item {
  background: var(--charcoal);
  padding: 1rem;
  min-height: 105px;
}

.data-item span {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--yellow);
}

.data-item strong {
  display: block;
  margin-top: 0.4rem;
  font-size: 0.95rem;
  color: var(--bone);
}


/* PHYSICAL */

.split-section {
  display: grid;
  grid-template-columns: 1fr 0.75fr;
  gap: 5rem;
  align-items: center;
}

.split-section h2,
.personality-intro h2 {
  font-size: clamp(3rem, 7vw, 7rem);
  line-height: 0.88;
  letter-spacing: -0.07em;
  margin: 0 0 2rem;
}

.split-copy p {
  max-width: 750px;
}

.large-image {
  margin: 0;
  transform: rotate(-1deg);
}

.large-image img {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  filter: saturate(0.7);
}

.physical-grid {
  margin-top: 4rem;
}


/* ANIMAL */

.animal-section {
  background:
    linear-gradient(
      90deg,
      rgba(216, 209, 187, 0.025) 1px,
      transparent 1px
    ),
    linear-gradient(
      rgba(216, 209, 187, 0.025) 1px,
      transparent 1px
    );
  background-size: 32px 32px;
}

.behavior-grid,
.routine-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
}

.behavior-grid article,
.routine-grid article {
  background: var(--charcoal);
  padding: 1.5rem;
  min-height: 160px;
}

.behavior-grid p,
.routine-grid p {
  margin-bottom: 0;
}


/* PERSONALITY */

.personality-intro {
  max-width: 800px;
  margin-bottom: 3rem;
}

.personal-banner {
  padding: 3rem;
  margin-bottom: 2rem;
  background: var(--rust-dark);
  transform: rotate(-0.5deg);
}

.personal-banner h2 {
  margin: 0;
  font-size: clamp(3rem, 7vw, 7rem);
  line-height: 0.85;
  letter-spacing: -0.07em;
}

.personal-banner p {
  margin-bottom: 0;
  font-family: var(--mono);
  color: var(--yellow);
}

.personal-objects {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

.personal-objects figure {
  margin: 0;
}

.personal-objects img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.object-note {
  padding: 2rem;
  background: var(--deep);
}

.object-note h3 {
  margin-top: 0;
  font-family: var(--mono);
  font-size: 0.72rem;
  color: var(--yellow);
}

.object-note p {
  margin-top: 0.2rem;
  margin-bottom: 2rem;
}


/* HABITS */

.habit-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.habit-strip span {
  padding: 0.5rem 0.7rem;
  background: var(--dark-green);
  color: var(--paper);
  font-family: var(--mono);
  font-size: 0.6rem;
  text-transform: uppercase;
}


/* OUTLIERS */

.outlier-section {
  background:
    linear-gradient(
      135deg,
      rgba(135, 60, 39, 0.08),
      transparent 40%
    );
}

.outlier-warning {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  padding: 1.5rem;
  margin-bottom: 2rem;
  background: var(--rust-dark);
  border-left: 5px solid var(--rust);
}

.outlier-warning strong {
  font-size: 1.2rem;
}

.outlier-warning span {
  font-family: var(--mono);
  font-size: 0.65rem;
  color: var(--yellow);
}

.outlier-copy {
  max-width: 900px;
  font-size: 1.15rem;
  margin-bottom: 3rem;
}


/* HISTORY */

.history-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: var(--line);
}

.history-item {
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  gap: 1rem;
  padding: 1rem;
  background: var(--charcoal);
}

.history-item span {
  font-family: var(--mono);
  color: var(--yellow);
  font-size: 0.65rem;
  text-transform: uppercase;
}


/* ROOM */

.objects-layout {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  gap: 4rem;
  align-items: start;
}

.object-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--line);
}

.object-list article {
  background: var(--charcoal);
  padding: 1.5rem;
}

.objects-layout figure {
  margin: 0;
}

.objects-layout figure img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  filter: sepia(0.15) saturate(0.7);
}

.fire-note {
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid var(--rust);
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-family: var(--mono);
  font-size: 0.7rem;
}

.fire-note strong {
  color: var(--yellow);
}


/* PHRASES */

.phrases-section {
  background: var(--deep);
}

.phrase-list {
  max-width: 1000px;
  margin: auto;
}

.phrase-list blockquote {
  margin: 0;
  padding: 2rem 0;
  border-bottom: 1px solid var(--line);
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  line-height: 1.25;
}

.pending-note {
  color: var(--paper-dark);
  font-family: var(--mono);
  font-size: 0.65rem;
}


/* NINE */

.nine-section {
  background:
    linear-gradient(
      110deg,
      rgba(89, 100, 71, 0.08),
      transparent 45%
    ),
    var(--black);
}

.nine-layout {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 4rem;
  align-items: start;
}

.nine-copy h2 {
  margin: 0 0 2rem;
  font-size: clamp(3rem, 7vw, 7rem);
  line-height: 0.85;
  letter-spacing: -0.07em;
}

.nine-copy p {
  max-width: 700px;
}

.nine-images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.nine-images figure {
  margin: 0;
}

.nine-images img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  filter: saturate(0.65) contrast(1.05);
}


/* QUESTIONNAIRE */

.questionnaire-section {
  background: #0e100d;
}

.questionnaire-heading {
  max-width: 1000px;
  margin-bottom: 3rem;
}

.questionnaire-heading h2 {
  margin: 0;
  font-size: clamp(2.5rem, 6vw, 6rem);
  line-height: 0.9;
  letter-spacing: -0.06em;
}

.questionnaire-heading p {
  max-width: 700px;
  color: var(--paper-dark);
}

.questionnaire-note {
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--dark-green);
  font-family: var(--mono);
  font-size: 0.68rem;
}

.questionnaire-groups {
  columns: 3 280px;
  column-gap: 1rem;
}

.questionnaire-groups article {
  break-inside: avoid;
  margin-bottom: 1rem;
  padding: 1.5rem;
  background: var(--charcoal);
  border-top: 2px solid var(--green);
}

.questionnaire-groups h3 {
  margin-top: 0;
  font-size: 1rem;
  text-transform: uppercase;
}

.questionnaire-groups ul {
  padding-left: 1.2rem;
  color: var(--paper-dark);
  font-size: 0.8rem;
}


/* FOOTER */

.site-footer {
  padding: 3rem 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  border-top: 1px solid var(--line);
  background: #050605;
  font-family: var(--mono);
  font-size: 0.62rem;
  color: var(--paper-dark);
  text-transform: uppercase;
}

.site-footer div {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.site-footer strong {
  color: var(--yellow);
}


/* MISSING IMAGES */

.image-missing {
  min-height: 180px;
  opacity: 0.25;
  filter: grayscale(1);
}

.missing-image {
  padding: 1rem;
  background: var(--charcoal);
  color: var(--yellow);
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}


/* REVEAL */

.page-section {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;
}

.page-section.record-visible {
  opacity: 1;
  transform: translateY(0);
}


/* RESPONSIVE */

@media (max-width: 900px) {

  .hero,
  .split-section,
  .objects-layout,
  .personal-objects,
  .wren-wrap,
  .nine-layout {
    grid-template-columns: 1fr;
  }

  .hero {
    margin-top: 3rem;
  }

  .data-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .behavior-grid,
  .routine-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .nine-images {
    grid-template-columns: 1fr 1fr;
  }

  .site-footer {
    grid-template-columns: 1fr;
  }
}


@media (max-width: 600px) {

  .header-top {
    grid-template-columns: 1fr auto;
  }

  .header-label {
    display: none;
  }

  .header-line {
    flex-direction: column;
  }

  .hero h1 {
    font-size: 5.5rem;
  }

  .page-section {
    padding: 5rem 0;
  }

  .section-heading {
    display: block;
  }

  .section-heading p {
    margin-top: 1rem;
  }

  .data-grid,
  .behavior-grid,
  .routine-grid,
  .history-grid,
  .object-list {
    grid-template-columns: 1fr;
  }

  .history-item {
    grid-template-columns: 1fr;
  }

  .character-statement {
    padding: 2rem 1.2rem;
  }

  .wren-section {
    margin-left: -1rem;
    margin-right: -1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .fire-note {
    flex-direction: column;
  }

  .record-nav {
    overflow-x: auto;
    flex-wrap: nowrap;
  }

  .record-nav a {
    white-space: nowrap;
  }

  .nine-images {
    grid-template-columns: 1fr;
  }

}
