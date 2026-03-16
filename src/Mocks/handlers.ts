import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(
    'https://api.themoviedb.org/3/discover/movie?api_key=c225640b9109317dc84c9f661f0ca0ba&include_adult=false&include_video=false&language=sv-SE&page=1&sort_by=popularity.desc',
    () => {
      // Note that you DON'T have to stringify the JSON!
      return HttpResponse.json({
        page: 1,
        results: [
          {
            adult: false,
            backdrop_path: '/zqkmTXzctd0To7LV0Zq219eLYi8.jpg',
            genre_ids: [12, 28, 878],
            id: 11,
            original_language: 'en',
            original_title: 'Star Wars',
            overview:
              'Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.',
            popularity: 100.0,
            poster_path: '/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg',
            release_date: '1977-05-25',
            title: 'Star Wars',
            video: false,
            vote_average: 8.2,
            vote_count: 14000,
            belongs_to_collection: {
              id: 10,
              name: 'Star Wars Collection',
              poster_path: '/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg',
              backdrop_path: '/zqkmTXzctd0To7LV0Zq219eLYi8.jpg',
            },
          },
          {
            adult: false,
            backdrop_path: '/gMQibswELoKmB60imE7WFMlCuqY.jpg',
            genre_ids: [27, 53, 9648],
            id: 1034541,
            original_language: 'en',
            original_title: 'Terrifier 3',
            overview:
              'Medan invånarna i Miles County gör sig redo för årets stora familjehögtid gör Art the Clown, världens vidrigaste clown, återkomst i tomteskrud. Han är redo med nya kreativa sätt att skörda offer. Mer blod än någonsin ska färga den nyfallna snön röd.',
            popularity: 4684.391,
            poster_path: '/krcuoiNQzJubqf90S0m3FDGKGZu.jpg',
            release_date: '2024-10-09',
            title: 'Terrifier 3',
            video: false,
            vote_average: 7.3,
            vote_count: 653,
          },
        ],
        total_pages: 46979,
        total_results: 939566,
      });
    }
  ),
  http.get('https://api.themoviedb.org/3/collection/:id/translations', () => {
    return HttpResponse.json({
      id: 10,
      translations: [
        {
          "iso_3166_1": "AE",
          "iso_639_1": "ar",
          "name": "العربية",
          "english_name": "Arabic",
          "data": {
            "title": "",
            "overview": "",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "BG",
          "iso_639_1": "bg",
          "name": "български език",
          "english_name": "Bulgarian",
          "data": {
            "title": "Междузвездни войни (поредица)",
            "overview": "Междузвездни войни е поредица от шест филма проследяващи живота на Анакин Скайуокър. Открит от джедая Куай-Гон Джин на пустинната планета Татуин Анакин е все още дете, но постепенно се превръща в силния Дарт Вейдър, дясната ръка на Императорът, който почти успява да унищожи джедайте.",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "ES",
          "iso_639_1": "ca",
          "name": "Català",
          "english_name": "Catalan",
          "data": {
            "title": "Col·lecció Star Wars",
            "overview": "",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "CZ",
          "iso_639_1": "cs",
          "name": "Český",
          "english_name": "Czech",
          "data": {
            "title": "Star Wars (kolekce)",
            "overview": "Star Wars (česky původně též Hvězdné války) je americká multimediální franšíza žánru space opera, vytvořená Georgem Lucasem. Její hlavní částí je devítidílná řada celovečerních filmů, ke které se postupně přidala další díla.",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "DK",
          "iso_639_1": "da",
          "name": "Dansk",
          "english_name": "Danish",
          "data": {
            "title": "Star Wars (Samling)",
            "overview": "For meget længe siden i en fjern, fjern galakse....",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "DE",
          "iso_639_1": "de",
          "name": "Deutsch",
          "english_name": "German",
          "data": {
            "title": "Star Wars Filmreihe",
            "overview": "\"Star Wars™\" ist die größte Science-Fiction-Saga aller Zeiten, die mit ihren bislang neun filmischen Episoden und den unüberschaubaren Verzweigungen alle Dimensionen der Unterhaltungskultur gesprengt hat. Die Abenteuer von Luke Skywalker, Han Solo und der schönen Prinzessin Leia fesseln die Kinozuschauer und die Leser in aller Welt seit fast 30 Jahren.",
            "homepage": "http://www.starwars-union.de"
          }
        },
        {
          "iso_3166_1": "GR",
          "iso_639_1": "el",
          "name": "ελληνικά",
          "english_name": "Greek",
          "data": {
            "title": "Star Wars: Το Έπος των Skywalker - Συλλογή",
            "overview": "Μια επική σειρά διαστημικών ταινιών, που απεικονίζει τις περιπέτειες διαφόρων χαρακτήρων «πολύ καιρό πριν, σε έναν γαλαξία πολύ, πολύ μακρινό…».",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "US",
          "iso_639_1": "en",
          "name": "English",
          "english_name": "English",
          "data": {
            "title": "",
            "overview": "An epic space-opera theatrical film series, which depicts the adventures of various characters \"a long time ago in a galaxy far, far away….\"",
            "homepage": "https://www.starwars.com/films"
          }
        },
        {
          "iso_3166_1": "ES",
          "iso_639_1": "es",
          "name": "Español",
          "english_name": "Spanish",
          "data": {
            "title": "La guerra de las galaxias - Colección",
            "overview": "La colección de las 9 películas del director , escritor y productor George Lucas. Con Luke Skywalker, Princesa Leia, Darth Vader,C3PO,R2D2 y más personajes de la saga de la Guerra de las Galaxias.",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "MX",
          "iso_639_1": "es",
          "name": "Español",
          "english_name": "Spanish",
          "data": {
            "title": "Star Wars - Colección",
            "overview": "Star Wars es una franquicia compuesta por una serie de películas concebidas primordialmentede por el cineasta estadounidense George Lucas, y producidas y distribuidas por The Walt Disney Company a partir de 2012. Su trama describe las vivencias de un grupo de personajes que habitan en una galaxia ficticia e interactúan con elementos como «la Fuerza», un campo de energía metafísico y omnipresente​ que posee un «lado oscuro» provocado por la ira, el miedo y el odio.",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "IR",
          "iso_639_1": "fa",
          "name": "فارسی",
          "english_name": "Persian",
          "data": {
            "title": "مجموعه جنگ ستارگان",
            "overview": "",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "FI",
          "iso_639_1": "fi",
          "name": "suomi",
          "english_name": "Finnish",
          "data": {
            "title": "Tähtien sota",
            "overview": "",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "CA",
          "iso_639_1": "fr",
          "name": "Français",
          "english_name": "French",
          "data": {
            "title": "Collection Star Wars",
            "overview": "Luke Skywalker, la Princesse Leia, Dark Vador, C3PO, R2D2 et de nombreux autres personnages du film sont désormais des noms familiers de l'un des projets cinématographiques les plus réussis de tous les temps.",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "FR",
          "iso_639_1": "fr",
          "name": "Français",
          "english_name": "French",
          "data": {
            "title": "Star Wars - Saga",
            "overview": "Luke Skywalker, la Princesse Leia, Dark Vador, C3PO, R2D2 et de nombreux autres personnages du film sont désormais des noms familiers de l'un des projets cinématographiques les plus réussis de tous les temps.",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "IL",
          "iso_639_1": "he",
          "name": "עִבְרִית",
          "english_name": "Hebrew",
          "data": {
            "title": "מלחמת הכוכבים - אוסף",
            "overview": "מלחמת הכוכבים הוא שמה של סדרת סרטי מדע בדיוני מצליחים שיצר במאי הקולנוע ג'ורג' לוקאס. הסרט הראשון בסדרה, שנקרא אז \"מלחמת הכוכבים\" וכיום נקרא \"מלחמת הכוכבים - פרק 4: תקווה חדשה\", יצא בשנת 1977. מאז יצאו חמישה סרטים נוספים בסדרה, האחרון שבהם בשנת 2005. בסדרת הסרטים כיכבו אנסמבל של שחקנים כדוגמת מארק המיל, האריסון פורד, קארי פישר ואלק גינס (בטרילוגיה המקורית) והיידן כריסטנסן, נטלי פורטמן, יואן מקגרגור, ליאם ניסן, כריסטופר לי וסמואל ל. ג'קסון (בטרילוגיה המקדימה). בעקבות רכישת לוקאס פילם על ידי דיסני, הכריזו הרוכשים על הפקת טרילוגיה חדשה (פרקים 7-9); הראשון בהם צפוי לצאת לאקרנים בשנת 2015.",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "HR",
          "iso_639_1": "hr",
          "name": "Hrvatski",
          "english_name": "Croatian",
          "data": {
            "title": "Ratovi zvijezda zbirka",
            "overview": "",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "HU",
          "iso_639_1": "hu",
          "name": "Magyar",
          "english_name": "Hungarian",
          "data": {
            "title": "Star Wars gyűjtemény",
            "overview": "A Csillagok háborúja (eredeti címe: Star Wars) egy űropera filmsorozatnak, irodalmi műveknek és számítógépes játékoknak a neve. Mindezek George Lucas filmrendező ötletei alapján készültek el. A filmek cselekménye a Galaktikus Köztársaság és a Galaktikus Birodalom közti átmenetek, valamint a Galaktikus Polgárháború (amely a Lázadó Szövetség és a Galaktikus Birodalom között zajlik) körül forog. Valójában az egész cselekmény a jó és a rossz harcát jelképezi. A történet „réges régen, egy messzi-messzi galaxisban…” játszódik. Az eredeti Csillagok háborúja-trilógia, főleg annak elsőként vetített része, az Egy új remény (IV. epizód) úttörő jelentőségű volt a sci-fi műfajában mind tartalmilag, mind a technikai megvalósítást tekintve, de az előzmény-trilógia (Baljós árnyak, A klónok támadása, A Sith-ek bosszúja) is számos újítást hozott magával.",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "ID",
          "iso_639_1": "id",
          "name": "Bahasa indonesia",
          "english_name": "Indonesian",
          "data": {
            "title": "",
            "overview": "",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "IT",
          "iso_639_1": "it",
          "name": "Italiano",
          "english_name": "Italian",
          "data": {
            "title": "Guerre stellari - Collezione",
            "overview": "Guerre stellari (in inglese Star Wars) è un franchise creato da George Lucas, che si sviluppa da una saga cinematografica iniziata nel 1977 col film Guerre stellari, sottotitolato retroattivamente Episodio IV - Una nuova speranza. A questo film sono seguite altre due pellicole, distribuite a tre anni di distanza l'una dall'altra: L'Impero colpisce ancora (1980) e Il ritorno dello Jedi (1983). Questi tre film costituiscono la cosiddetta \"trilogia originale\". Sedici anni dopo l'uscita dell'ultimo film, Lucas decise di girare una trilogia prequel, composta da La minaccia fantasma (1999), L'attacco dei cloni (2002) e La vendetta dei Sith (2005). Nel 2012 The Walt Disney Company acquistò infine i diritti della serie e avviò la produzione di una trilogia sequel con Il risveglio della Forza (2015), Gli ultimi Jedi (2017) e L'ascesa di Skywalker (2019). Essa è stata alternata a una serie Anthology che include Rogue One: A Star Wars Story (2016) e Solo: A Star Wars Story (2018).",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "JP",
          "iso_639_1": "ja",
          "name": "日本語",
          "english_name": "Japanese",
          "data": {
            "title": "スター・ウォーズ シリーズ",
            "overview": "\"はるか昔、はるか彼方の銀河系を舞台に、さまざまな登場人物たちの冒険を描いた壮大なスペースオペラ劇場映画シリーズ....\"",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "GE",
          "iso_639_1": "ka",
          "name": "ქართული",
          "english_name": "Georgian",
          "data": {
            "title": "",
            "overview": "",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "KR",
          "iso_639_1": "ko",
          "name": "한국어/조선말",
          "english_name": "Korean",
          "data": {
            "title": "스타워즈 시리즈",
            "overview": "오래전 멀고 먼 은하계에...",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "LT",
          "iso_639_1": "lt",
          "name": "Lietuvių",
          "english_name": "Lithuanian",
          "data": {
            "title": "Filmai „Žvaigždžių karai“",
            "overview": "",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "NO",
          "iso_639_1": "nb",
          "name": "Bokmål",
          "english_name": "Norwegian Bokmål",
          "data": {
            "title": "",
            "overview": "",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "NL",
          "iso_639_1": "nl",
          "name": "Nederlands",
          "english_name": "Dutch",
          "data": {
            "title": "Star Wars Collectie",
            "overview": "De collectie van de 9 theatrale productie van films uit de regisseur, scenarioschrijver en producer George Lucas. Luke Skywalker, Princess Leia, Darth Vader, C3PO, R2D2 en vele andere personages uit de film zijn nu vertrouwde namen van een van de meest succesvolle filmprojecten aller tijden.",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "NO",
          "iso_639_1": "no",
          "name": "Norsk",
          "english_name": "Norwegian",
          "data": {
            "title": "Star Wars - Den Komplette Samlingen",
            "overview": "",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "PL",
          "iso_639_1": "pl",
          "name": "Polski",
          "english_name": "Polish",
          "data": {
            "title": "Gwiezdne wojny - Kolekcja",
            "overview": "Seria filmów fantastycznych z gatunku space opera (science fantasy) George’a Lucasa.",
            "homepage": "http://www.starwars.com/"
          }
        },
        {
          "iso_3166_1": "BR",
          "iso_639_1": "pt",
          "name": "Português",
          "english_name": "Portuguese",
          "data": {
            "title": "Star Wars: Coleção",
            "overview": "Uma série épica de filmes ópera espacial, que retratam as aventuras de vários personagens \"há muito tempo em uma galáxia muito, muito distante ....\"",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "PT",
          "iso_639_1": "pt",
          "name": "Português",
          "english_name": "Portuguese",
          "data": {
            "title": "Star Wars - Guerra das Estrelas",
            "overview": "Uma série épica de filmes ópera espacial, que retratam as aventuras de vários personagens \"há muito tempo numa galáxia muito, muito distante...\"",
            "homepage": "https://www.starwars.com/"
          }
        },
        {
          "iso_3166_1": "RO",
          "iso_639_1": "ro",
          "name": "Română",
          "english_name": "Romanian",
          "data": {
            "title": "Colecția Star Wars",
            "overview": "",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "RU",
          "iso_639_1": "ru",
          "name": "Pусский",
          "english_name": "Russian",
          "data": {
            "title": "Звёздные войны (Коллекция)",
            "overview": "«Звёздные войны» — эпическая фантастическая киносага, созданная Джорджем Лукасом. Эпизоды серии вобрали в себя архетипы как научной фантастики, так и классической мифологии, а также предоставили их великолепную музыкальную интерпретацию. Фильмы являются прекрасным примером космооперы, они заняли заметное место в поп-культуре и стали самой кассовой киносерией всех времён. В последние годы серия приобрела ещё большую популярность, породив новое поколение восторженных фанатов.",
            "homepage": "http://www.starwars.com"
          }
        },
        {
          "iso_3166_1": "SK",
          "iso_639_1": "sk",
          "name": "Slovenčina",
          "english_name": "Slovak",
          "data": {
            "title": "Star Wars (kolekcia)",
            "overview": "",
            "homepage": "http://www.starwars.com"
          }
        },
        {
          "iso_3166_1": "RS",
          "iso_639_1": "sr",
          "name": "Srpski",
          "english_name": "Serbian",
          "data": {
            "title": "колекција Ратови Звезда",
            "overview": "",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "SE",
          "iso_639_1": "sv",
          "name": "svenska",
          "english_name": "Swedish",
          "data": {
            "title": "Star Wars (samling)",
            "overview": "Star Wars är en saga som utspelar sig i en fjärran galax och där kampen mellan gott och ont står i centrum. I de tre första filmerna som producerades utkämpas ett inbördeskrig i galaxen där kampen står mellan det onda Rymdimperiet.",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "TH",
          "iso_639_1": "th",
          "name": "ภาษาไทย",
          "english_name": "Thai",
          "data": {
            "title": "สตาร์ วอร์ส คอลเลกชัน",
            "overview": "",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "TR",
          "iso_639_1": "tr",
          "name": "Türkçe",
          "english_name": "Turkish",
          "data": {
            "title": "Yıldız Savaşları [Seri]",
            "overview": "Yıldız Savaşları, George Lucas tarafından yapılmış, öncelikle filmleriyle tanınmış kurgusal evren ve markadır. Bugüne kadar 11 film bizlerle buluşsa da ana hikayeyi anlatan 8 film bulunmakta. İzleme sıralaması 4-5-6-1-2-3-7-8-9 şeklindedir.",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "UA",
          "iso_639_1": "uk",
          "name": "Український",
          "english_name": "Ukrainian",
          "data": {
            "title": "Зоряні війни | Колекція",
            "overview": "Культова епічна фантастична сага, що містить оповіді про протистояння планет, цивілізації та фракцій «Далекої галактики».",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "VN",
          "iso_639_1": "vi",
          "name": "Tiếng Việt",
          "english_name": "Vietnamese",
          "data": {
            "title": "Loạt phim Chiến Tranh Giữa Các Vì Sao",
            "overview": "",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "CN",
          "iso_639_1": "zh",
          "name": "普通话",
          "english_name": "Mandarin",
          "data": {
            "title": "星球大战（系列）",
            "overview": "《星球大战》(英语：Star Wars)，中文可简称“星战”，是美国导演兼编剧乔治·卢卡斯所构思拍摄的一系列科幻电影。同时“星球大战”也是该系列电影最早拍摄上映的第四章故事的原始片名。从1970年代末到1980年代，卢卡斯出品了《星球大战》三部曲。他曾说明第一部星战（第四部曲）的人物及故事是参照日本导演黑泽明的《战国英豪》(隠し砦の三悪人)所创作而成；原三部曲以二战英德大战为架构并溶入美国西部片及日本武士刀剧的节奏；蕴涵了太空冒险、希腊神话的大视野制作。影片中所使用的特效技术重新定义并改变了往后太空科幻片的未来发展。1990年代末，基于各界要求又拍摄了原三部曲之前的故事，又称“星战前传”。同时他把最初的三部曲改为六部系列的第四、五、六集，并将最早的第四集改名为“新希望”（A New Hope）。2012年10月，华特迪士尼公司以40.5亿美元收购卢卡斯影业。该片描写，在很久以前，一个遥远的银河系，肩负正义使命的绝地武士与帝国邪恶黑暗势力作战的故事。本片开启好莱坞电影商品授权的庞大事业，旗下分别有小说、漫画、玩具与电玩游戏等相关周边产业，系列中每部电影，小说与电玩游戏，皆以“很久以前，在一个遥远的银河系……”(A long time ago in a galaxy far, far away...)开头。",
            "homepage": "https://www.starwars.com/"
          }
        },
        {
          "iso_3166_1": "HK",
          "iso_639_1": "zh",
          "name": "普通话",
          "english_name": "Mandarin",
          "data": {
            "title": "《星球大戰》系列",
            "overview": "",
            "homepage": ""
          }
        },
        {
          "iso_3166_1": "TW",
          "iso_639_1": "zh",
          "name": "普通话",
          "english_name": "Mandarin",
          "data": {
            "title": "星際大戰（系列）",
            "overview": "在很久以前，一個遙遠的銀河系，肩負正義使命的絕地武士與帝國邪惡黑暗勢力作戰的故事。",
            "homepage": ""
          }
        }
      ],
    });
  }),
  http.get('https://api.themoviedb.org/3/movie/:id', () => {
    return HttpResponse.json({
      adult: false,
      backdrop_path: '/zqkmTXzctd0To7LV0Zq219eLYi8.jpg',
      genre_ids: [12, 28, 878],
      id: 11,
      original_language: 'en',
      original_title: 'Star Wars',
      overview:
        'Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.',
      popularity: 100.0,
      poster_path: '/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg',
      release_date: '1977-05-25',
      title: 'Star Wars',
      video: false,
      vote_average: 8.2,
      vote_count: 14000,
      belongs_to_collection: {
        id: 10,
        name: 'Star Wars Collection',
        poster_path: '/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg',
        backdrop_path: '/zqkmTXzctd0To7LV0Zq219eLYi8.jpg',
      },
    });
  }),
  http.get('https://api.themoviedb.org/3/movie/upcoming', () => {
    return HttpResponse.json({
      dates: { maximum: '2023-05-23', minimum: '2023-05-04' },
      page: 1,
      results: [
        { adult: false, backdrop_path: '/7bWxAsNPv9CXHOhZbJVlj2KxgfP.jpg', genre_ids: [27, 53], id: 713704, original_language: 'en', original_title: 'Evil Dead Rise', overview: 'Two sisters find an ancient vinyl that gives birth to bloodthirsty demons that run amok in a Los Angeles apartment building and thrusts them into a primal battle for survival as they face the most nightmarish version of family imaginable.', popularity: 1696.367, poster_path: '/mIBCtPvKZQlxubxKMeViO2UrP3q.jpg', release_date: '2023-04-12', title: 'Evil Dead Rise', video: false, vote_average: 7, vote_count: 207 },
        { adult: false, backdrop_path: '/5Y5pz0NX7SZS9036I733F7uNcwK.jpg', genre_ids: [27, 53], id: 758323, original_language: 'en', original_title: "The Pope's Exorcist", overview: "Father Gabriele Amorth, Chief Exorcist of the Vatican, investigates a young boy's terrifying possession and ends up uncovering a centuries-old conspiracy the Vatican has desperately tried to keep hidden.", popularity: 1073.229, poster_path: '/9JBEPLTPSm0d1mbEcLxULjJq9Eh.jpg', release_date: '2023-04-05', title: "The Pope's Exorcist", video: false, vote_average: 6.5, vote_count: 143 },
        { adult: false, backdrop_path: '/wD2kUCX1Bb6oeIb2uz7kbdfLP6k.jpg', genre_ids: [27, 53], id: 980078, original_language: 'en', original_title: 'Winnie the Pooh: Blood and Honey', overview: 'Christopher Robin is headed off to college and he has abandoned his old friends, Pooh and Piglet, which then leads to the duo embracing their inner monsters.', popularity: 690.338, poster_path: '/ewF3IlGscc7FjgGEPcQvZsAsgAW.jpg', release_date: '2023-01-27', title: 'Winnie the Pooh: Blood and Honey', video: false, vote_average: 5.8, vote_count: 517 },
        { adult: false, backdrop_path: '/sp7MPK2K60LLd7A6zjHKsfgjFil.jpg', genre_ids: [27, 53], id: 296271, original_language: 'en', original_title: 'The Devil Conspiracy', overview: 'The hottest biotech company in the world has discovered they can clone history\'s most influential people from the dead. Now, they are auctioning clones of Michelangelo, Galileo, Vivaldi, and others for tens of millions of dollars to the world\'s ultra-rich. But when they steal the Shroud of Turin and clone the DNA of Jesus Christ, all hell breaks loose.', popularity: 615.365, poster_path: '/2lUYbD2C3XSuwqMUbDVDQuz9mqz.jpg', release_date: '2023-01-13', title: 'The Devil Conspiracy', video: false, vote_average: 6.3, vote_count: 129 },
        { adult: false, backdrop_path: '/fI5RsaM0NSU6TqztRhA2pal5ezv.jpg', genre_ids: [28, 80, 53], id: 385687, original_language: 'en', original_title: 'Fast X', overview: "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.", popularity: 524.606, poster_path: '/jwMMQR69Xz9AYtX4u2uYJgfAAev.jpg', release_date: '2023-05-17', title: 'Fast X', video: false, vote_average: 0, vote_count: 0 },
        { adult: false, backdrop_path: '/94TIUEhuwv8PhdIADEvSuwPljS5.jpg', genre_ids: [10752, 28], id: 840326, original_language: 'fi', original_title: 'Sisu', overview: 'Deep in the wilderness of Lapland, Aatami Korpi is searching for gold but after he stumbles upon Nazi patrol, a breathtaking and gold-hungry chase through the destroyed and mined Lapland wilderness begins.', popularity: 364.899, poster_path: '/dHx5yuBb05U9vNaNhIBD7jWyxPk.jpg', release_date: '2023-01-27', title: 'Sisu', video: false, vote_average: 6.9, vote_count: 16 },
        { adult: false, backdrop_path: '/qCW1DUmfWj2xLQRCRhrwkQyKROH.jpg', genre_ids: [14, 28, 12], id: 455476, original_language: 'en', original_title: 'Knights of the Zodiac', overview: "When a headstrong street orphan, Seiya, in search of his abducted sister unwittingly taps into hidden powers, he discovers he might be the only person alive who can protect a reincarnated goddess, sent to watch over humanity. Can he let his past go and embrace his destiny to become a Knight of the Zodiac?", popularity: 318.281, poster_path: '/ixLxaRJrJZoN3pg6tc2RAsheYmV.jpg', release_date: '2023-04-27', title: 'Knights of the Zodiac', video: false, vote_average: 6.5, vote_count: 8 },
        { adult: false, backdrop_path: '/3phD5uW41TZ8RavH9xjQv661MPw.jpg', genre_ids: [12, 10751, 14, 10749], id: 447277, original_language: 'en', original_title: 'The Little Mermaid', overview: "The youngest of King Triton's daughters, and the most defiant, Ariel longs to find out more about the world beyond the sea, and while visiting the surface, falls for the dashing Prince Eric. With mermaids forbidden to interact with humans, Ariel makes a deal with the evil sea witch, Ursula, which gives her a chance to experience life on land, but ultimately places her life – and her father's crown – in jeopardy.", popularity: 246.482, poster_path: '/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg', release_date: '2023-05-18', title: 'The Little Mermaid', video: false, vote_average: 0, vote_count: 0 },
        { adult: false, backdrop_path: '/8c9c4xg0IdXDg627uQF35K54VpC.jpg', genre_ids: [10749, 35], id: 800301, original_language: 'en', original_title: "What's Love Got to Do with It?", overview: 'Two childhood friends now in their thirties must decide whether to follow their heads or their hearts once the man decides to follow his parents\' advice and enter into an arranged marriage in Pakistan.', popularity: 243.462, poster_path: '/14fGGPAL5PQxuesjO4CFoDJEH5G.jpg', release_date: '2023-01-26', title: "What's Love Got to Do with It?", video: false, vote_average: 6.5, vote_count: 43 },
        { adult: false, backdrop_path: '/7TUp4uKIaX9c2TAZLPwjty5A0EP.jpg', genre_ids: [878, 12, 28], id: 447365, original_language: 'en', original_title: 'Guardians of the Galaxy Volume 3', overview: "Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe along with protecting one of their own. A mission that, if not completed successfully, could quite possibly lead to the end of the Guardians as we know them.", popularity: 239.132, poster_path: '/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg', release_date: '2023-05-03', title: 'Guardians of the Galaxy Volume 3', video: false, vote_average: 10, vote_count: 1 },
        { adult: false, backdrop_path: '/pr5B7Hb7711QQDirAyS5P7fKjts.jpg', genre_ids: [53, 28, 27, 12], id: 760741, original_language: 'en', original_title: 'Beast', overview: 'A recently widowed man and his two teenage daughters travel to a game reserve in South Africa. However, their journey of healing soon turns into a fight for survival when a bloodthirsty lion starts to stalk them.', popularity: 191.355, poster_path: '/f18rGcLlawKjNC5KRh36S0mvRlY.jpg', release_date: '2022-08-11', title: 'Beast', video: false, vote_average: 6.8, vote_count: 1077 },
        { adult: false, backdrop_path: '/sxQuWAUnyZCSJnjXhcGrCP6ASUy.jpg', genre_ids: [18, 27, 53], id: 931954, original_language: 'es', original_title: 'Venus', overview: 'Lucía, a club dancer on the run, takes refuge in a sinister building on the outskirts of Madrid where her sister Rocío lives with her daughter Alba.', popularity: 164.762, poster_path: '/vyQmDx5CF8x9T6WKCLuoFotGpjf.jpg', release_date: '2022-12-02', title: 'Venus', video: false, vote_average: 5.6, vote_count: 82 },
        { adult: false, backdrop_path: '/tIX6j3NzadlwGcJ52nuWdmtOQkg.jpg', genre_ids: [27, 53, 9648], id: 717728, original_language: 'en', original_title: 'Jeepers Creepers: Reborn', overview: 'Forced to travel with her boyfriend to a horror festival, Laine begins to experience disturbing visions associated with the urban legend of The Creeper. As the festival arrives and the blood-soaked entertainment builds to a frenzy, she becomes the center of it while something unearthly has been summoned.', popularity: 165.888, poster_path: '/aGBuiirBIQ7o64FmJxO53eYDuro.jpg', release_date: '2022-09-15', title: 'Jeepers Creepers: Reborn', video: false, vote_average: 5.8, vote_count: 745 },
        { adult: false, backdrop_path: '/bGfbeZ52aqTvxde9pjyC62jaSUg.jpg', genre_ids: [18], id: 919570, original_language: 'ro', original_title: 'R.M.N.', overview: 'A few days before Christmas, having quit his job in Germany, Matthias returns to his Transylvanian village. He wishes to involve himself more in the education of his son, Rudi, left for too long in the care of his mother, Ana, and to rid him of the unresolved fears that have gripped him.', popularity: 149.396, poster_path: '/kDcEfgF7CUo0IYLIazUYYqxagTG.jpg', release_date: '2022-06-03', title: 'R.M.N.', video: false, vote_average: 7, vote_count: 60 },
        { adult: false, backdrop_path: '/dnrUa6EXInBVfuPZLMDvkH7bMBi.jpg', genre_ids: [18], id: 855263, original_language: 'en', original_title: 'A Thousand and One', overview: 'Struggling but unapologetically living on her own terms, Inez is moving from shelter to shelter in mid-1990s New York City. With her 6-year-old son Terry in foster care and unable to leave him again, she kidnaps him so they can build their life together.', popularity: 140.053, poster_path: '/9WyipqK3wOf8lJLWqFX0r7aBodm.jpg', release_date: '2023-03-31', title: 'A Thousand and One', video: false, vote_average: 8.3, vote_count: 11 },
        { adult: false, backdrop_path: '/qElNES0sHVQcbzvGrTx7ccpGzij.jpg', genre_ids: [878, 28, 18], id: 842675, original_language: 'zh', original_title: '流浪地球2', overview: 'Humans built huge engines on the surface of the earth to find a new home. But the road to the universe is perilous. In order to save earth, young people once again have to step forward to start a race against time for life and death.', popularity: 99.801, poster_path: '/pR858ihc6Ls9xohpdRJVjV787ml.jpg', release_date: '2023-01-22', title: 'The Wandering Earth II', video: false, vote_average: 7.6, vote_count: 164 },
        { adult: false, backdrop_path: '/kfKW0HBObLAd4Lj27XX5QoLWmGe.jpg', genre_ids: [35, 27, 14], id: 649609, original_language: 'en', original_title: 'Renfield', overview: "Having grown sick and tired of his centuries as Dracula's lackey, Renfield finds a new lease on life — and maybe even redemption — when he falls for feisty, perennially angry traffic cop Rebecca Quincy.", popularity: 106.081, poster_path: '/p6yUjhvNGQpFZilKwOKbxQ1eHlo.jpg', release_date: '2023-04-07', title: 'Renfield', video: false, vote_average: 6.8, vote_count: 78 },
        { adult: false, backdrop_path: '/l2VqHMBEwAYZh6DeAZSlOzAXw7N.jpg', genre_ids: [35], id: 933419, original_language: 'en', original_title: 'Champions', overview: 'A stubborn and hotheaded minor league basketball coach is forced to train a Special Olympics team when he is sentenced to community service.', popularity: 100.151, poster_path: '/yVgtsoXyTZBww7SWE4JE1U4Wcel.jpg', release_date: '2023-03-09', title: 'Champions', video: false, vote_average: 7.1, vote_count: 85 },
        { adult: false, backdrop_path: '/ndrZYPNv0jKMCO9Ne98vfNxTzkW.jpg', genre_ids: [18, 53], id: 878375, original_language: 'en', original_title: 'On a Wing and a Prayer', overview: 'After their pilot dies unexpectedly mid-flight, passenger Doug White must safely land a plane and save his entire family from insurmountable danger.', popularity: 86.548, poster_path: '/8GTJwaC2CeNa0Zg6QrPLwrfurpZ.jpg', release_date: '2023-04-06', title: 'On a Wing and a Prayer', video: false, vote_average: 6.4, vote_count: 33 },
        { adult: false, backdrop_path: '/jENycYiYGr5NvMs789zj06JkW5l.jpg', genre_ids: [35, 18], id: 497828, original_language: 'en', original_title: 'Triangle of Sadness', overview: 'A celebrity model couple are invited on a luxury cruise for the uber-rich, helmed by an unhinged, alcoholic captain. What first appears Instagrammable ends catastrophically, leaving the survivors stranded on a desert island in a struggle of hierarchy.', popularity: 80.161, poster_path: '/k9eLozCgCed5FGTSdHu0bBElAV8.jpg', release_date: '2022-09-18', title: 'Triangle of Sadness', video: false, vote_average: 7.2, vote_count: 1224 },
      ],
      total_pages: 19,
      total_results: 369,
    });
  }),
  http.get('https://api.themoviedb.org/3/movie/popular', () => {
    return HttpResponse.json({
      page: 1,
      results: [
        { adult: false, backdrop_path: '/7bWxAsNPv9CXHOhZbJVlj2KxgfP.jpg', genre_ids: [27, 53], id: 713704, original_language: 'en', original_title: 'Evil Dead Rise', overview: 'Two sisters find an ancient vinyl that gives birth to bloodthirsty demons.', popularity: 1696.367, poster_path: '/mIBCtPvKZQlxubxKMeViO2UrP3q.jpg', release_date: '2023-04-12', title: 'Evil Dead Rise', video: false, vote_average: 7, vote_count: 207 },
        { adult: false, backdrop_path: '/fI5RsaM0NSU6TqztRhA2pal5ezv.jpg', genre_ids: [28, 80, 53], id: 385687, original_language: 'en', original_title: 'Fast X', overview: 'Dom Toretto and his family face their most lethal opponent yet.', popularity: 524.606, poster_path: '/jwMMQR69Xz9AYtX4u2uYJgfAAev.jpg', release_date: '2023-05-17', title: 'Fast X', video: false, vote_average: 0, vote_count: 0 },
        { adult: false, backdrop_path: '/7TUp4uKIaX9c2TAZLPwjty5A0EP.jpg', genre_ids: [878, 12, 28], id: 447365, original_language: 'en', original_title: 'Guardians of the Galaxy Volume 3', overview: 'Peter Quill must rally his team to defend the universe.', popularity: 239.132, poster_path: '/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg', release_date: '2023-05-03', title: 'Guardians of the Galaxy Volume 3', video: false, vote_average: 10, vote_count: 1 },
      ],
      total_pages: 10,
      total_results: 200,
    });
  }),
];
