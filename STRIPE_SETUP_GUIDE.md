# Stripe Account Setup Guide

Simple guide for registering on Stripe, getting payment access, and preparing your website for approval.

---

## What is Stripe?

Stripe is a payment company that lets customers pay online by card. Money is collected securely and transferred to your business bank account.

---

## Step 1 — Create your Stripe account

1. Open this link: **https://dashboard.stripe.com/register**
2. Sign up with your business email.
3. Check your email and verify the account.
4. Sign in here: **https://dashboard.stripe.com/login**
5. Select your **country** carefully (this should match where your business is based).
6. Answer the basic questions about your business.

---

## Step 2 — Test mode vs Live mode

| Mode | Meaning |
|------|---------|
| **Test mode** | Practice mode. No real money. Use this first. |
| **Live mode** | Real payments from real customers. |

In the Stripe dashboard (top right), keep **Test mode ON** until your website and account are fully ready.

---

## Step 3 — Get your payment keys

1. Go to: **https://dashboard.stripe.com/test/apikeys**
2. You will see two keys:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`) — click Reveal to view it
3. Share both keys **only with your website developer / technical person**.
4. Do **not** post these keys on social media, WhatsApp groups, or public documents.

When you are ready for real payments, get Live keys from:  
**https://dashboard.stripe.com/apikeys**

---

## Step 4 — Complete business activation

Open: **https://dashboard.stripe.com/account/onboarding**

You will usually need to submit:

1. Business legal name and address  
2. Owner / director personal details (as asked by Stripe)  
3. Bank account for receiving money  
4. Your live website link  
5. Clear product or service information  

Stripe will review this before allowing full live payments.

---

## Step 5 — Website pages Stripe expects

Your live website should clearly show these pages (linked in the footer is best):

| Page | What it should contain |
|------|------------------------|
| **Privacy Policy** | How you collect and use customer information |
| **Terms & Conditions** | Rules for using the website and placing orders |
| **Refund / Return Policy** | How returns and refunds work, and in how many days |
| **Shipping Policy** | Delivery time, shipping charges, tracking info |
| **Cookie Policy** | That the website uses cookies |
| **Contact Us** | Phone, email, and business address |
| **About Us** | Who the business is |

Also make sure customers can clearly see:

- Product names and prices  
- A working checkout / payment option  
- Your business name and contact details  

---

## Step 6 — Practice with test cards

While in Test mode, your developer can test payments with these sample cards:

```text
Successful payment:   4242 4242 4242 4242
Failed payment:       4000 0000 0000 0002

Expiry: any future date (example: 12/34)
CVC: any 3 digits (example: 123)
```

More test cards: **https://docs.stripe.com/testing**

---

## Step 7 — Before going live (checklist)

- [ ] Stripe account fully activated  
- [ ] Bank account added for payouts  
- [ ] Website is live on the internet  
- [ ] Privacy, Terms, Refund, Shipping, Contact, and About pages are visible  
- [ ] Products and prices are clear  
- [ ] Payment keys shared only with the developer  
- [ ] One small real test payment done, then refunded from Stripe dashboard  

---

## Important links

| Purpose | Link |
|---------|------|
| Register | https://dashboard.stripe.com/register |
| Login / Dashboard | https://dashboard.stripe.com |
| Test payment keys | https://dashboard.stripe.com/test/apikeys |
| Live payment keys | https://dashboard.stripe.com/apikeys |
| Complete business setup | https://dashboard.stripe.com/account/onboarding |
| Help / Support | https://support.stripe.com |
| Official docs | https://docs.stripe.com |

---

## Simple summary for managers

1. Register on Stripe.  
2. Complete business and bank details.  
3. Make sure required website pages are live.  
4. Give payment keys only to your developer.  
5. Test first, then switch to Live mode for real customers.  

If Stripe asks for website review, send them your live website link and confirm that the policy pages above are available in the footer.
