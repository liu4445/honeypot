'use client';
import React from 'react';
import * as S from './style.css';
import { ArrowBlack, ArrowMain } from '@/_assets/icon';
import { Attendance, AttendanceShadow, BillListShadow, PromiseShadow } from '@/_assets/mainpageimg';
import MyBeeImg from '../_assets/mainpageimg/imgs/whereismybee.png';
import BeeList from '../_assets/mainpageimg/imgs/beelist.png';
import LawDetail from '../_assets/mainpageimg/imgs/lawdetail.png';
import LawList from '../_assets/mainpageimg/imgs/lawlist.png';
import { Badge } from '@/_components';
export default function MainTest() {
  return (
    <>
      <div className={S.mainWrapper}>
        <section>
          <div className={S.solganSection}>
            <div className={S.solganWrapper}>
              <p className={S.solganFont}>
                국회의 약속부터 실천까지
                <br />한 꿀통에 담다
              </p>
            </div>
            <div className={S.arrow}>
              <button style={{ transform: 'rotate(180deg)' }}>
                <ArrowMain></ArrowMain>
              </button>
            </div>
          </div>
          <div className={S.solganSubWrapper}>
            <p className={S.solganSubFont}>
              국가와 지역구를 위해 열심히 일한다는 여의도 꿀벌들,
              <br />
              여러분들은 얼마나 잘 알고 계신가요
              <br />
              이들의 약속과 실천을 여의도꿀통에서 확인해보세요
            </p>
          </div>
        </section>

        <section>
          <div className={S.assembleWrapper}>
            <div className={S.assembleSub}>
              <p className={S.assembleMainFont}>
                공약, 출석률
                <br /> 법안발의현황을
                <br /> 한눈에
              </p>
              <div>
                <AttendanceShadow></AttendanceShadow>
                <AttendanceShadow></AttendanceShadow>
              </div>
            </div>
            <div className={S.assembleSub}>
              <div>
                <BillListShadow></BillListShadow>
              </div>
              <p className={S.assembleFont}>
                17개 위원회 분야별로
                <br /> 확인할 수 있어요
              </p>
            </div>
            <div>
              <p className={S.assembleMainFont} style={{ textAlign: 'center' }}>
                우리 지역 꿀벌은 열심히 하고 있을까요?
              </p>

              <div>
                <img src={BeeList.src} width="100%"></img>
              </div>
              <button style={{ justifyContent: 'center', alignItems: 'center', width: '100%', display: 'flex' }}>
                <div className={S.btn}>확인하기</div>
              </button>
            </div>
          </div>
        </section>
        <section>
          <div className={S.billWrapper}>
            <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
              <span className={S.billFont}>21대 국회에서 발의된 법안의 수 </span>
              <span className={S.billBoldFont}> {'\u00A0'}27,123</span>
              <span className={S.billFont}>개</span>
            </div>
            <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
              <p className={S.billSubFont}>이 가운데 통과된 법안은 몇개일까요</p>
            </div>
            <div>
              <img src={LawList.src} width="100%"></img>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
