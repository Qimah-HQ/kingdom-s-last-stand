import { useEffect, useRef, useState } from "react";
import { isMuted } from "../../lib/audioContext";
import ArmorSelectScreen from "./ArmorSelectScreen";
import { LordAldric, QueenSeraphine, Morrigan, Kael, Aurora } from "./CharacterSprites";

const CHARACTER_STORIES = {
  aldric: [
    "Hearken well, good lord... for what I am about to tell thee is no mere fancy nor fireside tale.",
    "There was once a kingdom — Eldenmoor, they called it. Green hills, honest folk, children laughing in the lanes. A good place. A real place.",
    "Thou wert its lord and its shield. Lord Aldric Stoneheart. Aye, the very last of that bloodline.",
    "But trouble, as it always does... came a-creeping. From beyond the Ashenmoor mountains, something ancient stirred. The Warlord Malgrath — gods forgive us — had woken.",
    "His host was vast. Vast beyond all reckoning. Peasants turned to rot, knights twisted by darkness, demons that had no name in any tongue I know.",
    "They did not merely march. They poured forth like a black tide — burning, breaking, howling with a hunger that fair chilled the blood.",
    "The villages fell first. Then the outer walls. Then the gates themselves, iron and all, were sundered like dry timber.",
    "And yet... thou didst not flee. Thou stood at the rampart — sword drawn, jaw set — as thy people wept behind thee.",
    "They look to thee now, lord. Every man, woman, and bairn in that castle is counting on thy will and thy wit.",
    "So build thy towers tall. Marshal every archer, every cannon, every blade thou canst spare. And do not yield — not one blessed inch.",
    "For Eldenmoor. For thy blood. For everything that is worth a damn in this wretched and beautiful world.",
  ],
  seraphine: [
    "Hear me, my Queen... for the hour is grave and the tale I bear heavier still.",
    "Eldenmoor — thy kingdom, thy responsibility — burns at its edges. The forests thou hast sworn to protect shriek in the darkness.",
    "Thou art Queen Seraphine, Sentinel of the Green, crowned not just by lineage but by the ancient groves themselves.",
    "Malgrath's host tears through the sacred lands. Ancient trees felled. Rivers poisoned. The land itself weeps.",
    "Thy people did not ask for war. Farmers, healers, children of the grove — they look to thee with eyes that have seen too much sorrow.",
    "Thou hast cast aside thy crown's comfort and taken up the mantle of a warrior. For what is a queen who will not bleed for her kingdom?",
    "The outer ramparts crumble. The darkness seeps inward like a rot through old wood. But thou standest firm.",
    "Every tower thou buildest is a root sunk deep into Eldenmoor's soil. Every cannon fired is a prayer answered.",
    "They call thee the Green Sentinel. Today, thou must earn that name a thousand times over.",
    "Let thy forests rise. Let thy towers sing. Let Malgrath know that Eldenmoor's queen does not kneel.",
    "For thy people. For the sacred groves. For every living thing that flourishes under thy watch.",
  ],
  morrigan: [
    "So... thou hast returned. I wondered if thou would. After everything they said. After everything they did.",
    "Eldenmoor cast thee out, Morrigan. Accused thee of dark arts, of treachery, of sins thou did not commit. And yet here thou art.",
    "Malgrath rises. The very darkness they once accused thee of wielding now marches on the kingdom that exiled thee.",
    "Irony is a blade with no handle — it cuts both ways. They need thee now. The banished mage. The shadow witch. Their only hope.",
    "His armies are vast. His corruption deep. But thy magic — thy real magic — was never darkness. It was power. Raw, honest, merciless power.",
    "The towers must hold. And only thou canst marshal the arcane forces needed to make them truly deadly.",
    "Every tower thou reinforces with thy magic spits in the face of every lord who called thee monster.",
    "They barred thee from the court. They stripped thee of title. But they cannot strip thee of what burns in thy blood.",
    "So build. And fight. Not for them — not yet. Fight for the proof. Fight to show what they threw away.",
    "Let the cannons roar with arcane fire. Let every fallen enemy be an answer to every lie told about thee.",
    "For justice. For proof. And maybe — just maybe — for the Eldenmoor that could have been, had they listened.",
  ],
  kael: [
    "Easy now, ranger. Breathe. Thou hast wandered far — but this is where the road was always taking thee.",
    "They call thee Kael Ironbow. Wanderer. Borderlands ghost. The arrow that never misses and the man who never stays.",
    "Thou hast watched darkness creep across the frontier for years. Village by village. Fire by fire. Face by face.",
    "Malgrath's horde is nothing new to thy eyes — but never before hath it threatened to swallow everything at once.",
    "Thou could have kept running. Kept watching. It would have been easy. Safer. Alone in the wilderness with no blood on thy conscience.",
    "But thou stopped. Here. At Eldenmoor's last gate. Because some part of thee remembered the faces of those thou could not save.",
    "Every tower thou places is a line drawn in the earth. A promise made to the dead. A debt being paid.",
    "The arrows matter. The positioning matters. Every decision matters. Thou hast spent thy life honing this instinct — use it.",
    "Malgrath's horde does not know what hunts it. They see towers. They do not see the mind behind them.",
    "So aim true, ranger. Place every defense with purpose. Let each wave that breaks against thy line be a name struck from thy list of failures.",
    "For the borderlands. For the fallen. For every soul thou watched burn while thou were not yet ready to fight. Thou art ready now.",
  ],
  aurora: [
    "Be still, holy warrior. The light has not abandoned thee — it brought thee here.",
    "Aurora, Paladin of the Sun Order. They said thou left without blessing. Without permission. Without reason.",
    "But thou saw what they refused to look at. A darkness so deep it swallowed the light of faith itself.",
    "Malgrath is not merely a warlord. He is a wound in the world. An absence where hope used to live.",
    "Thy order prays. Thy order chants. But prayers alone do not stop armies. Steel does. Fire does. Will does.",
    "So thou came. Alone. Armour bright and heart burning with something fiercer than doctrine — conviction.",
    "Eldenmoor's people are not thy congregation. But they are innocent. And innocence is worth any price.",
    "Every tower thou raises is a beacon. Every enemy felled is the light reclaiming ground from the dark.",
    "Thy shield arm may tire. Thy faith may waver in the long hours. But the light within thee does not extinguish.",
    "They will write hymns about this day, or they will not write anything at all — for there will be no one left.",
    "For the innocent. For the light. For every soul that prays in darkness and deserves to see the dawn.",
  ],
};

