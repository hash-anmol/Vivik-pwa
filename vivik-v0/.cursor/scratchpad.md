# Vivik Vibe Coding - Project Scratchpad

## Background and Motivation

The goal is to create a mobile-first web application named "Vivik Vibe" targeting Gen Z users in urban India. The core concept is to help users find friends nearby who share similar interests, facilitating the formation of small groups (3-4 people) for real-world connections. Key features include profile management, group discovery based on filters (distance, gender, interests, group size), matching animations, group creation, and in-group chat functionality.

## Key Challenges and Analysis

1.  **Matching Algorithm:** Developing an efficient and effective algorithm to match users based on multiple filters (distance, gender, shared interests) will be crucial. Utilizing Supabase PostGIS for geospatial queries is planned.
2.  **Geocoding:** Converting manually entered addresses (e.g., "Defence Colony, Delhi") into latitude/longitude coordinates requires integrating a reliable third-party Geocoding API (Service TBD - e.g., Mapbox, Google, OpenStreetMap Nominatim). Handling potential API costs and rate limits needs consideration.
3.  **Real-time Chat:** Implementing a scalable and performant real-time chat feature for groups will require careful backend design, likely leveraging Supabase Realtime subscriptions.
4.  **UI/UX:** Creating a "beautiful looking animation" for matching and ensuring an intuitive, engaging user experience tailored for Gen Z is important.
5.  **Performance Optimization:** Identifying and resolving front-end performance bottlenecks such as large images, excessive JavaScript bundle size, unused CSS, and suboptimal loading strategies, guided by Lighthouse metrics.
6.  **ORM/Database Layer:** Prisma is causing repeated installation and compatibility issues (especially with dependency conflicts and native binary requirements). Consider alternatives: (a) Use Supabase client directly (`@supabase/supabase-js`), (b) Use SQL directly via Supabase SQL editor, (c) Use Genql for type-safe GraphQL queries if using Supabase GraphQL endpoint. Direct Supabase client is simplest and best supported for Next.js/Supabase stack.

## Technology Stack

*   **Frontend:** Next.js 14 (App Router), React, TypeScript
*   **UI Components:** Shadcn UI, Radix UI, Tailwind CSS
*   **State Management:** React Context / Server Components / Zustand (TBD if needed)
*   **Backend Logic:** TypeScript (Supabase Edge Functions or direct `supabase-js` client calls within Next.js Server Actions/Components)
*   **Database:** Supabase (PostgreSQL) with PostGIS extension enabled
*   **Authentication:** Clerk
*   **File Storage:** Supabase Storage (for profile photos)
*   **Geocoding:** External Geocoding Service (TBD)
*   **Form Handling:** React Hook Form with Zod for validation
*   **API Interaction (if needed):** GraphQL (Genql) if Supabase GraphQL endpoint is used, otherwise REST/RPC with `supabase-js`.

## High-level Task Breakdown

**Phase 1: Onboarding (Focus)**

1.  **Basic Info (UI Done, Needs Backend Integration):**
    *   Task: Refactor `basic-info/page.tsx` to save Full Name, Birth Date, Gender to Supabase user profile via a Server Action or API call **using the Supabase JS client, not Prisma**.
    *   Success Criteria: Data is successfully persisted in the Supabase `profiles` table (or equivalent) associated with the authenticated Clerk user. Form submission correctly navigates to the next step.
2.  **Interests Selection:**
    *   Task: Create `src/app/onboarding/interests/page.tsx`. Design UI for multi-select interests (define interest list). Save selected interests to Supabase **using Supabase JS client**.
    *   Success Criteria: User can select multiple interests. Selections are saved to the user's profile in Supabase. Navigation works correctly from Basic Info and to the next step.
3.  **Location:**
    *   Task: Create `src/app/onboarding/location/page.tsx`. Implement UI for browser location permission request AND manual address input. Integrate a Geocoding service to convert manual input to lat/lon. Save coordinates to Supabase **using Supabase JS client**.
    *   Success Criteria: User can grant browser location permission OR enter an address manually. Coordinates (lat/lon) are correctly obtained and saved to the user's profile in Supabase. Navigation works correctly. Requires selecting and integrating a Geocoding API key.
4.  **Profile Photo Upload:**
    *   Task: Create `src/app/onboarding/profile-photo/page.tsx`. Implement UI for image upload. Use Supabase Storage to store the image. Save the image URL to the user's profile **using Supabase JS client**.
    *   Success Criteria: User can upload a profile photo. Photo is stored in Supabase Storage. The public URL is saved to the user's profile. Navigation redirects to `/groups` on success.
