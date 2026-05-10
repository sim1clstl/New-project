import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Award,
  Crown,
  Flower2,
  Heart,
  Megaphone,
  QrCode,
  ReceiptText,
  Sparkles,
  Trophy,
  WandSparkles
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const compliments = [
  "Ma, yung aura mo abot hanggang kabilang kwarto, may kasamang snacks at konting sermon.",
  "Breaking news: undefeated ka pa rin sa paghahanap ng gamit na nasa harap lang pala namin.",
  "Experts confirm na yung love mo mas reliable pa kaysa Wi-Fi kapag may important meeting.",
  "Ikaw ang CEO ng buhay namin: food, reminders, emotional support, at light roasting.",
  "Yung patience mo dapat may national holiday, plus cake, flowers, and no chores.",
  "Ginagawa mong safe ang bahay kahit ang mundo minsan parang may bad internet connection.",
  "Family patch notes: Mom buff still active, lahat ng anak may +500 comfort.",
  "Aamin na ako: ang daming beses mong tama, and this website is my formal apology."
];

const longLoveLetter = [
  "Dear Mother, unang una sa lahat, happy Mother's Day po, and welcome sa Bargos Family official website na ginawa with love, kalokohan, questionable design decisions, and a very strong belief na hindi enough ang simpleng greeting card para sa isang mother na halos buong buhay namin ay ginawang mas safe, mas masaya, mas busog, at mas may direction kahit minsan kami mismo hindi namin alam kung saan papunta yung mga gamit namin, yung plans namin, at yung common sense namin.",
  "Gusto naming sabihin na sobrang thankful kami sa lahat ng ginagawa mo, from the very obvious things like food, care, reminders, and pag-aalala, hanggang sa mga invisible things na hindi lagi napapansin agad, like yung pag-iisip mo in advance, yung pag-adjust mo para sa amin, yung pag-intindi kahit makulit kami, and yung silent effort na ginagawa mong parang normal lang kahit actually ang bigat and ang dami.",
  "Ma, ikaw yung klase ng person na kahit simple lang ang ginagawa, may big effect. Isang tanong mo lang na 'kumain ka na?' biglang may feeling na may nagbabantay pa rin sa amin. Isang reminder mo lang, kahit paulit-ulit and minsan medyo nakakainis in the moment, eventually mare-realize namin na tama ka na naman, and honestly nakakainis din kung gaano ka kadalas tama, but fine, we accept defeat.",
  "Thank you for loving us in very practical ways, kasi minsan yung love hindi naman laging dramatic speech or movie moment. Minsan love is making sure may pagkain. Love is asking kung nakauwi na. Love is remembering something we mentioned once. Love is checking if okay kami kahit sinabi naming okay lang. Love is noticing kapag tahimik kami. Love is doing small things every day until those small things become the whole foundation of home.",
  "Alam namin na may times na napapagod ka rin, kahit hindi mo lagi sinasabi. May mga araw siguro na gusto mo rin magpahinga from being strong, from being responsible, from thinking about everyone, from being the person people depend on. Kaya today, kahit through a very chaotic website na mukhang inatake ng confetti, gusto naming sabihin na nakita namin yung effort mo. Hindi lahat, kasi impossible makita lahat, pero enough to know na sobrang laki ng love behind everything you do.",
  "Thank you for being patient with us kahit minsan parang group project kami na walang leader, walang timeline, and lahat late mag-submit. Thank you for not giving up on us kahit paulit-ulit yung mga tanong namin, kahit may mga bagay kaming dapat alam na, kahit minsan matigas ulo, and kahit may moments na kailangan mo pa kaming i-remind of basic human survival tasks like eating, sleeping, bringing a jacket, or not losing important things.",
  "We appreciate your humor too, yung mga hirit mo, reactions mo, and the way you can make things feel lighter. Kahit minsan may konting sermon included sa package, somehow may warmth pa rin. Yung presence mo may sariling comfort, yung parang kapag andyan ka, may order ang mundo, may pagkain somewhere, and may person na marunong maghanap ng bagay na five minutes na naming hinahanap pero nasa obvious place lang pala.",
  "Honestly, dapat may award ka na for object location services. Kung may international competition for finding missing wallets, chargers, keys, documents, remote controls, and emotional stability, ikaw na yung defending champion. The family can be panicking, but you will enter the room with calm energy, look once, and somehow solve the mystery like detective ka na may built-in radar.",
  "Pero beyond the funny stuff, we really want you to know na mahal ka namin. As in sobra. Hindi yung casual lang na love, kundi yung deep kind of love na may gratitude, respect, and admiration. Mahal ka namin for who you are, not only for what you do. Mahal ka namin dahil ikaw ka: caring, strong, beautiful, funny, thoughtful, and sometimes scary in the way only a mother can be scary kapag may nagkamali.",
  "Thank you for the way you make home feel like home. Hindi lang dahil sa place, furniture, or food, but because of the feeling na kapag andyan ka, may center. May warmth. May someone na may pakialam sa details. May person na kahit pagod, still cares. May love na hindi kailangan mag-perform because it is already present in the everyday routine.",
  "We know that motherhood is not easy. It is not just hugs and pictures and Mother's Day greetings. It is sacrifice, patience, worry, planning, repeating yourself, forgiving, guiding, and sometimes pretending to be okay because everyone else needs you. Kaya today, gusto naming ibalik kahit konti yung appreciation, kahit ang format ay extremely unserious website na may scrolling effects and suspicious payment request.",
  "Kung may mga moments man na hindi namin nasabi thank you, please consider this paragraph number twelve as delayed payment with emotional interest. Thank you sa lahat ng times na inuna mo kami. Thank you sa lahat ng times na pinili mong umintindi. Thank you sa lahat ng times na ginawa mong lighter yung burden namin kahit may sarili ka ring dala. Thank you for being the kind of mother na hindi kayang sukatin ng isang website, kahit pahabain pa namin ito nang sobra.",
  "Minsan siguro akala mo ordinary lang yung ginagawa mo, but to us it matters. Yung reminders mo, yung pag-aalaga mo, yung pag-check, yung mga little comments, yung concern, yung pagiging present, all of those things build something inside us. They teach us what love should feel like. They teach us that care can be consistent. They teach us that family means showing up, even when it is inconvenient.",
  "We are grateful for your strength, but we also hope you get softness. We hope you get rest. We hope you get days where you do not have to think about everything. We hope you get food you did not have to prepare, peace you did not have to earn, and love that comes back to you clearly, loudly, and repeatedly, because you have given so much of it to us.",
  "Also, let the record show na maganda ka. Hindi lang 'mother's day greeting' maganda, but actual main character, camera-ready, balcony scene, soft lighting, dramatic background, bakit parang may music video energy type of maganda. The website committee has reviewed the evidence and concluded unanimously: no notes, ten out of ten, please continue.",
  "Your photos are now displayed here like museum pieces because honestly deserve. One picture says calm and elegant, pero we know behind that calm face is a woman who can remember everyone's schedule, identify who is lying about being okay, and probably know exactly where the missing charger is. That is not just beauty. That is power.",
  "If this website feels too much, that is intentional. We wanted something na bagay sa level ng appreciation namin, and apparently the answer was animations, giant text, fake official labels, QR code jokes, and a message so long that reading it becomes a family activity. If you are still reading this, congratulations, you have unlocked more compliments.",
  "Ma, salamat for teaching us in ways direct and indirect. Salamat for the lessons na sinabi mo clearly, and salamat din sa lessons na natutunan namin just by watching you live. We learned care from you. We learned resilience from you. We learned that love is not always perfect, but it can be persistent, generous, and brave.",
  "Thank you for accepting us in our different moods and versions. Yung productive version, lazy version, dramatic version, hungry version, silent version, and the version that asks obvious questions. You have seen all of it and somehow still love us. That alone deserves not just Mother's Day, but a full government-backed festival with snacks.",
  "We also want to say sorry for the times na naging pasaway kami, makulit, ungrateful, impatient, or masyadong confident kahit mali naman. Sorry for the eye rolls, the late replies, the 'mamaya na' that became never, and all the times you had to repeat yourself. We are still learning, and a huge reason we are better than before is because you never stopped guiding us.",
  "Please know that even when we joke around, underneath it is respect. We respect your heart. We respect your effort. We respect the way you keep loving even when it is tiring. We respect the life you have built, the choices you made, and the quiet courage it takes to keep showing up for people you love.",
  "This Bargos Family message is long because the gratitude is long. Actually kulang pa rin. If we wrote every thank you, every memory, every small thing you did that mattered, this website would need chapters, footnotes, citations, a search bar, and probably a loading screen. But at least this is a start: a very loud, very silly, very sincere start.",
  "We hope today makes you feel celebrated. Not just greeted, not just messaged, but truly celebrated. Sana maramdaman mo na important ka, mahal ka, appreciated ka, and hindi taken for granted. Sana kahit tumawa ka sa kalokohan ng website na ito, maramdaman mo rin yung sweetness sa likod ng bawat OA na animation.",
  "Kung may family award ceremony, ikaw yung lifetime achievement awardee. Category: Best Mother, Best Finder of Missing Items, Best Emotional Support Provider, Best Food Reminder Specialist, Best Suspiciously Accurate Advice Giver, and Best Person To Call When Everything Feels A Little Too Much.",
  "We love your laugh, your care, your style, your wisdom, your concern, and even your ability to make one look say a whole paragraph. We love the way you can be gentle and strong at the same time. We love the way you make people feel remembered. We love the way your love stays, even when the day is messy.",
  "Happy Mother's Day, Ma. We love you more than this website can handle, more than the confetti can express, more than the scroll bar can measure, and definitely more than the fake invoice below can charge. Thank you for being our mother, our home base, our reminder system, our comfort, our comedy material, and one of the biggest blessings in our lives.",
  "Final official statement from the Bargos Family: you are loved, appreciated, admired, celebrated, and permanently ranked number one in the mother leaderboard. Any opposing claims have been reviewed, rejected, and thrown into the digital trash. Please enjoy your day, accept our hugs, and kindly ignore the invoice unless you want to fund future website upgrades."
];

