# Specification

## Summary
**Goal:** Ensure the “Will you be my Valentine?” question flow is shown for all quiz outcomes and is always the final interaction.

**Planned changes:**
- Update post-quiz routing so score < 5/5 goes directly to the Valentine question flow (skipping the perfect-score coupon screen).
- Adjust the 5/5 (perfect-score) results screen flow to display existing coupon/redeem UI first, then automatically transition to the Valentine question flow without requiring an extra “Continue” click.
- Prevent any automatic navigation after entering the Valentine question flow so it remains the final step (only explicit user actions like restart/retake may leave it).

**User-visible outcome:** After finishing the quiz, users will always reach the Valentine question screen; perfect scores briefly show the coupon first and then auto-continue to the Valentine question, and the app will not auto-advance beyond that final flow.
