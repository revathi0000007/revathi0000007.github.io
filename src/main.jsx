import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Heart, Volume2, VolumeX, Sparkles, ArrowUpRight } from "lucide-react";
import "./styles.css";


const photos = [
  "/photos/revathi-01.jpeg",
  "/photos/revathi-02.jpeg",
  "/photos/revathi-03.jpeg",
  "/photos/revathi-04.jpeg",
];
const memories = [
  { title: "The little moments", text: "Some moments are small, but somehow they stay with us the longest.", image: photos[0] },
  { title: "Comfort", text: "There is a kind of peace that comes from talking to someone who simply feels familiar.", image: photos[1] },
  { title: "The memories", text: "Not every memory needs a grand story. Some are special just because you were there.", image: photos[2] },
  { title: "A place to breathe", text: "Some people make the world feel a little less heavy. You are one of those people.", image: photos[3] },
];

const wishes = [
  "I hope 26 brings you more reasons to smile.",
  "I hope you never lose the softness that makes you, you.",
  "I hope the things you quietly wish for find their way to you.",
  "I hope you meet people who value your heart.",
  "I hope you choose yourself without guilt.",
  "I hope ordinary days become beautiful memories.",
];

function StarField() {
  const stars = useMemo(() => Array.from({ length: 90 }, (_, i) => ({
    id: i, left: Math.random() * 100, top: Math.random() * 100,
    delay: Math.random() * 4, duration: 2 + Math.random() * 4,
    size: 1 + Math.random() * 2
  })), []);
  return <div className="stars" aria-hidden="true">{stars.map(s =>
    <span key={s.id} style={{left:`${s.left}%`,top:`${s.top}%`,width:s.size,height:s.size,animationDelay:`${s.delay}s`,animationDuration:`${s.duration}s`}} />
  )}</div>;
}

function Photo({ src, alt }) {
  return (
    <div className="photo-frame">
      <img src={src} alt={alt} onError={(e) => { e.currentTarget.style.display = "none"; }} />
      <div className="photo-placeholder"><Heart size={22}/><span>Add your photo</span></div>
    </div>
  );
}

