'use client';

import React, { useCallback, useEffect, useState } from 'react';
import * as S from './page.css';
import * as T from '@/types';
import * as API from '@/_apis/assembly';
import * as Comp from '@/components';
import { useIntersectionObserver } from '@/_customhooks';
import Link from 'next/link';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { sendGAEvent } from '@next/third-parties/google';
import { GA_TRACKING_ID } from '../../lib/gtag';
import { GoogleTagManager } from '@next/third-parties/google';

export default function AssembliesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleQueryString = useCallback(
    ({ sido, siGunGu, dong }: T.HandleQueryStringArgs) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set('sido', String(sido));
      params.set('sigungu', String(siGunGu));
      params.set('dong', String(dong));

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  const [totalCount, setTotalCount] = useState<null | number>(null);
  const queryKey = [
    {
      assemblies: `member-list`,
      areaCode: `${Number(searchParams.get('sido'))}-${Number(searchParams.get('sigungu'))}-${Number(
        searchParams.get('dong'),
      )}`,
      poly: Number(searchParams.get('poly')),
      word: searchParams.get('word') || '',
    },
  ];

  const {
    data: assembliesResponse,
    isFetched: assembliesFetched,
    fetchNextPage: fetchNextAssemblies,
  } = useSuspenseInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam }) =>
      API.getAssemblies({
        sido: Number(searchParams.get('sido')),
        sigungu: Number(searchParams.get('sigungu')),
        dong: Number(searchParams.get('dong')),
        poly: Number(searchParams.get('poly')),
        word: searchParams.get('word') || '',
        page: pageParam,
        limit: 10,
      })
        .then(res => res)
        .catch(err => {
          err.response.data.status === 400 && handleQueryString({ sido: 0, siGunGu: 0, dong: 0, poly: 0, word: '' });
        }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (lastPage?.status === 204 && lastPageParam === 0) return null;
      else if (totalCount !== null && lastPageParam * 10 > totalCount) return null;
      return lastPageParam + 1;
    },
  });

  const targetElement = useIntersectionObserver(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (assembliesFetched) {
      fetchNextAssemblies();
    }
  });

  useEffect(() => {
    setTotalCount(assembliesResponse.pages[0]?.data.count || 0);
  }, [assembliesResponse.pages]);

  return (
    <section className={S.cardSection}>
      {GA_TRACKING_ID && (
        <GoogleTagManager gtmId={GA_TRACKING_ID} dataLayerName="dataLayerName : 국회의원 페이지입니다" />
      )}
      <h2 className={S.titleWrapper}>
        <span className={S.title}>
          21대 국회의원
          <span className={S.givenInfomation}>
            의원 정보 출처 :{' '}
            <a
              className={S.givenInfomationLink}
              href="https://open.assembly.go.kr/portal/data/service/selectAPIServicePage.do/OWSSC6001134T516707"
              target="_black"
            >
              국회사무처
            </a>
          </span>
        </span>
        <span className={S.totalContWrapper}>
          총 <span className={S.number}>{totalCount || 0}</span>명
        </span>
      </h2>
      <Comp.GridWrapper>
        {assembliesFetched
          ? assembliesResponse.pages.map((page, pageIndex) => {
              return (
                page?.data.assemblyCardResponseList !== undefined &&
                page?.data.assemblyCardResponseList.map((res: T.Assembly, i: number) => (
                  <Link
                    className={S.styledLink}
                    key={res.monaCd}
                    href={`/assembly/${res.assemblyId}`}
                    onClick={() => sendGAEvent({ event: 'buttonClicked', value: `${res.hgName}` })}
                  >
                    <Comp.Card
                      key={res.monaCd}
                      ratio="4 / 6"
                      badge={{ isBadgeNeed: true, text: res.polyName }}
                      imgUrl={res.assemblyImgUrl}
                    >
                      <article className={S.cardArticle}>
                        <h3 className={S.mainText}>
                          {res.hgName}
                          <span className={S.subText}>의원</span>
                        </h3>
                        <p className={S.areaName}>{res.origName}</p>
                      </article>
                    </Comp.Card>
                  </Link>
                ))
              );
            })
          : Array.from({ length: 10 }).map((_, i) => <div className={S.skeletonCard} key={`skeleton-card-${i}`} />)}
      </Comp.GridWrapper>
      <div ref={targetElement} />
    </section>
  );
}
