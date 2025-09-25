# **App Name**: Aire CRM

## Core Features:

- Data Modeling (Firestore): Define Firestore data models for users, accounts, contacts, opportunities, orders, and activities, including fields, types, and validations, complete with seed data and scripts. Indexes are implemented.
- Security Rules (Firestore & Storage): Implement role-based access control (RBAC) security rules for Firestore and Storage, differentiating permissions for advisors, managers, and administrators. These control CRUD operations, document access and storage paths.
- Automated Reminders (Cloud Functions): Schedule daily reminders for upcoming actions and alerts for pending invoice expiration, optimizing workflows for the sales team, which delivers timely communications and maintains proactive relationships with current leads. Utilizes Pub/Sub scheduler.
- Data Validation & Normalization (Cloud Functions): Use Cloud Functions to automatically normalize and validate input data upon document creation or updates. Normalization prevents duplicates or discrepancies, which creates a reliable database, leading to greater efficiencies. Apply custom validation rules for consistency.
- Metric Calculation & Reporting (Cloud Functions): Automate calculations to project KPIs (sales pipelines) for each sales stage to deliver performance metrics. Daily calculations aggregate crucial insights and keep performance against targets transparent. A generative AI 'tool' enhances anomaly detection to improve results.
- Opportunity Kanban: Develop a visual Kanban board using React to manage sales opportunities across stages. Integrated with Firebase for seamless, automated updates of task assignment, process transparency and tracking. Users are allowed to transition steps. 
- Timeline Interactions: Create a chronological agenda/timeline view for tracking interactions (calls, emails, meetings). Improve analysis by compiling user interactions and data insights to enable future-focused decision-making for campaign performance and personalized customer engagements.

## Style Guidelines:

- Primary color: Use a muted teal (#74B49B) to reflect the blend of communication (blue) and growth (green) that defines Aire's operations.
- Background color: A very light, desaturated tint of the primary color (#F0F4F2) for a calming, professional background.
- Accent color: A contrasting coral (#FF7F50), creating visual interest.
- Headline font: 'Space Grotesk' (sans-serif) for headlines and shorter content.
- Body font: 'Inter' (sans-serif) for continuous blocks of text.
- Code font: 'Source Code Pro' for code snippets or config samples.
- Icons: Use simple, line-based icons related to sales, media, and communication to provide quick visual cues.
- Prioritize a clean, modular layout. Use cards and sections to clearly separate content. Ensure responsiveness across devices.
- Employ subtle transitions and animations to enhance user experience without being distracting, like fade-in effects on data loading or subtle highlighting on interactive elements.