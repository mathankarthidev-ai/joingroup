# Platform Features & System Architecture Guide

This document provides a complete architectural map and visual flowcharts for the dual-engine platform: **Nammabus** (India's verified business & professional directory) and **JoinGroupLinks.in** (public community & group directory).

---

## 1. High-Level System Architecture & User Flow

```mermaid
flowchart TD
    User(["Visitor / Merchant arrives at Platform"]) --> GateCheck{"First visit or Ad Wall?"}

    GateCheck -- "First Visit" --> DisclaimerModal["Legal Safety & Cyber Fraud Modal (1930 / cybercrime.gov.in)"]
    DisclaimerModal --> MainApp["Unified Master Navigation (Header.tsx)"]
    GateCheck -- "Returning User" --> MainApp

    MainApp --> DualHub{"Choose Destination / Search Intent"}

    %% Track 1: Nammabus Directory
    DualHub -- "Bizz / Trade" --> NammabusHub["Nammabus Business Directory (/local-biz)"]
    NammabusHub --> SearchEngine["Multi-Layer Location & Category Search Engine"]
    
    SearchEngine --> StateUT["State / UT Selector (28 States & 8 UTs)"]
    StateUT --> DistrictFilter["Cascading District Filter (A to Z)"]
    DistrictFilter --> AISearch["AI Natural Query (Area Name + Pincode + Keyword)"]

    AISearch --> ResultsView["Filtered Results (Businesses / Professionals / B2B)"]
    ResultsView --> ConnectMerchant["Direct WhatsApp Connect & Phone Call"]

    %% Track 2: JoinGroupLinks
    DualHub -- "Communities" --> GroupLinksHub["JoinGroupLinks Public Directory (/groups)"]
    GroupLinksHub --> PlatformFilter["Filter by Platform (WhatsApp, Telegram, Arattai, Discord)"]
    PlatformFilter --> GroupCountdown["Safe Link Gateway & Anti-Scam Verification"]
    GroupCountdown --> ExternalJoin["Join Group Directly"]

    %% Track 3: Merchant Onboarding & Monetization
    DualHub -- "List My Business" --> MerchantFlow["Free Business Listing Onboarding (/local-biz/add-business)"]
    MerchantFlow --> PlanChoice{"Choose Plan"}
    PlanChoice -- "₹0 Free" --> LiveListing["Instant Verified Directory Listing"]
    PlanChoice -- "₹99 Founding Special" --> PaymentSim["Checkout & Verified Shield Badge"]
    PaymentSim --> LiveListing

    %% Global Features
    subgraph GlobalControls ["Global UI & Experience Engine"]
        ScrollLine["Right Page Loaded Drag-Down Line (RightPageScrollLine.tsx)"]
        CityStrip["100+ Top Cities Slow Auto-Scroll & CBE Search (CityScrollStrip.tsx)"]
        Typewriter["Dynamic Hero Typing Animations (TypewriterText.tsx)"]
        ThemeEngine["Instant Dark / Light Mode Switcher"]
    end
```

---

## 2. Directory Search & Location Filtering Flow

The location filtering engine is built around official territorial boundaries in [`src/lib/india.ts`](file:///c:/Users/NTC/AntiGravity/GroupSharing_Project/src/lib/india.ts) and cascading selects in [`src/components/common/LocationSearchFilter.tsx`](file:///c:/Users/NTC/AntiGravity/GroupSharing_Project/src/components/common/LocationSearchFilter.tsx).

```mermaid
flowchart TD
    StartFilter["User accesses Directory (/local-biz/businesses)"] --> DefaultState["Default State: 'All India' selected"]
    DefaultState --> ShowAll["Shows results across all 28 States & 8 UTs"]

    ShowAll --> SelectState{"User selects State or UT"}
    SelectState -- "Selects 'Tamil Nadu'" --> UnlockDistricts["District Dropdown Unlocked"]
    UnlockDistricts --> PopulateDistricts["Populates 38 districts in Tamil Nadu (A to Z)"]
    
    PopulateDistricts --> SelectDistrict{"User picks District"}
    SelectDistrict -- "Picks 'Coimbatore'" --> URLUpdate["Syncs URL: ?state=Tamil+Nadu&district=Coimbatore"]
    URLUpdate --> DynamicHeading["Heading updates: 'Verified Businesses in Coimbatore, Tamil Nadu'"]
    DynamicHeading --> StoreQuery["Store filters via CITY_TO_DISTRICT_MAP & exact match"]
    StoreQuery --> MatchCount["Display 'Showing X verified businesses in Coimbatore, Tamil Nadu'"]

    SelectDistrict -- "User clicks 'Clear filters'" --> ResetAction["Resets to 'All India', clears District & Search query"]
    ResetAction --> DefaultState
```

---

## 3. Core Feature Modules Breakdown

### A. Dual Engine Header & Brand Identity
- **File**: [`src/components/Header.tsx`](file:///c:/Users/NTC/AntiGravity/GroupSharing_Project/src/components/Header.tsx)
- **Features**:
  - **Single-Row Tier 1**: Logo with `N` mark, `Nammabus & GROUPS`, primary links (`Home`, `Nammabus`, `JoinGroupLinks`), Theme Switcher, and User Profile.
  - **Contextual Tier 2**: Location selector pill searching across 28 States, 8 UTs, and districts; quick links to B2B Wholesale, Professionals, Categories, and the Free Listing CTA.

### B. Business & Service Directory
- **Files**: [`src/app/local-biz/businesses/page.tsx`](file:///c:/Users/NTC/AntiGravity/GroupSharing_Project/src/app/local-biz/businesses/page.tsx), [`src/lib/local-biz/store.ts`](file:///c:/Users/NTC/AntiGravity/GroupSharing_Project/src/lib/local-biz/store.ts)
- **Features**:
  - Location Search Filter with state `<optgroup>`s and dependent district dropdown.
  - Multi-token AI Query Search (e.g. `Doctor Anna Nagar 600040`).
  - View modes (Grid / List view switcher) and sorting (Featured, Rating, Name).
  - One-click direct WhatsApp chat opening pre-formatted quote requests.

### C. Verified Practice & Professional Directory
- **Files**: [`src/app/local-biz/professionals/page.tsx`](file:///c:/Users/NTC/AntiGravity/GroupSharing_Project/src/app/local-biz/professionals/page.tsx)
- **Features**:
  - Direct listings for certified Doctors, Advocates/Lawyers, Chartered Accountants, Architects, and Engineers.
  - Cascading State/District search + Profession filter.
  - Clear credential badges (Bar Council, ICAI, MCI) and consultation fees transparency.

### D. B2B Wholesale & Industrial Hub
- **Files**: [`src/app/b2b/page.tsx`](file:///c:/Users/NTC/AntiGravity/GroupSharing_Project/src/app/b2b/page.tsx)
- **Features**:
  - Industrial supplier discovery (machinery, textiles, agro commodities, medical gear).
  - Fast RFQ (Request for Quotation) generator logging bulk inquiries to the store.
  - Cascading State and District filters.

### E. JoinGroupLinks Community Directory
- **Files**: [`src/app/groups/page.tsx`](file:///c:/Users/NTC/AntiGravity/GroupSharing_Project/src/app/groups/page.tsx), [`src/app/groups-2026/page.tsx`](file:///c:/Users/NTC/AntiGravity/GroupSharing_Project/src/app/groups-2026/page.tsx)
- **Features**:
  - 30+ platform coverage with focus on Arattai (by Zoho), WhatsApp, Telegram, and Discord.
  - Geo-targeted group browsing by state, city, and category (Jobs, Study, Crypto, Medical).
  - 2026 SEO cornerstone guide featuring 7,000+ active links and FAQ schema.

### F. Navigation & Interactive Visual Enhancements
- **Top 100 Indian Cities Auto-Scroll**: [`src/components/common/CityScrollStrip.tsx`](file:///c:/Users/NTC/AntiGravity/GroupSharing_Project/src/components/common/CityScrollStrip.tsx)
  - 100+ cities with authentic landmark photos (Adiyogi for Coimbatore, Hawa Mahal for Jaipur, etc.).
  - Smooth continuous auto-scroll (~25px/sec) that pauses on hover.
  - Quick alias search supporting codes like `CBE`, `BLR`, `HYD`, `DEL`, `BOM`.
- **Right Page Loaded Drag-Down Line**: [`src/components/common/RightPageScrollLine.tsx`](file:///c:/Users/NTC/AntiGravity/GroupSharing_Project/src/components/common/RightPageScrollLine.tsx)
  - Floating vertical scrollbar rail on the right edge of the screen.
  - Draggable handle thumb enabling users to drag down or up to scroll smoothly.
  - Top and bottom chevrons for instant 1-click jump to top ($0\%$) or bottom ($100\%$).
- **Hero Dynamic Typewriters**: [`src/components/common/TypewriterText.tsx`](file:///c:/Users/NTC/AntiGravity/GroupSharing_Project/src/components/common/TypewriterText.tsx)
  - Smooth typewriter animations across all 10 page heroes.

### G. Legal, Compliance & Cyber Safety
- **Files**: [`src/components/LegalSafetyDisclaimerModal.tsx`](file:///c:/Users/NTC/AntiGravity/GroupSharing_Project/src/components/LegalSafetyDisclaimerModal.tsx), [`src/components/Footer.tsx`](file:///c:/Users/NTC/AntiGravity/GroupSharing_Project/src/components/Footer.tsx)
- **Features**:
  - First-visit legal disclaimer covering Third-Party Listings, Group Disclaimers, and Banking Fraud Awareness.
  - Indian Cybercrime Helpline **1930** and direct links to **cybercrime.gov.in**.
  - Dual footers with `"Made in India, Made with ❤️ for India"` and AI data accuracy notices.

---

## 4. Merchant Lifecycle & Transaction State Flow

```mermaid
stateDiagram-v2
    [*] --> UnregisteredMerchant
    UnregisteredMerchant --> FormSubmission: Fills business details & category (/local-biz/add-business)
    FormSubmission --> PlanSelection: Selects Listing Tier
    
    state PlanSelection {
        [*] --> FreePlan: 100% Free Founding Listing
        [*] --> PaidPlan: Founding Special (₹99 for 6 months)
    }

    FreePlan --> Published: Immediate Activation in LocalBizStore
    PaidPlan --> PaymentGateway: PaymentCheckoutModal.tsx simulation
    PaymentGateway --> Published: Instant Shield Badge & Priority Placement

    Published --> ActiveListing: Visible in Directory Search & Location Filters
    ActiveListing --> CustomerEnquiry: Customer initiates WhatsApp Chat or Call
    CustomerEnquiry --> ReviewSubmission: Customer leaves 5-Star Rating & Review
    ReviewSubmission --> ActiveListing: Score aggregated & updated live
```