const claims = [
  "Mukhang calm pero may final boss energy.",
  "This smile has ended 47 family arguments.",
  "Nagbabayad agad ng mga pinapagawa diba pls",
  "Naririnig niya yung silence tapos alam niyang may mali.",
  "Alam niya nasaan lahat ng gamit. Suspicious.",
  "Advice niya nag-aactivate after three weeks."
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function ConfettiBurst({ trigger }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 46 }, (_, index) => ({
        id: `${trigger}-${index}`,
        left: randomBetween(2, 98),
        delay: randomBetween(0, 0.45),
        rotate: randomBetween(-270, 270),
        color: ["#ff2f92", "#ffe14f", "#31e7bd", "#2d7dff", "#ff5b3d", "#ffffff"][index % 6]
      })),
    [trigger]
  );

  return (
    <AnimatePresence>
      {trigger > 0 &&
        pieces.map((piece) => (
          <motion.span
            aria-hidden="true"
            className="confetti"
            key={piece.id}
            initial={{ y: -40, x: 0, rotate: 0, opacity: 1 }}
            animate={{
              y: "110vh",
              x: randomBetween(-80, 80),
              rotate: piece.rotate,
              opacity: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.9, delay: piece.delay, ease: "linear" }}
            style={{ left: `${piece.left}vw`, backgroundColor: piece.color }}
          />
        ))}
    </AnimatePresence>
  );
}