const CHARACTER_SPRITES = {
  aldric: LordAldric,
  seraphine: QueenSeraphine,
  morrigan: Morrigan,
  kael: Kael,
  aurora: Aurora,
};

function speakLine(text, onEnd) {
  if (isMuted() || !window.speechSynthesis) { onEnd(); return; }
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.68;
  utt.pitch = 0.55;
  utt.volume = 1;

  // Try to find a deep British/English voice
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    (v.lang === "en-GB" || v.lang.startsWith("en")) &&
    (v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("daniel") ||
     v.name.toLowerCase().includes("george") || v.name.toLowerCase().includes("arthur") ||
     v.name.toLowerCase().includes("oliver") || v.name.toLowerCase().includes("reed"))
  ) || voices.find(v => v.lang === "en-GB") || voices.find(v => v.lang.startsWith("en"));
  if (preferred) utt.voice = preferred;

  utt.onend = onEnd;
  utt.onerror = onEnd;
  window.speechSynthesis.speak(utt);
}

export default function IntroStoryModal({ show, onBegin, characterId }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | waiting | done
  const [skipped, setSkipped] = useState(false);
  const [showArmorSelect, setShowArmorSelect] = useState(false);
  const typeRef = useRef(null);
  const lineRef = useRef(0);

  const STORY_LINES = CHARACTER_STORIES[characterId] || CHARACTER_STORIES.aldric;
  const CharacterSprite = CHARACTER_SPRITES[characterId] || LordAldric;

  // Reset when shown
  useEffect(() => {
    if (!show) return;
    setLineIndex(0);
    setDisplayedText("");
    setPhase("typing");
    setSkipped(false);
    lineRef.current = 0;
  }, [show]);

  // Typewriter + voice per line — advance only when BOTH typing AND speech are done
  useEffect(() => {
    if (!show || skipped) return;

    const line = STORY_LINES[lineIndex];
    if (!line) { setPhase("done"); return; }

    setDisplayedText("");
    setPhase("typing");

    let typingDone = false;
    let speechDone = false;

    const tryAdvance = () => {
      if (!typingDone || !speechDone) return;
      setTimeout(() => {
        const next = lineIndex + 1;
        if (next < STORY_LINES.length) {
          setLineIndex(next);
        } else {
          setPhase("done");
        }
      }, 500);
    };

    // Typewriter
    let charIdx = 0;
    typeRef.current = setInterval(() => {
      charIdx++;
      setDisplayedText(line.slice(0, charIdx));
      if (charIdx >= line.length) {
        clearInterval(typeRef.current);
        setPhase("waiting");
        typingDone = true;
        tryAdvance();
      }
    }, 28);

    // Speech — speed matches typing (28ms * chars ≈ duration)
    const trySpeak = () => {
      speakLine(line, () => {
        speechDone = true;
        tryAdvance();
      });
    };

    if (!window.speechSynthesis) {
      speechDone = true;
    } else if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = trySpeak;
    } else {
      trySpeak();
    }

    return () => {
      clearInterval(typeRef.current);
      window.speechSynthesis?.cancel();
    };
  }, [lineIndex, show, skipped]);

  const handleSkip = () => {
    clearInterval(typeRef.current);
    window.speechSynthesis.cancel();
    setSkipped(true);
    setPhase("done");
  };

  if (!show) return null;

  if (showArmorSelect) {
    return <ArmorSelectScreen onConfirm={(armorId) => onBegin(armorId)} />;
  }

  const progress = (lineIndex / STORY_LINES.length) * 100;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.96)" }}>

      {/* Parchment-style background texture */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(180,130,60,0.3) 30px, rgba(180,130,60,0.3) 31px)`,
        }} />

      {/* Vignette */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)" }} />

      <div className="relative max-w-2xl w-full mx-4">
        {/* Header with character sprite */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <CharacterSprite size={90} />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-[0.3em]"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              background: "linear-gradient(135deg, #ffd60a, #b8860b, #ffd60a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "none",
              filter: "drop-shadow(0 0 12px rgba(255,214,10,0.4))",
            }}>
            Kingdom's Last Stand
          </h2>
          <p className="text-xs uppercase tracking-[0.4em] mt-1" style={{ color: "#5a4030" }}>
            ⚔ &nbsp; A Tale of Blood & Honour &nbsp; ⚔
          </p>
        </div>

        {/* Story scroll */}
        <div className="relative rounded-2xl p-8 mx-2"
          style={{
            background: "linear-gradient(160deg, #1a1208, #0d0b05)",
            border: "2px solid #5a3a10",
            boxShadow: "0 0 60px rgba(180,130,40,0.15), inset 0 0 40px rgba(0,0,0,0.6)",
          }}>

          {/* Decorative corner ornaments */}
          <div className="absolute top-3 left-3 text-lg opacity-30" style={{ color: "#b8860b" }}>✦</div>
          <div className="absolute top-3 right-3 text-lg opacity-30" style={{ color: "#b8860b" }}>✦</div>
          <div className="absolute bottom-3 left-3 text-lg opacity-30" style={{ color: "#b8860b" }}>✦</div>
          <div className="absolute bottom-3 right-3 text-lg opacity-30" style={{ color: "#b8860b" }}>✦</div>

          {/* Line counter */}
          <div className="text-center mb-1">
            <span className="text-[9px] uppercase tracking-[0.3em]" style={{ color: "#5a4030" }}>
              Chapter {lineIndex + 1} of {STORY_LINES.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mb-6 h-0.5 rounded-full overflow-hidden" style={{ background: "#2a1a05" }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: "linear-gradient(90deg, #b8860b, #ffd60a)" }} />
          </div>

          {/* Story text */}
          <div className="min-h-[100px] flex items-center justify-center">
            {skipped ? (
              <p className="text-center text-lg leading-relaxed italic"
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: "#d4af70",
                  textShadow: "0 0 20px rgba(212,175,112,0.3)",
                }}>
                "The realm awaits thy command, my lord."
              </p>
            ) : (
              <p className="text-center text-lg leading-relaxed italic"
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: "#d4af70",
                  textShadow: "0 0 20px rgba(212,175,112,0.3)",
                  minHeight: "3rem",
                }}>
                {displayedText}
                {phase === "typing" && (
                  <span className="inline-block w-0.5 h-5 ml-0.5 align-middle animate-pulse"
                    style={{ background: "#d4af70" }} />
                )}
              </p>
            )}
          </div>

          {/* Speaker label */}
          {!skipped && phase !== "done" && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#ffd60a" }} />
              <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: "#6a4a20" }}>
                The Royal Chronicler speaks...
              </span>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#ffd60a" }} />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6 justify-center">
          {!skipped && (
            <button
              onClick={phase === "done" ? undefined : handleSkip}
              className="px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all hover:opacity-80"
              style={{
                background: phase === "done" ? "rgba(30,20,5,0.4)" : "rgba(80,55,15,0.9)",
                border: "1px solid #7a5020",
                color: phase === "done" ? "#3a2810" : "#c8a050",
                cursor: phase === "done" ? "default" : "pointer",
              }}>
              ⏭ Skip
            </button>
          )}

          {(phase === "done" || skipped) && (
            <button
              onClick={() => setShowArmorSelect(true)}
              className="px-10 py-4 rounded-xl font-black text-base uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                background: "linear-gradient(180deg, #b8860b, #7a5500)",
                border: "3px solid #ffd60a",
                boxShadow: "0 6px 0 #3a2200, 0 0 30px rgba(255,214,10,0.4)",
                color: "#fff8dc",
                textShadow: "0 2px 4px rgba(0,0,0,0.6)",
              }}>
              ⚔ &nbsp; Choose Thine Armour &nbsp; ⚔
            </button>
          )}
        </div>

        {/* Mute hint */}
        <p className="text-center mt-3 text-[9px] uppercase tracking-widest" style={{ color: "#3a2810" }}>
          🔊 Narrated by The Royal Chronicler — ensure thy sound is enabled
        </p>
      </div>
    </div>
  );
}