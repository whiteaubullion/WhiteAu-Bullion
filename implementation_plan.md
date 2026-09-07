# Goal Description

The goal is to complete Phase 2 of the Admin CMS, which involves building the "Maker-Checker" Gold Rate publishing flow. This will allow authorized administrators to propose new gold and silver rates, and require a different administrator to approve them before they go live on the public website.

## User Review Required
> [!IMPORTANT]
> **Fixing your "UNAUTHORIZED" User Account**
> Because you created your user *before* the database tables and triggers were fully set up in your new Supabase project, your user account is missing from the secure `admin_users` table. 
> 
> **To fix this, before we build the UI, you MUST do this in your Supabase Dashboard:**
> 1. Go to **Authentication > Users** and **Delete** the `whiteau.bullion@gmail.com` user.
> 2. Go to the **SQL Editor**, and run the `supabase/schema.sql` and `supabase/update_schema.sql` files again (if you haven't already for this new project).
> 3. Go back to **Authentication > Users** and **Create the user again** (remembering to uncheck "Send invitation" and check "Auto Confirm").
> 
> This will trigger the database to correctly assign you the `RATE_PUBLISHER` role so the dashboard says "RATE_PUBLISHER" instead of "UNAUTHORIZED".

> [!WARNING]
> **Maker-Checker Constraint**
> The database enforces that the person who *proposes* a rate CANNOT be the same person who *approves* it. To fully test the approval flow, you will need to create a **second** user account in Supabase (e.g., `admin2@whiteau.com`) so you can log in as the second person to approve the rates you propose.

## Proposed Changes

### Database Layer

#### [NEW] `supabase/rpc_approve_rate.sql`
Since approving a rate requires updating the new rate to `ACTIVE` and simultaneously updating the old active rate to `ARCHIVED`, doing this via individual RLS policies is brittle. We will create a secure Postgres Function (RPC) that performs this transaction atomically and enforces the Maker-Checker rule. You will need to run this script in your Supabase SQL Editor.

### Frontend UI Layer (Next.js App Router)

#### [NEW] `src/app/admin/(dashboard)/rates/page.tsx`
This will be the main interface for the Maker-Checker flow.
- A section displaying **Current Active Rates** (24K, 22K, 18K, Silver).
- A section for **Pending Proposals**.
  - If the logged-in user proposed it, they see "Waiting for approval".
  - If a *different* user proposed it, they see "Approve / Reject" buttons.
- A **Propose New Rates** form to submit new prices.

#### [NEW] `src/app/admin/(dashboard)/rates/actions.ts`
Secure Next.js Server Actions to handle:
- `proposeRate(formData)`: Inserts a new rate into `gold_rates` with status `PENDING_APPROVAL`.
- `approveRate(rateId, itemType)`: Calls the secure RPC to approve the rate and archive the old one.
- `rejectRate(rateId)`: Updates the proposal status to `REJECTED`.

## Verification Plan

### Manual Verification
1. Log in as `whiteau.bullion@gmail.com`.
2. Propose a new rate for 24K Gold.
3. Verify that the UI shows the proposal as "Pending" and you cannot approve it yourself.
4. Log out and log in as a second admin user.
5. Verify that the second user sees the "Approve" button.
6. Approve the rate.
7. Verify that the public Live Rates page immediately updates to show the new approved rate.