function App() {
  const [complimentIndex, setComplimentIndex] = useState(0);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const heroRef = useRef(null);
  const scenicRef = useRef(null);
  const photoRailRef = useRef(null);
  const letterRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 22 });
  const yFloat = useTransform(scrollYProgress, [0, 1], [0, -140]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".ticker-track", {
        xPercent: -50,
        duration: 15,
        ease: "none",
        repeat: -1
      });

      gsap.to(scenicRef.current, {
        rotate: 8,
        y: -18,
        duration: 1.15,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });

      gsap.utils.toArray(".gsap-pop").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 80, rotate: -4, opacity: 0, scale: 0.92 },
          {
            y: 0,
            rotate: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.8)",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      gsap.to(".orbit-chip", {
        rotate: 360,
        transformOrigin: "50% 50%",
        duration: 12,
        ease: "none",
        repeat: -1,
        stagger: 0.25
      });

      gsap.to(".letter-panel", {
        backgroundPosition: "100% 50%",
        ease: "none",
        scrollTrigger: {
          trigger: letterRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to(".photo-card", {
        rotate: (index) => (index % 2 ? 1.5 : -1.5),
        y: (index) => (index % 2 ? -10 : 10),
        duration: 1.4,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.18
      });
    });

    return () => ctx.revert();
  }, []);

  const nextCompliment = () => {
    setComplimentIndex((current) => (current + 1) % compliments.length);
    setConfettiTrigger((current) => current + 1);
  };

  return (
    <div className="app-shell">
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <ConfettiBurst trigger={confettiTrigger} />

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {["MOTHER'S DAY ULTRA PRO MAX", "ANG WEBSITE NA SOBRANG OA", "WARNING: MARAMING COMPLIMENTS", "SCROLL PARA SA EMOTIONAL DAMAGE"].map((item) => (
            <span key={item}>{item}</span>
          ))}
          {["MOTHER'S DAY ULTRA PRO MAX", "ANG WEBSITE NA SOBRANG OA", "WARNING: MARAMING COMPLIMENTS", "SCROLL PARA SA EMOTIONAL DAMAGE"].map((item) => (
            <span key={`${item}-2`}>{item}</span>
          ))}
        </div>
      </div>

      <main>
        <section className="hero" ref={heroRef}>
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 28, rotate: -1.5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease: "backOut" }}
          >
            <div className="badge-row">
              <span><Crown size={16} /> Official Mother Propaganda</span>
              <span><Sparkles size={16} /> Premium Kalat</span>
            </div>
            <h1>
              <span>Happy</span>
              <span>Mother's</span>
              <span>Day</span>
            </h1>
            <p>
              Isang website na sobrang extra, baka kailangan ng parental
              supervision, para sa mother na mas malakas pa ang love kaysa
              Wi-Fi at mas magaling pa sa GPS maghanap ng nawawalang gamit.
            </p>
            <div className="hero-actions">
              <button type="button" className="primary-button" onClick={() => setConfettiTrigger((current) => current + 1)}>
                <WandSparkles size={20} /> Approve Ang Kalat
              </button>
              <a className="secondary-button" href="#letter">
                <Heart size={20} /> Basahin Ang Long Scroll
              </a>
            </div>
          </motion.div>

          <motion.div className="hero-stage" style={{ y: yFloat }}>
            <img className="portrait main-portrait" src="/assets/mom-portrait.jpg" alt="Mom smiling in a white top." />
            <img className="portrait mini-portrait" src="/assets/mom-balcony.png" alt="Mom standing near a balcony." />
            <img ref={scenicRef} className="scenic-art" src="/assets/mom-mountain-view.jpg" alt="Mom taking a photo of a mountain view." />
            <span className="orbit-chip chip-one">UNDEFEATED</span>
            <span className="orbit-chip chip-two">MOM LORE</span>
            <span className="orbit-chip chip-three">NO NOTES</span>
          </motion.div>
        </section>

        <section className="stats gsap-pop" aria-label="Important mom statistics">
          {[
            ["999%", "Mother Power", Trophy],
            ["0", "Accepted Reklamo", Megaphone],
            ["ALL", "Nawawalang Gamit Found", Award],
            ["24/7", "Love Uptime", Heart]
          ].map(([number, label, Icon]) => (
            <motion.article className="stat-card" key={label} whileHover={{ rotate: -2, scale: 1.05 }}>
              <Icon size={30} />
              <strong>{number}</strong>
              <span>{label}</span>
            </motion.article>
          ))}
        </section>

        <section className="photo-rail gsap-pop" ref={photoRailRef} aria-labelledby="photo-title">
          <div>
            <p className="stamp">Museum exhibit, seryoso talaga</p>
            <h2 id="photo-title">Rare Mother Sightings</h2>
          </div>
          <div className="photo-strip">
            <figure className="photo-card">
              <img src="/assets/mom-portrait.jpg" alt="Mom sitting and smiling." />
              <figcaption>Mukhang peaceful. Probably may 19 tasks sa isip.</figcaption>
            </figure>
            <figure className="photo-card">
              <img src="/assets/mom-balcony.png" alt="Mom standing on a balcony." />
              <figcaption>Balcony mode: activated. Main character settings: max.</figcaption>
            </figure>
            <figure className="photo-card">
              <img src="/assets/mom-mountain-view.jpg" alt="Mom photographing a mountain view." />
              <figcaption>Travel mode: activated. Nature mismo nag-adjust sa outfit.</figcaption>
            </figure>
            <figure className="photo-card loud-card">
              <Flower2 size={44} />
              <figcaption>Beauty detected. Website hindi na kaya maging normal.</figcaption>
            </figure>
          </div>
        </section>

        <section className="ragebait gsap-pop" aria-labelledby="rage-title">
          <p className="stamp">Clickbait pero may love</p>
          <h2 id="rage-title">Controversial Claims About This Mother</h2>
          <div className="claim-grid">
            {claims.map((claim, index) => (
              <motion.button
                type="button"
                className="claim"
                key={claim}
                whileHover={{ scale: 1.04, rotate: index % 2 ? 1.5 : -1.5 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setConfettiTrigger((current) => current + 1)}
              >
                {claim}
              </motion.button>
            ))}
          </div>
        </section>

        <section className="compliment-machine gsap-pop" aria-labelledby="compliment-title">
          <div>
            <p className="stamp">Emergency compliment generator</p>
            <h2 id="compliment-title">Generate More Ebidensya</h2>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              className="compliment"
              key={compliments[complimentIndex]}
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -30, rotate: 2 }}
              transition={{ duration: 0.35 }}
            >
              {compliments[complimentIndex]}
            </motion.p>
          </AnimatePresence>
          <button type="button" className="primary-button" onClick={nextCompliment}>
            <Sparkles size={20} /> Generate Another Compliment
          </button>
        </section>

        <section className="maya-tax gsap-pop" aria-labelledby="maya-title">
          <div className="maya-copy">
            <p className="stamp">Official invoice, joke lang pero unless</p>
            <h2 id="maya-title">Website Labor Fee</h2>
            <p>
              Ma, dahil ang website na napakalupit at may emotional
              damage, and approximately isang truck ng compliments, please scan
              this Maya QR kung gusto mong bayaran ako in exposure, snacks, or
              actual money. Transfer fees may apply.
            </p>
            <div className="invoice-row">
              <span><ReceiptText size={20} /> Amount due: priceless, pero pwede 5000</span>
              <span><QrCode size={20} /> Reason: anak labor + OA animations</span>
            </div>
          </div>
          <motion.div className="qr-card" whileHover={{ rotate: -2, scale: 1.03 }}>
            <img src="/assets/maya-qr-real.png" alt="Maya QR code for Simone Benedict Celestial." />
            <strong>Scan mo kung mahal mo ako</strong>
            <small>Disclaimer: emotional blackmail is part of the design system.</small>
          </motion.div>
        </section>

        <section id="letter" className="letter gsap-pop" ref={letterRef} aria-labelledby="letter-title">
          <p className="stamp">Long message endurance test</p>
          <h2 id="letter-title">Bargos Family Message To Mother</h2>
          <div className="letter-stack">
            {longLoveLetter.map((paragraph, index) => (
              <motion.p
                className="letter-panel"
                key={paragraph}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.35) }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