function App() {
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [wishIndex, setWishIndex] = useState(0);

  useEffect(() => {
    document.body.classList.toggle("locked", !started);
    return () => document.body.classList.remove("locked");
  }, [started]);

  return (
    <main>
      <StarField />
      <div className="grain" aria-hidden="true" />

      <AnimatePresence>
        {!started && (
          <motion.section className="gate" initial={{opacity:1}} exit={{opacity:0}} transition={{duration:.9}}>
            <motion.div initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:1}}>
              <div className="eyebrow"><Sparkles size={15}/> a little something for you</div>
              <h1>For <em>Revathi</em></h1>
              <p className="gate-copy">Some people enter your life as friends.<br/>Somehow, they start feeling like home.</p>
              <button className="primary" onClick={() => setStarted(true)}>Open your birthday story <ArrowUpRight size={17}/></button>
              <p className="date">06 · 08 · 2026</p>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {started && (
        <>
          <button className="sound" onClick={() => setMuted(v => !v)} aria-label="Toggle music">
            {muted ? <VolumeX size={18}/> : <Volume2 size={18}/>}
          </button>

          <section className="hero section">
            <div className="hero-glow" />
            <div className="celestial-dots" aria-hidden="true">
              <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
            </div>
            <motion.div className="hero-content" initial={{opacity:0,y:35}} animate={{opacity:1,y:0}} transition={{duration:1.2}}>
              <div className="eyebrow">06 August · 26</div>
              <h1>Happy Birthday,<br/><em>Revathi.</em></h1>
              <p>For a moon-and-stars soul, a dog lover, a Dhoni fan,<br/>and someone who somehow became a little like home.</p>
              <a href="#story" className="scroll"><span>scroll to begin</span><ChevronDown size={17}/></a>
            </motion.div>
          </section>

          <section id="story" className="section statement">
            <div className="narrow">
              <p className="eyebrow">A simple truth</p>
              <h2>Somewhere along the way,<br/><em>you became home.</em></h2>
              <div className="line" />
              <p className="body-copy">I don't know exactly when it happened. There wasn't one big moment. It was probably hidden inside all the little conversations, random laughs, comfortable silences, and ordinary days that somehow became important.</p>
            </div>
          </section>

          <section className="section memories">
            <div className="section-heading">
              <div><p className="eyebrow">Little things</p><h2>The moments<br/><em>that stay.</em></h2></div>
              <p>Not every memory needs a perfect photograph.<br/>Sometimes, the feeling is enough.</p>
            </div>
            <div className="memory-grid">
              {memories.map((m, i) => (
                <motion.article className={`memory-card card-${i}`} key={m.title}
                  initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{delay:i*.08}}>
                  <Photo src={m.image} alt={m.title}/>
                  <div className="memory-copy"><span>0{i+1}</span><h3>{m.title}</h3><p>{m.text}</p></div>
                </motion.article>
              ))}
            </div>
          </section>


          <section className="section wishes">
            <div className="wish-wrap">
              <p className="eyebrow">For your 26th</p>
              <h2>A few wishes<br/><em>for you.</em></h2>
              <div className="wish-card">
                <div className="wish-number">{String(wishIndex+1).padStart(2,"0")}</div>
                <AnimatePresence mode="wait">
                  <motion.p key={wishIndex} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}}>
                    {wishes[wishIndex]}
                  </motion.p>
                </AnimatePresence>
                <button onClick={() => setWishIndex((wishIndex+1)%wishes.length)}>another wish <ArrowUpRight size={16}/></button>
              </div>
            </div>
          </section>

          <section className="section universe">
            <div className="universe-orbit orbit-one"></div>
            <div className="universe-orbit orbit-two"></div>
            <div className="moon"><span></span></div>
            <div className="universe-content">
              <p className="eyebrow">For the soul that loves the sky</p>
              <h2>Look at the <em>moon.</em><br/>You belong among the stars.</h2>
              <p className="universe-copy">
                For someone who finds comfort in the universe, the quiet of nature,
                moonlit skies, and little beautiful things — I hope you always leave
                a little space in your life for yourself too.
              </p>
              <div className="nature-row">
                <span>☾ moon</span><span>✦ stars</span><span>𖥧 nature</span><span>♡ self-love</span>
              </div>
            </div>
          </section>

          <section className="section selflove">
            <div className="selflove-inner">
              <p className="eyebrow">A reminder for you</p>
              <h2>Choose yourself.<br/><em>Love yourself.</em></h2>
              <div className="selflove-cards">
                <article><span>01</span><h3>Rest</h3><p>You don't always have to be strong. Rest when you need to.</p></article>
                <article><span>02</span><h3>Breathe</h3><p>You deserve quiet moments where nothing is expected from you.</p></article>
                <article><span>03</span><h3>Grow</h3><p>Take your own path. Your life doesn't have to move at anyone else's pace.</p></article>
              </div>
            </div>
          </section>

          <section className="section things">
            <div className="things-inner">
              <p className="eyebrow">The little things that make you, you</p>
              <h2>Your world is made of<br/><em>beautiful little things.</em></h2>
              <div className="thing-grid">
                <motion.article whileHover={{ y: -8 }}>
                  <div className="thing-icon dog-icon">🐾</div>
                  <span>01 · DOG LOVER</span>
                  <h3>Soft heart.</h3>
                  <p>The way you care for animals says a lot about the kind of heart you have.</p>
                </motion.article>
                <motion.article whileHover={{ y: -8 }}>
                  <div className="thing-icon dhoni-icon">07</div>
                  <span>02 · DHONI FAN</span>
                  <h3>Calm. Strong. Unshaken.</h3>
                  <p>A little reminder of your favorite legend — patience, composure and finishing with confidence.</p>
                </motion.article>
                <motion.article whileHover={{ y: -8 }}>
                  <div className="thing-icon hand-icon">♡</div>
                  <span>03 · THE CARING ONE</span>
                  <h3>You care deeply.</h3>
                  <p>Sometimes you carry more than you show. Please remember that your own heart deserves care too.</p>
                </motion.article>
              </div>
            </div>
          </section>

          <section className="section gentle-reminder">
            <div className="reminder-content">
              <div className="hand-doodle" aria-hidden="true">
                <span></span><span></span><span></span><span></span><span></span>
              </div>
              <p className="eyebrow">A gentle reminder</p>
              <h2>Even the person who<br/><em>takes care of everyone</em><br/>needs someone too.</h2>
              <p>So please take care of yourself. If something hurts, don't hide it. If you're tired, rest. If something is heavy, you can share it.</p>
              <div className="black-heart">🖤</div>
            </div>
          </section>

          <section className="section family">
            <div className="family-inner">
              <p className="eyebrow">For Rekha K · her sister</p>
              <h2>Some love is so deep,<br/><em>it becomes responsibility.</em></h2>
              <p className="family-intro">I know how much you carry for the people you love. Especially for your sister, Rekha.</p>
              <div className="sister-story">
                <div className="story-line"></div>
                <p>It's like carrying your sister through every storm, no matter how heavy life gets. You want to protect her, give her everything you can, and see her enjoy the life she deserves.</p>
                <p>You love your family more than you can ever explain, and sometimes that love itself becomes a burden because you feel like you have to handle everything for them.</p>
                <p>But you're still human. There are days when you're tired, broken, and struggling with things you don't know how to express.</p>
                <p>You never want to hurt the people you love. But when you can't carry everything anymore, your pain sometimes comes out as anger, silence, or distance.</p>
                <p>And maybe the hardest part is knowing that the people you would protect with your whole life can sometimes be the same people you unintentionally hurt.</p>
                <p>You don't stop loving them. You're just exhausted from trying to be strong for everyone while quietly fighting your own battles.</p>
              </div>
              <div className="family-ending">
                <span>Rekha will always be your sister.</span>
                <strong>And you are allowed to be human, too.</strong>
              </div>
            </div>
          </section>

          <section className="section letter">
            <div className="letter-paper">
              <p className="eyebrow">A letter for you</p>
              <h2>Revathi,</h2>
                            <p>You are not just a friend to me. I really care about you a lot, even though I don't always show it or make a big deal about it.</p>
              <p>Sometimes I think about whether you've eaten properly, whether you're taking care of your health, or whether you're doing okay. At the end of the day, I just want you to be okay.</p>
              <p>I know you get angry sometimes, and I know you have a lot of things going on. You face so many things by yourself — family, friends, personal things, work, and everything else. Maybe you don't always tell people what you're going through, and that's okay.</p>
              <p>I just want you to know that I'll always be there for you. If there's anything you want to share, tell me. I'll listen. If I can fix something, I'll try my best. And if I can't fix it, at least I don't want you to feel like you have to face it completely alone.</p>
              <p>I know you always show your funny side, and honestly, I love seeing you happy. You make it look like everything is okay. But sometimes I feel like, deep down, you're carrying a lot more than you show.</p>
              <p>You don't have to handle everything by yourself all the time. Always be yourself. Take care of yourself, eat properly, stay healthy, and don't forget to give yourself some peace too.</p>
              <p>And yes, I'll keep annoying you by asking, "Did you eat?" "Are you okay?" "How are you feeling?" 😂 Don't take it too seriously. That's just something I'll always do for you.</p>
              <p>I may not say all of this often, but I genuinely care about you.</p>
              <p>If you start taking care of yourself, I believe everything will slowly fall into place. Because when you're okay — mentally, emotionally, and physically — you'll have so much more to give to the people you love, whether they're your family or your friends.</p>
              <p>You'll be able to love them, support them, and do more for them than you ever thought you were capable of. Sometimes, you're stronger and more capable than you think. You just need to take care of yourself first.</p>
              <p>Can I tell you something?</p>
              <p>Think of me as one of the stars in your sky. While I'm here, I'll shine for you and give you all the light I can.</p>
              <p>And even if life takes us in different directions someday, I hope you'll remember that I was once one of those stars in your sky.</p>
              <p>Maybe years from now, when you look up, you'll still feel something familiar — because even if I'm not standing beside you the way I am today, I hope the little bit of light I left behind will always remain a small part of your sky.</p>
              <p className="signature">Happy 26th birthday, Revathi.<br/><span>— from someone who will always care 🖤</span></p>
            </div>
          </section>

          <section className="finale section">
            <div className="finale-glow"/>
            <p className="eyebrow">One last thing</p>
            <h2>Stay exactly<br/><em>who you are.</em></h2>
            <p>Because that's the person who makes this world feel a little warmer.</p>
            <div className="heart"><Heart fill="#050505" color="#050505" size={28}/></div>
            <p className="tiny">06 · 08 · 2026</p>
          </section>

          <footer>made with a little care, for Revathi.</footer>
        </>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
