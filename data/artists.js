var artists = [
  {
    id: 'm_shmatova',
    name: 'Марта Шматова',
    fb: 'https://www.facebook.com/marta.shmatava',
    link: '',
    photo: 'm_shmatava.jpg',
    text: '«Што датычыцца майстэрнi - для мяне, бязумоўна, гэта месца нумар адзiн! Але адпачатку гэта не мая гiсторыя, а гiсторыя майго бацькi (вучонага i мастака Вiктара Шматава). Доўгi час тут працаваў бацька, апошняе дзесяцiгоддзе майстэрня - мая. Выйшла так, што прадметны свет гэтай прасторы, а ён звязаны з народным мастацтвам, перайшоў мне ў спадчыну. Я пераставiла ўсё, але захавала. Атрымалася, як у калейдаскопе – «шкельцы» тыя ж, а «арнамент» iншы».'
  },
  {
    id: 'i_kosobuko',
    name: 'Илона Кособуко',
    fb: 'https://www.facebook.com/ilona.letters',
    link: '',
    photo: 'i_kosobuko.jpg',
    text: '«Мы с Мартой живём в одном доме, и получается, это продолжение дома, все книги постепенно кочуют из дома в мастерскую, сюда больше людей приходит. Многие закрывают свои мастерские, мол, чужая ментальность мешает. Но я посижу в темноте на балконе – и у меня все проходит…».'
  },
  {
    id: 'e_sumareva',
    name: 'Екатерина Сумарева',
    fb: 'https://www.facebook.com/sumarava.katsiaryna',
    link: 'http://sumarava.carbonmade.com/',
    photo: 'k_sumarava.jpg',
    text: '«Мы делим эту мастерскую с отцом (Василием Сумаревым) и с моей старшей сестрой… Тут такие закаты! Илона живёт в соседнем подъезде, и наши окна выходят на ту же улицу, и каждый вечер, особенно летом, мы наблюдаем феерические закаты. Мой отец жалел: «…я вот тридцать семь лет смотрел-смотрел на эти закаты, а ты взяла – и нарисовала первой», так что, он за эту тему больше и не берётся. Это не типичная для меня работа…».'
  },
  {
    id: 't_radivilko',
    name: 'Татьяна Радивилко',
    fb: 'https://www.facebook.com/tatiana.radsivilko',
    link: 'http://radsivilko.jimdo.com/',
    photo: 't_radsivilko.jpg',
    text: ''
  },
  {
    id: 'o_ugrinovich',
    name: 'Ольга Угринович',
    fb: 'https://www.facebook.com/olugrinovich',
    link: 'http://www.ugrinovich.com/',
    photo: 'o_ugrinovich.jpg',
    text: ''
  },
  {
    id: 'o_sazykina',
    name: 'Ольга Сазыкина',
    fb: 'https://www.facebook.com/sarakizyna',
    link: '',
    photo: 'o_sazykina.jpg',
    text: ''
  },
  {
    id: 'e_shnegel',
    name: 'Елена Шнегель',
    fb: 'https://www.facebook.com/profile.php?id=100005230596150',
    link: '',
    photo: 'e_shnegel.jpg',
    text: ''
  },
  {
    id: 'o_krupenkova',
    name: 'Ольга Крупенкова',
    fb: 'https://www.facebook.com/olga.krupenkova',
    link: '',
    photo: 'o_krupenkova.jpg',
    text: ''
  },
  {
    id: 'a_silivonchik',
    name: 'Анна Силивончик',
    fb: 'https://www.facebook.com/anna.silivonchik',
    link: 'http://silivonchik.ru/',
    photo: 'a_silivonchik.jpg',
    text: ''
  },
  {
    id: 'a_slobodchikova',
    name: 'Антонина Слободчикова',
    fb: 'https://www.facebook.com/sl.antonina',
    link: '',
    photo: 'a_slobodchikova.jpg',
    text: '«От прежних обитателей в мастерской осталось такое мужское зеркало, ого длинное и узкое, женщина бы не смогла таким пользоваться… долго мечтала о такой мастерской! Чтобы не было этого быта, этих кастрюль, без них, конечно, нельзя, но пусть будет аскетично – одна кастрюля, один стакан и все. Не могу поверить, что теперь у меня есть такая мастерская. Вообще есть разница между мужчинами и женщинами на «пути к успеху»: мужчин мотивируют к этому с детства, а женщин – нет. И получается, что у тебя есть какое-то чувство вины и моменты сомнений, которые постоянно терзают. И ты не можешь взять и четко сказать: «я супер и достойна всего этого» и даже когда тебе это говорят другие, ты продолжаешь сомневаться, т.е. ты не можешь поверить в то, что ты это заслужила…».'
  },
  {
    id: 'n_liventseva',
    name: 'Надежда Ливенцева',
    fb: '',
    link: 'http://liventseva.ru/',
    photo: '',
    text: ''
  },
  {
    id: 'g_romanova',
    name: 'Галина Романова',
    fb: 'https://www.facebook.com/profile.php?id=100000065356605',
    link: '',
    photo: 'g_romanova.jpg',
    text: ''
  },
  {
    id: 'z_lutsevich',
    name: 'Зоя Луцевич',
    fb: 'https://www.facebook.com/zoya.lutsevich',
    link: '',
    photo: 'z_lutsevich.jpg',
    text: ''
  },
  {
    id: 'j_kapustnikova',
    name: 'Жанна Капустникова',
    fb: 'https://www.facebook.com/janna.kapustnikova',
    link: 'http://jannakapustnikova.belorus.by',
    photo: 'j_kapustnikova.jpg',
    text: '«…под крышей очень жарко. В самое пекло температура поднимется выше 30 градусов. А осенью, привычно тормозят с отоплением, работать приходится при 13 - 9 градусах. Но самое страшное: спускаться и подниматься на чердак вверх-вниз с большими картинами 2x1,5 метра, весом по 10 кг – в маленькой башенке в нашей части дома нет лифта. Хотя ещё страшнее бывают счета за мастерскую. На вокзале всегда суетно и шумно – полно приезжих, раздаются стуки колёс, скрежет рельсов, гудки “паровозов”, гулкие объявления, пение евангелистки, крики гаишников в рупор и каких-то альбатросов. Что они делают на вокзале!? Кстати, для альбатросов и ворон мы сделали огромную кормушку, похожую на мольберт. Они тусуются на солдате, который охраняет большую башню, и ждут, когда мы им “подбросим” еды. Всё это очень романтично. Я очень люблю свою мастерскую – она одна из важных сбывшихся мечт. До этого снимала “однушку” в Чижовке на кольцевой. А теперь живу в одном из самых красивых зданий Минска, получившем название «ворота города». Да – именно живу, потому что дома только бытую…».'
  },
  {
    id: 'n_belookaya',
    name: 'Наталья Белоокая',
    fb: 'https://www.facebook.com/profile.php?id=100005437998185',
    link: '',
    photo: 'n_belookaya.jpg',
    text: ''
  },
  {
    id: 'i_demina',
    name: 'Ирина Дёмина',
    fb: 'https://www.facebook.com/artbags.by',
    link: 'http://www.artbags.by/',
    photo: 'i_demina.jpg',
    text: ''
  },
  {
    id: 't_kandratsienka',
    name: 'Татьяна Кандратенко',
    fb: 'https://www.facebook.com/tania.kandratsienka',
    link: '',
    photo: 't_kandratsienka.jpg',
    text: ''
  },
  {
    id: 'n_zaloznaya',
    name: 'Наталья Залозная',
    fb: 'https://www.facebook.com/Natalya-Zaloznaya-350764441678158',
    link: 'http://www.natalyazaloznaya.com/',
    photo: 'n_zaloznaya.jpg',
    text: ''
  }
]