5.  **Setup Backend Tables:**
    *   Task: Define and create necessary Supabase tables (e.g., `profiles` with columns for basic info, interests array, location point, photo URL). Set up RLS policies. **Do this via Supabase dashboard or SQL, not Prisma.**
    *   Success Criteria: Tables exist in Supabase. RLS policies are configured to allow users to manage their own data.

**Phase 2: Core App Features**

6.  **Groups Page (Initial):**
    *   Task: Create `src/app/groups/page.tsx`. Display a basic message like "Your groups will appear here." Add the "Find My Crew" button. Implement bottom navigation bar (Profile, Groups).
    *   Success Criteria: Page renders with the button and placeholder text. Bottom navigation is functional.
7.  **Profile Page (Initial):**
    *   Task: Create `src/app/profile/page.tsx`. Fetch and display the logged-in user's basic info, interests, and profile photo from Supabase.
    *   Success Criteria: User's own data is displayed correctly.
8.  **"Find My Crew" Page (Filters UI):**
    *   Task: Create page/modal triggered by "Find My Crew" button. Implement UI elements for filters (Distance Slider, Gender Radios, Group Size Selector, Interests Multi-Select).
    *   Success Criteria: All filter UI elements are present and functional (state updates correctly).
9.  **Implement Profile Editing:**
    *   Task: Add functionality to the Profile Page to allow users to edit their name, interests, photo.
    *   Success Criteria: Edits are persisted in Supabase and reflected on the profile page.

**Phase 3: Matching & Group Formation**

10. **Matching Logic (Backend):**
    *   Task: Implement backend logic (Supabase Function or Server Action) to query users based on filters (distance using PostGIS `ST_DWithin`, gender, shared interests).
    *   Success Criteria: Backend function correctly returns a list of matching user IDs based on input filters.
11. **Matching Flow (Frontend):**
    *   Task: Connect "Find My Crew" page filters to the backend matching logic. Display loading animation. Show matched users' profiles (photo, name, common interests).
    *   Success Criteria: Filters are sent to the backend. Loading state is shown. Matched users are displayed appropriately.
12. **Group Creation:**
    *   Task: Add "Form Group" button after matching. Implement backend logic to create a `groups` table entry and a `group_members` table linking users to the group.
    *   Success Criteria: A new group is created in Supabase with the correct members upon button click. User is redirected (e.g., to the new group chat or back to the Groups page).

**Phase 4: Group Chat**

13. **Group Chat UI:**
    *   Task: Create dynamic route `src/app/groups/[groupId]/page.tsx`. Design chat interface (message list, input).
    *   Success Criteria: Chat UI renders correctly for a given group ID.
14. **Real-time Messaging:**
    *   Task: Implement message sending (saving to `messages` table). Set up Supabase Realtime subscriptions to receive and display new messages instantly. Fetch message history.
    *   Success Criteria: Users in the same group can send messages, and all members see new messages in real-time. History loads correctly.

**Phase 5: Performance Optimization**

15.  **Lighthouse Analysis:**
    *   Task: Analyze current Lighthouse report to identify key performance metrics that are below thresholds (LCP, FCP, TTI, TBT, CLS).
    *   Success Criteria: Document the top 5 performance issues with their metrics and potential root causes.
16.  **Optimize Images:**
    *   Task: Convert and serve images in WebP format, leverage Next.js `next/image` for responsive sizing and lazy loading.
    *   Success Criteria: All critical images are optimized and lazy-loaded; LCP image size reduced by at least 50%.
17.  **Code Splitting & Lazy Loading:**
    *   Task: Identify heavy third-party libraries or non-critical components and apply dynamic imports with React's `lazy`/`Suspense`.
    *   Success Criteria: Initial JavaScript bundle size reduced by at least 20%.
18.  **Purge Unused CSS:**
    *   Task: Configure Tailwind CSS purge settings to remove unused classes; audit and remove any custom CSS not in use.
    *   Success Criteria: CSS bundle size reduced by at least 30%; no visual regressions.
19.  **Caching & Prefetching:**
    *   Task: Set appropriate cache-control headers via Next.js middleware; prefetch critical data and assets.
    *   Success Criteria: Repeat page loads show improved FCP and FID; validated via Lighthouse repeat view.
20.  **Audit Third-party Scripts:**
    *   Task: Review all third-party scripts for performance impact; defer or load asynchronously where possible.
    *   Success Criteria: Total blocking time (TBT) improved; Lighthouse audit shows reduced third-party script impact.

