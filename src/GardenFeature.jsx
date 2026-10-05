import {Flower2,ArrowRight,Play} from 'lucide-react';
import {campaignProgress} from '../shared/garden';
import {gardenText} from './garden-copy';
export default function GardenFeature({scores,lang,onPlay}){const p=campaignProgress(scores),t=key=>gardenText(lang,key);return <section className="garden-feature"><Flower2/><div><span className="mg-kicker">{t('tag')} · 1,000 {lang==='hi'?'स्तर':'LEVELS'}</span><h2>{t('title')}</h2><p>{lang==='hi'?'कार्ड मिलाएँ, स्टार कमाएँ और अपने सफ़र को आगे बढ़ाएँ।':'Match pairs, collect stars, and discover your next chapter.'}</p></div><button className="mg-primary" onClick={onPlay}><Play size={18}/>{t('level')} {p.unlocked}<ArrowRight size={18}/></button></section>;}
