"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const phone = "919993389676";
const whatsappBase = `https://wa.me/${phone}`;

const stats = [
  ["12+", "Years Experience"],
  ["500+", "Satisfied Clients"],
  ["5 AM", "Daily Opening"],
  ["10 PM", "Closing Time"]
];

const programs = [
  ["GT", "Gym Training", "Progressive strength sessions with machines, free weights, and guided form correction."],
  ["CZ", "Cardio", "Endurance, stamina, heart-rate focused workouts, and energetic conditioning routines."],
  ["WL", "Weight Loss", "Fat-loss training, accountability, habit support, and weekly progress direction."],
  ["PT", "Personal Training", "One-on-one coaching for strength, transformation, confidence, and better technique."]
];

const trainers = [
  ["Vatan Mishra", "Owner and Transformation Expert", "12+ years experience"],
  ["Strength Team", "Professional Gym Coaches", "Form, lifting, cardio"],
  ["Conditioning Crew", "Fat Loss and Stamina", "High-energy sessions"]
];

const plans = [
  ["Basic Plan", "INR 999/mo", ["Gym floor access", "Basic trainer guidance", "Cardio zone access", "Locker support"]],
  ["Standard Plan", "INR 1,499/mo", ["Everything in Basic", "Trainer-supervised routine", "Weekly progress check", "Weight loss support"]],
  ["Premium Plan", "INR 2,499/mo", ["Everything in Standard", "Personal training slots", "Nutrition plan support", "Transformation tracking"]]
];

const schedules = {
  Weekdays: [
    ["5:00 AM", "Open Gym + Cardio", "All members"],
    ["7:00 AM", "Fat Loss Conditioning", "Coach-led"],
    ["5:30 PM", "Personal Training Slots", "Booking"],
    ["7:00 PM", "Strength + Hypertrophy", "Coach-led"]
  ],
  Saturday: [
    ["6:00 AM", "Full Body Strength", "Coach-led"],
    ["8:00 AM", "Cardio Burnout", "Group"],
    ["6:00 PM", "Transformation Check-ins", "Booking"]
  ],
  Sunday: [
    ["7:00 AM", "Mobility + Recovery", "Light"],
    ["8:00 AM", "Free Trial Visits", "Booking"],
    ["6:00 PM", "Goal Review", "Booking"]
  ]
};

const gallery = [
  "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=82"
];

const testimonials = [
  ["N2 Fitness ka environment friendly hai aur trainers genuinely push karte hain. Consistency maintain karna easy ho gaya.", "Rahul S.", "Strength Member"],
  ["Weight loss ke liye join kiya tha, but yahan ka energy aur coaching mujhe daily motivated rakhti hai.", "Priya M.", "Transformation Program"],
  ["Beginner ke liye bhi comfortable gym hai. Personal training se form aur confidence dono improve hua.", "Aman K.", "Personal Training"]
];

const faqs = [
  ["Where is N2 Fitness located?", "n 2, Kothi Bazar Rd, Rojhada, Betul, Madhya Pradesh 460001."],
  ["Can beginners join?", "Yes. Beginners get trainer guidance, form support, and simple routines to start safely."],
  ["Do you offer personal training?", "Yes. Personal training and transformation coaching are available."],
  ["How can I book a free trial?", "Use the Join Now, Book Trial, or WhatsApp button and the team will help you schedule a visit."]
];

function SectionHeader({ kicker, title, copy }) {
  return (
    <div className="section-head">
      <p>{kicker}</p>
      <h2>{title}</h2>
      {copy ? <span>{copy}</span> : null}
    </div>
  );
}

function waLink(message) {
  return `${whatsappBase}?text=${encodeURIComponent(message)}`;
}

