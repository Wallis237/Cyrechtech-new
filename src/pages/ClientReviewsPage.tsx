import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, MessageSquareQuote, Send, Star } from "lucide-react";
import { Link } from "react-router-dom";
import AnimationWrapper from "@/components/AnimationWrapper";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { submitToWeb3Forms } from "@/lib/web3forms";

const ReviewStars = ({ rating, onSelect }: { rating: number; onSelect: (rating: number) => void }) => (
  <div className="flex gap-2" role="radiogroup" aria-label="Rating from 1 to 5 stars">
    {[1, 2, 3, 4, 5].map((value) => (
      <button
        key={value}
        type="button"
        role="radio"
        aria-checked={rating === value}
        aria-label={`${value} ${value === 1 ? "star" : "stars"}`}
        onClick={() => onSelect(value)}
        className="rounded-md p-1 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Star className={`h-7 w-7 ${value <= rating ? "fill-primary text-primary" : "text-muted-foreground/40"}`} />
      </button>
    ))}
  </div>
);

const ClientReviewsPage = () => {
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submitReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (rating < 1 || rating > 5) {
      setError("Please select a rating from 1 to 5 stars.");
      return;
    }

    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setError("");

    try {
      const reviewData = {
        full_name: String(form.get("full_name") || "").trim(),
        company_name: String(form.get("company_name") || "").trim(),
        email: String(form.get("email") || "").trim(),
        rating,
        review: String(form.get("review") || "").trim(),
      };
      const [web3Result, emailResult] = await Promise.allSettled([
        submitToWeb3Forms(`Client review from ${reviewData.full_name}`, {
          form_type: "Client review",
          ...reviewData,
          name: reviewData.full_name,
          message: reviewData.review,
        }),
        supabase.functions.invoke("send-client-review", { body: reviewData }),
      ]);
      const deliveredByWeb3Forms = web3Result.status === "fulfilled";
      const { error: requestError } = emailResult.status === "fulfilled"
        ? emailResult.value
        : { error: emailResult.reason };

      if (web3Result.status === "rejected") {
        console.error("Client review Web3Forms delivery failed:", web3Result.reason);
      }
      if (requestError) {
        console.error("Client review email delivery failed:", requestError);
      }
      if (!deliveredByWeb3Forms && requestError) {
        setError("We couldn't submit your review right now. Please try again shortly or email cyrechtech@gmail.com.");
        return;
      }
      setSubmitted(true);
    } catch (submissionError) {
      console.error("Client review submission failed:", submissionError);
      setError("We couldn't submit your review right now. Please try again shortly or email cyrechtech@gmail.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24">
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 -top-28 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          </div>
          <div className="container relative mx-auto px-6 py-16 md:py-24">
            <p className="eyebrow">Client Reviews</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-[0.98] tracking-tight md:text-7xl">
              Your experience helps us <span className="accent-italic">grow better.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Tell us what working with Cyrech Tech was like. Your honest feedback helps our team keep improving.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <AnimationWrapper animation="fadeUp" trigger="load">
              <aside className="surface-card overflow-hidden p-7 md:p-9">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <MessageSquareQuote className="h-5 w-5" />
                </div>
                <p className="eyebrow mt-7">A note from our team</p>
                <h2 className="mt-3 font-display text-3xl font-bold">Every perspective matters.</h2>
                <p className="mt-4 leading-7 text-muted-foreground">
                  Whether we partnered on a project or you recently connected with our team, we welcome your thoughtful, constructive feedback.
                </p>
                <div className="mt-7 rounded-2xl border border-border bg-muted/60 p-5">
                  <div aria-label="Choose a rating from one to five stars" className="flex gap-1 text-primary">
                    {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-5 w-5 fill-current" />)}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">Your rating and comments go directly to our team for review.</p>
                </div>
                <Link to="/contact" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-foreground">
                  Prefer to speak with us? Contact the team <ArrowRight className="h-4 w-4" />
                </Link>
              </aside>
            </AnimationWrapper>

            <AnimationWrapper animation="fadeUp" trigger="load" delay={120}>
              <div className="surface-card p-6 md:p-9">
                {submitted ? (
                  <div className="py-10 text-center" role="status" aria-live="polite">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 className="h-9 w-9" />
                    </div>
                    <h2 className="mt-6 font-display text-3xl font-bold">Thank you for your review!</h2>
                    <p className="mx-auto mt-3 max-w-md leading-7 text-muted-foreground">
                      Your feedback has been sent to our team. We appreciate you taking the time to share your experience.
                    </p>
                    <Link to="/" className="btn-lime mt-7">Back to Home <ArrowRight className="h-4 w-4" /></Link>
                  </div>
                ) : (
                  <>
                    <div className="mb-7">
                      <p className="eyebrow">Share your experience</p>
                      <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">Write a client review</h2>
                    </div>
                    <form onSubmit={submitReview} className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <label className="block">
                          <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name *</span>
                          <input name="full_name" autoComplete="name" required minLength={2} maxLength={120} className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
                        </label>
                        <label className="block">
                          <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company / Business</span>
                          <input name="company_name" autoComplete="organization" maxLength={160} className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
                        </label>
                      </div>
                      <label className="block">
                        <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email *</span>
                        <input name="email" type="email" autoComplete="email" required maxLength={254} className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
                      </label>
                      <fieldset>
                        <legend className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your Rating *</legend>
                        <ReviewStars rating={rating} onSelect={setRating} />
                      </fieldset>
                      <label className="block">
                        <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Review / Feedback *</span>
                        <textarea name="review" required minLength={5} maxLength={3000} rows={6} placeholder="Tell us about your experience..." className="w-full resize-y rounded-xl border border-border bg-muted px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
                      </label>
                      {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
                      <button type="submit" disabled={submitting} className="btn-lime w-full disabled:cursor-wait disabled:opacity-60">
                        {submitting ? "Sending your review..." : "Submit Review"} <Send className="h-4 w-4" />
                      </button>
                      <p className="text-xs leading-5 text-muted-foreground">
                        Your review and contact details will be emailed to cyrechtech@gmail.com so our team can receive and respond to your feedback.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </AnimationWrapper>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ClientReviewsPage;
