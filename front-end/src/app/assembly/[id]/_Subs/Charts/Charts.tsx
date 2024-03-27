import React, { useCallback, useEffect, useState } from 'react';
import * as API from '@/_apis/assembly';
import * as S from './Charts.css';
import * as T from '@/types';
import * as Comp from '@/components';
import { PALETTE } from '@/_constants';
import { useSuspenseQueries } from '@tanstack/react-query';

export default function Charts({ params }: T.AssemblyChartsProps) {
  const [{ data: infoResponse, isFetched: infoFetched }, { data: pledgeRateResponse, isFetched: pledgeFetched }] =
    useSuspenseQueries({
      queries: [
        {
          queryKey: [{ assembly: `info-request-${params.id}` }],
          queryFn: () => API.getAssemblyInfo({ assemblyId: params.id }),
        },
        {
          queryKey: [{ assembly: `pledge-rate-request-${params.id}` }],
          queryFn: () => API.getPledgeRateInfo({ assemblyId: params.id }),
        },
      ],
    });

  const calculateRate = useCallback(() => {
    const {
      attendances: meetingAttendances,
      absence: meetingAbsence,
      standingAttendances,
      standingAbsence,
    } = infoResponse.data.attendanceResponse;

    const totalMeeting = meetingAttendances + meetingAbsence;
    const totalStanding = standingAttendances + standingAbsence;

    return [
      [Math.floor((meetingAbsence / totalMeeting) * 100), Math.floor((meetingAttendances / totalMeeting) * 100)],
      [Math.floor((standingAbsence / totalStanding) * 100), Math.floor((standingAttendances / totalStanding) * 100)],
    ];
  }, []);

  return (
    <>
      <article className={S.wrapper}>
        <h3 className={S.titleText}>활동 현황</h3>
        <div className={S.chartsContainer}>
          <div className={S.posterWrapper}>
            <Comp.Poster posterheight="360px" posterwidth="360px">
              <div className={S.chartContainer}>
                <p className={S.totalCount}>총 {pledgeRateResponse.data.pledgeFulfillmentStatus.totalPledges}개</p>
                <Comp.PieChart
                  chartTitle={'공약 추진 현황'}
                  legendDisplay={true}
                  legendList={[
                    { title: '완료', color: PALETTE.party[infoResponse.data.polyName][100] },
                    { title: '추진중', color: PALETTE.party[infoResponse.data.polyName][80] },
                    { title: '보류', color: PALETTE.party[infoResponse.data.polyName][60] },
                    { title: '기타', color: PALETTE.party[infoResponse.data.polyName][40] },
                    { title: '폐기', color: PALETTE.party[infoResponse.data.polyName][20] },
                  ]}
                  datasetList={[
                    pledgeRateResponse.data.pledgeFulfillmentStatus.completedPledges,
                    pledgeRateResponse.data.pledgeFulfillmentStatus.ongoingPledges,
                    pledgeRateResponse.data.pledgeFulfillmentStatus.pendingPledges,
                    pledgeRateResponse.data.pledgeFulfillmentStatus.otherPledges,
                    pledgeRateResponse.data.pledgeFulfillmentStatus.discardedPledges,
                  ]}
                  UNIQUE_ID_FOR_LEGEND="assembly-member-promise-current-situation"
                />
              </div>
            </Comp.Poster>
          </div>
          <div className={S.posterWrapper}>
            <Comp.Poster posterwidth="100%" posterheight="100%">
              <div className={S.chartContainer}>
                <Comp.Tooltip>
                  <p className={S.tooltipText}>
                    국회에서 제공된 데이터 중 <b className={S.boldText}>출석과 결석만을 이용</b>해 계산하였습니다.
                  </p>
                  <p className={S.tooltipText}>
                    <b className={S.boldText}>본회의</b>란
                  </p>
                  <p className={S.tooltipText}>
                    <b className={S.boldText}>상임위</b>란
                  </p>
                </Comp.Tooltip>
                <Comp.DoughnutChart
                  legendList={[
                    { title: '본회의', color: PALETTE.party[infoResponse.data.polyName][100] },
                    { title: '상임위', color: PALETTE.party[infoResponse.data.polyName][60] },
                  ]}
                  datasetList={calculateRate()}
                  chartTitle="출석률"
                  UNIQUE_ID_FOR_LEGEND="assembly-member-attendance-rate"
                />
              </div>
            </Comp.Poster>
          </div>
        </div>
      </article>
    </>
  );
}