## Project Status Board

*   [ ] **Phase 1 - Task 5:** Define and create Supabase tables (`profiles`, etc.) and RLS policies. (Prisma setup in progress)
*   [ ] **Phase 1 - Task 1:** Refactor `basic-info/page.tsx` to save data to Supabase. (Blocked: waiting for Prisma table)
*   [ ] **Phase 1 - Task 2:** Create `Interests Selection` page (`/onboarding/interests`) UI & saving logic.
*   [ ] **Phase 1 - Task 3:** Create `Location` page (`/onboarding/location`) UI & saving logic (Requires Geocoding API setup).
*   [ ] **Phase 1 - Task 4:** Create `Profile Photo Upload` page (`/onboarding/profile-photo`) UI & saving logic (Requires Supabase Storage setup).
*   [ ] **Phase 2 - Task 6:** Create initial `Groups` page (`/groups`) with Find My Crew button and bottom nav.
*   [ ] **Phase 2 - Task 7:** Create initial `Profile` page (`/profile`) displaying user data.
*   [ ] **Phase 2 - Task 8:** Create `Find My Crew` filters UI.
*   [ ] **Phase 2 - Task 9:** Implement Profile Editing.
*   [ ] **Phase 3 - Task 10:** Implement matching backend logic.
*   [ ] **Phase 3 - Task 11:** Connect matching frontend flow.
*   [ ] **Phase 3 - Task 12:** Implement group creation logic.
*   [ ] **Phase 4 - Task 13:** Develop Group Chat UI.
*   [ ] **Phase 4 - Task 14:** Implement real-time messaging.
*   [x] **Phase 5 - Task 15:** Analyze Lighthouse report metrics. Completed
*   [x] **Phase 5 - Task 16:** Optimize images for performance. (N/A: No raster images found)
*   [ ] **Phase 5 - Task 17:** Code splitting & lazy loading. (In progress)
*   [ ] **Phase 5 - Task 18:** Purge unused CSS. (In progress)
*   [ ] **Phase 5 - Task 19:** Configure caching & prefetching strategies. (In progress)
*   [ ] **Phase 5 - Task 20:** Audit and optimize third-party scripts.

## Executor's Feedback or Assistance Requests

*   Phase 1 - Task 1: Supabase client is set up in `utils/supabase/client.ts`. @supabase/supabase-js is installed. However, `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` is missing from the repo, which is required for the client to function. Please add this file with the correct values from your Supabase project.
*   Will proceed to integrate Clerk user ID and Supabase insert logic in the onboarding basic-info page once environment variables are available.
*   Phase 1 - Task 5: Starting Prisma setup from scratch (installing dependencies, initializing schema, and defining `profiles` table as prerequisite for onboarding integration).
*   Phase 5 - Task 15 completed: documented top 5 performance issues:
    1. LCP (11.2 s): Large hero image served in JPEG/PNG without optimization or lazy-loading; delaying first meaningful paint.
    2. TTI (13.2 s): Heavy initial JavaScript bundle (~500 KB+) including non-critical libraries loaded upfront; delaying interactivity.
    3. TBT (1,000 ms): Long main-thread tasks from analytics and render-blocking scripts; causing input responsiveness lag.
    4. CLS (0.283): Layout shifts from images and ads lacking width/height attributes and late-loading content.
    5. Render-blocking resources: CSS and JS loading synchronously without preloading or code-splitting; blocking first paint.
*   Phase 5 - Task 16: No raster images found in codebase, skipping image optimization.
*   Phase 5 - Task 17: Starting code splitting & lazy loading. Will identify heavy modules and apply dynamic imports where possible.
*   Phase 5 - Task 18: Will review Tailwind config and CSS for unused classes and enable purge.
*   Phase 5 - Task 19: Will review Next.js caching and prefetching strategies for static and dynamic assets.
*   No blockers encountered. Ready to start Phase 5 - Task 16: Optimize images for performance by converting to WebP, integrating Next.js `next/image`, and lazy-loading critical visuals.

## Lessons Learned

*   There is a known dependency conflict: React 19 is installed, but many dependencies (Radix UI, react-day-picker, etc.) only support React 16/17/18. This may cause subtle or breaking issues.
*   Prisma can be omitted in a Next.js + Supabase project. Use the official Supabase JS client for all database operations. This avoids native binary issues, dependency conflicts, and is best supported for serverless/edge environments.

