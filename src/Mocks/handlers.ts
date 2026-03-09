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
            backdrop_path: '/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg',
            genre_ids: [878, 28, 12],
            id: 912649,
            original_language: 'en',
            original_title: 'Venom: The Last Dance',
            overview:
              'Eddie och Venom är på rymmen, jagade av bådas världar. När snaran dras åt, tvingas duon till ett förödande beslut som gör att ridån går ner för deras sista dans.',
            popularity: 4714.877,
            poster_path: '/3XtZfVJbrrEJkqmDatUZlz8sVjS.jpg',
            release_date: '2024-10-22',
            title: 'Venom: The Last Dance',
            video: false,
            vote_average: 6.6,
            vote_count: 507,
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
];