export default function FullWebsiteSections() {
  const [activeDay, setActiveDay] = useState("Weekdays");
  const [bmiResult, setBmiResult] = useState("Your BMI result will appear here.");
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const currentTestimonial = testimonials[testimonialIndex];
  const activeImage = activeImageIndex === null ? null : gallery[activeImageIndex];

  const mapUrl = useMemo(
    () => "https://www.google.com/maps?q=n%202%2C%20Kothi%20Bazar%20Rd%2C%20Rojhada%2C%20Betul%2C%20Madhya%20Pradesh%20460001&output=embed",
    []
  );

  function calculateBmi(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const height = Number(form.get("height")) / 100;
    const weight = Number(form.get("weight"));

    if (!height || !weight) {
      setBmiResult("Please enter valid height and weight values.");
      return;
    }

    const bmi = weight / (height * height);
    let status = "Healthy range";
    if (bmi < 18.5) status = "Underweight range";
    if (bmi >= 25) status = "Overweight range";
    if (bmi >= 30) status = "Obesity range";
    setBmiResult(`${bmi.toFixed(1)} BMI - ${status}. Talk to N2 Fitness Gym for a personalized plan.`);
  }

  function sendContact(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "Hi N2 Fitness Gym Betul, I want to enquire.",
      "",
      `Name: ${form.get("name")}`,
      `Phone: ${form.get("phone")}`,
      `Email: ${form.get("email") || "Not provided"}`,
      `Goal: ${form.get("message")}`
    ].join("\n");
    window.open(waLink(message), "_blank", "noopener");
  }

  const showPrevImage = useCallback(() => {
    setActiveImageIndex((index) => (index === null ? gallery.length - 1 : (index + gallery.length - 1) % gallery.length));
  }, []);

  const showNextImage = useCallback(() => {
    setActiveImageIndex((index) => (index === null ? 0 : (index + 1) % gallery.length));
  }, []);

  useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveImageIndex(null);
      if (event.key === "ArrowLeft") showPrevImage();
      if (event.key === "ArrowRight") showNextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, showNextImage, showPrevImage]);

  return (
    <>
      <section className="premium-section intro-band" id="about">
        <div className="section-shell intro-grid">
          <div className="intro-media">
            <img src="/n2gym.jpg" alt="N2 Fitness Gym logo" />
            <div className="owner-chip">
              <span>Owner</span>
              <strong>@k.vatanmishra01</strong>
              <small>Transformation expert with 12+ years experience</small>
            </div>
          </div>
          <div className="intro-copy">
            <SectionHeader
              kicker="About N2"
              title="Strength, discipline, and transformation in Betul."
              copy="N2 Fitness Gym Betul is a community-focused workout space located at n 2, Kothi Bazar Rd, Rojhada, Betul, Madhya Pradesh 460001."
            />
            <div className="stat-grid">
              {stats.map(([value, label]) => (
                <article key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
            <div className="feature-chips">
              <span>Transformation Expert</span>
              <span>Team of Professionals</span>
              <span>Friendly Atmosphere</span>
              <span>Men and Women Training</span>
            </div>
          </div>
        </div>
      </section>

      <section className="momentum-ribbon-section" aria-label="N2 Fitness momentum highlights">
        <div className="momentum-ribbon">
          <div className="momentum-track">
            <span>Strength</span>
            <span>Discipline</span>
            <span>Transformation</span>
            <span>Betul Fitness Community</span>
            <span>Personal Coaching</span>
            <span>Weight Loss</span>
            <span>Strength</span>
            <span>Discipline</span>
            <span>Transformation</span>
            <span>Betul Fitness Community</span>
            <span>Personal Coaching</span>
            <span>Weight Loss</span>
          </div>
        </div>
        <div className="section-shell momentum-panel">
          <div>
            <span>Momentum Zone</span>
            <strong>Train. Track. Transform.</strong>
          </div>
          <p>Real coaching energy, daily consistency, and a premium workout atmosphere built to pull visitors deeper into the N2 Fitness Gym experience.</p>
          <a href={waLink("Hi N2 Fitness Gym Betul, I want to start my transformation.")} target="_blank" rel="noreferrer">Start Transformation</a>
        </div>
        <div className="section-shell zigzag-flow" aria-label="N2 Fitness zigzag transformation path">
          <article>
            <span>01</span>
            <strong>Assess</strong>
            <p>Goal check</p>
          </article>
          <article>
            <span>02</span>
            <strong>Train</strong>
            <p>Coach-led plan</p>
          </article>
          <article>
            <span>03</span>
            <strong>Sweat</strong>
            <p>Daily discipline</p>
          </article>
          <article>
            <span>04</span>
            <strong>Track</strong>
            <p>Progress review</p>
          </article>
          <article>
            <span>05</span>
            <strong>Transform</strong>
            <p>Visible results</p>
          </article>
        </div>
      </section>

      <section className="premium-section" id="programs">
        <div className="section-shell">
          <SectionHeader
            kicker="Programs"
            title="Everything you need to train harder and smarter."
            copy="Premium cards, focused coaching, and clean program paths for every fitness stage."
          />
          <div className="program-card-grid">
            {programs.map(([icon, title, copy]) => (
              <article className="motion-card program-motion-card" key={title}>
                <i>{icon}</i>
                <h3>{title}</h3>
                <p>{copy}</p>
                <a href={title === "Personal Training" ? "#training" : "#contact"}>Start now</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section personal-premium" id="training">
        <div className="section-shell personal-layout">
          <div className="personal-copy">
            <SectionHeader
              kicker="Personal Training"
              title="One-on-one coaching built around your body and goal."
              copy="A sharper, more personal training experience with form correction, weekly check-ins, nutrition support, and transformation tracking from the N2 Fitness Gym team."
            />
            <div className="training-pill-row">
              <span>Custom Workout Plan</span>
              <span>Form Correction</span>
              <span>Weekly Progress Review</span>
              <span>Nutrition Guidance</span>
            </div>
            <div className="personal-actions">
              <a className="section-cta" href={waLink("Hi N2 Fitness Gym Betul, I want personal training details.")} target="_blank" rel="noreferrer">
                Ask for Coaching
              </a>
              <a className="ghost-cta" href="#bmi">Check BMI First</a>
            </div>
          </div>
          <div className="personal-dashboard">
            <div className="coach-badge">
              <img src="/n2gym.jpg" alt="N2 Fitness Gym logo" />
              <div>
                <span>Coach Mode</span>
                <strong>Transformation Active</strong>
              </div>
            </div>
            <div className="coach-metric"><p>Form Correction</p><strong>96%</strong><i style={{ "--level": "96%" }} /></div>
            <div className="coach-metric"><p>Nutrition Support</p><strong>88%</strong><i style={{ "--level": "88%" }} /></div>
            <div className="coach-metric"><p>Accountability</p><strong>94%</strong><i style={{ "--level": "94%" }} /></div>
            <div className="transformation-steps">
              <span>Assess</span>
              <span>Train</span>
              <span>Track</span>
              <span>Transform</span>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-section" id="trainers">
        <div className="section-shell">
          <SectionHeader kicker="Trainers" title="Professional guidance, friendly energy." />
          <div className="trainer-grid-full">
            {trainers.map(([name, role, note], index) => (
              <article className="trainer-tile" key={name}>
                <img
                  src={[
                    "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=82",
                    "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?auto=format&fit=crop&w=800&q=82",
                    "https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&w=800&q=82"
                  ][index]}
                  alt={`${name} at N2 Fitness`}
                />
                <div>
                  <h3>{name}</h3>
                  <p>{role}</p>
                  <span>{note}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section pricing-band" id="plans">
        <div className="section-shell">
          <SectionHeader kicker="Membership" title="Premium plans for every fitness stage." copy="Suggested starting prices are added for now and can be changed anytime as per final gym pricing." />
          <div className="pricing-grid-full">
            {plans.map(([title, price, features], index) => (
              <article className={index === 1 ? "price-tile featured" : "price-tile"} key={title}>
                {index === 1 ? <span className="popular-pill">Most Popular</span> : null}
                <h3>{title}</h3>
                <strong>{price}</strong>
                <ul>
                  {features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <a href={waLink(`Hi N2 Fitness Gym Betul, I want ${title} details.`)} target="_blank" rel="noreferrer">Choose Plan</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section" id="schedule">
        <div className="section-shell">
          <SectionHeader kicker="Schedule" title="Plan your training week." />
          <div className="schedule-tabs">
            {Object.keys(schedules).map((day) => (
              <button className={activeDay === day ? "active" : ""} type="button" key={day} onClick={() => setActiveDay(day)}>
                {day}
              </button>
            ))}
          </div>
          <div className="schedule-table">
            {schedules[activeDay].map(([time, name, type]) => (
              <div className="schedule-line" key={`${time}-${name}`}>
                <strong>{time}</strong>
                <span>{name}</span>
                <em>{type}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section split-motion" id="bmi">
        <div className="section-shell bmi-grid">
          <SectionHeader kicker="BMI Calculator" title="Know your starting point." copy="Enter your height and weight for a quick BMI estimate, then talk to a coach for a proper plan." />
          <form className="glass-form" onSubmit={calculateBmi}>
            <label>Height (cm)<input name="height" type="number" min="80" max="250" placeholder="Example: 172" required /></label>
            <label>Weight (kg)<input name="weight" type="number" min="20" max="250" placeholder="Example: 72" required /></label>
            <button type="submit">Calculate BMI</button>
            <div className="result-box">{bmiResult}</div>
          </form>
        </div>
      </section>

      <section className="premium-section" id="gallery">
        <div className="section-shell">
          <SectionHeader kicker="Gallery" title="Transformation energy you can feel." copy="Replace these premium placeholders with real gym photos, member transformations, and Instagram reel stills." />
          <div className="gallery-grid-full">
            {gallery.map((src, index) => (
              <button type="button" key={src} onClick={() => setActiveImageIndex(index)} aria-label={`Open gym gallery image ${index + 1}`}>
                <img src={src} alt={`N2 Fitness gallery placeholder ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section testimonials-band" id="testimonials">
        <div className="section-shell">
          <SectionHeader kicker="Testimonials" title="Real motivation from the community." />
          <div className="testimonial-panel">
            <button type="button" onClick={() => setTestimonialIndex((testimonialIndex + testimonials.length - 1) % testimonials.length)}>Prev</button>
            <article>
              <p>&quot;{currentTestimonial[0]}&quot;</p>
              <h3>{currentTestimonial[1]}</h3>
              <span>{currentTestimonial[2]}</span>
            </article>
            <button type="button" onClick={() => setTestimonialIndex((testimonialIndex + 1) % testimonials.length)}>Next</button>
          </div>
        </div>
      </section>

      <section className="premium-section" id="nutrition">
        <div className="section-shell">
          <SectionHeader kicker="Nutrition" title="Training works better with the right fuel." />
          <div className="nutrition-grid-full">
            <article><h3>Fat Loss Plan</h3><p>Calorie awareness, simple meal structure, hydration habits, and weekly review.</p></article>
            <article><h3>Muscle Gain Plan</h3><p>Protein-focused meals, recovery guidance, strength progression, and consistency tracking.</p></article>
            <article><h3>Lifestyle Plan</h3><p>Balanced Indian meal ideas, sustainable routines, and practical habits for busy schedules.</p></article>
          </div>
        </div>
      </section>

      <section className="premium-section" id="faq">
        <div className="section-shell faq-shell">
          <SectionHeader kicker="FAQ" title="Quick answers before you visit." />
          <div className="faq-list-full">
            {faqs.map(([question, answer], index) => (
              <button className={openFaq === index ? "open" : ""} type="button" key={question} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                <span>{question}</span>
                <p>{answer}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section contact-full" id="contact">
        <div className="section-shell">
          <SectionHeader
            kicker="Contact"
            title="Visit N2 Fitness Gym or book your free trial today."
            copy="Use the call, WhatsApp, Instagram, or enquiry form below. Every action is linked and ready to work."
          />
          <div className="contact-grid-full">
            <article className="contact-info-card">
              <img src="/n2gym.jpg" alt="N2 Fitness Gym logo" />
              <h3>N2 Fitness Gym Betul</h3>
              <div className="contact-detail-list">
                <div><span>Address</span><p>n 2, Kothi Bazar Rd, Rojhada, Betul, Madhya Pradesh 460001</p></div>
                <div><span>Phone</span><p>099933 89676</p></div>
                <div><span>Owner</span><p>@k.vatanmishra01 - Transformation Expert</p></div>
                <div><span>Experience</span><p>12+ years and 500+ satisfied clients</p></div>
                <div><span>Hours</span><p>Opens 5 AM - Closes 10 PM</p></div>
              </div>
              <div className="contact-action-grid">
                <a href="tel:+919993389676">Call Now</a>
                <a href={waLink("Hi N2 Fitness Gym Betul, I want to book a free trial.")} target="_blank" rel="noreferrer">WhatsApp</a>
                <a href="https://www.instagram.com/k.vatanmishra01/?hl=en" target="_blank" rel="noreferrer">Instagram</a>
              </div>
            </article>
            <form className="glass-form contact-form-pro" onSubmit={sendContact}>
              <div className="form-row">
                <label>Name<input name="name" type="text" placeholder="Your name" required /></label>
                <label>Phone<input name="phone" type="tel" placeholder="Your phone number" required /></label>
              </div>
              <label>Email<input name="email" type="email" placeholder="Your email" /></label>
              <label>Message<textarea name="message" rows="5" placeholder="Tell us your fitness goal" required /></label>
              <button type="submit">Send Enquiry on WhatsApp</button>
            </form>
          </div>
          <div className="map-panel">
            <iframe title="N2 Fitness Gym Betul location map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={mapUrl} />
          </div>
        </div>
      </section>

      <footer className="site-footer-full">
        <div className="section-shell footer-grid-full">
          <div>
            <img src="/n2gym.jpg" alt="N2 Fitness Gym logo" />
            <h3>N2 Fitness Gym Betul</h3>
            <p>Premium community fitness, personal training, and transformation coaching in Betul, Madhya Pradesh.</p>
          </div>
          <nav>
            <a href="#about">About</a>
            <a href="#programs">Programs</a>
            <a href="#plans">Membership</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact</a>
          </nav>
          <div>
            <a href="tel:+919993389676">099933 89676</a>
            <a href={whatsappBase} target="_blank" rel="noreferrer">WhatsApp Chat</a>
            <span>Betul, Madhya Pradesh</span>
          </div>
        </div>
        <p className="copyright">Copyright 2026 N2 Fitness Gym Betul. All rights reserved.</p>
      </footer>

      <a className="whatsapp-float-full" href={waLink("Hi N2 Fitness Gym Betul, I want to book a free trial.")} target="_blank" rel="noreferrer">
        WhatsApp
      </a>

      {activeImage ? (
        <div className="image-modal" role="dialog" aria-modal="true" aria-label="Gallery image preview" onClick={() => setActiveImageIndex(null)}>
          <div className="image-modal-shell" onClick={(event) => event.stopPropagation()}>
            <div className="image-modal-topbar">
              <span>{activeImageIndex + 1} / {gallery.length}</span>
              <button className="modal-close-btn" type="button" aria-label="Close gallery preview" onClick={() => setActiveImageIndex(null)}>Close</button>
            </div>
            <button className="gallery-nav-btn gallery-prev-btn" type="button" aria-label="Previous gallery image" onClick={showPrevImage}>
              <span aria-hidden="true">‹</span>
            </button>
            <img src={activeImage} alt={`Selected N2 Fitness gallery preview ${activeImageIndex + 1}`} />
            <button className="gallery-nav-btn gallery-next-btn" type="button" aria-label="Next gallery image" onClick={showNextImage}>
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
