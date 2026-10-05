// Folk & ancient stories from the eight North-East states, retold in simple
// words for patients to read or listen to, each with a couple of gentle
// recall questions. Original retellings — not copied from any single source.
// Grouped by state so Story Time can show one card per state (with a small
// icon of something the state is known for), and a stack of stories inside.

export const nerStates=[
 {
  id:'assam',
  state:'Assam',
  icon:'🦏',
  iconLabel:'One-horned rhino of Kaziranga',
  stories:[
   {
    id:'assam-1',
    title:'Tejimola, the Brave Girl',
    titleHi:'तेजीमोला, बहादुर बेटी',
    story:`Long ago in Assam, there lived a merchant's daughter named Tejimola. Her father travelled far for trade and left her with a stepmother, who was jealous and unkind. While her father was away, the stepmother treated Tejimola very badly and, in her cruelty, caused the girl great harm.
When her father returned and asked for her, the stepmother lied and said Tejimola had gone to her uncle's house. But the truth could not stay hidden. From the ground where she lay, a small gourd plant grew. Later, a paddy plant, and then a bright cotton plant — each one spoke softly of Tejimola's sorrow whenever someone passed by.
At last a cotton plant grew into a small bird that sang Tejimola's story to a passing trader — who happened to be her own father. Moved and grief-stricken, he called out to her with love, and Tejimola returned to her true form, alive and safe.
The story is sung even today in Assam as the ballad of Tejimola, a tale about a daughter's courage and a father's love that could reach her wherever she was.`,
    storyHi:`बहुत समय पहले असम में एक व्यापारी की बेटी रहती थी, जिसका नाम तेजीमोला था। उसके पिता व्यापार के लिए दूर देश गए और उसे अपनी सौतेली माँ के पास छोड़ गए, जो जलनशील और निर्दयी थी। पिता के जाते ही सौतेली माँ ने तेजीमोला के साथ बहुत बुरा व्यवहार किया और अपनी क्रूरता में उसे गहरी चोट पहुँचाई।
जब पिता लौटे और अपनी बेटी के बारे में पूछा, तो सौतेली माँ ने झूठ बोला कि तेजीमोला अपने चाचा के घर गई है। पर सच्चाई कब तक छुपती। जहाँ वह पड़ी थी, वहाँ से एक छोटा लौकी का पौधा उगा। फिर धान का पौधा, और फिर एक चमकीला कपास का पौधा — हर बार जब कोई वहाँ से गुज़रता, वह पौधा धीरे से तेजीमोला के दुख की बात कहता।
आख़िर में कपास का पौधा एक छोटी चिड़िया बन गया, जिसने गुज़रते हुए एक व्यापारी को तेजीमोला की कहानी गाकर सुनाई — और वह व्यापारी कोई और नहीं, उसके अपने पिता ही थे। भावुक और दुखी होकर उन्होंने प्रेम से उसे पुकारा, और तेजीमोला अपने असली रूप में, जीवित और सुरक्षित लौट आई।
यह कहानी आज भी असम में तेजीमोला के गीत के रूप में गाई जाती है — एक बेटी के साहस और एक पिता के प्रेम की कहानी, जो उसे कहीं भी ढूँढ लेता।`,
    questions:[
     {q:'Tejimola ke papa kya kaam karte the?',hint:'Woh door-door jaate the saamaan bechne',answers:['merchant','vyapari','trader','vyaapaari','business']},
     {q:'Tejimola aakhir me kis roop me wapas aayi?',hint:'Ek chidiya ke gaane se',answers:['bird','chidiya','pakshi']}
    ]
   },
   {
    id:'assam-2',
    title:'The One-Horned Guardian',
    titleHi:'एक सींग वाला रक्षक',
    story:`In the grasslands of Kaziranga in Assam, elders tell of the great one-horned rhinoceros as an old guardian of the marshes, said to have watched over the river plains since the time of the earliest villages.
A favourite tale describes a terrible flood on the Brahmaputra that once threatened a small settlement. The villagers say a rhino calmly led the frightened cattle and children to higher ground on a hidden forest path known only to the animals, before the waters rose too high.
Ever since, families living near the park have treated the rhino with special respect, believing it brings good fortune to those who protect rather than fear it.
The story is told to remind children that the forest and its animals are not separate from the village — they are neighbours who look out for each other.`,
    storyHi:`असम के काज़ीरंगा की घास के मैदानों में, बुज़ुर्ग बताते हैं कि विशाल एक सींग वाला गैंडा दलदलों का एक पुराना रक्षक है, जो शुरुआती गाँवों के समय से नदी के मैदानों की रखवाली करता आया है।
एक प्रिय कहानी में बताया जाता है कि एक बार ब्रह्मपुत्र में भयानक बाढ़ ने एक छोटी बस्ती को खतरे में डाल दिया था। गाँव वाले कहते हैं कि एक गैंडे ने शांति से डरे हुए मवेशियों और बच्चों को जंगल के एक छिपे हुए रास्ते से ऊँची जगह पर पहुँचाया, इससे पहले कि पानी बहुत ऊपर तक चढ़ जाता।
तभी से पार्क के पास रहने वाले परिवार गैंडे का विशेष सम्मान करते हैं, यह मानते हुए कि जो उसकी रक्षा करता है, डरता नहीं, उसे सौभाग्य मिलता है।
यह कहानी बच्चों को याद दिलाने के लिए सुनाई जाती है कि जंगल और उसके जानवर गाँव से अलग नहीं हैं — वे एक-दूसरे का ख्याल रखने वाले पड़ोसी हैं।`,
    questions:[
     {q:'Kaziranga me kaunsa jaanwar kahani ka guardian hai?',hint:'Uske sar par ek seeng hota hai',answers:['rhino','rhinoceros','gainda']},
     {q:'Kahani me bade khatre se sabko kaun bachata hai?',hint:'Wahi seengwala jaanwar',answers:['rhino','rhinoceros','gainda']}
    ]
   },
   {
    id:'assam-3',
    title:'The Weaver of Dreams',
    titleHi:'सपनों की बुनकर',
    story:`Assamese grandmothers often speak of a legendary weaver girl who could weave not just cloth, but dreams into her mekhela sador on her loom, using threads coloured with flowers from her garden.
It is said that whoever wore a cloth she had woven with a kind thought would have peaceful sleep and good dreams that night. Neighbours would visit her simply to sit near her loom and listen to its gentle rhythm.
One year, a long drought made everyone anxious, so the weaver wove a special cloth patterned like flowing water, and hung it near the village well. People say the rains returned soon after — though elders smile and say it was really the season changing, helped a little by hope.
The story is told to Assamese children to show that patience and small acts of care, like weaving thread by thread, can steady a whole village's spirit.`,
    storyHi:`असमिया दादी-नानी अक्सर एक अनोखी बुनकर लड़की की बात करती हैं, जो अपने करघे पर सिर्फ कपड़ा ही नहीं, बल्कि सपने भी बुनती थी — अपने बगीचे के फूलों से रंगे धागों से बनी मेखला सदोर में।
कहा जाता है कि जो भी उसका बुना हुआ, अच्छी भावना से तैयार किया गया कपड़ा पहनता, उसे उस रात शांति भरी नींद और अच्छे सपने आते। पड़ोसी बस उसके करघे के पास बैठकर उसकी धीमी लय सुनने आते थे।
एक साल लंबे सूखे ने सबको चिंतित कर दिया, तो बुनकर ने बहते पानी जैसा एक खास कपड़ा बुना और उसे गाँव के कुएँ के पास टाँग दिया। लोग कहते हैं कि जल्द ही बारिश लौट आई — हालाँकि बुज़ुर्ग मुस्कुराकर कहते हैं कि असल में मौसम बदल रहा था, बस थोड़ी उम्मीद ने मदद की।
यह कहानी असमिया बच्चों को यह दिखाने के लिए सुनाई जाती है कि धैर्य और छोटी-छोटी देखभाल की बातें, जैसे धागा-धागा बुनना, पूरे गाँव के हौसले को संभाल सकती हैं।`,
    questions:[
     {q:'Weaver ladki kya banati thi jisme dream bhi bunte the?',hint:'Ek tarah ka kapda, mekhela sador',answers:['cloth','mekhela sador','kapda','saree']},
     {q:'Sookhe (drought) ke waqt usne kya kiya?',hint:'Ek khaas kapda bunkar kahin latka diya',answers:['cloth','weave','bunai','well ke paas latkaya']}
    ]
   },
   {
    id:'assam-4',
    title:'The Tea Garden Song',
    titleHi:'चाय बागान का गीत',
    story:`In the tea gardens of upper Assam, workers tell of an old custom of singing together while plucking the tender tea leaves each morning, a practice believed to have started generations ago to keep everyone's spirits light during long hours of work.
Legend says one gifted singer's morning song was so lovely that even the mist over the garden would lift a little earlier to listen, and the tea plucked during her songs was always said to taste the sweetest.
Over time, whole families learned her songs, passing them from mother to daughter, so that even today, walking past a tea garden at sunrise, you may still hear voices rising together over the green rows.
The story reminds people that shared work becomes lighter, and even sweeter, when it is done together with song.`,
    storyHi:`ऊपरी असम के चाय बागानों में, मज़दूर बताते हैं कि हर सुबह कोमल चाय की पत्तियाँ तोड़ते समय साथ मिलकर गाने की एक पुरानी परंपरा है — माना जाता है कि यह पीढ़ियों पहले शुरू हुई थी, ताकि लंबे काम के घंटों में सबका मन हल्का रहे।
कहते हैं कि एक गुणी गायिका का सुबह का गीत इतना मधुर था कि बागान पर छाई धुंध भी उसे सुनने के लिए थोड़ा जल्दी उठ जाती, और कहा जाता था कि उसके गाने के दौरान तोड़ी गई चाय हमेशा सबसे मीठी होती थी।
समय के साथ, पूरे परिवारों ने उसके गीत सीख लिए, माँ से बेटी तक पहुँचाते हुए, इसलिए आज भी सुबह चाय बागान के पास से गुज़रते हुए आपको हरी कतारों के ऊपर साथ उठती आवाज़ें सुनाई दे सकती हैं।
यह कहानी लोगों को याद दिलाती है कि साथ मिलकर किया गया काम, गीत के साथ, हल्का और और भी मीठा हो जाता है।`,
    questions:[
     {q:'Tea garden me subah kya kiya jaata tha kaam ke saath?',hint:'Aawaaz se judi cheez',answers:['singing','gaana','song']},
     {q:'Achhi singer ke gaane se kya khaas hota tha?',hint:'Chai ki patti ka swaad',answers:['sweetest tea','meethi chai','taste']}
    ]
   },
   {
    id:'assam-5',
    title:'The River That Remembered',
    titleHi:'नदी जिसे सब याद था',
    story:`Long ago on the banks of the Brahmaputra in Assam, an old boatman named Dihang ferried travellers across the wide river every day, knowing every current and sandbank by heart.
One monsoon, the river rose faster than anyone expected, and a young mother with her baby was stranded on a shrinking sandbar. Dihang rowed straight into the swirling water, guiding his boat past hidden whirlpools that only he could sense, and brought them safely to the far bank.
From that day, villagers said the river itself remembered kindness, and never once pulled Dihang's boat under, even in the fiercest floods of his long life.
The story is told to remind children that knowing a place well, and using that knowledge to help others, is its own kind of courage.`,
    storyHi:`बहुत समय पहले असम में ब्रह्मपुत्र के किनारे, दिहांग नाम का एक बूढ़ा मल्लाह हर दिन यात्रियों को चौड़ी नदी के पार ले जाता था, उसे हर धारा और रेत का टीला दिल से याद था।
एक मानसून में नदी उम्मीद से कहीं तेज़ी से चढ़ गई, और एक छोटे बच्चे के साथ एक युवा माँ सिकुड़ते रेत के टीले पर फँस गई। दिहांग सीधे बहती हुई पानी में उतरा, छिपे हुए भँवरों को बचाते हुए जिन्हें सिर्फ वही महसूस कर पाता था, और उन्हें सुरक्षित दूसरे किनारे पर पहुँचा दिया।
उस दिन से गाँव वाले कहते थे कि नदी खुद ही दया को याद रखती है, और अपने पूरे जीवन में सबसे भयंकर बाढ़ में भी उसने दिहांग की नाव को कभी नहीं डुबोया।
यह कहानी बच्चों को याद दिलाने के लिए सुनाई जाती है कि किसी जगह को अच्छी तरह जानना, और उस जानकारी से दूसरों की मदद करना, भी एक तरह का साहस है।`,
    questions:[
     {q:'Dihang kya kaam karta tha?',hint:'Nadi paar karwata tha',answers:['boatman','mallaah','nahiya','ferried people']},
     {q:'Baadh ke waqt Dihang ne kisko bachaya?',hint:'Ek maa aur uska bachha',answers:['mother and baby','maa aur bachha','young mother']}
    ]
   }
  ]
 },
 {
  id:'arunachal',
  state:'Arunachal Pradesh',
  icon:'🏔️',
  iconLabel:'Snow-capped Himalayan peaks',
  stories:[
   {
    id:'arunachal-1',
    title:'Abotani, the First Man',
    titleHi:'अबोतानी, पहला मनुष्य',
    story:`Among the Adi people of Arunachal Pradesh, elders tell of Abotani, the first man on earth. In the old days, it is said, the sky and the earth were close together and spirits called Ui lived alongside people, sometimes as friends and sometimes causing trouble.
Abotani was clever and kind-hearted. He learned to farm the land, to build a house, and to live peacefully even when the spirits tested him. Slowly, he and his family grew into the many clans of the Adi and neighbouring tribes, each remembering a piece of his journey.
Because of Abotani, families still perform small rituals of respect before farming or building — a quiet thank-you to the first man who showed how to live gently with the land and with each other.
Grandparents tell this story to remind children that patience and respect for nature keep a family strong, just as it did for Abotani long ago.`,
    storyHi:`अरुणाचल प्रदेश के आदि लोगों में, बुज़ुर्ग अबोतानी की कहानी सुनाते हैं, जिसे धरती का पहला मनुष्य माना जाता है। कहा जाता है कि पुराने समय में आसमान और धरती आपस में बहुत पास थे, और 'उई' नाम की आत्माएँ इंसानों के साथ रहती थीं — कभी दोस्त बनकर, तो कभी परेशानी खड़ी करके।
अबोतानी चतुर और दयालु था। उसने ज़मीन जोतना, घर बनाना और आत्माओं द्वारा परखे जाने पर भी शांति से जीना सीखा। धीरे-धीरे वह और उसका परिवार बढ़कर आदि और पड़ोसी जनजातियों के कई कुल बन गए, जिनमें से हर एक उसकी यात्रा का एक हिस्सा याद रखता है।
अबोतानी की वजह से परिवार आज भी खेती या निर्माण से पहले छोटे-छोटे आदर के अनुष्ठान करते हैं — उस पहले मनुष्य के प्रति एक चुपचाप धन्यवाद, जिसने ज़मीन और एक-दूसरे के साथ सौम्यता से जीना सिखाया।
दादा-दादी यह कहानी बच्चों को याद दिलाने के लिए सुनाते हैं कि धैर्य और प्रकृति के प्रति सम्मान परिवार को मज़बूत रखते हैं, जैसे अबोतानी के समय में हुआ था।`,
    questions:[
     {q:'Abotani kise kaha jaata hai?',hint:'Adi logon ke sabse pehle...',answers:['first man','pehla','ancestor','purvaj']},
     {q:'Abotani ne apne parivaar ko kya sikhaya?',hint:'Zameen aur prakriti se judi baat',answers:['farm','farming','kheti','respect nature','prakriti']}
    ]
   },
   {
    id:'arunachal-2',
    title:'The River That Remembered',
    titleHi:'वह नदी जो रास्ता याद रखती थी',
    story:`In the high valleys of Arunachal Pradesh, a story is told about the Siang river, said to carry the memories of the mountains it flows past, from the melting snow at its source to the plains far below.
Villagers say that in years long past, a young shepherd lost his way in thick fog high in the hills. Unsure which path led home, he is said to have followed the sound of the river downstream, trusting that it always knew the way to the villages below.
He reached home safely by nightfall, and ever since, elders tell children that if they are ever unsure of their path, they should listen for the river — it always remembers the way.
The tale is a gentle reminder that some things, like a flowing river, quietly hold the way home even when we feel lost.`,
    storyHi:`अरुणाचल प्रदेश की ऊँची घाटियों में सियांग नदी की एक कहानी कही जाती है — कहते हैं कि यह नदी उन पहाड़ों की यादें अपने साथ लेकर बहती है, जिनसे होकर गुज़रती है, अपने उद्गम की पिघलती बर्फ से लेकर दूर नीचे के मैदानों तक।
गाँव वाले कहते हैं कि बहुत साल पहले एक जवान चरवाहा पहाड़ों की घनी धुंध में रास्ता भटक गया था। यह न समझ पाने पर कि घर का रास्ता कौन-सा है, कहा जाता है कि उसने नदी की आवाज़ का पीछा किया, यह भरोसा करते हुए कि वह हमेशा नीचे के गाँवों का रास्ता जानती है।
वह रात होते-होते सुरक्षित घर पहुँच गया, और तभी से बुज़ुर्ग बच्चों से कहते हैं कि अगर वे कभी अपने रास्ते को लेकर अनिश्चित हों, तो उन्हें नदी की आवाज़ सुननी चाहिए — वह हमेशा रास्ता याद रखती है।
यह कहानी धीरे से याद दिलाती है कि बहती नदी जैसी कुछ चीज़ें, चुपचाप घर का रास्ता संभाले रहती हैं, तब भी जब हम खोया हुआ महसूस करते हैं।`,
    questions:[
     {q:'Kahani me kaunsi nadi rasta yaad rakhti hai?',hint:'Arunachal ki ek mashhoor nadi',answers:['siang','river','nadi']},
     {q:'Kohre me raasta bhatakne par chaupan ne kya suna?',hint:'Behti hui aawaaz',answers:['river sound','nadi ki awaaz','water']}
    ]
   },
   {
    id:'arunachal-3',
    title:'The Bamboo Bridge Builders',
    titleHi:'बांस के पुल बनाने वाले',
    story:`Many communities in Arunachal Pradesh are known for building long bamboo bridges across fast rivers, and elders say this skill was first taught to villagers by a wise old craftsman who noticed how bamboo bends without breaking in the wind.
He is remembered for saying that a bridge, like a family, stays strong not because it never bends, but because each piece is tied firmly to the next. Following his method, entire villages worked together season after season to keep their bridges safe to cross.
Even today, when a new bamboo bridge is built, elders retell his words to the younger builders, so the skill and the lesson travel together, from hand to hand.
The story teaches that strength often comes from flexibility and from people working closely, tied together like the bamboo of a bridge.`,
    storyHi:`अरुणाचल प्रदेश के कई समुदाय तेज़ बहती नदियों पर लंबे बांस के पुल बनाने के लिए जाने जाते हैं, और बुज़ुर्ग कहते हैं कि यह हुनर सबसे पहले एक बुद्धिमान बूढ़े कारीगर ने गाँव वालों को सिखाया था, जिसने देखा था कि बांस हवा में झुकता है, पर टूटता नहीं।
उसे इस बात के लिए याद किया जाता है कि उसने कहा था — पुल, परिवार की तरह, इसलिए मज़बूत नहीं रहता कि वह कभी झुकता नहीं, बल्कि इसलिए कि हर टुकड़ा अगले से मज़बूती से बंधा होता है। उसके तरीके पर चलते हुए, पूरे गाँव मौसम-दर-मौसम मिलकर काम करते रहे ताकि पुल पार करने के लिए सुरक्षित बने रहें।
आज भी, जब कोई नया बांस का पुल बनाया जाता है, बुज़ुर्ग उसकी बातें नए कारीगरों को फिर से सुनाते हैं, ताकि हुनर और सीख दोनों साथ-साथ, हाथ-से-हाथ आगे बढ़ें।
यह कहानी सिखाती है कि ताकत अक्सर लचीलेपन से और लोगों के मिलकर काम करने से आती है — पुल के बांस की तरह आपस में बंधे हुए।`,
    questions:[
     {q:'Bridge banane ke liye kaunsi cheez use hoti thi?',hint:'Ek halka par majboot paudha',answers:['bamboo','bans']},
     {q:'Craftsman ke anusaar parivaar/pull majboot kyu rehta hai?',hint:'Tootne ke bajaye kya karta hai',answers:['bends','flexible','jhukta hai','tuta nahi']}
    ]
   },
   {
    id:'arunachal-4',
    title:'The Festival of the Sun and Moon',
    titleHi:'सूर्य और चंद्रमा का त्योहार',
    story:`The Nyishi and other communities of Arunachal Pradesh celebrate Nyokum, a harvest festival, and elders share a story about how the Sun and the Moon were once asked by the earth to bless the fields together, one for daylight growth and one for restful night.
Legend says the Sun agreed readily, but the Moon worried the fields did not need her since crops grow mainly by day. The Sun gently explained that a quiet, cool night was just as needed for the plants to rest and recover before another day of growing.
Convinced, the Moon agreed to bless the fields each night, and since then the festival honours both Sun and Moon together, thanking them for day and night, work and rest.
The story reminds families that both activity and rest are needed for anything — a field, a body, a mind — to stay healthy.`,
    storyHi:`अरुणाचल प्रदेश के न्यीशी और अन्य समुदाय न्योकुम नाम का फसल-त्योहार मनाते हैं, और बुज़ुर्ग एक कहानी सुनाते हैं कि कैसे एक बार धरती ने सूर्य और चंद्रमा दोनों से मिलकर खेतों को आशीर्वाद देने को कहा — एक दिन की रोशनी के बढ़ने के लिए, और दूसरा रात के आराम के लिए।
कहते हैं सूर्य तुरंत मान गया, पर चंद्रमा को चिंता थी कि खेतों को उसकी ज़रूरत नहीं, क्योंकि फसलें ज़्यादातर दिन में ही बढ़ती हैं। सूर्य ने प्यार से समझाया कि पौधों को अगले दिन फिर बढ़ने से पहले आराम करने और स्वस्थ होने के लिए शांत, ठंडी रात भी उतनी ही ज़रूरी है।
यह सुनकर चंद्रमा मान गया और हर रात खेतों को आशीर्वाद देने लगा, और तभी से यह त्योहार सूर्य और चंद्रमा दोनों का सम्मान करता है, दिन-रात और काम-आराम, दोनों के लिए धन्यवाद देते हुए।
यह कहानी परिवारों को याद दिलाती है कि किसी भी चीज़ को — चाहे खेत हो, शरीर हो या मन — स्वस्थ रहने के लिए काम और आराम, दोनों चाहिए।`,
    questions:[
     {q:'Nyokum kaunsi tarah ka tyohaar hai?',hint:'Fasal se juda tyohaar',answers:['harvest','fasal','harvest festival']},
     {q:'Chaand (moon) ko shuru me kya lagta tha?',hint:'Uski zaroorat nahi hai kyunki din me hi ugta hai',answers:['not needed','zaroorat nahi','useless']}
    ]
   },
   {
    id:'arunachal-5',
    title:'The Orchid of the High Valley',
    titleHi:'ऊँची घाटी का ऑर्किड',
    story:`High in the mountain valleys of Arunachal Pradesh, elders tell of a rare blue orchid that bloomed only once every few years on a cliff no one could easily reach.
A young herder named Yeshi once saw his ailing grandmother longing to see the flower one last time, so he climbed the steep cliff at dawn, tying himself carefully with a rope of woven bamboo.
He returned before sunset with a single blossom, and his grandmother said the sight of it, brought by his own hands, healed her heart more than any medicine could.
Even today, families in the valley say that some things worth having are worth a careful climb — not a reckless one.`,
    storyHi:`अरुणाचल प्रदेश की ऊँची पहाड़ी घाटियों में, बुज़ुर्ग बताते हैं कि एक दुर्लभ नीला ऑर्किड एक ऐसी चट्टान पर हर कुछ सालों में सिर्फ एक बार खिलता था, जहाँ आसानी से कोई नहीं पहुँच पाता था।
येशी नाम के एक युवा चरवाहे ने एक बार देखा कि उसकी बीमार दादी उस फूल को आखिरी बार देखना चाहती हैं, तो वह भोर में खड़ी चट्टान पर चढ़ गया, बाँस की बुनी हुई रस्सी से सावधानी से खुद को बाँधकर।
वह सूरज ढलने से पहले एक फूल लेकर लौटा, और उसकी दादी ने कहा कि अपने ही हाथों से लाया गया यह फूल किसी भी दवा से ज़्यादा उसका दिल भर गया।
आज भी घाटी के परिवार कहते हैं कि कुछ चीज़ें पाने लायक होती हैं अगर सावधानी से चढ़ा जाए — लापरवाही से नहीं।`,
    questions:[
     {q:'Yeshi apni dadi ke liye kya laaya?',hint:'Ek durlabh phool',answers:['orchid','blue orchid','phool','flower']},
     {q:'Yeshi chattan par chadhte waqt khud ko kis se bandha?',hint:'Bans se bani cheez',answers:['bamboo rope','bans ki rassi','rope']}
    ]
   }
  ]
 },
 {
  id:'manipur',
  state:'Manipur',
  icon:'💃',
  iconLabel:'Classical Manipuri dance',
  stories:[
   {
    id:'manipur-1',
    title:'Khamba and Thoibi',
    titleHi:'खम्बा और थोइबी',
    story:`In the Moirang kingdom of old Manipur lived Khamba, a poor but brave young man, and Thoibi, a princess known for her grace. Khamba had lost his parents early and was raised by his sister, yet he grew strong in courage and skill.
Thoibi saw his kindness and true heart, and the two fell deeply in love. But Thoibi's family wished her to marry a powerful chief instead, and Khamba was given many hard trials to prove himself — including a dangerous buffalo hunt — to earn the right to marry her.
Khamba faced every trial bravely, and slowly won the respect of the kingdom. Their story of loyal love, performed even today through the graceful Lai Haraoba dances of Manipur, is remembered as one of the region's most treasured legends.
It teaches that true love is shown not through words alone, but through courage and steady devotion.`,
    storyHi:`पुराने मणिपुर के मोइरांग राज्य में खम्बा नाम का एक गरीब पर बहादुर युवक रहता था, और थोइबी नाम की एक राजकुमारी, जो अपनी सुंदरता और शालीनता के लिए जानी जाती थी। खम्बा के माता-पिता जल्दी गुज़र गए थे और उसकी बहन ने उसे पाला, फिर भी वह साहस और हुनर में मज़बूत बना।
थोइबी ने उसकी दयालुता और सच्चा दिल देखा, और दोनों गहरे प्रेम में पड़ गए। पर थोइबी का परिवार चाहता था कि उसकी शादी एक शक्तिशाली सरदार से हो, और खम्बा को उससे शादी का हक पाने के लिए कई कठिन परीक्षाओं से गुज़रना पड़ा — जिनमें एक खतरनाक भैंसे का शिकार भी शामिल था।
खम्बा ने हर परीक्षा बहादुरी से पार की और धीरे-धीरे पूरे राज्य का सम्मान जीत लिया। उनकी वफादार प्रेम-कहानी, जो आज भी मणिपुर के सुंदर लाई हराओबा नृत्यों में दिखाई जाती है, इस क्षेत्र की सबसे प्रिय किंवदंतियों में से एक मानी जाती है।
यह कहानी सिखाती है कि सच्चा प्रेम सिर्फ शब्दों से नहीं, बल्कि साहस और स्थिर समर्पण से दिखाया जाता है।`,
    questions:[
     {q:'Khamba kaunse gaon/raj-ghar se tha?',hint:'Manipur ka ek purana raajya',answers:['moirang']},
     {q:'Khamba ne Thoibi ko paane ke liye kya kiya?',hint:'Mushkil pariksha, jaise ek khatarnaak shikaar',answers:['trials','hunt','shikaar','pariksha','buffalo']}
    ]
   },
   {
    id:'manipur-2',
    title:'The Dancing Deer of Keibul Lamjao',
    titleHi:'कैबुल लामजाओ का नाचने वाला हिरण',
    story:`On the floating marshland of Loktak Lake in Manipur lives the sangai, a gentle brow-antlered deer, and elders tell a story of how it earned its nickname, "the dancing deer".
It is said the sangai moves so carefully across the soft, floating grasslands of Keibul Lamjao that its steps look like a graceful dance, learned, some say, by watching the swaying Manipuri dancers by the lake generations ago.
Hunters who once saw it paused instead of hunting, moved by its beauty, and word spread that harming the sangai brought bad fortune. Over time, the whole community took to protecting it instead.
Today the sangai is Manipur's pride and a lesson in how beauty and respect can protect even the rarest and gentlest of creatures.`,
    storyHi:`मणिपुर की लोकटक झील की तैरती दलदली ज़मीन पर संगाई रहता है, एक कोमल भौंह-सींग वाला हिरण, और बुज़ुर्ग बताते हैं कि उसे "नाचने वाला हिरण" उपनाम कैसे मिला।
कहा जाता है कि संगाई कैबुल लामजाओ की नरम, तैरती हुई घास ज़मीन पर इतनी सावधानी से चलता है कि उसके कदम एक सुंदर नृत्य जैसे लगते हैं — कुछ कहते हैं कि उसने यह पीढ़ियों पहले झील किनारे झूमते मणिपुरी नर्तकों को देखकर सीखा।
जिन शिकारियों ने कभी उसे देखा, वे उसकी सुंदरता से प्रभावित होकर शिकार करने के बजाय रुक गए, और यह बात फैल गई कि संगाई को नुकसान पहुँचाना दुर्भाग्य लाता है। समय के साथ, पूरा समुदाय उसकी रक्षा करने लगा।
आज संगाई मणिपुर का गर्व है, और यह सबक देता है कि सुंदरता और सम्मान दुर्लभतम और सबसे कोमल प्राणियों की भी रक्षा कर सकते हैं।`,
    questions:[
     {q:'Sangai kya hai?',hint:'Ek tarah ka hiran (deer)',answers:['deer','hiran','sangai']},
     {q:'Sangai ko "dancing deer" kyu kaha jaata hai?',hint:'Uske chalne ka tareeka',answers:['dances','graceful steps','naachta hai','style of walking']}
    ]
   },
   {
    id:'manipur-3',
    title:'The Potter Who Shaped the Village',
    titleHi:'कुम्हारन जिसने गाँव को गढ़ा',
    story:`In a quiet Manipuri village, storytellers speak of an elderly potter woman whose clay pots were said to always keep water cool and sweet, no matter how hot the summer.
Neighbours began asking her the secret, and she would simply say she added a little patience with each pot, shaping it slowly instead of rushing. Young apprentices who tried to copy her speed without her patience found their pots cracked easily.
Over years, she trained many young hands in the village, and Manipuri pottery from that area became known for its quality — not because of a hidden trick, but because of the unhurried care she insisted on.
The story is told to remind children that skills built slowly, with patience, often last the longest.`,
    storyHi:`मणिपुर के एक शांत गाँव में, कहानीकार एक बुज़ुर्ग कुम्हारन की बात करते हैं, जिसके मिट्टी के घड़ों में पानी चाहे गर्मी कितनी भी हो, हमेशा ठंडा और मीठा रहता था।
पड़ोसी उससे यह राज़ पूछने लगे, और वह बस इतना कहती कि हर घड़े में वह थोड़ा धैर्य मिलाती है, जल्दबाज़ी करने के बजाय उसे धीरे-धीरे गढ़ती है। जो नए सीखने वाले उसकी गति की नकल करते पर उसका धैर्य नहीं अपनाते, उनके घड़े आसानी से टूट जाते।
सालों में उसने गाँव के कई युवाओं को सिखाया, और उस इलाके के मणिपुरी मिट्टी के बर्तन अपनी गुणवत्ता के लिए जाने जाने लगे — किसी छुपे हुए राज़ की वजह से नहीं, बल्कि उस बिना जल्दबाज़ी वाली देखभाल की वजह से जिस पर वह ज़ोर देती थी।
यह कहानी बच्चों को याद दिलाने के लिए सुनाई जाती है कि धैर्य से, धीरे-धीरे बनाए गए हुनर अक्सर सबसे लंबे समय तक टिकते हैं।`,
    questions:[
     {q:'Potter ke matke (pots) ka pani kaisa rehta tha?',hint:'Garmi me bhi kaisa',answers:['cool','sweet','thanda']},
     {q:'Potter ke anusaar uska "secret" kya tha?',hint:'Jaldi na karke kya rakhna',answers:['patience','dheeraj','sabr']}
    ]
   },
   {
    id:'manipur-4',
    title:'The Boat Race on Loktak Lake',
    titleHi:'लोकटक झील की नाव दौड़',
    story:`Every year, communities near Loktak Lake in Manipur gather for boat races, and an old story is told about how the very first race began — not as a competition, but as a rescue.
Long ago, a sudden storm is said to have trapped several fishing boats far from shore. Villagers from nearby settlements paddled out swiftly together to guide the boats safely home, racing not against each other but against the darkening sky.
To remember that day of teamwork, the village decided to hold a friendly boat race each year, so the spirit of helping one another would never be forgotten, even as the race became a joyful, competitive event.
The story reminds everyone watching the boats glide across Loktak Lake today that the tradition began with people helping each other reach safety.`,
    storyHi:`हर साल मणिपुर की लोकटक झील के पास के समुदाय नाव दौड़ के लिए इकट्ठा होते हैं, और एक पुरानी कहानी बताती है कि सबसे पहली दौड़ कैसे शुरू हुई थी — प्रतियोगिता के रूप में नहीं, बल्कि एक बचाव अभियान के रूप में।
बहुत पहले, कहा जाता है कि एक अचानक आए तूफान ने कई मछली पकड़ने वाली नावों को किनारे से दूर फँसा दिया था। पास की बस्तियों के गाँव वाले जल्दी से मिलकर नावों को सुरक्षित घर तक पहुँचाने के लिए निकल पड़े — एक-दूसरे से नहीं, बल्कि काले होते आसमान से दौड़ लगाते हुए।
उस टीमवर्क के दिन को याद रखने के लिए, गाँव ने हर साल एक मित्रतापूर्ण नाव दौड़ रखने का फैसला किया, ताकि एक-दूसरे की मदद करने की वह भावना कभी भुलाई न जाए, भले ही यह दौड़ अब एक खुशी भरा प्रतियोगी आयोजन बन गई हो।
यह कहानी आज लोकटक झील पर नावों को सरकते देखने वाले हर किसी को याद दिलाती है कि यह परंपरा लोगों के एक-दूसरे को सुरक्षित पहुँचाने में मदद करने से शुरू हुई थी।`,
    questions:[
     {q:'Sabse pehli boat race kis wajah se shuru hui?',hint:'Ek toofan me kisi ki madad ke liye',answers:['rescue','storm','madad','toofan']},
     {q:'Yeh race kis jheel (lake) par hoti hai?',hint:'Manipur ki mashhoor jheel',answers:['loktak']}
    ]
   },
   {
    id:'manipur-5',
    title:'The Lake That Kept a Secret',
    titleHi:'जो झील एक राज़ रखती थी',
    story:`On Loktak Lake in Manipur, fishermen live on floating islands of reeds and soil called phumdis, which drift gently with the water.
Legend tells of a fisherman's daughter who once lost her way rowing home in thick evening mist, until she noticed the phumdis themselves seemed to lean and settle in the direction of her village, as if guiding her.
She followed their quiet drift and reached home safely, and ever since, elders have called the floating islands the lake's gentle secret-keepers, who know every family and every path home.
The tale is shared to remind people that even a place that looks ever-changing, like the floating islands, can still hold something steady and caring underneath.`,
    storyHi:`मणिपुर की लोकटक झील पर मछुआरे फुमदी नाम के तैरते हुए द्वीपों पर रहते हैं, जो सरकंडे और मिट्टी से बने होते हैं और पानी के साथ धीरे-धीरे बहते हैं।
कहा जाता है कि एक मछुआरे की बेटी एक शाम घने कोहरे में नाव खेते हुए रास्ता भूल गई, तभी उसने देखा कि फुमदी खुद ही उसके गाँव की दिशा में झुककर टिक रहे हैं, जैसे उसे राह दिखा रहे हों।
उसने उनके धीमे बहाव का पीछा किया और सुरक्षित घर पहुँच गई, तभी से बुज़ुर्ग इन तैरते द्वीपों को झील के कोमल राज़दार कहते हैं, जो हर परिवार और हर घर का रास्ता जानते हैं।
यह कहानी यह याद दिलाने के लिए सुनाई जाती है कि जो जगह हमेशा बदलती दिखे, जैसे तैरते द्वीप, उसके भीतर भी कुछ स्थिर और देखभाल करने वाला हो सकता है।`,
    questions:[
     {q:'Loktak Lake par tairte hue islands ko kya kehte hain?',hint:'Sarkande aur mitti se bane',answers:['phumdis','phumdi']},
     {q:'Ladki ko ghar ka raasta kisne dikhaya?',hint:'Paani par tairti cheezein',answers:['phumdis','floating islands']}
    ]
   }
  ]
 },
 {
  id:'meghalaya',
  state:'Meghalaya',
  icon:'🌉',
  iconLabel:'Living root bridges',
  stories:[
   {
    id:'meghalaya-1',
    title:'The Sixteen Huts of Heaven',
    titleHi:'स्वर्ग की सोलह झोपड़ियाँ',
    story:`The Khasi people of Meghalaya tell of a time long ago when heaven and earth were joined by a great tree, and sixteen families — known as the Sixteen Huts — lived together near God, called U Blei.
One day, seven of the sixteen families came down to earth to live and farm, while the other nine stayed above. It is said the golden ladder connecting the two worlds was later cut because of the greed and quarrels of men on earth, so the nine families could not come down again.
The seven families who remained on earth became the ancestors of the Khasi clans, and they still call themselves the "Seven Huts", carrying the memory of their heavenly family above.
This story reminds the Khasi people to live with honesty and without greed, since it was human wrongdoing that once cut the path to heaven.`,
    storyHi:`मेघालय के खासी लोग एक बहुत पुराने समय की बात बताते हैं, जब स्वर्ग और धरती एक विशाल पेड़ से जुड़े हुए थे, और सोलह परिवार — जिन्हें "सोलह झोपड़ियाँ" कहा जाता था — भगवान 'यू ब्लेई' के पास साथ रहते थे।
एक दिन, सोलह में से सात परिवार धरती पर रहने और खेती करने के लिए नीचे आए, जबकि बाकी नौ ऊपर ही रह गए। कहा जाता है कि दोनों दुनियाओं को जोड़ने वाली सुनहरी सीढ़ी बाद में धरती के लोगों के लालच और झगड़ों के कारण काट दी गई, इसलिए वे नौ परिवार फिर कभी नीचे नहीं आ सके।
धरती पर रह गए सात परिवार खासी कुलों के पूर्वज बने, और वे आज भी खुद को "सात झोपड़ियाँ" कहते हैं, ऊपर अपने स्वर्गीय परिवार की याद अपने साथ लिए हुए।
यह कहानी खासी लोगों को ईमानदारी से और बिना लालच के जीने की याद दिलाती है, क्योंकि यह इंसानों की गलती ही थी जिसने कभी स्वर्ग का रास्ता काट दिया था।`,
    questions:[
     {q:'Shuru me kitne parivaar (huts) the?',hint:'Ek sankhya, solah',answers:['sixteen','16','solah']},
     {q:'Dharti aur aasman ko kya jodta tha?',hint:'Ek bada ped ya sidhi',answers:['tree','ladder','ped','sidhi']}
    ]
   },
   {
    id:'meghalaya-2',
    title:'The Bridge That Grew',
    titleHi:'वह पुल जो उगा',
    story:`In the deep valleys of Meghalaya, the Khasi and Jaintia people are known for growing living bridges by gently guiding the roots of rubber trees across rivers, a craft elders say began generations ago when a village needed to cross a river that often flooded away wooden bridges.
An elder is remembered for noticing that tree roots naturally reached toward water, and thought: why fight the river with wood that breaks, when roots can be guided to grow stronger every year instead?
It took many years of patient guiding, weaving, and waiting before the first living root bridge could hold a person's weight, but once grown, it only became stronger with time, unlike any wooden bridge.
The story is shared to teach that some of the best solutions are not the fastest — they are the ones we grow with patience, letting nature do part of the work.`,
    storyHi:`मेघालय की गहरी घाटियों में, खासी और जयंतिया लोग रबर के पेड़ों की जड़ों को धीरे-धीरे नदियों के आर-पार दिशा देकर जीवित पुल उगाने के लिए जाने जाते हैं — बुज़ुर्ग कहते हैं कि यह हुनर पीढ़ियों पहले शुरू हुआ, जब एक गाँव को ऐसी नदी पार करनी थी जो अक्सर लकड़ी के पुल बहा ले जाती थी।
एक बुज़ुर्ग को इस बात के लिए याद किया जाता है कि उसने देखा कि पेड़ों की जड़ें स्वाभाविक रूप से पानी की ओर बढ़ती हैं, और सोचा — जो लकड़ी टूट जाती है उससे नदी से लड़ने के बजाय, क्यों न जड़ों को हर साल और मज़बूत होकर बढ़ने के लिए दिशा दी जाए?
पहला जीवित जड़ों वाला पुल किसी इंसान का वज़न सहने लायक बनने में कई साल की धैर्यभरी देखभाल, बुनाई और इंतज़ार लगा, पर एक बार उगने के बाद यह किसी भी लकड़ी के पुल के उलट, समय के साथ और मज़बूत ही होता गया।
यह कहानी यह सिखाने के लिए सुनाई जाती है कि सबसे अच्छे हल हमेशा सबसे तेज़ नहीं होते — वे वही होते हैं जिन्हें हम धैर्य से उगाते हैं, प्रकृति को अपना हिस्सा काम करने देते हुए।`,
    questions:[
     {q:'Living root bridge kis cheez se banta hai?',hint:'Ped ki koi cheez, zameen ke neeche',answers:['roots','jadein','tree roots']},
     {q:'Purane wooden bridge me kya problem thi?',hint:'Baadh (flood) me kya hota tha',answers:['broke','washed away','toot jaate the','flood']}
    ]
   },
   {
    id:'meghalaya-3',
    title:'The Wettest Village\'s Secret',
    titleHi:'सबसे गीले गाँव का राज़',
    story:`Mawsynram and Cherrapunji in Meghalaya are known as among the wettest places on earth, and local storytellers say the rain there was once a shy cloud spirit who loved the green hills so much that it never wanted to leave.
Villagers say the cloud spirit would rest gently over the hills each day, and whenever it felt especially happy watching the children play, it would let its tears of joy fall as rain — which is why the rain there feels so frequent and so alive.
Rather than seeing the endless rain as a hardship, generations learned to build with bamboo and broad knup umbrellas, working comfortably even in downpours, turning a challenge into an everyday rhythm of life.
The story teaches children in Meghalaya to find comfort and even joy in the weather they are given, rather than wishing for different skies.`,
    storyHi:`मेघालय के मौसिनराम और चेरापूंजी धरती की सबसे ज़्यादा बारिश वाली जगहों में गिने जाते हैं, और स्थानीय कहानीकार कहते हैं कि वहाँ की बारिश कभी एक शर्मीली बादल-आत्मा थी, जिसे हरी पहाड़ियाँ इतनी पसंद थीं कि वह कभी जाना नहीं चाहती थी।
गाँव वाले कहते हैं कि वह बादल-आत्मा हर दिन धीरे से पहाड़ियों पर टिकी रहती, और जब भी बच्चों को खेलते देखकर उसे खास खुशी महसूस होती, वह अपने खुशी के आँसू बारिश के रूप में गिराती — इसीलिए वहाँ बारिश इतनी बार और इतनी जीवंत लगती है।
लगातार बारिश को मुश्किल मानने के बजाय, पीढ़ियों ने बांस और चौड़ी 'नूप' छतरियों से निर्माण करना सीखा, मूसलाधार बारिश में भी आराम से काम करते हुए, एक चुनौती को रोज़मर्रा की ज़िंदगी की लय बना दिया।
यह कहानी मेघालय के बच्चों को सिखाती है कि जो मौसम मिला है उसमें आराम और यहाँ तक कि खुशी ढूँढी जाए, बजाय अलग आसमान की चाह करने के।`,
    questions:[
     {q:'Meghalaya ke gaon barish ke liye kis liye mashhoor hain?',hint:'Duniya ki sabse zyada barish wali jagah',answers:['wettest','sabse zyada barish','rain']},
     {q:'Zyada barish me kaam karne ke liye log kya banate the?',hint:'Ek khaas tarah ka chhata (umbrella)',answers:['knup','umbrella','chhata']}
    ]
   },
   {
    id:'meghalaya-4',
    title:'The Sacred Groves',
    titleHi:'पवित्र उपवन',
    story:`Across Meghalaya, certain forest patches called sacred groves are protected and never cut, and Khasi elders tell a story that these groves are the resting places of ancestor-spirits who still watch over their descendants' villages.
Long ago, it is said, a group of woodcutters ignored warnings and tried to cut trees in one such grove for firewood during a hard winter. That night, the story goes, they heard voices in the wind reminding them of their grandparents' teachings, and by morning they had changed their minds, choosing to gather fallen wood instead.
From then on, the village made a firm rule: sacred groves are left completely untouched, and this rule has kept patches of ancient forest alive for hundreds of years.
The story reminds people that some things are protected not by force, but by remembering and respecting those who came before us.`,
    storyHi:`मेघालय भर में, "पवित्र उपवन" कहे जाने वाले जंगल के कुछ टुकड़े सुरक्षित रखे जाते हैं और कभी नहीं काटे जाते, और खासी बुज़ुर्ग कहते हैं कि ये उपवन पूर्वजों की आत्माओं के विश्राम स्थल हैं, जो आज भी अपने वंशजों के गाँवों की रखवाली करते हैं।
बहुत पहले, कहा जाता है, कुछ लकड़हारों ने चेतावनियों को नज़रअंदाज़ करके एक कठोर सर्दी में जलावन के लिए ऐसे ही एक उपवन में पेड़ काटने की कोशिश की। कहानी कहती है कि उस रात उन्होंने हवा में आवाज़ें सुनीं जो उन्हें उनके दादा-दादी की सिखाई बातें याद दिला रही थीं, और सुबह तक उनका मन बदल गया — उन्होंने गिरी हुई लकड़ी इकट्ठा करना चुना।
तभी से गाँव ने एक पक्का नियम बनाया: पवित्र उपवनों को पूरी तरह अछूता छोड़ा जाए, और इस नियम ने सैकड़ों सालों से पुराने जंगल के टुकड़ों को जीवित रखा है।
यह कहानी याद दिलाती है कि कुछ चीज़ें ताकत से नहीं, बल्कि हमसे पहले आए लोगों को याद रखने और उनका सम्मान करने से सुरक्षित रहती हैं।`,
    questions:[
     {q:'Sacred grove kya hoti hai?',hint:'Ek surakshit jangal ka tukda',answers:['protected forest','jangal','sacred forest']},
     {q:'Lakdi kaatne wale aakhir me kya karne lage?',hint:'Girri hui lakdi ka istemal',answers:['fallen wood','gira hua lakdi','collect fallen wood']}
    ]
   },
   {
    id:'meghalaya-5',
    title:'The Village Above the Clouds',
    titleHi:'बादलों के ऊपर का गाँव',
    story:`In the hills of Meghalaya, near one of the wettest places on earth, there is a small village that elders say once lived so high that clouds would settle right at their doorsteps each morning.
Children there were taught to walk carefully and speak softly near the cliff edge, not from fear, but from respect for the mist that fed their fields and filled their wells with clean water all year round.
One year a terrible dry spell struck villages lower down the hill, and the cloud village shared its stored rainwater freely with every neighbour who asked, refusing nothing.
People still say that generosity, like rain, always finds its way back to those who give it freely.`,
    storyHi:`मेघालय की पहाड़ियों में, धरती की सबसे बरसाती जगहों में से एक के पास, बुज़ुर्ग बताते हैं कि एक छोटा-सा गाँव इतनी ऊँचाई पर बसा था कि हर सुबह बादल उनके दरवाज़ों तक आ जाते थे।
वहाँ के बच्चों को चट्टान के किनारे धीरे चलना और धीमे बोलना सिखाया जाता था, डर से नहीं बल्कि उस कोहरे के सम्मान में, जो उनके खेतों को सींचता और कुओं को पूरे साल साफ़ पानी से भरता था।
एक साल नीचे के गाँवों में भयंकर सूखा पड़ा, तो बादलों वाले गाँव ने अपना जमा किया हुआ बारिश का पानी बिना किसी को मना किए, हर माँगने वाले पड़ोसी के साथ बाँट दिया।
लोग आज भी कहते हैं कि उदारता, बारिश की तरह, हमेशा उन्हीं के पास लौट आती है जो इसे खुलकर बाँटते हैं।`,
    questions:[
     {q:'Gaanv kis cheez ke liye jaana jaata tha?',hint:'Mausam se juda, bahut zyada paani girta tha',answers:['rain','baarish','wettest place','clouds']},
     {q:'Sookhe (dry spell) ke waqt gaanv walon ne kya kiya?',hint:'Paani se judi baat',answers:['shared water','paani baanta','shared rainwater']}
    ]
   }
  ]
 },
 {
  id:'mizoram',
  state:'Mizoram',
  icon:'🎋',
  iconLabel:'Bamboo dance, Cheraw',
  stories:[
   {
    id:'mizoram-1',
    title:'The Clever Fool, Chhura',
    titleHi:'चतुर मूर्ख, छुरा',
    story:`In Mizoram, almost everyone grows up hearing stories of Chhura — a simple villager who is sometimes silly and sometimes surprisingly clever, always making people laugh.
In one well-loved tale, Chhura was asked to guard a pot of rice beer for a village feast. Afraid he might be blamed if any went missing, he tied a rope from the pot to his own toe so he would feel it if someone touched it. But he fell fast asleep, and when visitors came and drank from the pot anyway, poor Chhura woke to find it empty — and everyone laughed kindly at his strange plan.
Chhura stories are told at gatherings not to mock him, but because his silly mistakes and occasional clever tricks feel warmly familiar, like a foolish but lovable neighbour.
These tales remind listeners that laughing at small, honest mistakes is part of village life, and it is fine to smile at ourselves too.`,
    storyHi:`मिज़ोरम में लगभग हर कोई छुरा की कहानियाँ सुनते हुए बड़ा होता है — एक सीधा-सादा गाँव वाला, जो कभी बुद्धू लगता है तो कभी चौंकाने वाला चतुर, पर हमेशा लोगों को हँसाता है।
एक पसंदीदा कहानी में, छुरा को गाँव के भोज के लिए चावल की बीयर का एक बर्तन संभालने को कहा गया। यह डर कि कहीं कुछ कम हो गया तो उसे दोष मिलेगा, उसने बर्तन से एक रस्सी अपने पैर के अंगूठे से बाँध ली, ताकि किसी के छूते ही उसे महसूस हो जाए। पर वह गहरी नींद सो गया, और जब मेहमान आए और वैसे भी बर्तन से पी गए, तो बेचारा छुरा जागा तो बर्तन खाली मिला — और सब उसकी अजीब तरकीब पर प्यार से हँस पड़े।
छुरा की कहानियाँ मज़ाक उड़ाने के लिए नहीं, बल्कि इसलिए सुनाई जाती हैं क्योंकि उसकी छोटी-मोटी बेवकूफियाँ और कभी-कभी की चतुराई एक भोले पर प्यारे पड़ोसी जैसी अपनी-सी लगती हैं।
ये कहानियाँ सुनने वालों को याद दिलाती हैं कि छोटी, ईमानदार गलतियों पर हँसना गाँव की ज़िंदगी का हिस्सा है, और खुद पर मुस्कुराना भी ठीक है।`,
    questions:[
     {q:'Chhura ko kya guard karne ko kaha gaya tha?',hint:'Ek matka, jisme kuch peene ki cheez thi',answers:['rice beer','pot','matka','beer']},
     {q:'Chhura ne pot ki rakhwali ke liye kya tarkeeb lagayi?',hint:'Rassi ka istemal kiya, apne...',answers:['rope','toe','rassi','pair','ungli']}
    ]
   },
   {
    id:'mizoram-2',
    title:'The Dance of the Bamboo',
    titleHi:'बांस का नृत्य',
    story:`Mizoram's cheraw, or bamboo dance, is one of its most loved traditions, and elders tell a story of how it may have first begun as a way of keeping rhythm and courage during hard, uncertain times in the hills.
The tale describes dancers stepping quickly between clapping bamboo poles held by others, a dance requiring sharp focus and trust — if a dancer misjudged the rhythm even slightly, the poles would catch their ankle.
Villagers say the dance was practised so the whole community would learn to move together in harmony, trusting each other's timing completely, much like a family must trust and support one another.
Cheraw is now performed at festivals across Mizoram, still carrying that same lesson of focus, trust, and moving well together.`,
    storyHi:`मिज़ोरम का चेरॉ, यानी बांस नृत्य, इसकी सबसे प्रिय परंपराओं में से एक है, और बुज़ुर्ग बताते हैं कि शायद यह पहाड़ों के कठिन, अनिश्चित समय में लय और साहस बनाए रखने के तरीके के रूप में शुरू हुआ था।
इस कहानी में नर्तकों का वर्णन है, जो दूसरों द्वारा पकड़े गए टकराते बांस के डंडों के बीच तेज़ी से कदम रखते हैं — एक ऐसा नृत्य जिसमें गहरी एकाग्रता और भरोसे की ज़रूरत होती है — अगर नर्तक ज़रा भी लय गलत आँके, तो डंडे उसकी टखने में फँस सकते हैं।
गाँव वाले कहते हैं कि यह नृत्य इसलिए अभ्यास किया जाता था ताकि पूरा समुदाय साथ मिलकर, तालमेल में चलना सीखे, एक-दूसरे के समय पर पूरा भरोसा करते हुए — बिल्कुल वैसे ही जैसे एक परिवार को एक-दूसरे पर भरोसा और साथ देना चाहिए।
चेरॉ आज भी मिज़ोरम भर के त्योहारों में किया जाता है, और वही सबक साथ लेकर चलता है — एकाग्रता, भरोसा, और साथ मिलकर अच्छे से आगे बढ़ना।`,
    questions:[
     {q:'Mizoram ke bamboo dance ko kya kehte hain?',hint:'Ek local naam, "ch..."',answers:['cheraw']},
     {q:'Is dance me dancer ko kis cheez par focus rakhna padta hai?',hint:'Bans ke stick ke saath',answers:['rhythm','timing','taal']}
    ]
   },
   {
    id:'mizoram-3',
    title:'The Hunter Who Learned Mercy',
    titleHi:'शिकारी जिसने दया सीखी',
    story:`An old Mizo tale tells of a skilled hunter who took great pride in never missing his target, until one day he came upon a mother deer protecting her injured fawn in the forest.
Something about her steady, unafraid gaze made him lower his bow. He chose that day to help the fawn instead, tending its leg until it could walk, and only then did he return home, empty-handed but strangely at peace.
Villagers say from then on he still hunted to feed his family, but always paused first to consider whether an animal truly needed to be taken, becoming known as the most thoughtful hunter of the hills.
The story is shared to teach that skill and strength mean more when guided by kindness, not less.`,
    storyHi:`एक पुरानी मिज़ो कहानी में एक कुशल शिकारी की बात है, जिसे इस बात पर बड़ा गर्व था कि उसका निशाना कभी नहीं चूकता — जब तक एक दिन जंगल में उसका सामना एक हिरणी से नहीं हुआ, जो अपने घायल बच्चे की रक्षा कर रही थी।
उसकी स्थिर, निडर नज़र में कुछ ऐसा था कि उसने अपना धनुष नीचे कर दिया। उस दिन उसने बच्चे की मदद करना चुना, उसके पैर की देखभाल की जब तक वह चलने लायक नहीं हो गया, और तभी वह घर लौटा — खाली हाथ, पर अजीब तरह से शांत मन से।
गाँव वाले कहते हैं कि तभी से वह अपने परिवार के लिए शिकार तो करता रहा, पर हमेशा पहले यह सोचने के लिए रुकता कि क्या उस जानवर को सच में मारना ज़रूरी है, और पहाड़ों का सबसे सोच-समझकर काम करने वाला शिकारी कहलाने लगा।
यह कहानी यह सिखाने के लिए सुनाई जाती है कि हुनर और ताकत का महत्व तब और बढ़ जाता है, जब उन्हें दया से जोड़ा जाए, कम नहीं होता।`,
    questions:[
     {q:'Hunter ne mother deer ko dekh kar kya kiya?',hint:'Bow neeche kar diya, madad ki',answers:['helped','lowered bow','madad ki','spared']},
     {q:'Fawn ke saath kya problem thi?',hint:'Uska paon',answers:['injured leg','ghayal tha','leg hurt']}
    ]
   },
   {
    id:'mizoram-4',
    title:'The Village That Shared Its Harvest',
    titleHi:'गाँव जिसने अपनी फसल बाँटी',
    story:`In the Mizo tradition of tlawmngaihna — a spirit of selfless helpfulness — a story is often told of a poor harvest year when one family had almost nothing left to eat, while a neighbouring family had a slightly better crop.
Rather than wait to be asked, the neighbouring family quietly left a portion of their own rice at the struggling family's door each week, never mentioning it, simply because it was the right thing to do in hard times.
Only much later did the families realise what had happened, and instead of feeling embarrassed, both families grew closer, and the whole village began practising the same quiet generosity toward whoever needed it most each season.
This story is often told to Mizo children as the true meaning of tlawmngaihna — helping others without needing thanks or attention.`,
    storyHi:`मिज़ो परंपरा 'त्लॉम्ङाइह्ना' — यानी निस्वार्थ मदद की भावना — में अक्सर एक कहानी सुनाई जाती है, जब एक खराब फसल के साल में एक परिवार के पास खाने को लगभग कुछ नहीं बचा था, जबकि पड़ोसी परिवार की फसल थोड़ी बेहतर हुई थी।
माँगे जाने का इंतज़ार करने के बजाय, पड़ोसी परिवार हर हफ्ते चुपचाप अपने चावल का एक हिस्सा उस मुश्किल में पड़े परिवार के दरवाज़े पर रख आता, कभी इसका ज़िक्र नहीं करता, बस इसलिए क्योंकि कठिन समय में यही सही काम था।
बहुत बाद में ही परिवारों को पता चला कि हुआ क्या था, और शर्मिंदा होने के बजाय, दोनों परिवार और करीब आ गए, और पूरा गाँव हर मौसम में जिसे भी सबसे ज़्यादा ज़रूरत होती, उसके प्रति वही चुपचाप उदारता निभाने लगा।
यह कहानी अक्सर मिज़ो बच्चों को 'त्लॉम्ङाइह्ना' के सच्चे अर्थ के रूप में सुनाई जाती है — दूसरों की मदद करना, बिना धन्यवाद या ध्यान चाहे।`,
    questions:[
     {q:'Yeh helpfulness ki spirit Mizo culture me kya kehlaati hai?',hint:'Ek Mizo shabd',answers:['tlawmngaihna']},
     {q:'Neighbour family ne kya kiya bina bataye?',hint:'Chawal (rice) chhod dete the darwaze par',answers:['left rice','chawal diya','shared food']}
    ]
   },
   {
    id:'mizoram-5',
    title:'The Year the Bamboo Bloomed',
    titleHi:'जिस साल बांस खिला',
    story:`In the hills of Mizoram, elders remember a rare time called mautam, when the bamboo forests bloom together only once every many decades.
That year, a wise village headman named Lalrema noticed the unusual flowering early and, instead of ignoring it, called every family together to store extra grain, expecting that the flowering bamboo would draw more rats than usual to the fields.
His careful planning meant that when the rats did come in great numbers, his village had enough food saved to last through the difficult months, while it taught neighbouring villages a lesson they still remember.
The story is told to Mizo children as an example of watching nature closely and preparing early, rather than being caught by surprise.`,
    storyHi:`मिज़ोरम की पहाड़ियों में, बुज़ुर्गों को मौताम नाम का एक दुर्लभ समय याद है, जब बांस के जंगल साथ में सिर्फ हर कई दशकों में एक बार खिलते हैं।
उस साल, लालरेमा नाम के एक समझदार गाँव के मुखिया ने यह असामान्य फूल जल्दी देख लिया, और उसे नज़रअंदाज़ करने की बजाय हर परिवार को इकट्ठा करके अतिरिक्त अनाज जमा करने को कहा, यह जानते हुए कि खिलता बांस खेतों में सामान्य से ज़्यादा चूहे बुलाएगा।
उसकी सावधान योजना की वजह से जब चूहे बड़ी संख्या में आए, तो उसके गाँव के पास मुश्किल महीनों तक चलने लायक पर्याप्त अनाज बचा हुआ था, और यह पड़ोसी गाँवों को भी एक सबक सिखा गया जिसे वे आज भी याद रखते हैं।
यह कहानी मिज़ो बच्चों को सुनाई जाती है ताकि वे प्रकृति को ध्यान से देखें और पहले से तैयारी करें, अचानक हैरान होने की बजाय।`,
    questions:[
     {q:'Mautam kya hai?',hint:'Bans ke phool se juda',answers:['bamboo flowering','bans ka phool khilna','bamboo blooming']},
     {q:'Lalrema ne pehle se kya kiya taaki gaanv surakshit rahe?',hint:'Khaane se related',answers:['stored grain','anaaj jama kiya','saved food']}
    ]
   }
  ]
 },
 {
  id:'nagaland',
  state:'Nagaland',
  icon:'🪶',
  iconLabel:'Hornbill feather, Hornbill Festival',
  stories:[
   {
    id:'nagaland-1',
    title:'The Cave of Khezhakeno',
    titleHi:'खेझाकेनो की गुफा',
    story:`Many Naga tribes tell of Khezhakeno, a village said to be the ancient home from which their ancestors first spread out across the hills. Elders say that in the old days, a tiger, a spirit, and a man were once like brothers, born from the same place.
But the man grew clever with fire and tools, and slowly the tiger and the spirit felt he had grown too powerful to live beside them as equals. So they agreed to separate — the tiger to the deep forest, the spirit to the unseen world, and the man to build villages and farms.
From Khezhakeno, it is said, families walked in different directions over the hills, becoming the many Naga tribes we know today, each keeping a small memory of that first shared home.
The story reminds Naga elders to teach respect for the forest and its creatures, since long ago, they were once like family.`,
    storyHi:`कई नागा जनजातियाँ खेझाकेनो की कहानी सुनाती हैं — एक गाँव, जिसे उनके पूर्वजों का वह प्राचीन घर माना जाता है, जहाँ से वे पहली बार पहाड़ों में फैले थे। बुज़ुर्ग कहते हैं कि पुराने समय में एक बाघ, एक आत्मा और एक इंसान कभी भाइयों जैसे थे, एक ही जगह से जन्मे।
पर इंसान आग और औज़ारों के साथ चतुर होता गया, और धीरे-धीरे बाघ और आत्मा को लगने लगा कि वह उनके बराबर रहने के लिए बहुत शक्तिशाली हो गया है। इसलिए उन्होंने अलग होने का फैसला किया — बाघ घने जंगल में गया, आत्मा अनदेखी दुनिया में, और इंसान गाँव और खेत बसाने लगा।
कहा जाता है कि खेझाकेनो से परिवार पहाड़ों में अलग-अलग दिशाओं में चल पड़े, और आज हम जिन्हें कई नागा जनजातियाँ जानते हैं, वे बने — हर एक उस पहले साझा घर की एक छोटी सी याद संजोए हुए।
यह कहानी नागा बुज़ुर्गों को जंगल और उसके प्राणियों के प्रति सम्मान सिखाने की याद दिलाती है, क्योंकि बहुत पहले वे कभी परिवार जैसे थे।`,
    questions:[
     {q:'Kahani ke anusaar aadmi ke saath aur kaun do "bhai" the?',hint:'Ek jangal ka jaanwar aur ek ...',answers:['tiger','spirit','baagh','sher']},
     {q:'Naga qabeele (tribes) kahan se failte hue kahe jaate hain?',hint:'Ek purana gaon ka naam',answers:['khezhakeno']}
    ]
   },
   {
    id:'nagaland-2',
    title:'The Hornbill\'s Feather',
    titleHi:'धनेश पक्षी का पंख',
    story:`The great hornbill is deeply honoured across Naga tribes, and Nagaland's famous winter festival is even named after it. Elders tell a story of a young man who once found an injured hornbill in the forest and cared for it patiently until it could fly again.
Before flying off, the bird is said to have dropped one of its long feathers as a gift, and from that day, the young man's family was allowed to wear a hornbill feather in their headgear as a sign of honour and respect for nature.
Other families, seeing this, began treating the forest and its birds with the same gentle care, hoping for the same blessing, and hornbill feathers slowly became a treasured part of Naga ceremonial dress.
The story teaches that honour is not taken, but earned through kindness — even kindness shown to a single injured bird.`,
    storyHi:`विशाल धनेश पक्षी नागा जनजातियों में बहुत सम्मानित है, और नागालैंड का मशहूर सर्दियों का त्योहार भी उसी के नाम पर है। बुज़ुर्ग एक कहानी सुनाते हैं — एक युवक को जंगल में एक घायल धनेश पक्षी मिला, और उसने धैर्य से उसकी देखभाल की, जब तक वह फिर से उड़ने लायक नहीं हो गया।
उड़ने से पहले, कहा जाता है कि उस पक्षी ने उपहार के रूप में अपना एक लंबा पंख गिरा दिया, और उस दिन से उस युवक के परिवार को प्रकृति के प्रति सम्मान और आदर के प्रतीक के रूप में अपने सिर पर धनेश का पंख पहनने की अनुमति मिली।
दूसरे परिवारों ने यह देखकर जंगल और उसके पक्षियों के साथ उसी कोमल देखभाल का व्यवहार करना शुरू किया, वही आशीर्वाद पाने की उम्मीद में, और धीरे-धीरे धनेश के पंख नागा पारंपरिक पोशाक का एक प्रिय हिस्सा बन गए।
यह कहानी सिखाती है कि सम्मान छीना नहीं जाता, बल्कि दया से कमाया जाता है — यहाँ तक कि एक अकेले घायल पक्षी को दिखाई गई दया से भी।`,
    questions:[
     {q:'Kahani me kaunsa panchi (bird) ghayal milta hai?',hint:'Nagaland ke tyohaar ka naam bhi issi se hai',answers:['hornbill']},
     {q:'Bird ne udne se pehle kya diya?',hint:'Uske par se ek cheez',answers:['feather','par','pankh']}
    ]
   },
   {
    id:'nagaland-3',
    title:'The Morung\'s Lesson',
    titleHi:'मोरुंग की सीख',
    story:`In many Naga villages, young men once lived and learned together in a shared community house called the morung, and a well-remembered story tells of a boastful young man who joined, sure he already knew everything about hunting and farming.
The elders in the morung gave him small, humble tasks first — fetching water, mending tools — and only slowly, over seasons, taught him the deeper skills once he had shown patience and respect for the group's ways.
By the time he left the morung as a grown man, he had learned that true skill and wisdom come not from claiming to already know, but from listening carefully to those who came before.
The story is still shared to remind young people that respect for elders and patient learning shape true strength of character.`,
    storyHi:`कई नागा गाँवों में, युवा पुरुष कभी 'मोरुंग' नाम के एक साझा सामुदायिक घर में साथ रहते और सीखते थे, और एक अच्छी तरह याद रखी गई कहानी एक घमंडी युवक की है, जो यह मानते हुए शामिल हुआ कि उसे शिकार और खेती के बारे में पहले से सब कुछ पता है।
मोरुंग के बुज़ुर्गों ने उसे पहले छोटे, सामान्य काम दिए — पानी लाना, औज़ार ठीक करना — और धीरे-धीरे, मौसमों में, उसे गहरे हुनर तभी सिखाए जब उसने समूह के तरीकों के लिए धैर्य और सम्मान दिखाया।
जब तक वह एक वयस्क के रूप में मोरुंग छोड़कर गया, वह यह सीख चुका था कि सच्चा हुनर और समझदारी पहले से जानने का दावा करने से नहीं, बल्कि पहले आए लोगों को ध्यान से सुनने से आती है।
यह कहानी आज भी युवाओं को याद दिलाने के लिए सुनाई जाती है कि बुज़ुर्गों का सम्मान और धैर्य से सीखना ही असली चरित्र की ताकत गढ़ते हैं।`,
    questions:[
     {q:'Morung kya tha?',hint:'Jahan naujawan saath rehte the aur seekhte the',answers:['community house','ghar','morung']},
     {q:'Naujawan ko shuru me kaunse kaam diye gaye?',hint:'Chhote kaam, jaise paani lana',answers:['small tasks','pani lana','fetching water','humble tasks']}
    ]
   },
   {
    id:'nagaland-4',
    title:'The Terraced Fields of the Hills',
    titleHi:'पहाड़ों के सीढ़ीदार खेत',
    story:`The Angami and other Naga communities are famed for their beautifully carved terrace fields on steep hillsides, and a story is told of a farmer generations ago who was frustrated that his sloped land kept washing away in the rains.
Watching water naturally settle into small pools on uneven ground, he had an idea: cutting the hillside into flat, step-like ledges so rain and soil would stay in place instead of rushing downhill.
His neighbours doubted the slow, careful work at first, but after seeing his rice grow thick and healthy for several seasons, whole villages adopted the method, carving the hills into the terraces still seen today.
The story reminds people that watching nature closely, and being willing to work patiently, can turn even a difficult hillside into fertile land.`,
    storyHi:`अंगामी और अन्य नागा समुदाय खड़ी पहाड़ियों पर बनाए गए सुंदर सीढ़ीदार खेतों के लिए मशहूर हैं, और पीढ़ियों पहले के एक किसान की कहानी कही जाती है, जो इस बात से परेशान था कि उसकी ढलान वाली ज़मीन बारिश में बार-बार बह जाती थी।
ऊबड़-खाबड़ ज़मीन पर पानी को स्वाभाविक रूप से छोटे-छोटे गड्ढों में जमा होते देखकर, उसे एक विचार आया — पहाड़ी को सपाट, सीढ़ी जैसे हिस्सों में काटना, ताकि बारिश और मिट्टी नीचे बहने के बजाय अपनी जगह पर टिकी रहें।
उसके पड़ोसियों को शुरू में इस धीमे, सावधानी भरे काम पर शक था, पर कई मौसमों तक उसका धान घना और स्वस्थ बढ़ता देखकर, पूरे गाँवों ने यह तरीका अपना लिया, पहाड़ों को उन्हीं सीढ़ीदार खेतों में तराशते हुए जो आज भी दिखते हैं।
यह कहानी याद दिलाती है कि प्रकृति को ध्यान से देखना और धैर्य से काम करने के लिए तैयार रहना, एक कठिन पहाड़ी को भी उपजाऊ ज़मीन में बदल सकता है।`,
    questions:[
     {q:'Farmer ne pahaad ko kis tarah kaata?',hint:'Seedhi jaisi flat cheezein banayi',answers:['terraces','steps','sidhiyan']},
     {q:'Terrace banane ki idea use kahan se aayi?',hint:'Pani ka behna dekh kar',answers:['watching water','pani dekh kar','rain pools']}
    ]
   },
   {
    id:'nagaland-5',
    title:"The Hornbill's Promise",
    titleHi:'धनेश पक्षी का वादा',
    story:`In Nagaland, the great hornbill is treated with deep respect, and elders tell of a young hunter named Vilie who once found an injured hornbill fallen from its nest.
Instead of taking it home, Vilie fed it gently for many days until its wing healed, then let it fly back to the forest, expecting nothing in return.
Years later, during the Hornbill Festival, villagers say a hornbill would circle low over Vilie's house each year before the celebrations began, as if keeping a quiet promise between them.
Elders still tell this story to remind children that kindness shown to any creature, without expecting anything back, is never truly forgotten.`,
    storyHi:`नागालैंड में विशाल धनेश (हॉर्नबिल) पक्षी को गहरे सम्मान से देखा जाता है, और बुज़ुर्ग बताते हैं कि विली नाम के एक युवा शिकारी को एक बार घोंसले से गिरा हुआ घायल धनेश मिला था।
उसे घर ले जाने की बजाय, विली ने कई दिनों तक उसे धीरे-धीरे खिलाया जब तक उसका पंख ठीक नहीं हो गया, फिर उसे बिना कुछ बदले में चाहे जंगल में वापस उड़ने दिया।
सालों बाद, हॉर्नबिल फेस्टिवल के दौरान, गाँव वाले कहते हैं कि हर साल उत्सव शुरू होने से पहले एक धनेश विली के घर के ऊपर नीचे उड़कर चक्कर लगाता था, जैसे वे दोनों एक चुपचाप वादा निभा रहे हों।
बुज़ुर्ग आज भी यह कहानी सुनाते हैं ताकि बच्चों को याद रहे कि बिना कुछ बदले की उम्मीद के किसी भी जीव पर दिखाई दयालुता कभी सच में भुलाई नहीं जाती।`,
    questions:[
     {q:'Vilie ne ghayal panchi ki madad kaise ki?',hint:'Khana khilakar',answers:['fed it','khilaya','took care of it']},
     {q:'Har saal Hornbill Festival se pehle kya hota tha?',hint:'Panchi ka udna',answers:['hornbill circled','panchi chakkar lagata tha','bird flew over']}
    ]
   }
  ]
 },
 {
  id:'tripura',
  state:'Tripura',
  icon:'🛕',
  iconLabel:'Chaturdasha Devata temple',
  stories:[
   {
    id:'tripura-1',
    title:'The Fourteen Gods of Tripura',
    titleHi:'त्रिपुरा के चौदह देवता',
    story:`In Tripura, old legends speak of the Chaturdasha Devata — the Fourteen Gods — who are believed to protect the land and its people. The story tells of King Trilochan, who is said to have first received the blessing of these fourteen deities to guard his kingdom and its harvests.
Each year to this day, the Kharchi Puja festival is held to honour these fourteen gods, with music, offerings, and the whole community coming together in gratitude for a safe and fruitful year.
Elders explain that the number fourteen represents balance — protection for the sky, the land, the rivers, and the people together — reminding everyone that a kingdom stays safe only when nature and people are cared for as one family.
Children in Tripura grow up watching the Kharchi Puja and hearing this story, learning that gratitude and unity keep a community strong.`,
    storyHi:`त्रिपुरा में पुरानी किंवदंतियाँ चतुर्दश देवता — यानी चौदह देवताओं — की बात करती हैं, जिन्हें ज़मीन और उसके लोगों की रक्षा करने वाला माना जाता है। कहानी राजा त्रिलोचन की है, जिन्हें कहा जाता है कि सबसे पहले इन चौदह देवताओं का आशीर्वाद मिला था, अपने राज्य और उसकी फसलों की रक्षा के लिए।
आज भी हर साल इन चौदह देवताओं के सम्मान में खारची पूजा का त्योहार मनाया जाता है, संगीत, भेंट और पूरे समुदाय के साथ मिलकर एक सुरक्षित और फलदायी साल के लिए कृतज्ञता जताते हुए।
बुज़ुर्ग समझाते हैं कि संख्या चौदह संतुलन को दर्शाती है — आसमान, ज़मीन, नदियाँ और लोग सब की साथ रक्षा — यह याद दिलाते हुए कि राज्य तभी सुरक्षित रहता है जब प्रकृति और लोग एक परिवार की तरह देखभाल किए जाते हैं।
त्रिपुरा के बच्चे खारची पूजा देखते और यह कहानी सुनते हुए बड़े होते हैं, यह सीखते हुए कि कृतज्ञता और एकता समुदाय को मज़बूत रखते हैं।`,
    questions:[
     {q:'Tripura ke chaudah devताओं ko kya kaha jaata hai?',hint:'Chaturdasha ...',answers:['chaturdasha devata','fourteen gods','chaudah devta']},
     {q:'Inko yaad karke kaunsa tyohaar manaya jaata hai?',hint:'Ek famous puja ka naam',answers:['kharchi puja','kharchi']}
    ]
   },
   {
    id:'tripura-2',
    title:'The Royal Palace by the Lake',
    titleHi:'झील किनारे का राजमहल',
    story:`Tripura's Neermahal, a palace built in the middle of Rudrasagar Lake, has a story attached to it about a king who wanted a resting place that felt like it was floating between water and sky.
Elders say the king would often say that ruling wisely required a clear, calm mind, like still water, and so he chose to build his second home surrounded entirely by the lake, away from the noise of the court.
Boatmen who rowed royal guests across the lake to the palace were trained to move slowly and quietly, so that visitors would arrive already feeling peaceful, ready to think clearly before meeting the king.
The story is remembered as a lesson that surroundings can shape our state of mind, and that seeking calm is sometimes as important as seeking power.`,
    storyHi:`त्रिपुरा का नीरमहल, जो रुद्रसागर झील के बीचोंबीच बना एक महल है, उससे जुड़ी एक कहानी है — एक राजा की, जो ऐसी विश्राम जगह चाहता था जो पानी और आसमान के बीच तैरती हुई महसूस हो।
बुज़ुर्ग कहते हैं कि राजा अक्सर कहता था कि बुद्धिमानी से राज करने के लिए शांत, ठहरे हुए पानी जैसा साफ और स्थिर मन चाहिए, इसलिए उसने अपना दूसरा घर पूरी तरह झील से घिरा हुआ बनाना चुना, दरबार के शोर से दूर।
जो नाविक शाही मेहमानों को झील पार कराकर महल तक ले जाते थे, उन्हें धीरे और शांति से चलने की सीख दी जाती थी, ताकि मेहमान पहले से ही शांत महसूस करते हुए पहुँचें, राजा से मिलने से पहले स्पष्ट सोचने के लिए तैयार।
यह कहानी इस सीख के रूप में याद रखी जाती है कि हमारा परिवेश हमारे मन की स्थिति को आकार दे सकता है, और शांति की तलाश कभी-कभी ताकत की तलाश जितनी ही ज़रूरी होती है।`,
    questions:[
     {q:'Neermahal palace kahan banaya gaya tha?',hint:'Ek jheel ke beech',answers:['lake','jheel','rudrasagar']},
     {q:'Raja ke anusaar shaant dimaag kis cheez jaisa hota hai?',hint:'Pani ka roop, jab woh hilta nahi',answers:['still water','shaant pani','calm water']}
    ]
   },
   {
    id:'tripura-3',
    title:'The Bamboo Flute of the Hills',
    titleHi:'पहाड़ों की बांसुरी',
    story:`Among the tribal communities of Tripura, storytellers speak of a shepherd boy whose bamboo flute music was said to calm even the most restless cattle and bring migrating birds to rest nearby just to listen.
One year, a fierce storm scattered his family's herd across the hills. Instead of running after each animal separately, the boy simply climbed the highest point nearby and played his flute steadily, trusting the familiar tune to guide them home.
One by one, through the storm, the cattle found their way back toward the sound, and the whole herd was safely gathered by nightfall.
The story is told to remind people that a calm, familiar presence — like a steady tune — can guide others home even during confusing, difficult moments.`,
    storyHi:`त्रिपुरा के आदिवासी समुदायों में, कहानीकार एक चरवाहे लड़के की बात करते हैं, जिसकी बांसुरी का संगीत कहा जाता था कि सबसे बेचैन मवेशियों को भी शांत कर देता था, और प्रवासी पक्षी भी बस सुनने के लिए पास आकर बैठ जाते थे।
एक साल, एक तेज़ तूफान ने उसके परिवार के मवेशियों को पहाड़ों में बिखेर दिया। हर जानवर के पीछे अलग-अलग भागने के बजाय, लड़के ने बस पास की सबसे ऊँची जगह पर चढ़कर स्थिर रूप से अपनी बांसुरी बजाई, इस भरोसे पर कि जानी-पहचानी धुन उन्हें घर का रास्ता दिखाएगी।
तूफान के बीच, एक-एक करके मवेशी उस आवाज़ की ओर अपना रास्ता खोजते गए, और रात होते-होते पूरा झुंड सुरक्षित इकट्ठा हो गया।
यह कहानी याद दिलाने के लिए सुनाई जाती है कि एक शांत, जानी-पहचानी उपस्थिति — जैसे एक स्थिर धुन — भ्रम और कठिन पलों में भी दूसरों को घर का रास्ता दिखा सकती है।`,
    questions:[
     {q:'Shepherd ladka kya bajata tha?',hint:'Ek bans ka baja jane wala instrument',answers:['flute','bansuri']},
     {q:'Toofan me bhatke hue jaanwar kaise wapas aaye?',hint:'Awaaz sun kar',answers:['followed music','flute sun kar','sound']}
    ]
   },
   {
    id:'tripura-4',
    title:'The Weaver Queen\'s Pattern',
    titleHi:'बुनकर रानी का पैटर्न',
    story:`A cherished Tripuri legend tells of a queen who was also a skilled weaver, known for creating the rignai and risa cloth patterns still worn in Tripura today, each pattern said to carry a small story of its own.
It is said she wove a special pattern of interlocking lines to represent unity among her people's different communities, believing that just as threads must cross and support each other to make strong cloth, so must people support one another to make a strong kingdom.
She taught this pattern to weavers across villages, encouraging each region to add its own small variation, so the cloth of Tripura became a beautiful, ever-growing record of its many communities living together.
The story reminds people that unity does not mean everyone is the same — it means different threads working well together.`,
    storyHi:`त्रिपुरा की एक प्रिय किंवदंती एक ऐसी रानी की बात करती है, जो साथ ही एक कुशल बुनकर भी थी, जो रिग्नाई और रिसा नाम के कपड़ों के पैटर्न बनाने के लिए जानी जाती थी, जो आज भी त्रिपुरा में पहने जाते हैं — कहते हैं हर पैटर्न अपनी एक छोटी कहानी साथ रखता है।
कहा जाता है कि उसने आपस में गुँथी हुई रेखाओं का एक खास पैटर्न बुना, जो उसके लोगों के अलग-अलग समुदायों के बीच एकता को दर्शाता था — यह मानते हुए कि जैसे धागों को मज़बूत कपड़ा बनाने के लिए आपस में मिलना और एक-दूसरे को सहारा देना ज़रूरी है, वैसे ही एक मज़बूत राज्य बनाने के लिए लोगों को एक-दूसरे का साथ देना ज़रूरी है।
उसने यह पैटर्न गाँव-गाँव की बुनकरों को सिखाया, हर इलाके को अपना छोटा-सा बदलाव जोड़ने के लिए प्रोत्साहित करते हुए, ताकि त्रिपुरा का कपड़ा उसके कई समुदायों के साथ रहने का एक सुंदर, हमेशा बढ़ता हुआ दस्तावेज़ बन जाए।
यह कहानी याद दिलाती है कि एकता का मतलब यह नहीं कि सब एक जैसे हों — इसका मतलब है अलग-अलग धागों का साथ मिलकर अच्छे से काम करना।`,
    questions:[
     {q:'Rani kis kaam me mahir (skilled) thi?',hint:'Kapda banane ka kaam',answers:['weaving','bunai','weaver']},
     {q:'Uska khaas pattern kis cheez ko darshata tha?',hint:'Log ek saath rehte hain',answers:['unity','ekta','togetherness']}
    ]
   },
   {
    id:'tripura-5',
    title:'The Palace on the Lake',
    titleHi:'झील पर बना महल',
    story:`In Tripura, on the still waters of Rudrasagar Lake, stands a beautiful palace that elders say was built by a king who loved the water more than any grand hall on land.
Story tells that the king would row out each evening to watch the sunset colours spread across the lake, and he asked his builders to design a palace so that every room could catch a glimpse of that same golden light.
Even now, on clear evenings, people say the reflection of the palace on the water seems to glow a little longer than the sky itself, as if remembering the king who loved it so.
The tale reminds listeners that beauty built with real love for a place often outlasts even the builder who made it.`,
    storyHi:`त्रिपुरा में, रुद्रसागर झील के शांत पानी पर एक सुंदर महल खड़ा है, जिसके बारे में बुज़ुर्ग कहते हैं कि इसे एक ऐसे राजा ने बनवाया था जिसे ज़मीन के किसी भी बड़े हॉल से ज़्यादा पानी से प्यार था।
कहानी बताती है कि राजा हर शाम नाव खेकर सूरज ढलते हुए रंग झील पर फैलते देखने जाता था, और उसने अपने कारीगरों से कहा कि महल ऐसा बनाया जाए कि हर कमरे से वही सुनहरी रोशनी दिखे।
आज भी, साफ़ शामों में, लोग कहते हैं कि पानी पर महल का प्रतिबिंब आसमान से भी थोड़ा ज़्यादा देर तक चमकता रहता है, जैसे उस राजा को याद कर रहा हो जिसे इससे इतना प्यार था।
यह कहानी सुनने वालों को याद दिलाती है कि किसी जगह से सच्चे प्यार से बनाई गई सुंदरता अक्सर उसे बनाने वाले से भी ज़्यादा समय तक टिकती है।`,
    questions:[
     {q:'Palace kahan bana hua tha?',hint:'Paani ke beech',answers:['lake','jheel','Rudrasagar','on the lake']},
     {q:'Raja shaam ko kya dekhne jaata tha?',hint:'Aasmaan ka rang',answers:['sunset','suraj dubna','sunset colours']}
    ]
   }
  ]
 },
 {
  id:'sikkim',
  state:'Sikkim',
  icon:'❄️',
  iconLabel:'Snow peak of Kanchenjunga',
  stories:[
   {
    id:'sikkim-1',
    title:'The Sleeping Guardian, Kanchenjunga',
    titleHi:'सोया हुआ रक्षक, कंचनजंगा',
    story:`In Sikkim, the great snow peak of Kanchenjunga is not just a mountain — it is honoured as a sleeping guardian spirit who watches over the land and its people.
Legend says that deep within the mountain are hidden five treasures — salt, gold, sacred scriptures, weapons, and grain — kept safe for the day the land truly needs them. This is why the mountain's name is often understood as "the five treasures of the great snows".
The Lepcha people, among Sikkim's earliest communities, also tell how the sacred rivers Teesta and Rangeet were once two lively siblings who raced down from the mountain to reach the plains, shaping the valleys of Sikkim as they flowed.
Because the mountain is seen as a living guardian, climbers traditionally stop just short of Kanchenjunga's very top, out of respect — a small act of humility passed down through generations.`,
    storyHi:`सिक्किम में, कंचनजंगा की विशाल बर्फीली चोटी सिर्फ एक पहाड़ नहीं है — इसे एक सोए हुए रक्षक आत्मा के रूप में सम्मान दिया जाता है, जो ज़मीन और उसके लोगों की रखवाली करता है।
कहा जाता है कि पहाड़ के भीतर गहराई में पाँच खज़ाने छिपे हैं — नमक, सोना, पवित्र शास्त्र, हथियार और अनाज — उस दिन के लिए सुरक्षित रखे गए हैं जब ज़मीन को सचमुच उनकी ज़रूरत होगी। इसीलिए पहाड़ के नाम को अक्सर "महान बर्फों के पाँच खज़ाने" के रूप में समझा जाता है।
सिक्किम के सबसे पुराने समुदायों में से एक, लेप्चा लोग यह भी बताते हैं कि पवित्र नदियाँ तीस्ता और रंगीत कभी दो जीवंत भाई-बहन थीं, जो पहाड़ से दौड़ते हुए मैदानों तक पहुँचीं, बहते हुए सिक्किम की घाटियों को आकार देती हुईं।
क्योंकि पहाड़ को एक जीवित रक्षक माना जाता है, पर्वतारोही पारंपरिक रूप से कंचनजंगा की सबसे ऊँची चोटी से थोड़ा पहले ही रुक जाते हैं, सम्मान के तौर पर — पीढ़ियों से चली आ रही विनम्रता का एक छोटा सा कार्य।`,
    questions:[
     {q:'Kanchenjunga ke andar kitne khazane chhupe kahe jaate hain?',hint:'Ek sankhya, paanch',answers:['five','5','paanch']},
     {q:'Do nadiyon ka naam batao jo bhai-behen ki tarah kahi jaati hain',hint:'Sikkim ki do mashhoor nadiyaan',answers:['teesta','rangeet']}
    ]
   },
   {
    id:'sikkim-2',
    title:'The Monastery Bell',
    titleHi:'मठ की घंटी',
    story:`High in the Sikkim hills, an old monastery is said to have a bell that rings softly by itself just before a storm, giving villagers time to bring their animals and belongings to safety.
Monks say the bell was blessed generations ago by a travelling lama who wished to leave the village a quiet, ever-watchful protector, since he could not stay to guard them himself.
Villagers grew so trusting of the bell's warning that they would check on it each evening, much as one might check the sky, treating its silence as a sign of a calm night ahead.
The story is told to children as a gentle reminder that the care of someone who came before us — like that travelling lama — can continue protecting us long after they are gone.`,
    storyHi:`सिक्किम की ऊँची पहाड़ियों में, एक पुराने मठ के बारे में कहा जाता है कि वहाँ एक घंटी है, जो तूफान से ठीक पहले खुद-ब-खुद धीरे से बजने लगती है, गाँव वालों को अपने जानवरों और सामान को सुरक्षित जगह ले जाने का समय देते हुए।
भिक्षु कहते हैं कि इस घंटी को पीढ़ियों पहले एक यात्रा करने वाले लामा ने आशीर्वाद दिया था, जो गाँव को एक शांत, हमेशा चौकस रक्षक देना चाहता था, क्योंकि वह खुद वहाँ रुककर उनकी रखवाली नहीं कर सकता था।
गाँव वालों को घंटी की चेतावनी पर इतना भरोसा हो गया कि वे हर शाम उसे जाँचते, जैसे कोई आसमान देखता है, और उसकी खामोशी को आने वाली शांत रात का संकेत मानते।
यह कहानी बच्चों को यह धीरे से याद दिलाने के लिए सुनाई जाती है कि हमसे पहले आए किसी की देखभाल — जैसे वह यात्रा करने वाला लामा — उनके जाने के बहुत बाद तक भी हमारी रक्षा करती रह सकती है।`,
    questions:[
     {q:'Monastery ki ghanti (bell) kab akele bajti thi?',hint:'Mausam se related',answers:['before storm','toofan se pehle','storm']},
     {q:'Ghanti ko kisne blessing di thi?',hint:'Ek yatra karne wala dharmik vyakti',answers:['lama','monk','traveling lama']}
    ]
   },
   {
    id:'sikkim-3',
    title:'The Yak Herder\'s Patience',
    titleHi:'याक चराने वाले का धैर्य',
    story:`In the high pastures of Sikkim, a story is told of a yak herder known for never losing his temper, even when his herd wandered far during sudden mountain mists.
When asked how he stayed so calm, he explained that yaks, like mountain weather, cannot be rushed or forced — they must be gently guided, one slow step at a time, back toward the right path.
One winter, when a younger herder panicked at losing several yaks in fog, the old herder simply sat, lit a small fire, and waited calmly until the mist cleared enough to see the animals grazing peacefully nearby all along.
The story reminds people that patience, especially in difficult or uncertain moments, often achieves more than panic or force ever could.`,
    storyHi:`सिक्किम के ऊँचे चरागाहों में, एक याक चराने वाले की कहानी कही जाती है, जो कभी अपना आपा नहीं खोता था, चाहे अचानक पहाड़ी धुंध में उसका झुंड कितनी भी दूर क्यों न भटक जाए।
जब उससे पूछा गया कि वह इतना शांत कैसे रहता है, उसने समझाया कि याक, पहाड़ी मौसम की तरह, जल्दबाज़ी या ज़बरदस्ती से नहीं मानते — उन्हें धीरे-धीरे, एक-एक कदम, सही रास्ते की ओर कोमलता से ले जाना पड़ता है।
एक सर्दी में, जब एक युवा चरवाहा धुंध में कई याक खो जाने पर घबरा गया, तो बूढ़े चरवाहे ने बस बैठकर एक छोटी आग जलाई और शांति से तब तक इंतज़ार किया जब तक धुंध इतनी साफ नहीं हो गई कि जानवरों को पास में ही शांति से चरते हुए देखा जा सके — जो हमेशा वहीं थे।
यह कहानी याद दिलाती है कि धैर्य, खासकर कठिन या अनिश्चित पलों में, अक्सर घबराहट या ज़बरदस्ती से कहीं ज़्यादा हासिल कर लेता है।`,
    questions:[
     {q:'Purana herder kis jaanwar ko sambhalta tha?',hint:'Pahaadi jaanwar, bada aur balwan',answers:['yak']},
     {q:'Mist (kohra) me kho jaane par usne kya kiya?',hint:'Aag jalakar shaant baitha',answers:['waited calmly','shaant raha','fire jalakar wait kiya']}
    ]
   },
   {
    id:'sikkim-4',
    title:'The Rhododendron Valley',
    titleHi:'बुरांश के फूलों की घाटी',
    story:`Sikkim's hillsides bloom every spring with rhododendron flowers in many colours, and a local story tells of a young girl who once planted a single rhododendron seed at her grandmother's request, not knowing why.
Her grandmother told her that a flower planted with a wish for others, not for oneself, would bloom the brightest — so the girl wished for the whole valley to feel as warm and colourful as her grandmother's love.
Years later, as the story goes, that single plant had spread across the hillside into a whole valley of blooming rhododendrons, now one of Sikkim's most loved sights each spring.
The story is shared to remind children that small, caring acts — like planting one seed with good intention — can grow into something that brings joy to many.`,
    storyHi:`सिक्किम की पहाड़ियाँ हर वसंत में कई रंगों के बुरांश (रोडोडेंड्रॉन) के फूलों से खिल उठती हैं, और एक स्थानीय कहानी एक छोटी लड़की की बात करती है, जिसने अपनी दादी के कहने पर, बिना यह जाने कि क्यों, एक बुरांश का बीज बोया था।
उसकी दादी ने उसे बताया था कि जो फूल खुद के लिए नहीं, बल्कि दूसरों के लिए मंगलकामना के साथ बोया जाता है, वह सबसे चमकीला खिलता है — इसलिए लड़की ने यह कामना की कि पूरी घाटी उसकी दादी के प्यार जितनी गर्म और रंगीन महसूस करे।
कहानी के अनुसार, सालों बाद वह अकेला पौधा पहाड़ी पर फैलकर बुरांश की पूरी खिली हुई घाटी बन गया, जो आज हर वसंत में सिक्किम के सबसे प्रिय नज़ारों में से एक है।
यह कहानी बच्चों को याद दिलाने के लिए सुनाई जाती है कि छोटे, देखभाल भरे काम — जैसे अच्छी नीयत से एक बीज बोना — बढ़कर कुछ ऐसा बन सकते हैं जो कई लोगों को खुशी दे।`,
    questions:[
     {q:'Ladki ne kya lagaya tha apni dadi ke kehne par?',hint:'Ek phool ka beej',answers:['rhododendron seed','seed','beej']},
     {q:'Dadi ke anusaar phool kab sabse zyada khilta hai?',hint:'Kis niyat (intention) se lagane par',answers:['for others','doosron ke liye','wish for others']}
    ]
   },
   {
    id:'sikkim-5',
    title:'The Sleeping Guardian',
    titleHi:'सोता हुआ रक्षक',
    story:`In Sikkim, the towering peak of Kanchenjunga is spoken of as a sleeping guardian who watches over the valleys below and is never pointed at directly out of respect.
Elders tell of a young monk who once climbed partway up during a fierce storm to rescue a lost yak herder, guided only by a strange, steady glow he believed came from the mountain itself.
He found the herder sheltering behind a rock, exhausted but safe, and led him down before the worst of the storm arrived, later saying the mountain had simply shown him the way home.
Since then, villagers leave a small offering at the base of the mountain each year, thanking the sleeping guardian for watching over their valley.`,
    storyHi:`सिक्किम में, ऊँची कंचनजंगा चोटी को एक सोता हुआ रक्षक कहा जाता है जो नीचे की घाटियों की रखवाली करता है, और सम्मान में कभी सीधे उंगली दिखाकर उसकी ओर इशारा नहीं किया जाता।
बुज़ुर्ग बताते हैं कि एक युवा भिक्षु एक बार भयंकर तूफान के दौरान थोड़ी ऊँचाई तक चढ़ा, एक भटके हुए याक चराने वाले को बचाने के लिए, सिर्फ एक अजीब, स्थिर चमक के सहारे जिसे वह मानता था कि पहाड़ से ही आ रही है।
उसे चरवाहा एक चट्टान के पीछे छिपा मिला, थका हुआ पर सुरक्षित, और वह उसे तूफान के सबसे बुरे हिस्से से पहले नीचे ले आया, बाद में कहा कि पहाड़ ने बस उसे घर का रास्ता दिखा दिया था।
तभी से, गाँव वाले हर साल पहाड़ के आधार पर एक छोटी भेंट छोड़ते हैं, सोते हुए रक्षक का धन्यवाद करने के लिए जो उनकी घाटी की रखवाली करता है।`,
    questions:[
     {q:'Kanchenjunga ko kya kaha jaata hai?',hint:'Sone wala rakshak',answers:['sleeping guardian','guardian','rakshak']},
     {q:'Monk ne toofan mein kisko bachaya?',hint:'Janwar chalane wala',answers:['yak herder','gadariya','herder']}
    ]
   }
  ]
 }
];

// Flat list kept for any older code paths that still expect one story per
// state (id/state/title/story/questions) — points at each state's first story.
export const nerStories=nerStates.map(s=>({id:s.id,state:s.state,...s.stories[0]}));
