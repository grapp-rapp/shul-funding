// Editorial source for the JSON draft. NEVER automatically approves publication.
const fs = require('node:fs');
const drafts = [];
function add(id,en,he,ref,lines,aliases=[]) {
  drafts.push({id,en,he,aliases,reviewStatus:'DRAFT — RAV REVIEW REQUIRED',questions:lines.trim().split('\n').map(line=>{const [q,a,hq,ha]=line.split('|');return {en:{q,a},he:{q:hq,a:ha},ref};})});
}
add('bereshit','Bereshit','בראשית','Genesis 1–6',`
What did Hashem create on the first day?|Light.|מה ברא ה׳ ביום הראשון?|אור.
On which day were the sun and moon made?|The fourth day.|באיזה יום נבראו השמש והירח?|ביום הרביעי.
What were the first man and woman called?|Adam and Chavah.|מה שמות האיש והאישה הראשונים?|אדם וחוה.
Which day did Hashem bless and make holy?|The seventh day, Shabbos.|איזה יום בירך ה׳ וקידש?|היום השביעי, שבת.
What question did Hashem ask Adam after he hid?|“Where are you?”|מה שאל ה׳ את אדם לאחר שהתחבא?|״איכה?״ — היכן אתה?
`,['Bereishit']);
add('noach','Noach','נח','Genesis 6–11',`
What did Noach build?|A teivah, an ark.|מה בנה נח?|תיבה.
Who came into the ark with Noach?|His wife, his sons and their wives, and the animals.|מי נכנס לתיבה עם נח?|אשתו, בניו ונשותיהם, ובעלי החיים.
How many days and nights did the rain fall?|Forty days and forty nights.|כמה ימים ולילות ירד הגשם?|ארבעים יום וארבעים לילה.
What did the dove bring back in its beak?|An olive leaf.|מה הביאה היונה בפיה?|עלה זית.
What sign did Hashem give for His covenant after the flood?|A rainbow.|מה היה אות הברית שנתן ה׳ אחרי המבול?|הקשת בענן.
`);
add('lech-lecha','Lech-Lecha','לך לך','Genesis 12–17',`
Whom did Hashem tell to leave his homeland?|Avram.|למי אמר ה׳ לעזוב את ארצו?|לאברם.
What was Avram’s new name?|Avraham.|מה היה שמו החדש של אברם?|אברהם.
What was Sarai’s new name?|Sarah.|מה היה שמה החדש של שרי?|שרה.
Who was Avraham’s nephew?|Lot.|מי היה בן אחיו של אברהם?|לוט.
What did Hashem ask Avraham to count as a picture of his many descendants?|The stars.|מה ביקש ה׳ מאברהם לספור כדי להמחיש את ריבוי זרעו?|את הכוכבים.
`);
add('vayera','Vayera','וירא','Genesis 18–22',`
How many visitors did Avraham see near his tent?|Three.|כמה אורחים ראה אברהם ליד אוהלו?|שלושה.
What son was born to Avraham and Sarah?|Yitzchak.|איזה בן נולד לאברהם ולשרה?|יצחק.
For which city did Avraham plead with Hashem?|Sedom.|על איזו עיר התפלל אברהם לפני ה׳?|סדום.
Who called to Avraham to stop him from harming Yitzchak?|An angel of Hashem.|מי קרא לאברהם שלא לפגוע ביצחק?|מלאך ה׳.
What did Avraham offer instead of Yitzchak?|A ram caught by its horns in a thicket.|מה הקריב אברהם במקום יצחק?|איל שנאחז בקרניו בסבך.
`);
add('chayei-sara','Chayei Sara','חיי שרה','Genesis 23–25',`
Where did Avraham bury Sarah?|In the Cave of Machpelah.|היכן קבר אברהם את שרה?|במערת המכפלה.
From whom did Avraham buy the cave and field?|Ephron.|ממי קנה אברהם את המערה והשדה?|מעפרון.
Who became Yitzchak’s wife?|Rivkah.|מי נעשתה אשתו של יצחק?|רבקה.
Which animals did Rivkah offer to water?|The servant’s camels.|לאילו בעלי חיים הציעה רבקה לשאוב מים?|לגמלי העבד.
What did Rivkah answer when asked whether she would go with the servant?|“I will go.”|מה ענתה רבקה כשנשאלה אם תלך עם העבד?|״אלך״.
`,['Chayei Sarah']);
add('toldot','Toldot','תולדות','Genesis 25–28',`
Who were Yitzchak and Rivkah’s twin sons?|Esav and Yaakov.|מי היו בניהם התאומים של יצחק ורבקה?|עשו ויעקב.
Which twin was born first?|Esav.|איזה תאום נולד ראשון?|עשו.
What food did Yaakov cook when Esav came home hungry?|A lentil stew.|איזה תבשיל הכין יעקב כשעשו חזר רעב?|נזיד עדשים.
What did Esav sell to Yaakov?|His birthright.|מה מכר עשו ליעקב?|את הבכורה.
What did Yitzchak’s servants dig?|Wells.|מה חפרו עבדי יצחק?|בארות.
`,['Toldos']);
add('vayetzei','Vayetzei','ויצא','Genesis 28–32',`
What did Yaakov see in his dream?|A ladder reaching heaven, with angels going up and down.|מה ראה יעקב בחלומו?|סולם שראשו מגיע השמימה ומלאכים עולים ויורדים בו.
Whom did Yaakov meet at the well?|Rachel.|את מי פגש יעקב ליד הבאר?|את רחל.
Who was Rachel and Leah’s father?|Lavan.|מי היה אביהן של רחל ולאה?|לבן.
Who was Yaakov’s first son?|Reuven.|מי היה בנו הראשון של יעקב?|ראובן.
How many years did Yaakov first agree to work to marry Rachel?|Seven years.|כמה שנים הסכים יעקב לעבוד בתחילה כדי לשאת את רחל?|שבע שנים.
`);
add('vayishlach','Vayishlach','וישלח','Genesis 32–36',`
Which brother was Yaakov preparing to meet?|Esav.|איזה אח התכונן יעקב לפגוש?|את עשו.
What new name was given to Yaakov?|Yisrael.|איזה שם חדש ניתן ליעקב?|ישראל.
What did Yaakov send ahead to Esav?|Gifts of animals.|מה שלח יעקב לפניו לעשו?|מנחה של בעלי חיים.
What was the name of Rachel’s younger son?|Binyamin.|מה שמו של בנה הצעיר של רחל?|בנימין.
What did Yaakov do with his family and possessions when he feared an attack?|He divided them into two camps.|מה עשה יעקב במשפחתו וברכושו כשחשש מהתקפה?|חילק אותם לשני מחנות.
`);
add('vayeshev','Vayeshev','וישב','Genesis 37–40',`
What special garment did Yaakov give Yosef?|A kesones passim, a special tunic.|איזה בגד מיוחד נתן יעקב ליוסף?|כתונת פסים.
In Yosef’s first dream, what bowed to his sheaf?|His brothers’ sheaves.|בחלומו הראשון של יוסף, מה השתחווה לאלומתו?|אלומות אחיו.
To which country was Yosef taken?|Egypt.|לאיזו ארץ נלקח יוסף?|למצרים.
Who bought Yosef in Egypt?|Potiphar.|מי קנה את יוסף במצרים?|פוטיפר.
Whose dreams did Yosef explain in prison?|The chief cupbearer’s and the chief baker’s.|את חלומותיהם של מי פתר יוסף בבית הסוהר?|של שר המשקים ושר האופים.
`);
add('miketz','Miketz','מקץ','Genesis 41–44',`
Who dreamed about cows and ears of grain?|Pharaoh.|מי חלם על פרות ועל שיבולים?|פרעה.
Who explained Pharaoh’s dreams?|Yosef.|מי פתר את חלומות פרעה?|יוסף.
How many years of plenty came before the famine?|Seven years.|כמה שנות שובע היו לפני הרעב?|שבע שנים.
Why did Yosef’s brothers travel to Egypt?|To buy food during the famine.|מדוע ירדו אחי יוסף למצרים?|לקנות אוכל בזמן הרעב.
Which younger brother did Yosef tell them to bring?|Binyamin.|איזה אח צעיר ביקש יוסף שיביאו?|בנימין.
`);
add('vayigash','Vayigash','ויגש','Genesis 44–47',`
Which brother spoke up for Binyamin?|Yehudah.|איזה אח דיבר למען בנימין?|יהודה.
What did Yehudah offer to do instead of Binyamin?|Remain as Yosef’s servant.|מה הציע יהודה לעשות במקום בנימין?|להישאר עבד ליוסף.
What did Yosef tell his brothers about who he was?|“I am Yosef.”|מה אמר יוסף לאחיו כשגילה מי הוא?|״אני יוסף״.
Who came down to Egypt to see Yosef?|Yaakov and his family.|מי ירד למצרים לראות את יוסף?|יעקב ומשפחתו.
In which part of Egypt did the family settle?|Goshen.|באיזה חבל במצרים התיישבה המשפחה?|בארץ גושן.
`);
add('vayechi','Vayechi','ויחי','Genesis 47–50',`
Which two sons of Yosef did Yaakov bless?|Ephraim and Menashe.|את שני בני יוסף, מי בירך יעקב?|את אפרים ומנשה.
Which of those two sons was younger?|Ephraim.|מי מבין שני הבנים היה צעיר יותר?|אפרים.
Where did Yaakov ask to be buried?|In the Cave of Machpelah.|היכן ביקש יעקב להיקבר?|במערת המכפלה.
What did Yaakov do with his hands when blessing Yosef’s sons?|He crossed them, placing his right hand on Ephraim.|מה עשה יעקב בידיו כשבירך את בני יוסף?|שיכל את ידיו והניח את ימינו על אפרים.
What promise did Yosef ask his brothers to make about his bones?|To take them up from Egypt when Hashem redeemed them.|איזו הבטחה ביקש יוסף מאחיו על עצמותיו?|שיעלו אותן ממצרים כשה׳ יפקוד אותם.
`);
add('shemot','Shemot','שמות','Exodus 1–6',`
Who put baby Moshe in a basket among the reeds?|His mother.|מי שמה את משה התינוק בתיבה בסוף?|אמו.
Who found baby Moshe?|Pharaoh’s daughter.|מי מצאה את משה התינוק?|בת פרעה.
What unusual sight did Moshe see in the wilderness?|A burning bush that was not being consumed.|איזה מראה מיוחד ראה משה במדבר?|סנה בוער באש שאינו נאכל.
Who was Moshe’s brother and spokesman?|Aharon.|מי היה אחיו של משה שדיבר עבורו?|אהרן.
What did Hashem tell Moshe to remove near the burning bush?|His shoes, because the ground was holy.|מה אמר ה׳ למשה להסיר ליד הסנה?|את נעליו, כי המקום אדמת קודש.
`,['Shemos']);
add('vaera','Vaera','וארא','Exodus 6–9',`
What did the Nile’s water become in the first plague?|Blood.|למה הפכו מי היאור במכה הראשונה?|לדם.
Which animals filled Egypt in the second plague?|Frogs.|אילו בעלי חיים מילאו את מצרים במכה השנייה?|צפרדעים.
Who spoke to Pharaoh together with Moshe?|Aharon.|מי דיבר עם משה אל פרעה?|אהרן.
What fell from the sky in the seventh plague?|Hail, with fire flashing amid it.|מה ירד מן השמים במכה השביעית?|ברד ואש מתלקחת בתוכו.
Why did Moshe ask Pharaoh to let the people go?|So they could serve Hashem.|מדוע ביקש משה מפרעה לשלח את העם?|כדי שיעבדו את ה׳.
`);
add('bo','Bo','בא','Exodus 10–13',`
Which insects came in the eighth plague?|Locusts.|אילו חרקים באו במכה השמינית?|ארבה.
What happened in the ninth plague?|Thick darkness covered Egypt.|מה קרה במכה התשיעית?|חושך כבד כיסה את מצרים.
What bread did Bnei Yisrael eat as they left Egypt?|Matzah.|איזה לחם אכלו בני ישראל בצאתם ממצרים?|מצה.
Why did their dough not rise before they left?|They were driven out and could not wait.|מדוע לא הספיק הבצק להחמיץ?|כי גורשו ממצרים ולא יכלו להתמהמה.
What were families told to tell their children about?|What Hashem did for them when they left Egypt.|על מה נצטוו לספר לבנים?|על מה שעשה ה׳ עבורם ביציאת מצרים.
`);
add('beshalach','Beshalach','בשלח','Exodus 13–17',`
What sea split for Bnei Yisrael?|The Yam Suf.|איזה ים נבקע לבני ישראל?|ים סוף.
What food fell from heaven in the wilderness?|Manna.|איזה אוכל ירד מן השמים במדבר?|מן.
How much manna did they gather on Friday compared with other days?|A double portion.|כמה מן ליקטו ביום שישי לעומת שאר הימים?|מנה כפולה.
Who led the women with a tambourine after crossing the sea?|Miriam.|מי הובילה את הנשים בתוף אחרי קריעת הים?|מרים.
Who supported Moshe’s hands during the battle with Amalek?|Aharon and Chur.|מי תמכו בידי משה במלחמת עמלק?|אהרן וחור.
`);
add('yitro','Yitro','יתרו','Exodus 18–20',`
Who was Moshe’s father-in-law?|Yitro.|מי היה חותנו של משה?|יתרו.
At which mountain did Bnei Yisrael receive the Torah?|Har Sinai.|באיזה הר קיבלו בני ישראל את התורה?|הר סיני.
How many statements are in the Aseres Hadibros?|Ten.|כמה דיברות יש בעשרת הדיברות?|עשרה.
Which commandment tells us to honor our parents?|Honor your father and your mother.|איזו מצווה עוסקת בכבוד ההורים?|כבד את אביך ואת אמך.
What advice did Yitro give Moshe about judging the people?|Appoint capable judges to share the work.|מה יעץ יתרו למשה בעניין המשפט?|למנות שופטים ראויים שישתתפו בעבודה.
`,['Yisro']);
add('mishpatim','Mishpatim','משפטים','Exodus 21–24',`
What should someone do if they see their enemy’s lost ox or donkey?|Return it.|מה עושים כשמוצאים שור או חמור של אויב שאבד?|משיבים אותו לבעליו.
Whom does the Torah especially warn us not to mistreat?|A widow or an orphan.|את מי מזהירה התורה במיוחד שלא לענות?|אלמנה ויתום.
What did the people say when accepting Hashem’s words?|“Naaseh venishma” — we will do and we will hear.|מה אמר העם בקבלת דברי ה׳?|״נעשה ונשמע״.
What should happen to the land in the seventh year?|It is left to rest.|מה עושים לאדמה בשנה השביעית?|מניחים לה לשבות.
How long was Moshe on the mountain at the end of the parsha?|Forty days and forty nights.|כמה זמן היה משה בהר בסוף הפרשה?|ארבעים יום וארבעים לילה.
`);
add('terumah','Terumah','תרומה','Exodus 25–27',`
What holy dwelling were Bnei Yisrael asked to build?|The Mishkan.|איזה משכן קדוש התבקשו בני ישראל לבנות?|את המשכן.
What was placed inside the Aron?|The tablets of the covenant.|מה הונח בתוך הארון?|לוחות הברית.
How many branches did the Menorah have, including its central stem?|Seven.|כמה קנים היו למנורה עם הקנה האמצעי?|שבעה.
What metal covered the Aron inside and outside?|Gold.|באיזו מתכת ציפו את הארון מבפנים ומבחוץ?|בזהב.
What was kept on the Shulchan?|The lechem hapanim.|מה היה מונח על השולחן?|לחם הפנים.
`);
add('tetzaveh','Tetzaveh','תצוה','Exodus 27–30',`
What kind of oil was brought for the Menorah?|Pure beaten olive oil.|איזה שמן הובא למנורה?|שמן זית זך כתית.
Who was chosen to serve as Kohen Gadol?|Aharon.|מי נבחר להיות הכהן הגדול?|אהרן.
How many stones were on the Choshen?|Twelve.|כמה אבנים היו בחושן?|שתים עשרה.
What names were engraved on the Choshen’s stones?|The names of the tribes of Israel.|אילו שמות נחקקו באבני החושן?|שמות שבטי ישראל.
What words were engraved on the golden Tzitz?|“Kodesh LaHashem.”|אילו מילים נחקקו על הציץ?|״קודש לה׳״.
`);
add('ki-tisa','Ki Tisa','כי תשא','Exodus 30–34',`
What coin contribution was used when counting the people?|Half a shekel.|איזו תרומה נתנו כשמנו את העם?|מחצית השקל.
What did the people make while Moshe was on the mountain?|A golden calf.|מה עשה העם בזמן שמשה היה בהר?|עגל זהב.
What happened to the first tablets when Moshe saw the calf?|Moshe broke them.|מה קרה ללוחות הראשונים כשראה משה את העגל?|משה שבר אותם.
Who was chosen to lead the skilled work of building the Mishkan?|Betzalel.|מי נבחר לעמוד בראש מלאכת המשכן?|בצלאל.
What shone when Moshe came down with the second tablets?|The skin of his face.|מה קרן כשירד משה עם הלוחות השניים?|עור פניו.
`,['Ki Sisa']);
add('vayakhel','Vayakhel','ויקהל','Exodus 35–38',`
Which holy day did Moshe speak about before the Mishkan work?|Shabbos.|על איזה יום קדוש דיבר משה לפני מלאכת המשכן?|שבת.
Who brought materials for the Mishkan?|People whose hearts moved them to give.|מי הביאו תרומות למשכן?|כל נדיבי הלב.
Which two craftsmen led the work?|Betzalel and Oholiav.|אילו שני אומנים הובילו את העבודה?|בצלאל ואהליאב.
Why did Moshe tell the people to stop bringing materials?|There was already more than enough.|מדוע אמר משה להפסיק להביא תרומות?|כי כבר הייתה די והותר תרומה.
What did the skilled women make by spinning?|Yarn for the Mishkan.|מה הכינו הנשים חכמות הלב בטווייה?|חוטים לצורכי המשכן.
`);
add('pekudei','Pekudei','פקודי','Exodus 38–40',`
What does the parsha count and report?|The materials used for the Mishkan.|מה מונים ומפרטים בפרשה?|את החומרים ששימשו למשכן.
Who inspected the finished work and blessed the workers?|Moshe.|מי ראה את המלאכה המוכנה ובירך את העושים?|משה.
In which month was the Mishkan set up?|The first month, Nisan.|באיזה חודש הוקם המשכן?|בחודש הראשון, ניסן.
What covered the Mishkan when it was completed?|The cloud.|מה כיסה את המשכן כשהושלם?|הענן.
What told Bnei Yisrael when to continue their journeys?|The cloud rising from above the Mishkan.|מה הראה לבני ישראל מתי לצאת למסע?|העלות הענן מעל המשכן.
`);
add('vayikra','Vayikra','ויקרא','Leviticus 1–5',`
From where did Hashem call to Moshe?|The Ohel Moed.|מאין קרא ה׳ אל משה?|מאוהל מועד.
What is a korban?|An offering brought to Hashem.|מהו קורבן?|דבר שמקריבים לה׳.
What is a minchah offering made from?|Fine flour, in the forms described in the Torah.|ממה עשויה מנחה?|מסולת, בצורות המתוארות בתורה.
What seasoning must accompany offerings?|Salt.|איזה תבלין צריך ללוות את הקורבנות?|מלח.
What should a person do about something they stole?|Return it, with the required additional payment.|מה צריך לעשות אדם בדבר שגזל?|להשיב אותו ולשלם את התוספת הנדרשת.
`);
add('tzav','Tzav','צו','Leviticus 6–8',`
What must keep burning on the mizbeach?|The fire.|מה צריך לבעור תמיד על המזבח?|אש.
What did the kohen remove from the mizbeach?|Ashes.|מה הרים הכהן מעל המזבח?|דשן.
Who dressed Aharon in the priestly garments?|Moshe.|מי הלביש את אהרן בבגדי הכהונה?|משה.
What special oil did Moshe use for the Mishkan and Aharon?|The anointing oil.|באיזה שמן מיוחד השתמש משה למשכן ולאהרן?|שמן המשחה.
How many days did the inauguration period last?|Seven days.|כמה ימים נמשכו ימי המילואים?|שבעה ימים.
`);
add('shmini','Shmini','שמיני','Leviticus 9–11',`
On which day after the seven inauguration days does the parsha begin?|The eighth day.|באיזה יום אחרי שבעת ימי המילואים מתחילה הפרשה?|ביום השמיני.
Who blessed the people after bringing the offerings?|Aharon.|מי בירך את העם לאחר הקרבת הקורבנות?|אהרן.
What two signs identify a kosher land animal?|It chews its cud and has completely split hooves.|אילו שני סימנים יש בבהמה טהורה?|מעלת גרה ומפרסת פרסה שסועה.
What two signs identify a kosher fish?|Fins and scales.|אילו שני סימנים יש בדג טהור?|סנפיר וקשקשת.
Which two sons of Aharon died in this parsha?|Nadav and Avihu.|אילו שני בני אהרן מתו בפרשה?|נדב ואביהוא.
`,['Shemini']);
add('tazria','Tazria','תזריע','Leviticus 12–13',`
On which day is a baby boy’s bris described in the Torah?|The eighth day.|באיזה יום מתוארת בתורה מילת בן?|ביום השמיני.
Who examines a suspected mark of tzaraas?|A kohen.|מי בודק נגע החשוד כצרעת?|כהן.
Can the person decide their own tzaraas status without the kohen?|No; the Torah gives that decision to the kohen.|האם האדם מחליט לבדו על דינו בנגע צרעת?|לא; התורה נותנת את ההכרעה לכהן.
Besides skin, on what does this parsha describe tzaraas appearing?|Garments.|מלבד העור, היכן מתוארת צרעת בפרשה?|בבגדים.
For how long might the kohen first isolate an uncertain mark for another examination?|Seven days.|לכמה זמן עשוי הכהן להסגיר נגע מסופק לפני בדיקה נוספת?|לשבעה ימים.
`);
add('metzora','Metzora','מצורע','Leviticus 14–15',`
Who goes outside the camp to examine the recovering metzora?|The kohen.|מי יוצא מחוץ למחנה לראות את המצורע שנרפא?|הכהן.
How many birds are brought at the start of the purification described here?|Two.|כמה ציפורים מביאים בתחילת הטהרה המתוארת?|שתיים.
What happens to the living bird at the end of that part of the purification?|It is sent free into the open field.|מה עושים בציפור החיה בסיום אותו חלק בטהרה?|משלחים אותה על פני השדה.
Besides people and clothing, where can tzaraas appear?|On a house.|מלבד באדם ובבגד, היכן יכולה להופיע צרעת?|בבית.
Why is a house emptied before the kohen examines its mark?|So its contents will not become impure if the house is declared impure.|למה מפנים בית לפני שהכהן בודק את הנגע?|כדי שלא ייטמא מה שבבית אם ייקבע שהוא טמא.
`);
add('achrei-mot','Achrei Mot','אחרי מות','Leviticus 16–18',`
On which holy day does the Kohen Gadol enter the Kodesh Hakodashim for its special service?|Yom Kippur.|באיזה יום נכנס הכהן הגדול לקודש הקודשים לעבודת היום?|ביום הכיפורים.
What color are the special linen garments worn for that service?|White.|מה צבעם של בגדי הבד המיוחדים לעבודה זו?|לבן.
How many goats were taken for the lots on Yom Kippur?|Two.|כמה שעירים הובאו להגרלה ביום הכיפורים?|שניים.
What did Aharon place on the goats to decide their roles?|Lots.|מה נתן אהרן על השעירים כדי לקבוע את תפקידם?|גורלות.
What must be done with the blood of a hunted kosher wild animal or bird?|Cover it with earth.|מה עושים בדם חיה או עוף טהורים שניצודו ונשחטו?|מכסים אותו בעפר.
`,['Achrei Mos']);
add('kedoshim','Kedoshim','קדושים','Leviticus 19–20',`
How does the Torah tell us to love our neighbor?|As ourselves.|כיצד מצווה התורה לאהוב את הרֵע?|כמונו — ״ואהבת לרעך כמוך״.
For whom should parts of the harvest be left?|The poor and the stranger.|למי משאירים חלקים מהיבול?|לעני ולגר.
What does the Torah say about putting a stumbling block before a blind person?|It forbids it.|מה אומרת התורה על נתינת מכשול לפני עיוור?|״ולפני עיוור לא תתן מכשול״.
What should we do in the presence of an elderly person?|Rise and show respect.|מה עושים בפני אדם זקן?|קמים ומכבדים אותו.
What kind of weights and measures must a shopkeeper use?|Honest and accurate ones.|באילו משקלות ומידות צריך להשתמש במסחר?|במשקלות ובמידות צדק.
`);
add('emor','Emor','אמור','Leviticus 21–24',`
Which special days are listed in this parsha?|Shabbos and the festivals.|אילו ימים מיוחדים נמנים בפרשה?|שבת והמועדים.
How many weeks do we count in Sefiras HaOmer?|Seven complete weeks.|כמה שבועות סופרים בספירת העומר?|שבעה שבועות תמימים.
What is taken on Sukkos, together with the esrog?|Lulav, hadassim and aravos.|מה לוקחים בסוכות יחד עם האתרוג?|לולב, הדסים וערבות.
How many days are we commanded to dwell in a sukkah?|Seven days.|כמה ימים נצטווינו לשבת בסוכה?|שבעה ימים.
How many loaves were arranged on the pure table?|Twelve.|כמה חלות ערכו על השולחן הטהור?|שתים עשרה.
`);
add('behar','Behar','בהר','Leviticus 25–26',`
What is the seventh year of rest for the land called?|Shemitah.|איך נקראת השנה השביעית שבה הארץ שובתת?|שמיטה.
How many years are counted before the fiftieth year, Yovel?|Forty-nine years.|כמה שנים סופרים לפני שנת היובל החמישים?|ארבעים ותשע שנים.
What instrument is sounded to announce Yovel?|A shofar.|באיזה כלי תוקעים להכרזת היובל?|בשופר.
What should we do when a fellow Jew becomes poor?|Support and help them.|מה עושים כשאחינו נעשה עני?|מחזיקים בו ועוזרים לו.
Who does the Torah say is the true owner of the land?|Hashem.|למי שייכת הארץ באמת, לפי התורה?|לה׳ — ״כי לי הארץ״.
`);
add('bechukotai','Bechukotai','בחוקותי','Leviticus 26–27',`
What blessing for rain is promised when the people follow Hashem’s ways?|Rain in its proper time.|איזו ברכה על הגשם מובטחת כששומרים את מצוות ה׳?|גשמים בעתם.
What blessing about safety in the land is promised?|Peace in the land.|איזו ברכה על הביטחון בארץ מובטחת?|שלום בארץ.
What does Hashem promise about His dwelling among the people?|He will place His dwelling among them.|מה מבטיח ה׳ על משכנו בתוך העם?|״ונתתי משכני בתוככם״.
What happens in the parsha after the list of blessings?|Warnings about turning away from Hashem’s mitzvos.|מה בא בפרשה אחרי הברכות?|אזהרות על עזיבת מצוות ה׳.
What does the Torah call every tenth animal passing under the rod?|Holy to Hashem, the animal tithe.|איך מכונה כל עשירי העובר תחת השבט?|קודש לה׳ — מעשר בהמה.
`,['Bechukosai']);
add('bamidbar','Bamidbar','במדבר','Numbers 1–4',`
Where were Bnei Yisrael when this book begins?|In the wilderness of Sinai.|היכן היו בני ישראל בתחילת הספר?|במדבר סיני.
Who was told to count the people with Aharon?|Moshe.|מי נצטווה למנות את העם עם אהרן?|משה.
Which tribe was counted separately for service around the Mishkan?|Levi.|איזה שבט נמנה בנפרד לשירות סביב המשכן?|לוי.
What stood in the center of the camp?|The Mishkan.|מה היה במרכז המחנה?|המשכן.
Which tribe led the camp on the east side?|Yehudah.|איזה שבט עמד בראש המחנה במזרח?|יהודה.
`);
add('naso','Naso','נשא','Numbers 4–7',`
Who says the priestly blessing, Birkas Kohanim?|The kohanim.|מי מברכים בברכת כהנים?|הכהנים.
What is the first word of Birkas Kohanim?|Yevarechecha — may He bless you.|מה המילה הראשונה בברכת כהנים?|יברכך.
What word ends Birkas Kohanim?|Shalom, peace.|באיזו מילה מסתיימת ברכת כהנים?|שלום.
Who brought gifts for the dedication of the mizbeach?|The leaders of the tribes.|מי הביאו קורבנות לחנוכת המזבח?|נשיאי השבטים.
Over how many days did those leaders bring their dedication offerings?|Twelve days, one leader each day.|במשך כמה ימים הביאו הנשיאים את קורבנות החנוכה?|שנים עשר יום, נשיא אחד בכל יום.
`,['Nasso']);
add('behaalotcha','Beha’alotcha','בהעלותך','Numbers 8–12',`
Who was told how to light the Menorah?|Aharon.|למי נאמר כיצד להעלות את נרות המנורה?|לאהרן.
What showed the people when to travel and when to camp?|The cloud over the Mishkan.|מה הראה לעם מתי לנסוע ומתי לחנות?|הענן שמעל המשכן.
What were the two trumpets made from?|Silver.|ממה נעשו שתי החצוצרות?|מכסף.
What second opportunity was given to those unable to bring the Pesach offering at its time?|Pesach Sheni, in the second month.|איזו הזדמנות נוספת ניתנה למי שלא יכלו להקריב פסח בזמנו?|פסח שני, בחודש השני.
What short prayer did Moshe say for Miriam?|“Please, Hashem, please heal her.”|איזו תפילה קצרה התפלל משה על מרים?|״אל נא רפא נא לה״.
`,["Beha'alotcha",'Behaaloscha']);
add('shlach','Sh’lach','שלח','Numbers 13–15',`
How many men were sent to explore the land?|Twelve.|כמה אנשים נשלחו לתור את הארץ?|שנים עשר.
Which two explorers encouraged the people to trust Hashem and enter the land?|Yehoshua and Calev.|אילו שני תרים עודדו לבטוח בה׳ ולעלות לארץ?|יהושע וכלב.
What large fruit cluster did the explorers carry?|A cluster of grapes.|איזה אשכול גדול נשאו התרים?|אשכול ענבים.
For how many days did they explore the land?|Forty days.|כמה ימים תרו את הארץ?|ארבעים יום.
What mitzvah at the end of the parsha helps us remember Hashem’s commandments?|Tzitzis.|איזו מצווה בסוף הפרשה מזכירה את מצוות ה׳?|ציצית.
`,["Sh'lach",'Shelach']);
add('korach','Korach','קרח','Numbers 16–18',`
Who led the challenge against Moshe and Aharon?|Korach.|מי עמד בראש המחלוקת על משה ואהרן?|קרח.
What swallowed Dasan and Aviram and those with them?|The ground opened and swallowed them.|מה בלע את דתן ואבירם ואת אשר איתם?|האדמה פתחה את פיה ובלעה אותם.
Whose staff blossomed?|Aharon’s.|המטה של מי פרח?|מטה אהרן.
What fruit grew on that staff?|Almonds.|איזה פרי צמח במטה?|שקדים.
Which tribe did the blossoming staff represent?|Levi.|איזה שבט ייצג המטה שפרח?|לוי.
`);
add('chukat','Chukat','חקת','Numbers 19–22',`
What color is the cow described for the purification water?|Red.|מה צבע הפרה המתוארת לצורך מי הטהרה?|אדום.
Which sister of Moshe died in this parsha?|Miriam.|איזו אחות של משה נפטרה בפרשה?|מרים.
What did Hashem tell Moshe to do to the rock?|Speak to it.|מה אמר ה׳ למשה לעשות לסלע?|לדבר אליו.
Who became Kohen Gadol after Aharon?|Elazar, his son.|מי נעשה כהן גדול אחרי אהרן?|אלעזר בנו.
What metal serpent did Moshe make as Hashem commanded?|A copper serpent.|איזה נחש עשה משה בציווי ה׳?|נחש נחושת.
`,['Chukas']);
add('balak','Balak','בלק','Numbers 22–25',`
Who was the king of Moav?|Balak.|מי היה מלך מואב?|בלק.
Whom did Balak hire to curse Bnei Yisrael?|Bilam.|את מי הזמין בלק לקלל את בני ישראל?|את בלעם.
Which animal spoke to Bilam?|His donkey.|איזה בעל חיים דיבר אל בלעם?|אתונו.
What did Bilam give instead of curses?|Blessings, as Hashem placed in his mouth.|מה יצא מפי בלעם במקום קללות?|ברכות, כפי ששם ה׳ בפיו.
What did Bilam praise with the words “Mah tovu”?|Yaakov’s tents and Israel’s dwelling places.|מה שיבח בלעם במילים ״מה טובו״?|את אוהלי יעקב ומשכנות ישראל.
`);
add('pinchas','Pinchas','פינחס','Numbers 25–30',`
Who received a covenant of peace?|Pinchas.|מי קיבל ברית שלום?|פינחס.
Whose daughters asked for an inheritance in the land?|Tzelofchad’s daughters.|בנותיו של מי ביקשו נחלה בארץ?|בנות צלפחד.
How many daughters did Tzelofchad have?|Five.|כמה בנות היו לצלפחד?|חמש.
Who was chosen to lead the people after Moshe?|Yehoshua bin Nun.|מי נבחר להנהיג את העם אחרי משה?|יהושע בן נון.
What regular daily offering is described in this parsha?|The korban tamid.|איזה קורבן קבוע בכל יום מתואר בפרשה?|קורבן התמיד.
`);
add('matot','Matot','מטות','Numbers 30–32',`
What does the Torah teach about a person’s vows?|A person must keep the commitment made.|מה מלמדת התורה על נדרי אדם?|על האדם לקיים את התחייבותו.
Which two tribes first asked to settle east of the Jordan?|Reuven and Gad.|אילו שני שבטים ביקשו תחילה לשבת בעבר הירדן המזרחי?|ראובן וגד.
Why did they want that land?|It was suitable for their many animals.|מדוע רצו בארץ הזאת?|היא התאימה למקנה הרב שלהם.
What did they promise to do before settling peacefully?|Help the other tribes in the conquest of the land.|מה הבטיחו לעשות לפני שיישבו בנחת?|לעזור לשאר השבטים בכיבוש הארץ.
Which other half-tribe also received land east of the Jordan?|Half of Menashe.|איזה חצי שבט קיבל גם הוא נחלה בעבר הירדן?|חצי שבט מנשה.
`,['Matos']);
add('masei','Masei','מסעי','Numbers 33–36',`
What journeys are listed at the start of the parsha?|Bnei Yisrael’s journeys from Egypt through the wilderness.|אילו מסעות נמנים בתחילת הפרשה?|מסעות בני ישראל ממצרים במדבר.
What special cities offered refuge to someone who killed unintentionally?|Cities of refuge.|אילו ערים נועדו למי שהרג בשגגה?|ערי מקלט.
How many cities of refuge were to be set aside altogether on both sides of the Jordan?|Six.|כמה ערי מקלט נצטוו להבדיל בשני עברי הירדן יחד?|שש.
Which tribe received towns among the other tribes?|Levi.|איזה שבט קיבל ערים בתוך נחלות שאר השבטים?|לוי.
What boundaries are described in this parsha?|The boundaries of the land of Canaan.|אילו גבולות מתוארים בפרשה?|גבולות ארץ כנען.
`);
add('devarim','Devarim','דברים','Deuteronomy 1–3',`
Who speaks to Bnei Yisrael in this book?|Moshe.|מי מדבר אל בני ישראל בספר זה?|משה.
Which river were the people preparing to cross?|The Jordan.|איזה נהר התכונן העם לעבור?|הירדן.
What earlier journey does Moshe recall?|The journey from Horev through the wilderness.|איזה מסע קודם מזכיר משה?|המסע מחורב דרך המדבר.
What does Moshe tell judges about rich and poor, small and great?|Hear everyone fairly without favoritism.|מה אומר משה לשופטים על קטן וגדול?|לשמוע את כולם בלי להכיר פנים.
Which leader does Moshe encourage not to fear the kings ahead?|Yehoshua.|את איזה מנהיג מעודד משה שלא לפחד מהמלכים שלפניו?|יהושע.
`);
add('vaetchanan','Vaetchanan','ואתחנן','Deuteronomy 3–7',`
What did Moshe ask Hashem to let him do?|Cross over and see the good land.|מה ביקש משה מה׳ לעשות?|לעבור ולראות את הארץ הטובה.
Which famous sentence begins “Shema Yisrael”?|Hashem is our God; Hashem is One.|מה נאמר בפסוק המתחיל ״שמע ישראל״?|ה׳ אלוקינו ה׳ אחד.
Where are we told to write these words at our homes?|On the doorposts and gates.|היכן נצטווינו לכתוב את הדברים בבתינו?|על מזוזות הבית ובשערים.
When should we teach Torah to our children, according to the parsha?|At home, on the way, when lying down and when rising.|מתי מלמדים את הדברים לבנים לפי הפרשה?|בשבתנו בבית, בלכתנו בדרך, בשכבנו ובקומנו.
Which set of commandments is repeated in this parsha?|The Aseres Hadibros.|איזו קבוצת מצוות חוזרת בפרשה?|עשרת הדיברות.
`,['Vaeschanan']);
add('eikev','Eikev','עקב','Deuteronomy 7–11',`
What should we do after eating and being satisfied?|Bless Hashem.|מה עושים אחרי שאוכלים ושבעים?|מברכים את ה׳.
What food did Hashem provide in the wilderness?|Manna.|איזה אוכל נתן ה׳ במדבר?|מן.
How many kinds of produce is Eretz Yisrael specially praised for here?|Seven.|בכמה מינים השתבחה הארץ כאן?|בשבעה.
Name two of the seven species.|For example, wheat and barley.|ציינו שניים משבעת המינים.|למשל, חיטה ושעורה.
What must we remember when we become successful?|Hashem gives us the strength to achieve.|מה צריך לזכור כשמצליחים?|שה׳ נותן לנו כוח לעשות חיל.
`);
add('reeh','Re’eh','ראה','Deuteronomy 11–16',`
What two choices does Moshe place before the people?|A blessing and a curse.|אילו שתי אפשרויות מציב משה לפני העם?|ברכה וקללה.
How should we treat a person in need?|Open our hand and help generously.|כיצד נוהגים באדם הזקוק לעזרה?|פותחים את היד ועוזרים בנדיבות.
Which three pilgrimage festivals are named here?|Pesach, Shavuos and Sukkos.|אילו שלושה רגלים נמנים כאן?|פסח, שבועות וסוכות.
What does the Torah call Bnei Yisrael in relation to Hashem?|Children of Hashem.|איך מכנה התורה את בני ישראל ביחס לה׳?|״בנים אתם לה׳ אלוקיכם״.
Who should share in our festival joy besides our own family?|Including the Levi, stranger, orphan and widow.|מי צריכים להשתתף בשמחת החג מלבד המשפחה?|גם הלוי, הגר, היתום והאלמנה.
`,["Re'eh",'Reeh']);
add('shoftim','Shoftim','שופטים','Deuteronomy 16–21',`
Whom should the people appoint in their towns?|Judges and officers.|את מי יש למנות בשערים?|שופטים ושוטרים.
What does “Tzedek, tzedek tirdof” mean?|Justice, justice shall you pursue.|מה פירוש ״צדק צדק תרדוף״?|יש לרדוף אחר הצדק.
What must a king write for himself?|A copy of the Torah.|מה צריך המלך לכתוב לעצמו?|ספר תורה.
What must judges not accept, because it can twist judgment?|A bribe.|מה אסור לשופטים לקחת מפני שהוא מטה משפט?|שוחד.
What kind of trees must not be destroyed when besieging a city for war?|Fruit trees.|אילו עצים אין להשחית כשצרים על עיר למלחמה?|עצי מאכל.
`);
add('ki-teitzei','Ki Teitzei','כי תצא','Deuteronomy 21–25',`
What should we do with someone’s lost object?|Return it to its owner.|מה עושים באבדה של אדם אחר?|משיבים אותה לבעליה.
What safety feature must be built around a roof that requires it?|A parapet, a maakeh.|איזה אמצעי בטיחות בונים בגג החייב בכך?|מעקה.
What must a worker receive on time?|Their wages.|מה צריך עובד לקבל בזמן?|את שכרו.
Which two different animals must not plow together?|An ox and a donkey.|אילו שני בעלי חיים אסור לחרוש בהם יחד?|שור וחמור.
What does the Torah say about keeping dishonest weights?|Do not keep them; use honest weights.|מה אומרת התורה על משקלות מרמה?|לא להחזיקן; להשתמש במשקלות צדק.
`,['Ki Seitzei']);
add('ki-tavo','Ki Tavo','כי תבוא','Deuteronomy 26–29',`
What first produce was brought in a basket?|Bikkurim, the first fruits.|איזה יבול ראשון הביאו בטנא?|ביכורים.
To whom was the basket of bikkurim given?|The kohen.|למי נתנו את טנא הביכורים?|לכהן.
Which rescue from slavery is recalled when bringing bikkurim?|Hashem taking us out of Egypt.|איזו יציאה מעבדות מזכירים בהבאת ביכורים?|את יציאת מצרים.
What were the people to write on large plastered stones?|The words of the Torah.|מה נצטוו לכתוב על אבנים גדולות מסוידות?|את דברי התורה.
What response did the people give to the declarations spoken by the Leviim?|Amen.|מה ענה העם לדברים שאמרו הלויים?|אמן.
`,['Ki Savo']);
add('nitzavim','Nitzavim','נצבים','Deuteronomy 29–30',`
Who stands together before Hashem at the start of the parsha?|All of Bnei Yisrael, young and old.|מי ניצבים יחד לפני ה׳ בתחילת הפרשה?|כל ישראל, גדולים וקטנים.
What does the Torah tell us to choose?|Life.|במה אומרת התורה לבחור?|בחיים.
Is the Torah described as impossibly far away?|No; it is very near to us.|האם התורה מתוארת כרחוקה מכדי להגיע אליה?|לא; ״קרוב אליך הדבר מאוד״.
Where does the parsha say the matter is near to us?|In our mouth and heart, to do it.|היכן קרוב אלינו הדבר, לפי הפרשה?|בפינו ובלבבנו, לעשותו.
What is returning to Hashem called?|Teshuvah.|איך נקראת החזרה אל ה׳?|תשובה.
`);
add('vayeilech','Vayeilech','וילך','Deuteronomy 31',`
How old was Moshe when he spoke in this parsha?|One hundred and twenty.|בן כמה היה משה כשדיבר בפרשה?|בן מאה ועשרים שנה.
Who would lead the people into the land?|Yehoshua.|מי ינהיג את העם בכניסה לארץ?|יהושע.
What words of encouragement did Moshe tell Yehoshua?|Be strong and courageous.|אילו מילות חיזוק אמר משה ליהושע?|״חזק ואמץ״.
What gathering for hearing the Torah is commanded every seven years?|Hakhel.|איזו התכנסות לשמיעת התורה נצטוו לקיים בכל שבע שנים?|הקהל.
Who was to gather for Hakhel?|Men, women, children and the stranger within the gates.|מי צריכים להתכנס להקהל?|האנשים, הנשים, הטף והגר שבשערים.
`,['Vayelech']);
add('haazinu','Ha’azinu','האזינו','Deuteronomy 32',`
What two parts of creation are asked to listen at the start of the song?|Heaven and earth.|אילו שני חלקי הבריאה נקראים להאזין בתחילת השירה?|השמים והארץ.
To what gentle moisture is the teaching compared?|Dew.|לאיזו לחות עדינה נמשלה האמירה?|לטל.
Which bird is pictured caring for its young?|An eagle.|איזה עוף מתואר כדואג לגוזליו?|נשר.
Whom are we told to ask about earlier generations?|Our father and elders.|את מי מצווים לשאול על הדורות הקודמים?|את אבינו ואת זקנינו.
Which mountain was Moshe told to ascend at the end of the parsha?|Mount Nevo.|על איזה הר נצטווה משה לעלות בסוף הפרשה?|הר נבו.
`,["Ha'azinu",'Haazinu']);
add('vezot-haberakhah','Vezot Haberakhah','וזאת הברכה','Deuteronomy 33–34',`
Who blessed the tribes before his death?|Moshe.|מי בירך את השבטים לפני פטירתו?|משה.
What did Hashem show Moshe from Mount Nevo?|The land promised to the forefathers.|מה הראה ה׳ למשה מהר נבו?|את הארץ שהבטיח לאבות.
Who succeeded Moshe as leader?|Yehoshua bin Nun.|מי המשיך להנהיג אחרי משה?|יהושע בן נון.
How many days did Bnei Yisrael mourn Moshe?|Thirty days.|כמה ימים בכו בני ישראל על משה?|שלושים יום.
Does the Torah tell us exactly where Moshe’s grave is?|No; it says no one knows his burial place.|האם התורה מגלה בדיוק היכן קבר משה?|לא; נאמר שלא ידע איש את קבורתו.
`,["V'Zot HaBerachah",'Vezos Haberachah','Vezot Haberacha']);
const pairs=[['vayakhel','pekudei'],['tazria','metzora'],['achrei-mot','kedoshim'],['behar','bechukotai'],['chukat','balak'],['matot','masei'],['nitzavim','vayeilech']];
for(const [a,b] of pairs) { const x=drafts.find(q=>q.id===a),y=drafts.find(q=>q.id===b); if(!x||!y)continue; drafts.push({id:a+'-'+b,en:x.en+'-'+y.en,he:x.he+'־'+y.he,aliases:[],reviewStatus:'DRAFT — RAV REVIEW REQUIRED',questions:[...x.questions.slice(0,3),...y.questions.slice(0,2)]}); }
fs.mkdirSync('content',{recursive:true});
fs.writeFileSync('content/parsha-questions.REVIEW.json',JSON.stringify({notice:'DRAFT: Every question and translation must be reviewed by a rav before publication. No raffle reward is promised. The website serves only the exact version approved in /admin. Editing questions invalidates approval.',version:1,parshas:drafts},null,2)+'\n');
console.log('Wrote '+drafts.length+' review-only question sets.');
